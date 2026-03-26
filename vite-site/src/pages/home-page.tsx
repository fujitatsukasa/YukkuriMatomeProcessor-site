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

const efficiencyRows = [
  { label: 'ネタ探し', manual: 100, product: 44, gain: '候補を一覧で管理' },
  { label: '台本整理', manual: 94, product: 48, gain: '動画向けの順番で整理' },
  { label: '話者整理', manual: 86, product: 40, gain: '会話台本を先に固める' },
  { label: '素材整理', manual: 82, product: 46, gain: '立ち絵・画像・音声をまとめる' },
  { label: 'YMM4前調整', manual: 88, product: 42, gain: '編集前の前提を揃える' },
] as const

const efficiencyHighlights = [
  { label: '平均工程負荷 index', manual: '90', product: '44', delta: '-46pt' },
  { label: '工程切り替え', manual: '5工程で分断', product: '1フローで進行', delta: '往復を圧縮' },
  { label: 'YMM4前の再整理', manual: '5項目', product: '2項目', delta: '3項目減' },
] as const

const trendChartWidth = 560
const trendChartHeight = 220
const trendChartPaddingX = 28
const trendChartTop = 24
const trendChartBottom = 42
const trendChartInnerWidth = trendChartWidth - trendChartPaddingX * 2
const trendChartInnerHeight = trendChartHeight - trendChartTop - trendChartBottom

const trendDots = efficiencyRows.map((item, index) => {
  const x = trendChartPaddingX + (trendChartInnerWidth / (efficiencyRows.length - 1)) * index
  const manualY = trendChartTop + trendChartInnerHeight - (item.manual / 100) * trendChartInnerHeight
  const productY = trendChartTop + trendChartInnerHeight - (item.product / 100) * trendChartInnerHeight
  return { ...item, x, manualY, productY }
})

