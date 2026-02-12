---
layout: brand-page
title: 使い方
subtitle: 最短で立ち上げるための操作ガイド
permalink: /instructions/
nav_key: instructions
schema_type: software
seo_title: 使い方ガイド | ゆっくりまとめプロセッサー
seo_description: 初期設定、台本取得、編集開始、失敗時の対処、開発者向けローカル実行手順をまとめた公式ガイドです。
seo_keywords: 使い方, 初期設定, 台本取得, ローカルプレビュー, Jekyll, VSCode
seo_image: /assets/showcase/premium/images/vertical-monitor-15249470.jpg
---

<section class="brand-section">
  <div class="brand-shell">
    <p class="brand-kicker">Onboarding Guide</p>
    <h1>初期設定から編集開始までを3ステップで進める</h1>
    <p class="brand-lead">
      目的は、最短で安定運用に入ることです。
      「初期設定 → 台本取得 → 編集開始」の順で進め、最後に失敗例を確認してください。
    </p>
    <div class="brand-grid brand-grid--3">
      <article class="brand-card premium-glass">
        <h2>STEP 1 初期設定</h2>
        <p><code>YukkuriMovieMaker.exe</code> の実行パスと台本保存先を固定します。</p>
      </article>
      <article class="brand-card premium-glass">
        <h2>STEP 2 台本取得</h2>
        <p>対象URLから記事を選択し、編集用に整形済み台本を作成します。</p>
      </article>
      <article class="brand-card premium-glass">
        <h2>STEP 3 編集開始</h2>
        <p>整形結果を確認し、YMM4への受け渡しと編集作業へ進みます。</p>
      </article>
    </div>
    <nav class="flow-links" aria-label="関連ページ">
      <a href="/download/">先にダウンロードする</a>
      <a href="/faq/">次: FAQを確認</a>
      <a href="/purchase/">次: 購入条件を確認</a>
      <a href="/contact/">解決しない場合はお問い合わせ</a>
    </nav>
  </div>
</section>

<section class="brand-section brand-section--alt">
  <div class="brand-shell brand-grid brand-grid--2">
    <article class="brand-card premium-glass">
      <h2>初期設定（必須）</h2>
      <ul class="brand-list">
        <li>YMM4実行ファイルの絶対パスを登録</li>
        <li>台本保存先フォルダを運用単位で固定</li>
        <li>試用中は設定変更内容を記録</li>
        <li>権限エラーを防ぐため、書き込み可能フォルダを利用</li>
      </ul>
    </article>
    <article class="brand-card premium-glass">
      <h2>台本取得</h2>
      <ol class="brand-list">
        <li>対象サイトを選択</li>
        <li>記事一覧を取得</li>
        <li>使用する記事を選択</li>
        <li>台本をダウンロードして整形</li>
      </ol>
    </article>
    <article class="brand-card premium-glass">
      <h2>編集開始前チェック</h2>
      <ul class="brand-list">
        <li>不要行・注釈の除去が完了しているか</li>
        <li>見出しと本文の区切りが崩れていないか</li>
        <li>読み上げ速度・尺の確認をしたか</li>
      </ul>
    </article>
    <article class="brand-card premium-glass">
      <h2>よくある失敗</h2>
      <ul class="brand-list">
        <li>YMM4パス未設定で連携に失敗</li>
        <li>URL形式エラーで台本取得に失敗</li>
        <li>保存先権限不足で出力に失敗</li>
      </ul>
      <div class="brand-inline-actions">
        <a class="brand-btn brand-btn--ghost" href="/faq/#faq-trouble">トラブルFAQへ</a>
      </div>
    </article>
  </div>
</section>

<section class="brand-section">
  <div class="brand-shell">
    <p class="brand-kicker">Developer Notes</p>
    <h2>開発者向けローカル実行（Jekyll）</h2>
    <p class="brand-lead">VSCodeのデバッグ定義を使い、実行ディレクトリずれを防いでください。</p>
    <div class="brand-grid brand-grid--2">
      <article class="notice-box">
        <h3>VSCode デバッグ起動</h3>
        <ul class="brand-list">
          <li>既定プロファイル: <code>Serve: GUI (Default)</code></li>
          <li>フォールバック: <code>Serve: No GUI</code></li>
          <li>F5実行: <code>Serve: GUI (Default)</code>（<code>--gui --open</code>）</li>
          <li>CLI実行: <code>serve_local.cmd --no-gui --open</code></li>
        </ul>
      </article>
      <article class="notice-box">
        <h3>トラブルシュート</h3>
        <ul class="brand-list">
          <li><code>Could not locate Gemfile</code>: 実行ディレクトリをリポジトリ直下へ戻す</li>
          <li><code>'bundle' が見つからない</code>: Ruby/BundlerのPATHを確認して再起動</li>
          <li>ポート競合: 既存Jekyllプロセスを停止して再起動</li>
        </ul>
      </article>
    </div>
  </div>
</section>

<section class="brand-section brand-section--alt">
  <div class="brand-shell brand-grid brand-grid--2">
    <article class="brand-card premium-glass">
      <h2>次アクション</h2>
      <ul class="brand-list">
        <li><a href="/download/">ダウンロード</a>で試用開始</li>
        <li><a href="/faq/">FAQ</a>で失敗例を確認</li>
        <li><a href="/purchase/">購入</a>で契約条件を確認</li>
        <li><a href="/contact/">お問い合わせ</a>で導入相談</li>
      </ul>
    </article>
    <article class="brand-card premium-glass">
      <h2>関連情報</h2>
      <div class="brand-inline-actions">
        <a class="brand-btn brand-btn--ghost" href="/update/">アップデート履歴</a>
        <a class="brand-btn brand-btn--ghost" href="/news/">お知らせ</a>
      </div>
    </article>
  </div>
</section>
