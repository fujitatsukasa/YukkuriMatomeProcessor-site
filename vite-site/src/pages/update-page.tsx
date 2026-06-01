import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { InteractiveCard, PageMeta, Section } from '@/components/ui'
import { downloadUrl, publicDistribution } from '@/data/site-content'
import { BadgeCheck, Clock3, Download, ExternalLink, ShieldCheck, Wrench } from 'lucide-react'

interface Release {
  id: number
  tag_name: string
  name: string
  published_at: string
  body: string
  html_url: string
}

interface DistributionReleaseNotes {
  version?: string
  title?: string
  summary?: string
  sections?: Array<{
    title?: string
    items?: string[]
  }>
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return `${d.getFullYear()}年${String(d.getMonth() + 1).padStart(2, '0')}月${String(d.getDate()).padStart(2, '0')}日`
}

function normalizeReleaseLine(line: string) {
  return line
    .replace(/<[^>]*>/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`>]/g, '')
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, '')
    .replace(/^[-#\s]+/, '')
    .replace(/再修正(?:修正)+/g, '修正')
    .replace(/\s+/g, ' ')
    .trim()
}

function isNoiseReleaseLine(line: string) {
  if (!line) return true
  if (/^v?\d+(?:\.\d+){1,3}\s*アップデート内容$/i.test(line)) return true
  if (/^(修正|追加機能|変更点|変更|改善|その他)$/.test(line)) return true
  if (/^image$/i.test(line)) return true
  if (/^https?:\/\//i.test(line)) return true
  return false
}

function formatBody(body: string) {
  return body
    .split('\n')
    .map(normalizeReleaseLine)
    .filter((line) => !isNoiseReleaseLine(line))
}

function getReleaseLabels(body: string) {
  const labels: string[] = []
  if (/追加機能|取得サイトの追加|取得可能/.test(body)) labels.push('対応追加')
  if (/修正|不具合|最適化/.test(body)) labels.push('不具合修正')
  if (/必要|お知らせ|ver2\.0\.0|サービス開始/.test(body)) labels.push('重要なお知らせ')
  return labels.length ? labels : ['更新']
}

function summarizeRelease(release: Release) {
  const lines = formatBody(release.body || '')
  const summary = lines[0] ?? '詳細は公式リリースノートで確認してください。'
  const details = lines.slice(1, 4)
  return {
    summary,
    details,
    allLines: lines,
    labels: getReleaseLabels(release.body || ''),
  }
}

const updateGuideCards = [
  {
    eyebrow: '更新前',
    title: '更新前に確認しておくこと',
    body: '保存先、YMM4パス、CSV/.ymmpの出力先を確認し、必要ならバックアップします。',
    points: ['現在の設定を控える', '保存先フォルダをバックアップする', '手順変更がありそうなら使い方も確認する'],
  },
  {
    eyebrow: '変更点',
    title: '何を見てから更新するか',
    body: '最新版の要約、公式リリースノート、過去タグを先に確認すると、変更点の見落としを減らせます。',
    points: ['最新の変更点を見る', '前バージョンとの差分を把握', '過去タグも遡れる'],
  },
  {
    eyebrow: '困ったとき',
    title: '困ったときの逃げ先',
    body: 'FAQ、使い方、問い合わせ窓口を先に固定しておくと、更新後の切り分けが速くなります。',
    points: ['FAQを先に確認', '手順変更は使い方で再確認', '解決しなければ問い合わせる'],
  },
] as const

const fallbackReleases: Release[] = [
  {
    id: -1,
    tag_name: publicDistribution.version,
    name: `YMP ${publicDistribution.version}`,
    published_at: publicDistribution.publishedAt,
    html_url: publicDistribution.releaseNotesUrl,
    body: publicDistribution.summary,
  },
]

const updateSummaryCards = [
  {
    title: '更新前に設定を控える',
    body: 'YMM4パス、保存先、CSV/.ymmp出力先を先に確認します。',
    Icon: ShieldCheck,
  },
  {
    title: '最新版インストーラーを公式リンクから取得',
    body: '配布元は Cloudflare Workers/R2 の公式URLです。別URLや古いファイルとの取り違えを避けます。',
    Icon: Download,
  },
  {
    title: '変更点は要約から確認',
    body: '公式サイトでは要点だけを表示し、細かい原文は公式リリースで確認できます。',
    Icon: BadgeCheck,
  },
] as const

export function UpdatePage() {
  const [releases, setReleases] = useState<Release[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(publicDistribution.releaseNotesUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`Release notes fetch failed: ${res.status}`)
        return res.json()
      })
      .then((data: DistributionReleaseNotes) => {
        const body = [
          data.summary,
          ...(data.sections ?? []).flatMap((section) => [
            section.title,
            ...(section.items ?? []),
          ]),
        ]
          .filter((line): line is string => Boolean(line))
          .join('\n')

        setReleases([
          {
            id: 1,
            tag_name: data.version || publicDistribution.version,
            name: data.title || `YMP ${publicDistribution.version}`,
            published_at: publicDistribution.publishedAt,
            body: body || publicDistribution.summary,
            html_url: publicDistribution.releaseNotesUrl,
          },
        ])
        setLoading(false)
      })
      .catch((err: Error) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const displayReleases = releases.length ? releases : fallbackReleases
  const latestRelease = displayReleases[0]
  const latestReleaseInfo = useMemo(() => summarizeRelease(latestRelease), [latestRelease])
  const isUsingFallback = !releases.length

  return (
    <>
      <PageMeta
        title="アップデート｜最新版の確認と更新前チェック"
        description="ゆっくりまとめプロセッサーの最新版、公開日、直近変更の要約、更新前に確認する設定を確認できます。"
        keywords="アップデート, 最新版, リリースノート, 変更履歴, ダウンロード"
        path="/update/"
      />

      <main className="brand-shell">
        <section className="utility-hero utility-hero--update">
          <div className="utility-hero__shell">
            <div className="utility-hero__copy">
              <p className="brand-kicker">アップデート</p>
              <h1>最新版の確認と更新前チェック</h1>
              <p className="brand-lead">
                公開中の最新版、直近変更の要約、更新前に見るべき設定を確認できます。Cloudflare配布のファイル名と変更点を、必要な判断材料だけに絞ってまとめています。
              </p>

              <div className="utility-stat-grid">
                <div className="utility-stat">
                  <strong>{latestRelease.tag_name}</strong>
                  <span>{isUsingFallback && loading ? '既知の最新版を表示中' : '公式配布元を確認'}</span>
                </div>
                <div className="utility-stat">
                  <strong>{formatDate(latestRelease.published_at)}</strong>
                  <span>最新公開日</span>
                </div>
              </div>

              <div className="utility-link-row">
                <a href={downloadUrl}>無料でダウンロード</a>
                <a href={publicDistribution.releaseNotesUrl} target="_blank" rel="noopener noreferrer">
                  リリースデータ
                </a>
                <a href={publicDistribution.sha256SumsUrl} target="_blank" rel="noopener noreferrer">
                  SHA256一覧
                </a>
                <a href={publicDistribution.releaseManifestUrl} target="_blank" rel="noopener noreferrer">
                  配布マニフェスト
                </a>
              </div>
            </div>

            <div className="utility-hero__panel-stack">
              <InteractiveCard className="release-panel premium-glass utility-hero__panel">
                <span className="subpage-card__eyebrow">最新リリース要約</span>
                <h2>{latestRelease.name || latestRelease.tag_name}</h2>
                <p>{formatDate(latestRelease.published_at)} に公開</p>

                <div className="release-summary-badges" aria-label="更新種別">
                  {latestReleaseInfo.labels.map((label) => (
                    <span key={label}>{label}</span>
                  ))}
                  {isUsingFallback ? <span>既知情報</span> : null}
                </div>

                <p className="release-latest-summary">{latestReleaseInfo.summary}</p>

                {loading ? <p className="release-monitor__fallback">リリース情報を取得中です...</p> : null}
                {error ? (
                  <p className="release-monitor__fallback">
                    リリース情報の取得に失敗しました。下の公式リンクから配布マニフェストとSHA256一覧を確認してください。
                  </p>
                ) : null}

                {latestReleaseInfo.details.length > 0 ? (
                  <ul className="release-monitor__list">
                    {latestReleaseInfo.details.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                ) : null}

                <div className="subpage-support-callout__actions">
                  <a className="brand-btn brand-btn--ghost" href={publicDistribution.releaseNotesUrl} target="_blank" rel="noopener noreferrer">
                    リリースデータを見る
                  </a>
                  <a className="brand-btn brand-btn--primary" href={downloadUrl}>
                    無料でダウンロード
                  </a>
                </div>
              </InteractiveCard>

              <InteractiveCard className="release-panel premium-glass release-link-panel">
                <span className="subpage-card__eyebrow">更新前チェック</span>
                <h2>先に確認する3項目</h2>
                <div className="release-check-list">
                  <div>
                    <Wrench size={17} />
                    <span>YMM4パスと保存先を控える</span>
                  </div>
                  <div>
                    <Clock3 size={17} />
                    <span>更新後は少数URLで動作確認する</span>
                  </div>
                  <div>
                    <ExternalLink size={17} />
                    <span>細かい原文は公式リリースで確認する</span>
                  </div>
                </div>
                <div className="subpage-link-stack">
                  <a href={publicDistribution.releaseManifestUrl} target="_blank" rel="noopener noreferrer">
                    <span>配布マニフェスト</span>
                  </a>
                  <a href={publicDistribution.releaseNotesUrl} target="_blank" rel="noopener noreferrer">
                    <span>最新リリースデータ</span>
                  </a>
                  <a href={publicDistribution.updateFeedUrl} target="_blank" rel="noopener noreferrer">
                    <span>更新フィード</span>
                  </a>
                </div>
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
          <div className="update-summary-grid">
            {updateSummaryCards.map((card) => {
              const SummaryIcon = card.Icon
              return (
                <InteractiveCard key={card.title} className="release-panel premium-glass update-summary-card">
                  <span className="update-summary-card__icon" aria-hidden="true">
                    <SummaryIcon size={18} />
                  </span>
                  <h2>{card.title}</h2>
                  <p>{card.body}</p>
                </InteractiveCard>
              )
            })}
          </div>

          <div className="subpage-section-head">
            <p>更新前の確認</p>
            <h2>更新前後で見る順番を固定する</h2>
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
              <p>更新履歴</p>
              <h2>直近の更新を要約で見る</h2>
              <p>リリース本文をそのまま並べず、公式サイトでは読みやすい要点に整形して表示します。</p>
            </div>

            {loading ? <p className="release-monitor__fallback">リリース情報を取得中...</p> : null}

            {error ? (
              <div>
                <p className="release-monitor__fallback">リリース情報の取得に失敗しました。公式配布マニフェストを確認してください。</p>
                <div className="content-page__link-list" style={{ marginTop: '1rem' }}>
                  <a href={publicDistribution.releaseManifestUrl} target="_blank" rel="noopener noreferrer">
                    配布マニフェストで確認
                  </a>
                </div>
              </div>
            ) : null}

            {displayReleases.length > 0 ? (
              <div className="release-timeline">
                {displayReleases.map((release) => {
                  const info = summarizeRelease(release)
                  return (
                    <article key={release.id} className="release-timeline__item">
                      <div className="release-timeline__header">
                        <span className="release-timeline__tag">{release.tag_name}</span>
                        <span className="release-timeline__date">{formatDate(release.published_at)}</span>
                      </div>
                      <h3 className="release-timeline__title">
                        <a href={release.html_url} target="_blank" rel="noopener noreferrer">
                          {release.name || release.tag_name}
                        </a>
                      </h3>

                      <div className="release-summary-badges">
                        {info.labels.map((label) => (
                          <span key={label}>{label}</span>
                        ))}
                      </div>

                      <p className="release-timeline__summary">{info.summary}</p>

                      {info.details.length > 0 ? (
                        <ul className="release-timeline__changes">
                          {info.details.map((line) => (
                            <li key={line}>{line}</li>
                          ))}
                        </ul>
                      ) : null}

                      {info.allLines.length > info.details.length + 1 ? (
                        <details className="release-detail-block">
                          <summary>整形した変更点をさらに見る</summary>
                          <ul>
                            {info.allLines.slice(0, 8).map((line) => (
                              <li key={line}>{line}</li>
                            ))}
                          </ul>
                        </details>
                      ) : null}
                    </article>
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
