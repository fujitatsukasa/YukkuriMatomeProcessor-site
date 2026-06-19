import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { PageMeta } from '@/components/ui'
import {
  downloadUrl,
  faqGroups,
  legal,
  siteOrigin,
  siteTitle,
} from '@/data/site-content'
import {
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Download,
  ExternalLink,
  FileCode2,
  FileText,
  Gauge,
  HelpCircle,
  Laptop,
  Layers3,
  MonitorPlay,
  Play,
  SearchCheck,
  ShieldCheck,
  TriangleAlert,
} from 'lucide-react'
import './home-page.css'

const proofChips = [
  'Windows 10 / 11',
  'YMM4前提',
  'Freeあり',
  '39,800円 買い切り',
  '月額なし',
] as const

const heroFlowItems = [
  { label: '型', value: '動画の形式を選ぶ' },
  { label: '編集', value: '台本・素材を整える' },
  { label: '出力', value: 'YMM4へ反映' },
] as const

const answerCards = [
  {
    label: '作れる',
    title: '反応集・解説・ショートに使える',
    body: '動画の型を選んで、台本と素材を編集しやすい状態へ持っていきます。',
    Icon: Layers3,
  },
  {
    label: '直せる',
    title: '台本と素材を見ながら整える',
    body: '会話順、不要行、読み上げ量、素材パスを見て、編集前の手戻りを減らします。',
    Icon: FileText,
  },
  {
    label: '進める',
    title: 'YMM4反映と動画作成へ進む',
    body: '設定反映、.ymmp前準備、動画作成ボタンまで同じ流れで進めます。',
    Icon: MonitorPlay,
  },
] as const

const workflowSteps = [
  {
    step: '01',
    title: '動画の型を決める',
    body: '反応集、解説、ショート、まとめなど、作る形式に合わせて始めます。',
    image: '/lp/screen-main-guide-v2.webp',
    alt: '動画編集の入口を確認する実アプリガイド画面',
    Icon: Layers3,
  },
  {
    step: '02',
    title: '台本と素材を直す',
    body: '会話順、不要行、役割、読み上げ量、素材パスを見て直します。',
    image: '/lp/screen-main-script-edit-v2.webp',
    alt: '台本編集画面で取得結果とボードを確認している実アプリ画面',
    Icon: FileText,
  },
  {
    step: '03',
    title: '設定を反映する',
    body: 'CSV、.ymmp前準備、保存先、素材パスをまとめてYMM4へつなぎます。',
    image: '/lp/screen-main-board-v2.webp',
    alt: 'YMM4前準備に使うボード画面の実アプリスクリーンショット',
    Icon: FileCode2,
  },
  {
    step: '04',
    title: '動画作成へ進める',
    body: 'YMM4で音声、字幕、立ち絵、間合いを確認して仕上げます。',
    image: '/lp/screen-main-get-scripts-v2.webp',
    alt: '素材取り込みと動画制作の準備画面を確認する実アプリスクリーンショット',
    Icon: MonitorPlay,
  },
] as const

const blueprintSteps = [
  {
    step: '01',
    title: '型を選ぶ',
    body: '作りたい動画の形式を決めて、編集に入る。',
    output: '編集開始',
    Icon: Layers3,
    tone: 'cyan',
  },
  {
    step: '02',
    title: '台本を直す',
    body: '会話順、不要行、役割、読み上げ量を整える。',
    output: '台本編集',
    Icon: FileText,
    tone: 'blue',
  },
  {
    step: '03',
    title: '素材を揃える',
    body: '保存先、素材パス、CSV、.ymmp前準備をまとめる。',
    output: '反映準備',
    Icon: FileCode2,
    tone: 'green',
  },
  {
    step: '04',
    title: 'YMM4で作る',
    body: '反映後に音声、字幕、素材、間合いを見て仕上げる。',
    output: '動画作成',
    Icon: MonitorPlay,
    tone: 'gold',
  },
] as const

