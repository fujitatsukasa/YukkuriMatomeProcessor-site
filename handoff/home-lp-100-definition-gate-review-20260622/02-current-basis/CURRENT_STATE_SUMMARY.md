# 現状サマリー

## 直近コミット

- `8a0fd5e docs: Home LPの100点定義を追加`
- `cb97c0f fix: LPの未確定条件とCTAを安全化`

## 直近のCodex対応

68点レビュー後、CodexはLPを安全側に修正しました。

主な変更:

- `product-facts.ts` を追加し、確認済み情報と未確定情報を分離
- `purchaseReady: false` により購入実行CTAを抑制
- `downloadReady: false` によりexe/zip直接取得CTAを抑制
- Home / Download / Purchase / FAQ / Samples / News / Blog の危険コピーを横断修正
- CTAを「無料でダウンロード」から「Free版を試す」「配布情報を見る」へ変更
- Premium価格、買い切り、月額なしは残しつつ、Free/Premium上限、PC台数、更新範囲は断定しない設計に変更
- モバイル料金比較にFree/Premiumラベルを追加
- 危険コピー、直リンク、購入CTA抑制、モバイル横はみ出しのテストを追加

## 直近の検証

実施済み:

- `npm run lint` OK
- `npm run build` OK
- `npm run test:copy` 20 passed
- `npm run test:mobile` 36 passed
- Playwright視覚QAで Home / Download / Purchase のモバイル表示を確認

視覚QAのDOM確認:

- 横はみ出し: 0
- exe/zip直リンク: 0
- 購入実行リンク: 0
- 旧CTA「無料でダウンロード」: なし
- 旧API表現「YouTube分析 / YouTube API」: なし

スクリーンショットとDOM結果は `05-visual-qa/` にあります。

## 現在の意図

現LPは「100点販売LP」ではなく、「未確定事項を断定しない安全な公開前LP」です。

次にやるべきことは、実装を進める前に、`home-lp-100-point-definition-2026-06-22.md` が100点定義として妥当かを確認することです。

## 未確定事項

100点化に必要な未確定事項:

- Freeの上限
- Premiumの上限/公正利用条件
- PC台数
- PC変更/再認証
- 更新範囲
- 対応URL/入力範囲
- 対応YMM4バージョン
- 公開配布バージョン
- 署名/Windows警告の扱い
- 購入導線を出してよいか
- 直DL導線を出してよいか
- 実操作デモ/動画サンプルの証拠利用可否

これらは `home-lp-100-point-definition-2026-06-22.md` のD1〜D12に対応しています。
