import { Link } from 'react-router-dom'
import { InteractiveCard, PageMeta, Section } from '@/components/ui'
import { PricingCards } from '@/components/PricingCards'
import { legal } from '@/data/site-content'
import { productFacts } from '@/data/product-facts'
import { LegalLinksBlock } from '@/pages/shared'
import { Bot, CheckCircle2, CreditCard, FileSearch, RotateCcw, ShieldCheck } from 'lucide-react'

const planNarratives = [
  {
    name: '法人プラン',
    price: '¥220,000',
    term: '買い切り / 税込',
    title: '法人・チーム利用はこの価格を基準にする',
    body: '法人プランは220,000円税込の買い切りです。PC台数、権限管理、更新・保守範囲、請求書対応は購入前に確認します。',
    points: ['220,000円税込', '法人・チーム利用', '契約条件を導入前に確認'],
    cta: { label: '法人条件を見る', href: '#pricing-cards' },
  },
  {
    name: 'Premium',
    price: '¥39,800',
    term: '買い切り / 税込',
    title: '個人利用はPremiumを基準にする',
    body: '個人向けPremiumは月額なしの買い切り価格です。台本取得、AI台本、編集ボード、YMM4連携を継続利用したい場合に検討します。',
    points: ['39,800円税込', '月額なし', 'Googleアカウントに権限を同期'],
    cta: { label: 'Premium条件を見る', href: '#pricing-cards' },
  },
] as const

const pricingFlow = [
  {
    eyebrow: '手順1',
    title: '必要な契約条件を確認する',
    body: '法人か個人向けPremiumかを選ぶ前に、PC台数、再認証、更新範囲、返金条件を確認します。',
  },
  {
    eyebrow: '手順2',
    title: '法人プランまたはPremiumを買い切りで購入',
    body: '法人利用は220,000円税込、個人向けPremiumは39,800円税込を前提に、アプリ内または案内された導線から一度払いで購入します。',
  },
  {
    eyebrow: '手順3',
    title: '権限同期後にアプリで確認',
    body: '決済完了後、Googleログインに紐づくPremium権限を同期し、アプリ内で利用状態を確認します。',
  },
] as const

const purchaseGoalCards = [
  {
    label: '購入前',
    plan: '条件を確認',
    title: '契約条件と動作環境を確認する',
    body: 'Windows 10 / 11、YMM4、Googleログイン、PC台数、再認証、返金条件を購入前に確認します。',
    checks: ['Windows 10 / 11', 'YMM4必須', '返金条件を確認'],
  },
  {
    label: '購入時',
    plan: 'Stripe Checkout',
    title: '法人プランまたはPremiumを一度払いする',
    body: '法人プランは220,000円税込、個人向けPremiumは39,800円税込の買い切りです。購入導線と契約条件は案内で確認します。',
    checks: ['法人 220,000円税込', 'Premium 39,800円税込', '購入後7日以内の返金条件を確認'],
  },
  {
    label: '購入後',
    plan: 'Premium同期',
    title: 'Googleアカウントで権限を確認する',
    body: '決済後はGoogleログインに紐づくPremium権限を同期します。少数URLで取得、台本編集、YMM4連携まで確認します。',
    checks: ['権限同期を確認', '少数URLで再確認', 'YMM4連携を確認'],
  },
] as const

const premiumUnlocks = [
  {
    label: '台本取得',
    title: '対応URLから台本候補を取得',
    body: '記事URLやスレッドURLから本文・コメント候補を取得し、使う内容を選んで台本編集へ進めます。',
    Icon: FileSearch,
  },
  {
    label: 'AI台本',
    title: 'AI台本案を必要なときだけ使う',
    body: 'AI台本案は任意の下書き補助です。内容、事実、表現は利用者が確認してから使います。',
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
    title: '台本取得から編集まで通す',
    body: '対応URLの候補取得、台本編集、話者・改行の調整までを少数URLで確認します。',
  },
  {
    title: 'AI台本案を確認して直す',
    body: '生成結果をそのまま採用せず、事実、口調、文字量、出典まわりを確認して直します。',
  },
  {
    title: 'YMM4連携まで確認する',
    body: '素材パス、保存先、CSV/.ymmpを確認し、YMM4側で音声・字幕・演出を仕上げます。',
  },
] as const

