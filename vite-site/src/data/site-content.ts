import {
  distributionBaseUrl as productDistributionBaseUrl,
  portableDownloadUrl as productPortableDownloadUrl,
  publicDownloadPage,
  releaseCandidateDistribution,
  releaseManifestUrl as productReleaseManifestUrl,
  releaseNotesUrl as productReleaseNotesUrl,
  setupDownloadUrl as productSetupDownloadUrl,
  sha256SumsUrl as productSha256SumsUrl,
  updateFeedUrl as productUpdateFeedUrl,
} from './product-facts'

export type NavItem = {
  key:
    | 'home'
    | 'download'
    | 'instructions'
    | 'samples'
    | 'update'
    | 'news'
    | 'faq'
    | 'purchase'
    | 'contact'
    | 'blog'
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
export const siteTagline = 'YMM4向け台本・素材準備ツール'
export const siteDescription =
  '対応する記事URL・スレッドURLや下書きから、台本・話者・素材を整え、YMM4で仕上げる前準備を支援するWindows向け制作支援アプリ。'

export const navItems: NavItem[] = [
  { key: 'home', label: 'ホーム', url: '/' },
  { key: 'download', label: 'ダウンロード', url: '/download/' },
  { key: 'instructions', label: '使い方', url: '/instructions/' },
  { key: 'samples', label: 'サンプル', url: '/samples/' },
  { key: 'purchase', label: '料金', url: '/purchase/' },
  { key: 'faq', label: 'FAQ', url: '/faq/' },
  { key: 'update', label: 'アップデート', url: '/update/' },
  { key: 'news', label: 'お知らせ', url: '/news/' },
  { key: 'blog', label: 'ブログ', url: '/blog/' },
]

export const primaryCta: ActionItem = {
  label: 'Free版を試す',
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
      { name: 'Free', price: '¥0', priceTax: '無料', term: '0円のFree版', description: '起動と基本フローを確認' },
      { name: 'Premium', price: '¥39,800', priceTax: '税込 39,800円', term: '買い切り', description: '購入条件の確定後に案内' },
    ],
    productName: 'ゆっくりまとめプロセッサー',
    modelLabel: '無料プラン + 39,800円の買い切りライセンス',
    additionalFees: '標準導線では送料・追加手数料なし',
    unitPrice: '39800',
    currency: 'JPY',
  },
  payment: {
    methods: ['クレジットカード（Stripe Checkout）'],
    timing: '買い切り版は Stripe Checkout で購入時に一度だけ決済します。月額自動課金はありません。',
    noteBankPaypal:
      '現在の標準購入導線は Stripe Checkout の一度払いです。',
    noteOnline: '購入とライセンス確認はアプリ内の導線から利用します。',
    deadlineRules: [
      { method: 'クレジットカード', limit: 'Stripe Checkout で購入時に即時決済' },
    ],
    unpaidPolicy:
      '決済が完了しない場合、Premium ライセンスは付与されません。月額継続課金の未払い扱いはありません。',
    bankAccountPolicy:
      '標準導線外の支払い方法は、別途案内がある場合を除き提供していません。',
  },
  delivery: {
    timing: '決済完了後、Webhook とアプリ内同期を経て即時または短時間で Premium 機能が有効化',
    method: 'Googleログインに紐づく課金状態と利用枠を同期してアプリ内へ反映',
  },
  refund: {
    summary: '買い切りライセンスは購入後7日以内を原則受付。返金時は Premium 権限を停止します。',
    defectiveResponse: '提供不備または重大な不具合がある場合は個別対応',
    procedure: '問い合わせ窓口へ申告後、事実確認のうえ対応方針を案内',
    defectClaimDeadline: '購入日から7日以内に不備内容を申告してください。',
    remedyPolicy:
      '不備が確認された場合は、原則として修補または代替手段の提供で対応します。',
    refundMethod:
      '修補対応が困難な場合に限り、当社判断で返金対応を行います（返金は原則として元の決済手段で実施）。',
    refundFeeBurden: '当社責に基づく返金時の手数料は当社負担とします。',
  },
  cancellation: {
    subscription:
      'Premium は買い切りのため解約予約や自動更新はありません。返金が成立した場合は Premium 権限を停止し、Free 状態へ戻ります。',
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
    legalLastUpdated: '2026-06-01',
    termsLastUpdated: '2026-06-01',
    privacyLastUpdated: '2026-02-11',
    refundLastUpdated: '2026-06-01',
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

export const distributionBaseUrl = productDistributionBaseUrl
export const setupDownloadUrl = productSetupDownloadUrl
export const portableDownloadUrl = productPortableDownloadUrl
export const releaseNotesUrl = productReleaseNotesUrl
export const sha256SumsUrl = productSha256SumsUrl
export const updateFeedUrl = productUpdateFeedUrl
export const releaseManifestUrl = productReleaseManifestUrl

export const downloadUrl = publicDownloadPage
export const latestReleaseUrl = releaseNotesUrl
export const releasesUrl = releaseManifestUrl
export const tagsUrl = updateFeedUrl
export const changeLogUrl = releaseNotesUrl

export const publicDistribution = releaseCandidateDistribution

export const releaseIntegrity = {
  repository: 'fujitatsukasa/YukkuriMatomeProcessor',
  apiUrl: releaseNotesUrl,
  fallback: {
    tag: publicDistribution.version,
    publishedAt: publicDistribution.publishedAt,
    releaseUrl: publicDistribution.releaseNotesUrl,
    assetName: publicDistribution.assets.setup.fileName,
    assetUrl: publicDistribution.assets.setup.url,
    sizeBytes: publicDistribution.assets.setup.sizeBytes,
    sha256: publicDistribution.assets.setup.sha256,
    verifiedAt: '2026-06-01',
  },
} as const

export const faqGroups: FaqGroup[] = [
  {
    id: 'faq-general',
    label: '全般',
    items: [
      {
        question: 'ゆっくりまとめプロセッサーは何を解決するツールですか？',
        answer:
          '対応する記事URL・スレッドURLや下書きから、台本・話者・素材を整え、YMM4で仕上げる前準備を支援するWindows向け制作支援アプリです。',
      },
      {
        question: '動画は自動で完成しますか？',
        answer:
          '完成・投稿まで自動で進めるツールではありません。台本下地、話者、素材確認などを整え、音声、字幕、間合い、演出、権利確認、投稿判断はYMM4と利用者側で行います。',
      },
      {
        question: '無料で試せますか？',
        answer:
          'はい。Freeプランで起動、初期設定、台本編集、素材確認、YMM4で仕上げる前準備の流れを確認できます。',
      },
      {
        question: '無料版では何ができますか？',
        answer:
          'Freeプランでは、起動、初期設定、台本編集、素材確認、YMM4前準備の流れを確認できます。具体的な利用上限は公開条件が確定するまで断定しません。',
      },
      { question: '想定ユーザーは誰ですか？', answer: 'YMM4で反応集、解説、ショート、まとめ、ゆっくり動画を作る個人・チームを想定しています。' },
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
      { question: '導入時に最初にやるべきことは？', answer: '配布ページで公開条件を確認し、YMM4実行パス、保存先フォルダ、必要に応じて外部APIキーを設定してください。' },
      { question: '対応OSは何ですか？', answer: 'Windows 10 / 11環境での利用を前提に設計しています。' },
      { question: 'Windows専用ですか？', answer: 'はい。現時点ではWindows 10 / 11専用です。Mac、スマホ、ブラウザだけで完結するツールではありません。' },
      { question: 'Macで使えますか？', answer: '現時点ではMac版はありません。YMM4を使うWindows環境を前提にしています。' },
      {
        question: 'YMM4は必須ですか？',
        answer:
          'はい。ゆっくりまとめプロセッサーは、YMM4と連携して使うWindows向けソフトです。YMM4を使わない動画編集だけで完結する設計ではありません。',
      },
      { question: '初期設定を早く終えるコツは？', answer: '使い方ページの手順どおりに設定し、変更内容をメモすると再作業を減らせます。' },
      { question: 'チーム導入時に決めるべき項目は？', answer: '保存先命名ルール、YMM4連携パス、確認チェックリストの3点を先に揃えてください。' },
    ],
  },
  {
    id: 'faq-script',
    label: '台本取得',
    items: [
      { question: '台本取得はどのように行いますか？', answer: '対応サイトやスレッドの URL を入力し、候補を選択して取得したあと、編集用に整形します。' },
      { question: '取得した台本は再編集できますか？', answer: 'はい。不要行削除、見出し整理、読み上げ向け調整、感情や役割の微修正が可能です。' },
      { question: 'URLエラーで取得できない場合は？', answer: 'URL形式、対象サイトの対応状況、ネットワークの順で確認してください。' },
      { question: '対応していないURLは取得できますか？', answer: '対応外URLは取得できない場合があります。対象サイト、URL形式、ログの内容を確認してください。' },
      { question: '取得件数が多いときはどう進めますか？', answer: 'まず少数のURLで取得、台本整理、CSV/.ymmp前準備まで通し、保存先とYMM4側の確認が済んでから件数を増やしてください。' },
    ],
  },
  {
    id: 'faq-settings',
    label: '設定',
    items: [
      { question: '設定で優先すべき項目は？', answer: 'YMM4パス、台本保存先、CSV/.ymmpの保存先、フォルダルールを優先して固定してください。' },
      { question: '複数人で設定を揃えるには？', answer: '初期値を定義した手順書を用意し、更新時は同じチェックリストで確認します。' },
      { question: '設定変更が反映されない場合は？', answer: '再起動、権限確認、保存先アクセス権の順に確認してください。' },
      { question: '外部APIキーは必要ですか？', answer: '通常の導入確認や台本整理だけなら必須ではありません。外部APIを使う一部機能では API キーの設定が必要になる場合があります。' },
      { question: '外部APIを使うのに追加設定は必要ですか？', answer: 'はい。外部API連携を使う機能では API キーや通信内容を確認してから利用してください。' },
      { question: 'AIだけで動画を作れますか？', answer: 'いいえ。AI台本案は任意の下書き補助です。最後の編集、内容確認、権利確認、投稿判断はYMM4と利用者側で行ってください。' },
    ],
  },
  {
    id: 'faq-trouble',
    label: 'トラブル',
    items: [
      { question: '起動しない場合の基本対応は？', answer: '実行権限、依存ソフト、セキュリティ設定を確認してください。' },
      { question: 'YMM4連携が失敗する場合は？', answer: 'YMM4.exe本体のパスを再指定し、設定保存後に再起動してください。' },
      { question: '保存エラーが出る場合は？', answer: '保存先の空き容量と書き込み権限を確認してください。' },
      { question: '問い合わせ時に必要な情報は？', answer: 'OS、再現手順、発生時刻、エラー全文、回避可否を記載してください。' },
    ],
  },
  {
    id: 'faq-purchase',
    label: '購入・契約',
    items: [
      { question: '料金プランはどう分かれていますか？', answer: 'Free（¥0）と Premium（買い切り39,800円）の2つです。まずはFreeで起動、台本編集、素材確認、YMM4前準備の流れを確認してください。' },
      { question: '月額料金はありますか？', answer: 'いいえ。Premiumは39,800円税込の買い切りで、月額自動更新はありません。' },
      { question: '購入申し込みはどのように進めますか？', answer: 'アプリ内の購入画面から Stripe Checkout を開き、買い切りライセンスを一度払いで購入します。' },
      { question: '購入後の権限はどう反映されますか？', answer: '決済完了後、Googleログインに紐づく課金状態と利用枠を同期します。現在、公開LPでは具体的な上限値を未確定値として扱っています。' },
      { question: 'Premiumで何が変わりますか？', answer: 'Premiumは39,800円税込の買い切りで、月額料金はありません。具体的な利用条件、PC台数、更新範囲は公開条件が確定するまで断定しません。' },
      { question: '返金条件は何ですか？', answer: '購入後7日以内を原則受付とし、返金成立時はPremium権限を停止します。詳細は返金・キャンセルポリシーを確認してください。' },
      { question: '収益化は約束されますか？', answer: 'いいえ。動画の品質、投稿頻度、チャンネル状況、各プラットフォームの審査に左右されるため、収益化は約束していません。' },
      { question: '契約・請求に関する相談先は？', answer: '記録の残るメール窓口を推奨します。詳細はお問い合わせページを参照してください。' },
    ],
  },
]

export const newsPosts: NewsPost[] = [
  {
    path: '/2026-06-01-windows-release-0018/',
    date: '2026-06-01T14:06:24+09:00',
    dateLabel: '2026年06月01日',
    title: `お知らせ: Windows配布候補 ${publicDistribution.versionLabel} の確認情報を整理しました`,
    subtitle: 'インストーラー候補、ポータブルZIP候補、更新フィードをwin-x64-stable向けに確認しています。',
    summary:
      `Windows向け配布候補 ${publicDistribution.versionLabel} の確認情報として、ダウンロードページとアップデート履歴の案内を更新しました。`,
    seoDescription:
      `ゆっくりまとめプロセッサー Windows配布候補 ${publicDistribution.versionLabel} の確認情報です。インストーラー候補、ポータブルZIP候補、更新フィード、SmartScreen確認項目を案内します。`,
    seoImage: '/product_get_script.webp',
    heroImageAlt: 'Windows配布候補の確認情報イメージ',
    body: [
      `Windows向け配布候補 ${publicDistribution.versionLabel} の確認情報を整理しました。候補チャンネルは ${publicDistribution.channel} です。`,
      'ダウンロードページでは、候補ファイル名、サイズ、SHA256を確認できます。D10確認が揃うまで実行ファイルの直接取得CTAは表示しません。',
      '署名状態、発行者表示、SmartScreen実測は配布ゲートで別途確認します。未確認の状態で正式公開済みとは扱いません。',
      '更新後は、まず起動、台本編集、素材整理、YMM4前準備まで通るか確認してください。詳しい手順はダウンロード、使い方、アップデート履歴にまとめています。',
    ],
  },
  {
    path: '/2026-01-15-download-guide/',
    date: '2026-01-15T18:30:00+09:00',
    dateLabel: '2026年01月15日',
    title: 'お知らせ: 配布確認手順を更新しました',
    subtitle: '導入前の確認項目を整理し、配布ページまでの到達導線を短縮しました。',
    summary:
      '配布確認手順の更新内容をお知らせします。導入時の確認項目も合わせて見直し、迷わず開始できる内容に整えています。',
    seoDescription: '配布確認手順の更新内容をお知らせします。',
    seoImage: '/product_guide.webp',
    heroImageAlt: 'ダウンロード手順更新のお知らせイメージ',
    body: [
      '配布ページの確認手順を更新しました。',
      '導入時の確認項目も合わせて見直し、迷わず開始できる内容に整えています。',
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
    seoImage: '/product_get_script.webp',
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
    subtitle: '情報導線と製品説明を整理し、導入前に確認すべき内容を見直しました。',
    summary:
      'デザインと情報導線の刷新に加え、台本取得・整形・YMM4連携準備など製品機能の説明を明確化しました。',
    seoDescription:
      'デザインと情報導線の刷新に加え、台本取得・整形・YMM4連携準備など製品機能の説明を明確化しました。',
    seoImage: '/product_guide.webp',
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
  '/samples/': { label: '実画面・サンプル', navKey: 'samples', parent: '/' },
  '/update/': { label: 'アップデート', navKey: 'update', parent: '/' },
  '/news/': { label: 'お知らせ', navKey: 'news', parent: '/' },
  '/faq/': { label: 'FAQ', navKey: 'faq', parent: '/' },
  '/purchase/': { label: '料金', navKey: 'purchase', parent: '/' },
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
