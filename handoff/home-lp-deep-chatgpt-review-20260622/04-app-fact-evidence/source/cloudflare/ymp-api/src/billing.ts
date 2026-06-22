import type { Hono } from "hono";

import { bootstrapUser, getAuthUser, getBillingSnapshot, updateBillingFromPlan } from "./db";
import { redeemSerialCodeForUser } from "./serial";
import { assertStripeLivemodeMatchesEnvironment, stripeObjectId, stripeRequest, stringValue, type StripeMap } from "./stripe-client";
import type { Env, JsonMap, Variables } from "./types";
import { boolEnv, errorResponse, isAllowedReturnUrl, normalizePlanTierFromPurchaseType, nowIso } from "./utils";

type App = Hono<{ Bindings: Env; Variables: Variables }>;

type CheckoutBody = {
  purchaseType?: string;
  serialCode?: string;
  promotionCode?: string;
  allowPromotionCodes?: boolean;
  successUrl?: string;
  cancelUrl?: string;
  idempotencyKey?: string;
};

type StripePromotionCodeList = JsonMap & {
  data?: Array<StripeMap & { active?: boolean }>;
};

type CheckoutGuardRow = {
  guard_id: string;
  user_id: string;
  purchase_type: string;
  session_id?: string | null;
  status: string;
  expires_at: string;
};

const PREMIUM_LIFETIME_PURCHASE_TYPE = "premium_lifetime";
const PREMIUM_LIFETIME_PRICE_TEXT = "39,800円";
const purchaseTypes = new Set([PREMIUM_LIFETIME_PURCHASE_TYPE]);

function checkoutEnabled(env: Env): boolean {
  return boolEnv(env.BILLING_CHECKOUT_ENABLED, false);
}

function priceIdForPurchaseType(env: Env, purchaseType: string): string {
  if (purchaseType === PREMIUM_LIFETIME_PURCHASE_TYPE) return env.STRIPE_PRICE_PREMIUM_LIFETIME ?? "";
  return "";
}

function isSubscriptionPurchase(purchaseType: string): boolean {
  return purchaseType.endsWith("_monthly") || purchaseType.endsWith("_yearly");
}

function checkoutReturnUrl(rawUrl: string, purchaseType: string, includeCheckoutSession: boolean): string {
  const url = new URL(rawUrl);
  url.searchParams.set("purchase_type", purchaseType);
  if (includeCheckoutSession) {
    url.searchParams.set("session_id", "{CHECKOUT_SESSION_ID}");
    return url.toString().replace("%7BCHECKOUT_SESSION_ID%7D", "{CHECKOUT_SESSION_ID}");
  }
  return url.toString();
}

function checkoutCodeFromBody(body: CheckoutBody): string {
  return String(body.serialCode ?? body.promotionCode ?? "").trim();
}

function checkoutIdempotencyKey(body: CheckoutBody, userId: string, purchaseType: string, guardId: string): string {
  const requested = String(body.idempotencyKey ?? "").trim();
  if (requested) return requested;
  return `checkout:${userId}:${purchaseType}:${guardId}`;
}

async function checkoutGuardByIdempotencyKey(env: Env, idempotencyKey: string): Promise<CheckoutGuardRow | null> {
  return await env.DB.prepare(`
    SELECT guard_id, user_id, purchase_type, session_id, status, expires_at
    FROM checkout_guards
    WHERE idempotency_key = ?
    LIMIT 1
  `).bind(idempotencyKey).first<CheckoutGuardRow>();
}

async function findActivePromotionCodeId(env: Env, code: string): Promise<string> {
  const params = new URLSearchParams();
  params.set("code", code);
  params.set("active", "true");
  params.set("limit", "1");
  const result = await stripeRequest<StripePromotionCodeList>(env, "/promotion_codes", { method: "GET", params });
  const rows = Array.isArray(result.data) ? result.data : [];
  const row = rows.find((item) => item.active !== false && stringValue(item.id));
  return row ? stringValue(row.id) : "";
}

