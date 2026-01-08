---
layout: page
title: ホーム
subtitle: 動画編集効率化ツール【ゆっくりまとめプロセッサー】
permalink: /
---

<style>
  /* Google Fonts の読み込み - 読みやすいフォント */
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&family=Inter:wght@400;600;700;800&family=Oswald:wght@400;600;700&family=Raleway:wght@700;800;900&family=Roboto:wght@700;900&display=swap');

  /* ========== グローバル設定 ========== */
  * {
    box-sizing: border-box;
  }

  body {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    font-family: 'Noto Sans JP', 'Inter', sans-serif;
  }

  .page-content {
    max-width: 100%;
    margin: 0;
    padding: 0;
    background: transparent;
    box-shadow: none;
    border-radius: 0;
  }

  /* ========== ヒーローセクション - 超カッコいいスライダー ========== */
  .hero-section {
    position: relative;
    height: 85vh;
    min-height: 650px;
    max-height: 900px;
    overflow: hidden;
    margin-top: -5rem;
  }

  /* スライダーコンテナ */
  .hero-slider {
    position: relative;
    width: 100%;
    height: 100%;
    perspective: 1500px;
    overflow: hidden;
  }

  .hero-slide {
    position: absolute;
    top: 0;
    left: 50%;
    width: 100%;
    height: 100%;
    transform: translateX(-50%);
    transition: all 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    opacity: 0;
    pointer-events: none;
    transform-style: preserve-3d;
  }

  .hero-slide.active {
    transform: translateX(-50%) translateZ(0) scale(1);
    opacity: 1;
    z-index: 10;
    pointer-events: auto;
  }

  .hero-slide.prev {
    transform: translateX(-90%) translateZ(-250px) scale(0.7) rotateY(25deg);
    opacity: 0.6;
    z-index: 5;
  }

  .hero-slide.next {
    transform: translateX(-10%) translateZ(-250px) scale(0.7) rotateY(-25deg);
    opacity: 0.6;
    z-index: 5;
  }

  .hero-slide::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.75) 0%, rgba(118, 75, 162, 0.75) 100%);
    z-index: 1;
  }

  .hero-slide-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    animation: kenBurns 20s ease-in-out infinite alternate;
  }

  @keyframes kenBurns {
    0% {
      transform: scale(1) translate(0, 0);
    }
    100% {
      transform: scale(1.1) translate(-20px, -20px);
    }
  }

  /* マスコットキャラクター専用スタイル */
  .hero-slide.mascot-slide .hero-slide-image {
    object-fit: contain;
    animation: float 4s ease-in-out infinite;
  }

  .hero-slide.mascot-slide::before {
    background: linear-gradient(135deg, rgba(255, 107, 107, 0.75) 0%, rgba(238, 90, 111, 0.75) 100%);
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0) scale(1);
    }
    50% {
      transform: translateY(-30px) scale(1.05);
    }
  }

  /* スライダーコンテンツオーバーレイ */
  .hero-slide-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    z-index: 3;
    width: 90%;
    max-width: 1200px;
  }

  .hero-slide-title {
    font-family: 'Oswald', 'Raleway', 'Noto Sans JP', sans-serif !important;
    font-size: 4.5em;
    font-weight: 700;
    color: #ffffff !important;
    margin-bottom: 25px;
    line-height: 1.15;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    text-shadow:
      4px 4px 8px rgba(0, 0, 0, 0.9),
      2px 2px 15px rgba(0, 0, 0, 0.8),
      0 0 40px rgba(0, 0, 0, 0.7),
      0 0 20px rgba(255, 215, 0, 0.5);
    animation: titlePulseGlow 3s ease-in-out infinite, slideInUp 1s ease-out;
    transform-origin: center;
  }

  @keyframes titlePulseGlow {
    0%, 100% {
      transform: scale(1);
      text-shadow:
        4px 4px 8px rgba(0, 0, 0, 0.9),
        2px 2px 15px rgba(0, 0, 0, 0.8),
        0 0 40px rgba(0, 0, 0, 0.7),
        0 0 20px rgba(255, 215, 0, 0.5);
    }
    50% {
      transform: scale(1.03);
      text-shadow:
        5px 5px 10px rgba(0, 0, 0, 1),
        3px 3px 20px rgba(0, 0, 0, 0.9),
        0 0 50px rgba(0, 0, 0, 0.8),
        0 0 35px rgba(255, 215, 0, 0.8),
        0 0 20px rgba(255, 255, 255, 0.6);
    }
  }

  .hero-slide-subtitle {
    font-family: 'Noto Sans JP', 'Raleway', sans-serif !important;
    font-size: 1.65em;
    font-weight: 700;
    color: #ffffff !important;
    margin-bottom: 35px;
    line-height: 1.7;
    text-shadow:
      3px 3px 10px rgba(0, 0, 0, 0.9),
      2px 2px 6px rgba(0, 0, 0, 0.8),
      0 0 25px rgba(0, 0, 0, 0.6);
    animation: slideInUp 1s ease-out 0.2s both;
  }

  /* キーワード強調スタイル */
  .hero-slide-subtitle .highlight-keyword {
    font-family: 'Raleway', 'Noto Sans JP', sans-serif !important;
    font-size: 1.25em;
    font-weight: 900;
    color: #ff3b3b !important;
    background: linear-gradient(135deg, #ff3b3b 0%, #ff6b6b 50%, #ffeb3b 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-decoration: underline;
    text-decoration-color: #ff3b3b;
    text-decoration-thickness: 3px;
    text-underline-offset: 4px;
    text-shadow: none;
    filter: drop-shadow(0 0 15px rgba(255, 59, 59, 0.8))
            drop-shadow(2px 2px 6px rgba(0, 0, 0, 0.9));
    animation: keywordGlow 2s ease-in-out infinite;
    display: inline-block;
    padding: 0 8px;
  }

  @keyframes keywordGlow {
    0%, 100% {
      filter: drop-shadow(0 0 15px rgba(255, 59, 59, 0.8))
              drop-shadow(2px 2px 6px rgba(0, 0, 0, 0.9));
    }
    50% {
      filter: drop-shadow(0 0 30px rgba(255, 59, 59, 1))
              drop-shadow(0 0 15px rgba(255, 235, 59, 0.8))
              drop-shadow(3px 3px 8px rgba(0, 0, 0, 1));
    }
  }

  .hero-slide-cta {
    animation: slideInUp 1s ease-out 0.4s both;
    display: flex;
    gap: 15px;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(60px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* スライダーナビゲーションドット */
  .hero-slider-dots {
    position: absolute;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    display: flex;
    gap: 15px;
    padding: 12px 20px;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(15px);
    border-radius: 50px;
    border: 2px solid rgba(255, 255, 255, 0.25);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  }

  .hero-slider-dot {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.35);
    border: 2px solid rgba(255, 255, 255, 0.7);
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
  }

  .hero-slider-dot:hover {
    background: rgba(255, 255, 255, 0.65);
    transform: scale(1.25);
    box-shadow: 0 6px 20px rgba(255, 255, 255, 0.3);
  }

  .hero-slider-dot.active {
    background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
    width: 50px;
    border-radius: 12px;
    border: 2px solid rgba(255, 255, 255, 0.95);
    box-shadow:
      0 6px 25px rgba(255, 255, 255, 0.6),
      0 3px 10px rgba(0, 0, 0, 0.3);
  }

  /* スライダー矢印 */
  .hero-slider-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(245, 247, 250, 0.95) 100%);
    backdrop-filter: blur(20px);
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 2px solid rgba(102, 126, 234, 0.6);
    font-size: 1.8em;
    color: #667eea;
    font-weight: 900;
    box-shadow:
      0 10px 30px rgba(0, 0, 0, 0.3),
      inset 0 2px 8px rgba(255, 255, 255, 0.8);
  }

  .hero-slider-arrow:hover {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #ffffff;
    transform: translateY(-50%) scale(1.15);
    border-color: rgba(255, 255, 255, 0.9);
    box-shadow:
      0 15px 50px rgba(102, 126, 234, 0.6),
      0 5px 20px rgba(0, 0, 0, 0.4),
      inset 0 2px 10px rgba(255, 255, 255, 0.3);
  }

  .hero-slider-arrow.left {
    left: 35px;
  }

  .hero-slider-arrow.right {
    right: 35px;
  }

  /* スライド番号インジケーター - 非表示 */
  .hero-slider-counter {
    display: none !important;
  }

  .btn {
    padding: 18px 45px;
    font-size: 1.15em;
    font-weight: 900;
    border: 3px solid rgba(0, 0, 0, 0.5);
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    text-decoration: none !important;
    display: inline-block;
    position: relative;
    overflow: hidden;
    margin: 8px;
    text-shadow:
      3px 3px 10px rgba(0, 0, 0, 0.9),
      2px 2px 6px rgba(0, 0, 0, 0.8),
      0 0 25px rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(5px);
  }

  .btn-primary {
    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
    color: #ffffff !important;
    box-shadow:
      0 20px 50px rgba(238, 90, 111, 0.7),
      0 10px 25px rgba(0, 0, 0, 0.4),
      inset 0 3px 8px rgba(255, 255, 255, 0.3);
    border-color: rgba(238, 90, 111, 0.6);
  }

  .btn-primary:hover {
    transform: translateY(-8px) scale(1.1);
    box-shadow:
      0 30px 70px rgba(238, 90, 111, 0.9),
      0 15px 35px rgba(0, 0, 0, 0.5),
      inset 0 3px 10px rgba(255, 255, 255, 0.5);
    border-color: #ffd700;
    border-width: 4px;
    color: #ffffff !important;
    text-shadow:
      2px 2px 8px rgba(0, 0, 0, 0.6),
      0 0 20px rgba(255, 215, 0, 0.6);
  }

  .btn-secondary {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(245, 247, 250, 0.95) 100%);
    color: #667eea !important;
    box-shadow:
      0 20px 50px rgba(0, 0, 0, 0.5),
      0 10px 25px rgba(0, 0, 0, 0.3),
      inset 0 3px 8px rgba(255, 255, 255, 0.6);
    border: 3px solid rgba(102, 126, 234, 0.9);
    text-shadow:
      3px 3px 8px rgba(0, 0, 0, 0.5),
      0 0 20px rgba(102, 126, 234, 0.5);
  }

  .btn-secondary:hover {
    transform: translateY(-8px) scale(1.1);
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #ffffff !important;
    box-shadow:
      0 30px 70px rgba(102, 126, 234, 0.9),
      0 15px 35px rgba(0, 0, 0, 0.5),
      inset 0 3px 10px rgba(255, 255, 255, 0.5);
    border-color: #ffd700;
    border-width: 4px;
    text-shadow:
      2px 2px 8px rgba(0, 0, 0, 0.5),
      0 0 20px rgba(255, 255, 255, 0.7);
  }

  .btn-premium {
    background: linear-gradient(135deg, #ffd700 0%, #ffeb3b 100%);
    color: #ffffff !important;
    box-shadow:
      0 20px 50px rgba(255, 215, 0, 0.7),
      0 10px 25px rgba(0, 0, 0, 0.4),
      inset 0 3px 8px rgba(255, 255, 255, 0.6);
    border: 3px solid rgba(255, 215, 0, 0.9);
    font-weight: 900;
    text-shadow:
      3px 3px 8px rgba(0, 0, 0, 0.9),
      0 0 20px rgba(0, 0, 0, 0.5);
    width: 100%;
  }

  .btn-premium:hover {
    transform: translateY(-8px) scale(1.1);
    background: linear-gradient(135deg, #ffeb3b 0%, #fff5cc 100%);
    color: #1a1f35 !important;
    box-shadow:
      0 30px 70px rgba(255, 215, 0, 0.9),
      0 15px 35px rgba(0, 0, 0, 0.5),
      inset 0 3px 10px rgba(255, 255, 255, 0.7);
    border-color: #fff;
    border-width: 4px;
    text-shadow:
      1px 1px 3px rgba(0, 0, 0, 0.3),
      0 0 15px rgba(255, 255, 255, 0.5);
  }

  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes shineSwipe {
    0% {
      left: -150%;
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    100% {
      left: 150%;
      opacity: 0;
    }
  }

  @keyframes titleGlow {
    0%, 100% {
      text-shadow:
        2px 2px 5px rgba(0, 0, 0, 0.2),
        -1px -1px 2px rgba(255, 255, 255, 0.8);
    }
    50% {
      text-shadow:
        2px 2px 5px rgba(0, 0, 0, 0.2),
        -1px -1px 2px rgba(255, 255, 255, 0.8),
        0 0 20px rgba(102, 126, 234, 0.6),
        0 0 40px rgba(102, 126, 234, 0.3);
    }
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-60px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(60px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes titlePulseGlow {
    0%, 100% {
      text-shadow: 0 0 5px rgba(102, 126, 234, 0.3);
    }
    50% {
      text-shadow:
        0 0 15px rgba(102, 126, 234, 0.6),
        0 0 25px rgba(102, 126, 234, 0.4);
    }
  }

  @keyframes barShine {
    0% {
      transform: scaleX(0);
      opacity: 0;
    }
    50% {
      transform: scaleX(1);
      opacity: 1;
    }
    100% {
      transform: scaleX(0);
      transform-origin: right;
      opacity: 0;
    }
  }

  /* ========== 統計セクション - 統一感のあるプロフェッショナルデザイン ========== */
  .stats-section {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 100px 20px;
    margin-top: -50px;
    position: relative;
    z-index: 3;
    box-shadow: 0 -10px 50px rgba(0, 0, 0, 0.3);
  }

  .stats-container {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 40px;
  }

  .stat-card {
    text-align: center;
    padding: 40px 30px;
    border-radius: 25px;
    background: rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 2px solid rgba(255, 255, 255, 0.25);
    box-shadow:
      0 15px 45px rgba(0, 0, 0, 0.2),
      inset 0 2px 10px rgba(255, 255, 255, 0.15);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }

  .stat-card::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -150%;
    width: 80%;
    height: 200%;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.1) 40%,
      rgba(255, 255, 255, 0.6) 50%,
      rgba(255, 255, 255, 0.1) 60%,
      transparent 100%
    );
    transform: skewX(-25deg);
    animation: shineSwipe 4s ease-in-out infinite;
    animation-delay: calc(var(--card-index) * 0.3s);
  }

  .stat-card:hover::before {
    animation-duration: 2s;
  }

  .stat-card:hover {
    transform: translateY(-15px) scale(1.05);
    background: rgba(255, 255, 255, 0.18);
    border-color: rgba(255, 255, 255, 0.45);
    box-shadow:
      0 25px 60px rgba(0, 0, 0, 0.35),
      0 0 40px rgba(255, 255, 255, 0.2),
      inset 0 2px 15px rgba(255, 255, 255, 0.25);
  }

  .stat-number {
    font-family: 'Oswald', 'Roboto', sans-serif !important;
    font-size: 4.5em;
    font-weight: 700;
    color: #ffffff !important;
    margin-bottom: 20px;
    line-height: 1.2;
    min-height: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-shadow:
      3px 3px 8px rgba(0, 0, 0, 0.8),
      2px 2px 15px rgba(0, 0, 0, 0.6),
      0 0 30px rgba(0, 0, 0, 0.5),
      0 0 15px rgba(255, 215, 0, 0.4);
    letter-spacing: 0.05em;
    animation: statPulse 3s ease-in-out infinite;
  }

  .stat-number.stat-stars {
    font-size: 2.8em;
    color: #ffd700 !important;
    text-shadow:
      3px 3px 10px rgba(0, 0, 0, 0.9),
      0 0 30px rgba(255, 215, 0, 0.8),
      0 0 15px rgba(255, 215, 0, 0.6);
    filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.8));
  }

  @keyframes statPulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }

  .stat-label {
    font-family: 'Raleway', 'Noto Sans JP', sans-serif !important;
    font-size: 1.15em;
    color: #ffffff !important;
    font-weight: 800;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    text-shadow:
      2px 2px 6px rgba(0, 0, 0, 0.7),
      0 0 15px rgba(0, 0, 0, 0.5);
  }

  /* ========== 特徴セクション ========== */
  .features-section {
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    padding: 100px 20px;
  }

  .section-header {
    text-align: center;
    max-width: 800px;
    margin: 0 auto 60px;
  }

  .section-title {
    font-size: 3em;
    font-weight: 900;
    color: #0a0e1a !important;
    margin-bottom: 20px;
    position: relative;
    display: inline-block;
    text-shadow:
      2px 2px 5px rgba(0, 0, 0, 0.2),
      -1px -1px 2px rgba(255, 255, 255, 0.8);
    animation: titleGlow 3s ease-in-out infinite;
  }

  .section-title::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 5px;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    border-radius: 3px;
    box-shadow: 0 3px 10px rgba(102, 126, 234, 0.4);
  }

  .section-subtitle {
    font-size: 1.3em;
    font-weight: 700;
    color: #2d3748 !important;
    margin-top: 30px;
    text-shadow: 0 2px 4px rgba(255, 255, 255, 0.8);
  }

  .features-grid {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 40px;
  }

  .feature-card {
    background: white;
    padding: 40px 30px;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    opacity: 0;
  }

  .feature-card.animate-in {
    animation: fadeInUp 0.8s ease forwards;
  }

  .feature-card:nth-child(odd).animate-in {
    animation: slideInLeft 0.8s ease forwards;
  }

  .feature-card:nth-child(even).animate-in {
    animation: slideInRight 0.8s ease forwards;
  }

  .feature-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    transform: scaleX(0);
    transform-origin: left;
    animation: barShine 3s ease-in-out infinite;
  }

  .feature-card:hover::before {
    animation: none;
    transform: scaleX(1);
  }

  .feature-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
  }

  .feature-icon {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5em;
    margin-bottom: 25px;
    box-shadow:
      0 15px 35px rgba(102, 126, 234, 0.4),
      inset 0 -5px 15px rgba(0, 0, 0, 0.2);
    animation: iconFloat 3s ease-in-out infinite;
    filter: drop-shadow(0 5px 10px rgba(0, 0, 0, 0.2));
  }

  @keyframes iconFloat {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-10px) rotate(5deg); }
  }

  .feature-card:hover .feature-icon {
    transform: scale(1.1) rotate(10deg);
    box-shadow:
      0 20px 45px rgba(102, 126, 234, 0.6),
      inset 0 -5px 15px rgba(0, 0, 0, 0.3);
  }

  .feature-title {
    font-size: 1.6em;
    font-weight: 800;
    color: #1a202c;
    margin-bottom: 15px;
    letter-spacing: -0.01em;
    animation: titlePulseGlow 2.5s ease-in-out infinite;
  }

  .feature-description {
    color: #4a5568;
    line-height: 1.9;
    font-size: 1.1em;
    font-weight: 500;
  }

  /* ========== スクリーンショットセクション ========== */
  .screenshots-section {
    background: white;
    padding: 100px 20px;
  }

  .carousel {
    max-width: 1000px;
    margin: 0 auto;
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  }

  .carousel-track {
    display: flex;
    transition: transform 0.5s ease-in-out;
  }

  .carousel-slide {
    min-width: 100%;
    position: relative;
  }

  .carousel-slide img {
    width: 100%;
    display: block;
    cursor: pointer;
    transition: transform 0.3s ease;
  }

  .carousel-slide img:hover {
    transform: scale(1.02);
  }

  .carousel-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.9);
    border: none;
    color: #667eea;
    font-size: 2em;
    cursor: pointer;
    z-index: 10;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }

  .carousel-button:hover {
    background: white;
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }

  .carousel-button--left {
    left: 20px;
  }

  .carousel-button--right {
    right: 20px;
  }

  .carousel-indicators {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    display: flex;
    gap: 10px;
  }

  .carousel-indicator {
    width: 12px;
    height: 12px;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid white;
  }

  .carousel-indicator:hover {
    transform: scale(1.2);
  }

  .carousel-indicator.active {
    background: white;
    width: 30px;
    border-radius: 6px;
  }

  /* ========== 使い方ガイドセクション ========== */
  .howto-section {
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    padding: 100px 20px;
  }

  .howto-container {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 40px;
  }

  .howto-card {
    background: white;
    padding: 50px 35px;
    border-radius: 25px;
    text-align: center;
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.15);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border: 3px solid transparent;
    position: relative;
    overflow: hidden;
    opacity: 0;
  }

  .howto-card.animate-in {
    animation: fadeInUp 0.8s ease forwards;
  }

  .howto-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    transform: scaleX(0);
    transform-origin: left;
    animation: barShine 3.5s ease-in-out infinite;
  }

  .howto-card:hover::before {
    animation: none;
    transform: scaleX(1);
  }

  .howto-card:hover {
    transform: translateY(-15px);
    box-shadow: 0 25px 70px rgba(102, 126, 234, 0.3);
    border-color: #667eea;
  }

  .howto-step {
    display: inline-block;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    font-weight: 900;
    font-size: 0.85em;
    padding: 8px 20px;
    border-radius: 50px;
    margin-bottom: 25px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    letter-spacing: 0.1em;
  }

  .howto-icon {
    font-size: 5em;
    margin-bottom: 25px;
    filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.2));
  }

  .howto-title {
    font-size: 2em;
    font-weight: 900;
    color: #0a0e1a;
    margin-bottom: 20px;
    animation: titlePulseGlow 2.5s ease-in-out infinite;
  }

  .howto-text {
    font-size: 1.1em;
    color: #4a5568;
    line-height: 1.8;
    margin-bottom: 25px;
  }

  .howto-link {
    display: inline-block;
    color: #667eea !important;
    font-weight: 800;
    font-size: 1.05em;
    text-decoration: none !important;
    padding: 12px 30px;
    border: 2px solid #667eea;
    border-radius: 50px;
    transition: all 0.3s ease;
  }

  .howto-link:hover {
    background: #667eea;
    color: white !important;
    transform: scale(1.05);
  }

  /* ========== お客様の声セクション（3D カルーセル） ========== */
  .testimonials-section {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 120px 20px;
    color: white;
    position: relative;
    overflow: hidden;
  }

  .testimonials-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.08) 0%, transparent 50%),
                      radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.08) 0%, transparent 50%);
    pointer-events: none;
  }

  .testimonials-grid {
    max-width: 1400px;
    margin: 60px auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
    padding: 0 20px;
  }

  .testimonial-card-luxury {
    background: rgba(20, 25, 50, 0.7);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    padding: 40px 30px;
    border-radius: 25px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    box-shadow:
      0 20px 60px rgba(0, 0, 0, 0.5),
      inset 0 2px 15px rgba(255, 255, 255, 0.1);
    position: relative;
    transition: all 0.4s ease;
    min-height: 400px;
    height: 100%;
    display: flex;
    flex-direction: column;
    opacity: 0;
  }

  .testimonial-card-luxury.animate-in {
    animation: fadeInUp 0.8s ease forwards;
  }

  .testimonial-card-luxury:hover {
    transform: translateY(-8px);
    box-shadow:
      0 30px 80px rgba(0, 0, 0, 0.6),
      inset 0 2px 20px rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.5);
  }

  .testimonial-quote {
    position: absolute;
    top: 20px;
    left: 25px;
    font-size: 6em;
    font-weight: 900;
    color: rgba(255, 255, 255, 0.1);
    font-family: Georgia, serif;
    line-height: 0.8;
  }

  .testimonial-stars {
    color: #ffd700;
    font-size: 1.6em;
    margin-bottom: 20px;
    filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.6));
    letter-spacing: 0.08em;
  }

  .testimonial-text-luxury {
    font-size: 1.1em;
    font-weight: 600;
    line-height: 1.8;
    margin-bottom: 30px;
    color: #ffffff !important;
    text-shadow:
      2px 2px 6px rgba(0, 0, 0, 0.7),
      0 0 12px rgba(0, 0, 0, 0.4);
    position: relative;
    z-index: 1;
    flex-grow: 1;
  }

  .testimonial-text-luxury strong {
    color: #ffeb3b !important;
    font-weight: 900;
    text-shadow:
      2px 2px 4px rgba(0, 0, 0, 0.8),
      0 0 15px rgba(255, 235, 59, 0.5);
  }

  .testimonial-author-luxury {
    display: flex;
    align-items: center;
    gap: 15px;
    padding-top: 25px;
    border-top: 2px solid rgba(255, 255, 255, 0.25);
  }

  .testimonial-avatar-luxury {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, #ffd700 0%, #ffa000 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.6em;
    font-weight: 900;
    color: #1a1f35;
    text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 20px rgba(255, 215, 0, 0.4);
    border: 3px solid rgba(255, 255, 255, 0.5);
    flex-shrink: 0;
  }

  .testimonial-name-luxury {
    font-weight: 900;
    font-size: 1.15em;
    color: #ffffff !important;
    margin-bottom: 5px;
    text-shadow:
      2px 2px 5px rgba(0, 0, 0, 0.7),
      0 0 12px rgba(0, 0, 0, 0.4);
  }

  .testimonial-role-luxury {
    font-weight: 700;
    font-size: 0.95em;
    color: rgba(255, 235, 59, 0.95) !important;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.6);
  }


  /* ========== 料金セクション（リッチデザイン） ========== */
  .pricing-section {
    background: linear-gradient(135deg, #1a1f35 0%, #2d3561 100%);
    padding: 120px 20px;
    position: relative;
    overflow: hidden;
  }

  .pricing-section .section-title {
    color: #ffffff !important;
    text-shadow: 3px 3px 10px rgba(0, 0, 0, 0.8);
  }

  .pricing-section .section-subtitle {
    color: #f7fafc !important;
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
    font-weight: 600;
  }

  .pricing-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image:
      radial-gradient(circle at 20% 30%, rgba(102, 126, 234, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(118, 75, 162, 0.15) 0%, transparent 50%);
    pointer-events: none;
  }

  .pricing-container {
    max-width: 1300px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 50px;
    position: relative;
    z-index: 1;
  }

  .pricing-card {
    background: white;
    border: 2px solid #e2e8f0;
    border-radius: 20px;
    padding: 40px 30px;
    text-align: center;
    transition: all 0.3s ease;
    position: relative;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .pricing-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
    border-color: #667eea;
  }

  .pricing-card.featured {
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%);
    border: 3px solid rgba(255, 215, 0, 0.5);
    transform: scale(1.08);
    box-shadow:
      0 30px 80px rgba(102, 126, 234, 0.5),
      inset 0 2px 20px rgba(255, 255, 255, 0.15),
      0 0 80px rgba(255, 215, 0, 0.4);
  }

  .pricing-card.featured:hover {
    transform: translateY(-15px) scale(1.1);
    box-shadow:
      0 45px 100px rgba(102, 126, 234, 0.6),
      inset 0 2px 30px rgba(255, 255, 255, 0.2),
      0 0 100px rgba(255, 215, 0, 0.6);
    border-color: rgba(255, 215, 0, 0.8);
  }


  .pricing-name {
    font-size: 1.5em;
    font-weight: 700;
    margin-bottom: 15px;
    color: #2d3748;
  }

  .pricing-card.featured .pricing-name {
    font-size: 2em;
    font-weight: 900;
    margin-bottom: 20px;
    font-family: 'Oswald', 'Noto Sans JP', sans-serif;
    color: #ffffff;
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
    letter-spacing: 0.05em;
  }

  .pricing-price {
    font-size: 2.5em;
    font-weight: 900;
    margin: 20px 0;
    color: #2d3748;
  }

  .pricing-card.featured .pricing-price {
    font-size: 2em;
    margin: 30px 0;
    background: linear-gradient(135deg, #ffd700 0%, #ffeb3b 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.5));
    font-family: 'Oswald', sans-serif;
  }

  .pricing-price sup {
    font-size: 0.35em;
    vertical-align: super;
  }

  .pricing-features {
    list-style: none;
    padding: 0;
    margin: 30px 0;
    text-align: left;
  }

  .pricing-features li {
    padding: 12px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    color: #4a5568;
  }

  .pricing-card.featured .pricing-features {
    margin: 40px 0;
  }

  .pricing-card.featured .pricing-features li {
    padding: 15px 20px;
    margin: 10px 0;
    border-radius: 12px;
    border-bottom: none;
    background: rgba(255, 255, 255, 0.25);
    border: 2px solid rgba(255, 215, 0, 0.6);
    color: #ffffff;
    font-weight: 900;
    font-size: 1.1em;
    transition: all 0.3s ease;
    text-shadow: 3px 3px 10px rgba(0, 0, 0, 0.9);
  }

  .pricing-card.featured .pricing-features li:hover {
    background: rgba(255, 255, 255, 0.35);
    border-color: rgba(255, 215, 0, 0.9);
    transform: translateX(5px) scale(1.02);
    box-shadow: 0 8px 20px rgba(255, 215, 0, 0.5);
  }

  .pricing-features li::before {
    content: '✓';
    margin-right: 10px;
    color: #48bb78;
    font-weight: 700;
  }

  .pricing-card.featured .pricing-features li::before {
    margin-right: 15px;
    color: #ffd700;
    font-weight: 900;
    font-size: 1.3em;
    text-shadow: 0 0 15px rgba(255, 215, 0, 0.8);
  }

  .pricing-btn {
    width: 100%;
    margin-top: 10px;
  }

  /* ========== CTAセクション ========== */
  .cta-section {
    background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
    color: white;
    padding: 100px 20px;
    text-align: center;
  }

  .cta-content {
    max-width: 800px;
    margin: 0 auto;
  }

  .cta-title {
    font-size: 2.8em;
    font-weight: 900;
    margin-bottom: 20px;
    color: #ffffff !important;
    text-shadow:
      3px 3px 8px rgba(0, 0, 0, 0.7),
      0 0 20px rgba(0, 0, 0, 0.5);
  }

  .cta-text {
    font-size: 1.35em;
    font-weight: 700;
    margin-bottom: 40px;
    color: #ffffff !important;
    text-shadow:
      2px 2px 6px rgba(0, 0, 0, 0.7),
      0 0 15px rgba(0, 0, 0, 0.4);
  }

  /* ========== モーダル ========== */
  .modal {
    display: none;
    position: fixed;
    z-index: 10000;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.95);
    justify-content: center;
    align-items: center;
  }

  .modal img {
    max-width: 90vw;
    max-height: 90vh;
    border-radius: 10px;
    box-shadow: 0 10px 50px rgba(255, 255, 255, 0.2);
  }

  .close-modal {
    position: absolute;
    top: 30px;
    right: 40px;
    font-size: 3em;
    color: white;
    cursor: pointer;
    transition: transform 0.2s ease;
    z-index: 10001;
  }

  .close-modal:hover {
    transform: scale(1.2) rotate(90deg);
  }

  /* ========== レスポンシブ ========== */
  @media (max-width: 768px) {
    .hero-section {
      min-height: 550px;
      height: 75vh;
    }

    .hero-slide-title {
      font-size: 2.5em;
      margin-bottom: 20px;
      letter-spacing: 0.05em;
      text-shadow:
        3px 3px 6px rgba(0, 0, 0, 0.9),
        2px 2px 12px rgba(0, 0, 0, 0.8),
        0 0 30px rgba(0, 0, 0, 0.7),
        0 0 15px rgba(255, 215, 0, 0.5);
    }

    .hero-slide-subtitle {
      font-size: 1.3em;
      margin-bottom: 25px;
      text-shadow:
        3px 3px 10px rgba(0, 0, 0, 0.9),
        2px 2px 6px rgba(0, 0, 0, 0.8),
        0 0 25px rgba(0, 0, 0, 0.6);
    }

    .hero-slide-subtitle .highlight-keyword {
      font-size: 1.15em;
    }

    .hero-slider-arrow {
      width: 55px;
      height: 55px;
      font-size: 2em;
    }

    .hero-slider-arrow.left {
      left: 12px;
    }

    .hero-slider-arrow.right {
      right: 12px;
    }


    .hero-slider-dots {
      bottom: 18px;
      gap: 12px;
    }

    .hero-slider-dot {
      width: 13px;
      height: 13px;
      border: 2px solid rgba(255, 255, 255, 0.8);
    }

    .hero-slider-dot.active {
      width: 38px;
    }

    .section-title {
      font-size: 2.2em;
    }

    .stat-number {
      font-size: 3.5em;
    }

    .stat-label {
      font-size: 1em;
    }

    .features-grid,
    .howto-container,
    .pricing-container {
      grid-template-columns: 1fr;
    }

    .pricing-card.featured {
      transform: scale(1);
    }

    .btn {
      width: auto;
      max-width: 320px;
      padding: 16px 38px;
      font-size: 1.05em;
      margin: 6px;
    }

    /* 使い方ガイド - モバイル */
    .howto-card {
      padding: 40px 25px;
    }

    .howto-icon {
      font-size: 4em;
    }

    .howto-title {
      font-size: 1.6em;
    }

    /* お客様の声グリッド - モバイル */
    .testimonials-grid {
      grid-template-columns: 1fr;
      gap: 30px;
    }

    .testimonial-card-luxury {
      padding: 35px 25px;
    }

    .testimonial-quote {
      font-size: 5em;
      left: 20px;
    }

    .testimonial-text-luxury {
      font-size: 1em;
      line-height: 1.7;
    }

    .testimonial-avatar-luxury {
      width: 55px;
      height: 55px;
      font-size: 1.4em;
    }

    .testimonial-name-luxury {
      font-size: 1.05em;
    }

    .testimonial-role-luxury {
      font-size: 0.85em;
    }
  }

  @media (max-width: 480px) {
    .hero-section {
      min-height: 500px;
      height: 70vh;
    }

    .hero-slide-title {
      font-size: 2em;
      margin-bottom: 15px;
      letter-spacing: 0.04em;
      text-shadow:
        2px 2px 5px rgba(0, 0, 0, 0.9),
        2px 2px 10px rgba(0, 0, 0, 0.8),
        0 0 20px rgba(0, 0, 0, 0.7),
        0 0 10px rgba(255, 215, 0, 0.4);
    }

    .stat-number {
      font-size: 2.8em;
    }

    .stat-label {
      font-size: 0.9em;
    }

    .hero-slide-subtitle {
      font-size: 1.05em;
      margin-bottom: 20px;
    }

    .hero-slide-subtitle .highlight-keyword {
      font-size: 1.1em;
    }

    .hero-slider-arrow {
      width: 45px;
      height: 45px;
      font-size: 1.6em;
    }

    .hero-slider-arrow.left {
      left: 8px;
    }

    .hero-slider-arrow.right {
      right: 8px;
    }


    .btn {
      width: auto;
      max-width: 280px;
      padding: 14px 32px;
      font-size: 0.95em;
      margin: 5px;
    }

    /* 使い方ガイド - 小型モバイル */
    .howto-card {
      padding: 35px 20px;
    }

    .howto-icon {
      font-size: 3.5em;
    }

    .howto-title {
      font-size: 1.4em;
    }

    .howto-text {
      font-size: 1em;
    }

    /* お客様の声グリッド - 小型モバイル */
    .testimonial-card-luxury {
      padding: 30px 20px;
    }

    .testimonial-quote {
      font-size: 4em;
      left: 15px;
    }

    .testimonial-text-luxury {
      font-size: 0.95em;
      line-height: 1.6;
    }

    .testimonial-avatar-luxury {
      width: 50px;
      height: 50px;
      font-size: 1.3em;
    }

    .testimonial-name-luxury {
      font-size: 1em;
    }

    .testimonial-role-luxury {
      font-size: 0.8em;
    }
  }

  /* ========== スムーススクロール ========== */
  html {
    scroll-behavior: smooth;
  }
