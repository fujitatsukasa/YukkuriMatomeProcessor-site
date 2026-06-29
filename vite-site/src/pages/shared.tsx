import { useState } from 'react'
import { Link } from 'react-router-dom'
import { InteractiveCard, PageMeta } from '@/components/ui'
import { legal, type NewsPost } from '@/data/site-content'
import { motion, AnimatePresence } from '@/lib/light-motion'

const productViews = [
  {
    key: 'topics',
    label: 'ネタ取得',
    title: '入力したURLから候補を確認',
    body: '対応する記事URL・スレッドURLを入力し、使う本文や候補を見てから台本下地へ進めます。',
    image: '/product_get_script.webp',
    alt: '台本取得・ネタ一覧画面',
  },
  {
    key: 'ai_script',
    label: 'AI台本生成',
    title: 'AI台本案は確認してから使う',
    body: 'AI台本案は任意の下書き補助です。内容、事実、表現を確認してから台本編集へ送ります。',
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
    title: 'YMM4で仕上げる前の素材確認',
    body: 'キーワードや素材フォルダを整理し、YMM4側で最終編集する前に保存先と素材パスを確認します。',
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
    <div className={`product-demo product-demo--layer${compact ? ' product-demo--compact' : ''}${className ? ` ${className}` : ''}`}>
      {/* Background Image inside Product Demo */}
      <div className="product-demo__backdrop" aria-hidden="true" />

      <div className="product-demo__topline">
        <span>実画面で確認</span>
        <strong>ネタ収集からYMM4準備まで</strong>
      </div>

      <div className="product-demo__tabs" role="tablist" aria-label="実画面タブ">
        {productViews.map((item) => (
          <button
            key={item.key}
            type="button"
            role="tab"
            aria-selected={item.key === activeKey}
            className={`product-demo__tab${item.key === activeKey ? ' is-active' : ''}`}
            onClick={() => handleTabClick(item.key)}
          >
            {item.key === activeKey && (
              <motion.div
                layoutId="demoTabIndicator"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                className="product-demo__tab-indicator"
              />
            )}
            <span className="product-demo__tab-label">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="product-demo__panel-container">
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

      <ul className="product-demo__flow" aria-label="制作フロー">
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
        配布条件を確認
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
