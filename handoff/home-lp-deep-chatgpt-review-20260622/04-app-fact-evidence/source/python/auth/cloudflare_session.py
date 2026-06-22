# -*- coding: utf-8 -*-
from __future__ import annotations

import os
import platform
import sys
import time
import json
import importlib
import threading
from contextlib import contextmanager
from collections.abc import Mapping
from pathlib import Path
from typing import Any
from urllib.parse import urlparse

import requests

from python.auth.secure_store import protect_text, unprotect_text
from python.utils import runtime_env_guard


AUTH_PROVIDER_ENV = "YMP_AUTH_PROVIDER"
AUTH_BASE_URL_ENV = "YMP_CLOUDFLARE_AUTH_BASE_URL"
ALLOW_LOCAL_AUTH_ENV = "YMP_ALLOW_LOCAL_CLOUDFLARE_AUTH"
SESSION_STORE_KEY = "user_settings_common_cloudflare_auth"
CLIENT_COMPAT = "cloudflare-billing-v1"
DEFAULT_AUTH_BASE_URL = runtime_env_guard.DEFAULT_CLOUDFLARE_API_BASE_URL
_CONFIG_FILE_NAMES = ("launcher_config.json",)
_CLOUDFLARE_SESSION_PROVIDERS = {"cloudflare", "better-auth", "workers"}
_REFRESH_LOCK_FILE_NAME = ".cloudflare_auth_refresh.lock"
_REFRESH_LOCK_TIMEOUT_SEC = 20.0
_REFRESH_LOCK_POLL_SEC = 0.05
_REFRESH_SESSION_THREAD_LOCK = threading.RLock()
_SENSITIVE_SNAPSHOT_KEYS = {
    "accessToken",
    "access_token",
    "refreshToken",
    "refresh_token",
}


class CloudflareAuthError(RuntimeError):
    pass


def _truthy(value: object) -> bool:
    if isinstance(value, bool):
        return value
    if isinstance(value, (int, float)):
        return value != 0
    return str(value or "").strip().lower() in {"1", "true", "yes", "on", "y", "t"}


def _now_epoch() -> int:
    return int(time.time())


def normalize_base_url(raw_value: str) -> str:
    return str(raw_value or "").strip().rstrip("/")


def _repo_root() -> Path:
    return Path(__file__).resolve().parents[2]


def _read_static_cloudflare_auth_config() -> dict[str, Any]:
    for path in (_repo_root() / "config" / name for name in _CONFIG_FILE_NAMES):
        try:
            if not path.is_file():
                continue
            data = json.loads(path.read_text(encoding="utf-8-sig"))
        except Exception:
            continue
        cloudflare = data.get("cloudflare_auth") if isinstance(data, dict) else {}
        if isinstance(cloudflare, Mapping):
            return dict(cloudflare)
    return {}


def configured_auth_base_url_raw(environ: Mapping[str, str] | None = None) -> str:
    source = os.environ if environ is None else environ
    env_value = str(source.get(AUTH_BASE_URL_ENV) or "").strip()
    if env_value:
        return normalize_base_url(env_value)
    if environ is not None:
        return ""
    config = _read_static_cloudflare_auth_config()
    return normalize_base_url(str(config.get("base_url") or config.get("baseUrl") or DEFAULT_AUTH_BASE_URL))


def is_cloudflare_auth_enabled(environ: Mapping[str, str] | None = None) -> bool:
    source = os.environ if environ is None else environ
    provider = str(source.get(AUTH_PROVIDER_ENV) or "").strip().lower()
    if provider in _CLOUDFLARE_SESSION_PROVIDERS:
        return True
    if provider in {"firebase", "legacy-firebase", "legacy"}:
        return False
    if configured_auth_base_url_raw(environ) or str(source.get(AUTH_BASE_URL_ENV) or "").strip():
        return True
    if environ is None:
        try:
            return str(_store_get().get("provider") or "").strip().lower() == "cloudflare"
        except Exception:
            return False
    return False


