---
layout: showcase
title: デザイン01 | ゆっくりまとめプロセッサー
description: "動画編集ソフト「ゆっくりまとめプロセッサー」の最先端UIランディングページ。"
permalink: /design-01/
---

<style>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Manrope:wght@300;400;500;600;700&family=Shippori+Mincho+B1:wght@400;600;700&display=swap");

:root {
  --bg: #0a090c;
  --bg-soft: #121017;
  --ink: #f9f6ef;
  --muted: rgba(249, 246, 239, 0.7);
  --accent: #e1c28a;
  --accent-2: #d8b985;
  --accent-ink: #140e08;
  --card: rgba(17, 16, 22, 0.85);
  --border: rgba(225, 194, 138, 0.42);
  --shadow: 0 30px 70px rgba(0, 0, 0, 0.45);
  --display: "Playfair Display", serif;
  --body: "Manrope", sans-serif;
  --jp-display: "Shippori Mincho B1", "Noto Serif JP", serif;
  --mx: 50vw;
  --my: 20vh;
}

* { box-sizing: border-box; }

.showcase-body {
  margin: 0;
  background: var(--bg);
  color: var(--ink);
}

.showcase {
  font-family: var(--body);
  color: var(--ink);
  background-color: var(--bg);
  background-image:
    linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px),
    linear-gradient(0deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 160px 160px;
  animation: gridShift 60s linear infinite;
  line-height: 1.75;
  position: relative;
  overflow: hidden;
}

.showcase::before {
  content: "";
  position: fixed;
  inset: -20% -10% auto auto;
  width: 480px;
  height: 480px;
  background: radial-gradient(circle at center, rgba(214, 178, 124, 0.35), transparent 60%);
  filter: blur(40px);
  z-index: 0;
  opacity: 0.7;
  animation: float 18s ease-in-out infinite;
}

.showcase::after {
  content: "";
  position: fixed;
  inset: auto auto -20% -10%;
  width: 520px;
  height: 520px;
  background: radial-gradient(circle at center, rgba(188, 212, 214, 0.3), transparent 60%);
  filter: blur(45px);
  z-index: 0;
  opacity: 0.7;
  animation: float 22s ease-in-out infinite reverse;
}

.showcase .spotlight {
  position: fixed;
  inset: 0;
  background: radial-gradient(circle at var(--mx) var(--my), rgba(214, 178, 124, 0.18), transparent 45%);
  pointer-events: none;
  z-index: 0;
}

.showcase * { position: relative; z-index: 1; }

.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: rgba(255, 255, 255, 0.08);
  z-index: 20;
}

.scroll-progress span {
  display: block;
  height: 100%;
  width: 0;
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
  box-shadow: 0 0 14px rgba(214, 178, 124, 0.6);
}

.section {
  padding: clamp(72px, 9vw, 130px) clamp(24px, 7vw, 120px);
  scroll-margin-top: 120px;
}

.section.alt { background: var(--bg-soft); }

h1, h2, h3 {
  font-family: var(--display);
  letter-spacing: 0.01em;
  margin-top: 0;
}

.section h2 {
  font-size: clamp(2.8rem, 4.8vw, 4.4rem);
  letter-spacing: 0.06em;
  font-weight: 600;
  position: relative;
  padding-bottom: 18px;
  margin-bottom: 18px;
  text-shadow: 0 18px 36px rgba(0, 0, 0, 0.45);
}

.section h2::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: clamp(120px, 20vw, 200px);
  height: 2px;
  background: linear-gradient(90deg, var(--accent), rgba(255, 255, 255, 0.1));
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-size: 0.7rem;
  letter-spacing: 0.36em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 12px;
  font-weight: 600;
}

.eyebrow::before {
  content: "";
  width: 32px;
  height: 1px;
  background: linear-gradient(90deg, var(--accent), transparent);
}

.lead {
  color: var(--muted);
  font-size: 1.05rem;
  max-width: 720px;
}

.hero-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 16px;
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 6px 14px 6px 8px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.06);
  font-size: 0.82rem;
  letter-spacing: 0.08em;
}

.chip::before {
  content: "";
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-image: var(--chip-img);
  background-size: cover;
  background-position: center;
  border: 1px solid rgba(225, 194, 138, 0.55);
  box-shadow: 0 0 0 2px rgba(10, 9, 12, 0.55);
}

.chip-small {
  font-size: 0.72rem;
  padding: 6px 12px 6px 8px;
}

.chip-small::before {
  width: 18px;
  height: 18px;
}

.card-kicker {
  font-size: 0.7rem;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 10px;
  display: inline-block;
}

.hero {
  min-height: 92vh;
  display: grid;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding-top: 90px;
}

.hero-media {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-media video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, rgba(9, 8, 12, 0.9), rgba(9, 8, 12, 0.35));
}

.hero-glint {
  position: absolute;
  inset: -40% -40% -40% -40%;
  background: linear-gradient(120deg, transparent 35%, rgba(214, 178, 124, 0.32) 50%, transparent 65%);
  mix-blend-mode: screen;
  opacity: 0.5;
  animation: glint 10s ease-in-out infinite;
}

.hero-light {
  position: absolute;
  inset: -10% -10% -10% -10%;
  mix-blend-mode: screen;
  opacity: 0.35;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 1240px;
  padding: 150px clamp(24px, 7vw, 120px) 120px;
}

.kicker {
  font-size: 0.78rem;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: var(--accent);
  font-weight: 600;
  text-shadow: 0 6px 20px rgba(0, 0, 0, 0.5);
}

.hero h1 {
  font-size: clamp(2.9rem, 5.6vw, 5.9rem);
  margin: 14px 0 18px;
  line-height: 1.04;
  background: linear-gradient(120deg, #fff7e6 8%, #f2e0c2 28%, #e1c28a 45%, #fff2d8 60%, #c99a60 90%);
  background-size: 280% 280%;
  animation: heroGradient 8s linear infinite;
  font-family: var(--jp-display);
  letter-spacing: 0.04em;
  text-shadow: 0 18px 50px rgba(0, 0, 0, 0.6);
  -webkit-text-stroke: 0.6px rgba(255, 255, 255, 0.18);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-wrap: balance;
}

.hero-lead {
  font-family: var(--jp-display);
  font-size: clamp(1.05rem, 1.35vw, 1.25rem);
  letter-spacing: 0.05em;
  color: rgba(245, 236, 220, 0.92);
  text-shadow: 0 14px 36px rgba(0, 0, 0, 0.55);
}


.cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 28px;
}

.btn {
  position: relative;
  overflow: hidden;
  padding: 12px 28px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--ink);
  font-weight: 600;
  letter-spacing: 0.02em;
  text-decoration: none;
  transition: transform 0.35s ease, box-shadow 0.35s ease, color 0.35s ease, background 0.35s ease;
}

.btn::after {
  content: "";
  position: absolute;
  inset: -200% -60%;
  background: linear-gradient(120deg, transparent 40%, rgba(255, 255, 255, 0.4) 50%, transparent 60%);
  opacity: 0;
  transform: translateX(-40%);
  pointer-events: none;
}

