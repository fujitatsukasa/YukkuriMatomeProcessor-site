import {
  downloadUrl,
  legal,
  publicDistribution,
  siteOrigin,
  siteTitle,
} from '@/data/site-content'

const premiumPriceNumber = Number(legal.pricing.unitPrice)
const premiumPrice = `${premiumPriceNumber.toLocaleString('ja-JP')}円（税込）`
const corporatePriceNumber = Number(legal.pricing.corporateUnitPrice)
const corporatePrice = `${corporatePriceNumber.toLocaleString('ja-JP')}円（税込）`
const setupSizeMb = `${(publicDistribution.assets.setup.sizeBytes / 1000 / 1000).toLocaleString('ja-JP', {
  maximumFractionDigits: 1,
})} MB`

export const homeFacts = {
  productName: siteTitle,
  siteOrigin,
  os: ['Windows 10', 'Windows 11'],
  osLabel: 'Windows 10 / 11',
  yymm4Label: 'YMM4必須',
  premiumPrice,
  premiumPriceValue: legal.pricing.unitPrice,
  corporatePrice,
  corporatePriceValue: legal.pricing.corporateUnitPrice,
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
  releaseVersion: publicDistribution.versionLabel,
  releaseDate: publicDistribution.checkedAtLabel,
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
  publisherName: legal.organization.legalName,
} as const

export const homeAssets = {
  hero: '/product_get_script.webp',
  capture: '/product_get_script.webp',
  shape: '/lp/screen-home-shape-v1.webp',
  aiResult: '/product_ai_script.webp',
  materialBoard: '/product_keyword_material.webp',
  yymm4Reflect: '/lp/screen-home-ymm4-reflected-v1.webp',
  distribution: '/product_get_script.webp',
  launcher: '/lp/screen-home-launcher-v1.webp',
} as const

export const heroContent = {
  kicker: 'YMM4向け ゆっくり動画制作支援アプリ',
  title: '素材集めから台本づくりとYMM4前準備までひとつの制作フローに。',
  lead:
    '記事・掲示板・スレッド・外部素材から候補を集め、AI台本案を確認します。ボードでセリフ・素材・字幕まわりを整理し、保存先・素材パス・CSV/.ymmp前準備を確認します。YMM4で仕上げる前の準備を支える、Windows向けの制作支援アプリです。',
  primaryCta: '配布条件を確認',
  secondaryCta: '実画面を確認',
  microcopy: `${homeFacts.osLabel}｜${homeFacts.yymm4Label}｜法人 ${homeFacts.corporatePrice}・Premium ${homeFacts.premiumPrice}｜${homeFacts.monthlyFeeLabel}`,
  productScope: '本製品で扱う：台本取得 / AI台本 / ボード編集 / テンプレート / YMM4前準備',
  yymm4Scope: '利用者が確認：内容 / 権利 / 同期結果 / 音声・字幕・演出 / 公開判断',
  trustNote: `配布候補は約${homeFacts.setupSizeMb}です。D10確認が揃うまで実行ファイルの直接取得CTAは表示しません。`,
} as const

export const workflowSummary = [
  {
    label: '素材を集める',
    title: '記事 / 掲示板 / スレッド / 外部素材',
    image: '/lp/phase-materials-v1.webp',
  },
  {
    label: '台本を作る',
    title: 'AI台本 / キャラ別下書き / 構成',
    image: '/lp/phase-script-v1.webp',
  },
  {
    label: 'ボードで整える',
    title: 'ボード編集 / 画像 / 音声 / 字幕 / 立ち絵',
    image: '/lp/phase-board-v1.webp',
  },
  {
    label: 'YMM4前準備',
    title: '保存先 / 素材パス / CSV・.ymmp確認',
    image: '/lp/phase-handoff-v1.webp',
  },
] as const

export const beforeAfterRows = [
  {
    before: '本文やコメント素材を手作業で探して貼る',
    after: '記事・掲示板・スレッドから候補を見て選ぶ',
  },
  {
    before: 'AI台本、キャラ別セリフ、構成の確認場所が散らばる',
    after: '生成結果を確認して台本編集へ送る',
  },
  {
    before: 'セリフ、画像、音声、字幕、立ち絵、効果を別々に追う',
    after: 'ボード上で制作要素と素材パスを確認する',
  },
  {
    before: '保存先、素材パス、YMM4で使う形式を手作業で揃える',
    after: 'CSV/.ymmp前準備と素材パス確認を同じ流れで扱う',
  },
  {
    before: '台本取得、AI台本、素材、YMM4前準備を別々に管理',
    after: '取得から編集ボード、YMM4前準備まで制作データとして確認する',
  },
  {
    before: '動画完成まで自動で任せられると思って迷う',
    after: '本製品で整える範囲とYMM4で仕上げる範囲を分けて判断する',
  },
] as const

