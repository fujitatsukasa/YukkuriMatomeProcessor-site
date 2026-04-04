import { media } from '@/data/assets'

export type NavItem = {
  key: 'home' | 'download' | 'instructions' | 'update' | 'news' | 'faq' | 'purchase' | 'contact' | 'blog'
  label: string
  url: string
}

export type ActionItem = {
  label: string
  href: string
  variant?: 'primary' | 'ghost'
  external?: boolean
}

export type FaqGroup = {
  id: string
  label: string
  items: Array<{
    question: string
    answer: string
  }>
}

export type NewsPost = {
  path: string
  date: string
  dateLabel: string
  title: string
  subtitle: string
  summary: string
  seoDescription: string
  seoImage: string
  heroImageAlt: string
  body: string[]
}

export type PageEntry = {
  label: string
  navKey?: NavItem['key']
  parent?: string
  hideBreadcrumbs?: boolean
}

export const siteOrigin = 'https://yukkurimatomeprocessor.com'
export const siteTitle = 'ゆっくりまとめプロセッサー'
export const siteSubtitle = 'Yukkuri Matome Processor'
export const siteTagline = '台本取得・整形・YMM4準備ツール'
export const siteDescription =
  '動画編集の前処理から台本整理、制作運用までを効率化する日本語向けワークフロー支援ツール。'

export const navItems: NavItem[] = [
  { key: 'home', label: 'ホーム', url: '/' },
  { key: 'download', label: 'ダウンロード', url: '/download/' },
  { key: 'instructions', label: '機能と使い方', url: '/instructions/' },
  { key: 'purchase', label: '料金', url: '/purchase/' },
  { key: 'faq', label: 'FAQ', url: '/faq/' },
  { key: 'blog', label: 'ブログ', url: '/blog/' },
  { key: 'news', label: 'お知らせ', url: '/news/' },
]

export const primaryCta: ActionItem = {
  label: '無料で開始する',
  href: '/download/',
  variant: 'primary',
}

export const secondaryCta: ActionItem = {
  label: 'お問い合わせ',
  href: '/contact/',
  variant: 'ghost',
}