.btn.primary {
  background: linear-gradient(120deg, #f7e7c7, #d6b27c 55%, #b28a56 100%);
  color: var(--accent-ink);
  border-color: transparent;
  box-shadow: 0 18px 40px rgba(214, 178, 124, 0.35);
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
}

.btn:hover::after {
  opacity: 0.85;
  animation: btnSheen 1.2s ease;
}

.marquee {
  position: relative;
  overflow: hidden;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  padding: 18px 0;
}

.marquee-track {
  display: inline-flex;
  gap: 36px;
  white-space: nowrap;
  animation: marquee 24s linear infinite;
  align-items: center;
  will-change: transform;
}

.marquee:hover .marquee-track { animation-play-state: paused; }

.marquee span {
  font-size: 0.78rem;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: var(--muted);
  display: inline-flex;
  align-items: center;
  gap: 12px;
}

.marquee span::after {
  content: "";
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(214, 178, 124, 0.5);
  display: inline-block;
}

.grid {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.card {
  position: relative;
  padding: 24px;
  border-radius: 24px;
  background: var(--card);
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
  backdrop-filter: blur(10px);
  transform-style: preserve-3d;
  overflow: hidden;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.card::after {
  content: "";
  position: absolute;
  inset: -60% -60% -60% -60%;
  background: linear-gradient(120deg, transparent 35%, rgba(255, 255, 255, 0.12) 50%, transparent 65%);
  opacity: 0.6;
  mix-blend-mode: screen;
  animation: sheen 12s ease-in-out infinite;
  pointer-events: none;
}

.card:hover {
  transform: translateY(-6px) rotateX(2deg);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
}

.split {
  display: grid;
  gap: 32px;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  align-items: center;
}

.media-frame {
  border-radius: 28px;
  overflow: hidden;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}

.media-frame img,
.media-frame video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.tabs {
  display: grid;
  gap: 16px;
}

.tabs input { display: none; }

.tab-labels {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.tab-labels label {
  padding: 8px 18px;
  border-radius: 999px;
  border: 1px solid var(--border);
  cursor: pointer;
  font-weight: 600;
  color: var(--muted);
  transition: color 0.25s ease, border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
}

.tab-labels label:hover {
  color: var(--ink);
  border-color: rgba(214, 178, 124, 0.5);
  box-shadow: 0 16px 30px rgba(0, 0, 0, 0.35);
}

#tab-timeline:checked ~ .tab-labels label[for="tab-timeline"],
#tab-color:checked ~ .tab-labels label[for="tab-color"],
#tab-audio:checked ~ .tab-labels label[for="tab-audio"] {
  background: var(--accent);
  color: var(--accent-ink);
  border-color: transparent;
}

.tab-panels > div { display: none; }

#tab-timeline:checked ~ .tab-panels .panel-timeline,
#tab-color:checked ~ .tab-panels .panel-color,
#tab-audio:checked ~ .tab-panels .panel-audio {
  display: grid;
}

.case-scroll {
  position: relative;
  overflow: hidden;
  padding: 8px 0 12px;
}

.case-scroll::before,
.case-scroll::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: 80px;
  pointer-events: none;
  z-index: 1;
}

.case-scroll::before {
  left: 0;
  background: linear-gradient(90deg, rgba(10, 9, 12, 0.95), transparent);
}

.case-scroll::after {
  right: 0;
  background: linear-gradient(270deg, rgba(10, 9, 12, 0.95), transparent);
}

.case-track {
  display: flex;
  gap: 18px;
  width: max-content;
  animation: caseScroll 28s linear infinite;
}

.case-scroll:hover .case-track { animation-play-state: paused; }

.case-scroll article {
  flex: 0 0 260px;
}

.case-scroll img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 18px;
  display: block;
  margin-bottom: 12px;
}

.case-card img {
  width: 100%;
  height: 190px;
  object-fit: cover;
  border-radius: 16px;
  display: block;
  margin-bottom: 12px;
}

.pricing-grid {
  align-items: stretch;
}

.pricing-card .price {
  font-size: 2rem;
  margin: 10px 0 14px;
}

.pricing-card ul {
  list-style: none;
  padding: 0;
  margin: 16px 0 22px;
  display: grid;
  gap: 8px;
  color: var(--muted);
}

.pricing-card.featured {
  border-color: var(--accent);
  box-shadow: 0 40px 90px rgba(0, 0, 0, 0.55);
  transform: translateY(-8px);
}

.gallery {
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(6, 1fr);
}

.gallery figure {
  margin: 0;
  position: relative;
  overflow: hidden;
  border-radius: 20px;
}

.gallery img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.gallery .tall { grid-row: span 2; }
.gallery .wide { grid-column: span 2; }

.parallax-item {
  will-change: transform;
}

.timeline {
  display: grid;
  gap: 20px;
}

.timeline-item {
  position: relative;
  padding-left: 40px;
}

.timeline-item::before {
  content: "";
  position: absolute;
  left: 12px;
  top: 8px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 0 6px rgba(214, 178, 124, 0.2);
}

.stats {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
}

.stat h3 {
  font-size: 2rem;
  margin-bottom: 6px;
}

.metrics-grid {
  display: grid;
  gap: 32px;
  grid-template-columns: minmax(260px, 0.9fr) minmax(320px, 1.1fr);
  align-items: start;
}

.metrics-copy {
  display: grid;
  gap: 18px;
}

.metric-bars {
  display: grid;
  gap: 12px;
}

.metric-bar {
  display: grid;
  gap: 6px;
}

.metric-bar .bar-label {
  display: flex;
  justify-content: space-between;
  font-size: 0.82rem;
  color: var(--muted);
}

.bar-track {
  height: 6px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  overflow: hidden;
}

.bar-track span {
  display: block;
  height: 100%;
  width: 70%;
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
  box-shadow: 0 0 14px rgba(214, 178, 124, 0.6);
}

.metrics-media {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.metrics-media figure {
  margin: 0;
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}

.metrics-media img {
  width: 100%;
  height: 120px;
  object-fit: cover;
  display: block;
}

.metrics-media figcaption {
  position: absolute;
  left: 10px;
  bottom: 10px;
  font-size: 0.6rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--ink);
  padding: 4px 8px;
  border-radius: 999px;
  background: rgba(10, 9, 12, 0.6);
  border: 1px solid rgba(214, 178, 124, 0.4);
}

.metrics-media figure,
.metrics-cards .stat-card,
.metric-bars .metric-bar {
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.9s ease, transform 0.9s ease;
}

.metrics-media figure:nth-child(2),
.metrics-cards .stat-card:nth-child(2),
.metric-bars .metric-bar:nth-child(2) {
  transition-delay: 0.12s;
}

.metrics-media figure:nth-child(3),
.metrics-cards .stat-card:nth-child(3),
.metric-bars .metric-bar:nth-child(3) {
  transition-delay: 0.24s;
}

.metrics-cards .stat-card:nth-child(4) {
  transition-delay: 0.36s;
}

