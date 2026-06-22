# Home LP 100点定義レビュー用パック

作成日: 2026-06-22  
対象: ゆっくりまとめプロセッサー Home/販売LP

## このzipの目的

Codexが作成した「Home LP 100点定義」が妥当かを、ChatGPTに実装前レビューしてもらうための資料です。

今回の質問は「現LPを何点にするか」ではなく、次の2点です。

1. この100点定義を正本としてよいか
2. この定義に沿ってD1〜D12の未確定事項を埋める進め方でよいか

## まず読むファイル

1. `01-prompts/PROMPT_FOR_CHATGPT.md`
2. `02-current-basis/home-lp-100-point-definition-2026-06-22.md`
3. `02-current-basis/CURRENT_STATE_SUMMARY.md`
4. `04-review-history/chatgpt-68-review-original.txt`
5. 必要に応じて `03-source-snapshots/` と `05-visual-qa/`

## 入っている資料

- 100点定義
- AGENTS.mdのLPルール
- 現在の事実ソース `product-facts.ts`
- Home / Download / Purchase / FAQ / Pricing の主要ソース
- コピー品質・モバイル検証テスト
- 直近ChatGPTレビュー原文
- 最終ビルド成果物のモバイルスクリーンショット
- Playwright視覚QAのDOM確認結果

## ChatGPTに聞いてほしいこと

- この100点定義は採点基準として妥当か
- 配点や上限ルールに欠陥がないか
- D1〜D12で100点に必要な意思決定を漏れなく拾えているか
- Codexだけで進めてよい作業と、ユーザー/事業判断が必要な作業の分け方は正しいか
- 実装へ進む前に追加すべき資料や判断はあるか

## 直近の状態

直近コミット:

- `8a0fd5e docs: Home LPの100点定義を追加`
- `cb97c0f fix: LPの未確定条件とCTAを安全化`

作業ツリーはzip作成前にcleanでした。
