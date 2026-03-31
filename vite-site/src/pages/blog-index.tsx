import { Link } from 'react-router-dom'
import { Section, PageMeta } from '@/components/ui'
import { motion } from 'framer-motion'
import { getAllBlogPosts } from '../lib/blog'
import { Calendar, ArrowRight } from 'lucide-react'
import { siteTitle } from '../data/site-content'

export function BlogIndex() {
  const posts = getAllBlogPosts()

  return (
    <>
      <PageMeta
        title={`SEO最適化ブログ | ${siteTitle}`}
        description="ゆっくり解説や動画編集の自動化ノウハウについて、どこよりも詳しく解説する専門ブログです。最新のYMM4活用法や時短術をお届けします。"
        keywords="ブログ,ゆっくり解説,動画編集,YMM4,ツール,時短"
        path="/blog/"
      />
      <main className="page-shell">
        <div className="page-header" style={{ backgroundImage: "url('/bg_abstract_1.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(14,14,14,0.7), #111)' }} />
          <motion.div 
            className="page-header__content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}
          >
            <h1 className="page-title text-glow-gold">オフィシャルブログ</h1>
            <p className="page-lead">
              動画編集の時短ノウハウやYMM4自動化の極意を、出し惜しみなく完全公開します。
            </p>
          </motion.div>
        </div>

        <Section>
          <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {posts.length === 0 ? (
              <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>現在記事はありません。</p>
            ) : (
              posts.map((post, idx) => (
                <motion.article 
                  key={post.meta.slug}
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 20 } }}
                  transition={{ delay: idx * 0.1 }}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  className="blog-card-hover"
                >
                  {post.meta.image && (
                    <div style={{ width: '100%', height: '220px', overflow: 'hidden', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                      <img src={post.meta.image} alt={post.meta.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} />
                    </div>
                  )}
                  <div style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                      <span style={{ fontSize: '0.9rem', color: '#e0c184', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                        <Calendar size={14} />
                        {post.meta.date}
                      </span>
                      {post.meta.tags && post.meta.tags.length > 0 && (
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                          {post.meta.tags.slice(0, 3).map(tag => (
                            <span key={tag} style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)' }}>
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <h2 style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', margin: '0 0 1rem', lineHeight: 1.4 }}>
                      <Link to={`/blog/${post.meta.slug}`} style={{ color: '#fff', textDecoration: 'none' }} className="blog-title-link">
                        {post.meta.title}
                      </Link>
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {post.meta.description}
                    </p>
                    <Link to={`/blog/${post.meta.slug}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#e0c184', textDecoration: 'none', fontWeight: 'bold' }} className="blog-read-more">
                      記事を読む <ArrowRight size={16} />
                    </Link>
                  </div>
                </motion.article>
              ))
            )}
          </div>
        </Section>
      </main>
    </>
  )
}
