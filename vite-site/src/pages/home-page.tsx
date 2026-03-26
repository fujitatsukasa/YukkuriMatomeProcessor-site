import { useState } from 'react'
import { Link } from 'react-router-dom'
import { InteractiveCard, PageMeta, Section } from '@/components/ui'
import { media } from '@/data/assets'
import { downloadUrl, legal, siteOrigin, siteSubtitle, siteTitle } from '@/data/site-content'

const heroBadges = ['Windows対応', '買い切り', 'YMM4向け', 'サポートあり'] as const

const trustBarItems = [
  '7日間無料トライアル',
  '買い切りライセンス',
  'Windows対応',
  'YMM4向け',
  legal.support.firstResponseSla,
] as const

const valueCards = [
  {
    title: 'ネタ収集から台本作成まで一本道',
    body: '保存した話題を、そのまま動画用の骨組みにできます。',
  },
  {
    title: '会話台本と素材整理を同時に進める',
    body: '誰が話すかと、何を見せるかを一緒に固められます。',
  },
  {
    title: 'YMM4前の台本読み込み準備を先回り',
    body: '話者・立ち絵・画像・音声の前提を先に揃えられます。',
  },
] as const

const heroStages = [
  {
    key: 'topics',
    label: 'ネタ一覧',
    title: 'ネタ一覧',
    body: '記事や話題を見比べる',
    image: media.productImage2,
    alt: '記事や話題を一覧で見比べるネタ一覧画面',
  },
  {
    key: 'conversation',
    label: '会話台本',
    title: '会話台本',
    body: '話者ごとの台本を整理する',
    image: media.settingsShot,
    alt: '会話台本と読み上げ設定を確認する画面',
  },
  {
    key: 'ymm4',
    label: 'YMM4準備',
    title: 'YMM4準備',
    body: '素材と話者を揃える',
    image: media.productImage1,
    alt: 'YMM4前の準備内容を確認できる画面',
  },
] as const

const workflowStages = [
  {
    step: '01',
    stage: 'ネタ一覧',
    title: 'ネタを保存する',
    body: '記事や話題をまとめて候補化する',
    image: media.productImage2,
    alt: '記事や話題を候補として一覧化した画面',
  },
  {
    step: '02',
    stage: '台本構成',
    title: '見せる順番に整理する',
    body: '台本の骨組みを先に固める',
    image: media.productImage2,
    alt: '保存したネタを見せる順番へ整理している画面',
  },
  {
    step: '03',
    stage: '会話台本',
    title: '会話台本にする',
    body: '説明役と補足役に分けて並べる',
    image: media.settingsShot,
    alt: '会話台本と読み上げ条件を整理している画面',
  },
  {
    step: '04',
    stage: '素材整理',
    title: '素材を揃える',
    body: '立ち絵・画像・音声の置きどころを決める',
    image: media.settingsShot,
    alt: '素材整理と設定を確認している画面',
  },
  {
    step: '05',
    stage: 'YMM4準備',
    title: 'YMM4前まで整える',
    body: '話者と素材を揃えて次工程へ渡す',
    image: media.productImage1,
    alt: 'YMM4前の準備内容を確認している画面',
  },
] as const

const useCaseTabs = [
  {
    key: 'reaction',
    label: '反応集',
    body: '記事や話題を拾って、そのまま会話台本へ。',
    image: media.productImage2,
    alt: '反応集向けのネタ一覧画面',
    sample: [
      { speaker: '霊夢', line: 'まずは話題の要点だけ拾って、最初に見せる順番を決めるよ。' },
      { speaker: '魔理沙', line: '補足は後ろに回して、反応のテンポを先に作るとまとまりやすいぜ。' },
    ],
  },
  {
    key: 'explain',
    label: 'ゆっくり解説',
    body: '説明役と補足役を分けて、見やすい流れに。',
    image: media.settingsShot,
    alt: 'ゆっくり解説向けの会話台本画面',
    sample: [
      { speaker: '霊夢', line: '最初に結論、そのあと補足を入れる順で台本を分けるよ。' },
      { speaker: '魔理沙', line: '説明役と補足役を分けると、読み上げと字幕も崩れにくいぜ。' },
    ],
  },
  {
    key: 'shorts',
    label: 'ショート動画',
    body: '短い尺でも、見せ場と順番を先に決める。',
    image: media.productImage1,
    alt: 'ショート動画向けのYMM4準備画面',
    sample: [
      { speaker: '霊夢', line: '冒頭3秒で見せる話題だけ残して、余計な補足は削るよ。' },
      { speaker: '魔理沙', line: '立ち絵と画像の切り替え位置を先に決めると、短尺でも詰まりにくいぜ。' },
    ],
  },
  {
    key: 'conversation',
    label: '会話形式の解説',
    body: '誰が何を話すかを先に揃えて、字幕と読み上げを整える。',
    image: media.settingsShot,
    alt: '会話形式の解説向けの台本整理画面',
    sample: [
      { speaker: '霊夢', line: '先に話者ごとの役割を決めると、会話の流れが整理しやすいよ。' },
      { speaker: '魔理沙', line: '字幕や読み上げの前提も同時に揃えれば、後からの手戻りが減るぜ。' },
    ],
  },
] as const

