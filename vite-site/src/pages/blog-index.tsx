import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Calendar, Clock, Tag as TagIcon } from 'lucide-react'
import { InteractiveCard, PageIntro, PageMeta, Section } from '@/components/ui'
import { MetricStrip } from '@/pages/shared'
import { siteTitle } from '@/data/site-content'
import { getAllBlogPosts } from '@/lib/blog'

function formatDate(date: string) {
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(date))
}

function estimateReadMinutes(content: string) {
  const textLength = content.replace(/\s+/g, '').length
  return Math.max(3, Math.ceil(textLength / 900))
}

export function BlogIndex() {
  const allPosts = useMemo(
    () =>
      getAllBlogPosts().map((post) => ({
        ...post,
        readingMinutes: estimateReadMinutes(post.content),
      })),
    [],
  )
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const allTags = useMemo(() => {
    const tags = new Set<string>()
    allPosts.forEach((post) => {
      post.meta.tags?.forEach((tag) => tags.add(tag))
    })
    return Array.from(tags)
  }, [allPosts])

  const filteredPosts = useMemo(() => {
    if (!activeTag) return allPosts
    return allPosts.filter((post) => post.meta.tags?.includes(activeTag))
  }, [activeTag, allPosts])

  const featuredPost = filteredPosts[0] ?? null
  const sidePosts = filteredPosts.slice(1, 4)
  const gridPosts = filteredPosts.slice(1)

  const blogMetrics = [
    {
      value: `${allPosts.length}本`,
      label: '公開記事',
      detail: 'YMM4、運用、反応集、解説、時短ノウハウを継続更新',
    },
    {
      value: `${allTags.length}タグ`,
      label: 'テーマ別で絞り込み',
      detail: '初心者向け記事から実運用寄りの話題まで横断',
    },
    {
      value: '実践寄り',
      label: '机上の話で終わらせない',
      detail: '制作フロー改善や自動化に繋がる内容を優先',
    },
  ] as const

  return (
    <>
      <PageMeta
        title={`オフィシャルブログ | ${siteTitle}`}
        description="ゆっくり解説、反応集、YMM4、制作自動化に関する実践ノウハウをまとめた公式ブログです。"
        keywords="ブログ,ゆっくり解説,動画編集,YMM4,自動化,運用"
        path="/blog/"
      />

      <main className="brand-shell">
        <PageIntro
          kicker="OFFICIAL BLOG"
          title="制作フローを伸ばす実践ノウハウ"
          lead="ゆっくり解説、反応集、YMM4、時短化を中心に、運用へ繋がる記事を公開しています"
          actions={[
            { label: '無料で始める', href: '/download/', variant: 'primary' },
            { label: '機能と使い方', href: '/instructions/', variant: 'ghost' },
          ]}
          flowLinks={[
            { label: '料金を見る', href: '/purchase/' },
            { label: 'お知らせ', href: '/news/' },
          ]}
          media={
            featuredPost ? (
              <InteractiveCard className="page-visual-card premium-glass">
                {featuredPost.meta.image ? (
                  <img className="page-visual-card__image" src={featuredPost.meta.image} alt={featuredPost.meta.title} />
                ) : (
                  <div className="blog-hero-fallback">
                    <TagIcon size={54} />
                  </div>
                )}
                <div className="page-visual-card__meta">
                  <strong>{featuredPost.meta.title}</strong>
                  <span>{featuredPost.meta.description}</span>
                </div>
              </InteractiveCard>
            ) : undefined
          }
        />

        <Section>
          <MetricStrip items={[...blogMetrics]} ariaLabel="ブログ一覧の要点" />
        </Section>

        {featuredPost ? (
          <Section alt>
            <div className="blog-hub">
              <InteractiveCard className="release-panel premium-glass blog-featured">
                <Link to={`/blog/${featuredPost.meta.slug}`} className="blog-featured__media">
                  {featuredPost.meta.image ? (
                    <img src={featuredPost.meta.image} alt={featuredPost.meta.title} />
                  ) : (
                    <div className="blog-hero-fallback">
                      <TagIcon size={54} />
                    </div>
                  )}
                </Link>

                <div className="blog-featured__content">
                  <span className="subpage-card__eyebrow">FEATURED ARTICLE</span>
                  <div className="blog-card__meta">
                    <span>
                      <Calendar size={14} />
                      {formatDate(featuredPost.meta.date)}
                    </span>
                    <span>
                      <Clock size={14} />
                      約{featuredPost.readingMinutes}分
                    </span>
                  </div>
                  <h2>
                    <Link to={`/blog/${featuredPost.meta.slug}`}>{featuredPost.meta.title}</Link>
                  </h2>
                  <p>{featuredPost.meta.description}</p>

                  <div className="blog-card__tags">
                    {featuredPost.meta.tags?.slice(0, 4).map((tag) => (
                      <span key={tag}>#{tag}</span>
                    ))}
                  </div>

                  <Link className="pricing-plan-card__link" to={`/blog/${featuredPost.meta.slug}`}>
                    <span>この記事を読む</span>
                  </Link>
                </div>
              </InteractiveCard>

              <div className="blog-side-list">
                <div className="subpage-section-head">
                  <p>LATEST PICKS</p>
                  <h2>関連する最新記事</h2>
                </div>

                {sidePosts.map((post) => (
                  <InteractiveCard key={post.meta.slug} className="release-panel premium-glass blog-side-link">
                    <Link to={`/blog/${post.meta.slug}`}>
                      <span>{formatDate(post.meta.date)}</span>
                      <strong>{post.meta.title}</strong>
                      <small>{post.meta.description}</small>
                    </Link>
                  </InteractiveCard>
                ))}
              </div>
            </div>
          </Section>
        ) : null}

        <Section className="blog-index-section">
          {allTags.length > 0 ? (
            <div className="blog-tag-filter" role="tablist" aria-label="ブログタグフィルター">
              <button type="button" onClick={() => setActiveTag(null)} className={!activeTag ? 'is-active' : ''}>
                すべて
              </button>
              {allTags.map((tag) => (
                <button key={tag} type="button" onClick={() => setActiveTag(tag)} className={activeTag === tag ? 'is-active' : ''}>
                  #{tag}
                </button>
              ))}
            </div>
          ) : null}

          <div className="blog-grid">
            <AnimatePresence mode="popLayout">
              {gridPosts.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="blog-empty-state"
                >
                  <p>{featuredPost ? 'この条件では注目記事のみ表示しています。' : '該当する記事が見つかりませんでした。'}</p>
                </motion.div>
              ) : (
                gridPosts.map((post, index) => (
                  <motion.article
                    key={post.meta.slug}
                    layout
                    initial={{ opacity: 0, y: 24, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.97 }}
                    transition={{ duration: 0.35, delay: index * 0.03 }}
                  >
                    <InteractiveCard className="brand-card blog-card">
                      <Link to={`/blog/${post.meta.slug}`} className="blog-card__media">
                        {post.meta.image ? (
                          <img src={post.meta.image} alt={post.meta.title} />
                        ) : (
                          <div className="blog-hero-fallback blog-hero-fallback--compact">
                            <TagIcon size={42} />
                          </div>
                        )}
                      </Link>

                      <div className="blog-card__content">
                        <div className="blog-card__meta">
                          <span>
                            <Calendar size={14} />
                            {formatDate(post.meta.date)}
                          </span>
                          <span>
                            <Clock size={14} />
                            約{post.readingMinutes}分
                          </span>
                        </div>

                        <h2>
                          <Link to={`/blog/${post.meta.slug}`}>{post.meta.title}</Link>
                        </h2>
                        <p>{post.meta.description}</p>

                        <div className="blog-card__footer">
                          <div className="blog-card__tags">
                            {post.meta.tags?.slice(0, 3).map((tag) => (
                              <span key={tag}>#{tag}</span>
                            ))}
                          </div>

                          <Link to={`/blog/${post.meta.slug}`} className="blog-card__cta">
                            読む
                            <ArrowRight size={14} />
                          </Link>
                        </div>
                      </div>
                    </InteractiveCard>
                  </motion.article>
                ))
              )}
            </AnimatePresence>
          </div>
        </Section>
      </main>
    </>
  )
}
