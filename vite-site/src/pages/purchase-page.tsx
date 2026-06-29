import { Link } from 'react-router-dom'
import { InteractiveCard, PageMeta, Section } from '@/components/ui'
import { PricingCards } from '@/components/PricingCards'
import { legal } from '@/data/site-content'
import { productFacts } from '@/data/product-facts'
import { LegalLinksBlock } from '@/pages/shared'
import { Bot, CheckCircle2, CreditCard, FileSearch, RotateCcw, ShieldCheck } from 'lucide-react'

const planNarratives = [
  {
    name: '配布確認',
    price: '確認中',
    term: '直接取得CTAは未表示',
    title: '無料版とは案内しない',
    body: '無料版として案内できる公開版は用意していません。配布可否と利用条件が確定するまで断定しません。',
    points: ['配布可否を確認', '試用可否を確認', '直接取得CTAは未表示'],
    cta: { label: '配布条件を確認', href: '/download/' },
  },
  {
    name: 'Premium',
    price: '¥39,800',
    term: '買い切り / 税込',
    title: '公開条件を確認してから判断する',
    body: '月額なしの買い切り価格は確認済みです。利用枠、PC台数、更新範囲は公開条件の確定後に案内します。',
    points: ['39,800円税込', '月額なし', 'Googleアカウントに権限を同期'],
    cta: { label: '確認中の条件を見る', href: '#pricing-cards' },
  },
] as const

const pricingFlow = [
  {
    eyebrow: '手順1',
    title: '配布条件と公開状況を確認する',
    body: 'ダウンロードページで、配布候補、署名、SmartScreen、直接取得CTAの有無を確認します。',
  },
  {
    eyebrow: '手順2',
    title: 'Premium を買い切りで購入',
    body: 'アプリ内の購入画面から Stripe Checkout を開き、一度払いでライセンスを購入します。',
  },
  {
    eyebrow: '手順3',
    title: '権限同期後に条件を確認',
    body: '決済完了後、Googleログインに紐づく Premium 権限を同期します。公開前の上限値やPC台数は確定後に案内します。',
  },
] as const

const purchaseGoalCards = [
  {
    label: '購入前',
    plan: '配布条件を確認',
    title: '公開配布と試用可否を確認する',
    body: '無料版としては案内しません。配布可否、試用可否、利用範囲を確定情報として確認します。',
    checks: ['直接取得CTAの有無を確認', '配布候補の状態を確認', '公開済み条件だけで判断'],
  },
  {
    label: '購入時',
    plan: 'Stripe Checkout',
    title: 'アプリ内の購入導線から一度払いする',
    body: 'Premiumはサイト単体ではなく、アプリ内の購入画面からStripe Checkoutを開いて購入します。',
    checks: ['39,800円税込', '月額なし', '購入後7日以内の返金条件を確認'],
  },
  {
    label: '購入後',
    plan: 'Premium同期',
    title: 'Googleアカウントで権限を確認する',
    body: '決済後はGoogleログインに紐づくPremium権限を同期します。利用条件は公開済みの範囲だけを確認します。',
    checks: ['権限同期を確認', '公開済み条件を確認', '少数URLで再確認'],
  },
] as const

const premiumUnlocks = [
  {
    label: '台本取得',
    title: '対応URLからの台本取得条件を確認中',
    body: '公開配布とPremiumの具体的な取得条件は、公開UI・料金・法務の一致確認後に案内します。',
    Icon: FileSearch,
  },
  {
    label: 'AI台本',
    title: 'AI台本案の利用条件を確認中',
    body: 'AI台本案は任意の下書き補助です。具体的な利用条件は確定後に表示します。',
    Icon: Bot,
  },
  {
    label: '権限',
    title: 'GoogleアカウントにPremium権限を保持',
    body: '購入後はGoogleログインに紐づく権限同期で、アプリ内のPremium機能を有効化します。',
    Icon: ShieldCheck,
  },
] as const

const premiumCompletionGoals = [
  {
    title: '台本取得の公開条件を確認する',
    body: '対応URLの取得条件、上限、公正利用を確定値として確認できる状態にします。',
  },
  {
    title: 'AI台本案の公開条件を確認する',
    body: '外部AI連携の有無、利用条件、確認責任を公開前に揃えます。',
  },
  {
    title: '条件確定後も少数URLで確認する',
    body: '購入直後にいきなり件数を増やさず、少数URLで取得、編集、出力まで再確認します。',
  },
] as const

