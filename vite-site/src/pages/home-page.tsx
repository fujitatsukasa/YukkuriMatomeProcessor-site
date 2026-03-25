import { startTransition, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ActionGroup, PageMeta, Section } from '@/components/ui'
import { media } from '@/data/assets'
import {
  downloadUrl,
  legal,
  newsPosts,
  siteDescription,
  siteOrigin,
  siteSubtitle,
  siteTitle,
} from '@/data/site-content'
import { HomeHeroStage } from '@/pages/shared'

const workflowScenes = [
  {
    id: 'capture',
    step: '01',
    label: '取得',
    nav: 'URLから候補記事を並べる',
    micro: '最初の選別を一覧で終える',
    title: 'URLを入れると、候補記事がすぐに並ぶ。',
    summary: '対応URLから候補記事を一覧化。最初の選別を、その場で済ませやすい。',
    image: media.workstation1,
    imageAlt: 'URLから台本候補を取得している制作ワークステーション',
    points: [
      '対応URLをそのまま投入',
      '候補記事を一覧で見比べる',
      '台本化の前提を早く固める',
    ],
    metrics: [
      ['入口', 'URLを入れる'],
      ['一覧', '候補を並べる'],
      ['初動', '迷いを減らす'],
    ],
  },
  {
    id: 'shape',
    step: '02',
    label: '整形',
    nav: '台本の形と設定を揃える',
    micro: '読み上げ前の手戻りを減らす',
    title: '台本の形と保存条件を先に揃える。',
    summary: '整形ルールと保存先を固定し、編集前に戻る回数を減らしやすい。',
    image: media.settingsShot,
    imageAlt: '台本取得と設定確認の画面',
    points: [
      '整形ルールを先に固定',
      '保存先と設定差を減らす',
      '担当者ごとの差を出しにくくする',
    ],
    metrics: [
      ['整形', 'ルールを揃える'],
      ['保存', '出力先を固定'],
      ['共有', '再現しやすい'],
    ],
  },
  {
    id: 'launch',
    step: '03',
    label: '受け渡し',
    nav: 'YMM4前の条件をまとめて固める',
    micro: '編集開始の立ち上がりを整える',
    title: 'YMM4前の条件まで、同じ流れで固める。',
    summary: '実行パスと保存条件を最後に確認し、編集開始の立ち上がりを安定させる。',
    image: media.productImage2,
    imageAlt: '制作ラインが整った製品画面のイメージ',
    points: [
      '実行パスをまとめて確認',
      '保存条件を最後に揃える',
      '試用から導入判断まで迷いにくい',
    ],
    metrics: [
      ['起動前', '条件を確認'],
      ['受け渡し', '前提を揃える'],
      ['判断', '導線が分断しない'],
    ],
  },
] as const

const comparisonSpotlight = {
  label: '準備時間',
  note: 'URL取得から台本整形完了までの前工程。',
  delta: '-27分',
  rate: '-60%',
  before: { value: 45, unit: '分' },
  after: { value: 18, unit: '分' },
} as const

const manifestoSignals = [
  {
    value: '3',
    label: '主要工程',
    detail: 'URL取得 / 台本整形 / YMM4準備',
  },
  {
    value: '無料',
    label: 'すぐ開始',
    detail: 'ダウンロード後すぐ使える',
  },
  {
    value: '買い切り',
    label: '販売形態',
    detail: legal.pricing.amountIncludingTax,
  },
] as const

const manifestoSteps = [
  {
    id: 'capture',
    index: '01',
    label: '取得',
    title: 'URLを入れると、候補記事が並ぶ。',
    body: '最初の選別を一覧のまま終わらせやすい。',
    image: media.productImage2,
    imageAlt: '対応URLから記事一覧を取得して選択する画面',
    caption: '一覧取得と見比べを、最初の画面でまとめる。',
  },
  {
    id: 'shape',
    index: '02',
    label: '整形',
    title: '台本の形と設定を揃える。',
    body: '整形ルールと保存先を先に固定して手戻りを減らす。',
    image: media.settingsShot,
    imageAlt: '台本整形と設定確認の画面',
    caption: '整形ルールと保存先を先に決める。',
  },
  {
    id: 'launch',
    index: '03',
    label: '受け渡し',
    title: 'YMM4前の条件まで揃える。',
    body: '実行パスと保存条件を最後にまとめて確認できる。',
    image: media.productImage1,
    imageAlt: 'YMM4編集開始へつながる画面',
    caption: '編集開始へ渡す条件まで同じ流れで揃える。',
  },
] as const

