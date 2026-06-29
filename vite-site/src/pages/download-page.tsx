import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { InteractiveCard, PageIntro, PageMeta, Section } from '@/components/ui'
import { downloadUrl, publicDistribution } from '@/data/site-content'
import { productFacts } from '@/data/product-facts'
import { MetricStrip } from '@/pages/shared'
import { AnimatePresence, motion } from '@/lib/light-motion'
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  CheckCircle2,
  ClipboardCheck,
  Download,
  FileSearch,
  FolderCog,
  Send,
  Settings2,
  ShieldCheck,
  Wrench,
} from 'lucide-react'

const onboardingChecks = [
  'Windows 10 / 11 環境であること',
  'YMM4 の実行ファイルパスを指定できること',
  '解凍先フォルダに書き込み権限があること',
  '必要に応じて外部APIキーを用意できること',
] as const

const supportBundle = [
  '対象URLと対応サイト名',
  '再現手順と発生時刻',
  'YMM4実行パスと保存先設定',
  'エラーメッセージ全文またはスクリーンショット',
] as const

const downloadMetrics = [
  { value: '確認中', label: '公開配布の可否', detail: '無料版としては案内しない' },
  { value: '6手順', label: '最初に触る順番', detail: '解凍 -> 起動 -> 設定 -> URL入力 -> 出力確認' },
  { value: 'YMM4', label: '後工程の手戻りを削減', detail: '保存先、CSV、連携パスの整合を先に揃える' },
] as const

const instructionMetrics = [
  { value: '6手順', label: '迷わない操作順', detail: '起動 -> 設定 -> URL -> 整理 -> 出力 -> 確認' },
  { value: '成功状態', label: '各ステップで確認', detail: '押す場所と終わりの状態を分けて確認' },
  { value: '詰まり対応', label: '原因を切り分ける', detail: '設定、URL、保存先、YMM4パスの順で見る' },
] as const

const instructionPrepCards = [
  {
    label: '必須',
    title: 'YMM4.exe の場所',
    body: 'ショートカットではなく、YukkuriMovieMaker4.exe 本体の絶対パスを指定できる状態にします。',
    check: '設定保存後も同じパスを使える',
    Icon: Settings2,
  },
  {
    label: '必須',
    title: 'CSV/.ymmp の保存先',
    body: '出力ファイルを置くフォルダを先に決めます。OneDrive同期中や権限が不安な場所は避けると切り分けが楽です。',
    check: '書き込みできるフォルダを選ぶ',
    Icon: FolderCog,
  },
  {
    label: '入力',
    title: '確認するURLを1から3件',
    body: '最初は大量取得せず、対応していそうな記事URL・スレッドURLを少数だけ入れて候補一覧を確認します。',
    check: '候補タイトルとURLが並ぶ',
    Icon: FileSearch,
  },
  {
    label: '任意',
    title: '外部APIキー',
    body: '外部API連携を使う場合だけ用意します。台本取得の最初の確認だけなら後回しでも構いません。',
    check: '使う機能だけ先に設定する',
    Icon: BadgeCheck,
  },
] as const

const instructionGoalCards = [
  {
    title: '初回設定を終える',
    body: '起動、YMM4実行ファイル、保存先、必要なAPIキーを先に固定します。',
    done: ['アプリが起動する', 'YMM4.exeの絶対パスを保存', 'CSV/.ymmp保存先を決める'],
    Icon: Settings2,
  },
  {
    title: 'URLから台本候補を取る',
    body: '対応URLを少数で試し、候補一覧へ出るかを確認します。',
    done: ['対象URLを入力', '候補一覧にタイトルが並ぶ', '取得できないURLを切り分ける'],
    Icon: FileSearch,
  },
  {
    title: '台本下地を確認できる形にする',
    body: '不要行、役割、感情、読み上げ量を見て、YMM4へ渡す前の下書きにします。',
    done: ['不要行を削る', 'AI補助の結果を人が確認', '長い行を読み上げ向けに分割'],
    Icon: Bot,
  },
  {
    title: 'YMM4前準備まで通す',
    body: 'CSV/.ymmp前準備、素材パス、保存先を確認して、YMM4側の編集へ進める状態にします。',
    done: ['CSV/.ymmp前準備を出力', '素材パスを確認', 'YMM4で開く前の確認を終える'],
    Icon: FolderCog,
  },
] as const

const instructionFeatureGoalMap = [
  {
    step: '01',
    title: '初回設定',
    goal: 'YMM4.exe、保存先、必要なAPIキーを固定する',
    success: '次回起動後も同じ出力先で作業できる',
    image: '/product_guide.webp',
    alt: '初回設定とYMM4パス設定を確認する実アプリ画面',
    href: '#instruction-step-02',
    Icon: Settings2,
  },
  {
    step: '02',
    title: 'URL取得',
    goal: '記事URL・スレッドURLを少数で確認する',
    success: '候補一覧にタイトル、URL、サムネイルが並ぶ',
    image: '/product_get_script.webp',
    alt: '記事URLから候補一覧を取得する実アプリ画面',
    href: '#instruction-step-03',
    Icon: FileSearch,
  },
  {
    step: '03',
    title: '台本整理・AI補助',
    goal: '不要行、役割、感情、長い文を確認する',
    success: '読み上げ前に人が確認できる台本下地になる',
    image: '/product_edit_script.webp',
    alt: '台本整理とAI補助の実アプリ画面',
    href: '#instruction-step-04',
    Icon: Bot,
  },
  {
    step: '04',
    title: 'CSV/.ymmp前準備',
    goal: 'フォーマット、キャラ設定、出力名を決める',
    success: '保存先に編集前準備ファイルを作れる',
    image: '/product_format_list.webp',
    alt: 'CSVと.ymmp前準備のフォーマット管理画面',
    href: '#instruction-step-05',
    Icon: FolderCog,
  },
  {
    step: '05',
    title: '題材確認',
    goal: '外部API連携で次の題材を見る',
    success: '候補を選び、台本作成へ戻れる',
    image: '/product_youtube_info.webp',
    alt: '外部API連携と候補確認の実アプリ画面',
    href: '/samples/',
    Icon: FileSearch,
  },
  {
    step: '06',
    title: 'YMM4へ渡す前',
    goal: '素材パス、保存先、キャラ設定を見直す',
    success: 'YMM4側で最終編集へ進める',
    image: '/product_keyword_material.webp',
    alt: '素材パスとYMM4前準備を確認する実アプリ画面',
    href: '#instruction-step-06',
    Icon: Send,
  },
] as const

