# Development Instructions

このリポジトリの公開サイト本体は `vite-site/` です。
既定のローカルプレビューも Jekyll ではなく Vite を起動します。

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
npm run preview
```

## Troubleshooting

- `npm was not found`: Node.js をインストールし、PATH を通して再起動
- `node_modules was not found`: `cd vite-site && npm install` を実行
- ポート競合: 既存の Vite プロセスを停止して再起動

## Notes

- `serve_local.cmd` は互換用の名前を維持していますが、中身は Vite ランチャーです
- TechTouch の研究ページは `serve_techtouch_lab.py` / `serve_techtouch_lab.cmd` で別起動です