const scenarioAtlas = [
  {
    title: '個人クリエイター',
    body:
      '投稿頻度を落とさずに、毎回の台本準備で迷う時間を減らしたいケース向けです。短い作業時間でも、次に見るべきページが明確です。',
    note: '無料で始めてから導入判断までを一本の導線で追えます。',
    href: '/download/',
    linkLabel: 'まず試用する',
  },
  {
    title: '副業・小規模運用',
    body:
      '限られた時間で複数本を回したいケース向けです。案件ごとの条件を揃え、再開時の立ち上がりを速くします。',
    note: '夜間や隙間時間でも、途中から再開しやすい構成です。',
    href: '/instructions/',
    linkLabel: '手順を見る',
  },
  {
    title: 'チーム制作',
    body:
      '引き継ぎや担当変更があるケース向けです。属人化しやすい前工程を、共通ルールとページ導線で標準化しやすくします。',
    note: 'FAQ と法務情報まで同じ場所で確認できるため、説明が分断されません。',
    href: '/faq/',
    linkLabel: '失敗例を見る',
  },
] as const

const proofRoutes = [
  {
    label: '使い方',
    title: '使い方',
    href: '/instructions/',
    body: '初期設定、YMM4 実行パス、保存先、URL取得から編集開始までの流れを順番に追えます。',
    meta: '最初に何を確認すべきかを迷わないためのページです。',
  },
  {
    label: 'FAQ',
    title: 'FAQ',
    href: '/faq/',
    body: '導入前の疑問、提供時期、トラブル時の切り分けをカテゴリ別に確認できます。',
    meta: '失敗例と復旧方針を先回りで把握したい人向けです。',
  },
  {
    label: '購入',
    title: '購入と法務',
    href: '/purchase/',
    body: '価格、販売形態、返金条件、特定商取引法に基づく表記まで同じ判断導線で読めます。',
    meta: '社内説明や稟議前の確認材料をまとめて見たい時に向きます。',
  },
  {
    label: '更新',
    title: '更新履歴とお知らせ',
    href: '/update/',
    body: '実装の変化や導入判断に関わる更新を、最近の情報から追えます。',
    meta: '試用前後で前提が変わっていないか確かめるためのページです。',
  },
] as const

const proofScreens = [
  {
    label: '一覧取得',
    title: 'URLを入れると、候補がすぐ並ぶ。',
    body: '記事候補の一覧を先に出して、拾う素材を迷わず選べます。',
    image: media.productImage2,
    alt: '対応URLから記事候補を一覧取得して選択する画面',
  },
  {
    label: '整形設定',
    title: '台本の形と設定を、その場で揃える。',
    body: 'タイトル、セリフ、保存先まで編集前の前提を一気に固められます。',
    image: media.settingsShot,
    alt: '台本整形と設定をまとめて確認できる画面',
  },
  {
    label: '開始直前',
    title: 'YMM4に入る直前の形まで持っていく。',
    body: '編集開始の直前まで前工程を片付けて、作業にそのまま移れます。',
    image: media.productImage1,
    alt: 'YMM4編集開始前の準備が整った画面',
  },
] as const

const homeStructuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteTitle,
    alternateName: siteSubtitle,
    url: siteOrigin,
    inLanguage: 'ja-JP',
    description: siteDescription,
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
    description: '対応URLから台本を取得し、編集向けに整形して YMM4 連携準備まで進められる制作支援ツールです。',
    url: siteOrigin,
    downloadUrl,
    image: media.productImage1,
    screenshot: [media.productImage1, media.productImage2, media.settingsShot],
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
]

