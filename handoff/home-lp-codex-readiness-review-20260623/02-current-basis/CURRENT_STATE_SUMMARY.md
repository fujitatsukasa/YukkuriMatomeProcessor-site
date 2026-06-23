# Current State Summary

作成日: 2026-06-23

## 現在の判定

現在のLPは、販売・配布・公開の全ゲートがNo-Goです。

- `purchaseReady: false`
- `downloadReady: false`
- `publishReady: false`

これは実装不備ではなく、D1〜D11が未承認であるための意図した状態です。

## 今回Codexが追加したこと

1. D1〜D11回答フォームを `decisionAnswerRequirements` としてコード化
2. 人間が埋める回答フォーム `docs/home-lp-d1-d11-answer-form-2026-06-23.md` を追加
3. D10の0.0.18系情報を `releaseCandidateDistribution` として配布候補に固定
4. D10 confirmed前は、公開版・最新版・正式配布として扱わないように表示を調整
5. 実行ファイル直DL、SHA一覧外部リンク、ライブ配布メタデータ反映を `downloadReady` でゲート
6. 未確定値が本文、meta、JSON-LD、alt、aria-label、title属性に確定表現として漏れないテストを追加
7. 配布版番号、配布URL、SHA、ファイル名、サイズが `product-facts.ts` 以外へ重複しない監査テストを追加
8. CTA、SEO、schema、アクセシビリティ、動画フォールバック、DOM性能の基本監査を追加
9. Samplesページの動画カードに別タブfallbackを追加

## まだCodexだけでは確定できないこと

- D1: 対象ユーザー、主要CV、成果物、非対応範囲
- D2: Free条件
- D3: Premium条件
- D4: Googleログイン、PC台数、再認証
- D5: 決済、権限付与、返金、領収書
- D6: 更新、保守、サポート、EOL
- D7: 対応URL、非対応条件、権利確認
- D8: YMM4対応版、出力形式、互換性
- D9: 外部AI/API、送信データ、保持・削除
- D10: 公開配布版、署名、SHA、SmartScreen、クリーンWindows確認
- D11: 主張・証拠対応、実画面、実出力、素材権利

## レビュー観点

ChatGPTには、現LPを無理に100点化するのではなく、以下をレビューしてほしいです。

- Codexが追加した仕組みが、100点化の土台として妥当か
- D1〜D11回答フォームに漏れがないか
- 未確定値の漏れ検査が十分か
- D10配布候補の扱いが安全か
- 追加QAが販売LPとして十分か
- 次にCodexがやるべきことと、人間が決めるべきことが分離できているか