</style>

<!-- 超カッコいいヒーロースライダー -->
<div class="hero-section">
  <div class="hero-slider">
    <!-- スライド1: マスコットキャラクター「柳生おたま」 -->
    <div class="hero-slide mascot-slide active">
      <img src="/assets/img/柳生おたま.png" alt="柳生おたま - ゆっくりまとめプロセッサーのマスコット" class="hero-slide-image" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 800 800%22%3E%3Crect fill=%22%23ff6b6b%22 width=%22800%22 height=%22800%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-size=%2260%22 fill=%22white%22%3E柳生おたま%3C/text%3E%3C/svg%3E'">
      <div class="hero-slide-content">
        <h1 class="hero-slide-title">ゆっくりまとめプロセッサー</h1>
        <p class="hero-slide-subtitle">
          <strong>動画制作の<span class="highlight-keyword">全工程を自動化</span></strong><br>
          台本作成から編集まで<span class="highlight-keyword">10倍速</span>で完結
        </p>
        <div class="hero-slide-cta">
          <a href="/download" class="btn btn-primary">🎬 今すぐ無料トライアル</a>
          <a href="#features" class="btn btn-secondary">📖 詳しく見る</a>
        </div>
      </div>
    </div>

    <!-- スライド2: 編集画面 -->
    <div class="hero-slide">
      <img src="/assets/img/製品画像_1.png" alt="動画編集画面 - 直感的で使いやすいインターフェース" class="hero-slide-image" onerror="this.src='/assets/img/製品イメージ1.png'">
      <div class="hero-slide-content">
        <h1 class="hero-slide-title">直感的な編集画面</h1>
        <p class="hero-slide-subtitle">
          <strong><span class="highlight-keyword">ドラッグ&ドロップ</span>だけで</strong><br>
          プロ級の動画が<span class="highlight-keyword">数分で完成</span>
        </p>
        <div class="hero-slide-cta">
          <a href="/Instructions" class="btn btn-primary">使い方を見る</a>
          <a href="/download" class="btn btn-secondary">ダウンロード</a>
        </div>
      </div>
    </div>

    <!-- スライド3: 取得画面 -->
    <div class="hero-slide">
      <img src="/assets/img/製品画像_2.png" alt="自動取得画面 - AI が自動で素材を収集" class="hero-slide-image" onerror="this.src='/assets/img/製品イメージ2.png'">
      <div class="hero-slide-content">
        <h1 class="hero-slide-title">AI自動素材収集</h1>
        <p class="hero-slide-subtitle">
          <strong>最適な素材を<span class="highlight-keyword">自動取得</span></strong><br>
          1日の動画本数が<span class="highlight-keyword">10倍に増加</span>
        </p>
        <div class="hero-slide-cta">
          <a href="/purchase" class="btn btn-primary">今すぐ購入</a>
          <a href="/FAQ" class="btn btn-secondary">よくある質問</a>
        </div>
      </div>
    </div>

    <!-- 左矢印 -->
    <div class="hero-slider-arrow left" onclick="heroSliderPrev()">❮</div>

    <!-- 右矢印 -->
    <div class="hero-slider-arrow right" onclick="heroSliderNext()">❯</div>

    <!-- ナビゲーションドット -->
    <div class="hero-slider-dots">
      <div class="hero-slider-dot active" onclick="heroSliderGoTo(0)"></div>
      <div class="hero-slider-dot" onclick="heroSliderGoTo(1)"></div>
      <div class="hero-slider-dot" onclick="heroSliderGoTo(2)"></div>
    </div>

    <!-- スライド番号 -->
    <div class="hero-slider-counter">
      <span class="current">1</span>
      <span> / 3</span>
    </div>
  </div>
