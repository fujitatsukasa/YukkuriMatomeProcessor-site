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
  'Freeで確認',
  'Premiumは買い切り',
  'YMM4必須',
  'Windows 10 / 11',
  '自動公開なし',
  '成果保証なし',
] as const

const heroFlowItems = [
  { label: '入れる', value: 'ネタ・下書き・素材' },
  { label: '整える', value: '台本・素材枠・字幕量' },
  { label: '確認する', value: 'YMM4前チェック' },
] as const

const buyerCheckItems = [
  {
    label: '何を入れる？',
    title: 'ネタ、下書き、素材メモ',
    body: 'URLは任意。自分で持っている素材やメモから始められます。',
  },
  {
    label: '何が出る？',
    title: '台本、素材枠、確認項目',
    body: 'YMM4へ進む前に、会話順と不足を見て直せる形にします。',
  },
  {
    label: '無料で何を見る？',
    title: '起動と制作フロー',
    body: 'まずFreeで、自分の環境とネタで流れを確認できます。',
  },
  {
    label: '有料で何が変わる？',
    title: '制限解除。月額なし。',
    body: 'Premiumは39,800円税込の買い切りです。',
  },
] as const

const answerCards = [
  {
    label: '反応集',
    title: 'コメント整理から台本へ',
    body: '使うコメント、補足、画面の順番をまとめて、YMM4で直せる台本にします。',
    Icon: Layers3,
  },
  {
    label: '解説・対談',
    title: '話す順番を作る',
    body: '問い、答え、事例、まとめを並べて、会話の流れまで見て直せます。',
    Icon: FileText,
  },
  {
    label: 'ショート',
    title: '短尺の流れに整える',
    body: '冒頭、展開、締め、字幕量を絞り、短い動画の下地にします。',
    Icon: MonitorPlay,
  },
] as const

const automationCards = [
  {
    label: 'INPUT',
    title: 'ネタを入れる',
    body: 'テーマ、素材メモ、下書き、URL任意。入口をひとつにまとめます。',
  },
  {
    label: 'AUTO',
    title: '動画用に整える',
    body: '台本、素材枠、会話順、字幕量をまとめて整理します。',
  },
  {
    label: 'CHECK',
    title: 'YMM4前に見る',
    body: '足りない素材、権利メモ、反映前チェックを先に出します。',
  },
] as const

const painReliefItems = [
  { before: '台本を1行ずつ作る', after: '会話順と字幕量を先に整える' },
  { before: '素材の置き場所で迷う', after: '素材枠と保存先を見ながら進める' },
  { before: 'YMM4に入れてから詰まる', after: '反映前に不足と確認項目を見る' },
] as const

const useCaseClips = [
  {
    title: '反応集',
    body: 'コメントと補足を並べて、テンポよく見せる下地へ。',
    video: '/lp/usecase-reaction.mp4',
    poster: '/lp/usecase-reaction-poster.webp',
  },
  {
    title: '解説・対談',
    body: '会話の順番、説明、まとめまで台本として確認。',
    video: '/lp/usecase-dialogue.mp4',
    poster: '/lp/usecase-dialogue-poster.webp',
  },
  {
    title: 'ショート',
    body: '短尺向けに字幕量と素材枠を絞って編集しやすく。',
    video: '/lp/usecase-shorts.mp4',
    poster: '/lp/usecase-shorts-poster.webp',
  },
] as const

const workflowSteps = [
  {
    step: '01',
    title: 'ネタを入れる',
    body: 'テーマ、下書き、素材メモ。URLがある場合だけ貼ります。',
    image: '/lp/screen-main-guide-v2.webp',
    alt: '動画編集の入口を確認する実アプリガイド画面',
    Icon: Layers3,
  },
  {
    step: '02',
    title: '動画の型を選ぶ',
    body: '反応集、解説、ショート、対談など、作りたい動画に合わせます。',
    image: '/lp/screen-main-script-edit-v2.webp',
    alt: '台本編集画面で取得結果とボードを確認している実アプリ画面',
    Icon: FileText,
  },
  {
    step: '03',
    title: '台本と素材を自動整理',
    body: '会話順、字幕量、素材枠、足りない素材をまとめます。',
    image: '/lp/screen-main-board-v2.webp',
    alt: 'YMM4前準備に使うボード画面の実アプリスクリーンショット',
    Icon: FileCode2,
  },
  {
    step: '04',
    title: 'YMM4で仕上げる',
    body: '内容を見てから、YMM4反映やMP4出力へ進みます。',
    image: '/lp/screen-main-get-scripts-v2.webp',
    alt: '素材取り込みと動画制作の準備画面を確認する実アプリスクリーンショット',
    Icon: MonitorPlay,
  },
] as const

