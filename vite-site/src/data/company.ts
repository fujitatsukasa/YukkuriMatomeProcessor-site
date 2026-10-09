import { legal, siteOrigin } from './site-content'

// Company contact details share the existing public company record.
// Update legal.organization.email to change the published email everywhere.
export const company = {
  name: legal.organization.legalName,
  shortName: 'OTM',
  origin: siteOrigin,
  email: legal.organization.email,
  representative: legal.organization.operatorName,
  postalCode: legal.organization.postalCode,
  address: legal.organization.addressLine,
  corporateNumber: '1021001079599',
  corporateRecordUrl: 'https://info.gbiz.go.jp/hojin/ichiran?hojinBango=1021001079599',
  corporateNumberAssigned: '2023年7月20日',
  nationalTaxRecordUrl: 'https://www.houjin-bangou.nta.go.jp/henkorireki-johoto.html?selHouzinNo=1021001079599',
  description:
    'OTM株式会社は、ソフトウェアの企画・開発、AI活用・業務自動化、自社プロダクトの開発に取り組む会社です。Webとデスクトップの技術で、仕事と創作を支える仕組みをつくります。',
  productPath: '/products/ymp/',
} as const

export const companyServices = [
  {
    number: '01',
    label: 'SOFTWARE DEVELOPMENT',
    title: 'ソフトウェア開発',
    description:
      '使う人と業務の流れに合わせて、Web・デスクトップアプリケーションを設計。画面からデータ処理まで、一つの使いやすい仕組みにまとめます。',
    tags: ['Webアプリケーション', 'デスクトップアプリ', 'システム設計'],
  },
  {
    number: '02',
    label: 'AI & WORKFLOW',
    title: 'AI活用・業務自動化',
    description:
      '情報の整理、文章の作成支援、繰り返し作業の自動化。人が確認・判断する工程を組み込みながら、AIを実際の作業に役立つ機能へ落とし込みます。',
    tags: ['生成AIの活用', '外部API連携', 'ワークフロー設計'],
  },
  {
    number: '03',
    label: 'OUR PRODUCTS',
    title: '自社プロダクト',
    description:
      '日々の仕事や創作にある手間を、ソフトウェアで解決する。企画から開発、使い方の案内、継続的な改善まで、自社製品として取り組みます。',
    tags: ['製品企画', 'アプリケーション開発', '運用・改善'],
  },
] as const

export const companyNavigation = [
  { href: '/about/', label: '会社案内' },
  { href: '/services/', label: '事業紹介' },
  { href: '/portfolio/', label: '制作実績' },
] as const

export const companyWorks = [
  {
    slug: 'ymp', number: '01', category: 'OWN PRODUCT / SOFTWARE', type: '自社プロダクト',
    title: 'ゆっくりまとめプロセッサー', subtitle: '制作の前準備を、一つのワークフローへ。',
    description: '素材の取得、台本案の作成、編集用データの整理。Windows向けの制作支援アプリケーションを自社開発しています。',
    role: '製品企画・ワークフロー設計・アプリケーション開発・運用',
    tags: ['Python', 'React / TypeScript', 'Windows', 'AI作成支援'],
    image: '', imageAlt: '',
    challenge: '制作前に必要な情報や素材が複数の場所に分かれ、取得・整理・台本づくりの間を行き来する手間がある。',
    solution: '対応URLからの取り込み、台本の整形、素材とセリフのボード整理をつなぎ、YMM4で仕上げるための前準備を支援する設計にしました。',
    deliverables: ['Web技術を使ったWindows向けUI', '素材・台本・制作データを扱う処理', 'AIによる台本案の作成支援', '導入・使い方・更新情報を提供する製品サイト'],
    scope: '動画を自動で完成させる製品ではありません。最終編集はYMM4で行い、素材の権利・出典・内容を利用者が確認します。',
  },
  {
    slug: 'otm-website', number: '02', category: 'OWN PROJECT / WEB DESIGN', type: '自社制作',
    title: 'OTM Corporate Website', subtitle: '事業と制作の背景を、伝わる形に。',
    description: 'OTM株式会社の事業・会社情報・制作例を紹介する公式サイト。情報設計からビジュアル、動き、実装までをまとめています。',
    role: '情報設計・アートディレクション・フロントエンド実装',
    tags: ['React / TypeScript', 'Responsive design', 'Motion graphics', 'Accessibility'],
    image: '/company/architecture-art.webp', imageAlt: '黒と銀の構造体に朱色を合わせたOTMのオリジナルブランドアート',
    challenge: '製品単体の案内から、ソフトウェア開発会社として何に取り組んでいるかを伝えるサイトへ広げる。',
    solution: '会社案内、事業紹介、制作実績、お問い合わせを独立したページに整理。日本語と英字の字体を分け、コードによる動きとオリジナルの3D素材を組み合わせました。',
    deliverables: ['会社サイトと制作例の詳細ページ', 'PC・タブレット・スマートフォンへの対応', '読みやすさを優先した文字と配色の設計', '静的HTML・構造化データ・動きを減らす設定への対応'],
    scope: 'この公式サイト自体を紹介する自社制作事例です。第三者からの受託案件ではありません。',
  },
  {
    slug: '3d-study', number: '03', category: 'SELF-INITIATED / VISUAL STUDY', type: '自主制作・3D表現研究',
    title: 'Interconnected Forms', subtitle: 'つながる構造を、立体と光で描く。',
    description: 'Blenderでモデリング・マテリアル・照明・アニメーションを制作した、OTMのためのオリジナルのビジュアルスタディです。',
    role: '3Dモデリング・マテリアル設計・ライティング・モーション制作',
    tags: ['Blender', 'Cycles', 'Procedural modeling', '3D animation'],
    image: '/company/interconnected-forms.webp', imageAlt: 'Blenderで制作した黒・銀・朱色の連結する立体フレーム',
    challenge: '異なる技術や機能がつながって一つの仕組みになる、という会社の考え方を視覚で表現する。',
    solution: '黒、銀、朱色の三つのフレームを立体として組み合わせ、金属の反射と光の変化が分かる短いループを制作しました。',
    deliverables: ['オリジナルのプロシージャル3Dモデル', 'マテリアルとスタジオ照明の設計', 'Web掲載用の静止画と短いループ映像', '再制作できるBlender用ソース'],
    scope: '今回の公式サイト向けに制作した自主制作作品です。顧客案件や過去の納入実績ではありません。',
  },
] as const

export const corporateRoutes = ['/', '/about/', '/services/', '/portfolio/', ...companyWorks.map((work) => `/portfolio/${work.slug}/`), '/inquiry/', '/privacy/']
