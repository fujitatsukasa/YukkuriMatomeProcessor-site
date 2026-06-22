export type FactStatus = 'confirmed' | 'pending' | 'internalOnly'
export type DecisionStatus = 'confirmed' | 'pending' | 'blocked'
export type GateName = 'purchaseReady' | 'downloadReady' | 'publishReady'
export type DecisionId =
  | 'D1'
  | 'D2'
  | 'D3'
  | 'D4'
  | 'D5'
  | 'D6'
  | 'D7'
  | 'D8'
  | 'D9'
  | 'D10'
  | 'D11'
  | 'D12'

export type SourceRef = {
  label: string
  path?: string
  note?: string
}

export type ProductFact<T> = {
  value: T
  status: FactStatus
  source: string
  lastVerifiedAt: string
  sourceRefs?: SourceRef[]
  owner?: string
  approvedBy?: string | null
  validForAppVersion?: string | null
  validForSiteCommit?: string | null
}

export type DecisionRecord = {
  id: DecisionId
  title: string
  status: DecisionStatus
  decision: string | null
  owner: string
  sourceRefs: SourceRef[]
  approvedBy: string | null
  approvedAt: string | null
  effectiveFrom: string | null
  validForAppVersion: string | null
  validForSiteCommit: string | null
  reviewTriggers: string[]
  blocks: GateName[]
}

export type GateCriterion = {
  id: string
  label: string
  satisfied: boolean
  blockingDecisionIds: DecisionId[]
  sourceRefs: SourceRef[]
}

export type GateFact = ProductFact<boolean> & {
  gate: GateName
  criteria: GateCriterion[]
  blockers: DecisionId[]
}

export type DistributionCandidateStatus = 'pending' | 'confirmed'

export type DistributionAsset = {
  label: string
  fileName: string
  url: string
  sizeBytes: number
  sha256: string
  description: string
}

export type DistributionCandidate = {
  status: DistributionCandidateStatus
  statusLabel: string
  version: string
  versionLabel: string
  channel: string
  checkedAt: string
  checkedAtLabel: string
  publishedAt: string
  baseUrl: string
  releaseNotesUrl: string
  sha256SumsUrl: string
  updateFeedUrl: string
  releaseManifestUrl: string
  summary: string
  trustNote: string
  source: string
  sourceRefs: SourceRef[]
  assets: {
    setup: DistributionAsset
    portable: DistributionAsset
  }
}

export const publicDownloadPage = '/download/'
export const purchasePage = '/purchase/'
export const distributionBaseUrl = 'https://ymp-api.fujita-otm.workers.dev/updates/ymp/win-x64-stable/'
export const setupDownloadUrl = `${distributionBaseUrl}YukkuriMatomeProcessor-win-x64-stable-Setup.exe`
export const portableDownloadUrl = `${distributionBaseUrl}YukkuriMatomeProcessor-win-x64-stable-Portable.zip`
export const releaseNotesUrl = `${distributionBaseUrl}release-notes.json`
export const sha256SumsUrl = `${distributionBaseUrl}sha256sums.txt`
export const updateFeedUrl = `${distributionBaseUrl}RELEASES-win-x64-stable`
export const releaseManifestUrl = `${distributionBaseUrl}releases.win-x64-stable.json`

const verifiedAt = '2026-06-22'
const currentSiteCommit = null

const refs = {
  hundredPointDefinition: {
    label: 'Home / 販売LP 100点定義 v2',
    path: 'docs/home-lp-100-point-definition-2026-06-22.md',
  },
  legalData: {
    label: 'site-content legal data',
    path: 'vite-site/src/data/site-content.ts',
  },
  agentsRules: {
    label: 'AGENTS.md LP rules',
    path: 'AGENTS.md',
  },
  productFacts: {
    label: 'product-facts.ts',
    path: 'vite-site/src/data/product-facts.ts',
  },
} satisfies Record<string, SourceRef>

const pendingReviewTriggers = [
  'サイト公開前',
  '価格・プラン変更時',
  'アプリ公開版変更時',
  '法務文書変更時',
  '配布manifest変更時',
]

