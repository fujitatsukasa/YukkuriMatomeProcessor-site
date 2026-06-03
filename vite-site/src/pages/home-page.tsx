import { Link } from 'react-router-dom'
import type { CSSProperties, ReactNode } from 'react'
import { PageMeta } from '@/components/ui'
import {
  downloadUrl,
  faqGroups,
  legal,
  publicDistribution,
  siteOrigin,
  siteTitle,
} from '@/data/site-content'
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ChevronDown,
  Clock3,
  CreditCard,
  Download,
  ExternalLink,
  Eye,
  FileArchive,
  FileCheck2,
  FileCode2,
  FileSearch,
  Film,
  FolderCog,
  HelpCircle,
  LockKeyhole,
  Monitor,
  MonitorPlay,
  MousePointerClick,
  Play,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  WandSparkles,
  XCircle,
} from 'lucide-react'

const heroBadges = ['Windows 10 / 11', 'YMM4必須', 'Freeで確認', 'Premiumは買い切り'] as const

const heroCandidates = [
  { title: 'コメントの論点が割れている記事', meta: '候補 01 / 本文・反応あり' },
  { title: '短尺化しやすいスレッド', meta: '候補 02 / 会話化しやすい' },
  { title: 'YMM4前に素材パス確認', meta: '候補 03 / 保存先チェック' },
] as const

const scriptRows = [
  { speaker: 'A', text: 'まず、このURLから使う本文候補を選びます。' },
  { speaker: 'B', text: '長い行は読み上げ前に短く整えます。' },
  { speaker: 'A', text: 'CSVと.ymmp前準備を出して、仕上げはYMM4へ。' },
] as const

const canItems = [
  '記事URL・スレッドURLから候補取得',
  '台本下地の整理とAI補助',
  'CSV/.ymmp前準備',
  '保存先・素材パスの確認',
  'Freeで少数URLの導入相性確認',
] as const

const cannotItems = [
  '動画を完全自動で完成させる',
  '収益化や再生数を保証する',
  '素材や引用元の権利確認を代行する',
  'Macやスマホだけで完結する',
  'YMM4なしで最終編集まで行う',
] as const

const firstRunSteps = [
  {
    time: '5分',
    title: 'YMM4.exeを用意',
    body: 'ショートカットではなく、YukkuriMovieMaker4.exe本体の場所を確認します。',
    Icon: Monitor,
  },
  {
    time: '5分',
    title: '保存先を決める',
    body: 'CSV/.ymmpと素材を置くフォルダを先に固定します。',
    Icon: FolderCog,
  },
  {
    time: '5分',
    title: 'URLを1から3件だけ入れる',
    body: '大量取得の前に、自分の題材URLで候補一覧が出るか見ます。',
    Icon: FileSearch,
  },
  {
    time: '10分',
    title: '台本下地を人が確認',
    body: '不要行、長い文、AI補助の結果を読み上げ前に直します。',
    Icon: SearchCheck,
  },
  {
    time: '5分',
    title: 'CSV/.ymmp前準備まで出す',
    body: '保存先、出力形式、素材パスを見てYMM4へ進める状態にします。',
    Icon: FileCheck2,
  },
] as const

const beforeAfterItems = [
  {
    title: 'URLを開いてコピペ',
    before: ['記事を行き来する', '本文を手でコピー', '候補をメモに散らす'],
    after: ['URLを入力', '候補を一覧化', '使う題材だけ選ぶ'],
  },
  {
    title: '台本整理',
    before: ['不要行を探す', '会話順を直す', '読み上げ量を目視調整'],
    after: ['台本下地を編集', '役割と感情を確認', '長い行を分割'],
  },
  {
    title: 'YMM4前準備',
    before: ['保存先を探す', '素材パスを後で直す', 'YMM4で手戻りする'],
    after: ['保存先を固定', 'CSV/.ymmp前準備', 'YMM4で仕上げに集中'],
  },
] as const

