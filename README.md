# ゆっくりまとめプロセッサー サイト管理リポジトリ

公開サイト本体は `vite-site/` の Vite + React 実装です。現在のサイトバージョンは **V1.4** として定義しています。

## Local Preview

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

## Active Site V1.4

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