export const workflowSteps = [
  {
    id: 'capture',
    step: '01',
    title: 'URLから候補を見る。',
    body:
      '記事URL・スレッドURLを入れ、動画化に使う本文やコメント候補を確認します。URLなしでも、下書きやテーマから始められます。',
    points: ['対応URLを確認', 'URL入力', '候補一覧を見る', '使う本文を選ぶ'],
    image: homeAssets.capture,
    alt: '対応するサイトとURLを指定し、取得候補を確認する台本取得画面',
  },
  {
    id: 'shape',
    step: '02',
    title: '話者と改行を整える。',
    body:
      '不要な行、話者、タイトル読み、改行、禁止語変換を見ながら、読み上げ前の台本下地を整えます。',
    points: ['話者割り当て', 'タイトル読み', '改行設定', '禁止語変換', 'プリセット'],
    image: homeAssets.shape,
    alt: '話者、改行、タイトル読みをプリセットで設定する画面',
  },
  {
    id: 'generate',
    step: '03',
    title: 'AI台本案は、必要なときだけ確認して使う。',
    body:
      '構成、口調、折り返し、テーマ、目標文字数を指定して台本案を生成できます。AIは任意機能です。内容と事実を確認し、必要な箇所を直してから台本編集へ送ります。',
    points: ['AIプロバイダー', '口調', '折り返し', '構成', 'テーマ', '目標文字数', '生成結果'],
    image: homeAssets.aiResult,
    alt: '構成と文字量を指定し、AI台本の生成結果を確認する画面',
  },
  {
    id: 'reflect',
    step: '04',
    title: '素材パスと保存先を確認し、YMM4で仕上げる前準備を整える。',
    body:
      '台本と素材の配置、保存先、素材パスを確認して、YMM4で仕上げる前の状態を整えます。音声、字幕、間、演出、出典、公開前の最終確認はYMM4と利用者側で行います。',
    points: ['台本編集', '素材ボード', '素材パス確認', '保存先確認', 'YMM4前準備'],
    image: homeAssets.materialBoard,
    alt: '台本行と素材の配置を一覧で確認する素材ボード',
  },
] as const

export type ProductFeature = {
  id: string
  eyebrow: string
  title: string
  body: string
  bullets: readonly string[]
  images: ReadonlyArray<{
    src: string
    alt: string
    title: string
    annotations: ReadonlyArray<{ x: number; y: number; label: string }>
  }>
}

export const productFeatures: ProductFeature[] = [
  {
    id: 'capture',
    eyebrow: '01 / CAPTURE',
    title: '必要な本文とコメントだけ、取り込む。',
    body:
      'サイトとURLを指定すると、取得候補を一覧で確認できます。本文やコメントをそのまま流し込まず、使う内容を見てから取り込めます。',
    bullets: ['対応サイトを選択', 'URLから候補を取得', 'コメント取得の有無を設定', '話者の割り当て方法を設定', 'URLなしでも下書きから開始'],
    images: [
      {
        src: homeAssets.capture,
        alt: '対応するサイトとURLを指定し、取得候補を確認する台本取得画面',
        title: 'URLとサイトを指定する画面',
        annotations: [
          { x: 24, y: 12, label: 'URLとサイト' },
          { x: 53, y: 37, label: '取り込み設定' },
          { x: 50, y: 70, label: 'コメント設定' },
        ],
      },
    ],
  },
  {
    id: 'shape',
    eyebrow: '02 / SHAPE',
    title: 'いつもの話者・改行・構成を、プリセットで呼び出す。',
    body:
      'タイトル読み、話者の順番、改行、禁止語変換、構成、文字量。チャンネルでよく使う設定をプリセットにして、次の一本でも呼び出せます。',
    bullets: ['話者順を連番・ランダム等で設定', 'タイトル用話者と読み上げを設定', '改行と文字量を揃える', '禁止語を置換', '台本の構成・口調を指定', 'AI生成結果を確認して編集'],
    images: [
      {
        src: homeAssets.shape,
        alt: '話者、改行、タイトル読みをプリセットで設定する画面',
        title: '台本ルールを設定する画面',
        annotations: [
          { x: 40, y: 9, label: 'プリセット' },
          { x: 62, y: 43, label: '台本ルール' },
          { x: 48, y: 71, label: '生成条件' },
        ],
      },
      {
        src: homeAssets.aiResult,
        alt: '構成と文字量を指定し、AI台本の生成結果を確認する画面',
        title: '生成結果を確認する画面',
        annotations: [
          { x: 45, y: 18, label: 'プレビュー' },
          { x: 34, y: 63, label: '結果確認' },
        ],
      },
    ],
  },
  {
    id: 'reflect',
    eyebrow: '03 / REFLECT',
    title: '素材の抜けを確認して、YMM4で仕上げる。',
    body:
      '台本と素材の位置をボードで確認し、保存先や素材パスの行き来を減らします。YMM4で開く前に必要な準備を揃え、最後はタイミングと演出をYMM4で調整します。',
    bullets: ['台本行と素材の対応を確認', '不足素材を見つける', '保存先を揃える', 'YMM4で仕上げる前の準備', '音声、字幕、間、演出を最終調整'],
    images: [
      {
        src: homeAssets.materialBoard,
        alt: '台本行と素材の配置を一覧で確認する素材ボード',
        title: '素材ボードの確認画面',
        annotations: [
          { x: 10, y: 17, label: '台本と素材' },
          { x: 48, y: 56, label: '不足確認' },
          { x: 82, y: 17, label: '保存先' },
        ],
      },
    ],
  },
]

