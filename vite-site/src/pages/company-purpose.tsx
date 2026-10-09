import { Link } from 'react-router-dom'
import { ArrowUpRight, FileText, Network, CheckCheck, PanelsTopLeft } from 'lucide-react'
import { CompanyLayout, CompanyContactBand } from '@/components/company-layout'
import { companyContributions } from '@/data/company'

export function CompanySystemFlow() {
  const steps = [
    { icon: FileText, label: 'INPUT', title: '素材・文書・データ', detail: '入力と参照する情報を整理する。' },
    { icon: Network, label: 'SOFTWARE + AI', title: '整理・検索・作成支援', detail: '目的に合わせて処理を組み合わせる。' },
    { icon: CheckCheck, label: 'HUMAN REVIEW', title: '人が確かめ、決める', detail: '内容・出典・権利を確認する。' },
    { icon: PanelsTopLeft, label: 'OUTPUT', title: '日々使える道具へ', detail: '画面・ファイル・既存ツールへつなぐ。' },
  ]
  return <div className="purpose-system-flow" aria-label="入力情報、AIとソフトウェアによる処理、人による確認、使える出力という設計方針" data-company-reveal>{steps.map((step, index) => <div key={step.label} className="purpose-system-step"><div className="purpose-system-index"><span>0{index + 1}</span><step.icon size={30} strokeWidth={1.25} aria-hidden="true" /></div><span className="purpose-overline">{step.label}</span><h3>{step.title}</h3><p>{step.detail}</p>{index < steps.length - 1 && <ArrowUpRight className="purpose-system-arrow" size={22} aria-hidden="true" />}</div>)}</div>
}

