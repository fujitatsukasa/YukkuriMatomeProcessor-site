# Home LP ChatGPT / ImageGen デザインブリーフ 2026-06-28

## 目的

ゆっくりまとめプロセッサーのHome / 販売LPを、ChatGPTとImageGenでさらにブラッシュアップするための正本メモです。

この資料の目的は、次の3つです。

1. 現在のHome LPに入っている商品情報、コピー、導線、法務上の注意を一つにまとめる。
2. ImageGen / `gpt-image-2` に渡すためのデザイン生成プロンプトを作る。
3. 最終モックアップをCodexへ渡して実装する時の指示を固定する。

重要: ImageGenで作る画像は「デザイン仕様書」「視覚的な正解」「再現ターゲット」です。実装時に画像をそのままサイトへ貼らないでください。文字はHTMLテキスト、UIはReact/CSS、商品証拠は実アプリスクリーンショットまたは実動画で扱います。

## 公式情報メモ

2026-06-28時点で公式情報を確認済みです。

- Codexの組み込み画像生成は `gpt-image-2` を使う: https://developers.openai.com/codex/ide/features
- Codexのユースケースでは、ImageGenでUIモックや方向性を作り、Codexが選定案を実装する流れが紹介されている: https://developers.openai.com/codex/use-cases/idea-to-proof-of-concept
- Codexのフロントエンド実装では、スクリーンショットやデザインブリーフを参照し、Playwrightで画面サイズ別に確認しながら反復する流れが示されている: https://developers.openai.com/codex/use-cases/frontend-designs
- Image APIでは `gpt-image-2` を直接指定でき、サイズ、品質、形式などを調整できる: https://developers.openai.com/api/docs/guides/image-generation

## 現在のLPの結論

ゆっくりまとめプロセッサーは、記事URL・スレッドURL・下書きから、ゆっくり動画の台本下地とYMM4前準備を支援するWindows向けツールです。

動画を完全自動生成するツールではありません。YMM4を開く前の前準備を支援し、最後の音声、字幕、間、演出、公開前確認は利用者がYMM4で仕上げます。

Home LPの役割は、購入前のユーザーが知りたいことへ先に答えることです。機能一覧を先に並べるLPではありません。

## 商品の入力と出力

入力:

- 記事URL
- スレッドURL
- 下書き
- テーマ
- 参考URL
- 素材メモ

本製品で整えるもの:

- 本文・コメントの取得候補
- 使う本文・コメントの選定
- 話者割り当て
- タイトル読み
- 改行
- 禁止語変換
- 台本案
- 素材パスと不足確認
- YMM4へ渡す前の制作データ

YMM4 / 利用者側で仕上げるもの:

- 音声
- 字幕
- 間
- 立ち絵
- 効果音
- 演出
- 事実確認
- 出典確認
- 権利確認
- MP4出力
- 投稿判断

## 必ず維持する商品事実

- 商品名: ゆっくりまとめプロセッサー
- 提供者: OTM株式会社
- 対応OS: Windows 10 / 11
- Mac: 非対応
- YMM4: 必須
- Free: あり
- Premium: 39,800円（税込）
- 課金形態: 買い切り
- 月額: なし
- 収益化保証: なし
- 再生数保証: なし
- 完成動画の自動生成: なし
- 投稿の自動化: なし
- AI台本案: 任意機能。生成内容は利用者が確認・修正する
- 素材、引用、出典、権利、公開判断は利用者が確認する

## 現時点で断定しないこと

以下は未確定または承認待ちとして扱います。ChatGPTやImageGenにも強い販売コピーへ変換させないでください。

- FreeでURL取得、AI台本案、保存、YMM4反映が何回までできるか
- Premiumで何が完全に追加されるか
- Premiumで使えるPC台数
- PC変更、再認証、同時利用ルール
- メジャーアップデートが買い切り価格に含まれるか
- 対応YMM4の具体バージョン
- 対応URLの完全一覧
- 外部AI/APIへ送るデータの機能別詳細
- 配布候補が正式公開版として承認済みであること
- 署名済みで警告が出ないこと

## 購入前ユーザーが知りたいこと

LPでは、上から順に次へ答えます。

