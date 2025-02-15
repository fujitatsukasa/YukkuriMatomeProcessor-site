---
layout: page
title: 使い方
subtitle: ゆっくりまとめプロセッサーの操作ガイド
---

<style>
  /* Google Fonts の読み込み */
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

  /* ====================== */
  /* 元の基本スタイル（目次、本文、モーダルなど） */
  /* ====================== */
  .page-content {
    font-family: 'Roboto', sans-serif;
    max-width: 900px;
    margin: 0 auto;
    padding: 1.5em;
    color: #333;
    line-height: 1.6;
  }
  .toc {
    background: #f0f8ff;
    border: 1px solid #007BFF;
    border-radius: 8px;
    padding: 1em 1.2em;
    margin-bottom: 2em;
  }
  .toc h3 {
    margin: 0;
    font-size: 1.5em;
    color: #007BFF;
    border-bottom: 1px dashed #007BFF;
    padding-bottom: 0.3em;
    text-align: center;
  }
  .toc ul {
    list-style: none;
    padding-left: 0;
    margin: 1em 0 0 0;
  }
  .toc li {
    margin: 0.5em 0;
  }
  /* 目次の階層 */
  .toc li.toc-h2 {
    font-weight: bold;
    color: #0056b3;
  }
  .toc li.toc-h3 {
    margin-left: 1.5em;
  }
  .toc a {
    text-decoration: none;
    color: #007BFF;
    font-weight: 500;
    transition: color 0.3s ease;
  }
  .toc a:hover {
    color: #0056b3;
    text-decoration: underline;
  }
  h2.section-title {
    font-size: 2.4em;
    margin: 1.5em 0 0.5em;
    color: #222;
    border-bottom: 3px solid #007BFF;
    padding-bottom: 0.3em;
    text-align: center;
  }
  h3.subsection-title {
    font-size: 1.5em;
    margin: 1.2em 0 0.5em;
    color: #444;
    text-align: center;
  }
  .section-content p {
    margin: 0.8em 0;
    text-align: center;
  }
  /* モーダル（ライトボックス） */
  .modal {
    display: none;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.8);
  }
  .modal-content {
    display: block;
    margin: 5% auto;
    max-height: 80vh;  /* ビューポートの80%を最大高さとする */
    max-width: 100vw;  /* 横幅はビューポート全体まで許容 */
    width: auto;
    height: auto;
    border-radius: 8px;
  }
  .modal-close {
    position: absolute;
    top: 20px;
    right: 35px;
    color: #f1f1f1;
    font-size: 40px;
    font-weight: bold;
    transition: color 0.3s ease;
    cursor: pointer;
  }
  .modal-close:hover,
  .modal-close:focus {
    color: #bbb;
    text-decoration: none;
    cursor: pointer;
  }

  /* ====================== */
  /* カルーセル部分（画像部分のみ差し替え用） */
  /* ====================== */
  /* カルーセル本体：固定サイズ（例：高さ400px） */
  .carousel {
    position: relative;
    width: 100%;
    height: 400px; /* 固定高さ。必要に応じて調整してください */
    overflow: hidden;
    margin: 2em 0;
    border: 1px solid #ddd;
    border-radius: 12px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    background: #fff;
  }

  /* スライドを横に並べるためのトラック */
  .carousel-track {
    display: flex;
    transition: transform 0.5s ease-in-out;
    height: 100%;
  }

  /* スライド自体：カルーセルと同じサイズ */
  .carousel-slide {
    position: relative;
    flex-shrink: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  /* 画像をスライド中心に絶対配置し、アスペクト比を維持して収める */
  .carousel-slide img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    object-position: center;
    transition: transform 0.3s ease;
    cursor: pointer;
  }
  .carousel-slide img:hover {
    transform: translate(-50%, -50%) scale(1.05);
  }

  /* ナビゲーション矢印 */
  .carousel-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0,0,0,0.4);
    border: none;
    color: #fff;
    font-size: 2rem;
    padding: 0 0.5em;
    cursor: pointer;
    z-index: 10;
    border-radius: 4px;
    transition: all 0.2s ease;
  }
  .carousel-button--left {
    left: 10px;
  }
  .carousel-button--right {
    right: 10px;
  }
  .carousel-button:hover {
    background: rgba(0,0,0,0.6);
  }
  .carousel-button:active {
    transform: translateY(-50%) scale(0.9);
  }

  /* インジケーター（カルーセル内下部中央） */
  .carousel-indicators {
    position: absolute;
    bottom: 8px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    display: flex;
    gap: 6px;
  }
  .carousel-indicator {
    width: 12px;
    height: 12px;
    background: rgba(255,255,255,0.6);
    border-radius: 50%;
    cursor: pointer;
    transition: background 0.3s ease;
  }
  .carousel-indicator.active {
    background: #007BFF;
  }

  /* ====================== */
  /* サブセクション見出しカード風スタイル */
  /* ====================== */
  .subsection-card {
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    padding: 1em;
    margin: 1.5em auto;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    text-align: center;
  }
  .subsection-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }

  /* ====================== */
  /* その他の既存コンテンツ */
  /* ====================== */
  .usage-list {
    max-width: 800px;
    margin: 0 auto 2em;
    font-size: 1.15em;
    line-height: 1.8;
    list-style-type: decimal;
    padding-left: 1.2em;
  }
  blockquote {
    border-left: 4px solid #ccc;
    margin: 1.8em 0;
    padding-left: 1em;
    font-style: italic;
    color: #555;
  }
  a {
    color: #007BFF;
    text-decoration: none;
    transition: color 0.3s ease;
  }
  a:hover {
    color: #0056b3;
    text-decoration: underline;
  }
  @media screen and (max-width: 768px) {
    .section-title { font-size: 2em; }
  }