const completionChecks = [
  '配布可否と公開条件を確認した',
  '対象URLの取得可否を少数件で確認した',
  '台本下地をそのまま使わず内容確認した',
  'CSV/.ymmp前準備の保存先を確認した',
  'YMM4側で最終編集が必要な前提を理解した',
] as const

const completionGateItems = [
  {
    id: 'launch',
    title: 'アプリが起動した',
    body: 'インストーラーまたはポータブルZIPから起動し、最初の画面を確認できた。',
    href: '#instruction-step-01',
  },
  {
    id: 'settings',
    title: 'YMM4パスと保存先を保存した',
    body: 'YMM4.exeの絶対パス、CSV/.ymmp保存先、必要なAPIキーを固定した。',
    href: '#instruction-step-02',
  },
  {
    id: 'url',
    title: '少数URLで候補一覧が出た',
    body: 'まず少数の対象URLで、候補タイトルやサムネイルが表示されることを確認した。',
    href: '#instruction-step-03',
  },
  {
    id: 'script',
    title: '台本下地を人が確認した',
    body: '不要行、長い文、AI補助の結果を確認し、読み上げ前に見直した。',
    href: '#instruction-step-04',
  },
  {
    id: 'export',
    title: 'CSV/.ymmp前準備を出力した',
    body: '保存先に編集前準備のファイルが作成され、次の編集へ渡せる状態にした。',
    href: '#instruction-step-05',
  },
  {
    id: 'handoff',
    title: 'YMM4で開く前の確認を終えた',
    body: '素材パス、キャラ設定、保存先を見直し、YMM4側で最終編集する前提を理解した。',
    href: '#instruction-step-06',
  },
  {
    id: 'decision',
    title: '購入しない段階か判断した',
    body: 'Premiumが必要な場合だけ検討し、購入前に料金と返金条件を確認した。',
    href: '/purchase/',
  },
  {
    id: 'support',
    title: '詰まった時に送る情報を用意した',
    body: 'OS、アプリ版、YMM4版、対象URL、エラー全文、再現手順を送れる状態にした。',
    href: '/contact/',
  },
] as const

const downloadSupportCards = [
  {
    eyebrow: '導入前',
    title: '導入前チェック',
    body: '最初に環境と前提を揃えるだけで、導入後の詰まり方がかなり減ります。',
    items: onboardingChecks,
  },
  {
    eyebrow: '問い合わせ',
    title: '問い合わせ時にあると速い情報',
    body: 'サポートへ渡す情報を先に決めておくと、切り分けが速くなります。',
    items: supportBundle,
  },
  {
    eyebrow: '次に見るページ',
    title: '導入後に進むべきページ',
    body: '使い方で操作手順、料金で確認中条件、FAQで詰まりどころを確認できます。',
    links: [
      { label: '使い方を見る', href: '/instructions/' },
      { label: '料金を確認', href: '/purchase/' },
      { label: 'FAQを開く', href: '/faq/' },
    ],
  },
] as const

const distributionChecks = [
  {
    title: '候補リンク',
    body: '配布候補は Cloudflare Workers/R2 のインストーラー候補とポータブルZIP候補です。D10確認が揃うまで直接取得CTAは表示しません。',
  },
  {
    title: '初回起動前',
    body: '配布ゲート通過後に取得する場合、インストーラーはそのまま実行、ポータブルZIPは解凍してから起動します。Windowsの警告が出た場合は、配布元URL、ファイル名、SHA256を確認してください。',
  },
  {
    title: '起動後に確認',
    body: 'YMM4実行パス、保存先フォルダ、必要に応じた外部APIキーを設定してから、少数URLで動作確認します。',
  },
  {
    title: '更新時',
    body: 'アップデート前に保存先と設定を確認し、必要なら作業フォルダをバックアップしてください。変更点は更新履歴で確認できます。',
  },
] as const

const distributionReadinessCards = [
  {
    title: '取得前に見る情報',
    body: 'D10確認中の候補バージョン、確認日、ファイル名、サイズ、SHA256、配布元候補を確認します。',
    done: ['インストーラー候補名を確認', 'ポータブルZIP候補の有無を確認', 'サイズとSHA256を確認'],
    Icon: FileSearch,
  },
  {
    title: '解凍後に見ること',
    body: 'ポータブルZIPを使う場合は、ZIPを直接開いたまま使わず、書き込み可能なフォルダへ解凍してから起動します。',
    done: ['ZIPを解凍済み', '作業フォルダに配置', 'Windows警告時は配布元を照合'],
    Icon: Wrench,
  },
  {
    title: '初回設定で固定すること',
    body: 'YMM4.exeの絶対パス、CSV/.ymmp保存先、必要なAPIキーを先に保存します。',
    done: ['YMM4.exeを指定', '保存先フォルダを指定', '必要ならAPIキーを設定'],
    Icon: Settings2,
  },
  {
    title: '導入完了の判定',
    body: '少数URLで候補一覧、台本下地、出力先まで確認できたら導入完了です。',
    done: ['候補一覧が表示される', '台本下地を確認できる', '出力先にファイルを作れる'],
    Icon: ClipboardCheck,
  },
] as const

const distributionCompletionChecks = [
  '配布ページで候補ファイル情報を確認した',
  'ポータブルZIPは解凍してから起動した',
  'Windows警告が出た場合に配布元とSHA256を確認した',
  'YMM4.exeと保存先を保存した',
  '少数URLで候補一覧と出力先まで確認した',
] as const

const downloadChoiceCards = [
  {
    label: '候補ファイル',
    title: 'インストーラー候補',
    fileName: publicDistribution.assets.setup.fileName,
    shortName: 'Setup.exe',
    body: 'Windowsアプリとして入れる形式の候補です。D10確認完了までは直接取得CTAに使いません。',
    goodFor: ['候補ファイル名の確認', 'サイズ確認', 'SHA256照合'],
    href: publicDistribution.assets.setup.url,
    Icon: Download,
  },
  {
    label: '候補ファイル',
    title: 'ポータブルZIP候補',
    fileName: publicDistribution.assets.portable.fileName,
    shortName: 'Portable.zip',
    body: 'インストールせずに確認する形式の候補です。D10確認完了までは直接取得CTAに使いません。',
    goodFor: ['候補ファイル名の確認', '解凍手順の確認', 'SHA256照合'],
    href: publicDistribution.assets.portable.url,
    Icon: Wrench,
  },
] as const

type ReleaseNotesResponse = {
  version?: string
  title?: string
  summary?: string
}

type ReleaseManifestResponse = {
  Assets?: Array<{
    Version?: string
    Type?: string
    FileName?: string
    SHA256?: string
    Size?: number
  }>
}