1. 何を入れると何が出るか。
2. YMM4とどう関係するか。
3. Freeでどこまで確認できるか。
4. Premiumで何が追加・変更されるか。
5. Windows / YMM4前提か。
6. 動画は自動完成するのか。
7. 39,800円は買い切りか月額か。
8. 導入前に何を用意すればいいか。
9. 安全にダウンロード確認できるか。
10. 収益化や再生数保証はあるか。

## 現在の情報設計

現在のHome LPは、次の順番で構成されています。

1. Header: ホーム、ダウンロード、使い方、サンプル、料金、FAQ、アップデート、お知らせ、ブログ
2. Hero: 商品の役割、Free CTA、制作フローCTA、実画面スクリーンショット、YMM4との役割分担
3. Flow strip: 入力、整える、反映
4. Before / After: 手作業の繰り返しをどう減らすか
5. Workflow: URL・下書きから台本と素材を整えてYMM4へ渡す流れ
6. Product detail: 取得、整形、AI台本案、素材確認の実画面説明
7. Demo: 制作フロー動画。実操作証跡ではなく説明用
8. Use cases: 反応集、解説、ショートなどの使い分け
9. Free: 購入前に自分の環境で確認すること
10. Pricing: Free / Premium比較、39,800円（税込）、月額なし
11. Purchase conditions: 未確定条件を隠さず購入前確認として表示
12. Specs: Windows、YMM4、入力、APIキー、サポート、配布候補
13. Scope: 本製品の範囲と利用者/YMM4の範囲
14. FAQ: 料金、YMM4、Windows、動画自動完成ではないこと
15. Final CTA: Free版で制作フローを確認

## 現在の主要コピー

Hero:

- Kicker: YMM4向け まとめ動画制作支援ソフト
- H1: 記事・スレッドから、YMM4で仕上げる前準備まで。
- Lead: 記事URL・スレッドURL・下書きから、使う本文・コメントを選び、話者・改行・素材を整理。音声・字幕・間・演出はYMM4で仕上げます。
- Primary CTA: Free版を試す
- Secondary CTA: 制作フローを見る
- Microcopy: Windows 10 / 11｜YMM4必須｜Premium 39,800円（税込）・買い切り
- Product scope: 本製品で整える：本文・コメント / 話者 / 台本 / 素材
- YMM4 scope: YMM4で仕上げる：音声 / 字幕 / 間 / 演出 / 最終確認

Before / After:

- コピペ、話者分け、改行直し。一本ごとの繰り返しを減らす。
- ページを行き来して本文やコメントをコピー -> 対応URLから取得候補を確認して取り込む
- 話者、タイトル読み、改行を毎回設定 -> よく使うルールをプリセットで呼び出す
- 台本と素材フォルダを何度も往復 -> ボードで素材の位置と不足を確認する
- YMM4で同じ内容を一から並べ直す -> 確認した台本と素材をYMM4へ反映する

Workflow:

- URLでも、下書きでも始められる。
- 話者・改行・タイトルを、動画の型に合わせる。
- AI台本案は、必要なときだけ確認して使う。
- 素材と台本を確認し、YMM4で仕上げる。

Pricing:

- Premiumは39,800円（税込）。月額なしの買い切りです。
- Freeで動作とYMM4連携を確かめ、継続利用が必要になったらPremiumへ。
- 未確定の条件は確定値として表示しません。

FAQで必ず残す回答:

- Free版では、起動、ログイン、台本編集、素材確認、YMM4連携の流れを確認できる。
- Premiumは39,800円（税込）の買い切りで、月額料金はない。
- 完成・投稿まで自動で進めるアプリではない。
- YMM4は必須。
- Macやスマートフォンでは使えない。
- 収益化や再生数は保証しない。

## コピーのルール

使ってよい言い方:

- URLを貼るだけ
- YMM4前の前準備
- 少数URLでまず確認
- Freeで流れを見る
- Premium条件を確認
- 動画完成はYMM4で仕上げる
- 保存先と素材パスを先に揃える
- 使う本文・コメントを選ぶ
- 台本と素材の抜けを確認する

避ける言い方:

- 最先端
- 革新的
- 絶対
- 誰でも稼げる
- 完全自動
- 爆速収益化
- 再生数保証
- AIが全部やります
- 下ごしらえ
- 制限解除
- 無制限
- 使い放題
- 13キャラ
- YouTube分析

## 現在のビジュアル方向

方向性:

