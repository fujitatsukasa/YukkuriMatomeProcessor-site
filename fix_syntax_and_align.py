import re

css_path = 'vite-site/src/react-site.css'
with open(css_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. To fix any dangling brackets or keyframes fragments from the previous replace
# we nuke everything after ABSOLUTE PREMIUM SAAS PRICING and rebuild it.
pattern = r'/\* ════════════════════════════════════════════════════════\n   ABSOLUTE PREMIUM SAAS PRICING.*'
content = re.sub(pattern, '', content, flags=re.DOTALL)

# Also remove any leftover megaGlowBorder frames and incomplete text if they exist out of the block
content = re.sub(r'50% \{ background-position: 100% 50%; \}.*', '', content, flags=re.DOTALL)
content = re.sub(r'@keyframes megaGlowBorder \{.*?\}\s*', '', content, flags=re.DOTALL)

# Make sure it ends cleanly 
content = content.strip()

# 2. Re-append the fresh, correct, and perfectly aligned CSS
new_css = '''
/* ════════════════════════════════════════════════════════
   ABSOLUTE PREMIUM SAAS PRICING (PRO-FOCUSED + ANIMATIONS)
   ════════════════════════════════════════════════════════ */

.home-compact-price-section {
  position: relative;
}

.premium-pricing-card {
  position: relative;
  padding: 3rem 2.5rem !important;
  border-radius: 20px !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: space-between !important;
  height: 100% !important;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1) !important;
  overflow: visible !important;
  z-index: 1;
  background: rgba(15, 15, 20, 0.6) !important;
}

.premium-pricing-card > * { flex-shrink: 0; }
.premium-pricing-features { flex-grow: 1 !important; }

.premium-pricing-card:hover {
  transform: translateY(0px) scale(1.02) !important;
  z-index: 10 !important;
}

/* ━━━ [ PRO PLAN SUPER GLOW ANIMATION ] ━━━ */
@keyframes animatedGradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.pricing-card--pro {
  z-index: 5 !important;
  transform: scale(1.05);
  transform-origin: bottom center !important;
  border: 2px solid transparent !important;
  border-radius: 20px !important;
  background: 
    linear-gradient(180deg, rgba(20, 20, 25, 0.95) 0%, rgba(10, 10, 15, 0.95) 100%) padding-box,
    linear-gradient(45deg, #FFDF91, #D29D38, #ffffff, #8A9CFF, #E78AFF, #FFDF91) border-box !important;
  background-size: 100% 100%, 300% 300% !important;
  animation: animatedGradient 5s ease infinite alternate !important;
  box-shadow: 0 0 40px rgba(162, 178, 255, 0.2), inset 0 0 20px rgba(255, 255, 255, 0.05) !important;
}

.pricing-card--pro:hover {
  transform: translateY(0px) scale(1.08) !important;
  transform-origin: bottom center !important;
  box-shadow: 0 0 80px rgba(162, 178, 255, 0.3) !important;
}

.pricing-card--pro .premium-pricing-top {
  border-bottom: 1px solid rgba(162, 178, 255, 0.2);
}
.pricing-card--pro h3 { 
  color: #fff !important;
  letter-spacing: 0.3em !important;
  text-shadow: 0 0 15px rgba(255,255,255,0.4);
}
.pricing-card--pro .premium-pricing-price strong {
  background: linear-gradient(135deg, #FFFFFF 0%, #BCC6FF 50%, #E78AFF 100%) !important;
  -webkit-background-clip: text !important;
  background-clip: text !important;
  color: transparent !important;
  text-shadow: 0 0 40px rgba(162, 178, 255, 0.3) !important;
}
.pricing-card--pro .premium-pricing-feature-row.active .check-icon {
  background: rgba(162, 178, 255, 0.2) !important;
  color: #BCC6FF !important;
  border-color: rgba(162, 178, 255, 0.5) !important;
  box-shadow: 0 0 10px rgba(162, 178, 255, 0.4);
}

/* ━━━ [ STANDARD PLAN ] ━━━ */
.pricing-card--standard {
  transform: scale(1);
  transform-origin: bottom center !important;
  border: 1px solid rgba(210, 157, 56, 0.3) !important;
  border-top: 2px solid #D29D38 !important;
}
.pricing-card--standard h3 { color: #D29D38 !important; }
.pricing-card--standard .premium-pricing-price strong {
  color: #FFDF91 !important;
}
.pricing-card--standard .premium-pricing-feature-row.active .check-icon {
  background: rgba(210, 157, 56, 0.1) !important;
  color: #D29D38 !important;
  border-color: rgba(210, 157, 56, 0.3) !important;
}

/* ━━━ [ FREE PLAN ] ━━━ */
.pricing-card--free {
  transform: scale(1);
  transform-origin: bottom center !important;
  border: 1px dashed rgba(255, 255, 255, 0.1) !important;
  opacity: 0.8;
}
.pricing-card--free:hover { opacity: 1; border-style: solid !important; }
.pricing-card--free h3 { color: #9CA3AF !important; }
.pricing-card--free .premium-pricing-price strong { color: #E5E7EB !important; }
.pricing-card--free .premium-pricing-feature-row.active .check-icon {
  background: rgba(255, 255, 255, 0.05) !important;
  color: #ccc !important;
  border: none !important;
}

/* ━━━ [ BADGES ] ━━━ */
.pricing-badge {
  position: absolute !important;
  top: -16px !important; 
  left: 50% !important;
  transform: translateX(-50%) !important;
  padding: 8px 24px !important;
  border-radius: 30px !important;
  font-size: 0.85rem !important;
  font-weight: 800 !important;
  letter-spacing: 0.05em !important;
  white-space: nowrap !important;
  z-index: 10 !important;
  transition: all 0.3s ease;
}

.pricing-badge--platinum {
  background: linear-gradient(135deg, #ffffff, #BCC6FF, #E78AFF) !important;
  color: #111 !important;
  box-shadow: 0 0 30px rgba(162, 178, 255, 0.6), 0 4px 15px rgba(0,0,0,0.8) !important;
  border: none !important;
  animation: badgePulse 2s infinite alternate;
}
@keyframes badgePulse {
  0% { transform: translateX(-50%) scale(1); box-shadow: 0 0 20px rgba(162, 178, 255, 0.4); }
  100% { transform: translateX(-50%) scale(1.05); box-shadow: 0 0 40px rgba(162, 178, 255, 0.8); }
}

.pricing-badge--gold {
  background: #2a2212 !important;
  color: #FFDF91 !important;
  border: 1px solid rgba(210, 157, 56, 0.4) !important;
  box-shadow: 0 4px 15px rgba(0,0,0,0.5) !important;
}

/* Shared Top / Rows */
.premium-pricing-top {
  text-align: center;
  padding-bottom: 2.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  margin-bottom: 2.5rem;
  transition: all 0.3s ease;
}
.premium-pricing-top h3 {
  font-size: 0.9rem !important;
  letter-spacing: 0.25rem !important;
  text-transform: uppercase !important;
  font-weight: 800 !important;
  margin-bottom: 1.5rem !important;
  font-family: 'Inter', -apple-system, sans-serif !important;
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
}
.price-term {
  font-size: 0.85rem !important;
  font-weight: 500 !important;
  color: rgba(255, 255, 255, 0.4) !important;
  letter-spacing: 0.02em !important;
}

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
  transition: transform 0.2s ease;
}
.premium-pricing-feature-row:hover {
  transform: translateX(4px);
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
  transition: all 0.3s ease;
}
.premium-pricing-feature-row.inactive { opacity: 0.2 !important; }
.premium-pricing-feature-row.inactive .check-icon { border: 1px dashed rgba(255, 255, 255, 0.2) !important; }

/* ━━━ [ MICRO CTAs ] ━━━ */
.premium-pricing-cta {
  margin-top: auto !important;
  padding-top: 2rem !important;
  font-size: 0.85rem !important;
  font-weight: 700 !important;
  letter-spacing: 0.05em !important;
  color: rgba(255, 255, 255, 0.4) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  cursor: pointer !important;
  transition: all 0.3s ease !important;
  border-top: 1px solid rgba(255, 255, 255, 0.05) !important;
}
.premium-pricing-cta span { font-size: 1.2rem !important; transition: transform 0.3s ease; }
.premium-pricing-card:hover .premium-pricing-cta { color: #fff !important; }
.premium-pricing-card:hover .premium-pricing-cta span { transform: translateX(8px); }
.pricing-card--pro .pro-cta {
  color: rgba(162, 178, 255, 0.8) !important;
  border-top: 1px solid rgba(162, 178, 255, 0.2) !important;
}
.pricing-card--pro:hover .pro-cta { color: #E78AFF !important; text-shadow: 0 0 10px rgba(231, 138, 255, 0.5) !important; }

@media (min-width: 1024px) {
  .pricing-card--pro {
    transform: scale(1.08) !important;
  }
  .pricing-card--pro:hover {
    transform: translateY(0px) scale(1.12) !important;
  }
}
'''

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(content + '\n\n' + new_css)
print('SUCCESSFULLY RESTORED AND ALIGNED.')
