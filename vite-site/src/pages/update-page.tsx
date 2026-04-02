import { Link } from 'react-router-dom'
import { InteractiveCard, PageIntro, PageMeta, Section } from '@/components/ui'
import { media } from '@/data/assets'
import { changeLogUrl, latestReleaseUrl, releasesUrl, tagsUrl } from '@/data/site-content'

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
      <PageIntro
        kicker="Release Hub"
        title="アップデート情報"
        lead="最新版の入手先とリリースノート・変更履歴を集約しています"
      />

      <Section>
        <div className="brand-shell brand-grid brand-grid--2">
          <InteractiveCard className="brand-card premium-glass">
            <h2>このページで確認できること</h2>
            <ul className="brand-list">
              <li>最新版の直接ダウンロード</li>
              <li>最新リリースノートへの導線</li>
              <li>過去バージョン一覧への導線</li>
            </ul>
          </InteractiveCard>
          <InteractiveCard className="brand-card premium-glass">
            <h2>運用メモ</h2>
            <p>更新前に現在の設定をバックアップし、変更後は必ず使い方ページとFAQを再確認してください。</p>
          </InteractiveCard>
        </div>
      </Section>

      <Section alt>
        <div className="brand-shell brand-grid brand-grid--2">
          <InteractiveCard className="release-panel premium-glass">
            <h2>リリースノート</h2>
            <p>最新の変更点は GitHub Releases の本文で確認できます。</p>
            <div className="release-list">
              <ul>
                <li><a href={latestReleaseUrl} target="_blank" rel="noopener noreferrer">最新リリースノートを開く</a></li>
                <li><a href={changeLogUrl} target="_blank" rel="noopener noreferrer">CHANGELOGを確認</a></li>
              </ul>
            </div>
          </InteractiveCard>
          <InteractiveCard className="release-panel premium-glass">
            <h2>過去バージョン</h2>
            <p>過去のリリース一覧は GitHub Releases ページで時系列に確認できます。</p>
            <div className="release-list">
              <ul>
                <li><a href={releasesUrl} target="_blank" rel="noopener noreferrer">全リリース一覧を開く</a></li>
                <li><a href={tagsUrl} target="_blank" rel="noopener noreferrer">タグ一覧を開く</a></li>
              </ul>
            </div>
          </InteractiveCard>
          <InteractiveCard className="release-panel premium-glass">
            <h2>更新時の確認ポイント</h2>
            <ul className="brand-list">
              <li>更新前に現在の設定をバックアップ</li>
              <li>作業手順に変更がある場合は使い方ページを再確認</li>
              <li>問題発生時はFAQとお問い合わせ窓口を利用</li>
            </ul>
            <div className="brand-inline-actions">
              <Link className="brand-btn brand-btn--ghost" to="/instructions/">使い方を確認</Link>
              <Link className="brand-btn brand-btn--ghost" to="/contact/">お問い合わせ</Link>
            </div>
          </InteractiveCard>
          <InteractiveCard className="release-panel premium-glass">
            <h2>関連ページ</h2>
            <ul className="brand-list">
              <li><Link to="/download/">ダウンロード</Link>で導入手順を確認</li>
              <li><Link to="/faq/">FAQ</Link>で既知の課題を確認</li>
              <li><Link to="/purchase/">購入条件</Link>を確認</li>
            </ul>
          </InteractiveCard>
        </div>
      </Section>
    </>
  )
}
