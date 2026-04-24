# Vite React Site

`vite-site/` は公開サイト本体です。現在のサイトバージョンは **V1.3** です。

## 使い方

```bash
npm install
npm run dev
```

本番ビルド確認:

```bash
npm run build
npm run audit:v1
npm run audit:perf
npm run preview
```

## V1.3 構成

- Entry: `src/main.tsx`
- Routes: `src/App.tsx`
- Global CSS: `src/index.css`
- V1 CSS: `src/site-v1.css`
- Public assets: `public/`

## 方針

- 初期表示とスクロール時の軽さを優先します。
- ヒーロー背景は自動再生動画ではなく静止 WebP を使います。
- CTA と選択状態の虹色発光はブランド表現として残します。
- Framer Motion には依存せず、必要な表示遷移だけ軽量レイヤーで扱います。
- メタ画像は公開 OG 画像を使い、表示に使わない大型画像をアプリバンドルへ混ぜません。
