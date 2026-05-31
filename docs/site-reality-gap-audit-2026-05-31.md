# 公開サイト / 実体フォルダ 差分監査メモ 2026-05-31

## 見た対象

- 公開サイト管理: `C:\VScode\YukkuriMatomeProcessor-site`
- 本体 / 配信実体: `C:\VScode\yukkurimatomeprocessor_Ver2_VITE`
- 公開ドメイン: `https://yukkurimatomeprocessor.com/`
- Cloudflare Pages: `https://ymp-account-ce8.pages.dev/`
- Cloudflare Worker: `https://ymp-api.fujita-otm.workers.dev`

## 結論

サイトは公開自体はされています。GitHub Pages で `https://yukkurimatomeprocessor.com/` は Vite の本サイトを返しています。

ただし、現時点で外に大きく出すには「商品仕様」「課金形態」「実画像」「配布物」「公開先」がかなり剥離しています。特に、公開サイトは月額 Free / Standard / Pro を説明している一方、本体側の最新課金実装は 39,800 円の `premium_lifetime` 買い切りです。ここは購入前表示・特商法・構造化データまで含めて即修正対象です。

## P0: 公開前に必ず直すズレ

### 1. 料金モデルが実装と公開サイトで違う

公開サイト側は `Free / Standard / Pro` の月額サブスクとして説明しています。

- `vite-site/src/data/site-content.ts`: Standard 月額 5,000 円、Pro 月額 10,000 円
- `vite-site/src/pages/purchase-page.tsx`: 月額サブスク前提
- `vite-site/src/components/PricingCards.tsx`: 月額プラン表示
- `vite-site/src/pages/home-page.tsx`: FAQ / 構造化データも月額前提

一方、本体側の Cloudflare API / アプリ UI / Pages は買い切りです。

- `cloudflare/ymp-api/README.md`: 本番購入導線は `premium_lifetime` の買い切りのみ
- `cloudflare/ymp-api/src/billing.ts`: `PREMIUM_LIFETIME_PURCHASE_TYPE = "premium_lifetime"`、39,800 円
- `frontend/apps/main/src/shell/AppShell.tsx`: 買い切り 39,800 円
- `frontend/apps/launcher/src/LauncherApp.tsx`: 買い切り 39,800 円
- `cloudflare/ymp-pages/public/index.html`: 買い切り版 LP

危険度は高いです。ユーザーにとっては「月額なのか買い切りなのか」が最重要で、ここがズレると不信・返金・法務リスクになります。

### 2. 特商法 / 返金 / 提供方法が古い

公開サイトの特商法ページには、月額自動課金、Standard / Pro、Firebase 同期が残っています。

- `vite-site/src/data/site-content.ts`: `Firebase同期結果を正として反映`
- `vite-site/dist/legal/commercial-transactions/index.html`: 月額課金と Firebase 表記

現在の実装は Cloudflare / D1 / Google ログイン / Stripe one-time payment です。法務ページは買い切り 39,800 円、返金条件、権限停止、Google アカウント紐づけに合わせて更新が必要です。

### 3. 公開 HTML にローカル URL が混入している

`https://yukkurimatomeprocessor.com/` の HTML に、ローカル開発サーバーの URL が入っています。

```text
http://127.0.0.1:5174/assets/hero-poster-ChDO6-Jo.webp
```

ローカルでは見えても外部ユーザー環境では読めません。ファーストビューの大きな背景画像が落ちる可能性があります。

同じ原因で、記事ページのシェア URL も `http://127.0.0.1:5174/...` になっています。`GlobalShareButtons` が prerender 時の `window.location.href` を固定しているためです。

修正方針:

- prerender 後に `http://127.0.0.1:5174` を `https://yukkurimatomeprocessor.com` へ置換する
- 画像は `new URL(...).href` の絶対 URL をそのまま SSR 固定しない
- シェア URL は `siteOrigin + normalizePath(location.pathname)` で組み立てる
- CI で `dist/**/*.html` に `127.0.0.1` / `localhost` が残ったら失敗させる

### 4. 配布物の見せ方が実態とズレている

