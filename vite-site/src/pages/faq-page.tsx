import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { InteractiveCard, PageMeta, Section } from '@/components/ui'
import { faqGroups, supportChannels } from '@/data/site-content'

const faqCategoryMeta: Record<
  string,
  {
    lead: string
    cue: string
  }
> = {
  'faq-general': {
    lead: 'まず仕様の全体像を掴みたいときの入口です。対応範囲、前提、見ておくべきページをまとめています。',
    cue: '全体像を先に把握する',
  },
  'faq-onboarding': {
    lead: '初回導入でつまずきやすい設定、対応OS、導入チェックの順番をまとめています。',
    cue: '導入の最初を整える',
  },
  'faq-script': {
    lead: '対応URLの取得、台本整形、AI補助の使いどころを整理しています。',
    cue: '台本取得まわりを見る',
  },
  'faq-settings': {
    lead: 'YMM4パス、保存先、テンプレート方針、YouTube分析の前提をまとめています。',
    cue: '設定を先に固める',
  },
  'faq-trouble': {
    lead: '起動失敗、YMM4連携、保存エラー、問い合わせ時の必要情報を整理しています。',
    cue: '困りごとを切り分ける',
  },
  'faq-purchase': {
    lead: '料金、課金導線、プラン変更、契約相談に関する前提をまとめています。',
    cue: '購入まわりを確認する',
  },
}

const faqQuickQueries = ['YMM4', '保存先', 'API キー', '解約', 'テンプレート', 'URL取得'] as const

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
  const topGroups = filteredGroups.slice(0, 4)

  return (
    <>
      <PageMeta
        title="FAQ"
        description="テンプレート運用、導入、台本取得、設定、トラブル、購入・契約のカテゴリごとに疑問を整理したFAQです。"
        keywords="FAQ, 質問, トラブルシューティング, サポート, 購入条件, テンプレート運用"
        path="/faq/"
      />

      <main className="brand-shell">
        <section className="utility-hero utility-hero--faq">
          <div className="utility-hero__shell">
            <div className="utility-hero__copy">
              <p className="brand-kicker">FAQ</p>
              <h1>まず疑問を片付ける</h1>
              <p className="brand-lead">
                導入、YMM4連携、課金、トラブルをカテゴリで探すのではなく、気になる語句でそのまま辿れる入口に変えています。
              </p>

              <label className="utility-search">
                <span>気になる語句をそのまま入力</span>
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="例: YMM4 / API キー / 保存先 / 解約"
                  aria-label="FAQ検索"
                />
              </label>

              <div className="utility-chip-list" role="list" aria-label="よく探される語句">
                {faqQuickQueries.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={`utility-chip${query === item ? ' is-active' : ''}`}
                    onClick={() => setQuery(item)}
                  >
                    {item}
                  </button>
                ))}
                {query ? (
                  <button type="button" className="utility-chip utility-chip--ghost" onClick={() => setQuery('')}>
                    検索をクリア
                  </button>
                ) : null}
              </div>
            </div>

            <InteractiveCard className="release-panel premium-glass utility-hero__panel">
              <span className="subpage-card__eyebrow">TOP ROUTES</span>
              <h2>今すぐ確認しやすい入口</h2>

              <div className="utility-stat-grid">
                <div className="utility-stat">
                  <strong>{visibleQuestionCount}件</strong>
                  <span>表示中の質問</span>
                </div>
                <div className="utility-stat">
                  <strong>{faqGroups.length}カテゴリ</strong>
                  <span>導入から契約までを整理</span>
                </div>
              </div>

              <div className="utility-route-list">
                {topGroups.map((group) => {
                  const meta = faqCategoryMeta[group.id]
                  return (
                    <a key={group.id} href={`#${group.id}`} className="utility-route-card">
                      <span>{meta?.cue ?? 'FAQ'}</span>
                      <strong>{group.label}</strong>
                      <p>{meta?.lead}</p>
                    </a>
                  )
                })}
              </div>

              <div className="utility-link-row">
                <Link to="/instructions/">機能と使い方</Link>
                <Link to="/purchase/">料金を見る</Link>
                <Link to="/contact/">問い合わせる</Link>
              </div>
            </InteractiveCard>
          </div>
        </section>

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
              <strong>この条件に一致する質問は見つかりませんでした。</strong>
              <p>別の語句で検索するか、解決しない場合はお問い合わせください。</p>
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
              <h2>解決しない場合は、使う窓口を先に固定する</h2>
              <p>設定確認を先に済ませたい導線、購入相談、継続利用の相談先を分けて、迷わず次へ進めるようにしています。</p>
            </div>

            <div className="faq-support-rail__channels">
              {supportChannels.map((channel) => (
                <a
                  key={channel.name}
                  href={channel.href}
                  target={channel.href.startsWith('http') ? '_blank' : undefined}
                  rel={channel.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
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
