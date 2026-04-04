import { InteractiveCard, PageIntro, PageMeta, Section } from '@/components/ui'
import { PricingCards } from '@/components/PricingCards'
import { legal } from '@/data/site-content'
import { media } from '@/data/assets'
import { LegalLinksBlock } from '@/pages/shared'

export function PurchasePage() {
  const legalContactNote = `販売事業者: ${legal.organization.sellerName} / 連絡先: ${legal.organization.email}`

  return (
    <>
      <PageMeta
        title="料金プラン"
        description="無料プラン、Standard（月額5,000円）、Pro（月額10,000円）の3つのプランをご用意。まずは無料で始めて、必要に応じてアップグレード。"
        keywords="料金, プラン, サブスクリプション, 月額, 無料プラン, Standard, Pro"
        image={media.officeLuxury}
        path="/purchase/"
      />

      <main className="brand-shell">
      <PageIntro
        kicker="Pricing"
        title="あなたの制作スタイルに合わせた料金プラン"
        lead="まずは無料で始めて、必要に応じてアップグレード"
      />

      {/* ━━━[ Pricing Cards — ホームと完全同一の共通コンポーネント ]━━━ */}
      <Section alt>
        <PricingCards />
      </Section>

      {/* ━━━[ Contract Details ]━━━ */}
      <Section>
        <div className="brand-grid brand-grid--2">
          <InteractiveCard className="release-panel premium-glass">
            <h2>契約に関する重要事項</h2>
            <dl className="purchase-summary">
              <div>
                <dt>販売モデル</dt>
                <dd>{legal.pricing.modelLabel}</dd>
              </div>
              <div>
                <dt>支払方法</dt>
                <dd>{legal.payment.methods.join(', ')}<br />{legal.payment.timing}</dd>
              </div>
              <div>
                <dt>支払期限</dt>
                <dd>
                  {legal.payment.deadlineRules.map((item) => `${item.method}: ${item.limit}`).join(' / ')}
                </dd>
              </div>
              <div>
                <dt>未払い時</dt>
                <dd>{legal.payment.unpaidPolicy}</dd>
              </div>
              <div>
                <dt>提供時期</dt>
                <dd>{legal.delivery.timing}</dd>
              </div>
              <div>
                <dt>解約</dt>
                <dd>{legal.cancellation.subscription}</dd>
              </div>
              <div>
                <dt>返金</dt>
                <dd>{legal.refund.summary}</dd>
              </div>
            </dl>
            <LegalLinksBlock note={legalContactNote} />
          </InteractiveCard>
          <InteractiveCard className="release-panel premium-glass">
            <h2>お問い合わせ・サポート</h2>
            <p className="brand-lead" style={{ marginTop: 0 }}>プラン選びや契約に関するご質問はお気軽にどうぞ。</p>
            <ul className="brand-list">
              <li>販売事業者: {legal.organization.sellerName}</li>
              <li>連絡先: <a href={`mailto:${legal.organization.email}`}>{legal.organization.email}</a></li>
              <li>電話: {legal.organization.phone}</li>
              <li>受付時間: {legal.support.operationHours}</li>
              <li>一次回答: {legal.support.firstResponseSla}</li>
            </ul>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', marginTop: '1rem' }}>
              ※ プランの購入・アップグレードはソフトウェア内から行えます
            </p>
          </InteractiveCard>
        </div>
      </Section>
      </main>
    </>
  )
}
