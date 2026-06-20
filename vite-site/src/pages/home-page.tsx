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
  'Freeで動作確認',
  '台本取得',
  'AI台本生成',
  '動画作成',
  'YMM4直反映',
  'Premiumは買い切り',
] as const

const heroFlowItems = [
  { label: '00秒', title: 'ネタ投入', body: 'URL / メモ / 素材' },
  { label: '10秒', title: '型を選択', body: '反応集 / 解説 / ショート' },
  { label: '20秒', title: '自動整理', body: '台本 / 字幕量 / 素材配置' },
  { label: '30秒', title: 'YMM4へ', body: '起動 / 接続 / 直反映' },
] as const

const decisionHighlights = [
  {
    label: '入れる',
    title: 'URL、下書き、素材メモ',
    body: 'URLだけに縛りません。手元のネタやメモから始められます。',
  },
  {
    label: '作る',
    title: '台本取得、AI台本生成、動画作成',
    body: '動画の型に合わせて、会話順、字幕量、素材配置までまとめます。',
  },
  {
    label: '反映',
    title: 'YMM4起動、接続、直反映',
    body: 'YMM4で見て、音声、字幕、間合い、公開判断を仕上げます。',
  },
] as const

const automationTargets = [
  {
    label: '台本取得',
    title: 'URLや素材から台本にする',
    body: '対応URL、スレッド、手元メモを取り込み、編集しやすい台本へ整理します。',
    Icon: FileText,
  },
  {
    label: 'AI台本生成',
    title: '動画の型に合わせて作る',
    body: '反応集、解説、ショート、掛け合いなど、作りたい型に合わせて生成します。',
    Icon: Layers3,
  },
  {
    label: '動画作成',
    title: '素材配置まで進める',
    body: '会話順、字幕量、素材、確認項目をまとめ、動画作成jobへつなげます。',
    Icon: MonitorPlay,
  },
  {
    label: 'YMM4連携',
    title: '起動・接続・直反映',
    body: 'YMM4フォルダを登録し、タイムライン反映とプロジェクト保存へ進めます。',
    Icon: FileCode2,
  },
] as const

const useCaseClips = [
  {
    title: '反応集',
    body: 'コメント、補足、進行を並べて、テンポのある動画にします。',
    video: '/lp/usecase-reaction.mp4',
    poster: '/lp/usecase-reaction-poster.webp',
  },
  {
    title: '解説・対談',
    body: '問い、答え、事例、まとめを台本化して見やすく整えます。',
    video: '/lp/usecase-dialogue.mp4',
    poster: '/lp/usecase-dialogue-poster.webp',
  },
  {
    title: 'ショート',
    body: '冒頭、展開、締めを短くまとめ、字幕量も抑えます。',
    video: '/lp/usecase-shorts.mp4',
    poster: '/lp/usecase-shorts-poster.webp',
  },
] as const

const beforeAfterItems = [
  { before: '台本を手で整える', after: 'AI台本生成で型に合わせる' },
  { before: '素材の置き場で迷う', after: '素材配置と保存先をまとめる' },
  { before: 'YMM4で最初から組む', after: '直反映してYMM4で仕上げる' },
] as const

const compareRows = [
  { task: 'ネタ投入', manual: 'メモ、URL、素材を別々に管理', ymp: '入口を1つにまとめる' },
  { task: '台本', manual: '構成、会話、字幕量を手で調整', ymp: 'AI台本生成で動画の型へ合わせる' },
  { task: '素材配置', manual: '保存先と素材パスを行き来する', ymp: '素材配置と不足を画面で確認' },
  { task: 'YMM4', manual: 'タイムラインを手で組み始める', ymp: '起動、接続、直反映へ進む' },
] as const

const buyerAssuranceItems = [
  {
    title: 'Freeで先に触れる',
    body: '起動、ログイン、台本編集、動画作成導線、YMM4連携の前提を確認できます。',
  },
  {
    title: 'Premiumは買い切り',
    body: '39,800円税込。月額ではなく、台本取得、AI台本生成、動画作成の制限を解除します。',
  },
  {
    title: 'YMM4で最後に見る',
    body: '音声、字幕、立ち絵、間合い、権利確認、投稿判断はYMM4で確認します。',
  },
  {
    title: '成果保証はしない',
    body: '収益化、再生数、審査通過は保証しません。ツールは制作時間の短縮に集中します。',
  },
] as const

