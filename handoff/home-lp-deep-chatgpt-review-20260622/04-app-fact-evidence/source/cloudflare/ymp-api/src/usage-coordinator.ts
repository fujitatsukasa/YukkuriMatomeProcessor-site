import { DurableObject } from "cloudflare:workers";

import { isAdminModeDevice, jstDayKey, nextJstMidnightIso } from "./db";
import type { Env, UsageFeatureKey, UsageMutationPayload } from "./types";
import { intEnv, nowIso } from "./utils";

type UsageLimitRow = {
  user_id: string;
  feature_key: UsageFeatureKey;
  plan_tier: string;
  active_bucket: "oneTime" | "cycle" | "unlimited";
  one_time_granted: number;
  one_time_used: number;
  one_time_reserved: number;
  cycle_granted: number;
  cycle_used: number;
  cycle_reserved: number;
  cycle_period_key?: string | null;
  cycle_end_at?: string | null;
  unlimited: number;
  max_output_chars?: number | null;
};

type UsageRequestRow = {
  request_id: string;
  user_id: string;
  feature_key: UsageFeatureKey;
  units: number;
  allocation_json: string;
  status: "reserved" | "committed" | "released" | "expired";
  reserved_expires_at?: string | null;
};

type Allocation = {
  bucket: "oneTime" | "cycle" | "unlimited";
  units: number;
  adminExempt?: boolean;
  deviceHash?: string | null;
};

type UsageResult = {
  ok: boolean;
  requestId?: string;
  status?: string;
  idempotent?: boolean;
  error?: string;
};

function addSeconds(seconds: number): string {
  return new Date(Date.now() + seconds * 1000).toISOString().replace(/\.\d{3}Z$/, "Z");
}

function parseAllocation(value: string): Allocation {
  const parsed = JSON.parse(value) as Partial<Allocation>;
  if (parsed.bucket === "oneTime" || parsed.bucket === "cycle" || parsed.bucket === "unlimited") {
    return {
      bucket: parsed.bucket,
      units: Number(parsed.units ?? 0),
      adminExempt: parsed.adminExempt === true,
      deviceHash: typeof parsed.deviceHash === "string" ? parsed.deviceHash : null,
    };
  }
  return { bucket: "cycle", units: 0 };
}

