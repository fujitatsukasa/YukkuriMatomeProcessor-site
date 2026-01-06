---
layout: page
title: ホーム
subtitle: 動画編集効率化ツール【ゆっくりまとめプロセッサー】
permalink: /
---


<style>
  /* ★★★ 全体の基本設定 ★★★ */
  .page-content {
    font-family: 'Noto Sans JP', 'Poppins', sans-serif;
    line-height: 1.8;
    color: #333;
    max-width: 1000px;
    margin: 30px auto;
    padding: 2em 2em 3em;
    background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
    box-shadow: 0 20px 60px rgba(102, 126, 234, 0.3), 0 8px 20px rgba(0,0,0,0.1);
    border-radius: 30px;
    text-align: center;
    position: relative;
    overflow: hidden;
    animation: slideInFromBottom 0.8s ease-out;
  }

  @keyframes slideInFromBottom {
    from {
      opacity: 0;
      transform: translateY(50px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .page-content::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 8px;
    background: linear-gradient(90deg, #667eea, #764ba2, #f093fb, #4facfe);
    background-size: 300% 100%;
    animation: gradientMove 4s ease infinite;
  }

  /* ★★★ セクションカード全体を包むクラス ★★★ */
  .section-card {
    margin: 3em auto;
    padding: 2.5em;
    border-radius: 25px;
    background: linear-gradient(135deg, #ffffff 0%, #f0f7ff 100%);
    box-shadow: 0 15px 40px rgba(102, 126, 234, 0.2), 0 5px 15px rgba(0,0,0,0.08);
    text-align: center;
    max-width: 900px;
    position: relative;
    overflow: hidden;
    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    animation: fadeInScale 0.8s ease-out;
  }

  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .section-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 6px;
    background: linear-gradient(90deg, #667eea, #764ba2, #f093fb, #4facfe);
    background-size: 200% 100%;
    animation: gradientMove 3s ease infinite;
  }

  @keyframes gradientMove {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  .section-card:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 25px 60px rgba(102, 126, 234, 0.35), 0 10px 25px rgba(0,0,0,0.15);
  }

  /* 見出し（タイトル）のデザインをカード内でより豪華に */
  .section-title {
    font-size: 2.8em;
    margin: 0.5em 0;
    font-weight: 800;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    position: relative;
    display: inline-block;
    padding-bottom: 0.3em;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  }

  /* 虹色線を太く + シャドウを付けて目立たせる */
  .section-title::after {
    content: "";
    display: block;
    width: 80%;
    height: 8px;
    background: linear-gradient(90deg, #667eea, #764ba2, #f093fb, #4facfe);
    margin: 0.5em auto 0;
    border-radius: 4px;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    animation: pulse 2s ease infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scaleX(1); }
    50% { opacity: 0.8; transform: scaleX(0.95); }
  }

  /* hr（ページ区切り線）をリッチに */
  hr {
    border: none;
    height: 6px;
    margin: 3em 0;
    border-radius: 3px;
    background: linear-gradient(90deg, #667eea, #764ba2, #f093fb, #4facfe);
    background-size: 200% 100%;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    animation: gradientMove 3s ease infinite;
  }

  /* ★★★ カルーセル ★★★ */
  .carousel {
    position: relative;
    width: 100%;
    overflow: hidden;
    margin: 3em auto;
    border: none;
    border-radius: 25px;
    box-shadow: 0 20px 60px rgba(102, 126, 234, 0.25), 0 8px 25px rgba(0,0,0,0.1);
    background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
    text-align: left;
    transition: all 0.4s ease;
  }

  .carousel:hover {
    transform: scale(1.02);
    box-shadow: 0 30px 80px rgba(102, 126, 234, 0.35), 0 12px 35px rgba(0,0,0,0.15);
  }
  .carousel-track {
    display: flex;
    transition: transform 0.5s ease-in-out;
  }
  .carousel-slide {
    min-width: 100%;
    box-sizing: border-box;
  }
  .carousel-slide img {
    width: 100%;
    display: block;
    cursor: pointer;
    transition: transform 0.3s ease;
  }
  .carousel-slide img:hover {
    transform: scale(1.03);
  }

  /* ナビゲーション矢印 */
  .carousel-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.9), rgba(118, 75, 162, 0.9));
    border: 2px solid rgba(255, 255, 255, 0.8);
    color: #fff;
    font-size: 2em;
    cursor: pointer;
    z-index: 10;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 46px;
    transition: all 0.3s ease;
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
  }

  .carousel-button:hover {
    background: linear-gradient(135deg, rgba(118, 75, 162, 0.95), rgba(102, 126, 234, 0.95));
    transform: translateY(-50%) scale(1.15);
    box-shadow: 0 12px 30px rgba(102, 126, 234, 0.6);
  }

  .carousel-button:active {
    transform: translateY(-50%) scale(1.05);
  }
  .carousel-button--left {
    left: 10px;
  }
  .carousel-button--right {
    right: 10px;
  }

  /* インジケーター */
  .carousel-indicators {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    display: flex;
    gap: 12px;
  }

  .carousel-indicator {
    width: 14px;
    height: 14px;
    background: rgba(255, 255, 255, 0.5);
    border: 2px solid rgba(102, 126, 234, 0.6);
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.4s ease;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }

  .carousel-indicator:hover {
    transform: scale(1.2);
    background: rgba(255, 255, 255, 0.8);
    border-color: rgba(102, 126, 234, 1);
  }

  .carousel-indicator.active {
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-color: #ffffff;
    transform: scale(1.3);
    box-shadow: 0 6px 15px rgba(102, 126, 234, 0.6);
  }

  /* ★★★ 全画面モーダル（拡大表示用） ★★★ */
  .modal {
    display: none;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.9);
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .modal img {
    max-width: 60vw;
    max-height: 80vh;
    box-shadow: 0 4px 15px rgba(255,255,255,0.2);
  }
  .modal .modal-info {
    color: #fff;
    margin-top: 1em;
    font-size: 1.2em;
    text-align: center;
  }
  .modal .close-modal {
    position: absolute;
    top: 20px;
    right: 30px;
    font-size: 2.5em;
    color: #fff;
    cursor: pointer;
    transition: transform 0.2s ease;
  }
  .modal .close-modal:hover {
    transform: scale(1.15);
  }

  /* ★★★ 特徴などのコンテンツブロック ★★★ */
  .feature-item {
    text-align: center;
    padding: 2em;
    margin: 2.5em auto;
    border: none;
    border-radius: 20px;
    background: linear-gradient(135deg, #ffffff 0%, #f7fafc 100%);
    max-width: 750px;
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.15), 0 3px 10px rgba(0,0,0,0.08);
    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    overflow: hidden;
  }

  .feature-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, currentColor, transparent);
    opacity: 0.6;
  }

  .feature-item:hover {
    transform: translateY(-10px) scale(1.03);
    box-shadow: 0 20px 50px rgba(102, 126, 234, 0.3), 0 8px 20px rgba(0,0,0,0.15);
  }

  .feature-item h3 {
    margin-bottom: 0.8em;
    font-size: 2em;
    font-weight: 800;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    position: relative;
    display: inline-block;
  }

  .feature-item h3::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 3px;
    background: currentColor;
    border-radius: 2px;
    opacity: 0.3;
  }

  /* ★★★ blockquote（お客様の声）をリッチに ★★★ */
  blockquote {
    position: relative;
    margin: 2.5em auto;
    padding: 2em 2.5em;
    border: none;
    border-radius: 20px;
    background: linear-gradient(135deg, #ffffff 0%, #fefefe 100%);
    box-shadow: 0 15px 40px rgba(102, 126, 234, 0.15), 0 5px 15px rgba(0,0,0,0.08);
    font-style: normal;
    color: #333;
    max-width: 750px;
    display: inline-block;
    text-align: left;
    transition: all 0.4s ease;
    overflow: hidden;
  }

  blockquote::before {
    content: """;
    font-family: 'Georgia', serif;
    position: absolute;
    top: 10px;
    left: 15px;
    font-size: 5em;
    font-weight: bold;
    background: linear-gradient(135deg, #667eea, #764ba2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    opacity: 0.3;
    line-height: 1;
  }

  blockquote::after {
    content: """;
    font-family: 'Georgia', serif;
    position: absolute;
    bottom: -10px;
    right: 15px;
    font-size: 5em;
    font-weight: bold;
    background: linear-gradient(135deg, #667eea, #764ba2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    opacity: 0.3;
    line-height: 1;
  }

  blockquote:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 50px rgba(102, 126, 234, 0.25), 0 8px 20px rgba(0,0,0,0.12);
  }

  blockquote span {
    display: block;
    margin-top: 1.2em;
    text-align: right;
    font-weight: 600;
    background: linear-gradient(135deg, #667eea, #764ba2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-style: italic;
  }

  /* リンクホバー */
  a {
    background: linear-gradient(135deg, #667eea, #764ba2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-decoration: none;
    font-weight: 600;
    position: relative;
    transition: all 0.3s ease;
  }

  a::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #667eea, #764ba2);
    transition: width 0.3s ease;
  }

  a:hover::after {
    width: 100%;
  }

  a:hover {
    text-shadow: 0 0 10px rgba(102, 126, 234, 0.5);
    transform: translateY(-2px);
  }

  @media screen and (max-width: 768px) {
    .section-title { font-size: 1.8em; }
    .section-title::after {
      width: 80%;
      height: 4px;
    }
    .modal img {
      max-width: 90vw;
      max-height: 60vh;
    }
  }

.full-width-header {
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  position: relative;
  box-shadow: 0 10px 40px rgba(102, 126, 234, 0.3);
  border-radius: 0 0 30px 30px;
}

.full-width-header::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 10px;
  background: linear-gradient(90deg, #667eea, #764ba2, #f093fb, #4facfe);
  background-size: 200% 100%;
  animation: gradientMove 3s ease infinite;
}

.full-width-header img {
  display: block;
  width: 100%;
  height: auto;
  transition: transform 0.5s ease;
}

.full-width-header:hover img {
  transform: scale(1.02);
}


</style>

<header class="full-width-header">
  <img src="/assets/img/header.png" alt="Header Image">
</header>

<div class="page-content">

  <!-- 製品概要 セクションカード -->
  <div class="section-card">
    <h2 class="section-title">製品概要</h2>
    <p>
      <strong>「ゆっくりまとめプロセッサー」</strong>は、OTM株式会社が社内で開発した<br>
      <strong>自動動画編集ソフトウェア</strong>です。<br>
      サイトから台本や画像、掲示板からスレッド情報を瞬時に取得し<br>
      動画編集プロセスを半自動化。<br>
      動画配信者、動画クリエイター、未経験者、副業を模索する社会人など<br>
      幅広いユーザーに支持されています。
    </p>
  </div>

  <!-- カルーセルのみページ全体 -->
  <div class="carousel">
    <div class="carousel-track">
      <div class="carousel-slide">
        <img src="/assets/img/製品イメージ1.png" alt="製品イメージ1" title="クリックして拡大表示（全画面）">
      </div>
      <!-- 画像を増やしたければ同様に <div class="carousel-slide">...</div> を追加 -->
    </div>
    <button class="carousel-button carousel-button--left">&#10094;</button>
    <button class="carousel-button carousel-button--right">&#10095;</button>
    <div class="carousel-indicators"></div>
  </div>

  <hr>

  <!-- 特徴 セクションカード -->
  <div class="section-card">
    <h2 class="section-title">特徴</h2>
    <div class="feature-item">
      <h3 style="color:#007BFF;">圧倒的な業務効率化</h3>
      <p>最も時間を要する動画編集の工程を自動化<br>
      大幅なコスト削減と生産性の向上を実現します。</p>
    </div>
    <div class="feature-item">
      <h3 style="color:#28A745;">先進的な自動編集技術</h3>
      <p>台本、画像素材、掲示板情報などを瞬時に取得し単調作業を一掃。<br>
      社内リソースをより戦略的な業務に集中させられます。</p>
    </div>
    <div class="feature-item">
      <h3 style="color:#DC3545;">柔軟なサポートと改善サイクル</h3>
      <p>お客様のフィードバックを迅速に反映し、製品を常に最適化。<br>
      ビジネス価値を最大化するためのパートナーとして伴走いたします。</p>
    </div>
  </div>

  <hr>

  <!-- お客様の声 セクションカード -->
  <div class="section-card">
    <h2 class="section-title">お客様の声</h2>
    <blockquote>
      「<strong>ゆっくりまとめプロセッサー</strong>の導入で、1日2本だった動画が半分の時間で20本に増加。<br>
      収益面でも10倍の効果を実感！」
      <span>*— 動画クリエイター 高橋様*</span>
    </blockquote>
    <blockquote>
      「毎日の動画編集によるストレスが軽減され、余裕を持って新たなことに挑戦できるようになりました。」
      <span>*— ゆっくり系配信者 S様*</span>
    </blockquote>
    <blockquote>
      「台本作成時の煩雑な作業が自動入れ替え機能で解消。作業効率が格段に向上しました！」
      <span>*— IT系個人事業主 A様*</span>
    </blockquote>
    <blockquote>
      「チーム全体の動画編集がシンプルになり、最終チェックのみで多数の動画が完成。売上と士気の向上に貢献！」
      <span>*— タブナジア合同会社様*</span>
    </blockquote>
    <p>
      弊社はお客様の声をもとに製品を進化させています。ご不明点やご要望はお気軽にお知らせください。
    </p>
  </div>

  <hr>

  <!-- 開発者情報 セクションカード -->
  <div class="section-card">
    <h2 class="section-title">開発者情報</h2>
    <p>
      <strong>開発者</strong>: 藤田僚&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <strong>所属</strong>: OTM株式会社&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <strong>公式サイト</strong>: <a href="https://your-company-website.example" target="_blank">OTM株式会社</a>
    </p>
  </div>

  <hr>

  <!-- 今後の展望 セクションカード -->
  <div class="section-card">
    <h2 class="section-title">今後の展望</h2>
    <p>
      当社は<strong>定期的なアップデート</strong>と<strong>新機能の追加</strong>を計画しております。<br>
      最新情報やアップデートは、公式サイトおよび各種SNSで随時発信いたしますのでご期待ください。
    </p>
  </div>

  <hr>

  <!-- お問い合わせ -->
  <p style="font-size: 0.9em;">
    本製品に関するお問い合わせは、<a href="mailto:fujita.otm@gmail.com">こちら</a>までお気軽にご連絡ください。
  </p>
</div>

<!-- 全画面モーダル（拡大表示用） -->
<div id="modal" class="modal">
  <span class="close-modal">&times;</span>
  <img id="modal-image" src="" alt="">
  <div class="modal-info" id="modal-info"></div>
</div>

<script>
  // Carousel JS
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  let currentSlideIndex = 0;
  const slideCount = slides.length;

  const setSlidePosition = () => {
    slides.forEach((slide, index) => {
      slide.style.left = index * 100 + '%';
    });
  };
  setSlidePosition();

  // Create carousel indicators
  const indicatorsContainer = document.querySelector('.carousel-indicators');
  for (let i = 0; i < slideCount; i++) {
    const dot = document.createElement('div');
    dot.classList.add('carousel-indicator');
    if (i === 0) dot.classList.add('active');
    dot.setAttribute('data-slide', i);
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

  // Navigation arrows
  document.querySelector('.carousel-button--left').addEventListener('click', () => {
    const prevIndex = (currentSlideIndex - 1 + slideCount) % slideCount;
    moveToSlide(prevIndex);
  });
  document.querySelector('.carousel-button--right').addEventListener('click', () => {
    const nextIndex = (currentSlideIndex + 1) % slideCount;
    moveToSlide(nextIndex);
  });

  // Auto-play every 5 seconds
  setInterval(() => {
    const nextIndex = (currentSlideIndex + 1) % slideCount;
    moveToSlide(nextIndex);
  }, 5000);

  // Modal for full-screen image
  const modal = document.getElementById('modal');
  const modalImage = document.getElementById('modal-image');
  const modalInfo = document.getElementById('modal-info');
  const closeModal = document.querySelector('.close-modal');

  document.querySelectorAll('.carousel-slide img').forEach((img, index) => {
    img.title = "クリックして拡大表示（全画面）";
    img.addEventListener('click', () => {
      modal.style.display = 'flex';
      modalImage.src = img.src;
      modalInfo.textContent = '画像 ' + (index + 1) + ' / ' + slideCount;
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