</style>

<!-- モーダル（ライトボックス）は元のまま -->
<div id="imgModal" class="modal">
  <span class="modal-close" id="modalClose">&times;</span>
  <img class="modal-content" id="modalImg" alt="">
</div>

<div class="page-content">

  <!-- 目次 -->
  <div class="toc">
    <h3>目次</h3>
    <ul>
      <li class="toc-h2"><a href="#video-editing">動画編集</a></li>
      <li class="toc-h3"><a href="#video-editing-basics">基本操作</a></li>
      <li class="toc-h3"><a href="#video-editing-advanced">高度な編集</a></li>
      <li class="toc-h2"><a href="#script-retrieval">台本取得</a></li>
      <li class="toc-h3"><a href="#script-retrieval-flow">取得の流れ</a></li>
      <li class="toc-h2"><a href="#script-configuration">台本設定</a></li>
      <li class="toc-h3"><a href="#script-format-adjustment">フォーマット調整</a></li>
      <li class="toc-h3"><a href="#script-keyword-insertion">キーワード挿入</a></li>
      <li class="toc-h2"><a href="#overall-settings">全体設定</a></li>
      <li class="toc-h3"><a href="#ui-customization">UIカスタマイズ</a></li>
      <li class="toc-h3"><a href="#notification-settings">通知設定</a></li>
    </ul>
  </div>

  <!-- セクション: 動画編集 -->
  <div id="video-editing" class="section-content">
    <h2 class="section-title">動画編集</h2>
    <p>ゆっくりムービーメーカー4を使用した動画編集の手順を、以下のカルーセルで確認してください。</p>

    <!-- サブセクションカード: 基本操作 -->
    <div class="subsection-card" id="video-editing-basics">
      <h3 class="subsection-title">基本操作</h3>
      <p>クリップのトリミング、結合、再配置など基本操作の流れを図解で解説します。</p>
      <!-- カルーセル -->
      <div class="carousel">
        <div class="carousel-track">
          <div class="carousel-slide">
            <img src="/assets/img/製品イメージ1.png" alt="製品イメージ1" title="クリックして拡大表示（全画面）">
          </div>
          <div class="carousel-slide">
            <img src="/assets/img/製品イメージ2.png" alt="製品イメージ2" title="クリックして拡大表示（全画面）">
          </div>
          <div class="carousel-slide">
            <img src="/assets/img/製品イメージ3.png" alt="製品イメージ3" title="クリックして拡大表示（全画面）">
          </div>
        </div>
        <button class="carousel-button carousel-button--left">&#10094;</button>
        <button class="carousel-button carousel-button--right">&#10095;</button>
        <div class="carousel-indicators"></div>
      </div>
    </div>

    <!-- サブセクションカード: 高度な編集 -->
    <div class="subsection-card" id="video-editing-advanced">
      <h3 class="subsection-title">高度な編集</h3>
      <p>エフェクトの適用、色調補正、テキストオーバーレイなど、より高度な編集方法を図解で解説します。</p>
      <!-- カルーセル -->
      <div class="carousel">
        <div class="carousel-track">
          <div class="carousel-slide">
            <img src="/assets/img/製品イメージ1.png" alt="製品イメージ1" title="クリックして拡大表示（全画面）">
          </div>
          <div class="carousel-slide">
            <img src="/assets/img/製品イメージ2.png" alt="製品イメージ2" title="クリックして拡大表示（全画面）">
          </div>
          <div class="carousel-slide">
            <img src="/assets/img/製品イメージ3.png" alt="製品イメージ3" title="クリックして拡大表示（全画面）">
          </div>
        </div>
        <button class="carousel-button carousel-button--left">&#10094;</button>
        <button class="carousel-button carousel-button--right">&#10095;</button>
        <div class="carousel-indicators"></div>
      </div>
    </div>
  </div>

  <!-- セクション: 台本取得 -->
  <div id="script-retrieval" class="section-content">
    <h2 class="section-title">台本取得</h2>
    <p>サイトやまとめ掲示板から台本を自動で取得する方法の全体フローを解説します。</p>
    <!-- サブセクションカード: 取得の流れ -->
    <div class="subsection-card" id="script-retrieval-flow">
      <h3 class="subsection-title">設定一覧</h3>
      <p>台本取得前に様々な設定を変更することができます。</p>

  <!-- 追加文：台本取得方法 -->
  <div class="system-settings" style="text-align:left; margin:1em 0; padding: 1em; border: 1px solid #ccc; border-radius: 8px; background:#f9f9f9;">
    <p><strong>1. サイト選択</strong><br>
    対象となるサイトを、サイト名から選択します。<br>
    【ポイント】<br>
    利用可能なサイトの中から、取得したい情報があるサイトを選びます。</p>
    
    <p><strong>2. 記事一覧取得</strong><br>
    選択したサイトのメニューから記事一覧を取得します。<br>
    【ポイント】<br>
    一覧表示された記事から、目的の記事を確認できるようになります。</p>
    
    <p><strong>3. 記事選択</strong><br>
    取得したい記事を、一覧の中から選択します。<br>
    【ポイント】<br>
    複数の記事がある場合、必要な記事のみを抽出できます。</p>
    
    <p><strong>4. ダウンロード実施</strong><br>
    選択した記事をダウンロードし、台本として保存します。<br>
    【ポイント】<br>
    ダウンロード後は、取得した台本を編集・加工して利用できます。</p>
  </div>

      <!-- カルーセル -->
      <div class="carousel">
        <div class="carousel-track">
          <div class="carousel-slide">
            <img src="/assets/img/台本取得-設定.png" alt="製品イメージ1" title="クリックして拡大表示（全画面）">
          </div>
          <div class="carousel-slide">
            <img src="/assets/img/製品イメージ2.png" alt="製品イメージ2" title="クリックして拡大表示（全画面）">
          </div>
          <div class="carousel-slide">
            <img src="/assets/img/製品イメージ3.png" alt="製品イメージ3" title="クリックして拡大表示（全画面）">
          </div>
        </div>
        <button class="carousel-button carousel-button--left">&#10094;</button>
        <button class="carousel-button carousel-button--right">&#10095;</button>
        <div class="carousel-indicators"></div>
      </div>
    </div>
  </div>
    <!-- サブセクションカード: 台本取得方法 -->
    <div class="subsection-card" id="script-retrieval-flow">
      <h3 class="subsection-title">台本取得方法</h3>
      <p>台本取得を取得するまでの方法をお伝えします。</p>

  <!-- 追加文：台本取得方法 -->
  <div class="system-settings" style="text-align:left; margin:1em 0; padding: 1em; border: 1px solid #ccc; border-radius: 8px; background:#f9f9f9;">
    <p><strong>1. サイト選択</strong><br>
    対象となるサイトを、サイト名から選択します。<br>
    【ポイント】<br>
    利用可能なサイトの中から、取得したい情報があるサイトを選びます。</p>
    
    <p><strong>2. 記事一覧取得</strong><br>
    選択したサイトのメニューから記事一覧を取得します。<br>
    【ポイント】<br>
    一覧表示された記事から、目的の記事を確認できるようになります。</p>
    
    <p><strong>3. 記事選択</strong><br>
    取得したい記事を、一覧の中から選択します。<br>
    【ポイント】<br>
    複数の記事がある場合、必要な記事のみを抽出できます。</p>
    
    <p><strong>4. ダウンロード実施</strong><br>
    選択した記事をダウンロードし、台本として保存します。<br>
    【ポイント】<br>
    ダウンロード後は、取得した台本を編集・加工して利用できます。</p>
  </div>

      <!-- カルーセル -->
      <div class="carousel">
        <div class="carousel-track">
          <div class="carousel-slide">
            <img src="/assets/img/台本取得-設定.png" alt="製品イメージ1" title="クリックして拡大表示（全画面）">
          </div>
          <div class="carousel-slide">
            <img src="/assets/img/製品イメージ2.png" alt="製品イメージ2" title="クリックして拡大表示（全画面）">
          </div>
          <div class="carousel-slide">
            <img src="/assets/img/製品イメージ3.png" alt="製品イメージ3" title="クリックして拡大表示（全画面）">
          </div>
        </div>
        <button class="carousel-button carousel-button--left">&#10094;</button>
        <button class="carousel-button carousel-button--right">&#10095;</button>
        <div class="carousel-indicators"></div>
      </div>
    </div>
  </div>

  <!-- セクション: 台本設定 -->
  <div id="script-configuration" class="section-content">
    <h2 class="section-title">台本設定</h2>
    <p>取得した台本を編集し、動画編集に最適な形式に整える方法を解説します。</p>

    <!-- サブセクションカード: フォーマット調整 -->
    <div class="subsection-card" id="script-format-adjustment">
      <h3 class="subsection-title">フォーマット調整</h3>
      <p>不要な情報の削除や改行の調整、フォーマットの統一を行います。</p>
      <!-- カルーセル -->
      <div class="carousel">
        <div class="carousel-track">
          <div class="carousel-slide">
            <img src="/assets/img/製品イメージ1.png" alt="製品イメージ1" title="クリックして拡大表示（全画面）">
          </div>
          <div class="carousel-slide">
            <img src="/assets/img/製品イメージ2.png" alt="製品イメージ2" title="クリックして拡大表示（全画面）">
          </div>
          <div class="carousel-slide">
            <img src="/assets/img/製品イメージ3.png" alt="製品イメージ3" title="クリックして拡大表示（全画面）">
          </div>
        </div>
        <button class="carousel-button carousel-button--left">&#10094;</button>
        <button class="carousel-button carousel-button--right">&#10095;</button>
        <div class="carousel-indicators"></div>
      </div>
    </div>

    <!-- サブセクションカード: キーワード挿入 -->
    <div class="subsection-card" id="script-keyword-insertion">
      <h3 class="subsection-title">キーワード挿入</h3>
      <p>台本内に効果的なキーワードを挿入して、動画のSEOや視聴率向上を狙います。</p>
      <!-- カルーセル -->
      <div class="carousel">
        <div class="carousel-track">
          <div class="carousel-slide">
            <img src="/assets/img/製品イメージ1.png" alt="製品イメージ1" title="クリックして拡大表示（全画面）">
          </div>
          <div class="carousel-slide">
            <img src="/assets/img/製品イメージ2.png" alt="製品イメージ2" title="クリックして拡大表示（全画面）">
          </div>
          <div class="carousel-slide">
            <img src="/assets/img/製品イメージ3.png" alt="製品イメージ3" title="クリックして拡大表示（全画面）">
          </div>
        </div>
        <button class="carousel-button carousel-button--left">&#10094;</button>
        <button class="carousel-button carousel-button--right">&#10095;</button>
        <div class="carousel-indicators"></div>
      </div>
    </div>
  </div>

  <!-- セクション: 全体設定 -->
  <div id="overall-settings" class="section-content">
    <h2 class="section-title">全体設定</h2>
    <p>ユーザーインターフェースのカスタマイズ、保存先の設定、通知のオン／オフなど、ソフトウェア全体の設定方法を紹介します。</p>

    <!-- サブセクションカード: UIカスタマイズ -->
    <div class="subsection-card" id="ui-customization">
      <h3 class="subsection-title">UIカスタマイズ</h3>
      <p>操作性向上のための各種レイアウトや配色の調整方法を解説します。</p>
      <!-- カルーセル -->
      <div class="carousel">
        <div class="carousel-track">
          <div class="carousel-slide">
            <img src="/assets/img/製品イメージ1.png" alt="製品イメージ1" title="クリックして拡大表示（全画面）">
          </div>
          <div class="carousel-slide">
            <img src="/assets/img/製品イメージ2.png" alt="製品イメージ2" title="クリックして拡大表示（全画面）">
          </div>
          <div class="carousel-slide">
            <img src="/assets/img/製品イメージ3.png" alt="製品イメージ3" title="クリックして拡大表示（全画面）">
          </div>
        </div>
        <button class="carousel-button carousel-button--left">&#10094;</button>
        <button class="carousel-button carousel-button--right">&#10095;</button>
        <div class="carousel-indicators"></div>
      </div>
    </div>

    <!-- サブセクションカード: 通知設定 -->
    <div class="subsection-card" id="notification-settings">
      <h3 class="subsection-title">通知設定</h3>
      <p>動画編集や台本取得時の通知設定、アラートのカスタマイズ方法を解説します。</p>
      <!-- カルーセル -->
      <div class="carousel">
        <div class="carousel-track">
          <div class="carousel-slide">
            <img src="/assets/img/製品イメージ1.png" alt="製品イメージ1" title="クリックして拡大表示（全画面）">
          </div>
          <div class="carousel-slide">
            <img src="/assets/img/製品イメージ2.png" alt="製品イメージ2" title="クリックして拡大表示（全画面）">
          </div>
          <div class="carousel-slide">
            <img src="/assets/img/製品イメージ3.png" alt="製品イメージ3" title="クリックして拡大表示（全画面）">
          </div>
        </div>
        <button class="carousel-button carousel-button--left">&#10094;</button>
        <button class="carousel-button carousel-button--right">&#10095;</button>
        <div class="carousel-indicators"></div>
      </div>
    </div>
  </div>

  <!-- セクション内ナビゲーション（オプション） -->
  <div class="section-nav">
    <a href="#video-editing">動画編集</a>
    <a href="#script-retrieval">台本取得</a>
    <a href="#script-configuration">台本設定</a>
    <a href="#overall-settings">全体設定</a>
  </div>