export class UsageCoordinator extends DurableObject<Env> {
  async reserve(payload: UsageMutationPayload): Promise<UsageResult> {
    const existing = await this.env.DB.prepare(`
      SELECT request_id, status
      FROM usage_requests
      WHERE request_id = ?
    `).bind(payload.requestId).first<{ request_id: string; status: string }>();
    if (existing) {
      if (existing.status === "released" || existing.status === "expired") {
        return { ok: false, requestId: existing.request_id, status: existing.status, error: `usage_request_${existing.status}` };
      }
      return { ok: true, requestId: existing.request_id, status: existing.status, idempotent: true };
    }

    if (payload.units <= 0) return { ok: false, error: "units_must_be_positive" };
    const adminExempt = await isAdminModeDevice(this.env, payload.userId, payload.deviceHash);
    const limit = await this.loadLimit(payload.userId, payload.featureKey);
    if (!limit) return { ok: false, error: "usage_limit_not_found" };
    if (payload.requestedOutputChars && limit.max_output_chars && payload.requestedOutputChars > limit.max_output_chars) {
      return { ok: false, error: "output_chars_limit_exceeded" };
    }

    const freshLimit = await this.refreshDailyCycleIfNeeded(limit);
    if (!adminExempt) {
      const guard = await this.guardFreeVideoCreate(freshLimit, payload);
      if (!guard.ok) return guard;
    }
    const allocation = adminExempt
      ? { bucket: "unlimited" as const, units: payload.units, adminExempt: true }
      : this.chooseBucket(freshLimit, payload.units);
    if (!allocation) return { ok: false, error: "usage_limit_exceeded" };
    if (payload.featureKey === "videoCreate" && payload.deviceHash) {
      allocation.deviceHash = payload.deviceHash;
    }
    const reservedExpiresAt = addSeconds(intEnv(this.env, "USAGE_RESERVATION_TTL_SECONDS", 30 * 60));
    const now = nowIso();

    const reserveStmt = allocation.bucket === "unlimited"
      ? this.env.DB.prepare("SELECT 1")
      : allocation.bucket === "oneTime"
        ? this.env.DB.prepare(`
          UPDATE usage_limits
          SET one_time_reserved = one_time_reserved + ?, updated_at = ?
          WHERE user_id = ?
            AND feature_key = ?
            AND one_time_used + one_time_reserved + ? <= one_time_granted
        `).bind(payload.units, now, payload.userId, payload.featureKey, payload.units)
        : this.env.DB.prepare(`
          UPDATE usage_limits
          SET cycle_reserved = cycle_reserved + ?, updated_at = ?
          WHERE user_id = ?
            AND feature_key = ?
            AND cycle_used + cycle_reserved + ? <= cycle_granted
        `).bind(payload.units, now, payload.userId, payload.featureKey, payload.units);

    const results = await this.env.DB.batch([
      reserveStmt,
      this.env.DB.prepare(`
        INSERT INTO usage_requests (
          request_id, user_id, feature_key, units, requested_output_chars, allocation_json,
          status, reserved_expires_at, created_at, updated_at
        )
        VALUES (?, ?, ?, ?, ?, ?, 'reserved', ?, ?, ?)
      `).bind(
        payload.requestId,
        payload.userId,
        payload.featureKey,
        payload.units,
        payload.requestedOutputChars ?? null,
        JSON.stringify(allocation),
        reservedExpiresAt,
        now,
        now,
      ),
    ]);
    const changes = Number((results[0].meta as { changes?: number }).changes ?? 1);
    if (allocation.bucket !== "unlimited" && changes !== 1) {
      await this.env.DB.prepare(`
        UPDATE usage_requests
        SET status = 'released', updated_at = ?
        WHERE request_id = ?
      `).bind(nowIso(), payload.requestId).run();
      return { ok: false, error: "usage_limit_exceeded" };
    }
    return { ok: true, requestId: payload.requestId, status: "reserved" };
  }

  async commit(payload: UsageMutationPayload): Promise<UsageResult> {
    const row = await this.loadRequest(payload.requestId, payload.userId);
    if (!row) return { ok: false, error: "usage_request_not_found" };
    if (row.status === "committed") return { ok: true, requestId: row.request_id, status: row.status, idempotent: true };
    if (row.status !== "reserved") return { ok: false, error: `usage_request_${row.status}` };
    if (row.reserved_expires_at && row.reserved_expires_at <= nowIso()) {
      return this.expireRequest(row);
    }
    const allocation = parseAllocation(row.allocation_json);
    const now = nowIso();
    const statements = [
      this.limitMutationStatement(row.user_id, row.feature_key, allocation, "commit", now),
      this.env.DB.prepare(`
        UPDATE usage_requests
        SET status = 'committed', actual_output_chars = COALESCE(?, actual_output_chars), updated_at = ?
        WHERE request_id = ? AND status = 'reserved'
      `).bind(payload.actualOutputChars ?? null, now, row.request_id),
    ];
    if (row.feature_key === "videoCreate" && allocation.deviceHash && allocation.bucket !== "unlimited") {
      statements.push(this.env.DB.prepare(`
        UPDATE free_trial_device_claims
        SET use_count = use_count + ?, last_seen_at = ?
        WHERE device_hash = ? AND feature_key = ?
      `).bind(allocation.units, now, allocation.deviceHash, row.feature_key));
    }
    await this.env.DB.batch(statements);
    return { ok: true, requestId: row.request_id, status: "committed" };
  }

