---
layout: page
title: ホーム
subtitle: 動画編集効率化ツール【ゆっくりまとめプロセッサー】
permalink: /
---

<style>
  /* Google Fonts の読み込み - 超インパクトのあるフォント追加 */
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&family=Inter:wght@400;600;700;800&family=Bebas+Neue&family=Montserrat:wght@700;800;900&family=Anton&display=swap');

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
    overflow: hidden;
  }

  .hero-slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 1.5s ease-in-out;
    z-index: 1;
  }

  .hero-slide.active {
    opacity: 1;
    z-index: 2;
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
    font-family: 'Bebas Neue', 'Anton', 'Montserrat', sans-serif !important;
    font-size: 4.5em;
    font-weight: 900;
    color: #ffffff !important;
    margin-bottom: 25px;
    line-height: 1.1;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    background: linear-gradient(135deg, #ffffff 0%, #fff5e6 50%, #ffffff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(4px 4px 16px rgba(0, 0, 0, 0.95))
            drop-shadow(2px 2px 8px rgba(0, 0, 0, 0.9))
            drop-shadow(0 0 60px rgba(255, 215, 0, 0.8));
    animation: titlePulseGlow 3s ease-in-out infinite, slideInUp 1s ease-out;
    transform-origin: center;
  }

  @keyframes titlePulseGlow {
    0%, 100% {
      transform: scale(1);
      filter: drop-shadow(4px 4px 16px rgba(0, 0, 0, 0.95))
              drop-shadow(2px 2px 8px rgba(0, 0, 0, 0.9))
              drop-shadow(0 0 60px rgba(255, 215, 0, 0.8));
    }
    50% {
      transform: scale(1.03);
      filter: drop-shadow(5px 5px 20px rgba(0, 0, 0, 1))
              drop-shadow(3px 3px 10px rgba(0, 0, 0, 0.95))
              drop-shadow(0 0 80px rgba(255, 215, 0, 1))
              drop-shadow(0 0 40px rgba(255, 255, 255, 0.8));
    }
  }

  .hero-slide-subtitle {
    font-family: 'Noto Sans JP', 'Montserrat', sans-serif !important;
    font-size: 1.65em;
    font-weight: 700;
    color: #ffffff !important;
    margin-bottom: 35px;
    line-height: 1.7;
    text-shadow:
      3px 3px 10px rgba(0, 0, 0, 0.9),
      2px 2px 6px rgba(0, 0, 0, 0.8),
      0 0 25px rgba(0, 0, 0, 0.6);
    -webkit-text-stroke: 1.5px rgba(0, 0, 0, 0.5);
    animation: slideInUp 1s ease-out 0.2s both;
  }

  /* キーワード強調スタイル */
  .hero-slide-subtitle .highlight-keyword {
    font-family: 'Montserrat', 'Noto Sans JP', sans-serif !important;
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
    bottom: 35px;
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
    background: rgba(255, 255, 255, 0.18);
    backdrop-filter: blur(15px);
    width: 75px;
    height: 75px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border: 3px solid rgba(255, 255, 255, 0.45);
    font-size: 2.6em;
    color: #ffffff;
    text-shadow:
      3px 3px 10px rgba(0, 0, 0, 0.9),
      0 0 20px rgba(0, 0, 0, 0.6);
    box-shadow:
      0 10px 35px rgba(0, 0, 0, 0.4),
      inset 0 2px 8px rgba(255, 255, 255, 0.2);
  }

  .hero-slider-arrow:hover {
    background: rgba(255, 255, 255, 0.35);
    transform: translateY(-50%) scale(1.2);
    border-color: rgba(255, 255, 255, 0.8);
    box-shadow:
      0 15px 50px rgba(255, 255, 255, 0.4),
      0 5px 20px rgba(0, 0, 0, 0.5),
      inset 0 2px 10px rgba(255, 255, 255, 0.3);
  }

  .hero-slider-arrow.left {
    left: 35px;
  }

  .hero-slider-arrow.right {
    right: 35px;
  }

  /* スライド番号インジケーター */
  .hero-slider-counter {
    position: absolute;
    top: 35px;
    right: 35px;
    z-index: 10;
    background: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(15px);
    padding: 16px 32px;
    border-radius: 50px;
    border: 2px solid rgba(255, 255, 255, 0.35);
    box-shadow:
      0 10px 40px rgba(0, 0, 0, 0.5),
      inset 0 2px 8px rgba(255, 255, 255, 0.1);
  }

  .hero-slider-counter span {
    font-size: 1.5em;
    font-weight: 900;
    color: #ffffff;
    text-shadow:
      3px 3px 8px rgba(0, 0, 0, 0.9),
      0 0 15px rgba(0, 0, 0, 0.6);
  }

  .hero-slider-counter .current {
    font-size: 2.1em;
    color: #ffd700;
    text-shadow:
      3px 3px 10px rgba(0, 0, 0, 1),
      0 0 25px rgba(255, 215, 0, 0.6);
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
    -webkit-text-stroke: 1.2px rgba(0, 0, 0, 0.4);
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
    text-shadow:
      4px 4px 15px rgba(0, 0, 0, 1),
      0 0 35px rgba(255, 215, 0, 0.9);
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
    -webkit-text-stroke: 1px rgba(102, 126, 234, 0.4);
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
      4px 4px 15px rgba(0, 0, 0, 1),
      0 0 35px rgba(255, 255, 255, 0.7);
    -webkit-text-stroke: 1.5px rgba(0, 0, 0, 0.4);
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

  /* ========== 統計セクション ========== */
  .stats-section {
    background: white;
    padding: 80px 20px;
    margin-top: -50px;
    position: relative;
    z-index: 3;
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
    padding: 30px;
    border-radius: 20px;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .stat-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }

  .stat-number {
    font-size: 3.8em;
    font-weight: 900;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 10px;
    filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.2));
    -webkit-text-stroke: 1px rgba(102, 126, 234, 0.3);
  }

  .stat-label {
    font-size: 1.25em;
    color: #0a0e1a !important;
    font-weight: 800;
    letter-spacing: 0.02em;
    text-shadow:
      1px 1px 2px rgba(0, 0, 0, 0.15),
      0 1px 3px rgba(255, 255, 255, 0.8);
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
    -webkit-text-stroke: 0.8px rgba(0, 0, 0, 0.1);
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
    transition: transform 0.3s ease;
  }

  .feature-card:hover::before {
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

  /* ========== お客様の声セクション ========== */
  .testimonials-section {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 100px 20px;
    color: white;
  }

  .testimonials-grid {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
  }

  .testimonial-card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 30px;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: all 0.3s ease;
  }

  .testimonial-card:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-5px);
  }

  .testimonial-stars {
    color: #ffd700;
    font-size: 1.3em;
    margin-bottom: 15px;
  }

  .testimonial-text {
    font-size: 1.1em;
    font-weight: 600;
    line-height: 1.9;
    margin-bottom: 20px;
    font-style: italic;
    color: #ffffff !important;
    text-shadow:
      2px 2px 5px rgba(0, 0, 0, 0.6),
      0 0 10px rgba(0, 0, 0, 0.3);
    -webkit-text-stroke: 0.3px rgba(0, 0, 0, 0.2);
  }

  .testimonial-author {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-top: 20px;
    padding-top: 20px;
    border-top: 2px solid rgba(255, 255, 255, 0.3);
  }

  .testimonial-avatar {
    width: 55px;
    height: 55px;
    border-radius: 50%;
    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.6em;
    font-weight: 900;
    color: #ffffff;
    text-shadow:
      2px 2px 4px rgba(0, 0, 0, 0.5);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }

  .testimonial-info {
    flex: 1;
  }

  .testimonial-name {
    font-weight: 900;
    font-size: 1.15em;
    color: #ffffff !important;
    text-shadow:
      2px 2px 4px rgba(0, 0, 0, 0.5),
      0 0 10px rgba(0, 0, 0, 0.3);
    -webkit-text-stroke: 0.4px rgba(0, 0, 0, 0.2);
  }

  .testimonial-role {
    font-weight: 700;
    font-size: 0.95em;
    color: rgba(255, 255, 255, 0.95) !important;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  }

  /* ========== 料金セクション ========== */
  .pricing-section {
    background: white;
    padding: 100px 20px;
  }

  .pricing-container {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 40px;
  }

  .pricing-card {
    background: white;
    border: 2px solid #e2e8f0;
    border-radius: 20px;
    padding: 40px 30px;
    text-align: center;
    transition: all 0.3s ease;
    position: relative;
  }

  .pricing-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
    border-color: #667eea;
  }

  .pricing-card.featured {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    transform: scale(1.05);
    border: none;
  }

  .pricing-badge {
    position: absolute;
    top: -15px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
    color: white;
    padding: 5px 20px;
    border-radius: 50px;
    font-size: 0.9em;
    font-weight: 700;
  }

  .pricing-name {
    font-size: 1.5em;
    font-weight: 700;
    margin-bottom: 15px;
  }

  .pricing-price {
    font-size: 3em;
    font-weight: 900;
    margin: 20px 0;
  }

  .pricing-price sup {
    font-size: 0.4em;
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
  }

  .pricing-card.featured .pricing-features li {
    border-bottom-color: rgba(255, 255, 255, 0.2);
  }

  .pricing-features li::before {
    content: '✓';
    margin-right: 10px;
    color: #48bb78;
    font-weight: 700;
  }

  .pricing-card.featured .pricing-features li::before {
    color: #ffd700;
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
    -webkit-text-stroke: 1px rgba(0, 0, 0, 0.3);
  }

  .cta-text {
    font-size: 1.35em;
    font-weight: 700;
    margin-bottom: 40px;
    color: #ffffff !important;
    text-shadow:
      2px 2px 6px rgba(0, 0, 0, 0.7),
      0 0 15px rgba(0, 0, 0, 0.4);
    -webkit-text-stroke: 0.5px rgba(0, 0, 0, 0.2);
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
      letter-spacing: 0.06em;
      filter: drop-shadow(3px 3px 12px rgba(0, 0, 0, 0.95))
              drop-shadow(0 0 50px rgba(255, 215, 0, 0.7));
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

    .hero-slider-counter {
      top: 15px;
      right: 15px;
      padding: 8px 18px;
    }

    .hero-slider-counter span {
      font-size: 1.1em;
    }

    .hero-slider-counter .current {
      font-size: 1.5em;
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
      font-size: 2.8em;
    }

    .features-grid,
    .testimonials-grid,
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
  }

  @media (max-width: 480px) {
    .hero-section {
      min-height: 500px;
      height: 70vh;
    }

    .hero-slide-title {
      font-size: 2em;
      margin-bottom: 15px;
      letter-spacing: 0.05em;
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

    .hero-slider-counter {
      top: 12px;
      right: 12px;
      padding: 6px 15px;
    }

    .hero-slider-counter span {
      font-size: 0.95em;
    }

    .hero-slider-counter .current {
      font-size: 1.3em;
    }

    .btn {
      width: auto;
      max-width: 280px;
      padding: 14px 32px;
      font-size: 0.95em;
      margin: 5px;
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
          可愛いマスコット「柳生おたま」と一緒に<br>
          <strong>動画制作を<span class="highlight-keyword">10倍効率化</span></strong>
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
          ドラッグ&ドロップで簡単編集<br>
          <strong><span class="highlight-keyword">初心者でもプロ級</span>の動画が作れる</strong>
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
        <h1 class="hero-slide-title">自動素材収集</h1>
        <p class="hero-slide-subtitle">
          AIが自動で最適な素材を取得<br>
          <strong>1日2本だった動画が<span class="highlight-keyword">20本に</span></strong>
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
    <div class="stat-card">
      <div class="stat-number" data-count="10">0</div>
      <div class="stat-label">生産性向上</div>
    </div>
    <div class="stat-card">
      <div class="stat-number" data-count="95">0</div>
      <div class="stat-label">時間削減率</div>
    </div>
    <div class="stat-card">
      <div class="stat-number" data-count="1000">0</div>
      <div class="stat-label">アクティブユーザー</div>
    </div>
    <div class="stat-card">
      <div class="stat-number" data-count="4.9">0</div>
      <div class="stat-label">ユーザー評価</div>
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

<!-- スクリーンショットセクション -->
<div class="screenshots-section">
  <div class="section-header">
    <h2 class="section-title">実際の動作を見る</h2>
    <p class="section-subtitle">シンプルで美しいインターフェース</p>
  </div>
  <div class="carousel">
    <div class="carousel-track">
      <div class="carousel-slide">
        <img src="/assets/img/製品イメージ1.png" alt="製品イメージ1">
      </div>
      <div class="carousel-slide">
        <img src="/assets/img/製品イメージ2.png" alt="製品イメージ2">
      </div>
      <div class="carousel-slide">
        <img src="/assets/img/製品イメージ3.png" alt="製品イメージ3">
      </div>
    </div>
    <button class="carousel-button carousel-button--left">❮</button>
    <button class="carousel-button carousel-button--right">❯</button>
    <div class="carousel-indicators"></div>
  </div>
</div>

<!-- お客様の声セクション -->
<div class="testimonials-section">
  <div class="section-header">
    <h2 class="section-title">お客様の声</h2>
    <p class="section-subtitle">実際に使っているユーザー様からの評価</p>
  </div>
  <div class="testimonials-grid">
    <div class="testimonial-card">
      <div class="testimonial-stars">★★★★★</div>
      <p class="testimonial-text">
        「ゆっくりまとめプロセッサーの導入で、1日2本だった動画が<span class="text-underline">半分の時間</span>で<span class="number-highlight">20本</span>に増加。
        収益面でも<span class="number-highlight">10倍</span>の効果を実感しています！」
      </p>
      <div class="testimonial-author">
        <div class="testimonial-avatar">高</div>
        <div class="testimonial-info">
          <div class="testimonial-name">高橋様</div>
          <div class="testimonial-role">動画クリエイター</div>
        </div>
      </div>
    </div>
    <div class="testimonial-card">
      <div class="testimonial-stars">★★★★★</div>
      <p class="testimonial-text">
        「毎日の動画編集による<span class="text-underline">ストレスが軽減</span>され、余裕を持って新たなことに挑戦できるようになりました。本当に<span class="text-highlight">革命的なツール</span>です。」
      </p>
      <div class="testimonial-author">
        <div class="testimonial-avatar">S</div>
        <div class="testimonial-info">
          <div class="testimonial-name">S様</div>
          <div class="testimonial-role">ゆっくり系配信者</div>
        </div>
      </div>
    </div>
    <div class="testimonial-card">
      <div class="testimonial-stars">★★★★★</div>
      <p class="testimonial-text">
        「台本作成時の煩雑な作業が<span class="text-highlight">自動入れ替え機能</span>で解消。<span class="text-underline">作業効率が格段に向上</span>しました！<span class="badge-highlight">コスパ最高</span>です。」
      </p>
      <div class="testimonial-author">
        <div class="testimonial-avatar">A</div>
        <div class="testimonial-info">
          <div class="testimonial-name">A様</div>
          <div class="testimonial-role">IT系個人事業主</div>
        </div>
      </div>
    </div>
    <div class="testimonial-card">
      <div class="testimonial-stars">★★★★★</div>
      <p class="testimonial-text">
        「チーム全体の動画編集が<span class="text-underline">シンプルに</span>なり、<span class="text-highlight">最終チェックのみ</span>で多数の動画が完成。<span class="text-large">売上と士気の向上</span>に大きく貢献しています！」
      </p>
      <div class="testimonial-author">
        <div class="testimonial-avatar">タ</div>
        <div class="testimonial-info">
          <div class="testimonial-name">タブナジア合同会社様</div>
          <div class="testimonial-role">法人クライアント</div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- 料金セクション -->
<div class="pricing-section">
  <div class="section-header">
    <h2 class="section-title">シンプルな料金プラン</h2>
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
      <a href="/download" class="btn btn-secondary" style="width: 100%;">今すぐ始める</a>
    </div>
    <div class="pricing-card featured">
      <div class="pricing-badge">人気No.1</div>
      <div class="pricing-name">プロフェッショナル</div>
      <div class="pricing-price">お問い合わせ</div>
      <ul class="pricing-features">
        <li>全ての機能が使い放題</li>
        <li>無制限の動画作成</li>
        <li>優先サポート</li>
        <li>定期アップデート</li>
        <li>カスタマイズ対応</li>
      </ul>
      <a href="/contact" class="btn btn-primary" style="width: 100%; background: white; color: #667eea;">お問い合わせ</a>
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
      <a href="/contact" class="btn btn-secondary" style="width: 100%;">お問い合わせ</a>
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
  // ========== ヒーロースライダー機能 ==========
  let currentHeroSlide = 0;
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroDots = document.querySelectorAll('.hero-slider-dot');
  const heroSlideCount = heroSlides.length;
  let heroSlideInterval;

  // スライドを表示する関数
  function showHeroSlide(index) {
    // 範囲外チェック
    if (index >= heroSlideCount) {
      currentHeroSlide = 0;
    } else if (index < 0) {
      currentHeroSlide = heroSlideCount - 1;
    } else {
      currentHeroSlide = index;
    }

    // 全スライドを非表示
    heroSlides.forEach(slide => {
      slide.classList.remove('active');
    });

    // 全ドットを非アクティブ
    heroDots.forEach(dot => {
      dot.classList.remove('active');
    });

    // 現在のスライドとドットをアクティブに
    heroSlides[currentHeroSlide].classList.add('active');
    heroDots[currentHeroSlide].classList.add('active');

    // カウンターを更新
    document.querySelector('.hero-slider-counter .current').textContent = currentHeroSlide + 1;
  }

  // 次のスライド
  function heroSliderNext() {
    showHeroSlide(currentHeroSlide + 1);
    resetHeroSlideInterval();
  }

  // 前のスライド
  function heroSliderPrev() {
    showHeroSlide(currentHeroSlide - 1);
    resetHeroSlideInterval();
  }

  // 特定のスライドに移動
  function heroSliderGoTo(index) {
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
</script>
