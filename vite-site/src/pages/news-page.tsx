import { Link } from 'react-router-dom'
import { InteractiveCard, PageMeta, Section } from '@/components/ui'
import { newsPosts } from '@/data/site-content'
import { NewsTimelineCard } from '@/pages/shared'
import { ArrowRight, BadgeCheck, Download, FileText, Monitor, RefreshCw } from 'lucide-react'

const sortedNews = [...newsPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
const latestNews = sortedNews[0]
const secondaryNews = sortedNews.slice(1, 3)

const newsActionRoutes = [
  {
    label: '更新確認',
    title: '最新版と更新前チェックを見る',
    body: '配布ファイル、SHA256、更新後に少数URLで確認する流れを見ます。',
    href: '/update/',
    Icon: RefreshCw,
  },
  {
    label: '導入',
    title: '配布条件を確認してFree版を試す',
    body: '配布条件、ファイル情報、初回起動の確認へ進みます。',
    href: '/download/',
    Icon: Download,
  },
  {
    label: '手順',
    title: '使い方で成功状態を見る',
    body: 'URL入力、台本整理、CSV/.ymmp前準備、YMM4確認の順に確認します。',
    href: '/instructions/',
    Icon: FileText,
  },
  {
    label: '実画面',
    title: '画面とサンプルで確認する',
    body: '実アプリ画面とBefore/Afterで変更後の流れを確認します。',
    href: '/samples/',
    Icon: Monitor,
  },
] as const

const newsCompletionChecks = [
  '最新のお知らせで自分に関係ある変更を確認した',
  '必要ならアップデート履歴で配布物と注意点を確認した',
  '使い方またはサンプルで変更後の画面を確認した',
  '迷う場合はFAQまたは問い合わせで状況を確認した',
] as const

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
              <p className="brand-kicker">お知らせ</p>
              <h1>直近の変更を、最短で把握する</h1>
              <p className="brand-lead">
                ここでは告知を並べるだけでなく、自分に関係ある変更かどうかを確認しやすい順番でまとめています。最新告知、関連ページ、時系列の3段で辿れます。
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
                <Link to="/instructions/">使い方</Link>
                <Link to="/samples/">実画面・サンプル</Link>
                <Link to="/faq/">FAQ</Link>
                <Link to="/download/">Free版を試す</Link>
              </div>
            </div>

            <div className="utility-hero__panel-stack">
              {latestNews ? (
                <InteractiveCard className="release-panel premium-glass utility-hero__panel">
                  <span className="subpage-card__eyebrow">最新のお知らせ</span>
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
          <div className="news-action-board">
            <div className="subpage-section-head news-action-head">
              <p>今すぐ見る順番</p>
              <h2>お知らせを読んだら、更新・導入・実画面確認へ進む</h2>
              <p>
                告知を読んで終わらせず、最新版、配布物、使い方、実画面の順に確認すると、
                自分に関係ある変更か判断しやすくなります。
              </p>
            </div>

            <div className="news-action-grid" aria-label="お知らせ後に確認するページ">
              {newsActionRoutes.map((route) => {
                const ActionIcon = route.Icon
                return (
                  <InteractiveCard key={route.href} className="release-panel premium-glass news-action-card">
                    <span className="news-action-card__icon" aria-hidden="true">
                      <ActionIcon size={19} />
                    </span>
                    <span className="subpage-card__eyebrow">{route.label}</span>
                    <h3>{route.title}</h3>
                    <p>{route.body}</p>
                    <Link to={route.href}>
                      <span>確認する</span>
                      <ArrowRight size={15} />
                    </Link>
                  </InteractiveCard>
                )
              })}
            </div>

            <InteractiveCard className="release-panel premium-glass news-completion-panel">
              <div>
                <span className="subpage-card__eyebrow">
                  <BadgeCheck size={16} />
                  告知確認の完了判定
                </span>
                <h2>自分に関係ある変更か、次の行動まで決める</h2>
                <p>
                  最新告知、アップデート履歴、実画面、FAQを見て、更新するか、導入するか、問い合わせるかを決めます。
                </p>
              </div>
              <ul className="news-completion-list">
                {newsCompletionChecks.map((item) => (
                  <li key={item}>
                    <BadgeCheck size={16} />
                    {item}
                  </li>
                ))}
              </ul>
            </InteractiveCard>
          </div>
        </Section>

        <Section>
          <div className="content-page news-timeline-shell">
            <div className="subpage-section-head">
              <p>時系列</p>
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