const workflowSteps = [
  {
    step: '01',
    title: 'URL入力',
    body: '記事URL・スレッドURLを少数で試し、候補取得の相性を確認します。',
    image: '/product_get_script.webp',
    alt: '記事URLから候補一覧を取得する実アプリ画面',
    Icon: FileSearch,
  },
  {
    step: '02',
    title: '候補取得',
    body: 'タイトル、サムネイル、URLを見ながら動画化する候補を選びます。',
    image: '/product_get_script.webp',
    alt: '候補一覧を確認する実アプリ画面',
    Icon: SearchCheck,
  },
  {
    step: '03',
    title: '台本下地を編集',
    body: '不要行、役割、感情、読み上げ向けの文量を人が確認します。',
    image: '/product_edit_script.webp',
    alt: '取得した台本下地を編集する実アプリ画面',
    Icon: WandSparkles,
  },
  {
    step: '04',
    title: 'CSV/.ymmp前準備',
    body: 'フォーマット、キャラ設定、保存先、素材パスを揃えます。',
    image: '/product_format_list.webp',
    alt: 'CSVと.ymmp前準備のフォーマット管理画面',
    Icon: FileCode2,
  },
  {
    step: '05',
    title: 'YMM4で仕上げ',
    body: '音声、字幕、立ち絵、間合い、書き出しはYMM4側で最終確認します。',
    image: '/product_keyword_material.webp',
    alt: 'YMM4前準備と素材整理を確認する実アプリ画面',
    Icon: MonitorPlay,
  },
] as const

const useCases = [
  {
    title: '反応集・コメント解説',
    input: '記事URL / スレッドURL / コメント候補',
    output: 'タイトル候補 / 台本下地 / 引用確認メモ',
    fit: '賛否、論点、コメント束を整理して動画下地にしたい人',
    poster: '/lp/usecase-reaction-poster.webp',
    video: '/lp/usecase-reaction.mp4',
    Icon: HelpCircle,
  },
  {
    title: '掛け合い解説',
    input: '題材メモ / 取得済み本文 / 話者指定',
    output: '会話台本 / 役割 / 感情メモ',
    fit: '読み上げ前に、会話として確認できる下書きを作りたい人',
    poster: '/lp/usecase-dialogue-poster.webp',
    video: '/lp/usecase-dialogue.mp4',
    Icon: Sparkles,
  },
  {
    title: '縦型ショートドラマ',
    input: '短い題材 / セリフ案 / 出力形式',
    output: '導入 / 反転 / 締めの短尺構成',
    fit: '短い尺で入り、反転、締めを整理したい人',
    poster: '/lp/usecase-shorts-poster.webp',
    video: '/lp/usecase-shorts.mp4',
    Icon: Film,
  },
] as const

const galleryItems = [
  {
    title: 'URL入力から候補取得',
    body: '候補一覧にタイトル、URL、サムネイルが並ぶか確認します。',
    image: '/product_get_script.webp',
    alt: 'URL入力から記事候補を取得する実アプリ画面',
  },
  {
    title: '台本下地を編集',
    body: '不要行、役割、感情、読み上げ量を見ながら整えます。',
    image: '/product_edit_script.webp',
    alt: '取得した台本下地を編集する実アプリ画面',
  },
  {
    title: 'YMM4前準備と素材整理',
    body: '保存先、素材パス、キャラ設定をYMM4前に確認します。',
    image: '/product_keyword_material.webp',
    alt: 'YMM4前準備と素材整理を確認する実アプリ画面',
  },
  {
    title: 'AI台本生成',
    body: 'AI出力は下書きとして使い、公開前に人が確認します。',
    image: '/product_ai_script.webp',
    alt: 'AI台本生成と話者指定の実アプリ画面',
  },
  {
    title: 'YouTube分析と候補比較',
    body: '分析機能を使う段階でYouTube APIキーを設定します。',
    image: '/product_youtube_info.webp',
    alt: 'YouTube分析と候補比較の実アプリ画面',
  },
  {
    title: 'フォーマット管理',
    body: 'CSV/.ymmp前準備の形式を再利用しやすくします。',
    image: '/product_format_list.webp',
    alt: 'フォーマット管理とYMM4前準備の実アプリ画面',
  },
] as const

const pricingCards = [
  {
    name: 'Free',
    price: '¥0',
    label: 'まず導入相性を確認',
    body: '起動、初期設定、少数URL取得、台本下地編集、CSV/.ymmp前準備まで確認できます。',
    points: ['少数URLで流れを見る', 'YMM4前準備まで試す', '購入前の相性確認'],
    cta: '無料でダウンロード',
    href: downloadUrl,
    external: true,
  },
  {
    name: 'Premium',
    price: '¥39,800',
    label: '買い切り / 税込',
    body: '台本取得とAI台本生成の利用制限を解除します。月額自動更新はありません。',
    points: ['台本取得の制限解除', 'AI台本生成の制限解除', 'Googleアカウントに権限保持'],
    cta: '料金を見る',
    href: '/purchase/',
    external: false,
  },
] as const

