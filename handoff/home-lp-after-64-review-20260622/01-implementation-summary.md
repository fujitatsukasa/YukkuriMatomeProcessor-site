# 実装サマリー

## 対応したこと

- Heroリードを短縮し、商品範囲とYMM4仕上げ範囲を分離表示。
- モバイルHeroの順序を、H1、リード、Free CTA、商品画面、条件表示へ変更。
- 「60秒の操作デモ」「実際の完成映像」「動画作成の上限」「利用制限を解除」「実操作デモ」など、現状素材では証明が弱い表現をHomeから除去。
- デモ動画を「制作フロー解説」として表示し、連続した操作記録ではないことを明記。
- 実YMM4反映後画面として弱い素材を、YMM4反映証拠として扱わない構成へ変更。
- Free/Premium比較を、未確認の数値を盛らない表現に修正。
- 39,800円判断に必要な未確認条件を「購入前確認」パネルとして明示。
- FAQ JSON-LDを、画面表示中のFAQ 10件だけから生成。
- 未検証の `VideoObject` JSON-LDを削除。
- `publisher.name` を商品名ではなく法人名 `OTM株式会社` に変更。
- sticky CTAを、非表示時にDOMから外す形へ変更し、Tabフォーカスに残らないよう修正。
- 画像の主要表示を `object-fit: contain` へ寄せ、証拠部分が切れにくい表示へ修正。
- VTT字幕の最終時刻を実動画59秒に合わせて修正。
- コピー品質とモバイル表示の回帰テストを追加。

## 主な変更ファイル

- `vite-site/src/pages/home-content.ts`
- `vite-site/src/pages/home-page.tsx`
- `vite-site/src/pages/home-page.css`
- `vite-site/tests/copy-quality.spec.ts`
- `vite-site/tests/mobile-layout.spec.ts`
- `vite-site/public/lp/home-demo-60s.vtt`

## コミット

`4198df5 feat: Home LPの証拠性と料金明確性を改善`
