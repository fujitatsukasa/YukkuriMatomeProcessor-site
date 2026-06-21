# 02. 現行デザイン/UI仕様

## 全体トーン

- Dark premium creator studio
- 背景は黒/チャコール中心
- アクセントはゴールド、シアン、少量グリーン
- 角丸は基本8px
- 実機スクショを主役にする
- AI生成の謎ビジュアルは使わない

## 色

主要CSS変数:

```css
--lp3-bg: #050507;
--lp3-panel: rgba(11, 13, 18, 0.86);
--lp3-panel-strong: rgba(15, 18, 25, 0.95);
--lp3-ink: #fff8e5;
--lp3-text: #f8f2e6;
--lp3-muted: rgba(248, 242, 230, 0.7);
--lp3-line: rgba(255, 255, 255, 0.13);
--lp3-gold: #f0c75f;
--lp3-gold-strong: #ffe594;
--lp3-cyan: #65d8ff;
--lp3-green: #70e4b8;
--lp3-blue: #6ba7ff;
```

## フォント

現行指定:

```css
--lp3-display: "Zen Kaku Gothic New", "Noto Sans JP", var(--font-base);
--lp3-readable: "Noto Sans JP", var(--font-base);
```

課題:

- 高級感はまだ弱い。
- 日本語の見出しは太く見せているが、ブランド感は不足。
- 次案では、見出し用の日本語Webフォント/ロゴ処理をもっと詰める余地あり。

## レイアウト構成

1. Hero
2. Decision strip
3. できること
4. 30秒オート編集
5. 購入前に見るところ
6. 比較
7. 作れる動画
8. 使う流れ
9. 実画面
10. 実機デモ
11. 購入前の不安
12. 料金
13. 導入前の確認
14. FAQ
15. Final CTA

## Hero

PC:

- 左: コピー、CTA、proof chips
- 右: 実アプリスクショ、入力/出力ラベル、30秒フロー
- 背景: premium creator studio image

Mobile:

- Hero copyを先に出す
- proof chipsは非表示
- スクショ、入力/出力、30秒フローは縦積み

## カード

共通:

- border: 1px solid rgba(255,255,255,0.13)
- border-radius: 8px
- 背景は暗いパネル
- 左に細いシアン/ゴールドグラデ線

訴求カード:

- 上部に実アプリスクショ
- 下部にラベル、アイコン、タイトル、本文
- 生成画像ではなく実機スクショを使う

## 画像方針

必須:

- 実アプリスクショを第一優先
- 生成画像は背景質感、光、紙/布/壁などの非証拠背景だけ
- 生成画像でUIや機能を表現しない

禁止:

- 光る盾
- 光るダウンロード矢印
- 謎のライセンスカード
- ガラスっぽい3Dアイコン
- 浮遊パネル
- 架空の編集ソフト画面
- SF装置
- “AIが作ったっぽい”製品説明画像

## アニメーション

現行:

- Heroの光線スキャン
- 30秒フローの進捗バー
- hover時の軽いtransform
- reveal animationはサイト共通

制約:

- `prefers-reduced-motion: reduce` でアニメーション停止
- layout shiftを起こさない
- モバイルは軽くする

## レスポンシブ

Breakpoints:

- `1120px`: 主要2カラムを1カラムへ
- `760px`: モバイル最適化、カード1カラム、hero proof非表示
- `460px`: 見出しサイズをさらに縮小

## 現行スクショ

同梱:

```text
screenshots/desktop-hero.png
screenshots/desktop-feature-cards.png
screenshots/desktop-pricing.png
screenshots/desktop-fullpage.png
screenshots/mobile-hero.png
screenshots/mobile-feature-cards.png
```