.reveal.is-visible .metrics-media figure,
.reveal.is-visible .metrics-cards .stat-card,
.reveal.is-visible .metric-bars .metric-bar {
  opacity: 1;
  transform: translateY(0);
}

.bar-track span {
  transform-origin: left;
  transform: scaleX(0);
  transition: transform 1.4s ease;
}

.reveal.is-visible .bar-track span {
  transform: scaleX(1);
}
.metrics-cards {
  display: grid;
  gap: 18px;
  grid-template-columns: repeat(2, minmax(220px, 1fr));
}

.stat-card {
  padding: 24px;
  position: relative;
}

.stat-card::before {
  content: "";
  position: absolute;
  inset: -40% -40% auto auto;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle at top, rgba(214, 178, 124, 0.25), transparent 65%);
  opacity: 0.6;
  pointer-events: none;
}

.stat-card.featured {
  grid-column: span 2;
  padding: 28px;
  background: linear-gradient(130deg, rgba(214, 178, 124, 0.2), rgba(10, 9, 12, 0.85));
  border-color: rgba(214, 178, 124, 0.55);
}

.stat-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-badge {
  font-size: 0.6rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--accent);
}

.stat-icon {
  width: 38px;
  height: 38px;
  border-radius: 12px;
  background: rgba(214, 178, 124, 0.18);
  border: 1px solid rgba(214, 178, 124, 0.4);
  display: grid;
  place-items: center;
}

.stat-icon svg {
  width: 20px;
  height: 20px;
  fill: var(--accent);
}

.stat-value {
  font-size: 2.2rem;
  margin: 12px 0 6px;
  font-family: var(--display);
}

.stat-desc {
  color: var(--muted);
  margin: 0 0 12px;
}

.mini-chart {
  height: 36px;
  border-radius: 999px;
  background: linear-gradient(90deg, rgba(214, 178, 124, 0.18), rgba(214, 178, 124, 0.65));
  position: relative;
  overflow: hidden;
}

.mini-chart::after {
  content: "";
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(90deg, rgba(0, 0, 0, 0.12) 0 6px, transparent 6px 12px);
  opacity: 0.35;
}

.stat-ring {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: conic-gradient(var(--accent) 0 300deg, rgba(255, 255, 255, 0.12) 0);
  display: grid;
  place-items: center;
  font-size: 0.7rem;
  color: var(--ink);
  border: 1px solid rgba(214, 178, 124, 0.5);
}

.people {
  display: grid;
  gap: 18px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.people figure {
  margin: 0;
  border-radius: 22px;
  overflow: hidden;
  border: 1px solid var(--border);
  background: var(--card);
}

.people img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  display: block;
}

.people figcaption {
  padding: 16px 18px 20px;
}

.press-grid {
  display: grid;
  gap: 18px;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.press-card {
  padding: 22px;
  border-radius: 22px;
  background: rgba(17, 16, 22, 0.78);
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}

.press-card h3 {
  margin: 10px 0 8px;
  font-size: 1.15rem;
}

.press-card p {
  color: var(--muted);
  margin: 0;
}

.trust-grid {
  display: grid;
  gap: 18px;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.trust-card {
  display: grid;
  gap: 14px;
}

.trust-media {
  height: 160px;
  border-radius: 18px;
  overflow: hidden;
  position: relative;
  border: 1px solid rgba(225, 194, 138, 0.4);
}

.trust-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.trust-media::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, rgba(10, 9, 12, 0.15), rgba(10, 9, 12, 0.8));
}

.chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.cta {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
  justify-content: space-between;
  border-radius: 28px;
  padding: 40px;
  background: linear-gradient(120deg, #f7e7c7, #d6b27c 55%, #b28a56 100%);
  color: var(--accent-ink);
  border: 1px solid rgba(214, 178, 124, 0.5);
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.45);
  position: relative;
  overflow: hidden;
}

.cta::after {
  content: "";
  position: absolute;
  inset: -60% -30% auto -30%;
  height: 200%;
  background: linear-gradient(120deg, transparent 40%, rgba(255, 255, 255, 0.45) 50%, transparent 60%);
  opacity: 0.45;
  animation: headerSheen 16s ease-in-out infinite;
  pointer-events: none;
}

.cta .btn {
  border-color: transparent;
  background: rgba(10, 9, 12, 0.88);
  color: #f7e7c7;
}

.cta-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.cta-points {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 14px;
  font-size: 0.85rem;
}

.cta-points span {
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid rgba(20, 14, 8, 0.3);
  background: rgba(20, 14, 8, 0.08);
}

.btn.secondary {
  background: transparent;
  color: var(--accent-ink);
  border: 1px solid rgba(20, 14, 8, 0.4);
}

.cta h2 {
  color: var(--accent-ink);
  text-shadow: none;
}

.cta h2::after {
  content: none;
}

.credits {
  font-size: 0.85rem;
  color: var(--muted);
}

.credits a { color: inherit; text-decoration: underline; }

.reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.8s ease, transform 0.8s ease; }
.reveal.is-visible { opacity: 1; transform: translateY(0); }

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes float {
  0% { transform: translateY(0); }
  50% { transform: translateY(-18px); }
  100% { transform: translateY(0); }
}

@keyframes sheen {
  0% { transform: translateX(-35%); }
  50% { transform: translateX(15%); }
  100% { transform: translateX(45%); }
}

@keyframes glint {
  0% { transform: translateX(-30%); }
  50% { transform: translateX(15%); }
  100% { transform: translateX(40%); }
}

@keyframes heroGradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes navSheen {
  0% { transform: translate(-130%, -130%) scale(0.9) skewX(-8deg); opacity: 0; }
  12% { opacity: 1; }
  45% { transform: translate(-10%, -10%) scale(1) skewX(-4deg); opacity: 0.9; }
  65% { transform: translate(50%, 50%) scale(1.02) skewX(2deg); opacity: 0.8; }
  82% { opacity: 0.6; }
  100% { transform: translate(130%, 130%) scale(1.06) skewX(6deg); opacity: 0; }
}


@keyframes caseScroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes gridShift {
  0% { background-position: 0 0, 0 0; }
  100% { background-position: 160px 160px, -160px 160px; }
}

@keyframes headerSheen {
  0% { transform: translateX(-35%); }
  50% { transform: translateX(5%); }
  100% { transform: translateX(35%); }
}

@keyframes btnSheen {
  0% { transform: translateX(-60%); }
  100% { transform: translateX(60%); }
}

@media (max-width: 900px) {
  .gallery { grid-template-columns: repeat(2, 1fr); }
  .metrics-grid { grid-template-columns: 1fr; }
  .metrics-cards { grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }
  .metrics-media { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 20px clamp(20px, 5vw, 80px);
  background: linear-gradient(120deg, rgba(10, 9, 12, 0.95), rgba(18, 16, 24, 0.82));
  border-bottom: 1px solid rgba(214, 178, 124, 0.28);
  box-shadow: 0 24px 50px rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(18px);
  transition: background 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
}

.site-header::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(214, 178, 124, 0.8), transparent);
}

.site-header::after {
  content: none;
}