export const legal = {
  organization: {
    name: siteTitle,
    legalName: 'OTM株式会社',
    sellerName: 'OTM株式会社',
    operatorName: '代表取締役社長 藤田 僚',
    postalCode: '〒242-0017',
    addressLine: '神奈川県大和市大和東3-5-24 2F',
    phone: '090-6170-2570',
    email: 'fujita.otm@gmail.com',
    businessHours: '平日 10:00-18:00（土日祝・年末年始を除く）',
  },
  links: [
    { label: '特定商取引法に基づく表記', url: '/legal/commercial-transactions/' },
    { label: '利用規約', url: '/legal/terms/' },
    { label: 'プライバシーポリシー', url: '/legal/privacy/' },
    { label: '返金・キャンセルポリシー', url: '/legal/refund-policy/' },
  ],
  pricing: {
    plans: [
      { name: 'Free', price: '¥0', priceTax: '無料', term: 'ずっと無料', description: '基本機能をフル活用' },
      { name: 'Standard', price: '¥5,000', priceTax: '税込 5,500円', term: '月額', description: '個人クリエイター向け' },
      { name: 'Pro', price: '¥10,000', priceTax: '税込 11,000円', term: '月額', description: '圧倒的おすすめ・全機能解放' },
    ],
    productName: 'ゆっくりまとめプロセッサー',
    modelLabel: '月額サブスクリプション（無料プランあり）',
    additionalFees: '銀行振込手数料およびコンビニ支払い手数料は購入者負担',
    unitPrice: '5000',
    currency: 'JPY',
  },
  payment: {
    methods: ['クレジットカード', 'コンビニ支払い', '銀行振込', 'PayPal'],
    timing: '注文確定時（前払い・月額自動課金）',
    noteBankPaypal:
      '銀行振込・PayPalをご希望の場合はお問い合わせ窓口で案内します。',
    noteOnline: 'クレジットカード・コンビニ支払いはオンライン決済で対応します。',
    deadlineRules: [
      { method: 'クレジットカード', limit: '毎月自動決済' },
      { method: 'コンビニ支払い', limit: '請求日を含む2日以内' },
      { method: '銀行振込', limit: '請求日を含む3日以内' },
      { method: 'PayPal', limit: '自動決済' },
    ],
    unpaidPolicy:
      '支払期限を経過した場合、有料プランの機能は一時停止となります。',
    bankAccountPolicy:
      '銀行振込先情報は不正請求防止のため、問い合わせ受付後に個別案内します。',
  },
  delivery: {
    timing: '決済完了後、即時にプラン機能が有効化',
    method: 'アプリ内でのプラン有効化（ライセンスキー方式またはアカウント連携）',
  },
  refund: {
    summary: 'サブスクリプションは次回更新日までに解約すれば追加課金なし。日割り返金は原則不可',
    defectiveResponse: '提供不備または重大な不具合がある場合は個別対応',
    procedure: '問い合わせ窓口へ申告後、事実確認のうえ対応方針を案内',
    defectClaimDeadline: '課金日から7日以内に不備内容を申告してください。',
    remedyPolicy:
      '不備が確認された場合は、原則として修補または代替手段の提供で対応します。',
    refundMethod:
      '修補対応が困難な場合に限り、当社判断で返金対応を行います（返金は原則として元の決済手段で実施）。',
    refundFeeBurden: '当社責に基づく返金時の手数料は当社負担とします。',
  },
  cancellation: {
    subscription:
      '有料プラン（Standard / Pro）はいつでも解約可能です。解約後も当月の残り期間は引き続き利用できます。解約後は自動的にFreeプランへ移行します。',
  },
  support: {
    operationHours: '平日 10:00-18:00（土日祝・年末年始を除く）',
    firstResponseSla: '2営業日以内を目安に一次回答',
  },
  terms: {
    governingLaw: '日本法',
    jurisdiction: '東京地方裁判所を第一審の専属的合意管轄裁判所',
  },
  privacy: {
    analyticsTools: ['Google Analytics'],
  },
  meta: {
    legalLastUpdated: '2026-04-03',
    termsLastUpdated: '2026-04-03',
    privacyLastUpdated: '2026-02-11',
    refundLastUpdated: '2026-04-03',
  },
}

export const supportChannels = [
  {
    name: 'メール',
    href: 'mailto:fujita.otm@gmail.com',
    description: '契約条件、請求、不具合の詳細共有など、記録を残したい問い合わせ向けです。',
  },
  {
    name: 'X (Twitter)',
    href: 'https://x.com/OTM_corp',
    description: '告知確認や短い質問に向いています。',
  },
  {
    name: 'Discord',
    href: 'https://discordapp.com/users/762244902124912695',
    description: 'リアルタイムで相談したい場合に向いています。',
  },
  {
    name: 'Chatwork',
    href: 'https://www.chatwork.com/fujita_otm',
    description: '業務連絡や継続的なやり取り向けです。',
  },
]

export const downloadUrl =
  'https://github.com/fujitatsukasa/YukkuriMatomeProcessor/releases/latest/download/YukkuriMatomeProcessor.zip'
export const latestReleaseUrl =
  'https://github.com/fujitatsukasa/YukkuriMatomeProcessor/releases/latest'
export const releasesUrl =
  'https://github.com/fujitatsukasa/YukkuriMatomeProcessor/releases'
export const tagsUrl = 'https://github.com/fujitatsukasa/YukkuriMatomeProcessor/tags'
export const changeLogUrl =
  'https://github.com/fujitatsukasa/YukkuriMatomeProcessor/blob/main/CHANGELOG.md'

