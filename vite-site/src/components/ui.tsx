import {
  type HTMLAttributes,
  type PropsWithChildren,
  type ReactNode,
  useRef,
} from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  type ActionItem,
  normalizePath,
  siteDescription,
  siteOrigin,
  siteTitle,
} from '@/data/site-content'

type SectionProps = PropsWithChildren<{
  id?: string
  alt?: boolean
  className?: string
}>

type InteractiveCardProps = HTMLAttributes<HTMLElement> & {
  as?: 'article' | 'section' | 'div' | 'aside'
}

type PageMetaProps = {
  title: string
  description: string
  keywords?: string
  image?: string
  path?: string
  noindex?: boolean
  type?: 'website' | 'article'
  publishedTime?: string
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>
}

function serializeJsonLd(data: Record<string, unknown>) {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

type PageIntroProps = {
  kicker: string
  title: string
  lead: string
  actions?: ActionItem[]
  flowLinks?: ActionItem[]
  media?: ReactNode
}

export function Section({ id, alt = false, className = '', children }: SectionProps) {
  return (
    <section
      id={id}
      className={`brand-section${alt ? ' brand-section--alt' : ''}${className ? ` ${className}` : ''}`}
    >
      {children}
    </section>
  )
}

export function PageMeta({
  title,
  description,
  keywords,
  image,
  path = '/',
  noindex = false,
  type = 'website',
  publishedTime,
  structuredData,
}: PageMetaProps) {
  const canonical = `${siteOrigin}${normalizePath(path)}`
  const pageTitle = title.includes(siteTitle) ? title : `${title} | ${siteTitle}`
  const robots = noindex ? 'noindex,nofollow' : 'index,follow'
  const structuredDataList = structuredData
    ? Array.isArray(structuredData)
      ? structuredData
      : [structuredData]
    : []

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={description || siteDescription} />
      <meta name="application-name" content={siteTitle} />
      <meta name="robots" content={robots} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      <link rel="canonical" href={canonical} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content="ja_JP" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description || siteDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      {image ? <meta property="og:image" content={image} /> : null}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description || siteDescription} />
      {image ? <meta name="twitter:image" content={image} /> : null}
      {publishedTime ? <meta property="article:published_time" content={publishedTime} /> : null}
      {structuredDataList.map((entry, index) => (
        <script key={index} type="application/ld+json">
          {serializeJsonLd(entry)}
        </script>
      ))}
    </Helmet>
  )
}

export function ActionLink({
  action,
  className = '',
}: {
  action: ActionItem
  className?: string
}) {
  const variant = action.variant === 'primary' ? 'brand-btn--primary' : 'brand-btn--ghost'
  const classes = `${className || 'brand-btn'} ${variant}`.trim()
  const isExternal =
    action.external ||
    action.href.startsWith('http') ||
    action.href.startsWith('mailto:') ||
    action.href.startsWith('tel:')

  if (isExternal) {
    return (
      <a
        className={classes}
        href={action.href}
        target={action.href.startsWith('http') ? '_blank' : undefined}
        rel={action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {action.label}
      </a>
    )
  }

  return (
    <Link className={classes} to={action.href}>
      {action.label}
    </Link>
  )
}

export function ActionGroup({
  actions,
  className = 'brand-inline-actions',
}: {
  actions: ActionItem[]
  className?: string
}) {
  return (
    <div className={className}>
      {actions.map((action) => (
        <ActionLink key={`${action.href}-${action.label}`} action={action} />
      ))}
    </div>
  )
}

export function FlowLinks({ actions }: { actions: ActionItem[] }) {
  return (
    <nav className="flow-links" aria-label="関連ページ">
      {actions.map((action) => {
        const isExternal =
          action.external ||
          action.href.startsWith('http') ||
          action.href.startsWith('mailto:') ||
          action.href.startsWith('tel:')

        if (isExternal) {
          return (
            <a
              key={`${action.href}-${action.label}`}
              href={action.href}
              target={action.href.startsWith('http') ? '_blank' : undefined}
              rel={action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {action.label}
            </a>
          )
        }

        return (
          <Link key={`${action.href}-${action.label}`} to={action.href}>
            {action.label}
          </Link>
        )
      })}
    </nav>
  )
}

export function InteractiveCard({
  as = 'article',
  className = '',
  children,
  ...props
}: InteractiveCardProps) {
  const ref = useRef<HTMLElement | null>(null)
  const Tag = as

  const handlePointerMove: HTMLAttributes<HTMLElement>['onPointerMove'] = (event) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const node = ref.current
    if (!node) {
      return
    }

    const rect = node.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100
    const tiltX = ((50 - y) / 50) * 5
    const tiltY = ((x - 50) / 50) * 5

    node.style.setProperty('--pointer-x', `${x}%`)
    node.style.setProperty('--pointer-y', `${y}%`)
    node.style.setProperty('--tilt-x', `${tiltX}deg`)
    node.style.setProperty('--tilt-y', `${tiltY}deg`)
  }

  const handlePointerLeave: HTMLAttributes<HTMLElement>['onPointerLeave'] = () => {
    const node = ref.current
    if (!node) {
      return
    }

    node.style.setProperty('--pointer-x', '50%')
    node.style.setProperty('--pointer-y', '50%')
    node.style.setProperty('--tilt-x', '0deg')
    node.style.setProperty('--tilt-y', '0deg')
  }

  return (
    <Tag
      ref={ref as never}
      className={`interactive-surface ${className}`.trim()}
      data-reveal
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      {...props}
    >
      {children}
    </Tag>
  )
}

export function PageIntro({
  kicker,
  title,
  lead,
  actions = [],
  flowLinks = [],
  media,
}: PageIntroProps) {
  return (
    <section className="page-hero">
      {/* Ambient background glow */}
      <div className="page-hero__backdrop" aria-hidden="true" />

      <div className={`brand-shell page-intro__shell${media ? ' page-intro__shell--media' : ''}`}>
        <motion.div
          className="page-intro__content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="brand-kicker">{kicker}</p>
          <h1>{title}</h1>
          <p className="brand-lead">{lead}</p>
          {actions.length ? <ActionGroup actions={actions} /> : null}
          {flowLinks.length ? <FlowLinks actions={flowLinks} /> : null}
        </motion.div>
        {media ? (
          <motion.div
            className="page-intro__media"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {media}
          </motion.div>
        ) : null}
      </div>

      {/* Glow divider at bottom */}
      <div className="section-glow-divider" />
    </section>
  )
}
