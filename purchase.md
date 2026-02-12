---
layout: brand-page
title: 購入
subtitle: プレミアムLicense（買い切り）と継続課金プラン準備状況
permalink: /purchase/
nav_key: purchase
schema_type: purchase
seo_title: 購入・料金 | ゆっくりまとめプロセッサー
seo_description: プレミアムLicenseの買い切り販売条件と、継続課金プランの準備状況を案内しています。
seo_keywords: 料金, 購入, プレミアムLicense, 契約確認, 支払方法
seo_image: /assets/showcase/premium/images/office-luxury-33342702.jpg
---
{% assign legal = site.data.legal %}
{% assign org = legal.organization %}
{% capture legal_contact_note %}販売事業者: {{ org.seller_name }} / 連絡先: {{ org.email }}{% endcapture %}

<section class="brand-section">
  <div class="brand-shell">
    <p class="brand-kicker">Purchase</p>
    <h1>購入前に契約条件を確認する</h1>
    <p class="brand-lead">
      プレミアムLicenseの販売価格は {{ legal.pricing.amount_including_tax }}（買い切り）です。
      {{ legal.pricing.subscription_notice }}
      支払条件、提供時期、返金条件を確認し、不明点を解消したうえでお申し込みください。
    </p>
    <div class="brand-inline-actions">
      <a class="brand-btn brand-btn--primary" href="/contact/">購入について問い合わせる</a>
      <a class="brand-btn brand-btn--ghost" href="/faq/#faq-purchase">購入FAQを見る</a>
    </div>
    <nav class="flow-links" aria-label="関連ページ">
      <a href="/download/">先にダウンロードする</a>
      <a href="/instructions/">次: 使い方を確認</a>
      <a href="/faq/">次: FAQを確認</a>
      <a href="/legal/commercial-transactions/">契約条件の法務表記</a>
    </nav>
  </div>
</section>

<section class="brand-section brand-section--alt">
  <div class="brand-shell brand-grid brand-grid--2">
    <article class="release-panel premium-glass">
      <h2>購入前の重要事項</h2>
      <p>以下の要点を確認し、疑問が残る場合は購入前にお問い合わせください。</p>
      <dl class="purchase-summary">
        <div>
          <dt>価格表示</dt>
          <dd>{{ legal.pricing.product_name }}: {{ legal.pricing.amount_including_tax }}</dd>
        </div>
        <div>
          <dt>販売モデル</dt>
          <dd>{{ legal.pricing.model_label }}<br>{{ legal.pricing.subscription_notice }}</dd>
        </div>
        <div>
          <dt>支払方法・時期</dt>
          <dd>{% for method in legal.payment.methods %}{{ method }}{% unless forloop.last %}, {% endunless %}{% endfor %}<br>{{ legal.payment.timing }}</dd>
        </div>
        <div>
          <dt>支払期限・未払い時の扱い</dt>
          <dd>
            {% for item in legal.payment.deadline_rules %}
            {{ item.method }}: {{ item.limit }}{% unless forloop.last %}<br>{% endunless %}
            {% endfor %}
            <br>{{ legal.payment.unpaid_policy }}
          </dd>
        </div>
        <div>
          <dt>提供時期</dt>
          <dd>{{ legal.delivery.timing }}</dd>
        </div>
        <div>
          <dt>返金・キャンセル</dt>
          <dd>{{ legal.refund.summary }}</dd>
        </div>
      </dl>
      {% include legal-links.html title="契約前に確認する情報" compact=true note=legal_contact_note %}
    </article>
    <article class="price-card price-card--featured">
      <h2>{{ legal.pricing.product_name }}</h2>
      <p class="price">{{ legal.pricing.amount_including_tax }} <small>{{ legal.pricing.model_label }}</small></p>
      <ul class="brand-list">
        <li>対象商品: {{ legal.pricing.product_name }}</li>
        <li>販売価格: {{ legal.pricing.amount_including_tax }}</li>
        <li>提供中: 買い切りライセンス</li>
        <li>準備中: {{ legal.pricing.subscription_preparing_label }}</li>
        <li>商品代金以外: {{ legal.pricing.additional_fees }}</li>
        <li>引渡時期: {{ legal.delivery.timing }}</li>
      </ul>
      <div class="brand-inline-actions">
        <a class="brand-btn brand-btn--ghost" href="/download/">先に試用する</a>
        <a class="brand-btn brand-btn--ghost" href="/news/">準備状況をお知らせで確認</a>
      </div>
    </article>
  </div>
</section>

<section class="brand-section">
  <div class="brand-shell brand-grid brand-grid--2">
    <article class="release-panel premium-glass">
      <h2>購入手続き</h2>
      <ol class="brand-list">
        <li>お問い合わせから購入希望を連絡</li>
        <li>契約条件・支払方法・提供時期の最終確認</li>
        <li>手続き完了後、利用案内を受領</li>
      </ol>
      <div class="brand-inline-actions" style="margin-top: 0.8rem;">
        <a class="brand-btn brand-btn--primary" href="/contact/">購入について問い合わせる</a>
      </div>
    </article>

    <article class="release-panel premium-glass">
      <h2>継続課金プラン（準備中）と連絡先</h2>
      <p class="brand-lead" style="margin-top: 0;">{{ legal.pricing.subscription_notice }}</p>
      <ul class="brand-list">
        <li>販売事業者: {{ org.seller_name }}</li>
        <li>連絡先: <a href="mailto:{{ org.email }}">{{ org.email }}</a></li>
        <li>電話: {{ org.phone }}</li>
        <li>受付時間: {{ legal.support.operation_hours }}</li>
      </ul>
      <div class="brand-inline-actions">
        <a class="brand-btn brand-btn--ghost" href="/news/">お知らせを確認</a>
        <a class="brand-btn brand-btn--ghost" href="/contact/">お問い合わせ</a>
      </div>
    </article>
  </div>
</section>
