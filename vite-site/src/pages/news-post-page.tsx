import { PageMeta } from '@/components/ui'
import { type NewsPost } from '@/data/site-content'
import { ArticleActions } from '@/pages/shared'

export function NewsPostPage({ post }: { post: NewsPost }) {
  return (
    <>
      <PageMeta
        title={post.title}
        description={post.seoDescription}
        image={post.seoImage}
        path={post.path}
        type="article"
        publishedTime={post.date}
      />
      <article className="brand-article">
        <header className="brand-article__header brand-shell">
          <p className="brand-kicker">お知らせ</p>
          <h1>{post.title}</h1>
          <p className="brand-article__meta">
            <time dateTime={post.date}>{post.dateLabel}</time>
            <span>OTM株式会社</span>
          </p>
          <figure className="brand-panorama" style={{ marginTop: 14 }}>
            <img src={post.seoImage} alt={post.heroImageAlt} />
          </figure>
        </header>
        <div className="brand-article__body brand-shell">
          {post.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <aside className="brand-article__cta brand-shell">
          <h2>次のアクション</h2>
          <p>導入判断を進める場合は、無料トライアルとお問い合わせをご利用ください。</p>
          <ArticleActions />
        </aside>
      </article>
    </>
  )
}