def auth_base_url_for_billing(environ: Mapping[str, str] | None = None) -> str:
    if not is_cloudflare_auth_enabled(environ):
        return ""
    return configured_auth_base_url(environ)


def validate_auth_base_url(raw_value: str, *, environ: Mapping[str, str] | None = None) -> str:
    source = os.environ if environ is None else environ
    base_url = normalize_base_url(raw_value)
    if not base_url:
        raise CloudflareAuthError(f"{AUTH_BASE_URL_ENV} が未設定です")
    parsed = urlparse(base_url)
    host = str(parsed.hostname or "").strip()
    scheme = str(parsed.scheme or "").strip().lower()
    if runtime_env_guard.is_local_host(host) and _truthy(source.get(ALLOW_LOCAL_AUTH_ENV)):
        if scheme not in {"http", "https"}:
            raise CloudflareAuthError(f"{AUTH_BASE_URL_ENV}: URLのschemeが不正です")
        return base_url
    ok, detail = runtime_env_guard.validate_https_url(AUTH_BASE_URL_ENV, base_url)
    if not ok:
        raise CloudflareAuthError(detail)
    return base_url


def configured_auth_base_url(environ: Mapping[str, str] | None = None) -> str:
    source = os.environ if environ is None else environ
    return validate_auth_base_url(configured_auth_base_url_raw(environ), environ=source)


def _user_storage_module():
    python_src = str(_repo_root() / "python")
    if python_src not in sys.path:
        sys.path.insert(0, python_src)
    try:
        return importlib.import_module("user_storage")
    except ModuleNotFoundError:
        return importlib.import_module("python.user_storage")


def _user_storage_storage_module():
    python_src = str(_repo_root() / "python")
    if python_src not in sys.path:
        sys.path.insert(0, python_src)
    try:
        return importlib.import_module("user_storage.storage")
    except ModuleNotFoundError:
        return importlib.import_module("python.user_storage.storage")


def _user_storage_attr(name: str):
    return getattr(_user_storage_module(), name)


def _store_get() -> dict[str, Any]:
    try:
        store_get = _user_storage_attr("get")

        data = store_get(SESSION_STORE_KEY, default={}) or {}
    except Exception:
        data = {}
    if isinstance(data, dict) and data:
        return data
    return _legacy_store_get()


def _legacy_store_get() -> dict[str, Any]:
    try:
        storage_mod = _user_storage_storage_module()

        legacy_user_dir = str(storage_mod.legacy_argv_user_dir() or "").strip()
        current_user_dir = str(storage_mod.default_user_dir() or "").strip()
        if not legacy_user_dir:
            return {}
        if os.path.abspath(legacy_user_dir) == os.path.abspath(current_user_dir):
            return {}
        legacy_db = Path(legacy_user_dir) / storage_mod.DB_FILENAME
        if not legacy_db.is_file():
            return {}
        data = storage_mod.get_from_user_dir(legacy_user_dir, SESSION_STORE_KEY, default={}) or {}
        if not isinstance(data, dict):
            return {}
        if str(data.get("provider") or "").strip().lower() != "cloudflare":
            return {}
        if not str(data.get("user_id") or "").strip():
            return {}
        if not str(data.get("refresh_token_enc") or data.get("refresh_token") or "").strip():
            return {}
        _store_set(dict(data))
        return dict(data)
    except Exception:
        return {}


def _store_set(data: dict[str, Any]) -> None:
    store_set = _user_storage_attr("set")

    store_set(SESSION_STORE_KEY, data, flush=True)


def _store_delete() -> None:
    try:
        store_delete = _user_storage_attr("delete")

        store_delete(SESSION_STORE_KEY, flush=True)
    except TypeError:
        store_set = _user_storage_attr("set")

        store_set(SESSION_STORE_KEY, {}, flush=True)