const safetyChecks = [
  {
    title: '公式配布元から取得',
    body: 'インストーラーとポータブルZIPは公式ダウンロードページから確認できます。',
    Icon: ShieldCheck,
  },
  {
    title: 'SHA256を照合',
    body: 'ファイル名、サイズ、SHA256を表示し、取り違えを防ぎます。',
    Icon: LockKeyhole,
  },
  {
    title: 'Windows警告への案内',
    body: '自己署名のため警告が出る場合があります。公式URLとハッシュを確認してください。',
    Icon: AlertTriangle,
  },
] as const

const priorityQuestions = [
  'Macで使えますか？',
  'Windows専用ですか？',
  'YMM4は必須ですか？',
  '無料版では何ができますか？',
  'Premiumで何が解除されますか？',
  'YouTube APIキーは必要ですか？',
  '動画は自動で完成しますか？',
  'AIが全部自動で動画を作りますか？',
  '対応していないURLは取得できますか？',
  '返金条件は何ですか？',
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

function WorkflowMock() {
  return (
    <div className="lp-workflow-mock" aria-label="URLからYMM4前準備までの疑似デモ">
      <div className="lp-workflow-mock__url">
        <span>URL</span>
        <strong>https://example.com/thread/...</strong>
        <MousePointerClick size={16} aria-hidden="true" />
      </div>
      <div className="lp-workflow-mock__columns">
        <div className="lp-workflow-panel lp-workflow-panel--candidates">
          <span className="lp-mini-label">候補取得</span>
          {heroCandidates.map((item, index) => (
            <article key={item.title} style={{ '--delay': `${index * 0.18}s` } as CSSProperties}>
              <small>{item.meta}</small>
              <strong>{item.title}</strong>
            </article>
          ))}
        </div>
        <div className="lp-workflow-panel lp-workflow-panel--script">
          <span className="lp-mini-label">台本下地</span>
          {scriptRows.map((row, index) => (
            <div key={row.text} className="lp-script-row" style={{ '--delay': `${0.28 + index * 0.16}s` } as CSSProperties}>
              <span>{row.speaker}</span>
              <p>{row.text}</p>
            </div>
          ))}
        </div>
        <div className="lp-workflow-panel lp-workflow-panel--files">
          <span className="lp-mini-label">出力前準備</span>
          <div>
            <FileArchive size={18} aria-hidden="true" />
            <strong>script.csv</strong>
          </div>
          <div>
            <FileCode2 size={18} aria-hidden="true" />
            <strong>prep.ymmp</strong>
          </div>
          <small>仕上げはYMM4</small>
        </div>
      </div>
    </div>
  )
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
    <Link className={className} to={href}>
      {children}
    </Link>
  )
}

