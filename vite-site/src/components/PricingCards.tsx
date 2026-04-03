import { InteractiveCard } from '@/components/ui'
import { legal } from '@/data/site-content'
import { ShieldCheck, CheckCircle2, Clock, CreditCard } from 'lucide-react'

/**
 * ━━━ Shared Pricing Cards + Trust Badges ━━━
 * ホームと料金ページで完全に同一の表示を保証する共通コンポーネント。
 * ここを変更すれば両ページに自動で反映される。
 * ※ 購入・申し込みはソフト内のみ。Web上にCTAボタンは置かない。
 */
export function PricingCards() {
  return (
    <>
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
              <span>Freeプランの全機能</span>
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
              <span className="check-icon">✓</span>
              <strong style={{ color: '#e0c184' }}>優先専用サポート</strong>
            </div>
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
              <span>Standardの全機能</span>
            </div>
            <div className="premium-pricing-feature-row active">
              <span className="check-icon" style={{ color: '#a2b2ff' }}>✓</span>
              <strong style={{ color: '#a2b2ff' }}>複数サイト ネタ自動収集</strong>
            </div>
          </div>
        </InteractiveCard>
      </div>

      {/* Trust Badges */}
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
    </>
  )
}
