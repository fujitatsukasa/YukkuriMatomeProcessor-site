import { Link } from 'react-router-dom'
import { PageIntro, PageMeta, Section } from '@/components/ui'
import { media } from '@/data/assets'
import { faqGroups } from '@/data/site-content'

export function FaqPage() {
  return (
    <>
      <PageMeta
        title="FAQ"
        description="全般、導入、台本取得、設定、トラブル、購入・契約の6カテゴリで疑問を整理したFAQです。"
        keywords="FAQ, 質問, トラブルシューティング, サポート, 購入条件"
        image={media.goldMetallic}
        path="/faq/"
      />
      <PageIntro
        kicker="FAQ"
        title="導入前後によくある質問"
        lead="全般・導入・使用方法・トラブル・購入の各カテゴリで整理しています"
      />

      <Section>
        <div className="brand-shell content-page">
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
    </>
  )
}