const purchaseDecisionMatrix = [
  {
    label: '購入前に確認',
    title: '条件が合うか先に見る',
    body: '価格だけで決めず、Windows環境、YMM4、Googleログイン、返金条件、PC台数の扱いを確認してください。',
    checks: ['Windows 10 / 11', 'YMM4必須', 'Googleログイン'],
    href: '/instructions/',
    cta: '使い方を見る',
    Icon: CheckCircle2,
  },
  {
    label: '法人 / Premium検討',
    title: '継続利用する前提で検討する',
    body: '台本取得、AI台本案、編集ボード、YMM4連携を継続して使う場合に法人プランまたはPremiumを検討します。',
    checks: ['台本取得を継続したい', 'AI台本案を使いたい', 'YMM4連携まで整えたい'],
    href: '#pricing-cards',
    cta: 'プラン比較を見る',
    Icon: ShieldCheck,
  },
  {
    label: '購入前に確認',
    title: '返金条件と注意点を先に読む',
    body: '法人プランは220,000円、個人向けPremiumは39,800円の買い切りなので、購入前に返金条件、動作環境、保証しない範囲を確認します。',
    checks: ['購入後7日以内を原則受付', '動画完成や収益化は保証外', '素材利用条件は自分で確認'],
    href: '/legal/refund-policy/',
    cta: '返金条件を見る',
    Icon: RotateCcw,
  },
] as const

const purchaseFactCards = [
  {
    label: '法人価格',
    title: '220,000円 / 税込',
    body: '法人プランは買い切りです。月額自動更新や毎月の解約予約はありません。',
    Icon: CheckCircle2,
  },
  {
    label: '個人価格',
    title: '39,800円 / 税込',
    body: '個人向けPremiumも買い切りです。月額自動更新や毎月の解約予約はありません。',
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
        title="料金プラン｜法人220,000円とPremium条件を確認"
        description="法人プラン220,000円税込、個人向けPremium 39,800円税込の買い切り前提、YMM4連携、権限同期、返金条件、購入前の確認点を整理しています。"
        keywords="料金, 法人プラン, 買い切り, Premium, Stripe Checkout, 台本取得, AI台本生成"
        path="/purchase/"
      />

      <main className="brand-shell">
        <section className="pricing-command-hero">
          <div className="pricing-command-hero__shell">
            <div className="pricing-command-hero__copy">
              <p className="brand-kicker">料金プラン</p>
              <h1>料金プラン｜法人220,000円とPremium条件を確認</h1>
              <p className="brand-lead">
                法人・チーム利用は220,000円税込、個人向けPremiumは39,800円税込の買い切りです。
                価格、向いている利用規模、購入前に見るべき契約条件を分けて確認できます。
              </p>

              <div className="pricing-command-hero__chips" role="list" aria-label="料金ページの前提">
                <span role="listitem">買い切り</span>
                <span role="listitem">法人 220,000円税込</span>
                <span role="listitem">Premium 39,800円税込</span>
                <span role="listitem">月額なし</span>
                <span role="listitem">Googleアカウントに権限を保持</span>
                <span role="listitem">{legal.support.firstResponseSla}</span>
              </div>

              {!productFacts.purchaseReady.value ? (
                <div className="pricing-command-hero__notice" role="note">
                  PC台数、再認証、更新範囲、請求書対応、返金条件は購入前に確認してください。
                  法人利用は導入相談で条件を揃えてから進めます。
                </div>
              ) : null}

              <div className="brand-inline-actions pricing-command-hero__actions">
                <a className="brand-btn brand-btn--primary" href="#pricing-cards">
                  プラン比較を見る
                </a>
                <Link className="brand-btn brand-btn--ghost" to="/download/">
                  ダウンロードを見る
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
              <h2>まだ購入しない段階か、法人プランを検討する段階かを分ける</h2>
              <span>
                法人・チーム利用や制作量に条件が合う場合だけ購入を検討します。
                迷う場合は使い方と返金条件を先に確認してください。
              </span>
            </div>

            <div className="pricing-decision-matrix__grid" aria-label="購入前確認とPremiumの購入判断">
              {purchaseDecisionMatrix.map((item, index) => {
                const DecisionIcon = item.Icon
                return (
                  <InteractiveCard key={`${item.label}-${index}`} className="pricing-decision-matrix__card premium-glass">
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
              <h2>契約条件、Premium条件、購入後の確認順を分ける</h2>
            <span>
              料金だけで判断せず、購入前、購入時、購入後の確認を分けます。
              ここまで揃ってから件数を増やしてください。
            </span>
          </div>

          <div className="pricing-decision-guide" aria-label="購入前後の到達目標">
            {purchaseGoalCards.map((card, index) => (
              <InteractiveCard key={`${card.label}-${index}`} className="pricing-decision-guide__card">
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
              <h2>法人プランとPremiumの支払い条件、注意点を一画面で確認</h2>
              <span>迷う場合は、価格だけで急がず、契約条件と返金条件を読んでから法人プランまたはPremiumを判断してください。</span>
            </div>

            <div className="pricing-unlock-grid" aria-label="Premiumで使う主な機能">
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
              <p>購入後の完了判定</p>
              <h2>購入後に確認しておく状態</h2>
              <span>購入後も、まず少数URLで台本取得、台本編集、出力確認までを通します。</span>
            </div>

            <div className="pricing-unlock-goal-grid" aria-label="購入後の完了判定">
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
                <h3>法人プランとPremiumは制作支援機能の買い切り権限です</h3>
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
                法人プランとPremiumは買い切りのため、日割り差額請求やダウングレード予約はありません。
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
                  ダウンロードを見る
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
