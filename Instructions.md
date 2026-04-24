# Development Instructions

公開サイト本体は `vite-site/` です。現在のサイトバージョンは **V1.1** です。

## Local Preview

- 既定プロファイル: `Serve: GUI (Default)`
- フォールバック: `Serve: No GUI`
- F5 実行: `Serve: GUI (Default)` (`--gui --open`)
- CLI 実行: `serve_local.cmd --no-gui --open`
- 研究用の別系統: `TechTouch Lab: GUI`

## First Setup

```bash
cd vite-site
npm install
```

## Vite Commands

```bash
cd vite-site
npm run dev
npm run build
npm run audit:v1
npm run preview
```

## Notes

- V1.1の主要CSSは `vite-site/src/site-v1.css` です。
- 旧デザインの `react-site.css` は使用しません。
- 虹色発光はCTAや選択状態に残し、常時動く装飾は抑制します。
- `serve_local.cmd` は互換用の名前を維持していますが、中身は Vite ランチャーです。
- GUI/F5 既定は変更しません。
