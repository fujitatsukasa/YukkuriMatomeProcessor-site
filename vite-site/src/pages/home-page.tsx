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
  Link2,
  MonitorPlay,
  Play,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
  WandSparkles,
} from 'lucide-react'
import './home-page.css'

const proofChips = [
  'Windows 10 / 11',
  'YMM4前提',
  'Freeあり',
  'Premium 39,800円 買い切り',
  '動画完成はYMM4で仕上げ',
] as const

const answerCards = [
  {
    label: '何を入れる？',
    title: '記事URL・スレッドURL',
    body: '少数URLでまず確認。対応する題材を取得し、動画に使う候補を選びます。',
    Icon: Link2,
  },
  {
    label: '何が出る？',
    title: '台本下地と出力前準備',
    body: '会話化しやすい下書き、CSV、.ymmp前準備、保存先と素材パスの整理を支援します。',
    Icon: FileText,
  },
  {
    label: 'どこで仕上げる？',
    title: 'YMM4で編集して完成',
    body: '音声、字幕、立ち絵、間合い、権利確認、投稿判断は編集側と利用者側で行います。',
    Icon: MonitorPlay,
  },
] as const

const workflowSteps = [
  {
    step: '01',
    title: 'URLを貼る',
    body: '記事URL・スレッドURLを入れ、題材候補を一覧で確認します。',
    image: '/lp/screen-main-get-scripts-v2.webp',
    alt: '台本取得画面でURLと取得設定を確認している実アプリ画面',
    Icon: Link2,
  },
  {
    step: '02',
    title: '台本下地を整える',
    body: '不要行、役割、感情、読み上げ量を見ながら編集します。',
    image: '/lp/screen-main-script-edit-v2.webp',
    alt: '台本編集画面で取得結果とボードを確認している実アプリ画面',
    Icon: WandSparkles,
  },
  {
    step: '03',
    title: 'CSV / .ymmp前準備',
    body: 'フォーマット、保存先、素材パスを揃えて、編集に入れる状態へ近づけます。',
    image: '/lp/screen-main-board-v2.webp',
    alt: 'YMM4前準備に使うボード画面の実アプリスクリーンショット',
    Icon: FileCode2,
  },
  {
    step: '04',
    title: 'YMM4で仕上げる',
    body: '動画の完成、最終確認、投稿判断はYMM4と人の目で仕上げます。',
    image: '/lp/screen-main-guide-v2.webp',
    alt: '初回起動や編集手順を確認するガイド画面の実アプリスクリーンショット',
    Icon: MonitorPlay,
  },
] as const

const blueprintSteps = [
  {
    step: '01',
    title: 'URL入力',
    body: '記事URL・スレッドURLを入れて、少数URLでまず確認。',
    output: '候補リスト',
    Icon: Link2,
    tone: 'cyan',
  },
  {
    step: '02',
    title: '台本下地',
    body: '会話にしやすい下書きへ整え、不要行や流れを見る。',
    output: '編集前の下書き',
    Icon: FileText,
    tone: 'blue',
  },
  {
    step: '03',
    title: 'CSV / .ymmp前準備',
    body: '保存先、素材パス、出力形式を揃えてYMM4前へ。',
    output: '出力前準備',
    Icon: FileCode2,
    tone: 'green',
  },
  {
    step: '04',
    title: 'YMM4で仕上げ',
    body: '音声、字幕、間合い、素材、権利を人の目で確認。',
    output: '完成判断',
    Icon: MonitorPlay,
    tone: 'gold',
  },
] as const

const galleryItems = [
  {
    title: '台本取得',
    body: 'URL、サイト、キャラクター設定を同じ画面で確認できます。',
    image: '/lp/screen-main-get-scripts-v2.webp',
    alt: '台本取得画面の実アプリスクリーンショット',
  },
  {
    title: '台本編集',
    body: '取得後の下地を見ながら、役割と流れを整えます。',
    image: '/lp/screen-main-script-edit-v2.webp',
    alt: '台本編集画面の実アプリスクリーンショット',
  },
  {
    title: 'AI台本の下書き',
    body: 'AI出力は公開前の下書きとして扱い、人が確認します。',
    image: '/lp/screen-main-script-gen-v2.webp',
    alt: 'AI台本生成結果を確認する実アプリスクリーンショット',
  },
  {
    title: 'Launcher導線',
    body: '更新、認証、課金状態を導入前後に確認できます。',
    image: '/lp/screen-launcher-update-dialog-v2.webp',
    alt: 'ランチャーの更新確認ダイアログを切り出した実アプリスクリーンショット',
  },
] as const

