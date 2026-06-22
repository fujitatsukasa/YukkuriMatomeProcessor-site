# -*- coding: utf-8 -*-
from __future__ import annotations

import os
from typing import Any, Dict

try:
    from utils.log_module import mklog
except ModuleNotFoundError:
    from python.utils.log_module import mklog

try:
    from .client import BillingClient, BillingClientError
except Exception:
    BillingClient = None
    BillingClientError = RuntimeError

try:
    from python.auth import cloudflare_session
except Exception:
    cloudflare_session = None


log = mklog(__name__, default_enabled=True)

FEATURE_SCRIPT_FETCH = "scriptFetch"
FEATURE_SCRIPT_GENERATION = "scriptGeneration"
FEATURE_VIDEO_CREATE = "videoCreate"


def _current_user_data() -> Dict[str, Any]:
    if cloudflare_session is not None:
        try:
            if cloudflare_session.is_cloudflare_auth_enabled():
                return dict(cloudflare_session.get_current_user_data())
        except Exception as exc:
            log.warning("Cloudflare current_user_data の取得に失敗しました: %s", exc)
    return {}


def get_usage_summary() -> Dict[str, Any]:
    current = _current_user_data()
    usage_summary = current.get("usageSummary")
    return dict(usage_summary) if isinstance(usage_summary, dict) else {}


def get_plan_tier() -> str:
    current = _current_user_data()
    return str(current.get("planTier") or "").strip()


def get_feature_summary(feature_key: str) -> Dict[str, Any]:
    usage_summary = get_usage_summary()
    feature_map = usage_summary.get("features")
    if not isinstance(feature_map, dict):
        return {}
    feature = feature_map.get(str(feature_key or "").strip())
    return dict(feature) if isinstance(feature, dict) else {}


def apply_usage_snapshot(snapshot: Dict[str, Any]) -> Dict[str, Any]:
    if not isinstance(snapshot, dict):
        return _current_user_data()
    patch: Dict[str, Any] = {}
    if "planTier" in snapshot:
        patch["planTier"] = snapshot.get("planTier")
    if "billing" in snapshot and isinstance(snapshot.get("billing"), dict):
        patch["billing"] = snapshot.get("billing")
    if "usageSummary" in snapshot and isinstance(snapshot.get("usageSummary"), dict):
        patch["usageSummary"] = snapshot.get("usageSummary")
    elif "usage" in snapshot and isinstance(snapshot.get("usage"), list) and cloudflare_session is not None:
        builder = getattr(cloudflare_session, "_usage_summary_from_rows", None)
        if callable(builder):
            patch["usage"] = list(snapshot.get("usage") or [])
            patch["usageSummary"] = builder(snapshot.get("usage"), plan_tier=str(snapshot.get("planTier") or ""))
    if "adminMode" in snapshot:
        patch["adminMode"] = bool(snapshot.get("adminMode"))
    if not patch:
        return _current_user_data()

    if cloudflare_session is not None:
        try:
            if cloudflare_session.is_cloudflare_auth_enabled():
                cloudflare_session.update_session_me(patch)
                return _current_user_data()
        except Exception as exc:
            log.warning("Cloudflare usage snapshot の保存に失敗しました: %s", exc)

    current = _current_user_data()
    merged = dict(current)
    merged.update(patch)
    return merged


def _build_client(*, timeout_sec: int = 8) -> BillingClient:
    if BillingClient is None:
        raise RuntimeError("BillingClient を読み込めません。")
    if cloudflare_session is not None:
        try:
            if cloudflare_session.is_cloudflare_auth_enabled():
                return BillingClient(timeout_sec=timeout_sec)
        except Exception as exc:
            log.warning("Cloudflare BillingClient の初期化に失敗しました: %s", exc)
    api_base = str(os.getenv("YMP_BILLING_API_BASE_URL") or "").strip().rstrip("/")
    if not api_base:
        raise RuntimeError("Cloudflare課金APIのURLが未設定です。")
    return BillingClient(api_base_url=api_base, timeout_sec=timeout_sec)


def reserve_usage(
    *,
    feature_key: str,
    request_id: str,
    units: int = 1,
    requested_output_chars: int = 0,
    operation_key: str = "",
    timeout_sec: int = 8,
) -> Dict[str, Any]:
    client = _build_client(timeout_sec=timeout_sec)
    result = client.reserve_usage_credit(
        feature_key=feature_key,
        request_id=request_id,
        units=units,
        requested_output_chars=requested_output_chars,
        operation_key=operation_key,
    )
    apply_usage_snapshot(result)
    return result


def commit_usage(
    *,
    feature_key: str,
    request_id: str,
    actual_output_chars: int = 0,
    timeout_sec: int = 8,
) -> Dict[str, Any]:
    client = _build_client(timeout_sec=timeout_sec)
    result = client.commit_usage_credit(
        feature_key=feature_key,
        request_id=request_id,
        actual_output_chars=actual_output_chars,
    )
    apply_usage_snapshot(result)
    return result


def release_usage(
    *,
    feature_key: str,
    request_id: str,
    reason: str = "",
    timeout_sec: int = 8,
) -> Dict[str, Any]:
    client = _build_client(timeout_sec=timeout_sec)
    result = client.release_usage_credit(
        feature_key=feature_key,
        request_id=request_id,
        reason=reason,
    )
    apply_usage_snapshot(result)
    return result
