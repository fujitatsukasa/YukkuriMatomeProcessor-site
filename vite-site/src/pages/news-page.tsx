import { Link } from 'react-router-dom'
import { InteractiveCard, PageIntro, PageMeta, Section } from '@/components/ui'
import { media } from '@/data/assets'
import { newsPosts } from '@/data/site-content'
import { NewsTimelineCard } from '@/pages/shared'

export function NewsPage() {
  return (
    <>
      <PageMeta
        title="お知らせ"
        description="台本取得・整形・YMM4連携準備など、ゆっくりまとめプロセッサー本体の機能更新と運用告知を確認できます。"
        keywords="お知らせ, 更新情報, リリース, サポート"
        image={media.goldBokeh}
        path="/news/"
      />
      <PageIntro
        kicker="お知らせ"
        title="最新のお知らせ"
        lead="公開日・要約・詳細リンクを時系列で確認できます。台本取得・整形・編集準備の改善点を中心に掲載します。"
        flowLinks={[
          { label: '次: 更新履歴を確認', href: '/update/' },
          { label: '次: ダウンロードへ進む', href: '/download/' },
          { label: '次: FAQを確認', href: '/faq/' },
          { label: '不明点はお問い合わせ', href: '/contact/' },
        ]}
      />

      <Section alt>
        <div className="brand-shell">
          <ol className="timeline">
            {newsPosts.map((post) => (
              <li key={post.path}>
                <NewsTimelineCard post={post} />
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section>
        <div className="brand-shell brand-grid brand-grid--2">
          <InteractiveCard className="brand-card premium-glass">
            <h2>機能確認ページ</h2>
            <ul className="brand-list">
              <li><Link to="/update/">アップデート履歴</Link>: 変更内容の時系列確認</li>
              <li><Link to="/faq/">FAQ</Link>: 導入・運用時の疑問解消</li>
            </ul>
          </InteractiveCard>
          <InteractiveCard className="brand-card premium-glass">
            <h2>次アクション</h2>
            <div className="brand-inline-actions">
              <Link className="brand-btn brand-btn--primary" to="/download/">無料で始める</Link>
              <Link className="brand-btn brand-btn--ghost" to="/contact/">お問い合わせ</Link>
            </div>
          </InteractiveCard>
        </div>
      </Section>
    </>
  )
}
