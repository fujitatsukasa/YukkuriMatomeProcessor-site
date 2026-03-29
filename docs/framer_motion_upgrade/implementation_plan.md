# 実装計画：Framer Motionによる最高峰SaaSランディングページへのアップグレード

## 目標
現在の「1画面完結型（100svh）」の美しいレイアウト構造を崩すことなく、**Framer Motion** の強力な物理エンジン（Spring）と宣言的アニメーション（Declarative Animation）をフル活用し、以下の「最高級SaaS（Linear, Vercel, Stripe等）」と同等のインタラクション体験を実現する。

## 1. 導入と基礎設定
- `vite-site` への `framer-motion` のインストール（完了済）。
- `home-page.tsx` で独自実装されていた Intersection Observer (`useInView` フックや `data-reveal` クラス付与制御) を廃止。
- 代わりに、Framer Motion が提供する `whileInView`, `useInView`, `<motion.div>` へとロジックをリファクタリングする。

## 2. アニメーションの基本方針（Variants化）
### A. Spring Physics（バネ挙動）の全面採用
CSSの `ease-in-out` や `ease-out` による単調（Linear）な動きを排除し、以下のような `type: "spring"` の設定を共通のトランジションとして使用する。
これにより、「ポヨン」とした心地よい吸い付きや重みのある入場効果を演出する。
```ts
const springConfig = { type: "spring", stiffness: 120, damping: 20 };
```

### B. Stagger（カスケード表示）の実装
ヒーローセクションのキャッチコピー、ボタン群、Featuresのステップ、Speedのダッシュボードリストなどは、すべて親要素（Container）に `staggerChildren` の設定を行い、子要素が順番に滝のように出現する動きを自動化する。

## 3. コンポーネント別の改修ポイント (`home-page.tsx`)

### ① Hero セクション (1画面目)
- タイトル・リード文・ボタン・Proof等：
  初期状態 `y: 40, opacity: 0` から `y: 0, opacity: 1` へ順次 Stagger アニメーション。
- 背景の光のオーブ (`hero-ambient-vortex`):
  Framer Motion の `animate` で、ゆったりと浮遊する無限アニメーション (`repeat: Infinity, repeatType: "reverse"`) を適用。

### ② Features セクション (制作フロー)
- セクション見出し (`home-compact-section-head`): `whileInView` でスクロール到達時に `y: 30 -> 0` でポップアップ。
- ステップナビゲーション（1〜5の丸タブ）＆ モックアップレイヤー:
  選択切り替え時に `layoutId` や `AnimatePresence` を用いて、残像を残しながらシームレスに変形・移動する「マジックムーブ（Magic Move）」を実装する。

### ③ Speed セクション (Dashboard)
- サークル型の削減率リング: `viewport={{ once: true }}` で要素表示時に、リングがスルスルと伸びる（StrokeDashoffset）アニメーション。
- 3つのBreakdown行（ネタ探し、台本整理、YMM4前調整）:
  手動で計算していた `transition-delay: var(--row-delay)` のCSS変数を廃止し、`<motion.div variants={itemVariant}>` を使って Stagger 表示へ切り替える機能（`whileInView`）。

### ④ Use Case, Pricing, FAQ セクション
- カード群（Use Case の4枚のカード、FAQの各アコーディオン開閉等）に対しても `<motion.div>` を導入し、ホバー時の動きや拡大/縮小の `whileHover={{ scale: 1.02, y: -5 }}` を付与。物理ベースの跳ね返りを持たせる。

## 4. CSSの不要な設定のクリーンアップ (`react-site.css`)
- `data-reveal`, `.is-revealed`, `.is-visible` などの手動CSSクラスアニメーション・Keyframes（`compact-fade-up` 等）を削除。
- 責任をFramar Motionのインラインスタイル/トランジションに完全に委譲し、コードの見通しを良くする。

---
**フェーズ1**: `home-page.tsx` の内部ロジック差し替えと Stagger アニメーションの導入
**フェーズ2**: `react-site.css` の不用なトランジション削除
**フェーズ3**: 最終品質の目視確認とスプリング調整
