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
            <h2>作業時間が減るのは、工程の分断が減るからです。</h2>
            <p>ネタ探し、台本整理、話者整理、素材整理、YMM4前調整を別々にやり直しにくくすることで、編集前の準備時間を削ります。</p>
          </div>

          <div className="home-compact-efficiency">
            <div className="home-compact-efficiency__chart" role="img" aria-label="手作業とゆっくりまとめプロセッサーの工程負荷比較グラフ">
              <div className="home-compact-efficiency__legend" aria-hidden="true">
                <span className="home-compact-efficiency__legend-item home-compact-efficiency__legend-item--manual">手作業</span>
                <span className="home-compact-efficiency__legend-item home-compact-efficiency__legend-item--product">ゆっくりまとめプロセッサー</span>
              </div>

              <div className="home-compact-efficiency__rows">
                {efficiencyRows.map((item) => (
                  <div key={item.label} className="home-compact-efficiency__row">
                    <div className="home-compact-efficiency__meta">
                      <strong>{item.label}</strong>
                      <span>{item.gain}</span>
                    </div>

                    <div className="home-compact-efficiency__bars">
                      <div className="home-compact-efficiency__track">
                        <div className="home-compact-efficiency__bar home-compact-efficiency__bar--manual" style={{ width: `${item.manual}%` }} />
                      </div>
                      <div className="home-compact-efficiency__track">
                        <div className="home-compact-efficiency__bar home-compact-efficiency__bar--product" style={{ width: `${item.product}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="home-compact-efficiency__note">※ グラフは工程量ベースの比較イメージです。実測値ではなく、手戻りの起きやすさを示しています。</p>
            </div>

            <div className="home-compact-efficiency__copy">
              <div className="home-compact-efficiency__headline">
                <span>時間短縮の理由</span>
                <h3>ネタ収集からYMM4準備までを、同じ画面の流れで進める。</h3>
              </div>

              <ul className="home-compact-efficiency__points">
                <li>
                  <strong>ネタ探しで止まりにくい</strong>
                  <span>候補を保存したまま、台本作成の入口までつなげます。</span>
                </li>
                <li>
                  <strong>話者整理を後回しにしない</strong>
                  <span>会話台本の段階で、誰が何を話すかを先に固められます。</span>
                </li>
                <li>
                  <strong>YMM4前のやり直しを減らす</strong>
                  <span>立ち絵・画像・音声の置きどころまで前倒しで整理できます。</span>
                </li>
              </ul>
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
          <div className="home-compact-compare">
            <div className="home-compact-compare__main">
              <div className="home-compact-section-head">
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
