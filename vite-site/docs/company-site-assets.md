# 会社サイトの出典・素材制作記録

確認日: 2026-10-09

## 公開会社情報

- 法人名、住所、法人番号: [Gビズインフォ](https://info.gbiz.go.jp/hojin/ichiran?hojinBango=1021001079599)。既存サイトの住所と一致。
- 法人番号指定日2023年7月20日: [国税庁](https://www.houjin-bangou.nta.go.jp/henkorireki-johoto.html?selHouzinNo=1021001079599)。設立年月日とは区別する。設立年月日は公開情報で確定できていない。
- 事業内容: [会社が公開するランサーズのプロフィール](https://www.lancers.jp/client/TAKASAN_WARKS)。受注先、顧客数、売上、資金調達、委託者として掲載した募集案件を納入実績に転用しない。
- 代表者・既存の公開メール: 既存の `legal.organization` および利用者が承認した会社情報を使用。
- ポートフォリオは自社製品、今回の会社サイト、自主制作の3D作品の3件。架空の顧客案件・導入成果・受賞を記載しない。

## Claude Startupsへの申請準備

[公式条件](https://claude.com/programs/startups)には、直近5年の設立または直近2年の資金調達、Claude Consoleアカウント、Webサイトのドメインと一致する会社メール、開発内容の説明がある。申請は審査される。サイトの制作だけで採択を保証しない。

本作業では会社情報、事業、製品・制作例、連絡先を公開した。会社ドメインのメールアドレス、正確な設立日または該当する資金調達、Consoleのアカウント状態は未確認。公開の連絡先は確認できた既存のGmailを維持し、未作成のメールボックスを掲載しない。申請送信は行っていない。

## ブランド画像

ファイル: `public/company/architecture-art.webp` (1672×941)。Codex組み込みimagegenで新規生成した抽象ブランドアート。オフィス写真や顧客事例として扱わない。生成PNGをFFmpegでWebP quality 88へ変換。

使用プロンプト:

> Use case: stylized-concept. Asset type: original brand artwork for OTM Corporation, a Japanese software development company website, not a client project or office photograph. Create a very refined architectural still life of interlocking black graphite and satin anodized aluminum planes, one restrained vermilion orange insert, translucent smoked glass, precise chamfered edges and subtle real surface grain. An abstract visual expression of software architecture and connected systems. Sculptural composition arranged on a dark charcoal studio floor, seamless charcoal background, large softbox lighting from upper left, editorial macro product photography look, beautiful physical shadows and reflections, predominantly near-black and silver with a single #ff653d accent. Wide landscape artwork, sculpture positioned slightly right of center, breathing room, clean silhouette, no floating UI panels, no screens, no interface, no circuitry clichés, no neon glows, no text, no logo, no people, no invented company office or client evidence. Premium art direction, tactile and restrained, suitable as a full-width image on the dark/ivory/vermillion website.

## Blender作品

作品名: Interconnected Forms。`scripts/render-company-3d.py` でモデル・マテリアル・照明・カメラ・回転アニメーションを構築。Blender 4.5.14 / Cycles / AgX。外部の既成モデルは使っていない。

- `public/company/interconnected-forms.webp`: 1200×900、24 samples + denoise、quality 88。
- `public/company/interconnected-forms.webm`: 800×600、24 fps、96フレーム、4秒、12 samples + denoise。VP9 CRF 28、yuv420p、音声なし。
- 動画は詳細ページの手動再生プレイヤーで表示する。静止画ポスターと再生操作を提供し、自動再生を使用しない。
- `.blend`・元PNG・検収画像・動画はDドライブの成果物領域。GitにはWeb掲載用の小さなWebP/WebMと再制作用のPythonソースのみを含める。

実行例:

```powershell
python 'D:/3D素材ツール/UnityReconstructionToolkit/toolkit.py' blender 'C:/VScode/YukkuriMatomeProcessor-company-site/vite-site/scripts/render-company-3d.py' -- --output '<Dドライブ上の出力先>' --frames 96
```
