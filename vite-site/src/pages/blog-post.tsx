import { useParams, Navigate, Link } from 'react-router-dom'
import { PageMeta } from '@/components/ui'
import { getBlogPostBySlug } from '@/lib/blog'
import { siteTitle } from '@/data/site-content'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { Calendar, User, ArrowLeft, Download, Link as LinkIcon, Share2 } from 'lucide-react'

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = getBlogPostBySlug(slug || '')

  if (!post) {
    return <Navigate to="/blog/" replace />
  }

  const { meta, content } = post

  const shareUrl = encodeURIComponent(`https://yukkurimatomeprocessor.com/blog/${meta.slug}/`)
  const shareTitle = encodeURIComponent(`${meta.title} | ${siteTitle}`)
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://yukkurimatomeprocessor.com/blog/${meta.slug}/`)
    alert('記事のURLをコピーしました！SNSでのシェア大歓迎です！')
  }

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
          {/* SNS Share Buttons */}
          <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', fontWeight: 600 }}>
              <Share2 size={16} /> この記事をシェアして応援する
            </span>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <a 
                href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: '#1DA1F2', color: '#fff', textDecoration: 'none', borderRadius: '30px', fontWeight: 600, fontSize: '0.9rem', transition: 'transform 0.2s' }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.004 4.076H5.036z" />
                </svg> X (Twitter)
              </a>
              <a 
                href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: '#1877F2', color: '#fff', textDecoration: 'none', borderRadius: '30px', fontWeight: 600, fontSize: '0.9rem', transition: 'transform 0.2s' }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
                </svg> Facebook
              </a>
              <button 
                onClick={handleCopyLink}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '30px', fontWeight: 600, fontSize: '0.9rem', transition: 'all 0.2s' }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.background = 'rgba(255,255,255,0.15)' }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
              >
                <LinkIcon size={18} /> リンクをコピー
              </button>
            </div>
          </div>

        </article>

      </main>
    </>
  )
}