</div>

<script>
  // Carousel JS：各カルーセルに対して処理を実施
  const carousels = document.querySelectorAll('.carousel');
  carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    let currentSlideIndex = 0;
    const slideCount = slides.length;

    // ※Flexレイアウトを採用しているため、各スライドの left 指定は不要です
    // （以前は下記コードで設定していましたが、削除しました）
    // slides.forEach((slide, index) => {
    //   slide.style.left = index * 100 + '%';
    // });

    // インジケーター生成
    const indicatorsContainer = carousel.querySelector('.carousel-indicators');
    indicatorsContainer.innerHTML = '';
    for (let i = 0; i < slideCount; i++) {
      const dot = document.createElement('div');
      dot.classList.add('carousel-indicator');
      if (i === 0) dot.classList.add('active');
      dot.setAttribute('data-slide', i);
      indicatorsContainer.appendChild(dot);
    }

    const updateIndicators = (index) => {
      const dots = Array.from(indicatorsContainer.children);
      dots.forEach(dot => dot.classList.remove('active'));
      dots[index].classList.add('active');
    };

    const moveToSlide = (index) => {
      track.style.transform = `translateX(-${index * 100}%)`;
      currentSlideIndex = index;
      updateIndicators(index);
    };

    // 左右ボタン
    carousel.querySelector('.carousel-button--left').addEventListener('click', () => {
      const prevIndex = (currentSlideIndex - 1 + slideCount) % slideCount;
      moveToSlide(prevIndex);
    });
    carousel.querySelector('.carousel-button--right').addEventListener('click', () => {
      const nextIndex = (currentSlideIndex + 1) % slideCount;
      moveToSlide(nextIndex);
    });

    // 自動再生（5秒ごと）
    setInterval(() => {
      const nextIndex = (currentSlideIndex + 1) % slideCount;
      moveToSlide(nextIndex);
    }, 5000);

    // インジケータークリック時
    indicatorsContainer.querySelectorAll('.carousel-indicator').forEach(dot => {
      dot.addEventListener('click', (e) => {
        const index = parseInt(e.target.getAttribute('data-slide'));
        moveToSlide(index);
      });
    });
  });

  // モーダル（全画面拡大表示）の処理
  const modal = document.getElementById('imgModal');
  const modalImg = document.getElementById('modalImg');
  const modalClose = document.getElementById('modalClose');

  document.querySelectorAll('.carousel-slide img').forEach((img) => {
    img.addEventListener('click', () => {
      modal.style.display = "block";
      modalImg.src = img.src;
    });
  });

  modalClose.addEventListener('click', () => {
    modal.style.display = "none";
  });
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
</script>
