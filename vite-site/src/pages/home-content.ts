import {
  downloadUrl,
  legal,
  publicDistribution,
  siteOrigin,
  siteTitle,
} from '@/data/site-content'

const premiumPriceNumber = Number(legal.pricing.unitPrice)
const premiumPrice = `${premiumPriceNumber.toLocaleString('ja-JP')}円（税込）`
const setupSizeMb = `${(publicDistribution.assets.setup.sizeBytes / 1000 / 1000).toLocaleString('ja-JP', {
  maximumFractionDigits: 1,
})} MB`

export const homeFacts = {
  productName: siteTitle,
  siteOrigin,
  os: ['Windows 10', 'Windows 11'],
  osLabel: 'Windows 10 / 11',
  yymm4Required: true,
  yymm4Label: 'YMM4必須',
  premiumPrice,
  premiumPriceValue: legal.pricing.unitPrice,
  currency: legal.pricing.currency,
  billingLabel: '買い切り',
  monthlyFeeLabel: '月額なし',
  downloadUrl,
  purchaseUrl: '/purchase/',
  samplesUrl: '/samples/',
  faqUrl: '/faq/',
  updateUrl: '/update/',
  termsUrl: '/legal/terms/',
  privacyUrl: '/legal/privacy/',
  commercialTransactionsUrl: '/legal/commercial-transactions/',
  refundUrl: '/legal/refund-policy/',
  releaseVersion: publicDistribution.version,
  releaseDate: '2026年06月01日',
  releaseChannel: publicDistribution.channel,
  setupFileName: publicDistribution.assets.setup.fileName,
  setupSizeMb,
  setupSha256: publicDistribution.assets.setup.sha256,
  trustNote: publicDistribution.trustNote,
  supportHours: legal.support.operationHours,
  supportSla: legal.support.firstResponseSla,
  supportEmail: legal.organization.email,
  refundSummary: legal.refund.summary,
  deliveryMethod: legal.delivery.method,
  paymentTiming: legal.payment.timing,
} as const

export const heroContent = {
  kicker: 'YMM4で反応集・解説・ショートを作る人へ',
  titleLine1: 'ネタを入れたら、',
  titleLine2: '台本と素材を整えてYMM4へ。',
  lead:
    '記事URL・スレッドURL・下書き・素材メモから、台本の下地づくり、字幕量の調整、素材配置の確認、YMM4への反映まで。繰り返しやすい下ごしらえを、一つのWindowsソフトにまとめます。',
  primaryCta: '無料版で動作を確認する',
  secondaryCta: '実際の操作を見る',
  microcopy: `${homeFacts.osLabel}・YMM4必須｜Premium ${homeFacts.premiumPrice}・${homeFacts.billingLabel}・${homeFacts.monthlyFeeLabel}`,
} as const

export const fitItems = [
  { label: 'Windows専用', body: homeFacts.osLabel },
  { label: 'YMM4必須', body: 'YMM4で仕上げる前提' },
  { label: 'Freeあり', body: '購入前に動作確認' },
  { label: 'Premium', body: `${homeFacts.premiumPrice} 買い切り` },
  { label: '月額なし', body: '継続課金なし' },
] as const

export const problemItems = [
  {
    title: '情報が散らばる',
    body: 'URL、メモ、下書き、素材を別々に管理する。',
  },
  {
    title: '台本の整形に手がかかる',
    body: '会話順、字幕の長さ、役割分担を毎回調整する。',
  },
  {
    title: '素材不足が後で分かる',
    body: '画像・音声・保存先を行き来し、途中で抜けに気づく。',
  },
  {
    title: 'YMM4で一から組み始める',
    body: '準備した内容を、タイムラインへ手作業で並べ直す。',
  },
] as const