  async release(payload: UsageMutationPayload): Promise<UsageResult> {
    const row = await this.loadRequest(payload.requestId, payload.userId);
    if (!row) return { ok: false, error: "usage_request_not_found" };
    if (row.status === "released") return { ok: true, requestId: row.request_id, status: row.status, idempotent: true };
    if (row.status !== "reserved") return { ok: false, error: `usage_request_${row.status}` };
    const allocation = parseAllocation(row.allocation_json);
    const now = nowIso();
    await this.env.DB.batch([
      this.limitMutationStatement(row.user_id, row.feature_key, allocation, "release", now),
      this.env.DB.prepare(`
        UPDATE usage_requests
        SET status = 'released', updated_at = ?
        WHERE request_id = ? AND status = 'reserved'
      `).bind(now, row.request_id),
    ]);
    return { ok: true, requestId: row.request_id, status: "released" };
  }

  async expireExpired(limit = 200): Promise<{ ok: true; expired: number }> {
    const rows = await this.env.DB.prepare(`
      SELECT request_id, user_id, feature_key, units, allocation_json, status, reserved_expires_at
      FROM usage_requests
      WHERE status = 'reserved'
        AND reserved_expires_at <= ?
      LIMIT ?
    `).bind(nowIso(), limit).all<UsageRequestRow>();
    let expired = 0;
    for (const row of rows.results) {
      const result = await this.expireRequest(row);
      if (result.ok) expired += 1;
    }
    return { ok: true, expired };
  }

  private async loadLimit(userId: string, featureKey: UsageFeatureKey): Promise<UsageLimitRow | null> {
    return this.env.DB.prepare(`
      SELECT *
      FROM usage_limits
      WHERE user_id = ? AND feature_key = ?
    `).bind(userId, featureKey).first<UsageLimitRow>();
  }

  private async loadRequest(requestId: string, userId: string): Promise<UsageRequestRow | null> {
    return this.env.DB.prepare(`
      SELECT request_id, user_id, feature_key, units, allocation_json, status, reserved_expires_at
      FROM usage_requests
      WHERE request_id = ? AND user_id = ?
    `).bind(requestId, userId).first<UsageRequestRow>();
  }

  private async refreshDailyCycleIfNeeded(limit: UsageLimitRow): Promise<UsageLimitRow> {
    if (limit.feature_key !== "videoCreate" || limit.unlimited === 1 || limit.active_bucket === "unlimited") {
      return limit;
    }
    const periodKey = jstDayKey();
    const now = nowIso();
    if (limit.cycle_period_key === periodKey && (!limit.cycle_end_at || limit.cycle_end_at > now)) {
      return limit;
    }
    if (limit.cycle_reserved > 0) {
      return limit;
    }
    await this.env.DB.prepare(`
      UPDATE usage_limits
      SET cycle_granted = 1,
          cycle_used = 0,
          cycle_reserved = 0,
          cycle_period_key = ?,
          cycle_end_at = ?,
          updated_at = ?
      WHERE user_id = ? AND feature_key = ?
    `).bind(periodKey, nextJstMidnightIso(), now, limit.user_id, limit.feature_key).run();
    return {
      ...limit,
      cycle_granted: 1,
      cycle_used: 0,
      cycle_reserved: 0,
      cycle_period_key: periodKey,
      cycle_end_at: nextJstMidnightIso(),
    };
  }

