import { useState } from 'react'
import { Link } from 'react-router-dom'
import { InteractiveCard, PageIntro, PageMeta, Section } from '@/components/ui'
import { media } from '@/data/assets'
import { downloadUrl } from '@/data/site-content'
import { MetricStrip } from '@/pages/shared'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  FileSearch,
  FolderCog,
  Send,
  Settings2,
  Wrench,
} from 'lucide-react'

const onboardingChecks = [
  'Windows 10 / 11 環境であること',
  'YMM4 の実行ファイルパスを指定できること',
  '解凍先フォルダに書き込み権限があること',
  '必要に応じて YouTube API キーを用意できること',
] as const

const supportBundle = [
  '対象URLと対応サイト名',
  '再現手順と発生時刻',
  'YMM4実行パスと保存先設定',
  'エラーメッセージ全文またはスクリーンショット',
] as const

const downloadMetrics = [
  { value: '10分', label: '導入相性を判断', detail: 'Freeで基本導線とYMM4前準備まで確認' },
  { value: '4STEP', label: '最初に触る順番', detail: '設定 -> 取得 -> 整形 -> 受け渡し' },
  { value: 'YMM4', label: '後工程の手戻りを削減', detail: '保存先、CSV、連携パスの整合を先に揃える' },
] as const

const instructionMetrics = [
  { value: '4STEP', label: '最短導線で把握', detail: '初期設定から受け渡しまで一本で確認' },
  { value: 'テンプレ運用', label: '途中で迷わない軸', detail: '単発取得ではなく継続運用まで見据える' },
  { value: 'YMM4前準備', label: '編集前に整える', detail: 'CSV、キャラ設定、立ち絵パスの整理を前倒し' },
] as const

const downloadSupportCards = [
  {
    eyebrow: 'PRE-FLIGHT',
    title: '導入前チェック',
    body: '最初に環境と前提を揃えるだけで、導入後の詰まり方がかなり減ります。',
    items: onboardingChecks,
  },
  {
    eyebrow: 'FAST SUPPORT',
    title: '問い合わせ時にあると速い情報',
    body: 'サポートへ渡す情報を先に決めておくと、切り分けが速くなります。',
    items: supportBundle,
  },
  {
    eyebrow: 'NEXT',
    title: '導入後に進むべきページ',
    body: '使い方で手順、料金で運用規模、FAQで詰まりどころを確認すると導入判断が揃います。',
    links: [
      { label: '使い方を見る', href: '/instructions/' },
      { label: '料金を確認', href: '/purchase/' },
      { label: 'FAQを開く', href: '/faq/' },
    ],
  },
] as const

const instructionGuardrails = [
  {
    eyebrow: 'KEEP THIS',
    title: '最初に固定する設定',
    body: 'YMM4 パス、保存先、テンプレート運用の方針を先に決めると、途中で導線が崩れにくくなります。',
    points: ['実行パスと保存先を固定', '運用フォルダ命名を揃える', 'YouTube 分析を使うなら API キーも設定'],
  },
  {
    eyebrow: 'DO NOT SKIP',
    title: 'テンプレ運用は入口だけで終えない',
    body: '取得した台本を単発で終わらせず、`.ymmp` や CSV と一緒に型へ戻すと継続投稿が安定します。',
    points: ['`.ymmp` からフォーマット追加', '台本の型を使い回す前提で整形', 'キャラ設定と立ち絵パスを前工程で整理'],
  },
  {
    eyebrow: 'WHEN STUCK',
    title: '詰まったら切り分ける順番',
    body: '設定、URL、保存先、API キーの順に確認すると、無駄に深掘りしにくくなります。',
    points: ['YMM4 パスの再確認', '対象URLと対応サイト状況', '保存先の権限と空き容量'],
  },
] as const

type GuideScene = {
  key: string
  eyebrow: string
  title: string
  body: string
  image: string
  alt: string
  checkpoint: string
  points: readonly string[]
  Icon: typeof FileSearch
}