const manualTrendPath = trendDots.map((item) => `${item.x},${item.manualY}`).join(' ')
const productTrendPath = trendDots.map((item) => `${item.x},${item.productY}`).join(' ')

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
            <h2>準備時間の差は、工程負荷の差として見せます。</h2>
            <p>ネタ探しからYMM4前調整までの手戻り量を、ダッシュボードとして一目で比較できる形にしています。</p>
          </div>

          <div className="home-compact-analytics-board" role="img" aria-label="手作業とゆっくりまとめプロセッサーの工程負荷ダッシュボード比較">
            <div className="home-compact-analytics-board__summary">
              {efficiencyHighlights.map((item) => (
                <div key={item.label} className="home-compact-analytics-board__metric">
                  <span>{item.label}</span>
                  <strong>{item.product}</strong>
                  <small>{item.delta}</small>
                  <p>手作業: {item.manual}</p>
                </div>
              ))}
            </div>

            <div className="home-compact-analytics-board__chart">
              <div className="home-compact-analytics-board__legend" aria-hidden="true">
                <span className="home-compact-analytics-board__legend-item home-compact-analytics-board__legend-item--manual">手作業</span>
                <span className="home-compact-analytics-board__legend-item home-compact-analytics-board__legend-item--product">ゆっくりまとめプロセッサー</span>
              </div>

              <svg
                className="home-compact-analytics-board__svg"
                viewBox={`0 0 ${trendChartWidth} ${trendChartHeight}`}
                aria-hidden="true"
                preserveAspectRatio="none"
              >
                {[0, 25, 50, 75, 100].map((value) => {
                  const y = trendChartTop + trendChartInnerHeight - (value / 100) * trendChartInnerHeight
                  return (
                    <g key={value}>
                      <line x1={trendChartPaddingX} x2={trendChartWidth - trendChartPaddingX} y1={y} y2={y} className="home-compact-analytics-board__grid-line" />
                      <text x={trendChartPaddingX - 8} y={y + 4} className="home-compact-analytics-board__axis-label">
                        {value}
                      </text>
                    </g>
                  )
                })}

                <polyline points={manualTrendPath} className="home-compact-analytics-board__polyline home-compact-analytics-board__polyline--manual" />
                <polyline points={productTrendPath} className="home-compact-analytics-board__polyline home-compact-analytics-board__polyline--product" />

                {trendDots.map((item) => (
                  <g key={item.label}>
                    <circle cx={item.x} cy={item.manualY} r="5" className="home-compact-analytics-board__dot home-compact-analytics-board__dot--manual" />
                    <circle cx={item.x} cy={item.productY} r="5" className="home-compact-analytics-board__dot home-compact-analytics-board__dot--product" />
                    <text x={item.x} y={trendChartHeight - 12} textAnchor="middle" className="home-compact-analytics-board__stage-label">
                      {item.label}
                    </text>
                  </g>
                ))}
              </svg>
            </div>

            <div className="home-compact-analytics-board__rows">
              {efficiencyRows.map((item) => (
                <div key={item.label} className="home-compact-analytics-board__row">
                  <div className="home-compact-analytics-board__row-label">
                    <strong>{item.label}</strong>
                    <span>{item.gain}</span>
                  </div>

                  <div className="home-compact-analytics-board__row-bars">
                    <div className="home-compact-analytics-board__track">
                      <div className="home-compact-analytics-board__fill home-compact-analytics-board__fill--manual" style={{ width: `${item.manual}%` }}>
                        <em>{item.manual}</em>
                      </div>
                    </div>
                    <div className="home-compact-analytics-board__track">
                      <div className="home-compact-analytics-board__fill home-compact-analytics-board__fill--product" style={{ width: `${item.product}%` }}>
                        <em>{item.product}</em>
                      </div>
                    </div>
                  </div>

                  <div className="home-compact-analytics-board__delta">-{item.manual - item.product}pt</div>
                </div>
              ))}
            </div>

            <p className="home-compact-analytics-board__note">※ index は準備工程の分断と手戻り量をもとにした比較イメージです。実測時間ではありません。</p>
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
            <h2>準備時間の差は、手戻りの数で見せます。</h2>
            <p>比較表ではなく、どの工程でどれだけ負荷が落ちるかをグラフで見せます。</p>
          </div>

          <div className="home-compact-impact-board">
            <div className="home-compact-impact-board__summary">
              {efficiencyHighlights.map((item) => (
                <div key={item.label} className="home-compact-impact-board__metric">
                  <span>{item.label}</span>
                  <strong>{item.product}</strong>
                  <small>{item.delta}</small>
                  <p>手作業: {item.manual}</p>
                </div>
              ))}
            </div>

            <div className="home-compact-impact-board__chart" role="img" aria-label="手作業とゆっくりまとめプロセッサーの工程負荷インデックス比較">
              <div className="home-compact-impact-board__axis" aria-hidden="true">
                <span>0</span>
                <span>50</span>
                <span>100</span>
              </div>

              <div className="home-compact-impact-board__grid" aria-hidden="true" />

              <div className="home-compact-impact-board__rows">
                {efficiencyRows.map((item) => (
                  <div key={item.label} className="home-compact-impact-board__row">
                    <div className="home-compact-impact-board__label">
                      <strong>{item.label}</strong>
                      <span>{item.gain}</span>
                    </div>

                    <div className="home-compact-impact-board__bars">
                      <div className="home-compact-impact-board__lane">
                        <div className="home-compact-impact-board__fill home-compact-impact-board__fill--manual" style={{ width: `${item.manual}%` }}>
                          <em>{item.manual}</em>
                        </div>
                      </div>
                      <div className="home-compact-impact-board__lane">
                        <div className="home-compact-impact-board__fill home-compact-impact-board__fill--product" style={{ width: `${item.product}%` }}>
                          <em>{item.product}</em>
                        </div>
                      </div>
                    </div>

                    <div className="home-compact-impact-board__delta">-{item.manual - item.product}pt</div>
                  </div>
                ))}
              </div>

              <div className="home-compact-impact-board__legend" aria-hidden="true">
                <span className="home-compact-impact-board__legend-item home-compact-impact-board__legend-item--manual">手作業</span>
                <span className="home-compact-impact-board__legend-item home-compact-impact-board__legend-item--product">ゆっくりまとめプロセッサー</span>
              </div>

              <p className="home-compact-impact-board__note">※ index は準備工程の分断と手戻り量をもとにした比較イメージです。実測時間ではありません。</p>
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