- Dark premium creator studio
- 実アプリスクリーンショットを主役にする
- 抽象ビジュアルより、製品デモとワークフローが重要
- 生成画像は控えめな背景、光、質感に限定
- 架空UI、AI生成UI、偽スクリーンショットを商品証拠にしない

現在のデザイントークン:

- 背景: `#090b0e`
- Surface: `#101419`
- Elevated: `#161b22`
- Text: `#f3f5f7`
- Muted: `#a7b0ba`
- Soft: `#7f8893`
- Primary blue: `#5b8cff`
- Blue hover: `#74a0ff`
- Mint: `#4fd1a5`
- Warning: `#f3b65a`
- Error: `#f07178`
- Container: `min(1220px, 100% - 48px)`
- Desktop section padding: `112px 0`
- Mobile section padding: `76px 0`
- Button radius: `10px`
- Card / media radius: `14px`
- Header height: desktop `68px`, mobile `62px`

現在のUI特性:

- ヒーローは左コピー、右実画面スクリーンショット
- スクリーンショットに短い注釈ラベルを重ねる
- CTAは青のPrimaryと半透明Secondary
- Before / Afterは比較テーブル
- Workflowは実画面付きステップ
- PricingはFree / Premiumカードと比較表
- Specsは要件表と責任範囲の2カラム
- FAQはdetails/summary
- モバイルは1カラム、CTAは幅100%、必要時に下部固定CTA

## ブラッシュアップで狙うこと

ChatGPT / ImageGenには、次を改善してほしいです。

- Heroで「何を入れると何が出るか」が3秒で分かる構図
- 実アプリスクリーンショットの見え方をより主役にする
- YMM4との役割分担を、説明文だけでなく視覚構造でも分かるようにする
- Free確認、Premium判断、未確定条件の分離を自然に見せる
- 39,800円の買い切り判断に必要な安心材料を上品に並べる
- 暗い高級感を維持しつつ、青・ミントだけの単調なSaaS感を避ける
- 「ゆっくり」「動画制作」「Windows工具感」が伝わるが、既存アニメ/IP風には寄せない
- スマホ表示を縦積みだけにせず、購入前確認の順序が読みやすい設計にする

やってはいけないこと:

- 架空のダッシュボードUIを商品スクリーンショットとして描く
- 光る3Dアイコン、盾、ダウンロード矢印、バッジで信頼感を演出する
- 汎用SaaSテンプレートの中央寄せヒーローにする
- 紫青グラデーション、浮遊カード、意味のない3カラム機能カードにする
- LP上で未確認値を確定値にする
- 証拠のない導入実績、ユーザー数、時短率を足す
- 収益化保証、再生数保証、完全自動生成を匂わせる

## ImageGenへ渡す前に添付するとよい素材

できれば、以下の実画面・実素材をChatGPT / ImageGenに添付します。

- `vite-site/public/product_get_script.webp`
- `vite-site/public/product_ai_script.webp`
- `vite-site/public/product_keyword_material.webp`
- `vite-site/public/lp/screen-home-shape-v1.webp`
- `vite-site/public/lp/screen-home-launcher-v1.webp`
- `vite-site/public/lp/screen-home-ymm4-reflected-v1.webp`
- 現在LPのdesktop / mobileスクリーンショット

注意: ImageGenに実画面を添付できない場合は、実画面部分を黒いプレースホルダーや「実スクリーンショット挿入位置」として扱わせます。架空のアプリ画面を描かせないでください。

## ChatGPTレビュー用プロンプト

