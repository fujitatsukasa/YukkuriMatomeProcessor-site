import { Link } from 'react-router-dom'
import { InteractiveCard, PageIntro, PageMeta, Section } from '@/components/ui'
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
        lead="目的に合うカテゴリから確認してください。解決しない場合はお問い合わせへ進んでください。"
        media={
          <InteractiveCard className="page-visual-card premium-glass">
            <img className="page-visual-card__image" src={media.goldMetallic} alt="FAQイメージ" />
            <div className="page-visual-card__meta">
              <strong>6 categories</strong>
              <span>導入前後の疑問をカテゴリ別に整理</span>
            </div>
          </InteractiveCard>
        }
      />

      <Section>
        <div className="brand-shell">
          <InteractiveCard className="brand-card premium-glass">
            <h2>目次</h2>
            <div className="brand-grid brand-grid--3">
              <ul className="brand-list">
                <li><Link to="/faq/#faq-general">全般</Link></li>
                <li><Link to="/faq/#faq-onboarding">導入</Link></li>
              </ul>
              <ul className="brand-list">
                <li><Link to="/faq/#faq-script">台本取得</Link></li>
                <li><Link to="/faq/#faq-settings">設定</Link></li>
              </ul>
              <ul className="brand-list">
                <li><Link to="/faq/#faq-trouble">トラブル</Link></li>
                <li><Link to="/faq/#faq-purchase">購入・契約</Link></li>
              </ul>
            </div>
          </InteractiveCard>
        </div>
      </Section>

      {faqGroups.map((group, index) => (
        <Section key={group.id} id={group.id} alt={index % 2 === 0}>
          <div className="brand-shell">
            <h2>{group.label}</h2>
            <div className="faq-list" role="list">
              {group.items.map((item, itemIndex) => (
                <details key={item.question} className="faq-item" open={itemIndex === 0}>
                  <summary>{item.question}</summary>
                  <div className="faq-answer">{item.answer}</div>
                </details>
              ))}
            </div>
          </div>
        </Section>
      ))}

      <Section alt>
        <div className="brand-shell brand-grid brand-grid--2">
          <InteractiveCard className="brand-card premium-glass">
            <h2>関連ページ</h2>
            <ul className="brand-list">
              <li><Link to="/download/">ダウンロード</Link></li>
              <li><Link to="/instructions/">使い方</Link></li>
              <li><Link to="/purchase/">購入</Link></li>
              <li><Link to="/update/">アップデート履歴</Link></li>
            </ul>
          </InteractiveCard>
          <InteractiveCard className="brand-card premium-glass">
            <h2>解決しない場合</h2>
            <div className="brand-inline-actions">
              <Link className="brand-btn brand-btn--primary" to="/contact/">お問い合わせ</Link>
            </div>
          </InteractiveCard>
        </div>
      </Section>
    </>
  )
}
