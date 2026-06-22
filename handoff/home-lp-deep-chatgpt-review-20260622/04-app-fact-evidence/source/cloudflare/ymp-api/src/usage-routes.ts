import type { Context, Hono } from "hono";

import { getBillingSnapshot, isAdminModeDevice, usageRowsForUser } from "./db";
import type { Env, UsageFeatureKey, Variables } from "./types";
import { errorResponse, sha256Hex } from "./utils";

type App = Hono<{ Bindings: Env; Variables: Variables }>;
type AppContext = Context<{ Bindings: Env; Variables: Variables }>;

const featureKeys = new Set<string>(["scriptFetch", "scriptGeneration", "videoCreate"]);

function isFeatureKey(value: unknown): value is UsageFeatureKey {
  return typeof value === "string" && featureKeys.has(value);
}

function usageCoordinator(env: Env, userId: string) {
  return env.USAGE_COORDINATOR.getByName(`usage:${userId}`);
}

type SessionContext = {
  deviceHash: string | null;
  ipHash: string | null;
};

async function sessionContext(c: AppContext): Promise<SessionContext> {
  const claims = c.get("tokenClaims");
  const row = await c.env.DB.prepare(`
    SELECT hardware_id_hash, device_id
    FROM app_refresh_tokens
    WHERE id = ?
  `).bind(claims.sid).first<{ hardware_id_hash?: string | null; device_id?: string | null }>();
  const deviceId = row?.device_id ?? claims.device_id ?? "";
  const deviceHash = row?.hardware_id_hash
    ? row.hardware_id_hash
    : deviceId
      ? await sha256Hex(`device:${deviceId}`)
      : null;
  const ip = c.req.header("cf-connecting-ip") ?? "";
  return {
    deviceHash,
    ipHash: ip ? await sha256Hex(`ip:${ip}`) : null,
  };
}

async function usageSnapshot(env: Env, userId: string, deviceHash: string | null): Promise<Record<string, unknown>> {
  const billing = await getBillingSnapshot(env, userId);
  return {
    billing,
    planTier: billing.planTier,
    usage: await usageRowsForUser(env, userId),
    adminMode: await isAdminModeDevice(env, userId, deviceHash),
  };
}

export function registerUsageRoutes(app: App): void {
  app.post("/api/usage/reserve", async (c) => {
    const body = await c.req.json<{
      featureKey?: unknown;
      requestId?: string;
      units?: number;
      requestedOutputChars?: number;
    }>();
    if (!isFeatureKey(body.featureKey) || !body.requestId || !body.units) {
      return errorResponse("invalid_usage_reserve_request", 400);
    }
    const userId = c.get("userId");
    const context = await sessionContext(c);
    const stub = usageCoordinator(c.env, userId);
    const result = await stub.reserve({
      userId,
      featureKey: body.featureKey,
      requestId: body.requestId,
      units: body.units,
      requestedOutputChars: body.requestedOutputChars,
      deviceHash: context.deviceHash,
      ipHash: context.ipHash,
    });
    return Response.json(
      result.ok ? { ...result, ...(await usageSnapshot(c.env, userId, context.deviceHash)) } : result,
      { status: result.ok ? 200 : 409 },
    );
  });

  app.post("/api/usage/commit", async (c) => {
    const body = await c.req.json<{
      featureKey?: unknown;
      requestId?: string;
      units?: number;
      actualOutputChars?: number;
    }>();
    if (!isFeatureKey(body.featureKey) || !body.requestId) {
      return errorResponse("invalid_usage_commit_request", 400);
    }
    const userId = c.get("userId");
    const context = await sessionContext(c);
    const result = await usageCoordinator(c.env, userId).commit({
      userId,
      featureKey: body.featureKey,
      requestId: body.requestId,
      units: body.units ?? 0,
      actualOutputChars: body.actualOutputChars,
    });
    return Response.json(
      result.ok ? { ...result, ...(await usageSnapshot(c.env, userId, context.deviceHash)) } : result,
      { status: result.ok ? 200 : 409 },
    );
  });

  app.post("/api/usage/release", async (c) => {
    const body = await c.req.json<{
      featureKey?: unknown;
      requestId?: string;
      units?: number;
    }>();
    if (!isFeatureKey(body.featureKey) || !body.requestId) {
      return errorResponse("invalid_usage_release_request", 400);
    }
    const userId = c.get("userId");
    const context = await sessionContext(c);
    const result = await usageCoordinator(c.env, userId).release({
      userId,
      featureKey: body.featureKey,
      requestId: body.requestId,
      units: body.units ?? 0,
    });
    return Response.json(
      result.ok ? { ...result, ...(await usageSnapshot(c.env, userId, context.deviceHash)) } : result,
      { status: result.ok ? 200 : 409 },
    );
  });
}