type PublicDistributionInfo = {
  version: string
  title: string
  summary: string
  publishedAt: string
  source: 'fallback' | 'live' | 'error'
}

const fallbackDistributionInfo: PublicDistributionInfo = {
  version: publicDistribution.versionLabel,
  title: `YMP ${publicDistribution.versionLabel}`,
  summary: publicDistribution.summary,
  publishedAt: publicDistribution.publishedAt,
  source: 'fallback',
}

function formatReleaseDate(isoDate: string) {
  const date = new Date(isoDate)
  if (Number.isNaN(date.getTime())) return '確認中'

  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'Asia/Tokyo',
  }).format(date)
}

function formatFileSize(bytes: number) {
  return `${(bytes / 1000 / 1000).toLocaleString('ja-JP', {
    maximumFractionDigits: 1,
  })} MB`
}

function compareVersion(a: string, b: string) {
  const left = a.split('.').map((part) => Number.parseInt(part, 10) || 0)
  const right = b.split('.').map((part) => Number.parseInt(part, 10) || 0)
  const length = Math.max(left.length, right.length)

  for (let index = 0; index < length; index += 1) {
    const diff = (left[index] ?? 0) - (right[index] ?? 0)
    if (diff !== 0) return diff
  }

  return 0
}

function getLatestManifestVersion(manifest: ReleaseManifestResponse | null) {
  return manifest?.Assets?.reduce<string | null>((latest, asset) => {
    if (!asset.Version) return latest
    if (!latest || compareVersion(asset.Version, latest) > 0) return asset.Version
    return latest
  }, null)
}

function ReleaseIntegrityPanel() {
  const [release, setRelease] = useState<PublicDistributionInfo>(fallbackDistributionInfo)
  const downloadReady = productFacts.downloadReady.value

  useEffect(() => {
    if (!downloadReady) {
      setRelease(fallbackDistributionInfo)
      return
    }

    const controller = new AbortController()

    async function fetchReleaseNotes() {
      try {
        const [notesResult, manifestResult] = await Promise.allSettled([
          fetch(publicDistribution.releaseNotesUrl, {
            headers: { Accept: 'application/json' },
            signal: controller.signal,
          }),
          fetch(publicDistribution.releaseManifestUrl, {
            headers: { Accept: 'application/json' },
            signal: controller.signal,
          }),
        ])

        const notesResponse = notesResult.status === 'fulfilled' && notesResult.value.ok ? notesResult.value : null
        const manifestResponse = manifestResult.status === 'fulfilled' && manifestResult.value.ok ? manifestResult.value : null

        if (!notesResponse && !manifestResponse) throw new Error('Distribution metadata fetch failed')

        const data = notesResponse ? ((await notesResponse.json()) as ReleaseNotesResponse) : {}
        const manifest = manifestResponse ? ((await manifestResponse.json()) as ReleaseManifestResponse) : null
        const manifestVersion = getLatestManifestVersion(manifest)
        const notesVersion = data.version || publicDistribution.version
        const usesManifestVersion = manifestVersion ? compareVersion(manifestVersion, notesVersion) > 0 : false
        const version = usesManifestVersion && manifestVersion ? manifestVersion : notesVersion

        setRelease({
          version,
          title: usesManifestVersion ? `YMP ${version}` : data.title || `YMP ${publicDistribution.version}`,
          summary: usesManifestVersion ? publicDistribution.summary : data.summary || publicDistribution.summary,
          publishedAt: publicDistribution.publishedAt,
          source: 'live',
        })
      } catch {
        if (controller.signal.aborted) return
        setRelease({ ...fallbackDistributionInfo, source: 'error' })
      }
    }

    void fetchReleaseNotes()

    return () => controller.abort()
  }, [downloadReady])

  const statusLabel =
    !downloadReady
      ? 'D10確認中 / 配布候補'
      : release.source === 'live'
        ? '配布ノート取得済み'
      : release.source === 'error'
        ? '既知情報を表示中 / 2026-06-01確認'
        : '既知情報を表示中 / 2026-06-01確認'

  const distributionAssets = [publicDistribution.assets.setup, publicDistribution.assets.portable]

  return (
    <InteractiveCard as="section" className="release-integrity-panel premium-glass">
      <div className="release-integrity-panel__top">
        <div>
          <span className="subpage-card__eyebrow">配布候補情報</span>
          <h2>候補ファイル名・サイズ・SHA256を確認できます</h2>
          <p>
            配布条件が確定したら、Cloudflare Workers/R2 の配布ファイルへ案内します。取得前後にファイル名とハッシュを確認すると、
            別URLや古い配布物との取り違えを避けやすくなります。
          </p>
        </div>
        <span className={`release-integrity-status is-${release.source}`}>{statusLabel}</span>
      </div>

      <dl className="release-integrity-grid">
        <div>
          <dt>バージョン</dt>
          <dd>{release.version}</dd>
        </div>
        <div>
          <dt>確認日</dt>
          <dd>{formatReleaseDate(release.publishedAt)}</dd>
        </div>
        <div>
          <dt>チャンネル</dt>
          <dd>{publicDistribution.channel}</dd>
        </div>
        <div>
          <dt>候補配布元</dt>
          <dd>Cloudflare Workers/R2</dd>
        </div>
      </dl>

      <div className="release-note-panel">
        <span>{release.title}</span>
        <p>{release.summary}</p>
      </div>

      <div className="release-asset-grid">
        {distributionAssets.map((asset) => (
          <div key={asset.fileName} className="release-asset-card">
            <span>{asset.label}</span>
            <strong>{asset.fileName}</strong>
            <p>{asset.description}</p>
            <dl>
              <div>
                <dt>サイズ</dt>
                <dd>{formatFileSize(asset.sizeBytes)}</dd>
              </div>
              <div>
                <dt>SHA256</dt>
                <dd>
                  <code>{asset.sha256}</code>
                </dd>
              </div>
            </dl>
          </div>
        ))}
      </div>

      <div className="release-integrity-note">
        <ShieldCheck size={17} />
        <span>{publicDistribution.trustNote}</span>
      </div>

      <div className="release-integrity-actions">
        {downloadReady ? (
          <>
            <a className="brand-btn brand-btn--primary" href={publicDistribution.assets.setup.url} rel="noreferrer">
              インストーラーをダウンロード
            </a>
            <a className="brand-btn brand-btn--ghost" href={publicDistribution.assets.portable.url} rel="noreferrer">
              ポータブルZIPを取得
            </a>
          </>
        ) : (
          <div className="download-gate-note" role="status">
            配布バージョン、署名状態、公開ゲートの確認中です。確認が揃うまで、このページでは実行ファイルの直接取得ボタンを表示しません。
          </div>
        )}
        {downloadReady ? (
          <a className="brand-btn brand-btn--ghost" href={publicDistribution.sha256SumsUrl} target="_blank" rel="noreferrer">
            SHA256一覧を見る
          </a>
        ) : (
          <span className="download-choice-card__pending">SHA256一覧はD10確認完了後に外部リンクとして表示します</span>
        )}
      </div>
    </InteractiveCard>
  )
}

