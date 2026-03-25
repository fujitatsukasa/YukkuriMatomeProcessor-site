import { Link } from 'react-router-dom'
import { ActionGroup, InteractiveCard, PageMeta, Section } from '@/components/ui'
import { media } from '@/data/assets'
import { downloadUrl, legal, siteOrigin, siteSubtitle, siteTitle } from '@/data/site-content'
import { HomeHeroStage } from '@/pages/shared'

const heroChips = ['反応集', 'まとめ動画', 'Short動画', 'ゆっくり解説', 'YMM4向け'] as const

const workflowSteps = [
  {
    step: '01',
    title: 'ネタを集める',
    body: '記事や話題を保存し、動画化したい候補を一覧で絞り込みます。',
  },
  {
    step: '02',
    title: '動画向けに整理する',
    body: 'メモではなく、見せる順番が分かる形で台本の骨組みを整えます。',
  },
  {
    step: '03',
    title: 'キャラ会話に落とす',
    body: '説明役、補足役、ツッコミ役を分けて、掛け合いとして組み替えます。',
  },
  {
    step: '04',
    title: '素材込みで構成する',
    body: '立ち絵、画像、音声の置きどころまで先に決めて、見せ方を固めます。',
  },
  {
    step: '05',
    title: 'YMM4向けに整える',
    body: '話者や素材の並びを整理して、編集前の組み直しを減らします。',
  },
] as const

const painPoints = [
  {
    index: '01',
    title: 'ネタだけ保存して終わる',
    body: '候補を集めても、どれを使うか決める前に散らかってしまう。',
  },
  {
    index: '02',
    title: '台本を作ってから会話化で詰まる',
    body: '説明の順番は見えても、誰が何を話すかを後から考え直している。',
  },
  {
    index: '03',
    title: 'YMM4前に素材と話者を整理し直す',
    body: '立ち絵、画像、音声、話者設定が別々に残り、編集開始で手が止まる。',
  },
] as const

const genreCards = [
  {
    title: '反応集・まとめ動画',
    body: '記事や話題を拾って、会話型の流れへ落とし込みやすい構成です。',
  },
  {
    title: 'ゆっくり解説',
    body: '説明役、補足役、ツッコミ役を分けて、会話台本にしやすくします。',
  },
  {
    title: 'Short動画',
    body: '短い尺でも、見せ場とテンポが分かる順番で整理しやすくなります。',
  },
  {
    title: '会話形式の説明動画',
    body: '誰が何を話すかを先に決めて、字幕や読み上げの前提を揃えやすくします。',
  },
] as const

const featureCards = [
  {
    title: 'ネタ収集',
    value: '記事や話題をそのまま制作素材として扱える',
  },
  {
    title: '動画向け台本作成',
    value: 'メモではなく、動画として見せる順番に整理できる',
  },
  {
    title: '会話形式の台本化',
    value: 'キャラごとの役割で掛け合いに落とし込める',
  },
  {
    title: '立ち絵・画像・音声を含む構成設計',
    value: 'セリフだけでなく見せ方まで組める',
  },
  {
    title: '読み上げ・テロップ品質の調整',
    value: '不自然な読みや字幕の粗を減らせる',
  },
  {
    title: 'YMM4向け準備',
    value: '編集前に素材や話者の整理を済ませやすい',
  },
] as const

const screenExamples = [
  {
    label: '実画面 01',
    title: 'ネタ一覧の画面',
    body: '保存した記事や話題を一覧で見比べて、使うネタを決めやすくします。',
    image: media.productImage2,
    alt: '記事候補の一覧を見比べながらネタを選ぶ画面',
  },
  {
    label: '実画面 02',
    title: '台本・設定の画面',
    body: '台本の形や読み上げ設定をまとめて確認し、会話構成へつなげます。',
    image: media.settingsShot,
    alt: '台本取得と整形設定をまとめて確認する画面',
  },
  {
    label: '実画面 03',
    title: 'YMM4準備の画面',
    body: '編集前に必要な前提を整理して、そのまま次工程へ渡しやすくします。',
    image: media.productImage1,
    alt: 'YMM4前に整理した内容を確認できる画面',
  },
] as const

