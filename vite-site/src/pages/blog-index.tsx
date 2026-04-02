import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Section, PageMeta, PageIntro, InteractiveCard } from '@/components/ui'
import { motion, AnimatePresence } from 'framer-motion'
import { getAllBlogPosts } from '../lib/blog'
import { Calendar, ArrowRight, Tag as TagIcon, Clock } from 'lucide-react'
import { siteTitle } from '../data/site-content'

export function BlogIndex() {
  const allPosts = getAllBlogPosts()
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const allTags = useMemo(() => {
    const tags = new Set<string>()
    allPosts.forEach(post => {
      if (post.meta.tags) {
        post.meta.tags.forEach(t => tags.add(t))
      }
    })
    return Array.from(tags)
  }, [allPosts])

  const posts = useMemo(() => {
    if (!activeTag) return allPosts
    return allPosts.filter(p => p.meta.tags?.includes(activeTag))
  }, [allPosts, activeTag])

  return (
    <>
      <PageMeta
        title={`オフィシャルブログ | ${siteTitle}`}
        description="ゆっくり解説や動画編集の自動化ノウハウについて、どこよりも詳しく解説する専門ブログです。最新のYMM4活用法や時短術をお届けします。"
        keywords="ブログ,ゆっくり解説,動画編集,YMM4,ツール,時短"
        path="/blog/"
      />
      
      <main className="brand-shell">
        <PageIntro
          kicker="OFFICIAL BLOG"
          title="ゆっくり解説＆時短ノウハウ"
          lead="動画編集の時短テクニックやYMM4自動化の実践ノウハウを公開しています"
        />

        <Section className="blog-index-section">
          {/* Tag Filter */}
          {allTags.length > 0 && (
            <div className="blog-tag-filter" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '3rem' }}>
              <button 
                onClick={() => setActiveTag(null)}
                className={`brand-pill ${!activeTag ? 'is-active' : ''}`}
                style={{ cursor: 'pointer', background: !activeTag ? 'rgba(225,194,138,0.2)' : 'rgba(255,255,255,0.06)', borderColor: !activeTag ? 'var(--accent)' : 'var(--border)', color: !activeTag ? '#fff' : 'var(--muted)', fontWeight: !activeTag ? 700 : 500 }}
              >
                すべて
              </button>
              {allTags.map(tag => (
                <button 
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`brand-pill ${activeTag === tag ? 'is-active' : ''}`}
                  style={{ cursor: 'pointer', background: activeTag === tag ? 'rgba(225,194,138,0.2)' : 'rgba(255,255,255,0.06)', borderColor: activeTag === tag ? 'var(--accent)' : 'var(--border)', color: activeTag === tag ? '#fff' : 'var(--muted)', fontWeight: activeTag === tag ? 700 : 500 }}
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}

          <div className="brand-grid brand-grid--3">
            <AnimatePresence mode="popLayout">
              {posts.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', color: 'var(--muted)' }}
                >
                  <p>該当する記事が見つかりませんでした。</p>
                </motion.div>
              ) : (
                posts.map((post, idx) => (
                  <motion.div
                    key={post.meta.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                  >
                    <InteractiveCard className="brand-card blog-card" style={{ padding: 0, height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                      <Link to={`/blog/${post.meta.slug}`} style={{ display: 'block', overflow: 'hidden', borderBottom: '1px solid var(--border)', aspectRatio: '16/9' }}>
                        {post.meta.image ? (
                          <img 
                            src={post.meta.image} 
                            alt={post.meta.title} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                          />
                        ) : (
                          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, rgba(20,18,24,1) 0%, rgba(30,28,36,1) 100%)', display: 'grid', placeItems: 'center', color: 'rgba(255,255,255,0.1)', transition: 'transform 0.5s ease' }}>
                            <TagIcon size={48} />
                          </div>
                        )}
                      </Link>
                      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '1rem', fontSize: '0.8rem', color: 'var(--accent)' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Calendar size={14} /> {post.meta.date}
                          </span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--muted)' }}>
                            <Clock size={14} /> 約3分で読める
                          </span>
                        </div>
                        <h2 style={{ fontSize: '1.25rem', margin: '0 0 0.8rem', lineHeight: 1.4 }}>
                          <Link to={`/blog/${post.meta.slug}`} style={{ textDecoration: 'none', color: 'var(--ink)' }}>
                            {post.meta.title}
                          </Link>
                        </h2>
                        <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', flexGrow: 1 }}>
                          {post.meta.description}
                        </p>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                            {post.meta.tags?.slice(0, 2).map(tag => (
                              <span key={tag} style={{ fontSize: '0.7rem', padding: '2px 6px', borderRadius: '4px', background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.7)' }}>
                                #{tag}
                              </span>
                            ))}
                          </div>
                          <Link to={`/blog/${post.meta.slug}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--accent)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>
                            読む <ArrowRight size={14} />
                          </Link>
                        </div>
                      </div>
                    </InteractiveCard>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </Section>
      </main>
    </>
  )
}
