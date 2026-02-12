---
layout: brand-page
title: 利用規約
subtitle: サービス利用に関する契約条件
permalink: /legal/terms/
schema_type: legal
seo_title: 利用規約 | ゆっくりまとめプロセッサー
seo_description: ゆっくりまとめプロセッサーの利用条件、禁止事項、免責、準拠法・管轄を定める利用規約です。
seo_keywords: 利用規約, サービス利用条件, 免責, 準拠法
seo_image: /assets/showcase/aurora/hallway.jpg
---

{% assign legal = site.data.legal %}

<section class="brand-section">
  <div class="brand-shell legal-page legal-page--narrow">
    <p class="brand-kicker">Terms</p>
    <h1>利用規約</h1>
    <p class="brand-lead">本規約は、ゆっくりまとめプロセッサーの利用条件を定めるものです。</p>
    <p class="legal-updated">最終更新日: {{ legal.meta.terms_last_updated }}</p>

    <h2>第1条（適用）</h2>
    <p>本規約は、当社が提供する本サービスの利用に関する一切の関係に適用されます。</p>

    <h2>第2条（利用許諾）</h2>
    <p>利用者は、購入またはトライアル開始時点で本規約に同意したものとみなします。許諾範囲は当社が明示する利用形態に限られます。</p>

    <h2>第3条（禁止事項）</h2>
    <ul class="brand-list">
      <li>法令または公序良俗に反する行為</li>
      <li>本サービスのリバースエンジニアリング、再配布、無断転載</li>
      <li>不正アクセス、システムに過度な負荷を与える行為</li>
      <li>第三者の権利・利益を侵害する行為</li>
    </ul>

    <h2>第4条（サービス停止・変更）</h2>
    <p>当社は、保守、障害対応、法令対応などのため、事前通知のうえ、または緊急時には通知なくサービス内容を変更・停止することがあります。</p>

    <h2>第5条（免責）</h2>
    <p>当社は、本サービスの中断、停止、データ消失等によって利用者に生じた損害について、法令上許される範囲で責任を負いません。ただし当社の故意または重過失による場合を除きます。</p>

    <h2>第6条（規約変更）</h2>
    <p>当社は、必要に応じて本規約を変更できます。変更後の規約は、本ページへの掲載時点から効力を生じます。</p>

    <h2>第7条（準拠法・管轄）</h2>
    <p>本規約の準拠法は{{ legal.terms.governing_law }}とし、本サービスに関して紛争が生じた場合は{{ legal.terms.jurisdiction }}とします。</p>

    {% include legal-links.html title="関連ポリシー" compact=true %}
  </div>
</section>