def _refresh_lock_path() -> Path:
    try:
        storage_mod = _user_storage_storage_module()
        user_dir = Path(str(storage_mod.default_user_dir() or "")).resolve()
    except Exception:
        user_dir = (_repo_root() / "user").resolve()
    return user_dir / _REFRESH_LOCK_FILE_NAME


@contextmanager
def _refresh_session_lock(timeout_sec: float = _REFRESH_LOCK_TIMEOUT_SEC):
    lock_path = _refresh_lock_path()
    lock_path.parent.mkdir(parents=True, exist_ok=True)
    deadline = time.monotonic() + max(0.1, float(timeout_sec or _REFRESH_LOCK_TIMEOUT_SEC))
    with _REFRESH_SESSION_THREAD_LOCK:
        with lock_path.open("a+b") as handle:
            handle.seek(0, os.SEEK_END)
            if handle.tell() == 0:
                handle.write(b"\0")
                handle.flush()
            handle.seek(0)
            acquired = False
            if os.name == "nt":
                import msvcrt

                while not acquired:
                    try:
                        handle.seek(0)
                        msvcrt.locking(handle.fileno(), msvcrt.LK_NBLCK, 1)
                        acquired = True
                    except OSError as exc:
                        if time.monotonic() >= deadline:
                            raise CloudflareAuthError("refresh token 更新ロックの取得がタイムアウトしました") from exc
                        time.sleep(_REFRESH_LOCK_POLL_SEC)
                try:
                    yield
                finally:
                    if acquired:
                        handle.seek(0)
                        msvcrt.locking(handle.fileno(), msvcrt.LK_UNLCK, 1)
            else:
                import fcntl

                while not acquired:
                    try:
                        fcntl.flock(handle.fileno(), fcntl.LOCK_EX | fcntl.LOCK_NB)
                        acquired = True
                    except OSError as exc:
                        if time.monotonic() >= deadline:
                            raise CloudflareAuthError("refresh token 更新ロックの取得がタイムアウトしました") from exc
                        time.sleep(_REFRESH_LOCK_POLL_SEC)
                try:
                    yield
                finally:
                    if acquired:
                        fcntl.flock(handle.fileno(), fcntl.LOCK_UN)


def _sanitize_session_snapshot(raw: Mapping[str, Any] | None) -> dict[str, Any]:
    if not isinstance(raw, Mapping):
        return {}
    return {str(key): value for key, value in raw.items() if str(key) not in _SENSITIVE_SNAPSHOT_KEYS}


def auth_response_snapshot(body: Mapping[str, Any] | None, *, fallback: Mapping[str, Any] | None = None) -> dict[str, Any]:
    if not isinstance(body, Mapping):
        return _sanitize_session_snapshot(fallback)
    explicit_me = body.get("me")
    if isinstance(explicit_me, Mapping):
        snapshot = _sanitize_session_snapshot(explicit_me)
        return snapshot or _sanitize_session_snapshot(fallback)
    snapshot: dict[str, Any] = {}
    for key in (
        "user",
        "billing",
        "usage",
        "usageSummary",
        "planTier",
        "adminMode",
        "serverMinClientVersion",
        "requiredClientCompat",
    ):
        if key in body:
            snapshot[key] = body.get(key)
    return _sanitize_session_snapshot(snapshot) or _sanitize_session_snapshot(fallback)


def _safe_int(value: Any, default: int = 0) -> int:
    try:
        return int(value)
    except (TypeError, ValueError):
        return default


def _safe_bool(value: Any) -> bool:
    if isinstance(value, bool):
        return value
    if isinstance(value, (int, float)):
        return bool(int(value))
    return str(value or "").strip().lower() in {"1", "true", "yes", "on", "y", "t"}


def _pick(row: Mapping[str, Any], *keys: str) -> Any:
    for key in keys:
        if key in row:
            return row.get(key)
    return None


def _feature_label(feature_key: str) -> str:
    if feature_key == "scriptFetch":
        return "台本取得"
    if feature_key == "scriptGeneration":
        return "台本生成"
    if feature_key == "videoCreate":
        return "動画作成"
    return feature_key


