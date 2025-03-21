---
layout: page
title: お問い合わせ
subtitle: お気軽にお問い合わせください
---

<style>
  /* Google Fonts の読み込み */
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

  /* ★ ページ全体の背景を明るいグレーに、ページコンテンツをカード風に ★ */
  body {
    background: #f7f8fa;
    margin: 0;
    padding: 0;
  }
  .page-content {
    font-family: 'Roboto', sans-serif;
    max-width: 800px;
    margin: 0 auto;
    padding: 1.5em;
    color: #333;
    line-height: 1.6;
    background: #fff; /* カード風の背景 */
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    border-radius: 12px;
  }

  /* ★ 虹色ライン (hr) ★ */
  hr {
    border: none;
    height: 4px;
    margin: 2em 0;
    border-radius: 2px;
    background: linear-gradient(to right, #007BFF, #28A745, #FFC107, #DC3545);
    box-shadow: 0 0 8px rgba(0,0,0,0.15);
  }

  /* ★ ページタイトル (h2.section-title) ★ */
  h2.section-title {
    text-align: center;
    font-size: 2em;
    margin-bottom: 0.5em;
    color: #222;
    border-bottom: 2px solid #007BFF;
    padding-bottom: 0.3em;
  }

  /* ★ 「連絡手段」をカード風にまとめる ★ */
  .other-contacts-card {
    background: #f0f8ff;
    border: 1px solid #007BFF;
    border-radius: 8px;
    padding: 1.5em;
    margin-top: 2em;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    text-align: center;
  }
  .other-contacts-card h3 {
    font-size: 1.8em;
    color: #007BFF;
    margin-bottom: 0.8em;
  }
  .other-contacts-card ul {
    list-style: none;
    padding-left: 0;
    margin: 0 auto;
    max-width: 400px; /* 項目の横幅を抑えるなら */
    text-align: left; /* リンクなどは左寄せに */
  }
  .other-contacts-card li {
    margin: 1em 0;
    font-size: 1em;
  }
  .other-contacts-card a {
    color: #007BFF;
    text-decoration: underline;
    font-weight: 500;
    transition: color 0.3s ease;
  }
  .other-contacts-card a:hover {
    color: #0056b3;
  }

  /* ★ 問い合わせ方法のサンプルリストに少し余白を追加 */
  .contact-example {
    margin-top: 1em;
    line-height: 1.8;
  }

  /* リンクのホバーエフェクト（お好みで） */
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
  <h2 class="section-title">お問い合わせ</h2>
  <p style="text-align: center;">
    ご不明な点やご要望がございましたら、以下の連絡手段をご利用ください。
  </p>

  <hr>

  <!-- 連絡手段（カード風） -->
  <div class="other-contacts-card">
    <h3>連絡手段</h3>
    <ul>
      <li>
        <strong>メール:</strong><br>
        <a href="mailto:fujita.otm@gmail.com">fujita.otm@gmail.com</a>
      </li>
      <li>
        <strong>Twitter (X):</strong><br>
        <a href="https://x.com/OTM_corp" target="_blank">https://x.com/OTM_corp</a>
      </li>
      <li>
        <strong>Discord:</strong><br>
        <a href="https://discordapp.com/users/762244902124912695" target="_blank">discordapp.com/users/762244902124912695</a>
      </li>
      <li>
        <strong>Chatwork:</strong><br>
        <a href="https://www.chatwork.com/fujita_otm" target="_blank">https://www.chatwork.com/fujita_otm</a>
      </li>

