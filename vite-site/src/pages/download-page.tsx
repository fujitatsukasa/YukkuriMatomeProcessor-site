import { Link } from 'react-router-dom'
import { InteractiveCard, PageIntro, PageMeta, Section } from '@/components/ui'
import { media } from '@/data/assets'
import { downloadUrl } from '@/data/site-content'

const onboardingChecks = [
  'Windows 10 / 11 環境であること',
  'YMM4 の実行ファイルパスを指定できること',
  '解凍先フォルダに書き込み権限があること',
  '必要に応じて YouTube API キーを用意できること',
] as const

const initialVerificationPoints = [
  '対応サイトからの台本取得と基本編集の流れ',
  'テンプレート運用の入口と内蔵ガイド',
  'YMM4出力と保存先の整合',
  'AI文章校正・感情分析・改行補助の使いどころ',
] as const

const supportBundle = [
  '対象URLと対応サイト名',
  '再現手順と発生時刻',
  'YMM4実行パスと保存先設定',
  'エラーメッセージ全文またはスクリーンショット',
] as const

export function DownloadPage() {
  return (
    <>
      <PageMeta
        title="ダウンロード"
        description="最新版ダウンロード、Windows / YMM4 の前提、初回導入で確認できる機能、サポートに渡すべき情報をまとめて確認できます。"
        keywords="ダウンロード, 初回導入, YMM4, テンプレート運用, 導入前チェック, ゆっくりまとめプロセッサー"
        image={media.modernWorkspace}
        path="/download/"
      />

      <main className="brand-shell">
        <PageIntro
          kicker="ダウンロード"
          title="最新版を入手する"
          lead="Windows / YMM4 の前提を確認し、そのまま初回導入の動作確認に入れます"
          actions={[
            { label: '最新版をダウンロード', href: downloadUrl, variant: 'primary', external: true },
            { label: '使い方を見る', href: '/instructions/', variant: 'ghost' },
          ]}
          media={
            <InteractiveCard className="page-visual-card premium-glass">
              <img
                className="page-visual-card__image"
                src="/generated/template-ops-studio-v1.png"
                alt="テンプレート運用、台本作成、YMM4前準備までをまとめたスタジオビジュアル"
              />
              <div className="page-visual-card__meta">
                <strong>初回導入で確認すべきのは、単発取得ではなく運用全体</strong>
                <span>対応サイト取得、テンプレート運用、YMM4前準備までの相性をここで確認します。</span>
              </div>
            </InteractiveCard>
          }
        />

        <Section>
          <div className="brand-grid brand-grid--2">
            <InteractiveCard className="release-panel premium-glass">
              <h2>導入前チェック</h2>
              <ul className="brand-list">
                {onboardingChecks.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="brand-inline-actions" style={{ marginTop: '2rem' }}>
                <a className="brand-btn brand-btn--primary" href={downloadUrl}>
                  最新版をダウンロード
                </a>
              </div>
            </InteractiveCard>

            <InteractiveCard className="release-panel premium-glass">
              <h2>初回導入でまず確認できること</h2>
              <ul className="brand-list">
                {initialVerificationPoints.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p style={{ color: 'rgba(255,255,255,0.58)', marginBottom: 0 }}>
                まずは Free で流れを確認し、継続投稿や複数運用が見えた段階で上位プランへ進むのが自然です。
              </p>
            </InteractiveCard>
          </div>
        </Section>

        <Section alt>
          <div className="brand-grid brand-grid--2">
            <InteractiveCard className="release-panel premium-glass">
              <h2>導入の流れ</h2>
              <ol className="brand-list">
                <li>ZIP をダウンロードして任意のフォルダへ解凍</li>
                <li>`YukkuriMatomeProcessor.exe` を起動し、YMM4実行パスと保存先を設定</li>
                <li>対応サイト取得、基本編集、YMM4出力の順で動作確認</li>
                <li>必要に応じてテンプレート運用や YouTube 分析の設定を追加</li>
              </ol>
              <p style={{ marginBottom: 0 }}>
                詳しい画面単位の流れは <Link to="/instructions/">使い方ガイド</Link> で確認できます。
              </p>
            </InteractiveCard>

            <InteractiveCard className="release-panel premium-glass">
              <h2>問い合わせ時にあると速い情報</h2>
              <ul className="brand-list">
                {supportBundle.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p style={{ color: 'rgba(255,255,255,0.58)', marginBottom: 0 }}>
                YouTube 分析で詰まっている場合は、API キー設定の有無もあわせて共有してください。
              </p>
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
        title="使い方ガイド"
        description="初期設定、対応サイト取得、テンプレート運用、YMM4前準備、失敗時の対処をまとめた公式ガイドです。"
        keywords="使い方, 初期設定, テンプレート運用, YMM4, 台本取得, AI補助"
        image={media.verticalMonitor}
        path="/instructions/"
      />

      <main className="brand-shell">
        <PageIntro
          kicker="使い方ガイド"
          title="初期設定から編集開始まで"
          lead="テンプレート運用まで見据えて、最短で安定運用に入るためのガイド"
        />

        <Section>
          <div className="content-page">
            <h2>手順1：初期設定（必須）</h2>
            <p>初回起動時はまず設定を完了させる必要があります。</p>
            <ul className="brand-list">
              <li><strong>YMM4実行ファイルの指定:</strong> 設定画面から `YukkuriMovieMaker4.exe` の絶対パスを登録します。</li>
              <li><strong>台本保存先の固定:</strong> 出力されるCSVや素材の保存先フォルダを指定します。</li>
              <li><strong>YouTube分析の利用準備:</strong> 分析機能を使う場合は YouTube API キーの設定を行います。</li>
            </ul>

            <h2 style={{ marginTop: '3rem' }}>手順2：台本・スレッドの取得</h2>
            <ol className="brand-list">
              <li>対象のまとめサイトやスレッドURLを画面上部の入力欄に指定</li>
              <li>「記事一覧取得」を実行して、動画化したい候補を選択</li>
              <li>「台本取得と整形」を実行し、必要なら AI 補助で文章を整えます</li>
            </ol>

            <h2 style={{ marginTop: '3rem' }}>手順3：テンプレートとYMM4前準備</h2>
            <ul className="brand-list">
              <li><strong>テンプレート運用:</strong> `.ymmp` からフォーマット追加を行い、動画の型を増やしていきます。</li>
              <li><strong>YMM4編集準備:</strong> CSVからのプロジェクト作成、キャラクター集保存、立ち絵パス一括変更を必要に応じて使います。</li>
              <li><strong>読み方監査:</strong> 読み上げ前に気になる語の監査を行い、YMM4での修正コストを減らします。</li>
            </ul>

            <h2 style={{ marginTop: '3rem' }}>手順4：YMM4へ受け渡し</h2>
            <p>整形結果とテンプレート設定を確認し、問題がなければ「YMM4を開く」ボタンでプロジェクトファイルを出力して編集作業へ進みます。</p>

            <h2 style={{ marginTop: '3rem' }}>よくあるトラブル</h2>
            <ul className="brand-list">
              <li><strong>YMM4連携に失敗する:</strong> 実行ファイルパスが間違っている可能性があります。</li>
              <li><strong>保存エラー:</strong> 保存先フォルダがRead-Only（書き込み不可）になっている可能性があります。別のフォルダを選んでください。</li>
              <li><strong>YouTube分析が動かない:</strong> API キー設定とクォータ状態を確認してください。</li>
            </ul>
            <p><Link to="/faq/">その他のトラブルシューティングはこちら</Link></p>
          </div>
        </Section>
      </main>
    </>
  )
}
