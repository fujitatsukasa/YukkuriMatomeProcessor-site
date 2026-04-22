import { Link } from 'react-router-dom'
import { InteractiveCard, PageIntro, PageMeta, Section } from '@/components/ui'
import { media } from '@/data/assets'
import { faqGroups } from '@/data/site-content'

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
      />

      <Section>
        <div className="content-page">
          <div className="brand-grid brand-grid--2" style={{ marginBottom: '3rem' }}>
            <InteractiveCard className="release-panel premium-glass">
              <h2>FAQの前提</h2>
              <p>
                現在案内しているのは、テンプレート運用、対応サイト取得、AI補助、YMM4前準備、YouTube分析などの
                <strong>現行機能</strong>です。追加予定の内容とは分けて整理しています。
              </p>
            </InteractiveCard>
            <InteractiveCard className="release-panel premium-glass">
              <h2>先に確認しておくと速いこと</h2>
              <ul className="brand-list">
                <li>Windows と YMM4 の前提</li>
                <li>YouTube分析では API キーが必要</li>
                <li>購入やアップグレードはアプリ内から行う</li>
              </ul>
            </InteractiveCard>
          </div>

          <div style={{ marginBottom: '4rem' }}>
            <h2>目次</h2>
            <ul className="brand-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
              <li><a href="#faq-general" style={{ color: '#8b9bb4' }}># 全般</a></li>
              <li><a href="#faq-onboarding" style={{ color: '#8b9bb4' }}># 導入</a></li>
              <li><a href="#faq-script" style={{ color: '#8b9bb4' }}># 台本取得</a></li>
              <li><a href="#faq-settings" style={{ color: '#8b9bb4' }}># 設定</a></li>
              <li><a href="#faq-trouble" style={{ color: '#8b9bb4' }}># トラブル</a></li>
              <li><a href="#faq-purchase" style={{ color: '#8b9bb4' }}># 購入・契約</a></li>
            </ul>
          </div>

          {faqGroups.map((group) => (
            <div key={group.id} id={group.id} style={{ marginBottom: '4rem', paddingTop: '2rem' }}>
              <h2 style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', marginBottom: '2rem' }}>{group.label}</h2>
              <div className="faq-list" role="list">
                {group.items.map((item, itemIndex) => (
                  <details key={item.question} className="faq-item" open={itemIndex === 0}>
                    <summary>{item.question}</summary>
                    <div className="faq-answer">{item.answer}</div>
                  </details>
                ))}
              </div>
            </div>
          ))}

          <div style={{ marginTop: '5rem', paddingTop: '3rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <h2>解決しない場合</h2>
            <p>ご不明な点が解決しない場合は、<Link to="/contact/">お問い合わせ</Link>よりご連絡ください。</p>
          </div>
        </div>
      </Section>
      </main>
    </>
  )
}