const galleryItems = [
  {
    title: '素材取り込み',
    body: 'URLを使う場合に、候補を取り込む画面です。',
    image: '/lp/screen-main-get-scripts-v2.webp',
    alt: '台本取得画面の実アプリスクリーンショット',
  },
  {
    title: '台本編集',
    body: '台本と画面構成を見ながら直す画面です。',
    image: '/lp/screen-main-script-edit-v2.webp',
    alt: '台本編集画面の実アプリスクリーンショット',
  },
  {
    title: '台本生成の確認',
    body: '題材から台本案を作り、使う前に直す画面です。',
    image: '/lp/screen-main-script-gen-v2.webp',
    alt: 'AI台本生成結果を確認する実アプリスクリーンショット',
  },
  {
    title: 'ランチャー',
    body: '更新、ログイン、Premium状態を見る画面です。',
    image: '/lp/screen-launcher-update-dialog-v2.webp',
    alt: 'ランチャーの更新確認ダイアログを切り出した実アプリスクリーンショット',
  },
] as const

const planCards = [
  {
    name: 'Free',
    price: '¥0',
    lead: 'まず編集の流れを試す',
    points: ['起動できるか見る', '台本と素材を触る', 'YMM4前準備まで触る', '動画作成までの導線を確認'],
    href: downloadUrl,
    cta: '無料でダウンロード',
    external: true,
    Icon: Download,
  },
  {
    name: 'Premium',
    price: '¥39,800',
    lead: '税込 / 買い切り / 月額なし',
    points: ['台本取得の制限解除', 'AI台本生成の制限解除', '動画作成の制限解除', '本数が増えた時向け'],
    href: '/purchase/',
    cta: '料金と条件を見る',
    external: false,
    Icon: CreditCard,
  },
] as const

const trustItems = [
  { title: 'Windows専用', body: 'Windows 10 / 11。Mac、スマホだけでは使えません。', Icon: Laptop },
  { title: 'YMM4が必要', body: 'YMM4で仕上げる前提です。YMM4なしで動画完成までは進みません。', Icon: MonitorPlay },
  { title: '投稿前に見る', body: '出典、引用、素材、音声、投稿判断は、投稿前に自分で見ておきます。', Icon: ShieldCheck },
  { title: '成果保証なし', body: '収益化、再生数、審査通過は保証しません。', Icon: TriangleAlert },
] as const

const priorityQuestions = [
  '無料版では何ができますか？',
  'Premiumで何が解除されますか？',
  '動画は自動で完成しますか？',
  'Windows専用ですか？',
  'YMM4は必須ですか？',
  '収益化は保証されますか？',
] as const

const allFaqItems = faqGroups.flatMap((group) => group.items)
const priorityFaqItems = priorityQuestions
  .map((question) => allFaqItems.find((item) => item.question === question))
  .filter((item): item is (typeof allFaqItems)[number] => Boolean(item))

const softwareApplicationLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: siteTitle,
  applicationCategory: 'MultimediaApplication',
  operatingSystem: 'Windows 10, Windows 11',
  url: `${siteOrigin}/`,
  downloadUrl: `${siteOrigin}/download/`,
  description:
    '台本作成、素材整理、YMM4向け出力、動画作成までの導線をまとめて進めるWindows向け動画制作支援ツールです。',
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