```text
あなたは、Web販売LP、Windowsアプリの販売導線、UIデザイン、コピーライティング、法務リスク、SEO、アクセシビリティに強いレビュー担当です。

以下のブリーフを読み、ゆっくりまとめプロセッサーのHome / 販売LPをさらにブラッシュアップしてください。

目的:
- 既存の商品事実を守ったまま、Home LPの文章、情報設計、デザイン方向、ImageGen指示を磨く。
- 未確認事項を強い販売コピーに変えない。
- 実アプリスクリーンショットを証拠の主役にする。
- ImageGenで「完成デザイン画像」を作り、CodexがそれをReact/CSSで再現できる状態にする。

商品:
- ゆっくりまとめプロセッサー
- 記事URL・スレッドURL・下書きから、台本下地とYMM4前準備を支援するWindows向けツール
- YMM4を開く前の前準備を支援する
- 動画を完全自動生成するツールではない
- YMM4で最終編集・仕上げる前提
- Windows 10 / 11
- Mac非対応
- YMM4必須
- Freeあり
- Premium 39,800円（税込）
- 買い切り、月額なし
- 収益化保証、再生数保証なし

購入前ユーザーが知りたいこと:
1. 何を入れると何が出るか
2. YMM4とどう関係するか
3. Freeでどこまで確認できるか
4. Premiumで何が追加・変更されるか
5. Windows/YMM4前提か
6. 動画は自動完成するのか
7. 39,800円は買い切りか月額か
8. 導入前に何を用意すればいいか
9. 安全にダウンロード確認できるか
10. 収益化や再生数保証はあるか

維持するコピー方針:
- 短く具体的な日本語
- 「URLを貼るだけ」「YMM4前の前準備」「Freeで流れを見る」「Premium条件を確認」「動画完成はYMM4で仕上げる」などを優先
- 「完全自動」「AIが全部やります」「無制限」「制限解除」「誰でも稼げる」「再生数保証」は使わない

現在の情報設計:
1. Hero
2. Flow strip
3. Before / After
4. Workflow
5. Product detail with real screenshots
6. Demo video
7. Use cases
8. Free
9. Pricing
10. Purchase conditions
11. Specs / scope
12. FAQ
13. Final CTA

現在のデザイン方向:
- Dark premium creator studio
- 実アプリスクリーンショット中心
- 抽象ビジュアルより製品デモとワークフロー優先
- 生成画像は控えめな背景や質感のみ
- 架空UIやAI生成UIを商品証拠にしない
- 既存アニメ/IP風には寄せない

出力してほしいもの:

1. LP全体の改善方針
   - 情報設計
   - ユーザーフロー
   - 読みやすさ
   - アクセシビリティ
   - レスポンシブ
   - SEO
   - パフォーマンス
   - 法務/信頼リスク

2. 新しいHome LP構成案
   - セクション順
   - 各セクションの目的
   - 見出し案
   - 短い本文案
   - CTA案
   - 使うべき実スクリーンショット

3. Heroの方向性を3案
   - それぞれ明確に違うアートディレクション
   - ただし全案で商品事実と法務注意を守る
   - 汎用SaaSテンプレートは避ける

4. ImageGen / gpt-image-2用プロンプト
   - 6方向のdesktop full-page mockupを出すプロンプト
   - 1案選定後のdesktop / mobile / component sheet生成プロンプト
   - 実スクリーンショットを添付する場合の指示
   - 架空UIを描かせないための禁止事項

5. Codex実装用プロンプト
   - 画像をsource of truthとして扱う
   - React/CSSで再現する
   - 文字はHTMLテキスト
   - 実アプリスクリーンショットは既存アセットを使う
   - Playwright / Browserでdesktop 1440px、mobile 390pxを確認する

注意:
- 未確定事項を確定表現にしないでください。
- 偽の導入実績、利用者数、時短率、収益保証、再生数保証を追加しないでください。
- 画像生成で作ったUIを商品証拠として扱わないでください。
- デザインが良くなっても、商品の範囲が大きく見えすぎる表現は避けてください。
```

## ImageGen 6方向生成プロンプト