export const releaseCandidateDistribution = {
  status: 'pending',
  statusLabel: '配布候補 / D10確認中',
  version: '0.0.18',
  versionLabel: '0.0.18候補',
  channel: 'win-x64-stable',
  checkedAt: '2026-06-01',
  checkedAtLabel: '2026年06月01日確認',
  publishedAt: '2026-06-01T05:06:24Z',
  baseUrl: distributionBaseUrl,
  releaseNotesUrl,
  sha256SumsUrl,
  updateFeedUrl,
  releaseManifestUrl,
  summary: 'D10未確定の配布候補です。更新フィード、インストーラー、ポータブルZIPの候補情報を確認用に表示しています。',
  trustNote:
    'D10確認中のため、配布版・署名・SmartScreen実測が揃うまで直接取得ボタンは表示しません。候補ファイルの情報は配布ゲート確認用です。',
  source: 'D10未確定の配布候補。公開配布版の正本ではなく、配布ゲート確認用の候補値として扱う。',
  sourceRefs: [refs.hundredPointDefinition, refs.productFacts],
  assets: {
    setup: {
      label: 'インストーラー候補',
      fileName: 'YukkuriMatomeProcessor-win-x64-stable-Setup.exe',
      url: setupDownloadUrl,
      sizeBytes: 296298648,
      sha256: 'f94189480102667b1a0baa094769f7f618d54310e8139450c84626f5c48ea7c0',
      description: 'D10確認中のインストーラー候補です。配布ゲート通過までは直接取得CTAに使いません。',
    },
    portable: {
      label: 'ポータブルZIP候補',
      fileName: 'YukkuriMatomeProcessor-win-x64-stable-Portable.zip',
      url: portableDownloadUrl,
      sizeBytes: 293707665,
      sha256: '6308813c5f80e7420a7627f13c7ae9ae6113f66d1923be8cfc0575e73dbbd64a',
      description: 'D10確認中のポータブルZIP候補です。配布ゲート通過までは直接取得CTAに使いません。',
    },
  },
} satisfies DistributionCandidate

