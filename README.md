# Yukkuri Matome Processor Site

このリポジトリの公開サイト本体は `vite-site/` の `Vite + React` 実装です。
既定のローカルプレビューも Jekyll ではなく Vite 側を起動します。

## Local Preview

- F5 / VSCode default: `Serve: GUI (Default)`
- Fallback: `Serve: No GUI`
- CLI: `serve_local.cmd --no-gui --open`
- Dedicated research mirror: `TechTouch Lab: GUI`

初回のみ `vite-site/` で依存関係を入れてください。

```bash
cd vite-site
npm install
```

その後は VSCode の起動定義か、直接 Vite を使って確認できます。

```bash
cd vite-site
npm run dev
```

## Active Site

- Main app: `vite-site/`
- Public routes: home, download, instructions, FAQ, purchase, contact, news, update
- Support routes: legal pages, article pages, `404.html`, `/account/`, `/billing/*`
- Deployment assets: `vite-site/public/`

## Repository Status

- Jekyll 実行系と旧公開ページは削除済みです
- ローカル preview と今後の実装対象は `vite-site/` に一本化しています
- 実験用の別系統は `TechTouch Lab` を維持しています
