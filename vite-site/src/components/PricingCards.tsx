import { InteractiveCard } from '@/components/ui'
import { legal } from '@/data/site-content'
import { ShieldCheck, CheckCircle2, Clock, CreditCard } from 'lucide-react'

type PlanFeature = {
  label: string
  active: boolean
  emphasis?: boolean
}

type PricingPlan = {
  key: 'free' | 'standard' | 'pro'
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
    eyebrow: 'まず試したい人へ',
    price: '¥0',
    term: 'ずっと無料',
    bestFor: '導入前に制作フローとの相性を確かめたい',
    summary: 'YMM4出力や基本編集を無料で確認し、今の運用にハマるかを検証する入口プランです。',
    note: '初回導入や動作確認、無料での試運転に最適',
    badge: null,
    features: [
      { label: '自動動画編集', active: true },
      { label: 'YMM4タイムライン出力', active: true },
      { label: 'ローカル分析', active: true },
      { label: '内蔵操作ガイド', active: true },
      { label: '無償アップデート', active: true },
      { label: '高度な台本取得・AI生成', active: false },
    ],
  },
  {
    key: 'standard',
    name: 'Standard',
    eyebrow: '個人量産の主力',
    price: '¥5,000',
    term: '月額 / 税込 5,500円',
    bestFor: '個人クリエイターが投稿本数を増やしたい',
    summary: 'サイト台本取得・AI生成・要望サポートまで揃えた、個人運用で最も使いどころの広い主力プランです。',
    note: '台本作成を継続的に短縮し、個人量産の再現性を上げやすい',
    badge: '個人クリエイター向け',
    features: [
      { label: 'Freeプランの全機能', active: true },
      { label: '動画フォーマット自由作成', active: true, emphasis: true },
      { label: 'あにまん、5ch等のサイト台本取得 (50回まで)', active: true, emphasis: true },
      { label: 'AI感情分析', active: true, emphasis: true },
      { label: 'AI文章校正', active: true, emphasis: true },
      { label: 'AI台本生成 (20回まで)', active: true, emphasis: true },
      { label: 'youtube分析', active: true, emphasis: true },
      { label: 'ご要望サポート', active: true, emphasis: true },
      { label: '優先専用サポート', active: true, emphasis: true },
    ],
  },
  {
    key: 'pro',
    name: 'Pro',
    eyebrow: '複数運用と内製化向け',
    price: '¥10,000',
    term: '月額 / 税込 11,000円',
    bestFor: '複数チャンネル運用や外注の巻き取りまで進めたい',
    summary: '取得回数・AI生成回数・優先対応を強化し、チーム運用や量産ラインの標準化まで視野に入れた最上位プランです。',
    note: '複数チャンネルや外注内製化で、サポート速度まで重視するなら最適',
    badge: '✦ 圧倒的おすすめ',
    features: [
      { label: 'Standardの全機能', active: true },
      { label: 'サイト台本取得 200回＋', active: true, emphasis: true },
      { label: 'AI台本生成 (60回まで)', active: true, emphasis: true },
      { label: '取得サイト追加希望対応', active: true, emphasis: true },
      { label: '動画フォーマット作成代行', active: true, emphasis: true },
      { label: '最優先サポート', active: true, emphasis: true },
    ],
  },
] as const

const comparisonRows = [
  {
    label: '向いている使い方',
    values: ['まず無料で試したい', '個人で量産したい', '複数運用を標準化したい'],
  },
  {
    label: 'サイト台本取得',
    values: ['基本機能のみ', '50回まで', '200回＋'],
  },
  {
    label: 'AI台本生成',
    values: ['対象外', '20回まで', '60回まで'],
  },
  {
    label: 'サポートの厚み',
    values: ['標準', '優先専用サポート', '最優先サポート'],
  },
  {
    label: 'おすすめの規模感',
    values: ['導入検証', '個人の継続投稿', '複数チャンネル / 法人運用'],
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
                className={`pricing-badge ${plan.key === 'pro' ? 'pricing-badge--platinum' : 'pricing-badge--gold'}`}
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

      <div className="pricing-comparison-board" style={{ position: 'relative', zIndex: 1 }}>
        <div className="pricing-comparison-board__head">
          <h3>プラン差分を一目で把握</h3>
          <p>
            強いSaaS LPがやっているように、価格だけでなく
            「回数・サポート・運用規模」がどこで増えるかを短く整理しています。
          </p>
        </div>

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

      <div className="trust-badge-bar" style={{ position: 'relative', zIndex: 1 }}>
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
