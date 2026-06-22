# スクショ・DOM抽出メモ

ローカルプレビューURL:

- `http://127.0.0.1:4181/`

採取内容:

- `06-screenshots/desktop-*.png`: 1440x900の主要セクションとfull page。
- `06-screenshots/tablet-*.png`: 1024x768のHeroとPricing。
- `06-screenshots/mobile-*.png`: 390x844のHero、Product、Pricing、FAQ、full page。
- `06-screenshots/wide-mobile-hero-430x932.png`: 430x932のHero。
- `06-screenshots/narrow-mobile-*.png`: 360x800のHeroとPricing。
- `06-screenshots/visual-capture-results.json`: 各スクショのviewport、scrollWidth、scrollHeight、sticky CTA有無。
- `06-screenshots/visual-capture-summary.json`: 横スクロール検出とsticky CTA有無の要約。
- `02-current-lp/rendered/home-visible-text.txt`: 実際の可視テキスト。
- `02-current-lp/rendered/home-jsonld.json`: 実際のJSON-LD。
- `02-current-lp/rendered/home-links.json`: 実際のリンク一覧。
- `02-current-lp/rendered/home-media.json`: 実際の画像・動画・字幕一覧。

採取時のメモ:

- 横スクロールは検出されませんでした。
- Hero初期表示ではsticky CTAは出ていません。
- モバイルの中盤以降ではsticky CTAが表示される場面があります。レビュー時は、インラインCTAや料金カードを覆っていないか確認してください。
- full pageスクショはLPの長さ把握用です。細部確認はセクション別スクショを優先してください。