const beforeAfter = {
  manual: ['ネタ探し', '台本整理', '話者振り分け', '素材整理', 'YMM4前調整'],
  product: ['ネタ収集', '台本作成', '会話台本', '素材整理', 'YMM4準備'],
} as const

const proofCards = [
  {
    title: 'ネタから台本へ移るまでが速い',
    body: '候補を見比べた直後に、見せる順番までそのまま固めやすくなります。',
  },
  {
    title: 'YMM4前の整理がかなり減る',
    body: '話者と素材を先に揃えるので、編集前の再整理ポイントを減らしやすくなります。',
  },
  {
    title: '話者ごとの流れが崩れにくい',
    body: '会話台本の段階で役割を分けておくことで、読み上げと字幕の前提を揃えやすくなります。',
  },
] as const

const priceBadges = [
  legal.pricing.modelLabel,
  '7日間の無料トライアルあり',
  'Windows対応',
  'YMM4向け',
  legal.support.firstResponseSla,
] as const

const faqItems = [
  {
    question: 'どんな動画に向いていますか？',
    answer: '反応集、ゆっくり解説、ショート動画、会話形式の解説動画に向いています。',
  },
  {
    question: 'YMM4専用ですか？',
    answer: '専用ではありませんが、YMM4向けの台本・素材整理に強く向いています。',
  },
  {
    question: 'AIが全部自動で完成させますか？',
    answer: '自動完成ではなく、制作前工程を速く整理するための支援ツールです。',
  },
  {
    question: '立ち絵や画像も扱えますか？',
    answer: '会話台本に加えて、立ち絵・画像・音声の前提整理まで進められます。',
  },
  {
    question: '買い切りですか？',
    answer: 'はい。価格とライセンス条件は購入ページで確認できます。',
  },
] as const

const homeMetaDescription =
  '反応集・ゆっくり解説・ショート動画向け。記事や話題のネタ収集から、会話台本、立ち絵・画像・音声の素材整理、YMM4前の台本読み込み準備まで進められる動画制作支援ツール。'

const homeStructuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteTitle,
    alternateName: siteSubtitle,
    url: siteOrigin,
    inLanguage: 'ja-JP',
    description: homeMetaDescription,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: legal.organization.legalName,
    brand: siteTitle,
    url: siteOrigin,
    logo: `${siteOrigin}/favicon.ico`,
    email: legal.organization.email,
    telephone: legal.organization.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: legal.organization.addressLine,
      postalCode: legal.organization.postalCode.replace(/^〒/, ''),
      addressCountry: 'JP',
    },
    sameAs: ['https://x.com/OTM_corp'],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: siteTitle,
    alternateName: siteSubtitle,
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Windows',
    description: homeMetaDescription,
    url: siteOrigin,
    downloadUrl,
    image: media.productImage2,
    screenshot: [media.productImage2, media.settingsShot, media.productImage1],
    offers: {
      '@type': 'Offer',
      price: legal.pricing.unitPrice,
      priceCurrency: legal.pricing.currency,
      url: `${siteOrigin}/purchase/`,
      availability: 'https://schema.org/InStock',
    },
    publisher: {
      '@type': 'Organization',
      name: legal.organization.legalName,
      url: siteOrigin,
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  },
]