const workflowSteps = [
  {
    step: '01',
    title: 'ネタを入れる',
    body: 'URL、下書き、素材メモ、テーマ。URLなしでも始められます。',
    image: '/lp/screen-main-guide-v2.webp',
    alt: '動画編集の入口を確認する実アプリガイド画面',
    Icon: Layers3,
  },
  {
    step: '02',
    title: '動画の型を選ぶ',
    body: '反応集、解説、ショート、掛け合いなど、目的に合わせます。',
    image: '/lp/screen-main-script-edit-v2.webp',
    alt: '台本編集画面で取得結果とボードを確認している実アプリ画面',
    Icon: FileText,
  },
  {
    step: '03',
    title: '自動で動画作成へ',
    body: '台本、素材配置、字幕量、YMM4連携の確認項目をまとめます。',
    image: '/lp/screen-main-board-v2.webp',
    alt: 'YMM4連携に使う動画作成ボード画面の実アプリスクリーンショット',
    Icon: MonitorPlay,
  },
  {
    step: '04',
    title: 'YMM4で仕上げる',
    body: '起動、接続、直反映後に、YMM4側で最終確認します。',
    image: '/lp/screen-main-get-scripts-v2.webp',
    alt: '素材取り込みと動画制作画面を確認する実アプリスクリーンショット',
    Icon: FileCode2,
  },
] as const

const galleryItems = [
  {
    title: '台本取得',
    body: 'URLを使う時は、取得候補を確認してから取り込みます。',
    focus: 'URL候補',
    image: '/lp/screen-main-get-scripts-v2.webp',
    alt: '台本取得画面の実アプリスクリーンショット',
  },
  {
    title: '台本編集',
    body: '会話順、字幕量、素材配置を見ながら調整できます。',
    focus: '会話順',
    image: '/lp/screen-main-script-edit-v2.webp',
    alt: '台本編集画面の実アプリスクリーンショット',
  },
  {
    title: 'AI台本生成',
    body: '動画の型に合わせて台本案を作り、使う前に確認します。',
    focus: '生成結果',
    image: '/lp/screen-main-script-gen-v2.webp',
    alt: '台本生成結果を確認する実アプリスクリーンショット',
  },
  {
    title: 'ランチャー',
    body: 'ログイン、更新、Premium状態を起動時に確認します。',
    focus: '更新確認',
    image: '/lp/screen-launcher-update-dialog-v2.webp',
    alt: 'ランチャーの更新確認ダイアログを切り出した実アプリスクリーンショット',
  },
] as const

const planCards = [
  {
    name: 'Free',
    price: '¥0',
    lead: 'まず自分のPCで試す',
    points: ['起動とログインを確認', '台本編集の流れを見る', '動画作成導線を触る', 'YMM4連携の前提を確認'],
    href: downloadUrl,
    cta: '無料でダウンロード',
    external: true,
    Icon: Download,
  },
  {
    name: 'Premium',
    price: '¥39,800',
    lead: '税込 / 買い切り / 月額なし',
    points: ['台本取得の制限解除', 'AI台本生成の制限解除', '動画作成の制限解除', '本数を増やす人向け'],
    href: '/purchase/',
    cta: '料金と条件を見る',
    external: false,
    Icon: CreditCard,
  },
] as const

