---
layout: page
title: ウィジェット・ライブラリ
subtitle: 目的別に選んで即反映できるUIウィジェット集
permalink: /widgets/
share-description: "目的別のUIウィジェットを番号付きで整理。選んでコピーできるギャラリー。"
ext-css:
  - href: "https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Noto+Sans+JP:wght@400;500;700;900&display=swap"
css:
  - "/assets/css/widget-gallery.css"
js:
  - "/assets/js/widget-gallery.js"
---

<div class="widget-lab">
  <div class="wl-container">
    <section class="wl-hero" id="wl-top">
      <div class="wl-hero__main">
        <div class="wl-kicker">Widget Library</div>
        <h1 class="wl-title">ウィジェットページ</h1>
        <p class="wl-lead">
          目的別に整理したUIウィジェットを番号で管理できるギャラリーです。<br>
          カテゴリで絞り込み、必要なウィジェットを選んでIDやJSONをコピーできます。
        </p>
        <div class="wl-hero__flow">
          <div class="wl-flow-step">1. カテゴリを絞る</div>
          <div class="wl-flow-step">2. 「選ぶ」で追加</div>
          <div class="wl-flow-step">3. 右のリストをコピー</div>
        </div>
      </div>
      <aside class="wl-hero__panel" aria-label="選択中のウィジェット">
        <div class="wl-selection__header">
          <span>選択中のウィジェット</span>
          <span class="wl-selection__count" id="wlSelectedCount" aria-live="polite">0</span>
        </div>
        <p class="wl-selection__hint">選択状態はブラウザに保存されます。</p>
        <ul class="wl-selected-list" id="wlSelectedList"></ul>
        <div class="widget-actions">
          <button class="wl-btn ghost" type="button" id="wlCopyIds">IDコピー</button>
          <button class="wl-btn ghost" type="button" id="wlCopyJson">JSONコピー</button>
          <button class="wl-btn danger" type="button" id="wlClearSelection">クリア</button>
        </div>
        <textarea class="wl-output" id="wlOutput" rows="6" readonly></textarea>
        <div class="wl-status" id="wlStatus" aria-live="polite"></div>
      </aside>
    </section>

    <section class="wl-toolbar" aria-label="絞り込み">
      <div class="wl-search">
        <span class="wl-search-icon"><i class="fa-solid fa-magnifying-glass"></i></span>
        <input id="wlSearch" type="search" placeholder="番号・名称・タグで検索 (例: hero, 価格, FAQ)" aria-label="ウィジェット検索">
      </div>
      <div class="wl-filters">
        <button class="wl-filter is-active" type="button" data-filter="all">全部</button>
        <button class="wl-filter" type="button" data-filter="hero">Hero</button>
        <button class="wl-filter" type="button" data-filter="nav">Navigation</button>
        <button class="wl-filter" type="button" data-filter="content">Content</button>
        <button class="wl-filter" type="button" data-filter="media">Media</button>
        <button class="wl-filter" type="button" data-filter="proof">Proof</button>
        <button class="wl-filter" type="button" data-filter="pricing">Pricing</button>
        <button class="wl-filter" type="button" data-filter="form">Form</button>
        <button class="wl-filter" type="button" data-filter="data">Data</button>
        <button class="wl-filter" type="button" data-filter="feedback">Feedback</button>
        <button class="wl-toggle" type="button" id="wlSelectedOnly" aria-pressed="false">選択のみ</button>
      </div>
    </section>

    <nav class="wl-category-nav" aria-label="カテゴリジャンプ">
      <a href="#cat-hero">Hero / CTA <span data-count-for="hero">0</span></a>
      <a href="#cat-nav">Navigation / Header <span data-count-for="nav">0</span></a>
      <a href="#cat-content">Feature / Content <span data-count-for="content">0</span></a>
      <a href="#cat-media">Media / Gallery <span data-count-for="media">0</span></a>
      <a href="#cat-proof">Social Proof / Trust <span data-count-for="proof">0</span></a>
      <a href="#cat-pricing">Pricing / Plans <span data-count-for="pricing">0</span></a>
      <a href="#cat-form">Forms / Input <span data-count-for="form">0</span></a>
      <a href="#cat-data">Data / Dashboard <span data-count-for="data">0</span></a>
      <a href="#cat-feedback">Feedback / FAQ <span data-count-for="feedback">0</span></a>
    </nav>

    <section class="wl-category" id="cat-hero">
      <header class="wl-category__header">
        <h2 class="wl-category__title">Hero / CTA</h2>
        <p class="wl-category__desc">最初の印象を決める主役エリア。訴求ポイントと導線を強調。</p>
      </header>
      <div class="wl-grid">
        <article class="widget-card" data-id="W-001" data-name="グラデーション・キックオフ" data-category="hero" data-category-label="Hero / CTA" data-tags="hero cta gradient" data-search="W-001 グラデーション hero cta gradient キックオフ">
          <div class="widget-card__head">
            <span class="widget-id">W-001</span>
            <span class="widget-type">Hero / CTA</span>
          </div>
          <h3 class="widget-title">グラデーション・キックオフ</h3>
          <p class="widget-desc">強いブランド感と即時アクションを両立する王道ヒーロー。</p>
          <div class="wl-preview preview-hero" style="--accent:#fb7185; --accent-2:#f59e0b;">
            <div class="hero-stack">
              <span class="mini-kicker">NEW</span>
              <span class="mini-line wide"></span>
              <span class="mini-line med"></span>
              <div class="mini-actions">
                <span class="mini-btn"></span>
                <span class="mini-btn ghost"></span>
              </div>
            </div>
            <div class="hero-media"></div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-001">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-001">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#hero</span><span>#cta</span><span>#brand</span></div>
        </article>

        <article class="widget-card" data-id="W-002" data-name="スプリット・イメージ" data-category="hero" data-category-label="Hero / CTA" data-tags="hero split image" data-search="W-002 スプリット hero image 2カラム">
          <div class="widget-card__head">
            <span class="widget-id">W-002</span>
            <span class="widget-type">Hero / CTA</span>
          </div>
          <h3 class="widget-title">スプリット・イメージ</h3>
          <p class="widget-desc">左にコピー、右にビジュアル。伝えたい価値を瞬時に整理。</p>
          <div class="wl-preview preview-hero" style="--accent:#0ea5e9; --accent-2:#6366f1;">
            <div class="hero-stack">
              <span class="mini-kicker">BETA</span>
              <span class="mini-line wide"></span>
              <span class="mini-line med"></span>
              <div class="mini-actions">
                <span class="mini-btn"></span>
                <span class="mini-btn ghost"></span>
              </div>
            </div>
            <div class="hero-media"></div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-002">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-002">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#split</span><span>#image</span><span>#hero</span></div>
        </article>

        <article class="widget-card" data-id="W-003" data-name="ビデオ・ヒーロー" data-category="hero" data-category-label="Hero / CTA" data-tags="hero video motion" data-search="W-003 ビデオ hero video motion">
          <div class="widget-card__head">
            <span class="widget-id">W-003</span>
            <span class="widget-type">Hero / CTA</span>
          </div>
          <h3 class="widget-title">ビデオ・ヒーロー</h3>
          <p class="widget-desc">動きで惹きつける導入。サービスの世界観を伝える。</p>
          <div class="wl-preview preview-video">
            <div class="video-circle"></div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-003">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-003">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#video</span><span>#hero</span><span>#motion</span></div>
        </article>

        <article class="widget-card" data-id="W-004" data-name="アナウンス・バナー" data-category="hero" data-category-label="Hero / CTA" data-tags="announcement banner" data-search="W-004 アナウンス バナー hero cta">
          <div class="widget-card__head">
            <span class="widget-id">W-004</span>
            <span class="widget-type">Hero / CTA</span>
          </div>
          <h3 class="widget-title">アナウンス・バナー</h3>
          <p class="widget-desc">アップデート・キャンペーンを一段で強く訴求。</p>
          <div class="wl-preview preview-banner">
            <div class="banner-row">
              <span class="mini-pill"></span>
              <span class="mini-line wide"></span>
              <span class="mini-btn"></span>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-004">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-004">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#banner</span><span>#announcement</span><span>#cta</span></div>
        </article>

        <article class="widget-card" data-id="W-037" data-name="フローティング・カード" data-category="hero" data-category-label="Hero / CTA" data-tags="hero floating cta" data-search="W-037 フローティング hero floating cta">
          <div class="widget-card__head">
            <span class="widget-id">W-037</span>
            <span class="widget-type">Hero / CTA</span>
          </div>
          <h3 class="widget-title">フローティング・カード</h3>
          <p class="widget-desc">視線を集める浮遊カードで訴求力を強化。</p>
          <div class="wl-preview preview-hero preview-float" style="--accent:#38bdf8; --accent-2:#22d3ee;">
            <div class="hero-stack">
              <span class="mini-kicker">HOT</span>
              <span class="mini-line wide"></span>
              <span class="mini-line med"></span>
              <div class="mini-actions">
                <span class="mini-btn"></span>
                <span class="mini-btn ghost"></span>
              </div>
            </div>
            <div class="hero-media">
              <img src="/assets/img/widgets/gradient-teal.jpg" alt="抽象的なグラデーション背景" loading="lazy">
            </div>
            <div class="float-card">
              <span class="mini-line short"></span>
              <span class="mini-line"></span>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-037">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-037">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#floating</span><span>#hero</span><span>#cta</span></div>
        </article>

        <article class="widget-card" data-id="W-038" data-name="メッセージング・ヒーロー" data-category="hero" data-category-label="Hero / CTA" data-tags="hero messaging" data-search="W-038 メッセージング hero chat">
          <div class="widget-card__head">
            <span class="widget-id">W-038</span>
            <span class="widget-type">Hero / CTA</span>
          </div>
          <h3 class="widget-title">メッセージング・ヒーロー</h3>
          <p class="widget-desc">会話型の導線で体験価値を伝える。</p>
          <div class="wl-preview preview-chat">
            <div class="chat-row">
              <span class="mini-avatar"></span>
              <span class="bubble">Hello</span>
            </div>
            <div class="chat-row is-right">
              <span class="bubble alt">Start</span>
            </div>
            <div class="chat-row">
              <span class="mini-avatar"></span>
              <div class="mini-bar"><span></span></div>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-038">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-038">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#chat</span><span>#hero</span><span>#engage</span></div>
        </article>

        <article class="widget-card" data-id="W-039" data-name="カウントアップ・ヒーロー" data-category="hero" data-category-label="Hero / CTA" data-tags="hero stats" data-search="W-039 カウントアップ hero stats">
          <div class="widget-card__head">
            <span class="widget-id">W-039</span>
            <span class="widget-type">Hero / CTA</span>
          </div>
          <h3 class="widget-title">カウントアップ・ヒーロー</h3>
          <p class="widget-desc">数字で強さを証明するインパクト型。</p>
          <div class="wl-preview preview-numbers">
            <div class="metric">
              <strong data-count="128">0</strong>
              <span class="mini-label">導入社数</span>
            </div>
            <div class="metric">
              <strong data-count="96" data-count-suffix="%">0</strong>
              <span class="mini-label">満足度</span>
            </div>
            <div class="metric">
              <strong data-count="24">0</strong>
              <span class="mini-label">平均日数</span>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-039">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-039">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#numbers</span><span>#hero</span><span>#impact</span></div>
        </article>

        <article class="widget-card" data-id="W-040" data-name="プロダクト・スクリーン" data-category="hero" data-category-label="Hero / CTA" data-tags="hero product" data-search="W-040 プロダクト hero screen">
          <div class="widget-card__head">
            <span class="widget-id">W-040</span>
            <span class="widget-type">Hero / CTA</span>
          </div>
          <h3 class="widget-title">プロダクト・スクリーン</h3>
          <p class="widget-desc">画面イメージで価値を直感的に伝える。</p>
          <div class="wl-preview preview-photo">
            <img src="/assets/img/widgets/workspace-night.jpg" alt="夜のワークスペース" loading="lazy">
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-040">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-040">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#product</span><span>#hero</span><span>#visual</span></div>
        </article>

        <article class="widget-card" data-id="W-073" data-name="フルスクリーン・ビジュアル" data-category="hero" data-category-label="Hero / CTA" data-tags="hero visual" data-search="W-073 フルスクリーン hero visual">
          <div class="widget-card__head">
            <span class="widget-id">W-073</span>
            <span class="widget-type">Hero / CTA</span>
          </div>
          <h3 class="widget-title">フルスクリーン・ビジュアル</h3>
          <p class="widget-desc">圧倒的なビジュアルで第一印象を作る。</p>
          <div class="wl-preview preview-photo">
            <img src="/assets/img/widgets/workspace-night.jpg" alt="夜のワークスペース" loading="lazy">
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-073">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-073">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#visual</span><span>#hero</span><span>#impact</span></div>
        </article>

        <article class="widget-card" data-id="W-074" data-name="ニュースティッカー・ヒーロー" data-category="hero" data-category-label="Hero / CTA" data-tags="hero news" data-search="W-074 ニュースティッカー hero banner">
          <div class="widget-card__head">
            <span class="widget-id">W-074</span>
            <span class="widget-type">Hero / CTA</span>
          </div>
          <h3 class="widget-title">ニュースティッカー・ヒーロー</h3>
          <p class="widget-desc">最新情報を強調して行動を促す。</p>
          <div class="wl-preview preview-banner">
            <div class="banner-row">
              <span class="mini-pill"></span>
              <span class="mini-line wide"></span>
              <span class="mini-btn"></span>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-074">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-074">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#news</span><span>#hero</span><span>#cta</span></div>
        </article>

        <article class="widget-card" data-id="W-075" data-name="フォーム付きヒーロー" data-category="hero" data-category-label="Hero / CTA" data-tags="hero form" data-search="W-075 フォーム hero signup">
          <div class="widget-card__head">
            <span class="widget-id">W-075</span>
            <span class="widget-type">Hero / CTA</span>
          </div>
          <h3 class="widget-title">フォーム付きヒーロー</h3>
          <p class="widget-desc">リード獲得を最短で行う導線。</p>
          <div class="wl-preview preview-subscribe">
            <div class="subscribe-row">
              <span class="subscribe-input"></span>
              <span class="mini-btn"></span>
            </div>
            <span class="mini-line short"></span>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-075">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-075">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#form</span><span>#hero</span><span>#lead</span></div>
        </article>

        <article class="widget-card" data-id="W-100" data-name="AIスコアリング・ヒーロー" data-category="hero" data-category-label="Hero / CTA" data-tags="hero stats" data-search="W-100 AI スコア ヒーロー">
          <div class="widget-card__head">
            <span class="widget-id">W-100</span>
            <span class="widget-type">Hero / CTA</span>
          </div>
          <h3 class="widget-title">AIスコアリング・ヒーロー</h3>
          <p class="widget-desc">AIの成果を数値で見せるヒーロー。</p>
          <div class="wl-preview preview-numbers">
            <div class="metric">
              <strong data-count="87" data-count-suffix="%">0</strong>
              <span class="mini-label">精度</span>
            </div>
            <div class="metric">
              <strong data-count="42">0</strong>
              <span class="mini-label">導入社</span>
            </div>
            <div class="metric">
              <strong data-count="2" data-count-suffix="分">0</strong>
              <span class="mini-label">導入時間</span>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-100">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-100">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#ai</span><span>#hero</span><span>#stats</span></div>
        </article>

        <article class="widget-card" data-id="W-109" data-name="ストーリーテリング・ヒーロー" data-category="hero" data-category-label="Hero / CTA" data-tags="hero story" data-search="W-109 ストーリー ヒーロー">
          <div class="widget-card__head">
            <span class="widget-id">W-109</span>
            <span class="widget-type">Hero / CTA</span>
          </div>
          <h3 class="widget-title">ストーリーテリング・ヒーロー</h3>
          <p class="widget-desc">物語性を強調する導入セクション。</p>
          <div class="wl-preview preview-hero" style="--accent:#6366f1; --accent-2:#f97316;">
            <div class="hero-stack">
              <span class="mini-kicker">STORY</span>
              <span class="mini-line wide"></span>
              <span class="mini-line med"></span>
              <div class="mini-actions">
                <span class="mini-btn"></span>
                <span class="mini-btn ghost"></span>
              </div>
            </div>
            <div class="hero-media">
              <img src="/assets/img/widgets/abstract-color.jpg" alt="カラフルな抽象背景" loading="lazy">
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-109">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-109">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#story</span><span>#hero</span><span>#brand</span></div>
        </article>
      </div>
    </section>

    <section class="wl-category" id="cat-nav">
      <header class="wl-category__header">
        <h2 class="wl-category__title">Navigation / Header</h2>
        <p class="wl-category__desc">情報探索を迷わせない導線設計。サイト全体の骨格。</p>
      </header>
      <div class="wl-grid">
        <article class="widget-card" data-id="W-005" data-name="ピル・ナビ" data-category="nav" data-category-label="Navigation / Header" data-tags="navigation pills" data-search="W-005 ピル ナビ navigation tabs">
          <div class="widget-card__head">
            <span class="widget-id">W-005</span>
            <span class="widget-type">Navigation</span>
          </div>
          <h3 class="widget-title">ピル・ナビ</h3>
          <p class="widget-desc">カテゴリを横断するスムーズなタブ型ナビ。</p>
          <div class="wl-preview preview-nav" style="--accent:#22c55e;">
            <div class="nav-pill-row">
              <span class="mini-pill active"></span>
              <span class="mini-pill"></span>
              <span class="mini-pill"></span>
            </div>
            <span class="mini-line wide"></span>
            <span class="mini-line med"></span>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-005">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-005">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#navigation</span><span>#tabs</span><span>#pill</span></div>
        </article>

        <article class="widget-card" data-id="W-006" data-name="コマンドバー" data-category="nav" data-category-label="Navigation / Header" data-tags="command search" data-search="W-006 コマンドバー search navigation">
          <div class="widget-card__head">
            <span class="widget-id">W-006</span>
            <span class="widget-type">Navigation</span>
          </div>
          <h3 class="widget-title">コマンドバー</h3>
          <p class="widget-desc">検索・ショートカットを集約するヘッダーバー。</p>
          <div class="wl-preview preview-command">
            <div class="command-bar">
              <span class="command-input"></span>
              <span class="command-icons">
                <span class="command-dot"></span>
                <span class="command-dot"></span>
                <span class="command-dot"></span>
              </span>
            </div>
            <div class="nav-pill-row">
              <span class="mini-pill"></span>
              <span class="mini-pill"></span>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-006">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-006">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#search</span><span>#command</span><span>#header</span></div>
        </article>

        <article class="widget-card" data-id="W-007" data-name="メガメニュー" data-category="nav" data-category-label="Navigation / Header" data-tags="mega menu" data-search="W-007 メガメニュー mega menu navigation">
          <div class="widget-card__head">
            <span class="widget-id">W-007</span>
            <span class="widget-type">Navigation</span>
          </div>
          <h3 class="widget-title">メガメニュー</h3>
          <p class="widget-desc">情報量が多いサイト向けの整理されたメニュー。</p>
          <div class="wl-preview preview-mega">
            <div class="mega-col">
              <span class="mini-line short"></span>
              <span class="mini-line"></span>
              <span class="mini-line"></span>
            </div>
            <div class="mega-col">
              <span class="mini-line short"></span>
              <span class="mini-line"></span>
              <span class="mini-line"></span>
            </div>
            <div class="mega-col">
              <span class="mini-line short"></span>
              <span class="mini-line"></span>
              <span class="mini-line"></span>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-007">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-007">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#mega</span><span>#navigation</span><span>#menu</span></div>
        </article>

        <article class="widget-card" data-id="W-008" data-name="パンくず＋タブ" data-category="nav" data-category-label="Navigation / Header" data-tags="breadcrumbs tabs" data-search="W-008 パンくず タブ breadcrumbs">
          <div class="widget-card__head">
            <span class="widget-id">W-008</span>
            <span class="widget-type">Navigation</span>
          </div>
          <h3 class="widget-title">パンくず＋タブ</h3>
          <p class="widget-desc">階層と現在地を同時に示すナビの組み合わせ。</p>
          <div class="wl-preview preview-crumbs">
            <div class="crumb-row">
              <span class="crumb"></span>
              <span class="crumb"></span>
              <span class="crumb"></span>
            </div>
            <div class="tabs-row">
              <span class="tab"></span>
              <span class="tab"></span>
              <span class="tab"></span>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-008">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-008">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#breadcrumbs</span><span>#tabs</span><span>#ux</span></div>
        </article>

        <article class="widget-card" data-id="W-041" data-name="サイドナビ" data-category="nav" data-category-label="Navigation / Header" data-tags="side navigation" data-search="W-041 サイドナビ navigation">
          <div class="widget-card__head">
            <span class="widget-id">W-041</span>
            <span class="widget-type">Navigation</span>
          </div>
          <h3 class="widget-title">サイドナビ</h3>
          <p class="widget-desc">縦方向に情報を整理する管理画面向け。</p>
          <div class="wl-preview preview-side-nav">
            <div class="nav-col">
              <div class="nav-item"></div>
              <div class="nav-item"></div>
              <div class="nav-item"></div>
              <div class="nav-item"></div>
            </div>
            <div class="nav-col">
              <span class="mini-line wide"></span>
              <span class="mini-line med"></span>
              <span class="mini-line short"></span>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-041">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-041">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#sidebar</span><span>#navigation</span><span>#dashboard</span></div>
        </article>

        <article class="widget-card" data-id="W-042" data-name="モバイルボトムバー" data-category="nav" data-category-label="Navigation / Header" data-tags="mobile bottom" data-search="W-042 モバイル ボトムバー">
          <div class="widget-card__head">
            <span class="widget-id">W-042</span>
            <span class="widget-type">Navigation</span>
          </div>
          <h3 class="widget-title">モバイルボトムバー</h3>
          <p class="widget-desc">片手操作に最適なモバイル導線。</p>
          <div class="wl-preview preview-bottom-nav">
            <span class="mini-line wide"></span>
            <span class="mini-line med"></span>
            <div class="bottom-bar">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-042">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-042">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#mobile</span><span>#navigation</span><span>#bottom</span></div>
        </article>

        <article class="widget-card" data-id="W-043" data-name="ステッキーナビ" data-category="nav" data-category-label="Navigation / Header" data-tags="sticky" data-search="W-043 ステッキー ナビ">
          <div class="widget-card__head">
            <span class="widget-id">W-043</span>
            <span class="widget-type">Navigation</span>
          </div>
          <h3 class="widget-title">ステッキーナビ</h3>
          <p class="widget-desc">スクロール中も導線を保持する固定ヘッダー。</p>
          <div class="wl-preview preview-sticky">
            <div class="sticky-head"></div>
            <span class="mini-line wide"></span>
            <span class="mini-line med"></span>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-043">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-043">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#sticky</span><span>#header</span><span>#navigation</span></div>
        </article>

        <article class="widget-card" data-id="W-044" data-name="ナビ＋サーチ" data-category="nav" data-category-label="Navigation / Header" data-tags="search nav" data-search="W-044 ナビ サーチ">
          <div class="widget-card__head">
            <span class="widget-id">W-044</span>
            <span class="widget-type">Navigation</span>
          </div>
          <h3 class="widget-title">ナビ＋サーチ</h3>
          <p class="widget-desc">検索とカテゴリを一体化したトップバー。</p>
          <div class="wl-preview preview-searchbar">
            <div class="search-pill"></div>
            <div class="nav-chips">
              <span class="mini-pill"></span>
              <span class="mini-pill"></span>
              <span class="mini-pill"></span>
            </div>
            <span class="mini-line wide"></span>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-044">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-044">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#search</span><span>#navigation</span><span>#header</span></div>
        </article>

        <article class="widget-card" data-id="W-076" data-name="ステップナビ" data-category="nav" data-category-label="Navigation / Header" data-tags="step nav" data-search="W-076 ステップ ナビ">
          <div class="widget-card__head">
            <span class="widget-id">W-076</span>
            <span class="widget-type">Navigation</span>
          </div>
          <h3 class="widget-title">ステップナビ</h3>
          <p class="widget-desc">入力フローを段階で示すナビ。</p>
          <div class="wl-preview preview-steps-form">
            <div class="stepper">
              <span class="step-dot"></span>
              <span class="step-dot"></span>
              <span class="step-dot"></span>
            </div>
            <span class="mini-line wide"></span>
            <span class="mini-line med"></span>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-076">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-076">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#steps</span><span>#navigation</span><span>#flow</span></div>
        </article>

        <article class="widget-card" data-id="W-077" data-name="ドロップダウンメニュー" data-category="nav" data-category-label="Navigation / Header" data-tags="dropdown mega" data-search="W-077 ドロップダウン メニュー">
          <div class="widget-card__head">
            <span class="widget-id">W-077</span>
            <span class="widget-type">Navigation</span>
          </div>
          <h3 class="widget-title">ドロップダウンメニュー</h3>
          <p class="widget-desc">階層が深い場合に使う展開型メニュー。</p>
          <div class="wl-preview preview-mega">
            <div class="mega-col">
              <span class="mini-line short"></span>
              <span class="mini-line"></span>
              <span class="mini-line"></span>
            </div>
            <div class="mega-col">
              <span class="mini-line short"></span>
              <span class="mini-line"></span>
              <span class="mini-line"></span>
            </div>
            <div class="mega-col">
              <span class="mini-line short"></span>
              <span class="mini-line"></span>
              <span class="mini-line"></span>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-077">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-077">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#dropdown</span><span>#navigation</span><span>#menu</span></div>
        </article>

        <article class="widget-card" data-id="W-078" data-name="フィルターバー" data-category="nav" data-category-label="Navigation / Header" data-tags="filter nav" data-search="W-078 フィルター ナビ">
          <div class="widget-card__head">
            <span class="widget-id">W-078</span>
            <span class="widget-type">Navigation</span>
          </div>
          <h3 class="widget-title">フィルターバー</h3>
          <p class="widget-desc">条件で素早く絞れるタブ型バー。</p>
          <div class="wl-preview preview-filter">
            <div class="chip-row">
              <span class="chip"></span>
              <span class="chip"></span>
              <span class="chip"></span>
            </div>
            <span class="mini-line wide"></span>
            <span class="mini-line med"></span>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-078">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-078">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#filter</span><span>#navigation</span><span>#ui</span></div>
        </article>

        <article class="widget-card" data-id="W-101" data-name="ユーティリティバー" data-category="nav" data-category-label="Navigation / Header" data-tags="utility nav" data-search="W-101 ユーティリティ バー">
          <div class="widget-card__head">
            <span class="widget-id">W-101</span>
            <span class="widget-type">Navigation</span>
          </div>
          <h3 class="widget-title">ユーティリティバー</h3>
          <p class="widget-desc">通知やクイック操作を上部に集約。</p>
          <div class="wl-preview preview-searchbar">
            <div class="search-pill"></div>
            <div class="nav-chips">
              <span class="mini-pill"></span>
              <span class="mini-pill"></span>
            </div>
            <span class="mini-line wide"></span>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-101">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-101">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#utility</span><span>#navigation</span><span>#header</span></div>
        </article>
      </div>
    </section>

    <section class="wl-category" id="cat-content">
      <header class="wl-category__header">
        <h2 class="wl-category__title">Feature / Content</h2>
        <p class="wl-category__desc">機能紹介やコンテンツを整理して読みやすく魅せる。</p>
      </header>
      <div class="wl-grid">
        <article class="widget-card" data-id="W-009" data-name="機能グリッド" data-category="content" data-category-label="Feature / Content" data-tags="feature grid" data-search="W-009 機能 グリッド feature">
          <div class="widget-card__head">
            <span class="widget-id">W-009</span>
            <span class="widget-type">Content</span>
          </div>
          <h3 class="widget-title">機能グリッド</h3>
          <p class="widget-desc">要点を均等に並べて伝える、説明向けの定番レイアウト。</p>
          <div class="wl-preview preview-feature-grid">
            <div class="mini-card">
              <span class="mini-line short"></span>
              <span class="mini-line med"></span>
            </div>
            <div class="mini-card">
              <span class="mini-line short"></span>
              <span class="mini-line med"></span>
            </div>
            <div class="mini-card">
              <span class="mini-line short"></span>
              <span class="mini-line med"></span>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-009">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-009">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#feature</span><span>#grid</span><span>#content</span></div>
        </article>

        <article class="widget-card" data-id="W-010" data-name="アイコンカード" data-category="content" data-category-label="Feature / Content" data-tags="icon card" data-search="W-010 アイコン カード feature">
          <div class="widget-card__head">
            <span class="widget-id">W-010</span>
            <span class="widget-type">Content</span>
          </div>
          <h3 class="widget-title">アイコンカード</h3>
          <p class="widget-desc">機能や利点をアイコン中心にまとめるショートカード。</p>
          <div class="wl-preview preview-icon-cards" style="--accent:#22d3ee;">
            <div class="icon-card">
              <span class="mini-icon"></span>
              <span class="mini-line short"></span>
            </div>
            <div class="icon-card">
              <span class="mini-icon"></span>
              <span class="mini-line short"></span>
            </div>
            <div class="icon-card">
              <span class="mini-icon"></span>
              <span class="mini-line short"></span>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-010">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-010">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#icon</span><span>#card</span><span>#feature</span></div>
        </article>

        <article class="widget-card" data-id="W-011" data-name="ハイライトカード" data-category="content" data-category-label="Feature / Content" data-tags="highlight" data-search="W-011 ハイライト highlight content">
          <div class="widget-card__head">
            <span class="widget-id">W-011</span>
            <span class="widget-type">Content</span>
          </div>
          <h3 class="widget-title">ハイライトカード</h3>
          <p class="widget-desc">注目機能やキャンペーンを大きく取り上げる。</p>
          <div class="wl-preview preview-highlight">
            <div class="highlight-card">
              <span class="mini-line wide"></span>
              <span class="mini-line med"></span>
              <span class="mini-btn"></span>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-011">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-011">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#highlight</span><span>#cta</span><span>#content</span></div>
        </article>

        <article class="widget-card" data-id="W-012" data-name="比較テーブル" data-category="content" data-category-label="Feature / Content" data-tags="comparison table" data-search="W-012 比較 テーブル">
          <div class="widget-card__head">
            <span class="widget-id">W-012</span>
            <span class="widget-type">Content</span>
          </div>
          <h3 class="widget-title">比較テーブル</h3>
          <p class="widget-desc">複数プランや機能の差分を一目で伝える。</p>
          <div class="wl-preview preview-table">
            <span class="table-row"></span>
            <span class="table-row"></span>
            <span class="table-row"></span>
            <span class="table-row"></span>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-012">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-012">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#table</span><span>#comparison</span><span>#feature</span></div>
        </article>

        <article class="widget-card" data-id="W-045" data-name="ストーリータイムライン" data-category="content" data-category-label="Feature / Content" data-tags="timeline" data-search="W-045 ストーリー タイムライン">
          <div class="widget-card__head">
            <span class="widget-id">W-045</span>
            <span class="widget-type">Content</span>
          </div>
          <h3 class="widget-title">ストーリータイムライン</h3>
          <p class="widget-desc">サービスの流れを縦軸で伝える。</p>
          <div class="wl-preview preview-timeline">
            <div class="timeline-row">
              <span class="timeline-dot"></span>
              <span class="mini-line med"></span>
            </div>
            <div class="timeline-row">
              <span class="timeline-dot"></span>
              <span class="mini-line med"></span>
            </div>
            <div class="timeline-row">
              <span class="timeline-dot"></span>
              <span class="mini-line med"></span>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-045">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-045">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#timeline</span><span>#story</span><span>#content</span></div>
        </article>

        <article class="widget-card" data-id="W-046" data-name="ステップカード" data-category="content" data-category-label="Feature / Content" data-tags="steps" data-search="W-046 ステップ カード">
          <div class="widget-card__head">
            <span class="widget-id">W-046</span>
            <span class="widget-type">Content</span>
          </div>
          <h3 class="widget-title">ステップカード</h3>
          <p class="widget-desc">導入手順をカードで分かりやすく。</p>
          <div class="wl-preview preview-feature-grid">
            <div class="mini-card">
              <span class="mini-dot"></span>
              <span class="mini-line short"></span>
            </div>
            <div class="mini-card">
              <span class="mini-dot"></span>
              <span class="mini-line short"></span>
            </div>
            <div class="mini-card">
              <span class="mini-dot"></span>
              <span class="mini-line short"></span>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-046">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-046">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#steps</span><span>#guide</span><span>#content</span></div>
        </article>

        <article class="widget-card" data-id="W-047" data-name="Bentoグリッド" data-category="content" data-category-label="Feature / Content" data-tags="bento grid" data-search="W-047 Bento グリッド">
          <div class="widget-card__head">
            <span class="widget-id">W-047</span>
            <span class="widget-type">Content</span>
          </div>
          <h3 class="widget-title">Bentoグリッド</h3>
          <p class="widget-desc">大小のカードを組み合わせた視覚的配置。</p>
          <div class="wl-preview preview-bento">
            <div class="bento-main">
              <img src="/assets/img/widgets/abstract-color.jpg" alt="カラフルな抽象背景" loading="lazy">
            </div>
            <div class="bento-side"></div>
            <div class="bento-side"></div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-047">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-047">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#bento</span><span>#layout</span><span>#content</span></div>
        </article>

        <article class="widget-card" data-id="W-048" data-name="分割テキスト＋画像" data-category="content" data-category-label="Feature / Content" data-tags="split" data-search="W-048 分割 テキスト 画像">
          <div class="widget-card__head">
            <span class="widget-id">W-048</span>
            <span class="widget-type">Content</span>
          </div>
          <h3 class="widget-title">分割テキスト＋画像</h3>
          <p class="widget-desc">情報を左右に分けて読みやすく整理。</p>
          <div class="wl-preview preview-split">
            <div>
              <span class="mini-line wide"></span>
              <span class="mini-line med"></span>
              <span class="mini-btn"></span>
            </div>
            <div class="mini-card">
              <img src="/assets/img/widgets/workspace-bright.jpg" alt="明るいオフィス" loading="lazy">
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-048">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-048">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#split</span><span>#content</span><span>#image</span></div>
        </article>

        <article class="widget-card" data-id="W-079" data-name="ストーリーカード" data-category="content" data-category-label="Feature / Content" data-tags="story card" data-search="W-079 ストーリー カード">
          <div class="widget-card__head">
            <span class="widget-id">W-079</span>
            <span class="widget-type">Content</span>
          </div>
          <h3 class="widget-title">ストーリーカード</h3>
          <p class="widget-desc">ストーリー性のある内容を強調。</p>
          <div class="wl-preview preview-testimonial">
            <div class="quote-card">
              <span class="mini-line wide"></span>
              <span class="mini-line med"></span>
            </div>
            <div class="quote-footer">
              <span class="mini-avatar"></span>
              <span class="mini-line short"></span>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-079">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-079">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#story</span><span>#content</span><span>#card</span></div>
        </article>

        <article class="widget-card" data-id="W-080" data-name="FAQセクション" data-category="content" data-category-label="Feature / Content" data-tags="faq content" data-search="W-080 FAQ セクション">
          <div class="widget-card__head">
            <span class="widget-id">W-080</span>
            <span class="widget-type">Content</span>
          </div>
          <h3 class="widget-title">FAQセクション</h3>
          <p class="widget-desc">疑問をまとめて解消するFAQブロック。</p>
          <div class="wl-preview preview-faq">
            <div class="faq-item"></div>
            <div class="faq-item"></div>
            <div class="faq-item"></div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-080">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-080">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#faq</span><span>#content</span><span>#support</span></div>
        </article>

        <article class="widget-card" data-id="W-081" data-name="二段アイコンリスト" data-category="content" data-category-label="Feature / Content" data-tags="icon list" data-search="W-081 アイコン リスト">
          <div class="widget-card__head">
            <span class="widget-id">W-081</span>
            <span class="widget-type">Content</span>
          </div>
          <h3 class="widget-title">二段アイコンリスト</h3>
          <p class="widget-desc">機能をリスト型でテンポ良く配置。</p>
          <div class="wl-preview preview-icon-cards" style="--accent:#38bdf8;">
            <div class="icon-card">
              <span class="mini-icon"></span>
              <span class="mini-line short"></span>
            </div>
            <div class="icon-card">
              <span class="mini-icon"></span>
              <span class="mini-line short"></span>
            </div>
            <div class="icon-card">
              <span class="mini-icon"></span>
              <span class="mini-line short"></span>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-081">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-081">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#icon</span><span>#list</span><span>#content</span></div>
        </article>

        <article class="widget-card" data-id="W-102" data-name="コンセプト概要" data-category="content" data-category-label="Feature / Content" data-tags="concept summary" data-search="W-102 コンセプト 概要">
          <div class="widget-card__head">
            <span class="widget-id">W-102</span>
            <span class="widget-type">Content</span>
          </div>
          <h3 class="widget-title">コンセプト概要</h3>
          <p class="widget-desc">サービスの核を短くまとめるセクション。</p>
          <div class="wl-preview preview-highlight">
            <div class="highlight-card">
              <span class="mini-line wide"></span>
              <span class="mini-line med"></span>
              <span class="mini-btn"></span>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-102">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-102">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#concept</span><span>#content</span><span>#summary</span></div>
        </article>
      </div>
    </section>

    <section class="wl-category" id="cat-media">
      <header class="wl-category__header">
        <h2 class="wl-category__title">Media / Gallery</h2>
        <p class="wl-category__desc">視覚訴求を強めるギャラリー・メディア系ウィジェット。</p>
      </header>
      <div class="wl-grid">
        <article class="widget-card" data-id="W-013" data-name="ギャラリーモザイク" data-category="media" data-category-label="Media / Gallery" data-tags="gallery mosaic" data-search="W-013 ギャラリー モザイク gallery">
          <div class="widget-card__head">
            <span class="widget-id">W-013</span>
            <span class="widget-type">Media</span>
          </div>
          <h3 class="widget-title">ギャラリーモザイク</h3>
          <p class="widget-desc">作品・実績をまとめて見せるモザイク配置。</p>
          <div class="wl-preview preview-gallery">
            <div class="gallery-grid">
              <span class="gallery-item tall"></span>
              <span class="gallery-item"></span>
              <span class="gallery-item"></span>
              <span class="gallery-item"></span>
              <span class="gallery-item"></span>
              <span class="gallery-item tall"></span>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-013">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-013">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#gallery</span><span>#mosaic</span><span>#media</span></div>
        </article>

        <article class="widget-card" data-id="W-014" data-name="カルーセル" data-category="media" data-category-label="Media / Gallery" data-tags="carousel" data-search="W-014 カルーセル carousel">
          <div class="widget-card__head">
            <span class="widget-id">W-014</span>
            <span class="widget-type">Media</span>
          </div>
          <h3 class="widget-title">カルーセル</h3>
          <p class="widget-desc">強調したいカードを横スライドで見せる。</p>
          <div class="wl-preview preview-carousel">
            <div class="carousel-track">
              <div class="mini-card">
                <span class="mini-line short"></span>
                <span class="mini-line"></span>
              </div>
              <div class="mini-card">
                <span class="mini-line short"></span>
                <span class="mini-line"></span>
              </div>
              <div class="mini-card">
                <span class="mini-line short"></span>
                <span class="mini-line"></span>
              </div>
            </div>
            <div class="carousel-dots">
              <span class="dot"></span>
              <span class="dot"></span>
              <span class="dot"></span>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-014">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-014">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#carousel</span><span>#media</span><span>#cards</span></div>
        </article>

        <article class="widget-card" data-id="W-015" data-name="ビデオカード" data-category="media" data-category-label="Media / Gallery" data-tags="video card" data-search="W-015 ビデオ カード">
          <div class="widget-card__head">
            <span class="widget-id">W-015</span>
            <span class="widget-type">Media</span>
          </div>
          <h3 class="widget-title">ビデオカード</h3>
          <p class="widget-desc">サービス紹介やデモ動画をカードにまとめる。</p>
          <div class="wl-preview preview-video-card">
            <div class="video-thumb"></div>
            <span class="mini-line med"></span>
            <span class="mini-line short"></span>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-015">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-015">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#video</span><span>#card</span><span>#media</span></div>
        </article>

        <article class="widget-card" data-id="W-016" data-name="ビフォーアフター" data-category="media" data-category-label="Media / Gallery" data-tags="before after" data-search="W-016 ビフォーアフター before after">
          <div class="widget-card__head">
            <span class="widget-id">W-016</span>
            <span class="widget-type">Media</span>
          </div>
          <h3 class="widget-title">ビフォーアフター</h3>
          <p class="widget-desc">変化を見せたいときに効果的な比較表示。</p>
          <div class="wl-preview preview-beforeafter">
            <div class="beforeafter">
              <div class="before"></div>
              <div class="after"></div>
              <span class="slider"></span>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-016">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-016">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#beforeafter</span><span>#media</span><span>#comparison</span></div>
        </article>

        <article class="widget-card" data-id="W-049" data-name="ライトボックス" data-category="media" data-category-label="Media / Gallery" data-tags="lightbox" data-search="W-049 ライトボックス">
          <div class="widget-card__head">
            <span class="widget-id">W-049</span>
            <span class="widget-type">Media</span>
          </div>
          <h3 class="widget-title">ライトボックス</h3>
          <p class="widget-desc">クリック拡大を想起させるギャラリー。</p>
          <div class="wl-preview preview-lightbox preview-photo">
            <img src="/assets/img/widgets/workspace-desk.jpg" alt="デスクとノートPC" loading="lazy">
            <div class="zoom"></div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-049">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-049">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#lightbox</span><span>#media</span><span>#gallery</span></div>
        </article>

        <article class="widget-card" data-id="W-050" data-name="動画ギャラリー" data-category="media" data-category-label="Media / Gallery" data-tags="video grid" data-search="W-050 動画 ギャラリー">
          <div class="widget-card__head">
            <span class="widget-id">W-050</span>
            <span class="widget-type">Media</span>
          </div>
          <h3 class="widget-title">動画ギャラリー</h3>
          <p class="widget-desc">複数動画を一覧で見せる構成。</p>
          <div class="wl-preview preview-video-grid">
            <div class="video"></div>
            <div class="video"></div>
            <div class="video"></div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-050">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-050">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#video</span><span>#gallery</span><span>#media</span></div>
        </article>

        <article class="widget-card" data-id="W-051" data-name="ブランドフィード" data-category="media" data-category-label="Media / Gallery" data-tags="marquee" data-search="W-051 ブランド フィード">
          <div class="widget-card__head">
            <span class="widget-id">W-051</span>
            <span class="widget-type">Media</span>
          </div>
          <h3 class="widget-title">ブランドフィード</h3>
          <p class="widget-desc">ロゴや実績を流れるように見せる。</p>
          <div class="wl-preview preview-marquee">
            <div class="marquee-track">
              <span class="logo"></span>
              <span class="logo"></span>
              <span class="logo"></span>
              <span class="logo"></span>
              <span class="logo"></span>
              <span class="logo"></span>
              <span class="logo"></span>
              <span class="logo"></span>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-051">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-051">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#marquee</span><span>#logos</span><span>#media</span></div>
        </article>

        <article class="widget-card" data-id="W-052" data-name="ストーリーリール" data-category="media" data-category-label="Media / Gallery" data-tags="reel" data-search="W-052 ストーリー リール">
          <div class="widget-card__head">
            <span class="widget-id">W-052</span>
            <span class="widget-type">Media</span>
          </div>
          <h3 class="widget-title">ストーリーリール</h3>
          <p class="widget-desc">縦型メディアを並べるストーリー風UI。</p>
          <div class="wl-preview preview-reels">
            <div class="reel"></div>
            <div class="reel"></div>
            <div class="reel"></div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-052">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-052">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#reel</span><span>#media</span><span>#story</span></div>
        </article>

        <article class="widget-card" data-id="W-082" data-name="フルスクリーン動画" data-category="media" data-category-label="Media / Gallery" data-tags="video hero" data-search="W-082 フルスクリーン 動画">
          <div class="widget-card__head">
            <span class="widget-id">W-082</span>
            <span class="widget-type">Media</span>
          </div>
          <h3 class="widget-title">フルスクリーン動画</h3>
          <p class="widget-desc">没入感を高める動画背景。</p>
          <div class="wl-preview preview-video">
            <div class="video-circle"></div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-082">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-082">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#video</span><span>#media</span><span>#hero</span></div>
        </article>

        <article class="widget-card" data-id="W-083" data-name="ビジュアル比較" data-category="media" data-category-label="Media / Gallery" data-tags="comparison" data-search="W-083 ビジュアル 比較">
          <div class="widget-card__head">
            <span class="widget-id">W-083</span>
            <span class="widget-type">Media</span>
          </div>
          <h3 class="widget-title">ビジュアル比較</h3>
          <p class="widget-desc">変化を見せる比較スライダー。</p>
          <div class="wl-preview preview-beforeafter">
            <div class="beforeafter">
              <div class="before"></div>
              <div class="after"></div>
              <span class="slider"></span>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-083">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-083">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#comparison</span><span>#media</span><span>#slider</span></div>
        </article>

        <article class="widget-card" data-id="W-084" data-name="メディア＋説明" data-category="media" data-category-label="Media / Gallery" data-tags="split media" data-search="W-084 メディア 説明">
          <div class="widget-card__head">
            <span class="widget-id">W-084</span>
            <span class="widget-type">Media</span>
          </div>
          <h3 class="widget-title">メディア＋説明</h3>
          <p class="widget-desc">ビジュアルとテキストを並べて訴求。</p>
          <div class="wl-preview preview-split">
            <div class="mini-card">
              <img src="/assets/img/widgets/workspace-desk.jpg" alt="デスクの写真" loading="lazy">
            </div>
            <div>
              <span class="mini-line wide"></span>
              <span class="mini-line med"></span>
              <span class="mini-btn"></span>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-084">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-084">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#media</span><span>#split</span><span>#story</span></div>
        </article>

        <article class="widget-card" data-id="W-103" data-name="ムードボード" data-category="media" data-category-label="Media / Gallery" data-tags="moodboard gallery" data-search="W-103 ムードボード">
          <div class="widget-card__head">
            <span class="widget-id">W-103</span>
            <span class="widget-type">Media</span>
          </div>
          <h3 class="widget-title">ムードボード</h3>
          <p class="widget-desc">ブランドの世界観をまとめて見せる。</p>
          <div class="wl-preview preview-gallery">
            <div class="gallery-grid">
              <span class="gallery-item tall"></span>
              <span class="gallery-item"></span>
              <span class="gallery-item"></span>
              <span class="gallery-item"></span>
              <span class="gallery-item"></span>
              <span class="gallery-item tall"></span>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-103">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-103">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#moodboard</span><span>#media</span><span>#brand</span></div>
        </article>

        <article class="widget-card" data-id="W-110" data-name="フォトグリッド" data-category="media" data-category-label="Media / Gallery" data-tags="photo grid" data-search="W-110 フォト グリッド">
          <div class="widget-card__head">
            <span class="widget-id">W-110</span>
            <span class="widget-type">Media</span>
          </div>
          <h3 class="widget-title">フォトグリッド</h3>
          <p class="widget-desc">写真を均一に並べて印象を統一。</p>
          <div class="wl-preview preview-gallery">
            <div class="gallery-grid">
              <span class="gallery-item"></span>
              <span class="gallery-item"></span>
              <span class="gallery-item"></span>
              <span class="gallery-item"></span>
              <span class="gallery-item"></span>
              <span class="gallery-item"></span>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-110">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-110">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#photo</span><span>#media</span><span>#grid</span></div>
        </article>
      </div>
    </section>

    <section class="wl-category" id="cat-proof">
      <header class="wl-category__header">
        <h2 class="wl-category__title">Social Proof / Trust</h2>
        <p class="wl-category__desc">実績や信頼を見せて行動を後押しする要素。</p>
      </header>
      <div class="wl-grid">
        <article class="widget-card" data-id="W-017" data-name="テスティモニアル" data-category="proof" data-category-label="Social Proof / Trust" data-tags="testimonial" data-search="W-017 テスティモニアル testimonial review">
          <div class="widget-card__head">
            <span class="widget-id">W-017</span>
            <span class="widget-type">Social Proof</span>
          </div>
          <h3 class="widget-title">テスティモニアル</h3>
          <p class="widget-desc">ユーザーの声をカードで提示し信頼を強化。</p>
          <div class="wl-preview preview-testimonial">
            <div class="quote-card">
              <span class="mini-line wide"></span>
              <span class="mini-line med"></span>
            </div>
            <div class="quote-footer">
              <span class="mini-avatar"></span>
              <span class="mini-line short"></span>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-017">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-017">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#testimonial</span><span>#trust</span><span>#review</span></div>
        </article>

        <article class="widget-card" data-id="W-018" data-name="ロゴウォール" data-category="proof" data-category-label="Social Proof / Trust" data-tags="logo wall" data-search="W-018 ロゴ ウォール logo">
          <div class="widget-card__head">
            <span class="widget-id">W-018</span>
            <span class="widget-type">Social Proof</span>
          </div>
          <h3 class="widget-title">ロゴウォール</h3>
          <p class="widget-desc">取引先・導入企業の数を一目で伝える。</p>
          <div class="wl-preview preview-logos">
            <div class="logo-grid">
              <span class="logo"></span>
              <span class="logo"></span>
              <span class="logo"></span>
              <span class="logo"></span>
              <span class="logo"></span>
              <span class="logo"></span>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-018">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-018">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#logo</span><span>#trust</span><span>#partners</span></div>
        </article>

        <article class="widget-card" data-id="W-019" data-name="評価サマリー" data-category="proof" data-category-label="Social Proof / Trust" data-tags="rating" data-search="W-019 評価 rating review">
          <div class="widget-card__head">
            <span class="widget-id">W-019</span>
            <span class="widget-type">Social Proof</span>
          </div>
          <h3 class="widget-title">評価サマリー</h3>
          <p class="widget-desc">★評価やレビュー数の信頼指標を視覚化。</p>
          <div class="wl-preview preview-rating">
            <div class="rating-stars">
              <span class="star"></span>
              <span class="star"></span>
              <span class="star"></span>
              <span class="star"></span>
              <span class="star"></span>
            </div>
            <div class="rating-bars">
              <span class="rating-bar"></span>
              <span class="rating-bar"></span>
              <span class="rating-bar"></span>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-019">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-019">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#rating</span><span>#review</span><span>#trust</span></div>
        </article>

        <article class="widget-card" data-id="W-020" data-name="メディア掲載" data-category="proof" data-category-label="Social Proof / Trust" data-tags="press" data-search="W-020 メディア 掲載 press">
          <div class="widget-card__head">
            <span class="widget-id">W-020</span>
            <span class="widget-type">Social Proof</span>
          </div>
          <h3 class="widget-title">メディア掲載</h3>
          <p class="widget-desc">掲載実績を一覧化し、権威性を補強。</p>
          <div class="wl-preview preview-press">
            <div class="press-row">
              <span class="mini-line short"></span>
              <span class="mini-pill"></span>
            </div>
            <div class="press-row">
              <span class="mini-line short"></span>
              <span class="mini-pill"></span>
            </div>
            <div class="press-row">
              <span class="mini-line short"></span>
              <span class="mini-pill"></span>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-020">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-020">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#press</span><span>#media</span><span>#trust</span></div>
        </article>

        <article class="widget-card" data-id="W-053" data-name="ケーススタディ" data-category="proof" data-category-label="Social Proof / Trust" data-tags="case study" data-search="W-053 ケーススタディ">
          <div class="widget-card__head">
            <span class="widget-id">W-053</span>
            <span class="widget-type">Social Proof</span>
          </div>
          <h3 class="widget-title">ケーススタディ</h3>
          <p class="widget-desc">成果ストーリーを写真付きで紹介。</p>
          <div class="wl-preview preview-case">
            <img src="/assets/img/widgets/workspace-bright.jpg" alt="明るいワークスペース" loading="lazy">
            <span class="case-label">CASE</span>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-053">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-053">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#case</span><span>#proof</span><span>#trust</span></div>
        </article>

        <article class="widget-card" data-id="W-054" data-name="SNS埋め込み" data-category="proof" data-category-label="Social Proof / Trust" data-tags="social" data-search="W-054 SNS 埋め込み">
          <div class="widget-card__head">
            <span class="widget-id">W-054</span>
            <span class="widget-type">Social Proof</span>
          </div>
          <h3 class="widget-title">SNS埋め込み</h3>
          <p class="widget-desc">リアルな投稿を表示して信頼を強化。</p>
          <div class="wl-preview preview-social">
            <div class="social-head">
              <span class="mini-avatar"></span>
              <span class="mini-line short"></span>
            </div>
            <div class="social-body">
              <span class="mini-line wide"></span>
              <span class="mini-line med"></span>
              <div class="mini-chip"></div>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-054">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-054">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#social</span><span>#review</span><span>#trust</span></div>
        </article>

        <article class="widget-card" data-id="W-055" data-name="バッジ列" data-category="proof" data-category-label="Social Proof / Trust" data-tags="badges" data-search="W-055 バッジ">
          <div class="widget-card__head">
            <span class="widget-id">W-055</span>
            <span class="widget-type">Social Proof</span>
          </div>
          <h3 class="widget-title">バッジ列</h3>
          <p class="widget-desc">認証や受賞を簡潔に並べる。</p>
          <div class="wl-preview preview-badges">
            <span>ISO</span>
            <span>Security</span>
            <span>Award</span>
            <span>Trusted</span>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-055">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-055">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#badges</span><span>#trust</span><span>#proof</span></div>
        </article>

        <article class="widget-card" data-id="W-056" data-name="数値実績" data-category="proof" data-category-label="Social Proof / Trust" data-tags="numbers" data-search="W-056 数値 実績">
          <div class="widget-card__head">
            <span class="widget-id">W-056</span>
            <span class="widget-type">Social Proof</span>
          </div>
          <h3 class="widget-title">数値実績</h3>
          <p class="widget-desc">導入数や成果の数値を強調表示。</p>
          <div class="wl-preview preview-numbers">
            <div class="metric">
              <strong data-count="480">0</strong>
              <span class="mini-label">プロジェクト</span>
            </div>
            <div class="metric">
              <strong data-count="72" data-count-suffix="h">0</strong>
              <span class="mini-label">短縮時間</span>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-056">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-056">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#numbers</span><span>#proof</span><span>#impact</span></div>
        </article>

        <article class="widget-card" data-id="W-085" data-name="レビューグリッド" data-category="proof" data-category-label="Social Proof / Trust" data-tags="review grid" data-search="W-085 レビュー グリッド">
          <div class="widget-card__head">
            <span class="widget-id">W-085</span>
            <span class="widget-type">Social Proof</span>
          </div>
          <h3 class="widget-title">レビューグリッド</h3>
          <p class="widget-desc">複数のレビューを一覧で表示。</p>
          <div class="wl-preview preview-testimonial">
            <div class="quote-card">
              <span class="mini-line wide"></span>
              <span class="mini-line short"></span>
            </div>
            <div class="quote-card">
              <span class="mini-line wide"></span>
              <span class="mini-line short"></span>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-085">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-085">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#review</span><span>#proof</span><span>#grid</span></div>
        </article>

        <article class="widget-card" data-id="W-086" data-name="認証＋数値" data-category="proof" data-category-label="Social Proof / Trust" data-tags="badge numbers" data-search="W-086 認証 数値">
          <div class="widget-card__head">
            <span class="widget-id">W-086</span>
            <span class="widget-type">Social Proof</span>
          </div>
          <h3 class="widget-title">認証＋数値</h3>
          <p class="widget-desc">認証バッジと実績数値を並記。</p>
          <div class="wl-preview preview-badges">
            <span>Security</span>
            <span>ISO</span>
            <span>Top 1%</span>
            <div class="preview-numbers">
              <div class="metric">
                <strong data-count="320">0</strong>
                <span class="mini-label">導入</span>
              </div>
              <div class="metric">
              <strong data-count="5" data-count-suffix="点">0</strong>
              <span class="mini-label">評価</span>
              </div>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-086">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-086">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#badge</span><span>#numbers</span><span>#trust</span></div>
        </article>

        <article class="widget-card" data-id="W-087" data-name="パートナー一覧" data-category="proof" data-category-label="Social Proof / Trust" data-tags="partners logos" data-search="W-087 パートナー ロゴ">
          <div class="widget-card__head">
            <span class="widget-id">W-087</span>
            <span class="widget-type">Social Proof</span>
          </div>
          <h3 class="widget-title">パートナー一覧</h3>
          <p class="widget-desc">協業先のロゴをまとめて表示。</p>
          <div class="wl-preview preview-logos">
            <div class="logo-grid">
              <span class="logo"></span>
              <span class="logo"></span>
              <span class="logo"></span>
              <span class="logo"></span>
              <span class="logo"></span>
              <span class="logo"></span>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-087">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-087">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#partners</span><span>#logos</span><span>#proof</span></div>
        </article>

        <article class="widget-card" data-id="W-104" data-name="受賞バッジ" data-category="proof" data-category-label="Social Proof / Trust" data-tags="award badge" data-search="W-104 受賞 バッジ">
          <div class="widget-card__head">
            <span class="widget-id">W-104</span>
            <span class="widget-type">Social Proof</span>
          </div>
          <h3 class="widget-title">受賞バッジ</h3>
          <p class="widget-desc">受賞・認定を強調して信頼を補強。</p>
          <div class="wl-preview preview-badges">
            <span>Award</span>
            <span>Top</span>
            <span>Certified</span>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-104">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-104">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#award</span><span>#badge</span><span>#trust</span></div>
        </article>
      </div>
    </section>

    <section class="wl-category" id="cat-pricing">
      <header class="wl-category__header">
        <h2 class="wl-category__title">Pricing / Plans</h2>
        <p class="wl-category__desc">料金設計やプラン比較を明確にするウィジェット。</p>
      </header>
      <div class="wl-grid">
        <article class="widget-card" data-id="W-021" data-name="3プラン料金" data-category="pricing" data-category-label="Pricing / Plans" data-tags="pricing plans" data-search="W-021 料金 プラン pricing">
          <div class="widget-card__head">
            <span class="widget-id">W-021</span>
            <span class="widget-type">Pricing</span>
          </div>
          <h3 class="widget-title">3プラン料金</h3>
          <p class="widget-desc">比較しやすい3カラムの定番プラン表。</p>
          <div class="wl-preview preview-pricing">
            <div class="price-grid">
              <div class="price-card">
                <span class="mini-line short"></span>
                <span class="mini-line med"></span>
              </div>
              <div class="price-card">
                <span class="mini-line short"></span>
                <span class="mini-line med"></span>
              </div>
              <div class="price-card">
                <span class="mini-line short"></span>
                <span class="mini-line med"></span>
              </div>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-021">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-021">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#pricing</span><span>#plans</span><span>#table</span></div>
        </article>

        <article class="widget-card" data-id="W-022" data-name="月/年トグル" data-category="pricing" data-category-label="Pricing / Plans" data-tags="toggle" data-search="W-022 トグル pricing toggle">
          <div class="widget-card__head">
            <span class="widget-id">W-022</span>
            <span class="widget-type">Pricing</span>
          </div>
          <h3 class="widget-title">月/年トグル</h3>
          <p class="widget-desc">課金周期を切り替えるスイッチ付き料金表。</p>
          <div class="wl-preview preview-toggle">
            <div class="toggle-pill"></div>
            <div class="price-grid">
              <div class="price-card">
                <span class="mini-line short"></span>
                <span class="mini-line med"></span>
              </div>
              <div class="price-card">
                <span class="mini-line short"></span>
                <span class="mini-line med"></span>
              </div>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-022">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-022">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#toggle</span><span>#pricing</span><span>#conversion</span></div>
        </article>

        <article class="widget-card" data-id="W-023" data-name="機能マトリクス" data-category="pricing" data-category-label="Pricing / Plans" data-tags="matrix" data-search="W-023 マトリクス pricing matrix">
          <div class="widget-card__head">
            <span class="widget-id">W-023</span>
            <span class="widget-type">Pricing</span>
          </div>
          <h3 class="widget-title">機能マトリクス</h3>
          <p class="widget-desc">プラン差分をチェック形式で整理する詳細比較。</p>
          <div class="wl-preview preview-matrix">
            <div class="matrix-row">
              <span class="matrix-cell"></span>
              <span class="matrix-cell"></span>
              <span class="matrix-cell"></span>
            </div>
            <div class="matrix-row">
              <span class="matrix-cell"></span>
              <span class="matrix-cell"></span>
              <span class="matrix-cell"></span>
            </div>
            <div class="matrix-row">
              <span class="matrix-cell"></span>
              <span class="matrix-cell"></span>
              <span class="matrix-cell"></span>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-023">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-023">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#matrix</span><span>#comparison</span><span>#pricing</span></div>
        </article>

        <article class="widget-card" data-id="W-024" data-name="アドオンスタック" data-category="pricing" data-category-label="Pricing / Plans" data-tags="addon" data-search="W-024 アドオン add-on">
          <div class="widget-card__head">
            <span class="widget-id">W-024</span>
            <span class="widget-type">Pricing</span>
          </div>
          <h3 class="widget-title">アドオンスタック</h3>
          <p class="widget-desc">追加オプションを段積みでわかりやすく提示。</p>
          <div class="wl-preview preview-addon">
            <div class="addon-card"></div>
            <div class="addon-card"></div>
            <div class="addon-card"></div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-024">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-024">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#addon</span><span>#pricing</span><span>#upsell</span></div>
        </article>

        <article class="widget-card" data-id="W-057" data-name="人気プラン強調" data-category="pricing" data-category-label="Pricing / Plans" data-tags="pricing highlight" data-search="W-057 人気 プラン">
          <div class="widget-card__head">
            <span class="widget-id">W-057</span>
            <span class="widget-type">Pricing</span>
          </div>
          <h3 class="widget-title">人気プラン強調</h3>
          <p class="widget-desc">最適プランを目立たせる差別化。</p>
          <div class="wl-preview preview-highlight-plan">
            <div class="plan">
              <span class="mini-line short"></span>
              <span class="mini-line med"></span>
              <span class="mini-btn"></span>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-057">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-057">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#pricing</span><span>#highlight</span><span>#conversion</span></div>
        </article>

        <article class="widget-card" data-id="W-058" data-name="見積もりレンジ" data-category="pricing" data-category-label="Pricing / Plans" data-tags="range" data-search="W-058 見積もり レンジ">
          <div class="widget-card__head">
            <span class="widget-id">W-058</span>
            <span class="widget-type">Pricing</span>
          </div>
          <h3 class="widget-title">見積もりレンジ</h3>
          <p class="widget-desc">料金幅を直感的に示すレンジバー。</p>
          <div class="wl-preview preview-range">
            <div class="range-bar"></div>
            <span class="mini-line short"></span>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-058">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-058">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#range</span><span>#pricing</span><span>#estimate</span></div>
        </article>

        <article class="widget-card" data-id="W-059" data-name="無料/有料比較" data-category="pricing" data-category-label="Pricing / Plans" data-tags="compare" data-search="W-059 無料 有料 比較">
          <div class="widget-card__head">
            <span class="widget-id">W-059</span>
            <span class="widget-type">Pricing</span>
          </div>
          <h3 class="widget-title">無料/有料比較</h3>
          <p class="widget-desc">2プランの差を短く見せる比較。</p>
          <div class="wl-preview preview-compare">
            <div class="compare-card">
              <span class="mini-line short"></span>
              <span class="mini-line"></span>
            </div>
            <div class="compare-card">
              <span class="mini-line short"></span>
              <span class="mini-line"></span>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-059">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-059">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#compare</span><span>#pricing</span><span>#plan</span></div>
        </article>

        <article class="widget-card" data-id="W-060" data-name="FAQ付き料金" data-category="pricing" data-category-label="Pricing / Plans" data-tags="pricing faq" data-search="W-060 料金 FAQ">
          <div class="widget-card__head">
            <span class="widget-id">W-060</span>
            <span class="widget-type">Pricing</span>
          </div>
          <h3 class="widget-title">FAQ付き料金</h3>
          <p class="widget-desc">料金とFAQを同じブロックで提示。</p>
          <div class="wl-preview preview-faq-inline">
            <span class="mini-line wide"></span>
            <span class="mini-line med"></span>
            <span class="mini-line short"></span>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-060">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-060">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#faq</span><span>#pricing</span><span>#support</span></div>
        </article>

        <article class="widget-card" data-id="W-088" data-name="アドオン比較" data-category="pricing" data-category-label="Pricing / Plans" data-tags="addon compare" data-search="W-088 アドオン 比較">
          <div class="widget-card__head">
            <span class="widget-id">W-088</span>
            <span class="widget-type">Pricing</span>
          </div>
          <h3 class="widget-title">アドオン比較</h3>
          <p class="widget-desc">追加オプションの違いを並べて比較。</p>
          <div class="wl-preview preview-addon">
            <div class="addon-card"></div>
            <div class="addon-card"></div>
            <div class="addon-card"></div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-088">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-088">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#addon</span><span>#pricing</span><span>#compare</span></div>
        </article>

        <article class="widget-card" data-id="W-089" data-name="エンタープライズCTA" data-category="pricing" data-category-label="Pricing / Plans" data-tags="enterprise cta" data-search="W-089 エンタープライズ CTA">
          <div class="widget-card__head">
            <span class="widget-id">W-089</span>
            <span class="widget-type">Pricing</span>
          </div>
          <h3 class="widget-title">エンタープライズCTA</h3>
          <p class="widget-desc">大口向けの導入相談を促す。</p>
          <div class="wl-preview preview-highlight">
            <div class="highlight-card">
              <span class="mini-line wide"></span>
              <span class="mini-line med"></span>
              <span class="mini-btn"></span>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-089">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-089">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#enterprise</span><span>#pricing</span><span>#cta</span></div>
        </article>

        <article class="widget-card" data-id="W-090" data-name="料金比較チャート" data-category="pricing" data-category-label="Pricing / Plans" data-tags="pricing chart" data-search="W-090 料金 比較 チャート">
          <div class="widget-card__head">
            <span class="widget-id">W-090</span>
            <span class="widget-type">Pricing</span>
          </div>
          <h3 class="widget-title">料金比較チャート</h3>
          <p class="widget-desc">プラン差分を視覚化する比較。</p>
          <div class="wl-preview preview-table">
            <span class="table-row"></span>
            <span class="table-row"></span>
            <span class="table-row"></span>
            <span class="table-row"></span>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-090">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-090">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#pricing</span><span>#chart</span><span>#compare</span></div>
        </article>

        <article class="widget-card" data-id="W-105" data-name="プラン切替タブ" data-category="pricing" data-category-label="Pricing / Plans" data-tags="pricing toggle" data-search="W-105 プラン 切替 タブ">
          <div class="widget-card__head">
            <span class="widget-id">W-105</span>
            <span class="widget-type">Pricing</span>
          </div>
          <h3 class="widget-title">プラン切替タブ</h3>
          <p class="widget-desc">月額/年額などをタブで切替。</p>
          <div class="wl-preview preview-toggle">
            <div class="toggle-pill"></div>
            <div class="price-grid">
              <div class="price-card">
                <span class="mini-line short"></span>
                <span class="mini-line med"></span>
              </div>
              <div class="price-card">
                <span class="mini-line short"></span>
                <span class="mini-line med"></span>
              </div>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-105">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-105">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#pricing</span><span>#toggle</span><span>#plan</span></div>
        </article>
      </div>
    </section>

    <section class="wl-category" id="cat-form">
      <header class="wl-category__header">
        <h2 class="wl-category__title">Forms / Input</h2>
        <p class="wl-category__desc">入力体験を軽くし、コンバージョンを高めるフォーム。</p>
      </header>
      <div class="wl-grid">
        <article class="widget-card" data-id="W-025" data-name="インライン登録" data-category="form" data-category-label="Forms / Input" data-tags="subscribe" data-search="W-025 登録 subscribe form">
          <div class="widget-card__head">
            <span class="widget-id">W-025</span>
            <span class="widget-type">Form</span>
          </div>
          <h3 class="widget-title">インライン登録</h3>
          <p class="widget-desc">メール登録や申込みを短く済ませる一行フォーム。</p>
          <div class="wl-preview preview-subscribe">
            <div class="subscribe-row">
              <span class="subscribe-input"></span>
              <span class="mini-btn"></span>
            </div>
            <span class="mini-line short"></span>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-025">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-025">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#form</span><span>#subscribe</span><span>#lead</span></div>
        </article>

        <article class="widget-card" data-id="W-026" data-name="ステップフォーム" data-category="form" data-category-label="Forms / Input" data-tags="multi step" data-search="W-026 ステップ フォーム multi-step">
          <div class="widget-card__head">
            <span class="widget-id">W-026</span>
            <span class="widget-type">Form</span>
          </div>
          <h3 class="widget-title">ステップフォーム</h3>
          <p class="widget-desc">入力を分割して心理的負担を軽減する。</p>
          <div class="wl-preview preview-steps-form">
            <div class="stepper">
              <span class="step-dot"></span>
              <span class="step-dot"></span>
              <span class="step-dot"></span>
            </div>
            <span class="mini-line wide"></span>
            <span class="mini-line med"></span>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-026">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-026">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#form</span><span>#step</span><span>#ux</span></div>
        </article>

        <article class="widget-card" data-id="W-027" data-name="フィルター検索" data-category="form" data-category-label="Forms / Input" data-tags="filter" data-search="W-027 フィルター 検索">
          <div class="widget-card__head">
            <span class="widget-id">W-027</span>
            <span class="widget-type">Form</span>
          </div>
          <h3 class="widget-title">フィルター検索</h3>
          <p class="widget-desc">タグや条件で素早く絞り込むUI。</p>
          <div class="wl-preview preview-filter">
            <div class="chip-row">
              <span class="chip"></span>
              <span class="chip"></span>
              <span class="chip"></span>
            </div>
            <span class="mini-line wide"></span>
            <span class="mini-line med"></span>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-027">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-027">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#filter</span><span>#search</span><span>#form</span></div>
        </article>

        <article class="widget-card" data-id="W-028" data-name="コンタクトカード" data-category="form" data-category-label="Forms / Input" data-tags="contact" data-search="W-028 コンタクト フォーム">
          <div class="widget-card__head">
            <span class="widget-id">W-028</span>
            <span class="widget-type">Form</span>
          </div>
          <h3 class="widget-title">コンタクトカード</h3>
          <p class="widget-desc">問い合わせ導線をカード形式で整理。</p>
          <div class="wl-preview preview-contact">
            <div class="contact-card">
              <span class="mini-line wide"></span>
              <span class="mini-line med"></span>
              <span class="mini-btn"></span>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-028">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-028">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#contact</span><span>#form</span><span>#lead</span></div>
        </article>

        <article class="widget-card" data-id="W-061" data-name="予約カレンダー" data-category="form" data-category-label="Forms / Input" data-tags="calendar" data-search="W-061 予約 カレンダー">
          <div class="widget-card__head">
            <span class="widget-id">W-061</span>
            <span class="widget-type">Form</span>
          </div>
          <h3 class="widget-title">予約カレンダー</h3>
          <p class="widget-desc">日付選択に特化した予約UI。</p>
          <div class="wl-preview preview-calendar">
            <div class="cal-grid">
              <span class="cal-cell"></span><span class="cal-cell"></span><span class="cal-cell"></span><span class="cal-cell"></span><span class="cal-cell"></span><span class="cal-cell"></span><span class="cal-cell"></span>
              <span class="cal-cell"></span><span class="cal-cell"></span><span class="cal-cell"></span><span class="cal-cell"></span><span class="cal-cell"></span><span class="cal-cell"></span><span class="cal-cell"></span>
              <span class="cal-cell"></span><span class="cal-cell"></span><span class="cal-cell"></span><span class="cal-cell"></span><span class="cal-cell"></span><span class="cal-cell"></span><span class="cal-cell"></span>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-061">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-061">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#calendar</span><span>#form</span><span>#booking</span></div>
        </article>

        <article class="widget-card" data-id="W-062" data-name="ファイルアップロード" data-category="form" data-category-label="Forms / Input" data-tags="upload" data-search="W-062 ファイル アップロード">
          <div class="widget-card__head">
            <span class="widget-id">W-062</span>
            <span class="widget-type">Form</span>
          </div>
          <h3 class="widget-title">ファイルアップロード</h3>
          <p class="widget-desc">ドラッグ&ドロップを想起させるUI。</p>
          <div class="wl-preview preview-upload">
            <div class="upload-icon"></div>
            <span class="mini-line short"></span>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-062">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-062">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#upload</span><span>#form</span><span>#file</span></div>
        </article>

        <article class="widget-card" data-id="W-063" data-name="アンケートスライダー" data-category="form" data-category-label="Forms / Input" data-tags="survey slider" data-search="W-063 アンケート スライダー">
          <div class="widget-card__head">
            <span class="widget-id">W-063</span>
            <span class="widget-type">Form</span>
          </div>
          <h3 class="widget-title">アンケートスライダー</h3>
          <p class="widget-desc">回答を直感的に調整できるスライダー。</p>
          <div class="wl-preview preview-range">
            <div class="range-bar"></div>
            <span class="mini-line short"></span>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-063">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-063">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#survey</span><span>#form</span><span>#slider</span></div>
        </article>

        <article class="widget-card" data-id="W-064" data-name="ログインカード" data-category="form" data-category-label="Forms / Input" data-tags="login" data-search="W-064 ログイン">
          <div class="widget-card__head">
            <span class="widget-id">W-064</span>
            <span class="widget-type">Form</span>
          </div>
          <h3 class="widget-title">ログインカード</h3>
          <p class="widget-desc">背景付きのログイン/サインアップ。</p>
          <div class="wl-preview preview-login">
            <div class="login-card">
              <span class="mini-line wide"></span>
              <span class="mini-line med"></span>
              <span class="mini-btn"></span>
            </div>
            <div class="mini-card">
              <img src="/assets/img/widgets/gradient-pink.jpg" alt="ピンクのグラデーション" loading="lazy">
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-064">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-064">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#login</span><span>#form</span><span>#auth</span></div>
        </article>

        <article class="widget-card" data-id="W-091" data-name="検索＋フィルター" data-category="form" data-category-label="Forms / Input" data-tags="search filter" data-search="W-091 検索 フィルター">
          <div class="widget-card__head">
            <span class="widget-id">W-091</span>
            <span class="widget-type">Form</span>
          </div>
          <h3 class="widget-title">検索＋フィルター</h3>
          <p class="widget-desc">検索と条件指定をまとめたUI。</p>
          <div class="wl-preview preview-filter">
            <div class="chip-row">
              <span class="chip"></span>
              <span class="chip"></span>
              <span class="chip"></span>
            </div>
            <span class="mini-line wide"></span>
            <span class="mini-line med"></span>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-091">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-091">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#search</span><span>#form</span><span>#filter</span></div>
        </article>

        <article class="widget-card" data-id="W-092" data-name="ステップチェックアウト" data-category="form" data-category-label="Forms / Input" data-tags="checkout step" data-search="W-092 チェックアウト ステップ">
          <div class="widget-card__head">
            <span class="widget-id">W-092</span>
            <span class="widget-type">Form</span>
          </div>
          <h3 class="widget-title">ステップチェックアウト</h3>
          <p class="widget-desc">購入までの流れを段階的に誘導。</p>
          <div class="wl-preview preview-steps-form">
            <div class="stepper">
              <span class="step-dot"></span>
              <span class="step-dot"></span>
              <span class="step-dot"></span>
            </div>
            <span class="mini-line wide"></span>
            <span class="mini-line med"></span>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-092">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-092">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#checkout</span><span>#form</span><span>#step</span></div>
        </article>

        <article class="widget-card" data-id="W-093" data-name="詳細問い合わせ" data-category="form" data-category-label="Forms / Input" data-tags="contact form" data-search="W-093 詳細 問い合わせ">
          <div class="widget-card__head">
            <span class="widget-id">W-093</span>
            <span class="widget-type">Form</span>
          </div>
          <h3 class="widget-title">詳細問い合わせ</h3>
          <p class="widget-desc">内容を詳しく書けるフォーム。</p>
          <div class="wl-preview preview-contact">
            <div class="contact-card">
              <span class="mini-line wide"></span>
              <span class="mini-line med"></span>
              <span class="mini-line short"></span>
              <span class="mini-btn"></span>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-093">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-093">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#contact</span><span>#form</span><span>#lead</span></div>
        </article>

        <article class="widget-card" data-id="W-106" data-name="アンケートカード" data-category="form" data-category-label="Forms / Input" data-tags="survey form" data-search="W-106 アンケート カード">
          <div class="widget-card__head">
            <span class="widget-id">W-106</span>
            <span class="widget-type">Form</span>
          </div>
          <h3 class="widget-title">アンケートカード</h3>
          <p class="widget-desc">短い設問で回答率を上げる。</p>
          <div class="wl-preview preview-range">
            <div class="range-bar"></div>
            <span class="mini-line short"></span>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-106">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-106">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#survey</span><span>#form</span><span>#ux</span></div>
        </article>
      </div>
    </section>

    <section class="wl-category" id="cat-data">
      <header class="wl-category__header">
        <h2 class="wl-category__title">Data / Dashboard</h2>
        <p class="wl-category__desc">状況や進捗を見える化するダッシュボード要素。</p>
      </header>
      <div class="wl-grid">
        <article class="widget-card" data-id="W-029" data-name="KPIカード" data-category="data" data-category-label="Data / Dashboard" data-tags="kpi" data-search="W-029 KPI カード stats">
          <div class="widget-card__head">
            <span class="widget-id">W-029</span>
            <span class="widget-type">Data</span>
          </div>
          <h3 class="widget-title">KPIカード</h3>
          <p class="widget-desc">主要指標を小さなカードで一覧化。</p>
          <div class="wl-preview preview-kpi">
            <div class="kpi-grid">
              <span class="kpi-card"></span>
              <span class="kpi-card"></span>
              <span class="kpi-card"></span>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-029">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-029">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#kpi</span><span>#stats</span><span>#dashboard</span></div>
        </article>

        <article class="widget-card" data-id="W-030" data-name="ラインチャート" data-category="data" data-category-label="Data / Dashboard" data-tags="chart line" data-search="W-030 ラインチャート chart">
          <div class="widget-card__head">
            <span class="widget-id">W-030</span>
            <span class="widget-type">Data</span>
          </div>
          <h3 class="widget-title">ラインチャート</h3>
          <p class="widget-desc">トレンドの変化を滑らかに見せる折れ線。</p>
          <div class="wl-preview preview-linechart">
            <svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
              <polyline points="0,30 20,24 40,26 60,18 80,20 100,10 120,14" fill="none" stroke="#0ea5e9" stroke-width="3" />
              <polyline points="0,34 20,32 40,30 60,24 80,26 100,18 120,20" fill="none" stroke="#94a3b8" stroke-width="2" />
            </svg>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-030">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-030">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#chart</span><span>#trend</span><span>#data</span></div>
        </article>

        <article class="widget-card" data-id="W-031" data-name="進捗ドーナツ" data-category="data" data-category-label="Data / Dashboard" data-tags="progress" data-search="W-031 進捗 ドーナツ">
          <div class="widget-card__head">
            <span class="widget-id">W-031</span>
            <span class="widget-type">Data</span>
          </div>
          <h3 class="widget-title">進捗ドーナツ</h3>
          <p class="widget-desc">達成度を見た目で把握できるサークル。</p>
          <div class="wl-preview preview-progress">
            <div class="donut"></div>
            <span class="mini-line short"></span>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-031">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-031">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#progress</span><span>#kpi</span><span>#dashboard</span></div>
        </article>

        <article class="widget-card" data-id="W-032" data-name="ランキング" data-category="data" data-category-label="Data / Dashboard" data-tags="leaderboard" data-search="W-032 ランキング leaderboard">
          <div class="widget-card__head">
            <span class="widget-id">W-032</span>
            <span class="widget-type">Data</span>
          </div>
          <h3 class="widget-title">ランキング</h3>
          <p class="widget-desc">上位項目をランキング形式で提示。</p>
          <div class="wl-preview preview-leaderboard">
            <div class="leader-row">
              <span class="mini-pill"></span>
              <span class="leader-bar"></span>
            </div>
            <div class="leader-row">
              <span class="mini-pill"></span>
              <span class="leader-bar"></span>
            </div>
            <div class="leader-row">
              <span class="mini-pill"></span>
              <span class="leader-bar"></span>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-032">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-032">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#leaderboard</span><span>#ranking</span><span>#data</span></div>
        </article>

        <article class="widget-card" data-id="W-065" data-name="ヒートマップ" data-category="data" data-category-label="Data / Dashboard" data-tags="heatmap" data-search="W-065 ヒートマップ">
          <div class="widget-card__head">
            <span class="widget-id">W-065</span>
            <span class="widget-type">Data</span>
          </div>
          <h3 class="widget-title">ヒートマップ</h3>
          <p class="widget-desc">注目度を色で可視化する表示。</p>
          <div class="wl-preview preview-heatmap">
            <div class="heat-grid">
              <span class="heat-cell" style="background:rgba(59,130,246,0.15)"></span>
              <span class="heat-cell" style="background:rgba(59,130,246,0.35)"></span>
              <span class="heat-cell" style="background:rgba(14,116,144,0.35)"></span>
              <span class="heat-cell" style="background:rgba(59,130,246,0.2)"></span>
              <span class="heat-cell" style="background:rgba(59,130,246,0.12)"></span>
              <span class="heat-cell" style="background:rgba(14,116,144,0.45)"></span>
              <span class="heat-cell" style="background:rgba(59,130,246,0.3)"></span>
              <span class="heat-cell" style="background:rgba(14,116,144,0.2)"></span>
              <span class="heat-cell" style="background:rgba(59,130,246,0.18)"></span>
              <span class="heat-cell" style="background:rgba(59,130,246,0.32)"></span>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-065">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-065">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#heatmap</span><span>#data</span><span>#visual</span></div>
        </article>

        <article class="widget-card" data-id="W-066" data-name="アクティビティログ" data-category="data" data-category-label="Data / Dashboard" data-tags="activity" data-search="W-066 アクティビティ ログ">
          <div class="widget-card__head">
            <span class="widget-id">W-066</span>
            <span class="widget-type">Data</span>
          </div>
          <h3 class="widget-title">アクティビティログ</h3>
          <p class="widget-desc">リアルタイムの動きを時系列で表示。</p>
          <div class="wl-preview preview-activity">
            <div class="activity-row">
              <span class="mini-dot"></span>
              <span class="mini-line med"></span>
            </div>
            <div class="activity-row">
              <span class="mini-dot"></span>
              <span class="mini-line short"></span>
            </div>
            <div class="activity-row">
              <span class="mini-dot"></span>
              <span class="mini-line med"></span>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-066">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-066">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#activity</span><span>#data</span><span>#log</span></div>
        </article>

        <article class="widget-card" data-id="W-067" data-name="ファネル" data-category="data" data-category-label="Data / Dashboard" data-tags="funnel" data-search="W-067 ファネル">
          <div class="widget-card__head">
            <span class="widget-id">W-067</span>
            <span class="widget-type">Data</span>
          </div>
          <h3 class="widget-title">ファネル</h3>
          <p class="widget-desc">ステップ間の落差を視覚化。</p>
          <div class="wl-preview preview-funnel">
            <div class="funnel-step" style="width: 100%"></div>
            <div class="funnel-step" style="width: 80%"></div>
            <div class="funnel-step" style="width: 60%"></div>
            <div class="funnel-step" style="width: 40%"></div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-067">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-067">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#funnel</span><span>#data</span><span>#conversion</span></div>
        </article>

        <article class="widget-card" data-id="W-068" data-name="リアルタイム通知" data-category="data" data-category-label="Data / Dashboard" data-tags="realtime" data-search="W-068 リアルタイム">
          <div class="widget-card__head">
            <span class="widget-id">W-068</span>
            <span class="widget-type">Data</span>
          </div>
          <h3 class="widget-title">リアルタイム通知</h3>
          <p class="widget-desc">ライブ感を伝えるインジケーター。</p>
          <div class="wl-preview preview-realtime">
            <div class="live-dot"></div>
            <span class="mini-line med"></span>
            <span class="mini-line short"></span>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-068">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-068">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#realtime</span><span>#data</span><span>#indicator</span></div>
        </article>

        <article class="widget-card" data-id="W-094" data-name="スパークライン一覧" data-category="data" data-category-label="Data / Dashboard" data-tags="sparkline" data-search="W-094 スパークライン">
          <div class="widget-card__head">
            <span class="widget-id">W-094</span>
            <span class="widget-type">Data</span>
          </div>
          <h3 class="widget-title">スパークライン一覧</h3>
          <p class="widget-desc">小さな折れ線で動きを比較。</p>
          <div class="wl-preview preview-linechart">
            <svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
              <polyline points="0,30 20,24 40,26 60,18 80,20 100,10 120,14" fill="none" stroke="#0ea5e9" stroke-width="3" />
              <polyline points="0,34 20,32 40,30 60,24 80,26 100,18 120,20" fill="none" stroke="#94a3b8" stroke-width="2" />
            </svg>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-094">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-094">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#sparkline</span><span>#data</span><span>#chart</span></div>
        </article>

        <article class="widget-card" data-id="W-095" data-name="KPI＋ステータス" data-category="data" data-category-label="Data / Dashboard" data-tags="kpi status" data-search="W-095 KPI ステータス">
          <div class="widget-card__head">
            <span class="widget-id">W-095</span>
            <span class="widget-type">Data</span>
          </div>
          <h3 class="widget-title">KPI＋ステータス</h3>
          <p class="widget-desc">主要KPIと状態表示をまとめる。</p>
          <div class="wl-preview preview-status">
            <div class="status-row">
              <span class="mini-line short"></span>
              <span class="status-pill"></span>
            </div>
            <div class="status-row">
              <span class="mini-line short"></span>
              <span class="status-pill warn"></span>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-095">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-095">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#status</span><span>#data</span><span>#kpi</span></div>
        </article>

        <article class="widget-card" data-id="W-096" data-name="リソースゲージ" data-category="data" data-category-label="Data / Dashboard" data-tags="gauge" data-search="W-096 リソース ゲージ">
          <div class="widget-card__head">
            <span class="widget-id">W-096</span>
            <span class="widget-type">Data</span>
          </div>
          <h3 class="widget-title">リソースゲージ</h3>
          <p class="widget-desc">消費率をリングで可視化。</p>
          <div class="wl-preview preview-progress">
            <div class="donut"></div>
            <span class="mini-line short"></span>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-096">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-096">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#gauge</span><span>#data</span><span>#progress</span></div>
        </article>

        <article class="widget-card" data-id="W-107" data-name="セグメント内訳バー" data-category="data" data-category-label="Data / Dashboard" data-tags="segment bar" data-search="W-107 セグメント 内訳 バー chart">
          <div class="widget-card__head">
            <span class="widget-id">W-107</span>
            <span class="widget-type">Data</span>
          </div>
          <h3 class="widget-title">セグメント内訳バー</h3>
          <p class="widget-desc">属性やチャネル別の構成比を横棒で比較。</p>
          <div class="wl-preview preview-bars">
            <div class="bar-row">
              <span class="mini-line short"></span>
              <div class="mini-bar"><span style="width:72%"></span></div>
            </div>
            <div class="bar-row">
              <span class="mini-line short"></span>
              <div class="mini-bar"><span style="width:48%"></span></div>
            </div>
            <div class="bar-row">
              <span class="mini-line short"></span>
              <div class="mini-bar"><span style="width:32%"></span></div>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-107">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-107">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#segment</span><span>#bar</span><span>#data</span></div>
        </article>

        <article class="widget-card" data-id="W-111" data-name="期間比較タイル" data-category="data" data-category-label="Data / Dashboard" data-tags="delta comparison" data-search="W-111 期間 比較 タイル">
          <div class="widget-card__head">
            <span class="widget-id">W-111</span>
            <span class="widget-type">Data</span>
          </div>
          <h3 class="widget-title">期間比較タイル</h3>
          <p class="widget-desc">前週/前月などの差分を並べて確認。</p>
          <div class="wl-preview preview-delta">
            <div class="delta-card">
              <span class="mini-line short"></span>
              <span class="mini-line"></span>
              <span class="mini-line short"></span>
            </div>
            <div class="delta-card">
              <span class="mini-line short"></span>
              <span class="mini-line"></span>
              <span class="mini-line short"></span>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-111">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-111">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#delta</span><span>#comparison</span><span>#data</span></div>
        </article>
      </div>
    </section>

    <section class="wl-category" id="cat-feedback">
      <header class="wl-category__header">
        <h2 class="wl-category__title">Feedback / FAQ</h2>
        <p class="wl-category__desc">ユーザーを迷わせず、次の行動に導く補助要素。</p>
      </header>
      <div class="wl-grid">
        <article class="widget-card" data-id="W-033" data-name="アラートバナー" data-category="feedback" data-category-label="Feedback / FAQ" data-tags="alert" data-search="W-033 アラート banner alert">
          <div class="widget-card__head">
            <span class="widget-id">W-033</span>
            <span class="widget-type">Feedback</span>
          </div>
          <h3 class="widget-title">アラートバナー</h3>
          <p class="widget-desc">重要なお知らせや注意を目立たせる。</p>
          <div class="wl-preview preview-alert">
            <div class="alert-banner">
              <span class="alert-dot"></span>
              <span class="mini-line med"></span>
              <span class="mini-btn"></span>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-033">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-033">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#alert</span><span>#banner</span><span>#feedback</span></div>
        </article>

        <article class="widget-card" data-id="W-034" data-name="トースト通知" data-category="feedback" data-category-label="Feedback / FAQ" data-tags="toast" data-search="W-034 トースト toast">
          <div class="widget-card__head">
            <span class="widget-id">W-034</span>
            <span class="widget-type">Feedback</span>
          </div>
          <h3 class="widget-title">トースト通知</h3>
          <p class="widget-desc">操作結果を軽く伝えるフローティング通知。</p>
          <div class="wl-preview preview-toast">
            <div class="toast"></div>
            <div class="toast"></div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-034">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-034">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#toast</span><span>#notification</span><span>#feedback</span></div>
        </article>

        <article class="widget-card" data-id="W-108" data-name="リマインダー通知" data-category="feedback" data-category-label="Feedback / FAQ" data-tags="reminder notification" data-search="W-108 リマインダー 期限 通知">
          <div class="widget-card__head">
            <span class="widget-id">W-108</span>
            <span class="widget-type">Feedback</span>
          </div>
          <h3 class="widget-title">リマインダー通知</h3>
          <p class="widget-desc">期限や次のアクションを穏やかに促す。</p>
          <div class="wl-preview preview-reminder">
            <div class="reminder-card">
              <span class="mini-line wide"></span>
              <span class="mini-line med"></span>
              <div class="reminder-meta">
                <span class="mini-line short"></span>
                <span class="mini-line short"></span>
              </div>
              <span class="mini-btn"></span>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-108">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-108">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#reminder</span><span>#notification</span><span>#feedback</span></div>
        </article>

        <article class="widget-card" data-id="W-035" data-name="FAQアコーディオン" data-category="feedback" data-category-label="Feedback / FAQ" data-tags="faq" data-search="W-035 FAQ アコーディオン">
          <div class="widget-card__head">
            <span class="widget-id">W-035</span>
            <span class="widget-type">Feedback</span>
          </div>
          <h3 class="widget-title">FAQアコーディオン</h3>
          <p class="widget-desc">よくある質問を整理して読みやすく。</p>
          <div class="wl-preview preview-faq">
            <div class="faq-item"></div>
            <div class="faq-item"></div>
            <div class="faq-item"></div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-035">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-035">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#faq</span><span>#support</span><span>#ux</span></div>
        </article>

        <article class="widget-card" data-id="W-036" data-name="ステップタイムライン" data-category="feedback" data-category-label="Feedback / FAQ" data-tags="steps timeline" data-search="W-036 ステップ タイムライン">
          <div class="widget-card__head">
            <span class="widget-id">W-036</span>
            <span class="widget-type">Feedback</span>
          </div>
          <h3 class="widget-title">ステップタイムライン</h3>
          <p class="widget-desc">導入フローや作業工程を段階表示。</p>
          <div class="wl-preview preview-steps">
            <div class="step-item">
              <span class="step-dot"></span>
              <span class="mini-line med"></span>
            </div>
            <div class="step-item">
              <span class="step-dot"></span>
              <span class="mini-line med"></span>
            </div>
            <div class="step-item">
              <span class="step-dot"></span>
              <span class="mini-line med"></span>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-036">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-036">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#steps</span><span>#timeline</span><span>#guide</span></div>
        </article>

        <article class="widget-card" data-id="W-069" data-name="チャットサポート" data-category="feedback" data-category-label="Feedback / FAQ" data-tags="chat support" data-search="W-069 チャット サポート">
          <div class="widget-card__head">
            <span class="widget-id">W-069</span>
            <span class="widget-type">Feedback</span>
          </div>
          <h3 class="widget-title">チャットサポート</h3>
          <p class="widget-desc">即時サポートを連想させるUI。</p>
          <div class="wl-preview preview-chat">
            <div class="chat-row">
              <span class="mini-avatar"></span>
              <span class="bubble">Help</span>
            </div>
            <div class="chat-row is-right">
              <span class="bubble alt">OK</span>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-069">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-069">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#chat</span><span>#support</span><span>#feedback</span></div>
        </article>

        <article class="widget-card" data-id="W-070" data-name="オンボーディングツアー" data-category="feedback" data-category-label="Feedback / FAQ" data-tags="tour" data-search="W-070 オンボーディング ツアー">
          <div class="widget-card__head">
            <span class="widget-id">W-070</span>
            <span class="widget-type">Feedback</span>
          </div>
          <h3 class="widget-title">オンボーディングツアー</h3>
          <p class="widget-desc">初回利用をガイドするツールチップ。</p>
          <div class="wl-preview preview-tour">
            <div class="tour-card">
              <span class="mini-line short"></span>
              <span class="mini-line med"></span>
            </div>
            <span class="mini-line wide"></span>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-070">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-070">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#tour</span><span>#onboarding</span><span>#guide</span></div>
        </article>

        <article class="widget-card" data-id="W-071" data-name="フィードバックボタン" data-category="feedback" data-category-label="Feedback / FAQ" data-tags="feedback button" data-search="W-071 フィードバック ボタン">
          <div class="widget-card__head">
            <span class="widget-id">W-071</span>
            <span class="widget-type">Feedback</span>
          </div>
          <h3 class="widget-title">フィードバックボタン</h3>
          <p class="widget-desc">常時表示で意見を集めるUI。</p>
          <div class="wl-preview preview-floating-button">
            <span class="mini-line wide"></span>
            <span class="mini-line med"></span>
            <div class="fab"></div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-071">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-071">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#feedback</span><span>#cta</span><span>#support</span></div>
        </article>

        <article class="widget-card" data-id="W-072" data-name="ステータスページ" data-category="feedback" data-category-label="Feedback / FAQ" data-tags="status" data-search="W-072 ステータス">
          <div class="widget-card__head">
            <span class="widget-id">W-072</span>
            <span class="widget-type">Feedback</span>
          </div>
          <h3 class="widget-title">ステータスページ</h3>
          <p class="widget-desc">稼働状況をシンプルに共有。</p>
          <div class="wl-preview preview-status">
            <div class="status-row">
              <span class="mini-line short"></span>
              <span class="status-pill"></span>
            </div>
            <div class="status-row">
              <span class="mini-line short"></span>
              <span class="status-pill warn"></span>
            </div>
            <div class="status-row">
              <span class="mini-line short"></span>
              <span class="status-pill"></span>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-072">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-072">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#status</span><span>#feedback</span><span>#trust</span></div>
        </article>

        <article class="widget-card" data-id="W-097" data-name="完了モーダル" data-category="feedback" data-category-label="Feedback / FAQ" data-tags="success modal" data-search="W-097 完了 モーダル">
          <div class="widget-card__head">
            <span class="widget-id">W-097</span>
            <span class="widget-type">Feedback</span>
          </div>
          <h3 class="widget-title">完了モーダル</h3>
          <p class="widget-desc">完了時の達成感を強調するモーダル。</p>
          <div class="wl-preview preview-highlight">
            <div class="highlight-card">
              <span class="mini-line wide"></span>
              <span class="mini-line med"></span>
              <span class="mini-btn"></span>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-097">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-097">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#success</span><span>#modal</span><span>#feedback</span></div>
        </article>

        <article class="widget-card" data-id="W-098" data-name="レビュー依頼" data-category="feedback" data-category-label="Feedback / FAQ" data-tags="review rating" data-search="W-098 レビュー 依頼">
          <div class="widget-card__head">
            <span class="widget-id">W-098</span>
            <span class="widget-type">Feedback</span>
          </div>
          <h3 class="widget-title">レビュー依頼</h3>
          <p class="widget-desc">体験後の評価を促すUI。</p>
          <div class="wl-preview preview-rating">
            <div class="rating-stars">
              <span class="star"></span>
              <span class="star"></span>
              <span class="star"></span>
              <span class="star"></span>
              <span class="star"></span>
            </div>
            <div class="rating-bars">
              <span class="rating-bar"></span>
              <span class="rating-bar"></span>
              <span class="rating-bar"></span>
            </div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-098">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-098">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#review</span><span>#rating</span><span>#feedback</span></div>
        </article>

        <article class="widget-card" data-id="W-099" data-name="システム通知" data-category="feedback" data-category-label="Feedback / FAQ" data-tags="notification" data-search="W-099 システム 通知">
          <div class="widget-card__head">
            <span class="widget-id">W-099</span>
            <span class="widget-type">Feedback</span>
          </div>
          <h3 class="widget-title">システム通知</h3>
          <p class="widget-desc">バックグラウンドの更新を伝える。</p>
          <div class="wl-preview preview-toast">
            <div class="toast"></div>
            <div class="toast"></div>
          </div>
          <div class="widget-actions">
            <button class="wl-btn select" type="button" data-action="select" data-id="W-099">選ぶ</button>
            <button class="wl-btn ghost" type="button" data-action="copy-id" data-id="W-099">IDコピー</button>
          </div>
          <div class="widget-tags"><span>#notification</span><span>#feedback</span><span>#system</span></div>
        </article>
      </div>
    </section>
    <section class="wl-credit" aria-label="画像クレジット">
      <h2>画像クレジット</h2>
      <p>このページ内の写真・背景はUnsplashのフリー素材を使用しています。</p>
      <ul>
        <li><a href="https://unsplash.com/photos/a126e7c304da">Unsplash photo a126e7c304da</a></li>
        <li><a href="https://unsplash.com/photos/00edc5efb203">Unsplash photo 00edc5efb203</a></li>
        <li><a href="https://unsplash.com/photos/9aef10b6d4bf">Unsplash photo 9aef10b6d4bf</a></li>
        <li><a href="https://unsplash.com/photos/4a5fc4dee331">Unsplash photo 4a5fc4dee331</a></li>
        <li><a href="https://unsplash.com/photos/68d30af35fd0">Unsplash photo 68d30af35fd0</a></li>
        <li><a href="https://unsplash.com/photos/a8e83d65bb06">Unsplash photo a8e83d65bb06</a></li>
      </ul>
    </section>
    <div class="wl-modal" id="wlModal" aria-hidden="true">
      <div class="wl-modal__backdrop" id="wlModalBackdrop"></div>
      <div class="wl-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="wlModalTitle">
        <div class="wl-modal__header">
          <div>
            <div class="wl-modal__id" id="wlModalId">W-000</div>
            <h2 id="wlModalTitle">プレビュー</h2>
          </div>
          <button class="wl-modal__close" type="button" id="wlModalClose" aria-label="閉じる">×</button>
        </div>
        <div class="wl-modal__body">
          <div class="wl-modal__preview" id="wlModalPreview"></div>
          <div class="wl-modal__meta">
            <h3>詳細</h3>
            <p id="wlModalDesc"></p>
            <div class="wl-modal__tags" id="wlModalTags"></div>
          </div>
        </div>
        <div class="wl-modal__footer">
          <button class="wl-btn ghost" type="button" id="wlModalHover" aria-pressed="false">Hover切替</button>
          <button class="wl-btn ghost" type="button" id="wlModalCopy">IDコピー</button>
          <button class="wl-btn primary" type="button" id="wlModalCloseSecondary">閉じる</button>
        </div>
      </div>
    </div>
  </div>
</div>
