# -*- coding: utf-8 -*-
from __future__ import annotations

import os
import platform
import uuid
import webbrowser
from dataclasses import dataclass
from typing import Any, Dict, Optional

import requests

try:
    from utils.log_module import mklog
except ModuleNotFoundError:
    from python.utils.log_module import mklog
from python.utils import runtime_env_guard


log = mklog(__name__, default_enabled=True)
_BILLING_CLIENT_CONTRACT_TOKEN = str(
    os.getenv("YMP_BILLING_CLIENT_CONTRACT_TOKEN") or "billing-flow-2026-04-22"
).strip()
_CLIENT_COMPAT_TOKEN = str(os.getenv("YMP_CLIENT_COMPAT") or "cloudflare-billing-v1").strip()
_CLOUDFLARE_ROUTE_PATHS = {
    "getBillingCatalog": "api/billing/catalog",
    "createCheckoutSession": "api/billing/checkout",
    "createPortalSession": "api/billing/portal",
    "previewSubscriptionPlanChange": "api/billing/plan-change/preview",
    "applySubscriptionPlanChange": "api/billing/plan-change/apply",
    "redeemSerialCode": "api/serial/redeem",
    "syncMyBillingState": "api/billing/sync",
    "reserveUsageCredit": "api/usage/reserve",
    "commitUsageCredit": "api/usage/commit",
    "releaseUsageCredit": "api/usage/release",
    "adminGrantUsageServiceCredits": "api/admin/usage/service-credits/grant",
    "adminGetBillingUserState": "api/admin/billing/users/state",
    "adminListSerialCodes": "api/admin/serial-codes",
    "adminCreateSerialCodes": "api/admin/serial-codes",
    "adminDisableSerialCode": "api/admin/serial-codes/disable",
    "adminReissueSerialCode": "api/admin/serial-codes/reissue",
    "adminRegisterCurrentDevice": "api/admin/devices/register-current",
    "debugResetBillingState": "api/admin/debug/billing/reset",
    "debugCancelSubscriptionAndSync": "api/admin/debug/billing/cancel-and-sync",
}


def _log_warning(context: str, exc: Exception) -> None:
    log.warning("%s: %s: %s", context, type(exc).__name__, exc)


class BillingClientError(RuntimeError):
    pass


def _validate_api_base_url(raw_value: str) -> str:
    base_url = str(raw_value or "").strip().rstrip("/")
    if not base_url:
        raise BillingClientError("YMP_BILLING_API_BASE_URL が未設定です")
    ok, detail = runtime_env_guard.validate_https_url("YMP_BILLING_API_BASE_URL", base_url)
    if not ok:
        if "https URL のみ許可" in detail:
            raise BillingClientError("YMP_BILLING_API_BASE_URL は https URL のみ利用できます")
        if "ホスト名が必要" in detail:
            raise BillingClientError("YMP_BILLING_API_BASE_URL のホスト名が不正です")
        raise BillingClientError(detail)
    host = runtime_env_guard.normalize_host(detail)
    allowed_hosts = runtime_env_guard.allowed_billing_api_hosts()
    if host not in allowed_hosts:
        allowed = ", ".join(sorted(allowed_hosts))
        raise BillingClientError(
            f"YMP_BILLING_API_BASE_URL は許可済みホストのみ利用できます: {allowed}"
        )
    return base_url


def _cloudflare_billing_api_base_url() -> str:
    try:
        from python.auth import cloudflare_session

        if cloudflare_session.is_cloudflare_auth_enabled():
            return str(cloudflare_session.auth_base_url_for_billing() or "").strip().rstrip("/")
    except Exception as exc:
        _log_warning("Cloudflare課金APIベースURLの解決に失敗しました", exc)
    return ""


@dataclass(slots=True)
class CheckoutSessionResult:
    checkout_url: str
    session_id: str
    purchase_type: str = ""
    masked_serial_code: str = ""
    trial_days: int = 0
    redeemed: bool = False
    code_kind: str = ""
    promotion_code_applied: bool = False
    billing: Dict[str, Any] | None = None


@dataclass(slots=True)
class SubscriptionPlanChangePreview:
    current_plan: str
    target_plan: str
    current_display_name: str = ""
    target_display_name: str = ""
    change_mode: str = ""
    preview_message: str = ""
    immediate_charge_amount: int = 0
    immediate_charge_currency: str = ""
    immediate_charge_text: str = ""
    effective_at: str = ""
    proration_date: int = 0