def _usage_summary_from_rows(rows: Any, *, plan_tier: str = "") -> dict[str, Any]:
    if not isinstance(rows, list):
        return {}
    features: dict[str, Any] = {}
    resolved_plan_tier = str(plan_tier or "").strip()
    updated_at = ""
    for raw in rows:
        if not isinstance(raw, Mapping):
            continue
        feature_key = str(_pick(raw, "feature_key", "featureKey") or "").strip()
        if not feature_key:
            continue
        row_plan_tier = str(_pick(raw, "plan_tier", "planTier") or "").strip()
        if row_plan_tier and not resolved_plan_tier:
            resolved_plan_tier = row_plan_tier
        active_bucket = str(_pick(raw, "active_bucket", "activeBucket") or "oneTime").strip() or "oneTime"
        unlimited = _safe_bool(_pick(raw, "unlimited"))
        one_time_granted = max(0, _safe_int(_pick(raw, "one_time_granted", "oneTimeGranted")))
        one_time_used = max(0, _safe_int(_pick(raw, "one_time_used", "oneTimeUsed")))
        one_time_reserved = max(0, _safe_int(_pick(raw, "one_time_reserved", "oneTimeReserved")))
        cycle_granted = max(0, _safe_int(_pick(raw, "cycle_granted", "cycleGranted")))
        cycle_used = max(0, _safe_int(_pick(raw, "cycle_used", "cycleUsed")))
        cycle_reserved = max(0, _safe_int(_pick(raw, "cycle_reserved", "cycleReserved")))
        one_time_remaining = max(0, one_time_granted - one_time_used - one_time_reserved)
        cycle_remaining = max(0, cycle_granted - cycle_used - cycle_reserved)
        if unlimited:
            granted = None
            used = 0
            reserved = 0
            remaining = None
            active_bucket = "unlimited"
        elif feature_key == "videoCreate":
            granted = one_time_granted + cycle_granted
            used = one_time_used + cycle_used
            reserved = one_time_reserved + cycle_reserved
            remaining = one_time_remaining + cycle_remaining
        elif active_bucket == "cycle":
            granted = cycle_granted
            used = cycle_used
            reserved = cycle_reserved
            remaining = cycle_remaining
        else:
            granted = one_time_granted
            used = one_time_used
            reserved = one_time_reserved
            remaining = one_time_remaining
        updated_at = str(_pick(raw, "updated_at", "updatedAt") or updated_at or "").strip()
        features[feature_key] = {
            "featureKey": feature_key,
            "featureLabel": _feature_label(feature_key),
            "activeBucket": active_bucket,
            "unlimited": unlimited,
            "remaining": remaining,
            "granted": granted,
            "used": used,
            "reserved": reserved,
            "maxOutputChars": _safe_int(_pick(raw, "max_output_chars", "maxOutputChars")),
            "initialGranted": one_time_granted,
            "initialUsed": one_time_used,
            "initialReserved": one_time_reserved,
            "initialRemaining": one_time_remaining,
            "serviceCreditGranted": one_time_granted,
            "serviceCreditUsed": one_time_used,
            "serviceCreditReserved": one_time_reserved,
            "serviceCreditRemaining": one_time_remaining,
            "cycleGranted": cycle_granted,
            "cycleUsed": cycle_used,
            "cycleReserved": cycle_reserved,
            "cycleRemaining": cycle_remaining,
            "dailyGranted": cycle_granted,
            "dailyUsed": cycle_used,
            "dailyReserved": cycle_reserved,
            "dailyRemaining": cycle_remaining,
            "periodKey": str(_pick(raw, "cycle_period_key", "periodKey") or "").strip(),
            "cycleEndAt": str(_pick(raw, "cycle_end_at", "cycleEndAt") or "").strip(),
        }
    if not features:
        return {}
    return {
        "version": 1,
        "planTier": resolved_plan_tier or "free",
        "updatedAt": updated_at,
        "features": features,
    }


