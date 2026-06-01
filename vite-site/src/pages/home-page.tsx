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
} from 'lucide-react'

const heroBadges = ['Windows専用', 'YMM4向け', '20以上の対応サイト', 'Freeあり', 'Premium買い切り'] as const

const flowItems = [
  { label: '入力', value: '記事URL・スレッドURL' },
  { label: '整理', value: '台本候補・AI補助' },
  { label: '出力', value: 'CSV・.ymmp前準備' },
] as const

const proofItems = [
  '対応サイトから台本候補を取得',
  '不要行を整理して読み上げ向けに調整',
  'CSV / .ymmp / キャラ設定を確認',
  'YouTube分析とコメント取得も利用可能',
] as const

const goalMapItems = [
  {
    step: '01',
    title: '最新版を入手する',
    goal: '公式ZIPを取得し、Windowsでアプリを起動できる状態にします。',
    output: '初期設定へ進める',
    link: { label: 'ダウンロードへ', href: '/download/', external: false },
    Icon: Download,
  },
  {
    step: '02',
    title: 'YMM4パスと保存先を決める',
    goal: 'YMM4.exe、CSV/.ymmp保存先、必要なAPIキーを先に固定します。',
    output: '出力先の迷いを減らす',
    link: { label: '手順を見る', href: '/instructions/', external: false },
    Icon: Monitor,
  },
  {
    step: '03',
    title: 'URLから候補を取得する',
    goal: '記事URL・スレッドURLを入れ、タイトルやサムネイルが候補一覧に出るか確認します。',
    output: '台本候補を選べる',
    link: { label: '実画面を見る', href: '/samples/', external: false },
    Icon: FileSearch,
  },
  {
    step: '04',
    title: '台本下地を整える',
    goal: '不要行、役割、感情、長すぎる文を見直し、読み上げ前に確認できる形へ寄せます。',
    output: '確認済みの台本下地',
    link: { label: '使い方を見る', href: '/instructions/', external: false },
    Icon: PencilLine,
  },
  {
    step: '05',
    title: 'YMM4前準備を通す',
    goal: 'CSV/.ymmp、キャラ設定、素材パス、保存先を確認してからYMM4側へ進みます。',
    output: '編集前のファイル準備',
    link: { label: 'サンプルを見る', href: '/samples/', external: false },
    Icon: Monitor,
  },
  {
    step: '06',
    title: 'FreeかPremiumか判断する',
    goal: 'Freeで流れを試し、台本取得とAI台本生成の制限解除が必要なら買い切りを検討します。',
    output: '継続利用の判断',
    link: { label: '料金を見る', href: '/purchase/', external: false },
    Icon: CreditCard,
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
            <h1 id="home-focus-heading">記事URL・スレッドURLから、台本下地とYMM4前準備を作る</h1>
            <p className="home-focus-lead">
              対応URLを入れると、台本候補の取得、AI補助、CSV/.ymmp前準備まで進められます。
              YMM4を開く前の作業を短く、確認しやすくするためのツールです。
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
          </div>

          <figure className="home-focus-visual">
            <img src="/product_get_script.webp" alt="記事URLから台本候補を取得する実アプリ画面" />
            <figcaption>
              <strong>実アプリ画面</strong>
              URL入力から候補取得までを確認できます
            </figcaption>
          </figure>
        </section>

        <section className="home-focus-proof" aria-label="主な機能">
          {proofItems.map((item) => (
            <div key={item}>
              <BadgeCheck size={17} />
              <span>{item}</span>
            </div>
          ))}
        </section>

        <section className="home-focus-section home-focus-goal-map" aria-labelledby="home-goal-map-heading">
          <div className="home-focus-section__head">
            <p className="home-focus-kicker">使ってできるまでの目標</p>
            <h2 id="home-goal-map-heading">最初の1本を作る前に、ここまで確認する</h2>
            <p>
              いきなり購入判断をせず、Freeで起動、設定、URL取得、台本整理、YMM4前準備まで順番に通します。
            </p>
          </div>

          <div className="home-focus-goal-grid">
            {goalMapItems.map((item) => {
              const GoalIcon = item.Icon
              return (
                <article key={item.step} className="home-focus-goal-card">
                  <div className="home-focus-goal-card__top">
                    <span>{item.step}</span>
                    <GoalIcon size={19} aria-hidden="true" />
                  </div>
                  <h3>{item.title}</h3>
                  <dl>
                    <div>
                      <dt>やること</dt>
                      <dd>{item.goal}</dd>
                    </div>
                    <div>
                      <dt>成功状態</dt>
                      <dd>{item.output}</dd>
                    </div>
                  </dl>
                  <Link to={item.link.href}>
                    {item.link.label}
                    <ArrowRight size={15} />
                  </Link>
                </article>
              )
            })}
          </div>
        </section>

        <section className="home-focus-section" aria-labelledby="home-flow-heading">
          <div className="home-focus-section__head">
            <p className="home-focus-kicker">実画面で流れを見る</p>
            <h2 id="home-flow-heading">URL入力からYMM4前準備まで、3つの画面で確認できます</h2>
          </div>

          <div className="home-focus-screen-grid">
            {workflowSteps.map((step) => {
              const StepIcon = step.Icon
              return (
                <article key={step.step} className="home-focus-screen-card">
                  <img src={step.image} alt={step.alt} loading="lazy" decoding="async" />
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
            <h2 id="home-decision-heading">Freeで試して、必要ならPremiumで制限解除</h2>
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
          <div>
            <p className="home-focus-kicker">まずは無料で確認</p>
            <h2 id="home-final-heading">自分のURLで、台本下地とYMM4前準備まで試してください</h2>
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
