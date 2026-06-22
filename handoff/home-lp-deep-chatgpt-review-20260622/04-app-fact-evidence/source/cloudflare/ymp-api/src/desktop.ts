import type { Context } from "hono";

import { createAuth, getBetterAuthSession } from "./auth";
import { bootstrapUser, getAuthUser, getBillingSnapshot, isAdminModeDevice, usageRowsForUser, userAccountStatus } from "./db";
import { createRefreshToken, hashRefreshToken, pkceChallenge, signAppAccessToken } from "./tokens";
import type { Env, Variables } from "./types";
import { errorResponse, intEnv, isLoopbackRedirect, nowIso, randomToken, sha256Hex } from "./utils";

type AppContext = Context<{ Bindings: Env; Variables: Variables }>;

type DesktopCodeRow = {
  user_id: string;
  code_challenge: string;
};

type RefreshTokenRow = {
  id: string;
  user_id: string;
  token_family_id: string;
  device_id?: string | null;
  device_name?: string | null;
  hardware_id_hash?: string | null;
  expires_at: string;
  revoked_at?: string | null;
  rotated_at?: string | null;
};

async function refreshTokenHardwareIdHash(env: Env, refreshTokenId: string, userId: string): Promise<string> {
  const row = await env.DB.prepare(`
    SELECT hardware_id_hash
    FROM app_refresh_tokens
    WHERE id = ? AND user_id = ?
  `).bind(refreshTokenId, userId).first<{ hardware_id_hash?: string | null }>();
  return String(row?.hardware_id_hash ?? "").trim();
}

type DesktopAuthRequestConflictRow = {
  consumed_at?: string | null;
  expires_at: string;
};

function addSeconds(date: Date, seconds: number): string {
  return new Date(date.getTime() + seconds * 1000).toISOString().replace(/\.\d{3}Z$/, "Z");
}

function desktopCallbackURL(state: string): string {
  return `/desktop/login/complete?state=${encodeURIComponent(state)}`;
}

function validDesktopCallbackURL(env: Env, value: string): boolean {
  try {
    const base = new URL(env.BETTER_AUTH_URL);
    const url = new URL(value, base);
    return url.origin === base.origin && url.pathname === "/desktop/login/complete" && Boolean(url.searchParams.get("state"));
  } catch {
    return false;
  }
}

async function inactiveUserResponse(env: Env, userId: string): Promise<Response | null> {
  const status = await userAccountStatus(env, userId);
  if (status === "active") return null;
  return errorResponse("user_account_disabled", 403, { status });
}

function googleSocialConfigError(env: Env): Response | null {
  const missing = (["BETTER_AUTH_URL", "BETTER_AUTH_SECRET", "GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET"] as const)
    .filter((key) => !String(env[key] ?? "").trim());
  if (missing.length === 0) return null;
  return errorResponse("google_login_not_configured", 503, { missing });
}

function redirectWithAuthCookies(url: string, authResponse: Response): Response {
  const headers = new Headers();
  headers.set("Location", url);
  const authHeaders = authResponse.headers as Headers & { getSetCookie?: () => string[] };
  const cookies = authHeaders.getSetCookie?.() ?? [authResponse.headers.get("Set-Cookie")].filter((value): value is string => Boolean(value));
  for (const cookie of cookies) {
    headers.append("Set-Cookie", cookie);
  }
  return new Response(null, { status: 302, headers });
}

async function redirectToSocialSignIn(c: AppContext, provider: string, callbackURL: string): Promise<Response> {
  if (provider !== "google") {
    return errorResponse("unsupported_social_provider", 400);
  }
  if (!callbackURL || !validDesktopCallbackURL(c.env, callbackURL)) {
    return errorResponse("invalid_social_callback_url", 400);
  }
  const configError = googleSocialConfigError(c.env);
  if (configError) return configError;

  const auth = createAuth(c.env);
  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  headers.set("Accept", "application/json");
  headers.set("Origin", c.env.BETTER_AUTH_URL);
  headers.set("Referer", `${c.env.BETTER_AUTH_URL}/desktop/login/start`);
  const cookie = c.req.header("cookie");
  if (cookie) headers.set("Cookie", cookie);
  const userAgent = c.req.header("user-agent");
  if (userAgent) headers.set("User-Agent", userAgent);

  const authResponse = await auth.handler(new Request(`${c.env.BETTER_AUTH_URL}/api/auth/sign-in/social`, {
    method: "POST",
    headers,
    body: JSON.stringify({ provider, callbackURL }),
  }));
  const location = authResponse.headers.get("Location");
  if (location) {
    return redirectWithAuthCookies(location, authResponse);
  }

  const body = await authResponse.clone().json<{ url?: string }>().catch(() => null);
  if (authResponse.ok && body?.url) {
    return redirectWithAuthCookies(body.url, authResponse);
  }
  return authResponse;
}

