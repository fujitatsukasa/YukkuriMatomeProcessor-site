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
  'YMM4連携',
  'URL任意',
  'Freeあり',
  '39,800円 買い切り',
  '成果保証なし',
] as const

const heroFlowItems = [
  { label: '入力', value: 'テーマ・素材・下書き' },
  { label: '設計', value: '台本・素材枠' },
  { label: '出力', value: 'YMM4 / MP4へ' },
] as const

const answerCards = [
  {
    label: '反応集',
    title: 'コメントを場面順に並べる',
    body: '採用するコメント、補足、権利メモ、画面切り替えを整理して、編集で迷う時間を減らします。',
    Icon: Layers3,
  },
  {
    label: '解説・対談',
    title: '話す順番まで作る',
    body: '問い、答え、事例、まとめを台本として見られる状態にし、足りない素材も先に確認します。',
    Icon: FileText,
  },
  {
    label: 'ショート',
    title: '短く見せる流れにする',
    body: '冒頭、展開、締め、字幕量、使う素材を整理して、YMM4で仕上げる前を軽くします。',
    Icon: MonitorPlay,
  },
] as const

const workflowSteps = [
  {
    step: '01',
    title: 'テーマを入れる',
    body: 'URLがなくても、テーマ、下書き、素材メモから始められます。',
    image: '/lp/screen-main-guide-v2.webp',
    alt: '動画編集の入口を確認する実アプリガイド画面',
    Icon: Layers3,
  },
  {
    step: '02',
    title: '動画の型を選ぶ',
    body: '反応集、解説、ショート、対談など、作りたい形式に合わせます。',
    image: '/lp/screen-main-script-edit-v2.webp',
    alt: '台本編集画面で取得結果とボードを確認している実アプリ画面',
    Icon: FileText,
  },
  {
    step: '03',
    title: '台本と素材を固める',
    body: '会話順、字幕量、素材パス、足りない素材を見て直します。',
    image: '/lp/screen-main-board-v2.webp',
    alt: 'YMM4前準備に使うボード画面の実アプリスクリーンショット',
    Icon: FileCode2,
  },
  {
    step: '04',
    title: 'YMM4 / MP4へ進む',
    body: '内容を確認してから、YMM4反映やMP4出力へ進みます。',
    image: '/lp/screen-main-get-scripts-v2.webp',
    alt: '素材取り込みと動画制作の準備画面を確認する実アプリスクリーンショット',
    Icon: MonitorPlay,
  },
] as const

