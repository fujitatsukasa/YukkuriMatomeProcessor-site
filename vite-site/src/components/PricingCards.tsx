import { InteractiveCard } from '@/components/ui'
import { legal } from '@/data/site-content'
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
    name: 'Free',
    eyebrow: '初回導入の入口',
    price: '¥0',
    term: 'ずっと無料',
    bestFor: 'まず動作確認をして、自分の制作フローにハマるかを見たい',
    summary: '対応サイト取得、基本編集、YMM4出力の流れを見て、導入相性を確かめるための入口プランです。',
    note: '初回導入や動作確認、無料での試運転に最適',
    badge: null,
    features: [
      { label: '対応サイトからの台本取得を試用', active: true },
      { label: '基本編集とYMM4出力の確認', active: true },
      { label: 'デフォルトプリセットで編集開始', active: true },
      { label: '内蔵操作ガイド', active: true },
      { label: '導入前の動作検証', active: true },
      { label: '台本取得・生成の制限解除', active: false },
    ],
  },
  {
    key: 'premium',
    name: 'Premium',
    eyebrow: '買い切りで制限解除',
    price: '¥39,800',
    term: '買い切り / 税込',
    bestFor: '台本取得と台本生成の制限を外して、継続投稿の前工程を止めずに回したい',
    summary: '一度払いで Premium 権限を付与し、scriptFetch と scriptGeneration の制限を外す買い切りライセンスです。',
    note: 'Googleログインに紐づく権限同期で、購入後は月額なしで Premium 機能を利用',
    badge: '買い切り',
    features: [
      { label: 'Freeプランの全機能', active: true },
      { label: 'テンプレート / フォーマット運用', active: true, emphasis: true },
      { label: 'scriptFetch の利用制限解除', active: true, emphasis: true },
      { label: 'scriptGeneration の利用制限解除', active: true, emphasis: true },
      { label: '13キャラ対応のAI台本作成', active: true, emphasis: true },
      { label: 'YouTube分析と候補比較', active: true, emphasis: true },
      { label: 'Googleアカウントへの権限保持', active: true, emphasis: true },
      { label: '購入者向けサポート', active: true, emphasis: true },
    ],
  },
] as const

const comparisonRows = [
  {
    label: '導入フェーズ',
    values: ['まず動作確認', '継続投稿の制限解除'],
  },
  {
    label: '主な強み',
    values: ['導入相性の確認', '買い切りで Premium 権限を保持'],
  },
  {
    label: 'テンプレート運用',
    values: ['入口の確認', '継続投稿で本格利用'],
  },
  {
    label: 'AI補助 / AI台本',
    values: ['基本確認中心', '13キャラ台本と生成枠を本格利用'],
  },
  {
    label: '向いている規模感',
    values: ['導入検証', '個人・チームの継続投稿'],
  },
  {
    label: 'サポート密度',
    values: ['基本案内', '購入者向けサポート'],
  },
] as const

export function PricingCards() {
  return (
    <>
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
              <span>おすすめ運用</span>
              <p>{plan.note}</p>
            </div>
          </InteractiveCard>
        ))}
      </div>

      <div className="pricing-comparison-board pricing-layer">
        <div className="pricing-comparison-board__head">
          <h3>プラン差分を一目で把握</h3>
          <p>
            価格だけでなく、導入確認から買い切りの制限解除へどこで強くなるかを
            短く整理して、比較の観点を揃えています。
          </p>
          <span className="pricing-comparison-board__hint">モバイルでは横スクロールで比較できます。</span>
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
                  <span key={`${row.label}-${pricingPlans[index].name}`} role="cell">{value}</span>
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
          <span>無料プランあり</span>
        </div>
        <div className="trust-badge-bar__item">
          <Clock size={20} color="#e0c184" />
          <span>{legal.support.firstResponseSla}</span>
        </div>
        <div className="trust-badge-bar__item">
          <CreditCard size={20} color="#e0c184" />
          <span>安心の国内決済</span>
        </div>
      </div>
    </>
  )
}