const blueprintSteps = [
  {
    step: '01',
    title: 'ネタ',
    body: '作りたい動画のテーマ、下書き、素材メモを入れる。',
    output: '入口',
    Icon: Layers3,
    tone: 'cyan',
  },
  {
    step: '02',
    title: '動画の型',
    body: 'ジャンル別の型で、場面、尺、素材枠を決める。',
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
    body: '内容を見てから、YMM4反映やMP4書き出しへ進む。',
    output: '出力',
    Icon: MonitorPlay,
    tone: 'gold',
  },
] as const

const galleryItems = [
  {
    title: '台本取得',
    body: 'URLを使う時は、候補を取り込んで確認します。',
    image: '/lp/screen-main-get-scripts-v2.webp',
    alt: '台本取得画面の実アプリスクリーンショット',
  },
  {
    title: '台本編集',
    body: '会話順、字幕量、素材枠を見ながら直します。',
    image: '/lp/screen-main-script-edit-v2.webp',
    alt: '台本編集画面の実アプリスクリーンショット',
  },
  {
    title: '台本生成の確認',
    body: 'ネタから台本案を作り、使う前に確認します。',
    image: '/lp/screen-main-script-gen-v2.webp',
    alt: '台本生成結果を確認する実アプリスクリーンショット',
  },
  {
    title: 'ランチャー',
    body: '更新、ログイン、Premium状態を確認します。',
    image: '/lp/screen-launcher-update-dialog-v2.webp',
    alt: 'ランチャーの更新確認ダイアログを切り出した実アプリスクリーンショット',
  },
] as const

const planCards = [
  {
    name: 'Free',
    price: '¥0',
    lead: '買う前に自分の環境で試す',
    points: ['起動できるか見る', 'ネタと素材で試す', 'YMM4前チェックまで触る', '編集準備の流れを見る'],
    href: downloadUrl,
    cta: '無料でダウンロード',
    external: true,
    Icon: Download,
  },
  {
    name: 'Premium',
    price: '¥39,800',
    lead: '税込 / 買い切り / 月額なし',
    points: ['台本取得の制限解除', '台本生成の制限解除', '動画作成の制限解除', '本数を増やす人向け'],
    href: '/purchase/',
    cta: '料金と条件を見る',
    external: false,
    Icon: CreditCard,
  },
] as const

const evidenceItems = [
  {
    title: 'YMM4へ渡す前に確認',
    body: 'ボイス、テキスト、画像、動画、音声、図形、立ち絵などを扱う制作フローを検証しています。',
  },
  {
    title: '配置のズレを見逃しにくい',
    body: '開始位置、レイヤー、長さを読み返し、YMM4へ渡す前後のズレを確認する設計です。',
  },
  {
    title: '勝手に公開しない',
    body: '最終判断、権利確認、音声、字幕、立ち絵、公開作業はユーザー側で確認します。',
  },
] as const