const instructionSteps = [
  {
    number: '01',
    title: '配布ページを確認する',
    image: '/product_guide.webp',
    alt: '初期設定とガイドの画面',
    action: '配布条件とファイル情報を確認します。取得できる状態になったら作業しやすいフォルダで起動準備をします。',
    input: '入力なし。まずは配布ファイル名、配布元URL、保存先だけ確認します。',
    click: '解凍後、アプリ本体を起動します。',
    success: 'アプリ画面が開き、初期設定へ進める状態です。',
    trouble: ['Windows警告が出たら配布元URLとSHA256を確認', 'ポータブルZIPは直接開かず、必ず解凍してから起動'],
    Icon: Wrench,
  },
  {
    number: '02',
    title: 'YMM4パスと保存先を設定する',
    image: '/product_guide.webp',
    alt: 'YMM4パスと保存先を設定する画面',
    action: '最初にYMM4実行ファイルと出力先フォルダを固定します。',
    input: 'YMM4.exeの絶対パス、CSV/.ymmpの保存先、必要に応じて外部APIキー。',
    click: '設定保存またはガイド内の保存ボタンを押します。',
    success: '次回以降も同じ保存先で出力できる状態です。',
    trouble: ['YMM4パスはショートカットではなく実体を指定', '保存先は書き込み権限のあるフォルダにする'],
    Icon: Settings2,
  },
  {
    number: '03',
    title: '記事URL・スレッドURLを入力する',
    image: '/product_get_script.webp',
    alt: '記事URLから候補を取得する画面',
    action: '画面上部の「台本取得」を開き、動画化したい記事、スレッド、まとめ記事のURLを入力します。',
    input: '対象URL、検索条件、必要なら取得件数や除外条件。',
    click: '「記事取得」または取得系のボタンを押します。',
    success: '候補一覧にタイトル、サムネイル、URLが並びます。',
    trouble: ['対応外URLは取得できない場合あり', 'まず少数URLで取得できるか確認'],
    Icon: FileSearch,
  },
  {
    number: '04',
    title: '台本候補を整理する',
    image: '/product_edit_script.webp',
    alt: '台本を編集してYMM4向けに整える画面',
    action: '取得した台本候補から不要行、見出し、読み上げに向かない文を整理します。',
    input: '残したい本文、削りたい行、役割や感情の調整内容。',
    click: '整形、AI補助、感情分析、改行補助など必要な処理だけ使います。',
    success: '読み上げ前に確認できる台本下地になります。',
    trouble: ['AI出力はそのまま確定せず内容確認', '長すぎる行は読み上げ前に分割'],
    Icon: Bot,
  },
  {
    number: '05',
    title: 'CSV/.ymmp前準備を出力する',
    image: '/product_format_list.webp',
    alt: 'フォーマット管理とYMM4前準備の画面',
    action: '台本をCSVや.ymmp前準備として残し、次の編集へ渡せる形にします。',
    input: 'フォーマット、キャラ設定、出力ファイル名、保存先。',
    click: 'CSV出力、.ymmp関連の出力、フォーマット保存を実行します。',
    success: '保存先に編集前準備のファイルが作成されます。',
    trouble: ['保存先の空き容量と権限を確認', 'ファイル名ルールを先に固定'],
    Icon: FolderCog,
  },
  {
    number: '06',
    title: 'YMM4で開く前に最終確認する',
    image: '/product_keyword_material.webp',
    alt: '素材整理とYMM4前準備の画面',
    action: 'CSV、キャラ設定、立ち絵パス、素材フォルダを確認してからYMM4側へ進みます。',
    input: '素材フォルダ、キャラ設定、立ち絵パス、読み方が気になる語句。',
    click: '必要に応じてパス変更、読み方監査、保存を行います。',
    success: 'YMM4で開いた後の修正量を減らせる状態です。',
    trouble: ['素材パスが変わった場合は再指定', 'YMM4で読めない場合は出力形式と保存先を確認'],
    Icon: Send,
  },
] as const

const instructionQuickRoute = [
  {
    href: '#instruction-step-01',
    step: '01',
    title: '解凍して起動',
    result: 'アプリ画面が開く',
    image: '/product_guide.webp',
    Icon: Wrench,
  },
  {
    href: '#instruction-step-02',
    step: '02',
    title: 'YMM4と保存先',
    result: '出力先を固定する',
    image: '/product_guide.webp',
    Icon: Settings2,
  },
  {
    href: '#instruction-step-03',
    step: '03',
    title: 'URL入力',
    result: '候補一覧が出る',
    image: '/product_get_script.webp',
    Icon: FileSearch,
  },
  {
    href: '#instruction-step-04',
    step: '04',
    title: '台本整理',
    result: '読み上げ前に確認',
    image: '/product_edit_script.webp',
    Icon: Bot,
  },
  {
    href: '#instruction-step-05',
    step: '05',
    title: 'CSV/.ymmp前準備',
    result: '保存先に作成',
    image: '/product_format_list.webp',
    Icon: FolderCog,
  },
  {
    href: '#instruction-step-06',
    step: '06',
    title: 'YMM4前の確認',
    result: '素材とパスを確認',
    image: '/product_keyword_material.webp',
    Icon: Send,
  },
] as const

const instructionPracticePath = [
  {
    time: '5分',
    title: '起動と初回設定を確認',
    screen: 'ガイド画面 / 設定',
    do: 'インストーラーまたは解凍済みZIPから起動し、YMM4.exeと保存先を固定します。',
    done: '次回も同じ保存先へ出力できる',
    href: '#instruction-step-02',
    Icon: Settings2,
  },
  {
    time: '10分',
    title: '少数URLで候補一覧を出す',
    screen: '台本取得',
    do: '記事URLまたはスレッドURLを1から3件だけ入れ、右側の候補一覧にタイトルとURLが並ぶか見ます。',
    done: '候補一覧にタイトル、サムネイル、URLが出る',
    href: '#instruction-step-03',
    Icon: FileSearch,
  },
  {
    time: '10分',
    title: '台本下地を人が確認する',
    screen: '台本編集',
    do: '不要行、長い文、AI補助の結果を確認し、そのまま読み上げても違和感が出そうな箇所を直します。',
    done: '読み上げ前に確認できる下書きになる',
    href: '#instruction-step-04',
    Icon: Bot,
  },
  {
    time: '5分',
    title: 'CSV/.ymmp前準備を出す',
    screen: 'フォーマット / 素材確認',
    do: '出力形式、キャラ設定、保存先、素材パスを確認し、YMM4を開く前の準備ファイルを作ります。',
    done: '保存先に編集前準備ファイルができる',
    href: '#instruction-step-05',
    Icon: FolderCog,
  },
] as const

