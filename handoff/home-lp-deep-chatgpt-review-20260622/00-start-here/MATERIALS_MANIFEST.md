# 同梱資料一覧

## 01-prompts

- `DETAILED_PROMPT_FOR_CHATGPT.md`: ChatGPTにそのまま貼る詳細レビュー依頼。
- `SHORT_PROMPT_IF_ZIP_TOO_BIG.md`: ZIPが重すぎる場合の短縮依頼文。

## 02-current-lp

- `CURRENT_LP_STATE_SUMMARY.md`: 現行Home LPの要約。
- `source/`: 現行サイトの関連ソース。
- `rendered/home-visible-text.txt`: ローカルプレビューから抽出した可視テキスト。
- `rendered/home-jsonld.json`: ローカルプレビューで出力されたJSON-LD。
- `rendered/home-links.json`: ローカルプレビューで抽出したリンク。
- `rendered/home-media.json`: ローカルプレビューで抽出した画像・動画・字幕。

## 03-review-history

- `chatgpt-64-review.txt`: 前回ChatGPTレビュー原文。
- `POST_64_FIX_SUMMARY.md`: 前回レビュー後の修正概要。
- `previous-prompt-after-64-review.md`: 前回の再レビュー用プロンプト。

## 04-app-fact-evidence

- `docs/`: アプリ側の法務、配布、課金、リリース、ヘルプ資料。
- `source/`: 課金、利用枠、Stripe、認証などに関係する実装ファイル。

## 05-assets

- `lp/`: Home LPで使っている主要画像・動画・VTT。

## 06-screenshots

- ローカルプレビューで撮影したHome LPのスクショ。
- `visual-capture-results.json` に撮影URL、viewport、スクロール幅、スクリーンショット名を記録。

## 07-reference-packs

- `home-lp-after-64-review-20260622.zip`: 前回の64点レビュー対応後パック。
- `chatgpt-lp-100-review-20260622.zip`: 前回の100点化相談パック。
- `home-lp-v2-current-20260622.zip`: v2仕様反映直後の現状パック。

## 08-next-codex-brief

- `CODEX_IMPLEMENTATION_PROMPT_TEMPLATE.md`: ChatGPT回答後にCodexへ渡す実装依頼テンプレート。
- `OPEN_QUESTIONS_FOR_OWNER.md`: 100点化前にオーナー確認が必要な項目。
