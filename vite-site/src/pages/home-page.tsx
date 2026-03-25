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

const manualProcess = [
  { title: 'ネタ探し', note: '保存先が分かれやすい' },
  { title: '台本整理', note: 'メモと構成が別れる' },
  { title: '会話化', note: '話者分けを後から詰める' },
  { title: '素材整理', note: '立ち絵と画像が散らばる' },
  { title: 'YMM4前調整', note: '編集前に並び直しが発生' },
] as const

const productProcess = [
  { title: 'ネタ収集', note: '候補を一覧で管理' },
  { title: '台本作成', note: '見せる順番まで整理' },
  { title: '会話台本', note: '話者ごとに流れを確認' },
  { title: '素材整理', note: '立ち絵・画像・音声を揃える' },
  { title: 'YMM4準備', note: '編集前の前提をまとめる' },
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

const comparisonRows = [
  {
    label: 'ネタ収集',
    manual: '保存先が分散しやすい',
    product: '候補を一覧で管理',
  },
  {
    label: '台本作成',
    manual: '別ツールやメモで整理',
    product: '動画向けの順番で整理',
  },
  {
    label: '会話台本',
    manual: '話者分けを後から調整',
    product: '会話形式の台本を先に固める',
  },
  {
    label: '立ち絵・素材整理',
    manual: '画像や音声が散らばりやすい',
    product: '素材の置きどころまで揃える',
  },
  {
    label: 'YMM4前の準備',
    manual: '編集前に再整理が必要',
    product: '台本読み込み前に話者と素材を整理',
  },
  {
    label: '買い切り',
    manual: '工程ごとに手作業で維持',
    product: legal.pricing.amountIncludingTax,
  },
  {
    label: 'Windows対応',
    manual: '環境差分を自分で吸収',
    product: 'Windows向けに提供',
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

const closingBadges = [
  '買い切り',
  'Windows対応',
  'YMM4向け',
  legal.support.firstResponseSla,
] as const

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
              <p className="brand-kicker">ゆっくり解説・反応集・ショート動画の制作支援ツール</p>
              <h1 className="brand-title">反応集・ゆっくり解説のネタ収集、台本作成、YMM4準備を1つに。</h1>
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
              <p className="brand-kicker">対応フロー</p>
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
            <p className="brand-kicker">Before / After</p>
            <h2>手作業で分かれやすい前工程を、1つの流れへ。</h2>
            <p>時間短縮の誇張ではなく、ネタ探しからYMM4前調整までの分断を減らすための比較です。</p>
          </div>

          <div className="home-compact-process">
            <InteractiveCard className="home-compact-process-card home-compact-process-card--manual">
              <p className="home-compact-process-card__label">手作業</p>
              <h3>ネタ探しからYMM4前調整までが分散しやすい</h3>
              <ol className="home-compact-process-card__list">
                {manualProcess.map((item) => (
                  <li key={item.title}>
                    <strong>{item.title}</strong>
                    <span>{item.note}</span>
                  </li>
                ))}
              </ol>
            </InteractiveCard>

            <InteractiveCard className="home-compact-process-card home-compact-process-card--product">
              <p className="home-compact-process-card__label">ゆっくりまとめプロセッサー</p>
              <h3>ネタ収集からYMM4準備までをまとめて進める</h3>
              <ol className="home-compact-process-card__list">
                {productProcess.map((item) => (
                  <li key={item.title}>
                    <strong>{item.title}</strong>
                    <span>{item.note}</span>
                  </li>
                ))}
              </ol>
            </InteractiveCard>
          </div>
        </Section>

        <Section id="demo" className="home-compact-section home-compact-demo-section">
          <div className="home-compact-section-head">
            <p className="brand-kicker">Product Demo</p>
            <h2>実画面で分かる、ネタ収集からYMM4準備まで</h2>
            <p>ネタ一覧、会話台本、YMM4準備の3枚だけで、どこまで進められるかを見せます。</p>
          </div>

          <ProductDemoTabs className="home-compact-demo" />
        </Section>

        <Section alt className="home-compact-section home-compact-usecase-section">
          <div className="home-compact-section-head">
            <p className="brand-kicker">Use Cases</p>
            <h2>反応集・ゆっくり解説・ショート動画に対応</h2>
          </div>

          <div className="home-compact-usecase-grid">
            {useCaseCards.map((item) => (
              <InteractiveCard key={item.title} className="home-compact-usecase-card">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </InteractiveCard>
            ))}
          </div>
        </Section>

        <Section className="home-compact-section home-compact-compare-section">
          <div className="home-compact-compare">
            <div className="home-compact-compare__main">
              <div className="home-compact-section-head">
                <p className="brand-kicker">Compare</p>
                <h2>手作業と比べて、どこまでまとまるか</h2>
                <p>競合名ではなく、手作業より何を減らせるかで見せています。</p>
              </div>

              <div className="home-compact-compare__table-wrap">
                <table className="home-compact-compare__table">
                  <thead>
                    <tr>
                      <th scope="col">項目</th>
                      <th scope="col">手作業</th>
                      <th scope="col">ゆっくりまとめプロセッサー</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((item) => (
                      <tr key={item.label}>
                        <th scope="row">{item.label}</th>
                        <td>{item.manual}</td>
                        <td>{item.product}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <InteractiveCard as="aside" className="home-compact-price-card">
              <p className="brand-kicker">Price</p>
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
          </div>
        </Section>

        <Section alt className="home-compact-section home-compact-closing-section">
          <div className="home-compact-closing">
            <div className="home-compact-faq">
              <div className="home-compact-section-head">
                <p className="brand-kicker">FAQ</p>
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

            <InteractiveCard as="aside" className="home-compact-cta-card">
              <p className="brand-kicker">Call To Action</p>
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
          </div>
        </Section>
      </div>
    </>
  )
}
