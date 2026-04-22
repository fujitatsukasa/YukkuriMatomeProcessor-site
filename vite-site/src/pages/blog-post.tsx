import { Children, isValidElement, type ComponentPropsWithoutRef, type ReactNode, useMemo } from 'react'
import { Navigate, Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { ArrowLeft, ArrowRight, Calendar, Clock3, Download, FileText, User } from 'lucide-react'
import { InteractiveCard, PageMeta, Section } from '@/components/ui'
import { getAllBlogPosts, getBlogPostBySlug, resolveBlogVisual } from '@/lib/blog'
import { siteTitle } from '@/data/site-content'

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

function stripMarkdownSyntax(value: string) {
  return value
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`>#]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function createHeadingId(value: string) {
  const normalized = stripMarkdownSyntax(value)
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .trim()
    .replace(/\s+/g, '-')

  return normalized || 'section'
}

function extractHeadings(content: string) {
  return Array.from(content.matchAll(/^##\s+(.+)$/gm))
    .map(([, heading]) => stripMarkdownSyntax(heading))
    .filter(Boolean)
}

function extractTextContent(node: ReactNode): string {
  return Children.toArray(node)
    .map((child) => {
      if (typeof child === 'string' || typeof child === 'number') {
        return String(child)
      }

      if (isValidElement(child)) {
        return extractTextContent((child.props as { children?: ReactNode }).children)
      }

      return ''
    })
    .join('')
}

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const allPosts = useMemo(() => getAllBlogPosts(), [])
  const post = useMemo(() => getBlogPostBySlug(slug || ''), [slug])
  const meta = post?.meta
  const content = post?.content ?? ''
  const articleVisual = meta ? resolveBlogVisual(meta) : '/generated/template-ops-studio-v1.png'
  const readingMinutes = useMemo(() => estimateReadMinutes(content), [content])
  const headings = useMemo(() => extractHeadings(content), [content])
  const articlePoints = useMemo(
    () =>
      (headings.length
        ? headings.slice(0, 4)
        : ['記事全体の流れ', '詰まりやすいポイント', '制作フローへの戻し方']
      ).slice(0, 4),
    [headings],
  )

  const relatedPosts = useMemo(() => {
    const currentTags = new Set(meta?.tags ?? [])

    return allPosts
      .filter((entry) => entry.meta.slug !== meta?.slug)
      .map((entry) => ({
        ...entry,
        sharedTags: (entry.meta.tags ?? []).filter((tag) => currentTags.has(tag)).length,
      }))
      .sort((a, b) => {
        if (b.sharedTags !== a.sharedTags) {
          return b.sharedTags - a.sharedTags
        }

        return new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
      })
      .slice(0, 3)
  }, [allPosts, meta?.slug, meta?.tags])

  const markdownComponents = {
    h2: ({ children, ...props }: ComponentPropsWithoutRef<'h2'>) => {
      const text = extractTextContent(children)
      return (
        <h2 id={createHeadingId(text)} {...props}>
          {children}
        </h2>
      )
    },
    h3: ({ children, ...props }: ComponentPropsWithoutRef<'h3'>) => {
      const text = extractTextContent(children)
      return (
        <h3 id={createHeadingId(text)} {...props}>
          {children}
        </h3>
      )
    },
    a: ({ href, children, ...props }: ComponentPropsWithoutRef<'a'>) => {
      const external = typeof href === 'string' && /^https?:\/\//.test(href)
      return (
        <a
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          {...props}
        >
          {children}
        </a>
      )
    },
    img: ({ src, alt, ...props }: ComponentPropsWithoutRef<'img'>) => (
      <img
        className="blog-article-prose__image"
        src={src}
        alt={alt ?? ''}
        loading="lazy"
        decoding="async"
        {...props}
      />
    ),
    table: ({ children, ...props }: ComponentPropsWithoutRef<'table'>) => (
      <div className="blog-article-prose__table">
        <table {...props}>{children}</table>
      </div>
    ),
    blockquote: ({ children, ...props }: ComponentPropsWithoutRef<'blockquote'>) => (
      <blockquote className="blog-article-prose__quote" {...props}>
        {children}
      </blockquote>
    ),
  }

  if (!post || !meta) {
    return <Navigate to="/blog/" replace />
  }

  return (
    <>
      <PageMeta
        title={`${meta.title} | ${siteTitle}`}
        description={meta.description}
        keywords={meta.tags?.join(',')}
        image={articleVisual}
        path={`/blog/${meta.slug}/`}
        type="article"
        publishedTime={meta.date}
      />

      <main className="brand-shell blog-article-page">
        <section className="blog-article-hero">
          <div className="blog-article-hero__copy">
            <Link to="/blog/" className="blog-article-hero__back">
              <ArrowLeft size={16} />
              ブログ一覧へ戻る
            </Link>

            <p className="brand-kicker">OFFICIAL BLOG ARTICLE</p>
            <h1>{meta.title}</h1>
            <p className="blog-article-hero__lead">{meta.description}</p>

            <div className="blog-article-hero__meta">
              <span>
                <Calendar size={16} />
                {formatDate(meta.date)}
              </span>
              <span>
                <User size={16} />
                {meta.author}
              </span>
              <span>
                <Clock3 size={16} />
                約{readingMinutes}分
              </span>
            </div>

            {meta.tags?.length ? (
              <div className="blog-card__tags blog-article-hero__tags">
                {meta.tags.map((tag) => (
                  <span key={tag}>#{tag}</span>
                ))}
              </div>
            ) : null}

            <div className="brand-inline-actions blog-article-hero__actions">
              <Link className="brand-btn brand-btn--primary" to="/download/">
                <Download size={18} />
                無料で始める
              </Link>
              <Link className="brand-btn brand-btn--ghost" to="/instructions/">
                機能と使い方を見る
              </Link>
            </div>
          </div>

          <InteractiveCard className="release-panel premium-glass blog-article-hero__visual">
            <img src={articleVisual} alt={meta.title} className="blog-article-hero__image" />

            <div className="blog-article-hero__visual-copy">
              <span className="subpage-card__eyebrow">THIS ARTICLE COVERS</span>
              <h2>読む前に押さえたい論点</h2>
              <ul className="blog-article-hero__points">
                {articlePoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </InteractiveCard>
        </section>

        <section className="blog-article-layout">
          <aside className="blog-article-rail">
            {headings.length ? (
              <InteractiveCard className="release-panel premium-glass blog-article-rail-card">
                <span className="subpage-card__eyebrow">CONTENTS</span>
                <h2>目次</h2>
                <ol className="blog-article-outline">
                  {headings.map((heading) => (
                    <li key={heading}>
                      <a href={`#${createHeadingId(heading)}`}>{heading}</a>
                    </li>
                  ))}
                </ol>
              </InteractiveCard>
            ) : null}

            <InteractiveCard className="release-panel premium-glass blog-article-rail-card">
              <span className="subpage-card__eyebrow">WORKFLOW FIT</span>
              <h2>記事の内容を制作フローへ戻す</h2>
              <p>
                単発ノウハウで終わらせず、テンプレート運用、台本整理、YMM4前準備の順に戻すと実運用へ繋げやすくなります。
              </p>
              <ul className="brand-list blog-article-rail__list">
                <li>テンプレートへ戻せる粒度で整える</li>
                <li>AI補助は下書き整理と確認に限定して使う</li>
                <li>YMM4へ渡す前の設定確認を固定する</li>
              </ul>
              <div className="subpage-support-callout__actions">
                <Link className="brand-btn brand-btn--ghost" to="/download/">
                  無料で試す
                </Link>
                <Link className="brand-btn brand-btn--primary" to="/contact/">
                  導入相談を送る
                </Link>
              </div>
            </InteractiveCard>
          </aside>

          <div className="blog-article-content">
            <InteractiveCard className="release-panel premium-glass blog-article-summary">
              <div className="blog-article-summary__item">
                <Clock3 size={18} />
                <div>
                  <span>読了目安</span>
                  <strong>約{readingMinutes}分</strong>
                </div>
              </div>
              <div className="blog-article-summary__item">
                <FileText size={18} />
                <div>
                  <span>章立て</span>
                  <strong>{Math.max(headings.length, 1)}セクション</strong>
                </div>
              </div>
              <div className="blog-article-summary__item">
                <ArrowRight size={18} />
                <div>
                  <span>次の行き先</span>
                  <strong>使い方 / 料金 / ダウンロード</strong>
                </div>
              </div>
            </InteractiveCard>

            <article className="markdown-body brand-article blog-article-prose">
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={markdownComponents}>
                {content}
              </ReactMarkdown>
            </article>
          </div>
        </section>

        {relatedPosts.length ? (
          <Section alt className="blog-article-related">
            <div className="subpage-section-head">
              <p>RELATED ARTICLES</p>
              <h2>次に読むと流れが繋がる記事</h2>
            </div>

            <div className="blog-grid">
              {relatedPosts.map((entry) => (
                <InteractiveCard key={entry.meta.slug} className="brand-card blog-card">
                  <Link to={`/blog/${entry.meta.slug}`} className="blog-card__media">
                    {entry.meta.image ? (
                      <img src={resolveBlogVisual(entry.meta)} alt={entry.meta.title} />
                    ) : (
                      <div className="blog-hero-fallback blog-hero-fallback--compact">
                        <FileText size={42} />
                      </div>
                    )}
                  </Link>

                  <div className="blog-card__content">
                    <div className="blog-card__meta">
                      <span>
                        <Calendar size={14} />
                        {formatDate(entry.meta.date)}
                      </span>
                      <span>
                        <Clock3 size={14} />
                        約{estimateReadMinutes(entry.content)}分
                      </span>
                    </div>

                    <h2>
                      <Link to={`/blog/${entry.meta.slug}`}>{entry.meta.title}</Link>
                    </h2>
                    <p>{entry.meta.description}</p>

                    <div className="blog-card__footer">
                      <div className="blog-card__tags">
                        {entry.meta.tags?.slice(0, 3).map((tag) => (
                          <span key={tag}>#{tag}</span>
                        ))}
                      </div>

                      <Link to={`/blog/${entry.meta.slug}`} className="blog-card__cta">
                        続きを読む
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </InteractiveCard>
              ))}
            </div>
          </Section>
        ) : null}
      </main>
    </>
  )
}
