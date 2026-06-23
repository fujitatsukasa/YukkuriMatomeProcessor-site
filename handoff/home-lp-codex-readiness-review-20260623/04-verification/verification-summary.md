# Verification Summary

作成日: 2026-06-23

## コマンド検証

- `npm run lint`: PASS
- `npm run test:copy`: PASS（46 passed）
- `npm run build`: PASS
- `npm run test:mobile`: PASS（36 passed）

## 追加検査の対象

- 未確定値が本文、`title`、`meta`、JSON-LD、`alt`、`aria-label`、`title`属性へ確定表現として漏れないこと
- D1〜D11回答要件が決定台帳の対象ID、必須共通メタデータ、公開ブロックと一致すること
- 配布候補のバージョン、ファイル名、URL、SHA256、サイズが `product-facts.ts` 以外に重複ハードコードされないこと
- CTA、canonical、robots、H1、JSON-LD、BreadcrumbList、リンク名、`target="_blank"` の `noopener`、画像alt、ボタン名、動画fallbackを確認すること
- DOMContentLoadedが監査ページごとに8秒未満であること

## 視覚QA

最終ビルド後の `vite-site/dist` をローカル配信し、Playwrightで実ブラウザスクリーンショットを取得して目視確認しました。

- `/` desktop: CTA、ヒーロー、D10未確定注記、実画面表示を確認
- `/download/` desktop: 配布候補パネル、直接取得CTA非表示、SHA候補表示を確認
- `/update/` mobile: テキスト折り返し、CTA、カード余白、横はみ出しなしを確認
- `/samples/` mobile: 動画コントロール、別タブfallback、カード内テキストの収まりを確認

自動チェック上の追加結果:

- `riskyLinks`: 0
- `horizontalOverflow`: false
- 必須表示テキスト欠落: なし