export const demoTimeline = [
  { time: '0〜4秒', screen: 'タイトル＋制作フロー', caption: '素材集めから台本づくり。YMM4前準備までひとつの制作フローに。' },
  { time: '4〜12秒', screen: 'サイト選択・URL入力・取得', caption: '対応URLから本文・コメント候補を取得' },
  { time: '12〜20秒', screen: '候補選択・コメント設定', caption: '使う内容を確認して取り込む' },
  { time: '20〜30秒', screen: 'プリセット・話者・改行', caption: '話者・改行・タイトルを動画の型に揃える' },
  { time: '30〜40秒', screen: 'AI台本案', caption: '任意で台本案を作り、結果を確認' },
  { time: '40〜49秒', screen: '台本編集・素材ボード', caption: '台本と素材の抜けを確認' },
  { time: '49〜57秒', screen: 'YMM4前準備', caption: '保存先・素材パス・CSV/.ymmp前準備を確認' },
  { time: '57〜59秒', screen: '仕上げ範囲', caption: '最後の音声・字幕・演出はYMM4で' },
] as const

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
    title: 'コメントの順番と話者を整え、テンポはYMM4で仕上げる。',
    poster: '/samples/sample-reaction-digest-thumbnail.png',
    video: '/samples/sample-reaction-digest-preview.mp4',
    input: 'スレッドURL / コメント',
    supportScope: 'コメント取得、選定、話者割り当て、タイトル読み、改行',
    userScope: '音声、間、立ち絵、効果音、最終字幕',
  },
  {
    id: 'explainer',
    title: '導入・本編・まとめの構成で、台本案を作る。',
    poster: '/samples/sample-yukkuri-dialogue-thumbnail.png',
    video: '/samples/sample-yukkuri-dialogue-preview.mp4',
    input: 'テーマ / 下書き / 参考URL',
    supportScope: '構成指定、AI台本案、話者、文字量、素材確認',
    userScope: '事実・表現確認、演出、音声、最終編集',
  },
  {
    id: 'shorts',
    title: '冒頭・展開・締めに絞り、短尺向けの文字量へ。',
    poster: '/samples/sample-short-drama-thumbnail.png',
    video: '/samples/sample-short-drama-preview.mp4',
    input: 'テーマ / 長文下書き',
    supportScope: '構成圧縮、改行、文字量、素材配置',
    userScope: '尺、テンポ、縦画面、強調字幕',
  },
]

export const freeChecks = [
  '公開配布の可否と条件が確定しているか',
  'Windows 10 / 11 とYMM4前提に合うか',
  '直接取得CTAが表示できる状態か',
  'Premium購入前に未確認条件が残っていないか',
] as const

export type PlanComparisonRow = {
  id: string
  label: string
  free: string
  premium: string
  corporate: string
}

