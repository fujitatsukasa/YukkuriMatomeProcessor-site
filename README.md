# OTM株式会社 / ゆっくりまとめプロセッサー サイト管理リポジトリ

公開サイト本体は `vite-site/` の Vite + React 実装です。現在のサイトバージョンは **V1.4** として定義しています。

## 会社ホームページ

`/` は OTM株式会社の公式会社サイトです。ソフトウェア開発、AI活用・業務自動化、自社プロダクトの事業紹介と、会社概要・メール問い合わせを掲載しています。

- Company page: `vite-site/src/pages/company-page.tsx`
- Company stylesheet: `vite-site/src/pages/company-page.css`
- Company content: `vite-site/src/data/company.ts`
- 会社情報・メールの共有元: `vite-site/src/data/site-content.ts` の `legal.organization`
- YMP製品紹介: `/products/ymp/`（以前のトップページ）
- ダウンロード、使い方、料金、製品サポート、法務のURLは維持しています。

会社メールを変更する場合は `legal.organization.email` を更新します。会社サイトの連絡先と構造化データが連動します。既存の `supportChannels` のメール導線も同時に確認してください。

会社サイトの表示・導線・静的HTMLを確認するには、ビルド後に `node scripts/verify-company-site.mjs <Dドライブ上の検証保存先の絶対パス>` を `vite-site/` で実行します。スクリーンショットとPlaywright動画、結果JSONが指定先へ保存されます。

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
