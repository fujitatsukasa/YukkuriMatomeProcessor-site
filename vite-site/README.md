# Vite React Site

`vite-site/` は公開サイト本体です。現在のサイトバージョンは **V1** です。

## 使い方

```bash
npm install
npm run dev
```

本番ビルド確認:

```bash
npm run build
npm run preview
```

## V1構成

- Entry: `src/main.tsx`
- Routes: `src/App.tsx`
- Global CSS: `src/index.css`
- V1 CSS: `src/site-v1.css`
- Public assets: `public/`

## 方針

- 初期表示は軽量優先です。
- ヒーロー背景は自動再生動画ではなく静止WebPを使います。
- ブログサムネイル、製品スクリーンショット、キャラクター画像はV1用WebPへ整理しています。
