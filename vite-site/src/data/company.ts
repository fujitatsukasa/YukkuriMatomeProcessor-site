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
  { href: '#about', label: '私たちについて' },
  { href: '#business', label: '事業内容' },
  { href: '#products', label: 'プロダクト' },
  { href: '#company', label: '会社概要' },
] as const
