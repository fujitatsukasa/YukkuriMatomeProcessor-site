# 検証レポート

## 実行済みコマンド

```text
npm run lint
npm run build
npm run test:copy
npm run test:mobile
npm run audit:perf
```

## 結果

```text
lint: 成功
build: 成功
copy test: 14 passed
mobile test: 30 passed
performance audit: Good
```

## Performance Audit

`npm run audit:perf` の結果:

```text
averageFps: 60.3
cls: 0
fcpMs: 548
lcpMs: 1040
longTaskTotalMs: 387
minFps: 60
requestCount: 13
transferKb: 1212.9
```

評価:

```text
averageFps: good
cls: good
fcp: good
lcp: good
longTaskTotal: good
minFps: good
```

## browser_subagent視覚QA

確認URL:

```text
http://127.0.0.1:4178/
```

確認viewport:

```text
1440x900
1280x800
1024x768
768x1024
430x932
390x844
360x800
```

確認項目:

- HeroのH1 / CTA / 条件文 / 実画面表示
- 横スクロールなし
- フォントサイズ・改行の破綻なし
- Headerアンカー到達
- `#workflow #product #demo #samples #free #pricing #specs #faq`
- 60秒デモのposter / fallback / クリック後video表示
- サンプル動画3本のposter / fallback / クリック後video表示
- 画像拡大モーダルのEscape閉じ
- FAQ開閉
- モバイルsticky CTA
- `prefers-reduced-motion: reduce`

判定:

```text
OK
```

補足:

```text
skip-link が通常時に画面外へあることはアクセシビリティ用の正常な待機位置として扱っています。
```

## 禁止コピー/プレースホルダー確認

Home表示対象ファイルで以下を検索し、ヒットなし:

```text
[具体値]
[確定値]
[要確定]
[正式一覧]
[詳細]
[登録要否]
[ファイルサイズ]
[確定した利用範囲]
30秒で自動動画編集
完全自動
AIが全部
誰でも稼げる
再生数保証
収益化保証
革新的
圧倒的
シームレス
下ごしらえ
まとめて進める
自分の制作に入る
最先端
爆速収益化
権利確認不要
YMM4不要
Mac対応
スマホだけで完結
premium-creator-studio-bg
main-demo-90s
usecase-reaction
usecase-dialogue
usecase-shorts
```

## VSCode/F5設定確認

`.vscode/launch.json` は未編集。念のため確認済み:

```text
JSON parse: ok
First profile: Serve: GUI (Default)
First args: --gui --open
First purpose: debug-in-terminal
cwd: ${workspaceFolder}
GUI profile exists: true
No-GUI hidden fallback exists: true
```