@dataclass(slots=True)
class SubscriptionPlanChangeResult:
    mode: str
    target_plan: str
    message: str = ""
    applied: bool = False
    scheduled: bool = False
    requires_action: bool = False
    effective_at: str = ""
    schedule_id: str = ""
    latest_invoice_id: str = ""
    payment_intent_status: str = ""


@dataclass(slots=True)
class BillingCatalogPlan:
    plan_id: str
    purchase_type: str
    display_name: str
    subtitle: str
    price_text: str
    features: list[str]
    highlight: bool
    badge_text: str
    purchasable: bool
    sort_order: int
    yearly_price_text: str = ""
    yearly_discount_text: str = ""
    yearly_discount_rate: float = 0.0

    def to_dict(self) -> Dict[str, Any]:
        return {
            "planId": self.plan_id,
            "purchaseType": self.purchase_type,
            "displayName": self.display_name,
            "subtitle": self.subtitle,
            "priceText": self.price_text,
            "features": list(self.features),
            "highlight": bool(self.highlight),
            "badgeText": self.badge_text,
            "purchasable": bool(self.purchasable),
            "sortOrder": int(self.sort_order),
            "yearlyPriceText": str(self.yearly_price_text or ""),
            "yearlyDiscountText": str(self.yearly_discount_text or ""),
            "yearlyDiscountRate": float(self.yearly_discount_rate or 0.0),
        }