export const workflowSteps = [
  {
    id: 'input',
    step: '01',
    label: '入力する',
    title: 'URLでも、下書きでも始められる。',
    items: ['記事URL', 'スレッドURL', '下書き', '素材メモ', 'テーマ'],
    note: '対応URLと取得条件はFAQで確認できます。',
    image: '/lp/screen-main-get-scripts-v2.webp',
    alt: '記事URLと取得候補を確認する実アプリ画面',
  },
  {
    id: 'app',
    step: '02',
    label: 'アプリで整える',
    title: '台本と素材を、動画の型に合わせる。',
    items: ['台本取得', 'AI台本生成', '会話順の編集', '字幕量の確認', '素材配置・不足の確認'],
    note: 'AIの出力は、そのまま公開せず内容を確認して使います。',
    image: '/lp/screen-main-script-edit-v2.webp',
    alt: '台本編集と素材配置を確認する実アプリ画面',
  },
  {
    id: 'ymm4',
    step: '03',
    label: 'YMM4で仕上げる',
    title: 'YMM4へ反映し、最後は自分の目で確認。',
    items: ['YMM4を起動・接続', 'プロジェクトへ反映', '音声・字幕・間合いを調整', '素材権利・出典を確認', 'MP4出力・投稿を判断'],
    note: '自動公開は行いません。',
    image: '/lp/screen-main-board-v2.webp',
    alt: 'YMM4へ渡す前の素材配置ボードを確認する実アプリ画面',
  },
] as const

export type ProductTourItem = {
  id: string
  label: string
  title: string
  body: string
  image: string
  alt: string
  annotations: Array<{ x: number; y: number; label: string }>
}

export const productTourItems: ProductTourItem[] = [
  {
    id: 'capture',
    label: '取り込み',
    title: 'ネタを取り込む',
    body: 'URLを使う場合は取得候補を確認。URLなしでも、下書きや素材メモから開始できます。',
    image: '/lp/screen-main-get-scripts-v2.webp',
    alt: 'URL入力と取得候補を確認する実アプリ画面',
    annotations: [
      { x: 53, y: 8, label: '入力方法' },
      { x: 68, y: 28, label: '取得候補' },
      { x: 16, y: 86, label: '保存先' },
    ],
  },
  {
    id: 'script',
    label: '台本',
    title: '台本を作る・直す',
    body: '動画の型を選び、台本案を作成。会話順と字幕量を確認して修正できます。',
    image: '/lp/screen-main-script-gen-v2.webp',
    alt: 'AI台本生成条件と生成結果を確認する実アプリ画面',
    annotations: [
      { x: 17, y: 52, label: '動画タイプ' },
      { x: 58, y: 21, label: '生成結果' },
      { x: 48, y: 77, label: '字幕量' },
    ],
  },
  {
    id: 'materials',
    label: '素材',
    title: '素材を確認する',
    body: '画像・音声・素材パスの不足を確認。YMM4へ持ち込む前に抜けを見つけます。',
    image: '/lp/screen-main-board-v2.webp',
    alt: '素材配置と不足確認に使うボード画面',
    annotations: [
      { x: 16, y: 15, label: '配置状況' },
      { x: 50, y: 16, label: '空き枠' },
      { x: 80, y: 15, label: '素材候補' },
    ],
  },
  {
    id: 'handoff',
    label: '反映前確認',
    title: 'YMM4へ渡す内容を最後に見る',
    body: 'YMM4で仕上げる前に、台本、素材、保存先、反映対象を確認します。',
    image: '/lp/screen-main-script-edit-v2.webp',
    alt: 'YMM4へ渡す台本と素材配置を確認する実アプリ画面',
    annotations: [
      { x: 37, y: 11, label: '台本反映' },
      { x: 62, y: 18, label: '動画作成' },
      { x: 13, y: 93, label: 'YMM4フォルダ' },
    ],
  },
]

export type SampleItem = {
  id: 'reaction' | 'explainer' | 'shorts'
  title: string
  poster: string
  video: string
  input: string
  supportScope: string
  userScope: string
}

export const sampleItems: SampleItem[] = [
  {
    id: 'reaction',
    title: '反応集',
    poster: '/samples/sample-reaction-digest-thumbnail.png',
    video: '/samples/sample-reaction-digest-preview.mp4',
    input: 'コメント、補足、進行メモ',
    supportScope: '会話順の整理、字幕量、素材確認まで支援',
    userScope: 'テンポ、音声、間合い、素材権利をYMM4で確認',
  },
  {
    id: 'explainer',
    title: '解説・対談',
    poster: '/samples/sample-yukkuri-dialogue-thumbnail.png',
    video: '/samples/sample-yukkuri-dialogue-preview.mp4',
    input: '問い、答え、事例、まとめ',
    supportScope: '台本の下地、役割分担、素材メモを整理',
    userScope: '事実確認、表現調整、出典確認を人が実施',
  },
  {
    id: 'shorts',
    title: 'ショート',
    poster: '/samples/sample-short-drama-thumbnail.png',
    video: '/samples/sample-short-drama-preview.mp4',
    input: '冒頭、展開、締めの短いメモ',
    supportScope: '短い字幕量と構成を動画向けに整理',
    userScope: '尺、テンポ、公開判断をYMM4側で確認',
  },
]

