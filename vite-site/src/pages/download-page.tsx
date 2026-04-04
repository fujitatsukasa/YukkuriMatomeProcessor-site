import { Link } from 'react-router-dom'
import { PageIntro, PageMeta, Section } from '@/components/ui'
import { media } from '@/data/assets'
import { downloadUrl } from '@/data/site-content'

export function DownloadPage() {

  return (
    <>
      <PageMeta
        title="ダウンロード"
        description="最新版ダウンロード、導入前提、試用チェック、トラブル対応先をまとめて確認できます。"
        keywords="ダウンロード, 体験版, 試用, 導入前チェック, ゆっくりまとめプロセッサー"
        image={media.modernWorkspace}
        path="/download/"
      />

      <main className="brand-shell">
      <PageIntro
        kicker="ダウンロード"
        title="最新版を入手する"
        lead="導入前に必要な前提条件をご確認ください"
      />

      <Section>
        <div className="content-page">
          <div className="content-page__grid-2">
            <div>
              <h2>導入前チェック</h2>
              <ul className="brand-list">
                <li>Windows環境（Windows 10/11推奨）であること</li>
                <li>YMM4実行ファイルパスを指定できること</li>
                <li>解凍先フォルダに書き込み権限があること</li>
              </ul>
              <div className="brand-inline-actions" style={{ marginTop: '2rem' }}>
                <a className="brand-btn brand-btn--primary" href={downloadUrl}>
                  最新版をダウンロード（無料）
                </a>
              </div>
            </div>
            <div>
              <h2>導入の流れ</h2>
              <ol className="brand-list">
                <li>上のボタンから ZIP をダウンロード</li>
                <li>任意のフォルダに解凍して `YukkuriMatomeProcessor.exe` を起動</li>
                <li><Link to="/instructions/">使い方ガイド</Link> に沿って初回設定を行う</li>
              </ol>
            </div>
          </div>
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
        description="初期設定、台本取得、編集開始、失敗時の対処、Vite版のローカル実行手順をまとめた公式ガイドです。"
        keywords="使い方, 初期設定, 台本取得, ローカルプレビュー, Vite, React"
        image={media.verticalMonitor}
        path="/instructions/"
      />

      <main className="brand-shell">
      <PageIntro
        kicker="使い方ガイド"
        title="初期設定から編集開始まで"
        lead="最短で安定運用に入るための3ステップガイド"
      />

      <Section>
        <div className="content-page">
          <h2>手順1：初期設定（必須）</h2>
          <p>初回起動時はまず設定を完了させる必要があります。</p>
          <ul className="brand-list">
            <li><strong>YMM4実行ファイルの指定:</strong> 設定画面から `YukkuriMovieMaker4.exe` の絶対パスを登録します。</li>
            <li><strong>台本保存先の固定:</strong> 出力されるCSVや素材の保存先フォルダを指定します。</li>
          </ul>

          <h2 style={{ marginTop: '3rem' }}>手順2：台本・スレッドの取得</h2>
          <ol className="brand-list">
            <li>対象のまとめサイトやURLを画面上部の入力欄に指定</li>
            <li>「記事一覧取得」を実行して対象記事を選択</li>
            <li>「台本取得と整形」を実行</li>
          </ol>

          <h2 style={{ marginTop: '3rem' }}>手順3：YMM4へ受け渡し</h2>
          <p>整形結果を確認し、問題がなければ「YMM4を開く」ボタンでプロジェクトファイルを出力して編集作業へ進みます。</p>
          
          <h2 style={{ marginTop: '3rem' }}>よくあるトラブル</h2>
          <ul className="brand-list">
            <li><strong>YMM4連携に失敗する:</strong> 実行ファイルパスが間違っている可能性があります。</li>
            <li><strong>保存エラー:</strong> 保存先フォルダがRead-Only（書き込み不可）になっている可能性があります。別のフォルダを選んでください。</li>
          </ul>
          <p><Link to="/faq/">その他のトラブルシューティングはこちら</Link></p>
        </div>
      </Section>
      </main>
    </>
  )
}