export const comparisonRows: PlanComparisonRow[] = [
  { id: 'price', label: '価格', free: '公開条件確認中', premium: homeFacts.premiumPrice, corporate: homeFacts.corporatePrice },
  { id: 'billing', label: '課金', free: '購入実行CTAなし', premium: '買い切り / 月額なし', corporate: '買い切り / 月額なし' },
  { id: 'fetch', label: 'URLからの台本取得', free: '利用可否を確認中', premium: '具体的な利用条件は公開前確認中', corporate: '法人利用条件として確認' },
  { id: 'ai-script', label: 'AI台本案（任意）', free: '利用可否を確認中', premium: '具体的な利用条件は確認中', corporate: '業務利用条件として確認' },
  { id: 'editor', label: '台本編集', free: '公開条件確認中', premium: '自分の制作ルールで継続利用', corporate: 'チーム運用前提で確認' },
  { id: 'preset', label: 'プリセット', free: '公開条件確認中', premium: '制作ルールを保存して継続利用', corporate: '制作ルール共有を確認' },
  { id: 'materials', label: '素材ボード', free: '公開条件確認中', premium: '継続制作の素材確認に利用', corporate: '複数案件の素材確認を想定' },
  { id: 'save', label: 'プロジェクト保存', free: '公開条件確認中', premium: '保存条件を確認して継続利用', corporate: '保存・管理条件を確認' },
  { id: 'handoff', label: 'YMM4前準備', free: '公開条件確認中', premium: '継続利用条件を確認中', corporate: '法人制作の前工程に合わせて確認' },
  { id: 'account', label: '権限確認', free: '公開条件確認中', premium: '購入後の権限反映を確認', corporate: '法人アカウント運用を確認' },
  { id: 'updates', label: 'アップデート', free: '直接取得CTAは未表示', premium: '公開配布版を利用', corporate: '保守・更新範囲を確認' },
  { id: 'support', label: 'サポート', free: homeFacts.supportSla, premium: homeFacts.supportSla, corporate: homeFacts.supportSla },
]

export const purchaseConditionRows = [
  { label: '利用可能PC台数', value: '公開条件の確定待ちです。確定するまで購入実行CTAは出しません。' },
  { label: 'PC変更・再認証', value: '公開条件の確定待ちです。確定後に料金ページへ反映します。' },
  { label: '公開配布・試用可否', value: '公開UI・料金・法務が一致するまで無料版や試用可とは表示しません。' },
  { label: 'Premiumの上限・公正利用条件', value: '公開条件の確定待ちです。未確認のまま強い表現は使いません。' },
  { label: '返金条件', value: homeFacts.refundSummary },
  { label: 'サポート', value: `${homeFacts.supportHours} / ${homeFacts.supportSla}` },
] as const

export const premiumFit = [
  'YMM4でまとめ・反応集・解説動画を継続して作る。',
  'URL取得、台本整形、話者設定を毎回繰り返している。',
  '自分のプリセットと制作ルールを使い続けたい。',
  '月額ではなく買い切りを選びたい。',
  '法人・チーム利用では、220,000円税込の契約条件を確認したい。',
  '最後の品質はYMM4で自分で仕上げたい。',
] as const

export const premiumMismatch = [
  'Macまたはスマートフォンだけで使いたい。',
  'YMM4を使わない。',
  '完成・投稿まで自動で任せたい。',
  'AI出力、出典、素材権利、最終編集を確認したくない。',
  '再生数や収益化の保証を求めている。',
] as const

export const requirementRows = [
  { label: '対応OS', value: homeFacts.osLabel },
  { label: 'Mac', value: '非対応' },
  { label: 'YMM4', value: '必須。反映後の仕上げはYMM4で行います。' },
  { label: '配布候補', value: `${homeFacts.setupFileName} / 約${homeFacts.setupSizeMb}` },
  { label: 'インターネット', value: 'ログイン、配布確認、URL取得、外部AI連携などで通信を使います。' },
  { label: '対応入力', value: '記事URL、スレッドURL、下書き、テーマ。対応URLはFAQで確認してください。' },
  { label: 'APIキー', value: '外部API連携など一部機能ではAPIキーが必要です。' },
  { label: 'サポート', value: `${homeFacts.supportHours} / ${homeFacts.supportSla}` },
] as const

export const responsibilityItems = [
  '本文・コメントの取得支援',
  '台本取得・生成・編集',
  '話者・改行・構成等の設定',
  '素材配置の確認',
  'YMM4への反映',
] as const

export const userResponsibilityItems = [
  'AI出力と事実の確認',
  '引用、出典、素材権利の確認',
  '音声、字幕、間、立ち絵、演出の最終調整',
  'MP4出力',
  '投稿・公開判断',
] as const

