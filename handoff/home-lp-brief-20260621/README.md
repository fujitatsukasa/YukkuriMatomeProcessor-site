# ゆっくりまとめプロセッサー Home LP 引き継ぎパック

作成日: 2026-06-21

このzipは、現行Home LPを別の制作者/AIへ渡して再設計してもらうための材料です。

## 目的

現行Homeの文言、デザイン、仕様、素材、禁止事項、参考URLをまとめ、次の作り直しで認識ズレを減らすこと。

## 入っているもの

- `01-current-home-copy.md`: 現行Homeのセクション順コピー全部
- `02-design-and-ui-spec.md`: 現行デザイン、UI、レスポンシブ、アニメーション仕様
- `03-product-marketing-legal-seo-spec.md`: 商品仕様、訴求、法務、SEO、CTA仕様
- `04-reference-urls-and-direction.md`: 参考URLと、どこを真似るべきか
- `05-request-for-chatgpt-5-5-pro.md`: ChatGPT 5.5 Proへ投げる依頼文
- `source/`: 現行Homeの実コードとLPルール
- `assets/lp/`: 現行LPで使っている画像/動画素材
- `screenshots/`: 現行HomeのPC/スマホ実スクショ

## 最重要の前提

- LPの主役は実アプリ画面。
- 生成画像は主役にしない。
- AIっぽい3Dアイコン、盾、光る矢印、謎パネル、架空UIはNG。
- 販売前提のLPなので、詩的な語りかけや抽象コピーはNG。
- ユーザーが買う前に知りたい条件を先に出す。

## 現行Homeの確認URL

ローカルプレビュー:

```text
http://127.0.0.1:5190/
```

## 現行チェック結果

直近確認済み:

- `npm run lint`
- `npm run build`
- `npm run test:copy`
- `npm run test:mobile`
- PC/スマホ実スクショ確認
