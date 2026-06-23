# ChatGPTレビュー依頼プロンプト

あなたは、Web販売LP、Windowsアプリ販売導線、法務リスク、UX、SEO、アクセシビリティ、QA設計に強いレビュー担当です。

添付zipを読み、ゆっくりまとめプロセッサー Home / 販売LPについて、Codexが追加した実装・検査・レビュー資料が100点化の進め方として妥当かをレビューしてください。

## 背景

このLPは、Windows向けツール「ゆっくりまとめプロセッサー」の販売LPです。

商品ポジション:

- 記事URL・スレッドURL・下書きから、台本下地と素材確認を支援する
- YMM4を開く前の前準備を支援するWindows向けツール
- 動画を完全自動生成するツールではない
- YMM4で最終編集・仕上げる前提

前回レビューでは、100点化には次が必要とされました。

- D1〜D12の再編
- `purchaseReady` / `downloadReady` / `publishReady` の派生ゲート化
- D10未確定の配布情報を公開版扱いしないこと
- 未確定値の漏れ検査
- 重複ハードコード監査
- CTA / schema / SEO / accessibility / performance / video fallback の検査
- Codex作業と事業判断の分離

Codexは今回、以下を実施しました。

- `product-facts.ts` に D1〜D11回答要件 `decisionAnswerRequirements` を追加
- `docs/home-lp-d1-d11-answer-form-2026-06-23.md` を追加
- D10の0.0.18系情報を `releaseCandidateDistribution` として配布候補に固定
- D10 confirmed前は実行ファイル直DL、SHA一覧外部リンク、ライブ配布メタデータ反映を出さない
- 未確定値が本文、meta、JSON-LD、alt、aria-label、title属性に確定表現として漏れない検査を追加
- `product-facts.ts` 以外に配布版番号、SHA、ファイル名、配布URLが重複しない検査を追加
- CTA、SEO、schema、アクセシビリティ、動画フォールバック、DOM性能の基本検査を追加
- Samplesページの動画にも別タブfallbackを追加
- ChatGPT再レビュー用の資料zipを作成

## 現在のゲート状態

- `purchaseReady: false`
- `downloadReady: false`
- `publishReady: false`

これは失敗ではなく、D1〜D11が未承認であるための意図したNo-Goです。

## 読む順番

1. `02-current-basis/CURRENT_STATE_SUMMARY.md`
2. `02-current-basis/home-lp-100-point-definition-2026-06-22.md`
3. `02-current-basis/home-lp-d1-d12-decision-record-2026-06-22.md`
4. `02-current-basis/home-lp-d1-d11-answer-form-2026-06-23.md`
5. `03-source-snapshots/product-facts.ts`
6. `03-source-snapshots/copy-quality.spec.ts`
7. `03-source-snapshots/readiness-audit.spec.ts`
8. 必要に応じて他のsource snapshotsとvisual QA

## レビューしてほしいこと

1. Codexが追加したD1〜D11回答フォームは実運用に耐えるか
2. D1〜D11の必須項目、証拠種別、承認ロールに漏れはないか
3. 未確定値漏れ検査は十分か。本文以外のmeta、JSON-LD、alt、aria-label、titleを見られているか
4. D10配布候補の扱いは安全か。公開版と誤認される箇所が残っていないか
5. 重複ハードコード監査の対象トークンは妥当か
6. CTA、schema、SEO、アクセシビリティ、動画フォールバック、性能検査は十分か
7. これでもCodexだけでは100点にできない理由は明確か
8. 次にCodexがやるべき作業と、ユーザー/事業判断が必要な作業を分けてほしい
9. 100点到達のために追加すべきテスト、資料、証拠、E2E確認があれば示してほしい

## 出力形式

以下の形式で回答してください。

### 1. 総評

Go / Conditional Go / No-Go で答えてください。

### 2. 現状スコア

100点定義に照らした現状スコアを出してください。
ただし、事業判断未確定のため上限がある場合は、上限と理由を明記してください。

### 3. Codex追加作業の評価

今回の追加作業を項目別に評価してください。

### 4. まだ足りない実装・検査

Codexだけで追加可能なものを優先順位順に出してください。

### 5. 事業判断・証拠が必要なもの

D1〜D11に沿って、誰が何を出せばconfirmedにできるかを整理してください。

### 6. 重大リスク

販売・法務・配布・権利・データ送信・UXの観点で、公開前に潰すべきリスクを列挙してください。

### 7. 100点までの次アクション

最短で100点へ近づける順番を、Codex作業と人間判断に分けて提案してください。

## 注意

- 未確定事項を強い販売コピーで隠す提案はしないでください。
- 偽の導入実績、利用者数、時短率、収益保証、再生数保証は提案しないでください。
- 「完全自動」「AIが全部やる」方向には寄せないでください。
- D10未確定の配布候補を、公開版・最新版・正式配布として扱わないでください。
- 100点にできない理由があるなら、何が埋まれば100点に到達可能かを明確にしてください。
