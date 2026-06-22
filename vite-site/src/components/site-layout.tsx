import { useEffect, useEffectEvent, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { ActionLink, GlobalShareButtons } from '@/components/ui'
import { media } from '@/data/assets'
import {
  downloadUrl,
  legal,
  navItems,
  normalizePath,
  pageRegistry,
  primaryCta,
  secondaryCta,
  siteDescription,
  siteOrigin,
  siteTagline,
  siteTitle,
} from '@/data/site-content'

const homeHeaderNavItems = [
  { label: '制作フロー', href: '#workflow' },
  { label: '実画面', href: '#product' },
  { label: '作例', href: '#samples' },
  { label: '料金', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
] as const

function buildBreadcrumbs(pathname: string) {
  const normalized = normalizePath(pathname)
  const current = pageRegistry[normalized]
  if (!current || current.hideBreadcrumbs) {
    return []
  }

  const chain: Array<{ label: string; path: string }> = []
  let cursorPath: string | undefined = normalized

  while (cursorPath) {
    const entry: (typeof pageRegistry)[string] | undefined = pageRegistry[cursorPath]
    if (!entry) {
      break
    }
    chain.unshift({ label: entry.label, path: cursorPath })
    cursorPath = entry.parent
  }

  if (!chain.length || chain[0]?.path !== '/') {
    chain.unshift({ label: 'ホーム', path: '/' })
  }

  return chain
}

function useRouteEffects(pathname: string, hash: string) {
  const updateProgress = useEffectEvent(() => {
    const node = document.querySelector<HTMLElement>('[data-scroll-progress]')
    if (!node) {
      return
    }

    const max = document.documentElement.scrollHeight - window.innerHeight
    const ratio = max > 0 ? (window.scrollY / max) * 100 : 0
    node.style.width = `${ratio}%`
  })

  useEffect(() => {
    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)
    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (hash) {
        const id = decodeURIComponent(hash.replace(/^#/, ''))
        const target = document.getElementById(id)
        target?.scrollIntoView({ block: 'start', behavior: 'instant' as ScrollBehavior })
        return
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [pathname, hash])

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const selector = [
        '[data-reveal]',
        '.brand-card',
        '.premium-stat',
        '.timeline-item',
        '.faq-item',
        '.channel',
        '.price-card',
        '.release-panel',
        '.notice-box',
        '.legal-table-wrap',
        '.purchase-summary',
        '.brand-panorama',
        '.brand-article__cta',
      ].join(',')

      const targets = Array.from(document.querySelectorAll<HTMLElement>(selector)).filter(
        (node, index, array) => !node.closest('[hidden]') && array.indexOf(node) === index,
      )

      if (!targets.length) {
        return
      }

      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reducedMotion || !('IntersectionObserver' in window)) {
        targets.forEach((node) => node.classList.add('rich-reveal', 'is-visible'))
        return
      }

      const viewportHeight = window.innerHeight || 900
      const deferred: HTMLElement[] = []

      targets.forEach((node, index) => {
        node.classList.add('rich-reveal')
        node.style.setProperty('--reveal-order', String(index % 12))
        const rect = node.getBoundingClientRect()
        if (rect.top <= viewportHeight * 0.88) {
          node.classList.add('is-visible')
        } else {
          deferred.push(node)
        }
      })

      if (!deferred.length) {
        return
      }

      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return
            }
            entry.target.classList.add('is-visible')
            obs.unobserve(entry.target)
          })
        },
        {
          root: null,
          rootMargin: '0px 0px -10% 0px',
          threshold: 0.08,
        },
      )

      deferred.forEach((node) => observer.observe(node))
    })

    return () => window.cancelAnimationFrame(frame)
  }, [pathname])
}