const trustItems = [
  { title: 'Windows専用', body: 'Windows 10 / 11向け。Mac、スマホだけでは使えません。', Icon: Laptop },
  { title: 'YMM4が必要', body: 'YMM4で最終確認して仕上げる前提です。', Icon: MonitorPlay },
  { title: '勝手に公開しない', body: '保存、YMM4反映、MP4出力、投稿判断は確認して進めます。', Icon: ShieldCheck },
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
  .map((item) => {
    if (item.question === '動画は自動で完成しますか？') {
      return {
        question: item.question,
        answer:
          'YMM4へ直反映して動画作成を進めます。音声、字幕、間合い、権利確認、投稿判断はYMM4で最終確認してください。',
      }
    }

    if (item.question === 'YMM4は必須ですか？') {
      return {
        question: item.question,
        answer:
          'はい。YMM4と連携して使うWindows向けソフトです。YMM4なしで編集完了まで進める設計ではありません。',
      }
    }

    if (item.question === '無料版では何ができますか？') {
      return {
        question: item.question,
        answer:
          'Freeでは、起動、ログイン、台本編集、動画作成導線、YMM4連携の前提を確認できます。Premium購入前に自分のPCで試せます。',
      }
    }

    return item
  })

const softwareApplicationLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: siteTitle,
  applicationCategory: 'MultimediaApplication',
  operatingSystem: 'Windows 10, Windows 11',
  url: `${siteOrigin}/`,
  downloadUrl: `${siteOrigin}/download/`,
  description:
    '台本取得、AI台本生成、動画作成、YMM4連携までを進めるWindows向け自動動画編集ソフトです。',
  featureList: [
    '台本取得',
    'AI台本生成',
    '動画作成',
    '素材配置',
    'CSVプロジェクト化',
    'YMM4起動・接続・直反映',
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
  align = 'split',
}: {
  kicker: string
  title: string
  body?: string
  align?: 'center' | 'split'
}) {
  return (
    <div className={`lp3-section-head lp3-section-head--${align}`}>
      <div>
        <p className="lp3-kicker">{kicker}</p>
        <h2>{title}</h2>
      </div>
      {body ? <p>{body}</p> : null}
    </div>
  )
}

function BrowserFrame({
  title,
  children,
  className = '',
}: {
  title: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`lp3-frame ${className}`}>
      <div className="lp3-frame__bar" aria-hidden="true">
        <span />
        <span />
        <span />
        <strong>{title}</strong>
      </div>
      {children}
    </div>
  )
}

