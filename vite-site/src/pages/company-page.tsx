import { Link } from 'react-router-dom'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { CompanyLayout, CompanyContactBand } from '@/components/company-layout'
import { CompanyMotion, ServiceGraphic } from '@/components/company-motion'
import { CompanyWorkCards } from '@/components/company-work'
import { company, companyServices } from '@/data/company'

export function CompanyPage() {
  return <CompanyLayout title={`${company.name}｜ソフトウェア開発・AI活用・自社プロダクト`}>
    <section className="company-hero" aria-labelledby="company-hero-title">
      <div className="company-hero-topline"><span><i /> SOFTWARE DEVELOPMENT COMPANY</span><span>JAPAN / OTM CORPORATION</span></div>
      <div className="company-hero-backdrop" aria-hidden="true">MAKE IT<br /><span>WORK.</span></div>
      <div className="company-hero-content">
        <div className="company-hero-copy">
          <p className="company-eyebrow" data-intro>IDEAS INTO REALITY.</p>
          <h1 id="company-hero-title"><span data-intro>構想を、</span><span data-intro><em>動く</em>ソフトウェアへ。</span></h1>
          <p className="company-hero-description" data-intro>Web、デスクトップ、AI。<br />技術をつなぎ、仕事と創作の可能性を広げる。<br />OTMは、アイデアを使える仕組みに変える会社です。</p>
          <div className="company-actions" data-intro><Link className="company-button company-button--light" to="/services/">私たちがつくるもの <ArrowUpRight size={19} aria-hidden="true" /></Link><Link className="company-text-link" to="/inquiry/">開発について相談する <ArrowUpRight size={16} aria-hidden="true" /></Link></div>
        </div>
        <CompanyMotion />
      </div>
      <div className="company-hero-bottom"><span>DESIGN <b>/</b> DEVELOP <b>/</b> IMPROVE</span><a href="#about">SCROLL TO EXPLORE <ArrowDown size={16} aria-hidden="true" /></a></div>
    </section>

    <section id="about" className="company-section company-about" aria-labelledby="company-about-title">
      <div className="company-section-label"><span>01 / ABOUT US</span><span>私たちについて</span></div>
      <div className="company-about-content">
        <h2 id="company-about-title" data-company-reveal>そのアイデアに、<br /><span>動き出す力を。</span></h2>
        <div className="company-about-copy" data-company-reveal>
          <p>アイデアがある。解決したい手間がある。<br />それを日々使える仕組みに変えるのが、私たちの仕事です。</p>
          <p>OTM株式会社は、Web・デスクトップアプリケーションの開発と、AIを活用した機能づくりに取り組んでいます。使う人の流れを考え、必要な機能を設計し、実際の利用を見ながら改善を重ねます。</p>
          <div className="company-english-summary" lang="en"><span>OTM AT A GLANCE</span><p>OTM Corporation is a software company based in Japan. We develop web and desktop applications, AI-assisted workflows, and our own software products for work and creative production.</p></div>
          <Link className="company-text-link" to="/about/">OTMについて <ArrowUpRight size={16} aria-hidden="true" /></Link>
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
      <div className="company-section-heading" data-company-reveal><h2 id="company-business-title">ソフトウェアで、<br />できることを増やす。</h2><p>画面、データ、AI、外部サービス。<br />別々の技術を、使う人のための一つの体験へ。</p></div>
      <div className="company-service-list">{companyServices.map((service, index) => <article key={service.number} className="company-service" data-company-reveal><div className="company-service-top"><span className="company-service-number">{service.number}</span><ArrowUpRight size={23} strokeWidth={1} aria-hidden="true" /></div><ServiceGraphic variant={index} /><div className="company-service-title"><p>{service.label}</p><h3>{service.title}</h3></div><div className="company-service-description"><p>{service.description}</p><ul>{service.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul></div></article>)}</div>
      <Link className="company-text-link company-section-more" to="/services/">事業と開発の進め方 <ArrowUpRight size={17} aria-hidden="true" /></Link>
    </section>

    <section id="portfolio" className="company-section company-products" aria-labelledby="company-portfolio-title">
      <div className="company-section-label"><span>03 / SELECTED WORK</span><span>制作実績</span></div>
      <div className="company-section-heading" data-company-reveal><h2 id="company-portfolio-title">つくる。その先まで。</h2><p>自社プロダクト、Web、3D。<br />制作したものと、その背景をご紹介します。</p></div>
      <CompanyWorkCards />
      <Link className="company-text-link company-section-more" to="/portfolio/">ポートフォリオを見る <ArrowUpRight size={17} aria-hidden="true" /></Link>
    </section>

    <section id="company" className="company-section company-profile" aria-labelledby="company-profile-title">
      <div className="company-section-label"><span>04 / COMPANY</span><span>会社概要</span></div>
      <div className="company-profile-grid"><div data-company-reveal><h2 id="company-profile-title">OTM株式会社</h2><p lang="en">OTM CORPORATION</p><p className="company-profile-statement">ソフトウェアで、<br />次の一歩をつくる。</p><Link className="company-text-link" to="/about/">会社案内を見る <ArrowUpRight size={16} aria-hidden="true" /></Link></div><dl data-company-reveal><div><dt>会社名</dt><dd>{company.name}</dd></div><div><dt>代表者</dt><dd>{company.representative}</dd></div><div><dt>所在地</dt><dd>{company.postalCode}<br />{company.address}</dd></div><div><dt>事業内容</dt><dd>ソフトウェアの企画・設計・開発<br />AI活用・業務自動化<br />自社プロダクトの開発・運用</dd></div><div><dt>法人番号</dt><dd>{company.corporateNumber}</dd></div></dl></div>
    </section>
    <CompanyContactBand />
  </CompanyLayout>
}