const purchaseDecisionMatrix = [
  {
    label: 'まだ購入しない',
    title: '公開条件を確認している段階',
    body: '配布可否、試用可否、利用範囲が未確定なら、Premium購入判断に進まないでください。',
    checks: ['対応URL条件を確認中', '試用可否を確認中', 'YMM4前準備の範囲を確認中'],
    href: '/instructions/',
    cta: '使い方で確認を続ける',
    Icon: CheckCircle2,
  },
  {
    label: 'Premium検討',
    title: '公開済み条件で納得できた段階',
    body: '台本取得やAI台本案の利用量が増え、公開済み条件で納得できると分かったら検討します。',
    checks: ['取得条件を確認したい', 'AI台本案の条件を確認したい', 'Googleアカウントで権限を保持したい'],
    href: '#pricing-cards',
    cta: 'プラン比較を見る',
    Icon: ShieldCheck,
  },
  {
    label: '購入前に確認',
    title: '返金条件と注意点を先に読む',
    body: '39,800円の買い切りなので、購入前に返金条件、動作環境、Premiumで保証しない範囲を確認します。',
    checks: ['購入後7日以内を原則受付', '動画完成や収益化は保証外', '素材利用条件は自分で確認'],
    href: '/legal/refund-policy/',
    cta: '返金条件を見る',
    Icon: RotateCcw,
  },
] as const

const purchaseFactCards = [
  {
    label: '価格',
    title: '39,800円 / 税込',
    body: 'Premiumは買い切りです。月額自動更新や毎月の解約予約はありません。',
    Icon: CheckCircle2,
  },
  {
    label: '支払い',
    title: 'Stripe Checkout',
    body: '購入はアプリ内の導線からStripe Checkoutを開き、クレジットカード一度払いで行います。',
    Icon: CreditCard,
  },
  {
    label: '返金',
    title: '購入後7日以内を原則受付',
    body: '返金成立時はPremium権限を停止します。詳細は返金・キャンセルポリシーで確認できます。',
    Icon: RotateCcw,
  },
] as const

const purchaseCautions = [
  '動画完成を自動保証するものではありません',
  'YouTube収益化や再生数を保証するものではありません',
  '素材、音声、引用元の利用条件は投稿前に確認してください',
] as const