function ThirtySecondDemo() {
  return (
    <div className="lp3-quick-demo" aria-label="30秒で自動動画編集の流れ">
      <div className="lp3-quick-demo__head">
        <span>30 SEC AUTO EDIT</span>
        <strong>ネタからYMM4直反映まで</strong>
      </div>
      <ol>
        {heroFlowItems.map((item) => (
          <li key={item.label}>
            <span>{item.label}</span>
            <div>
              <strong>{item.title}</strong>
              <p>{item.body}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="lp3-quick-demo__progress" aria-hidden="true">
        <span />
      </div>
    </div>
  )
}

function DecisionStrip() {
  return (
    <section className="lp3-decision" aria-label="30秒で何をするか">
      <div className="lp3-container lp3-decision__grid">
        {decisionHighlights.map((item) => (
          <article className="lp3-decision-card" key={item.label} data-reveal>
            <span>{item.label}</span>
            <h2>{item.title}</h2>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function CampaignDemoPanel() {
  return (
    <section className="lp3-band lp3-band--campaign" aria-labelledby="lp3-campaign-heading">
      <div className="lp3-container lp3-campaign-layout">
        <div className="lp3-campaign-copy" data-reveal>
          <p className="lp3-kicker">広告デモ</p>
          <h2 id="lp3-campaign-heading">30秒の中身を、もっと具体的に見せます。</h2>
          <p>
            入力して終わりではありません。台本取得、AI台本生成、動画作成、YMM4直反映まで、
            どこが短くなるかを見える形にしました。
          </p>
          <div className="lp3-campaign-meter" aria-label="30秒の進行">
            {heroFlowItems.map((item) => (
              <div key={item.label}>
                <span>{item.label}</span>
                <strong>{item.title}</strong>
              </div>
            ))}
          </div>
        </div>
        <div className="lp3-campaign-stage" data-reveal>
          <BrowserFrame title="Main / 台本編集 + 動画作成" className="lp3-frame--campaign">
            <img
              src="/lp/screen-main-script-edit-v2.webp"
              alt="台本編集と動画作成ボードを確認する実アプリ画面"
              loading="lazy"
              decoding="async"
            />
          </BrowserFrame>
          <div className="lp3-campaign-badges" aria-label="実画面で確認できるポイント">
            <span>台本取得</span>
            <span>AI台本生成</span>
            <span>素材配置</span>
            <span>YMM4直反映</span>
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
        title="ゆっくりまとめプロセッサー｜30秒で自動動画編集"
        description="台本取得、AI台本生成、動画作成、素材配置、YMM4直反映まで進めるWindows向け自動動画編集ソフト。Freeで確認、Premiumは39,800円税込の買い切り。"
        keywords="ゆっくりまとめプロセッサー,YMM4,自動動画編集,動画作成,台本取得,AI台本生成,素材配置,反応集,解説動画,ショート動画,Windows"
        image="/lp/screen-main-script-edit-v2.webp"
        path="/"
        structuredData={softwareApplicationLd}
      />

      <main className="lp3-home">
        <section className="lp3-hero" aria-labelledby="lp3-hero-heading">
          <div className="lp3-hero__backdrop" aria-hidden="true" />
          <div className="lp3-container lp3-hero__grid">
            <div className="lp3-hero__copy" data-reveal>
              <p className="lp3-kicker">Windows + YMM4 / 自動動画編集ソフト</p>
              <h1 id="lp3-hero-heading">
                <span>30秒で</span>
                <span>自動動画編集</span>
              </h1>
              <p className="lp3-hero__lead">
                台本取得、AI台本生成、素材配置、動画作成、YMM4直反映までを一気に進める。
                反応集、解説、ショート、掛け合いまで、YMM4制作を短くします。
              </p>
              <div className="lp3-hero__actions">
                <a className="lp3-btn lp3-btn--primary" href={downloadUrl} target="_blank" rel="noopener noreferrer">
                  <Download size={18} aria-hidden="true" />
                  無料でダウンロード
                </a>
                <a className="lp3-btn lp3-btn--ghost" href="#lp3-demo">
                  <Play size={18} aria-hidden="true" />
                  実機デモを見る
                </a>
              </div>
              <ul className="lp3-proof-list" aria-label="導入前に確認する前提">
                {proofChips.map((chip) => (
                  <li key={chip}>
                    <CheckCircle2 size={15} aria-hidden="true" />
                    {chip}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lp3-hero__visual" data-reveal>
              <BrowserFrame title="実アプリ / 台本編集" className="lp3-frame--hero">
                <img
                  src="/lp/screen-main-script-edit-v2.webp"
                  alt="ゆっくりまとめプロセッサーの台本編集画面"
                  loading="eager"
                  decoding="async"
                />
              </BrowserFrame>
              <div className="lp3-hero-callout lp3-hero-callout--left">
                <span>入力</span>
                <strong>URL / 下書き / 素材メモ</strong>
              </div>
              <div className="lp3-hero-callout lp3-hero-callout--right">
                <span>出力</span>
                <strong>台本 / 素材配置 / YMM4直反映</strong>
              </div>
              <ThirtySecondDemo />
            </div>
          </div>
        </section>

        <DecisionStrip />

        <section className="lp3-band lp3-band--targets" aria-labelledby="lp3-targets-heading">
          <div className="lp3-container">
            <SectionHead
              kicker="自動化する範囲"
              title="売りはここ。台本取得、AI台本生成、動画作成。"
              body="何が自動化されるかを先に確認できます。YMM4で最終確認する前提も先に出します。"
            />
            <div className="lp3-target-grid">
              {automationTargets.map((item) => {
                const Icon = item.Icon
                return (
                  <article className="lp3-target-card" key={item.label} data-reveal>
                    <span>{item.label}</span>
                    <Icon size={28} aria-hidden="true" />
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <CampaignDemoPanel />

        <section className="lp3-band lp3-band--proof" aria-labelledby="lp3-proof-heading">
          <div className="lp3-container lp3-proof-layout">
            <div className="lp3-proof-copy" data-reveal>
              <p className="lp3-kicker">30秒の見える化</p>
              <h2 id="lp3-proof-heading">何が短くなるかを、画面で見せる。</h2>
              <p>
                入力から出力までが見えないLPでは、買う判断ができません。
                ネタ投入からYMM4直反映までを実機画面で見せます。
              </p>
              <div className="lp3-before-after" aria-label="手作業と自動化の比較">
                {beforeAfterItems.map((item) => (
                  <div className="lp3-before-after__row" key={item.before}>
                    <span>{item.before}</span>
                    <ArrowRight size={16} aria-hidden="true" />
                    <strong>{item.after}</strong>
                  </div>
                ))}
              </div>
            </div>
            <div className="lp3-proof-stage" data-reveal>
              <BrowserFrame title="Main / 動画作成ボード" className="lp3-frame--board">
                <img
                  src="/lp/screen-main-board-v2.webp"
                  alt="動画作成ボードで素材とYMM4連携を確認する実アプリ画面"
                  loading="lazy"
                  decoding="async"
                />
              </BrowserFrame>
              <div className="lp3-proof-stage__strip">
                <span><Gauge size={16} aria-hidden="true" />30秒で自動動画編集</span>
                <span><SearchCheck size={16} aria-hidden="true" />YMM4直反映</span>
                <span><ShieldCheck size={16} aria-hidden="true" />最終確認は自分で</span>
              </div>
            </div>
          </div>
        </section>

        <section className="lp3-band lp3-band--compare" aria-labelledby="lp3-compare-heading">
          <div className="lp3-container">
            <SectionHead
              kicker="比較"
              title="手作業で詰まるところを、YMM4制作向けにまとめる。"
              body="一般的な動画編集ソフトの代わりではなく、YMM4で動画作成する前提の作業を短くします。"
            />
            <div className="lp3-compare-table" data-reveal>
              <div className="lp3-compare-table__head">
                <span>作業</span>
                <span>手作業</span>
                <span>ゆっくりまとめプロセッサー</span>
              </div>
              {compareRows.map((row) => (
                <div className="lp3-compare-row" key={row.task}>
                  <strong>{row.task}</strong>
                  <span>{row.manual}</span>
                  <span>{row.ymp}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="lp3-band lp3-band--usecases" aria-labelledby="lp3-usecases-heading">
          <div className="lp3-container">
            <SectionHead
              kicker="作れる動画"
              title="ゆっくりだけで終わらない。いろんな動画に使う。"
              body="反応集、解説、ショート、掛け合い。型を選んで、台本と素材配置を動画用にまとめます。"
            />
            <div className="lp3-usecase-grid">
              {useCaseClips.map((item) => (
                <article className="lp3-usecase-card" key={item.title} data-reveal>
                  <video controls playsInline preload="metadata" poster={item.poster} aria-label={`${item.title}のサンプル動画`}>
                    <source src={item.video} type="video/mp4" />
                    <a href={item.video}>{item.title}のサンプル動画を開く</a>
                  </video>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="lp3-band lp3-band--workflow" aria-labelledby="lp3-workflow-heading">
          <div className="lp3-container">
            <SectionHead
              kicker="使う流れ"
              title="ネタを入れる。型を選ぶ。YMM4へ反映する。"
              body="Freeで自分のPCとYMM4環境に合うか確認できます。使う順番は実機画面で見られます。"
            />
            <div className="lp3-workflow">
              {workflowSteps.map((step) => {
                const Icon = step.Icon
                return (
                  <article className="lp3-step-card" key={step.step} data-reveal>
                    <div className="lp3-step-card__copy">
                      <span>{step.step}</span>
                      <Icon size={24} aria-hidden="true" />
                      <h3>{step.title}</h3>
                      <p>{step.body}</p>
                    </div>
                    <img src={step.image} alt={step.alt} loading="lazy" decoding="async" />
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="lp3-band lp3-band--gallery" aria-labelledby="lp3-gallery-heading">
          <div className="lp3-container">
            <SectionHead
              kicker="実画面"
              title="実際に触る画面を、そのまま見せます。"
              body="購入前に見るべき画面だけを並べます。どこで台本取得し、どこで動画作成するかが分かります。"
            />
            <div className="lp3-gallery-grid">
              {galleryItems.map((item) => (
                <figure className="lp3-gallery-card" key={item.title} data-reveal>
                  <div className="lp3-gallery-card__focus">{item.focus}</div>
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

        <section id="lp3-demo" className="lp3-band lp3-band--demo" aria-labelledby="lp3-demo-heading">
          <div className="lp3-container lp3-demo-layout">
            <div className="lp3-demo-copy" data-reveal>
              <p className="lp3-kicker">実機デモ</p>
              <h2 id="lp3-demo-heading">90秒で、操作の流れを見る。</h2>
              <p>
                ネタ投入、台本、素材、YMM4連携までを短く確認できます。
                動画が再生できない場合は、スクリーンショットでも同じ流れを確認できます。
              </p>
              <ol>
                <li>ネタや素材メモを入れる</li>
                <li>動画の型を選ぶ</li>
                <li>YMM4へ反映して仕上げる</li>
              </ol>
            </div>
            <div className="lp3-video-frame" data-reveal>
              <video controls playsInline preload="metadata" poster="/lp/main-demo-90s-poster.webp" aria-label="90秒メインデモ">
                <source src="/lp/main-demo-90s.mp4" type="video/mp4" />
                <a href="/lp/main-demo-90s.mp4">90秒メインデモを開く</a>
              </video>
            </div>
          </div>
        </section>

        <section className="lp3-band lp3-band--assurance" aria-labelledby="lp3-assurance-heading">
          <div className="lp3-container">
            <SectionHead
              kicker="購入前の不安"
              title="買う前に見るべき条件を、先にまとめます。"
              body="料金、制限、YMM4前提、成果保証なし。後から分かると不満になる点をここで確認できます。"
            />
            <div className="lp3-assurance-grid">
              {buyerAssuranceItems.map((item) => (
                <article className="lp3-assurance-card" key={item.title} data-reveal>
                  <CheckCircle2 size={20} aria-hidden="true" />
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="lp3-band lp3-band--pricing" aria-labelledby="lp3-pricing-heading">
          <div className="lp3-container">
            <SectionHead
              kicker="料金"
              title="Freeで試す。Premiumで制限解除。"
              body="Premiumは39,800円税込の買い切りです。月額ではありません。"
              align="center"
            />
            <div className="lp3-plan-grid">
              {planCards.map((plan) => {
                const Icon = plan.Icon
                return (
                  <article className={`lp3-plan-card lp3-plan-card--${plan.name.toLowerCase()}`} key={plan.name} data-reveal>
                    <span className="lp3-plan-card__lead">{plan.lead}</span>
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
                    <CtaLink href={plan.href} external={plan.external} className="lp3-card-link">
                      <Icon size={17} aria-hidden="true" />
                      {plan.cta}
                    </CtaLink>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="lp3-band lp3-band--trust" aria-labelledby="lp3-trust-heading">
          <div className="lp3-container">
            <SectionHead
              kicker="導入前の確認"
              title="買ってから困る条件を先に出します。"
              body="Windows、YMM4、Free、Premium、成果保証なし。購入前の不安をここで潰します。"
            />
            <div className="lp3-trust-grid">
              {trustItems.map((item) => {
                const Icon = item.Icon
                return (
                  <article className="lp3-trust-card" key={item.title} data-reveal>
                    <Icon size={24} aria-hidden="true" />
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="lp3-band lp3-band--faq" aria-labelledby="lp3-faq-heading">
          <div className="lp3-container">
            <SectionHead
              kicker="FAQ"
              title="料金と制限は、購入前に確認。"
              body="Freeで何ができるか、Premiumで何が解除されるか、YMM4が必要かを短く確認できます。"
              align="center"
            />
            <div className="lp3-faq-list">
              {priorityFaqItems.map((item, index) => (
                <details className="lp3-faq-item" key={item.question} open={index < 2} data-reveal>
                  <summary>
                    <span>{item.question}</span>
                    <HelpCircle size={18} aria-hidden="true" />
                  </summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
            <div className="lp3-faq-link">
              <Link to="/faq/" discover="none">
                FAQをすべて見る
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section className="lp3-final" aria-labelledby="lp3-final-heading">
          <div className="lp3-container lp3-final__grid">
            <div>
              <p className="lp3-kicker">START</p>
              <h2 id="lp3-final-heading">まずFreeで、30秒の流れを試す。</h2>
              <p>
                自分のネタで台本取得、AI台本生成、動画作成、YMM4連携まで触ってください。
                続けて使うならPremiumで制限解除できます。
              </p>
            </div>
            <div className="lp3-final__actions">
              <a className="lp3-btn lp3-btn--primary" href={downloadUrl} target="_blank" rel="noopener noreferrer">
                <Download size={18} aria-hidden="true" />
                無料でダウンロード
              </a>
              <Link className="lp3-btn lp3-btn--ghost" to="/purchase/" discover="none">
                <CreditCard size={18} aria-hidden="true" />
                料金を見る
              </Link>
              <Link className="lp3-btn lp3-btn--ghost" to="/samples/" discover="none">
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