const instructionTroubleCards = [
  {
    title: '起動しない',
    body: '解凍済みか、Windows警告で止まっていないか、保存先に書き込み権限があるかを確認します。',
    points: ['ZIPを解凍してから起動', '配布元URLを確認', '管理者権限が必要か確認'],
  },
  {
    title: 'URL取得できない',
    body: 'URL形式、対応サイト、ネットワーク、対象ページの状態を順番に確認します。',
    points: ['URLをブラウザで開けるか確認', '少数URLで再試行', '対応外URLは問い合わせへ'],
  },
  {
    title: 'YMM4に渡せない',
    body: 'YMM4パス、CSV/.ymmp保存先、素材パスがずれていないかを見直します。',
    points: ['YMM4.exeの絶対パスを指定', '保存先を再確認', '素材フォルダの移動に注意'],
  },
] as const

type GuideScene = {
  key: string
  eyebrow: string
  title: string
  body: string
  image: string
  alt: string
  checkpoint: string
  points: readonly string[]
  Icon: typeof FileSearch
}

const downloadScenes: readonly GuideScene[] = [
  {
    key: 'setup',
    eyebrow: '手順1',
    title: 'YMM4 パスと保存先を先に固定する',
    body: '最初に設定を終えることで、後の台本取得や出力で迷う回数を減らします。外部API連携を使うならAPIキーもここで揃えます。',
    image: '/product_guide.webp',
    alt: '内蔵ガイドと設定確認のイメージ',
    checkpoint: '起動直後に固定する設定が揃う',
    points: ['YMM4 実行ファイルの絶対パスを登録', 'CSV や素材の保存先フォルダを決める', '必要に応じて API キーを設定する'],
    Icon: Wrench,
  },
  {
    key: 'collect',
    eyebrow: '手順2',
    title: '対応サイトから記事とスレッドを取得する',
    body: 'まずは少ない件数で、記事取得、候補選択、台本化の手順を確認し、手元の題材で続けられるか見ます。',
    image: '/product_get_script.webp',
    alt: '対応サイトから記事候補を取得する画面',
    checkpoint: 'URL から台本取得までの入口が通る',
    points: ['対象URLを入力して候補を一覧化', '少数件で最初の手順を固定', '取得候補を比較して動画化する題材を絞る'],
    Icon: FileSearch,
  },
  {
    key: 'shape',
    eyebrow: '手順3',
    title: '台本整形と AI 補助の使いどころを掴む',
    body: '取得した台本をそのまま使わず、改行補助、感情分析、役割整理で「使える下書き」に寄せる手順を確認します。',
    image: '/product_edit_script.webp',
    alt: '台本整形と編集の画面',
    checkpoint: 'AI 補助をどこで入れるか判断できる',
    points: ['不要行や見出しを整理する', '感情分析と改行補助を必要箇所だけ使う', '再利用しやすい粒度まで整える'],
    Icon: Bot,
  },
  {
    key: 'handoff',
    eyebrow: '手順4',
    title: 'YMM4 前準備まで確認する',
    body: 'CSV、キャラ設定、立ち絵パス変更など、編集前に揃えるべきものをここで整理しておくと、後工程の手戻りを減らせます。',
    image: '/product_keyword_material.webp',
    alt: 'YMM4 前準備と素材整理の画面',
    checkpoint: '編集に入る前の準備が揃う',
    points: ['CSV 出力と保存先を確認', 'キャラ設定や立ち絵パスの整合を確認', 'YMM4 に渡す前の最終チェックを固定する'],
    Icon: Send,
  },
] as const

function GuideSceneSwitcher({
  title,
  lead,
  scenes,
  ariaLabel,
}: {
  title: string
  lead: string
  scenes: readonly GuideScene[]
  ariaLabel: string
}) {
  const [activeKey, setActiveKey] = useState(scenes[0]?.key ?? '')
  const activeScene = scenes.find((scene) => scene.key === activeKey) ?? scenes[0]

  if (!activeScene) return null

  return (
    <div className="guide-scene-switcher">
      <div className="subpage-section-head">
        <p>{title}</p>
        <h2>{lead}</h2>
      </div>

      <div className="guide-scene-switcher__tabs" role="tablist" aria-label={ariaLabel}>
        {scenes.map((scene) => {
          const SceneIcon = scene.Icon
          const isActive = scene.key === activeScene.key
          return (
            <button
              key={scene.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`guide-scene-switcher__tab${isActive ? ' is-active' : ''}`}
              onClick={() => setActiveKey(scene.key)}
            >
              <span className="guide-scene-switcher__tab-icon" aria-hidden="true">
                <SceneIcon size={16} />
              </span>
              <span>
                <strong>{scene.eyebrow}</strong>
                <small>{scene.title}</small>
              </span>
            </button>
          )
        })}
      </div>

      <InteractiveCard as="section" className="guide-scene-switcher__panel premium-glass">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeScene.key}
            className="guide-scene-switcher__panel-inner"
            initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -18, filter: 'blur(8px)' }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="guide-scene-switcher__copy">
              <span className="guide-scene-switcher__eyebrow">{activeScene.eyebrow}</span>
              <h3>{activeScene.title}</h3>
              <p>{activeScene.body}</p>

              <div className="guide-scene-switcher__checkpoint">
                <span>この段階で見えること</span>
                <strong>{activeScene.checkpoint}</strong>
              </div>

              <ul className="guide-scene-switcher__checks">
                {activeScene.points.map((point) => (
                  <li key={point}>
                    <BadgeCheck size={16} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <figure className="guide-scene-switcher__visual">
              <div className="guide-scene-switcher__screen">
                <img src={activeScene.image} alt={activeScene.alt} loading="lazy" decoding="async" />
              </div>
              <figcaption>{activeScene.alt}</figcaption>
            </figure>
          </motion.div>
        </AnimatePresence>
      </InteractiveCard>
    </div>
  )
}

function InstructionCompletionChecklist() {
  const [checkedIds, setCheckedIds] = useState<string[]>([])
  const checkedCount = checkedIds.length
  const progress = Math.round((checkedCount / completionGateItems.length) * 100)

  const toggle = (id: string) => {
    setCheckedIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
  }

  return (
    <InteractiveCard className="instruction-self-check premium-glass">
      <div className="instruction-self-check__head">
        <div>
          <span className="subpage-card__eyebrow">
            <ClipboardCheck size={16} />
            導入完了セルフチェック
          </span>
          <h2>この8項目が埋まったら、YMM4側の編集へ進めます</h2>
          <p>
            公開配布後に触る段階では、ここまで確認できれば「使ってできる」状態です。
            途中で止まった項目は、右端のリンクから該当手順へ戻れます。
          </p>
        </div>
        <div className="instruction-self-check__score" aria-live="polite">
          <strong>{checkedCount}</strong>
          <span>/ {completionGateItems.length} 完了</span>
        </div>
      </div>

      <div className="instruction-self-check__meter" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>

      <div className="instruction-self-check__grid">
        {completionGateItems.map((item) => {
          const inputId = `completion-gate-${item.id}`
          const checked = checkedIds.includes(item.id)
          const route = item.href.startsWith('#') ? (
            <a href={item.href}>該当手順へ</a>
          ) : (
            <Link to={item.href}>関連ページへ</Link>
          )

          return (
            <article key={item.id} className={checked ? 'is-checked' : undefined}>
              <label htmlFor={inputId}>
                <input
                  id={inputId}
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggle(item.id)}
                />
                <span aria-hidden="true">
                  <CheckCircle2 size={17} />
                </span>
                <strong>{item.title}</strong>
              </label>
              <p>{item.body}</p>
              {route}
            </article>
          )
        })}
      </div>
    </InteractiveCard>
  )
}

