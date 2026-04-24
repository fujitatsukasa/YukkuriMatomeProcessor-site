import { useState } from 'react'
import { Link } from 'react-router-dom'
import { InteractiveCard, PageMeta } from '@/components/ui'
import { legal, type NewsPost } from '@/data/site-content'
import { motion, AnimatePresence } from 'framer-motion'

const productViews = [
  {
    key: 'topics',
    label: 'ネタ取得',
    title: '記事やスレを一覧で自動ストック',
    body: '複数サイトから保存した候補を比較して、動画に使うネタを効率的に絞り込みます。',
    image: '/product_get_script.webp',
    alt: '台本取得・ネタ一覧画面',
  },
  {
    key: 'ai_script',
    label: 'AI台本生成',
    title: 'ノイズを除去し、自動で掛け合い形式に',
    body: '集めたネタから不要な部分を削り、AIが自然な会話台本へと一気に再構築します。',
    image: '/product_ai_script.webp',
    alt: 'AI機能付き台本作成画面',
  },
  {
    key: 'script_edit',
    label: '台本・感情編集',
    title: 'ボード機能で会話の流れと表情を調整',
    body: '配役の指定や感情（表情）の割り当てを、テキストと一緒に直感的に編集できます。',
    image: '/product_board_emotion.webp',
    alt: '会話台本と感情設定を確認する画面',
  },
  {
    key: 'materials',
    label: '素材・出力',
    title: 'YMM4へそのまま読み込める形式で',
    body: 'キーワードや立ち絵の素材を整理し、YMM4へ直結するフォーマットで即出力します。',
    image: '/product_keyword_material.webp',
    alt: '素材・出力設定画面',
  },
] as const

const productFlow = ['ネタ収集', '台本作成', '会話台本', '素材整理', 'YMM4準備'] as const

export type MetricItem = {
  value: string
  label: string
  detail?: string
}

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
          backgroundImage: "url('/bg_abstract_2.webp')",
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

      <div className="product-demo__panel-container" style={{ position: 'relative', display: 'grid', zIndex: 1, width: '100%' }}>
        <AnimatePresence mode="wait" initial={false}>
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

export function MetricStrip({
  items,
  className = '',
  ariaLabel = 'ページ概要',
}: {
  items: MetricItem[]
  className?: string
  ariaLabel?: string
}) {
  return (
    <div className={`subpage-metric-strip${className ? ` ${className}` : ''}`} role="list" aria-label={ariaLabel}>
      {items.map((item) => (
        <div key={`${item.value}-${item.label}`} className="subpage-metric" role="listitem">
          <strong>{item.value}</strong>
          <span>{item.label}</span>
          {item.detail ? <p>{item.detail}</p> : null}
        </div>
      ))}
    </div>
  )
}

export function ArticleActions() {
  return (
    <div className="brand-inline-actions">
      <Link className="brand-btn brand-btn--primary" to="/download/">
        無料で始める
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