export const faqGroups: FaqGroup[] = [
  {
    id: 'faq-general',
    label: '全般',
    items: [
      {
        question: 'ゆっくりまとめプロセッサーは何を解決するツールですか？',
        answer:
          '台本取得から編集開始までの前工程を半自動化し、準備時間の短縮と品質の再現性を高めます。',
      },
      { question: '無料で試せますか？', answer: 'はい。7日間の無料トライアルで全機能を確認できます。' },
      { question: '想定ユーザーは誰ですか？', answer: '個人配信者、副業クリエイター、チーム運用担当者を想定しています。' },
      {
        question: '導入前に必ず確認すべきページは？',
        answer:
          'ダウンロード、使い方、FAQ、購入の順で確認してください。必要に応じて法務ページも併読してください。',
      },
    ],
  },
  {
    id: 'faq-onboarding',
    label: '導入',
    items: [
      { question: '導入時に最初にやるべきことは？', answer: '最新版をダウンロードし、YMM4実行パスと保存先フォルダを設定してください。' },
      { question: '対応OSは何ですか？', answer: 'Windows環境での利用を前提に設計しています。' },
      { question: '初期設定を早く終えるコツは？', answer: '使い方ページのSTEP順で設定し、変更内容をメモすると再作業を減らせます。' },
      { question: 'チーム導入時に決めるべき項目は？', answer: '保存先命名ルール、連携パス、運用チェックリストの3点を先に揃えてください。' },
    ],
  },
  {
    id: 'faq-script',
    label: '台本取得',
    items: [
      { question: '台本取得はどのように行いますか？', answer: '対応サイトのURL入力後、記事を選択して取得し、編集用に整形します。' },
      { question: '取得した台本は再編集できますか？', answer: 'はい。不要行削除、見出し整理、読み上げ向け調整が可能です。' },
      { question: 'URLエラーで取得できない場合は？', answer: 'URL形式、対象対応状況、ネットワークの順で確認してください。' },
      { question: '取得件数が多いときの運用は？', answer: 'まず試用用サンプルで手順を固定し、その後に本番件数へ拡張してください。' },
    ],
  },
  {
    id: 'faq-settings',
    label: '設定',
    items: [
      { question: '設定で優先すべき項目は？', answer: 'YMM4パス、台本保存先、運用フォルダルールを優先して固定してください。' },
      { question: '複数人で設定を揃えるには？', answer: '初期値を定義した手順書を用意し、更新時は同じチェックリストで確認します。' },
      { question: '設定変更が反映されない場合は？', answer: '再起動、権限確認、保存先アクセス権の順に確認してください。' },
      { question: '設定バックアップは必要ですか？', answer: 'チーム運用では必須です。変更履歴とあわせて保持してください。' },
    ],
  },
  {
    id: 'faq-trouble',
    label: 'トラブル',
    items: [
      { question: '起動しない場合の基本対応は？', answer: '実行権限、依存ソフト、セキュリティ設定を確認してください。' },
      { question: 'YMM4連携が失敗する場合は？', answer: 'YMM4パスを絶対パスで再指定し、設定保存後に再起動してください。' },
      { question: '保存エラーが出る場合は？', answer: '保存先の空き容量と書き込み権限を確認してください。' },
      { question: '問い合わせ時に必要な情報は？', answer: 'OS、再現手順、発生時刻、エラー全文、回避可否を記載してください。' },
    ],
  },
  {
    id: 'faq-purchase',
    label: '購入・契約',
    items: [
      { question: 'プレミアムLicenseの価格はいくらですか？', answer: '無料プラン（¥0）、Standard（月額5,000円/税込5,500円）、Pro（月額10,000円/税込11,000円）の3つのプランをご用意しています。まずは無料プランでお試しください。' },
      { question: '購入申し込みはどのように進めますか？', answer: '購入ページで契約条件を確認後、お問い合わせから購入希望をご連絡ください。' },
      { question: '購入前に確認すべき情報は？', answer: '価格、販売モデル、提供時期、返金条件、支払期限を購入ページと法務ページで確認してください。' },
      { question: '契約・請求に関する相談先は？', answer: '記録の残るメール窓口を推奨します。詳細はお問い合わせページを参照してください。' },
    ],
  },
]