公開サイトのダウンロード導線は GitHub Releases の `YukkuriMatomeProcessor.zip` へ向いています。確認時点では `releases/download/1.2.12/YukkuriMatomeProcessor.zip`、約 275 MB にリダイレクトされました。

一方、本体側の最新配布準備は `C:\VScode\YMP_Distribution` に Velopack 形式であり、`docs/distribution_readiness_latest.md` は `Passed: false` です。ブロッカーは署名、Fresh VM リハーサル、R2 HTTPS custom domain、auth/billing 実画面 E2E などです。

つまり「今のサイトから本当に最新の完成版を配る」状態ではありません。公開サイトには、今配る版・準備中の版・買い切り版対応版のどれなのかを明確にする必要があります。

### 5. main ドメインと Cloudflare Pages が分裂している

`https://yukkurimatomeprocessor.com/` は GitHub Pages で配信されています。レスポンスヘッダーは `Server: GitHub.com` です。

`https://ymp-account-ce8.pages.dev/` は Cloudflare Pages で、買い切り版の静的ページです。こちらはセキュリティヘッダーや CSP があります。

問題は、Cloudflare Pages 側の root も canonical を `https://yukkurimatomeprocessor.com/` にしており、robots も `/` を許可していることです。main ドメインに載せる本命ページと、アカウント/購入補助ページの役割を分け切れていません。

方針:

- main LP は `yukkurimatomeprocessor.com`
- account / billing / checkout 戻り先は Cloudflare Pages または `account.yukkurimatomeprocessor.com`
- Pages.dev の root は noindex か、独自ドメイン移行まで検索対象から外す
- main ドメインを Cloudflare Pages に移すなら GitHub Pages 側は閉じる

## P1: かなり早めに直すブラッシュアップ

### 6. 実画像が少ない / 実体側の素材を活かせていない

公開サイトの `vite-site/public` には上位画像が 26 枚、`nodoka` が 7 枚、`generated` が 2 枚あります。多くは WebP の軽量画像で、見た目は整っています。

ただし、ユーザーが見たい「実際に何ができるか」の証拠としては弱いです。実画面風の画像はあるものの、実アプリから取った決定的なスクリーンショット、生成動画、YMM4 反映結果、Before / After が少ないです。

本体側には使える素材がかなりあります。

- `docs/samples/script_timeline_v2`: MP4 32 本、合計約 1.31 GiB
- `docs/samples/script_timeline_v2`: 画像 2,152 枚、合計約 94.6 MiB
- `encoded_video_samples`: サムネイル 24 枚
- `mcp_ymm4_live_samples`: サムネイル 8 枚
- `frontend/apps/main/src/assets/characters`: キャラ素材 14 枚
- `frontend/apps/main/src/assets/thumbnail-lab-samples`: Before / After 20 枚
- `marketing/note_assets/01_youtube_monetization_stop/out`: note 用の訴求画像 7 枚

これらを Cloudflare R2 へ置いた上で、公開サイトに「実例ギャラリー」「30 秒デモ」「Before / After」「YMM4 実機出力」の形で出すべきです。特に買い切り 39,800 円なら、CSS の疑似プレビューだけでは弱いです。

### 7. Cloudflare Pages の買い切りページに実画像がない

`cloudflare/ymp-pages/public/index.html` は軽くて説明は明確ですが、実画像がありません。`.product-preview` は CSS の疑似 UI です。

買い切りページとしては、最低でも以下が必要です。

- 本体アプリの購入画面スクショ
- 購入後に制限解除される画面のスクショ
- scriptFetch / scriptGeneration の利用枠が変わる Before / After
- 実際の生成動画サムネイル 3-6 件
- YMM4 へ渡る成果物の例

### 8. 構造化データが古い価格を出している

公開サイトの `SoftwareApplication` 構造化データは `legal.pricing.unitPrice = 5000` を使っています。実装上の本番価格が 39,800 円買い切りなら、検索エンジン向けにも誤情報です。

### 9. `<title>` が二重に出ている

prerender 済み HTML に `<title>...</title><title>...</title>` が出ています。Helmet と元の `index.html` の title が両方残っている状態です。