const downloadScenes: readonly GuideScene[] = [
  {
    key: 'setup',
    eyebrow: 'STEP 01',
    title: 'YMM4 パスと保存先を先に固定する',
    body: '最初に設定を終えることで、後の台本取得や出力で迷う回数を減らします。YouTube 分析を使うなら API キーもここで揃えます。',
    image: '/product_guide.webp',
    alt: '内蔵ガイドと設定確認のイメージ',
    checkpoint: '起動直後に固定する設定が揃う',
    points: ['YMM4 実行ファイルの絶対パスを登録', 'CSV や素材の保存先フォルダを決める', '必要に応じて API キーを設定する'],
    Icon: Wrench,
  },
  {
    key: 'collect',
    eyebrow: 'STEP 02',
    title: '対応サイトから記事とスレッドを取得する',
    body: 'まずは少ない件数で、記事取得 -> 候補選択 -> 台本化の流れを一度通して、導入相性を確認します。',
    image: '/product_get_script.webp',
    alt: '対応サイトから記事候補を取得する画面',
    checkpoint: 'URL から台本取得までの入口が通る',
    points: ['対象URLを入力して候補を一覧化', '少数件で最初の手順を固定', '取得候補を比較して動画化する題材を絞る'],
    Icon: FileSearch,
  },
  {
    key: 'shape',
    eyebrow: 'STEP 03',
    title: '台本整形と AI 補助の使いどころを掴む',
    body: '取得した台本をそのまま流さず、改行補助、感情分析、役割整理で「使える下書き」に寄せる流れを確認します。',
    image: '/product_edit_script.webp',
    alt: '台本整形と編集の画面',
    checkpoint: 'AI 補助をどこで入れるか判断できる',
    points: ['不要行や見出しを整理する', '感情分析と改行補助を必要箇所だけ使う', 'テンプレート化しやすい粒度まで整える'],
    Icon: Bot,
  },
  {
    key: 'handoff',
    eyebrow: 'STEP 04',
    title: 'YMM4 前準備まで一続きで確認する',
    body: 'CSV、キャラ設定、立ち絵パス変更など、編集前に揃えるべきものをここで整理しておくと、後工程の手戻りを減らせます。',
    image: '/product_keyword_material.webp',
    alt: 'YMM4 前準備と素材整理の画面',
    checkpoint: '編集に入る前の準備が揃う',
    points: ['CSV 出力と保存先を確認', 'キャラ設定や立ち絵パスの整合を確認', 'YMM4 に渡す前の最終チェックを固定する'],
    Icon: Send,
  },
] as const

const instructionScenes: readonly GuideScene[] = [
  {
    key: 'setup',
    eyebrow: 'STAGE 01',
    title: '初期設定を最初に終える',
    body: 'YMM4 パス、保存先、YouTube 分析の前提を先に揃えると、後の手順が一本化しやすくなります。',
    image: '/product_guide.webp',
    alt: '初期設定とガイドの画面',
    checkpoint: '設定由来の詰まりを最小化する',
    points: ['YMM4 パスを登録', '保存先フォルダを固定', '分析を使うなら API キーも準備'],
    Icon: Wrench,
  },
  {
    key: 'script',
    eyebrow: 'STAGE 02',
    title: 'ネタ取得から台本化までを通す',
    body: '対象サイトやスレッド URL を入力し、候補を選んで台本化します。まずは少数件で流れを固定すると安定します。',
    image: '/product_get_script.webp',
    alt: '記事取得と候補選択の画面',
    checkpoint: 'ネタ取得の最短導線を掴む',
    points: ['候補一覧から動画化する題材を選ぶ', '台本取得と整形を一続きで回す', '必要に応じて AI 補助へ繋げる'],
    Icon: FileSearch,
  },
  {
    key: 'template',
    eyebrow: 'STAGE 03',
    title: 'テンプレート運用へ戻せる形にする',
    body: '単発の一本で終わらせず、`.ymmp` や CSV と一緒に次の型へ戻すことで、継続投稿の再現性が上がります。',
    image: '/product_format_list.webp',
    alt: 'テンプレートとフォーマット管理の画面',
    checkpoint: '型を増やす前提で運用できる',
    points: ['`.ymmp` からフォーマット追加', '役割や感情の型を揃える', '次の動画にも使い回せる粒度に整える'],
    Icon: Settings2,
  },
  {
    key: 'handoff',
    eyebrow: 'STAGE 04',
    title: 'YMM4 へ受け渡す前に最終確認する',
    body: 'CSV、キャラ設定、立ち絵パス、読み方監査までを前工程で確認してから渡すと、編集工程が軽くなります。',
    image: '/product_keyword_material.webp',
    alt: '素材整理とYMM4前準備の画面',
    checkpoint: '後工程の修正コストを減らす',
    points: ['CSV と保存先の整合を確認', 'キャラ設定や素材パスを最終確認', '気になる読み方を先に監査する'],
    Icon: FolderCog,
  },
] as const