</div>

<!-- 統計セクション -->
<div class="stats-section">
  <div class="stats-container">
    <div class="stat-card" style="--card-index: 0">
      <div class="stat-number" data-count="10">0</div>
      <div class="stat-label">生産性向上</div>
    </div>
    <div class="stat-card" style="--card-index: 1">
      <div class="stat-number" data-count="95">0</div>
      <div class="stat-label">時間削減率</div>
    </div>
    <div class="stat-card" style="--card-index: 2">
      <div class="stat-number" data-count="300">0</div>
      <div class="stat-label">アクティブユーザー</div>
    </div>
    <div class="stat-card" style="--card-index: 3">
      <div class="stat-number stat-stars">★★★★★</div>
      <div class="stat-label">ユーザー満足度</div>
    </div>
  </div>
</div>

<!-- 特徴セクション -->
<div class="features-section" id="features">
  <div class="section-header">
    <h2 class="section-title">なぜ選ばれるのか</h2>
    <p class="section-subtitle">業界をリードする機能で、あなたの動画制作を次のレベルへ</p>
  </div>
  <div class="features-grid">
    <div class="feature-card">
      <div class="feature-icon">⚡</div>
      <h3 class="feature-title">圧倒的な自動化</h3>
      <p class="feature-description">
        台本作成から素材収集、編集まで<span class="text-highlight">全て自動化</span>。
        従来数時間かかっていた作業が<span class="highlight-keyword">数分で完了</span>します。
      </p>
    </div>
    <div class="feature-card">
      <div class="feature-icon">🎯</div>
      <h3 class="feature-title">高精度な編集</h3>
      <p class="feature-description">
        <span class="text-underline">AI技術を活用</span>した高精度な自動編集で、
        <span class="text-highlight">プロフェッショナルな仕上がり</span>を実現します。
      </p>
    </div>
    <div class="feature-card">
      <div class="feature-icon">🔄</div>
      <h3 class="feature-title">継続的な進化</h3>
      <p class="feature-description">
        お客様のフィードバックを元に<span class="text-underline">定期的にアップデート</span>。
        常に<span class="text-highlight">最新の機能</span>をご利用いただけます。
      </p>
    </div>
    <div class="feature-card">
      <div class="feature-icon">💡</div>
      <h3 class="feature-title">直感的な操作性</h3>
      <p class="feature-description">
        <span class="text-highlight">初心者でも簡単</span>に使える直感的なUI/UX設計。
        <span class="text-underline">マニュアル不要</span>で今日から使えます。
      </p>
    </div>
    <div class="feature-card">
      <div class="feature-icon">🛡️</div>
      <h3 class="feature-title">安心のサポート</h3>
      <p class="feature-description">
        <span class="text-underline">専任スタッフ</span>による迅速なサポート体制。
        困ったときも<span class="text-highlight">すぐに解決</span>できます。
      </p>
    </div>
    <div class="feature-card">
      <div class="feature-icon">📈</div>
      <h3 class="feature-title">収益の最大化</h3>
      <p class="feature-description">
        効率化により<span class="text-underline">動画本数が大幅増加</span>。
        収益<span class="number-highlight">10倍</span>も夢ではありません。
      </p>
    </div>
  </div>
