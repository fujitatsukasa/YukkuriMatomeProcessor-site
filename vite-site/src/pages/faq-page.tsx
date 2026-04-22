import { Link } from 'react-router-dom'
import { InteractiveCard, PageIntro, PageMeta, Section } from '@/components/ui'
import { media } from '@/data/assets'
import { faqGroups, supportChannels } from '@/data/site-content'
import { MetricStrip } from '@/pages/shared'

const faqCategoryMeta: Record<
  string,
  {
    lead: string
    cue: string
  }
> = {
  'faq-general': {
    lead: '何のツールか、誰向けか、導入前に読むべき順番をまとめています。',
    cue: '全体像を先に掴む',
  },
  'faq-onboarding': {
    lead: '最初に揃える設定、対応OS、チーム導入時の前提を整理しています。',
    cue: '導入時の迷いを減らす',
  },
  'faq-script': {
    lead: '対応サイト取得、URLエラー、件数が多いときの運用方針を確認できます。',
    cue: '台本取得の詰まりどころを見る',
  },
  'faq-settings': {
    lead: 'YMM4パス、保存先、テンプレート方針、YouTube分析の前提をまとめています。',
    cue: '設定を固定する',
  },
  'faq-trouble': {
    lead: '起動失敗、YMM4連携、保存エラー、問い合わせ時の必要情報を整理しています。',
    cue: '切り分けを早くする',
  },
  'faq-purchase': {
    lead: '料金、課金導線、プラン変更、契約相談に関する前提をまとめています。',
    cue: '契約まわりを確認する',
  },
}

const faqMetrics = [
  {
    value: `${faqGroups.length}カテゴリ`,
    label: '導入前後の疑問を整理',
    detail: '全般 / 導入 / 台本取得 / 設定 / トラブル / 購入・契約',
  },
  {
    value: `${faqGroups.reduce((sum, group) => sum + group.items.length, 0)}項目`,
    label: '現行機能ベースで案内',
    detail: '追加予定機能とは分けて掲載',
  },
  {
    value: '2営業日',
    label: 'サポート一次回答の目安',
    detail: '解決しない場合の窓口も下部に明示',
  },
] as const

export function FaqPage() {
  return (
    <>
      <PageMeta
        title="FAQ"
        description="テンプレート運用、導入、台本取得、設定、トラブル、購入・契約のカテゴリごとに疑問を整理したFAQです。"
        keywords="FAQ, 質問, トラブルシューティング, サポート, 購入条件, テンプレート運用"
        image={media.goldMetallic}
        path="/faq/"
      />

      <main className="brand-shell">
        <PageIntro
          kicker="FAQ"
          title="導入前後によくある質問"
          lead="テンプレート運用、YMM4連携、課金、トラブルをカテゴリごとに整理しています"
          actions={[
            { label: '無料で始める', href: '/download/', variant: 'primary' },
            { label: 'お問い合わせ', href: '/contact/', variant: 'ghost' },
          ]}
          flowLinks={[
            { label: '機能と使い方', href: '/instructions/' },
            { label: '料金を見る', href: '/purchase/' },
          ]}
          media={
            <InteractiveCard className="page-visual-card premium-glass">
              <img className="page-visual-card__image" src="/product_guide.png" alt="初期設定とガイド画面" />
              <div className="page-visual-card__meta">
                <strong>現行機能とサポート導線を一緒に確認できるFAQ</strong>
                <span>追加予定機能とは分け、今すぐ使える範囲だけで疑問を整理しています。</span>
              </div>
            </InteractiveCard>
          }
        />

        <Section>
          <MetricStrip items={[...faqMetrics]} ariaLabel="FAQページの要点" />
        </Section>

        <Section alt>
          <div className="subpage-section-head">
            <p>QUICK ROUTES</p>
            <h2>まずは自分の疑問に近い入口から入る</h2>
          </div>

          <div className="faq-category-grid">
            {faqGroups.map((group) => {
              const meta = faqCategoryMeta[group.id]

              return (
                <InteractiveCard key={group.id} className="release-panel premium-glass faq-category-card">
                  <a href={`#${group.id}`} className="faq-category-card__link">
                    <span className="subpage-card__eyebrow">{meta?.cue ?? 'FAQ'}</span>
                    <h2>{group.label}</h2>
                    <p>{meta?.lead}</p>
                    <ul className="faq-category-card__questions">
                      {group.items.slice(0, 2).map((item) => (
                        <li key={item.question}>{item.question}</li>
                      ))}
                    </ul>
                  </a>
                </InteractiveCard>
              )
            })}
          </div>
        </Section>

        <Section>
          <div className="faq-sections">
            {faqGroups.map((group) => {
              const meta = faqCategoryMeta[group.id]

              return (
                <section key={group.id} id={group.id} className="faq-section-block">
                  <div className="faq-section-block__head">
                    <div>
                      <p>{meta?.cue ?? 'FAQ'}</p>
                      <h2>{group.label}</h2>
                    </div>
                    <span>{group.items.length}件の質問</span>
                  </div>

                  <div className="faq-list" role="list">
                    {group.items.map((item, index) => (
                      <details key={item.question} className="faq-item" open={index === 0}>
                        <summary>{item.question}</summary>
                        <div className="faq-answer">{item.answer}</div>
                      </details>
                    ))}
                  </div>
                </section>
              )
            })}
          </div>
        </Section>

        <Section alt>
          <InteractiveCard className="release-panel premium-glass faq-support-rail">
            <div>
              <span className="subpage-card__eyebrow">SUPPORT ROUTE</span>
              <h2>解決しない場合は、窓口ごとの向き不向きを見て連絡する</h2>
              <p>記録を残したい相談はメール、短い確認はX、継続的なやり取りはDiscordやChatworkが向いています。</p>
            </div>

            <div className="faq-support-rail__channels">
              {supportChannels.map((channel) => (
                <a key={channel.name} href={channel.href} target={channel.href.startsWith('http') ? '_blank' : undefined} rel={channel.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                  <strong>{channel.name}</strong>
                  <span>{channel.description}</span>
                </a>
              ))}
            </div>

            <div className="subpage-support-callout__actions">
              <Link className="brand-btn brand-btn--ghost" to="/instructions/">
                使い方に戻る
              </Link>
              <Link className="brand-btn brand-btn--primary" to="/contact/">
                お問い合わせへ
              </Link>
            </div>
          </InteractiveCard>
        </Section>
      </main>
    </>
  )
}