const faqItems = [
  {
    question: 'どんな動画に向いていますか？',
    answer:
      'ゆっくり解説、反応集、まとめ動画、Short動画、会話形式の説明動画の前工程に向いています。ネタ収集から会話台本、素材設計までをつなげたいケースで特に相性が良いです。',
  },
  {
    question: '反応集やまとめ動画にも使えますか？',
    answer:
      '使えます。記事や話題を拾って保存し、そのまま会話型の台本へ整理しやすい構成にしています。',
  },
  {
    question: 'Short動画にも使えますか？',
    answer:
      '使えます。短尺向けに見せ場と順番を絞り込み、短い会話構成へ整理しやすくします。',
  },
  {
    question: 'YMM4専用ですか？',
    answer:
      'YMM4専用ではありませんが、YMM4へ持っていく前の話者整理、素材整理、構成整理が強みです。編集前の準備をまとめたい人に向いています。',
  },
  {
    question: 'AIが全部自動で作るツールですか？',
    answer:
      'いいえ。自動生成そのものを主役にするのではなく、ネタ収集から台本、会話化、素材設計、YMM4準備までの前工程を一本の流れで整理するための動画制作支援ツールです。',
  },
  {
    question: 'VOICEROIDやA.I.VOICE系にも向いていますか？',
    answer:
      '向いています。話者ごとの役割やセリフの流れを先に整理したい運用で使いやすい構成です。',
  },
] as const

