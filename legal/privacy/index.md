---
layout: brand-page
title: プライバシーポリシー
subtitle: 個人情報保護方針
permalink: /legal/privacy/
schema_type: legal
seo_title: プライバシーポリシー | ゆっくりまとめプロセッサー
seo_description: ゆっくりまとめプロセッサーにおける個人情報の取得、利用、第三者提供、管理方法を掲載しています。
seo_keywords: プライバシーポリシー, 個人情報保護, Cookie, 解析ツール
seo_image: /assets/showcase/aurora/workstation-dark.jpg
---

{% assign legal = site.data.legal %}
{% assign org = legal.organization %}

<section class="brand-section">
  <div class="brand-shell legal-page legal-page--narrow">
    <p class="brand-kicker">Privacy</p>
    <h1>プライバシーポリシー</h1>
    <p class="brand-lead">当社は、利用者の個人情報を関連法令と社内規程に基づいて適切に取り扱います。</p>
    <p class="legal-updated">最終更新日: {{ legal.meta.privacy_last_updated }}</p>

    <h2>1. 取得する情報</h2>
    <ul class="brand-list">
      <li>問い合わせ時に提供される氏名、メールアドレス、連絡内容</li>
      <li>決済代行会社により処理される決済関連情報</li>
      <li>アクセス解析により収集される閲覧履歴、端末情報、Cookie情報</li>
    </ul>

    <h2>2. 利用目的</h2>
    <ul class="brand-list">
      <li>サービス提供、本人確認、問い合わせ対応</li>
      <li>障害対応、品質改善、新機能の検討</li>
      <li>法令・規約違反行為への対応</li>
    </ul>

    <h2>3. 第三者提供・委託</h2>
    <p>当社は、法令で認められる場合を除き、本人の同意なく個人情報を第三者へ提供しません。決済処理や解析を外部事業者へ委託する場合は、適切に管理します。</p>

    <h2>4. 安全管理措置</h2>
    <p>当社は、個人情報への不正アクセス、漏えい、改ざん、滅失を防止するため、必要かつ適切な安全管理措置を講じます。</p>

    <h2>5. Cookie・解析ツール</h2>
    <p>当サイトでは、利便性向上および利用状況分析のためCookieを利用します。主な解析ツールは以下です。</p>
    <ul class="brand-list">
      {% for tool in legal.privacy.analytics_tools %}
      <li>{{ tool }}</li>
      {% endfor %}
    </ul>

    <h2>6. 開示・訂正・利用停止等</h2>
    <p>個人情報の開示、訂正、利用停止などの請求は、下記窓口へご連絡ください。本人確認のうえ、法令に基づき対応します。</p>
    <ul class="brand-list">
      <li>メール: <a href="mailto:{{ org.email }}">{{ org.email }}</a></li>
      <li>電話: {{ org.phone }}</li>
      <li>受付時間: {{ org.business_hours }}</li>
    </ul>

    {% include legal-links.html title="関連ポリシー" compact=true %}
  </div>
</section>