export const decisionRecords: DecisionRecord[] = [
  {
    id: 'D1',
    title: '対象ユーザー、LPの役割、主要CV、商品成果物、非対応範囲',
    status: 'pending',
    decision: null,
    owner: '事業責任者',
    sourceRefs: [refs.hundredPointDefinition],
    approvedBy: null,
    approvedAt: null,
    effectiveFrom: null,
    validForAppVersion: null,
    validForSiteCommit: currentSiteCommit,
    reviewTriggers: pendingReviewTriggers,
    blocks: ['publishReady'],
  },
  {
    id: 'D2',
    title: 'Free機能、上限、単位、周期、上限到達時挙動',
    status: 'pending',
    decision: null,
    owner: '事業責任者',
    sourceRefs: [refs.hundredPointDefinition],
    approvedBy: null,
    approvedAt: null,
    effectiveFrom: null,
    validForAppVersion: null,
    validForSiteCommit: currentSiteCommit,
    reviewTriggers: pendingReviewTriggers,
    blocks: ['purchaseReady', 'publishReady'],
  },
  {
    id: 'D3',
    title: 'Premium権利、上限、公正利用、警告・停止条件',
    status: 'pending',
    decision: null,
    owner: '事業責任者',
    sourceRefs: [refs.hundredPointDefinition],
    approvedBy: null,
    approvedAt: null,
    effectiveFrom: null,
    validForAppVersion: null,
    validForSiteCommit: currentSiteCommit,
    reviewTriggers: pendingReviewTriggers,
    blocks: ['purchaseReady', 'publishReady'],
  },
  {
    id: 'D4',
    title: 'Googleアカウント、PC台数、同時利用、端末変更、再認証',
    status: 'pending',
    decision: null,
    owner: '事業責任者',
    sourceRefs: [refs.hundredPointDefinition],
    approvedBy: null,
    approvedAt: null,
    effectiveFrom: null,
    validForAppVersion: null,
    validForSiteCommit: currentSiteCommit,
    reviewTriggers: pendingReviewTriggers,
    blocks: ['purchaseReady', 'publishReady'],
  },
  {
    id: 'D5',
    title: '価格、決済、最終確認、権限付与、失敗時対応、返金、領収書',
    status: 'pending',
    decision: null,
    owner: '事業責任者 / 法務・データ責任者',
    sourceRefs: [refs.legalData, refs.hundredPointDefinition],
    approvedBy: null,
    approvedAt: null,
    effectiveFrom: null,
    validForAppVersion: null,
    validForSiteCommit: currentSiteCommit,
    reviewTriggers: pendingReviewTriggers,
    blocks: ['purchaseReady', 'publishReady'],
  },
  {
    id: 'D6',
    title: '更新、保守、サポート、メジャー版、EOL',
    status: 'pending',
    decision: null,
    owner: '事業責任者 / 法務・データ責任者',
    sourceRefs: [refs.hundredPointDefinition],
    approvedBy: null,
    approvedAt: null,
    effectiveFrom: null,
    validForAppVersion: null,
    validForSiteCommit: currentSiteCommit,
    reviewTriggers: pendingReviewTriggers,
    blocks: ['purchaseReady', 'publishReady'],
  },
  {
    id: 'D7',
    title: '対応入力、対応URL、取得範囲、非対応条件、権利確認',
    status: 'pending',
    decision: null,
    owner: 'アプリ・リリース責任者 / 法務・データ責任者',
    sourceRefs: [refs.hundredPointDefinition],
    approvedBy: null,
    approvedAt: null,
    effectiveFrom: null,
    validForAppVersion: null,
    validForSiteCommit: currentSiteCommit,
    reviewTriggers: pendingReviewTriggers,
    blocks: ['publishReady'],
  },
  {
    id: 'D8',
    title: 'YMM4対応版、出力形式、受渡手順、動作環境、互換性',
    status: 'pending',
    decision: null,
    owner: 'アプリ・リリース責任者',
    sourceRefs: [refs.hundredPointDefinition],
    approvedBy: null,
    approvedAt: null,
    effectiveFrom: null,
    validForAppVersion: null,
    validForSiteCommit: currentSiteCommit,
    reviewTriggers: pendingReviewTriggers,
    blocks: ['downloadReady', 'publishReady'],
  },
  {
    id: 'D9',
    title: '外部AI/API、送信データ、保持・削除、分析・テレメトリー',
    status: 'pending',
    decision: null,
    owner: '法務・データ責任者',
    sourceRefs: [refs.hundredPointDefinition],
    approvedBy: null,
    approvedAt: null,
    effectiveFrom: null,
    validForAppVersion: null,
    validForSiteCommit: currentSiteCommit,
    reviewTriggers: pendingReviewTriggers,
    blocks: ['publishReady'],
  },
  {
    id: 'D10',
    title: '配布版、ファイル、SHA、署名、SmartScreen、リリースゲート',
    status: 'pending',
    decision: null,
    owner: 'アプリ・リリース責任者',
    sourceRefs: [refs.hundredPointDefinition],
    approvedBy: null,
    approvedAt: null,
    effectiveFrom: null,
    validForAppVersion: null,
    validForSiteCommit: currentSiteCommit,
    reviewTriggers: pendingReviewTriggers,
    blocks: ['downloadReady', 'publishReady'],
  },
  {
    id: 'D11',
    title: '主張・証拠対応、実画面、実出力、動画、サンプル、権利',
    status: 'pending',
    decision: null,
    owner: '事業責任者 / 法務・データ責任者 / アプリ・リリース責任者',
    sourceRefs: [refs.hundredPointDefinition],
    approvedBy: null,
    approvedAt: null,
    effectiveFrom: null,
    validForAppVersion: null,
    validForSiteCommit: currentSiteCommit,
    reviewTriggers: pendingReviewTriggers,
    blocks: ['publishReady'],
  },
  {
    id: 'D12',
    title: 'purchaseReady、downloadReady、publishReadyの派生判定',
    status: 'pending',
    decision: 'D1〜D11のconfirmed状態とE2E検証結果から派生する。手入力でtrueにしない。',
    owner: 'Codex / 公開責任者',
    sourceRefs: [refs.productFacts, refs.hundredPointDefinition],
    approvedBy: null,
    approvedAt: null,
    effectiveFrom: null,
    validForAppVersion: null,
    validForSiteCommit: currentSiteCommit,
    reviewTriggers: pendingReviewTriggers,
    blocks: ['purchaseReady', 'downloadReady', 'publishReady'],
  },
]

