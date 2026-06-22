export type FactStatus = 'confirmed' | 'pending' | 'internalOnly'

export type ProductFact<T> = {
  value: T
  status: FactStatus
  source: string
  lastVerifiedAt: string
}

export const publicDownloadPage = '/download/'
export const purchasePage = '/purchase/'

const verifiedAt = '2026-06-22'

export const productFacts = {
  productName: {
    value: 'ゆっくりまとめプロセッサー',
    status: 'confirmed',
    source: 'site-content.ts / legal pages',
    lastVerifiedAt: verifiedAt,
  },
  provider: {
    value: 'OTM株式会社',
    status: 'confirmed',
    source: '特定商取引法に基づく表記',
    lastVerifiedAt: verifiedAt,
  },
  productScope: {
    value: '記事URL・スレッドURL・下書きから、YMM4で仕上げる前の台本下地・素材確認を支援',
    status: 'confirmed',
    source: 'AGENTS.md / Home LP rules',
    lastVerifiedAt: verifiedAt,
  },
  operatingSystems: {
    value: ['Windows 10', 'Windows 11'],
    status: 'confirmed',
    source: 'AGENTS.md / site FAQ',
    lastVerifiedAt: verifiedAt,
  },
  requiresYmm4: {
    value: true,
    status: 'confirmed',
    source: 'AGENTS.md / site FAQ',
    lastVerifiedAt: verifiedAt,
  },
  macSupported: {
    value: false,
    status: 'confirmed',
    source: 'AGENTS.md / site FAQ',
    lastVerifiedAt: verifiedAt,
  },
  premiumPrice: {
    value: 39800,
    status: 'confirmed',
    source: 'site legal data / specified commercial transactions',
    lastVerifiedAt: verifiedAt,
  },
  currency: {
    value: 'JPY',
    status: 'confirmed',
    source: 'site legal data',
    lastVerifiedAt: verifiedAt,
  },
  billingType: {
    value: '買い切り / 月額なし',
    status: 'confirmed',
    source: 'site legal data',
    lastVerifiedAt: verifiedAt,
  },
  paymentMethod: {
    value: 'Stripe Checkoutによる一度払い',
    status: 'confirmed',
    source: 'site legal data / app legal docs',
    lastVerifiedAt: verifiedAt,
  },
  refundPolicy: {
    value: '購入後7日以内を原則受付。返金成立時はPremium権限を停止します。',
    status: 'confirmed',
    source: 'refund policy',
    lastVerifiedAt: verifiedAt,
  },
  supportSla: {
    value: '2営業日以内を目安に一次回答',
    status: 'confirmed',
    source: 'site legal data',
    lastVerifiedAt: verifiedAt,
  },
  freeLimits: {
    value: null,
    status: 'pending',
    source: '内部資料に候補値あり。公開UI・料金・法務の一致確認が必要',
    lastVerifiedAt: verifiedAt,
  },
  premiumLimits: {
    value: null,
    status: 'pending',
    source: '内部資料に候補値あり。買い切り権限との一致確認が必要',
    lastVerifiedAt: verifiedAt,
  },
  pcCount: {
    value: null,
    status: 'pending',
    source: '別PCヘルプは存在。台数上限と同時利用条件は未確定',
    lastVerifiedAt: verifiedAt,
  },
  pcChangePolicy: {
    value: null,
    status: 'pending',
    source: '公開条件未確定',
    lastVerifiedAt: verifiedAt,
  },
  updateScope: {
    value: null,
    status: 'pending',
    source: 'メジャーアップデート条件未確定',
    lastVerifiedAt: verifiedAt,
  },
  supportedYmm4Versions: {
    value: null,
    status: 'pending',
    source: 'YMM4必須は確定。具体バージョン範囲は未確認',
    lastVerifiedAt: verifiedAt,
  },
  supportedUrls: {
    value: null,
    status: 'pending',
    source: '対応URL一覧の公開正本が未確認',
    lastVerifiedAt: verifiedAt,
  },
  publicVersion: {
    value: null,
    status: 'pending',
    source: 'site dataと配布証跡に差異があるため要確認',
    lastVerifiedAt: verifiedAt,
  },
  signingStatus: {
    value: '自己署名または署名状態確認中',
    status: 'pending',
    source: 'public release gateでAuthenticode関連の未通過あり',
    lastVerifiedAt: verifiedAt,
  },
  purchaseReady: {
    value: false,
    status: 'confirmed',
    source: 'Free/Premium上限、PC台数、更新範囲が未確定のため購入実行CTAは抑制',
    lastVerifiedAt: verifiedAt,
  },
  downloadReady: {
    value: false,
    status: 'confirmed',
    source: '配布バージョン・署名・公開ゲートの不一致が残るため直接DL CTAは抑制',
    lastVerifiedAt: verifiedAt,
  },
} as const

export function isConfirmed<T>(fact: ProductFact<T>) {
  return fact.status === 'confirmed'
}

export function getConfirmedValue<T>(fact: ProductFact<T>) {
  return isConfirmed(fact) ? fact.value : null
}
