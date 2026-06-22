# 検証レポート

## 実行したチェック

- `npm run lint`
  - 成功。
- `npm run build`
  - 成功。
- `npm run test:copy`
  - 成功。16 passed。
- `npm run test:mobile`
  - 成功。34 passed。
- `npm run audit:perf`
  - 成功。LCP、FCP、CLS、FPSなど主要項目は `good`。
- 禁止表現検索
  - `60秒の操作デモ`
  - `実際の完成映像`
  - `動画作成の上限`
  - `利用制限を解除`
  - `実操作デモ`
  - `PT1M3S`
  - `VideoObject`
  - Home主要ソースでは該当なし。
- CTA / JSON-LD / 動画fallback確認
  - Hero CTA、Pricing CTAは配布URLへリンク。
  - デモfallbackは `/lp/home-demo-60s.mp4`。
  - FAQ表示件数は10件。
  - JSON-LDは `SoftwareApplication` と `FAQPage`。
  - 未検証の `VideoObject` は出力なし。
  - 横スクロールなし。
- 動画確認
  - クリック後に動画要素が表示。
  - `controls` あり。
  - `track[kind="captions"]` は `/lp/home-demo-60s.vtt`。
  - fallbackリンクあり。

## 視覚QA

ローカルプレビュー `http://127.0.0.1:4178/` で確認。

- 1440×900 Hero
  - H1、Free CTA、制作フローCTA、商品画面、役割分担、自己署名注意が表示。
- 1440×900 Pricing
  - 価格見出し、Free/Premiumカード、CTAが表示。
- 1024×768 Hero
  - 商品画面が初回表示内に入る。
- 390×844 Hero
  - H1、リード、Free CTA、商品画面が初回表示内に入る。
- 390×844 Product付近
  - 横崩れなし。
- 390×844 Pricing
  - sticky CTAがインラインCTAを覆わない。
- 360×800 Hero
  - H1、Free CTA、商品画面が初回表示内に入る。

## 注意

今回のZIP作成時点では、ZIP生成自体のために改めてlint/buildを再実行していません。上記は対応コミット `4198df5` 作成時に実行した検証結果です。
