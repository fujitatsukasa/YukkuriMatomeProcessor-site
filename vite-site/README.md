# Vite React Site

`vite-site/` は、このリポジトリの公開サイト本体です。
ローカル既定プレビュー `Serve: GUI (Default)` / `Serve: No GUI` はこの Vite アプリを起動します。

## 使い方

```bash
cd vite-site
npm install
npm run dev
```

本番ビルド確認:

```bash
npm run build
npm run preview
```

## 含めている導線

- `/`
- `/download/`
- `/instructions/`
- `/faq/`
- `/purchase/`
- `/contact/`
- `/news/`
- `/update/`
- `/legal/*`
- `/account/`
- `/billing/*`

## 実装方針

- GitHub Pages を前提に `404.html` リダイレクト、`CNAME`、`sitemap.xml`、`robots.txt` を同梱
- お知らせ記事、法務情報、FAQ、CTA 導線を React 側へ移植
- スクロール reveal、カード tilt、ヒーローのマウス追従で既存LPより動きを強化