export function PurchasePage() {
  const legalContactNote = `販売事業者: ${legal.organization.sellerName} / 連絡先: ${legal.organization.email}`

  return (
    <>
      <PageMeta
        title="料金プラン｜Premium条件と配布状況を確認"
        description="Premium買い切り39,800円の前提、YMM4前準備、Googleアカウント権限同期、返金条件、未確定の利用条件を購入前に確認できます。"
        keywords="料金, 買い切り, Premium, Stripe Checkout, 台本取得, AI台本生成"
        path="/purchase/"
      />

      <main className="brand-shell">
        <section className="pricing-command-hero">
          <div className="pricing-command-hero__shell">
            <div className="pricing-command-hero__copy">
              <p className="brand-kicker">料金プラン</p>
              <h1>料金プラン｜Premium条件と配布状況を確認</h1>
              <p className="brand-lead">
                39,800円の買い切りで確定済みの前提と、購入前に残っている確認条件を分けて確認できます。
              </p>

              <div className="pricing-command-hero__chips" role="list" aria-label="料金ページの前提">
                <span role="listitem">買い切り</span>
                <span role="listitem">月額なし</span>
                <span role="listitem">無料版は未用意</span>
                <span role="listitem">Googleアカウントに権限を保持</span>
                <span role="listitem">{legal.support.firstResponseSla}</span>
              </div>

              {!productFacts.purchaseReady.value ? (
                <div className="pricing-command-hero__notice" role="status">
                  Premiumの利用枠、PC台数、再認証、更新範囲は公開条件の確定待ちです。
                  確定するまで購入実行CTAは表示しません。
                </div>
              ) : null}

              <div className="brand-inline-actions pricing-command-hero__actions">
                <a className="brand-btn brand-btn--primary" href="#pricing-cards">
                  プラン比較を見る
                </a>
                <Link className="brand-btn brand-btn--ghost" to="/download/">
                  配布条件を確認
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

        <Section>
          <div className="pricing-decision-matrix">
            <div className="subpage-section-head pricing-decision-matrix__head">
              <p>購入判断チェック</p>
              <h2>まだ購入しない段階か、Premiumを検討する段階かを分ける</h2>
              <span>
                先に配布可否と公開条件を確認し、制作量と条件が合う場合だけPremiumを検討します。
              </span>
            </div>

            <div className="pricing-decision-matrix__grid" aria-label="購入前確認とPremiumの購入判断">
              {purchaseDecisionMatrix.map((item) => {
                const DecisionIcon = item.Icon
                return (
                  <InteractiveCard key={item.label} className="pricing-decision-matrix__card premium-glass">
                    <div className="pricing-decision-matrix__icon">
                      <DecisionIcon size={18} />
                    </div>
                    <span className="pricing-decision-matrix__label">{item.label}</span>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                    <ul>
                      {item.checks.map((check) => (
                        <li key={check}>{check}</li>
                      ))}
                    </ul>
                    {item.href.startsWith('#') ? (
                      <a className="pricing-decision-matrix__link" href={item.href}>
                        {item.cta}
                      </a>
                    ) : (
                      <Link className="pricing-decision-matrix__link" to={item.href}>
                        {item.cta}
                      </Link>
                    )}
                  </InteractiveCard>
                )
              })}
            </div>
          </div>
        </Section>

        <Section className="pricing-reassurance-section">
          <div className="subpage-section-head pricing-decision-guide__head">
            <p>購入前後の到達目標</p>
              <h2>配布条件、Premium条件、購入後の確認順を分ける</h2>
            <span>
              料金だけで判断せず、購入前、購入時、購入後の確認を分けます。
              ここまで揃ってから件数を増やしてください。
            </span>
          </div>

          <div className="pricing-decision-guide" aria-label="購入前後の到達目標">
            {purchaseGoalCards.map((card) => (
              <InteractiveCard key={card.label} className="pricing-decision-guide__card">
                <span className="pricing-decision-guide__label">{card.label}</span>
                <strong className="pricing-decision-guide__plan">{card.plan}</strong>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
                <ul>
                  {card.checks.map((check) => (
                    <li key={check}>{check}</li>
                  ))}
                </ul>
              </InteractiveCard>
            ))}
          </div>
        </Section>

        <Section alt className="pricing-clarity-section">
          <div className="pricing-clarity-board">
            <div className="pricing-clarity-board__head">
              <p>購入前の判断材料</p>
              <h2>Premiumの確認中条件、支払い条件、注意点を一画面で確認</h2>
              <span>迷う場合は、無料版がある前提にせず、公開済みの条件だけでPremiumを判断してください。</span>
            </div>

            <div className="pricing-unlock-grid" aria-label="Premiumの確認中条件">
              {premiumUnlocks.map((item) => {
                const ItemIcon = item.Icon
                return (
                  <article key={item.title} className="pricing-unlock-card">
                    <span>
                      <ItemIcon size={17} />
                      {item.label}
                    </span>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </article>
                )
              })}
            </div>

            <div className="pricing-clarity-board__head pricing-clarity-board__head--compact">
              <p>条件確定後の完了判定</p>
              <h2>Premium後に「できた」と言える状態</h2>
              <span>購入後も、まず少数URLで台本取得、台本編集、出力確認までを通します。</span>
            </div>

            <div className="pricing-unlock-goal-grid" aria-label="Premium後の完了判定">
              {premiumCompletionGoals.map((item) => (
                <article key={item.title} className="pricing-unlock-goal-card">
                  <CheckCircle2 size={17} />
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.body}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="pricing-fact-row" aria-label="支払いと返金の要点">
              {purchaseFactCards.map((item) => {
                const ItemIcon = item.Icon
                return (
                  <article key={item.title} className="pricing-fact-card">
                    <span>
                      <ItemIcon size={17} />
                      {item.label}
                    </span>
                    <strong>{item.title}</strong>
                    <p>{item.body}</p>
                  </article>
                )
              })}
            </div>

            <aside className="pricing-caution-panel" aria-label="購入前の注意点">
              <div>
                <span className="subpage-card__eyebrow">注意点</span>
                <h3>Premiumは制作前工程の買い切り権限です</h3>
              </div>
              <ul>
                {purchaseCautions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </aside>
          </div>

          <div className="pricing-reassurance-links pricing-clarity-links">
            <Link to="/legal/terms/">利用規約</Link>
            <Link to="/legal/refund-policy/">返金・キャンセル</Link>
            <Link to="/legal/commercial-transactions/">特定商取引法表記</Link>
            <Link to="/contact/">問い合わせ</Link>
          </div>
        </Section>

        <Section alt>
          <div className="pricing-trust-grid">
            <InteractiveCard className="release-panel premium-glass pricing-trust-card pricing-trust-card--wide">
              <span className="subpage-card__eyebrow">契約前提</span>
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
              <span className="subpage-card__eyebrow">サポート</span>
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
              <span className="subpage-card__eyebrow">選び方</span>
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
                  配布条件から確認する
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
