import { Link } from 'react-router-dom'
import { InteractiveCard, PageIntro, PageMeta, Section } from '@/components/ui'
import { legal } from '@/data/site-content'
import { media } from '@/data/assets'
import { LegalLinksBlock } from '@/pages/shared'

export function PurchasePage() {
  const legalContactNote = `販売事業者: ${legal.organization.sellerName} / 連絡先: ${legal.organization.email}`

  return (
    <>
      <PageMeta
        title="購入・料金"
        description="プレミアムLicenseの買い切り販売条件と、継続課金プランの準備状況を案内しています。"
        keywords="料金, 購入, プレミアムLicense, 契約確認, 支払方法"
        image={media.officeLuxury}
        path="/purchase/"
      />
      <PageIntro
        kicker="Purchase"
        title="購入前に契約条件を確認する"
        lead={`プレミアムLicenseの販売価格は ${legal.pricing.amountIncludingTax}（買い切り）です。${legal.pricing.subscriptionNotice} 支払条件、提供時期、返金条件を確認し、不明点を解消したうえでお申し込みください。`}
        actions={[
          { label: '購入について問い合わせる', href: '/contact/', variant: 'primary' },
          { label: '購入FAQを見る', href: '/faq/#faq-purchase', variant: 'ghost' },
        ]}
        flowLinks={[
          { label: '先にダウンロードする', href: '/download/' },
          { label: '次: 使い方を確認', href: '/instructions/' },
          { label: '次: FAQを確認', href: '/faq/' },
          { label: '契約条件の法務表記', href: '/legal/commercial-transactions/' },
        ]}
      />

      <Section alt>
        <div className="brand-shell brand-grid brand-grid--2">
          <InteractiveCard className="release-panel premium-glass">
            <h2>購入前の重要事項</h2>
            <p>以下の要点を確認し、疑問が残る場合は購入前にお問い合わせください。</p>
            <dl className="purchase-summary">
              <div>
                <dt>価格表示</dt>
                <dd>{legal.pricing.productName}: {legal.pricing.amountIncludingTax}</dd>
              </div>
              <div>
                <dt>販売モデル</dt>
                <dd>{legal.pricing.modelLabel}<br />{legal.pricing.subscriptionNotice}</dd>
              </div>
              <div>
                <dt>支払方法・時期</dt>
                <dd>{legal.payment.methods.join(', ')}<br />{legal.payment.timing}</dd>
              </div>
              <div>
                <dt>支払期限・未払い時の扱い</dt>
                <dd>
                  {legal.payment.deadlineRules.map((item) => `${item.method}: ${item.limit}`).join(' / ')}
                  <br />
                  {legal.payment.unpaidPolicy}
                </dd>
              </div>
              <div>
                <dt>提供時期</dt>
                <dd>{legal.delivery.timing}</dd>
              </div>
              <div>
                <dt>返金・キャンセル</dt>
                <dd>{legal.refund.summary}</dd>
              </div>
            </dl>
            <LegalLinksBlock note={legalContactNote} />
          </InteractiveCard>
          <InteractiveCard className="price-card price-card--featured">
            <h2>{legal.pricing.productName}</h2>
            <p className="price">
              {legal.pricing.amountIncludingTax} <small>{legal.pricing.modelLabel}</small>
            </p>
            <ul className="brand-list">
              <li>対象商品: {legal.pricing.productName}</li>
              <li>販売価格: {legal.pricing.amountIncludingTax}</li>
              <li>提供中: 買い切りライセンス</li>
              <li>準備中: {legal.pricing.subscriptionPreparingLabel}</li>
              <li>商品代金以外: {legal.pricing.additionalFees}</li>
              <li>引渡時期: {legal.delivery.timing}</li>
            </ul>
            <div className="brand-inline-actions">
              <Link className="brand-btn brand-btn--ghost" to="/download/">先に試用する</Link>
              <Link className="brand-btn brand-btn--ghost" to="/news/">準備状況をお知らせで確認</Link>
            </div>
          </InteractiveCard>
        </div>
      </Section>

      <Section>
        <div className="brand-shell brand-grid brand-grid--2">
          <InteractiveCard className="release-panel premium-glass">
            <h2>購入手続き</h2>
            <ol className="brand-list">
              <li>お問い合わせから購入希望を連絡</li>
              <li>契約条件・支払方法・提供時期の最終確認</li>
              <li>手続き完了後、利用案内を受領</li>
            </ol>
            <div className="brand-inline-actions">
              <Link className="brand-btn brand-btn--primary" to="/contact/">購入について問い合わせる</Link>
            </div>
          </InteractiveCard>
          <InteractiveCard className="release-panel premium-glass">
            <h2>継続課金プラン（準備中）と連絡先</h2>
            <p className="brand-lead" style={{ marginTop: 0 }}>{legal.pricing.subscriptionNotice}</p>
            <ul className="brand-list">
              <li>販売事業者: {legal.organization.sellerName}</li>
              <li>連絡先: <a href={`mailto:${legal.organization.email}`}>{legal.organization.email}</a></li>
              <li>電話: {legal.organization.phone}</li>
              <li>受付時間: {legal.support.operationHours}</li>
            </ul>
            <div className="brand-inline-actions">
              <Link className="brand-btn brand-btn--ghost" to="/news/">お知らせを確認</Link>
              <Link className="brand-btn brand-btn--ghost" to="/contact/">お問い合わせ</Link>
            </div>
          </InteractiveCard>
        </div>
      </Section>
    </>
  )
}