export const freeChecks = [
  'Windowsで正常に起動できるか。',
  'ログイン・初期設定を進められるか。',
  '台本編集画面の操作感が合うか。',
  '動画作成までの導線を理解できるか。',
  'YMM4連携の前提を満たせるか。',
] as const

export type PlanComparisonRow = {
  id: string
  label: string
  free: string
  premium: string
  note?: string
}

export const comparisonRows: PlanComparisonRow[] = [
  { id: 'launch', label: 'アプリ起動・ログイン', free: '利用可', premium: '利用可' },
  { id: 'editor', label: '台本編集画面', free: '操作確認可', premium: '継続利用可' },
  { id: 'fetch', label: 'URLからの台本取得', free: '購入前確認用の利用枠', premium: '利用制限を解除' },
  { id: 'ai-script', label: 'AI台本生成', free: '購入前確認用の利用枠', premium: '利用制限を解除' },
  { id: 'video-flow', label: '動画作成導線', free: '流れを確認', premium: '利用制限を解除' },
  { id: 'save', label: 'プロジェクト保存', free: '保存先と形式を確認', premium: '継続制作で利用' },
  { id: 'materials', label: '素材配置確認', free: '確認可', premium: '継続制作で利用' },
  { id: 'handoff', label: 'YMM4起動・接続', free: '前提を確認', premium: '前提を確認' },
  { id: 'account', label: '権限管理', free: 'Free状態', premium: 'GoogleログインにPremium権限を同期' },
  { id: 'updates', label: 'アップデート', free: '公開配布版を利用', premium: '公開配布版を利用' },
  { id: 'support', label: 'サポート', free: homeFacts.supportSla, premium: homeFacts.supportSla },
]

export const premiumFit = [
  'YMM4で反応集、解説、ショートを継続して作る。',
  '毎回の台本整理、字幕量調整、素材確認を一つにまとめたい。',
  '月額ではなく買い切りを選びたい。',
  '最後は自分でYMM4を確認して仕上げたい。',
] as const

export const premiumMismatch = [
  'Mac、スマートフォンだけで使いたい。',
  'YMM4を使わない。',
  '動画完成・投稿まで自動で任せたい。',
  '権利確認・事実確認・最終編集を行いたくない。',
  '収益化や再生数の約束を求めている。',
] as const

export const requirementRows = [
  { label: '対応OS', value: homeFacts.osLabel },
  { label: 'Mac', value: '非対応' },
  { label: 'YMM4', value: '必須。YMM4で仕上げる前提です。' },
  { label: '配布ファイル', value: `${homeFacts.setupFileName} / 約${homeFacts.setupSizeMb}` },
  { label: 'インターネット', value: 'ログイン、配布確認、URL取得、外部AI連携などで通信を使います。' },
  { label: '対応入力', value: '記事URL、スレッドURL、下書き、素材メモ、テーマ。対応URLはFAQで確認してください。' },
  { label: 'APIキー', value: 'YouTube分析など一部機能ではYouTube APIキーが必要です。' },
  { label: 'サポート', value: `${homeFacts.supportHours} / ${homeFacts.supportSla}` },
] as const

export const responsibilityItems = [
  'AI台本・取得内容はユーザーが事実確認する。',
  '素材、引用、出典、著作権、利用規約はユーザーが確認する。',
  '音声、字幕、立ち絵、間合いはYMM4で最終確認する。',
  'MP4出力、投稿、公開はユーザーが実行・判断する。',
  '収益化、再生数、審査通過は約束しません。',
] as const

