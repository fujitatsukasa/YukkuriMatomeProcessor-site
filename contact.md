---
layout: page
title: お問い合わせ
subtitle: お気軽にお問い合わせください
---

<style>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&family=Inter:wght@400;600;700;800&display=swap');

  * {
    box-sizing: border-box;
  }

  body {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    font-family: 'Noto Sans JP', 'Inter', sans-serif;
    margin: 0;
    padding: 0;
  }

  .page-content {
    max-width: 100%;
    margin: 0;
    padding: 0;
    background: transparent;
    box-shadow: none;
  }

  /* ========== ヒーローセクション ========== */
  .hero-section {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 100px 20px 60px;
    text-align: center;
  }

  .hero-section h1 {
    font-size: 3.5em;
    font-weight: 900;
    margin-bottom: 20px;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }

  .hero-section p {
    font-size: 1.4em;
    opacity: 0.95;
    max-width: 800px;
    margin: 0 auto;
  }

  /* ========== 連絡先カードセクション ========== */
  .contact-section {
    background: white;
    padding: 100px 20px;
  }

  .contact-grid {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
  }

  .contact-card {
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    border-radius: 20px;
    padding: 40px 30px;
    text-align: center;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .contact-card::before {
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

  .contact-card:hover::before {
    transform: scaleX(1);
  }

  .contact-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
  }

  .contact-icon {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5em;
    margin: 0 auto 25px;
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
  }

  .contact-title {
    font-size: 1.5em;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 15px;
  }

  .contact-link {
    color: #667eea;
    text-decoration: none;
    font-size: 1.05em;
    font-weight: 600;
    transition: all 0.3s ease;
    display: inline-block;
    padding: 10px 20px;
    border-radius: 50px;
    background: white;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  .contact-link:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }

  .contact-description {
    color: #718096;
    margin-top: 15px;
    line-height: 1.6;
  }

  /* ========== インフォメーションセクション ========== */
  .info-section {
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    padding: 100px 20px;
  }

  .info-container {
    max-width: 900px;
    margin: 0 auto;
    text-align: center;
  }

  .section-title {
    font-size: 2.8em;
    font-weight: 900;
    color: #2d3748;
    margin-bottom: 30px;
    position: relative;
    display: inline-block;
  }

  .section-title::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    border-radius: 2px;
  }

  .info-text {
    font-size: 1.2em;
    color: #718096;
    line-height: 1.8;
    margin-bottom: 40px;
  }

  .info-box {
    background: white;
    border-radius: 20px;
    padding: 40px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    margin-top: 40px;
  }

  .info-box h3 {
    font-size: 1.8em;
    color: #2d3748;
    margin-bottom: 20px;
  }

  .info-box p {
    color: #718096;
    line-height: 1.8;
    font-size: 1.05em;
  }

  .info-list {
    text-align: left;
    max-width: 600px;
    margin: 30px auto;
  }

  .info-list li {
    padding: 15px 0;
    border-bottom: 1px solid #e2e8f0;
    color: #2d3748;
    font-size: 1.05em;
  }

  .info-list li:last-child {
    border-bottom: none;
  }

  /* ========== CTAセクション ========== */
  .cta-section {
    background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
    color: white;
    padding: 100px 20px;
    text-align: center;
  }

  .cta-title {
    font-size: 2.5em;
    font-weight: 900;
    margin-bottom: 20px;
  }

  .cta-text {
    font-size: 1.3em;
    margin-bottom: 40px;
    opacity: 0.9;
  }

  .btn {
    padding: 18px 40px;
    font-size: 1.1em;
    font-weight: 700;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    display: inline-block;
  }

  .btn-primary {
    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
    color: white;
    box-shadow: 0 10px 30px rgba(238, 90, 111, 0.4);
  }

  .btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(238, 90, 111, 0.6);
  }

  /* ========== レスポンシブ ========== */
  @media (max-width: 768px) {
    .hero-section h1 {
      font-size: 2.2em;
    }

    .section-title {
      font-size: 2em;
    }

    .contact-grid {
      grid-template-columns: 1fr;
    }
  }

  html {
    scroll-behavior: smooth;
  }
</style>

<!-- ヒーローセクション -->
<div class="hero-section">
  <h1>💬 お問い合わせ</h1>
  <p>ご質問・ご要望・不具合報告など、お気軽にお問い合わせください</p>
</div>

<!-- 連絡先カードセクション -->
<div class="contact-section">
  <div class="contact-grid">
    <!-- メール -->
    <div class="contact-card">
      <div class="contact-icon">📧</div>
      <h3 class="contact-title">メール</h3>
      <a href="mailto:fujita.otm@gmail.com" class="contact-link">
        fujita.otm@gmail.com
      </a>
      <p class="contact-description">
        詳細なお問い合わせやバグ報告に最適です
      </p>
    </div>

    <!-- Twitter (X) -->
    <div class="contact-card">
      <div class="contact-icon">🐦</div>
      <h3 class="contact-title">Twitter (X)</h3>
      <a href="https://x.com/OTM_corp" target="_blank" class="contact-link">
        @OTM_corp
      </a>
      <p class="contact-description">
        最新情報やアップデート通知をフォロー
      </p>
    </div>

    <!-- Discord -->
    <div class="contact-card">
      <div class="contact-icon">💬</div>
      <h3 class="contact-title">Discord</h3>
      <a href="https://discordapp.com/users/762244902124912695" target="_blank" class="contact-link">
        Discordで連絡
      </a>
      <p class="contact-description">
        リアルタイムでのサポートが可能です
      </p>
    </div>

    <!-- Chatwork -->
    <div class="contact-card">
      <div class="contact-icon">💼</div>
      <h3 class="contact-title">Chatwork</h3>
      <a href="https://www.chatwork.com/fujita_otm" target="_blank" class="contact-link">
        Chatworkで連絡
      </a>
      <p class="contact-description">
        ビジネス用途でのお問い合わせに
      </p>
    </div>
  </div>
</div>

<!-- インフォメーションセクション -->
<div class="info-section">
  <div class="info-container">
    <h2 class="section-title">お問い合わせについて</h2>
    <p class="info-text">
      お問い合わせの際は、以下の情報をご提供いただけるとスムーズです
    </p>

    <div class="info-box">
      <h3>📋 含めていただきたい情報</h3>
      <ul class="info-list">
        <li>✓ ソフトウェアのバージョン</li>
        <li>✓ お使いのOS（Windows/macOS）とバージョン</li>
        <li>✓ 問題が発生した際の操作手順</li>
        <li>✓ エラーメッセージのスクリーンショット</li>
        <li>✓ 期待される動作と実際の動作</li>
      </ul>
    </div>

    <div class="info-box">
      <h3>⏱️ 対応時間</h3>
      <p>
        通常、ご連絡いただいてから<strong>24〜48時間以内</strong>に返信いたします。<br>
        緊急の場合は、Discordでのご連絡が最も迅速です。<br>
        <small>※土日祝日は対応が遅れる場合がございます</small>
      </p>
    </div>
  </div>
</div>

<!-- CTAセクション -->
<div class="cta-section">
  <h2 class="cta-title">まだダウンロードしていませんか？</h2>
  <p class="cta-text">
    7日間の無料トライアルで、動画制作の革命を体験してください
  </p>
  <a href="/download" class="btn btn-primary">無料でダウンロード</a>
</div>
