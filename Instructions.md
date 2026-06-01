# 開発手順

公開サイト本体は `vite-site/` です。現在のサイトバージョンは **V1.4** です。

## ローカル確認

- 既定プロファイル: `Serve: GUI (Default)`
- フォールバック: `Serve: No GUI`
- F5 実行: `Serve: GUI (Default)` (`--gui --open`)
- CLI 実行: `serve_local.cmd --no-gui --open`
- 研究用の別系統: `TechTouch Lab: GUI`

## 初回セットアップ

```bash
cd vite-site
npm install
```

## Vite コマンド

```bash
cd vite-site
npm run dev
npm run build
npm run audit:v1
npm run audit:perf
npm run audit:site
npm run preview
```

## 注意事項

- V1.4 の主要 CSS は `vite-site/src/site-v1.css` です。
- 旧デザインの `react-site.css` は使用しません。
- 虹色発光は CTA と選択状態に残し、常時動く装飾は抑制します。
- `serve_local.cmd` は互換用の名前を維持していますが、中身は Vite ランチャーです。
- GUI/F5 既定は変更しません。
