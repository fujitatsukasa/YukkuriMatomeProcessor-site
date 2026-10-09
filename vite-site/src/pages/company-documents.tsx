import { Link } from 'react-router-dom'
import { ArrowUpRight, Mail } from 'lucide-react'
import { CompanyLayout, CompanyContactBand, companyInquiry } from '@/components/company-layout'
import { CompanyWorkCards, CompanyWorkVisual } from '@/components/company-work'
import { ServiceGraphic } from '@/components/company-motion'
import { company, companyServices, companyWorks } from '@/data/company'

function DocumentHero({ label, title, description }: { label: string; title: string; description: string }) {
  return <section className="company-document-hero"><nav className="company-breadcrumb" aria-label="パンくずリスト"><Link to="/">HOME</Link><span aria-hidden="true">/</span><span>{label}</span></nav><p className="company-eyebrow" data-intro>{label}</p><h1 data-intro>{title}</h1><p className="company-document-description" data-intro>{description}</p></section>
}

export function CompanyAboutPage() {
  return <CompanyLayout title="会社案内｜OTM株式会社" description="OTM株式会社の考え方、ソフトウェア開発への取り組みと会社概要。神奈川県大和市を拠点に、AI活用・業務自動化・自社製品開発に取り組んでいます。">
    <DocumentHero label="ABOUT OTM" title="使う人のために、つくる。" description="ソフトウェアは、誰かの仕事や創作に使われてはじめて役に立つ。私たちは、アイデアと日々の作業の間をつなぐ仕組みをつくります。" />
    <figure className="company-editorial-art"><img src="/company/architecture-art.webp" alt="黒・銀・朱色の構造体を組み合わせたOTMのオリジナルブランドアート" width={1672} height={941} /><figcaption>OTM BRAND ART / CONNECTED STRUCTURES</figcaption></figure>
    <section className="company-section"><div className="company-section-label"><span>OUR APPROACH</span><span>開発で大切にすること</span></div><div className="company-principles">{[
      ['01', '目的から考える。', '使う人が何をしたいのか、どこに手間があるのか。技術を決める前に、課題と作業の流れを整理します。'],
      ['02', '一つの流れにする。', '画面、データ処理、AI、外部サービス。別々の機能をつなぎ、確認や判断がしやすい体験へまとめます。'],
      ['03', '使われるところまで。', '実装と合わせて、導入・使い方・運用を考える。実際の利用に合わせて改善できる構造を大切にします。'],
    ].map(([number, heading, description]) => <article key={number} data-company-reveal><span>{number}</span><h2>{heading}</h2><p>{description}</p></article>)}</div></section>
    <section id="company" className="company-section company-profile"><div className="company-section-label"><span>COMPANY PROFILE</span><span>会社概要</span></div><div className="company-profile-grid"><div data-company-reveal><h2>OTM株式会社</h2><p>OTM CORPORATION</p><p className="company-profile-statement">Software for work.<br />Tools for creativity.</p></div><dl data-company-reveal><div><dt>会社名</dt><dd>{company.name}</dd></div><div><dt>代表者</dt><dd>{company.representative}</dd></div><div><dt>所在地</dt><dd>{company.postalCode}<br />{company.address}</dd></div><div><dt>法人番号</dt><dd>{company.corporateNumber}<br /><a href={company.corporateRecordUrl} target="_blank" rel="noopener noreferrer">Gビズインフォの法人情報 ↗</a></dd></div><div><dt>法人番号指定日</dt><dd>{company.corporateNumberAssigned}<br /><a href={company.nationalTaxRecordUrl} target="_blank" rel="noopener noreferrer">国税庁の公表情報 ↗</a></dd></div><div><dt>事業内容</dt><dd>ソフトウェアの企画・設計・開発<br />生成AIの活用・業務自動化<br />自社プロダクトの開発・運用</dd></div><div><dt>お問い合わせ</dt><dd><a href={companyInquiry}>{company.email}</a></dd></div></dl></div><div className="company-public-profile"><span>公開プロフィール</span><a href="https://www.lancers.jp/client/TAKASAN_WARKS" target="_blank" rel="noopener noreferrer">ランサーズの事業紹介 <ArrowUpRight size={16} aria-hidden="true" /></a></div></section>
    <CompanyContactBand />
  </CompanyLayout>
}

const serviceDetails = [
  { heading: '画面の使いやすさから、処理の仕組みまで。', body: 'Webアプリケーション、デスクトップツール、管理画面や既存システムの改修。使う人の作業とデータの流れを整理し、必要な機能を設計・実装します。', examples: ['Webアプリ・管理画面', 'Windows向け制作支援ツール', 'データ処理・外部API連携', '既存サービスの改修・機能追加'] },
  { heading: 'AIを、実際の作業に役立つ機能へ。', body: '文章の作成支援、情報検索、要約、社内ナレッジ活用。生成AIの出力を人が確認する工程や、既存業務との接続まで含めて考えます。小規模な検証から運用へ進める構成を設計します。', examples: ['ChatGPT・Claude・Gemini APIの活用', 'Difyを使った社内ツール', 'RAGによる文書検索・FAQ', 'Python・GASを使った作業の自動化'] },
  { heading: '日々の手間を、自分たちの製品で解決する。', body: '自社製品として、企画・設計・開発・公開・改善に取り組みます。動画制作の前準備を支援する「ゆっくりまとめプロセッサー」は、その一つです。', examples: ['製品企画とワークフロー設計', 'アプリケーション開発', '導入・使い方の案内', '継続的な更新と改善'] },
]

