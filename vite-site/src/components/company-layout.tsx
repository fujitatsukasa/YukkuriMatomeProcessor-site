import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { company, companyNavigation } from '@/data/company'
import '@/pages/company-page.css'
import '@/pages/company-documents.css'
import '@/pages/company-art-direction.css'

export const companyInquiry = `mailto:${company.email}?subject=${encodeURIComponent('OTM株式会社へのお問い合わせ')}`

export function CompanyLayout({ children, title, description = company.description }: { children: ReactNode; title: string; description?: string }) {
  const root = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const [menu, setMenu] = useState(false)
  const pathname = location.pathname.endsWith('/') ? location.pathname : `${location.pathname}/`
  const canonical = `${company.origin}${pathname}`
  useEffect(() => {
    const element = root.current
    if (!element) return
    if (!location.hash) window.scrollTo({ top: 0, behavior: 'instant' })
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    const animations: Animation[] = []
    const enter = (node: HTMLElement, delay = 0) => {
      node.dataset.entered = 'true'
      if (!reduced.matches) animations.push(node.animate([{ opacity: 0, transform: 'translateY(38px)', clipPath: 'inset(0 0 25% 0)' }, { opacity: 1, transform: 'translateY(0)', clipPath: 'inset(0)' }], { duration: 1000, delay, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' }))
    }
    element.querySelectorAll<HTMLElement>('[data-intro]').forEach((node, index) => enter(node, index * 90))
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { enter(entry.target as HTMLElement); observer.unobserve(entry.target) }
    }), { threshold: .1 })
    element.querySelectorAll('[data-company-reveal]').forEach((node) => observer.observe(node))
    let frame = 0
    const update = () => {
      frame = 0
      element.style.setProperty('--reading-progress', String(scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)))
      element.style.setProperty('--hero-shift', `${reduced.matches ? 0 : Math.min(scrollY * .12, 90)}px`)
      const workflow = element.querySelector<HTMLElement>('.company-workflow')
      if (workflow) {
        const progress = (innerHeight * .78 - workflow.getBoundingClientRect().top) / (innerHeight * .6)
        workflow.style.setProperty('--flow-progress', String(Math.max(0, Math.min(1, progress))))
        workflow.dataset.step = String(Math.min(2, Math.max(0, Math.floor(progress * 3))))
      }
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    const reduce = () => { if (reduced.matches) animations.forEach((animation) => animation.finish()); update() }
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    reduced.addEventListener('change', reduce)
    update()
    return () => { observer.disconnect(); animations.forEach((animation) => animation.cancel()); cancelAnimationFrame(frame); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); reduced.removeEventListener('change', reduce) }
  }, [location.pathname, location.hash])
  useEffect(() => {
    if (!menu) return
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') { setMenu(false); document.getElementById('company-menu-toggle')?.focus() } }
    document.addEventListener('keydown', escape)
    return () => document.removeEventListener('keydown', escape)
  }, [menu])

  return <div className={`company-site${pathname === '/' ? ' company-home' : ''}`} ref={root}>
    <title>{title}</title><meta name="description" content={description} /><meta name="application-name" content={company.name} /><meta name="theme-color" content="#f2f2e9" /><meta name="robots" content="index,follow" />
    <link rel="canonical" href={canonical} /><link rel="icon" type="image/svg+xml" href="/company/favicon.svg" />
    <meta property="og:site_name" content={company.name} /><meta property="og:title" content={title} /><meta property="og:description" content={description} /><meta property="og:url" content={canonical} /><meta property="og:locale" content="ja_JP" /><meta property="og:type" content="website" /><meta property="og:image" content={`${company.origin}/company/interconnected-forms.webp`} />
    <meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content={title} /><meta name="twitter:description" content={description} /><meta name="twitter:image" content={`${company.origin}/company/interconnected-forms.webp`} />
    <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', '@type': 'Organization', '@id': `${company.origin}/#organization`, name: company.name, url: `${company.origin}/`, description: company.description, email: company.email, identifier: company.corporateNumber, address: { '@type': 'PostalAddress', postalCode: company.postalCode.replace('〒', ''), streetAddress: company.address, addressCountry: 'JP' }, sameAs: ['https://info.gbiz.go.jp/hojin/ichiran?hojinBango=1021001079599', 'https://github.com/fujitatsukasa'] }).replace(/</g, '\u003c')}</script>
    <a className="company-skip" href="#company-main">本文へスキップ</a>
    <header className="company-header">
      <Link className="company-wordmark" to="/" aria-label="OTM株式会社 ホーム" onClick={() => setMenu(false)}><span>OTM<span className="company-wordmark-dot">.</span></span><small>OTM株式会社</small></Link>
      <button id="company-menu-toggle" className="company-menu-toggle" type="button" aria-expanded={menu} aria-controls="company-navigation" aria-label={menu ? 'メニューを閉じる' : 'メニューを開く'} onClick={() => setMenu((value) => !value)}>{menu ? <X size={24} /> : <Menu size={24} />}</button>
      <nav id="company-navigation" className="company-navigation" data-open={menu} aria-label="会社サイトのナビゲーション">{companyNavigation.map((item) => <Link key={item.href} to={item.href} aria-current={pathname.startsWith(item.href) ? 'page' : undefined} onClick={() => setMenu(false)}>{item.label}</Link>)}<Link className="company-nav-contact" to="/inquiry/" onClick={() => setMenu(false)}>お問い合わせ</Link></nav>
    </header>
    <main id="company-main" tabIndex={-1}>{children}</main>
    <footer className="company-footer"><div className="company-footer-top"><Link className="company-wordmark" to="/" aria-label="OTM株式会社 ホーム"><span>OTM<span className="company-wordmark-dot">.</span></span></Link><p>Software for work.<br />Tools for creativity.</p><a href="#company-main">ページの先頭へ ↑</a></div><div className="company-footer-bottom"><span>© {new Date().getFullYear()} {company.name}</span><nav aria-label="フッターナビゲーション"><Link to="/about/">会社案内</Link><Link to="/services/">事業紹介</Link><Link to="/portfolio/">制作実績</Link><Link to="/privacy/">プライバシーポリシー</Link><a href="https://github.com/fujitatsukasa" target="_blank" rel="noopener noreferrer">GitHub</a></nav></div></footer>
  </div>
}

export function CompanyContactBand() {
  return <section className="company-section company-contact" aria-labelledby="company-band-title"><div className="company-section-label"><span>YOUR NEXT STARTS HERE</span><span>お問い合わせ</span></div><p className="company-contact-display" aria-hidden="true" data-company-reveal>Have a <i>next?</i><span>↗</span></p><div className="company-contact-grid"><div data-company-reveal><h2 id="company-band-title">次につくるものを、<br />一緒に考えましょう。</h2><p>アイデアの段階から、既存の仕組みの改善まで。<br />目的と課題を整理するところからお話しできます。</p></div><Link className="company-contact-link" to="/inquiry/"><span><small>CONTACT OTM</small>開発について相談する</span><ArrowUpRight aria-hidden="true" /></Link></div></section>
}
