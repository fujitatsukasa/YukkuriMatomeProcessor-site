# 会社サイトの出典・素材制作記録

確認日: 2026-10-09

## アートディレクションと実時間グラフィック

会社サイトは黒・コバルト・コーラル・暖かい白を基本色にし、「面倒を減らす。創る時間を増やす。」を日本語の大きな見出しで伝える。事業の価値、公開中の製品、開発相談のテーマ、会社の目標をページと画像で説明する。英字見出しは [Barlow Condensed](https://fonts.google.com/specimen/Barlow+Condensed)、斜体は [Bodoni Moda](https://fonts.google.com/specimen/Bodoni+Moda)、小さなラベルは IBM Plex Mono、日本語見出しは [Zen Kaku Gothic Antique](https://fonts.google.com/specimen/Zen+Kaku+Gothic+Antique)、本文は Noto Sans JP。

トップの金属リボンは `src/components/company-motion.tsx` の手続き的メッシュとWebGLシェーダーによる実時間描画。反射・コーラルの帯・奥行き・ポインターに応じた角度変化を与える。SVGの文書・データ移動・出力と合わせ、入力→ソフトウェアとAI→使える成果物という考え方を示す。以下のBlender作品とは別のWeb表現で、顧客案件や製品の証拠として扱わない。

描画は約30fps、モバイルは約20fpsと低い解像度上限を使用する。画面外・非表示タブではWebGLの連続描画を止め、停止操作と `prefers-reduced-motion` に対応する。停止操作はSVGのデータ移動と英字帯も止める。WebGLが利用できない場合やコンテキスト喪失時にはSVGを表示する。JavaScriptなしでも静的本文とSVGを表示する。

文字は短い段階的な登場、下部の内容はスクロールに応じた表示を使う。会社サイトは目標と技術のページを加えた11ページで、製品の既存ページへ接続する。画像とBlender作品の来歴は以下のとおり。

## 公開会社情報

- 法人名、住所、法人番号: [Gビズインフォ](https://info.gbiz.go.jp/hojin/ichiran?hojinBango=1021001079599)。既存サイトの住所と一致。
- 法人番号指定日2023年7月20日: [国税庁](https://www.houjin-bangou.nta.go.jp/henkorireki-johoto.html?selHouzinNo=1021001079599)。設立年月日とは区別する。設立年月日は公開情報で確定できていない。
- 事業内容: [会社が公開するランサーズのプロフィール](https://www.lancers.jp/client/TAKASAN_WARKS)。受注先、顧客数、売上、資金調達、委託者として掲載した募集案件を納入実績に転用しない。
- 代表者・既存の公開メール: 既存の `legal.organization` および利用者が承認した会社情報を使用。
- ポートフォリオは自社製品、今回の会社サイト、自主制作の3D作品の3件。架空の顧客案件・導入成果・受賞を記載しない。

## Claude Startupsへの申請準備

[公式案内](https://claude.com/programs/startups)を2026-10-09に再確認した。現在は、無料1年のClaude Teamと$1,000 APIクレジットの申請が提供枠を超え、プログラムを再構成し、申請を再審査すると案内している。過去に確認した条件を現行の必須条件として断定しない。Claude Codeが全員無料になる制度とは記載しない。サイトの制作だけで採択を保証しない。

本作業では会社情報、目的、事業、AIの設計方針、製品・制作例、連絡先を整えた。会社ドメインのメールアドレス、正確な設立日、資金調達、Consoleのアカウント状態は未確認。公開の連絡先は承認済みのGmailを使用し、未作成のメールボックスを掲載しない。申請送信は行っていない。説明文と確認項目は [申請準備資料](claude-startups-preparation.md) に記録する。

## 仕事と創作のコンセプト画像（今回の追加）

実行モード: Codex組み込み `image_gen` / generate。参照画像なし・背景透明なし。画像は会社の価値を説明するオリジナルのコンセプト表現で、実際の社員、オフィス、顧客案件の写真ではない。掲載箇所に `VISUAL CONCEPT` と記載する。最終素材はFFmpegでWebP quality 86へ変換。

- `public/company/creative-work.webp`: 1672×941、151,426 bytes。元PNG: `C:/Users/takas/.codex/generated_images/01a11e15-8624-7241-a2a3-a6e70464778f/exec-cde912a3-50c3-40f6-bf59-d86c52c1355c.png`。
- `public/company/connected-work.webp`: 1536×1024、129,328 bytes。元PNG: `C:/Users/takas/.codex/generated_images/01a11e15-8624-7241-a2a3-a6e70464778f/exec-8ff9cea9-7ae5-43e4-8095-7030008bdb79.png`。
- 元画像の保存先: `D:/YMPArtifacts/yukkurimatomeprocessor_Ver2_VITE/run_artifacts/otm-company-site/20261009-purpose/`。

プロンプトセット（制作仕様）:

```text
Use case: photorealistic-natural
Asset: Creative work / original company website concept visual
Create an editorial photograph-like visual of adult hands arranging physical storyboard sheets on a charcoal worktable. Show a pencil, the cropped back of an unbranded laptop, a cobalt ruler, and coral paper tabs. Arrange the rough materials and a cleaner sequence diagonally to express preparation leading to creative work. Cinematic natural light; tactile paper and tabletop; charcoal, warm white, cobalt and coral. This is an illustrative concept, not an actual company office, employee or client project. No legible text, fake UI, logos, neon, robots or copyrighted characters.

Use case: photorealistic-natural
Asset: Connected work / original company website concept visual
Create a bright top-down editorial photograph-like visual of two adults' hands diagramming a work process on physical cobalt blue paper on a warm white table. White input paper rectangles lead to a coral central element and three coral outputs. Include a pencil and only the edge of a closed unbranded laptop. Crisp daylight shadows and physical paper texture. Express scattered information becoming one usable workflow. This is an illustrative concept, not an actual company office, employee or client project. No legible text, numbers, interfaces, logos, robots or neon.
```

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
