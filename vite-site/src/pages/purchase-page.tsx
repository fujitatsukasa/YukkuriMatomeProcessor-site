import { Link } from 'react-router-dom'
import { InteractiveCard, PageIntro, PageMeta, Section } from '@/components/ui'
import { PricingCards } from '@/components/PricingCards'
import { legal } from '@/data/site-content'
import { media } from '@/data/assets'
import { LegalLinksBlock, MetricStrip } from '@/pages/shared'

const pricingMetrics = [
  { value: '3PLANS', label: '導入確認から伴走まで', detail: 'Free / Standard / Pro を運用規模で選択' },
  { value: '¥0〜', label: '最初は無料で確認', detail: 'まずは導入相性と基本導線をチェック' },
  { value: '2営業日', label: '一次回答の目安', detail: '契約・請求・運用相談の窓口を明示' },
] as const

const planNarratives = [
  {
    eyebrow: 'FREE',
    title: 'まずは入口の相性を確認する',
    body: '対応サイト取得、基本編集、テンプレ運用の入口、YMM4前準備までを無料で確認できます。',
    points: ['導入前の前提確認', '操作導線の把握', '自分の制作フローと合うかを見る'],
    cta: { label: '無料で始める', href: '/download/' },
  },
  {
    eyebrow: 'STANDARD',
    title: '継続投稿を安定させる',
    body: '個人クリエイターがテンプレート運用を回し、毎週の投稿本数を増やしたいときの主力プランです。',
    points: ['日常運用の自動化を強める', 'AI補助を日々の作業へ組み込む', '継続投稿の再現性を上げる'],
    cta: { label: 'プランを見る', href: '#pricing-cards' },
  },
  {
    eyebrow: 'PRO',
    title: '個別テンプレと相談込みで詰める',
    body: '複数フォーマット運用、個別テンプレート作成、相談や機能提案まで含めて深く使い込む方向けです。',
    points: ['独自フォーマット動画へ展開', '個別テンプレートの作成相談', '継続運用を前提にした伴走'],
    cta: { label: '導入相談を送る', href: '/contact/' },
  },
] as const

const pricingFlow = [
  {
    eyebrow: 'STEP 01',
    title: 'Freeで導入判断',
    body: 'ダウンロードと使い方を見ながら、実際に相性と導線を確認します。',
  },
  {
    eyebrow: 'STEP 02',
    title: 'Standardで継続投稿へ',
    body: 'テンプレート運用やAI補助を日常運用に乗せ、投稿本数の安定化を狙います。',
  },
  {
    eyebrow: 'STEP 03',
    title: 'Proで独自運用を強化',
    body: '複数ジャンルや独自フォーマットへ横展開し、相談や提案も含めて詰めます。',
  },
] as const

