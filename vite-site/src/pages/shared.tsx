import { type PointerEvent, useRef } from 'react'
import { Link } from 'react-router-dom'
import { InteractiveCard, PageMeta } from '@/components/ui'
import { media } from '@/data/assets'
import { legal, type NewsPost } from '@/data/site-content'

const heroPipeline = [
  { step: '01', title: 'ネタ収集', note: '記事と話題を保存' },
  { step: '02', title: '台本化', note: '見せる順番を整理' },
  { step: '03', title: '会話化', note: '役割ごとに分解' },
  { step: '04', title: '素材設計', note: '立ち絵と音声を配置' },
  { step: '05', title: 'YMM4準備', note: '話者と素材を整列' },
] as const

const heroTopics = [
  '保存した記事候補を一覧で比較',
  '切り抜く話題をその場で選別',
  '使う順番を決めて台本へ渡す',
] as const

const heroConversation = [
  {
    speaker: '霊夢',
    body: '最初に結論を置いて、反応集向けにテンポを作ろう。',
    align: 'left',
  },
  {
    speaker: '魔理沙',
    body: '補足は後半へ回して、見せ場に合わせて素材も先に決めるぜ。',
    align: 'right',
  },
  {
    speaker: '霊夢',
    body: '最後に話者と順番を整えて、そのままYMM4へ渡せる形にするよ。',
    align: 'left',
  },
] as const

const heroAssets = ['立ち絵差分', '場面画像', '読み上げ音声', 'テロップ方針'] as const

export function HomeHeroStage() {
  const ref = useRef<HTMLDivElement | null>(null)

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const node = ref.current
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const rect = node.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100
    const rotateX = ((50 - y) / 50) * 4
    const rotateY = ((x - 50) / 50) * 4

    node.style.setProperty('--hero-pointer-x', `${x}%`)
    node.style.setProperty('--hero-pointer-y', `${y}%`)
    node.style.setProperty('--hero-rotate-x', `${rotateX}deg`)
    node.style.setProperty('--hero-rotate-y', `${rotateY}deg`)
  }

  const handlePointerLeave = () => {
    const node = ref.current
    if (!node) {
      return
    }

    node.style.setProperty('--hero-pointer-x', '50%')
    node.style.setProperty('--hero-pointer-y', '30%')
    node.style.setProperty('--hero-rotate-x', '0deg')
    node.style.setProperty('--hero-rotate-y', '0deg')
  }

  return (
    <div
      ref={ref}
      className="brand-hero__media premium-rainbow-media hero-stage hero-stage--product home-lp-stage"
      data-reveal
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <img
        className="home-lp-stage__background"
        src={media.externalEditingMonitor}
        alt=""
        aria-hidden="true"
      />

      <div className="home-lp-stage__frame">
        <div className="home-lp-stage__head">
          <div>
            <span>制作フローが一目で分かる</span>
            <strong>ネタ収集 → 台本化 → 会話化 → 素材設計 → YMM4準備</strong>
          </div>
          <small>前工程を一本化</small>
        </div>

        <div className="home-lp-stage__workspace">
          <section className="home-lp-stage__panel home-lp-stage__panel--topics">
            <header className="home-lp-stage__panel-head">
              <span>ネタ一覧</span>
              <strong>保存した記事・話題を一覧で比較</strong>
            </header>
            <div className="home-lp-stage__preview">
              <img src={media.productImage2} alt="記事候補の一覧を見比べている画面" />
            </div>
            <ul className="home-lp-stage__topic-list">
              {heroTopics.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="home-lp-stage__panel home-lp-stage__panel--script">
            <header className="home-lp-stage__panel-head">
              <span>会話台本</span>
              <strong>キャラごとの役割で掛け合いに整理</strong>
            </header>
            <div className="home-lp-stage__chat">
              {heroConversation.map((item) => (
                <div
                  key={`${item.speaker}-${item.body}`}
                  className={`home-lp-stage__chat-line home-lp-stage__chat-line--${item.align}`}
                >
                  <strong>{item.speaker}</strong>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
            <div className="home-lp-stage__script-tags" aria-label="会話台本の整理項目">
              <span>見せ場</span>
              <span>補足</span>
              <span>ツッコミ</span>
            </div>
          </section>

          <section className="home-lp-stage__panel home-lp-stage__panel--assets">
            <header className="home-lp-stage__panel-head">
              <span>立ち絵・画像・音声</span>
              <strong>素材と見せ方を先に揃える</strong>
            </header>
            <div className="home-lp-stage__asset-preview">
              <img src={media.settingsShot} alt="台本設定と読み上げ条件を確認する画面" />
            </div>
            <ul className="home-lp-stage__asset-list">
              {heroAssets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>

        <div className="home-lp-stage__pipeline" aria-label="制作の流れ">
          {heroPipeline.map((item) => (
            <div key={item.step} className="home-lp-stage__pipeline-item">
              <span>{item.step}</span>
              <strong>{item.title}</strong>
              <small>{item.note}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function LegalLinksBlock({ note }: { note?: string }) {
  return (
    <div className="legal-links">
      <h3 className="legal-links__title">関連ポリシー</h3>
      <ul className="legal-links__list">
        {legal.links.map((item) => (
          <li key={item.url}>
            <Link to={item.url}>{item.label}</Link>
          </li>
        ))}
      </ul>
      {note ? <p className="legal-links__note">{note}</p> : null}
    </div>
  )
}

export function ArticleActions() {
  return (
    <div className="brand-inline-actions">
      <Link className="brand-btn brand-btn--primary" to="/download/">
        無料で始める！
      </Link>
      <Link className="brand-btn brand-btn--ghost" to="/contact/">
        導入について問い合わせる
      </Link>
    </div>
  )
}

export function NewsTimelineCard({ post }: { post: NewsPost }) {
  return (
    <InteractiveCard className="timeline-item premium-glass">
      <time dateTime={post.date}>{post.dateLabel}</time>
      <h2>
        <Link to={post.path}>{post.title}</Link>
      </h2>
      <p>{post.subtitle}</p>
      <p>{post.summary}</p>
      <div className="brand-inline-actions">
        <Link className="brand-btn brand-btn--ghost" to={post.path}>
          詳細を見る
        </Link>
      </div>
    </InteractiveCard>
  )
}

export function MicroStatusPage({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <>
      <PageMeta title={title} description={description} noindex />
      <div className="micro-status">
        <main>
          <h1>{title}</h1>
          <p>{description}</p>
        </main>
      </div>
    </>
  )
}
