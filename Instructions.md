---
layout: page
title: 使い方
subtitle: ゆっくりまとめプロセッサーの操作ガイド
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

  /* ========== ヒーローエリア ========== */
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

  /* ========== 注意事項エリア ========== */
  .notice-section {
    background: white;
    padding: 60px 20px;
  }

  .notice-container {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
  }

  .notice-card {
    background: linear-gradient(135deg, #fff3cd 0%, #ffe8a1 100%);
    border: 2px solid #ffc107;
    border-radius: 20px;
    padding: 30px;
    text-align: center;
    box-shadow: 0 10px 30px rgba(255, 193, 7, 0.3);
    transition: all 0.3s ease;
  }

  .notice-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(255, 193, 7, 0.5);
  }

  .notice-icon {
    font-size: 3em;
    margin-bottom: 15px;
  }

  .notice-title {
    font-size: 1.5em;
    font-weight: 700;
    color: #856404;
    margin-bottom: 10px;
  }

  .notice-text {
    color: #856404;
    line-height: 1.8;
    font-size: 1.05em;
  }

  /* ========== ビデオセクション ========== */
  .video-sections {
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    padding: 100px 20px;
  }

  .section-header {
    text-align: center;
    max-width: 800px;
    margin: 0 auto 60px;
  }

  .section-title {
    font-size: 2.8em;
    font-weight: 900;
    color: #2d3748;
    margin-bottom: 20px;
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

  .section-subtitle {
    font-size: 1.2em;
    color: #718096;
    margin-top: 30px;
  }

  .video-grid {
    max-width: 1400px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    gap: 50px;
  }

  .video-card {
    background: white;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;
  }

  .video-card:hover {
    transform: translateY(-15px);
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.25);
  }

  .video-card-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 25px;
    text-align: center;
  }

  .video-card-header h3 {
    font-size: 1.8em;
    font-weight: 700;
    margin: 0;
  }

  .video-card-body {
    padding: 0;
  }

  .video-container {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
  }

  .video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }

  .video-card-footer {
    padding: 25px;
    background: #f7fafc;
    text-align: center;
  }

  .video-description {
    color: #718096;
    font-size: 1.05em;
    line-height: 1.6;
  }

  /* ========== ステップガイド ========== */
  .steps-section {
    background: white;
    padding: 100px 20px;
  }

  .steps-container {
    max-width: 1000px;
    margin: 0 auto;
  }

  .step-item {
    display: flex;
    align-items: flex-start;
    gap: 30px;
    margin-bottom: 50px;
    padding: 30px;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    border-radius: 20px;
    transition: all 0.3s ease;
  }

  .step-item:hover {
    transform: translateX(10px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }

  .step-number {
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8em;
    font-weight: 900;
    flex-shrink: 0;
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
  }

  .step-content {
    flex: 1;
  }

  .step-content h3 {
    font-size: 1.6em;
    color: #2d3748;
    margin-bottom: 10px;
  }

  .step-content p {
    color: #718096;
    line-height: 1.8;
    font-size: 1.05em;
  }

  /* ========== CTA Section ========== */
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

  .cta-buttons {
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;
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

  .btn-secondary {
    background: white;
    color: #667eea;
    box-shadow: 0 10px 30px rgba(255, 255, 255, 0.3);
  }

  .btn-secondary:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(255, 255, 255, 0.5);
  }

  /* ========== レスポンシブ ========== */
  @media (max-width: 768px) {
    .hero-section h1 {
      font-size: 2.2em;
    }

    .section-title {
      font-size: 2em;
    }

    .video-grid {
      grid-template-columns: 1fr;
    }

    .step-item {
      flex-direction: column;
      text-align: center;
    }

    .step-number {
      margin: 0 auto 20px;
    }
  }

  html {
    scroll-behavior: smooth;
  }
</style>

<!-- ヒーローセクション -->
<div class="hero-section">
  <h1>📖 使い方ガイド</h1>
  <p>ゆっくりまとめプロセッサーを使って、効率的な動画制作を始めましょう</p>
</div>

<!-- 注意事項エリア -->
<div class="notice-section">
  <div class="notice-container">
    <div class="notice-card">
      <div class="notice-icon">⌨️</div>
      <h3 class="notice-title">ショートカット設定</h3>
      <p class="notice-text">
        起動時にYMM4のショートカット<br>
        「台本ファイルを開く」が<br>
        <strong>F2キー</strong>に自動で割り当てられます
      </p>
    </div>
    <div class="notice-card">
      <div class="notice-icon">⚙️</div>
      <h3 class="notice-title">初期設定が必要です</h3>
      <p class="notice-text">
        一番最初に「台本編集」の設定で<br>
        <strong>【YMM4パス】</strong><br>
        YukkuriMovieMaker.exeの<br>
        パスを通してください
      </p>
    </div>
  </div>
</div>

<!-- ビデオチュートリアルセクション -->
<div class="video-sections">
  <div class="section-header">
    <h2 class="section-title">チュートリアル動画</h2>
    <p class="section-subtitle">実際の操作を動画で確認できます</p>
  </div>

  <div class="video-grid">
    <!-- 台本取得 -->
    <div class="video-card">
      <div class="video-card-header">
        <h3>📄 台本取得</h3>
      </div>
      <div class="video-card-body">
        <div class="video-container">
          <iframe
            src="https://www.youtube.com/embed/E97yjZgjK8c"
            title="台本取得解説動画"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
          </iframe>
        </div>
      </div>
      <div class="video-card-footer">
        <p class="video-description">
          サイトや掲示板から台本を自動取得する方法を学びます
        </p>
      </div>
    </div>

    <!-- 台本編集 -->
    <div class="video-card">
      <div class="video-card-header">
        <h3>✏️ 台本編集</h3>
      </div>
      <div class="video-card-body">
        <div class="video-container">
          <iframe
            src="https://www.youtube.com/embed/oNdAwpbjFPI"
            title="台本編集解説動画"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
          </iframe>
        </div>
      </div>
      <div class="video-card-footer">
        <p class="video-description">
          取得した台本を編集し、動画制作に活用する方法を学びます
        </p>
      </div>
    </div>
  </div>
</div>

<!-- ステップガイド -->
<div class="steps-section">
  <div class="section-header">
    <h2 class="section-title">クイックスタートガイド</h2>
    <p class="section-subtitle">3ステップで動画制作を開始</p>
  </div>

  <div class="steps-container">
    <div class="step-item">
      <div class="step-number">1</div>
      <div class="step-content">
        <h3>初期設定を行う</h3>
        <p>
          「台本編集」の設定画面で、YukkuriMovieMaker.exeのパスを設定します。
          これにより、ソフトウェアが動画編集ツールと連携できるようになります。
        </p>
      </div>
    </div>

    <div class="step-item">
      <div class="step-number">2</div>
      <div class="step-content">
        <h3>台本を取得する</h3>
        <p>
          サイトやまとめ掲示板のURLを入力するだけで、自動的に台本を取得します。
          取得した台本は自動的に整形され、すぐに編集可能な状態になります。
        </p>
      </div>
    </div>

    <div class="step-item">
      <div class="step-number">3</div>
      <div class="step-content">
        <h3>台本を編集して動画を作成</h3>
        <p>
          内蔵エディタで台本を編集し、F2キーでYMM4に送信。
          あとは動画編集ツールで仕上げるだけで、プロフェッショナルな動画が完成します。
        </p>
      </div>
    </div>
  </div>
</div>

<!-- CTA Section -->
<div class="cta-section">
  <h2 class="cta-title">今すぐ始めましょう</h2>
  <p class="cta-text">
    分からないことがあれば、お気軽にお問い合わせください
  </p>
  <div class="cta-buttons">
    <a href="/download" class="btn btn-primary">ダウンロード</a>
    <a href="/contact" class="btn btn-secondary">お問い合わせ</a>
  </div>
</div>
