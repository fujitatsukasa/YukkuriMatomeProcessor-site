---
layout: page
title: 使い方
subtitle: ゆっくりまとめプロセッサーの操作ガイド
---

<style>
  /* Google Fonts の読み込み */
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

  /* ★★★ ページ全体の背景とカード風デザイン ★★★ */
  body {
    background: #f7f8fa; /* ページ全体の背景色をやや明るいグレーに */
    margin: 0;
    padding: 0;
  }
  .page-content {
    font-family: 'Roboto', sans-serif;
    max-width: 900px;
    margin: 0 auto;
    padding: 1.5em;
    color: #333;
    line-height: 1.6;
    background: #fff; /* 白背景でカード風 */
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    border-radius: 12px;
  }

  /* ★★★ 虹色ライン (hr) ★★★ */
  hr {
    border: none;
    height: 4px;  /* ちょっと太め */
    margin: 2em 0;
    border-radius: 2px;
    background: linear-gradient(to right, #007BFF, #28A745, #FFC107, #DC3545);
    box-shadow: 0 0 8px rgba(0,0,0,0.15);
  }

  /* ★★★ 注意書き（.notice） ★★★ */
  .notice {
    background: #fff3cd;
    border: 1px solid #ffeeba;
    border-radius: 8px;
    padding: 1em;
    margin-bottom: 1.5em;
    color: #856404;
    text-align: center;
    white-space: pre-line;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  /* 「※初期設定※」用のスタイル */
  .initial-setting {
    font-size: 1.5em;
    font-weight: bold;
    margin-top: 0.5em;
  }

  /* ★★★ 目次 (TOC) をカード風に ★★★ */
  .toc {
    background: #f0f8ff;
    border: 1px solid #007BFF;
    border-radius: 8px;
    padding: 1em 1.2em;
    margin-bottom: 2em;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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
  .toc li.toc-h2 {
    font-weight: bold;
    color: #0056b3;
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

  /* ★★★ 見出し (セクションタイトル) ★★★ */
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
    margin: 1em 0 0.5em;
    color: #444;
    text-align: center;
  }

  /* セクションの本文 */
  .section-content p {
    text-align: center;
    margin: 0.8em 0;
  }

  /* ★★★ YouTube埋め込み用 ★★★ */
  .video-container {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 アスペクト比 */
    padding-top: 25px;
    height: 0;
    margin: 1em 0;
  }
  .video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  /* ★★★ カードスタイル (.subsection-card) ★★★ */
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

  /* ★★★ リンクのホバーエフェクト ★★★ */
  a {
    color: #007BFF;
    text-decoration: none;
    transition: color 0.3s ease, text-shadow 0.3s ease;
  }
  a:hover {
    color: #0056b3;
    text-shadow: 0 0 3px rgba(0,123,255,0.5);
  }
</style>

<div class="page-content">

  <!-- 注意書き（起動時のショートカットについて） -->
  <div class="notice">
    起動時にYMM4のショートカット「台本ファイルを開く」がF2キーに割り当てされます。
  </div>

  <!-- 初期設定の注意書き -->
  <div class="notice">
    <div class="initial-setting">※初期設定※</div>
    一番最初に「台本編集」の設定【YMM4パス】で
    YukkuriMovieMaker.exeのパスを通してから台本取得してください。
  </div>

  <!-- 目次 (TOC) -->
  <div class="toc">
    <h3>目次</h3>
    <ul>
      <li class="toc-h2"><a href="#script-retrieval">台本取得</a></li>
      <li class="toc-h2"><a href="#script-editing">台本編集</a></li>
    </ul>
  </div>

  <hr>

  <!-- セクション: 台本取得 -->
  <div id="script-retrieval" class="section-content">
    <h2 class="section-title">台本取得</h2>
    <div class="subsection-card">
      <div class="video-container">
        <iframe src="https://www.youtube.com/embed/E97yjZgjK8c" title="台本取得解説動画" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    </div>
  </div>

  <!-- セクション: 台本編集 -->
  <div id="script-editing" class="section-content">
    <h2 class="section-title">台本編集</h2>
    <div class="subsection-card">
      <div class="video-container">
        <iframe src="https://www.youtube.com/embed/oNdAwpbjFPI" title="台本編集解説動画" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    </div>
  </div>

</div>
