# アプリ側根拠資料について

このフォルダは、サイトLPの販売コピーがアプリ実態と合っているか確認するために、別リポジトリ `C:\VScode\yukkurimatomeprocessor_Ver2_VITE` から読み取り専用でコピーした資料です。

元リポジトリには、今回の作業前から未コミット差分がありました。

- `docs/web_ui_active_job_latency_latest.json`
- `docs/web_ui_design_accessibility_latest.json`
- `docs/web_ui_performance_latest.json`
- `python/web_app/services/board_service.py`

このパック作成では、上記を含む元リポジトリには変更を加えていません。

## 優先して読む資料

1. `docs/product_current_features_and_shared_license_2026-05-15_ja.md`
   - Free / Standard / Pro / Premium / Lifetimeの設計メモ。
   - LPへそのまま載せる前に、現行販売導線と実装を照合してください。
2. `docs/legal/specified_commercial_transactions_ja.md`
   - 販売事業者、価格、支払い、提供時期。
3. `docs/legal/refund_policy_ja.md`
   - 返金条件。
4. `docs/help/billing_entitlement_ja.md`
   - 支払い済みなのにFree表示、別PC、権限同期などの案内。
5. `docs/distribution_release_evidence_latest.md`
   - 配布物サイズ・SHA-256・バージョン証跡。
6. `docs/public_release_gate_latest.md`
   - 公開ゲートと署名関連のブロッカー。
7. `source/cloudflare/ymp-api/src/*`
   - usage、billing、Stripe、authの実装確認用。

## 注意

- 内部資料の数値は、公開LPに出せる確定値とは限りません。
- `Pro`、`Premium`、`Premium Lifetime`、`買い切り` の名称と権限の対応は、販売LPへ書く前に必ず確認してください。
- 配布証跡のバージョンとサイト共通データの公開バージョンにズレがあるため、最新版表記は要確認です。
