
import { PageIntro, PageMeta, Section } from '@/components/ui'
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
        lead="機能更新や運用に関する告知を時系列で掲載しています"
      />

      <Section>
        <div className="brand-shell content-page">
          <ol className="timeline">
            {newsPosts.map((post) => (
              <li key={post.path}>
                <NewsTimelineCard post={post} />
              </li>
            ))}
          </ol>
        </div>
      </Section>
    </>
  )
}
