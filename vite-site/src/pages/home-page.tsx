import { Link } from 'react-router-dom'
import { PageMeta } from '@/components/ui'
import { downloadUrl, legal, siteOrigin, siteTitle } from '@/data/site-content'
import {
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Download,
  FileSearch,
  HelpCircle,
  Monitor,
  PencilLine,
} from 'lucide-react'

const heroBadges = ['Windows専用', 'YMM4前提', '無料で試せる'] as const

const flowItems = [
  { label: '入れるもの', value: '記事URL / スレッドURL / まとめ記事' },
  { label: '作るもの', value: '台本下地 / CSV / .ymmp前準備' },
  { label: '次にやること', value: 'YMM4で音声・字幕を調整' },
] as const

const inputOutputCards = [
  {
    label: '入力',
    title: '記事URL・スレッドURLを入れる',
    body: '対応URLから題材候補を取得し、動画化する本文や画像候補を確認します。',
    points: ['記事URL', 'スレッドURL', 'まとめ記事'],
  },
  {
    label: '出力',
    title: '台本下地とYMM4前準備を作る',
    body: '読み上げ前の台本、CSV、.ymmp前準備、保存先や素材パスの確認へ進めます。',
    points: ['台本下地', 'CSV', '.ymmp前準備'],
  },
  {
    label: '前提',
    title: '動画完成はYMM4で仕上げる',
    body: '音声、字幕、立ち絵、間合いはYMM4側で確認します。まずFreeで流れを試せます。',
    points: ['Windows専用', 'YMM4前提', 'Premiumは制限解除'],
  },
] as const

const goalMapItems = [
  {
    step: '01',
    title: 'URLを入れる',
    goal: '記事URL・スレッドURLを入力',
    output: '候補一覧が出る',
    link: { label: '実画面を見る', href: '/samples/', external: false },
    Icon: FileSearch,
  },
  {
    step: '02',
    title: '台本下地を整える',
    goal: '不要行と長い文を見直す',
    output: '読み上げ前に確認できる',
    link: { label: '使い方を見る', href: '/instructions/', external: false },
    Icon: PencilLine,
  },
  {
    step: '03',
    title: 'YMM4前準備を通す',
    goal: 'CSV/.ymmpと素材パスを確認',
    output: 'YMM4側へ進める',
    link: { label: 'サンプルを見る', href: '/samples/', external: false },
    Icon: Monitor,
  },
] as const

const workflowSteps = [
  {
    step: '1',
    title: 'URLを入れる',
    body: '記事、スレッド、まとめ記事のURLを入力し、動画化する候補を一覧で確認します。',
    image: '/product_get_script.webp',
    alt: '記事URLから候補を取得する実アプリ画面',
    Icon: FileSearch,
  },
  {
    step: '2',
    title: '台本下地を整える',
    body: '不要行、役割、感情、読み上げ向けの区切りを見ながら、使える下書きに寄せます。',
    image: '/product_edit_script.webp',
    alt: '台本を編集してYMM4向けに整える実アプリ画面',
    Icon: PencilLine,
  },
  {
    step: '3',
    title: 'YMM4前準備を確認する',
    body: 'CSV、キャラ設定、立ち絵パス、保存先を確認してから編集に入れます。',
    image: '/product_keyword_material.webp',
    alt: 'YMM4前準備と素材整理の実アプリ画面',
    Icon: Monitor,
  },
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
    body: '台本取得とAI台本生成の利用制限を解除します。月額自動更新はありません。',
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
    question: '動画は自動で完成しますか？',
    answer: 'いいえ。YMM4を開く前の台本下地と編集準備を支援するツールです。',
  },
  {
    question: 'Premiumで何が解除されますか？',
    answer: '台本取得とAI台本生成の利用制限を解除します。購入はアプリ内のStripe Checkoutから行います。',
  },
] as const

