import { Link } from 'react-router-dom'
import { InteractiveCard, PageMeta, Section } from '@/components/ui'
import { media } from '@/data/assets'
import { downloadUrl, legal, siteOrigin, siteSubtitle, siteTitle } from '@/data/site-content'
import { HomeHeroStage, ProductDemoTabs } from '@/pages/shared'

const heroBenefits = [
  'ネタ収集から台本作成までを一本化',
  '会話台本と素材整理を同じ流れで進行',
  'YMM4前の台本読み込み準備を先回り',
] as const

const flowSteps = ['ネタ収集', '台本作成', '会話台本', '素材整理', 'YMM4準備'] as const

const timeReduction = {
  manualMinutes: 120,
  productMinutes: 6,
  reductionRate: 95,
} as const

const timeBreakdown = [
  { label: 'ネタ探し', manual: '30分', product: '2分' },
  { label: '台本整理', manual: '35分', product: '2分' },
  { label: 'YMM4前調整', manual: '55分', product: '2分' },
] as const

const useCaseCards = [
  {
    title: '反応集',
    body: '記事や話題を拾って、そのまま会話台本へ。',
  },
  {
    title: 'ゆっくり解説',
    body: '説明役と補足役を分けて、YMM4向けに整理。',
  },
  {
    title: 'ショート動画',
    body: '短い尺でも、見せ場と順番を先に固める。',
  },
  {
    title: '会話形式の解説',
    body: '誰が何を話すかを先に決めて、字幕と読み上げを揃える。',
  },
] as const

const faqItems = [
  {
    question: '反応集やまとめ動画にも使えますか？',
    answer: '使えます。記事や話題を集めて、そのまま会話台本へ整理しやすい構成です。',
  },
  {
    question: 'ショート動画にも使えますか？',
    answer: '使えます。短い尺でも見せ場と順番を先に固めて、短尺向けの台本作成に使えます。',
  },
  {
    question: 'YMM4専用ですか？',
    answer: '専用ではありませんが、YMM4前の台本整理と素材整理をまとめて進めたい人に向いています。',
  },
  {
    question: 'AIが全部自動で作るツールですか？',
    answer: '自動化だけを主役にするのではなく、ネタ収集から会話台本、素材整理までをつなぐ制作支援ツールです。',
  },
] as const

const closingBadges = ['買い切り', 'Windows対応', 'YMM4向け', legal.support.firstResponseSla] as const

const homeMetaDescription =
  '反応集・ゆっくり解説・ショート動画向けに、ネタ収集、台本作成、会話台本、立ち絵・画像・音声の素材整理、YMM4前の準備までまとめて進められる動画制作支援ツール。'

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

