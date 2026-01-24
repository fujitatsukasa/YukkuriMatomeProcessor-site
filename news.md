---
layout: page
title: お知らせ
permalink: /news/
---

{% assign news_posts = site.categories.news | sort: "date" | reverse %}
{% if news_posts and news_posts.size > 0 %}
<ul class="posts-list list-unstyled" role="list">
  {% for post in news_posts %}
  <li class="post-preview">
    <article>
      {%- capture thumbnail -%}
        {% if post.thumbnail-img %}
          {{ post.thumbnail-img }}
        {% elsif post.cover-img %}
          {% if post.cover-img.first %}
            {{ post.cover-img[0].first.first }}
          {% else %}
            {{ post.cover-img }}
          {% endif %}
        {% else %}
        {% endif %}
      {% endcapture %}
      {% assign thumbnail=thumbnail | strip %}

      {% if site.feed_show_excerpt == false %}
      {% if thumbnail != "" %}
      <div class="post-image post-image-normal">
        <a href="{{ post.url | absolute_url }}" aria-label="Thumbnail">
          <img src="{{ thumbnail | absolute_url }}" alt="Post thumbnail">
        </a>
      </div>
      {% endif %}
      {% endif %}

      <a href="{{ post.url | absolute_url }}">
        <h2 class="post-title">{{ post.title | strip_html }}</h2>

        {% if post.subtitle %}
          <h3 class="post-subtitle">
          {{ post.subtitle | strip_html }}
          </h3>
        {% endif %}
      </a>

      {% if post.author %}
        <span>By <strong>{{ post.author | strip_html }}</strong></span>
      {% endif %}
      <p class="post-meta">
        {% assign date_format = site.date_format | default: "%B %-d, %Y" %}
        {{ post.date | date: date_format }}
      </p>

      {% if thumbnail != "" %}
      <div class="post-image post-image-small">
        <a href="{{ post.url | absolute_url }}" aria-label="Thumbnail">
          <img src="{{ thumbnail | absolute_url }}" alt="Post thumbnail">
        </a>
      </div>
      {% endif %}

      {% unless site.feed_show_excerpt == false %}
      {% if thumbnail != "" %}
      <div class="post-image post-image-short">
        <a href="{{ post.url | absolute_url }}" aria-label="Thumbnail">
          <img src="{{ thumbnail | absolute_url }}" alt="Post thumbnail">
        </a>
      </div>
      {% endif %}

      <div class="post-entry">
        {% assign excerpt_length = site.excerpt_length | default: 50 %}
        {{ post.excerpt | strip_html | truncatewords: excerpt_length }}
        {% assign excerpt_word_count = post.excerpt | number_of_words %}
        {% if post.content != post.excerpt or excerpt_word_count > excerpt_length %}
          <a href="{{ post.url | absolute_url }}" class="post-read-more">[Read&nbsp;More]</a>
        {% endif %}
      </div>
      {% endunless %}
    </article>
  </li>
  {% endfor %}
</ul>
{% else %}
<p>現在お知らせはありません。</p>
{% endif %}