def load_session() -> dict[str, Any]:
    data = _store_get()
    if not data:
        return {}
    provider = str(data.get("provider") or "").strip().lower()
    if provider not in _CLOUDFLARE_SESSION_PROVIDERS:
        return {}
    out = dict(data)
    for public_key, encrypted_key in (
        ("access_token", "access_token_enc"),
        ("refresh_token", "refresh_token_enc"),
    ):
        encrypted = str(out.get(encrypted_key) or "").strip()
        plain = str(out.get(public_key) or "").strip()
        if encrypted:
            out[public_key] = unprotect_text(encrypted)
        elif plain:
            out[encrypted_key] = protect_text(plain)
            out.pop(public_key, None)
            try:
                _store_set(out)
            except Exception:
                pass
            out[public_key] = plain
    return out


def save_session(
    *,
    user_id: str,
    email: str = "",
    access_token: str = "",
    refresh_token: str = "",
    expires_in: int = 0,
    display_name: str = "",
    me: Mapping[str, Any] | None = None,
    verified_at_epoch: int = 0,
) -> dict[str, Any]:
    now = _now_epoch()
    ttl = max(0, int(expires_in or 0))
    data = {
        "provider": "cloudflare",
        "user_id": str(user_id or ""),
        "email": str(email or ""),
        "display_name": str(display_name or user_id or ""),
        "access_token_enc": protect_text(str(access_token or "")),
        "refresh_token_enc": protect_text(str(refresh_token or "")),
        "access_token_expires_at": now + ttl if ttl else 0,
        "updated_at_epoch": now,
        "me": _sanitize_session_snapshot(me),
    }
    if int(verified_at_epoch or 0) > 0:
        data["verified_at_epoch"] = int(verified_at_epoch or 0)
    data.pop("access_token", None)
    data.pop("refresh_token", None)
    _store_set(data)
    return load_session()


def update_session_me(patch: Mapping[str, Any], *, verified: bool = False) -> dict[str, Any]:
    data = _store_get()
    if not data:
        return {}
    current = data.get("me") if isinstance(data.get("me"), Mapping) else {}
    merged = dict(current or {})
    merged.update(_sanitize_session_snapshot(patch))
    data["me"] = merged
    data["updated_at_epoch"] = _now_epoch()
    if verified:
        data["verified_at_epoch"] = data["updated_at_epoch"]
    _store_set(data)
    return load_session()


def clear_session() -> None:
    _store_delete()


def get_current_user_id() -> str:
    return str(load_session().get("user_id") or "").strip()


def _normalize_billing_snapshot(raw: Mapping[str, Any]) -> dict[str, Any]:
    billing = raw.get("billing") if isinstance(raw.get("billing"), Mapping) else raw
    if not isinstance(billing, Mapping):
        billing = {}
    lifetime_plan = str(billing.get("lifetimePlan") or billing.get("lifetime_plan") or "").strip()
    subscription_plan = str(billing.get("subscriptionPlan") or billing.get("subscription_plan") or "").strip()
    premium_type = str(billing.get("premiumType") or billing.get("premium_type") or "").strip()
    plan = str(
        billing.get("plan")
        or subscription_plan
        or lifetime_plan
        or billing.get("purchaseType")
        or billing.get("purchase_type")
        or ""
    ).strip()
    plan_tier = str(billing.get("planTier") or billing.get("plan_tier") or raw.get("planTier") or raw.get("plan_tier") or "").strip()
    if not plan and premium_type in {"premium_lifetime", "lifetime"}:
        plan = "premium_lifetime"
    if not plan and plan_tier:
        plan = plan_tier
    membership = str(billing.get("membershipStatus") or billing.get("membership_status") or "").strip()
    if membership == "premium":
        membership = "pro"
    if not membership:
        if plan_tier in {"premium", "pro"}:
            membership = "pro"
        elif plan_tier == "standard":
            membership = "pro"
        else:
            membership = "free"
    return {
        "membershipStatus": membership,
        "premiumType": premium_type,
        "plan": plan,
        "billingPlan": plan,
        "lifetimePlan": lifetime_plan,
        "subscriptionPlan": subscription_plan,
        "planTier": plan_tier or "free",
        "isPremium": bool(billing.get("isPremium") or billing.get("is_premium")),
        "subscriptionStatus": str(billing.get("subscriptionStatus") or billing.get("subscription_status") or "").strip(),
        "cancelAtPeriodEnd": bool(billing.get("cancelAtPeriodEnd") or billing.get("cancel_at_period_end")),
        "stripeCustomerId": str(billing.get("stripeCustomerId") or billing.get("stripe_customer_id") or "").strip(),
        "stripeSubscriptionId": str(billing.get("stripeSubscriptionId") or billing.get("stripe_subscription_id") or "").strip(),
        "entitlementExpiry": str(billing.get("entitlementExpiry") or billing.get("entitlement_expiry") or "").strip(),
        "purchasedAt": str(billing.get("purchasedAt") or billing.get("purchased_at") or "").strip(),
    }