.site-header.is-scrolled {
  background: linear-gradient(120deg, rgba(8, 8, 12, 0.98), rgba(14, 12, 18, 0.9));
  border-bottom-color: rgba(214, 178, 124, 0.36);
  box-shadow: 0 32px 70px rgba(0, 0, 0, 0.55);
}


.logo {
  display: flex;
  align-items: center;
  gap: 14px;
  text-decoration: none;
  color: var(--ink);
}

.logo-badge {
  width: 46px;
  height: 46px;
  border-radius: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(140deg, rgba(255, 255, 255, 0.08), rgba(214, 178, 124, 0.22) 55%, rgba(10, 9, 12, 0.15));
  border: 1px solid rgba(214, 178, 124, 0.48);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08), 0 18px 36px rgba(0, 0, 0, 0.45);
  transition: transform 0.35s ease, box-shadow 0.35s ease;
}

.logo-mark {
  width: 24px;
  height: 24px;
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.4));
  transition: transform 0.35s ease;
}

.logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.logo-title {
  font-family: var(--display);
  letter-spacing: 0.04em;
  font-size: 1.02rem;
  text-transform: none;
}

.logo-sub {
  font-size: 0.72rem;
  letter-spacing: 0.22em;
  color: var(--muted);
}

.nav {
  display: flex;
  gap: 14px;
  align-items: center;
  font-size: 1.06rem;
  letter-spacing: 0.12em;
  font-family: var(--jp-display);
}

.nav a {
  position: relative;
  padding: 8px 14px;
  border-radius: 12px;
  border: 0;
  color: var(--muted);
  text-decoration: none;
  font-weight: 600;
  background: transparent;
  transition: color 0.25s ease, text-shadow 0.25s ease, letter-spacing 0.25s ease;
  overflow: hidden;
}

.nav a:hover {
  color: #fff6e6;
  text-shadow: 0 0 22px rgba(225, 194, 138, 0.9);
  letter-spacing: 0.16em;
}

.nav a::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 12px;
  border: 1px solid rgba(225, 194, 138, 0.65);
  box-shadow:
    0 0 18px rgba(225, 194, 138, 0.45),
    inset 0 0 0 1px rgba(255, 255, 255, 0.06);
  background: linear-gradient(120deg, rgba(255, 238, 208, 0.35), rgba(225, 194, 138, 0.22));
  opacity: 0;
  transform: scaleX(0.55);
  transform-origin: left center;
  transition: opacity 0.28s ease, transform 0.28s ease;
}

.nav a:hover::before {
  opacity: 1;
  transform: scaleX(1);
}

.nav a::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 10px;
  opacity: 0;
  transform: translate(-120%, -120%);
  transition: opacity 0.2s ease;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0) 35%, rgba(255, 255, 255, 0.55) 50%, rgba(255, 255, 255, 0) 65%);
  animation: none;
}

.nav a:hover::after {
  opacity: 1;
  animation: navSheen 1.5s cubic-bezier(0.2, 0.7, 0.2, 1) infinite;
}

.nav a:not(:hover)::after {
  animation: none;
  opacity: 0;
}

.nav a.is-active {
  color: #fff4df;
  text-shadow: 0 0 26px rgba(225, 194, 138, 0.95);
}

.logo:hover .logo-badge {
  transform: translateY(-1px) rotate(2deg);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.12), 0 20px 36px rgba(0, 0, 0, 0.5);
}

.logo:hover .logo-mark { transform: scale(1.05); }

.header-cta {
  padding: 12px 24px;
  font-size: 0.92rem;
  border-radius: 999px;
  border: 1px solid rgba(214, 178, 124, 0.45);
  background: rgba(10, 9, 12, 0.35);
  color: var(--ink);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.06);
}