検索結果でおかしなタイトルが残る直接原因ではないかもしれませんが、SEO 品質としては直した方がいいです。

### 10. Google 検索スニペットはしばらく古いまま残る

現在の公開サイト自体は README ではなく Vite サイトになっています。ただし Google には古い README 表示時代のタイトル・説明が残っていました。

これは時間差で直りますが、P0 修正後に Search Console でインデックス登録リクエストを出すのが早いです。今すぐリクエストすると、月額/買い切りの矛盾やローカル URL 混入が拾われる可能性があります。

### 11. 最新リリース / 更新日 / ニュースが古く見える

サイトのお知らせは 2026-01 の記事が中心です。実体側では 2026-05 に Cloudflare、買い切り、R2、配布準備まで大きく動いています。

公開サイト上では更新が止まっているように見えます。少なくとも以下の記事が必要です。

- 買い切り版への方針変更
- Cloudflare / Google ログイン / Stripe 管理への移行
- 現在の配布版と今後の配布予定
- サンプル動画と実画面ギャラリー追加のお知らせ

### 12. 「無料プランあり」の意味が曖昧

本体側には Free と買い切り Premium の導線があります。公開サイト側では Free / Standard / Pro の三段階です。

無料プランがあるなら、無料で何回できるのか、どこまで出力できるのか、買い切りで何が無制限になるのかを一画面で比較する必要があります。

現状の本体 UI では:

- Free: 回数制限あり
- 買い切り: 台本取得 / 台本生成の制限解除
- 価格: 39,800 円 / 1 ライセンス

この形に合わせて公開サイトも寄せるべきです。

## P2: 品質を上げる改善

### 13. LP の情報量が多く、判断軸が少し散っている

デザインはリッチですが、工程、証拠、料金、FAQ、公開情報が多く、初見ユーザーが「で、何を買えばいいのか」に到達するまで少し長いです。

買い切り方針に寄せるなら、トップの章立ては以下が良いです。

1. 何を短縮するツールか
2. 無料でできること
3. 買い切りで解除されること
4. 実画面 / 実動画
5. 価格と購入前確認
6. ダウンロード / 購入導線

### 14. ブログ画像はあるが、製品証拠としては弱い

ブログサムネイルは SEO 的には有効です。ただし、製品購入を後押しするには実スクショや動画の方が強いです。ブログは集客、LP は証拠、買い切りページは最終確認という役割分担にしたいです。

### 15. セキュリティヘッダーは Cloudflare 側の方が良い

Cloudflare Pages は CSP / Referrer-Policy / Permissions-Policy / nosniff が入っています。GitHub Pages の main ドメインには同等のヘッダーがありません。

公開・課金導線を長期運用するなら、main ドメインも Cloudflare 側へ寄せた方が管理しやすいです。

### 16. サイトとアプリの用語を統一したい

候補:

- 無料: Free
- 有料: Premium 買い切り
- 購入種別: `premium_lifetime`
- 価格: 39,800 円
- 利用枠: scriptFetch / scriptGeneration
- 管理: Google ログイン + Stripe Checkout

`Standard` / `Pro` / `月額` / `Firebase同期` は、現仕様として出さない方が安全です。

## 直す順番

1. 公開サイトの料金・法務・構造化データを買い切り版へ統一する
2. prerender の `127.0.0.1` / `localhost` 混入を修正し、CI で検出する
3. main ドメインと Cloudflare Pages の役割を決める
4. 実画像 / 実動画ギャラリーを R2 経由で LP と買い切りページへ出す
5. ダウンロード導線を「現行安定版」と「新買い切り対応版」に分ける
6. Fresh VM / 署名 / auth-billing E2E / R2 custom domain の配布ブロッカーを潰す
7. Google Search Console で再クロール依頼

## 現時点の公開判断

まだ「完成したサイトとして大きく公開」は早いです。

ただし、土台はあります。GitHub Pages の本サイト、Cloudflare Worker、Cloudflare Pages、R2 の素材退避はすでに動いています。次にやるべきはデザインを増やすより、実装と表示の剥離を潰して、実画像と実動画で信用を足すことです。