export function CompanyMissionPage() {
  return <CompanyLayout title="目指すもの｜人が考え、つくる時間を増やす｜OTM株式会社" description="OTMが目指すのは、人が考え、つくる時間を増やすこと。クリエイターと小さなチームに向け、制作の前準備や情報を扱う仕事をソフトウェアで支えます。">
    <section className="company-document-hero purpose-document-hero"><nav className="company-breadcrumb" aria-label="パンくずリスト"><Link to="/">HOME</Link><span>/</span><span>MISSION</span></nav><p className="company-eyebrow" data-intro>WHY WE BUILD</p><h1 data-intro>人が考え、つくる<br /><em>時間を増やす。</em></h1><p className="company-document-description" data-intro>道具を使うために、仕事を複雑にしない。<br />面倒な作業の間をつなぎ、人の判断と創造を支える。<br />それが、私たちのソフトウェア開発の出発点です。</p></section>
    <figure className="purpose-document-photo"><img src="/company/creative-work.webp" alt="制作の準備から創作へ進むことを表現したストーリーボードのコンセプトビジュアル" width={1672} height={941} /><figcaption>MORE ROOM TO CREATE / VISUAL CONCEPT</figcaption></figure>
    <section className="company-section purpose-vision"><div className="company-section-label"><span>OUR VISION</span><span>届けたい価値</span></div><div className="purpose-vision-grid"><h2 data-company-reveal>小さなチームにも、<br /><em>使えるソフトウェアを。</em></h2><div data-company-reveal><p>毎日の情報整理や制作の前準備には、道具同士を行き来する手間があります。必要な機能を一つの流れにすることで、同じことを何度も入力したり、素材を探し直したりする負担を減らしたいと考えています。</p><p>専用ツール、Webアプリ、AIの作成支援。規模の大きさよりも、実際に使えることを大切にします。一人のクリエイターにも、小さな開発・業務チームにも、目的に合う道具をつくる。それが私たちの目指す方向です。</p></div></div></section>
    <section className="company-section purpose-impact"><div className="company-section-label"><span>WHO WE BUILD FOR</span><span>貢献する領域</span></div><div className="purpose-impact-list">{companyContributions.map((item) => <article className="purpose-impact-row" key={item.number} data-company-reveal><div className="purpose-impact-index">{item.number}<span>{item.label}</span></div><div><span className="purpose-case-kind">{item.kind}</span><h2>{item.title}</h2><p>{item.text}</p></div><div className="purpose-impact-example"><p>{item.example}</p><Link className="company-text-link" to={item.href}>{item.link}<ArrowUpRight size={17} /></Link></div></article>)}</div></section>
    <section className="company-section purpose-values"><div className="company-section-label"><span>OUR PRINCIPLES</span><span>つくるときに守ること</span></div><div className="purpose-value-grid">{[
      ['01', '人の判断を残す。', 'AIの出力は、そのまま完成品にしない。確認・編集・判断の工程を、利用者の手元に残す設計を考えます。'],
      ['02', '一つの作業から始める。', '何を減らしたいか、何を使いやすくしたいかを具体的にする。小さく試し、役に立つことを確かめてから広げます。'],
      ['03', '使い続けられる形にする。', '画面、データ、導入方法、更新と運用まで考える。使う人の流れに合わせて、ソフトウェアを改善します。'],
    ].map(([number, title, body]) => <article key={number} data-company-reveal><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}</div></section>
    <section className="company-section purpose-english" lang="en"><span className="purpose-overline">OTM / MISSION &amp; PRODUCT</span><h2>More time to think.<br /><i>More room to create.</i></h2><p>OTM Corporation develops software for creative work and everyday operations. We build web and Windows applications, integrate data and external tools, and design AI-assisted workflows that retain human review. Our current in-house product, Yukkuri Matome Processor, helps creators gather materials, prepare scripts, and organize data before final editing in YMM4. We aim to make practical software accessible to individual creators and small teams.</p><Link className="company-text-link" to="/portfolio/ymp/">Explore our software product <ArrowUpRight size={17} /></Link></section>
    <CompanyContactBand />
  </CompanyLayout>
}

export function CompanyTechnologyPage() {
  return <CompanyLayout title="AIと技術｜AIを使えるソフトウェアへ｜OTM株式会社" description="AIの検索・要約・作成支援を、Web・Windowsアプリと業務の流れへ接続するOTMの開発方針。入力情報の整理、人による確認、外部API連携を含めて設計します。">
    <section className="company-document-hero purpose-document-hero"><nav className="company-breadcrumb" aria-label="パンくずリスト"><Link to="/">HOME</Link><span>/</span><span>AI &amp; TECHNOLOGY</span></nav><p className="company-eyebrow" data-intro>AI, CONNECTED TO REAL WORK.</p><h1 data-intro>AIを、<br /><em>使える道具へ。</em></h1><p className="company-document-description" data-intro>AIを呼び出すだけでは、仕事はつながらない。<br />入力、参照情報、出力の形、利用者の確認まで。<br />日々の作業に組み込めるソフトウェアとして設計します。</p></section>
    <section className="company-section purpose-architecture"><div className="company-section-label"><span>THE SYSTEM WE DESIGN</span><span>AIを組み込むときの設計方針</span></div><h2 data-company-reveal>入力から、<br /><em>使われるところまで。</em></h2><CompanySystemFlow /><p className="purpose-architecture-note">用途に応じて必要な工程を選び、出力の品質・扱う情報・外部サービスとの接続を検証します。この図は開発の考え方を示すもので、特定の納入システムの画面ではありません。</p></section>
    <section className="purpose-build-banner"><figure><img src="/company/connected-work.webp" alt="情報と処理を一つのワークフローにまとめることを表現したコンセプトビジュアル" width={1536} height={1024} loading="lazy" /><figcaption>CONNECTED WORK / VISUAL CONCEPT</figcaption></figure><div data-company-reveal><span className="purpose-overline">WHAT WE CONNECT</span><h2>モデルと、<br />画面と、<br /><em>仕事の流れ。</em></h2><p>生成AI、文書検索、データ処理、外部API。<br />目的に合う構成を選び、WebやWindowsの画面から使える形へつなぎます。</p></div></section>
    <section className="company-section purpose-tech-topics"><div className="company-section-label"><span>DEVELOPMENT THEMES</span><span>相談できるAI活用・開発テーマ</span></div><div className="purpose-topic-grid">{[
      ['01', '文章・制作の作成支援', '素材や参照情報をもとに、要約・台本案・文章の下地を作る。出力を編集・確認できる工程と一緒に設計します。', '生成AI / 構造化出力 / 編集・確認'],
      ['02', '文書検索・ナレッジ活用', '必要な情報を検索し、参照元に戻れる形で整理する。文書の更新、検索の品質、扱う情報の範囲まで考えます。', 'RAG / 文書検索 / 参照情報'],
      ['03', 'データ処理・外部サービス連携', '転記や整形などの繰り返しを、APIやスクリプトでつなぐ。既存のツールを活かし、一つの作業から自動化を検討します。', 'Python / GAS / 外部API'],
      ['04', '使いやすいアプリケーション', 'AI機能を操作できる画面、データの保存や出力、導入方法を組み合わせる。WebとWindowsの技術で、日々使える道具をつくります。', 'React / TypeScript / Windows'],
    ].map(([number, title, description, tags]) => <article key={number} data-company-reveal><span className="purpose-topic-number">{number}</span><h3>{title}</h3><p>{description}</p><small>{tags}</small></article>)}</div><p className="purpose-architecture-note">生成AIを使う構成では、Claude・OpenAI・GeminiなどのAPIやDifyを用途に応じて検討します。モデルの品質、費用、データの取り扱い、運用条件を比較して設計します。上記は開発テーマと設計方針の紹介です。</p></section>
    <section className="company-section purpose-product-proof"><span className="purpose-overline">CURRENT IN-HOUSE PRODUCT</span><div><h2 data-company-reveal>制作の前準備を、<br /><em>一つのワークフローへ。</em></h2><p>ゆっくりまとめプロセッサーは、素材の取得、台本案の作成支援、編集用データの整理をつなぐWindows向けの自社製品です。動画の最終編集はYMM4で行い、内容や素材の権利は利用者が確認します。</p><Link className="company-button company-button--light" to="/portfolio/ymp/">公開している製品の開発事例 <ArrowUpRight size={18} /></Link></div></section>
    <CompanyContactBand />
  </CompanyLayout>
}