function CtaLink({
  href,
  children,
  className,
  external = false,
}: {
  href: string
  children: ReactNode
  className: string
  external?: boolean
}) {
  if (external || href.startsWith('http')) {
    return (
      <a className={className} href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }

  return (
    <Link className={className} to={href} discover="none">
      {children}
    </Link>
  )
}

function SectionHead({
  kicker,
  title,
  body,
  align = 'center',
}: {
  kicker: string
  title: string
  body?: string
  align?: 'center' | 'split'
}) {
  return (
    <div className={`lp2-section-head lp2-section-head--${align}`}>
      <div>
        <p className="lp2-kicker">{kicker}</p>
        <h2>{title}</h2>
      </div>
      {body ? <p>{body}</p> : null}
    </div>
  )
}

function WorkRangePanel() {
  return (
    <div className="lp2-blueprint" data-reveal aria-label="YMM4前の下ごしらえワークフロー">
      <div className="lp2-blueprint__header">
        <span>作業範囲</span>
        <strong>YMM4前の準備</strong>
      </div>
      <ol className="lp2-blueprint__track">
        {blueprintSteps.map((item, index) => {
          const Icon = item.Icon
          return (
            <li className={`lp2-blueprint-card lp2-blueprint-card--${item.tone}`} key={item.step}>
              <div className="lp2-blueprint-card__top">
                <span>{item.step}</span>
                <Icon size={24} aria-hidden="true" />
              </div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <strong>{item.output}</strong>
              {index < blueprintSteps.length - 1 ? <ArrowRight className="lp2-blueprint-card__arrow" size={26} aria-hidden="true" /> : null}
            </li>
          )
        })}
      </ol>
      <div className="lp2-blueprint__footer">
        <ShieldCheck size={20} aria-hidden="true" />
        <strong>動画はYMM4で仕上げる</strong>
        <span>公開前の下地とYMM4前準備まで。最後はYMM4で確認します。</span>
      </div>
    </div>
  )
}

export function HomePage() {
  return (
    <>
      <PageMeta
        title="ゆっくりまとめプロセッサー｜30秒で動画編集を始めるWindowsツール"
        description="反応集、解説、ショート、まとめ動画など。台本作成、素材整理、YMM4向け出力、動画作成までの導線をまとめるWindows向け動画制作支援ツールです。"
        keywords="ゆっくりまとめプロセッサー,YMM4,動画編集,動画作成,台本作成,素材整理,反応集,解説動画,ショート動画,Windows"
        image="/lp/screen-main-script-edit-v2.webp"
        path="/"
        structuredData={softwareApplicationLd}
      />

      <main className="lp2-home">
        <section className="lp2-hero" aria-labelledby="lp2-hero-heading">
          <div className="lp2-container lp2-hero__grid">
            <div className="lp2-hero__copy" data-reveal>
              <p className="lp2-kicker">動画編集支援ツール / Windows + YMM4</p>
              <h1 id="lp2-hero-heading">
                <span>いろんな動画</span>
                <span>30秒で</span>
                <span>編集開始</span>
              </h1>
              <p className="lp2-hero__lead">
                反応集、解説、ショート、まとめ動画。テンプレを選び、台本と素材を整え、YMM4へ反映。
                動画完成を約束するツールではなく、編集に入るまでを短くする制作支援ツールです。
              </p>
              <div className="lp2-hero-io" aria-label="動画編集開始までの流れ">
                {heroFlowItems.map((item, index) => (
                  <div className="lp2-hero-io__item" key={item.label}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                    {index < heroFlowItems.length - 1 ? <ArrowRight size={17} aria-hidden="true" /> : null}
                  </div>
                ))}
              </div>
              <div className="lp2-hero__actions">
                <a className="lp2-btn lp2-btn--primary" href={downloadUrl} target="_blank" rel="noopener noreferrer">
                  <Download size={18} aria-hidden="true" />
                  無料でダウンロード
                </a>
                <a className="lp2-btn lp2-btn--ghost" href="#lp2-demo">
                  <Play size={18} aria-hidden="true" />
                  先に画面を見る
                </a>
              </div>
              <ul className="lp2-proof-list" aria-label="導入前に確認する前提">
                {proofChips.map((chip) => (
                  <li key={chip}>
                    <CheckCircle2 size={15} aria-hidden="true" />
                    {chip}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lp2-hero__visual" data-reveal>
              <div className="lp2-hero__visual-note lp2-hero__visual-note--input" aria-hidden="true">
                <span>動画の型</span>
                <strong>反応集 / 解説 / ショート / まとめ</strong>
              </div>
              <figure className="lp2-product-frame lp2-product-frame--hero">
                <div className="lp2-product-frame__bar" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <strong>実アプリ / 台本編集</strong>
                </div>
                <img
                  src="/lp/screen-main-script-edit-v2.webp"
                  alt="ゆっくりまとめプロセッサーの台本編集画面"
                  loading="eager"
                  decoding="async"
                />
                <figcaption>
                  <span>実アプリ画面</span>
                  <strong>台本と素材を見ながら、動画作成へ進める。</strong>
                </figcaption>
              </figure>
              <div className="lp2-hero__visual-note lp2-hero__visual-note--output" aria-hidden="true">
                <span>YMM4連携</span>
                <strong>設定反映 / .ymmp / 動画作成へ</strong>
              </div>
              <div className="lp2-flow-strip" aria-label="主な流れ">
                {heroFlowItems.map((item, index) => (
                  <span key={item.label}>
                    {item.value}
                    {index < heroFlowItems.length - 1 ? <ArrowRight size={16} aria-hidden="true" /> : null}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="lp2-hero__peek" aria-hidden="true">
            <span>作る流れ</span>
            <strong>型を選ぶ、台本を整える、YMM4へ反映</strong>
          </div>
        </section>

        <section className="lp2-band lp2-band--answers" aria-labelledby="lp2-answers-heading">
          <div className="lp2-container">
            <SectionHead
              kicker="30秒で編集開始へ"
              title="何の動画を作るかから始める。"
              body="反応集、解説、ショート、まとめ。作りたい形式を選んで、台本と素材を揃え、YMM4で仕上げます。"
              align="split"
            />
            <div className="lp2-answer-grid">
              {answerCards.map((item) => {
                const Icon = item.Icon
                return (
                  <article className="lp2-answer-card" key={item.title} data-reveal>
                    <span className="lp2-answer-card__label">{item.label}</span>
                    <Icon size={28} aria-hidden="true" />
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="lp2-band lp2-band--diagram" aria-labelledby="lp2-diagram-heading">
          <div className="lp2-container lp2-diagram-layout">
            <div className="lp2-diagram-copy" data-reveal>
              <p className="lp2-kicker">作業範囲</p>
              <h2 id="lp2-diagram-heading">YMM4に入る前で迷わない。</h2>
              <p>
                動画の型を選ぶ、台本を直す、保存先や素材パスを揃える。
                編集前に散らかりやすいところをまとめます。
              </p>
              <div className="lp2-note-panel">
                <ShieldCheck size={20} aria-hidden="true" />
                <strong>動画まで自動完成ではありません。</strong>
                <span>最後はYMM4で見て直します。出典、権利、素材も投稿前に見ておきます。</span>
              </div>
            </div>
            <WorkRangePanel />
          </div>
        </section>

        <section className="lp2-band lp2-band--workflow" aria-labelledby="lp2-workflow-heading">
          <div className="lp2-container">
            <SectionHead
              kicker="画面で確認"
              title="実際に触る画面を先に見る。"
              body="起動後に迷いやすい画面だけ、スクショで確認できます。"
              align="split"
            />
            <div className="lp2-workflow">
              <div className="lp2-workflow__steps">
                {workflowSteps.map((step) => {
                  const Icon = step.Icon
                  return (
                    <article className="lp2-step-card" key={step.step} data-reveal>
                      <span className="lp2-step-card__number">{step.step}</span>
                      <Icon size={22} aria-hidden="true" />
                      <h3>{step.title}</h3>
                      <p>{step.body}</p>
                    </article>
                  )
                })}
              </div>
              <div className="lp2-workflow__screen" data-reveal>
                <figure className="lp2-product-frame">
                  <div className="lp2-product-frame__bar" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                    <strong>Main / 台本取得</strong>
                  </div>
                  <img
                    src="/lp/screen-main-get-scripts-v2.webp"
                    alt="素材取り込みと台本取得の設定を確認する実アプリ画面"
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
                <div className="lp2-metric-row" aria-label="制作フローの要点">
                  <span><Gauge size={16} aria-hidden="true" />30秒で編集開始</span>
                  <span><Layers3 size={16} aria-hidden="true" />素材パスを整理</span>
                  <span><SearchCheck size={16} aria-hidden="true" />YMM4へ反映</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="lp2-band lp2-band--gallery" aria-labelledby="lp2-gallery-heading">
          <div className="lp2-container">
            <SectionHead
              kicker="実画面"
              title="実アプリの画面だけ載せています。"
              body="AIで作った架空画面ではありません。購入前に見たいところだけ置いています。"
              align="split"
            />
            <div className="lp2-gallery-grid">
              {galleryItems.map((item) => (
                <figure className="lp2-gallery-card" key={item.title} data-reveal>
                  <img src={item.image} alt={item.alt} loading="lazy" decoding="async" />
                  <figcaption>
                    <strong>{item.title}</strong>
                    <span>{item.body}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section id="lp2-demo" className="lp2-band lp2-band--demo" aria-labelledby="lp2-demo-heading">
          <div className="lp2-container lp2-demo-layout">
            <div className="lp2-demo-copy" data-reveal>
              <p className="lp2-kicker">90秒</p>
              <h2 id="lp2-demo-heading">90秒で流れを見る。</h2>
              <p>
                台本と素材を整えてからYMM4前準備までを短く見られます。
                再生できない場合は、上のスクショで同じ流れを確認できます。
              </p>
              <ol className="lp2-demo-list">
                <li>動画の型を選ぶ</li>
                <li>台本と素材を直す</li>
                <li>YMM4へ反映して動画作成へ進む</li>
              </ol>
            </div>
            <div className="lp2-video-frame" data-reveal>
              <video controls playsInline preload="metadata" poster="/lp/main-demo-90s-poster.webp" aria-label="90秒メインデモ">
                <source src="/lp/main-demo-90s.mp4" type="video/mp4" />
                <a href="/lp/main-demo-90s.mp4">90秒メインデモを開く</a>
              </video>
            </div>
          </div>
        </section>

        <section className="lp2-band lp2-band--pricing" aria-labelledby="lp2-pricing-heading">
          <div className="lp2-container">
            <SectionHead
              kicker="料金"
              title="まずFree。必要ならPremium。"
              body="Premiumは39,800円税込の買い切りです。月額はありません。"
            />
            <div className="lp2-plan-grid">
              {planCards.map((plan) => {
                const Icon = plan.Icon
                return (
                  <article className={`lp2-plan-card lp2-plan-card--${plan.name.toLowerCase()}`} key={plan.name} data-reveal>
                    <span className="lp2-plan-card__eyebrow">{plan.lead}</span>
                    <h3>{plan.name}</h3>
                    <strong>{plan.price}</strong>
                    <ul>
                      {plan.points.map((point) => (
                        <li key={point}>
                          <CheckCircle2 size={16} aria-hidden="true" />
                          {point}
                        </li>
                      ))}
                    </ul>
                    <CtaLink href={plan.href} external={plan.external} className="lp2-card-link">
                      <Icon size={17} aria-hidden="true" />
                      {plan.cta}
                    </CtaLink>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="lp2-band lp2-band--trust" aria-labelledby="lp2-trust-heading">
          <div className="lp2-container">
            <SectionHead
              kicker="先に用意するもの"
              title="使える環境と注意点。"
              body="WindowsとYMM4が前提です。Macだけ、スマホだけでは使えません。"
              align="split"
            />
            <div className="lp2-trust-grid">
              {trustItems.map((item) => {
                const Icon = item.Icon
                return (
                  <article className="lp2-trust-card" key={item.title} data-reveal>
                    <Icon size={24} aria-hidden="true" />
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="lp2-band lp2-band--faq" aria-labelledby="lp2-faq-heading">
          <div className="lp2-container">
            <SectionHead
              kicker="よくある確認"
              title="買う前に聞かれやすいこと。"
              body="料金、無料版、YMM4、収益化保証の有無を先に確認できます。"
            />
            <div className="lp2-faq-list">
              {priorityFaqItems.map((item, index) => (
                <details className="lp2-faq-item" key={item.question} open={index < 2} data-reveal>
                  <summary>
                    <span>{item.question}</span>
                    <HelpCircle size={18} aria-hidden="true" />
                  </summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
            <div className="lp2-faq-link">
              <Link to="/faq/" discover="none">
                FAQをすべて見る
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section className="lp2-final" aria-labelledby="lp2-final-heading">
          <div className="lp2-container lp2-final__grid">
            <div>
              <p className="lp2-kicker">最初の1本</p>
              <h2 id="lp2-final-heading">まずFreeで、編集の流れを試す。</h2>
              <p>
                起動できるか。台本と素材を扱えるか。YMM4へ反映できるか。
                買う前に自分の制作環境で判断できます。
              </p>
            </div>
            <div className="lp2-final__actions">
              <a className="lp2-btn lp2-btn--primary" href={downloadUrl} target="_blank" rel="noopener noreferrer">
                <Download size={18} aria-hidden="true" />
                無料でダウンロード
              </a>
              <Link className="lp2-btn lp2-btn--ghost" to="/purchase/" discover="none">
                <CreditCard size={18} aria-hidden="true" />
                料金を見る
              </Link>
              <Link className="lp2-btn lp2-btn--ghost" to="/samples/" discover="none">
                <ExternalLink size={18} aria-hidden="true" />
                サンプルを見る
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