const blueprintSteps = [
  {
    step: '01',
    title: 'テーマ',
    body: '作りたい動画の題材、下書き、素材メモを入れる。',
    output: '入口',
    Icon: Layers3,
    tone: 'cyan',
  },
  {
    step: '02',
    title: '動画の型',
    body: 'ジャンル別の型で、場面、尺、素材スロットを決める。',
    output: '構成',
    Icon: FileText,
    tone: 'blue',
  },
  {
    step: '03',
    title: '不足チェック',
    body: '素材不足、権利メモ、字幕量、YMM4前の詰まりを見る。',
    output: '確認',
    Icon: FileCode2,
    tone: 'green',
  },
  {
    step: '04',
    title: 'YMM4 / MP4',
    body: '承認してYMM4反映、必要ならMP4書き出しへ進む。',
    output: '出力',
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
    lead: '買う前に自分の環境で試す',
    points: ['起動できるか見る', 'テーマと素材で試す', 'YMM4前チェックまで触る', '編集開始までの流れを見る'],
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
  { title: '人が確認して進める', body: '保存、YMM4反映、MP4出力は、内容を見てから進めます。', Icon: ShieldCheck },
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
        title="ゆっくりまとめプロセッサー｜いろんな動画を30秒で編集開始"
        description="反応集、解説、ショート、対談など。テーマ、下書き、素材メモから台本、素材枠、YMM4反映前チェック、MP4出力の導線までまとめるWindows向け動画制作支援ツールです。"
        keywords="ゆっくりまとめプロセッサー,YMM4,動画編集,動画作成,台本作成,素材整理,反応集,解説動画,ショート動画,Windows"
        image="/lp/screen-main-script-edit-v2.webp"
        path="/"
        structuredData={softwareApplicationLd}
      />

      <main className="lp2-home">
        <section className="lp2-hero" aria-labelledby="lp2-hero-heading">
          <div className="lp2-container lp2-hero__grid">
            <div className="lp2-hero__copy" data-reveal>
              <p className="lp2-kicker">Windows + YMM4 / 動画制作支援</p>
              <h1 id="lp2-hero-heading">
                <span>いろんな動画を</span>
                <span>30秒で</span>
                <span>編集開始</span>
              </h1>
              <p className="lp2-hero__lead">
                反応集、解説、ショート、対談まで。テーマ、下書き、素材メモを入れて、
                台本、素材枠、YMM4反映前チェックまで一気に揃えます。
              </p>
              <p className="lp2-hero__subline">
                URLは必須ではありません。完成動画を勝手に出すのではなく、編集をすぐ始めるための準備を整えます。
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
                <span>入れるもの</span>
                <strong>テーマ / 下書き / 素材 / URL任意</strong>
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
                  <strong>台本、素材、確認ボード、動画作成まで同じ流れで見る。</strong>
                </figcaption>
              </figure>
              <div className="lp2-hero__visual-note lp2-hero__visual-note--output" aria-hidden="true">
                <span>出すもの</span>
                <strong>YMM4反映前チェック / MP4出力へ</strong>
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
            <span>入口</span>
            <strong>テーマ、下書き、素材メモ、URL任意</strong>
          </div>
        </section>

        <section className="lp2-band lp2-band--answers" aria-labelledby="lp2-answers-heading">
          <div className="lp2-container">
            <SectionHead
              kicker="ゆっくりだけではない"
              title="作りたい動画の型から選ぶ。"
              body="記事URLありきではありません。反応集、解説、ショート、対談など、作りたい形式に合わせて台本と素材をまとめます。"
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
              <h2 id="lp2-diagram-heading">編集前の詰まりを先につぶす。</h2>
              <p>
                テーマを入れる、ジャンルの型を選ぶ、台本と素材を整える。
                YMM4やMP4へ進む前の詰まりを先に見ます。
              </p>
              <div className="lp2-note-panel">
                <ShieldCheck size={20} aria-hidden="true" />
                <strong>自動で勝手に公開しません。</strong>
                <span>保存、YMM4反映、MP4出力は、内容を見てから進めます。</span>
              </div>
            </div>
            <WorkRangePanel />
          </div>
        </section>

        <section className="lp2-band lp2-band--workflow" aria-labelledby="lp2-workflow-heading">
          <div className="lp2-container">
            <SectionHead
              kicker="実機フロー"
              title="触る順番で、そのまま進む。"
              body="テーマ、台本、素材、YMM4前チェック。購入前に、自分の動画づくりで使えるかを確認できます。"
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
                  <span><Gauge size={16} aria-hidden="true" />30秒で入口確認</span>
                  <span><Layers3 size={16} aria-hidden="true" />型を選ぶ</span>
                  <span><SearchCheck size={16} aria-hidden="true" />YMM4前チェック</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="lp2-band lp2-band--gallery" aria-labelledby="lp2-gallery-heading">
          <div className="lp2-container">
            <SectionHead
              kicker="実画面"
              title="見せる画面は実アプリだけ。"
              body="背景演出は生成画像でも、UIスクショは実物だけ。買う前に見たい画面を先に出します。"
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
              <h2 id="lp2-demo-heading">90秒で制作フローを見る。</h2>
              <p>
                テーマから台本、素材、YMM4前チェックまでを短く確認できます。
                再生できない場合は、上のスクショで同じ流れを確認できます。
              </p>
              <ol className="lp2-demo-list">
                <li>テーマや素材メモを入れる</li>
                <li>ジャンルの型を選ぶ</li>
                <li>YMM4 / MP4へ進める前に確認する</li>
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
              <h2 id="lp2-final-heading">まずFreeで、自分の題材を試す。</h2>
              <p>
                テーマを入れられるか。台本と素材を扱えるか。YMM4前チェックまで進めるか。
                買う前に自分の制作環境で見てください。
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
