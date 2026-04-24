# Yukkuri Matome Processor Site

このリポジトリの公開サイト本体は `vite-site/` の Vite + React 実装です。
現在のサイトバージョンは **V1.2** として定義しています。

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

## Active Site V1.2

- Main app: `vite-site/`
- Main stylesheet: `vite-site/src/site-v1.css`
- Public routes: home, download, instructions, FAQ, purchase, contact, news, update, blog
- Support routes: legal pages, article pages, `404.html`, `/account/`, `/billing/*`
- Deployment assets: `vite-site/public/`

## V1.2 Quality Line

- 虹色発光はCTAや選択状態のシグナルとして維持します。
- 常時動く装飾、追従カーソル、ファーストビュー動画は使いません。
- `npm run audit:v1` で配信アセットのサイズと動画混入を確認します。
- `npm run audit:perf` で実ブラウザの読み込み指標とスクロールFPSを確認します。

## Repository Policy

- 旧デザイン検証ファイル、旧生成スクリプト、未使用の大型動画素材は削除済みです。
- 現行V1.2で使う画像はWebPを基本にし、ファーストビューでは動画を自動再生しません。
- ローカルプレビューの既定は `Serve: GUI (Default)` のまま維持します。
