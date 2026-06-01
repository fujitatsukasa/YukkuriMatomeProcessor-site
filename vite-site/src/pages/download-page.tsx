import { useState } from 'react'
import { Link } from 'react-router-dom'
import { InteractiveCard, PageIntro, PageMeta, Section } from '@/components/ui'
import { downloadUrl } from '@/data/site-content'
import { MetricStrip } from '@/pages/shared'
import { AnimatePresence, motion } from '@/lib/light-motion'
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
  { value: 'Free', label: '無料で動作確認', detail: '記事URLから台本下地まで試せる' },
  { value: '4手順', label: '最初に触る順番', detail: '解凍 -> 起動 -> 設定 -> URL入力' },
  { value: 'YMM4', label: '後工程の手戻りを削減', detail: '保存先、CSV、連携パスの整合を先に揃える' },
] as const

const instructionMetrics = [
  { value: '10手順', label: '手を動かす順番', detail: 'ダウンロードからYMM4確認まで' },
  { value: '実画面', label: '成功状態を確認', detail: '画面を見ながら次の操作へ進む' },
  { value: 'YMM4前準備', label: '編集前に整える', detail: 'CSV、キャラ設定、立ち絵パスの整理を前倒し' },
] as const

const downloadSupportCards = [
  {
    eyebrow: '導入前',
    title: '導入前チェック',
    body: '最初に環境と前提を揃えるだけで、導入後の詰まり方がかなり減ります。',
    items: onboardingChecks,
  },
  {
    eyebrow: '問い合わせ',
    title: '問い合わせ時にあると速い情報',
    body: 'サポートへ渡す情報を先に決めておくと、切り分けが速くなります。',
    items: supportBundle,
  },
  {
    eyebrow: '次に見るページ',
    title: '導入後に進むべきページ',
    body: '使い方で操作手順、料金で制限解除、FAQで詰まりどころを確認できます。',
    links: [
      { label: '使い方を見る', href: '/instructions/' },
      { label: '料金を確認', href: '/purchase/' },
      { label: 'FAQを開く', href: '/faq/' },
    ],
  },
] as const

const instructionGuardrails = [
  {
    eyebrow: '最初に固定',
    title: '最初に固定する設定',
    body: 'YMM4 パス、CSV/.ymmp保存先、素材フォルダを先に決めると、途中で手戻りしにくくなります。',
    points: ['実行パスと保存先を固定', '出力フォルダ名を揃える', 'YouTube 分析を使うなら API キーも設定'],
  },
  {
    eyebrow: '飛ばさない',
    title: 'CSV/.ymmpまで確認する',
    body: '取得した台本をそのまま終わらせず、CSV、.ymmp、キャラ設定と一緒に確認すると次の編集が楽になります。',
    points: ['`.ymmp` からフォーマット追加', '台本の型を再利用しやすく整形', 'キャラ設定と立ち絵パスを前工程で整理'],
  },
  {
    eyebrow: '困ったとき',
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
    eyebrow: '手順1',
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
    eyebrow: '手順2',
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
    eyebrow: '手順3',
    title: '台本整形と AI 補助の使いどころを掴む',
    body: '取得した台本をそのまま流さず、改行補助、感情分析、役割整理で「使える下書き」に寄せる流れを確認します。',
    image: '/product_edit_script.webp',
    alt: '台本整形と編集の画面',
    checkpoint: 'AI 補助をどこで入れるか判断できる',
    points: ['不要行や見出しを整理する', '感情分析と改行補助を必要箇所だけ使う', '再利用しやすい粒度まで整える'],
    Icon: Bot,
  },
  {
    key: 'handoff',
    eyebrow: '手順4',
    title: 'YMM4 前準備まで確認する',
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
    eyebrow: '手順1',
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
    eyebrow: '手順2',
    title: 'ネタ取得から台本化までを通す',
    body: '対象サイトやスレッド URL を入力し、候補を選んで台本化します。まずは少数件で流れを固定すると安定します。',
    image: '/product_get_script.webp',
    alt: '記事取得と候補選択の画面',
    checkpoint: 'ネタ取得の最短導線を掴む',
    points: ['候補一覧から動画化する題材を選ぶ', '台本取得と整形を同じ流れで進める', '必要に応じて AI 補助へ繋げる'],
    Icon: FileSearch,
  },
  {
    key: 'template',
    eyebrow: '手順3',
    title: 'CSV/.ymmpへ渡せる形にする',
    body: '単発の一本で終わらせず、`.ymmp` や CSV と一緒に残すことで、次の動画でも確認しやすくなります。',
    image: '/product_format_list.webp',
    alt: 'フォーマット管理とYMM4前準備の画面',
    checkpoint: '次の編集でも流れを再利用できる',
    points: ['`.ymmp` からフォーマット追加', '役割や感情の型を揃える', '次の動画にも使い回せる粒度に整える'],
    Icon: Settings2,
  },
  {
    key: 'handoff',
    eyebrow: '手順4',
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
        title="ダウンロード｜最新版を無料ダウンロード"
        description="ゆっくりまとめプロセッサーの最新版を無料でダウンロード。Windows環境でYMM4向けの台本取得、CSV出力、.ymmp前準備、初期設定を確認できます。"
        keywords="ダウンロード, Windows, YMM4, 台本取得, CSV, .ymmp, ゆっくりまとめプロセッサー"
        path="/download/"
      />

      <main className="brand-shell">
        <PageIntro
          kicker="ダウンロード"
          title="最新版を無料ダウンロード"
          lead="Windows環境で、記事URLから台本下地とYMM4前準備まで試せます"
          actions={[
            { label: '無料でダウンロード', href: downloadUrl, variant: 'primary', external: true },
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
                alt="URL取得、台本作成、YMM4前準備までをまとめたスタジオビジュアル"
              />
              <div className="page-visual-card__meta">
                <strong>まずは実際のURLで、取得からYMM4前準備まで確認</strong>
                <span>ダウンロード後はYMM4パス、保存先、対象URLの順で設定します。</span>
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
            lead="解凍して起動し、YMM4パスを設定してからURLを入力する"
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
        title="使い方｜URL入力からYMM4確認まで"
        description="記事URL・スレッドURLの入力から、台本整理、AI補助、CSV/.ymmp出力、YMM4での確認までを実画面付きで解説します。"
        keywords="使い方, 初期設定, YMM4, 台本取得, CSV, .ymmp, AI補助"
        path="/instructions/"
      />

      <main className="brand-shell">
        <PageIntro
          kicker="使い方ガイド"
          title="記事URLから台本を取得し、YMM4に渡すまでの手順"
          lead="ダウンロード、起動、YMM4パス設定、URL入力、台本整理、CSV/.ymmp確認の順に進めます"
          actions={[
            { label: '無料でダウンロード', href: downloadUrl, variant: 'primary', external: true },
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
                <strong>各ステップで、入力するものと成功状態を確認</strong>
                <span>迷ったらYMM4パス、保存先、対象URL、APIキーの順で切り分けます。</span>
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
            lead="設定から受け渡しまでを、実画面つきで順番に確認する"
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
              <span className="subpage-card__eyebrow">問い合わせ</span>
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
