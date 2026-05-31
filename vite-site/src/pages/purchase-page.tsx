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
    name: 'Premium',
    price: '¥39,800',
    term: '買い切り / 税込',
    title: '制限を外して継続投稿へ移る',
    body: 'scriptFetch と scriptGeneration の制限を外し、台本取得・生成を止めずに回したい人向けの一度払いライセンスです。',
    points: ['台本取得の制限解除', '台本生成の制限解除', 'Googleアカウントに権利保持'],
    cta: { label: 'プラン比較へ進む', href: '#pricing-cards' },
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
    title: 'Premium を買い切りで購入',
    body: 'アプリ内の購入画面から Stripe Checkout を開き、一度払いでライセンスを購入します。',
  },
  {
    eyebrow: 'STEP 03',
    title: '権限同期後に制限解除',
    body: '決済完了後、Googleログインに紐づく Premium 権限を同期し、台本取得・生成の制限を外します。',
  },
] as const

const planDecisionGuide = [
  {
    label: 'まず触って判断したい',
    plan: 'Free',
    title: '導入相性を無料で確認',
    body: '対応サイト取得、台本整理、YMM4前準備までの流れが今の制作手順に合うかを先に見ます。',
    cues: ['初回導入', '個人の検証', 'YMM4前準備を試す'],
  },
  {
    label: '週1本以上を安定させたい',
    plan: 'Premium',
    title: '買い切りで制限解除',
    body: '台本取得・生成の制限を外し、継続投稿の前工程を止めずに回せるようにします。',
    cues: ['週1本以上', '反応集・解説の継続投稿', 'scriptFetch / scriptGeneration の本格利用'],
  },
] as const

const purchaseReassuranceItems = [
  {
    label: '支払い',
    title: '国内決済とStripe Checkout',
    body: '購入はアプリ内の導線から Stripe Checkout を開いて行います。標準導線はクレジットカードの一度払いです。',
  },
  {
    label: '更新',
    title: '月額自動更新なし',
    body: 'Premium は買い切りのため、解約予約や毎月の自動更新はありません。返金時は Premium 権限を停止します。',
  },
  {
    label: '商用利用',
    title: '継続投稿の前工程に利用可能',
    body: '利用規約と各素材・音声ライセンスの範囲を守ったうえで、制作フローの前工程に組み込めます。',
  },
  {
    label: 'サポート',
    title: legal.support.firstResponseSla,
    body: `問い合わせ窓口は ${legal.organization.email} です。導入、契約、支払い、運用相談を用途別に確認できます。`,
  },
  {
    label: '返金',
    title: '返金条件を事前に確認',
    body: '返金・キャンセルポリシー、特定商取引法表記、利用規約を購入前に確認できる構成にしています。',
  },
] as const

export function PurchasePage() {
  const legalContactNote = `販売事業者: ${legal.organization.sellerName} / 連絡先: ${legal.organization.email}`

  return (
    <>
      <PageMeta
        title="料金プラン"
        description="Free と Premium 買い切りライセンスの違い、39,800円の一度払い、権限同期、返金条件を確認できる料金ページです。"
        keywords="料金, 買い切り, Premium, 無料プラン, Stripe Checkout, テンプレート運用"
        path="/purchase/"
      />

      <main className="brand-shell">
        <section className="pricing-command-hero">
          <div className="pricing-command-hero__shell">
            <div className="pricing-command-hero__copy">
              <p className="brand-kicker">PRICING</p>
              <h1>最初の判断を、料金表の上で終わらせる</h1>
              <p className="brand-lead">
                このページでは、無料で試す範囲と、39,800円の買い切りで制限解除される範囲を一画面目から判断しやすい形に整理しています。
              </p>

              <div className="pricing-command-hero__chips" role="list" aria-label="料金ページの前提">
                <span role="listitem">買い切り</span>
                <span role="listitem">月額なし</span>
                <span role="listitem">Free から導入相性を確認</span>
                <span role="listitem">Googleアカウントに権利保持</span>
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

        <Section alt className="pricing-reassurance-section">
          <div className="subpage-section-head pricing-reassurance__head">
            <p>BEFORE PURCHASE</p>
            <h2>購入前の不安を、価格表の直後で片付ける</h2>
          </div>

          <div className="pricing-reassurance-grid" aria-label="購入前の確認事項">
            {purchaseReassuranceItems.map((item) => (
              <article key={item.label} className="pricing-reassurance-card">
                <span>{item.label}</span>
                <strong>{item.title}</strong>
                <p>{item.body}</p>
              </article>
            ))}
          </div>

          <div className="pricing-reassurance-links">
            <Link to="/legal/terms/">利用規約</Link>
            <Link to="/legal/refund-policy/">返金・キャンセル</Link>
            <Link to="/legal/commercial-transactions/">特定商取引法表記</Link>
            <Link to="/contact/">問い合わせ</Link>
          </div>
        </Section>

        <Section alt>
          <div className="subpage-section-head pricing-decision-guide__head">
            <p>PLAN DECISION</p>
            <h2>迷うなら、制限解除が必要かで選ぶ</h2>
            <span>
              まず Free で流れを確認し、台本取得・生成の利用量が増えてから Premium へ進む方が失敗しにくくなります。
            </span>
          </div>

          <div className="pricing-decision-guide" aria-label="プラン選択の目安">
            {planDecisionGuide.map((item) => (
              <article key={item.plan} className="pricing-decision-guide__card">
                <span className="pricing-decision-guide__label">{item.label}</span>
                <strong className="pricing-decision-guide__plan">{item.plan}</strong>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <ul>
                  {item.cues.map((cue) => (
                    <li key={cue}>{cue}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Section>

        <Section alt>
          <div className="subpage-section-head">
            <p>PLAN MAP</p>
            <h2>Free で確認し、Premium で制限を外す</h2>
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
                Premium は買い切りのため、日割り差額請求やダウングレード予約はありません。
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
              <p className="pricing-trust-card__note">購入とライセンス確認はアプリ内の導線から利用できます。</p>
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
