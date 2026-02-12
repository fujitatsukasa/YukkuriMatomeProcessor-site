---
layout: brand-page
title: お問い合わせ
subtitle: 導入相談・不具合報告・運用相談
permalink: /contact/
nav_key: contact
schema_type: contact
seo_title: お問い合わせ | ゆっくりまとめプロセッサー
seo_description: 連絡手段、問い合わせ時に必要な情報、対応目安、法務情報をまとめたお問い合わせページです。
seo_keywords: お問い合わせ, サポート, 導入相談, 不具合報告, 特商法
seo_image: /assets/showcase/premium/images/workspace-computer-6044911.jpg
---
{% assign legal = site.data.legal %}

<section class="brand-section">
  <div class="brand-shell">
    <p class="brand-kicker">Contact</p>
    <h1>お問い合わせ窓口</h1>
    <p class="brand-lead">
      連絡先はメールとXを中心に、Discord・Chatworkでも受け付けています。
      先に必要情報を添えると、回答までの時間を短縮できます。
    </p>

    <div class="contact-channels contact-channels--cards">
      <article class="channel premium-glass">
        <h2>メール</h2>
        <p><a href="mailto:fujita.otm@gmail.com">fujita.otm@gmail.com</a></p>
        <p>契約条件、請求、不具合の詳細共有など、記録を残したい問い合わせ向けです。</p>
      </article>
      <article class="channel premium-glass">
        <h2>X (Twitter)</h2>
        <p><a href="https://x.com/OTM_corp" target="_blank" rel="noopener noreferrer">@OTM_corp</a></p>
        <p>告知確認や短い質問に向いています。</p>
      </article>
      <article class="channel premium-glass">
        <h2>Discord</h2>
        <p><a href="https://discordapp.com/users/762244902124912695" target="_blank" rel="noopener noreferrer">Discordで連絡</a></p>
        <p>リアルタイムで相談したい場合に向いています。</p>
      </article>
      <article class="channel premium-glass">
        <h2>Chatwork</h2>
        <p><a href="https://www.chatwork.com/fujita_otm" target="_blank" rel="noopener noreferrer">Chatworkで連絡</a></p>
        <p>業務連絡や継続的なやり取り向けです。</p>
      </article>
    </div>

    <nav class="flow-links" aria-label="関連ページ">
      <a href="/download/">先にダウンロードする</a>
      <a href="/instructions/">次: 使い方を確認</a>
      <a href="/faq/">次: FAQを確認</a>
      <a href="/purchase/">次: 購入条件を確認</a>
      <a href="/legal/commercial-transactions/">法務情報を確認</a>
    </nav>
  </div>
</section>

<section class="brand-section brand-section--alt">
  <div class="brand-shell brand-grid brand-grid--2">
    <article class="notice-box">
      <h2>問い合わせ時に必要な情報</h2>
      <ul class="brand-list">
        <li>利用OSとバージョン</li>
        <li>再現手順（時系列）</li>
        <li>エラーメッセージ全文</li>
        <li>発生頻度と回避可否</li>
      </ul>
    </article>
    <article class="notice-box">
      <h2>対応目安</h2>
      <ul class="brand-list">
        <li>受付時間: {{ legal.support.operation_hours }}</li>
        <li>一次回答: {{ legal.support.first_response_sla }}</li>
        <li>休業日の問い合わせは翌営業日以降に順次対応</li>
      </ul>
    </article>
  </div>
</section>

<section class="brand-section">
  <div class="brand-shell brand-grid brand-grid--2">
    <article class="notice-box">
      <h2>法務情報の確認</h2>
      <p>購入前に確認すべき契約条件、返金条件、個人情報の取り扱いをまとめています。</p>
      {% include legal-links.html title=false compact=true %}
    </article>
    <article class="notice-box">
      <h2>法務問い合わせ</h2>
      <ul class="brand-list">
        <li>契約条件・請求に関する問い合わせ: メール推奨</li>
        <li>銀行振込・PayPal購入希望: メールで個別案内</li>
        <li>{{ legal.payment.bank_account_policy }}</li>
      </ul>
    </article>
  </div>
</section>