export const downloadTrustItems = [
  { label: '候補バージョン', value: homeFacts.releaseVersion },
  { label: '確認日', value: homeFacts.releaseDate },
  { label: 'チャンネル', value: homeFacts.releaseChannel },
  { label: 'ファイルサイズ', value: `約${homeFacts.setupSizeMb}` },
  { label: 'SHA-256', value: homeFacts.setupSha256 },
] as const

export const homeFaqs = [
  {
    id: 'free',
    question: '無料版はありますか？',
    answer:
      '現時点で無料版として案内できる公開版は用意していません。配布可否、試用可否、利用条件が確定するまで、無料版とは表示しません。',
  },
  {
    id: 'premium',
    question: 'Premiumにすると何が変わりますか？',
    answer:
      `法人プランは${homeFacts.corporatePrice}、個人向けPremiumは${homeFacts.premiumPrice}の買い切りで、月額料金はありません。URL取得、AI台本案、保存、YMM4前準備などの継続利用条件は、購入前に料金ページと案内で確認してください。`,
  },
  {
    id: 'auto-finish',
    question: '動画は自動で完成しますか？',
    answer:
      '完成・投稿まで自動で進めるアプリではありません。本製品は台本取得、AI台本、ボード編集、テンプレート、YMM4前準備を支援します。音声、字幕、間、演出、出典、公開前の確認はYMM4と利用者側で行います。',
  },
  {
    id: 'ymm4-required',
    question: 'YMM4は必要ですか？',
    answer:
      'はい。YMM4で仕上げる前提のWindows向けアプリです。YMM4なしで編集を完結する設計ではありません。',
  },
  {
    id: 'windows',
    question: 'Macやスマートフォンで使えますか？',
    answer: '使えません。Windows 10 / 11向けです。',
  },
  {
    id: 'no-url',
    question: 'URLがなくても始められますか？',
    answer:
      'はい。下書き、テーマ、素材メモなどから開始できます。URL取得を使う場合は、対応サイトと取得条件をご確認ください。',
  },
  {
    id: 'sites',
    question: 'どのサイトから取得できますか？',
    answer:
      '対応サイトと取得できる内容は、アプリ内のサイト選択とFAQで確認できます。対象外URLは取得できない場合があります。',
  },
  {
    id: 'formats',
    question: 'どのような動画に使えますか？',
    answer:
      '反応集、まとめ、解説、ショート、掛け合いなど、台本と素材をYMM4で組む動画に使えます。形式ごとの完成作例はサンプルページで確認できます。',
  },
  {
    id: 'ai-review',
    question: 'AIが作った台本はそのまま使えますか？',
    answer:
      '内容、事実、表現、出典、権利、文字量を確認してから使用してください。生成結果はプレビューと台本編集画面で修正できます。',
  },
  {
    id: 'publish',
    question: 'YouTubeなどへ自動投稿されますか？',
    answer:
      'されません。保存、YMM4反映、MP4出力、投稿・公開は利用者が確認して行います。',
  },
  {
    id: 'license',
    question: '1ライセンスで何台のPCに使えますか？',
    answer:
      'PC台数、PC変更、再認証ルールは公開条件の確定待ちです。確定するまで購入実行CTAは出さず、未確認の台数を表示しません。',
  },
  {
    id: 'updates',
    question: 'アップデートは料金に含まれますか？',
    answer:
      '公開配布版の更新情報はアップデートページで確認できます。提供範囲やメジャーアップデート条件は購入前に案内を確認してください。',
  },
  {
    id: 'support',
    question: 'サポートはありますか？',
    answer:
      `問い合わせ窓口を用意しています。受付は${homeFacts.supportHours}、一次回答は${homeFacts.supportSla}です。`,
  },
  {
    id: 'refund',
    question: '購入後に返金できますか？',
    answer: `${homeFacts.refundSummary} 詳細は返金・キャンセルポリシーをご確認ください。`,
  },
  {
    id: 'data',
    question: '入力内容は外部サービスへ送信されますか？',
    answer:
      'URL取得、外部API連携、外部AI連携など、使う機能によって通信先が変わります。個人情報や入力内容の扱いはプライバシーポリシーとアプリ内の案内を確認してください。',
  },
  {
    id: 'results',
    question: '収益化や再生数は保証されますか？',
    answer:
      '保証しません。本製品は制作フローを支援するツールであり、動画の成果を保証するものではありません。',
  },
] as const
