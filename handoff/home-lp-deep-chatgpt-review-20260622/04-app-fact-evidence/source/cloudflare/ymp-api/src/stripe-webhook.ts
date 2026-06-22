import type { Context } from "hono";

import { getBillingSnapshot, revokeLifetimeBillingForRefund, updateBillingFromPlan, writeBillingEvent } from "./db";
import { assertStripeLivemodeMatchesEnvironment, boolValue, stripeObjectId, stripeRequest, stringValue, type StripeMap } from "./stripe-client";
import type { Env, Variables } from "./types";
import { errorResponse, hmacSha256Hex, normalizePlanTierFromPurchaseType, nowIso, timingSafeEqualHex } from "./utils";

type AppContext = Context<{ Bindings: Env; Variables: Variables }>;

type StripeEvent = {
  id: string;
  type: string;
  livemode?: boolean;
  created?: number;
  data: {
    object: StripeMap;
  };
};

type StripeEventRow = {
  event_id: string;
  status: "processing" | "done" | "failed";
  locked_until?: string | null;
};

function numberValue(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function isFullyRefundedCharge(charge: StripeMap): boolean {
  const amount = numberValue(charge.amount);
  const amountRefunded = numberValue(charge.amount_refunded);
  if (charge.refunded === true) return true;
  return amount > 0 && amountRefunded >= amount;
}

function chargeRefundAuditSnapshot(charge: StripeMap): StripeMap {
  return {
    id: stringValue(charge.id),
    customer: stripeObjectId(charge.customer) || stringValue(charge.customer),
    payment_intent: stripeObjectId(charge.payment_intent) || stringValue(charge.payment_intent),
    amount: numberValue(charge.amount),
    amount_refunded: numberValue(charge.amount_refunded),
    refunded: charge.refunded === true,
    status: stringValue(charge.status),
  };
}

function refundAuditSnapshot(refund: StripeMap, charge: StripeMap | null): StripeMap {
  return {
    id: stringValue(refund.id),
    charge: stripeObjectId(refund.charge) || stringValue(refund.charge),
    payment_intent: stripeObjectId(refund.payment_intent) || stringValue(refund.payment_intent),
    amount: numberValue(refund.amount),
    status: stringValue(refund.status),
    charge_refund_state: charge ? chargeRefundAuditSnapshot(charge) : null,
  };
}

function parseSignatureHeader(header: string): { timestamp: string; signatures: string[] } {
  const parts = header.split(",").map((part) => part.trim());
  const timestamp = parts.find((part) => part.startsWith("t="))?.slice(2) ?? "";
  const signatures = parts.filter((part) => part.startsWith("v1=")).map((part) => part.slice(3));
  return { timestamp, signatures };
}

async function verifyStripeSignature(env: Env, rawBody: string, signatureHeader: string | null): Promise<boolean> {
  if (!signatureHeader) return false;
  const { timestamp, signatures } = parseSignatureHeader(signatureHeader);
  const ts = Number.parseInt(timestamp, 10);
  if (!timestamp || signatures.length === 0 || !Number.isFinite(ts)) return false;
  if (Math.abs(Date.now() / 1000 - ts) > 5 * 60) return false;
  const expected = await hmacSha256Hex(env.STRIPE_WEBHOOK_SECRET, `${timestamp}.${rawBody}`);
  return signatures.some((signature) => timingSafeEqualHex(signature, expected));
}

async function acquireStripeEventLock(env: Env, event: StripeEvent): Promise<"acquired" | "done" | "busy"> {
  const now = nowIso();
  const lockedUntil = new Date(Date.now() + 5 * 60 * 1000).toISOString().replace(/\.\d{3}Z$/, "Z");
  const result = await env.DB.prepare(`
    INSERT INTO stripe_events (
      event_id, type, status, attempt_count, locked_until, last_attempt_at, event_created, started_at
    )
    VALUES (?, ?, 'processing', 1, ?, ?, ?, ?)
    ON CONFLICT(event_id) DO UPDATE SET
      status = 'processing',
      attempt_count = stripe_events.attempt_count + 1,
      locked_until = excluded.locked_until,
      last_attempt_at = excluded.last_attempt_at,
      last_error = NULL
    WHERE
      stripe_events.status = 'failed'
      OR (
        stripe_events.status = 'processing'
        AND (stripe_events.locked_until IS NULL OR stripe_events.locked_until <= ?)
      )
  `).bind(event.id, event.type, lockedUntil, now, event.created ?? null, now, now).run();
  const row = await env.DB.prepare(`
    SELECT event_id, status, locked_until
    FROM stripe_events
    WHERE event_id = ?
  `).bind(event.id).first<StripeEventRow>();
  if (row?.status === "done") return "done";
  const changes = Number((result.meta as { changes?: number }).changes ?? 0);
  return changes > 0 ? "acquired" : "busy";
}

async function markStripeEventDone(env: Env, event: StripeEvent, userId?: string, object?: StripeMap): Promise<void> {
  const objectId = object ? stringValue(object.id) : "";
  const subscriptionId = object
    ? stripeObjectId(object.subscription) || (objectId.startsWith("sub_") ? objectId : null)
    : null;
  await env.DB.prepare(`
    UPDATE stripe_events
    SET status = 'done',
      user_id = COALESCE(?, user_id),
      customer_id = COALESCE(?, customer_id),
      subscription_id = COALESCE(?, subscription_id),
      session_id = COALESCE(?, session_id),
      purchase_type = COALESCE(?, purchase_type),
      done_at = ?,
      locked_until = NULL,
      last_error = NULL
    WHERE event_id = ?
  `).bind(
    userId ?? null,
    object ? stripeObjectId(object.customer) : null,
    subscriptionId,
    objectId.startsWith("cs_") ? objectId : null,
    object?.metadata?.purchase_type ?? null,
    nowIso(),
    event.id,
  ).run();
}

async function markStripeEventFailed(env: Env, eventId: string, error: unknown): Promise<void> {
  await env.DB.prepare(`
    UPDATE stripe_events
    SET status = 'failed',
      last_error = ?,
      error = ?,
      locked_until = NULL
    WHERE event_id = ?
  `).bind(String(error instanceof Error ? error.message : error).slice(0, 1000), String(error).slice(0, 1000), eventId).run();
}

async function archiveRawWebhook(env: Env, event: StripeEvent, rawBody: string): Promise<void> {
  if (!env.ARCHIVE_BUCKET) return;
  const date = new Date((event.created ?? Math.floor(Date.now() / 1000)) * 1000);
  const yyyy = date.getUTCFullYear();
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(date.getUTCDate()).padStart(2, "0");
  const key = `stripe-events/${yyyy}/${mm}/${dd}/${event.id}.json`;
  await env.ARCHIVE_BUCKET.put(key, rawBody, {
    httpMetadata: { contentType: "application/json" },
  });
  await env.DB.prepare(`
    UPDATE stripe_events
    SET raw_archived_at = ?
    WHERE event_id = ?
  `).bind(nowIso(), event.id).run();
}

async function resolveUserId(env: Env, object: StripeMap): Promise<string> {
  const metadataUserId = object.metadata?.user_id;
  if (metadataUserId) return metadataUserId;
  const customerId = stripeObjectId(object.customer);
  if (customerId) {
    const byCustomer = await env.DB.prepare(`
      SELECT user_id
      FROM billing_state
      WHERE stripe_customer_id = ?
    `).bind(customerId).first<{ user_id: string }>();
    if (byCustomer?.user_id) return byCustomer.user_id;
  }
  const subscriptionId = stripeObjectId(object.subscription) || (stringValue(object.id).startsWith("sub_") ? stringValue(object.id) : "");
  if (subscriptionId) {
    const bySubscription = await env.DB.prepare(`
      SELECT user_id
      FROM billing_state
      WHERE stripe_subscription_id = ?
    `).bind(subscriptionId).first<{ user_id: string }>();
    if (bySubscription?.user_id) return bySubscription.user_id;
  }
  return "";
}

async function applyCheckoutCompleted(env: Env, event: StripeEvent): Promise<string> {
  const session = event.data.object;
  const userId = await resolveUserId(env, session);
  if (!userId) throw new Error("checkout_user_not_resolved");
  const purchaseType = session.metadata?.purchase_type ?? "";
  const subscriptionId = stripeObjectId(session.subscription);
  if (!subscriptionId && stringValue(session.payment_status) && stringValue(session.payment_status) !== "paid") {
    throw new Error("checkout_payment_not_paid");
  }
  let subscription: StripeMap | null = null;
  if (subscriptionId) {
    subscription = await stripeRequest<StripeMap>(env, `/subscriptions/${subscriptionId}`, { method: "GET" });
  }
  const planTier = normalizePlanTierFromPurchaseType(purchaseType);
  await updateBillingFromPlan(env, {
    userId,
    planTier,
    purchaseType,
    stripeCustomerId: stripeObjectId(session.customer),
    stripeSubscriptionId: subscriptionId || null,
    subscriptionStatus: subscription ? stringValue(subscription.status) || "active" : "active",
    cancelAtPeriodEnd: subscription ? boolValue(subscription.cancel_at_period_end) : false,
    entitlementExpiry: typeof subscription?.current_period_end === "number"
      ? new Date(subscription.current_period_end * 1000).toISOString().replace(/\.\d{3}Z$/, "Z")
      : null,
    source: "webhook",
    sourceId: event.id,
  });
  const guardId = session.metadata?.checkout_guard_id;
  if (guardId) {
    await env.DB.prepare(`
      UPDATE checkout_guards
      SET status = 'completed', completed_at = ?, session_id = COALESCE(session_id, ?)
      WHERE guard_id = ?
    `).bind(nowIso(), stringValue(session.id), guardId).run();
  }
  return userId;
}

async function applySubscriptionEvent(env: Env, event: StripeEvent): Promise<string> {
  const object = event.data.object;
  const userId = await resolveUserId(env, object);
  if (!userId) throw new Error("subscription_user_not_resolved");
  const purchaseType = object.metadata?.purchase_type ?? (await getBillingSnapshot(env, userId)).premiumType;
  const status = event.type === "customer.subscription.deleted" ? "canceled" : stringValue(object.status) || "active";
  await updateBillingFromPlan(env, {
    userId,
    planTier: status === "canceled" ? "free" : normalizePlanTierFromPurchaseType(purchaseType),
    purchaseType,
    stripeCustomerId: stripeObjectId(object.customer),
    stripeSubscriptionId: stringValue(object.id),
    subscriptionStatus: status,
    cancelAtPeriodEnd: boolValue(object.cancel_at_period_end),
    entitlementExpiry: typeof object.current_period_end === "number"
      ? new Date(object.current_period_end * 1000).toISOString().replace(/\.\d{3}Z$/, "Z")
      : null,
    source: "webhook",
    sourceId: event.id,
  });
  return userId;
}

async function applyInvoicePaid(env: Env, event: StripeEvent): Promise<string> {
  const invoice = event.data.object;
  const subscriptionId = stripeObjectId(invoice.subscription);
  if (!subscriptionId) return "";
  const subscription = await stripeRequest<StripeMap>(env, `/subscriptions/${subscriptionId}`, { method: "GET" });
  return applySubscriptionEvent(env, { ...event, data: { object: subscription } });
}

async function applyPaymentFailure(env: Env, event: StripeEvent): Promise<string> {
  const invoice = event.data.object;
  const userId = await resolveUserId(env, invoice);
  if (!userId) return "";
  const billing = await getBillingSnapshot(env, userId);
  await updateBillingFromPlan(env, {
    userId,
    planTier: billing.planTier,
    purchaseType: billing.premiumType || billing.subscriptionPlan,
    stripeCustomerId: stripeObjectId(invoice.customer) || billing.stripeCustomerId,
    stripeSubscriptionId: stripeObjectId(invoice.subscription) || billing.stripeSubscriptionId,
    subscriptionStatus: "past_due",
    source: "webhook",
    sourceId: event.id,
  });
  return userId;
}

async function applyChargeRefunded(env: Env, event: StripeEvent): Promise<string> {
  const charge = event.data.object;
  const userId = await resolveUserId(env, charge);
  if (!userId) return "";

  const billing = await getBillingSnapshot(env, userId);
  const fullRefund = isFullyRefundedCharge(charge);
  const auditSnapshot = chargeRefundAuditSnapshot(charge);
  await writeBillingEvent(env, {
    userId,
    source: "webhook",
    sourceId: event.id,
    eventType: fullRefund ? "charge_refunded_full_seen" : "charge_refunded_partial_seen",
    before: billing,
    after: auditSnapshot,
  });

  const hasLifetimeEntitlement =
    billing.lifetimePlan === "premium_lifetime" ||
    billing.premiumType === "premium_lifetime" ||
    ((billing.planTier === "premium" || billing.planTier === "pro") && !billing.stripeSubscriptionId);
  if (!fullRefund || !hasLifetimeEntitlement) return userId;

  await revokeLifetimeBillingForRefund(env, {
    userId,
    source: "webhook",
    sourceId: event.id,
    refundObject: auditSnapshot,
  });
  return userId;
}

async function applyRefundEvent(env: Env, event: StripeEvent): Promise<string> {
  const refund = event.data.object;
  const chargeId = stripeObjectId(refund.charge) || stringValue(refund.charge);
  const charge = chargeId ? await stripeRequest<StripeMap>(env, `/charges/${chargeId}`, { method: "GET" }) : null;
  const userId = charge ? await resolveUserId(env, charge) : await resolveUserId(env, refund);
  if (!userId) return "";

  const billing = await getBillingSnapshot(env, userId);
  const auditSnapshot = refundAuditSnapshot(refund, charge);
  await writeBillingEvent(env, {
    userId,
    source: "webhook",
    sourceId: event.id,
    eventType: `${event.type.replace(/\./g, "_")}_seen`,
    before: billing,
    after: auditSnapshot,
  });

  const refundStatus = stringValue(refund.status);
  if (event.type === "refund.failed" || (refundStatus && refundStatus !== "succeeded")) {
    return userId;
  }
  if (!charge) return userId;

  const hasLifetimeEntitlement =
    billing.lifetimePlan === "premium_lifetime" ||
    billing.premiumType === "premium_lifetime" ||
    ((billing.planTier === "premium" || billing.planTier === "pro") && !billing.stripeSubscriptionId);
  if (!isFullyRefundedCharge(charge) || !hasLifetimeEntitlement) return userId;

  await revokeLifetimeBillingForRefund(env, {
    userId,
    source: "webhook",
    sourceId: event.id,
    refundObject: auditSnapshot,
  });
  return userId;
}

async function handleStripeEvent(env: Env, event: StripeEvent): Promise<string> {
  if (event.type === "checkout.session.completed") return applyCheckoutCompleted(env, event);
  if (event.type === "invoice.paid") return applyInvoicePaid(env, event);
  if (event.type === "invoice.payment_failed") return applyPaymentFailure(env, event);
  if (event.type === "customer.subscription.updated" || event.type === "customer.subscription.deleted") {
    return applySubscriptionEvent(env, event);
  }
  if (event.type === "charge.refunded") return applyChargeRefunded(env, event);
  if (event.type === "refund.created" || event.type === "refund.updated" || event.type === "refund.failed") {
    return applyRefundEvent(env, event);
  }
  return "";
}

export async function stripeWebhook(c: AppContext): Promise<Response> {
  const rawBody = await c.req.text();
  if (!(await verifyStripeSignature(c.env, rawBody, c.req.header("stripe-signature") ?? null))) {
    return errorResponse("invalid_stripe_signature", 400);
  }

  const event = JSON.parse(rawBody) as StripeEvent;
  if (!event.id || !event.type) return errorResponse("invalid_stripe_event", 400);
  try {
    assertStripeLivemodeMatchesEnvironment(c.env, event.livemode, "stripe_event");
  } catch (error) {
    return errorResponse("stripe_event_livemode_mismatch", 400, { detail: error instanceof Error ? error.message : String(error) });
  }
  const lock = await acquireStripeEventLock(c.env, event);
  if (lock === "done") return Response.json({ ok: true, duplicate: true });
  if (lock === "busy") return errorResponse("stripe_event_processing", 500);

  let userId = "";
  try {
    await archiveRawWebhook(c.env, event, rawBody);
    userId = await handleStripeEvent(c.env, event);
    await markStripeEventDone(c.env, event, userId, event.data.object);
    return Response.json({ ok: true });
  } catch (error) {
    await markStripeEventFailed(c.env, event.id, error);
    return errorResponse("stripe_webhook_failed", 500, { detail: error instanceof Error ? error.message : String(error) });
  }
}