class BillingClient:
    def __init__(
        self,
        *,
        api_base_url: str | None = None,
        timeout_sec: int = 30,
        http_session: Optional[requests.Session] = None,
    ) -> None:
        runtime_billing = runtime_env_guard.read_billing_runtime_config()
        base_url = _validate_api_base_url(
            str(
                api_base_url
                or os.getenv("YMP_BILLING_API_BASE_URL")
                or runtime_billing.get("YMP_BILLING_API_BASE_URL")
                or _cloudflare_billing_api_base_url()
                or ""
            )
        )
        self._base_url = base_url
        self._timeout = int(timeout_sec)
        self._http = http_session or requests.Session()
        self._last_catalog_warning_text = ""
        self._client_billing_contract = _BILLING_CLIENT_CONTRACT_TOKEN
        self._known_paths = (
            "getBillingCatalog",
            "createCheckoutSession",
            "createPortalSession",
            "previewSubscriptionPlanChange",
            "applySubscriptionPlanChange",
            "redeemSerialCode",
            "syncMyBillingState",
            "reserveUsageCredit",
            "commitUsageCredit",
            "releaseUsageCredit",
            "adminGetBillingUserState",
            "adminListSerialCodes",
            "adminCreateSerialCodes",
            "adminDisableSerialCode",
            "adminReissueSerialCode",
            "adminRegisterCurrentDevice",
            "debugResetBillingState",
            "debugCancelSubscriptionAndSync",
        )

    @property
    def last_catalog_warning_text(self) -> str:
        return str(self._last_catalog_warning_text or "")

    def _resolve_id_token(self, id_token: str | None) -> str:
        token = str(id_token or "").strip()
        if token:
            return token
        try:
            from python.auth import cloudflare_session

            if cloudflare_session.is_cloudflare_auth_enabled():
                token = str(cloudflare_session.get_access_token() or "").strip()
                if token:
                    return token
                raise BillingClientError("Cloudflare access token が取得できません。先にログインしてください。")
        except BillingClientError:
            raise
        except Exception as exc:
            _log_warning("Cloudflare access token の取得に失敗しました", exc)
            try:
                from python.auth import cloudflare_session

                if cloudflare_session.is_cloudflare_auth_enabled():
                    raise BillingClientError("Cloudflare access token が取得できません。先にログインしてください。") from exc
            except BillingClientError:
                raise
        if not token:
            raise BillingClientError("Cloudflare access token が取得できません。先にGoogleログインしてください。")
        return token

    def _resolve_catalog_id_token(self, id_token: str | None) -> str:
        return self._resolve_id_token(id_token)

    def _decorate_payload(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        out = dict(payload or {})
        contract = str(self._client_billing_contract or "").strip()
        if contract and "clientBillingContract" not in out:
            out["clientBillingContract"] = contract
        compat = str(_CLIENT_COMPAT_TOKEN or "").strip()
        if compat and "clientCompat" not in out:
            out["clientCompat"] = compat
        return out

    def _try_refresh_id_token(self) -> str:
        try:
            from python.auth import cloudflare_session

            if cloudflare_session.is_cloudflare_auth_enabled():
                return str(cloudflare_session.refresh_session(api_base_url=self._base_url, http_session=self._http) or "").strip()
        except Exception as exc:
            _log_warning("Cloudflare access token の再取得に失敗しました", exc)
            return ""
        return ""

    def _build_candidate_urls(self, path: str) -> list[str]:
        requested = str(path or "").strip().lstrip("/")
        base = self._base_url.rstrip("/")
        candidates: list[str] = []

        def _add(url_text: str) -> None:
            u = str(url_text or "").strip()
            if u and u not in candidates:
                candidates.append(u)

        if not requested:
            _add(base)
            return candidates

        mapped = _CLOUDFLARE_ROUTE_PATHS.get(requested)
        if mapped:
            if base.endswith("/api"):
                root = base[: -len("/api")]
                _add(f"{root}/{mapped}")
            elif "/api/" in base:
                root = base.split("/api/", 1)[0]
                _add(f"{root}/{mapped}")
            else:
                _add(f"{base}/{mapped}")

        if base.endswith(f"/{requested}"):
            _add(base)
        _add(f"{base}/{requested}")

        for known in self._known_paths:
            suffix = f"/{known}"
            if base.endswith(suffix):
                root = base[: -len(suffix)]
                if known == requested:
                    _add(base)
                else:
                    _add(f"{root}/{requested}")

        return candidates

    def _request_headers(self, *, access_token: str = "") -> Dict[str, str]:
        headers: Dict[str, str] = {
            "X-YMP-App-Version": str(os.getenv("YMP_APP_VERSION") or "0.0.0"),
            "X-YMP-Client-Compat": str(_CLIENT_COMPAT_TOKEN or "cloudflare-billing-v1"),
            "X-YMP-Platform": str(os.getenv("YMP_PLATFORM") or platform.system().lower() or "unknown"),
        }
        token = str(access_token or "").strip()
        if not token:
            try:
                from python.auth import cloudflare_session

                if cloudflare_session.is_cloudflare_auth_enabled():
                    token = str(cloudflare_session.get_access_token(refresh=False) or "").strip()
            except Exception:
                token = ""
        if token:
            headers["Authorization"] = f"Bearer {token}"
        return headers

    def _uses_cloudflare_auth_base(self) -> bool:
        try:
            from python.auth import cloudflare_session

            if not cloudflare_session.is_cloudflare_auth_enabled():
                return False
            auth_base = str(cloudflare_session.auth_base_url_for_billing() or "").strip().rstrip("/")
            return bool(auth_base and auth_base == self._base_url.rstrip("/"))
        except Exception as exc:
            _log_warning("Cloudflare課金APIベースURLの照合に失敗しました", exc)
            return False

    def _refresh_cloudflare_snapshot_after_billing_mutation(self, result: Dict[str, Any]) -> None:
        if not self._uses_cloudflare_auth_base():
            return
        try:
            from python.auth import cloudflare_session

            if isinstance(result, dict):
                snapshot = cloudflare_session.auth_response_snapshot(result, fallback=result)
                if snapshot:
                    cloudflare_session.update_session_me(snapshot)
            cloudflare_session.fetch_me(
                api_base_url=self._base_url,
                http_session=self._http,
                timeout_sec=self._timeout,
            )
        except Exception as exc:
            raise BillingClientError(f"Cloudflare課金状態のローカル同期に失敗しました: {exc}") from exc

    def _post_json(self, path: str, payload: Dict[str, Any]) -> Dict[str, Any]:
        candidates = self._build_candidate_urls(path)
        last_error_message = ""
        not_found_message = (
            "課金APIエンドポイントが見つかりません（HTTP 404）。"
            "YMP_BILLING_API_BASE_URL または Cloud Functions のデプロイ状態を確認してください。"
        )
        if candidates:
            log.info("Billing API 呼び出し候補 path=%s urls=%s", path, " | ".join(candidates))

        for idx, url in enumerate(candidates):
            log.info("Billing API リクエスト path=%s trial=%d/%d url=%s", path, idx + 1, len(candidates), url)
            try:
                response = self._http.post(url, json=payload, headers=self._request_headers(), timeout=self._timeout)
            except requests.RequestException as exc:
                last_error_message = f"API通信に失敗しました: {exc}"
                log.warning(
                    "Billing API 通信失敗 path=%s trial=%d/%d url=%s reason=%s",
                    path,
                    idx + 1,
                    len(candidates),
                    url,
                    exc,
                )
                if idx < len(candidates) - 1:
                    continue
                raise BillingClientError(last_error_message) from exc

            text = response.text or ""
            try:
                body = response.json() if text.strip() else {}
            except ValueError as exc:
                _log_warning("Billing API 応答 JSON の解析に失敗しました", exc)
                body = {}

            if response.status_code == 404 and idx < len(candidates) - 1:
                log.warning(
                    "Billing API 404 path=%s trial=%d/%d url=%s -> 次候補を試行します",
                    path,
                    idx + 1,
                    len(candidates),
                    url,
                )
                continue

            if response.status_code >= 400:
                message = ""
                if isinstance(body, dict):
                    message = str(body.get("error") or "").strip()
                if not message:
                    message = f"HTTP {response.status_code}"
                if response.status_code == 401:
                    refreshed = self._try_refresh_id_token()
                    if refreshed:
                        retry_payload = dict(payload)
                        retry_payload["idToken"] = refreshed
                        try:
                            retry_response = self._http.post(
                                url,
                                json=retry_payload,
                                headers=self._request_headers(access_token=refreshed),
                                timeout=self._timeout,
                            )
                            retry_text = retry_response.text or ""
                            try:
                                retry_body = retry_response.json() if retry_text.strip() else {}
                            except ValueError as exc:
                                _log_warning("Billing API 再試行応答 JSON の解析に失敗しました", exc)
                                retry_body = {}
                            if retry_response.status_code < 400 and isinstance(retry_body, dict):
                                return retry_body
                            if isinstance(retry_body, dict):
                                message = str(retry_body.get("error") or message).strip() or message
                        except requests.RequestException:
                            pass
                if response.status_code == 404:
                    message = not_found_message
                log.warning(
                    "Billing API エラー path=%s trial=%d/%d url=%s status=%s message=%s",
                    path,
                    idx + 1,
                    len(candidates),
                    url,
                    response.status_code,
                    message,
                )
                raise BillingClientError(message)

            if not isinstance(body, dict):
                raise BillingClientError("API応答が不正です")
            return body

        log.warning("Billing API 404 path=%s candidates=%s", path, " | ".join(candidates))
        raise BillingClientError(not_found_message)

    @staticmethod
    def _to_bool(value: Any) -> bool:
        if isinstance(value, bool):
            return value
        if isinstance(value, (int, float)):
            return bool(int(value))
        text = str(value or "").strip().lower()
        return text in {"1", "true", "yes", "on", "y", "t"}

    def get_billing_catalog(self, *, id_token: str = "") -> list[BillingCatalogPlan]:
        self._last_catalog_warning_text = ""
        token = self._resolve_catalog_id_token(id_token)
        payload: Dict[str, Any] = {"idToken": token}
        result = self._post_json("getBillingCatalog", self._decorate_payload(payload))
        raw_warnings = result.get("warnings")
        if isinstance(raw_warnings, list):
            warnings: list[str] = []
            for item in raw_warnings:
                text = str(item or "").strip()
                if text:
                    warnings.append(text)
            if warnings:
                self._last_catalog_warning_text = " / ".join(warnings)
                log.warning("Billing catalog warnings: %s", self._last_catalog_warning_text)
        raw_plans = result.get("plans")
        if not isinstance(raw_plans, list):
            raise BillingClientError("課金カタログの応答形式が不正です。plans が存在しません。")

        plans: list[BillingCatalogPlan] = []
        for row in raw_plans:
            if not isinstance(row, dict):
                continue
            raw_features = row.get("features")
            features: list[str] = []
            if isinstance(raw_features, list):
                for item in raw_features:
                    text = str(item or "").strip()
                    if text:
                        features.append(text)
            plan_id = str(row.get("planId") or row.get("purchaseType") or "").strip()
            purchase_type = str(row.get("purchaseType") or "").strip()
            display_name = str(row.get("displayName") or "").strip()
            subtitle = str(row.get("subtitle") or "").strip()
            price_text = str(row.get("priceText") or "").strip() or "価格は決済画面でご確認ください"
            badge_text = str(row.get("badgeText") or "").strip()
            yearly_price_text = str(
                row.get("yearlyPriceText")
                or row.get("yearly_price_text")
                or row.get("annualPriceText")
                or row.get("annual_price_text")
                or ""
            ).strip()
            yearly_discount_text = str(
                row.get("yearlyDiscountText")
                or row.get("yearly_discount_text")
                or row.get("annualDiscountText")
                or row.get("annual_discount_text")
                or ""
            ).strip()
            raw_yearly_discount_rate = (
                row.get("yearlyDiscountRate")
                or row.get("yearly_discount_rate")
                or row.get("annualDiscountRate")
                or row.get("annual_discount_rate")
                or 0
            )
            try:
                yearly_discount_rate = float(raw_yearly_discount_rate)
            except (TypeError, ValueError):
                yearly_discount_rate = 0.0
            sort_order_raw = row.get("sortOrder")
            try:
                sort_order = int(sort_order_raw)
            except (TypeError, ValueError):
                sort_order = 9999
            plans.append(
                BillingCatalogPlan(
                    plan_id=plan_id,
                    purchase_type=purchase_type,
                    display_name=display_name,
                    subtitle=subtitle,
                    price_text=price_text,
                    features=features,
                    highlight=self._to_bool(row.get("highlight")),
                    badge_text=badge_text,
                    purchasable=self._to_bool(row.get("purchasable")),
                    sort_order=sort_order,
                    yearly_price_text=yearly_price_text,
                    yearly_discount_text=yearly_discount_text,
                    yearly_discount_rate=yearly_discount_rate,
                )
            )

        plans.sort(key=lambda p: p.sort_order)
        log.info("Billing catalog を取得しました: %d件", len(plans))
        return plans

    def create_checkout_session(
        self,
        *,
        purchase_type: str,
        success_url: str,
        cancel_url: str,
        site_key: str = "",
        serial_code: str = "",
        test_clock_id: str = "",
        id_token: str = "",
    ) -> CheckoutSessionResult:
        payload: Dict[str, Any] = {
            "idToken": self._resolve_id_token(id_token),
            "purchaseType": str(purchase_type or "").strip(),
            "siteKey": str(site_key or "").strip(),
            "successUrl": str(success_url or "").strip(),
            "cancelUrl": str(cancel_url or "").strip(),
            "idempotencyKey": f"checkout:{uuid.uuid4()}",
        }
        serial_code_text = str(serial_code or "").strip()
        if serial_code_text:
            payload["serialCode"] = serial_code_text
        test_clock_id_text = str(test_clock_id or "").strip()
        if test_clock_id_text:
            payload["testClockId"] = test_clock_id_text
        result = self._post_json("createCheckoutSession", self._decorate_payload(payload))
        checkout_url = str(result.get("checkoutUrl") or "").strip()
        session_id = str(result.get("sessionId") or "").strip()
        resolved_purchase_type = str(result.get("purchaseType") or purchase_type or "").strip()
        masked_serial_code = str(result.get("maskedSerialCode") or "").strip()
        redeemed = self._to_bool(result.get("redeemed"))
        code_kind = str(result.get("codeKind") or "").strip()
        promotion_code_applied = self._to_bool(result.get("promotionCodeApplied"))
        billing = result.get("billing") if isinstance(result.get("billing"), dict) else None
        try:
            trial_days = int(result.get("trialDays") or 0)
        except Exception:
            trial_days = 0
        if not checkout_url and not redeemed:
            raise BillingClientError("checkoutUrl が返されませんでした")
        if redeemed:
            self._refresh_cloudflare_snapshot_after_billing_mutation(result)
            log.info("シリアルコードを適用しました")
        else:
            log.info("Checkout Session を作成しました: %s", session_id)
        return CheckoutSessionResult(
            checkout_url=checkout_url,
            session_id=session_id,
            purchase_type=resolved_purchase_type,
            masked_serial_code=masked_serial_code,
            trial_days=trial_days,
            redeemed=redeemed,
            code_kind=code_kind,
            promotion_code_applied=promotion_code_applied,
            billing=billing,
        )

    def create_serial_checkout_session(
        self,
        *,
        serial_code: str,
        success_url: str,
        cancel_url: str,
        test_clock_id: str = "",
        id_token: str = "",
    ) -> CheckoutSessionResult:
        code = str(serial_code or "").strip()
        if not code:
            raise BillingClientError("シリアルコードを入力してください。")
        return self.create_checkout_session(
            purchase_type="",
            success_url=success_url,
            cancel_url=cancel_url,
            site_key="",
            serial_code=code,
            test_clock_id=test_clock_id,
            id_token=id_token,
        )

    def create_portal_session(
        self,
        *,
        return_url: str,
        id_token: str = "",
    ) -> str:
        payload: Dict[str, Any] = {
            "idToken": self._resolve_id_token(id_token),
            "returnUrl": str(return_url or "").strip(),
        }
        result = self._post_json("createPortalSession", self._decorate_payload(payload))
        portal_url = str(result.get("portalUrl") or "").strip()
        if not portal_url:
            raise BillingClientError("portalUrl が返されませんでした")
        log.info("Portal Session を作成しました")
        return portal_url

    def preview_subscription_plan_change(
        self,
        *,
        target_plan: str,
        id_token: str = "",
    ) -> SubscriptionPlanChangePreview:
        payload: Dict[str, Any] = {
            "idToken": self._resolve_id_token(id_token),
            "targetPlan": str(target_plan or "").strip(),
        }
        result = self._post_json("previewSubscriptionPlanChange", self._decorate_payload(payload))
        if not bool(result.get("ok")):
            message = str(result.get("error") or "").strip() or "previewSubscriptionPlanChange failed"
            raise BillingClientError(message)
        try:
            immediate_charge_amount = int(result.get("immediateChargeAmount") or 0)
        except Exception:
            immediate_charge_amount = 0
        try:
            proration_date = int(result.get("prorationDate") or 0)
        except Exception:
            proration_date = 0
        return SubscriptionPlanChangePreview(
            current_plan=str(result.get("currentPlan") or "").strip(),
            target_plan=str(result.get("targetPlan") or target_plan or "").strip(),
            current_display_name=str(result.get("currentDisplayName") or "").strip(),
            target_display_name=str(result.get("targetDisplayName") or "").strip(),
            change_mode=str(result.get("changeMode") or "").strip(),
            preview_message=str(result.get("message") or "").strip(),
            immediate_charge_amount=immediate_charge_amount,
            immediate_charge_currency=str(result.get("currency") or "").strip(),
            immediate_charge_text=str(result.get("immediateChargeText") or "").strip(),
            effective_at=str(result.get("effectiveAt") or "").strip(),
            proration_date=proration_date,
        )

    def apply_subscription_plan_change(
        self,
        *,
        target_plan: str,
        proration_date: int = 0,
        id_token: str = "",
    ) -> SubscriptionPlanChangeResult:
        payload: Dict[str, Any] = {
            "idToken": self._resolve_id_token(id_token),
            "targetPlan": str(target_plan or "").strip(),
        }
        safe_proration_date = int(proration_date or 0)
        if safe_proration_date > 0:
            payload["prorationDate"] = safe_proration_date
        result = self._post_json("applySubscriptionPlanChange", self._decorate_payload(payload))
        if not bool(result.get("ok")):
            message = str(result.get("error") or "").strip() or "applySubscriptionPlanChange failed"
            raise BillingClientError(message)
        return SubscriptionPlanChangeResult(
            mode=str(result.get("mode") or "").strip(),
            target_plan=str(result.get("targetPlan") or target_plan or "").strip(),
            message=str(result.get("message") or "").strip(),
            applied=self._to_bool(result.get("applied")),
            scheduled=self._to_bool(result.get("scheduled")),
            requires_action=self._to_bool(result.get("requiresAction")),
            effective_at=str(result.get("effectiveAt") or "").strip(),
            schedule_id=str(result.get("scheduleId") or "").strip(),
            latest_invoice_id=str(result.get("latestInvoiceId") or "").strip(),
            payment_intent_status=str(result.get("paymentIntentStatus") or "").strip(),
        )

    def redeem_serial_code(
        self,
        *,
        serial_code: str,
        id_token: str = "",
    ) -> Dict[str, Any]:
        code = str(serial_code or "").strip()
        if not code:
            raise BillingClientError("シリアルコードを入力してください。")
        payload: Dict[str, Any] = {
            "idToken": self._resolve_id_token(id_token),
            "serialCode": code,
        }
        result = self._post_json("redeemSerialCode", self._decorate_payload(payload))
        ok = bool(result.get("ok"))
        if not ok:
            message = str(result.get("error") or "").strip() or "redeemSerialCode failed"
            raise BillingClientError(message)
        self._refresh_cloudflare_snapshot_after_billing_mutation(result)
        log.info("redeemSerialCode を実行しました")
        return result

    def sync_my_billing_state(
        self,
        *,
        id_token: str = "",
    ) -> Dict[str, Any]:
        payload: Dict[str, Any] = {
            "idToken": self._resolve_id_token(id_token),
        }
        result = self._post_json("syncMyBillingState", self._decorate_payload(payload))
        if not bool(result.get("ok")):
            message = str(result.get("error") or "").strip() or "syncMyBillingState failed"
            raise BillingClientError(message)
        self._refresh_cloudflare_snapshot_after_billing_mutation(result)
        log.info("syncMyBillingState を実行しました")
        return result

    def reserve_usage_credit(
        self,
        *,
        feature_key: str,
        request_id: str,
        units: int = 1,
        requested_output_chars: int = 0,
        operation_key: str = "",
        id_token: str = "",
    ) -> Dict[str, Any]:
        payload: Dict[str, Any] = {
            "idToken": self._resolve_id_token(id_token),
            "featureKey": str(feature_key or "").strip(),
            "requestId": str(request_id or "").strip(),
            "units": int(units),
            "requestedOutputChars": int(requested_output_chars),
        }
        operation_key_text = str(operation_key or "").strip()
        if operation_key_text:
            payload["operationKey"] = operation_key_text
        result = self._post_json("reserveUsageCredit", self._decorate_payload(payload))
        if not bool(result.get("ok")):
            message = str(result.get("error") or "").strip() or "reserveUsageCredit failed"
            raise BillingClientError(message)
        return result

    def admin_grant_usage_service_credits(
        self,
        *,
        target_user_id: str = "",
        target_email: str = "",
        feature_key: str = "videoCreate",
        credits: int = 0,
        reason: str = "",
        id_token: str = "",
    ) -> Dict[str, Any]:
        payload: Dict[str, Any] = {
            "idToken": self._resolve_id_token(id_token),
            "targetUserId": str(target_user_id or "").strip(),
            "targetEmail": str(target_email or "").strip(),
            "featureKey": str(feature_key or "videoCreate").strip(),
            "credits": int(credits),
            "reason": str(reason or "").strip(),
        }
        result = self._post_json("adminGrantUsageServiceCredits", self._decorate_payload(payload))
        if not bool(result.get("ok")):
            message = str(result.get("error") or "").strip() or "adminGrantUsageServiceCredits failed"
            raise BillingClientError(message)
        return result

    def commit_usage_credit(
        self,
        *,
        feature_key: str,
        request_id: str,
        actual_output_chars: int = 0,
        id_token: str = "",
    ) -> Dict[str, Any]:
        payload: Dict[str, Any] = {
            "idToken": self._resolve_id_token(id_token),
            "featureKey": str(feature_key or "").strip(),
            "requestId": str(request_id or "").strip(),
            "actualOutputChars": int(actual_output_chars),
        }
        result = self._post_json("commitUsageCredit", self._decorate_payload(payload))
        if not bool(result.get("ok")):
            message = str(result.get("error") or "").strip() or "commitUsageCredit failed"
            raise BillingClientError(message)
        return result

    def release_usage_credit(
        self,
        *,
        feature_key: str,
        request_id: str,
        reason: str = "",
        id_token: str = "",
    ) -> Dict[str, Any]:
        payload: Dict[str, Any] = {
            "idToken": self._resolve_id_token(id_token),
            "featureKey": str(feature_key or "").strip(),
            "requestId": str(request_id or "").strip(),
            "reason": str(reason or "").strip(),
        }
        result = self._post_json("releaseUsageCredit", self._decorate_payload(payload))
        if not bool(result.get("ok")):
            message = str(result.get("error") or "").strip() or "releaseUsageCredit failed"
            raise BillingClientError(message)
        return result

    def admin_list_serial_codes(
        self,
        *,
        query: str = "",
        purchase_type: str = "",
        active_mode: str = "all",
        limit: int = 50,
        id_token: str = "",
    ) -> Dict[str, Any]:
        payload: Dict[str, Any] = {
            "idToken": self._resolve_id_token(id_token),
            "query": str(query or "").strip(),
            "purchaseType": str(purchase_type or "").strip(),
            "activeMode": str(active_mode or "all").strip(),
            "limit": int(limit),
        }
        result = self._post_json("adminListSerialCodes", self._decorate_payload(payload))
        if not bool(result.get("ok")):
            message = str(result.get("error") or "").strip() or "adminListSerialCodes failed"
            raise BillingClientError(message)
        return result

    def admin_get_billing_user_state(
        self,
        *,
        target_uid: str = "",
        id_token: str = "",
    ) -> Dict[str, Any]:
        payload: Dict[str, Any] = {
            "idToken": self._resolve_id_token(id_token),
        }
        target_uid_text = str(target_uid or "").strip()
        if target_uid_text:
            payload["targetUid"] = target_uid_text
        result = self._post_json("adminGetBillingUserState", self._decorate_payload(payload))
        if not bool(result.get("ok")):
            message = str(result.get("error") or "").strip() or "adminGetBillingUserState failed"
            raise BillingClientError(message)
        return result

    def admin_create_serial_codes(
        self,
        *,
        purchase_type: str,
        duration_days: int = 0,
        max_redemptions: int = 1,
        count: int = 1,
        note: str = "",
        active: bool = True,
        id_token: str = "",
    ) -> Dict[str, Any]:
        payload: Dict[str, Any] = {
            "idToken": self._resolve_id_token(id_token),
            "purchaseType": str(purchase_type or "").strip(),
            "durationDays": int(duration_days),
            "maxRedemptions": int(max_redemptions),
            "count": int(count),
            "note": str(note or "").strip(),
            "active": bool(active),
        }
        result = self._post_json("adminCreateSerialCodes", self._decorate_payload(payload))
        if not bool(result.get("ok")):
            message = str(result.get("error") or "").strip() or "adminCreateSerialCodes failed"
            raise BillingClientError(message)
        return result

    def admin_register_current_device(
        self,
        *,
        label: str = "",
        id_token: str = "",
    ) -> Dict[str, Any]:
        payload: Dict[str, Any] = {
            "idToken": self._resolve_id_token(id_token),
            "label": str(label or "").strip(),
        }
        result = self._post_json("adminRegisterCurrentDevice", self._decorate_payload(payload))
        if not bool(result.get("ok")):
            message = str(result.get("error") or "").strip() or "adminRegisterCurrentDevice failed"
            raise BillingClientError(message)
        return result

    def admin_disable_serial_code(
        self,
        *,
        serial_code_hash: str = "",
        serial_code: str = "",
        reason: str = "",
        id_token: str = "",
    ) -> Dict[str, Any]:
        payload: Dict[str, Any] = {
            "idToken": self._resolve_id_token(id_token),
            "serialCodeHash": str(serial_code_hash or "").strip(),
            "serialCode": str(serial_code or "").strip(),
            "reason": str(reason or "").strip(),
        }
        result = self._post_json("adminDisableSerialCode", self._decorate_payload(payload))
        if not bool(result.get("ok")):
            message = str(result.get("error") or "").strip() or "adminDisableSerialCode failed"
            raise BillingClientError(message)
        return result

    def admin_reissue_serial_code(
        self,
        *,
        serial_code_hash: str = "",
        serial_code: str = "",
        note: str = "",
        id_token: str = "",
    ) -> Dict[str, Any]:
        payload: Dict[str, Any] = {
            "idToken": self._resolve_id_token(id_token),
            "serialCodeHash": str(serial_code_hash or "").strip(),
            "serialCode": str(serial_code or "").strip(),
            "note": str(note or "").strip(),
        }
        result = self._post_json("adminReissueSerialCode", self._decorate_payload(payload))
        if not bool(result.get("ok")):
            message = str(result.get("error") or "").strip() or "adminReissueSerialCode failed"
            raise BillingClientError(message)
        return result

    def debug_cancel_subscription_and_sync(
        self,
        *,
        id_token: str = "",
        subscription_id: str = "",
        target_uid: str = "",
    ) -> Dict[str, Any]:
        payload: Dict[str, Any] = {
            "idToken": self._resolve_id_token(id_token),
            "subscriptionId": str(subscription_id or "").strip(),
        }
        target_uid_text = str(target_uid or "").strip()
        if target_uid_text:
            payload["targetUid"] = target_uid_text
        result = self._post_json("debugCancelSubscriptionAndSync", self._decorate_payload(payload))
        ok = bool(result.get("ok"))
        if not ok:
            message = str(result.get("error") or "").strip() or "debug cancel failed"
            raise BillingClientError(message)
        log.info(
            "debugCancelSubscriptionAndSync 完了: action=%s subscription=%s target=%s",
            str(result.get("action") or ""),
            str(result.get("subscriptionId") or ""),
            str(result.get("targetUid") or target_uid_text),
        )
        return result

    def debug_reset_billing_state(
        self,
        *,
        id_token: str = "",
        clear_customer_id: bool = False,
        clear_site_unlocks: bool = False,
    ) -> Dict[str, Any]:
        payload: Dict[str, Any] = {
            "idToken": self._resolve_id_token(id_token),
            "clearCustomerId": bool(clear_customer_id),
            "clearSiteUnlocks": bool(clear_site_unlocks),
        }
        result = self._post_json("debugResetBillingState", self._decorate_payload(payload))
        ok = bool(result.get("ok"))
        if not ok:
            message = str(result.get("error") or "").strip() or "debug reset failed"
            raise BillingClientError(message)
        log.info(
            "debugResetBillingState 完了: mode=%s clearCustomer=%s clearSiteUnlocks=%s",
            str(result.get("mode") or ""),
            bool(clear_customer_id),
            bool(clear_site_unlocks),
        )
        return result

    @staticmethod
    def open_in_default_browser(url: str) -> bool:
        target = str(url or "").strip()
        if not target:
            return False
        try:
            return bool(webbrowser.open(target))
        except (webbrowser.Error, OSError, RuntimeError) as exc:
            _log_warning("既定ブラウザ起動に失敗しました", exc)
            return False
