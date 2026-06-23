# Home LP Codex実装後レビュー用パック 2026-06-23

対象: ゆっくりまとめプロセッサー Home / 販売LP

## このzipの目的

Codexが進められる範囲の追加整備後に、ChatGPTへ再レビューを依頼するための資料です。

今回の焦点は、販売条件そのものの承認ではありません。

以下が正しく実装・検査されているかを確認してもらうことです。

- D1〜D11回答フォームが実運用に耐えるか
- 未確定値が本文、meta、JSON-LD、alt、aria-label、title属性へ確定表現として漏れないか
- D10未確定の配布候補が公開版として扱われていないか
- `product-facts.ts` 以外に配布版番号、SHA、配布URL等が重複ハードコードされていないか
- CTA、schema、SEO、アクセシビリティ、動画フォールバック、軽量性の検査が妥当か
- 残る100点化タスクが、Codex作業と事業判断に正しく分離されているか

## まず読むファイル

1. `01-prompts/PROMPT_FOR_CHATGPT.md`
2. `02-current-basis/CURRENT_STATE_SUMMARY.md`
3. `02-current-basis/home-lp-100-point-definition-2026-06-22.md`
4. `02-current-basis/home-lp-d1-d12-decision-record-2026-06-22.md`
5. `02-current-basis/home-lp-d1-d11-answer-form-2026-06-23.md`
6. 必要に応じて `03-source-snapshots/` と `04-verification/`

## 現在の重要状態

- `purchaseReady: false`
- `downloadReady: false`
- `publishReady: false`
- D1〜D11は未承認
- D10の0.0.18系情報は配布候補であり、公開配布版の正本ではない
- 実行ファイルの直接取得CTAは表示しない
- 購入実行CTAは表示しない

## 入っている資料

- 100点定義v2
- D1〜D12決定台帳
- D1〜D11回答フォーム
- AGENTS.md
- 主要ソーススナップショット
- 追加された品質テスト
- 検証結果
- 視覚QAスクリーンショット