export const newsPosts: NewsPost[] = [
  {
    path: '/2026-01-15-download-guide/',
    date: '2026-01-15T18:30:00+09:00',
    dateLabel: '2026年01月15日',
    title: 'お知らせ: ダウンロード手順を更新しました',
    subtitle: '導入前の確認項目を整理し、最新版までの到達導線を短縮しました。',
    summary:
      '最新版ダウンロード手順の更新内容をお知らせします。導入時の確認項目も合わせて見直し、迷わず開始できる構成に整えています。',
    seoDescription: '最新版ダウンロード手順の更新内容をお知らせします。',
    seoImage: media.workstation1,
    heroImageAlt: 'ダウンロード手順更新のお知らせイメージ',
    body: [
      '最新版のダウンロード手順を更新しました。',
      '導入時の確認項目も合わせて見直し、迷わず開始できる構成に整えています。',
    ],
  },
  {
    path: '/2026-01-20-faq-update/',
    date: '2026-01-20T10:00:00+09:00',
    dateLabel: '2026年01月20日',
    title: 'お知らせ: よくある質問ページを追加しました',
    subtitle: '導入前後の疑問をカテゴリで整理し、サポート導線を強化しました。',
    summary: 'FAQページ追加に関するお知らせです。サポート情報への導線を強化しました。',
    seoDescription: 'FAQページ追加に関するお知らせです。サポート情報への導線を強化しました。',
    seoImage: media.goldAbstractAurora,
    heroImageAlt: 'FAQ更新のお知らせイメージ',
    body: [
      '導入前後の疑問を整理し、FAQページを更新しました。',
      '解決しない場合は、お問い合わせページからご連絡ください。',
    ],
  },
  {
    path: '/2026-01-24-site-renewal/',
    date: '2026-01-24T09:00:00+09:00',
    dateLabel: '2026年01月24日',
    title: 'お知らせ: サイトリニューアルのお知らせ',
    subtitle: '情報導線と製品説明を整理し、導入判断の精度を上げました。',
    summary:
      'デザインと情報導線の刷新に加え、台本取得・整形・YMM4連携準備など製品機能の説明を明確化しました。',
    seoDescription:
      'デザインと情報導線の刷新に加え、台本取得・整形・YMM4連携準備など製品機能の説明を明確化しました。',
    seoImage: media.lobby1,
    heroImageAlt: 'サイトリニューアルのお知らせイメージ',
    body: [
      'サイトのデザインと情報導線を見直し、必要情報へ到達しやすい構成に改善しました。',
      'あわせて、ゆっくりまとめプロセッサー本来の機能である「対応URLからの台本取得」「編集用の台本整形」「YMM4向け初期設定」をホーム・使い方・FAQで明確に確認できるようにしました。',
      '今後も機能追加や運用変更がある際は、お知らせで継続的に案内します。',
    ],
  },
]

export const pageRegistry: Record<string, PageEntry> = {
  '/': { label: 'ホーム', navKey: 'home', hideBreadcrumbs: true },
  '/download/': { label: 'ダウンロード', navKey: 'download', parent: '/' },
  '/instructions/': { label: '使い方', navKey: 'instructions', parent: '/' },
  '/update/': { label: 'アップデート', navKey: 'update', parent: '/' },
  '/news/': { label: 'お知らせ', navKey: 'news', parent: '/' },
  '/faq/': { label: 'FAQ', navKey: 'faq', parent: '/' },
  '/purchase/': { label: '購入', navKey: 'purchase', parent: '/' },
  '/contact/': { label: 'お問い合わせ', navKey: 'contact', parent: '/' },
  '/legal/commercial-transactions/': { label: '特定商取引法に基づく表記', parent: '/' },
  '/legal/terms/': { label: '利用規約', parent: '/' },
  '/legal/privacy/': { label: 'プライバシーポリシー', parent: '/' },
  '/legal/refund-policy/': { label: '返金・キャンセルポリシー', parent: '/' },
  '/404.html': { label: '404', parent: '/' },
  '/account/': { label: '課金管理から戻りました' },
  '/billing/success/': { label: '決済が完了しました' },
  '/billing/cancel/': { label: '決済はキャンセルされました' },
}

for (const post of newsPosts) {
  pageRegistry[post.path] = {
    label: post.title,
    navKey: 'news',
    parent: '/news/',
  }
}

export function normalizePath(pathname: string) {
  if (!pathname || pathname === '/') {
    return '/'
  }

  if (/\/[^/]+\.[a-z0-9]+$/i.test(pathname)) {
    return pathname
  }

  return pathname.endsWith('/') ? pathname : `${pathname}/`
}
