import { Link } from 'react-router-dom'
import { ArrowDown, ArrowUpRight, Check } from 'lucide-react'
import { CompanyLayout, CompanyContactBand } from '@/components/company-layout'
import { CompanyMotion } from '@/components/company-motion'
import { CompanyWorkCards } from '@/components/company-work'
import { company, companyContributions, companyServices } from '@/data/company'

export function CompanyPage() {
  return <CompanyLayout title={`${company.name}｜仕事と創作を支えるソフトウェア・AI開発`}>
    <section className="purpose-hero" aria-labelledby="company-hero-title">
      <div className="purpose-hero-top"><span><i /> OTM / SOFTWARE &amp; AI DEVELOPMENT</span><span>BUILD TO MAKE A DIFFERENCE.</span></div>
      <div className="purpose-hero-grid">
        <div className="purpose-hero-copy">
          <p className="purpose-kicker" data-intro>仕事と創作を支える、ソフトウェア開発会社。</p>
          <h1 id="company-hero-title"><span data-intro>面倒を減らす。</span><span data-intro>創る時間を<span className="purpose-emphasis">増やす。</span></span></h1>
          <p className="purpose-hero-lead" data-intro>Web・Windowsアプリ・AIを組み合わせ、<br className="purpose-desktop-break" />情報の整理から制作の前準備まで、<br className="purpose-desktop-break" />日々の作業をつなぐ道具を開発する。OTM株式会社。</p>
          <div className="company-actions" data-intro><Link className="company-button company-button--light" to="/portfolio/ymp/">開発している製品を見る <ArrowUpRight size={18} /></Link><Link className="company-text-link" to="/mission/">私たちが目指すもの <ArrowUpRight size={17} /></Link></div>
          <p className="purpose-hero-proof"><span><Check size={14} /> 自社ソフトウェアを開発・公開</span><span>WEB / WINDOWS / AI</span></p>
        </div>
        <div className="purpose-hero-lab" aria-label="素材・データを整理し、AIとソフトウェアを通して仕事・創作に使える道具へつなぐ流れ">
          <div className="purpose-lab-header"><span>FROM INFORMATION</span><span>TO <i>CREATION.</i></span></div>
          <CompanyMotion flow />
          <div className="purpose-lab-stages"><span><b>01</b> 素材・データ</span><i>→</i><span><b>02</b> 整理・接続</span><i>→</i><span><b>03</b> 仕事・創作へ</span></div>
        </div>
      </div>
      <div className="purpose-hero-bottom"><span>私たちがつくるのは、次の一歩を支える道具。</span><a href="#about">EXPLORE OTM <ArrowDown size={16} /></a></div>
    </section>

    <div className="company-ticker purpose-ticker" aria-hidden="true"><div className="company-ticker-track">{[0, 1, 2, 3].map((copy) => <span key={copy}>LESS FRICTION.<i> More creation.</i><b>↗</b> SOFTWARE<i> that works for you.</i><b>↗</b></span>)}</div></div>

    <section id="about" className="company-section purpose-mission" aria-labelledby="purpose-mission-title">
      <div className="company-section-label"><span>01 / WHY WE BUILD</span><span>何を目指す会社か</span></div>
      <div className="purpose-mission-grid">
        <div data-company-reveal><p className="purpose-overline">OUR MISSION</p><h2 id="purpose-mission-title">人が考え、つくる<br /><em>時間を増やす。</em></h2><p>集める。整える。何度も転記する。<br />必要だけれど、手間のかかる作業がある。</p><p>私たちは、その間をソフトウェアでつなぎます。人が判断し、工夫し、表現するところに時間を使えるように。大きな組織だけでなく、一人のクリエイターや小さなチームにも、使える道具を届けたいと考えています。</p><Link className="company-text-link" to="/mission/">目指す価値と開発の考え方 <ArrowUpRight size={17} /></Link></div>
        <figure className="purpose-photo purpose-photo--creative" data-company-reveal><img src="/company/creative-work.webp" alt="創作に集中する時間を表現した、紙のストーリーボードを組み立てるコンセプトビジュアル" width={1672} height={941} loading="lazy" /><figcaption><span>MORE ROOM TO CREATE.</span><span>VISUAL CONCEPT</span></figcaption></figure>
      </div>
      <div className="purpose-statement" data-company-reveal><span>整理の先に、<em>創造を。</em></span><span>FROM THE TASK<br />TO THE POSSIBILITY.</span></div>
    </section>

    <section id="impact" className="company-section purpose-impact" aria-labelledby="purpose-impact-title">
      <div className="company-section-label"><span>02 / WHERE WE CONTRIBUTE</span><span>どんな課題に貢献するか</span></div>
      <div className="company-section-heading" data-company-reveal><h2 id="purpose-impact-title">つくる人に。<br />働く人に。</h2><p>ソフトウェアを、日々の作業に届く形へ。<br />公開済みの自社製品と、相談できる開発テーマをご紹介します。</p></div>
      <div className="purpose-impact-list">{companyContributions.map((item) => <article key={item.number} className="purpose-impact-row" data-company-reveal><div className="purpose-impact-index">{item.number}<span>{item.label}</span></div><div><span className="purpose-case-kind">{item.kind}</span><h3>{item.title}</h3><p>{item.text}</p></div><div className="purpose-impact-example"><p>{item.example}</p><Link className="company-text-link" to={item.href}>{item.link} <ArrowUpRight size={18} /></Link></div></article>)}</div>
    </section>

    <section id="business" className="company-section purpose-business" aria-labelledby="company-business-title">
      <div className="company-section-label"><span>03 / WHAT WE BUILD</span><span>何を開発する会社か</span></div>
      <div className="purpose-business-grid"><div><h2 id="company-business-title" data-company-reveal>技術を選ぶ。<br />つなぐ。<br /><em>使える形にする。</em></h2><p data-company-reveal>画面だけ、AIだけで終わらせない。<br />データ処理、外部サービス、利用者の確認まで、<br />一つの流れとして設計します。</p><Link className="company-text-link" to="/technology/">AIとソフトウェアの設計方針 <ArrowUpRight size={17} /></Link></div><div className="purpose-service-list">{companyServices.map((service) => <Link key={service.number} to="/services/" className="purpose-service-link" data-company-reveal><span>{service.number} / {service.label}</span><h3>{service.title}<ArrowUpRight size={26} /></h3><p>{service.description}</p><small>{service.tags.join(' / ')}</small></Link>)}</div></div>
    </section>

    <section className="purpose-build-banner" aria-labelledby="purpose-build-title"><figure><img src="/company/connected-work.webp" alt="複数の入力を使いやすい仕事の流れにつなぐことを表現したコンセプトビジュアル" width={1536} height={1024} loading="lazy" /><figcaption>CONNECTED WORK / VISUAL CONCEPT</figcaption></figure><div data-company-reveal><span className="purpose-overline">HOW WE BUILD</span><h2 id="purpose-build-title">小さく試す。<br />使って確かめる。<br /><em>育てていく。</em></h2><p>課題を整理し、一つの作業で試せる形へ。<br />必要な機能から開発し、実際の利用に合わせて改善する。</p><Link className="company-text-link" to="/services/">開発の進め方を見る <ArrowUpRight size={17} /></Link></div></section>

    <section id="portfolio" className="company-section company-products purpose-selected" aria-labelledby="company-portfolio-title"><div className="company-section-label"><span>04 / BUILT BY OTM</span><span>実際につくっているもの</span></div><div className="company-section-heading" data-company-reveal><h2 id="company-portfolio-title">考えるだけで、<br />終わらせない。</h2><p>自社ソフトウェアの開発・公開から、Webと3Dの制作まで。<br />目的・担当範囲・成果物を事例として紹介します。</p></div><CompanyWorkCards /><Link className="company-text-link company-section-more" to="/portfolio/">制作実績と開発の背景 <ArrowUpRight size={18} /></Link></section>

    <section id="company" className="company-section company-profile purpose-company" aria-labelledby="company-profile-title"><div className="company-section-label"><span>05 / COMPANY</span><span>会社と連絡先</span></div><div className="company-profile-grid"><div data-company-reveal><h2 id="company-profile-title">OTM株式会社</h2><p lang="en">OTM CORPORATION / JAPAN</p><p className="purpose-company-summary" lang="en">We develop web and Windows software that connects everyday work with creative production. Our own product helps creators prepare materials and scripts. We also develop AI-assisted workflows with human review and integration into existing tools.</p><Link className="company-text-link" to="/about/">会社情報を見る <ArrowUpRight size={17} /></Link></div><dl data-company-reveal><div><dt>代表者</dt><dd>{company.representative}</dd></div><div><dt>所在地</dt><dd>{company.postalCode}<br />{company.address}</dd></div><div><dt>事業</dt><dd>Web・Windows向けソフトウェア開発<br />AI活用・業務自動化<br />自社プロダクトの企画・開発・運用</dd></div><div><dt>法人番号</dt><dd>{company.corporateNumber}</dd></div></dl></div></section>
    <CompanyContactBand />
  </CompanyLayout>
}
