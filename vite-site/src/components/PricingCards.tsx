import { InteractiveCard } from '@/components/ui'
import { legal } from '@/data/site-content'
import { productFacts } from '@/data/product-facts'
import { ShieldCheck, CheckCircle2, Clock, CreditCard } from 'lucide-react'

type PlanFeature = {
  label: string
  active: boolean
  emphasis?: boolean
}

type PricingPlan = {
  key: 'free' | 'premium'
  name: string
  eyebrow: string
  price: string
  term: string
  bestFor: string
  summary: string
  note: string
  badge: string | null
  features: PlanFeature[]
}

const pricingPlans: PricingPlan[] = [
  {
    key: 'free',
    name: '配布確認',
    eyebrow: '公開前の確認項目',
    price: '確認中',
    term: '直接取得CTAは未表示',
    bestFor: '配布可否と導入条件を先に確認したい',
    summary: '無料版として案内できる公開版はまだ用意していません。配布条件、署名、SmartScreen、利用条件が揃うまで直接取得CTAは表示しません。',
    note: '無料版として案内せず、配布条件を確認する段階です。',
    badge: null,
    features: [
      { label: '配布候補のファイル情報を確認', active: true },
      { label: '署名・SmartScreenの確認待ち', active: true },
      { label: '動作環境とYMM4前提を確認', active: true },
      { label: '公開前の利用条件を確認', active: true },
      { label: '直接ダウンロードは未表示', active: true },
      { label: '公開前確認中のPremium条件', active: false },
    ],
  },
  {
    key: 'premium',
    name: 'Premium',
    eyebrow: '買い切り / 条件確認中',
    price: '¥39,800',
    term: '買い切り / 税込',
    bestFor: '公開済み条件を見てから買い切りを判断したい',
    summary: 'Premiumは月額なしの買い切りです。具体的な利用枠、PC台数、更新範囲は公開条件の確定後に案内します。',
    note: '未確認の条件を強く売らないため、購入実行は条件確定後に案内',
    badge: '買い切り',
    features: [
      { label: '公開済み条件に基づく利用', active: true },
      { label: 'CSV/.ymmpとフォーマット管理', active: true, emphasis: true },
      { label: '具体的なURL取得条件は確認中', active: true, emphasis: true },
      { label: 'AI台本案の利用条件は確認中', active: true, emphasis: true },
      { label: 'PC台数・再認証条件は確認中', active: true, emphasis: true },
      { label: '更新範囲は確認中', active: true, emphasis: true },
      { label: 'Googleアカウントへの権限保持', active: true, emphasis: true },
      { label: '購入者向けサポート', active: true, emphasis: true },
    ],
  },
] as const

const comparisonRows = [
  {
    label: '導入フェーズ',
    values: ['配布条件を確認', '購入条件の確認後に案内'],
  },
  {
    label: '主な強み',
    values: ['直接取得CTAは未表示', '買い切りで Premium 権限を保持'],
  },
  {
    label: 'CSV/.ymmp管理',
    values: ['公開条件の確認', '継続投稿で本格利用'],
  },
  {
    label: 'AI補助 / AI台本',
    values: ['利用可否を確認中', '具体的な利用条件は確認中'],
  },
  {
    label: '向いている規模感',
    values: ['公開前確認', '継続利用を検討する人'],
  },
  {
    label: 'サポート密度',
    values: ['基本案内', '購入者向けサポート'],
  },
] as const

export function PricingCards() {
  const purchaseReady = productFacts.purchaseReady.value

  return (
    <>
      {!purchaseReady ? (
        <div className="pricing-gate-notice pricing-layer" role="status">
          <strong>Premiumの購入条件は最終確認中です</strong>
          <p>
            39,800円（税込）の買い切り、月額なし、Stripe Checkoutの一度払いは確認済みです。
            配布可否、Premiumの具体的な利用枠、PC台数、再認証、更新範囲が揃うまで購入実行CTAは表示しません。
          </p>
        </div>
      ) : null}

      <div className="pricing-grid-container premium-pricing-grid">
        {pricingPlans.map((plan) => (
          <InteractiveCard key={plan.name} className={`premium-pricing-card pricing-card--${plan.key}`}>
            {plan.badge ? (
              <div
                className="pricing-badge pricing-badge--gold"
              >
                {plan.badge}
              </div>
            ) : null}

            <div className="premium-pricing-top pricing-card__top">
              <p className="pricing-card__eyebrow">{plan.eyebrow}</p>
              <h3>{plan.name}</h3>
              <div className="premium-pricing-price">
                <strong>{plan.price}</strong>
                <span className="price-term">{plan.term}</span>
              </div>
            </div>

            <p className="pricing-card__summary">{plan.summary}</p>

            <div className="pricing-card__bestfor">
              <span>向いている人</span>
              <strong>{plan.bestFor}</strong>
            </div>

            <div className="premium-pricing-features" aria-label={`${plan.name}プランの搭載機能`}>
              {plan.features.map((feature) => (
                <div
                  key={feature.label}
                  className={`premium-pricing-feature-row${feature.active ? ' active' : ' inactive'}${plan.key === 'free' ? ' free' : ''}`}
                >
                  <span className="check-icon">{feature.active ? '✓' : ''}</span>
                  {feature.emphasis ? <strong>{feature.label}</strong> : <span>{feature.label}</span>}
                </div>
              ))}
            </div>

            <div className="pricing-card__note">
              <span>おすすめの使い方</span>
              <p>{plan.note}</p>
            </div>
          </InteractiveCard>
        ))}
      </div>

      <div className="pricing-comparison-board pricing-layer">
        <div className="pricing-comparison-board__head">
          <h3>プラン差分を一目で把握</h3>
          <p>
            公開配布で確認できる範囲と、Premiumで確定待ちの条件を分けて整理しています。
          </p>
          <span className="pricing-comparison-board__hint">モバイルでも各値に配布確認 / Premiumラベルを表示します。</span>
        </div>

        <div className="pricing-comparison-table-scroll">
          <div className="pricing-comparison-table" role="table" aria-label="プラン比較表">
            <div className="pricing-comparison-table__row pricing-comparison-table__row--head" role="row">
              <span role="columnheader">比較項目</span>
              {pricingPlans.map((plan) => (
                <span key={plan.name} role="columnheader">{plan.name}</span>
              ))}
            </div>

            {comparisonRows.map((row) => (
              <div key={row.label} className="pricing-comparison-table__row" role="row">
                <span role="rowheader">{row.label}</span>
                {row.values.map((value, index) => (
                  <span key={`${row.label}-${pricingPlans[index].name}`} role="cell">
                    <em className="pricing-comparison-table__mobile-label">{pricingPlans[index].name}</em>
                    {value}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="trust-badge-bar pricing-layer">
        <div className="trust-badge-bar__item">
          <ShieldCheck size={20} color="#4CAF50" />
          <span>SSL暗号化通信</span>
        </div>
        <div className="trust-badge-bar__item">
          <CheckCircle2 size={20} color="#4CAF50" />
          <span>配布条件を確認中</span>
        </div>
        <div className="trust-badge-bar__item">
          <Clock size={20} color="#e0c184" />
          <span>{legal.support.firstResponseSla}</span>
        </div>
        <div className="trust-badge-bar__item">
          <CreditCard size={20} color="#e0c184" />
          <span>{productFacts.paymentMethod.value}</span>
        </div>
      </div>
    </>
  )
}