</div>

<!-- 使い方ガイドセクション -->
<div class="howto-section">
  <div class="section-header">
    <h2 class="section-title">使い方ガイド</h2>
    <p class="section-subtitle">3ステップで動画制作を始めよう</p>
  </div>
  <div class="howto-container">
    <div class="howto-card">
      <div class="howto-step">STEP 1</div>
      <div class="howto-icon">📥</div>
      <h3 class="howto-title">ダウンロード</h3>
      <p class="howto-text">公式サイトから無料トライアル版をダウンロードしてインストール</p>
      <a href="/download" class="howto-link">ダウンロードページへ →</a>
    </div>
    <div class="howto-card">
      <div class="howto-step">STEP 2</div>
      <div class="howto-icon">⚙️</div>
      <h3 class="howto-title">設定</h3>
      <p class="howto-text">簡単な初期設定を行い、お好みのテンプレートを選択</p>
      <a href="/guide" class="howto-link">設定ガイドを見る →</a>
    </div>
    <div class="howto-card">
      <div class="howto-step">STEP 3</div>
      <div class="howto-icon">🎬</div>
      <h3 class="howto-title">制作開始</h3>
      <p class="howto-text">台本を入力するだけで、自動的にプロ級の動画が完成</p>
      <a href="/tutorial" class="howto-link">チュートリアル動画を見る →</a>
    </div>
  </div>
