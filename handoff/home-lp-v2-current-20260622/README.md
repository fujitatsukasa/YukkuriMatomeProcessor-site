# ゆっくりまとめプロセッサー Home LP v2 現状まとめ

作成日: 2026-06-22
対象: Home `/`
現行コミット: `dac14b6 feat: Home LPをv2販売コピーへ更新`

このパックは、v2.0販売コピー確定版を反映した現在のHome LPを、別の制作者/AI/レビュー担当へ渡すための材料です。

## 入っているもの

- `00-codex-evaluation.md`: Codex視点の率直な評価
- `01-current-home-copy.md`: 現行Home LPの主要コピーとセクション構成
- `02-implementation-status.md`: 実装済み内容、ファイル構成、計測イベント
- `03-verification-report.md`: 実行した検証と視覚QA結果
- `04-known-gaps-and-next-actions.md`: 残課題と次にやるべきこと
- `assets-manifest.md`: 同梱アセット一覧と使用意図
- `source/`: 現行実装ソースと関連テスト
- `assets/lp/`: 現行LPで使う画像、動画、字幕、サンプル素材
- `screenshots/`: PC/モバイルの現行表示スクリーンショット
- `spec/`: 反映元のv2.0仕様書

## ローカル確認URL

```text
http://127.0.0.1:4178/
```

## 現行LPの中心コピー

```text
記事・スレッドから、YMM4のタイムラインまで。
```

## 現行の評価要約

販売コピーと情報設計は、v1よりかなり強くなっています。
「何を入れると、どこへつながるか」がHeroで分かり、Free/Premium/Windows/YMM4/買い切り/非自動完成の条件も早い段階で見えます。

一方で、現行の実画面素材は既存スクリーンショットの安全なクロップを使っているため、証拠力はまだ暫定です。公開品質をさらに上げるなら、同一の架空プロジェクトで「URL取得 → 台本生成 → 素材確認 → YMM4反映」までを撮り直すのが次の本命です。

## 直近検証結果

- `npm run lint`: 成功
- `npm run build`: 成功
- `npm run test:copy`: 成功
- `npm run test:mobile`: 成功
- `npm run audit:perf`: Good
- browser_subagent実ブラウザQA: OK

## 注意

- このパックのスクリーンショットは確認用成果物です。
- LPで使う本体アセットは `assets/lp/` と `source/home-content.ts` を見てください。
- 現行LPは旧抽象デモ `main-demo-90s` と旧 `usecase-*` を参照していません。
