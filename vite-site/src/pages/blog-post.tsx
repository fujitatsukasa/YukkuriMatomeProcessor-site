import { useParams, Navigate, Link } from 'react-router-dom'
import { PageMeta } from '@/components/ui'
import { getBlogPostBySlug } from '@/lib/blog'
import { siteTitle } from '@/data/site-content'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { Calendar, User, ArrowLeft, Download } from 'lucide-react'

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = getBlogPostBySlug(slug || '')

  if (!post) {
    return <Navigate to="/blog/" replace />
  }

  const { meta, content } = post

  return (
    <>
      <PageMeta
        title={`${meta.title} | ${siteTitle}`}
        description={meta.description}
        keywords={meta.tags?.join(',')}
        image={meta.image}
        path={`/blog/${meta.slug}/`}
      />
      <main className="page-shell" style={{ paddingBottom: '6rem' }}>
        
        {/* Article Header */}
        <div style={{ padding: '6rem 1.5rem 2rem', background: '#111', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ maxWidth: 840, margin: '0 auto' }}>
            <Link to="/blog/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#e0c184', textDecoration: 'none', marginBottom: '2rem', fontSize: '0.9rem', fontWeight: 600 }}>
              <ArrowLeft size={16} /> ブログ一覧へ戻る
            </Link>

            <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: 1.35, margin: '0 0 1.5rem', color: '#fff', fontWeight: 800 }}>
              {meta.title}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Calendar size={16} color="#e0c184" />
                {meta.date}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <User size={16} />
                {meta.author}
              </span>
              {meta.tags && (
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginLeft: 'auto' }}>
                  {meta.tags.map(tag => (
                    <span key={tag} style={{ padding: '3px 10px', borderRadius: '12px', background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.85)', fontSize: '0.8rem' }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Hero Image */}
        {meta.image && (
          <div style={{ maxWidth: 1000, margin: '2rem auto 0', padding: '0 1.5rem' }}>
            <img src={meta.image} alt={meta.title} style={{ width: '100%', height: 'auto', maxHeight: '500px', objectFit: 'cover', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }} />
          </div>
        )}

        {/* Content Body */}
        <article className="markdown-body" style={{ maxWidth: 840, margin: '3rem auto 0', padding: '0 1.5rem' }}>
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]} 
            rehypePlugins={[rehypeRaw]}
          >
            {content}
          </ReactMarkdown>

          {/* Special CTA Box placed effectively at the end of every post */}
          <div style={{ margin: '4rem 0 2rem', padding: '2rem', background: 'rgba(224, 193, 132, 0.05)', borderRadius: '12px', border: '1px solid rgba(224, 193, 132, 0.2)', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 1rem', fontSize: '1.5rem', color: '#e0c184' }}>面倒な準備作業から解放されませんか？</h3>
            <p style={{ margin: '0 0 1.5rem', color: 'rgba(255,255,255,0.9)' }}>
              本ツールの「AI自動化」なら、記事で解説した数時間かかるYMM4の準備を<strong>約95%短縮</strong>できます。
              まずは永久無料プランで、驚きのスピードを体験してください。
            </p>
            <Link to="/download/" className="brand-btn brand-btn--primary" style={{ display: 'inline-flex' }}>
              <Download size={18} /> 無料でツールを試す
            </Link>
          </div>
        </article>

      </main>
    </>
  )
}