export function CompanyServicesPage() {
  return <CompanyLayout title="事業紹介｜ソフトウェア開発・AI活用｜OTM株式会社">
    <DocumentHero label="WHAT WE DO" title="技術をつなぎ、できることを増やす。" description="ソフトウェア開発、生成AIの活用、業務自動化、自社プロダクト。目的と課題に合わせて、必要な技術を組み合わせます。" />
    <section className="company-section company-service-details">{companyServices.map((service, index) => <article className="company-service-detail" key={service.number} data-company-reveal><div className="company-service-detail-aside"><p className="company-eyebrow">{service.number} / {service.label}</p><ServiceGraphic variant={index} /><h2>{service.title}</h2></div><div><h3>{serviceDetails[index].heading}</h3><p>{serviceDetails[index].body}</p><ul>{serviceDetails[index].examples.map((example) => <li key={example}>{example}</li>)}</ul></div></article>)}</section>
    <section className="company-section company-development-process"><div className="company-section-label"><span>HOW WE BUILD</span><span>開発の進め方</span></div><h2 data-company-reveal>まず、小さく形にする。<br />使って確かめ、育てていく。</h2><div className="company-process-grid">{[['DISCOVER', '目的・課題の整理'], ['DESIGN', '機能と流れの設計'], ['BUILD', '試作・実装・確認'], ['IMPROVE', '導入・運用・改善']].map(([english, japanese], index) => <div key={english} data-company-reveal><span>0{index + 1}</span><h3>{english}</h3><p>{japanese}</p></div>)}</div><Link className="company-text-link" to="/portfolio/">制作事例を見る <ArrowUpRight size={17} aria-hidden="true" /></Link></section>
    <CompanyContactBand />
  </CompanyLayout>
}

export function CompanyPortfolioPage() {
  return <CompanyLayout title="制作実績・ポートフォリオ｜OTM株式会社" description="OTMの自社プロダクト、公式Webサイト、Blenderによる自主制作の3D作品。目的、担当範囲、成果物を制作事例として紹介します。">
    <DocumentHero label="SELECTED WORK" title="つくったものと、その背景。" description="ソフトウェアの自社開発から、Webサイト、3Dの自主制作まで。課題、設計、担当範囲を添えて、制作したものを紹介します。" />
    <section className="company-section company-portfolio-section"><CompanyWorkCards /><p className="company-work-disclosure">掲載事例は自社プロダクト・自社制作・自主制作です。それぞれの詳細ページに制作目的と担当範囲を記載しています。</p></section>
    <CompanyContactBand />
  </CompanyLayout>
}

export function CompanyWorkPage({ slug }: { slug: string }) {
  const work = companyWorks.find((item) => item.slug === slug)!
  return <CompanyLayout title={`${work.title}｜制作事例｜OTM株式会社`} description={work.description}>
    <section className="company-document-hero company-case-hero"><nav className="company-breadcrumb" aria-label="パンくずリスト"><Link to="/">HOME</Link><span>/</span><Link to="/portfolio/">WORK</Link><span>/</span><span>{work.number}</span></nav><p className="company-eyebrow" data-intro>{work.category}</p><h1 data-intro>{work.title}</h1><p className="company-document-description" data-intro>{work.subtitle}</p><p className="company-case-type">{work.type}</p></section>
    <div className="company-case-visual"><CompanyWorkVisual work={work} /></div>
    <section className="company-section company-case-overview"><div data-company-reveal><p className="company-eyebrow">OVERVIEW</p><h2>{work.subtitle}</h2><p>{work.description}</p></div><dl data-company-reveal><div><dt>制作区分</dt><dd>{work.type}</dd></div><div><dt>担当範囲</dt><dd>{work.role}</dd></div><div><dt>技術・領域</dt><dd>{work.tags.join(' / ')}</dd></div></dl></section>
    <section className="company-section company-case-body"><div className="company-case-story" data-company-reveal><span>01 / CONTEXT</span><h2>何のためにつくったか。</h2><p>{work.challenge}</p></div><div className="company-case-story" data-company-reveal><span>02 / APPROACH</span><h2>どのように形にしたか。</h2><p>{work.solution}</p></div><div className="company-case-story" data-company-reveal><span>03 / DELIVERABLES</span><h2>制作したもの。</h2><ul>{work.deliverables.map((item) => <li key={item}>{item}</li>)}</ul></div></section>
    {work.slug === '3d-study' && <section className="company-section company-case-animation"><div className="company-section-label"><span>MOTION STUDY</span><span>Blenderで制作したループ映像</span></div><video className="company-3d-player" controls loop playsInline preload="none" poster="/company/interconnected-forms.webp" aria-label="Blenderで制作したInterconnected Formsの3Dアニメーション"><source src="/company/interconnected-forms.webm" type="video/webm" /><a href="/company/interconnected-forms.webp">作品の静止画を見る</a></video><p>Modeling / materials / lighting / animation — Blender &amp; Cycles</p></section>}
    <section className="company-section company-case-links"><p>{work.scope}</p><div className="company-actions">{work.slug === 'ymp' && <Link className="company-button company-button--light" to={company.productPath}>製品について詳しく見る <ArrowUpRight size={18} aria-hidden="true" /></Link>}<Link className="company-text-link" to="/portfolio/">制作事例の一覧へ <ArrowUpRight size={16} aria-hidden="true" /></Link></div></section>
    <CompanyContactBand />
  </CompanyLayout>
}