```text
Use ImageGen / gpt-image-2.

Create 6 distinct high-end landing page UI mockups for a Japanese Windows desktop app.

Product:
Yukkuri Matome Processor is a Windows tool for creators who make Yukkuri / YMM4 videos. It helps before opening YMM4: from article URLs, thread URLs, drafts, or themes, the user selects text and comments, assigns speakers, formats line breaks, checks material paths, and prepares script/material data for YMM4.

Important product truth:
- It does not fully auto-generate finished videos.
- It does not auto-publish videos.
- Final voice, subtitles, timing, effects, rights checks, and final edit happen in YMM4 by the user.
- Windows 10 / 11 only.
- YMM4 required.
- Free version available.
- Premium is 39,800 JPY tax included.
- One-time purchase.
- No monthly subscription.
- No revenue or view guarantee.

Audience:
Japanese creators who already use or plan to use YMM4 for reaction digests, article/thread summaries, explainers, and short-form Yukkuri videos. They want to reduce repeated copy/paste, speaker assignment, line break fixing, and material path checking before editing in YMM4.

Brand feeling:
Dark premium creator studio, precise, trustworthy, practical, editorial, slightly Japanese creator-tool mood. It should feel like a serious production workspace, not a flashy AI SaaS startup.

Goal:
Make the visitor understand in 3 seconds:
1. Paste URL or start from draft.
2. Prepare script, speakers, and materials.
3. Finish the video in YMM4.
Primary CTA: Free版を試す.
Secondary CTA: 制作フローを見る or Premium条件を確認.

Required sections:
- Hero with clear input -> prep -> YMM4 finish relationship.
- Real product screenshot area as the main visual.
- Before / After section about reducing repeated copy/paste, speaker assignment, line breaks, material checks.
- Workflow section with 3 or 4 steps.
- Free check section.
- Pricing section: Free and Premium 39,800円（税込）買い切り / 月額なし.
- Trust / specs section: Windows 10 / 11, YMM4 required, Mac unsupported, no full automatic video completion, no revenue guarantee.
- FAQ or final CTA.

Visual constraints:
- Use real app screenshot placeholders if actual screenshots are not attached.
- Do not invent fake app screens.
- Do not use generated fake UI as product evidence.
- Screenshot frames may show matte placeholders labeled "実アプリスクリーンショット" or asset file names.
- Avoid anime/IP character imitation.
- Avoid glossy 3D icon sets, shields, download arrows, glowing badges, floating panels, fake sci-fi devices, and surreal workflow machines.
- Avoid generic SaaS template, centered hero with dashboard card, purple-blue gradient default, floating pill badges, meaningless icon cards, and generic 3-column feature grid.
- Avoid visible fake testimonials, user numbers, time-saving stats, or success claims.

Design requirements:
- Full desktop website screenshots.
- Each direction must have a clearly different art direction.
- Prioritize composition, typography, spacing, hierarchy, and brand personality.
- Use realistic short Japanese UI copy.
- Make the design implementable in React/CSS.
- Use restrained motion cues only if visually represented.
- Desktop width target: 1440px.
- Include enough of the page to understand full scroll rhythm.

Output:
6 labeled directions.
Each direction should show a distinct top-to-bottom landing page composition, not only a hero.
```

## ImageGen 選定案の精密化プロンプト

```text
Refine direction #{番号}.

Generate three deliverables:
1. Desktop full-page landing page mockup for 1440px width.
2. Mobile full-page landing page mockup for 390px width.
3. Component/detail sheet for nav, buttons, screenshot frames, comparison table, pricing cards, FAQ, typography, colors, spacing, radius, and responsive rules.

Keep the same art direction.
Make it more premium, more specific to a Japanese YMM4 creator workflow, and less template-like.

Use these rules:
- The attached / referenced product screenshots are real product evidence.
- Do not redraw, replace, or fake the product UI inside screenshot frames.
- If a screenshot is missing, use a clear placeholder block labeled "実スクリーンショット挿入位置".
- Use real short Japanese copy.
- Prioritize the purchase-before-function questions:
  1. 何を入れると何が出るか
  2. YMM4とどう関係するか
  3. Freeでどこまで確認できるか
  4. Premiumで何が追加・変更されるか
  5. Windows/YMM4前提か
  6. 動画は自動完成するのか
  7. 39,800円は買い切りか月額か
  8. 導入前に何を用意すればいいか
  9. 安全にダウンロード確認できるか
  10. 収益化や再生数保証はあるか
- Mobile must be intentionally designed, not just stacked.
- Do not add fake metrics, testimonials, or overpromises.
- Do not use "完全自動", "無制限", "制限解除", "誰でも稼げる", "AIが全部やります", or "再生数保証".

Expected visual result:
Dark premium creator studio.
Real screenshot-first composition.
Clear input -> preparation -> YMM4 finish flow.
Calm but high-quality purchase decision UI.
```

## Codex実装用プロンプト

最終的にdesktop mockup、mobile mockup、component sheetをCodexへ添付して、次を投げます。