function HeroLoopDemo() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeStage = heroStages[activeIndex]

  return (
    <div className="hero-loop-demo">
      <div className="hero-loop-demo__screen">
        <img src={activeStage.image} alt={activeStage.alt} />
      </div>

      <div className="hero-loop-demo__overlay">
        <span>実UIデモ</span>
        <strong>{activeStage.title}</strong>
        <p>{activeStage.body}</p>
      </div>

      <div className="hero-loop-demo__nav" aria-label="ヒーローデモ">
        {heroStages.map((stage, index) => (
          <button
            key={stage.key}
            type="button"
            className={index === activeIndex ? 'is-active' : ''}
            onClick={() => setActiveIndex(index)}
          >
            <span>{stage.label}</span>
            <small>{stage.body}</small>
          </button>
        ))}
      </div>
    </div>
  )
}

function WorkflowShowcase() {
  return (
    <div className="home-v3-showcase">
      <div className="home-v3-section-head home-v3-showcase__head">
        <h2>1本の動画が、ここまで進む</h2>
        <p>ネタ収集からYMM4前まで、工程ごとに画面を切り替えず流れで把握できます。</p>
      </div>

      <div className="home-v3-stage-flow">
        {workflowStages.map((item, index) => (
          <InteractiveCard
            key={item.step}
            className={`home-v3-stage ${index % 2 === 1 ? 'home-v3-stage--reverse' : ''}`}
          >
            <div className="home-v3-stage__copy">
              <div className="home-v3-stage__eyebrow">
                <span>{item.step}</span>
                <small>{item.stage}</small>
              </div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>

            <div className="home-v3-stage__media">
              <img src={item.image} alt={item.alt} />
            </div>
          </InteractiveCard>
        ))}
      </div>
    </div>
  )
}

