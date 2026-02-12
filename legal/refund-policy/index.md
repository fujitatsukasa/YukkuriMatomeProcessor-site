---
layout: brand-page
title: 返金・キャンセルポリシー
subtitle: デジタル商品における返金条件
permalink: /legal/refund-policy/
schema_type: legal
seo_title: 返金・キャンセルポリシー | ゆっくりまとめプロセッサー
seo_description: デジタル商品の返金、キャンセル、解約に関する条件と申請手順を掲載しています。
seo_keywords: 返金ポリシー, キャンセル, 解約, デジタル商品
seo_image: /assets/showcase/aurora/color-grade.jpg
---

{% assign legal = site.data.legal %}
{% assign org = legal.organization %}

<section class="brand-section">
  <div class="brand-shell legal-page legal-page--narrow">
    <p class="brand-kicker">Refund Policy</p>
    <h1>返金・キャンセルポリシー</h1>
    <p class="brand-lead">本ポリシーは、{{ legal.pricing.product_name }}の購入契約成立後に適用される返金・キャンセル条件を定めるものです。</p>
    <p class="legal-updated">最終更新日: {{ legal.meta.refund_last_updated }}</p>

    <h2>1. 基本方針</h2>
    <p>{{ legal.refund.summary }}</p>

    <h2>2. 例外的な返金対応</h2>
    <p>{{ legal.refund.defective_response }}</p>
    <p>{{ legal.refund.procedure }}</p>
    <ul class="brand-list">
      <li>{{ legal.refund.defect_claim_deadline }}</li>
      <li>{{ legal.refund.remedy_policy }}</li>
      <li>{{ legal.refund.refund_method }}</li>
      <li>{{ legal.refund.refund_fee_burden }}</li>
    </ul>

    <h2>3. キャンセル・解約</h2>
    <p>{{ legal.cancellation.subscription }}</p>

    <h2>4. 申請窓口</h2>
    <ul class="brand-list">
      <li>メール: <a href="mailto:{{ org.email }}">{{ org.email }}</a></li>
      <li>電話: {{ org.phone }}</li>
      <li>受付時間: {{ org.business_hours }}</li>
    </ul>

    <div class="notice-box" style="margin-top: 1rem;">
      <h2>重要事項</h2>
      <p>購入前に必ず「利用規約」「特定商取引法に基づく表記」を確認してください。購入手続き完了をもって、これらの内容に同意したものとみなされます。</p>
    </div>

    {% include legal-links.html title="関連ポリシー" compact=true %}
  </div>
</section>
