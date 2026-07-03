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
  key: 'premium' | 'corporate'
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
    key: 'corporate',
    name: '法人プラン',
    eyebrow: '法人・チーム向け / 買い切り',
    price: '¥220,000',
    term: '買い切り / 税込',
    bestFor: '法人利用やチーム導入の契約条件を大きく確認したい',
    summary: '法人プランは220,000円（税込）の買い切りです。PC台数、権限管理、更新・保守範囲、請求書対応などは購入前に確認します。',
    note: '業務利用はこの法人プランを基準に、導入相談で条件を確認',
    badge: '法人向け',
    features: [
      { label: '法人・チーム利用の契約条件', active: true, emphasis: true },
      { label: '220,000円（税込）の買い切り', active: true, emphasis: true },
      { label: 'PC台数・再認証条件を導入前に確認', active: true, emphasis: true },
      { label: '更新・保守範囲を導入前に確認', active: true, emphasis: true },
      { label: '請求書・領収書まわりを確認', active: true },
      { label: '導入前に権利範囲を確認', active: true },
    ],
  },
  {
    key: 'premium',
    name: 'Premium',
    eyebrow: '個人向け / 買い切り',
    price: '¥39,800',
    term: '買い切り / 税込',
    bestFor: '個人利用で台本取得、AI台本、編集ボード、YMM4連携を継続したい',
    summary: '個人向けPremiumは39,800円（税込）、月額なしの買い切りです。購入前にPC台数、再認証、更新範囲、返金条件を確認してください。',
    note: '個人制作はPremiumを基準に、必要な機能と契約条件を確認',
    badge: '買い切り',
    features: [
      { label: '台本取得とAI台本案の継続利用', active: true },
      { label: 'CSV/.ymmpとフォーマット管理', active: true, emphasis: true },
      { label: '編集ボードとYMM4連携', active: true, emphasis: true },
      { label: 'PC台数・再認証条件を購入前に確認', active: true, emphasis: true },
      { label: '更新範囲を購入前に確認', active: true, emphasis: true },
      { label: 'Googleアカウントへの権限保持', active: true, emphasis: true },
      { label: '購入者向けサポート', active: true, emphasis: true },
    ],
  },
] as const

const comparisonRows = [
  {
    label: '価格',
    values: ['220,000円（税込）', '39,800円（税込）'],
  },
  {
    label: '主な強み',
    values: ['法人・チーム利用の契約条件を確認', '買い切りでPremium権限を保持'],
  },
  {
    label: 'CSV/.ymmp管理',
    values: ['業務利用の制作フローで確認', '継続投稿の制作ルールに利用'],
  },
  {
    label: 'AI補助 / AI台本',
    values: ['法人利用条件として確認', '個人制作の下書き補助として利用'],
  },
  {
    label: '向いている規模感',
    values: ['法人・チーム導入', '個人の継続利用'],
  },
  {
    label: 'サポート密度',
    values: ['導入相談で確認', '購入者向けサポート'],
  },
] as const

export function PricingCards() {
  const purchaseReady = productFacts.purchaseReady.value

  return (
    <>
      {!purchaseReady ? (
        <div className="pricing-gate-notice pricing-layer" role="note">
          <strong>購入前に契約条件を確認してください</strong>
          <p>
            法人プランは220,000円（税込）、個人向けPremiumは39,800円（税込）の買い切りです。
            PC台数、再認証、更新範囲、請求書対応、返金条件を確認してから手続きを進めてください。
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
                  className={`premium-pricing-feature-row${feature.active ? ' active' : ' inactive'}`}
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
          <h3>法人と個人向けPremiumの違い</h3>
          <p>
            価格、向いている利用規模、確認すべき契約条件を分けて整理しています。
          </p>
          <span className="pricing-comparison-board__hint">モバイルでも各値に法人プラン / Premiumラベルを表示します。</span>
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
          <span>購入前条件を確認</span>
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
