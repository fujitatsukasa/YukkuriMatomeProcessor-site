# Home LP D1〜D12 決定台帳 2026-06-22

この台帳は、`docs/home-lp-100-point-definition-2026-06-22.md` のv2定義に基づき、100点化に必要なD1〜D12の決定状態を追跡するためのものです。

コード上の正本は `vite-site/src/data/product-facts.ts` の `decisionRecords` です。この文書は、人間がレビューしやすい一覧です。

## 現在の結論

2026-06-22時点では、D1〜D11が未承認のため、以下はすべて派生No-Goです。

- `purchaseReady: false`
- `downloadReady: false`
- `publishReady: false`

これらは手入力ではなく、D1〜D11の確定状態とE2E検証条件から派生します。

## D1〜D12 一覧

| ID | 決定領域 | 現在状態 | 主担当 | ブロックするゲート |
| --- | --- | --- | --- | --- |
| D1 | 対象ユーザー、LPの役割、主要CV、商品成果物、非対応範囲 | pending | 事業責任者 | publishReady |
| D2 | Free機能、上限、単位、周期、上限到達時挙動 | pending | 事業責任者 | purchaseReady / publishReady |
| D3 | Premium権利、上限、公正利用、警告・停止条件 | pending | 事業責任者 | purchaseReady / publishReady |
| D4 | Googleアカウント、PC台数、同時利用、端末変更、再認証 | pending | 事業責任者 | purchaseReady / publishReady |
| D5 | 価格、決済、最終確認、権限付与、失敗時対応、返金、領収書 | pending | 事業責任者 / 法務・データ責任者 | purchaseReady / publishReady |
| D6 | 更新、保守、サポート、メジャー版、EOL | pending | 事業責任者 / 法務・データ責任者 | purchaseReady / publishReady |
| D7 | 対応入力、対応URL、取得範囲、非対応条件、権利確認 | pending | アプリ・リリース責任者 / 法務・データ責任者 | publishReady |
| D8 | YMM4対応版、出力形式、受渡手順、動作環境、互換性 | pending | アプリ・リリース責任者 | downloadReady / publishReady |
| D9 | 外部AI/API、送信データ、保持・削除、分析・テレメトリー | pending | 法務・データ責任者 | publishReady |
| D10 | 配布版、ファイル、SHA、署名、SmartScreen、リリースゲート | pending | アプリ・リリース責任者 | downloadReady / publishReady |
| D11 | 主張・証拠対応、実画面、実出力、動画、サンプル、権利 | pending | 事業責任者 / 法務・データ責任者 / アプリ・リリース責任者 | publishReady |
| D12 | purchaseReady、downloadReady、publishReadyの派生判定 | pending | Codex / 公開責任者 | purchaseReady / downloadReady / publishReady |

## ゲート算出ルール

### purchaseReady

Premium購入ゲートです。以下を満たすまでtrueにしません。

- 価格、税込表示、通貨、買い切り、支払方法の表示
- Free/Premiumの権利差、上限、公正利用条件
- Googleアカウント、PC台数、同時利用、再認証
- 更新・保守、最終確認、権限付与、返金、領収書
- 購入E2Eと法務・事業責任者承認

現在の主なブロッカー:

- D2
- D3
- D4
- D5
- D6
- D12

### downloadReady

Free配布ゲートです。以下を満たすまでtrueにしません。

- 公開バージョン、配布チャンネル、ファイル、サイズ、SHA-256
- 署名状態、発行者名、SmartScreen実測
- YMM4対応版、受渡形式、動作環境、互換性
- クリーンWindows 10 / 11での起動確認と公開責任者承認

現在の主なブロッカー:

- D8
- D10
- D12

### publishReady

LP公開ゲートです。以下を満たすまでtrueにしません。

- D1〜D11が証拠付きでconfirmed
- purchaseReadyとdownloadReadyの派生結果が意図通り
- G0〜G4のゲート条件が満たされる
- 公開責任者が承認する

現在の主なブロッカー:

- D1〜D12

## 回答時に必要なメタ情報

D1〜D11の回答には、最低限以下を付けます。

- 決定者
- 根拠資料
- 適用アプリ版
- 適用サイトcommit
- 発効日
- 再評価トリガー

Codexは、これらがない値をconfirmedとして扱いません。
