---
layout: brand-page
title: お知らせ
subtitle: 最新情報と運用アップデート
permalink: /news/
nav_key: news
schema_type: news
seo_title: お知らせ | ゆっくりまとめプロセッサー
seo_description: 台本取得・整形・YMM4連携準備など、ゆっくりまとめプロセッサー本体の機能更新と運用告知を確認できます。
seo_keywords: お知らせ, 更新情報, リリース, サポート
seo_image: /assets/showcase/premium/images/gold-bokeh-29735307.jpg
---

<section class="brand-section">
  <div class="brand-shell">
    <p class="brand-kicker">Newsroom</p>
    <h1>最新のお知らせ</h1>
    <p class="brand-lead">公開日・要約・詳細リンクを時系列で確認できます。台本取得・整形・編集準備の改善点を中心に掲載します。</p>
    <nav class="flow-links" aria-label="関連ページ">
      <a href="/update/">次: 更新履歴を確認</a>
      <a href="/download/">次: ダウンロードへ進む</a>
      <a href="/faq/">次: FAQを確認</a>
      <a href="/contact/">不明点はお問い合わせ</a>
    </nav>
  </div>
</section>

<section class="brand-section brand-section--alt">
  <div class="brand-shell">
    {% assign news_posts = site.categories.news | sort: "date" | reverse %}
    {% if news_posts and news_posts.size > 0 %}
    <ol class="timeline">
      {% for post in news_posts %}
      <li class="timeline-item premium-glass">
        <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%Y年%m月%d日" }}</time>
        <h2><a href="{{ post.url | relative_url }}">{{ post.title | strip_html }}</a></h2>
        {% if post.subtitle %}
        <p>{{ post.subtitle | strip_html }}</p>
        {% endif %}
        <p>{{ post.excerpt | strip_html | truncate: 170 }}</p>
        <div class="brand-inline-actions">
          <a class="brand-btn brand-btn--ghost" href="{{ post.url | relative_url }}">詳細を見る</a>
        </div>
      </li>
      {% endfor %}
    </ol>
    {% else %}
    <article class="brand-card premium-glass">
      <h2>現在お知らせはありません</h2>
      <p>新しい更新情報はこのページで公開します。急ぎの相談はお問い合わせをご利用ください。</p>
    </article>
    {% endif %}
  </div>
</section>

<section class="brand-section">
  <div class="brand-shell brand-grid brand-grid--2">
    <article class="brand-card premium-glass">
      <h2>機能確認ページ</h2>
      <ul class="brand-list">
        <li><a href="/update/">アップデート履歴</a>: 変更内容の時系列確認</li>
        <li><a href="/faq/">FAQ</a>: 導入・運用時の疑問解消</li>
      </ul>
    </article>
    <article class="brand-card premium-glass">
      <h2>次アクション</h2>
      <div class="brand-inline-actions">
        <a class="brand-btn brand-btn--primary" href="/download/">無料トライアルを開始</a>
        <a class="brand-btn brand-btn--ghost" href="/contact/">お問い合わせ</a>
      </div>
    </article>
  </div>
</section>
