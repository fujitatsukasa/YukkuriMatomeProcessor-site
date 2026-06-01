import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { InteractiveCard, PageMeta, Section } from '@/components/ui'
import { downloadUrl, publicDistribution } from '@/data/site-content'
import { AlertTriangle, BadgeCheck, CheckCircle2, Clock3, Download, ExternalLink, ShieldCheck, Wrench } from 'lucide-react'

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

const releaseTermReplacements = [
  { pattern: /\bscript[_-]?fetch\b/gi, label: '台本取得' },
  { pattern: /\bscript[_-]?generation\b/gi, label: 'AI台本生成' },
  { pattern: /packaged runtime blocker/gi, label: '配布版の起動阻害要因' },
  { pattern: /packaged runtime/gi, label: '配布版の実行環境' },
  { pattern: /packaged exe/gi, label: '配布版exe' },
  { pattern: /packaged smoke evidence/gi, label: '配布版の起動確認記録' },
  { pattern: /release artifact inventory/gi, label: '配布ファイル一覧' },
  { pattern: /production packaged app/gi, label: '本番配布アプリ' },
  { pattern: /packaged app/gi, label: '配布アプリ' },
  { pattern: /Web runtime/gi, label: 'Web実行環境' },
  { pattern: /runtime module/gi, label: '実行時モジュール' },
  { pattern: /windowed exe/gi, label: 'ウィンドウ版exe' },
  { pattern: /stdout\/stderr/gi, label: '標準出力/エラー出力' },
  { pattern: /Uvicorn/gi, label: '内部Webサーバー' },
  { pattern: /Vite dev server \/ npm/gi, label: '開発用サーバー/npm' },
  { pattern: /third-party game shell assets/gi, label: '別用途の画面素材' },
  { pattern: /current\/_internal\/main\.dist\/YMP-Main-Web\.exe/gi, label: 'メイン画面の実行ファイル' },
  { pattern: /Launcher/gi, label: '起動ランチャー' },
  { pattern: /\bMain\b/gi, label: 'メイン画面' },
  { pattern: /API status/gi, label: '内部APIの状態' },
  { pattern: /self-signed Authenticode/gi, label: '自己署名のWindows署名' },
  { pattern: /Authenticode/gi, label: 'Windows署名' },
  { pattern: /SmartScreen/gi, label: 'Windows SmartScreen' },
  { pattern: /public trust blocker/gi, label: '公開配布時の信頼表示課題' },
  { pattern: /auth \/ billing/gi, label: 'ログイン/課金' },
  { pattern: /E2E/gi, label: '実ユーザー確認' },
  { pattern: /fresh VM final pass/gi, label: 'クリーン環境の最終確認' },
] as const

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return `${d.getFullYear()}年${String(d.getMonth() + 1).padStart(2, '0')}月${String(d.getDate()).padStart(2, '0')}日`
}

function normalizeReleaseLine(line: string) {
  const cleaned = line
    .replace(/<[^>]*>/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`>]/g, '')
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, '')
    .replace(/^[-#\s]+/, '')
    .replace(/再修正(?:修正)+/g, '修正')
    .replace(/\s+/g, ' ')
    .trim()

  return releaseTermReplacements.reduce(
    (value, replacement) => value.replace(replacement.pattern, replacement.label),
    cleaned,
  )
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

const currentDistributionSummaryLines = [
  publicDistribution.summary,
  `インストーラー: ${publicDistribution.assets.setup.fileName}`,
  `ポータブルZIP: ${publicDistribution.assets.portable.fileName}`,
  '自己署名のためWindows警告が出る場合があります。公式URLとSHA256を確認してから起動してください。',
] as const

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

const releaseReadinessCards = [
  {
    label: '確認済み',
    title: `${publicDistribution.version}の配布ファイルを公開中`,
    body: 'インストーラーとポータブルZIPのファイル名、サイズ、SHA256を公開しています。更新前に配布元URLとファイル情報を確認してください。',
    tone: 'ok',
    Icon: CheckCircle2,
  },
  {
    label: '注意',
    title: '自己署名のためWindows警告が出る場合があります',
    body: '一般公開ではWindows SmartScreenや発行元の信頼表示に課題が残ります。公式URLとSHA256を照合してください。',
    tone: 'warning',
    Icon: AlertTriangle,
  },
  {
    label: '残タスク',
    title: '購入・ログインは実環境で再確認してください',
    body: '更新後は本番件数に戻す前に、ログイン状態、Premium権限、少数URLでの取得と台本下地までを確認してください。',
    tone: 'caution',
    Icon: Clock3,
  },
] as const

const updateCompletionChecks = [
  '公式リンクから最新版を取得した',
  'ファイル名、サイズ、SHA256を確認した',
  'インストールまたは解凍後に起動できた',
  'YMM4パスと保存先設定が残っているか確認した',
  '少数URLで候補取得と台本下地まで再確認した',
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
        const remoteVersion = data.version || publicDistribution.version
        const isCurrentReleaseNote = remoteVersion === publicDistribution.version
        const body = isCurrentReleaseNote
          ? [
              data.summary,
              ...(data.sections ?? []).flatMap((section) => [
                section.title,
                ...(section.items ?? []),
              ]),
            ]
              .filter((line): line is string => Boolean(line))
              .join('\n')
          : currentDistributionSummaryLines.join('\n')

        setReleases([
          {
            id: 1,
            tag_name: publicDistribution.version,
            name: isCurrentReleaseNote ? data.title || `YMP ${publicDistribution.version}` : `YMP ${publicDistribution.version}`,
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

          <div className="release-readiness-grid" aria-label="最新版の確認状況">
            {releaseReadinessCards.map((card) => {
              const ReadinessIcon = card.Icon
              return (
                <InteractiveCard
                  key={card.title}
                  className={`release-panel premium-glass release-readiness-card release-readiness-card--${card.tone}`}
                >
                  <span className="release-readiness-card__label">
                    <ReadinessIcon size={16} />
                    {card.label}
                  </span>
                  <h2>{card.title}</h2>
                  <p>{card.body}</p>
                </InteractiveCard>
              )
            })}
          </div>

          <InteractiveCard className="release-panel premium-glass release-update-completion-panel">
            <div>
              <span className="subpage-card__eyebrow">
                <CheckCircle2 size={16} />
                更新後の完了判定
              </span>
              <h2>更新できたかは、起動だけでなく少数URLまで通して確認する</h2>
              <p>
                アップデート直後に本番件数へ戻さず、まず公式配布物、設定、少数URLの取得、台本下地までを確認してください。
              </p>
            </div>
            <ul className="release-update-completion-list">
              {updateCompletionChecks.map((item) => (
                <li key={item}>
                  <CheckCircle2 size={16} />
                  {item}
                </li>
              ))}
            </ul>
          </InteractiveCard>

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
