import re

css_path = 'vite-site/src/react-site.css'
with open(css_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the old rules added earlier
content = re.sub(r'/\* PREMIUM PRICING CARD UPGRADES.*?(?=(?:/\*|$))', '', content, flags=re.DOTALL)
content = re.sub(r'/\* Pricing Tier Card Adjustments.*?(?=(?:/\*|$))', '', content, flags=re.DOTALL)

premium_css = '''
/* ════════════════════════════════════════════════════════
   ULTRA-PREMIUM SAAS PRICING CARDS
   ════════════════════════════════════════════════════════ */

.premium-pricing-card {
  position: relative;
  padding: 3rem 2.5rem !important; /* 広めの余白 */
  border-radius: 20px !important;
  display: flex !important;
  flex-direction: column !important;
  transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) !important;
  overflow: visible !important; /* バッジ見切れ防止 */
  z-index: 1; /* relativeスタック */
}

.premium-pricing-top {
  text-align: center;
  padding-bottom: 2.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  margin-bottom: 2.5rem;
}

.premium-pricing-top h3 {
  font-size: 0.9rem !important;
  letter-spacing: 0.25rem !important;
  text-transform: uppercase !important;
  font-weight: 800 !important;
  margin-bottom: 1.5rem !important;
  font-family: 'Inter', -apple-system, sans-serif !important;
  opacity: 0.9 !important;
}

.premium-pricing-price {
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  gap: 0.5rem !important;
}

.premium-pricing-price strong {
  font-family: 'Inter', -apple-system, sans-serif !important;
  font-size: clamp(2.5rem, 5vw, 4rem) !important;
  line-height: 1 !important;
  font-weight: 800 !important;
  letter-spacing: -0.04em !important;
  color: #fff !important;
}

.price-term {
  font-size: 0.85rem !important;
  font-weight: 500 !important;
  color: rgba(255, 255, 255, 0.4) !important;
  letter-spacing: 0.02em !important;
}

/* FEATURES LIST */
.premium-pricing-features {
  display: flex !important;
  flex-direction: column !important;
  gap: 1.25rem !important;
}

.premium-pricing-feature-row {
  display: flex !important;
  align-items: flex-start !important;
  gap: 1rem !important;
  text-align: left !important;
  line-height: 1.5 !important;
  font-size: 0.95rem !important;
  color: rgba(255, 255, 255, 0.85) !important;
}

.premium-pricing-feature-row .check-icon {
  flex-shrink: 0 !important;
  width: 22px !important;
  height: 22px !important;
  border-radius: 50% !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  font-size: 0.75rem !important;
  margin-top: 2px !important;
  font-weight: bold !important;
}

/* BADGES (Top Pill style) */
.pricing-badge {
  position: absolute !important;
  top: -16px !important; 
  left: 50% !important;
  transform: translateX(-50%) !important;
  padding: 8px 24px !important;
  border-radius: 30px !important;
  font-size: 0.8rem !important;
  font-weight: 800 !important;
  letter-spacing: 0.05em !important;
  white-space: nowrap !important;
  box-shadow: 0 4px 15px rgba(0,0,0,0.4) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  z-index: 10 !important;
}

.pricing-badge--gold {
  background: linear-gradient(135deg, #FFDF91, #D29D38) !important;
  color: #1a150b !important;
  box-shadow: 0 0 20px rgba(210, 157, 56, 0.3), 0 4px 20px rgba(0,0,0,0.6) !important;
  border: 1px solid rgba(255, 255, 255, 0.5) !important;
}

.pricing-badge--platinum {
  background: linear-gradient(135deg, #FFF, #A0A5AF) !important;
  color: #111827 !important;
  box-shadow: 0 0 25px rgba(255, 255, 255, 0.2), 0 4px 20px rgba(0,0,0,0.6) !important;
  border: 1px solid rgba(255, 255, 255, 0.9) !important;
}

/* INDIVIDUAL CARDS */

/* FREE */
.pricing-card--free {
  border: 1px dashed rgba(255, 255, 255, 0.15) !important;
  background: rgba(15, 15, 20, 0.4) !important;
  box-shadow: none !important;
}
.pricing-card--free h3 { color: #818CF8 !important; }
.pricing-card--free .premium-pricing-feature-row.active .check-icon {
  background: rgba(255, 255, 255, 0.08) !important;
  color: #fff !important;
  border: none !important;
}

/* STANDARD (High Glow) */
.pricing-card--standard {
  z-index: 2 !important;
  border: 1px solid rgba(210, 157, 56, 0.5) !important;
  background: linear-gradient(180deg, rgba(210,157,56,0.12) 0%, rgba(15,15,20,0.95) 100%) !important;
  box-shadow: 0 0 60px rgba(210, 157, 56, 0.15), 0 20px 40px rgba(0,0,0,0.6) !important;
}
.pricing-card--standard h3 { color: #FBBF24 !important; }
.pricing-card--standard .premium-pricing-price strong {
  background: linear-gradient(135deg, #FFEFCA, #D29D38) !important;
  -webkit-background-clip: text !important;
  background-clip: text !important;
  color: transparent !important;
}
.pricing-card--standard .premium-pricing-feature-row.active .check-icon {
  background: rgba(210, 157, 56, 0.15) !important;
  color: #FBBF24 !important;
  border-color: rgba(210, 157, 56, 0.4) !important;
}

/* PRO (Ultra Glass / Platinum) */
.pricing-card--pro {
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  background: linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(15,15,20,0.85) 100%) !important;
  backdrop-filter: blur(20px) !important;
  box-shadow: 0 0 40px rgba(255, 255, 255, 0.05), inset 0 1px 1px rgba(255, 255, 255, 0.1) !important;
}
.pricing-card--pro h3 { 
  color: #E5E7EB !important;
  letter-spacing: 0.3em !important;
}
.pricing-card--pro .premium-pricing-price strong {
  background: linear-gradient(135deg, #FFFFFF, #9CA3AF) !important;
  -webkit-background-clip: text !important;
  background-clip: text !important;
  color: transparent !important;
  text-shadow: 0 0 30px rgba(255,255,255,0.1) !important;
}
.pricing-card--pro .premium-pricing-feature-row.active .check-icon {
  background: rgba(255, 255, 255, 0.15) !important;
  color: #fff !important;
  border-color: rgba(255, 255, 255, 0.3) !important;
}

/* Inactive */
.premium-pricing-feature-row.inactive {
  opacity: 0.3 !important;
}
.premium-pricing-feature-row.inactive .check-icon {
  border: 1px dashed rgba(255, 255, 255, 0.3) !important;
}

@media (min-width: 1024px) {
  .pricing-card--standard {
    transform: scale(1.05) !important;
  }
}
'''

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(content.strip() + '\n\n' + premium_css)

print('Successfully applied Ultra-Premium pricing CSS')
