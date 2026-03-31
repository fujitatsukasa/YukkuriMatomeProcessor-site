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
        <div style={{ maxWidth: 900, margin: '-3rem auto 0', position: 'relative', zIndex: 10, padding: '0 1.5rem' }}>
          <article className="markdown-body brand-article" style={{ background: 'rgba(14, 12, 18, 0.95)', backdropFilter: 'blur(30px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '3rem clamp(1.5rem, 5vw, 4rem)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', color: 'rgba(255,255,255,0.9)' }}>
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]} 
              rehypePlugins={[rehypeRaw]}
            >
              {content}
            </ReactMarkdown>
          </article>

          {/* Premium CTA Box */}
          <div className="blog-premium-cta" style={{ margin: '4rem 0 2rem', padding: '3rem', background: 'linear-gradient(135deg, rgba(20, 18, 24, 0.8) 0%, rgba(38, 30, 20, 0.9) 100%)', borderRadius: '24px', border: '1px solid rgba(225, 194, 138, 0.3)', textAlign: 'center', boxShadow: '0 30px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top, rgba(225,194,138,0.15), transparent 70%)', pointerEvents: 'none' }} />
            <h3 style={{ margin: '0 0 1rem', fontSize: '1.8rem', color: '#fff', fontWeight: 800, textShadow: '0 0 20px rgba(225,194,138,0.5)' }}>面倒な準備作業から解放されませんか？</h3>
            <p style={{ margin: '0 auto 2rem', color: 'rgba(255,255,255,0.8)', maxWidth: 600, lineHeight: 1.6, fontSize: '1.05rem' }}>
              本ツールの「AI自動化」なら、記事で解説した数時間かかるYMM4の準備を<strong>約95%短縮</strong>できます。<br/>まずは永久無料プランで、驚きのスピードを体験してください。
            </p>
            <div className="home-compact-cta__actions" style={{ justifyContent: 'center' }}>
              <div style={{ transform: 'scale(0.9)', transformOrigin: 'center' }}>
                <Link to="/download/" className="brand-btn" style={{ display: 'inline-flex', padding: '0 2rem' }}>
                  <Download size={20} style={{ marginRight: '8px' }} /> 無料で開始する！
                </Link>
              </div>
            </div>
          </div>
        </div>

      </main>
    </>
  )
}