  private async guardFreeVideoCreate(limit: UsageLimitRow, payload: UsageMutationPayload): Promise<UsageResult> {
    if (limit.feature_key !== "videoCreate" || limit.unlimited === 1 || limit.active_bucket === "unlimited") {
      return { ok: true };
    }
    if (payload.ipHash) {
      const periodKey = jstDayKey();
      const now = nowIso();
      const windowStart = Math.floor(new Date(`${periodKey}T00:00:00+09:00`).getTime() / 1000);
      const rateKey = `usage:videoCreate:ip:${payload.ipHash}:${periodKey}`;
      await this.env.DB.prepare(`
        INSERT INTO api_rate_limit_buckets (rate_key, endpoint, user_id, window_start, window_seconds, count, updated_at)
        VALUES (?, 'usage.videoCreate.reserve', ?, ?, 86400, 1, ?)
        ON CONFLICT(rate_key, window_start) DO UPDATE SET
          count = count + 1,
          updated_at = excluded.updated_at
      `).bind(rateKey, payload.userId, windowStart, now).run();
      const bucket = await this.env.DB.prepare(`
        SELECT count
        FROM api_rate_limit_buckets
        WHERE rate_key = ? AND window_start = ?
      `).bind(rateKey, windowStart).first<{ count: number }>();
      if (Number(bucket?.count ?? 0) > 80) {
        return { ok: false, error: "usage_ip_rate_limited" };
      }
    }
    if (!payload.deviceHash) {
      return { ok: true };
    }
    const now = nowIso();
    await this.env.DB.prepare(`
      INSERT INTO free_trial_device_claims (device_hash, feature_key, user_id, first_seen_at, last_seen_at, use_count)
      VALUES (?, ?, ?, ?, ?, 0)
      ON CONFLICT(device_hash, feature_key) DO UPDATE SET
        last_seen_at = excluded.last_seen_at
    `).bind(payload.deviceHash, payload.featureKey, payload.userId, now, now).run();
    const claim = await this.env.DB.prepare(`
      SELECT user_id
      FROM free_trial_device_claims
      WHERE device_hash = ? AND feature_key = ?
    `).bind(payload.deviceHash, payload.featureKey).first<{ user_id: string }>();
    if (claim && claim.user_id !== payload.userId) {
      return { ok: false, error: "usage_device_free_limit_exceeded" };
    }
    return { ok: true };
  }

  private chooseBucket(limit: UsageLimitRow, units: number): Allocation | null {
    if (limit.unlimited === 1 || limit.active_bucket === "unlimited") return { bucket: "unlimited", units };
    if (limit.one_time_used + limit.one_time_reserved + units <= limit.one_time_granted) {
      return { bucket: "oneTime", units };
    }
    if (limit.cycle_used + limit.cycle_reserved + units <= limit.cycle_granted) {
      return { bucket: "cycle", units };
    }
    return null;
  }

  private limitMutationStatement(
    userId: string,
    featureKey: UsageFeatureKey,
    allocation: Allocation,
    mode: "commit" | "release" | "expire",
    now: string,
  ): D1PreparedStatement {
    if (allocation.bucket === "unlimited") return this.env.DB.prepare("SELECT 1");
    if (allocation.bucket === "oneTime") {
      const usedDelta = mode === "commit" ? allocation.units : 0;
      return this.env.DB.prepare(`
        UPDATE usage_limits
        SET one_time_reserved = MAX(0, one_time_reserved - ?),
            one_time_used = one_time_used + ?,
            updated_at = ?
        WHERE user_id = ? AND feature_key = ?
      `).bind(allocation.units, usedDelta, now, userId, featureKey);
    }
    const usedDelta = mode === "commit" ? allocation.units : 0;
    return this.env.DB.prepare(`
      UPDATE usage_limits
      SET cycle_reserved = MAX(0, cycle_reserved - ?),
          cycle_used = cycle_used + ?,
          updated_at = ?
      WHERE user_id = ? AND feature_key = ?
    `).bind(allocation.units, usedDelta, now, userId, featureKey);
  }

  private async expireRequest(row: UsageRequestRow): Promise<UsageResult> {
    const allocation = parseAllocation(row.allocation_json);
    const now = nowIso();
    await this.env.DB.batch([
      this.limitMutationStatement(row.user_id, row.feature_key, allocation, "expire", now),
      this.env.DB.prepare(`
        UPDATE usage_requests
        SET status = 'expired', expired_at = ?, updated_at = ?
        WHERE request_id = ? AND status = 'reserved'
      `).bind(now, now, row.request_id),
    ]);
    return { ok: true, requestId: row.request_id, status: "expired" };
  }
}