export function CompanyInquiryPage() {
  return <CompanyLayout title="お問い合わせ｜OTM株式会社">
    <DocumentHero label="GET IN TOUCH" title="次につくるものを、話しましょう。" description="ソフトウェア開発、AI活用・業務自動化、自社製品について。内容が固まる前のご相談も、メールでお寄せください。" />
    <section className="company-section company-inquiry"><div data-company-reveal><h2>お問い合わせ</h2><p>ご相談の背景や、解決したい作業についてお聞かせください。<br />資料や参考URLがあれば、メールに添えてお送りいただけます。</p><a className="company-contact-link" href={companyInquiry}><Mail aria-hidden="true" /><span><small>EMAIL OTM</small>{company.email}</span><ArrowUpRight aria-hidden="true" /></a><p className="company-inquiry-note">メールアプリが開きます。ご連絡に必要な情報だけをお送りください。</p></div><aside data-company-reveal><p className="company-eyebrow">TELL US ABOUT</p><h3>ご相談の際にあると役立つ情報</h3><ul><li>つくりたいもの、改善したい作業</li><li>現在のやり方や、利用しているツール</li><li>希望する時期と、ご予算の目安</li></ul><p>未定の項目は、そのままで構いません。</p><Link to="/privacy/" className="company-text-link">個人情報の取り扱い <ArrowUpRight size={16} aria-hidden="true" /></Link></aside></section>
    <section className="company-section company-inquiry-company"><div className="company-section-label"><span>COMPANY</span><span>OTM株式会社</span></div><p>{company.postalCode} {company.address}</p><Link className="company-text-link" to="/about/">会社概要を見る <ArrowUpRight size={16} aria-hidden="true" /></Link><div className="company-support-note"><h2>製品をご利用の方へ</h2><p>ゆっくりまとめプロセッサーの導入・操作については、製品サポートもご確認いただけます。</p><Link to="/contact/">製品サポートへ ↗</Link></div></section>
  </CompanyLayout>
}

export function CompanyPrivacyPage() {
  return <CompanyLayout title="プライバシーポリシー｜OTM株式会社">
    <DocumentHero label="PRIVACY POLICY" title="個人情報の取り扱い。" description="OTM株式会社の会社サイトおよびメールによるお問い合わせにおける個人情報の取り扱いについて。" />
    <article className="company-section company-policy"><p>制定日：2026年10月9日</p>{[
      ['取得する情報', 'メールによるお問い合わせでお寄せいただく氏名、会社名、連絡先、ご相談内容、お送りいただいた資料などを取り扱います。'],
      ['利用目的', 'お問い合わせへの回答、ご相談内容の確認、業務上の連絡、サービスの提供・改善に必要な範囲で利用します。'],
      ['第三者への提供', '法令に基づく場合などを除き、ご本人の同意なく個人情報を第三者へ提供しません。業務に必要な範囲で外部サービスを利用する場合は、その取り扱いを確認します。'],
      ['管理と保管', 'お問い合わせへの対応や業務上必要な範囲で情報を保管し、不要になった情報は適切に削除します。不正なアクセスや漏えいを防ぐための管理に努めます。'],
      ['開示・訂正・削除など', 'ご自身の情報について開示、訂正、利用停止、削除などをご希望の場合は、下記の窓口へご連絡ください。内容とご本人であることを確認したうえで、対応します。'],
      ['外部リンクと製品サービス', '外部リンク先には各サービスの方針が適用されます。ゆっくりまとめプロセッサーの製品・決済に関する取り扱いは、製品サイトのプライバシーポリシーをご確認ください。'],
    ].map(([heading, body], index) => <section key={heading}><h2>{index + 1}. {heading}</h2><p>{body}</p></section>)}<section><h2>お問い合わせ窓口</h2><p>{company.name}<br />{company.postalCode} {company.address}<br /><a href={companyInquiry}>{company.email}</a></p><Link className="company-text-link" to="/legal/privacy/">製品のプライバシーポリシー ↗</Link></section></article>
  </CompanyLayout>
}