function decisionIsConfirmed(id: DecisionId) {
  return decisionRecords.some((decision) => decision.id === id && decision.status === 'confirmed')
}

function factIsConfirmed<T>(fact: ProductFact<T>) {
  return fact.status === 'confirmed'
}

function uniqueDecisionIds(ids: DecisionId[]) {
  return [...new Set(ids)]
}

function deriveGate(gate: GateName, label: string, criteria: GateCriterion[]): GateFact {
  const blockers = uniqueDecisionIds(criteria.flatMap((criterion) => (criterion.satisfied ? [] : criterion.blockingDecisionIds)))
  const isReady = blockers.length === 0

  return {
    gate,
    value: isReady,
    status: 'confirmed',
    source: isReady
      ? `${label}: D1〜D11とE2E条件を満たしたため派生Go`
      : `${label}: 未確定D項目が残るため派生No-Go (${blockers.join(', ')})`,
    sourceRefs: [refs.productFacts, refs.hundredPointDefinition],
    lastVerifiedAt: verifiedAt,
    owner: 'Codex',
    approvedBy: null,
    validForAppVersion: null,
    validForSiteCommit: currentSiteCommit,
    criteria,
    blockers,
  }
}

const baseFacts = {
  productName: {
    value: 'ゆっくりまとめプロセッサー',
    status: 'confirmed',
    source: 'site-content.ts / legal pages',
    sourceRefs: [refs.legalData],
    lastVerifiedAt: verifiedAt,
    owner: '事業責任者',
    approvedBy: null,
    validForAppVersion: null,
    validForSiteCommit: currentSiteCommit,
  },
  provider: {
    value: 'OTM株式会社',
    status: 'confirmed',
    source: '特定商取引法に基づく表記',
    sourceRefs: [refs.legalData],
    lastVerifiedAt: verifiedAt,
    owner: '法務・データ責任者',
    approvedBy: null,
    validForAppVersion: null,
    validForSiteCommit: currentSiteCommit,
  },
  productScope: {
    value: '記事URL・スレッドURL・下書きから、YMM4で仕上げる前の台本下地・素材確認を支援',
    status: 'confirmed',
    source: 'AGENTS.md / Home LP rules。一次証拠ではなくLP表示方針として扱う',
    sourceRefs: [refs.agentsRules],
    lastVerifiedAt: verifiedAt,
    owner: '事業責任者',
    approvedBy: null,
    validForAppVersion: null,
    validForSiteCommit: currentSiteCommit,
  },
  operatingSystems: {
    value: ['Windows 10', 'Windows 11'],
    status: 'confirmed',
    source: 'AGENTS.md / site FAQ。一次証拠はD8/D10で別途確認する',
    sourceRefs: [refs.agentsRules],
    lastVerifiedAt: verifiedAt,
    owner: 'アプリ・リリース責任者',
    approvedBy: null,
    validForAppVersion: null,
    validForSiteCommit: currentSiteCommit,
  },
  requiresYmm4: {
    value: true,
    status: 'confirmed',
    source: 'AGENTS.md / site FAQ。具体対応版はD8で確定する',
    sourceRefs: [refs.agentsRules],
    lastVerifiedAt: verifiedAt,
    owner: 'アプリ・リリース責任者',
    approvedBy: null,
    validForAppVersion: null,
    validForSiteCommit: currentSiteCommit,
  },
  macSupported: {
    value: false,
    status: 'confirmed',
    source: 'AGENTS.md / site FAQ',
    sourceRefs: [refs.agentsRules],
    lastVerifiedAt: verifiedAt,
    owner: '事業責任者',
    approvedBy: null,
    validForAppVersion: null,
    validForSiteCommit: currentSiteCommit,
  },
  premiumPrice: {
    value: 39800,
    status: 'confirmed',
    source: 'site legal data / specified commercial transactions',
    sourceRefs: [refs.legalData],
    lastVerifiedAt: verifiedAt,
    owner: '法務・データ責任者',
    approvedBy: null,
    validForAppVersion: null,
    validForSiteCommit: currentSiteCommit,
  },
  currency: {
    value: 'JPY',
    status: 'confirmed',
    source: 'site legal data',
    sourceRefs: [refs.legalData],
    lastVerifiedAt: verifiedAt,
    owner: '法務・データ責任者',
    approvedBy: null,
    validForAppVersion: null,
    validForSiteCommit: currentSiteCommit,
  },
  billingType: {
    value: '買い切り / 月額なし',
    status: 'confirmed',
    source: 'site legal data',
    sourceRefs: [refs.legalData],
    lastVerifiedAt: verifiedAt,
    owner: '法務・データ責任者',
    approvedBy: null,
    validForAppVersion: null,
    validForSiteCommit: currentSiteCommit,
  },
  paymentMethod: {
    value: 'Stripe Checkoutによる一度払い',
    status: 'confirmed',
    source: 'site legal data / app legal docs',
    sourceRefs: [refs.legalData],
    lastVerifiedAt: verifiedAt,
    owner: '法務・データ責任者',
    approvedBy: null,
    validForAppVersion: null,
    validForSiteCommit: currentSiteCommit,
  },
  refundPolicy: {
    value: '購入後7日以内を原則受付。返金成立時はPremium権限を停止します。',
    status: 'confirmed',
    source: 'refund policy。正確な返金条件はD5で再確認する',
    sourceRefs: [refs.legalData],
    lastVerifiedAt: verifiedAt,
    owner: '法務・データ責任者',
    approvedBy: null,
    validForAppVersion: null,
    validForSiteCommit: currentSiteCommit,
  },
  supportSla: {
    value: '2営業日以内を目安に一次回答',
    status: 'confirmed',
    source: 'site legal data。EOL/保守範囲はD6で確定する',
    sourceRefs: [refs.legalData],
    lastVerifiedAt: verifiedAt,
    owner: '事業責任者',
    approvedBy: null,
    validForAppVersion: null,
    validForSiteCommit: currentSiteCommit,
  },
  freeLimits: {
    value: null,
    status: 'pending',
    source: 'D2未確定。公開UI・料金・法務の一致確認が必要',
    sourceRefs: [refs.hundredPointDefinition],
    lastVerifiedAt: verifiedAt,
    owner: '事業責任者',
    approvedBy: null,
    validForAppVersion: null,
    validForSiteCommit: currentSiteCommit,
  },
  premiumLimits: {
    value: null,
    status: 'pending',
    source: 'D3未確定。Premium権利と公正利用条件の承認が必要',
    sourceRefs: [refs.hundredPointDefinition],
    lastVerifiedAt: verifiedAt,
    owner: '事業責任者',
    approvedBy: null,
    validForAppVersion: null,
    validForSiteCommit: currentSiteCommit,
  },
  pcCount: {
    value: null,
    status: 'pending',
    source: 'D4未確定。Googleアカウント、登録台数、同時利用、再認証条件が必要',
    sourceRefs: [refs.hundredPointDefinition],
    lastVerifiedAt: verifiedAt,
    owner: '事業責任者',
    approvedBy: null,
    validForAppVersion: null,
    validForSiteCommit: currentSiteCommit,
  },
  pcChangePolicy: {
    value: null,
    status: 'pending',
    source: 'D4未確定。PC変更・再認証・紛失時対応の公開条件が必要',
    sourceRefs: [refs.hundredPointDefinition],
    lastVerifiedAt: verifiedAt,
    owner: '事業責任者',
    approvedBy: null,
    validForAppVersion: null,
    validForSiteCommit: currentSiteCommit,
  },
  updateScope: {
    value: null,
    status: 'pending',
    source: 'D6未確定。更新、保守、メジャー版、EOL条件が必要',
    sourceRefs: [refs.hundredPointDefinition],
    lastVerifiedAt: verifiedAt,
    owner: '事業責任者',
    approvedBy: null,
    validForAppVersion: null,
    validForSiteCommit: currentSiteCommit,
  },
  supportedYmm4Versions: {
    value: null,
    status: 'pending',
    source: 'D8未確定。YMM4対応版、出力形式、互換性検証が必要',
    sourceRefs: [refs.hundredPointDefinition],
    lastVerifiedAt: verifiedAt,
    owner: 'アプリ・リリース責任者',
    approvedBy: null,
    validForAppVersion: null,
    validForSiteCommit: currentSiteCommit,
  },
  supportedUrls: {
    value: null,
    status: 'pending',
    source: 'D7未確定。対応入力、対応URL、非対応条件、権利確認が必要',
    sourceRefs: [refs.hundredPointDefinition],
    lastVerifiedAt: verifiedAt,
    owner: 'アプリ・リリース責任者 / 法務・データ責任者',
    approvedBy: null,
    validForAppVersion: null,
    validForSiteCommit: currentSiteCommit,
  },
  publicVersion: {
    value: releaseCandidateDistribution.version,
    status: 'pending',
    source: 'D10未確定。値は配布候補であり、公開配布版としては未承認',
    sourceRefs: releaseCandidateDistribution.sourceRefs,
    lastVerifiedAt: verifiedAt,
    owner: 'アプリ・リリース責任者',
    approvedBy: null,
    validForAppVersion: null,
    validForSiteCommit: currentSiteCommit,
  },
  signingStatus: {
    value: '自己署名または署名状態確認中',
    status: 'pending',
    source: 'D10未確定。署名の有効性、発行者表示、SmartScreen実測を分けて確認する',
    sourceRefs: [refs.hundredPointDefinition],
    lastVerifiedAt: verifiedAt,
    owner: 'アプリ・リリース責任者',
    approvedBy: null,
    validForAppVersion: null,
    validForSiteCommit: currentSiteCommit,
  },
} satisfies Record<string, ProductFact<unknown>>

