# OTM株式会社 / ゆっくりまとめプロセッサー サイト管理リポジトリ

公開サイト本体は `vite-site/` の Vite + React 実装です。現在のサイトバージョンは **V1.4** として定義しています。

## 会社ホームページ

`/` は OTM株式会社の公式会社サイトです。「面倒を減らす。創る時間を増やす。」を軸に、目指す価値、貢献する領域、ソフトウェア開発、AI活用、自社製品、会社情報を紹介します。会社サイトは11ページ、製品を含むサイトマップは39ページです。

- Company page: `vite-site/src/pages/company-page.tsx`
- Mission / Technology: `vite-site/src/pages/company-purpose.tsx`
- Company stylesheet: `vite-site/src/pages/company-purpose.css`（共通CSSの後に適用）
- Company content: `vite-site/src/data/company.ts`
- Motion graphics: `vite-site/src/components/company-motion.tsx`（Canvasの立体メッシュとSVG図版）
- 会社情報・メールの共有元: `vite-site/src/data/site-content.ts` の `legal.organization`
- YMP製品紹介: `/products/ymp/`（以前のトップページ）
- ダウンロード、使い方、料金、製品サポート、法務のURLは維持しています。

会社メールを変更する場合は `legal.organization.email` を更新します。会社サイトの連絡先と構造化データが連動します。既存の `supportChannels` のメール導線も同時に確認してください。

会社サイトの表示・導線・静的HTMLを確認するには、ビルド後に `node scripts/verify-company-site.mjs <Dドライブ上の検証保存先の絶対パス>` を `vite-site/` で実行します。スクリーンショットと結果JSONが指定先へ保存されます。動きの録画は `node scripts/record-company-motion.mjs <ローカルプレビューURL> <Dドライブ上の検証保存先>`。Playwrightでブラウザ描画を12fpsで取得し、PATH上のFFmpegで28秒のMP4に保存します。実OSの画面撮影やフォーカス操作は使いません。

日本語見出しは Zen Kaku Gothic Antique、本文は Noto Sans JP、英字見出しは Barlow Condensed、斜体は Bodoni Moda、ラベルは IBM Plex Mono。黒・コバルト・コーラル・白の配色に、創作と情報整理のコンセプト画像、情報が道具へつながるWebGL / SVGの動きを組み合わせています。立体、データの移動、英字帯は一時停止できます。画面外や非表示タブではWebGLの連続描画を止め、`prefers-reduced-motion` では静止します。JavaScriptなしやWebGLが使えない環境でも本文とSVGを表示します。検証スクリプトは11ページ×5画面幅、フォント読込、描画の変化・停止・復旧、静的HTMLを確認します。

## ローカル確認

- F5 / VSCode default: `Serve: GUI (Default)`
- Fallback: `Serve: No GUI`
- CLI: `serve_local.cmd --no-gui --open`
- Dedicated research mirror: `TechTouch Lab: GUI`

初回のみ依存関係を入れます。

```bash
cd vite-site
npm install
```

通常の確認は Vite を使います。

```bash
cd vite-site
npm run dev
```

## 公開サイト V1.4

- Main app: `vite-site/`
- Main stylesheet: `vite-site/src/site-v1.css`
- Public routes: home, download, instructions, FAQ, purchase, contact, news, update, blog
- Support routes: legal pages, article pages, `404.html`, `/account/`, `/billing/*`
- Deployment assets: `vite-site/public/`

## Deployment

公開サイトは `.github/workflows/deploy-pages.yml` で `vite-site/` をビルドし、`vite-site/dist` を GitHub Pages にデプロイします。

GitHub Pages の Source は **GitHub Actions** に設定してください。Source が `main` branch / root のままだと、Vite のビルド成果物ではなくこの README が GitHub Pages で表示されます。

## V1.4 Quality Line

- 虹色発光は CTA と選択状態のブランドシグナルとして維持します。
- 常時動く装飾、追従カーソル、ファーストビュー動画は使いません。
- 外部 Google Fonts 読み込みは使わず、初期表示とスクロールの軽さを優先します。
- `npm run audit:v1` で配信アセットのサイズと動画混入を確認します。
- `npm run audit:perf` で実ブラウザの読み込み指標とスクロール FPS を確認します。
- `npm run audit:site` で全公開ルートの日本語、メタ情報、横スクロール、見出し構造を確認します。

## Repository Policy

- 旧デザイン検証ファイル、旧生成スクリプト、未使用の大型動画素材は削除済みです。
- 現行 V1.4 で使う画像は WebP を基本にし、ファーストビューでは動画を自動再生しません。
- ローカルプレビューの既定は `Serve: GUI (Default)` のまま維持します。
