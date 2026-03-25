import { type PointerEvent, useRef } from 'react'
import { Link } from 'react-router-dom'
import { InteractiveCard, PageMeta } from '@/components/ui'
import { media } from '@/data/assets'
import { legal, type NewsPost } from '@/data/site-content'

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
      className="brand-hero__media premium-rainbow-media hero-stage hero-stage--product"
      data-reveal
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <img
        className="hero-stage__backdrop"
        src={media.externalEditingMonitor}
        alt=""
        aria-hidden="true"
      />
      <div className="hero-stage__orb hero-stage__orb--north" aria-hidden="true" />
      <div className="hero-stage__orb hero-stage__orb--south" aria-hidden="true" />
      <div className="hero-prism-layer" aria-hidden="true" />
      <div className="hero-stage__grid" aria-hidden="true" />
      <div className="hero-product-board">
        <figure className="hero-product-board__main">
          <figcaption>
            <span>手順 1</span>
            <strong>URLを入れて記事一覧を取得</strong>
          </figcaption>
          <img src={media.productImage2} alt="対応URLから記事一覧を取得して選択する画面" />
        </figure>

        <figure className="hero-product-board__side hero-product-board__side--settings">
          <figcaption>
            <span>手順 2</span>
            <strong>セリフ・タイトル設定</strong>
          </figcaption>
          <img src={media.settingsShot} alt="台本取得と整形の設定画面" />
        </figure>

        <figure className="hero-product-board__side hero-product-board__side--timeline">
          <figcaption>
            <span>手順 3</span>
            <strong>YMM4で編集開始しやすい形へ</strong>
          </figcaption>
          <img src={media.productImage1} alt="取得した台本を編集開始へつなげるタイムライン画面" />
        </figure>

        <div className="hero-product-board__summary">
          <div>
            <strong>URL取得</strong>
            <span>候補記事を一覧化</span>
          </div>
          <div>
            <strong>台本整形</strong>
            <span>編集前に形を揃える</span>
          </div>
          <div>
            <strong>YMM4準備</strong>
            <span>次工程へ渡しやすい</span>
          </div>
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