const purchaseCriteria: GateCriterion[] = [
  {
    id: 'price-billing-payment',
    label: '価格、税込表示、通貨、買い切り、支払方法の表示',
    satisfied:
      factIsConfirmed(baseFacts.premiumPrice) &&
      factIsConfirmed(baseFacts.currency) &&
      factIsConfirmed(baseFacts.billingType) &&
      factIsConfirmed(baseFacts.paymentMethod),
    blockingDecisionIds: ['D5'],
    sourceRefs: [refs.legalData],
  },
  {
    id: 'free-premium-rights',
    label: 'Free/Premiumの権利差、上限、公正利用条件',
    satisfied: decisionIsConfirmed('D2') && decisionIsConfirmed('D3'),
    blockingDecisionIds: ['D2', 'D3'],
    sourceRefs: [refs.hundredPointDefinition],
  },
  {
    id: 'account-device-license',
    label: 'Googleアカウント、PC台数、同時利用、再認証',
    satisfied: decisionIsConfirmed('D4'),
    blockingDecisionIds: ['D4'],
    sourceRefs: [refs.hundredPointDefinition],
  },
  {
    id: 'maintenance-refund-entitlement',
    label: '更新・保守、最終確認、権限付与、返金、領収書',
    satisfied: decisionIsConfirmed('D5') && decisionIsConfirmed('D6'),
    blockingDecisionIds: ['D5', 'D6'],
    sourceRefs: [refs.hundredPointDefinition, refs.legalData],
  },
  {
    id: 'purchase-e2e-approval',
    label: '購入E2Eと法務・事業責任者承認',
    satisfied: false,
    blockingDecisionIds: ['D5', 'D12'],
    sourceRefs: [refs.hundredPointDefinition],
  },
]