export function HomePage() {
  const [activeSceneId, setActiveSceneId] = useState<(typeof workflowScenes)[number]['id']>(
    workflowScenes[0].id,
  )
  const [monthlyVideos] = useState(16)
  const [minutesSaved] = useState(24)

  const activeScene = useMemo(
    () => workflowScenes.find((scene) => scene.id === activeSceneId) ?? workflowScenes[0],
    [activeSceneId],
  )

  const monthlyHours = useMemo(
    () => Number(((monthlyVideos * minutesSaved) / 60).toFixed(1)),
    [monthlyVideos, minutesSaved],
  )
  const yearlyHours = useMemo(() => Number((monthlyHours * 12).toFixed(1)), [monthlyHours])
  const yearlyDays = useMemo(() => Number((yearlyHours / 8).toFixed(1)), [yearlyHours])

  return (
    <>
      <PageMeta
        title="ゆっくりまとめプロセッサー | 台本取得・整形・YMM4編集準備ツール"
        description="ゆっくりまとめプロセッサーは、対応URLからの台本取得、編集向け整形、YMM4 連携準備までを一つの制作ラインとして整理する Windows 向けツールです。試用、使い方、FAQ、料金、法務まで同じ LP 内で確認できます。"
        keywords="ゆっくりまとめプロセッサー, 台本取得, 台本整形, YMM4, Windows, 動画編集ワークフロー"
        image={media.officeLuxury}
        path="/"
        structuredData={homeStructuredData}
      />

      <section className="brand-hero brand-hero--premium homepage-hero homepage-hero--immersive lp-hero">
        <div className="brand-hero__layout lp-hero__layout">
          <div className="lp-hero__copy">
            <p className="brand-kicker">Windows向け / 台本取得・整形 / YMM4編集準備</p>
            <h1 className="brand-title">
              <span>URLを入れるだけで、編集前が終わる。</span>
              <span className="lp-hero__title-accent">台本取得から、YMM4開始直前まで。</span>
            </h1>
            <figure className="lp-hero__mobile-preview">
              <img src={media.productImage2} alt="対応URLから記事一覧を取得して選択する実際の画面" />
              <figcaption>
                <span>実際の画面</span>
                <strong>URL取得 → 記事一覧 → 台本整形 → YMM4準備</strong>
              </figcaption>
            </figure>
            <p className="brand-lead">
              記事候補の取得、台本の整形、編集開始前の準備を一つにまとめた Windows 向けツールです。
              触った瞬間に、次の工程へ進める状態まで持っていけます。
            </p>

            <ActionGroup
              actions={[
                { label: '無料で始める！', href: '/download/', variant: 'primary' },
                { label: '使い方を見る', href: '/instructions/', variant: 'ghost' },
                { label: '導入について問い合わせる', href: '/contact/', variant: 'ghost' },
              ]}
              className="lp-hero__actions"
            />

            <p className="lp-hero__support">
              導入前に確認したい
              <Link to="/instructions/">使い方</Link>、
              <Link to="/faq/">FAQ</Link>、
              <Link to="/purchase/">料金と契約条件</Link>、
              <Link to="/legal/commercial-transactions/">法務情報</Link>
              も同じ導線上で追えます。
            </p>

            <dl className="lp-hero__ledger" data-reveal>
              <div>
                <dt>開始方法</dt>
                <dd>無料でそのまま始められる</dd>
              </div>
              <div>
                <dt>対象環境</dt>
                <dd>Windows / YMM4 実行パス設定</dd>
              </div>
              <div>
                <dt>想定ユーザー</dt>
                <dd>個人制作 / 副業運用 / チーム制作</dd>
              </div>
              <div>
                <dt>販売形態</dt>
                <dd>{legal.pricing.amountIncludingTax} / {legal.pricing.modelLabel}</dd>
              </div>
            </dl>
          </div>

          <HomeHeroStage />
        </div>

      </section>

      <Section className="lp-manifesto-section">
        <div className="lp-fullbleed lp-manifesto" data-reveal>
          <div className="lp-manifesto__hero">
            <div className="lp-manifesto__intro">
              <p className="brand-kicker">前工程を一本道に</p>
              <h2>前工程を一本化する。</h2>
              <p className="lp-manifesto__lede">
                取得、整形、受け渡し準備を横並びで見せて、何をするソフトかを一目で伝えます。
              </p>
            </div>

            <div className="lp-manifesto__aside">
              <p>
                判断が散りやすい前工程を、3つの工程で見える化しています。
              </p>

              <div className="lp-manifesto__signal-list">
                {manifestoSignals.map((item) => (
                  <div key={item.label}>
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                    <small>{item.detail}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lp-manifesto__steps">
            {manifestoSteps.map((step) => (
              <article key={step.id} className="lp-manifesto__step">
                <div className="lp-manifesto__step-copy">
                  <div className="lp-manifesto__step-head">
                    <p className="lp-manifesto__step-index">{step.index}</p>
                    <p className="lp-manifesto__step-label">{step.label}</p>
                  </div>
                  <h3>{step.title}</h3>
                  <p className="lp-manifesto__step-body">{step.body}</p>
                </div>

                <figure className={`lp-manifesto__step-media lp-manifesto__step-media--${step.id}`}>
                  <img src={step.image} alt={step.imageAlt} />
                  <figcaption>{step.caption}</figcaption>
                </figure>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section alt className="lp-editorial-section" id="workflow">
        <div className="brand-shell lp-editorial">
          <div className="lp-editorial__intro">
            <div>
              <p className="brand-kicker">実画面で分かる3ステップ</p>
              <h2>3ステップで流れが分かる。</h2>
            </div>
            <p>
              URL取得から YMM4 準備までを、画面を見れば理解できる構成です。小さい説明文を追わなくても、
              今どこにいるかがひと目で分かります。
            </p>
          </div>

          <ol className="lp-editorial__index">
            {workflowScenes.map((scene) => (
              <li key={scene.id}>
                <button
                  type="button"
                  className={scene.id === activeScene.id ? 'is-active' : undefined}
                  onClick={() => startTransition(() => setActiveSceneId(scene.id))}
                >
                  <span>{`${scene.step} ${scene.label}`}</span>
                  <strong>{scene.nav}</strong>
                  <small>{scene.micro}</small>
                </button>
              </li>
            ))}
          </ol>

          <div className="lp-editorial__stage" data-reveal>
            <figure className="lp-scene__media">
              <img src={activeScene.image} alt={activeScene.imageAlt} />
              <figcaption>{activeScene.label}</figcaption>
            </figure>

            <div className="lp-scene__content">
              <p className="brand-kicker">現在の工程</p>
              <h3>{activeScene.title}</h3>
              <p className="lp-scene__summary">{activeScene.summary}</p>

              <div className="lp-scene__metrics">
                {activeScene.metrics.map(([title, body]) => (
                  <div key={title}>
                    <strong>{title}</strong>
                    <span>{body}</span>
                  </div>
                ))}
              </div>

              <ul className="lp-scene__points">
                {activeScene.points.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <div className="lp-scene__links">
                <Link to="/instructions/">使い方を見る</Link>
                <Link to="/faq/#faq-trouble">トラブルFAQ</Link>
                <Link to="/download/">無料で始める！</Link>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="lp-comparison-section">
        <div className="brand-shell lp-comparison">
          <div className="lp-comparison__intro">
            <p className="brand-kicker">導入前後の変化</p>
            <h2>導入前後の差を見る。</h2>
            <p>取得から整形完了までの準備時間を、導入前後でひと目で比較します。</p>
            <p className="lp-comparison__caption">目安イメージ。実測ではなく、運用差を把握するための比較です。</p>
          </div>

          <div className="lp-comparison__hero-grid">
            <article className="lp-comparison__spotlight" data-reveal>
              <div className="lp-comparison__spotlight-head">
                <div>
                  <span>最も効く変化</span>
                  <h3>1本あたり、{comparisonSpotlight.delta}。</h3>
                </div>
              </div>

              <p className="lp-comparison__spotlight-note">
                {comparisonSpotlight.note} どこを短縮できるかではなく、編集開始までがどれだけ早くなるかを先に見せます。
              </p>

              <div className="lp-comparison__proofline" aria-label={`${comparisonSpotlight.label}の導入前後比較`}>
                <div className="lp-comparison__proofline-track" aria-hidden="true">
                  <div className="lp-comparison__proofline-before" />
                  <div className="lp-comparison__proofline-after" />
                </div>

                <div className="lp-comparison__proofline-values">
                  <div className="lp-comparison__proofline-metric is-before">
                    <span>導入前</span>
                    <strong>
                      {comparisonSpotlight.before.value}
                      <small>{comparisonSpotlight.before.unit}</small>
                    </strong>
                  </div>

                  <div className="lp-comparison__proofline-delta" aria-label={`差分 ${comparisonSpotlight.delta}`}>
                    <span>{comparisonSpotlight.delta}</span>
                    <small>{comparisonSpotlight.rate}</small>
                  </div>

                  <div className="lp-comparison__proofline-metric is-after">
                    <span>導入後</span>
                    <strong>
                      {comparisonSpotlight.after.value}
                      <small>{comparisonSpotlight.after.unit}</small>
                    </strong>
                  </div>
                </div>
              </div>

              <div className="lp-comparison__spotlight-stats">
                <div className="lp-comparison__spotlight-stat is-primary">
                  <span>見えている成果</span>
                  <strong>{comparisonSpotlight.delta}</strong>
                  <small>前工程の時短</small>
                </div>

                <div className="lp-comparison__spotlight-stat is-primary">
                  <span>短縮率</span>
                  <strong>{comparisonSpotlight.rate}</strong>
                  <small>導入前比</small>
                </div>

                <div className="lp-comparison__spotlight-stat is-primary">
                  <span>対象</span>
                  <strong>{comparisonSpotlight.label}</strong>
                  <small>取得から整形まで</small>
                </div>
              </div>
            </article>

            <aside className="lp-impact-ledger" data-reveal>
              <div className="lp-impact-ledger__head">
                <p className="brand-kicker">時間試算</p>
                <h3>年間で、{yearlyHours}時間浮く。</h3>
              </div>

              <div className="lp-impact-ledger__hero">
                <strong>{yearlyHours} 時間</strong>
                <span>月{monthlyVideos}本、1本{minutesSaved}分短縮した想定</span>
              </div>

              <div className="lp-impact-ledger__numbers">
                <div>
                  <span>月間</span>
                  <strong>{monthlyHours} 時間</strong>
                </div>
                <div>
                  <span>年間</span>
                  <strong>{yearlyHours} 時間</strong>
                </div>
                <div>
                  <span>8時間換算</span>
                  <strong>{yearlyDays} 日</strong>
                </div>
              </div>

              <div className="lp-impact-ledger__assumptions">
                <div className="lp-impact-ledger__assumption">
                  <span>想定制作本数</span>
                  <strong>{monthlyVideos}本 / 月</strong>
                </div>
                <div className="lp-impact-ledger__assumption">
                  <span>1本あたり短縮</span>
                  <strong>{minutesSaved}分</strong>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </Section>

      <Section alt className="lp-atlas-section">
        <div className="lp-fullbleed lp-atlas" data-reveal>
          <div className="lp-atlas__lead">
            <p className="brand-kicker">向いている人</p>
            <h2>向いている運用が分かる。</h2>
            <p>
              個人、少人数、チームでは困る場所が違います。用途別に入口を分けて、自分に関係ある導線を早く見つけやすくしています。
            </p>
          </div>

          <figure className="lp-atlas__hero">
            <img src={media.externalVideoEditorDark} alt="暗い編集室で動画編集を進める制作環境" />
            <figcaption>
              <span>向いている運用</span>
              <strong>個人制作でも、引き継ぎがある運用でも、前工程の揺れを減らしたい時に向く。</strong>
            </figcaption>
          </figure>

          <div className="lp-atlas__list">
            {scenarioAtlas.map((item, index) => (
              <article key={item.title} className="lp-atlas__item">
                <span className="lp-atlas__index">{`0${index + 1}`}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <p>{item.note}</p>
                <Link to={item.href}>{item.linkLabel}</Link>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section className="lp-proofstream-section lp-proofstream-section--legacy">
        <div className="brand-shell lp-proofstream">
          <div className="lp-proofstream__copy">
            <p className="brand-kicker">導入前に見るページ</p>
            <h2>次に見るページが分かる。</h2>
            <p>
              ボタンを並べるだけでなく、各ページで何を確認できるかを文章で先に示しています。
            </p>

            <div className="lp-proofstream__routes">
              {proofRoutes.map((route) => (
                <article key={route.title} className="lp-proofstream__route">
                  <span>{route.label}</span>
                  <h3>
                    <Link to={route.href}>{route.title}</Link>
                  </h3>
                  <p>{route.body}</p>
                  <p className="lp-proofstream__route-meta">{route.meta}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="lp-proofstream__aside" data-reveal>
            <p className="brand-kicker">最近の更新情報</p>
            <h3>最近の更新</h3>
            <ul className="lp-proofstream__news">
              {newsPosts.map((post) => (
                <li key={post.path}>
                  <time dateTime={post.date}>{post.dateLabel}</time>
                  <Link to={post.path}>{post.title}</Link>
                </li>
              ))}
            </ul>
            <p className="lp-proofstream__aside-copy">
              試用の前後で判断材料が変わったときは、更新履歴とお知らせを合わせて確認するとズレが出にくくなります。
            </p>
          </div>
        </div>
      </Section>

      <Section className="lp-proofstream-showcase-section">
        <div className="brand-shell lp-proofstream-showcase" data-reveal>
          <div className="lp-proofstream-showcase__copy">
            <p className="brand-kicker">実画面で引き込む</p>
            <h2>触る前に、流れが目に入る。</h2>
            <p>
              説明ページを読む前に、一覧取得、整形設定、開始直前の3画面を大きく見せます。
            </p>
          </div>

          <div className="lp-proofstream-showcase__grid">
            {proofScreens.map((screen) => (
              <article key={screen.title} className="lp-proofstream-showcase__card interactive-surface">
                <figure className="lp-proofstream-showcase__media">
                  <img src={screen.image} alt={screen.alt} />
                </figure>
                <div className="lp-proofstream-showcase__body">
                  <span>{screen.label}</span>
                  <h3>{screen.title}</h3>
                  <p>{screen.body}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="lp-proofstream-showcase__footer">
            <div className="lp-proofstream-showcase__newsline">
              <span>最近の更新</span>
              <strong>{newsPosts[0]?.title}</strong>
            </div>
            <ActionGroup
              actions={[
                { label: '使い方を見る', href: '/instructions/', variant: 'ghost' },
                { label: 'FAQを見る', href: '/faq/', variant: 'ghost' },
                { label: '購入情報を見る', href: '/purchase/', variant: 'ghost' },
              ]}
            />
          </div>
        </div>
      </Section>

      <Section alt className="lp-finale-section">
        <div className="lp-fullbleed lp-finale" data-reveal>
          <div className="lp-finale__copy">
            <p className="brand-kicker">まず試す</p>
            <h2>まず無料で始める。</h2>
            <div className="lp-finale__display">使ってから、導入を決める。</div>
            <p>
              使い方、FAQ、法務、サポートまで先に見せることで、最後の CTA を押す時点で不安が残りにくい構成にしています。
            </p>
            <p>
              まず始めるなら <Link to="/download/">無料で始める！</Link>、
              実運用の流れを見たいなら <Link to="/instructions/">使い方</Link>、
              導入前提を相談したいなら <Link to="/contact/">お問い合わせ</Link> へ進んでください。
            </p>
          </div>

          <div className="lp-finale__meta">
            <dl>
              <div>
                <dt>トライアル</dt>
                <dd>7日間 / 全機能を確認</dd>
              </div>
              <div>
                <dt>価格</dt>
                <dd>{legal.pricing.amountIncludingTax}</dd>
              </div>
              <div>
                <dt>販売形態</dt>
                <dd>{legal.pricing.modelLabel}</dd>
              </div>
              <div>
                <dt>サポート</dt>
                <dd>{legal.support.firstResponseSla}</dd>
              </div>
            </dl>

            <ActionGroup
              actions={[
                { label: '無料で始める！', href: '/download/', variant: 'primary' },
                { label: '使い方を見る', href: '/instructions/', variant: 'ghost' },
                { label: '導入について問い合わせる', href: '/contact/', variant: 'ghost' },
              ]}
            />
          </div>
        </div>
      </Section>
    </>
  )
}