def get_current_user_data() -> dict[str, Any]:
    session = load_session()
    me = session.get("me") if isinstance(session.get("me"), Mapping) else {}
    user = me.get("user") if isinstance(me.get("user"), Mapping) else {}
    data = _normalize_billing_snapshot(me if isinstance(me, Mapping) else {})
    usage_summary = me.get("usageSummary") if isinstance(me.get("usageSummary"), Mapping) else {}
    if not usage_summary:
        usage_summary = _usage_summary_from_rows(me.get("usage"), plan_tier=str(data.get("planTier") or ""))
    if usage_summary:
        data["usageSummary"] = usage_summary
        data["planTier"] = str(data.get("planTier") or usage_summary.get("planTier") or "free")
    if isinstance(me.get("usage"), list):
        data["usage"] = list(me.get("usage") or [])
    data["adminMode"] = _safe_bool(me.get("adminMode"))
    data.update(
        {
            "uid": str(session.get("user_id") or user.get("id") or "").strip(),
            "user_id": str(session.get("user_id") or user.get("id") or "").strip(),
            "email": str(session.get("email") or user.get("email") or "").strip(),
            "displayName": str(session.get("display_name") or user.get("name") or "").strip(),
            "login_info": {},
        }
    )
    return data


def _endpoint(base_url: str, path: str) -> str:
    base = normalize_base_url(base_url)
    suffix = "/" + str(path or "").lstrip("/")
    return f"{base}{suffix}"


def client_headers(access_token: str = "") -> dict[str, str]:
    headers = {
        "X-YMP-App-Version": str(os.environ.get("YMP_APP_VERSION") or "0.0.0"),
        "X-YMP-Client-Compat": str(os.environ.get("YMP_CLIENT_COMPAT") or CLIENT_COMPAT),
        "X-YMP-Platform": str(os.environ.get("YMP_PLATFORM") or platform.system().lower() or "unknown"),
    }
    token = str(access_token or "").strip()
    if token:
        headers["Authorization"] = f"Bearer {token}"
    return headers


