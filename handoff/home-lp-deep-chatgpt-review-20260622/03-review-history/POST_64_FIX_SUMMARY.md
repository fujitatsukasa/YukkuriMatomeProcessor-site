# 64点レビュー後の対応概要

対象コミット:

- `4198df5 feat: Home LPの証拠性と料金明確性を改善`
- `75f619c docs: 64点レビュー対応後LPパックを作成`

## 対応したP0

- 未検証の証拠表現を削除。
- デモ動画を「実操作」ではなく「制作フロー解説」と明記。
- 作例動画を「完成映像の証拠」として扱わないよう明記。
- VideoObject JSON-LDを削除。
- FAQPage JSON-LDを可視FAQ 10件と一致。
- Organization publisherを `OTM株式会社` へ修正。
- モバイルHero順序を調整。
- sticky CTAを非表示時にDOMから外す。
- 画像の証拠部分が切れにくい表示へ調整。
- VTT最終時刻を動画内に修正。
- コピー品質・モバイル・動画・schema・sticky CTAの自動テストを追加。

## 前回実行済みチェック

- `npm run lint`
- `npm run build`
- `npm run test:copy`
- `npm run test:mobile`
- `npm run audit:perf`
- ブラウザ実画面確認: 1440x900、1024x768、390x844、360x800

## 今回ChatGPTに見てほしいこと

- 64点から何点まで改善したか。
- 現在の安全寄りコピーが、販売力を落としすぎていないか。
- Free/Premiumの未確定情報をどう扱うべきか。
- アプリ側資料の利用枠候補をLPへ出してよいか。
- Homeだけでなく、料金ページ・FAQ・法務との横断整合が崩れていないか。
- 100点に必要な実素材の優先順位。
- 次回Codex実装に渡すP0/P1/P2。