const planCards = [
  {
    name: 'Free',
    price: '¥0',
    lead: '少数URLで流れを見る',
    points: ['起動と初期設定', '少数URLで取得確認', '台本下地編集', 'CSV / .ymmp前準備'],
    href: downloadUrl,
    cta: '無料でダウンロード',
    external: true,
    Icon: Download,
  },
  {
    name: 'Premium',
    price: '¥39,800',
    lead: '税込 / 買い切り / 月額なし',
    points: ['台本取得の制限解除', 'AI台本生成の制限解除', 'Googleログインに紐づく権限同期', '継続制作向け'],
    href: '/purchase/',
    cta: '料金と条件を見る',
    external: false,
    Icon: CreditCard,
  },
] as const

const trustItems = [
  { title: '対応環境', body: 'Windows 10 / 11。Mac、スマホ、ブラウザだけでは完結しません。', Icon: Laptop },
  { title: '編集前提', body: 'YMM4を開く前の下ごしらえ支援です。動画を自動で完成させるものではありません。', Icon: MonitorPlay },
  { title: '権利確認', body: '引用、素材、音声、出典、最終編集は利用者側で確認してください。', Icon: ShieldCheck },
  { title: '保証しないこと', body: '収益化、再生数、審査通過、投稿成果は保証していません。', Icon: TriangleAlert },
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
    '記事URL・スレッドURLから、ゆっくり動画向けの台本下地、CSV、.ymmp、YMM4前準備を整えるWindows向け制作支援ツールです。',
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

function WorkflowBlueprint() {
  return (
    <div className="lp2-blueprint" data-reveal aria-label="YMM4前の下ごしらえワークフロー">
      <div className="lp2-blueprint__header">
        <span>Workflow</span>
        <strong>YMM4前の下ごしらえ</strong>
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
        <strong>動画完成は編集で仕上げる</strong>
        <span>ゆっくりまとめプロセッサーは、公開前の下地とYMM4前準備まで。</span>
      </div>
    </div>
  )
}

export function HomePage() {
  return (
    <>
      <PageMeta
        title="ゆっくりまとめプロセッサー｜URLからYMM4前の下ごしらえ"
        description="記事URL・スレッドURLから、台本下地、CSV、.ymmp前準備まで。YMM4を開く前の下ごしらえを支援するWindows向けツールです。Freeで少数URLから確認できます。"
        keywords="ゆっくりまとめプロセッサー,YMM4,台本下地,CSV,.ymmp,反応集,記事URL,スレッドURL,Windows"
        image="/lp/screen-main-script-edit-v2.webp"
        path="/"
        structuredData={softwareApplicationLd}
      />

      <main className="lp2-home">
        <section className="lp2-hero" aria-labelledby="lp2-hero-heading">
          <div className="lp2-container lp2-hero__grid">
            <div className="lp2-hero__copy" data-reveal>
              <p className="lp2-kicker">Real app first / Windows + YMM4</p>
              <h1 id="lp2-hero-heading">
                <span>URLを貼るだけ</span>
                <span>YMM4前の</span>
                <span>下ごしらえ。</span>
              </h1>
              <p className="lp2-hero__lead">
                記事URL・スレッドURLを貼って、題材候補、台本下地、CSV / .ymmp前準備へ。
                コピペで散らかる作業を、YMM4に入る前の流れとして整えます。
              </p>
              <div className="lp2-hero__actions">
                <a className="lp2-btn lp2-btn--primary" href={downloadUrl} target="_blank" rel="noopener noreferrer">
                  <Download size={18} aria-hidden="true" />
                  無料で少数URLを試す
                </a>
                <a className="lp2-btn lp2-btn--ghost" href="#lp2-demo">
                  <Play size={18} aria-hidden="true" />
                  90秒で流れを見る
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
              <figure className="lp2-product-frame lp2-product-frame--hero">
                <div className="lp2-product-frame__bar" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <strong>Main / 台本編集</strong>
                </div>
                <img
                  src="/lp/screen-main-script-edit-v2.webp"
                  alt="ゆっくりまとめプロセッサーの台本編集画面"
                  loading="eager"
                  decoding="async"
                />
                <figcaption>
                  <span>実アプリ画面</span>
                  <strong>URL取得後の台本下地を、YMM4前準備へつなげる。</strong>
                </figcaption>
              </figure>
              <div className="lp2-flow-strip" aria-label="主な流れ">
                <span>URL入力</span>
                <ArrowRight size={16} aria-hidden="true" />
                <span>台本下地</span>
                <ArrowRight size={16} aria-hidden="true" />
                <span>CSV / .ymmp</span>
                <ArrowRight size={16} aria-hidden="true" />
                <span>YMM4で仕上げ</span>
              </div>
            </div>
          </div>
          <div className="lp2-hero__peek" aria-hidden="true">
            <span>次に確認すること</span>
            <strong>何を入れると、何が出るか</strong>
          </div>
        </section>

        <section className="lp2-band lp2-band--answers" aria-labelledby="lp2-answers-heading">
          <div className="lp2-container">
            <SectionHead
              kicker="購入前にまず知りたいこと"
              title="入力、成果物、YMM4との関係を最初に明確にします。"
              body="機能名を並べる前に、自分の制作フローへ入るかどうかを判断できるようにしています。"
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
              <p className="lp2-kicker">図で見る位置づけ</p>
              <h2 id="lp2-diagram-heading">動画を完成させるツールではなく、YMM4前の下ごしらえを整えるツールです。</h2>
              <p>
                ここを曖昧にすると期待値がズレます。ゆっくりまとめプロセッサーは、URLから台本下地と出力前準備を作るところまでを支援し、完成判断は編集工程に残します。
              </p>
              <div className="lp2-note-panel">
                <ShieldCheck size={20} aria-hidden="true" />
                <strong>AI出力も下書きです。</strong>
                <span>公開前に、権利、出典、読み上げ、字幕、素材を必ず確認してください。</span>
              </div>
            </div>
            <WorkflowBlueprint />
          </div>
        </section>

        <section className="lp2-band lp2-band--workflow" aria-labelledby="lp2-workflow-heading">
          <div className="lp2-container">
            <SectionHead
              kicker="実アプリ画面で追う"
              title="URLを入れてから、YMM4へ渡す前準備まで。"
              body="画面そのものを見せることで、何ができて何ができないかを誤魔化さずに伝えます。"
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
                    alt="URLから台本取得の設定を確認する実アプリ画面"
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
                <div className="lp2-metric-row" aria-label="制作フローの要点">
                  <span><Gauge size={16} aria-hidden="true" />少数URLで確認</span>
                  <span><Layers3 size={16} aria-hidden="true" />素材パスを整理</span>
                  <span><SearchCheck size={16} aria-hidden="true" />編集前に点検</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="lp2-band lp2-band--gallery" aria-labelledby="lp2-gallery-heading">
          <div className="lp2-container">
            <SectionHead
              kicker="本物の画面"
              title="スクショは実アプリから。生成画像でUIを偽装しません。"
              body="Main画面、台本取得、台本編集、Launcher導線のスクリーンショットで導入後の見え方を確認できます。"
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
              <p className="lp2-kicker">90秒デモ</p>
              <h2 id="lp2-demo-heading">動画で流れを見て、下のスクショで細部を見る。</h2>
              <p>
                URL取得から台本下地、CSV / .ymmp前準備までの流れを短く確認できます。
                動画が再生できない環境でも、poster画像と実画面ギャラリーで内容を追えます。
              </p>
              <ol className="lp2-demo-list">
                <li>URLを入力して候補を取得</li>
                <li>台本下地を編集し、会話の流れを整える</li>
                <li>保存先と素材パスを揃え、YMM4で仕上げる</li>
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
              kicker="Free / Premium"
              title="Freeで流れを見て、必要ならPremiumで制限解除。"
              body="Premiumは39,800円税込の買い切りです。月額自動更新はありません。"
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
              kicker="導入前チェック"
              title="用意するものと、保証しないことを先に確認。"
              body="購入前に知りたい前提を隠しません。Windows、YMM4、権利確認、収益化保証の有無をここで整理します。"
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
              kicker="FAQ"
              title="買う前に迷いやすいことだけ、短く。"
              body="詳しい項目はFAQページにまとめています。"
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
              <p className="lp2-kicker">まずは自分のURLから</p>
              <h2 id="lp2-final-heading">Freeで下地の出方を見て、続けるか判断する。</h2>
              <p>
                URLを貼る、候補を見る、台本下地に手を入れる、CSV / .ymmp前準備を確認する。
                その流れが制作に合うかを、購入前に試せます。
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
          <Sparkles className="lp2-final__spark" size={34} aria-hidden="true" />
        </section>
      </main>
    </>
  )
}
