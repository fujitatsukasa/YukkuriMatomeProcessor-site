import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Menu, X } from 'lucide-react'
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
    <div className="company-site">
      <>
        <title>{title}</title>
        <meta name="description" content={company.description} />
        <meta name="application-name" content={company.name} />
        <meta name="robots" content="index,follow" />
        <meta name="theme-color" content="#111714" />
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
            <span>SOFTWARE / AI / PRODUCTS</span>
            <span>OTM CORPORATION · JAPAN</span>
          </div>
          <div className="company-hero-content">
            <div className="company-hero-copy">
              <p className="company-eyebrow">技術を、使えるかたちに。</p>
              <h1 id="company-hero-title">アイデアを、<br />使える<br className="company-mobile-break" />ソフトウェアへ<span>。</span></h1>
              <p className="company-hero-description">ソフトウェア開発から、AIを活用した業務支援まで。<br className="company-desktop-break" />OTMは、仕事と創作を支える仕組みをつくります。</p>
              <div className="company-actions">
                <a className="company-button company-button--light" href="#business">事業内容を見る</a>
                <a className="company-text-link" href="#contact">開発について相談する</a>
              </div>
            </div>
            <div className="company-hero-aside">
              <div className="company-hero-monogram" aria-hidden="true">OTM<span>.</span></div>
              <p>From an idea<br />to something useful.</p>
              <span>DESIGN. DEVELOP. IMPROVE.</span>
            </div>
          </div>
          <div className="company-hero-bottom">
            <span>ソフトウェアの企画・設計・開発</span>
            <a href="#about">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></a>
          </div>
        </section>

        <section id="about" className="company-section company-about" aria-labelledby="company-about-title">
          <div className="company-section-label"><span>01 / ABOUT US</span><span>私たちについて</span></div>
          <div className="company-about-content">
            <h2 id="company-about-title">つくって終わりではなく、<br />使われるところまで。</h2>
            <div className="company-about-copy">
              <p>アイデアがある。解決したい手間がある。<br />それを日々使える仕組みに変えるのが、私たちの仕事です。</p>
              <p>OTM株式会社は、Web・デスクトップアプリケーションの開発と、AIを活用した機能づくりに取り組んでいます。使う人の流れを考え、必要な機能を設計し、実際の利用を見ながら改善を重ねます。</p>
              <div className="company-english-summary" lang="en">
                <span>OTM AT A GLANCE</span>
                <p>OTM Corporation is a software company based in Japan. We develop web and desktop applications, AI-assisted workflows, and our own software products for work and creative production.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="business" className="company-section company-business" aria-labelledby="company-business-title">
          <div className="company-section-label"><span>02 / WHAT WE DO</span><span>事業内容</span></div>
          <div className="company-section-heading">
            <h2 id="company-business-title">必要な技術を、<br />必要なところへ。</h2>
            <p>画面、データ、AI、外部サービス。<br />別々の技術を、使う人のための一つの体験へ。</p>
          </div>
          <div className="company-service-list">
            {companyServices.map((service) => (
              <article key={service.number} className="company-service">
                <span className="company-service-number">{service.number}</span>
                <div className="company-service-title"><p>{service.label}</p><h3>{service.title}</h3></div>
                <div className="company-service-description"><p>{service.description}</p><ul>{service.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul></div>
              </article>
            ))}
          </div>
        </section>

        <section id="products" className="company-section company-products" aria-labelledby="company-products-title">
          <div className="company-section-label"><span>03 / OUR PRODUCT</span><span>自社プロダクト</span></div>
          <div className="company-product-grid">
            <div className="company-product-copy">
              <p className="company-eyebrow">CREATIVE SOFTWARE</p>
              <h2 id="company-products-title">ゆっくりまとめ<br />プロセッサー</h2>
              <p className="company-product-name" lang="en">Yukkuri Matome Processor</p>
              <p>素材集め、台本づくり、編集用データの整理。動画制作の前準備を一つの流れで進める、Windows向けの制作支援アプリです。</p>
              <p>AIによる台本案の作成を支援し、素材とセリフをボードで整理。YMM4で仕上げるための制作データを整えます。</p>
              <div className="company-product-tags"><span>Windows 10 / 11</span><span>YMM4連携</span><span>AI作成支援</span></div>
              <Link className="company-button company-button--dark" to={company.productPath}>製品について詳しく見る</Link>
            </div>
            <figure className="company-product-visual">
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
            <div><h2 id="company-profile-title">OTM株式会社</h2><p lang="en">OTM CORPORATION</p><p className="company-profile-statement">ソフトウェアで、<br />次の一歩をつくる。</p></div>
            <dl>
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
          <div className="company-contact-grid">
            <div><h2 id="company-contact-title">次につくるものを、<br />一緒に考えましょう。</h2><p>ソフトウェア開発、AIの活用、自社製品に関するご相談。<br className="company-desktop-break" />お問い合わせはメールでお寄せください。</p></div>
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
