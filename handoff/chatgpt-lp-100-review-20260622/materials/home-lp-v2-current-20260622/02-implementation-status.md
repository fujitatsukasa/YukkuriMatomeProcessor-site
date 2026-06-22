# 実装状況

## 対象

- Home `/`
- React / Vite
- 主な実装ファイル:
  - `source/home-page.tsx`
  - `source/home-page.css`
  - `source/home-content.ts`
  - `source/site-layout.tsx`
  - `source/site-content.ts`

## 実装済み

- v2確定コピーをHero/H2/CTA/FAQへ反映
- Home専用ヘッダーNavをv2アンカーへ変更
- Header CTAを `Free版を試す` へ変更
- Homeコンテンツを `home-content.ts` に集約
- Hero mini flowを追加
- Before/After比較を追加
- 4ステップ制作フローを追加
- 実画面で見る3つの価値を追加
- 60秒デモ枠を追加
- `home-demo-60s.mp4` と `home-demo-60s.vtt` を追加
- 動画形式別作例を追加
- Free版セクションを追加
- Free / Premium料金比較を追加
- 動作環境・仕様・本製品/利用者範囲を追加
- FAQをv2順へ再構成
- Final CTAをv2コピーへ変更
- モバイルsticky CTAを `Free版を試す` へ変更
- 画像拡大モーダルを維持
- `SoftwareApplication`, `FAQPage`, `VideoObject` 構造化データを追加
- クリック後に動画 `src` 相当を表示する遅延再生UIを維持

## アンカー

```text
#workflow
#product
#demo
#samples
#free
#pricing
#specs
#faq
```

## 計測イベント

```text
home_free_click
home_demo_play
home_demo_50
home_demo_90
home_sample_play
home_product_tab
home_pricing_view
home_premium_click
home_faq_open
home_screenshot_zoom
```

共通パラメータ:

```text
location
label
viewport
utm_source
utm_medium
utm_campaign
```

## SEO

Title:

```text
ゆっくりまとめプロセッサー｜YMM4向け台本・素材準備ツール
```

Description:

```text
記事URL・スレッドURL・下書きから、本文・コメント取得、話者割り当て、台本整形、AI台本生成、素材確認、YMM4反映まで。Windows 10 / 11対応。Free版あり、Premiumは39,800円（税込）の買い切り。
```

H1:

```text
記事・スレッドから、YMM4のタイムラインまで。
```

## 追加した公開アセット

```text
assets/lp/screen-home-hero-v1.webp
assets/lp/screen-home-capture-v1.webp
assets/lp/screen-home-shape-v1.webp
assets/lp/screen-home-ai-result-v1.webp
assets/lp/screen-home-material-board-v1.webp
assets/lp/screen-home-ymm4-reflected-v1.webp
assets/lp/screen-home-free-v1.webp
assets/lp/screen-home-launcher-v1.webp
assets/lp/home-demo-60s.mp4
assets/lp/home-demo-60s.vtt
```

## デザイン方針

- Creator utility, not cyber luxury
- Primary CTAは青系
- 実画面を主役にする
- ゴールド発光、抽象背景、3Dアイコンを避ける
- Mobileは1カラム
- 料金比較はMobileで縦カード化
- `prefers-reduced-motion` に対応
