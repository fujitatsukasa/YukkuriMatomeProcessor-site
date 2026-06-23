import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { InteractiveCard, PageMeta, Section } from '@/components/ui'
import { faqGroups, supportChannels } from '@/data/site-content'
import {
  BadgeCheck,
  CreditCard,
  HelpCircle,
  Monitor,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'

const faqCategoryMeta: Record<
  string,
  {
    lead: string
    cue: string
  }
> = {
  'faq-general': {
    lead: 'このツールで何ができ、何ができないかを最初に確認できます。',
    cue: 'できることを見る',
  },
  'faq-onboarding': {
    lead: 'Windows、YMM4、保存先、初回起動でつまずきやすい点をまとめています。',
    cue: '導入前提を見る',
  },
  'faq-script': {
    lead: '対応URLの取得、取得できないときの確認、台本整形の使いどころを整理しています。',
    cue: 'URL取得を見る',
  },
  'faq-settings': {
    lead: 'YMM4パス、CSV/.ymmp保存先、外部APIキーの前提をまとめています。',
    cue: '設定を見る',
  },
  'faq-trouble': {
    lead: '起動失敗、YMM4連携、保存エラー、問い合わせ時の必要情報を整理しています。',
    cue: '困りごとを切り分ける',
  },
  'faq-purchase': {
    lead: 'FreeとPremiumの違い、Stripe Checkout、返金条件をまとめています。',
    cue: '料金と返金を見る',
  },
}

const faqQuickQueries = ['Mac', 'Windows', 'YMM4', '無料版', 'Premium', '返金', '自動', '収益化', 'URL取得', 'API キー'] as const

const faqGroupDisplayOrder = [
  'faq-onboarding',
  'faq-general',
  'faq-purchase',
  'faq-settings',
  'faq-script',
  'faq-trouble',
] as const

const faqHeroFacts = [
  {
    label: '対応環境',
    title: 'Windows 10 / 11 専用',
    body: 'Mac版はありません。YMM4を使うWindows環境で確認してください。',
    href: '#faq-onboarding',
  },
  {
    label: '前提ソフト',
    title: 'YMM4の利用が前提',
    body: 'このツールはYMM4を開く前の台本下地、CSV、.ymmp前準備を支援します。',
    href: '#faq-settings',
  },
  {
    label: '料金',
    title: 'Freeで試してPremium条件を確認',
    body: 'Premiumは39,800円の買い切りです。月額自動更新はありません。具体的な利用条件は確定後に案内します。',
    href: '#faq-purchase',
  },
] as const

const faqDecisionCards = [
  {
    title: 'Macでは使えません',
    body: '現時点ではWindows 10 / 11専用です。Mac、スマホ、ブラウザだけで完結するツールではありません。',
    note: '必要条件: Windows + YMM4',
    Icon: Monitor,
  },
  {
    title: '動画を丸ごと自動生成するツールではありません',
    body: '記事URL・スレッドURLから台本下地を作り、YMM4へ渡す前の準備を短くするツールです。',
    note: '最後はYMM4で見て直します',
    Icon: Sparkles,
  },
  {
    title: 'Premiumは買い切りです',
    body: '39,800円税込、月額なし、Stripe Checkoutの一度払いです。利用枠やPC台数は公開条件の確定待ちです。',
    note: '購入実行CTAは条件確定後に案内',
    Icon: CreditCard,
  },
  {
    title: '収益化や再生数は約束しません',
    body: '投稿結果は動画内容、チャンネル状況、各プラットフォームの審査に左右されます。',
    note: '素材・音声・引用元の規約確認も必要です',
    Icon: ShieldCheck,
  },
] as const

const priorityFaqQuestions = [
  'Macで使えますか？',
  'Windows専用ですか？',
  'YMM4は必須ですか？',
  '無料版では何ができますか？',
  'Premiumで何が変わりますか？',
  '外部APIキーは必要ですか？',
  '動画は自動で完成しますか？',
  'AIだけで動画を作れますか？',
  '対応していないURLは取得できますか？',
  '返金条件は何ですか？',
  '収益化は約束されますか？',
] as const

const getFaqGroupRank = (id: string) => {
  const rank = faqGroupDisplayOrder.findIndex((item) => item === id)
  return rank === -1 ? faqGroupDisplayOrder.length : rank
}

const orderedFaqGroups = [...faqGroups].sort((a, b) => getFaqGroupRank(a.id) - getFaqGroupRank(b.id))
const allFaqItems = orderedFaqGroups.flatMap((group) => group.items)
const priorityFaqItems = priorityFaqQuestions
  .map((question) => allFaqItems.find((item) => item.question === question))
  .filter((item): item is (typeof allFaqItems)[number] => Boolean(item))

const faqPageStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: priorityFaqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
}

