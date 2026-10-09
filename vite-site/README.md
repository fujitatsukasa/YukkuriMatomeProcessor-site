# Vite React Site

`vite-site/` は公開サイト本体です。現在のサイトバージョンは **V1.4** です。

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
npm run audit:site
npm run preview
```

## V1.4 構成

- Entry: `src/main.tsx`
- Routes: `src/App.tsx`
- Global CSS: `src/index.css`
- V1 CSS: `src/site-v1.css`
- Public assets: `public/`

## 会社サイト（2026-10-09）

会社トップ、目指すもの、AIと技術、会社案内、事業紹介、ポートフォリオ、3件の事例詳細、お問い合わせ、会社サイト用プライバシーポリシーの11ページを独立したURLで提供します。製品ページ・ダウンロード・既存の製品サポートは従来のURLを維持します。

- 共通レイアウト: `src/components/company-layout.tsx`
- ページ: `src/pages/company-page.tsx` / `company-documents.tsx` / `company-purpose.tsx`
- 会社情報と掲載事例: `src/data/company.ts`。メールは `src/data/site-content.ts` の `legal.organization.email` を変更すると全ページに反映されます。
- 画像・3D: `public/company/`。生成手順と出典は `docs/company-site-assets.md` に記録します。
- 3D制作ソース: `scripts/render-company-3d.py`。Blenderをfactory-startupのバックグラウンドで実行し、指定出力先にscene・poster・96フレームを保存します。
- `npm run build` はサイトマップの39ページを静的HTML化し、1件でも生成に失敗すると失敗終了します。

検収はビルド後に `node scripts/verify-company-site.mjs <Dドライブ上の証跡保存先>` を実行します。11ページ×5画面幅、静的HTML、製品導線、メタデータ、画像、動画、動きを減らす設定をheadless Chromiumで確認します。第3引数に公開URLを指定すると同じ検査を公開サイトに適用できます。実OSの入力やウィンドウ撮影は使いません。

## 既存の製品ページの方針

- 初期表示とスクロール時の軽さを優先します。
- ヒーロー背景は自動再生動画ではなく静止 WebP を使います。
- CTA と選択状態の虹色発光はブランド表現として残します。
- Framer Motion には依存せず、必要な表示遷移だけ軽量レイヤーで扱います。
- メタ画像は公開 OG 画像を使い、表示に使わない大型画像をアプリバンドルへ混ぜません。