function GuideSceneSwitcher({
  title,
  lead,
  scenes,
  ariaLabel,
}: {
  title: string
  lead: string
  scenes: readonly GuideScene[]
  ariaLabel: string
}) {
  const [activeKey, setActiveKey] = useState(scenes[0]?.key ?? '')
  const activeScene = scenes.find((scene) => scene.key === activeKey) ?? scenes[0]

  if (!activeScene) return null

  return (
    <div className="guide-scene-switcher">
      <div className="subpage-section-head">
        <p>{title}</p>
        <h2>{lead}</h2>
      </div>

      <div className="guide-scene-switcher__tabs" role="tablist" aria-label={ariaLabel}>
        {scenes.map((scene) => {
          const SceneIcon = scene.Icon
          const isActive = scene.key === activeScene.key
          return (
            <button
              key={scene.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`guide-scene-switcher__tab${isActive ? ' is-active' : ''}`}
              onClick={() => setActiveKey(scene.key)}
            >
              <span className="guide-scene-switcher__tab-icon" aria-hidden="true">
                <SceneIcon size={16} />
              </span>
              <span>
                <strong>{scene.eyebrow}</strong>
                <small>{scene.title}</small>
              </span>
            </button>
          )
        })}
      </div>

      <InteractiveCard as="section" className="guide-scene-switcher__panel premium-glass">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeScene.key}
            className="guide-scene-switcher__panel-inner"
            initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -18, filter: 'blur(8px)' }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="guide-scene-switcher__copy">
              <span className="guide-scene-switcher__eyebrow">{activeScene.eyebrow}</span>
              <h3>{activeScene.title}</h3>
              <p>{activeScene.body}</p>

              <div className="guide-scene-switcher__checkpoint">
                <span>この段階で見えること</span>
                <strong>{activeScene.checkpoint}</strong>
              </div>

              <ul className="guide-scene-switcher__checks">
                {activeScene.points.map((point) => (
                  <li key={point}>
                    <BadgeCheck size={16} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <figure className="guide-scene-switcher__visual">
              <div className="guide-scene-switcher__screen">
                <img src={activeScene.image} alt={activeScene.alt} loading="lazy" decoding="async" />
              </div>
              <figcaption>{activeScene.alt}</figcaption>
            </figure>
          </motion.div>
        </AnimatePresence>
      </InteractiveCard>
    </div>
  )
}

export function DownloadPage() {
  return (
    <>
      <PageMeta
        title="ダウンロード"
        description="最新版ダウンロード、Windows / YMM4 の前提、初回導入で確認できる機能、サポートに渡すべき情報をまとめて確認できます。"
        keywords="ダウンロード, 初回導入, YMM4, テンプレート運用, 導入前チェック, ゆっくりまとめプロセッサー"
        image={media.modernWorkspace}
        path="/download/"
      />

      <main className="brand-shell">
        <PageIntro
          kicker="ダウンロード"
          title="最新版を入手する"
          lead="Windows / YMM4 の前提を確認し、そのまま初回導入の動作確認に入れます"
          actions={[
            { label: '最新版をダウンロード', href: downloadUrl, variant: 'primary', external: true },
            { label: '使い方を見る', href: '/instructions/', variant: 'ghost' },
          ]}
          flowLinks={[
            { label: 'FAQを見る', href: '/faq/' },
            { label: '料金を確認', href: '/purchase/' },
          ]}
          media={
            <InteractiveCard className="page-visual-card premium-glass">
              <img
                className="page-visual-card__image"
                src="/generated/template-ops-studio-v1.webp"
                alt="テンプレート運用、台本作成、YMM4前準備までをまとめたスタジオビジュアル"
              />
              <div className="page-visual-card__meta">
                <strong>初回導入で確認すべきのは、単発取得ではなく運用全体</strong>
                <span>対応サイト取得、テンプレート運用、YMM4前準備までの相性をここで確認します。</span>
              </div>
            </InteractiveCard>
          }
        />

        <Section>
          <MetricStrip items={[...downloadMetrics]} ariaLabel="ダウンロードページの要点" />
        </Section>

        <Section alt>
          <GuideSceneSwitcher
            title="導入の流れ"
            lead="最初の10分で確認する順番を、実画面つきで先に固定する"
            scenes={downloadScenes}
            ariaLabel="ダウンロード後の確認手順"
          />
        </Section>

        <Section>
          <div className="subpage-card-grid subpage-card-grid--3">
            <InteractiveCard className="release-panel premium-glass subpage-card">
              <span className="subpage-card__eyebrow">{downloadSupportCards[0].eyebrow}</span>
              <h2>{downloadSupportCards[0].title}</h2>
              <p>{downloadSupportCards[0].body}</p>
              <ul className="brand-list subpage-card__list">
                {downloadSupportCards[0].items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </InteractiveCard>

            <InteractiveCard className="release-panel premium-glass subpage-card">
              <span className="subpage-card__eyebrow">{downloadSupportCards[1].eyebrow}</span>
              <h2>{downloadSupportCards[1].title}</h2>
              <p>{downloadSupportCards[1].body}</p>
              <ul className="brand-list subpage-card__list">
                {downloadSupportCards[1].items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </InteractiveCard>

            <InteractiveCard className="release-panel premium-glass subpage-card">
              <span className="subpage-card__eyebrow">{downloadSupportCards[2].eyebrow}</span>
              <h2>{downloadSupportCards[2].title}</h2>
              <p>{downloadSupportCards[2].body}</p>
              <div className="subpage-link-stack">
                {downloadSupportCards[2].links.map((item) => (
                  <Link key={item.href} to={item.href}>
                    <span>{item.label}</span>
                    <ArrowRight size={16} />
                  </Link>
                ))}
              </div>
            </InteractiveCard>
          </div>
        </Section>
      </main>
    </>
  )
}

export function InstructionsPage() {
  return (
    <>
      <PageMeta
        title="使い方ガイド"
        description="初期設定、対応サイト取得、テンプレート運用、YMM4前準備、失敗時の対処をまとめた公式ガイドです。"
        keywords="使い方, 初期設定, テンプレート運用, YMM4, 台本取得, AI補助"
        image={media.verticalMonitor}
        path="/instructions/"
      />

      <main className="brand-shell">
        <PageIntro
          kicker="使い方ガイド"
          title="初期設定から編集開始まで"
          lead="テンプレート運用まで見据えて、最短で安定運用に入るためのガイド"
          actions={[
            { label: '最新版をダウンロード', href: downloadUrl, variant: 'primary', external: true },
            { label: 'FAQを見る', href: '/faq/', variant: 'ghost' },
          ]}
          flowLinks={[
            { label: '料金を確認', href: '/purchase/' },
            { label: 'お問い合わせ', href: '/contact/' },
          ]}
          media={
            <InteractiveCard className="page-visual-card premium-glass">
              <img
                className="page-visual-card__image"
                src="/product_guide.webp"
                alt="内蔵ガイドと初期設定の画面"
              />
              <div className="page-visual-card__meta">
                <strong>読むだけでなく、実画面と一緒に手順を固定する</strong>
                <span>初回設定、台本取得、テンプレ運用、YMM4受け渡しまでを、途中で迷わない順番に並べています。</span>
              </div>
            </InteractiveCard>
          }
        />

        <Section>
          <MetricStrip items={[...instructionMetrics]} ariaLabel="使い方ガイドの要点" />
        </Section>

        <Section alt>
          <GuideSceneSwitcher
            title="段階別ガイド"
            lead="設定から受け渡しまでを、実画面つきで一本の導線にまとめる"
            scenes={instructionScenes}
            ariaLabel="使い方の段階切り替え"
          />
        </Section>

        <Section>
          <div className="subpage-card-grid subpage-card-grid--3">
            {instructionGuardrails.map((card) => (
              <InteractiveCard key={card.title} className="release-panel premium-glass subpage-card">
                <span className="subpage-card__eyebrow">{card.eyebrow}</span>
                <h2>{card.title}</h2>
                <p>{card.body}</p>
                <ul className="brand-list subpage-card__list">
                  {card.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </InteractiveCard>
            ))}
          </div>

          <InteractiveCard className="release-panel premium-glass subpage-support-callout">
            <div>
              <span className="subpage-card__eyebrow">SUPPORT ROUTE</span>
              <h2>それでも詰まるときは、切り分け情報をまとめて送る</h2>
              <p>
                実行パス、保存先、対象URL、発生時刻、エラー全文が揃っていると、原因の切り分けがかなり速くなります。
              </p>
            </div>
            <div className="subpage-support-callout__actions">
              <Link className="brand-btn brand-btn--ghost" to="/faq/">
                よくあるトラブルを確認
              </Link>
              <Link className="brand-btn brand-btn--primary" to="/contact/">
                問い合わせる
              </Link>
            </div>
          </InteractiveCard>
        </Section>
      </main>
    </>
  )
}
