import { Link } from 'react-router-dom'
import { InteractiveCard, PageIntro, PageMeta, Section } from '@/components/ui'
import { media } from '@/data/assets'


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
      <PageIntro
        kicker="ダウンロード"
        title="最新版を安全に入手する"
        lead="導入前提・試用チェック・トラブル時の対応先をまとめて確認できます"
      />

      <Section alt>
        <div className="brand-shell brand-grid brand-grid--2">
          <InteractiveCard className="release-panel premium-glass">
            <h2>導入前チェック</h2>
            <ul className="brand-list">
              <li>Windows環境で利用できること</li>
              <li>YMM4実行ファイルパスを設定できること</li>
              <li>解凍先フォルダに書き込み権限があること</li>
              <li>試用用フォルダを固定し、再現手順を記録できること</li>
            </ul>
          </InteractiveCard>
          <InteractiveCard className="release-panel premium-glass">
            <h2>試用時に確認する判断項目</h2>
            <ol className="brand-list">
              <li>台本取得から編集開始までを3ステップで完了できるか</li>
              <li>作業時間短縮が運用要件に合うか</li>
              <li>失敗時の復旧手順をチーム内で共有できるか</li>
              <li>契約前に必要な条件を把握できるか</li>
            </ol>
            <div className="brand-inline-actions">
              <Link className="brand-btn brand-btn--ghost" to="/purchase/">
                購入条件を見る
              </Link>
            </div>
          </InteractiveCard>
        </div>
      </Section>

      <Section>
        <div className="brand-shell brand-grid brand-grid--2">
          <InteractiveCard className="release-panel premium-glass">
            <h2>導入フロー</h2>
            <ol className="brand-list">
              <li>最新版をダウンロード</li>
              <li>解凍して起動</li>
              <li>使い方ページに沿って初期設定</li>
              <li>FAQとアップデート履歴で運用情報を確認</li>
            </ol>
          </InteractiveCard>
          <InteractiveCard className="release-panel premium-glass">
            <h2>問題が発生した場合</h2>
            <ul className="brand-list">
              <li><Link to="/faq/">FAQ</Link>で既知の対処を確認</li>
              <li>解決しない場合は <Link to="/contact/">お問い合わせ</Link> へ連絡</li>
              <li>連絡時はOS、手順、エラーメッセージを共有</li>
            </ul>
          </InteractiveCard>
        </div>
      </Section>

      <Section alt>
        <div className="brand-shell brand-grid brand-grid--2">
          <InteractiveCard className="brand-card premium-glass">
            <h2>導入判断の補助情報</h2>
            <ul className="brand-list">
              <li><Link to="/update/">アップデート履歴</Link>で変更点を確認</li>
              <li><Link to="/news/">お知らせ</Link>で運用関連情報を確認</li>
              <li><Link to="/legal/commercial-transactions/">特商法ページ</Link>で契約条件を確認</li>
            </ul>
          </InteractiveCard>
          <InteractiveCard className="brand-card premium-glass">
            <h2>次アクション</h2>
            <div className="brand-inline-actions">
              <Link className="brand-btn brand-btn--primary" to="/instructions/">使い方へ進む</Link>
              <Link className="brand-btn brand-btn--ghost" to="/faq/">FAQ</Link>
              <Link className="brand-btn brand-btn--ghost" to="/contact/">お問い合わせ</Link>
            </div>
          </InteractiveCard>
        </div>
      </Section>
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
      <PageIntro
        kicker="使い方ガイド"
        title="初期設定から編集開始までを3ステップで進める"
        lead="初期設定・台本取得・編集開始の順に、最短で安定運用に入るためのガイドです"
      />

      <Section>
        <div className="brand-shell brand-grid brand-grid--3">
          {[
            ['手順1 初期設定', 'YukkuriMovieMaker.exe の実行パスと台本保存先を固定します。'],
            ['手順2 台本取得', '対象URLから記事を選択し、編集用に整形済み台本を作成します。'],
            ['手順3 編集開始', '整形結果を確認し、YMM4への受け渡しと編集作業へ進みます。'],
          ].map(([title, body]) => (
            <InteractiveCard key={title} className="brand-card premium-glass">
              <h2>{title}</h2>
              <p>{body}</p>
            </InteractiveCard>
          ))}
        </div>
      </Section>

      <Section alt>
        <div className="brand-shell brand-grid brand-grid--2">
          <InteractiveCard className="brand-card premium-glass">
            <h2>初期設定（必須）</h2>
            <ul className="brand-list">
              <li>YMM4実行ファイルの絶対パスを登録</li>
              <li>台本保存先フォルダを運用単位で固定</li>
              <li>試用中は設定変更内容を記録</li>
              <li>権限エラーを防ぐため、書き込み可能フォルダを利用</li>
            </ul>
          </InteractiveCard>
          <InteractiveCard className="brand-card premium-glass">
            <h2>台本取得</h2>
            <ol className="brand-list">
              <li>対象サイトを選択</li>
              <li>記事一覧を取得</li>
              <li>使用する記事を選択</li>
              <li>台本をダウンロードして整形</li>
            </ol>
          </InteractiveCard>
          <InteractiveCard className="brand-card premium-glass">
            <h2>編集開始前チェック</h2>
            <ul className="brand-list">
              <li>不要行・注釈の除去が完了しているか</li>
              <li>見出しと本文の区切りが崩れていないか</li>
              <li>読み上げ速度・尺の確認をしたか</li>
            </ul>
          </InteractiveCard>
          <InteractiveCard className="brand-card premium-glass">
            <h2>よくある失敗</h2>
            <ul className="brand-list">
              <li>YMM4パス未設定で連携に失敗</li>
              <li>URL形式エラーで台本取得に失敗</li>
              <li>保存先権限不足で出力に失敗</li>
            </ul>
            <div className="brand-inline-actions">
              <Link className="brand-btn brand-btn--ghost" to="/faq/#faq-trouble">トラブルFAQへ</Link>
            </div>
          </InteractiveCard>
        </div>
      </Section>

      <Section>
        <div className="brand-shell brand-grid brand-grid--2">
          <InteractiveCard className="notice-box">
            <h2>開発者向けローカル実行（Vite 版）</h2>
            <ul className="brand-list">
              <li>初回のみ: <code>cd vite-site && npm install</code></li>
              <li>開発起動: <code>cd vite-site && npm run dev</code></li>
              <li>本番確認: <code>cd vite-site && npm run build && npm run preview</code></li>
              <li>VSCode 既定起動は <code>Serve: GUI (Default)</code></li>
            </ul>
          </InteractiveCard>
          <InteractiveCard className="notice-box">
            <h2>関連する研究系ページ</h2>
            <ul className="brand-list">
              <li>TechTouch動作研究は <code>TechTouch Lab: GUI</code></li>
              <li>CLI 起動は <code>serve_local.cmd --no-gui --open</code></li>
              <li>本 Vite 版が現行の公開サイト本体です</li>
            </ul>
          </InteractiveCard>
        </div>
      </Section>

      <Section alt>
        <div className="brand-shell brand-grid brand-grid--2">
          <InteractiveCard className="brand-card premium-glass">
            <h2>次アクション</h2>
            <ul className="brand-list">
              <li><Link to="/download/">ダウンロード</Link>で試用開始</li>
              <li><Link to="/faq/">FAQ</Link>で失敗例を確認</li>
              <li><Link to="/purchase/">購入</Link>で契約条件を確認</li>
              <li><Link to="/contact/">お問い合わせ</Link>で導入相談</li>
            </ul>
          </InteractiveCard>
          <InteractiveCard className="brand-card premium-glass">
            <h2>関連情報</h2>
            <div className="brand-inline-actions">
              <Link className="brand-btn brand-btn--ghost" to="/update/">アップデート履歴</Link>
              <Link className="brand-btn brand-btn--ghost" to="/news/">お知らせ</Link>
            </div>
          </InteractiveCard>
        </div>
      </Section>
    </>
  )
}