export function SiteLayout() {
  const location = useLocation()
  const [navOpen, setNavOpen] = useState(false)
  const headerNavItems = useMemo(
    () => navItems.filter((item) => item.key !== 'news' && item.key !== 'blog'),
    [],
  )
  const normalizedPath = normalizePath(location.pathname)
  const isHome = normalizedPath === '/'
  const activeEntry = pageRegistry[normalizedPath]
  const activeKey = activeEntry?.navKey
  const isBlogArticle = normalizedPath.startsWith('/blog/') && normalizedPath !== '/blog/'
  const isNewsArticle = activeEntry?.navKey === 'news' && normalizedPath !== '/news/'
  const showShareButtons = isBlogArticle || isNewsArticle
  const breadcrumbs = useMemo(() => buildBreadcrumbs(location.pathname), [location.pathname])
  const breadcrumbStructuredData = useMemo(() => {
    if (breadcrumbs.length < 2) {
      return null
    }

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.label,
        item: `${siteOrigin}${normalizePath(crumb.path)}`,
      })),
    }
  }, [breadcrumbs])

  useRouteEffects(location.pathname, location.hash)

  const customPrimaryCta = useMemo(
    () =>
      isHome
        ? { label: 'Free版を試す', href: downloadUrl, variant: 'primary' as const }
        : primaryCta,
    [isHome],
  )

  return (
    <>
      {breadcrumbStructuredData ? (
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(breadcrumbStructuredData).replace(/</g, '\\u003c')}
          </script>
        </Helmet>
      ) : null}

      <a className="skip-link" href="#main-content">
        本文へスキップ
      </a>

      <header className={`site-header brand-header${isHome ? ' brand-header--home' : ''}`} data-header>
        <div
          className="brand-header__inner"
          onClickCapture={(event) => {
            if ((event.target as HTMLElement).closest('a')) {
              setNavOpen(false)
            }
          }}
        >
          <Link className="logo brand-logo" to="/" discover="none" aria-label={`${siteTitle} ホーム`}>
            <span className="logo-badge brand-logo__mark" aria-hidden="true">
              <img className="logo-mark" src={media.logoMark} alt="" />
            </span>
            <span className="logo-text brand-logo__text">
              <span className="logo-title">{siteTitle}</span>
              <span className="logo-sub">{siteTagline}</span>
            </span>
          </Link>

          <button
            className="brand-nav-toggle"
            type="button"
            aria-expanded={navOpen}
            aria-controls="brand-primary-nav"
            data-nav-toggle
            onClick={() => setNavOpen((value) => !value)}
          >
            <span className="sr-only">メニューを開閉</span>
            <span />
            <span />
            <span />
          </button>

          <nav
            className="nav brand-nav"
            id="brand-primary-nav"
            aria-label="主要ナビゲーション"
            data-nav
            data-open={navOpen}
          >
            {isHome
              ? homeHeaderNavItems.map((item) => (
                  <a key={item.href} href={item.href}>
                    {item.label}
                  </a>
                ))
              : headerNavItems.map((item) => (
                  <Link
                    key={item.key}
                    className={item.key === activeKey ? 'is-active' : undefined}
                    aria-current={item.key === activeKey ? 'page' : undefined}
                    to={item.url}
                    discover="none"
                  >
                    {item.label}
                  </Link>
                ))}
            <div className="brand-nav__cta-stack" aria-label="モバイルCTA">
              <ActionLink action={customPrimaryCta} className="brand-btn" />
              {isHome ? null : <ActionLink action={secondaryCta} className="brand-btn brand-btn--ghost" />}
            </div>
          </nav>

          <div className="header-actions brand-header__actions home-compact-cta__actions brand-header__actions--flush">
            {isHome ? null : <ActionLink action={secondaryCta} className="header-cta brand-btn" />}
            <ActionLink action={customPrimaryCta} className="brand-btn" />
          </div>
        </div>
      </header>

      <main id="main-content" className={`brand-main${isHome ? ' brand-main--home' : ''}`} tabIndex={-1}>
        {breadcrumbs.length ? (
          <nav className="brand-breadcrumbs" aria-label="パンくず">
            <ol>
              {breadcrumbs.map((crumb, index) => {
                const isLast = index === breadcrumbs.length - 1
                return (
                  <li key={crumb.path}>
                    {isLast ? <span>{crumb.label}</span> : <Link to={crumb.path} discover="none">{crumb.label}</Link>}
                  </li>
                )
              })}
            </ol>
          </nav>
        ) : null}
        <Outlet />
        {showShareButtons ? (
          <div className="global-share-wrap">
            <GlobalShareButtons />
          </div>
        ) : null}
      </main>

      <footer className={`brand-footer${isHome ? ' brand-footer--home' : ''}`}>
        <div className="brand-footer__inner">
          <div className="brand-footer__lead">
            <h2>{siteTitle}</h2>
            <p>{siteDescription}</p>
          </div>

          <div className="brand-footer__grid">
            <section>
              <h3>主要ページ</h3>
              <ul>
                {navItems.map((item) => (
                  <li key={item.key}>
                    <Link to={item.url} discover="none">{item.label}</Link>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3>サポート</h3>
              <ul>
                <li><a href={`mailto:${legal.organization.email}`}>メール</a></li>
                <li><a href="https://x.com/OTM_corp" target="_blank" rel="noopener noreferrer">X (Twitter)</a></li>
                <li><a href="https://discordapp.com/users/762244902124912695" target="_blank" rel="noopener noreferrer">Discord</a></li>
                <li><a href="https://github.com/fujitatsukasa" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              </ul>
            </section>

            <section>
              <h3>クイックリンク</h3>
              <ul>
                <li><Link to="/download/">Free版を試す</Link></li>
                <li><Link to="/samples/">実画面・サンプル</Link></li>
                <li><Link to="/purchase/">料金を確認</Link></li>
                <li><Link to="/news/">最新のお知らせ</Link></li>
              </ul>
            </section>

            <section>
              <h3>法務・ポリシー</h3>
              <ul>
                {legal.links.map((item) => (
                  <li key={item.url}>
                    <Link to={item.url} discover="none">{item.label}</Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
        <p className="brand-footer__copyright">© 2026 OTM株式会社</p>
      </footer>
    </>
  )
}
