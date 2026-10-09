import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDown, ArrowUpRight, Mail, Menu, X } from 'lucide-react'
import { CompanyMotion, ServiceGraphic } from '@/components/company-motion'
import { company, companyNavigation, companyServices } from '@/data/company'
import './company-page.css'

const title = `${company.name}｜ソフトウェア開発・AI活用・自社プロダクト`
const inquiryUrl = `mailto:${company.email}?subject=${encodeURIComponent('OTM株式会社へのお問い合わせ')}`

const organizationData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${company.origin}/#organization`,
  name: company.name,
  url: `${company.origin}/`,
  description: company.description,
  email: company.email,
  address: {
    '@type': 'PostalAddress',
    postalCode: company.postalCode.replace('〒', ''),
    streetAddress: company.address,
    addressCountry: 'JP',
  },
  sameAs: ['https://x.com/OTM_corp', 'https://github.com/fujitatsukasa'],
}

export function CompanyPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const preference = matchMedia('(prefers-reduced-motion: reduce)')
    const animations: Animation[] = []
    const enter = (element: HTMLElement, delay = 0) => {
      element.dataset.entered = 'true'
      if (preference.matches) return
      animations.push(element.animate([
        { opacity: 0, transform: 'translateY(34px)', clipPath: 'inset(0 0 18% 0)' },
        { opacity: 1, transform: 'translateY(0)', clipPath: 'inset(0)' },
      ], { duration: 1050, delay, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' }))
    }
    root.querySelectorAll<HTMLElement>('[data-intro]').forEach((element, index) => enter(element, index * 100))
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const element = entry.target as HTMLElement
        enter(element)
        observer.unobserve(element)
      })
    }, { threshold: .12 })
    root.querySelectorAll('[data-company-reveal]').forEach((element) => observer.observe(element))
    let frame = 0
    const update = () => {
      frame = 0
      const progress = scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)
      root.style.setProperty('--reading-progress', String(progress))
      root.style.setProperty('--hero-shift', `${preference.matches ? 0 : Math.min(scrollY * .12, 90)}px`)
      const workflow = root.querySelector<HTMLElement>('.company-workflow')
      if (workflow) {
        const position = (innerHeight * .78 - workflow.getBoundingClientRect().top) / (innerHeight * .6)
        workflow.style.setProperty('--flow-progress', String(Math.max(0, Math.min(1, position))))
        workflow.dataset.step = String(Math.min(2, Math.max(0, Math.floor(position * 3))))
      }
    }
    const requestUpdate = () => { if (!frame) frame = requestAnimationFrame(update) }
    const reduce = () => { if (preference.matches) animations.forEach((animation) => animation.finish()); update() }
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    preference.addEventListener('change', reduce)
    update()
    return () => {
      observer.disconnect()
      animations.forEach((animation) => animation.cancel())
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      preference.removeEventListener('change', reduce)
    }
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        document.getElementById('company-menu-toggle')?.focus()
      }
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  return (
    <div className="company-site" ref={rootRef}>
      <>
        <title>{title}</title>
        <meta name="description" content={company.description} />
        <meta name="application-name" content={company.name} />
        <meta name="robots" content="index,follow" />
        <meta name="theme-color" content="#121313" />
        <link rel="canonical" href={`${company.origin}/`} />
        <link rel="icon" type="image/svg+xml" href="/company/favicon.svg" />
        <meta property="og:site_name" content={company.name} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={company.description} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ja_JP" />
        <meta property="og:url" content={`${company.origin}/`} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={company.description} />
        <script type="application/ld+json">
          {JSON.stringify(organizationData).replace(/</g, '\\u003c')}
        </script>
      </>

      <a className="company-skip" href="#company-main">本文へスキップ</a>

      <header className="company-header">
        <a className="company-wordmark" href="/" aria-label="OTM株式会社 ホーム">
          <span>OTM<span className="company-wordmark-dot">.</span></span>
          <small>OTM株式会社</small>
        </a>
        <button
          id="company-menu-toggle"
          className="company-menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="company-navigation"
          aria-label={menuOpen ? 'メニューを閉じる' : 'メニューを開く'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <nav id="company-navigation" className="company-navigation" data-open={menuOpen} aria-label="会社サイトのナビゲーション">
          {companyNavigation.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>
          ))}
          <a className="company-nav-contact" href="#contact" onClick={() => setMenuOpen(false)}>お問い合わせ</a>
        </nav>
      </header>

      <main id="company-main" tabIndex={-1}>
        <section className="company-hero" aria-labelledby="company-hero-title">
          <div className="company-hero-topline">
            <span><i /> SOFTWARE DEVELOPMENT COMPANY</span>
            <span>JAPAN / OTM CORPORATION</span>
          </div>
          <div className="company-hero-backdrop" aria-hidden="true">MAKE IT<br /><span>WORK.</span></div>
          <div className="company-hero-content">
            <div className="company-hero-copy">
              <p className="company-eyebrow" data-intro>IDEAS INTO REALITY.</p>
              <h1 id="company-hero-title"><span data-intro>構想を、</span><span data-intro><em>動く</em>ソフトウェアへ。</span></h1>
              <p className="company-hero-description" data-intro>Web、デスクトップ、AI。<br />技術をつなぎ、仕事と創作の可能性を広げる。<br />OTMは、アイデアを使える仕組みに変える会社です。</p>
              <div className="company-actions" data-intro>
                <a className="company-button company-button--light" href="#business">私たちがつくるもの <ArrowUpRight size={19} aria-hidden="true" /></a>
                <a className="company-text-link" href="#contact">開発について相談する <ArrowUpRight size={16} aria-hidden="true" /></a>
              </div>
            </div>
            <CompanyMotion />
          </div>
          <div className="company-hero-bottom">
            <span>DESIGN <b>/</b> DEVELOP <b>/</b> IMPROVE</span>
            <a href="#about">SCROLL TO EXPLORE <ArrowDown size={16} aria-hidden="true" /></a>
          </div>
        </section>

        <section id="about" className="company-section company-about" aria-labelledby="company-about-title">
          <div className="company-section-label"><span>01 / ABOUT US</span><span>私たちについて</span></div>
          <div className="company-about-content">
            <h2 id="company-about-title" data-company-reveal>そのアイデアに、<br /><span>動き出す力を。</span></h2>
            <div className="company-about-copy" data-company-reveal>
              <p>アイデアがある。解決したい手間がある。<br />それを日々使える仕組みに変えるのが、私たちの仕事です。</p>
              <p>OTM株式会社は、Web・デスクトップアプリケーションの開発と、AIを活用した機能づくりに取り組んでいます。使う人の流れを考え、必要な機能を設計し、実際の利用を見ながら改善を重ねます。</p>
              <div className="company-english-summary" lang="en">
                <span>OTM AT A GLANCE</span>
                <p>OTM Corporation is a software company based in Japan. We develop web and desktop applications, AI-assisted workflows, and our own software products for work and creative production.</p>
              </div>
            </div>
          </div>
          <div className="company-workflow" data-step="0" aria-label="企画・設計、開発・接続、運用・改善の開発工程">
            <div className="company-workflow-track" aria-hidden="true"><span /></div>
            {[
              { english: 'DESIGN', japanese: '課題をほどき、設計する。', detail: '使う人の目的から、必要な機能を考える。' },
              { english: 'DEVELOP', japanese: '技術をつなぎ、形にする。', detail: '画面、データ、AIを一つの仕組みへ。' },
              { english: 'IMPROVE', japanese: '使いながら、育てていく。', detail: '日々の利用に合わせて、改善を重ねる。' },
            ].map((step, index) => <div className="company-workflow-step" key={step.english} data-company-reveal><span className="company-workflow-index">0{index + 1}</span><h3>{step.english}</h3><p>{step.japanese}</p><small>{step.detail}</small></div>)}
          </div>
        </section>

        <section id="business" className="company-section company-business" aria-labelledby="company-business-title">
          <div className="company-section-label"><span>02 / WHAT WE DO</span><span>事業内容</span></div>
          <div className="company-section-heading" data-company-reveal>
            <h2 id="company-business-title">ソフトウェアで、<br />できることを増やす。</h2>
            <p>画面、データ、AI、外部サービス。<br />別々の技術を、使う人のための一つの体験へ。</p>
          </div>
          <div className="company-service-list">
            {companyServices.map((service, index) => (
              <article key={service.number} className="company-service" data-company-reveal>
                <div className="company-service-top"><span className="company-service-number">{service.number}</span><ArrowUpRight size={23} strokeWidth={1} aria-hidden="true" /></div>
                <ServiceGraphic variant={index} />
                <div className="company-service-title"><p>{service.label}</p><h3>{service.title}</h3></div>
                <div className="company-service-description"><p>{service.description}</p><ul>{service.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul></div>
              </article>
            ))}
          </div>
        </section>

        <section id="products" className="company-section company-products" aria-labelledby="company-products-title">
          <div className="company-section-label"><span>03 / OUR PRODUCT</span><span>自社プロダクト</span></div>
          <div className="company-product-grid">
            <div className="company-product-copy" data-company-reveal>
              <p className="company-eyebrow">CREATIVE SOFTWARE</p>
              <h2 id="company-products-title">ゆっくりまとめ<br />プロセッサー</h2>
              <p className="company-product-name" lang="en">Yukkuri Matome Processor</p>
              <p>素材集め、台本づくり、編集用データの整理。動画制作の前準備を一つの流れで進める、Windows向けの制作支援アプリです。</p>
              <p>AIによる台本案の作成を支援し、素材とセリフをボードで整理。YMM4で仕上げるための制作データを整えます。</p>
              <div className="company-product-tags"><span>Windows 10 / 11</span><span>YMM4連携</span><span>AI作成支援</span></div>
              <Link className="company-button company-button--light" to={company.productPath}>製品について詳しく見る <ArrowUpRight size={19} aria-hidden="true" /></Link>
            </div>
            <figure className="company-product-visual" data-company-reveal>
              <div className="company-product-visual-heading"><span>YMP / ACTUAL APPLICATION</span><span>DESKTOP SOFTWARE</span></div>
              <Link to={company.productPath} aria-label="ゆっくりまとめプロセッサーの製品紹介を見る">
                <img src="/product_get_script.webp" alt="ゆっくりまとめプロセッサーで対応サイトとURLを指定して素材を取得する実際のアプリ画面" width={1917} height={1032} loading="lazy" decoding="async" />
              </Link>
              <figcaption>自社開発のアプリケーション / 台本取得画面</figcaption>
            </figure>
          </div>
          <div className="company-product-support"><span>製品をご利用の方へ</span><Link to="/download/">ダウンロード</Link><Link to="/instructions/">使い方</Link><Link to="/contact/">製品サポート</Link></div>
        </section>

        <section id="company" className="company-section company-profile" aria-labelledby="company-profile-title">
          <div className="company-section-label"><span>04 / COMPANY</span><span>会社概要</span></div>
          <div className="company-profile-grid">
            <div data-company-reveal><h2 id="company-profile-title">OTM株式会社</h2><p lang="en">OTM CORPORATION</p><p className="company-profile-statement">ソフトウェアで、<br />次の一歩をつくる。</p></div>
            <dl data-company-reveal>
              <div><dt>会社名</dt><dd>{company.name}</dd></div>
              <div><dt>代表者</dt><dd>{company.representative}</dd></div>
              <div><dt>所在地</dt><dd>{company.postalCode}<br />{company.address}</dd></div>
              <div><dt>事業内容</dt><dd>ソフトウェアの企画・設計・開発<br />AI活用・業務自動化<br />自社プロダクトの開発・運用</dd></div>
              <div><dt>お問い合わせ</dt><dd><a href={inquiryUrl}>{company.email}</a></dd></div>
            </dl>
          </div>
        </section>

        <section id="contact" className="company-section company-contact" aria-labelledby="company-contact-title">
          <div className="company-section-label"><span>05 / CONTACT</span><span>お問い合わせ</span></div>
          <p className="company-contact-display" aria-hidden="true" data-company-reveal>LET’S BUILD<span>↗</span></p>
          <div className="company-contact-grid">
            <div data-company-reveal><h2 id="company-contact-title">次につくるものを、<br />一緒に考えましょう。</h2><p>ソフトウェア開発、AIの活用、自社製品に関するご相談。<br className="company-desktop-break" />お問い合わせはメールでお寄せください。</p></div>
            <a className="company-contact-link" href={inquiryUrl}><Mail size={26} strokeWidth={1.5} aria-hidden="true" /><span><small>EMAIL US</small>{company.email}</span></a>
          </div>
        </section>
      </main>

      <footer className="company-footer">
        <div className="company-footer-top"><a className="company-wordmark" href="/" aria-label="OTM株式会社 ホーム"><span>OTM<span className="company-wordmark-dot">.</span></span></a><p>Software for work.<br />Tools for creativity.</p><a href="#company-main">ページの先頭へ ↑</a></div>
        <div className="company-footer-bottom"><span>© {new Date().getFullYear()} {company.name}</span><nav aria-label="フッターナビゲーション"><Link to={company.productPath}>製品紹介</Link><Link to="/legal/privacy/">プライバシーポリシー</Link><a href="https://x.com/OTM_corp" target="_blank" rel="noopener noreferrer">X</a><a href="https://github.com/fujitatsukasa" target="_blank" rel="noopener noreferrer">GitHub</a></nav></div>
      </footer>
    </div>
  )
}
