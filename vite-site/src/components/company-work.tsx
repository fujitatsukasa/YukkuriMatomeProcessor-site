import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { companyWorks } from '@/data/company'

export type CompanyWork = (typeof companyWorks)[number]

export function CompanyWorkVisual({ work }: { work: CompanyWork }) {
  if (work.image) return <div className={`company-work-media${work.slug === '3d-study' ? ' company-work-media--sculpture' : ''}`}><img src={work.image} alt={work.imageAlt} width={work.slug === '3d-study' ? 1200 : 1672} height={work.slug === '3d-study' ? 900 : 941} loading="lazy" decoding="async" /></div>
  return <div className="company-work-media company-work-media--software" aria-label="ゆっくりまとめプロセッサーの制作ワークフローを表す図版">
    <span className="company-work-visual-label">YMP / CREATIVE WORKFLOW</span>
    <div className="company-work-symbol" aria-hidden="true">ymp<span>.</span></div>
    <div className="company-work-flow"><span>素材を集める</span><i>→</i><span>台本を整える</span><i>→</i><span>編集へつなぐ</span></div>
    <span className="company-work-visual-caption">Windows software · AI-assisted preparation</span>
  </div>
}

export function CompanyWorkCards() {
  return <div className="company-work-grid">{companyWorks.map((work) => <article className="company-work-card" key={work.slug} data-company-reveal><Link className="company-work-card-link" to={`/portfolio/${work.slug}/`} aria-label={`${work.title}の制作事例を見る`}><CompanyWorkVisual work={work} /><div className="company-work-card-meta"><span>{work.type}</span><ArrowUpRight size={22} aria-hidden="true" /></div><h3>{work.title}</h3><p>{work.subtitle}</p></Link></article>)}</div>
}
