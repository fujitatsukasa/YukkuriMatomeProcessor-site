import type { Env, JsonMap } from "./types";

export type StripeMap = JsonMap & {
  id?: string;
  url?: string;
  amount?: number;
  amount_refunded?: number;
  charge?: string | StripeMap | null;
  refunded?: boolean;
  payment_intent?: string | StripeMap | null;
  customer?: string | StripeMap | null;
  subscription?: string | StripeMap | null;
  status?: string;
  payment_status?: string;
  livemode?: boolean;
  cancel_at_period_end?: boolean;
  current_period_end?: number;
  metadata?: Record<string, string>;
};

export function stringValue(value: unknown): string {
  return typeof value === "string" ? value : "";
}

export function boolValue(value: unknown): boolean {
  return value === true;
}

export function stripeObjectId(value: unknown): string {
  if (typeof value === "string") return value;
  if (value && typeof value === "object" && "id" in value) {
    const id = (value as { id?: unknown }).id;
    return typeof id === "string" ? id : "";
  }
  return "";
}

export function expectedStripeLivemode(env: Env): boolean | null {
  const environment = String(env.ENVIRONMENT ?? "").trim().toLowerCase();
  if (environment === "production") return true;
  if (["sandbox", "development", "dev", "test"].includes(environment)) return false;
  return null;
}

export function assertStripeSecretKeyMatchesEnvironment(env: Env): void {
  const expected = expectedStripeLivemode(env);
  if (expected === null) return;
  const secretKey = String(env.STRIPE_SECRET_KEY ?? "").trim();
  if (expected && !secretKey.startsWith("sk_live_") && !secretKey.startsWith("rk_live_")) {
    throw new Error("stripe_live_key_required");
  }
  if (!expected && !secretKey.startsWith("sk_test_") && !secretKey.startsWith("rk_test_")) {
    throw new Error("stripe_test_key_required");
  }
}

export function assertStripeLivemodeMatchesEnvironment(env: Env, livemode: unknown, label: string): void {
  const expected = expectedStripeLivemode(env);
  if (expected === null) return;
  if (typeof livemode !== "boolean") {
    throw new Error(`${label}_livemode_missing`);
  }
  if (livemode !== expected) {
    throw new Error(`${label}_livemode_mismatch`);
  }
}

export async function stripeRequest<T extends JsonMap>(
  env: Env,
  path: string,
  init: {
    method?: "GET" | "POST";
    params?: URLSearchParams;
    idempotencyKey?: string;
  } = {},
): Promise<T> {
  assertStripeSecretKeyMatchesEnvironment(env);
  const headers = new Headers({
    Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
  });
  if (init.method !== "GET") {
    headers.set("Content-Type", "application/x-www-form-urlencoded");
  }
  if (init.idempotencyKey) {
    headers.set("Idempotency-Key", init.idempotencyKey);
  }
  const query = init.method === "GET" && init.params ? `?${init.params.toString()}` : "";
  const response = await fetch(`https://api.stripe.com/v1${path}${query}`, {
    method: init.method ?? "POST",
    headers,
    body: init.method === "GET" ? undefined : init.params,
  });
  const data = (await response.json()) as JsonMap;
  if (!response.ok) {
    const error = data.error && typeof data.error === "object" && "message" in data.error
      ? String((data.error as { message?: unknown }).message)
      : `stripe_${response.status}`;
    throw new Error(error);
  }
  return data as T;
}