</div>

<!-- お客様の声セクション -->
<div class="testimonials-section">
  <div class="section-header">
    <h2 class="section-title">お客様の声</h2>
    <p class="section-subtitle">様々なクリエイターに選ばれています</p>
  </div>
  <div class="testimonials-grid">
    <div class="testimonial-card-luxury">
      <div class="testimonial-quote">"</div>
      <div class="testimonial-stars">★★★★★</div>
      <p class="testimonial-text-luxury">動画制作時間が<strong>劇的に短縮</strong>！作業効率が格段に上がり、このツールなしでは考えられません。</p>
      <div class="testimonial-author-luxury">
        <div class="testimonial-avatar-luxury">T</div>
        <div>
          <div class="testimonial-name-luxury">タカハシ様</div>
          <div class="testimonial-role-luxury">プロ動画クリエイター</div>
        </div>
      </div>
    </div>
    <div class="testimonial-card-luxury">
      <div class="testimonial-quote">"</div>
      <div class="testimonial-stars">★★★★★</div>
      <p class="testimonial-text-luxury">完全に<strong>人生が変わりました</strong>。投稿本数が大幅に増え、チャンネル登録者も<strong>急増</strong>しています。</p>
      <div class="testimonial-author-luxury">
        <div class="testimonial-avatar-luxury">ル</div>
        <div>
          <div class="testimonial-name-luxury">ルカオ様</div>
          <div class="testimonial-role-luxury">ゆっくり系トップ配信者</div>
        </div>
      </div>
    </div>
    <div class="testimonial-card-luxury">
      <div class="testimonial-quote">"</div>
      <div class="testimonial-stars">★★★★★</div>
      <p class="testimonial-text-luxury">AI機能が<strong>圧倒的</strong>。素材収集から編集まで全自動。クオリティも従来の手作業を<strong>完全に超えています</strong>。</p>
      <div class="testimonial-author-luxury">
        <div class="testimonial-avatar-luxury">田</div>
        <div>
          <div class="testimonial-name-luxury">田中様</div>
          <div class="testimonial-role-luxury">IT企業CEO</div>
        </div>
      </div>
    </div>
    <div class="testimonial-card-luxury">
      <div class="testimonial-quote">"</div>
      <div class="testimonial-stars">★★★★★</div>
      <p class="testimonial-text-luxury">チーム全員の作業効率が<strong>劇的に向上</strong>。月間動画本数が大幅に増え、売上も<strong>大幅アップ</strong>しました。</p>
      <div class="testimonial-author-luxury">
        <div class="testimonial-avatar-luxury">S</div>
        <div>
          <div class="testimonial-name-luxury">スズキ企画様</div>
          <div class="testimonial-role-luxury">メディア制作会社</div>
        </div>
      </div>
    </div>
    <div class="testimonial-card-luxury">
      <div class="testimonial-quote">"</div>
      <div class="testimonial-stars">★★★★★</div>
      <p class="testimonial-text-luxury"><strong>編集作業のストレスがゼロ</strong>に。クリエイティブな部分に集中できるようになり、動画のクオリティが格段に上がりました。</p>
      <div class="testimonial-author-luxury">
        <div class="testimonial-avatar-luxury">み</div>
        <div>
          <div class="testimonial-name-luxury">みゆき様</div>
          <div class="testimonial-role-luxury">教育系YouTuber</div>
        </div>
      </div>
    </div>
    <div class="testimonial-card-luxury">
      <div class="testimonial-quote">"</div>
      <div class="testimonial-stars">★★★★★</div>
      <p class="testimonial-text-luxury">導入前は限界を感じていましたが、今は<strong>大量投稿</strong>が可能になりました。収益も<strong>大幅アップ</strong>、まさに革命です。</p>
      <div class="testimonial-author-luxury">
        <div class="testimonial-avatar-luxury">ケ</div>
        <div>
          <div class="testimonial-name-luxury">ケンゾー様</div>
          <div class="testimonial-role-luxury">ゲーム実況者</div>
        </div>
      </div>
    </div>
    <div class="testimonial-card-luxury">
      <div class="testimonial-quote">"</div>
      <div class="testimonial-stars">★★★★★</div>
      <p class="testimonial-text-luxury">テンプレート機能が<strong>神レベル</strong>。短時間で完成するので、<strong>副業でも十分な収益</strong>を得られるようになりました。</p>
      <div class="testimonial-author-luxury">
        <div class="testimonial-avatar-luxury">や</div>
        <div>
          <div class="testimonial-name-luxury">やまだ様</div>
          <div class="testimonial-role-luxury">副業クリエイター</div>
        </div>
      </div>
    </div>
    <div class="testimonial-card-luxury">
      <div class="testimonial-quote">"</div>
      <div class="testimonial-stars">★★★★★</div>
      <p class="testimonial-text-luxury">音声合成のクオリティに<strong>感動</strong>。自然な抑揚で、視聴者からの評価も<strong>過去最高</strong>です。</p>
      <div class="testimonial-author-luxury">
        <div class="testimonial-avatar-luxury">マ</div>
        <div>
          <div class="testimonial-name-luxury">マリン様</div>
          <div class="testimonial-role-luxury">解説系配信者</div>
        </div>
      </div>
    </div>
    <div class="testimonial-card-luxury">
      <div class="testimonial-quote">"</div>
      <div class="testimonial-stars">★★★★★</div>
      <p class="testimonial-text-luxury">法人での大量制作に<strong>完璧</strong>。少人数で大量の動画を制作でき、<strong>大幅なコスト削減</strong>を実現しています。</p>
      <div class="testimonial-author-luxury">
        <div class="testimonial-avatar-luxury">M</div>
        <div>
          <div class="testimonial-name-luxury">メディアワークス様</div>
          <div class="testimonial-role-luxury">取締役</div>
        </div>
      </div>
    </div>
    <div class="testimonial-card-luxury">
      <div class="testimonial-quote">"</div>
      <div class="testimonial-stars">★★★★★</div>
      <p class="testimonial-text-luxury">初心者でも<strong>プロ級の動画</strong>が作れます。開始直後から<strong>急成長</strong>を実現できました！</p>
      <div class="testimonial-author-luxury">
        <div class="testimonial-avatar-luxury">あ</div>
        <div>
          <div class="testimonial-name-luxury">あかり様</div>
          <div class="testimonial-role-luxury">新人クリエイター</div>
        </div>
      </div>
    </div>
    <div class="testimonial-card-luxury">
      <div class="testimonial-quote">"</div>
      <div class="testimonial-stars">★★★★★</div>
      <p class="testimonial-text-luxury">自動素材収集が<strong>天才的</strong>。台本を書くだけで、最適な画像や動画が自動で揃います。時間の節約が半端ない。</p>
      <div class="testimonial-author-luxury">
        <div class="testimonial-avatar-luxury">ナ</div>
        <div>
          <div class="testimonial-name-luxury">ナオキ様</div>
          <div class="testimonial-role-luxury">ニュース系チャンネル運営</div>
        </div>
      </div>
    </div>
    <div class="testimonial-card-luxury">
      <div class="testimonial-quote">"</div>
      <div class="testimonial-stars">★★★★★</div>
      <p class="testimonial-text-luxury">サポートも<strong>超迅速</strong>。質問への返答が早く、安心して使える最高のツールです。</p>
      <div class="testimonial-author-luxury">
        <div class="testimonial-avatar-luxury">は</div>
        <div>
          <div class="testimonial-name-luxury">はやし様</div>
          <div class="testimonial-role-luxury">ビジネス系配信者</div>
        </div>
      </div>
    </div>
    <div class="testimonial-card-luxury">
      <div class="testimonial-quote">"</div>
      <div class="testimonial-stars">★★★★★</div>
      <p class="testimonial-text-luxury">アップデートが<strong>頻繁</strong>で、常に最新機能が使えます。開発チームの情熱を感じる<strong>唯一無二</strong>のツール。</p>
      <div class="testimonial-author-luxury">
        <div class="testimonial-avatar-luxury">テ</div>
        <div>
          <div class="testimonial-name-luxury">テックマン様</div>
          <div class="testimonial-role-luxury">テック系レビュアー</div>
        </div>
      </div>
    </div>
    <div class="testimonial-card-luxury">
      <div class="testimonial-quote">"</div>
      <div class="testimonial-stars">★★★★★</div>
      <p class="testimonial-text-luxury">価格が<strong>圧倒的に安い</strong>。この機能でこの価格は信じられません。<strong>すぐに元が取れました</strong>。</p>
      <div class="testimonial-author-luxury">
        <div class="testimonial-avatar-luxury">ま</div>
        <div>
          <div class="testimonial-name-luxury">まつもと様</div>
          <div class="testimonial-role-luxury">スタートアップ経営者</div>
        </div>
      </div>
    </div>
    <div class="testimonial-card-luxury">
      <div class="testimonial-quote">"</div>
      <div class="testimonial-stars">★★★★★</div>
      <p class="testimonial-text-luxury">もう<strong>手放せません</strong>。ゆっくりまとめプロセッサーは私のビジネスの<strong>生命線</strong>です。心から感謝しています。</p>
      <div class="testimonial-author-luxury">
        <div class="testimonial-avatar-luxury">リ</div>
        <div>
          <div class="testimonial-name-luxury">リオン様</div>
          <div class="testimonial-role-luxury">フリーランス動画クリエイター</div>
        </div>
      </div>
    </div>
    <div class="testimonial-card-luxury">
      <div class="testimonial-quote">"</div>
      <div class="testimonial-stars">★★★★★</div>
      <p class="testimonial-text-luxury">複数チャンネルを運営していますが、このツールのおかげで<strong>全て効率化</strong>できました。投資対効果が抜群です。</p>
      <div class="testimonial-author-luxury">
        <div class="testimonial-avatar-luxury">匿</div>
        <div>
          <div class="testimonial-name-luxury">匿名希望様</div>
          <div class="testimonial-role-luxury">複数チャンネル運営者</div>
        </div>
      </div>
    </div>
    <div class="testimonial-card-luxury">
      <div class="testimonial-quote">"</div>
      <div class="testimonial-stars">★★★★★</div>
      <p class="testimonial-text-luxury">他のツールと比べて<strong>圧倒的に使いやすい</strong>です。UIも洗練されていて、操作に迷うことがありません。</p>
      <div class="testimonial-author-luxury">
        <div class="testimonial-avatar-luxury">匿</div>
        <div>
          <div class="testimonial-name-luxury">匿名希望様</div>
          <div class="testimonial-role-luxury">動画クリエイター</div>
        </div>
      </div>
    </div>
    <div class="testimonial-card-luxury">
      <div class="testimonial-quote">"</div>
      <div class="testimonial-stars">★★★★★</div>
      <p class="testimonial-text-luxury">導入してから<strong>収益が3倍</strong>になりました。このツールに出会えて本当に良かったです。</p>
      <div class="testimonial-author-luxury">
        <div class="testimonial-avatar-luxury">匿</div>
        <div>
          <div class="testimonial-name-luxury">匿名希望様</div>
          <div class="testimonial-role-luxury">専業配信者</div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- 料金セクション -->
