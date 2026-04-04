import { Link } from 'react-router-dom'
import { PageIntro, PageMeta, Section } from '@/components/ui'
import { media } from '@/data/assets'
import { changeLogUrl, latestReleaseUrl, releasesUrl, tagsUrl, downloadUrl } from '@/data/site-content'

export function UpdatePage() {
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
                <a className="brand-btn brand-btn--primary" href={downloadUrl} target="_blank" rel="noopener noreferrer">最新版をダウンロード</a>
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
          <h2>変更履歴</h2>
          <p>各バージョンの変更点はCHANGELOGおよびGitHub Releasesで確認できます。</p>
          <div className="content-page__link-list">
            <a href={changeLogUrl} target="_blank" rel="noopener noreferrer">CHANGELOG を確認 →</a>
            <a href={releasesUrl} target="_blank" rel="noopener noreferrer">全リリース一覧 →</a>
            <a href={tagsUrl} target="_blank" rel="noopener noreferrer">タグ一覧 →</a>
          </div>
        </div>
      </Section>
      </main>
    </>
  )
}
