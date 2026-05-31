import {
  type HTMLAttributes,
  type PropsWithChildren,
  type ReactNode,
  useRef,
  useState,
} from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import {
  type ActionItem,
  normalizePath,
  siteDescription,
  siteOrigin,
  siteTitle,
} from '@/data/site-content'
import { metaImages } from '@/data/assets'
import { trackEvent } from '@/lib/analytics'

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

function resolveMetaImage(image?: string) {
  const source = image || metaImages.default

  if (source.startsWith('http://') || source.startsWith('https://')) {
    return source
  }

  return `${siteOrigin}${source.startsWith('/') ? source : `/${source}`}`
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
  const baseDescription = description?.trim() || siteDescription
  const metaDescription =
    baseDescription.length >= 50 ? baseDescription : `${baseDescription} ${siteDescription}`
  const robots = noindex ? 'noindex,nofollow' : 'index,follow'
  const metaImage = resolveMetaImage(image)
  const structuredDataList = structuredData
    ? Array.isArray(structuredData)
      ? structuredData
      : [structuredData]
    : []

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="application-name" content={siteTitle} />
      <meta name="robots" content={robots} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      <link rel="canonical" href={canonical} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content="ja_JP" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={metaImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
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
  const handleClick = () => {
    trackEvent('cta_click', {
      page: 'shared',
      label: action.label,
      target: action.href,
      variant: action.variant ?? 'ghost',
      placement: className || 'action_link',
      external: isExternal,
    })
  }

  if (isExternal) {
    return (
      <a
        className={classes}
        href={action.href}
        target={action.href.startsWith('http') ? '_blank' : undefined}
        rel={action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
        onClick={handleClick}
      >
        {action.label}
      </a>
    )
  }

  return (
    <Link className={classes} to={action.href} discover="none" onClick={handleClick}>
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
        <div
          className="page-intro__content"
          data-reveal
        >
          <p className="brand-kicker">{kicker}</p>
          <h1>{title}</h1>
          <p className="brand-lead">{lead}</p>
          {actions.length ? <ActionGroup actions={actions} /> : null}
          {flowLinks.length ? <FlowLinks actions={flowLinks} /> : null}
        </div>
        {media ? (
          <div
            className="page-intro__media"
            data-reveal
          >
            {media}
          </div>
        ) : null}
      </div>

      {/* Glow divider at bottom */}
      <div className="section-glow-divider" />
    </section>
  )
}

import { Link as LinkIcon, Share2 } from 'lucide-react'

export function GlobalShareButtons({ 
  title = siteTitle, 
  message = 'このツール・ページをシェアして応援する' 
}: { 
  title?: string
  message?: string 
}) {
  const [shareUrl] = useState(() =>
    typeof window !== 'undefined' ? `${siteOrigin}${normalizePath(window.location.pathname)}` : '',
  )

  if (!shareUrl) return null

  const encodedUrl = encodeURIComponent(shareUrl)
  const encodedTitle = encodeURIComponent(title)

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
    alert('URLをコピーしました！SNSでのシェア大歓迎です！')
  }

  return (
    <div className="global-share">
      <span className="global-share__label">
        <Share2 size={16} /> {message}
      </span>
      <div className="global-share__actions">
        <a 
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="global-share__button global-share__button--x"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.004 4.076H5.036z" />
          </svg> X (Twitter)
        </a>
        <a 
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="global-share__button global-share__button--facebook"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
          </svg> Facebook
        </a>
        <button 
          onClick={handleCopyLink}
          className="global-share__button global-share__button--copy"
        >
          <LinkIcon size={18} /> リンクをコピー
        </button>
      </div>
    </div>
  )
}