const homeMetaDescription =
  'ゆっくり解説、反応集、まとめ動画、Short動画向けに、ネタ収集から台本作成、キャラ会話化、立ち絵・素材込みの構成設計、YMM4向け準備までを一気通貫で支援する動画制作ツール。'

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
        title="ゆっくりまとめプロセッサー | ゆっくり解説・反応集・Short動画のネタ収集、台本作成、YMM4準備ツール"
        description={homeMetaDescription}
        keywords="ゆっくり解説, 反応集, まとめ動画, Short動画, 台本作成, 会話形式, YMM4, 動画制作支援ツール"
        image={media.productImage2}
        path="/"
        structuredData={homeStructuredData}
      />

      <section className="brand-hero brand-hero--premium homepage-hero home-lp-hero">
        <div className="brand-hero__layout home-lp-hero__layout">
          <div className="home-lp-hero__copy">
            <p className="brand-kicker">ゆっくり解説・反応集・Short動画の制作支援ツール</p>
            <h1 className="brand-title">
              ネタ収集から会話台本、YMM4準備まで。
              <br />
              ゆっくり系動画の前工程をひとつに。
            </h1>
            <p className="brand-lead">
              ゆっくりまとめプロセッサーは、記事や話題の収集、動画向け台本化、キャラ会話化、
              立ち絵・画像・音声を含む構成設計まで、一気通貫で扱える動画制作支援ツールです。
              反応集、まとめ動画、Short動画、ゆっくり解説の制作準備を、もっと速く、もっと整理しやすくします。
            </p>

            <ActionGroup
              actions={[
                { label: '無料で始める！', href: '/download/', variant: 'primary' },
                { label: '使い方を見る', href: '/instructions/', variant: 'ghost' },
              ]}
              className="brand-inline-actions home-lp-hero__actions"
            />

            <ul className="home-lp-hero__chips" aria-label="対応ジャンル">
              {heroChips.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <figure className="home-lp-hero__mobile-preview">
              <img
                src={media.productImage2}
                alt="ネタ収集からYMM4準備までの流れが見えるホーム画面モックアップ"
              />
              <figcaption>
                <strong>ネタ収集 → 台本化 → 会話化 → 素材設計 → YMM4準備</strong>
                <span>保存した話題を、そのまま会話台本と編集前の整理につなげます。</span>
              </figcaption>
            </figure>
          </div>

          <HomeHeroStage />
        </div>
      </section>

      <Section className="home-lp-ribbon-section">
        <div className="brand-shell home-lp-shell">
          <div className="home-lp-ribbon premium-glass" data-reveal>
            <div className="home-lp-ribbon__lead">
              <p>反応集・まとめ動画・Short動画・ゆっくり解説に対応</p>
              <span>ネタ収集 → 台本作成 → 会話構成 → 素材設計 → YMM4準備</span>
            </div>

            <ol className="home-lp-ribbon__flow" aria-label="制作フロー">
              {workflowSteps.map((item) => (
                <li key={item.step}>
                  <span>{item.step}</span>
                  <strong>{item.title}</strong>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      <Section alt className="home-lp-problem-section">
        <div className="brand-shell home-lp-shell">
          <div className="home-lp-section-head">
            <p className="brand-kicker">悩みを先に解く</p>
            <h2>ネタ探し、台本、素材整理が毎回バラバラになっていませんか？</h2>
            <p>
              ネタだけ保存して終わる、台本を作ってから会話化で詰まる、YMM4前に素材と話者を整理し直す。
              前工程が分断されると、制作スピードも判断のしやすさも落ちていきます。
            </p>
          </div>

          <div className="home-lp-problem-grid">
            {painPoints.map((item) => (
              <InteractiveCard key={item.title} as="article" className="brand-card home-lp-problem-card">
                <span className="home-lp-card-index">{item.index}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </InteractiveCard>
            ))}
          </div>
        </div>
      </Section>

      <Section className="home-lp-flow-section" id="workflow">
        <div className="brand-shell home-lp-shell">
          <div className="home-lp-section-head">
            <p className="brand-kicker">解決の流れ</p>
            <h2>ゆっくりまとめプロセッサーなら、前工程を一本の流れで進められます</h2>
            <p>
              反応集・まとめ動画のネタ収集から台本化まで、ゆっくり解説の会話台本、Short動画の構成整理、
              YMM4向けの制作準備までを、ひとつの制作フローとしてまとめます。
            </p>
          </div>

          <div className="home-lp-flow-grid">
            {workflowSteps.map((item) => (
              <InteractiveCard key={item.step} as="article" className="brand-card home-lp-flow-card">
                <div className="home-lp-flow-card__head">
                  <span>{item.step}</span>
                  <h3>{item.title}</h3>
                </div>
                <p>{item.body}</p>
              </InteractiveCard>
            ))}
          </div>
        </div>
      </Section>

      <Section alt className="home-lp-genre-section">
        <div className="brand-shell home-lp-shell">
          <div className="home-lp-section-head">
            <p className="brand-kicker">向いている動画ジャンル</p>
            <h2>こんな動画を作る人に向いています</h2>
            <p>
              自分向けのツールかどうかを、動画ジャンルから判断しやすい構成にしています。
              ゆっくり系動画の前工程をまとめたい人ほど相性が良いです。
            </p>
          </div>

          <div className="home-lp-genre-grid">
            {genreCards.map((item) => (
              <InteractiveCard key={item.title} as="article" className="brand-card home-lp-genre-card">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </InteractiveCard>
            ))}
          </div>
        </div>
      </Section>

      <Section className="home-lp-feature-section">
        <div className="brand-shell home-lp-shell">
          <div className="home-lp-section-head">
            <p className="brand-kicker">主要機能</p>
            <h2>機能を並べるのではなく、得られる価値で見せます</h2>
            <p>
              ネタを集めるだけ、台本を作るだけではなく、動画として見せる順番と素材設計まで含めて前工程を整理できます。
            </p>
          </div>

          <div className="home-lp-feature-grid">
            {featureCards.map((item) => (
              <InteractiveCard key={item.title} as="article" className="brand-card home-lp-feature-card">
                <span className="home-lp-card-label">{item.title}</span>
                <p>{item.value}</p>
              </InteractiveCard>
            ))}
          </div>
        </div>
      </Section>

      <Section alt className="home-lp-proof-section">
        <div className="brand-shell home-lp-shell">
          <div className="home-lp-section-head">
            <p className="brand-kicker">実画面と出力例</p>
            <h2>抽象的な説明より、実物で流れが分かるように</h2>
            <p>
              ネタ一覧、台本・設定、YMM4準備の実画面に加えて、会話台本の出力イメージも並べています。
              ホームの中で「何ができるか」ではなく「どこまで進められるか」を確認できます。
            </p>
          </div>

          <div className="home-lp-proof-grid">
            {screenExamples.map((item) => (
              <InteractiveCard key={item.title} as="article" className="brand-card home-lp-proof-card">
                <figure className="home-lp-proof-card__media">
                  <img src={item.image} alt={item.alt} />
                </figure>
                <div className="home-lp-proof-card__body">
                  <span>{item.label}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </InteractiveCard>
            ))}

            <InteractiveCard as="article" className="brand-card home-lp-proof-card home-lp-proof-card--sample">
              <div className="home-lp-proof-card__body">
                <span>出力例</span>
                <h3>会話台本のイメージ</h3>
                <div className="home-lp-output-sample" aria-label="会話台本の出力例">
                  <div className="home-lp-output-sample__line">
                    <strong>霊夢</strong>
                    <p>今日は話題になっている記事を3本拾って、最初に結論から見せるよ。</p>
                  </div>
                  <div className="home-lp-output-sample__line home-lp-output-sample__line--accent">
                    <strong>魔理沙</strong>
                    <p>補足は後半に回して、立ち絵と画像の切り替え位置も先に決めておこう。</p>
                  </div>
                  <div className="home-lp-output-sample__line">
                    <strong>霊夢</strong>
                    <p>最後に話者と素材を整理して、YMM4へそのまま持っていける形にする。</p>
                  </div>
                </div>
                <p className="home-lp-proof-card__note">
                  会話形式 / テロップ向け / 話者整理済みのイメージを、ホーム上で確認できます。
                </p>
              </div>
            </InteractiveCard>
          </div>
        </div>
      </Section>

      <Section className="home-lp-ymm4-section">
        <div className="brand-shell home-lp-shell">
          <div className="home-lp-ymm4" data-reveal>
            <div className="home-lp-ymm4__copy">
              <p className="brand-kicker">YMM4につながる強み</p>
              <h2>YMM4に持っていく前の整理を、もっと楽に</h2>
              <p>
                ただのAI系ツールではなく、YMM4へ入る前に必要な整理を先回りできることが、このサービスの差別化ポイントです。
                YMM4専用ではありませんが、YMM4向けの前工程を整えたい人に強く向いています。
              </p>
              <p className="home-lp-ymm4__support">
                詳しい設定手順は <Link to="/instructions/">使い方</Link>、
                導入前の不安は <Link to="/faq/">FAQ</Link> で確認できます。
              </p>
            </div>

            <div className="home-lp-ymm4__points">
              <InteractiveCard as="article" className="brand-card home-lp-ymm4-card">
                <h3>話者ごとの整理がしやすい</h3>
                <p>誰が何を話すかを先に固めて、編集時の並び替えを減らせます。</p>
              </InteractiveCard>
              <InteractiveCard as="article" className="brand-card home-lp-ymm4-card">
                <h3>素材や見せ方を先に決めやすい</h3>
                <p>立ち絵、画像、音声の置きどころを前工程で整理しておけます。</p>
              </InteractiveCard>
              <InteractiveCard as="article" className="brand-card home-lp-ymm4-card">
                <h3>編集前の組み直しを減らしやすい</h3>
                <p>会話台本と素材設計を同時に固めて、YMM4での再調整を少なくします。</p>
              </InteractiveCard>
            </div>
          </div>
        </div>
      </Section>

      <Section alt className="home-lp-faq-section">
        <div className="brand-shell home-lp-shell">
          <div className="home-lp-section-head">
            <p className="brand-kicker">FAQ</p>
            <h2>よくある質問</h2>
            <p>
              ホームの段階で迷いやすいポイントを先にまとめています。さらに詳しい内容は
              <Link to="/faq/"> FAQページ</Link>
              で確認できます。
            </p>
          </div>

          <div className="faq-list home-lp-faq-list">
            {faqItems.map((item, index) => (
              <details key={item.question} className="faq-item home-lp-faq-item" open={index === 0}>
                <summary>{item.question}</summary>
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </Section>

      <Section className="home-lp-cta-section">
        <div className="brand-shell home-lp-shell">
          <div className="home-lp-cta premium-glass" data-reveal>
            <div className="home-lp-cta__copy">
              <p className="brand-kicker">最後のCTA</p>
              <h2>ゆっくり系動画の前工程を、ひとつの流れに。</h2>
              <p>
                ネタ収集から会話台本、素材設計、YMM4準備まで。制作前の散らばりを減らして、動画づくりをもっと速く。
              </p>
              <ActionGroup
                actions={[
                  { label: '無料で始める！', href: '/download/', variant: 'primary' },
                  { label: '使い方を見る', href: '/instructions/', variant: 'ghost' },
                ]}
                className="brand-inline-actions home-lp-cta__actions"
              />
            </div>

            <dl className="home-lp-cta__meta">
              <div>
                <dt>対応環境</dt>
                <dd>Windows / YMM4向け</dd>
              </div>
              <div>
                <dt>販売形態</dt>
                <dd>{legal.pricing.modelLabel}</dd>
              </div>
              <div>
                <dt>価格</dt>
                <dd>{legal.pricing.amountIncludingTax}</dd>
              </div>
              <div>
                <dt>サポート</dt>
                <dd>{legal.support.firstResponseSla}</dd>
              </div>
            </dl>
          </div>
        </div>
      </Section>
    </>
  )
}