<div class="pricing-section">
  <div class="section-header">
    <h2 class="section-title">料金プラン</h2>
    <p class="section-subtitle">7日間の無料トライアル付き</p>
  </div>
  <div class="pricing-container">
    <div class="pricing-card">
      <div class="pricing-name">無料トライアル</div>
      <div class="pricing-price">¥0</div>
      <ul class="pricing-features">
        <li>7日間全機能利用可能</li>
        <li>無制限の動画作成</li>
        <li>基本サポート</li>
        <li>アップデート対応</li>
      </ul>
      <a href="/download" class="btn btn-primary pricing-btn">今すぐ始める</a>
    </div>
    <div class="pricing-card featured">
      <div class="pricing-name">プレミアム</div>
      <div class="pricing-price">お問い合わせ</div>
      <ul class="pricing-features">
        <li>全ての機能が使い放題</li>
        <li>無制限の動画作成</li>
        <li>優先サポート</li>
        <li>定期アップデート</li>
        <li>カスタマイズ対応</li>
      </ul>
      <a href="/contact" class="btn btn-premium pricing-btn">今すぐ申し込む</a>
    </div>
    <div class="pricing-card">
      <div class="pricing-name">エンタープライズ</div>
      <div class="pricing-price">カスタム</div>
      <ul class="pricing-features">
        <li>専用サポート担当</li>
        <li>オンボーディング支援</li>
        <li>カスタム機能開発</li>
        <li>複数ライセンス対応</li>
        <li>SLA保証</li>
      </ul>
      <a href="/contact" class="btn btn-secondary pricing-btn">詳しく見る</a>
    </div>
  </div>
