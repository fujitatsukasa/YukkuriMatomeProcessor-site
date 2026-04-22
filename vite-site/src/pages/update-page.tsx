import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { InteractiveCard, PageMeta, Section } from '@/components/ui'
import { media } from '@/data/assets'
import { changeLogUrl, downloadUrl, latestReleaseUrl, releasesUrl, tagsUrl } from '@/data/site-content'

interface Release {
  id: number
  tag_name: string
  name: string
  published_at: string
  body: string
  html_url: string
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return `${d.getFullYear()}年${String(d.getMonth() + 1).padStart(2, '0')}月${String(d.getDate()).padStart(2, '0')}日`
}

function formatBody(body: string) {
  return body
    .split('\n')
    .filter((line) => line.trim())
    .map((line) => line.replace(/^[-*]\s*/, '').replace(/^#{1,3}\s*/, ''))
    .filter((line) => line.trim())
}

const updateGuideCards = [
  {
    eyebrow: 'BEFORE UPDATE',
    title: '更新前に確認しておくこと',
    body: '保存先、YMM4パス、テンプレートまわりの設定を確認し、必要ならバックアップします。',
    points: ['現在の設定を控える', '運用フォルダのバックアップを取る', '変更点がありそうなら使い方も併読する'],
  },
  {
    eyebrow: 'CHECK NOTES',
    title: '何を見てから更新するか',
    body: '最新版のリリースノート、CHANGELOG、過去タグを先に確認すると、変更点の見落としを減らせます。',
    points: ['最新の変更点を見る', '前バージョンとの差分を把握', '過去タグも遡れる'],
  },
  {
    eyebrow: 'WHEN STUCK',
    title: '困ったときの逃げ先',
    body: 'FAQ、使い方、問い合わせ窓口を先に固定しておくと、更新後の切り分けが速くなります。',
    points: ['FAQを先に確認', '手順変更は使い方で再確認', '解決しなければ問い合わせる'],
  },
] as const

export function UpdatePage() {
  const [releases, setReleases] = useState<Release[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('https://api.github.com/repos/fujitatsukasa/YukkuriMatomeProcessor/releases?per_page=20')
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`)
        return res.json()
      })
      .then((data: Release[]) => {
        setReleases(data)
        setLoading(false)
      })
      .catch((err: Error) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const latestRelease = releases[0] ?? null
  const latestReleaseLines = useMemo(() => formatBody(latestRelease?.body ?? '').slice(0, 4), [latestRelease?.body])

  return (
    <>
      <PageMeta
        title="アップデート履歴"
        description="最新版の1クリックダウンロード、リリースノート、過去バージョン一覧の確認先をまとめたページです。"
        keywords="アップデート, リリースノート, 変更履歴, ダウンロード"
        image={media.abstractGold}
        path="/update/"
      />

      <main className="brand-shell">
        <section className="utility-hero utility-hero--update">
          <div className="utility-hero__shell">
            <div className="utility-hero__copy">
              <p className="brand-kicker">RELEASE HUB</p>
              <h1>最新版へ、迷わず辿る</h1>
              <p className="brand-lead">
                このページでは、最新版の取得、変更点の把握、過去バージョンの確認を一つの導線にまとめています。更新判断に必要な情報を先に置いています。
              </p>

              <div className="utility-stat-grid">
                <div className="utility-stat">
                  <strong>{loading ? '--' : `${releases.length || 20}件`}</strong>
                  <span>GitHub Releases を確認</span>
                </div>
                <div className="utility-stat">
                  <strong>{latestRelease ? formatDate(latestRelease.published_at) : '--'}</strong>
                  <span>最新公開日</span>
                </div>
              </div>

              <div className="utility-link-row">
                <a href={downloadUrl}>最新版をダウンロード</a>
                <a href={latestReleaseUrl} target="_blank" rel="noopener noreferrer">
                  リリースノート
                </a>
                <a href={changeLogUrl} target="_blank" rel="noopener noreferrer">
                  CHANGELOG
                </a>
                <a href={tagsUrl} target="_blank" rel="noopener noreferrer">
                  タグ一覧
                </a>
              </div>
            </div>

            <div className="utility-hero__panel-stack">
              <InteractiveCard className="release-panel premium-glass utility-hero__panel">
                <span className="subpage-card__eyebrow">LATEST RELEASE</span>
                <h2>{latestRelease?.name || latestRelease?.tag_name || '最新リリースを確認中'}</h2>
                <p>{latestRelease ? `${formatDate(latestRelease.published_at)} に公開` : 'GitHub Releases から最新の公開情報を読み込んでいます。'}</p>

                {loading ? <p className="release-monitor__fallback">リリース情報を取得中です...</p> : null}
                {error ? (
                  <p className="release-monitor__fallback">
                    リリース情報の取得に失敗しました。下の公式リンクから GitHub 側の一覧を確認してください。
                  </p>
                ) : null}

                {!loading && !error && latestReleaseLines.length > 0 ? (
                  <ul className="release-monitor__list">
                    {latestReleaseLines.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                ) : null}

                <div className="subpage-support-callout__actions">
                  <a className="brand-btn brand-btn--ghost" href={latestReleaseUrl} target="_blank" rel="noopener noreferrer">
                    リリースノートを見る
                  </a>
                  <a className="brand-btn brand-btn--primary" href={downloadUrl}>
                    最新版を入手
                  </a>
                </div>
              </InteractiveCard>

              <InteractiveCard className="release-panel premium-glass release-link-panel">
                <span className="subpage-card__eyebrow">OFFICIAL LINKS</span>
                <h2>更新判断に必要なリンク</h2>
                <div className="subpage-link-stack">
                  <a href={changeLogUrl} target="_blank" rel="noopener noreferrer">
                    <span>CHANGELOG を確認</span>
                  </a>
                  <a href={releasesUrl} target="_blank" rel="noopener noreferrer">
                    <span>全リリース一覧</span>
                  </a>
                  <a href={tagsUrl} target="_blank" rel="noopener noreferrer">
                    <span>タグ一覧</span>
                  </a>
                </div>
                <p className="release-monitor__fallback">更新で手順が変わる場合は、使い方ページと FAQ も合わせて見直してください。</p>
                <div className="subpage-support-callout__actions">
                  <Link className="brand-btn brand-btn--ghost" to="/instructions/">
                    使い方を見る
                  </Link>
                  <Link className="brand-btn brand-btn--primary" to="/faq/">
                    FAQを見る
                  </Link>
                </div>
              </InteractiveCard>
            </div>
          </div>
        </section>

        <Section alt>
          <div className="subpage-section-head">
            <p>UPDATE FLOW</p>
            <h2>更新前後で迷わないよう、見る順番と逃げ先を固定する</h2>
          </div>

          <div className="subpage-card-grid subpage-card-grid--3">
            {updateGuideCards.map((card) => (
              <InteractiveCard key={card.title} className="release-panel premium-glass subpage-card">
                <span className="subpage-card__eyebrow">{card.eyebrow}</span>
                <h2>{card.title}</h2>
                <p>{card.body}</p>
                <ul className="brand-list subpage-card__list">
                  {card.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </InteractiveCard>
            ))}
          </div>
        </Section>

        <Section>
          <div className="content-page">
            <div className="subpage-section-head">
              <p>RELEASE TIMELINE</p>
              <h2>直近の更新を時系列で追う</h2>
            </div>

            {loading ? <p className="release-monitor__fallback">リリース情報を取得中...</p> : null}

            {error ? (
              <div>
                <p className="release-monitor__fallback">リリース情報の取得に失敗しました。GitHub 上の公式一覧を確認してください。</p>
                <div className="content-page__link-list" style={{ marginTop: '1rem' }}>
                  <a href={releasesUrl} target="_blank" rel="noopener noreferrer">
                    GitHub Releases で確認
                  </a>
                  <a href={changeLogUrl} target="_blank" rel="noopener noreferrer">
                    CHANGELOG で確認
                  </a>
                </div>
              </div>
            ) : null}

            {!loading && !error && releases.length > 0 ? (
              <div className="release-timeline">
                {releases.map((release) => {
                  const lines = formatBody(release.body || '')
                  return (
                    <div key={release.id} className="release-timeline__item">
                      <div className="release-timeline__header">
                        <span className="release-timeline__tag">{release.tag_name}</span>
                        <span className="release-timeline__date">{formatDate(release.published_at)}</span>
                      </div>
                      <h3 className="release-timeline__title">
                        <a href={release.html_url} target="_blank" rel="noopener noreferrer">
                          {release.name || release.tag_name}
                        </a>
                      </h3>
                      {lines.length > 0 ? (
                        <ul className="release-timeline__changes">
                          {lines.map((line) => (
                            <li key={line}>{line}</li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  )
                })}
              </div>
            ) : null}
          </div>
        </Section>
      </main>
    </>
  )
}