.header-cta.primary {
  background: linear-gradient(120deg, #f7e7c7, #d6b27c 55%, #b28a56 100%);
  color: var(--accent-ink);
  border-color: transparent;
  box-shadow: 0 12px 30px rgba(214, 178, 124, 0.35);
}

.header-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

@media (max-width: 980px) {
  .nav { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .showcase { animation: none !important; }
  .showcase * { animation: none !important; transition: none !important; }
  .site-header::after,
  .cta::after,
  .card::after { animation: none !important; }
}
</style>

<main class="showcase" id="top">
  <div class="scroll-progress" aria-hidden="true"><span></span></div>
  <div class="spotlight" aria-hidden="true"></div>
  <header class="site-header">
    <a class="logo" href="#top" aria-label="ゆっくりまとめプロセッサー ホーム">
      <span class="logo-badge" aria-hidden="true">
        <img class="logo-mark" src="/assets/showcase/aurora/logo-mark.svg" alt="ゆっくりまとめプロセッサー ロゴ">
      </span>
      <span class="logo-text">
        <span class="logo-title">ゆっくりまとめプロセッサー</span>
        <span class="logo-sub">Video Editing Suite</span>
      </span>
    </a>
  <nav class="nav" aria-label="主要ナビゲーション">
    <a href="#pricing">価格</a>
    <a href="#cases">事例</a>
    <a href="#learn">学習</a>
  </nav>
    <div class="header-actions">
      <a class="btn header-cta" href="#pricing">無料トライアル</a>
      <a class="btn header-cta primary" href="#contact">法人デモ</a>
    </div>
  </header>

  
  <section class="hero">
    <div class="hero-media">
      <video autoplay muted loop playsinline preload="metadata" poster="/assets/showcase/aurora/hero-poster.jpg" aria-label="ゆっくりまとめプロセッサーの編集画面">
        <source src="/assets/showcase/aurora/hero-editing.mp4" type="video/mp4">
      </video>
      <video class="hero-light" autoplay muted loop playsinline preload="metadata" aria-hidden="true">
        <source src="/assets/showcase/aurora/light-leaks.webm" type="video/webm">
      </video>
      <div class="hero-glint"></div>
      <div class="hero-overlay"></div>
    </div>
    <div class="hero-content">
      <p class="kicker">次世代動画編集ソフト / Enterprise SaaS</p>
      <h1 class="hero-title">ゆっくりまとめプロセッサーで、<br>編集から納品まで<br>一気通貫。</h1>
      <p class="lead hero-lead">映画・CM・配信のワークフローを一本化。8Kリアルタイム編集、AI自動カット、HDRカラーマネジメント、チームレビューを一つのUIで。</p>
      <div class="hero-chips">
        <span class="chip" style="--chip-img: url('/assets/showcase/aurora/hero-poster.jpg');">8Kリアルタイム</span>
        <span class="chip" style="--chip-img: url('/assets/showcase/aurora/keyboard.jpg');">AI自動カット</span>
        <span class="chip" style="--chip-img: url('/assets/showcase/aurora/color-grade.jpg');">HDRカラーマネジメント</span>
        <span class="chip" style="--chip-img: url('/assets/showcase/aurora/workstation-dark.jpg');">クラウドレビュー</span>
      </div>
      <div class="cta-row">
        <a class="btn primary" href="#pricing">無料トライアル</a>
        <a class="btn" href="#contact">法人デモ</a>
      </div>
    </div>
  </section>


  <section class="section reveal" id="overview">
    <p class="eyebrow">OVERVIEW</p>
    <h2>3秒でわかる ゆっくりまとめプロセッサー</h2>
    <p class="lead">「何ができるソフトか」を最短で伝えるための要約。</p>
    <div class="grid">
      <div class="card">
        <span class="card-kicker">EDIT</span>
        <h3>編集が速い</h3>
        <p>磁力タイムラインとプロキシで重い素材でも滑らか。</p>
      </div>
      <div class="card">
        <span class="card-kicker">COLOR</span>
        <h3>色が強い</h3>
        <p>HDR/SDRを統合管理し、ルックの再現性を保証。</p>
      </div>
      <div class="card">
        <span class="card-kicker">AUDIO</span>
        <h3>音まで完結</h3>
        <p>ノイズ処理と空間音響を内蔵。別ツールに戻らない。</p>
      </div>
      <div class="card">
        <span class="card-kicker">DELIVERY</span>
        <h3>納品が早い</h3>
        <p>配信用・劇場用・SNS用をプリセットで一括書き出し。</p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="marquee" aria-label="主要機能サマリー">
      <div class="marquee-track">
        <span>REALTIME 8K</span>
        <span>COLOR SCIENCE</span>
        <span>AI CUT</span>
        <span>TEAM REVIEW</span>
        <span>SECURE CLOUD</span>
        <span>REALTIME 8K</span>
        <span>COLOR SCIENCE</span>
        <span>AI CUT</span>
        <span>TEAM REVIEW</span>
        <span>SECURE CLOUD</span>
        <span aria-hidden="true">REALTIME 8K</span>
        <span aria-hidden="true">COLOR SCIENCE</span>
        <span aria-hidden="true">AI CUT</span>
        <span aria-hidden="true">TEAM REVIEW</span>
        <span aria-hidden="true">SECURE CLOUD</span>
      </div>
    </div>
  </section>

  <section class="section alt reveal" id="benefits">
    <p class="eyebrow">BENEFITS</p>
    <h2>導入で変わること</h2>
    <p class="lead">“パッと見て伝わる”編集ソフトとしての違いを、成果に直結する表現で整理。</p>
    <div class="grid">
      <div class="card">
        <span class="card-kicker">SPEED</span>
        <h3>編集の待ち時間が減る</h3>
        <p>8Kでもタイムラインが止まらない。試写の回数が増える。</p>
      </div>
      <div class="card">
        <span class="card-kicker">QUALITY</span>
        <h3>色の仕上がりが安定する</h3>
        <p>HDR/SDRの見え方を統一し、納品後の事故を防ぐ。</p>
      </div>
      <div class="card">
        <span class="card-kicker">TEAM</span>
        <h3>レビューが一本化される</h3>
        <p>コメント・修正・差分が一箇所で完結。</p>
      </div>
    </div>
  </section>

  <section class="section reveal" id="modes">
    <p class="eyebrow">WORK MODES</p>
    <h2>編集・カラー・音を瞬時に切り替え</h2>
    <p class="lead">作業フェーズに合わせてUIが変わるので、迷いが消える。</p>
    <div class="tabs">
      <input type="radio" name="tab" id="tab-timeline" checked>
      <input type="radio" name="tab" id="tab-color">
      <input type="radio" name="tab" id="tab-audio">
      <div class="tab-labels">
        <label for="tab-timeline">Timeline</label>
        <label for="tab-color">Color</label>
        <label for="tab-audio">Audio & FX</label>
      </div>
      <div class="tab-panels grid">
        <div class="card panel-timeline">
          <h3>Magnetic Timeline</h3>
          <p>ストーリーの組み立てを加速する自動整列。</p>
        </div>
        <div class="card panel-timeline">
          <h3>AI Cut Assist</h3>
          <p>カット候補とリズムをAIが提案。</p>
        </div>
        <div class="card panel-color">
          <h3>HDR Control</h3>
          <p>HDR/SDRを統合したカラーマネジメント。</p>
        </div>
        <div class="card panel-color">
          <h3>Look Generator</h3>
          <p>現場のルックを再現するプリセット群。</p>
        </div>
        <div class="card panel-audio">
          <h3>Immersive Audio</h3>
          <p>空間音響とノイズ処理を統合。</p>
        </div>
        <div class="card panel-audio">
          <h3>Motion FX</h3>
          <p>テンプレートとカスタムFXの混在運用。</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section reveal" id="use-cases">
    <p class="eyebrow">USE CASES</p>
    <h2>想定する制作現場</h2>
    <p class="lead">「何に使えるか」を最初に見せることで、導入イメージを明確化。</p>
    <div class="grid">
      <div class="card">
        <span class="card-kicker">FILM</span>
        <h3>映画・ドラマ</h3>
        <p>長尺・高解像度案件でも破綻しない安定性。</p>
      </div>
      <div class="card">
        <span class="card-kicker">COMMERCIAL</span>
        <h3>CM・MV</h3>
        <p>カットのテンポとカラーの精度を重視。</p>
      </div>
      <div class="card">
        <span class="card-kicker">YOUTUBE</span>
        <h3>動画配信</h3>
        <p>短納期に対応するプリセットと書き出し。</p>
      </div>
      <div class="card">
        <span class="card-kicker">STUDIO</span>
        <h3>制作会社</h3>
        <p>レビュー・権限管理・チーム運用の最適化。</p>
      </div>
    </div>
  </section>

  <section class="section alt reveal" id="cases">
    <p class="eyebrow">CASE STUDIES</p>
    <h2>導入事例</h2>
    <p class="lead">制作会社・放送局・配信チームでの実在感ある運用例。</p>
    <div class="grid">
      <article class="card case-card">
        <img src="/assets/showcase/aurora/workstation-1.jpg" alt="映画スタジオの編集現場" loading="lazy" decoding="async" width="1400" height="900">
        <span class="card-kicker">FILM</span>
        <h3>劇場向け8K長編のパイプライン</h3>
        <p>ProRes RAWとVFX合成をリアルタイムで確認。試写回数を増やし、仕上がりを安定。</p>
      </article>
      <article class="card case-card">
        <img src="/assets/showcase/aurora/camera-workspace.jpg" alt="CM制作チームのワークフロー" loading="lazy" decoding="async" width="1400" height="900">
        <span class="card-kicker">COMMERCIAL</span>
        <h3>CM制作の短納期ワークフロー</h3>
        <p>撮影当日に初稿、翌日納品。リモートレビューと自動字幕で承認を高速化。</p>
      </article>
      <article class="card case-card">
        <img src="/assets/showcase/aurora/color-grade.jpg" alt="配信番組の編集室" loading="lazy" decoding="async" width="1400" height="900">
        <span class="card-kicker">YOUTUBE</span>
        <h3>配信番組の量産オペレーション</h3>
        <p>テンプレート運用とAIカットで週20本の公開を維持。</p>
      </article>
    </div>
  </section>


  <section class="section alt reveal" id="modules">
    <div class="split">
      <div>
        <p class="eyebrow">CORE MODULES</p>
        <h2>コア機能の見取り図</h2>
        <p class="lead">編集ソフトとして「ここが強い」を明確に見せる構成。</p>
        <div class="case-scroll" aria-label="コア機能ハイライト">
          <div class="case-track">
            <article class="card">
              <img src="/assets/showcase/aurora/keyboard.jpg" alt="編集コントロール" loading="lazy" decoding="async" width="1400" height="900">
              <h3>Precision Control</h3>
              <p>専用ショートカットで操作速度を最大化。</p>
            </article>
            <article class="card">
              <img src="/assets/showcase/aurora/color-grade.jpg" alt="カラースイート" loading="lazy" decoding="async" width="1400" height="900">
              <h3>Color Suite</h3>
              <p>色域管理とLUTの運用を一本化。</p>
            </article>
            <article class="card">
              <img src="/assets/showcase/aurora/workstation-dark.jpg" alt="暗室の編集環境" loading="lazy" decoding="async" width="1400" height="900">
              <h3>Dark Room</h3>
              <p>集中力を維持する照度設計。</p>
            </article>
            <article class="card">
              <img src="/assets/showcase/aurora/camera-workspace.jpg" alt="撮影と編集の連携" loading="lazy" decoding="async" width="1400" height="900">
              <h3>Camera Sync</h3>
              <p>撮影データと編集を即時連携。</p>
            </article>
            <article class="card" aria-hidden="true">
              <img src="/assets/showcase/aurora/keyboard.jpg" alt="" loading="lazy" decoding="async" width="1400" height="900">
              <h3>Precision Control</h3>
              <p>専用ショートカットで操作速度を最大化。</p>
            </article>
            <article class="card" aria-hidden="true">
              <img src="/assets/showcase/aurora/color-grade.jpg" alt="" loading="lazy" decoding="async" width="1400" height="900">
              <h3>Color Suite</h3>
              <p>色域管理とLUTの運用を一本化。</p>
            </article>
            <article class="card" aria-hidden="true">
              <img src="/assets/showcase/aurora/workstation-dark.jpg" alt="" loading="lazy" decoding="async" width="1400" height="900">
              <h3>Dark Room</h3>
              <p>集中力を維持する照度設計。</p>
            </article>
            <article class="card" aria-hidden="true">
              <img src="/assets/showcase/aurora/camera-workspace.jpg" alt="" loading="lazy" decoding="async" width="1400" height="900">
              <h3>Camera Sync</h3>
              <p>撮影データと編集を即時連携。</p>
            </article>
          </div>
        </div>
      </div>
      <div class="media-frame parallax-item" data-parallax="0.08">
        <video autoplay muted loop playsinline preload="metadata" poster="/assets/showcase/aurora/hero-poster.jpg" aria-label="編集タイムラインのクローズアップ">
          <source src="/assets/showcase/aurora/modules-reel.mp4" type="video/mp4">
        </video>
      </div>
    </div>
  </section>

  <section class="section reveal" id="gallery">
    <p class="eyebrow">GALLERY</p>
    <h2>UI / スタジオギャラリー</h2>
    <p class="lead">画面と制作環境を見せることで「使うイメージ」を即座に伝える。</p>
    <div class="gallery">
      <figure class="tall parallax-item" data-parallax="0.06"><img src="/assets/showcase/aurora/hero-poster.jpg" alt="編集UIのイメージ" loading="lazy" decoding="async" width="1200" height="1800"></figure>
      <figure class="wide parallax-item" data-parallax="0.04"><img src="/assets/showcase/aurora/workstation-1.jpg" alt="編集スタジオ" loading="lazy" decoding="async" width="1600" height="900"></figure>
      <figure class="parallax-item" data-parallax="0.05"><img src="/assets/showcase/aurora/workstation-dark.jpg" alt="暗室編集" loading="lazy" decoding="async" width="1200" height="900"></figure>
      <figure class="wide parallax-item" data-parallax="0.04"><img src="/assets/showcase/aurora/camera-workspace.jpg" alt="撮影連携" loading="lazy" decoding="async" width="1600" height="900"></figure>
      <figure class="parallax-item" data-parallax="0.05"><img src="/assets/showcase/aurora/color-grade.jpg" alt="カラーワーク" loading="lazy" decoding="async" width="1200" height="900"></figure>
    </div>
  </section>

  <section class="section alt reveal" id="workflow">
    <div class="split">
      <div>
        <p class="eyebrow">ONBOARDING</p>
        <h2>導入フロー</h2>
        <p class="lead">制作チームのサイズに合わせ、無理なく段階導入。</p>
        <div class="timeline">
          <div class="timeline-item">
            <h3>01 / Discovery</h3>
            <p>既存フローとボトルネックを可視化。</p>
          </div>
          <div class="timeline-item">
            <h3>02 / Pilot</h3>
            <p>小規模案件でパフォーマンスを検証。</p>
          </div>
          <div class="timeline-item">
            <h3>03 / Rollout</h3>
            <p>チーム全体へ導入、テンプレートを整備。</p>
          </div>
          <div class="timeline-item">
            <h3>04 / Optimization</h3>
            <p>運用データから継続的にUIを改善。</p>
          </div>
        </div>
      </div>
      <div class="media-frame parallax-item" data-parallax="0.06">
        <img src="/assets/showcase/aurora/keyboard.jpg" alt="編集デスクのディテール" loading="lazy" decoding="async" width="1400" height="1000">
      </div>
    </div>
  </section>

  <section class="section reveal" id="pricing">
    <p class="eyebrow">PRICING</p>
    <h2>料金プラン</h2>
    <p class="lead">個人から制作チームまで。用途と規模に合わせて段階的にアップグレード。</p>
    <div class="grid pricing-grid">
      <div class="card pricing-card">
        <span class="card-kicker">FREE</span>
        <h3>Trial</h3>
        <p class="price">14日間</p>
        <ul>
          <li>全機能トライアル</li>
          <li>クラウドレビュー3名まで</li>
          <li>4K書き出し</li>
        </ul>
        <a class="btn" href="#pricing">無料で始める</a>
      </div>
      <div class="card pricing-card featured">
        <span class="card-kicker">PRO</span>
        <h3>Creator</h3>
        <p class="price">¥4,980 / 月</p>
        <ul>
          <li>8K書き出し</li>
          <li>AI自動カット・字幕</li>
          <li>カラー/オーディオ統合</li>
        </ul>
        <a class="btn primary" href="#contact">法人デモ</a>
      </div>
      <div class="card pricing-card">
        <span class="card-kicker">STUDIO</span>
        <h3>Enterprise</h3>
        <p class="price">要相談</p>
        <ul>
          <li>無制限シート</li>
          <li>SSO/権限管理</li>
          <li>専任サポート</li>
        </ul>
        <a class="btn" href="#contact">相談する</a>
      </div>
    </div>
  </section>

  <section class="section alt reveal" id="learn">
    <p class="eyebrow">LEARNING</p>
    <h2>学習・サポート</h2>
    <p class="lead">導入初日から現場で使える教材と支援体制を用意。</p>
    <div class="grid">
      <div class="card">
        <span class="card-kicker">ACADEMY</span>
        <h3>公式アカデミー</h3>
        <p>編集・カラー・音まで段階的に学べる動画講座。</p>
      </div>
      <div class="card">
        <span class="card-kicker">TEMPLATE</span>
        <h3>テンプレートライブラリ</h3>
        <p>番組・CM・SNSに特化した構成とルックを提供。</p>
      </div>
      <div class="card">
        <span class="card-kicker">SUPPORT</span>
        <h3>オンボーディング</h3>
        <p>初期設計からテンプレ整備まで専任チームが伴走。</p>
      </div>
    </div>
  </section>


  <section class="section reveal" id="metrics">
    <p class="eyebrow">METRICS</p>
    <h2>実績指標</h2>
    <p class="lead">数字と現場の素材で、導入効果が一目で伝わる構成に。</p>
    <div class="metrics-grid">
      <div class="metrics-copy">
        <div class="metric-bars">
          <div class="metric-bar">
            <div class="bar-label"><span>平均レンダー速度</span><span>+160%</span></div>
            <div class="bar-track"><span style="width: 86%;"></span></div>
          </div>
          <div class="metric-bar">
            <div class="bar-label"><span>レビュー完了までの時間</span><span>-42%</span></div>
            <div class="bar-track"><span style="width: 68%;"></span></div>
          </div>
          <div class="metric-bar">
            <div class="bar-label"><span>テンプレ運用率</span><span>78%</span></div>
            <div class="bar-track"><span style="width: 78%;"></span></div>
          </div>
        </div>
        <div class="metrics-media">
          <figure>
            <img src="/assets/showcase/aurora/workstation-1.jpg" alt="編集スタジオの稼働" loading="lazy" decoding="async" width="1200" height="900">
            <figcaption>STUDIO</figcaption>
          </figure>
          <figure>
            <img src="/assets/showcase/aurora/color-grade.jpg" alt="カラーワークの現場" loading="lazy" decoding="async" width="1200" height="900">
            <figcaption>COLOR</figcaption>
          </figure>
          <figure>
            <img src="/assets/showcase/aurora/editor-portrait.jpg" alt="編集者のワークフロー" loading="lazy" decoding="async" width="1200" height="900">
            <figcaption>TEAM</figcaption>
          </figure>
        </div>
      </div>
      <div class="metrics-cards">
        <article class="card stat-card featured">
          <div class="stat-top">
            <span class="stat-badge">RENDER</span>
            <span class="stat-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z"/></svg>
            </span>
          </div>
          <div class="stat-value">2.6x</div>
          <p class="stat-desc">平均レンダー速度</p>
          <div class="mini-chart" aria-hidden="true"></div>
        </article>
        <article class="card stat-card">
          <div class="stat-top">
            <span class="stat-badge">PLUGINS</span>
            <span class="stat-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M4 4h7v7H4zm9 0h7v7h-7zM4 13h7v7H4zm9 0h7v7h-7z"/></svg>
            </span>
          </div>
          <div class="stat-value">420+</div>
          <p class="stat-desc">プラグイン数</p>
          <div class="mini-chart" aria-hidden="true"></div>
        </article>
        <article class="card stat-card">
          <div class="stat-top">
            <span class="stat-badge">RETENTION</span>
            <span class="stat-ring" aria-hidden="true"><span>94%</span></span>
          </div>
          <div class="stat-value">継続率 94%</div>
          <p class="stat-desc">スタジオ継続率</p>
          <div class="mini-chart" aria-hidden="true"></div>
        </article>
        <article class="card stat-card">
          <div class="stat-top">
            <span class="stat-badge">CREATORS</span>
            <span class="stat-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M8 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm8 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM2 20.4C2 18 4.7 16 8 16s6 2 6 4.4V22H2v-1.6zM16 22v-1.4c0-1.4-.7-2.4-2-3.2 1.1-.3 1.9-.4 2-.4 3.3 0 6 1.8 6 4.2V22h-6z"/></svg>
            </span>
          </div>
          <div class="stat-value">320k</div>
          <p class="stat-desc">クリエイター数</p>
          <div class="mini-chart" aria-hidden="true"></div>
        </article>
      </div>
    </div>
  </section>

  <section class="section alt reveal" id="team">
    <p class="eyebrow">TEAM</p>
    <h2>プロダクトチーム</h2>
    <p class="lead">編集体験の質は“人”で決まる。</p>
    <div class="people">
      <figure>
        <img src="/assets/showcase/aurora/editor-portrait.jpg" alt="プロダクト責任者" loading="lazy" decoding="async" width="1200" height="900">
        <figcaption><strong>西園寺 真</strong><br>Product Director</figcaption>
      </figure>
      <figure>
        <img src="/assets/showcase/aurora/editor-portrait-2.jpg" alt="カラーサイエンス責任者" loading="lazy" decoding="async" width="1200" height="900">
        <figcaption><strong>葛城 結</strong><br>Color Science Lead</figcaption>
      </figure>
      <figure>
        <img src="/assets/showcase/aurora/editor-portrait-3.jpg" alt="編集エンジニア" loading="lazy" decoding="async" width="1200" height="900">
        <figcaption><strong>瀬良 透</strong><br>Editing Engineer</figcaption>
      </figure>
    </div>
  </section>

  <section class="section reveal" id="press">
    <p class="eyebrow">TRUST & AWARDS</p>
    <h2>信頼と受賞歴</h2>
    <p class="lead">放送・制作の現場で評価される理由を、具体的に可視化。</p>
    <div class="press-grid">
      <article class="card press-card">
        <span class="card-kicker">AWARD</span>
        <h3>Post Production Award 2026</h3>
        <p>長編映画部門のポストプロダクション革新賞を受賞。</p>
      </article>
      <article class="card press-card">
        <span class="card-kicker">MEDIA</span>
        <h3>Film Tech Review</h3>
        <p>“カラーの一貫性とUIの直感性が突出”と高評価。</p>
      </article>
      <article class="card press-card">
        <span class="card-kicker">CHOICE</span>
        <h3>Editors' Choice</h3>
        <p>現場での採用率と生産性改善で年間ベストに選出。</p>
      </article>
      <article class="card press-card">
        <span class="card-kicker">UX</span>
        <h3>Studio UX Excellence</h3>
        <p>タイムライン設計とレビュー体験でUX部門受賞。</p>
      </article>
    </div>
  </section>

  <section class="section alt reveal" id="enterprise">
    <p class="eyebrow">ENTERPRISE READY</p>
    <h2>セキュリティと運用体制</h2>
    <p class="lead">大規模チームでも安心して導入できる管理性とサポート。</p>
    <div class="grid trust-grid">
      <article class="card trust-card">
        <div class="trust-media">
          <img src="/assets/showcase/aurora/workstation-dark.jpg" alt="セキュアな編集環境" loading="lazy" decoding="async" width="1400" height="1000">
        </div>
        <span class="card-kicker">SECURITY</span>
        <h3>SSO / 権限 / 監査ログ</h3>
        <p>制作フローを守るためのセキュリティ設計を標準搭載。</p>
        <div class="chip-row">
          <span class="chip chip-small" style="--chip-img: url('/assets/showcase/aurora/keyboard.jpg');">SSO/2FA</span>
          <span class="chip chip-small" style="--chip-img: url('/assets/showcase/aurora/workstation-1.jpg');">監査ログ</span>
        </div>
      </article>
      <article class="card trust-card">
        <div class="trust-media">
          <img src="/assets/showcase/aurora/keyboard.jpg" alt="安定稼働の監視体制" loading="lazy" decoding="async" width="1400" height="900">
        </div>
        <span class="card-kicker">SLA</span>
        <h3>99.95%稼働保証</h3>
        <p>24/7監視と専任SREで制作スケジュールを守る。</p>
        <div class="chip-row">
          <span class="chip chip-small" style="--chip-img: url('/assets/showcase/aurora/color-grade.jpg');">24/7監視</span>
          <span class="chip chip-small" style="--chip-img: url('/assets/showcase/aurora/hero-poster.jpg');">SRE常駐</span>
        </div>
      </article>
      <article class="card trust-card">
        <div class="trust-media">
          <img src="/assets/showcase/aurora/editor-portrait-2.jpg" alt="導入支援チーム" loading="lazy" decoding="async" width="1400" height="900">
        </div>
        <span class="card-kicker">SUPPORT</span>
        <h3>専任CS / 導入設計</h3>
        <p>移行テンプレートとトレーニングを提供。</p>
        <div class="chip-row">
          <span class="chip chip-small" style="--chip-img: url('/assets/showcase/aurora/editor-portrait.jpg');">導入設計</span>
          <span class="chip chip-small" style="--chip-img: url('/assets/showcase/aurora/workstation-dark.jpg');">移行支援</span>
        </div>
      </article>
    </div>
  </section>

  
  <section class="section alt reveal" id="contact">
    <div class="cta">
      <div>
        <p class="eyebrow">GET STARTED</p>
        <h2>無料トライアルと法人デモを用意しています</h2>
        <p>案件規模やワークフローに合わせ、最適な導入方法をご提案します。</p>
        <div class="cta-points">
          <span class="chip chip-small" style="--chip-img: url('/assets/showcase/aurora/hero-poster.jpg');">14日間の全機能トライアル</span>
          <span class="chip chip-small" style="--chip-img: url('/assets/showcase/aurora/workstation-1.jpg');">導入ワークショップ</span>
          <span class="chip chip-small" style="--chip-img: url('/assets/showcase/aurora/keyboard.jpg');">移行テンプレート提供</span>
        </div>
      </div>
      <div class="cta-actions">
        <a class="btn" href="#pricing">無料トライアル</a>
        <a class="btn secondary" href="#contact">法人デモ</a>
      </div>
    </div>
  </section>


  <section class="section reveal">
    <p class="eyebrow">CREDITS</p>
    <h2>素材クレジット（デモ用）</h2>
    <p class="lead">このページはデモのため素材出典を明記しています。</p>
    <p class="credits">
      Photos: 
      <a href="https://www.pexels.com/photo/modern-video-editing-setup-with-ultrawide-monitor-28955773/">28955773</a>,
      <a href="https://www.pexels.com/photo/modern-home-office-with-video-editing-setup-28955777/">28955777</a>,
      <a href="https://www.pexels.com/photo/person-editing-video-in-dark-studio-17147713/">17147713</a>,
      <a href="https://www.pexels.com/photo/professional-video-editing-workspace-with-keyboard-30229850/">30229850</a>,
      <a href="https://www.pexels.com/photo/modern-video-editing-workspace-with-camera-setup-34002297/">34002297</a>,
      <a href="https://www.pexels.com/photo/a-man-editing-video-8102683/">8102683</a>,
      <a href="https://www.pexels.com/photo/video-editor-working-on-color-grading-21576414/">21576414</a>,
      <a href="https://www.pexels.com/photo/video-editor-at-work-in-studio-13833255/">13833255</a>,
      <a href="https://www.pexels.com/photo/man-working-on-laptop-3861973/">3861973</a>.
      Videos: 
      <a href="https://www.pexels.com/video/advanced-video-editing-timeline-close-up-34386509/">34386509</a>,
      <a href="https://www.pexels.com/video/professional-video-editing-timeline-in-motion-33414463/">33414463</a>,
      <a href="https://commons.wikimedia.org/wiki/File:Light_Leaks_7_--FREE_FOOTAGE--.webm">Light Leaks 7</a>.
      Logo: Custom monogram (in-house).
    </p>
  </section>
</main>

<script>
(() => {
  const root = document.documentElement;
  const header = document.querySelector('.site-header');
  const progress = document.querySelector('.scroll-progress span');
  const reveals = document.querySelectorAll('.reveal');
  const parallaxItems = Array.from(document.querySelectorAll('[data-parallax]'));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const navLinks = Array.from(document.querySelectorAll('.nav a'));
  const smoothLinks = Array.from(document.querySelectorAll('a[href^="#"]'));

  const setActiveNav = (id) => {
    if (!id) return;
    navLinks.forEach((link) => {
      const target = link.getAttribute('href')?.replace('#', '');
      const isActive = target === id;
      link.classList.toggle('is-active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  const updateProgress = () => {
    const doc = document.documentElement;
    const scrolled = doc.scrollTop || document.body.scrollTop;
    const height = doc.scrollHeight - doc.clientHeight;
    const pct = height > 0 ? (scrolled / height) * 100 : 0;
    progress.style.width = pct + '%';
  };

  const updateParallax = () => {
    if (reduceMotion) return;
    const scrollY = window.scrollY || window.pageYOffset;
    parallaxItems.forEach((el) => {
      const speed = parseFloat(el.dataset.parallax || '0.05');
      const rect = el.getBoundingClientRect();
      const offsetTop = rect.top + scrollY;
      const offset = (scrollY - offsetTop) * speed;
      el.style.transform = `translateY(${offset}px)`;
    });
  };

  smoothLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      history.replaceState(null, '', href);
    });
  });

  if (navLinks.length) {
    const sectionTargets = navLinks
      .map((link) => document.querySelector(link.getAttribute('href')))
      .filter(Boolean);

    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveNav(entry.target.id);
        }
      });
    }, { threshold: 0.45, rootMargin: '-20% 0px -55% 0px' });

    sectionTargets.forEach((section) => navObserver.observe(section));
  }

  if (!reduceMotion) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });

    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  let ticking = false;
  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateProgress();
        updateParallax();
        if (header) {
          header.classList.toggle('is-scrolled', (window.scrollY || document.documentElement.scrollTop) > 12);
        }
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', updateParallax);
  updateProgress();
  updateParallax();
  if (header) {
    header.classList.toggle('is-scrolled', (window.scrollY || document.documentElement.scrollTop) > 12);
  }

  window.addEventListener('mousemove', (event) => {
    root.style.setProperty('--mx', `${event.clientX}px`);
    root.style.setProperty('--my', `${event.clientY}px`);
  });
})();
</script>
