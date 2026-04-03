import { Link } from 'react-router-dom'
import { InteractiveCard, PageIntro, PageMeta, Section } from '@/components/ui'
import { legal } from '@/data/site-content'
import { media } from '@/data/assets'
import { LegalLinksBlock } from '@/pages/shared'
import { ShieldCheck, CheckCircle2, Clock, CreditCard } from 'lucide-react'

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
      <PageIntro
        kicker="Pricing"
        title="あなたの制作スタイルに合わせた料金プラン"
        lead="まずは無料で始めて、必要に応じてアップグレード"
      />

      {/* ━━━[ 3-Plan Pricing Cards — same design as Home ]━━━ */}
      <Section alt>
        <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
          {/* Free Plan */}
          <InteractiveCard className="premium-pricing-card pricing-card--free">
            <div className="premium-pricing-top">
              <h3>Free</h3>
              <div className="premium-pricing-price">
                <strong>¥0</strong>
                <span className="price-term">ずっと無料</span>
              </div>
            </div>
            <div className="premium-pricing-features" aria-label="搭載機能">
              <div className="premium-pricing-feature-row active free">
                <span className="check-icon">✓</span>
                <span>自動動画編集</span>
              </div>
              <div className="premium-pricing-feature-row active free">
                <span className="check-icon">✓</span>
                <span>YMM4タイムライン出力</span>
              </div>
              <div className="premium-pricing-feature-row active free">
                <span className="check-icon">✓</span>
                <span>ローカル分析</span>
              </div>
              <div className="premium-pricing-feature-row active free">
                <span className="check-icon">✓</span>
                <span>内蔵操作ガイド</span>
              </div>
              <div className="premium-pricing-feature-row active free">
                <span className="check-icon">✓</span>
                <span>無償アップデート</span>
              </div>
              <div className="premium-pricing-feature-row inactive">
                <span className="check-icon"></span>
                <span>高度な台本取得・AI生成</span>
              </div>
            </div>
            <div className="brand-inline-actions" style={{ marginTop: 'auto', paddingTop: '1.5rem' }}>
              <Link className="brand-btn brand-btn--ghost" to="/download/">無料で始める</Link>
            </div>
          </InteractiveCard>

          {/* Standard Plan */}
          <InteractiveCard className="premium-pricing-card pricing-card--standard">
            <div className="pricing-badge pricing-badge--gold">
              個人クリエイター向け
            </div>
            <div className="premium-pricing-top">
              <h3>Standard</h3>
              <div className="premium-pricing-price">
                <strong>¥5,000</strong>
                <span className="price-term">月額 /税込 5,500円</span>
              </div>
            </div>
            <div className="premium-pricing-features" aria-label="搭載機能">
              <div className="premium-pricing-feature-row active">
                <span className="check-icon" style={{ color: '#fff' }}>✓</span>
                <span>自動動画編集</span>
              </div>
              <div className="premium-pricing-feature-row active">
                <span className="check-icon" style={{ color: '#fff' }}>✓</span>
                <span>YMM4タイムライン出力</span>
              </div>
              <div className="premium-pricing-feature-row active">
                <span className="check-icon" style={{ color: '#fff' }}>✓</span>
                <span>ローカル分析</span>
              </div>
              <div className="premium-pricing-feature-row active">
                <span className="check-icon">✓</span>
                <strong style={{ color: '#e0c184' }}>高度な台本取得・AI生成</strong>
              </div>
              <div className="premium-pricing-feature-row active">
                <span className="check-icon">✓</span>
                <strong style={{ color: '#e0c184' }}>高度なYMM4出力設定</strong>
              </div>
              <div className="premium-pricing-feature-row active">
                <span className="check-icon" style={{ color: '#fff' }}>✓</span>
                <span>無償アップデート</span>
              </div>
              <div className="premium-pricing-feature-row inactive">
                <span className="check-icon"></span>
                <span>優先専用サポート</span>
              </div>
            </div>
            <div className="brand-inline-actions" style={{ marginTop: 'auto', paddingTop: '1.5rem' }}>
              <Link className="brand-btn brand-btn--primary" to="/contact/">申し込む</Link>
            </div>
          </InteractiveCard>

          {/* Pro Plan */}
          <InteractiveCard className="premium-pricing-card pricing-card--pro">
            <div className="pricing-badge pricing-badge--platinum">
              ✦ 圧倒的おすすめ
            </div>
            <div className="premium-pricing-top">
              <h3>Pro</h3>
              <div className="premium-pricing-price">
                <strong>¥10,000</strong>
                <span className="price-term">月額 /税込 11,000円</span>
              </div>
            </div>
            <div className="premium-pricing-features" aria-label="搭載機能">
              <div className="premium-pricing-feature-row active">
                <span className="check-icon" style={{ color: '#fff' }}>✓</span>
                <span>自動動画編集</span>
              </div>
              <div className="premium-pricing-feature-row active">
                <span className="check-icon" style={{ color: '#fff' }}>✓</span>
                <span>YMM4タイムライン出力</span>
              </div>
              <div className="premium-pricing-feature-row active">
                <span className="check-icon" style={{ color: '#fff' }}>✓</span>
                <span>ローカル分析</span>
              </div>
              <div className="premium-pricing-feature-row active">
                <span className="check-icon" style={{ color: '#fff' }}>✓</span>
                <span>内蔵操作ガイド</span>
              </div>
              <div className="premium-pricing-feature-row active">
                <span className="check-icon" style={{ color: '#fff' }}>✓</span>
                <span>無償アップデート</span>
              </div>
              <div className="premium-pricing-feature-row active">
                <span className="check-icon" style={{ color: '#e0c184' }}>✓</span>
                <strong style={{ color: '#e0c184' }}>高度な台本取得・AI生成</strong>
              </div>
              <div className="premium-pricing-feature-row active">
                <span className="check-icon" style={{ color: '#e0c184' }}>✓</span>
                <strong style={{ color: '#e0c184' }}>高度なYMM4出力設定</strong>
              </div>
              <div className="premium-pricing-feature-row active">
                <span className="check-icon" style={{ color: '#a2b2ff' }}>✓</span>
                <strong style={{ color: '#a2b2ff' }}>複数サイト ネタ自動収集</strong>
              </div>
              <div className="premium-pricing-feature-row active">
                <span className="check-icon" style={{ color: '#a2b2ff' }}>✓</span>
                <strong style={{ color: '#a2b2ff' }}>API連携・高度な自動処理</strong>
              </div>
              <div className="premium-pricing-feature-row active">
                <span className="check-icon" style={{ color: '#a2b2ff' }}>✓</span>
                <strong style={{ color: '#a2b2ff' }}>優先専用サポート</strong>
              </div>
            </div>
            <div className="brand-inline-actions" style={{ marginTop: 'auto', paddingTop: '1.5rem' }}>
              <Link className="brand-btn brand-btn--primary" to="/contact/">申し込む</Link>
            </div>
          </InteractiveCard>
        </div>

        {/* Trust Badges — same as Home */}
        <div className="trust-badge-bar" style={{ position: 'relative', zIndex: 1 }}>
          <div className="trust-badge-bar__item">
            <ShieldCheck size={20} color="#4CAF50" />
            <span>SSL暗号化通信</span>
          </div>
          <div className="trust-badge-bar__item">
            <CheckCircle2 size={20} color="#4CAF50" />
            <span>無料プランあり</span>
          </div>
          <div className="trust-badge-bar__item">
            <Clock size={20} color="#e0c184" />
            <span>{legal.support.firstResponseSla}</span>
          </div>
          <div className="trust-badge-bar__item">
            <CreditCard size={20} color="#e0c184" />
            <span>安心の国内決済</span>
          </div>
        </div>
      </Section>

      {/* ━━━[ Contract Details & Support ]━━━ */}
      <Section>
        <div className="brand-shell brand-grid brand-grid--2">
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
            <div className="brand-inline-actions">
              <Link className="brand-btn brand-btn--primary" to="/contact/">お問い合わせ</Link>
              <Link className="brand-btn brand-btn--ghost" to="/download/">まず無料で試す</Link>
            </div>
          </InteractiveCard>
        </div>
      </Section>
    </>
  )
}