export async function startSocialSignInRedirect(c: AppContext): Promise<Response> {
  const provider = c.req.query("provider") ?? "";
  const callbackURL = c.req.query("callbackURL") ?? "";
  return redirectToSocialSignIn(c, provider, callbackURL);
}

export async function startDesktopLogin(c: AppContext): Promise<Response> {
  const state = c.req.query("state");
  const redirectUri = c.req.query("redirect_uri");
  const codeChallenge = c.req.query("code_challenge");
  const method = c.req.query("code_challenge_method") ?? "S256";
  if (!state || !redirectUri || !codeChallenge) {
    return errorResponse("missing_desktop_login_parameter", 400);
  }
  if (method !== "S256") {
    return errorResponse("unsupported_code_challenge_method", 400);
  }
  const redirect = isLoopbackRedirect(redirectUri);
  if (!redirect.ok || !redirect.url) {
    return errorResponse(redirect.error ?? "invalid_redirect_uri", 400);
  }
  const configError = googleSocialConfigError(c.env);
  if (configError) return configError;

  const now = new Date();
  const nowText = nowIso();
  const stateHash = await sha256Hex(state);
  await c.env.DB.prepare(`
    DELETE FROM desktop_auth_requests
    WHERE state_hash = ?
      AND expires_at <= ?
  `).bind(stateHash, nowText).run();

  const existing = await c.env.DB.prepare(`
    SELECT consumed_at, expires_at
    FROM desktop_auth_requests
    WHERE state_hash = ?
  `).bind(stateHash).first<DesktopAuthRequestConflictRow>();
  if (existing) {
    return errorResponse("duplicate_desktop_login_state", 409, {
      consumed: Boolean(existing.consumed_at),
      expiresAt: existing.expires_at,
    });
  }

  const expiresAt = addSeconds(now, 10 * 60);
  await c.env.DB.prepare(`
    INSERT INTO desktop_auth_requests (
      id, state_hash, code_challenge, code_challenge_method, redirect_uri, redirect_host,
      redirect_port, created_at, expires_at, user_agent, ip_address
    )
    VALUES (?, ?, ?, 'S256', ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    crypto.randomUUID(),
    stateHash,
    codeChallenge,
    redirectUri,
    redirect.url.hostname,
    Number.parseInt(redirect.url.port, 10),
    nowText,
    expiresAt,
    c.req.header("user-agent") ?? "",
    c.req.header("cf-connecting-ip") ?? "",
  ).run();
  return redirectToSocialSignIn(c, "google", desktopCallbackURL(state));
}

export async function completeDesktopLogin(c: AppContext): Promise<Response> {
  const state = c.req.query("state");
  if (!state) return errorResponse("missing_state", 400);

  const session = await getBetterAuthSession(c.env, c.req.raw.headers);
  const userId = session?.user?.id;
  if (!userId) return errorResponse("not_logged_in", 401);
  const inactive = await inactiveUserResponse(c.env, userId);
  if (inactive) return inactive;

  const stateHash = await sha256Hex(state);
  const request = await c.env.DB.prepare(`
    SELECT redirect_uri, code_challenge
    FROM desktop_auth_requests
    WHERE state_hash = ?
      AND consumed_at IS NULL
      AND expires_at > ?
  `).bind(stateHash, nowIso()).first<{ redirect_uri: string; code_challenge: string }>();
  if (!request) return errorResponse("desktop_login_request_expired", 400);

  const code = randomToken(32);
  const now = new Date();
  await c.env.DB.batch([
    c.env.DB.prepare(`
      INSERT INTO desktop_login_codes (
        code_hash, user_id, state_hash, redirect_uri, code_challenge, created_at, expires_at,
        user_agent, ip_address
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      await sha256Hex(code),
      userId,
      stateHash,
      request.redirect_uri,
      request.code_challenge,
      nowIso(),
      addSeconds(now, 2 * 60),
      c.req.header("user-agent") ?? "",
      c.req.header("cf-connecting-ip") ?? "",
    ),
    c.env.DB.prepare(`
      UPDATE desktop_auth_requests
      SET consumed_at = ?
      WHERE state_hash = ? AND consumed_at IS NULL
    `).bind(nowIso(), stateHash),
  ]);

  const redirect = new URL(request.redirect_uri);
  redirect.searchParams.set("code", code);
  redirect.searchParams.set("state", state);
  return c.redirect(redirect.toString());
}

