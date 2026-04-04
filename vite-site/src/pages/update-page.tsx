import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { PageIntro, PageMeta, Section } from '@/components/ui'
import { media } from '@/data/assets'
import { changeLogUrl, latestReleaseUrl, releasesUrl, tagsUrl, downloadUrl } from '@/data/site-content'

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
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

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
        lead="最新版の入手先とリリースノート・変更履歴を集約しています"
      />

      <Section>
        <div className="content-page">
          <div className="content-page__grid-2">
            <div>
              <h2>最新バージョン</h2>
              <p>最新版は以下から直接ダウンロードできます。更新前に現在の設定をバックアップしてください。</p>
              <div className="brand-inline-actions" style={{ marginTop: '1.5rem' }}>
                <a className="brand-btn brand-btn--primary" href={downloadUrl}>最新版をダウンロード</a>
                <a className="brand-btn brand-btn--ghost" href={latestReleaseUrl} target="_blank" rel="noopener noreferrer">リリースノートを確認</a>
              </div>
            </div>
            <div>
              <h2>更新時の確認事項</h2>
              <ul className="brand-list">
                <li>更新前に現在の設定をバックアップ</li>
                <li>作業手順に変更がある場合は<Link to="/instructions/">使い方ページ</Link>を再確認</li>
                <li>問題発生時は<Link to="/faq/">FAQ</Link>と<Link to="/contact/">お問い合わせ窓口</Link>を利用</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section alt>
        <div className="content-page">
          <h2>リリース一覧</h2>

          {loading && (
            <p style={{ color: 'rgba(255,255,255,0.5)' }}>リリース情報を取得中...</p>
          )}

          {error && (
            <div>
              <p style={{ color: 'rgba(255,255,255,0.5)' }}>リリース情報の取得に失敗しました。</p>
              <div className="content-page__link-list" style={{ marginTop: '1rem' }}>
                <a href={releasesUrl} target="_blank" rel="noopener noreferrer">GitHub Releases で確認 →</a>
                <a href={changeLogUrl} target="_blank" rel="noopener noreferrer">CHANGELOG で確認 →</a>
              </div>
            </div>
          )}

          {!loading && !error && releases.length > 0 && (
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
                    {lines.length > 0 && (
                      <ul className="release-timeline__changes">
                        {lines.map((line, i) => (
                          <li key={i}>{line}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          <div style={{ marginTop: '2rem' }}>
            <div className="content-page__link-list">
              <a href={changeLogUrl} target="_blank" rel="noopener noreferrer">CHANGELOG を確認 →</a>
              <a href={releasesUrl} target="_blank" rel="noopener noreferrer">全リリース一覧 →</a>
              <a href={tagsUrl} target="_blank" rel="noopener noreferrer">タグ一覧 →</a>
            </div>
          </div>
        </div>
      </Section>
      </main>
    </>
  )
}
