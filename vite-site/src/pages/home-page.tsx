import { Link } from 'react-router-dom'
import { PageMeta } from '@/components/ui'
import { downloadUrl, legal, siteOrigin, siteTitle } from '@/data/site-content'
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  CreditCard,
  Download,
  FileSearch,
  HelpCircle,
  Monitor,
  PencilLine,
  Send,
} from 'lucide-react'

const heroBadges = ['Windows専用', 'YMM4向け', '20+対応サイト', '無料プランあり', 'Premium買い切り'] as const

const inputOutputItems = [
  {
    label: '入力するもの',
    title: '記事URL・スレッドURL',
    body: 'あにまん、5ch、ふたば、まとめ記事など、動画化したい素材のURLを起点にします。',
    items: ['記事URL', 'スレッドURL', 'まとめ記事'],
    Icon: FileSearch,
  },
  {
    label: '作れるもの',
    title: '台本下地・CSV・.ymmp前準備',
    body: '台本候補を整え、YMM4に渡す前のCSV、キャラ設定、素材パス確認まで進めます。',
    items: ['台本下地', 'CSV', '.ymmp前準備'],
    Icon: Send,
  },
] as const

const workflowSteps = [
  {
    step: '1',
    title: 'URLを入れる',
    body: '動画化したい記事やスレッドのURLを入力し、候補を一覧で確認します。',
    image: '/product_get_script.webp',
    alt: '記事URLから候補を取得する実アプリ画面',
    Icon: FileSearch,
  },
  {
    step: '2',
    title: '台本候補を整える',
    body: '不要な行を削り、役割、感情、読み上げ向けの下地を整えます。',
    image: '/product_edit_script.webp',
    alt: '台本を編集してYMM4向けに整える実アプリ画面',
    Icon: PencilLine,
  },
  {
    step: '3',
    title: 'YMM4に渡す前に確認する',
    body: 'CSV、キャラ設定、立ち絵パス、保存先を確認してから編集に入れます。',
    image: '/product_keyword_material.webp',
    alt: 'YMM4前準備と素材整理の実アプリ画面',
    Icon: Monitor,
  },
] as const

const featureBullets = [
  '対応サイトから台本候補を取得',
  'AI台本生成と13キャラの掛け合い補助',
  'CSV / .ymmp / YMM4キャラ設定の前準備',
  'YouTube分析とコメント取得で次の題材を探す',
] as const

const planCards = [
  {
    name: 'Free',
    price: '¥0',
    title: 'まず無料で動作確認',
    body: '対応URLの取得、台本編集、YMM4前準備の流れが自分の制作手順に合うか確認できます。',
    cta: '無料でダウンロード',
    href: downloadUrl,
    external: true,
  },
  {
    name: 'Premium',
    price: '¥39,800',
    title: '買い切りで制限解除',
    body: '台本取得とAI台本生成の利用制限を解除し、継続投稿向けに前準備を回しやすくします。',
    cta: '料金を見る',
    href: '/purchase/',
    external: false,
  },
] as const

const faqPreview = [
  {
    question: 'Macで使えますか？',
    answer: '現時点ではWindows専用です。YMM4を使うWindows環境を前提にしています。',
  },
  {
    question: 'このツールだけで動画は完成しますか？',
    answer: 'いいえ。動画完成を自動保証するものではなく、YMM4を開く前の台本下地と編集準備を支援します。',
  },
  {
    question: 'Premiumで何が解除されますか？',
    answer: '台本取得とAI台本生成の利用制限を解除します。購入はアプリ内のStripe Checkoutから行います。',
  },
] as const

const softwareApplicationLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: siteTitle,
  applicationCategory: 'MultimediaApplication',
  operatingSystem: 'Windows 10, Windows 11',
  url: `${siteOrigin}/`,
  downloadUrl: `${siteOrigin}/download/`,
  description:
    '記事URL・スレッドURLから、ゆっくり動画の台本下地、CSV、.ymmp、YMM4前準備を整えるWindows向け制作支援ツールです。',
  offers: {
    '@type': 'Offer',
    price: legal.pricing.unitPrice,
    priceCurrency: legal.pricing.currency,
    availability: 'https://schema.org/InStock',
  },
  publisher: {
    '@type': 'Organization',
    name: legal.organization.legalName,
    url: siteOrigin,
  },
}