const finalRouteCards = [
  {
    title: '実画面を見る',
    body: 'URL入力、台本整理、YMM4前準備の画面とBefore/Afterを確認します。',
    href: '/samples/',
    Icon: Monitor,
  },
  {
    title: '配布物を確認',
    body: '最新版インストーラー、ポータブルZIP、ファイル情報、初回起動、導入完了チェックを確認します。',
    href: '/download/',
    Icon: Download,
  },
  {
    title: '使い方を見る',
    body: '自分のURLで試す前に、設定と操作手順を順番に確認します。',
    href: '/instructions/',
    Icon: PencilLine,
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
        title="ゆっくりまとめプロセッサー｜記事URLから台本下地とYMM4前準備を作成"
        description="記事URL・スレッドURLから、ゆっくり動画の台本下地とYMM4前準備を作成。5ch・あにまん等の素材取得、AI台本補助、CSV/.ymmp整理までWindowsで確認できます。無料プランあり。"
        keywords="ゆっくりまとめプロセッサー,YMM4,台本作成,CSV,.ymmp,反応集,5ch,あにまん,ゆっくり解説"
        path="/"
        structuredData={softwareApplicationLd}
      />

      <div className="home-focus">
        <section className="home-focus-hero" aria-labelledby="home-focus-heading">
          <div className="home-focus-hero__copy">
            <p className="home-focus-kicker">YMM4向け Windows制作支援ツール</p>
            <h1 id="home-focus-heading">記事URL・スレッドURLから、ゆっくり動画の台本下地とYMM4前準備を作る</h1>
            <p className="home-focus-lead">
              記事URLやスレッドURLを入れると、候補取得、台本整理、CSV/.ymmp前準備まで進められます。
              最終編集はYMM4で行います。
            </p>

            <div className="home-focus-actions">
              <a className="home-focus-btn home-focus-btn--primary" href={downloadUrl} target="_blank" rel="noopener noreferrer">
                <Download size={18} />
                無料でダウンロード
              </a>
              <Link className="home-focus-btn home-focus-btn--ghost" to="/samples/">
                実画面を見る
              </Link>
            </div>

          </div>

          <figure className="home-focus-visual">
            <img
              src="/product_get_script.webp"
              alt="記事URLから台本候補を取得する実アプリ画面"
              loading="eager"
              decoding="async"
            />
            <figcaption>
              <strong>実アプリ画面</strong>
              URL入力から候補一覧までを確認できます
            </figcaption>
          </figure>

          <div className="home-focus-badges" role="list" aria-label="対応条件">
            {heroBadges.map((badge) => (
              <span key={badge} role="listitem">
                <CheckCircle2 size={15} />
                {badge}
              </span>
            ))}
          </div>

          <div className="home-focus-flow" aria-label="入力から出力まで">
            {flowItems.map((item, index) => (
              <div key={item.label} className="home-focus-flow__item">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
                {index < flowItems.length - 1 ? <ArrowRight size={17} aria-hidden="true" /> : null}
              </div>
            ))}
          </div>
        </section>

        <section className="home-focus-io" aria-labelledby="home-io-heading">
          <div className="home-focus-section__head home-focus-section__head--left">
            <p className="home-focus-kicker">入力から出力まで</p>
            <h2 id="home-io-heading">何を入れると、何ができるかを先に確認する</h2>
          </div>
          <div className="home-focus-io__grid">
            {inputOutputCards.map((item) => (
              <article key={item.label} className="home-focus-io__card">
                <span>{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <ul>
                  {item.points.map((point) => (
                    <li key={point}>
                      <CheckCircle2 size={15} />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="home-focus-section home-focus-goal-map" aria-labelledby="home-goal-map-heading">
          <div className="home-focus-section__head">
            <p className="home-focus-kicker">無料で確認する目標</p>
            <h2 id="home-goal-map-heading">自分のURLで試す前に見る3ステップ</h2>
            <p>
              Freeで実URLを試し、候補取得、台本整理、YMM4前準備まで通してから購入を判断できます。
            </p>
          </div>

          <ol className="home-focus-goal-list">
            {goalMapItems.map((item) => {
              const GoalIcon = item.Icon
              return (
                <li key={item.step} className="home-focus-goal-card">
                  <div className="home-focus-goal-card__top">
                    <span>{item.step}</span>
                    <GoalIcon size={19} aria-hidden="true" />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.goal}</p>
                  <strong>{item.output}</strong>
                  <Link to={item.link.href}>
                    {item.link.label}
                    <ArrowRight size={15} />
                  </Link>
                </li>
              )
            })}
          </ol>
        </section>

        <section className="home-focus-section" aria-labelledby="home-flow-heading">
          <div className="home-focus-section__head">
            <p className="home-focus-kicker">実画面で流れを見る</p>
            <h2 id="home-flow-heading">URL入力、台本整理、YMM4前準備を実画面で確認する</h2>
          </div>

          <div className="home-focus-screen-grid">
            {workflowSteps.map((step) => {
              const StepIcon = step.Icon
              return (
                <article key={step.step} className="home-focus-screen-card">
                  <img src={step.image} alt={step.alt} loading="eager" decoding="async" />
                  <div>
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

        <section className="home-focus-section home-focus-section--decision" aria-labelledby="home-decision-heading">
          <div className="home-focus-section__head home-focus-section__head--left">
            <p className="home-focus-kicker">料金と前提確認</p>
            <h2 id="home-decision-heading">無料で試して、必要な時だけPremiumで制限解除</h2>
            <p>
              先に無料で起動とURL取得を確認できます。購入判断に必要な価格、支払い、返金条件は料金ページにまとめています。
            </p>
          </div>

          <div className="home-focus-plans">
            {planCards.map((plan) => (
              <article key={plan.name} className={`home-focus-plan home-focus-plan--${plan.name.toLowerCase()}`}>
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

          <aside className="home-focus-faq" aria-labelledby="home-faq-heading">
            <div className="home-focus-faq__head">
              <HelpCircle size={18} />
              <h2 id="home-faq-heading">導入前の確認</h2>
            </div>
            {faqPreview.map((item) => (
              <article key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
            <Link to="/faq/">
              FAQを見る
              <ArrowRight size={16} />
            </Link>
          </aside>
        </section>

        <section className="home-focus-final" aria-labelledby="home-final-heading">
          <div className="home-focus-final__copy">
            <p className="home-focus-kicker">まずは無料で確認</p>
            <h2 id="home-final-heading">画面と手順を見てから、自分のURLで試す</h2>
            <p>
              画面の流れ、配布物、操作手順を見てからFreeで動作確認してください。
              Premiumは、制限解除が必要だと分かってから判断できます。
            </p>
          </div>

          <div className="home-focus-final__routes" aria-label="次に確認するページ">
            {finalRouteCards.map((route) => {
              const RouteIcon = route.Icon
              return (
                <Link key={route.title} to={route.href}>
                  <span aria-hidden="true">
                    <RouteIcon size={17} />
                  </span>
                  <strong>{route.title}</strong>
                  <small>{route.body}</small>
                </Link>
              )
            })}
          </div>

          <div className="home-focus-actions">
            <a className="home-focus-btn home-focus-btn--primary" href={downloadUrl} target="_blank" rel="noopener noreferrer">
              <Download size={18} />
              無料でダウンロード
            </a>
            <Link className="home-focus-btn home-focus-btn--ghost" to="/purchase/">
              <CreditCard size={18} />
              料金を見る
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