function UseCaseSwitcher() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeCase = useCaseTabs[activeIndex]

  return (
    <div className="usecase-switcher">
      <div className="usecase-switcher__tabs" role="tablist" aria-label="ユースケース">
        {useCaseTabs.map((item, index) => (
          <button
            key={item.key}
            type="button"
            role="tab"
            aria-selected={activeIndex === index}
            className={activeIndex === index ? 'is-active' : ''}
            onClick={() => setActiveIndex(index)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <InteractiveCard className="usecase-switcher__panel">
        <div className="usecase-switcher__screen">
          <img src={activeCase.image} alt={activeCase.alt} />
        </div>

        <div className="usecase-switcher__content">
          <div className="usecase-switcher__intro">
            <strong>{activeCase.label}</strong>
            <p>{activeCase.body}</p>
          </div>

          <div className="usecase-switcher__sample">
            <span>サンプル台本</span>
            {activeCase.sample.map((line) => (
              <div key={`${activeCase.key}-${line.speaker}-${line.line}`} className="usecase-switcher__sample-line">
                <strong>{line.speaker}</strong>
                <p>{line.line}</p>
              </div>
            ))}
          </div>
        </div>
      </InteractiveCard>
    </div>
  )
}

export function HomePage() {
  return (
    <>
      <PageMeta
        title="ゆっくりまとめプロセッサー | 反応集・ゆっくり解説の台本作成とYMM4準備"
        description={homeMetaDescription}
        image={media.productImage2}
        path="/"
        structuredData={homeStructuredData}
      />

      <div className="home-v3-shell">
        <section className="home-v3-hero homepage-hero">
          <div className="home-v3-hero__layout">
            <div className="home-v3-hero__copy">
              <h1 className="brand-title">反応集・ゆっくり解説の台本作成とYMM4準備を、ネタ収集から。</h1>
              <p className="brand-lead">
                記事や話題を集めて、会話台本・立ち絵・画像・音声の素材整理までまとめて進められる、
                動画制作支援ツールです。
              </p>

              <div className="brand-inline-actions home-v3-hero__actions">
                <Link className="brand-btn brand-btn--primary" to="/download/">
                  無料で開始する
                </Link>
                <a className="brand-btn brand-btn--ghost" href="#demo">
                  3分デモを見る
                </a>
              </div>

              <ul className="home-v3-hero__badges" aria-label="主な安心材料">
                {heroBadges.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="home-v3-hero__demo">
              <HeroLoopDemo />
            </div>
          </div>
        </section>

        <Section className="home-v3-section home-v3-trust-section">
          <div className="home-v3-trust">
            <ul className="home-v3-trust__items" aria-label="事実ベースの信頼情報">
              {trustBarItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>ネタ収集からYMM4前まで、1つの流れで確認できます。</p>
          </div>
        </Section>

        <Section alt className="home-v3-section home-v3-values-section">
          <div className="home-v3-section-head">
            <h2>制作前工程が、1つの流れで進む</h2>
          </div>

          <div className="home-v3-value-grid">
            {valueCards.map((item) => (
              <InteractiveCard key={item.title} className="home-v3-value-card">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </InteractiveCard>
            ))}
          </div>
        </Section>

        <Section id="demo" className="home-v3-section home-v3-demo-section">
          <WorkflowShowcase />
        </Section>

        <Section alt className="home-v3-section home-v3-usecase-section">
          <div className="home-v3-section-head">
            <h2>反応集・ゆっくり解説・ショート動画に対応</h2>
          </div>

          <UseCaseSwitcher />
        </Section>

        <Section className="home-v3-section home-v3-proof-section">
          <div className="home-v3-section-head">
            <h2>説明ではなく、制作フローの差で見る</h2>
          </div>

          <div className="home-v3-proof">
            <InteractiveCard className="home-v3-before-after">
              <div className="home-v3-before-after__column">
                <span>手作業</span>
                <ul>
                  {beforeAfter.manual.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="home-v3-before-after__divider" aria-hidden="true">
                <span>→</span>
              </div>

              <div className="home-v3-before-after__column home-v3-before-after__column--accent">
                <span>ゆっくりまとめプロセッサー</span>
                <ul>
                  {beforeAfter.product.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </InteractiveCard>

            <div className="home-v3-proof__notes">
              {proofCards.map((item) => (
                <InteractiveCard key={item.title} className="home-v3-proof-card">
                  <span>制作フローの差</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </InteractiveCard>
              ))}
            </div>
          </div>
        </Section>

        <Section alt className="home-v3-section home-v3-price-section">
          <div className="home-v3-price">
            <div className="home-v3-price__copy">
              <h2>買い切り10万円で、制作前工程をまとめて持てる</h2>
              <p>
                別ツールを行き来せず、ネタ収集から会話台本、素材整理、YMM4前の準備までを
                1つの流れで進めるための価格です。
              </p>
            </div>

            <InteractiveCard as="aside" className="home-v3-price-card">
              <strong>{legal.pricing.amountIncludingTax}</strong>

              <ul className="home-v3-price-card__badges" aria-label="価格と安心材料">
                {priceBadges.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <dl className="home-v3-price-card__terms">
                <div>
                  <dt>所有条件</dt>
                  <dd>{legal.pricing.modelLabel}</dd>
                </div>
                <div>
                  <dt>提供方法</dt>
                  <dd>{legal.delivery.timing}</dd>
                </div>
                <div>
                  <dt>返金条件</dt>
                  <dd>{legal.refund.summary}</dd>
                </div>
                <div>
                  <dt>確認先</dt>
                  <dd>
                    <Link to="/purchase/">購入ページ</Link> / <Link to="/legal/refund-policy/">返金ポリシー</Link>
                  </dd>
                </div>
              </dl>

              <div className="brand-inline-actions home-v3-price-card__actions">
                <Link className="brand-btn brand-btn--primary" to="/download/">
                  無料で開始する
                </Link>
                <a className="brand-btn brand-btn--ghost" href="#demo">
                  3分デモを見る
                </a>
              </div>
            </InteractiveCard>
          </div>
        </Section>

        <Section className="home-v3-section home-v3-final-section">
          <div className="home-v3-final">
            <div className="home-v3-final__faq">
              <div className="home-v3-section-head">
                <h2>まずは、ネタからYMM4前までの流れを見てください</h2>
              </div>

              <div className="home-v3-final__faq-list">
                {faqItems.map((item) => (
                  <details key={item.question} className="home-v3-final__faq-item">
                    <summary>{item.question}</summary>
                    <p>{item.answer}</p>
                  </details>
                ))}
              </div>
            </div>

            <InteractiveCard as="aside" className="home-v3-final__cta">
              <h2>反応集・ゆっくり解説の制作前工程を、1つに。</h2>
              <p>
                ネタ収集から会話台本、素材整理、YMM4準備まで。
                分断しがちな作業を、まとめて進められます。
              </p>

              <div className="brand-inline-actions home-v3-final__actions">
                <Link className="brand-btn brand-btn--primary" to="/download/">
                  無料で開始する
                </Link>
                <a className="brand-btn brand-btn--ghost" href="#demo">
                  3分デモを見る
                </a>
              </div>
            </InteractiveCard>
          </div>
        </Section>
      </div>
    </>
  )
}