function billingCatalogResponse(env: Env): Response {
  const checkoutAllowed = checkoutEnabled(env);
  const warnings: string[] = [];
  if (!env.STRIPE_PRICE_PREMIUM_LIFETIME) warnings.push("premium_lifetime_price_not_configured");
  if (!checkoutAllowed) warnings.push("billing_checkout_disabled");
  return Response.json({
    ok: true,
    currency: "jpy",
    defaultPurchaseType: PREMIUM_LIFETIME_PURCHASE_TYPE,
    warnings,
    plans: [
      {
        planId: "free",
        purchaseType: "",
        displayName: "Free",
        subtitle: "新規Googleログイン直後のFree枠",
        priceText: "0円",
        features: ["動画作成サービスクレジット3回", "当日Free枠1回", "購入前の動作確認向け"],
        highlight: false,
        badgeText: "Free",
        purchasable: false,
        sortOrder: 0,
        planTier: "free",
        billingMode: "free",
        priceConfigured: true,
      },
      {
        planId: PREMIUM_LIFETIME_PURCHASE_TYPE,
        purchaseType: PREMIUM_LIFETIME_PURCHASE_TYPE,
        displayName: "YMP Pro",
        subtitle: "買い切りライセンスでPro権限を付与",
        priceText: PREMIUM_LIFETIME_PRICE_TEXT,
        features: [
          "動画作成 無制限",
          "MCP接続 解放",
          "サムネ生成機能 解放",
          "購入後すぐPro権限へ反映",
          "Googleアカウント単位で権利を保持",
          "月額料金なし",
        ],
        highlight: true,
        badgeText: "Pro",
        purchasable: checkoutAllowed && Boolean(env.STRIPE_PRICE_PREMIUM_LIFETIME),
        sortOrder: 10,
        planTier: "pro",
        billingMode: "payment",
        priceConfigured: Boolean(env.STRIPE_PRICE_PREMIUM_LIFETIME),
      },
    ],
  });
}