export function PurchasePage() {
  const legalContactNote = `販売事業者: ${legal.organization.sellerName} / 連絡先: ${legal.organization.email}`

  return (
    <>
      <PageMeta
        title="料金プラン"
        description="Free、Standard（月額5,000円）、Pro（月額10,000円）の3つのプランを、導入確認・継続投稿・個別運用の観点で整理しています。"
        keywords="料金, プラン, サブスクリプション, 無料プラン, Standard, Pro, テンプレート運用"
        image={media.officeLuxury}
        path="/purchase/"
      />

      <main className="brand-shell">
        <PageIntro
          kicker="Pricing"
          title="あなたの制作スタイルに合わせた料金プラン"
          lead="初回導入の確認から、継続投稿、個別テンプレートや運用相談まで、規模に合わせて選べます"
          actions={[
            { label: '無料で始める', href: '/download/', variant: 'primary' },
            { label: 'お問い合わせ', href: '/contact/', variant: 'ghost' },
          ]}
          flowLinks={[
            { label: '機能と使い方', href: '/instructions/' },
            { label: 'FAQ', href: '/faq/' },
          ]}
          media={
            <InteractiveCard className="page-visual-card premium-glass pricing-hero-visual">
              <img
                className="page-visual-card__image"
                src="/generated/pricing-plan-visual-v1.png"
                alt="料金プランの選び方と運用規模を示すビジュアル"
              />
              <div className="page-visual-card__meta">
                <strong>選ぶ基準は価格より、どこまで運用を標準化したいか</strong>
                <span>Freeで入口、Standardで継続投稿、Proで個別テンプレと相談込みの運用に寄せています。</span>
              </div>
            </InteractiveCard>
          }
        />

        <Section>
          <MetricStrip items={[...pricingMetrics]} ariaLabel="料金ページの要点" />
        </Section>

        <Section alt>
          <div className="subpage-section-head">
            <p>PLAN MAP</p>
            <h2>価格の一覧ではなく、どの運用段階にどのプランが合うかで判断する</h2>
          </div>

          <div className="pricing-plan-map">
            {planNarratives.map((plan) => (
              <InteractiveCard key={plan.title} className="release-panel premium-glass pricing-plan-card">
                <span className="subpage-card__eyebrow">{plan.eyebrow}</span>
                <h2>{plan.title}</h2>
                <p>{plan.body}</p>
                <ul className="brand-list pricing-plan-card__list">
                  {plan.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                {plan.cta.href.startsWith('#') ? (
                  <a className="pricing-plan-card__link" href={plan.cta.href}>
                    <span>{plan.cta.label}</span>
                  </a>
                ) : (
                  <Link className="pricing-plan-card__link" to={plan.cta.href}>
                    <span>{plan.cta.label}</span>
                  </Link>
                )}
              </InteractiveCard>
            ))}
          </div>
        </Section>

        <Section id="pricing-cards">
          <PricingCards />
        </Section>

        <Section alt>
          <div className="pricing-trust-grid">
            <InteractiveCard className="release-panel premium-glass pricing-trust-card pricing-trust-card--wide">
              <span className="subpage-card__eyebrow">CONTRACT</span>
              <h2>契約に関する重要事項</h2>
              <dl className="purchase-summary">
                <div>
                  <dt>販売モデル</dt>
                  <dd>{legal.pricing.modelLabel}</dd>
                </div>
                <div>
                  <dt>支払方法</dt>
                  <dd>
                    {legal.payment.methods.join(', ')}
                    <br />
                    {legal.payment.timing}
                  </dd>
                </div>
                <div>
                  <dt>支払期限</dt>
                  <dd>{legal.payment.deadlineRules.map((item) => `${item.method}: ${item.limit}`).join(' / ')}</dd>
                </div>
                <div>
                  <dt>未払い時</dt>
                  <dd>{legal.payment.unpaidPolicy}</dd>
                </div>
                <div>
                  <dt>提供時期</dt>
                  <dd>{legal.delivery.timing}</dd>
                </div>
                <div>
                  <dt>解約</dt>
                  <dd>{legal.cancellation.subscription}</dd>
                </div>
                <div>
                  <dt>返金</dt>
                  <dd>{legal.refund.summary}</dd>
                </div>
              </dl>
              <p className="pricing-trust-card__note">
                プラン変更は、アップグレードが即時反映 + 日割り差額請求、ダウングレードが次回更新日から反映の方針です。
              </p>
              <LegalLinksBlock note={legalContactNote} />
            </InteractiveCard>

            <InteractiveCard className="release-panel premium-glass pricing-trust-card">
              <span className="subpage-card__eyebrow">SUPPORT</span>
              <h2>問い合わせとサポートの前提</h2>
              <ul className="brand-list pricing-plan-card__list">
                <li>販売事業者: {legal.organization.sellerName}</li>
                <li>
                  連絡先: <a href={`mailto:${legal.organization.email}`}>{legal.organization.email}</a>
                </li>
                <li>電話: {legal.organization.phone}</li>
                <li>受付時間: {legal.support.operationHours}</li>
                <li>一次回答: {legal.support.firstResponseSla}</li>
              </ul>
              <p className="pricing-trust-card__note">購入、アップグレード、支払い方法更新はアプリ内の導線から利用できます。</p>
            </InteractiveCard>

            <InteractiveCard className="release-panel premium-glass pricing-trust-card">
              <span className="subpage-card__eyebrow">DECISION FLOW</span>
              <h2>迷ったときの選び方</h2>
              <div className="pricing-flow-list">
                {pricingFlow.map((step) => (
                  <div key={step.title} className="pricing-flow-step">
                    <strong>{step.eyebrow}</strong>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                ))}
              </div>
              <div className="subpage-support-callout__actions">
                <Link className="brand-btn brand-btn--ghost" to="/download/">
                  Freeから確認する
                </Link>
                <Link className="brand-btn brand-btn--primary" to="/contact/">
                  導入相談を送る
                </Link>
              </div>
            </InteractiveCard>
          </div>
        </Section>
      </main>
    </>
  )
}