export const downloadTrustItems = [
  { label: '現行バージョン', value: homeFacts.releaseVersion },
  { label: '公開日', value: homeFacts.releaseDate },
  { label: 'チャンネル', value: homeFacts.releaseChannel },
  { label: 'ファイルサイズ', value: `約${homeFacts.setupSizeMb}` },
  { label: 'SHA-256', value: homeFacts.setupSha256 },
] as const

export const homeFaqs = [
  {
    id: 'auto-finish',
    question: '動画は自動で完成しますか？',
    answer:
      'いいえ。台本取得、AI台本生成、素材配置の確認、YMM4への反映までを支援します。音声、字幕、間合い、素材権利、MP4出力、投稿判断はYMM4で最終確認してください。',
  },
  {
    id: 'ymm4-required',
    question: 'YMM4は必須ですか？',
    answer:
      'はい。YMM4と連携し、最後はYMM4で仕上げるWindows向けソフトです。YMM4なしで編集完了まで進める設計ではありません。',
  },
  {
    id: 'windows',
    question: 'Windows専用ですか？ Macでも使えますか？',
    answer: 'Windows 10 / 11向けです。Mac、スマートフォンだけでは使用できません。',
  },
  {
    id: 'free',
    question: 'Freeでは何ができますか？',
    answer:
      'Freeでは、起動、ログイン、台本編集、動画作成導線、YMM4連携の前提を確認できます。台本取得、AI台本生成、動画作成の違いは料金比較表で確認できます。',
  },
  {
    id: 'premium',
    question: 'Premiumで何が解除されますか？',
    answer:
      `台本取得、AI台本生成、動画作成の利用制限を解除します。Premiumは${homeFacts.premiumPrice}の買い切りで、月額料金はありません。`,
  },
  {
    id: 'no-url',
    question: 'URLがなくても使えますか？',
    answer:
      'はい。下書き、素材メモ、テーマなどから開始できます。URL取得を使う場合は、対応サイトと取得条件をご確認ください。',
  },
  {
    id: 'formats',
    question: 'どのような動画に使えますか？',
    answer:
      '反応集、解説、ショート、掛け合いなど、会話と素材をYMM4で組み立てる動画の下地作りに使えます。実際の作例はサンプルページで確認できます。',
  },
  {
    id: 'ai-review',
    question: 'AIが作った台本はそのまま使えますか？',
    answer:
      'そのまま公開せず、事実、表現、出典、権利、字幕量を確認してから使用してください。AI出力には誤りが含まれる場合があります。',
  },
  {
    id: 'publish',
    question: '自動でYouTube等へ投稿されますか？',
    answer:
      'いいえ。自動公開は行いません。保存、YMM4反映、MP4出力、投稿はユーザーが確認して実行します。',
  },
  {
    id: 'license',
    question: 'ライセンスはどう反映されますか？',
    answer:
      '決済完了後、Googleログインに紐づく課金状態と利用枠を同期し、アプリ内でPremium機能が有効化されます。PC変更などの扱いは購入前にサポートへ確認してください。',
  },
  {
    id: 'updates',
    question: 'アップデートはどこで確認できますか？',
    answer:
      '最新版、配布ファイル、SHA-256、更新履歴はアップデートページとダウンロードページで確認できます。',
  },
  {
    id: 'support',
    question: 'サポートはありますか？',
    answer:
      `問い合わせ窓口はメール等を用意しています。受付は${homeFacts.supportHours}、一次回答は${homeFacts.supportSla}です。`,
  },
  {
    id: 'refund',
    question: '購入後の返金・キャンセルはできますか？',
    answer: `${homeFacts.refundSummary} 詳細は返金・キャンセルポリシーをご確認ください。`,
  },
  {
    id: 'results',
    question: '収益化や再生数は約束されますか？',
    answer:
      'いいえ。収益化、再生数、審査通過は約束しません。本製品は制作前準備の効率化を支援するツールです。',
  },
  {
    id: 'data',
    question: '入力したデータはどこへ送信されますか？',
    answer:
      'URL取得、YouTube分析、外部AI連携など、使う機能によって通信先が変わります。個人情報や入力内容の扱いはプライバシーポリシーとアプリ内の案内を確認してください。',
  },
] as const

export const demoOutline = [
  'URLまたは素材メモを入れる',
  '台本生成・編集結果を確認する',
  '素材不足と保存先を確認する',
  'YMM4で最終確認する範囲を見る',
] as const