export function HomePage() {
  return (
    <>
      <PageMeta
        title="ゆっくりまとめプロセッサー | 反応集・ゆっくり解説のネタ収集、台本作成、YMM4準備"
        description={homeMetaDescription}
        image={media.productImage2}
        path="/"
        structuredData={homeStructuredData}
      />

      <div className="home-compact-shell">
        <section className="home-compact-hero homepage-hero">
          <div className="home-compact-hero__layout">
            <div className="home-compact-hero__copy">
              <h1 className="brand-title">
                反応集・
                <br />
                ゆっくり解説の
                <br />
                ネタ収集、台本作成、
                <br />
                YMM4準備を1つに。
              </h1>
              <p className="brand-lead">
                記事や話題を集めて、会話台本・立ち絵・素材整理までまとめて進められる、
                YMM4向けの動画制作支援ツールです。
              </p>

              <div className="brand-inline-actions home-compact-hero__actions">
                <Link className="brand-btn brand-btn--primary" to="/download/">
                  無料で開始する！
                </Link>
                <Link className="brand-btn brand-btn--ghost" to="/instructions/">
                  使い方を見る
                </Link>
              </div>

              <ul className="home-compact-hero__benefits" aria-label="主な価値">
                {heroBenefits.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="home-compact-hero__media">
              <HomeHeroStage />
            </div>
          </div>
        </section>

        <Section className="home-compact-section home-compact-flow-section">
          <div className="home-compact-flow">
            <div>
              <h2>ネタ収集 → 台本作成 → 会話台本 → 素材整理 → YMM4準備</h2>
            </div>

            <ul className="home-compact-flow__list" aria-label="制作フロー">
              {flowSteps.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </Section>

        <Section alt className="home-compact-section home-compact-process-section">
          <div className="home-compact-section-head">
            <h2>準備時間を、120分から6分へ。</h2>
            <p>ネタ探しからYMM4前調整までの準備を、約95%削減できる前提で見せています。</p>
          </div>

          <div className="home-compact-time-board" role="img" aria-label="手作業120分とゆっくりまとめプロセッサー6分の時間比較">
            <div className="home-compact-time-board__headline">
              <div className="home-compact-time-board__metric home-compact-time-board__metric--manual">
                <span>手作業</span>
                <strong>{timeReduction.manualMinutes}分</strong>
                <p>ネタ探し、台本整理、YMM4前調整まで個別に進行</p>
              </div>

              <div className="home-compact-time-board__reduction">
                <strong>{timeReduction.reductionRate}%削減</strong>
                <span>{timeReduction.manualMinutes}分 → {timeReduction.productMinutes}分</span>
              </div>

              <div className="home-compact-time-board__metric home-compact-time-board__metric--product">
                <span>ゆっくりまとめプロセッサー</span>
                <strong>{timeReduction.productMinutes}分</strong>
                <p>同じ準備を1つの流れで進めて、すぐ編集へ渡せる状態へ</p>
              </div>
            </div>

            <div className="home-compact-time-board__bars" aria-hidden="true">
              <div className="home-compact-time-board__row">
                <div className="home-compact-time-board__label">
                  <strong>手作業</strong>
                  <span>{timeReduction.manualMinutes}分</span>
                </div>
                <div className="home-compact-time-board__track">
                  <div className="home-compact-time-board__fill home-compact-time-board__fill--manual" style={{ width: '100%' }} />
                </div>
              </div>

              <div className="home-compact-time-board__row">
                <div className="home-compact-time-board__label">
                  <strong>本ツール</strong>
                  <span>{timeReduction.productMinutes}分</span>
                </div>
                <div className="home-compact-time-board__track">
                  <div
                    className="home-compact-time-board__fill home-compact-time-board__fill--product"
                    style={{ width: `${(timeReduction.productMinutes / timeReduction.manualMinutes) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="home-compact-time-board__breakdown">
              {timeBreakdown.map((item) => (
                <div key={item.label} className="home-compact-time-board__breakdown-item">
                  <strong>{item.label}</strong>
                  <div>
                    <span>手作業 {item.manual}</span>
                    <span>本ツール {item.product}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section id="demo" className="home-compact-section home-compact-demo-section">
          <div className="home-compact-section-head">
            <h2>実画面で分かる、ネタ収集からYMM4準備まで</h2>
            <p>ネタ一覧、会話台本、YMM4準備の3枚で、どこまで進められるかを見せます。</p>
          </div>

          <ProductDemoTabs className="home-compact-demo" />
        </Section>

        <Section alt className="home-compact-section home-compact-usecase-section">
          <div className="home-compact-section-head">
            <h2>反応集・ゆっくり解説・ショート動画に対応</h2>
          </div>

          <div className="home-compact-usecase-grid" role="list">
            {useCaseCards.map((item) => (
              <article key={item.title} className="home-compact-usecase-card" role="listitem">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section className="home-compact-section home-compact-compare-section">
          <div className="home-compact-section-head">
            <h2>どこで時間が減るかも、6分の内訳で見せます。</h2>
            <p>95%削減の根拠を、ネタ探し・台本整理・YMM4前調整の時間差でそのまま見せています。</p>
          </div>

          <div className="home-compact-time-detail-board" role="img" aria-label="手作業120分と本ツール6分の時間内訳比較">
            <div className="home-compact-time-detail-board__summary">
              <div className="home-compact-time-detail-board__hero">
                <span>Time Saved</span>
                <strong>{timeReduction.reductionRate}%削減</strong>
                <p>{timeReduction.manualMinutes}分かかっていた準備を、{timeReduction.productMinutes}分まで圧縮。</p>
              </div>

              <div className="home-compact-time-detail-board__totals">
                <div>
                  <span>手作業</span>
                  <strong>{timeReduction.manualMinutes}分</strong>
                </div>
                <div>
                  <span>本ツール</span>
                  <strong>{timeReduction.productMinutes}分</strong>
                </div>
              </div>
            </div>

            <div className="home-compact-time-detail-board__rows">
              {timeBreakdown.map((item) => {
                const manual = Number.parseInt(item.manual, 10)
                const product = Number.parseInt(item.product, 10)
                const saved = manual - product

                return (
                  <div key={item.label} className="home-compact-time-detail-board__row">
                    <div className="home-compact-time-detail-board__label">
                      <strong>{item.label}</strong>
                      <span>{saved}分短縮</span>
                    </div>

                    <div className="home-compact-time-detail-board__chart">
                      <div className="home-compact-time-detail-board__lane">
                        <span>手作業 {item.manual}</span>
                        <div className="home-compact-time-detail-board__track">
                          <div className="home-compact-time-detail-board__fill home-compact-time-detail-board__fill--manual" style={{ width: `${(manual / timeReduction.manualMinutes) * 100}%` }} />
                        </div>
                      </div>

                      <div className="home-compact-time-detail-board__lane">
                        <span>本ツール {item.product}</span>
                        <div className="home-compact-time-detail-board__track">
                          <div className="home-compact-time-detail-board__fill home-compact-time-detail-board__fill--product" style={{ width: `${(product / timeReduction.manualMinutes) * 100}%` }} />
                        </div>
                      </div>
                    </div>

                    <div className="home-compact-time-detail-board__delta">-{saved}分</div>
                  </div>
                )
              })}
            </div>
          </div>
        </Section>

        <Section className="home-compact-section home-compact-price-section">
          <InteractiveCard className="home-compact-price-card">
            <strong>{legal.pricing.amountIncludingTax}</strong>
            <p>
              買い切りで導入できる Windows 向けツールです。
              <Link to="/purchase/">購入ページ</Link>で案内条件を確認できます。
            </p>
            <ul className="home-compact-price-card__badges" aria-label="導入条件">
              {closingBadges.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </InteractiveCard>
        </Section>

        <Section alt className="home-compact-section home-compact-closing-section">
          <div className="home-compact-faq">
            <div className="home-compact-section-head">
              <h2>よくある質問</h2>
              <p>
                導入前によくある確認事項だけを短くまとめています。
                <Link to="/faq/">FAQページ</Link>ではさらに詳しく確認できます。
              </p>
            </div>

            <div className="home-compact-faq__list">
              {faqItems.map((item) => (
                <details key={item.question} className="home-compact-faq__item">
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </Section>

        <Section className="home-compact-section home-compact-cta-section">
          <InteractiveCard className="home-compact-cta-card">
            <h2>反応集・ゆっくり解説の制作前工程を、ひとつに。</h2>
            <p>
              ネタ収集、台本作成、会話台本、素材整理、YMM4準備まで。
              手作業で分断しがちな工程を、1つの流れにまとめます。
            </p>

            <div className="brand-inline-actions home-compact-cta__actions">
              <Link className="brand-btn brand-btn--primary" to="/download/">
                無料で開始する！
              </Link>
              <Link className="brand-btn brand-btn--ghost" to="/instructions/">
                使い方を見る
              </Link>
            </div>

            <ul className="home-compact-cta__badges" aria-label="補足情報">
              {closingBadges.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </InteractiveCard>
        </Section>
      </div>
    </>
  )
}