const trustItems = [
  { title: 'Windows専用', body: 'Windows 10 / 11。Mac、スマホだけでは使えません。', Icon: Laptop },
  { title: 'YMM4が必要', body: 'YMM4で仕上げる前提です。YMM4なしで動画完成までは進みません。', Icon: MonitorPlay },
  { title: '確認して進める', body: '保存、YMM4反映、MP4出力は、内容を見てから進めます。', Icon: ShieldCheck },
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
    '台本作成、素材整理、YMM4前チェックまでの導線をまとめて進めるWindows向け動画制作支援ツールです。',
  featureList: [
    '台本作成',
    '素材整理',
    'YMM4連携',
    'YMM4反映前チェック',
    '動画作成導線',
  ],
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

function BuyerCheckStrip() {
  return (
    <section className="lp2-buyer-strip" aria-labelledby="lp2-buyer-strip-heading">
      <div className="lp2-container">
        <div className="lp2-buyer-strip__head">
          <p className="lp2-kicker">買う前の確認</p>
          <h2 id="lp2-buyer-strip-heading">購入前にここを確認</h2>
        </div>
        <div className="lp2-buyer-grid">
          {buyerCheckItems.map((item) => (
            <article className="lp2-buyer-card" key={item.label} data-reveal>
              <span>{item.label}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function AutomationLab() {
  return (
    <section className="lp2-band lp2-band--auto-lab" aria-labelledby="lp2-auto-lab-heading">
      <div className="lp2-container lp2-auto-lab">
        <div className="lp2-auto-lab__copy" data-reveal>
          <p className="lp2-kicker">実アプリでやること</p>
          <h2 id="lp2-auto-lab-heading">編集前に詰まる作業を、30秒で整理。</h2>
          <p>
            素材メモ、下書き、URL任意を入れると、台本、素材枠、確認項目、YMM4へ渡す準備まで整理します。
            完成動画はYMM4で見て仕上げます。
          </p>
          <div className="lp2-auto-lab__cards" aria-label="自動化される主な流れ">
            {automationCards.map((item) => (
              <article className="lp2-auto-mini-card" key={item.label}>
                <span>{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
          <div className="lp2-relief-list" aria-label="手作業で詰まるところと短縮できるところ">
            {painReliefItems.map((item) => (
              <div className="lp2-relief-item" key={item.before}>
                <span>{item.before}</span>
                <ArrowRight size={15} aria-hidden="true" />
                <strong>{item.after}</strong>
              </div>
            ))}
          </div>
        </div>
        <div className="lp2-auto-stage" aria-label="編集準備の実アプリ画面" data-reveal>
          <figure className="lp2-auto-screen lp2-auto-screen--main">
            <div className="lp2-product-frame__bar" aria-hidden="true">
              <span />
              <span />
              <span />
              <strong>台本編集</strong>
            </div>
            <img src="/lp/screen-main-script-edit-v2.webp" alt="台本を動画用に整える台本編集画面" loading="lazy" decoding="async" />
            <figcaption>
              <span>台本編集</span>
              <strong>下書きを会話、字幕量、素材枠に合わせて整える。</strong>
            </figcaption>
          </figure>
          <figure className="lp2-auto-screen lp2-auto-screen--side">
            <div className="lp2-product-frame__bar" aria-hidden="true">
              <span />
              <span />
              <span />
              <strong>動画作成ボード</strong>
            </div>
            <img src="/lp/screen-main-board-v2.webp" alt="素材と動画作成状況を確認するボード画面" loading="lazy" decoding="async" />
            <figcaption>
              <span>確認ボード</span>
              <strong>素材と出力前チェックを見ながら進める。</strong>
            </figcaption>
          </figure>
          <div className="lp2-auto-stage__rail" aria-label="入力からYMM4確認までの流れ">
            <span>ネタ・素材</span>
            <ArrowRight size={16} aria-hidden="true" />
            <span>台本・素材枠</span>
            <ArrowRight size={16} aria-hidden="true" />
            <span>YMM4で確認</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export function HomePage() {
  return (
    <>
      <PageMeta
        title="ゆっくりまとめプロセッサー｜30秒で編集準備を自動整理"
        description="ネタ、下書き、素材メモを入れて、台本・素材枠・YMM4前チェックを整理するWindows向け制作支援ツール。Freeで確認、Premiumは39,800円税込の買い切り。"
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
                <span>30秒で</span>
                <span>編集準備が整う</span>
              </h1>
              <p className="lp2-hero__lead">
                ネタ、下書き、素材メモから、台本・素材枠・字幕量・確認項目をまとめて整理。
                反応集、解説、ショート、対談など、いろんな動画の下地づくりに使えます。
              </p>
              <p className="lp2-hero__subline">
                URLは任意。Freeで流れを見て、必要ならPremiumで制限解除。仕上げと公開判断はYMM4で確認します。
              </p>
              <div className="lp2-hero-io" aria-label="編集準備の流れ">
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
                <strong>ネタ / 下書き / 素材 / URL任意</strong>
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
                  <strong>台本、素材、確認ボードを実画面で確認できる。</strong>
                </figcaption>
              </figure>
              <div className="lp2-hero__visual-note lp2-hero__visual-note--output" aria-hidden="true">
                <span>出すもの</span>
                <strong>台本 / 素材枠 / 確認項目</strong>
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
        </section>

        <BuyerCheckStrip />
        <AutomationLab />

        <section className="lp2-band lp2-band--answers" aria-labelledby="lp2-answers-heading">
          <div className="lp2-container">
            <SectionHead
              kicker="動画タイプ"
              title="反応集も、解説も、ショートも。"
              body="作りたい動画の型を選んで、台本と素材枠を先に整えます。ゆっくり動画だけに閉じません。"
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

        <section className="lp2-band lp2-band--usecases" aria-labelledby="lp2-usecases-heading">
          <div className="lp2-container">
            <SectionHead
              kicker="サンプル"
              title="どんな動画に使うか、見てから決める。"
              body="反応集、解説、ショートのサンプルを用意しています。自分のチャンネルに合うか先に確認できます。"
              align="split"
            />
            <div className="lp2-usecase-grid">
              {useCaseClips.map((item) => (
                <article className="lp2-usecase-card" key={item.title} data-reveal>
                  <div className="lp2-usecase-card__media">
                    <video controls playsInline preload="metadata" poster={item.poster} aria-label={`${item.title}のサンプル動画`}>
                      <source src={item.video} type="video/mp4" />
                      <a href={item.video}>{item.title}のサンプル動画を開く</a>
                    </video>
                  </div>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="lp2-band lp2-band--diagram" aria-labelledby="lp2-diagram-heading">
          <div className="lp2-container lp2-diagram-layout">
            <div className="lp2-diagram-copy" data-reveal>
              <p className="lp2-kicker">作業範囲</p>
              <h2 id="lp2-diagram-heading">自動で整える。最後は自分で仕上げる。</h2>
              <p>
                ツールは台本、素材枠、字幕量、YMM4前チェックを整理します。
                投稿前の判断、権利確認、最終編集は自分で行います。
              </p>
              <div className="lp2-note-panel">
                <ShieldCheck size={20} aria-hidden="true" />
                <strong>勝手に公開しません。</strong>
                <span>保存、YMM4反映、MP4出力は、内容を見てから進めます。</span>
              </div>
            </div>
            <WorkRangePanel />
          </div>
        </section>

        <section className="lp2-band lp2-band--workflow" aria-labelledby="lp2-workflow-heading">
          <div className="lp2-container">
            <SectionHead
              kicker="使う流れ"
              title="ネタを入れて、YMM4に入る前まで整える。"
              body="起動、入力、台本、素材、確認まで。買う前にFreeで自分のネタを試せます。"
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
                  <span><Gauge size={16} aria-hidden="true" />30秒で自動整理</span>
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
              title="購入前に、触る画面を確認。"
              body="画面は実アプリのスクリーンショットです。どこを使うか、起動前にイメージできます。"
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
              <h2 id="lp2-demo-heading">90秒で、操作の流れを見る。</h2>
              <p>
                ネタから台本、素材、YMM4前チェックまでを短く確認できます。
                動画が再生できない場合は、スクリーンショットでも同じ流れを確認できます。
              </p>
              <ol className="lp2-demo-list">
                <li>ネタや素材メモを入れる</li>
                <li>ジャンルの型を選ぶ</li>
                <li>YMM4に入る前に不足を確認する</li>
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

        <section className="lp2-band lp2-band--evidence" aria-labelledby="lp2-evidence-heading">
          <div className="lp2-container">
            <SectionHead
              kicker="購入前の安心材料"
              title="できること、できないことを先に出します。"
              body="Free、Premium、YMM4前提、成果保証なし。買ってから困りやすい点を先に確認できます。"
              align="split"
            />
            <div className="lp2-evidence-grid">
              {evidenceItems.map((item) => (
                <article className="lp2-evidence-card" key={item.title} data-reveal>
                  <CheckCircle2 size={20} aria-hidden="true" />
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="lp2-band lp2-band--pricing" aria-labelledby="lp2-pricing-heading">
          <div className="lp2-container">
            <SectionHead
              kicker="料金"
              title="Freeで試す。必要ならPremium。"
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
              kicker="利用条件"
              title="WindowsとYMM4で使うツールです。"
              body="Macだけ、スマホだけでは使えません。導入前に環境を確認してください。"
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
              title="買う前の疑問を先に確認。"
              body="料金、無料版、YMM4、収益化保証の有無をここで確認できます。"
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
              <h2 id="lp2-final-heading">まずFreeで、自分のネタを動かす。</h2>
              <p>
                自分の素材で始められるか。台本と素材枠が合うか。YMM4前チェックまで進められるか。
                購入前に自分の制作環境で確認してください。
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
