import { useState } from 'react'
import { Link } from 'react-router-dom'
import { InteractiveCard, PageMeta } from '@/components/ui'
import { media } from '@/data/assets'
import { legal, type NewsPost } from '@/data/site-content'
import { motion, AnimatePresence } from 'framer-motion'

const productViews = [
  {
    key: 'topics',
    label: 'ネタ一覧',
    title: '記事や話題を一覧で見比べる',
    body: '保存した候補を比較して、反応集や解説に使うネタを絞り込みます。',
    image: media.productImage2,
    alt: '保存した記事や話題を一覧で見比べるネタ一覧画面',
  },
  {
    key: 'script',
    label: '会話台本',
    title: '話者ごとの会話台本を整理する',
    body: '台本作成と会話形式の整理を同じ流れで進め、字幕や読み上げの前提を揃えます。',
    image: media.settingsShot,
    alt: '会話台本と読み上げ設定を確認する画面',
  },
  {
    key: 'ymm4',
    label: 'YMM4準備',
    title: 'YMM4前の素材と話者を揃える',
    body: '立ち絵・画像・音声の並びを整理して、編集前の再調整を減らします。',
    image: media.productImage1,
    alt: 'YMM4前の準備内容を確認できる画面',
  },
] as const

const productFlow = ['ネタ収集', '台本作成', '会話台本', '素材整理', 'YMM4準備'] as const

type ProductDemoTabsProps = {
  className?: string
  compact?: boolean
}

export function ProductDemoTabs({ className = '', compact = false }: ProductDemoTabsProps) {
  const [activeKey, setActiveKey] = useState<(typeof productViews)[number]['key']>(productViews[0].key)
  const activeView = productViews.find((item) => item.key === activeKey) ?? productViews[0]

  const handleTabClick = (key: typeof activeKey) => {
    if (key === activeKey) return
    setActiveKey(key)
  }

  return (
    <div className={`product-demo${compact ? ' product-demo--compact' : ''}${className ? ` ${className}` : ''}`} style={{ position: 'relative', zIndex: 1, overflow: 'hidden' }}>
      {/* Background Image inside Product Demo */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: "url('/bg_abstract_2.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.35,
          zIndex: 0,
          pointerEvents: 'none',
          mixBlendMode: 'screen',
          maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 80%)'
        }}
        aria-hidden="true"
      />

      <div className="product-demo__topline" style={{ position: 'relative', zIndex: 1 }}>
        <span>実画面で確認</span>
        <strong>ネタ収集からYMM4準備まで</strong>
      </div>

      <div className="product-demo__tabs" role="tablist" aria-label="実画面タブ" style={{ position: 'relative', zIndex: 1 }}>
        {productViews.map((item) => (
          <button
            key={item.key}
            type="button"
            role="tab"
            aria-selected={item.key === activeKey}
            className={`product-demo__tab${item.key === activeKey ? ' is-active' : ''}`}
            onClick={() => handleTabClick(item.key)}
            style={{ position: 'relative' }}
          >
            {item.key === activeKey && (
              <motion.div
                layoutId="demoTabIndicator"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 'inherit',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.05)',
                  zIndex: 0
                }}
              />
            )}
            <span style={{ position: 'relative', zIndex: 1 }}>{item.label}</span>
          </button>
        ))}
      </div>

      <div className="product-demo__panel-container" style={{ position: 'relative', display: 'grid', zIndex: 1 }}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div 
            key={activeView.key}
            className="product-demo__panel" 
            role="tabpanel" 
            aria-label={activeView.label}
            initial={{ opacity: 0, scale: 0.98, filter: 'blur(4px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.02, filter: 'blur(4px)' }}
            transition={{ duration: 0.3, type: 'spring', bounce: 0 }}
          >
            <div className="product-demo__screen">
              <img src={activeView.image} alt={activeView.alt} />
            </div>

            <div className="product-demo__body">
              <strong>{activeView.title}</strong>
              <p>{activeView.body}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <ul className="product-demo__flow" aria-label="制作フロー" style={{ position: 'relative', zIndex: 1 }}>
        {productFlow.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export function HomeHeroStage() {
  return <ProductDemoTabs className="home-compact-stage" compact />
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