export function HomePage() {
  return (
    <>
      <PageMeta
        title="ゆっくりまとめプロセッサー｜URLからYMM4前の下ごしらえまで"
        description="記事URL・スレッドURLから、候補取得、台本下地、CSV/.ymmp前準備まで。YMM4で仕上げる前の面倒な前工程を短くするWindows向け制作支援ツールです。Freeで少数URLから確認できます。"
        keywords="ゆっくりまとめプロセッサー,YMM4,台本作成,CSV,.ymmp,反応集,記事URL,スレッドURL,ゆっくり解説"
        image="/lp/hero-workflow-dummy.webp"
        path="/"
        structuredData={softwareApplicationLd}
      />

      <main className="lp-home">
        <section className="lp-hero" aria-labelledby="lp-hero-heading">
          <img className="lp-hero__bg" src="/lp/hero-workflow-dummy.webp" alt="" aria-hidden="true" />
          <div className="lp-hero__content">
            <div className="lp-hero__copy">
              <p className="lp-kicker">YMM4前の制作下ごしらえ</p>
              <h1 id="lp-hero-heading">
                URLを貼るだけ。
                <span>YMM4前の下ごしらえを、一気に片づける。</span>
              </h1>
              <p className="lp-hero__lead">
                記事URL・スレッドURLから、候補取得、台本下地、CSV/.ymmp前準備まで。
                仕上げはYMM4。面倒な前工程を、Freeでまず確認できます。
              </p>
              <div className="lp-hero__actions">
                <a className="lp-btn lp-btn--primary" href={downloadUrl} target="_blank" rel="noopener noreferrer">
                  <Download size={18} />
                  無料で少数URLを試す
                </a>
                <a className="lp-btn lp-btn--ghost" href="#demo-video">
                  <Play size={18} />
                  90秒で流れを見る
                </a>
              </div>
              <div className="lp-hero__badges" role="list" aria-label="導入前提">
                {heroBadges.map((badge) => (
                  <span key={badge} role="listitem">
                    <BadgeCheck size={14} />
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            <div className="lp-hero__demo">
              <div className="lp-hero-loop" aria-label="URL入力からYMM4前準備までのダミーループ動画">
                <video muted autoPlay loop playsInline preload="metadata" poster="/lp/hero-workflow-loop-poster.webp">
                  <source src="/lp/hero-workflow-loop.mp4" type="video/mp4" />
                </video>
              </div>
              <WorkflowMock />
              <div className="lp-hero__screens" aria-label="実アプリ画面の例">
                {workflowSteps.slice(0, 3).map((step) => (
                  <figure key={step.step}>
                    <img src={step.image} alt={step.alt} loading={step.step === '01' ? 'eager' : 'lazy'} decoding="async" />
                    <figcaption>{step.title}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="lp-section lp-answer" aria-labelledby="lp-answer-heading">
          <div className="lp-section__head">
            <p className="lp-kicker">30秒で分かる対応範囲</p>
            <h2 id="lp-answer-heading">できることと、できないことを先に分ける</h2>
            <p>購入前に期待値を合わせるため、便利な範囲と保証しない範囲を同じ画面で確認できます。</p>
          </div>
          <div className="lp-answer__grid">
            <article className="lp-answer-card lp-answer-card--yes">
              <h3>
                <CheckCircle2 size={20} />
                できること
              </h3>
              <ul>
                {canItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="lp-answer-card lp-answer-card--no">
              <h3>
                <XCircle size={20} />
                できないこと / 保証しないこと
              </h3>
              <ul>
                {cannotItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p>だから、まずFreeで自分のURLと制作環境に合うか確認できます。</p>
            </article>
          </div>
        </section>

        <section className="lp-section lp-first-run" aria-labelledby="lp-first-run-heading">
          <div className="lp-section__head lp-section__head--split">
            <div>
              <p className="lp-kicker">初回30分の確認ルート</p>
              <h2 id="lp-first-run-heading">買う前に、少数URLでYMM4直前まで通す</h2>
            </div>
            <p>
              YouTube APIキーは分析機能を使う段階で設定すれば十分です。
              最初は起動、保存先、少数URL、台本下地、CSV/.ymmp前準備だけを見ます。
            </p>
          </div>
          <div className="lp-first-run__grid">
            {firstRunSteps.map((step, index) => {
              const StepIcon = step.Icon
              return (
                <article key={step.title} className="lp-step-card" style={{ '--delay': `${index * 0.05}s` } as CSSProperties}>
                  <span>{step.time}</span>
                  <StepIcon size={20} aria-hidden="true" />
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </article>
              )
            })}
          </div>
          <div className="lp-inline-actions">
            <Link className="lp-link-card" to="/instructions/">
              使い方を見る
              <ArrowRight size={16} />
            </Link>
            <a className="lp-link-card" href={downloadUrl} target="_blank" rel="noopener noreferrer">
              無料でダウンロード
              <ExternalLink size={16} />
            </a>
          </div>
        </section>

        <section className="lp-section lp-before-after" aria-labelledby="lp-before-after-heading">
          <div className="lp-section__head">
            <p className="lp-kicker">Before / After</p>
            <h2 id="lp-before-after-heading">散らかった前工程を、一本の制作フローへ</h2>
            <p>短縮するのは完成動画ではありません。YMM4に入る前の調査、台本整理、出力前準備です。</p>
          </div>
          <div className="lp-before-after__grid">
            {beforeAfterItems.map((item) => (
              <article key={item.title} className="lp-ba-card">
                <h3>{item.title}</h3>
                <div>
                  <section>
                    <span>Before</span>
                    <ul>
                      {item.before.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </section>
                  <section>
                    <span>After</span>
                    <ul>
                      {item.after.map((point) => (
                        <li key={point}>
                          <CheckCircle2 size={14} />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="lp-section lp-sticky" aria-labelledby="lp-workflow-heading">
          <div className="lp-section__head lp-section__head--split">
            <div>
              <p className="lp-kicker">Sticky Workflow Demo</p>
              <h2 id="lp-workflow-heading">URLから、YMM4で仕上げる直前まで</h2>
            </div>
            <p>左でステップを読み、右で実画面を確認できます。モバイルでは縦に積み、重い演出を抑えます。</p>
          </div>
          <div className="lp-sticky__layout">
            <div className="lp-sticky__steps">
              {workflowSteps.map((step) => {
                const StepIcon = step.Icon
                return (
                  <article key={step.step} className="lp-workflow-step">
                    <span>
                      <StepIcon size={17} />
                      STEP {step.step}
                    </span>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </article>
                )
              })}
            </div>
            <aside className="lp-sticky__mock" aria-label="実アプリ画面の流れ">
              <WorkflowMock />
              <figure>
                <img src="/product_edit_script.webp" alt="台本下地を編集する実アプリ画面" loading="lazy" decoding="async" />
                <figcaption>実アプリ画面を確認しながら、台本下地を人が見直します。</figcaption>
              </figure>
            </aside>
          </div>
        </section>

        <section className="lp-section lp-usecases" aria-labelledby="lp-usecases-heading">
          <div className="lp-section__head">
            <p className="lp-kicker">用途別</p>
            <h2 id="lp-usecases-heading">自分の動画ジャンルに合うかを見る</h2>
            <p>既存キャラクターや既存IP風の表現ではなく、抽象的な会話・ファイル・タイムラインで用途を示します。</p>
          </div>
          <div className="lp-usecases__grid">
            {useCases.map((item) => {
              const UseCaseIcon = item.Icon
              return (
                <article key={item.title} className="lp-usecase-card">
                  <div className="lp-usecase-card__media">
                    <video muted autoPlay loop playsInline preload="metadata" poster={item.poster} aria-label={`${item.title}のダミー動画プレビュー`}>
                      <source src={item.video} type="video/mp4" />
                    </video>
                    <img src={item.poster} alt="" loading="lazy" decoding="async" aria-hidden="true" />
                  </div>
                  <div className="lp-usecase-card__body">
                    <span>
                      <UseCaseIcon size={16} />
                      用途
                    </span>
                    <h3>{item.title}</h3>
                    <dl>
                      <div>
                        <dt>入力</dt>
                        <dd>{item.input}</dd>
                      </div>
                      <div>
                        <dt>成果物</dt>
                        <dd>{item.output}</dd>
                      </div>
                      <div>
                        <dt>向いている人</dt>
                        <dd>{item.fit}</dd>
                      </div>
                    </dl>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section className="lp-section lp-gallery" aria-labelledby="lp-gallery-heading">
          <div className="lp-section__head lp-section__head--split">
            <div>
              <p className="lp-kicker">実画面ギャラリー</p>
              <h2 id="lp-gallery-heading">実アプリ画面で、入力から出力まで確認する</h2>
            </div>
            <Link className="lp-link-card" to="/samples/">
              サンプルページを見る
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="lp-gallery__grid">
            {galleryItems.map((item) => (
              <figure key={item.title} className="lp-gallery-card">
                <img src={item.image} alt={item.alt} loading="lazy" decoding="async" />
                <figcaption>
                  <strong>{item.title}</strong>
                  <span>{item.body}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="demo-video" className="lp-section lp-video" aria-labelledby="lp-video-heading">
          <div className="lp-section__head">
            <p className="lp-kicker">動画デモ枠</p>
            <h2 id="lp-video-heading">90秒で、使う瞬間を確認する</h2>
            <p>本番動画は差し替え予定です。今はダミーmp4とposterで、壊れない動画枠だけ先に用意しています。</p>
          </div>
          <div className="lp-video__layout">
            <div className="lp-video-player">
              <video controls playsInline preload="metadata" poster="/lp/main-demo-90s-poster.webp" aria-label="90秒メインデモのダミー動画">
                <source src="/lp/main-demo-90s.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="lp-video__copy">
              <span>
                <Clock3 size={16} />
                推奨構成 60から90秒
              </span>
              <ol>
                <li>URL探し・コピペ・台本整理の悩み</li>
                <li>記事URL・スレッドURLを入力</li>
                <li>候補取得、台本下地編集、CSV/.ymmp前準備</li>
                <li>最終編集はYMM4で行う</li>
                <li>Freeで少数URLを試すCTA</li>
              </ol>
            </div>
          </div>
        </section>

        <section className="lp-section lp-pricing" aria-labelledby="lp-pricing-heading">
          <div className="lp-section__head">
            <p className="lp-kicker">Free / Premium</p>
            <h2 id="lp-pricing-heading">Freeで合うと分かってから、Premiumを検討する</h2>
            <p>Premiumを無理に煽りません。39,800円税込の買い切りなので、Freeで実URLを通してから判断できます。</p>
          </div>
          <div className="lp-pricing__grid">
            {pricingCards.map((plan) => (
              <article key={plan.name} className={`lp-price-card lp-price-card--${plan.name.toLowerCase()}`}>
                <span>{plan.label}</span>
                <h3>{plan.name}</h3>
                <strong>{plan.price}</strong>
                <p>{plan.body}</p>
                <ul>
                  {plan.points.map((point) => (
                    <li key={point}>
                      <CheckCircle2 size={15} />
                      {point}
                    </li>
                  ))}
                </ul>
                <CtaLink href={plan.href} external={plan.external} className="lp-card-link">
                  {plan.name === 'Premium' ? <CreditCard size={16} /> : <Download size={16} />}
                  {plan.cta}
                </CtaLink>
              </article>
            ))}
          </div>
          <p className="lp-pricing__note">
            購入はアプリ内導線からStripe Checkoutで行います。返金条件は返金・キャンセルポリシーに従います。
            収益化、再生数、完成品質は保証しません。
          </p>
        </section>

        <section className="lp-section lp-safety" aria-labelledby="lp-safety-heading">
          <div className="lp-section__head lp-section__head--split">
            <div>
              <p className="lp-kicker">安全確認 / 配布物確認</p>
              <h2 id="lp-safety-heading">インストール前に、配布物を確認できる</h2>
            </div>
            <p>自己署名のためWindowsやSmartScreenの警告が出る場合があります。公式URL、ファイル名、SHA256を照合してから起動してください。</p>
          </div>
          <div className="lp-safety__layout">
            <div className="lp-safety__cards">
              {safetyChecks.map((item) => {
                const SafetyIcon = item.Icon
                return (
                  <article key={item.title}>
                    <SafetyIcon size={20} />
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </article>
                )
              })}
            </div>
            <aside className="lp-distribution">
              <span>最新版 {publicDistribution.version}</span>
              <h3>{publicDistribution.assets.setup.fileName}</h3>
              <dl>
                <div>
                  <dt>チャンネル</dt>
                  <dd>{publicDistribution.channel}</dd>
                </div>
                <div>
                  <dt>インストーラー SHA256</dt>
                  <dd>
                    <code>{publicDistribution.assets.setup.sha256}</code>
                  </dd>
                </div>
                <div>
                  <dt>ポータブルZIP</dt>
                  <dd>{publicDistribution.assets.portable.fileName}</dd>
                </div>
              </dl>
              <Link className="lp-card-link" to="/download/">
                <Eye size={16} />
                ダウンロードページで確認
              </Link>
            </aside>
          </div>
        </section>

        <section className="lp-section lp-faq" aria-labelledby="lp-faq-heading">
          <div className="lp-section__head">
            <p className="lp-kicker">FAQ</p>
            <h2 id="lp-faq-heading">購入前の不安を最後に潰す</h2>
            <p>Windows、YMM4、Free、Premium、返金、保証外範囲を短く確認できます。</p>
          </div>
          <div className="lp-faq__list">
            {priorityFaqItems.map((item, index) => (
              <details key={item.question} className="lp-faq-item" open={index < 3}>
                <summary>
                  <span>{item.question}</span>
                  <ChevronDown size={17} aria-hidden="true" />
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="lp-final" aria-labelledby="lp-final-heading">
          <div>
            <p className="lp-kicker">まずは自分のURLで確認</p>
            <h2 id="lp-final-heading">YMM4前の流れを、Freeで一度通してみる。</h2>
            <p>
              URLを貼る、候補を選ぶ、台本下地を人が確認する、CSV/.ymmp前準備を出す。
              そこまで合うと分かってからPremiumを検討できます。
            </p>
          </div>
          <div className="lp-final__actions">
            <a className="lp-btn lp-btn--primary" href={downloadUrl} target="_blank" rel="noopener noreferrer">
              <Download size={18} />
              無料でダウンロード
            </a>
            <Link className="lp-btn lp-btn--ghost" to="/samples/">
              <MonitorPlay size={18} />
              実画面を見る
            </Link>
            <Link className="lp-btn lp-btn--ghost" to="/purchase/">
              <CreditCard size={18} />
              料金を見る
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