export function DownloadPage() {
  const downloadReady = productFacts.downloadReady.value

  return (
    <>
      <PageMeta
        title="ダウンロード｜配布条件と公開状況の確認"
        description="ゆっくりまとめプロセッサーの配布条件、ファイル名、サイズ、SHA256、初回起動、YMM4パス設定、導入完了判定を確認できます。"
        keywords="ダウンロード, Windows, YMM4, 台本取得, CSV, .ymmp, ゆっくりまとめプロセッサー"
        path="/download/"
      />

      <main className="brand-shell">
        <PageIntro
          kicker="ダウンロード"
          title="配布条件と公開状況を確認する"
          lead="Windows環境で使う前に、配布候補、署名、直接取得CTAの有無、YMM4前提を確認します"
          actions={[
            { label: '配布情報を見る', href: '#distribution-files', variant: 'primary' },
            { label: '使い方を見る', href: '/instructions/', variant: 'ghost' },
          ]}
          flowLinks={[
            { label: 'FAQを見る', href: '/faq/' },
            { label: '料金を確認', href: '/purchase/' },
            { label: '実画面・サンプルを見る', href: '/samples/' },
          ]}
          media={
            <InteractiveCard className="page-visual-card premium-glass">
              <img
                className="page-visual-card__image"
                src="/product_get_script.webp"
                alt="ゆっくりまとめプロセッサーで記事URLから候補を取得する実アプリ画面"
              />
              <div className="page-visual-card__meta">
                <strong>実アプリ画面で、URL取得の入口を確認</strong>
                <span>ダウンロード後はYMM4パス、保存先、対象URLの順で進めます。</span>
              </div>
            </InteractiveCard>
          }
        />

        <Section>
          <MetricStrip items={[...downloadMetrics]} ariaLabel="ダウンロードページの要点" />
        </Section>

        <Section id="distribution-files" alt>
          <ReleaseIntegrityPanel />

          <div className="download-choice-board" aria-label="配布ファイルの選び方">
            {downloadChoiceCards.map((item) => {
              const ChoiceIcon = item.Icon
              return (
                <InteractiveCard key={item.title} className="release-panel premium-glass download-choice-card">
                  <div className="download-choice-card__head">
                    <span className="download-choice-card__icon" aria-hidden="true">
                      <ChoiceIcon size={19} />
                    </span>
                    <div>
                      <span className="subpage-card__eyebrow">{item.label}</span>
                      <h2>{item.title}</h2>
                    </div>
                  </div>
                  <p>{item.body}</p>
                  <code>
                    <strong>{item.shortName}</strong>
                    <span>{item.fileName}</span>
                  </code>
                  <ul>
                    {item.goodFor.map((point) => (
                      <li key={point}>
                        <CheckCircle2 size={15} />
                        {point}
                      </li>
                    ))}
                  </ul>
                  {downloadReady ? (
                    <a href={item.href} rel="noreferrer">
                      <span>このファイルを取得</span>
                      <ArrowRight size={15} />
                    </a>
                  ) : (
                    <span className="download-choice-card__pending">直接取得は確認完了後に表示します</span>
                  )}
                </InteractiveCard>
              )
            })}
          </div>

          <div className="subpage-section-head distribution-readiness-head">
            <p>配布物の完成度</p>
            <h2>取得してから導入完了まで、確認項目を一画面で見る</h2>
            <p>
              配布ファイルの取り違え、ZIPの開きっぱなし、YMM4パス未設定、保存先エラーで止まらないように、
              ダウンロード前後で見る項目を分けています。
            </p>
          </div>

          <div className="distribution-readiness-board">
            <div className="distribution-readiness-grid">
              {distributionReadinessCards.map((item) => {
                const ItemIcon = item.Icon
                return (
                  <InteractiveCard key={item.title} className="release-panel premium-glass distribution-readiness-card">
                    <span className="distribution-readiness-card__icon" aria-hidden="true">
                      <ItemIcon size={20} />
                    </span>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                    <ul>
                      {item.done.map((point) => (
                        <li key={point}>
                          <BadgeCheck size={15} />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </InteractiveCard>
                )
              })}
            </div>

            <InteractiveCard className="distribution-completion-panel premium-glass">
              <div>
                <span className="subpage-card__eyebrow">
                  <ClipboardCheck size={16} />
                  導入完了チェック
                </span>
                <h2>ここまで確認できたら、使い方ページの手順へ進めます</h2>
                <p>
                  ダウンロードページでは「安全確認」と「初回起動」までを扱います。URL取得、台本整理、
                  CSV/.ymmp前準備の細かい操作は、次に使い方ページで確認してください。
                </p>
              </div>
              <ul className="distribution-completion-list">
                {distributionCompletionChecks.map((item) => (
                  <li key={item}>
                    <CheckCircle2 size={16} />
                    {item}
                  </li>
                ))}
              </ul>
            </InteractiveCard>
          </div>

          <div className="subpage-section-head distribution-check-head">
            <p>配布物チェック</p>
            <h2>ダウンロード前後に確認すること</h2>
          </div>

          <div className="distribution-check-grid">
            {distributionChecks.map((item) => (
              <InteractiveCard key={item.title} className="release-panel premium-glass distribution-check-card">
                <span className="subpage-card__eyebrow">{item.title}</span>
                <p>{item.body}</p>
              </InteractiveCard>
            ))}
          </div>
        </Section>

        <Section alt>
          <GuideSceneSwitcher
            title="導入手順"
            lead="解凍して起動し、YMM4パスを設定してからURLを入力する"
            scenes={downloadScenes}
            ariaLabel="ダウンロード後の確認手順"
          />
        </Section>

        <Section>
          <div className="subpage-card-grid subpage-card-grid--3">
            <InteractiveCard className="release-panel premium-glass subpage-card">
              <span className="subpage-card__eyebrow">{downloadSupportCards[0].eyebrow}</span>
              <h2>{downloadSupportCards[0].title}</h2>
              <p>{downloadSupportCards[0].body}</p>
              <ul className="brand-list subpage-card__list">
                {downloadSupportCards[0].items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </InteractiveCard>

            <InteractiveCard className="release-panel premium-glass subpage-card">
              <span className="subpage-card__eyebrow">{downloadSupportCards[1].eyebrow}</span>
              <h2>{downloadSupportCards[1].title}</h2>
              <p>{downloadSupportCards[1].body}</p>
              <ul className="brand-list subpage-card__list">
                {downloadSupportCards[1].items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </InteractiveCard>

            <InteractiveCard className="release-panel premium-glass subpage-card">
              <span className="subpage-card__eyebrow">{downloadSupportCards[2].eyebrow}</span>
              <h2>{downloadSupportCards[2].title}</h2>
              <p>{downloadSupportCards[2].body}</p>
              <div className="subpage-link-stack">
                {downloadSupportCards[2].links.map((item) => (
                  <Link key={item.href} to={item.href}>
                    <span>{item.label}</span>
                    <ArrowRight size={16} />
                  </Link>
                ))}
              </div>
            </InteractiveCard>
          </div>
        </Section>
      </main>
    </>
  )
}

export function InstructionsPage() {
  return (
    <>
      <PageMeta
        title="使い方｜記事URLから台本を取得しYMM4に渡す手順"
        description="記事URL・スレッドURLから台本を取得し、YMM4パス設定、台本整理、CSV/.ymmp前準備、YMM4確認、導入完了セルフチェックまでを実画面付きの手順書として解説します。"
        keywords="使い方, 初期設定, YMM4, 台本取得, CSV, .ymmp, AI補助, 手順"
        path="/instructions/"
      />

      <main className="brand-shell">
        <PageIntro
          kicker="使い方ガイド"
          title="記事URLから台本を取得し、YMM4に渡すまでの手順"
          lead="ダウンロード、解凍、起動、YMM4パス設定、URL入力、台本整理、CSV/.ymmp前準備、YMM4確認の順に進めます"
          actions={[
            { label: '配布条件を確認', href: downloadUrl, variant: 'primary' },
            { label: 'FAQを見る', href: '/faq/', variant: 'ghost' },
          ]}
          flowLinks={[
            { label: '料金を確認', href: '/purchase/' },
            { label: 'お問い合わせ', href: '/contact/' },
          ]}
          media={
            <InteractiveCard className="page-visual-card premium-glass">
              <img
                className="page-visual-card__image"
                src="/product_get_script.webp"
                alt="URL入力と記事候補取得の実アプリ画面"
              />
              <div className="page-visual-card__meta">
                <strong>URL入力から候補取得まで、実画面で確認</strong>
                <span>各ステップでは押す場所、入力するもの、成功状態を分けて確認します。</span>
              </div>
            </InteractiveCard>
          }
        />

        <Section>
          <MetricStrip items={[...instructionMetrics]} ariaLabel="使い方ガイドの要点" />
        </Section>

        <Section>
          <InteractiveCard className="instruction-ready-board premium-glass">
            <div className="instruction-ready-board__head">
              <span className="subpage-card__eyebrow">
                <ClipboardCheck size={16} />
                操作前に用意するもの
              </span>
              <h2>先に4つだけ揃えると、手順の途中で止まりにくい</h2>
              <p>
                使い方ページは、YMM4パス、保存先、少数URLを用意してから読むとそのまま実践できます。
                外部APIキーは、連携機能を使う段階で設定すれば十分です。
              </p>
            </div>

            <div className="instruction-ready-board__grid" aria-label="操作前の準備物">
              {instructionPrepCards.map((item) => {
                const PrepIcon = item.Icon
                return (
                  <article key={item.title} className="instruction-ready-card">
                    <span className="instruction-ready-card__label">{item.label}</span>
                    <span className="instruction-ready-card__icon" aria-hidden="true">
                      <PrepIcon size={18} />
                    </span>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                    <strong>{item.check}</strong>
                  </article>
                )
              })}
            </div>
          </InteractiveCard>
        </Section>

        <Section>
          <div className="instruction-practice-path">
            <div className="subpage-section-head instruction-manual-head instruction-practice-path__head">
              <p>初回30分の進め方</p>
              <h2>まず少数URLで、YMM4へ渡す直前まで通す</h2>
              <p>
                最初から大量取得やPremium購入を判断せず、起動、設定、URL取得、台本確認、出力先確認までを短く通します。
              </p>
            </div>

            <div className="instruction-practice-path__grid" aria-label="初回30分で確認する手順">
              {instructionPracticePath.map((item) => {
                const PracticeIcon = item.Icon
                return (
                  <InteractiveCard key={item.title} className="instruction-practice-card premium-glass">
                    <div className="instruction-practice-card__top">
                      <span>{item.time}</span>
                      <PracticeIcon size={18} aria-hidden="true" />
                    </div>
                    <h3>{item.title}</h3>
                    <dl>
                      <div>
                        <dt>見る画面</dt>
                        <dd>{item.screen}</dd>
                      </div>
                      <div>
                        <dt>やること</dt>
                        <dd>{item.do}</dd>
                      </div>
                      <div>
                        <dt>次へ進む条件</dt>
                        <dd>{item.done}</dd>
                      </div>
                    </dl>
                    <a href={item.href}>
                      該当手順へ
                      <ArrowRight size={15} />
                    </a>
                  </InteractiveCard>
                )
              })}
            </div>
          </div>
        </Section>

        <Section className="instruction-route-section">
          <div className="subpage-section-head instruction-manual-head">
            <p>最短ルート</p>
            <h2>最初に見る順番を固定して、該当手順へ移動する</h2>
            <p>長い説明を全部読む前に、いま確認したい段階へ直接進めます。</p>
          </div>

          <nav className="instruction-route-grid" aria-label="使い方ガイドの最短ルート">
            {instructionQuickRoute.map((item) => {
              const RouteIcon = item.Icon
              return (
                <a key={item.href} className="instruction-route-card" href={item.href}>
                  <img src={item.image} alt="" loading="lazy" decoding="async" aria-hidden="true" />
                  <span>
                    <RouteIcon size={15} />
                    STEP {item.step}
                  </span>
                  <strong>{item.title}</strong>
                  <small>{item.result}</small>
                </a>
              )
            })}
          </nav>
        </Section>

        <Section>
          <div className="subpage-section-head instruction-manual-head">
            <p>到達目標</p>
            <h2>このページで「使ってできる」状態まで進める</h2>
          </div>

          <div className="instruction-goal-grid">
            {instructionGoalCards.map((goal) => {
              const GoalIcon = goal.Icon
              return (
                <InteractiveCard key={goal.title} className="instruction-goal-card premium-glass">
                  <span className="instruction-goal-card__icon" aria-hidden="true">
                    <GoalIcon size={21} />
                  </span>
                  <h3>{goal.title}</h3>
                  <p>{goal.body}</p>
                  <ul>
                    {goal.done.map((item) => (
                      <li key={item}>
                        <CheckCircle2 size={15} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </InteractiveCard>
              )
            })}
          </div>

          <div className="instruction-feature-goal-map">
            <div className="instruction-feature-goal-map__head">
              <span className="subpage-card__eyebrow">
                <ClipboardCheck size={16} />
                機能別ゴールマップ
              </span>
              <h2>各機能で「できた」と言える状態を先に決める</h2>
              <p>
                画面を眺めるだけで終わらせず、設定、URL取得、台本整理、CSV/.ymmp前準備、
                題材確認、YMM4確認までを順番に照合します。
              </p>
            </div>

            <div className="instruction-feature-goal-grid">
              {instructionFeatureGoalMap.map((item) => {
                const FeatureIcon = item.Icon
                const route = item.href.startsWith('#') ? (
                  <a href={item.href}>
                    該当手順へ
                    <ArrowRight size={15} />
                  </a>
                ) : (
                  <Link to={item.href}>
                    実画面を見る
                    <ArrowRight size={15} />
                  </Link>
                )

                return (
                  <InteractiveCard key={item.step} className="instruction-feature-goal-card premium-glass">
                    <figure>
                      <img
                        src={item.image}
                        alt={item.alt}
                        loading={item.step === '01' || item.step === '02' ? 'eager' : 'lazy'}
                        decoding="async"
                      />
                    </figure>
                    <div className="instruction-feature-goal-card__body">
                      <span>
                        <FeatureIcon size={16} />
                        {item.step} {item.title}
                      </span>
                      <dl>
                        <div>
                          <dt>やること</dt>
                          <dd>{item.goal}</dd>
                        </div>
                        <div>
                          <dt>成功状態</dt>
                          <dd>{item.success}</dd>
                        </div>
                      </dl>
                      {route}
                    </div>
                  </InteractiveCard>
                )
              })}
            </div>
          </div>

          <InteractiveCard className="instruction-completion-panel premium-glass">
            <div>
              <span className="subpage-card__eyebrow">
                <ClipboardCheck size={16} />
                完了判定
              </span>
              <h2>ここまで確認できたら、YMM4側の編集へ進めます</h2>
              <p>
                ゆっくりまとめプロセッサーは動画完成を保証する道具ではなく、YMM4を開く前の前工程を揃える道具です。
                下の項目が揃えば、次はYMM4側で音声、字幕、立ち絵、間合いを確認します。
              </p>
            </div>
            <ul className="instruction-completion-list">
              {completionChecks.map((item) => (
                <li key={item}>
                  <BadgeCheck size={16} />
                  {item}
                </li>
              ))}
            </ul>
          </InteractiveCard>

          <InstructionCompletionChecklist />
        </Section>

        <Section alt>
          <div className="subpage-section-head instruction-manual-head">
            <p>操作手順</p>
            <h2>押す場所、入力するもの、成功状態を分けて確認する</h2>
          </div>

          <div className="instruction-manual-grid">
            {instructionSteps.map((step) => {
              const StepIcon = step.Icon
              return (
                <InteractiveCard
                  key={step.number}
                  id={`instruction-step-${step.number}`}
                  as="article"
                  className="instruction-step-card premium-glass"
                >
                  <figure className="instruction-step-card__media">
                    <img src={step.image} alt={step.alt} loading="lazy" decoding="async" />
                  </figure>
                  <div className="instruction-step-card__body">
                    <span className="instruction-step-card__number">
                      <StepIcon size={16} />
                      STEP {step.number}
                    </span>
                    <h3>{step.title}</h3>
                    <dl className="instruction-step-card__details">
                      <div>
                        <dt>やること</dt>
                        <dd>{step.action}</dd>
                      </div>
                      <div>
                        <dt>入力するもの</dt>
                        <dd>{step.input}</dd>
                      </div>
                      <div>
                        <dt>押す場所</dt>
                        <dd>{step.click}</dd>
                      </div>
                      <div>
                        <dt>成功状態</dt>
                        <dd>{step.success}</dd>
                      </div>
                    </dl>
                    <div className="instruction-step-card__trouble">
                      <strong>詰まったら</strong>
                      <ul>
                        {step.trouble.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </InteractiveCard>
              )
            })}
          </div>
        </Section>

        <Section>
          <div className="subpage-section-head instruction-manual-head">
            <p>失敗時の確認</p>
            <h2>原因は、設定・URL・保存先の順に切り分ける</h2>
          </div>

          <div className="instruction-trouble-grid">
            {instructionTroubleCards.map((card) => (
              <InteractiveCard key={card.title} className="release-panel premium-glass subpage-card instruction-trouble-card">
                <span className="subpage-card__eyebrow">確認</span>
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

          <InteractiveCard className="release-panel premium-glass subpage-support-callout instruction-support-callout">
            <div>
              <span className="subpage-card__eyebrow">問い合わせ</span>
              <h2>それでも詰まるときは、状況をまとめて送る</h2>
              <p>
                OS、対象URL、YMM4パス、保存先、発生時刻、エラー全文またはスクリーンショットがあると切り分けが速くなります。
              </p>
            </div>
            <div className="subpage-support-callout__actions">
              <Link className="brand-btn brand-btn--ghost" to="/faq/">
                よくあるトラブルを確認
              </Link>
              <Link className="brand-btn brand-btn--primary" to="/contact/">
                問い合わせる
              </Link>
            </div>
          </InteractiveCard>
        </Section>
      </main>
    </>
  )
}
