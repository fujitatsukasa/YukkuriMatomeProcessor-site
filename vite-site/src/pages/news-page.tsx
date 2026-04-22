import { Link } from 'react-router-dom'
import { InteractiveCard, PageIntro, PageMeta, Section } from '@/components/ui'
import { media } from '@/data/assets'
import { newsPosts } from '@/data/site-content'
import { MetricStrip, NewsTimelineCard } from '@/pages/shared'

const sortedNews = [...newsPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
const latestNews = sortedNews[0]
const secondaryNews = sortedNews.slice(1, 3)

const newsMetrics = [
  {
    value: `${sortedNews.length}本`,
    label: '公開済みのお知らせ',
    detail: 'リリース、導線変更、サポート更新を時系列で掲載',
  },
  {
    value: latestNews?.dateLabel ?? '--',
    label: '最新更新日',
    detail: 'サイトと導入導線の変更をここで把握',
  },
  {
    value: '時系列',
    label: '古い情報も追いやすい',
    detail: 'アップデート履歴と併読できる構成',
  },
] as const

export function NewsPage() {
  return (
    <>
      <PageMeta
        title="お知らせ"
        description="台本取得・整形・YMM4連携準備など、ゆっくりまとめプロセッサー本体の機能更新と運用告知を確認できます。"
        keywords="お知らせ, 更新情報, リリース, サポート"
        image={media.goldBokeh}
        path="/news/"
      />

      <main className="brand-shell">
        <PageIntro
          kicker="お知らせ"
          title="最新のお知らせ"
          lead="機能更新や運用に関する告知を、導入判断に必要な粒度でまとめています"
          actions={[
            { label: 'アップデート履歴', href: '/update/', variant: 'primary' },
            { label: '無料で始める', href: '/download/', variant: 'ghost' },
          ]}
          flowLinks={[
            { label: '機能と使い方', href: '/instructions/' },
            { label: 'FAQ', href: '/faq/' },
          ]}
          media={
            latestNews ? (
              <InteractiveCard className="page-visual-card premium-glass">
                <img className="page-visual-card__image" src={latestNews.seoImage} alt={latestNews.heroImageAlt} />
                <div className="page-visual-card__meta">
                  <strong>{latestNews.title}</strong>
                  <span>{latestNews.summary}</span>
                </div>
              </InteractiveCard>
            ) : undefined
          }
        />

        <Section>
          <MetricStrip items={[...newsMetrics]} ariaLabel="お知らせページの要点" />
        </Section>

        {latestNews ? (
          <Section alt>
            <div className="news-hub">
              <InteractiveCard className="release-panel premium-glass news-feature">
                <div className="news-feature__media">
                  <img src={latestNews.seoImage} alt={latestNews.heroImageAlt} />
                </div>

                <div className="news-feature__content">
                  <span className="subpage-card__eyebrow">LATEST NOTICE</span>
                  <p className="news-feature__date">{latestNews.dateLabel}</p>
                  <h2>{latestNews.title}</h2>
                  <p>{latestNews.subtitle}</p>
                  <p>{latestNews.summary}</p>
                  <Link className="pricing-plan-card__link" to={latestNews.path}>
                    <span>最新のお知らせを見る</span>
                  </Link>
                </div>
              </InteractiveCard>

              <div className="news-summary-grid">
                {secondaryNews.map((post) => (
                  <InteractiveCard key={post.path} className="release-panel premium-glass news-summary-card">
                    <span className="subpage-card__eyebrow">{post.dateLabel}</span>
                    <h2>{post.title}</h2>
                    <p>{post.subtitle}</p>
                    <Link className="pricing-plan-card__link" to={post.path}>
                      <span>詳細を見る</span>
                    </Link>
                  </InteractiveCard>
                ))}
              </div>
            </div>
          </Section>
        ) : null}

        <Section>
          <div className="content-page news-timeline-shell">
            <div className="subpage-section-head">
              <p>TIMELINE</p>
              <h2>過去のお知らせも遡って確認できるよう、時系列で整理する</h2>
            </div>

            <ol className="timeline">
              {sortedNews.map((post) => (
                <li key={post.path}>
                  <NewsTimelineCard post={post} />
                </li>
              ))}
            </ol>
          </div>
        </Section>
      </main>
    </>
  )
}