export function registerBillingRoutes(app: App): void {
  app.get("/api/billing/catalog", (c) => billingCatalogResponse(c.env));
  app.post("/api/billing/catalog", (c) => billingCatalogResponse(c.env));

  app.post("/api/billing/checkout", async (c) => {
    if (!checkoutEnabled(c.env)) return errorResponse("billing_checkout_disabled", 503);
    const body = await c.req.json<CheckoutBody>();
    const checkoutCode = checkoutCodeFromBody(body);
    const purchaseType = body.purchaseType || (checkoutCode ? PREMIUM_LIFETIME_PURCHASE_TYPE : "");
    if (!purchaseTypes.has(purchaseType)) return errorResponse("invalid_purchase_type", 400);
    if (!body.successUrl || !body.cancelUrl || !isAllowedReturnUrl(c.env, body.successUrl) || !isAllowedReturnUrl(c.env, body.cancelUrl)) {
      return errorResponse("invalid_return_url", 400);
    }

    const userId = c.get("userId");
    const user = await getAuthUser(c.env, userId);
    if (!user) return errorResponse("user_not_found", 404);
    await bootstrapUser(c.env, user);

    const billing = await getBillingSnapshot(c.env, userId);
    const requestedTier = normalizePlanTierFromPurchaseType(purchaseType);

    if (checkoutCode) {
      const serialResult = await redeemSerialCodeForUser(c.env, userId, checkoutCode);
      if (serialResult.matched) {
        if (!serialResult.ok) {
          return errorResponse(serialResult.error, serialResult.status, { codeKind: "serial" });
        }
        return Response.json({
          ok: true,
          redeemed: true,
          codeKind: "serial",
          billing: serialResult.billing,
          purchaseType: serialResult.purchaseType,
          maskedSerialCode: serialResult.maskedSerialCode,
        });
      }
    }

    if ((billing.planTier === "premium" || billing.planTier === "pro") && requestedTier === "pro") {
      return errorResponse("already_has_premium_lifetime", 409);
    }

    const priceId = priceIdForPurchaseType(c.env, purchaseType);
    if (!priceId) return errorResponse("stripe_price_not_configured", 500);
    const promotionCodeId = checkoutCode ? await findActivePromotionCodeId(c.env, checkoutCode) : "";
    if (checkoutCode && !promotionCodeId) {
      return errorResponse("invalid_promotion_code", 404);
    }

    let customerId = billing.stripeCustomerId;
    if (!customerId) {
      const params = new URLSearchParams();
      params.set("email", user.email);
      params.set("metadata[user_id]", userId);
      params.set("metadata[source]", "ymp-cloudflare");
      const customer = await stripeRequest<StripeMap>(c.env, "/customers", { params, idempotencyKey: `customer:${userId}` });
      customerId = stringValue(customer.id);
      await c.env.DB.prepare(`
        UPDATE billing_state
        SET stripe_customer_id = ?, updated_at = ?
        WHERE user_id = ?
      `).bind(customerId, nowIso(), userId).run();
    }

    let guardId = crypto.randomUUID();
    const idempotencyKey = checkoutIdempotencyKey(body, userId, purchaseType, guardId);
    if (idempotencyKey.length > 255) return errorResponse("idempotency_key_too_long", 400);
    const startedAt = nowIso();
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString().replace(/\.\d{3}Z$/, "Z");
    await c.env.DB.prepare(`
      INSERT INTO checkout_guards (
        guard_id, user_id, purchase_type, status, started_at, expires_at, idempotency_key
      )
      VALUES (?, ?, ?, 'started', ?, ?, ?)
      ON CONFLICT(idempotency_key) DO NOTHING
    `).bind(
      guardId,
      userId,
      purchaseType,
      startedAt,
      expiresAt,
      idempotencyKey,
    ).run();
    const guard = await checkoutGuardByIdempotencyKey(c.env, idempotencyKey);
    if (!guard) return errorResponse("checkout_guard_not_found", 500);
    if (guard.user_id !== userId || guard.purchase_type !== purchaseType) {
      return errorResponse("idempotency_key_conflict", 409);
    }
    guardId = guard.guard_id;
    if (guard.session_id) {
      const existingSession = await stripeRequest<StripeMap>(
        c.env,
        `/checkout/sessions/${encodeURIComponent(guard.session_id)}`,
        { method: "GET" },
      );
      assertStripeLivemodeMatchesEnvironment(c.env, existingSession.livemode, "checkout_session");
      return Response.json({
        ok: true,
        checkoutUrl: stringValue(existingSession.url),
        sessionId: stringValue(existingSession.id) || guard.session_id,
        guardId,
        purchaseType,
        codeProvided: Boolean(checkoutCode),
        codeKind: null,
        promotionCodeApplied: false,
        promotionCodeEntryEnabled: false,
        idempotentReplay: true,
      });
    }

    const params = new URLSearchParams();
    params.set("mode", isSubscriptionPurchase(purchaseType) ? "subscription" : "payment");
    params.set("customer", customerId);
    params.set("client_reference_id", userId);
    params.set("success_url", checkoutReturnUrl(body.successUrl, purchaseType, true));
    params.set("cancel_url", checkoutReturnUrl(body.cancelUrl, purchaseType, false));
    params.set("line_items[0][price]", priceId);
    params.set("line_items[0][quantity]", "1");
    params.set("metadata[user_id]", userId);
    params.set("metadata[purchase_type]", purchaseType);
    params.set("metadata[checkout_guard_id]", guardId);
    params.set("metadata[discount_code_provided]", checkoutCode ? "true" : "false");
    if (promotionCodeId) {
      params.set("metadata[promotion_code_id]", promotionCodeId);
      params.set("discounts[0][promotion_code]", promotionCodeId);
    } else if (body.allowPromotionCodes !== false) {
      params.set("allow_promotion_codes", "true");
    }
    if (isSubscriptionPurchase(purchaseType)) {
      params.set("subscription_data[metadata][user_id]", userId);
      params.set("subscription_data[metadata][purchase_type]", purchaseType);
      params.set("subscription_data[metadata][checkout_guard_id]", guardId);
    } else {
      params.set("payment_intent_data[metadata][user_id]", userId);
      params.set("payment_intent_data[metadata][purchase_type]", purchaseType);
      params.set("payment_intent_data[metadata][checkout_guard_id]", guardId);
    }

    const session = await stripeRequest<StripeMap>(c.env, "/checkout/sessions", {
      params,
      idempotencyKey,
    });
    assertStripeLivemodeMatchesEnvironment(c.env, session.livemode, "checkout_session");
    await c.env.DB.prepare(`
      UPDATE checkout_guards
      SET session_id = ?
      WHERE guard_id = ?
    `).bind(stringValue(session.id), guardId).run();

    return Response.json({
      ok: true,
      checkoutUrl: stringValue(session.url),
      sessionId: stringValue(session.id),
      guardId,
      purchaseType,
      codeProvided: Boolean(checkoutCode),
      codeKind: promotionCodeId ? "stripe_promotion" : null,
      promotionCodeApplied: Boolean(promotionCodeId),
      promotionCodeEntryEnabled: !promotionCodeId && body.allowPromotionCodes !== false,
    });
  });

  app.post("/api/billing/portal", async (c) => {
    const body = await c.req.json<{ returnUrl?: string }>();
    if (!body.returnUrl || !isAllowedReturnUrl(c.env, body.returnUrl)) {
      return errorResponse("invalid_return_url", 400);
    }
    const userId = c.get("userId");
    const billing = await getBillingSnapshot(c.env, userId);
    if (!billing.stripeCustomerId) return errorResponse("stripe_customer_not_found", 404);

    const params = new URLSearchParams();
    params.set("customer", billing.stripeCustomerId);
    params.set("return_url", body.returnUrl);
    const portal = await stripeRequest<StripeMap>(c.env, "/billing_portal/sessions", { params });
    return Response.json({ ok: true, portalUrl: stringValue(portal.url) });
  });

  app.post("/api/billing/sync", async (c) => {
    const userId = c.get("userId");
    const billing = await getBillingSnapshot(c.env, userId);
    if (!billing.stripeSubscriptionId) {
      return Response.json({ ok: true, billing });
    }
    const subscription = await stripeRequest<StripeMap>(c.env, `/subscriptions/${billing.stripeSubscriptionId}`, { method: "GET" });
    const status = stringValue(subscription.status) || billing.subscriptionStatus;
    const planTier = status === "canceled" ? "free" : billing.planTier;
    const synced = await updateBillingFromPlan(c.env, {
      userId,
      planTier,
      purchaseType: billing.premiumType || billing.subscriptionPlan,
      stripeCustomerId: stripeObjectId(subscription.customer) || billing.stripeCustomerId,
      stripeSubscriptionId: stringValue(subscription.id) || billing.stripeSubscriptionId,
      subscriptionStatus: status,
      cancelAtPeriodEnd: subscription.cancel_at_period_end === true,
      entitlementExpiry: typeof subscription.current_period_end === "number"
        ? new Date(subscription.current_period_end * 1000).toISOString().replace(/\.\d{3}Z$/, "Z")
        : billing.entitlementExpiry,
      source: "sync",
      sourceId: stringValue(subscription.id),
    });
    return Response.json({ ok: true, billing: synced });
  });

  app.post("/api/billing/plan-change/preview", (c) => {
    return c.json({ ok: false, error: "plan_change_not_implemented", implementedAfter: "checkout_portal_sync" }, 501);
  });

  app.post("/api/billing/plan-change/apply", (c) => {
    return c.json({ ok: false, error: "plan_change_not_implemented", implementedAfter: "checkout_portal_sync" }, 501);
  });
}
