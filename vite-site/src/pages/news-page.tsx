import { Link } from 'react-router-dom'
import { InteractiveCard, PageMeta, Section } from '@/components/ui'
import { newsPosts } from '@/data/site-content'
import { NewsTimelineCard } from '@/pages/shared'

const sortedNews = [...newsPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
const latestNews = sortedNews[0]
const secondaryNews = sortedNews.slice(1, 3)

export function NewsPage() {
  return (
    <>
      <PageMeta
        title="お知らせ"
        description="台本取得・整形・YMM4連携準備など、ゆっくりまとめプロセッサー本体の機能更新と運用告知を確認できます。"
        keywords="お知らせ, 更新情報, リリース, サポート"
        path="/news/"
      />

      <main className="brand-shell">
        <section className="utility-hero utility-hero--news">
          <div className="utility-hero__shell">
            <div className="utility-hero__copy">
              <p className="brand-kicker">NEWSROOM</p>
              <h1>直近の変更を、最短で把握する</h1>
              <p className="brand-lead">
                ここでは告知を並べるだけでなく、自分に関係ある変更かどうかを判断しやすい順番でまとめています。最新告知、関連ページ、時系列の3段で辿れます。
              </p>

              <div className="utility-stat-grid">
                <div className="utility-stat">
                  <strong>{sortedNews.length}本</strong>
                  <span>公開中のお知らせ</span>
                </div>
                <div className="utility-stat">
                  <strong>{latestNews?.dateLabel ?? '--'}</strong>
                  <span>最新更新日</span>
                </div>
              </div>

              <div className="utility-link-row">
                <Link to="/update/">アップデート履歴</Link>
                <Link to="/instructions/">機能と使い方</Link>
                <Link to="/faq/">FAQ</Link>
                <Link to="/download/">無料でダウンロード</Link>
              </div>
            </div>

            <div className="utility-hero__panel-stack">
              {latestNews ? (
                <InteractiveCard className="release-panel premium-glass utility-hero__panel">
                  <span className="subpage-card__eyebrow">LATEST NOTICE</span>
                  <p className="news-feature__date">{latestNews.dateLabel}</p>
                  <h2>{latestNews.title}</h2>
                  <p>{latestNews.subtitle}</p>
                  <p>{latestNews.summary}</p>
                  <Link className="pricing-plan-card__link" to={latestNews.path}>
                    <span>最新のお知らせを見る</span>
                  </Link>
                </InteractiveCard>
              ) : null}

              {secondaryNews.length ? (
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
              ) : null}
            </div>
          </div>
        </section>

        <Section>
          <div className="content-page news-timeline-shell">
            <div className="subpage-section-head">
              <p>TIMELINE</p>
              <h2>過去のお知らせも時系列で辿る</h2>
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
