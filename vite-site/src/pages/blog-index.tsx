import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from '@/lib/light-motion'
import { ArrowRight, BookOpen, Calendar, Clock, FileCheck2, ShieldCheck, Tag as TagIcon } from 'lucide-react'
import { InteractiveCard, PageMeta, Section } from '@/components/ui'
import { downloadUrl, siteTitle } from '@/data/site-content'
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

const blogReadingPaths = [
  {
    title: 'まず作り方の全体像を掴む',
    body: '記事URLやスレッドURLを、台本下地とYMM4前準備へつなげる流れを確認します。',
    href: '/blog/how-to-make-yukkuri-video-automatically/',
    Icon: BookOpen,
  },
  {
    title: 'Windows + YMM4の前提を確認',
    body: 'スマホ編集からPC環境へ移るべきタイミングと、YMM4で扱いやすい工程を整理します。',
    href: '/blog/making-yukkuri-video-on-smartphone/',
    Icon: FileCheck2,
  },
  {
    title: '権利と素材ルールを先に確認',
    body: '音声ライセンス、立ち絵、引用元、再利用コンテンツの考え方を先に押さえます。',
    href: '/blog/yukkuri-copyright-and-voice-rules/',
    Icon: ShieldCheck,
  },
]

const blogDecisionRoutes = [
  {
    label: '導入前提',
    title: 'Windows / YMM4前提を確認する',
    body: 'Mac不可、YMM4前提、無料版で試せる範囲など、導入前の不安はFAQで確認します。',
    href: '/faq/',
  },
  {
    label: '操作確認',
    title: 'URL入力からYMM4前準備まで見る',
    body: '記事で流れを読んだ後は、実際の手順で押す場所、入力するもの、成功状態を確認します。',
    href: '/instructions/',
  },
  {
    label: '実画面',
    title: '画面とBefore/Afterを見る',
    body: 'URL取得、台本整理、YMM4前準備の実画面とサンプルで確認します。',
    href: '/samples/',
  },
  {
    label: '料金確認',
    title: 'Freeで試してPremiumを確認する',
    body: '無料で試し、台本取得とAI台本案の公開条件が合う場合だけPremiumを確認します。',
    href: '/purchase/',
  },
] as const

const blogReaderChecks = [
  '記事は一般論ではなく、YMM4前準備に関係するものから読む',
  'AI出力や収益化は保証ではなく、確認が必要な下書きとして扱う',
  '読んだ後は実画面、使い方、Free動作確認で自分の環境に合うか見る',
] as const

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
        description="ゆっくり解説、反応集、YMM4、台本下地、素材・著作権、YMM4前準備に関する公式ブログ。記事を読んだ後に実画面、使い方、無料版で確認できます。"
        keywords="ブログ,ゆっくり解説,動画編集,YMM4,YMM4前準備,制作手順"
        path="/blog/"
      />

      <main className="brand-shell">
        <section className="editorial-hero">
          <div className="editorial-hero__shell">
            <div className="editorial-hero__copy">
              <p className="brand-kicker">公式ブログ</p>
              <h1>ゆっくり動画制作の手順とYMM4前準備を読む</h1>
              <p className="brand-lead">
                記事URLから台本下地を作る流れ、素材・著作権、YMM4で確認する前工程までを検索とタグで横断できます。
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
                <span>YMM4前準備と制作手順に関係する記事を整理しています。</span>
              </p>
            </div>

            {heroFeaturedPost ? (
              <InteractiveCard className="release-panel premium-glass editorial-hero__panel">
                <span className="subpage-card__eyebrow">{filteredPosts.length > 0 ? 'おすすめ記事' : '最新記事'}</span>
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

        <Section>
          <div className="subpage-section-head">
            <p>読み始める前に</p>
            <h2>読む順番と前提</h2>
          </div>

          <div className="blog-principle-grid">
            {blogReadingPaths.map(({ title, body, href, Icon }) => (
              <InteractiveCard key={title} className="release-panel premium-glass blog-principle-card">
                <Link to={href}>
                  <span className="blog-principle-card__icon">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <strong>{title}</strong>
                  <small>{body}</small>
                  <em>
                    記事を読む
                    <ArrowRight size={14} aria-hidden="true" />
                  </em>
                </Link>
              </InteractiveCard>
            ))}
          </div>

          <div className="blog-editorial-note" role="note">
            収益化や再生数を保証する記事ではありません。AI出力は下書きとして扱い、素材・引用・音声ライセンスを確認する前提で掲載しています。
          </div>

          <InteractiveCard className="release-panel premium-glass blog-reader-gate">
            <div className="blog-reader-gate__copy">
              <span className="subpage-card__eyebrow">読む目的</span>
              <h2>記事を読んだら、実画面と無料版で自分の環境に合うか確認する</h2>
              <p>
                ブログは検索流入用の記事置き場ではなく、導入前に迷いやすい前提を整理する入口です。
                最後は実画面、使い方、Free動作確認で判断してください。
              </p>
              <ul>
                {blogReaderChecks.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="blog-reader-gate__routes" aria-label="ブログ読後に確認するページ">
              {blogDecisionRoutes.map((route) => (
                <Link key={route.href} to={route.href}>
                  <span>{route.label}</span>
                  <strong>{route.title}</strong>
                  <small>{route.body}</small>
                  <ArrowRight size={15} />
                </Link>
              ))}
            </div>

            <div className="blog-reader-gate__actions">
              <Link className="brand-btn brand-btn--primary" to={downloadUrl}>
                Free版を試す
              </Link>
              <Link className="brand-btn brand-btn--ghost" to="/samples/">
                実画面を見る
              </Link>
            </div>
          </InteractiveCard>
        </Section>

        {sidePosts.length ? (
          <Section alt>
            <div className="subpage-section-head">
              <p>おすすめ記事</p>
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
            <p>記事一覧</p>
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
