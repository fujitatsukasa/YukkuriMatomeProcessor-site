import { useMemo, useState } from 'react'
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
  const [query, setQuery] = useState('')

  const filteredGroups = useMemo(() => {
    const keyword = query.trim().toLowerCase()
    if (!keyword) {
      return faqGroups
    }

    return faqGroups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) =>
          `${item.question} ${item.answer}`.toLowerCase().includes(keyword),
        ),
      }))
      .filter((group) => group.items.length > 0)
  }, [query])

  const visibleQuestionCount = filteredGroups.reduce((sum, group) => sum + group.items.length, 0)

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
          <InteractiveCard className="release-panel premium-glass faq-discovery-panel">
            <div>
              <span className="subpage-card__eyebrow">SEARCH FAQ</span>
              <h2>質問文と回答文から、詰まりどころを先に絞り込む</h2>
              <p>設定、YMM4連携、URL取得、契約まわりまで、気になる語句でそのまま検索できます。</p>
            </div>

            <label className="faq-search">
              <span>検索キーワード</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="例: YMM4 / API キー / 保存先 / 解約"
                aria-label="FAQ検索"
              />
            </label>

            <div className="faq-discovery-panel__meta">
              <strong>{visibleQuestionCount}件</strong>
              <span>現在表示されている質問数</span>
            </div>
          </InteractiveCard>
        </Section>

        <Section>
          <div className="subpage-section-head">
            <p>QUICK ROUTES</p>
            <h2>まずは自分の疑問に近い入口から入る</h2>
          </div>

          {filteredGroups.length ? (
            <div className="faq-category-grid">
              {filteredGroups.map((group) => {
                const meta = faqCategoryMeta[group.id]

                return (
                  <InteractiveCard key={group.id} className="release-panel premium-glass faq-category-card">
                    <a href={`#${group.id}`} className="faq-category-card__link">
                      <span className="subpage-card__eyebrow">{meta?.cue ?? 'FAQ'}</span>
                      <h2>{group.label}</h2>
                      <p>{meta?.lead}</p>
                      <strong className="faq-category-card__count">{group.items.length}件の質問</strong>
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
          ) : (
            <InteractiveCard className="release-panel premium-glass faq-empty-state">
              <strong>この検索条件ではカテゴリ候補が見つかりませんでした。</strong>
              <p>語句を少し広げると、関連する質問が見つかりやすくなります。</p>
            </InteractiveCard>
          )}
        </Section>

        <Section>
          {filteredGroups.length ? (
            <div className="faq-sections">
              {filteredGroups.map((group) => {
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
          ) : (
            <InteractiveCard className="release-panel premium-glass faq-empty-state">
              <strong>該当する質問は見つかりませんでした。</strong>
              <p>別の語句で検索するか、解決しない場合はお問い合わせください。</p>
            </InteractiveCard>
          )}
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