const downloadCriteria: GateCriterion[] = [
  {
    id: 'distribution-manifest',
    label: '公開バージョン、配布チャンネル、ファイル、サイズ、SHA-256',
    satisfied: decisionIsConfirmed('D10'),
    blockingDecisionIds: ['D10'],
    sourceRefs: [refs.hundredPointDefinition],
  },
  {
    id: 'signature-smartscreen',
    label: '署名状態、発行者名、SmartScreen実測',
    satisfied: decisionIsConfirmed('D10'),
    blockingDecisionIds: ['D10'],
    sourceRefs: [refs.hundredPointDefinition],
  },
  {
    id: 'runtime-compatibility',
    label: 'YMM4対応版、受渡形式、動作環境、互換性',
    satisfied: decisionIsConfirmed('D8'),
    blockingDecisionIds: ['D8'],
    sourceRefs: [refs.hundredPointDefinition],
  },
  {
    id: 'clean-windows-e2e',
    label: 'クリーンWindows 10 / 11での起動確認と公開責任者承認',
    satisfied: false,
    blockingDecisionIds: ['D10', 'D12'],
    sourceRefs: [refs.hundredPointDefinition],
  },
]

const publishCriteria: GateCriterion[] = [
  {
    id: 'go-to-market-basics',
    label: '対象ユーザー、主要CV、商品成果物、非対応範囲',
    satisfied: decisionIsConfirmed('D1'),
    blockingDecisionIds: ['D1'],
    sourceRefs: [refs.hundredPointDefinition],
  },
  {
    id: 'plan-license-legal',
    label: 'プラン、ライセンス、決済、返金、更新、サポート',
    satisfied:
      decisionIsConfirmed('D2') &&
      decisionIsConfirmed('D3') &&
      decisionIsConfirmed('D4') &&
      decisionIsConfirmed('D5') &&
      decisionIsConfirmed('D6'),
    blockingDecisionIds: ['D2', 'D3', 'D4', 'D5', 'D6'],
    sourceRefs: [refs.hundredPointDefinition],
  },
  {
    id: 'product-runtime-data',
    label: '対応URL、YMM4互換性、外部AI/API、データ送信',
    satisfied: decisionIsConfirmed('D7') && decisionIsConfirmed('D8') && decisionIsConfirmed('D9'),
    blockingDecisionIds: ['D7', 'D8', 'D9'],
    sourceRefs: [refs.hundredPointDefinition],
  },
  {
    id: 'distribution-and-evidence',
    label: '配布ゲート、主張・証拠対応、素材権利',
    satisfied: decisionIsConfirmed('D10') && decisionIsConfirmed('D11'),
    blockingDecisionIds: ['D10', 'D11'],
    sourceRefs: [refs.hundredPointDefinition],
  },
  {
    id: 'derived-gates',
    label: 'purchaseReady、downloadReady、publishReadyの派生判定と公開承認',
    satisfied: false,
    blockingDecisionIds: ['D12'],
    sourceRefs: [refs.productFacts, refs.hundredPointDefinition],
  },
]

export const productFacts = {
  ...baseFacts,
  purchaseReady: deriveGate('purchaseReady', 'Premium購入ゲート', purchaseCriteria),
  downloadReady: deriveGate('downloadReady', 'Free配布ゲート', downloadCriteria),
  publishReady: deriveGate('publishReady', 'LP公開ゲート', publishCriteria),
} as const

export const readinessGates = {
  purchaseReady: productFacts.purchaseReady,
  downloadReady: productFacts.downloadReady,
  publishReady: productFacts.publishReady,
} as const

export function isConfirmed<T>(fact: ProductFact<T>) {
  return fact.status === 'confirmed'
}

export function getConfirmedValue<T>(fact: ProductFact<T>) {
  return isConfirmed(fact) ? fact.value : null
}
