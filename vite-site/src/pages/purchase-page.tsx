import { Link } from 'react-router-dom'
import { InteractiveCard, PageMeta, Section } from '@/components/ui'
import { PricingCards } from '@/components/PricingCards'
import { legal } from '@/data/site-content'
import { LegalLinksBlock } from '@/pages/shared'

const planNarratives = [
  {
    name: 'Free',
    price: '¥0',
    term: 'ずっと無料',
    title: 'まずは導入相性を確認する',
    body: '対応サイト取得、基本編集、テンプレ運用の入口、YMM4前準備までを無料で確認できます。',
    points: ['初回導入の確認', '台本取得と整形の相性を見る', 'YMM4前準備まで試す'],
    cta: { label: '無料で始める', href: '/download/' },
  },
  {
    name: 'Standard',
    price: '¥5,000',
    term: '月額 / 税込 5,500円',
    title: '継続投稿の主力ライン',
    body: 'テンプレート運用、AI補助、YouTube分析までを日常運用へ載せ、毎週の制作本数を安定させたい人向けです。',
    points: ['テンプレート運用', 'AI補助と分析を日常化', '個人の継続投稿を安定化'],
    cta: { label: 'プラン比較へ進む', href: '#pricing-cards' },
  },
  {
    name: 'Pro',
    price: '¥10,000',
    term: '月額 / 税込 11,000円',
    title: '個別テンプレートと相談込み',
    body: '複数フォーマット運用、個別テンプレート作成、相談や機能提案まで含めて深く使い込む方向けです。',
    points: ['個別テンプレート作成', '動画運用の相談', 'より深い内製化へ寄せる'],
    cta: { label: '導入相談をする', href: '/contact/' },
  },
] as const

const pricingFlow = [
  {
    eyebrow: 'STEP 01',
    title: 'Free で導入相性を確認',
    body: 'ダウンロードと使い方を見ながら、実際に相性と導線を確認します。',
  },
  {
    eyebrow: 'STEP 02',
    title: 'Standard で継続運用へ',
    body: 'テンプレート運用やAI補助を日常運用に乗せ、投稿本数の安定化を狙います。',
  },
  {
    eyebrow: 'STEP 03',
    title: 'Pro で個別最適化',
    body: '独自テンプレートや相談込みで、チームや複数フォーマットの運用へ広げます。',
  },
] as const

export function PurchasePage() {
  const legalContactNote = `販売事業者: ${legal.organization.sellerName} / 連絡先: ${legal.organization.email}`

  return (
    <>
      <PageMeta
        title="料金プラン"
        description="Free、Standard、Pro の3つのプランを、初回導入、継続投稿、個別テンプレート運用の違いで比較できる料金ページです。"
        keywords="料金, プラン, サブスクリプション, 無料プラン, Standard, Pro, テンプレート運用"
        path="/purchase/"
      />

      <main className="brand-shell">
        <section className="pricing-command-hero">
          <div className="pricing-command-hero__shell">
            <div className="pricing-command-hero__copy">
              <p className="brand-kicker">PRICING</p>
              <h1>最初の判断を、料金表の上で終わらせる</h1>
              <p className="brand-lead">
                このページでは、価格だけでなく「どの制作規模にどのプランが合うか」を一画面目から判断しやすい形に整理しています。
              </p>

              <div className="pricing-command-hero__chips" role="list" aria-label="料金ページの前提">
                <span role="listitem">月額サブスク</span>
                <span role="listitem">Free から導入相性を確認</span>
                <span role="listitem">アプリ内で契約管理</span>
                <span role="listitem">{legal.support.firstResponseSla}</span>
              </div>

              <div className="brand-inline-actions pricing-command-hero__actions">
                <a className="brand-btn brand-btn--primary" href="#pricing-cards">
                  プラン比較を見る
                </a>
                <Link className="brand-btn brand-btn--ghost" to="/download/">
                  無料で始める
                </Link>
              </div>
            </div>

            <div className="pricing-snapshot-grid">
              {planNarratives.map((plan) => (
                <InteractiveCard key={plan.name} className="release-panel premium-glass pricing-snapshot-card">
                  <div className="pricing-snapshot-card__top">
                    <span className="subpage-card__eyebrow">{plan.name}</span>
                    <strong>{plan.price}</strong>
                    <span>{plan.term}</span>
                  </div>
                  <h2>{plan.title}</h2>
                  <p>{plan.body}</p>
                  <ul className="brand-list pricing-snapshot-card__list">
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
          </div>
        </section>

        <Section id="pricing-cards">
          <PricingCards />
        </Section>

        <Section alt>
          <div className="subpage-section-head">
            <p>PLAN MAP</p>
            <h2>使い方の段階ごとに、どこから上げるかを決める</h2>
          </div>

          <div className="pricing-plan-map">
            {planNarratives.map((plan) => (
              <InteractiveCard key={plan.title} className="release-panel premium-glass pricing-plan-card">
                <span className="subpage-card__eyebrow">{plan.name}</span>
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

        <Section alt>
          <div className="pricing-trust-grid">
            <InteractiveCard className="release-panel premium-glass pricing-trust-card pricing-trust-card--wide">
              <span className="subpage-card__eyebrow">CONTRACT</span>
              <h2>契約判断に必要な前提</h2>
              <dl className="purchase-summary">
                <div>
                  <dt>契約モデル</dt>
                  <dd>{legal.pricing.modelLabel}</dd>
                </div>
                <div>
                  <dt>支払い方法</dt>
                  <dd>
                    {legal.payment.methods.join(', ')}
                    <br />
                    {legal.payment.timing}
                  </dd>
                </div>
                <div>
                  <dt>支払い期限</dt>
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
              <h2>問い合わせ先とサポート体制</h2>
              <ul className="brand-list pricing-plan-card__list">
                <li>販売事業者: {legal.organization.sellerName}</li>
                <li>
                  連絡先: <a href={`mailto:${legal.organization.email}`}>{legal.organization.email}</a>
                </li>
                <li>電話: {legal.organization.phone}</li>
                <li>受付時間: {legal.support.operationHours}</li>
                <li>一次返信: {legal.support.firstResponseSla}</li>
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
                  Free から確認する
                </Link>
                <Link className="brand-btn brand-btn--primary" to="/contact/">
                  導入相談をする
                </Link>
              </div>
            </InteractiveCard>
          </div>
        </Section>
      </main>
    </>
  )
}