```text
添付したdesktop mockup、mobile mockup、component/detail sheetを、現在のVite / Reactサイトへ忠実に実装してください。

重要:
- デザインを一から作り直さないでください。
- 添付画像をsource of truthとして扱ってください。
- アクセシビリティ、レスポンシブ、実装制約に必要な場合だけ最小限の調整をしてください。
- 画像内の文字をそのまま画像として使わず、実HTMLテキストにしてください。
- 実アプリスクリーンショットは既存アセットを使ってください。
- 架空UI、偽スクリーンショット、AI生成UIを商品証拠として追加しないでください。
- モックアップに存在しないカード、バッジ、グラデーション、影、アイコン、アニメーションを勝手に足さないでください。
- 未確定事項を確定表現に変えないでください。
- 既存のLP法務ルール、AGENTS.md、D1〜D12ゲートを守ってください。

実装前に行うこと:
1. 添付画像を分析してください。
2. design contractを抽出してください。
   - color palette
   - typography scale
   - spacing scale
   - layout grid
   - border radius
   - shadows
   - screenshot treatment
   - section rhythm
   - responsive rules
3. 既存の `vite-site/src/pages/home-content.ts` の商品事実とコピーを確認してください。
4. 既存の `vite-site/src/pages/home-page.tsx` と `home-page.css` の実装パターンを確認してください。
5. 再利用コンポーネントと差し替えるセクションを特定してください。

実装対象:
- `vite-site/src/pages/home-page.tsx`
- `vite-site/src/pages/home-page.css`
- 必要なら `vite-site/src/pages/home-content.ts`
- 必要なら既存アセット参照のみ。新しいAI生成画像を商品証拠として追加しないこと。

検証:
1. `npm run lint`
2. `npm run build`
3. 必要なら `npm run test:copy`
4. 開発サーバーを起動
5. Browser / Playwrightで `http://localhost:5173` を確認
6. 1440px desktopと390px mobileでスクリーンショットを撮る
7. 添付モックアップとの差分レポートを作る
8. 上位10件の視覚差分を修正
9. CTAリンク、動画fallback、モバイル表示、フォントサイズ、重なり、横スクロールがないことを再確認
10. コミットする

最終報告:
- 変更ファイル
- 実装したデザイン差分
- 守った商品事実
- 実行したチェック結果
- 残った差分または未確定事項
```

## ChatGPTへ追加で聞くとよい質問

1. 今のLPは「購入前の不安を消す順序」として自然か。
2. HeroのH1は現在のままでよいか、それとも入力と出力をもっと明示した方がよいか。
3. 39,800円の買い切り判断に必要な情報は、Pricingより前に一部出すべきか。
4. Freeの未確定上限を断定しないまま、魅力を落とさず説明するコピーは何か。
5. YMM4との役割分担を、文章以外のUIでどう見せるべきか。
6. 実アプリスクリーンショットを主役にしたまま、ダークUIの単調さをどう避けるか。
7. スマホで最初に見るべき情報は、Hero、Free、YMM4関係、Pricingのどれか。
8. SEO上、Homeで強めるべき検索意図は「YMM4 台本」「ゆっくり まとめ 動画」「記事URL 台本化」のどれか。
9. 法務リスクを増やさずにPremiumの価値を伝える表現は何か。
10. ImageGenに作らせるべき3枚は、desktop full-page、mobile full-page、component sheetで十分か。追加でhero-onlyやpricing-onlyも必要か。

## 実装時の品質ゲート

LP作業として実装する場合は、完了前に次を確認します。

- lint
- typecheckを含むbuild
- copy / readiness系テストが必要なら実行
- desktop 1440px確認
- mobile 390px確認
- CTAリンク確認
- 動画fallback確認
- prefers-reduced-motion確認
- 横スクロールなし
- 文字重なりなし
- 実画面以外を商品証拠にしていない
- 未確定事項を確定表現にしていない
- `完全自動`, `無制限`, `制限解除`, `誰でも稼げる`, `再生数保証` などの禁止表現を入れていない

## ローカル参照ファイル

- `vite-site/src/pages/home-content.ts`
- `vite-site/src/pages/home-page.tsx`
- `vite-site/src/pages/home-page.css`
- `vite-site/src/data/product-facts.ts`
- `vite-site/src/data/site-content.ts`
- `docs/home-lp-100-point-definition-2026-06-22.md`
- `docs/home-lp-d1-d12-decision-record-2026-06-22.md`
- `docs/home-lp-d1-d11-answer-form-2026-06-23.md`
- `handoff/home-lp-deep-chatgpt-review-20260622/00-start-here/APP_FACTS_DIGEST.md`