export async function exchangeDesktopCode(c: AppContext): Promise<Response> {
  const body = await c.req.json<{
    code?: string;
    state?: string;
    codeVerifier?: string;
    deviceId?: string;
    deviceName?: string;
    hardwareId?: string;
  }>();
  if (!body.code || !body.state || !body.codeVerifier) {
    return errorResponse("missing_exchange_parameter", 400);
  }
  const codeHash = await sha256Hex(body.code);
  const stateHash = await sha256Hex(body.state);
  const row = await c.env.DB.prepare(`
    SELECT user_id, code_challenge
    FROM desktop_login_codes
    WHERE code_hash = ?
      AND state_hash = ?
      AND used_at IS NULL
      AND expires_at > ?
  `).bind(codeHash, stateHash, nowIso()).first<DesktopCodeRow>();
  if (!row) return errorResponse("invalid_or_expired_code", 401);

  if ((await pkceChallenge(body.codeVerifier)) !== row.code_challenge) {
    return errorResponse("invalid_code_verifier", 401);
  }

  const user = await getAuthUser(c.env, row.user_id);
  if (!user) return errorResponse("user_not_found", 404);
  const inactive = await inactiveUserResponse(c.env, row.user_id);
  if (inactive) return inactive;

  const hardwareIdHash = body.hardwareId ? await sha256Hex(body.hardwareId) : null;
  await bootstrapUser(c.env, user, hardwareIdHash);

  const refresh = await createRefreshToken(c.env);
  const refreshTokenId = crypto.randomUUID();
  const tokenFamilyId = crypto.randomUUID();
  const now = new Date();
  const issuedAt = nowIso();
  const refreshTtl = intEnv(c.env, "APP_REFRESH_TOKEN_TTL_SECONDS", 30 * 24 * 60 * 60);
  await c.env.DB.batch([
    c.env.DB.prepare(`
      UPDATE desktop_login_codes
      SET used_at = ?
      WHERE code_hash = ? AND used_at IS NULL
    `).bind(issuedAt, codeHash),
    c.env.DB.prepare(`
      UPDATE app_refresh_tokens
      SET revoked_at = COALESCE(revoked_at, ?)
      WHERE user_id = ?
        AND revoked_at IS NULL
        AND expires_at > ?
    `).bind(issuedAt, row.user_id, issuedAt),
    c.env.DB.prepare(`
      INSERT INTO app_refresh_tokens (
        id, user_id, token_hash, token_family_id, device_id, device_name, hardware_id_hash,
        created_at, expires_at, last_used_at, last_ip_address, last_user_agent
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      refreshTokenId,
      row.user_id,
      refresh.hash,
      tokenFamilyId,
      body.deviceId ?? null,
      body.deviceName ?? null,
      hardwareIdHash,
      issuedAt,
      addSeconds(now, refreshTtl),
      issuedAt,
      c.req.header("cf-connecting-ip") ?? "",
      c.req.header("user-agent") ?? "",
    ),
  ]);

  const accessToken = await signAppAccessToken(c.env, {
    userId: row.user_id,
    refreshTokenId,
    deviceId: body.deviceId ?? null,
  });
  return Response.json({
    ok: true,
    accessToken,
    refreshToken: refresh.token,
    expiresIn: intEnv(c.env, "APP_ACCESS_TOKEN_TTL_SECONDS", 15 * 60),
    user: {
      id: user.id,
      email: user.email,
      name: user.name ?? "",
      image: user.image ?? "",
    },
    billing: await getBillingSnapshot(c.env, row.user_id),
    usage: await usageRowsForUser(c.env, row.user_id),
    adminMode: await isAdminModeDevice(c.env, row.user_id, hardwareIdHash),
  });
}

export async function refreshDesktopToken(c: AppContext): Promise<Response> {
  const body = await c.req.json<{ refreshToken?: string; deviceId?: string }>();
  if (!body.refreshToken) return errorResponse("missing_refresh_token", 400);
  const tokenHash = await hashRefreshToken(c.env, body.refreshToken);
  const row = await c.env.DB.prepare(`
    SELECT id, user_id, token_family_id, device_id, device_name, hardware_id_hash, expires_at, revoked_at, rotated_at
    FROM app_refresh_tokens
    WHERE token_hash = ?
  `).bind(tokenHash).first<RefreshTokenRow>();
  if (!row || row.revoked_at || row.expires_at <= nowIso()) {
    return errorResponse("invalid_refresh_token", 401);
  }
  const inactive = await inactiveUserResponse(c.env, row.user_id);
  if (inactive) {
    await c.env.DB.prepare(`
      UPDATE app_refresh_tokens
      SET revoked_at = COALESCE(revoked_at, ?)
      WHERE token_family_id = ?
    `).bind(nowIso(), row.token_family_id).run();
    return inactive;
  }
  if (row.rotated_at) {
    await c.env.DB.prepare(`
      UPDATE app_refresh_tokens
      SET revoked_at = COALESCE(revoked_at, ?)
      WHERE token_family_id = ?
    `).bind(nowIso(), row.token_family_id).run();
    return errorResponse("refresh_token_reuse_detected", 401);
  }

  const user = await getAuthUser(c.env, row.user_id);
  if (!user) return errorResponse("user_not_found", 404);
  await bootstrapUser(c.env, user, row.hardware_id_hash ?? null);

  const refresh = await createRefreshToken(c.env);
  const newRefreshTokenId = crypto.randomUUID();
  const now = new Date();
  const refreshTtl = intEnv(c.env, "APP_REFRESH_TOKEN_TTL_SECONDS", 30 * 24 * 60 * 60);
  await c.env.DB.batch([
    c.env.DB.prepare(`
      UPDATE app_refresh_tokens
      SET rotated_at = ?, last_used_at = ?, last_ip_address = ?, last_user_agent = ?
      WHERE id = ? AND rotated_at IS NULL AND revoked_at IS NULL
    `).bind(nowIso(), nowIso(), c.req.header("cf-connecting-ip") ?? "", c.req.header("user-agent") ?? "", row.id),
    c.env.DB.prepare(`
      INSERT INTO app_refresh_tokens (
        id, user_id, token_hash, token_family_id, device_id, device_name, hardware_id_hash,
        created_at, expires_at, last_used_at, last_ip_address, last_user_agent
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      newRefreshTokenId,
      row.user_id,
      refresh.hash,
      row.token_family_id,
      body.deviceId ?? row.device_id ?? null,
      row.device_name ?? null,
      row.hardware_id_hash ?? null,
      nowIso(),
      addSeconds(now, refreshTtl),
      nowIso(),
      c.req.header("cf-connecting-ip") ?? "",
      c.req.header("user-agent") ?? "",
    ),
  ]);
  const accessToken = await signAppAccessToken(c.env, {
    userId: row.user_id,
    refreshTokenId: newRefreshTokenId,
    deviceId: body.deviceId ?? row.device_id ?? null,
  });
  return Response.json({
    ok: true,
    accessToken,
    refreshToken: refresh.token,
    expiresIn: intEnv(c.env, "APP_ACCESS_TOKEN_TTL_SECONDS", 15 * 60),
    user: {
      id: user.id,
      email: user.email,
      name: user.name ?? "",
      image: user.image ?? "",
    },
    billing: await getBillingSnapshot(c.env, row.user_id),
    usage: await usageRowsForUser(c.env, row.user_id),
    adminMode: await isAdminModeDevice(c.env, row.user_id, row.hardware_id_hash ?? null),
  });
}

export async function logoutDesktopDevice(c: AppContext): Promise<Response> {
  const claims = c.get("tokenClaims");
  await c.env.DB.prepare(`
    UPDATE app_refresh_tokens
    SET revoked_at = COALESCE(revoked_at, ?)
    WHERE id = ?
  `).bind(nowIso(), claims.sid).run();
  return Response.json({ ok: true });
}

export async function getMe(c: AppContext): Promise<Response> {
  const userId = c.get("userId");
  const inactive = await inactiveUserResponse(c.env, userId);
  if (inactive) return inactive;
  const user = await getAuthUser(c.env, userId);
  if (!user) return errorResponse("user_not_found", 404);
  let usage = await usageRowsForUser(c.env, userId);
  if (usage.length === 0 || !usage.some((row) => row.feature_key === "videoCreate")) {
    await bootstrapUser(c.env, user);
    usage = await usageRowsForUser(c.env, userId);
  }
  return Response.json({
    ok: true,
    user: {
      id: user.id,
      email: user.email,
      name: user.name ?? "",
      image: user.image ?? "",
    },
    billing: await getBillingSnapshot(c.env, userId),
    usage,
    adminMode: await isAdminModeDevice(c.env, userId, await refreshTokenHardwareIdHash(c.env, c.get("tokenClaims").sid, userId)),
    serverMinClientVersion: c.env.YMP_MIN_CLIENT_VERSION ?? "",
    requiredClientCompat: c.env.YMP_REQUIRED_CLIENT_COMPAT ?? "",
  });
}
