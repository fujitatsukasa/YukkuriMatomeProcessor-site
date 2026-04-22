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
        description="Free、Standard（月額5,000円）、Pro（月額10,000円）の3つのプランを用意。初回導入の確認から継続投稿、複数運用まで運用規模に合わせて選べます。"
        keywords="料金, プラン, サブスクリプション, 無料プラン, Standard, Pro, テンプレート運用"
        image={media.officeLuxury}
        path="/purchase/"
      />

      <main className="brand-shell">
      <PageIntro
        kicker="Pricing"
        title="あなたの制作スタイルに合わせた料金プラン"
        lead="初回導入の確認から、継続投稿、個別テンプレートや相談まで運用規模に合わせて選べます"
      />

      <Section>
        <div className="brand-grid brand-grid--2">
          <InteractiveCard className="release-panel premium-glass">
            <h2>初回導入で見るべきこと</h2>
            <ul className="brand-list">
              <li>対応サイト取得、基本編集、YMM4出力の流れが自分の運用に合うか</li>
              <li>テンプレート運用を始める前提が整っているか</li>
              <li>AI補助や YouTube 分析をどこまで日常運用へ入れたいか</li>
            </ul>
            <p style={{ color: 'rgba(255,255,255,0.58)', marginBottom: 0 }}>
              まずは Free で入口を確認し、継続投稿が見えた段階で Standard / Pro に進む構成です。
            </p>
          </InteractiveCard>

          <InteractiveCard className="release-panel premium-glass">
            <h2>継続利用で差がつくところ</h2>
            <ul className="brand-list">
              <li>テンプレート運用と YMM4 前準備をどこまで標準化したいか</li>
              <li>13キャラ対応 AI 台本や個別テンプレート作成が必要か</li>
              <li>動画内容の相談や機能提案まで含めた伴走が必要か</li>
            </ul>
            <p style={{ color: 'rgba(255,255,255,0.58)', marginBottom: 0 }}>
              個人の継続投稿なら Standard、複数運用や内製化まで見据えるなら Pro が自然です。
            </p>
          </InteractiveCard>
        </div>
      </Section>

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
            <p style={{ color: 'rgba(255,255,255,0.58)', marginTop: '1rem', marginBottom: '1rem' }}>
              プラン変更は、アップグレードが即時反映 + 日割り差額請求、ダウングレードが次回更新日から反映の方針です。
            </p>
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
              ※ プランの購入・アップグレードはアプリ内の購入画面から行えます
            </p>
          </InteractiveCard>
        </div>
      </Section>
      </main>
    </>
  )
}
