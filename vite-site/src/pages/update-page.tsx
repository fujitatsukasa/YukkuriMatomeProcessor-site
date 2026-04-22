import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { InteractiveCard, PageIntro, PageMeta, Section } from '@/components/ui'
import { media } from '@/data/assets'
import { changeLogUrl, downloadUrl, latestReleaseUrl, releasesUrl, tagsUrl } from '@/data/site-content'
import { MetricStrip } from '@/pages/shared'

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
    title: '更新前にやっておくこと',
    body: '保存先、YMM4パス、テンプレートまわりの設定を確認し、必要ならバックアップします。',
    points: ['現在の設定を控える', '運用フォルダのバックアップを取る', '変更点がありそうなら使い方も併読する'],
  },
  {
    eyebrow: 'CHECK NOTES',
    title: '何を見てから更新するか',
    body: '最新版のリリースノート、CHANGELOG、過去タグを併読すると差分が追いやすくなります。',
    points: ['最新の変更内容', '過去バージョンとの違い', '導線変更があるか'],
  },
  {
    eyebrow: 'WHEN STUCK',
    title: '問題が出たときの逃げ先',
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
  const updateMetrics = [
    {
      value: loading ? '--' : `${releases.length || 20}件`,
      label: 'GitHub Releasesを確認',
      detail: '公開済みリリースを最大20件まで取得',
    },
    {
      value: latestRelease ? formatDate(latestRelease.published_at) : '--',
      label: '最新公開日',
      detail: '最新版の公開タイミングを即確認',
    },
    {
      value: '1CLICK',
      label: '最新版へ到達',
      detail: 'ダウンロード、リリースノート、CHANGELOGを集約',
    },
  ] as const

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
        <PageIntro
          kicker="Release Hub"
          title="アップデート情報"
          lead="最新版の入手先と、リリースノート・変更履歴・差分確認の導線をひとつにまとめています"
          actions={[
            { label: '最新版をダウンロード', href: downloadUrl, variant: 'primary', external: true },
            { label: 'リリースノートを見る', href: latestReleaseUrl, variant: 'ghost', external: true },
          ]}
          flowLinks={[
            { label: '機能と使い方', href: '/instructions/' },
            { label: 'FAQ', href: '/faq/' },
          ]}
          media={
            <InteractiveCard className="page-visual-card premium-glass">
              <img className="page-visual-card__image" src="/generated/template-ops-studio-v1.png" alt="アップデート確認と導入導線を表すビジュアル" />
              <div className="page-visual-card__meta">
                <strong>更新導線を一本化して、迷わず最新版へ進める</strong>
                <span>ダウンロード、リリースノート、CHANGELOG、過去タグをこのページから辿れます。</span>
              </div>
            </InteractiveCard>
          }
        />

        <Section>
          <MetricStrip items={[...updateMetrics]} ariaLabel="アップデートページの要点" />
        </Section>

        <Section alt>
          <div className="subpage-section-head">
            <p>UPDATE FLOW</p>
            <h2>更新前後で迷わないよう、見るべき順番と逃げ先を先に固定する</h2>
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
          <div className="release-hub-grid">
            <InteractiveCard className="release-panel premium-glass release-monitor">
              <span className="subpage-card__eyebrow">LATEST RELEASE</span>
              <h2>{latestRelease?.name || latestRelease?.tag_name || '最新リリースを取得中'}</h2>
              <p>
                {latestRelease ? `${formatDate(latestRelease.published_at)} に公開` : 'GitHub Releases から最新のリリース情報を取得しています。'}
              </p>

              {latestReleaseLines.length > 0 ? (
                <ul className="release-monitor__list">
                  {latestReleaseLines.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              ) : (
                <p className="release-monitor__fallback">詳細な変更内容はリリースノートまたは CHANGELOG を確認してください。</p>
              )}

              <div className="subpage-support-callout__actions">
                <a className="brand-btn brand-btn--ghost" href={latestReleaseUrl} target="_blank" rel="noopener noreferrer">
                  リリースノート
                </a>
                <a className="brand-btn brand-btn--primary" href={downloadUrl}>
                  最新版を入手
                </a>
              </div>
            </InteractiveCard>

            <InteractiveCard className="release-panel premium-glass release-link-panel">
              <span className="subpage-card__eyebrow">OFFICIAL LINKS</span>
              <h2>差分確認の公式リンク</h2>
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
              <p className="release-monitor__fallback">更新で手順が変わる場合は、使い方ページとFAQも合わせて見直してください。</p>
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
        </Section>

        <Section alt>
          <div className="content-page">
            <div className="subpage-section-head">
              <p>RELEASE TIMELINE</p>
              <h2>直近の更新を時系列で追う</h2>
            </div>

            {loading ? <p className="release-monitor__fallback">リリース情報を取得中...</p> : null}

            {error ? (
              <div>
                <p className="release-monitor__fallback">リリース情報の取得に失敗しました。GitHub上の公式情報を確認してください。</p>
                <div className="content-page__link-list" style={{ marginTop: '1rem' }}>
                  <a href={releasesUrl} target="_blank" rel="noopener noreferrer">
                    GitHub Releases で確認 →
                  </a>
                  <a href={changeLogUrl} target="_blank" rel="noopener noreferrer">
                    CHANGELOG で確認 →
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
