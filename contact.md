---
layout: page
title: お問い合わせ
subtitle: お気軽にお問い合わせください
---

<style>
  /* Google Fonts の読み込み */
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

  /* 全体の基本設定 */
  .page-content {
    font-family: 'Roboto', sans-serif;
    max-width: 800px;
    margin: 0 auto;
    padding: 1.5em;
    color: #333;
    line-height: 1.6;
  }
  h2.section-title {
    text-align: center;
    font-size: 2em;
    margin-bottom: 0.5em;
    color: #222;
    border-bottom: 2px solid #007BFF;
    padding-bottom: 0.3em;
  }
  /* 問い合わせフォーム */
  .contact-form {
    background: #f8f8f8;
    border: 1px solid #ccc;
    padding: 1.5em;
    border-radius: 8px;
    margin-bottom: 2em;
  }
  .contact-form label {
    display: block;
    margin: 1em 0 0.5em;
    font-weight: 500;
  }
  .contact-form input,
  .contact-form textarea,
  .contact-form input[type="file"] {
    width: 100%;
    padding: 0.8em;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .contact-form button {
    margin-top: 1em;
    padding: 0.8em 1.2em;
    background-color: #007BFF;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  .contact-form button:hover {
    background-color: #0056b3;
  }
  /* 添付ファイルに関する注意 */
  .file-note {
    font-size: 0.9em;
    color: #777;
    margin-top: 0.5em;
  }
  /* その他の連絡手段 */
  .other-contacts {
    text-align: center;
    margin-top: 2em;
    padding: 1em;
    border: 1px solid #007BFF;
    background-color: #f0f8ff;
    border-radius: 8px;
  }
  .other-contacts h3 {
    font-size: 1.6em;
    color: #007BFF;
    margin-bottom: 0.5em;
  }
  .other-contacts ul {
    list-style: none;
    padding-left: 0;
    margin: 0;
  }
  .other-contacts li {
    margin: 0.8em 0;
    font-size: 1em;
  }
  .other-contacts a {
    text-decoration: underline;
    color: #007BFF;
    font-weight: 500;
    transition: color 0.3s ease;
  }
  .other-contacts a:hover {
    color: #0056b3;
  }
</style>

<div class="page-content">
  <h2 class="section-title">お問い合わせ</h2>
  <p style="text-align: center;">下記のフォームまたは各連絡手段から、お気軽にご連絡ください。</p>

  <!-- メールフォーム (Formspree を利用) -->
  <div class="contact-form">
    <form action="https://formspree.io/f/yourFormID" method="POST" enctype="multipart/form-data">
      <label for="name">お名前</label>
      <input type="text" id="name" name="name" required>

      <label for="email">メールアドレス</label>
      <input type="email" id="email" name="_replyto" required>

      <label for="message">お問い合わせ内容</label>
      <textarea id="message" name="message" rows="6" required></textarea>

      <label for="attachment">画像または映像の添付（任意）（zipファイル推奨）</label>
      <input type="file" id="attachment" name="attachment" accept="image/*,video/*">
      <p class="file-note">
        ※ファイルサイズが大きい場合は、自動でアップロードできません。<br>
        その場合は、<a href="https://gigafile.nu" target="_blank">ギガファイル便</a>をご利用ください。
      </p>

      <button type="submit">送信する</button>
    </form>
  </div>

  <!-- その他の連絡手段 -->
  <div class="other-contacts">
    <h3>その他の連絡手段</h3>
    <ul>
      <li>
        <strong>メール:</strong> 
        <a href="mailto:fujita.otm@gmail.com">https://mailto:fujita.otm@gmail.com</a>
      </li>
      <li>
        <strong>Twitter:</strong> 
        <a href="https://x.com/OTM_corp" target="_blank">https://x.com/OTM_corp</a>
      </li>
      <li>
        <strong>Discord:</strong> 
        <a href="https://discordapp.com/users/762244902124912695" target="_blank">https://discordapp.com/users/762244902124912695</a>
      </li>
    </ul>
  </div>
</div>