</div>

<!-- CTAセクション -->
<div class="cta-section">
  <div class="cta-content">
    <h2 class="cta-title">今すぐ始めよう</h2>
    <p class="cta-text">
      7日間の無料トライアルで、動画制作の革命を体験してください。<br>
      クレジットカード不要。今すぐダウンロードできます。
    </p>
    <div class="hero-cta">
      <a href="/download" class="btn btn-primary">無料でダウンロード</a>
      <a href="/contact" class="btn btn-secondary">お問い合わせ</a>
    </div>
  </div>
</div>

<!-- モーダル -->
<div id="modal" class="modal">
  <span class="close-modal">&times;</span>
  <img id="modal-image" src="" alt="">
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  // ========== ヒーロースライダー機能 ==========
  let currentHeroSlide = 0;
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroDots = document.querySelectorAll('.hero-slider-dot');
  const heroSlideCount = heroSlides.length;
  let heroSlideInterval;

  // スライドを表示する関数（3Dカルーセル対応）
  function showHeroSlide(index) {
    // 範囲外チェック
    if (index >= heroSlideCount) {
      currentHeroSlide = 0;
    } else if (index < 0) {
      currentHeroSlide = heroSlideCount - 1;
    } else {
      currentHeroSlide = index;
    }

    // 全スライドの状態をリセット
    heroSlides.forEach((slide, i) => {
      slide.classList.remove('active', 'prev', 'next');

      if (i === currentHeroSlide) {
        slide.classList.add('active');
      } else if (i === (currentHeroSlide - 1 + heroSlideCount) % heroSlideCount) {
        slide.classList.add('prev');
      } else if (i === (currentHeroSlide + 1) % heroSlideCount) {
        slide.classList.add('next');
      }
    });

    // 全ドットを非アクティブ
    heroDots.forEach(dot => {
      dot.classList.remove('active');
    });

    // 現在のドットをアクティブに
    heroDots[currentHeroSlide].classList.add('active');

    // カウンターを更新
    document.querySelector('.hero-slider-counter .current').textContent = currentHeroSlide + 1;
  }

  // 次のスライド
  window.heroSliderNext = function() {
    showHeroSlide(currentHeroSlide + 1);
    resetHeroSlideInterval();
  }

  // 前のスライド
  window.heroSliderPrev = function() {
    showHeroSlide(currentHeroSlide - 1);
    resetHeroSlideInterval();
  }

  // 特定のスライドに移動
  window.heroSliderGoTo = function(index) {
    showHeroSlide(index);
    resetHeroSlideInterval();
  }

  // 自動再生をリセット
  function resetHeroSlideInterval() {
    clearInterval(heroSlideInterval);
    heroSlideInterval = setInterval(() => {
      heroSliderNext();
    }, 8000); // 8秒ごとに切り替え
  }

  // 自動再生開始
  heroSlideInterval = setInterval(() => {
    heroSliderNext();
  }, 8000);

  // キーボード操作対応
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      heroSliderPrev();
    } else if (e.key === 'ArrowRight') {
      heroSliderNext();
    }
  });

  // タッチスワイプ対応
  let touchStartX = 0;
  let touchEndX = 0;

  document.querySelector('.hero-slider').addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  document.querySelector('.hero-slider').addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
      heroSliderNext();
    }
    if (touchEndX > touchStartX + 50) {
      heroSliderPrev();
    }
  }

  // カウントアップアニメーション
  const animateCount = (element, target, suffix = '') => {
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }

      if (suffix === 'x') {
        element.textContent = current.toFixed(0) + suffix;
      } else if (suffix === '%') {
        element.textContent = current.toFixed(0) + suffix;
      } else if (suffix === '+') {
        element.textContent = current.toFixed(0) + suffix;
      } else if (target < 10) {
        element.textContent = current.toFixed(1);
      } else {
        element.textContent = current.toFixed(0);
      }
    }, 16);
  };

  // Intersection Observer for stats
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statNumbers = entry.target.querySelectorAll('.stat-number');
        statNumbers.forEach((stat, index) => {
          // ★★★★★の場合はカウントアップしない
          if (stat.classList.contains('stat-stars')) {
            return;
          }

          const target = parseInt(stat.getAttribute('data-count'));
          let suffix = '';

          if (index === 0) suffix = 'x';
          else if (index === 1) suffix = '%';
          else if (index === 2) suffix = '+';

          setTimeout(() => {
            animateCount(stat, target, suffix);
          }, index * 100);
        });
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    observer.observe(statsSection);
  }

  // Intersection Observer for animations
  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('animate-in');
        }, index * 100);
        animationObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // Observe feature cards
  document.querySelectorAll('.feature-card').forEach(card => {
    animationObserver.observe(card);
  });

  // Observe howto cards
  document.querySelectorAll('.howto-card').forEach(card => {
    animationObserver.observe(card);
  });

  // Observe testimonial cards
  document.querySelectorAll('.testimonial-card-luxury').forEach(card => {
    animationObserver.observe(card);
  });

  // Carousel
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const slideCount = slides.length;
  let currentSlideIndex = 0;

  slides.forEach((slide, index) => {
    slide.style.left = index * 100 + '%';
  });

  // Create indicators
  const indicatorsContainer = document.querySelector('.carousel-indicators');
  for (let i = 0; i < slideCount; i++) {
    const dot = document.createElement('div');
    dot.classList.add('carousel-indicator');
    if (i === 0) dot.classList.add('active');
    dot.setAttribute('data-slide', i);
    dot.addEventListener('click', () => moveToSlide(i));
    indicatorsContainer.appendChild(dot);
  }

  const updateIndicators = (index) => {
    const dots = Array.from(document.querySelectorAll('.carousel-indicator'));
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
  };

  const moveToSlide = (index) => {
    track.style.transform = 'translateX(-' + index * 100 + '%)';
    currentSlideIndex = index;
    updateIndicators(index);
  };

  document.querySelector('.carousel-button--left').addEventListener('click', () => {
    const prevIndex = (currentSlideIndex - 1 + slideCount) % slideCount;
    moveToSlide(prevIndex);
  });

  document.querySelector('.carousel-button--right').addEventListener('click', () => {
    const nextIndex = (currentSlideIndex + 1) % slideCount;
    moveToSlide(nextIndex);
  });

  // Auto-play
  setInterval(() => {
    const nextIndex = (currentSlideIndex + 1) % slideCount;
    moveToSlide(nextIndex);
  }, 5000);

  // Modal
  const modal = document.getElementById('modal');
  const modalImage = document.getElementById('modal-image');
  const closeModal = document.querySelector('.close-modal');

  document.querySelectorAll('.carousel-slide img').forEach(img => {
    img.addEventListener('click', () => {
      modal.style.display = 'flex';
      modalImage.src = img.src;
    });
  });

  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

});
</script>