export function HomePage() {
  return (
    <>
      <PageMeta
        title="ゆっくりまとめプロセッサー｜YMM4向け台本作成・CSV/.ymmp前準備ツール"
        description="記事URL・スレッドURLから、ゆっくり動画の台本下地を作成。5ch・あにまん等の素材取得、AI台本補助、CSV/.ymmp整理、YMM4キャラ設定までWindowsで確認できます。無料プランあり。"
        keywords="ゆっくりまとめプロセッサー,YMM4,台本作成,CSV,.ymmp,反応集,5ch,あにまん,ゆっくり解説"
        path="/"
        structuredData={softwareApplicationLd}
      />

      <main className="home-practical">
        <section className="home-practical-hero">
          <div className="home-practical-hero__copy">
            <p className="brand-kicker">YMM4向け Windows制作支援ツール</p>
            <h1>記事URL・スレッドURLから、ゆっくり動画の台本下地とYMM4前準備を作る</h1>
            <p>
              5ch、あにまん、ふたば、まとめ記事などの素材取得から、台本候補の整理、AI補助、CSV / .ymmp 前準備まで。
              YMM4を開く前の面倒な下準備を、ひとつの画面で進めやすくします。
            </p>

            <div className="home-practical-hero__actions">
              <a className="brand-btn brand-btn--primary" href={downloadUrl} target="_blank" rel="noopener noreferrer">
                <Download size={18} />
                無料でダウンロード
              </a>
              <Link className="brand-btn brand-btn--ghost" to="/instructions/">
                使い方を見る
              </Link>
            </div>

            <div className="home-practical-badges" role="list" aria-label="対応条件">
              {heroBadges.map((badge) => (
                <span key={badge} role="listitem">
                  <CheckCircle2 size={15} />
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <figure className="home-practical-hero__visual">
            <img src="/product_get_script.webp" alt="記事URLから台本候補を取得する実アプリ画面" />
            <figcaption>実アプリ画面: URL入力から記事候補を取得</figcaption>
          </figure>
        </section>

        <section className="home-practical-section home-practical-section--tight" aria-labelledby="input-output-heading">
          <div className="home-practical-section__head">
            <p className="brand-kicker">入力から出力まで</p>
            <h2 id="input-output-heading">最初に分かるべきことだけを並べます</h2>
          </div>

          <div className="home-input-output">
            {inputOutputItems.map((item) => {
              const ItemIcon = item.Icon
              return (
                <article key={item.title} className="home-input-output__card">
                  <span>
                    <ItemIcon size={18} />
                    {item.label}
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <ul>
                    {item.items.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              )
            })}
          </div>
        </section>

        <section className="home-practical-section" aria-labelledby="steps-heading">
          <div className="home-practical-section__head">
            <p className="brand-kicker">3ステップ</p>
            <h2 id="steps-heading">URLを入れて、台本下地を整えて、YMM4に渡す</h2>
          </div>

          <div className="home-step-grid">
            {workflowSteps.map((step) => {
              const StepIcon = step.Icon
              return (
                <article key={step.step} className="home-step-card">
                  <div className="home-step-card__media">
                    <img src={step.image} alt={step.alt} loading="lazy" decoding="async" />
                  </div>
                  <div className="home-step-card__body">
                    <span>
                      <StepIcon size={16} />
                      STEP {step.step}
                    </span>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section className="home-practical-section home-practical-section--split" aria-labelledby="real-screen-heading">
          <div className="home-practical-section__head home-practical-section__head--left">
            <p className="brand-kicker">実画面で確認</p>
            <h2 id="real-screen-heading">雰囲気画像ではなく、実際の作業画面を見せます</h2>
            <p>
              料金を判断する前に、どの画面で何を触るのかを確認できます。
              まずは無料で起動し、URL取得、台本編集、YMM4前準備の相性を見てください。
            </p>
          </div>

          <div className="home-real-screen-panel">
            <img src="/product_edit_script.webp" alt="台本編集とYMM4向けタイムライン前準備の実アプリ画面" loading="lazy" decoding="async" />
            <ul>
              {featureBullets.map((item) => (
                <li key={item}>
                  <BadgeCheck size={16} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="home-practical-section" aria-labelledby="pricing-heading">
          <div className="home-practical-section__head">
            <p className="brand-kicker">料金</p>
            <h2 id="pricing-heading">Freeで試して、必要になったらPremiumで制限解除</h2>
          </div>

          <div className="home-plan-grid">
            {planCards.map((plan) => (
              <article key={plan.name} className={`home-plan-card home-plan-card--${plan.name.toLowerCase()}`}>
                <span>{plan.name}</span>
                <strong>{plan.price}</strong>
                <h3>{plan.title}</h3>
                <p>{plan.body}</p>
                {plan.external ? (
                  <a href={plan.href} target="_blank" rel="noopener noreferrer">
                    {plan.cta}
                    <ArrowRight size={16} />
                  </a>
                ) : (
                  <Link to={plan.href}>
                    {plan.cta}
                    <ArrowRight size={16} />
                  </Link>
                )}
              </article>
            ))}
          </div>

          <div className="home-trust-strip" role="list" aria-label="購入前の確認事項">
            <span role="listitem">
              <CreditCard size={16} />
              Stripe Checkout
            </span>
            <span role="listitem">月額自動更新なし</span>
            <span role="listitem">Googleアカウントに権限同期</span>
            <span role="listitem">{legal.support.firstResponseSla}</span>
          </div>
        </section>

        <section className="home-practical-section home-practical-section--faq" aria-labelledby="faq-heading">
          <div className="home-practical-section__head">
            <p className="brand-kicker">FAQ</p>
            <h2 id="faq-heading">導入前によくある質問</h2>
          </div>

          <div className="home-faq-preview">
            {faqPreview.map((item) => (
              <article key={item.question}>
                <HelpCircle size={18} />
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>

          <div className="home-practical-center">
            <Link className="brand-btn brand-btn--ghost" to="/faq/">
              FAQを見る
            </Link>
          </div>
        </section>

        <section className="home-practical-final">
          <p className="brand-kicker">まずは無料で確認</p>
          <h2>自分のURLで、台本下地とYMM4前準備まで試してください</h2>
          <div className="home-practical-hero__actions home-practical-hero__actions--center">
            <a className="brand-btn brand-btn--primary" href={downloadUrl} target="_blank" rel="noopener noreferrer">
              <Download size={18} />
              無料でダウンロード
            </a>
            <Link className="brand-btn brand-btn--ghost" to="/purchase/">
              料金を見る
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
