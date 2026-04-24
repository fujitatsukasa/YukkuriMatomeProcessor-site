# 本番運用フロー監査 2026-04-24

確認対象: `https://yukkurimatomeprocessor.com` と `vite-site` の production build

## 結論

公開サイトとしてユーザーが踏む主要導線は、ローカルの production build と現在公開中の本番URLの両方で重大な不具合は確認されなかった。

今回の監査で見つかった実害候補は修正済み。

- 下層ページのプリレンダーHTMLにトップページ用 canonical / OGP が混入していた問題を修正
- 存在しない `CHANGELOG.md` への外部リンクを GitHub Releases に修正
- sitemap の主要更新ページの `lastmod` を 2026-04-24 に更新
- 運用監査を再実行できる `npm run audit:ops` を追加

## 確認した範囲

- sitemap 上の 26 ルートが production build でプリレンダーされること
- 26 ルートそれぞれの desktop / mobile 表示で以下が成立すること
  - HTTP 200
  - H1 が存在する
  - title が存在する
  - meta description が存在する
  - canonical がルートごとに正しい
  - OGP画像が本番ドメイン配下を指す
  - ページ単位の横スクロールがない
- サイト内リンクが sitemap または許可済み運用ページに接続されること
- GitHub 最新ZIPダウンロードURLが 200 で到達できること
- GitHub Releases / latest release が到達できること
- 本番の `/`, `/download/`, `/purchase/`, `/contact/`, `/legal/terms/`, `/legal/refund-policy/` が 200 で到達できること
- 本番の `robots.txt` と `sitemap.xml` が 200 で到達できること

## 運用上の注意

`https://x.com/OTM_corp` は自動監査の HTTP fetch では 403 を返す。X 側のbot/自動アクセス制限によるもので、サイト内リンク自体の構文不備ではないため非致命の警告として扱う。

Stripe Checkout / Customer Portal の実決済フローは、この公開サイトではなくアプリ内導線から開始する設計のため、このリポジトリ単体では実決済・解約予約・支払い方法更新の本番通し確認までは完了できない。確認対象は、公開サイトから購入判断に必要な説明・法務情報・問い合わせ導線へ到達できることまで。

## 再実行コマンド

```powershell
cd vite-site
npm run build
npm run audit:ops
```

補助チェック:

```powershell
npm run audit:site
npm run test:mobile
npm run audit:perf
npm run lint
```
