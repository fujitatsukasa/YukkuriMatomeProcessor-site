import { Children, isValidElement, type ComponentPropsWithoutRef, type ReactNode, useMemo } from 'react'
import { Navigate, Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ArrowLeft, ArrowRight, BookOpen, Calendar, Clock3, Download, FileText, HelpCircle, User } from 'lucide-react'
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
  const articleVisual = meta ? resolveBlogVisual(meta) : '/product_get_script.webp'
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

  const articleDigestCards = useMemo(
    () => [
      {
        label: '向いている読者',
        title: meta?.tags?.slice(0, 2).join(' / ') || '制作フロー改善',
        body: '単発ノウハウで終わらせず、YMM4 前準備や次の制作手順へ戻したい人向けです。',
      },
      {
        label: 'この記事で掴むこと',
        title: `${Math.max(headings.length, 1)}つの論点`,
        body: headings.length
          ? `${headings[0]} から ${headings[Math.min(headings.length - 1, 2)]} まで順に整理します。`
          : '導入から制作手順までの要点を順番に整理します。',
      },
      {
        label: '読み終えた後',
        title: '実作業へ戻しやすい',
        body: '本文の後半に関連記事を置き、使い方ページとダウンロードへ戻しやすくしています。',
      },
    ],
    [headings, meta?.tags],
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

            <p className="brand-kicker">公式ブログ記事</p>
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

          </div>

          <InteractiveCard className="release-panel premium-glass blog-article-hero__visual">
            <img src={articleVisual} alt={meta.title} className="blog-article-hero__image" />

            <div className="blog-article-hero__visual-copy">
              <span className="subpage-card__eyebrow">要点</span>
              <h2>先に押さえる論点</h2>
              <p>結論を先に確認してから、必要な章だけ本文で拾える構成です。</p>
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
                <span className="subpage-card__eyebrow">目次</span>
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
              <span className="subpage-card__eyebrow">読み方ガイド</span>
              <h2>必要な章だけ拾って読める構成です</h2>
              <p>
                まず要点を確認し、気になる節だけ目次から開き、実作業に戻す段階で使い方ページと照らし合わせる流れを想定しています。
              </p>
              <ul className="brand-list blog-article-rail__list">
                <li>最初に要点を見て、本文で掘る章を決める</li>
                <li>手順確認が必要になったら目次から該当節へ飛ぶ</li>
                <li>実際に試す段階で使い方ページへ戻す</li>
              </ul>
              <div className="utility-link-row blog-article-rail__links">
                <Link to="/instructions/">使い方を見る</Link>
                <Link to="/download/">ダウンロード</Link>
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
                  <span>読む順番</span>
                  <strong>要点 → 本文 → 関連記事</strong>
                </div>
              </div>
            </InteractiveCard>

            <InteractiveCard className="release-panel premium-glass blog-article-digest">
              {articleDigestCards.map((card) => (
                <div key={card.label} className="blog-article-digest__card">
                  <span>{card.label}</span>
                  <strong>{card.title}</strong>
                  <p>{card.body}</p>
                </div>
              ))}
            </InteractiveCard>

            <article className="markdown-body brand-article blog-article-prose">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                {content}
              </ReactMarkdown>
            </article>

            <InteractiveCard className="release-panel premium-glass blog-conversion-panel">
              <div>
                <span className="subpage-card__eyebrow">次にやること</span>
                <h2>読んだ内容を、無料プランで実際の制作フローに戻す</h2>
                <p>
                  記事で確認した考え方を、対応サイト取得、台本整理、YMM4前準備の画面で試せます。
                  まずは無料プランで導入相性を確認してください。
                </p>
              </div>
              <div className="blog-conversion-panel__actions">
                <Link className="brand-btn brand-btn--primary" to="/download/">
                  <Download size={18} />
                  無料でダウンロード
                </Link>
                <Link className="brand-btn brand-btn--ghost" to="/instructions/">
                  <BookOpen size={18} />
                  使い方を見る
                </Link>
                <Link className="brand-btn brand-btn--ghost" to="/faq/">
                  <HelpCircle size={18} />
                  FAQを見る
                </Link>
              </div>
            </InteractiveCard>
          </div>
        </section>

        {relatedPosts.length ? (
          <Section alt className="blog-article-related">
            <div className="subpage-section-head">
              <p>関連記事</p>
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