def refresh_session(
    *,
    api_base_url: str = "",
    http_session: requests.Session | None = None,
    timeout_sec: int = 15,
    reuse_fresh_access: bool = False,
) -> str:
    before_lock = load_session()
    before_refresh_token = str(before_lock.get("refresh_token") or "").strip()
    with _refresh_session_lock():
        session = load_session()
        refresh_token = str(session.get("refresh_token") or "").strip()
        access_token = str(session.get("access_token") or "").strip()
        expires_at = int(session.get("access_token_expires_at") or 0)
        access_token_is_fresh = bool(access_token and (not expires_at or expires_at - _now_epoch() > 30))
        if access_token_is_fresh:
            if reuse_fresh_access:
                return access_token
            if before_refresh_token and refresh_token and refresh_token != before_refresh_token:
                return access_token
        if not refresh_token:
            raise CloudflareAuthError("refresh token がありません")
        base_url = validate_auth_base_url(api_base_url or configured_auth_base_url_raw())
        http = http_session or requests.Session()
        response = http.post(
            _endpoint(base_url, "/api/desktop/refresh"),
            json={"refreshToken": refresh_token},
            headers=client_headers(),
            timeout=int(timeout_sec),
        )
        try:
            body = response.json() if response.text.strip() else {}
        except ValueError as exc:
            raise CloudflareAuthError("refresh応答のJSON解析に失敗しました") from exc
        if response.status_code >= 400 or not isinstance(body, dict):
            message = str(body.get("error") if isinstance(body, dict) else "") or f"HTTP {response.status_code}"
            raise CloudflareAuthError(message)
        access_token = str(body.get("accessToken") or body.get("access_token") or "").strip()
        new_refresh = str(body.get("refreshToken") or body.get("refresh_token") or refresh_token).strip()
        if not access_token:
            raise CloudflareAuthError("refresh応答にaccess tokenがありません")
        existing_me = session.get("me") if isinstance(session.get("me"), Mapping) else {}
        me = auth_response_snapshot(body, fallback=existing_me)
        me_user = me.get("user") if isinstance(me.get("user"), Mapping) else {}
        user = body.get("user") if isinstance(body.get("user"), Mapping) else me_user
        save_session(
            user_id=str(body.get("userId") or user.get("id") or session.get("user_id") or ""),
            email=str(body.get("email") or user.get("email") or session.get("email") or ""),
            display_name=str(user.get("name") or session.get("display_name") or ""),
            access_token=access_token,
            refresh_token=new_refresh,
            expires_in=int(body.get("expiresIn") or body.get("expires_in") or 0),
            me=me if isinstance(me, Mapping) else {},
            verified_at_epoch=int(session.get("verified_at_epoch") or 0),
        )
        return access_token


def fetch_me(
    *,
    api_base_url: str = "",
    access_token: str = "",
    http_session: requests.Session | None = None,
    timeout_sec: int = 15,
) -> dict[str, Any]:
    token = str(access_token or "").strip() or get_access_token(refresh=True)
    if not token:
        raise CloudflareAuthError("access token がありません")
    base_url = validate_auth_base_url(api_base_url or configured_auth_base_url_raw())
    http = http_session or requests.Session()
    response = http.get(
        _endpoint(base_url, "/api/me"),
        headers=client_headers(token),
        timeout=int(timeout_sec),
    )
    try:
        body = response.json() if response.text.strip() else {}
    except ValueError as exc:
        raise CloudflareAuthError("/api/me 応答のJSON解析に失敗しました") from exc
    if response.status_code >= 400 or not isinstance(body, dict):
        message = str(body.get("error") if isinstance(body, dict) else "") or f"HTTP {response.status_code}"
        raise CloudflareAuthError(message)
    snapshot = auth_response_snapshot(body, fallback=body)
    session = load_session()
    user = body.get("user") if isinstance(body.get("user"), Mapping) else {}
    user_id = str(body.get("userId") or user.get("id") or session.get("user_id") or "").strip()
    email = str(body.get("email") or user.get("email") or session.get("email") or "").strip()
    display_name = str(user.get("name") or session.get("display_name") or user_id or "").strip()
    if user_id or email or display_name:
        data = _store_get()
        if data:
            if user_id:
                data["user_id"] = user_id
            if email:
                data["email"] = email
            if display_name:
                data["display_name"] = display_name
            _store_set(data)
    update_session_me(snapshot, verified=True)
    return body


def get_access_token(*, refresh: bool = True) -> str:
    session = load_session()
    token = str(session.get("access_token") or "").strip()
    expires_at = int(session.get("access_token_expires_at") or 0)
    if token and (not expires_at or expires_at - _now_epoch() > 30):
        return token
    if not refresh:
        return token
    return refresh_session(reuse_fresh_access=True)
