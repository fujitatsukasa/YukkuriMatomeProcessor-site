import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Calendar, Clock, Tag as TagIcon } from 'lucide-react'
import { InteractiveCard, PageMeta, Section } from '@/components/ui'
import { siteTitle } from '@/data/site-content'
import { getAllBlogPosts, resolveBlogVisual } from '@/lib/blog'

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
  const [searchTerm, setSearchTerm] = useState('')

  const tagCounts = useMemo(() => {
    const tags = new Map<string, number>()
    allPosts.forEach((post) => {
      post.meta.tags?.forEach((tag) => tags.set(tag, (tags.get(tag) ?? 0) + 1))
    })
    return tags
  }, [allPosts])

  const allTags = useMemo(() => {
    return Array.from(tagCounts.entries())
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'ja'))
      .map(([tag]) => tag)
  }, [tagCounts])

  const filteredPosts = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase()

    return allPosts.filter((post) => {
      const matchesTag = !activeTag || post.meta.tags?.includes(activeTag)
      if (!matchesTag) {
        return false
      }

      if (!keyword) {
        return true
      }

      const haystack = [post.meta.title, post.meta.description, ...(post.meta.tags ?? [])]
        .join(' ')
        .toLowerCase()

      return haystack.includes(keyword)
    })
  }, [activeTag, allPosts, searchTerm])

  const heroFeaturedPost = filteredPosts[0] ?? allPosts[0] ?? null
  const sidePosts = (filteredPosts.length > 0 ? filteredPosts.slice(1, 4) : allPosts.slice(1, 4))
  const gridPosts = filteredPosts.length > 0 ? filteredPosts.slice(1) : []

  return (
    <>
      <PageMeta
        title={`オフィシャルブログ | ${siteTitle}`}
        description="ゆっくり解説、反応集、YMM4、制作自動化に関する実践ノウハウをまとめた公式ブログです。"
        keywords="ブログ,ゆっくり解説,動画編集,YMM4,自動化,運用"
        path="/blog/"
      />

      <main className="brand-shell">
        <section className="editorial-hero">
          <div className="editorial-hero__shell">
            <div className="editorial-hero__copy">
              <p className="brand-kicker">OFFICIAL BLOG</p>
              <h1>制作フローを伸ばす記事だけを並べる</h1>
              <p className="brand-lead">
                ここでは製品の宣伝よりも、運用へ戻せる知見を優先しています。YMM4、台本、素材、著作権、運用改善までを検索とタグで横断できます。
              </p>

              <label className="utility-search blog-index-search">
                <span>探したいテーマから入る</span>
                <input
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="YMM4、台本、素材、著作権、反応集などで検索"
                  aria-label="記事検索"
                />
              </label>

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

              <p className="editorial-hero__meta">
                {searchTerm || activeTag ? '絞り込み結果' : '公開中の記事'} <strong>{filteredPosts.length}</strong> 本
                <span>運用に戻せる記事だけを残しています。</span>
              </p>
            </div>

            {heroFeaturedPost ? (
              <InteractiveCard className="release-panel premium-glass editorial-hero__panel">
                <span className="subpage-card__eyebrow">{filteredPosts.length > 0 ? 'EDITOR’S PICK' : 'LATEST ARTICLE'}</span>
                <Link to={`/blog/${heroFeaturedPost.meta.slug}`} className="editorial-hero__panel-media">
                  <img src={resolveBlogVisual(heroFeaturedPost.meta)} alt={heroFeaturedPost.meta.title} />
                </Link>
                <div className="blog-card__meta">
                  <span>
                    <Calendar size={14} />
                    {formatDate(heroFeaturedPost.meta.date)}
                  </span>
                  <span>
                    <Clock size={14} />
                    約{heroFeaturedPost.readingMinutes}分
                  </span>
                </div>
                <h2>
                  <Link to={`/blog/${heroFeaturedPost.meta.slug}`}>{heroFeaturedPost.meta.title}</Link>
                </h2>
                <p>{heroFeaturedPost.meta.description}</p>
                <div className="blog-card__tags">
                  {heroFeaturedPost.meta.tags?.slice(0, 4).map((tag) => (
                    <span key={tag}>#{tag}</span>
                  ))}
                </div>
                <Link className="pricing-plan-card__link" to={`/blog/${heroFeaturedPost.meta.slug}`}>
                  <span>この記事を読む</span>
                </Link>
              </InteractiveCard>
            ) : null}
          </div>
        </section>

        {sidePosts.length ? (
          <Section alt>
            <div className="subpage-section-head">
              <p>LATEST PICKS</p>
              <h2>今読むべき記事</h2>
            </div>

            <div className="blog-side-list blog-side-list--compact">
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
          </Section>
        ) : null}

        <Section className="blog-index-section">
          <div className="subpage-section-head">
            <p>ARTICLE LIBRARY</p>
            <h2>テーマ別に記事を探す</h2>
          </div>

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
                  <p>
                    {filteredPosts.length > 0
                      ? '表示中の記事はヒーローの1本のみです。'
                      : 'この条件に一致する記事はまだ見つかりませんでした。'}
                  </p>
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
                          <img src={resolveBlogVisual(post.meta)} alt={post.meta.title} />
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