export function FaqPage() {
  const [query, setQuery] = useState('')

  const filteredGroups = useMemo(() => {
    const keyword = query.trim().toLowerCase()
    if (!keyword) {
      return orderedFaqGroups
    }

    return orderedFaqGroups
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
        title="FAQ｜導入前によくある質問"
        description="Windows専用、Mac非対応、YMM4前提、無料版でできること、Premiumの価格と確認中条件、URL取得、APIキー、返金条件を導入前に確認できます。"
        keywords="FAQ, Windows, Mac, YMM4, 無料版, Premium, 返金, URL取得, APIキー"
        path="/faq/"
        structuredData={faqPageStructuredData}
      />

      <main className="brand-shell">
        <section className="utility-hero utility-hero--faq">
          <div className="utility-hero__shell">
            <div className="utility-hero__copy">
              <p className="brand-kicker">FAQ</p>
              <h1>導入前によくある質問</h1>
              <p className="brand-lead">
                Windows専用か、YMM4は必要か、無料版で何ができるか、Premiumの価格と確認中条件を購入前に確認できます。
              </p>

              <label className="utility-search">
                <span>気になる語句をそのまま入力</span>
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="例: Mac / YMM4 / Premium / 返金"
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
              <span className="subpage-card__eyebrow">先に結論</span>
              <h2>購入前に見るべき前提</h2>

              <div className="utility-stat-grid">
                <div className="utility-stat">
                  <strong>Windows</strong>
                  <span>Mac版はありません</span>
                </div>
                <div className="utility-stat">
                  <strong>YMM4</strong>
                  <span>編集前準備が主目的</span>
                </div>
              </div>

              <div className="faq-fast-answer-list">
                {faqHeroFacts.map((item) => (
                  <a key={item.title} href={item.href} className="faq-fast-answer-card">
                    <span>{item.label}</span>
                    <strong>{item.title}</strong>
                    <p>{item.body}</p>
                  </a>
                ))}
              </div>

              <div className="utility-link-row">
                <Link to="/instructions/">使い方を見る</Link>
                <Link to="/samples/">実画面を見る</Link>
                <Link to="/purchase/">料金を見る</Link>
                <Link to="/contact/">問い合わせる</Link>
              </div>
            </InteractiveCard>
          </div>
        </section>

        <Section>
          <div className="faq-decision-layout">
            <div className="subpage-section-head faq-decision-head">
              <p>購入前の結論</p>
              <h2>まず、この4つで合うか判断してください</h2>
            </div>

            <div className="faq-decision-grid">
              {faqDecisionCards.map((card) => {
                const DecisionIcon = card.Icon
                return (
                  <InteractiveCard key={card.title} className="release-panel premium-glass faq-decision-card">
                    <span className="faq-decision-card__icon" aria-hidden="true">
                      <DecisionIcon size={20} />
                    </span>
                    <h3>{card.title}</h3>
                    <p>{card.body}</p>
                    <strong>{card.note}</strong>
                  </InteractiveCard>
                )
              })}
            </div>
          </div>
        </Section>

        <Section alt>
          <div className="faq-priority-layout">
            <div className="faq-priority-copy">
              <span className="subpage-card__eyebrow">重要FAQ</span>
              <h2>導入前に確認されやすい質問</h2>
              <p>
                Windows専用、YMM4前提、無料版とPremium、返金、収益化の約束がないことを先に確認できます。
                細かい内容は下のカテゴリと検索で続けて探せます。
              </p>
              <div className="faq-priority-actions">
                <Link className="brand-btn brand-btn--primary" to="/download/">
                  Free版を試す
                </Link>
                <Link className="brand-btn brand-btn--ghost" to="/purchase/">
                  料金を見る
                </Link>
              </div>
            </div>

            <div className="faq-priority-list" role="list">
              {priorityFaqItems.map((item, index) => (
                <details key={item.question} className="faq-item faq-priority-item" open={index < 3}>
                  <summary>
                    <span>
                      {index < 3 ? <BadgeCheck size={17} aria-hidden="true" /> : <HelpCircle size={17} aria-hidden="true" />}
                      {item.question}
                    </span>
                  </summary>
                  <div className="faq-answer">{item.answer}</div>
                </details>
              ))}
            </div>
          </div>
        </Section>

        <Section>
          <div className="subpage-section-head">
            <p>質問カテゴリ</p>
            <h2>知りたい内容から選ぶ</h2>
            <p>{visibleQuestionCount}件の質問を表示中です。</p>
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
              <span className="subpage-card__eyebrow">問い合わせ</span>
              <h2>解決しない場合は状況を添えて問い合わせる</h2>
              <p>OS、対象URL、エラー全文、YMM4パス、保存先設定があると切り分けが速くなります。</p>
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
