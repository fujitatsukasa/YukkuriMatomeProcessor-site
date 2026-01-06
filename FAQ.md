---
layout: page
title: よくある質問
subtitle: FAQ
---

<style>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&family=Inter:wght@400;600;700;800&display=swap');

  * {
    box-sizing: border-box;
  }

  body {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    font-family: 'Noto Sans JP', 'Inter', sans-serif;
    margin: 0;
    padding: 0;
  }

  .page-content {
    max-width: 100%;
    margin: 0;
    padding: 0;
    background: transparent;
    box-shadow: none;
  }

  .hero-section {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 100px 20px 60px;
    text-align: center;
  }

  .hero-section h1 {
    font-size: 3.5em;
    font-weight: 900;
    margin-bottom: 20px;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    color: #ffffff;
  }

  .hero-section p {
    font-size: 1.4em;
    color: #ffffff;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    font-weight: 600;
  }

  .faq-section {
    background: white;
    padding: 80px 20px;
    min-height: 100vh;
  }

  .faq-container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .category-section {
    margin-bottom: 60px;
  }

  .category-title {
    font-size: 2.2em;
    font-weight: 900;
    color: #1a202c;
    margin-bottom: 30px;
    padding-bottom: 15px;
    border-bottom: 4px solid;
    border-image: linear-gradient(90deg, #667eea 0%, #764ba2 100%) 1;
  }

  .faq-item {
    background: linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%);
    border-radius: 15px;
    margin-bottom: 20px;
    border: 2px solid transparent;
    transition: all 0.3s ease;
    overflow: hidden;
  }

  .faq-item:hover {
    border-color: #667eea;
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.2);
  }

  .faq-item[open] {
    border-color: #667eea;
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
  }

  .faq-question {
    font-size: 1.3em;
    font-weight: 800;
    color: #1a202c;
    padding: 25px 30px;
    cursor: pointer;
    list-style: none;
    display: flex;
    align-items: center;
    gap: 15px;
    transition: all 0.3s ease;
  }

  .faq-question:hover {
    background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
  }

  .faq-question::before {
    content: 'Q';
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 900;
    font-size: 1.2em;
    flex-shrink: 0;
  }

  .faq-question::-webkit-details-marker {
    display: none;
  }

  .faq-answer {
    padding: 0 30px 30px 85px;
    color: #2d3748;
    line-height: 1.9;
    font-size: 1.05em;
    font-weight: 500;
  }

  .faq-answer strong {
    color: #1a202c;
    font-weight: 800;
  }

  @media (max-width: 768px) {
    .hero-section h1 {
      font-size: 2.2em;
    }

    .category-title {
      font-size: 1.7em;
    }

    .faq-question {
      font-size: 1.1em;
      padding: 20px;
    }

    .faq-answer {
      padding: 0 20px 20px 65px;
    }
  }
</style>

<div class="hero-section">
  <h1>❓ よくある質問</h1>
  <p>お客様からよく寄せられる質問とその回答</p>
</div>

<div class="faq-section">
  <div class="faq-container">

    <!-- 全般 -->
    <div class="category-section">
      <h2 class="category-title">🔹 全般</h2>

      <details class="faq-item">
        <summary class="faq-question">ソフトウェアの概要は？</summary>
        <div class="faq-answer">
          <p><strong>ゆっくりまとめプロセッサー</strong>は、動画編集の半自動化を実現するツールです。台本・画像・スレッド情報を瞬時に取得して、効率的な動画制作をサポートします。</p>
        </div>
      </details>

      <details class="faq-item">
        <summary class="faq-question">必要な動作環境は？</summary>
        <div class="faq-answer">
          <p>推奨環境は<strong>Windows 10以上</strong>または<strong>macOS 10.15以上</strong>です。最新のブラウザや動画編集ソフトがインストールされていることが望ましいです。</p>
        </div>
      </details>

      <details class="faq-item">
        <summary class="faq-question">利用料金は？</summary>
        <div class="faq-answer">
          <p><strong>7日間の無料トライアル</strong>で全機能をお試しいただけます。継続利用の料金については<a href="/purchase" style="color: #667eea; font-weight: 800;">購入ページ</a>をご確認ください。</p>
        </div>
      </details>

      <details class="faq-item">
        <summary class="faq-question">サポート体制は？</summary>
        <div class="faq-answer">
          <p>メール、Discord、Twitter、Chatworkで<strong>24〜48時間以内</strong>に返信いたします。詳しくは<a href="/contact" style="color: #667eea; font-weight: 800;">お問い合わせページ</a>をご覧ください。</p>
        </div>
      </details>
    </div>

    <!-- 動画編集関連 -->
    <div class="category-section">
      <h2 class="category-title">🎬 動画編集関連</h2>

      <details class="faq-item">
        <summary class="faq-question">動画編集の基本操作は？</summary>
        <div class="faq-answer">
          <p>動画のトリミング、結合、テキスト挿入などの基本操作は、<strong>直感的なUI</strong>で簡単に実行できます。各ボタン操作で迅速に編集できます。</p>
        </div>
      </details>

      <details class="faq-item">
        <summary class="faq-question">編集用テンプレートはありますか？</summary>
        <div class="faq-answer">
          <p>はい、<strong>標準テンプレート</strong>がいくつか用意されています。ユーザー独自のテンプレートも作成・保存可能です。</p>
        </div>
      </details>

      <details class="faq-item">
        <summary class="faq-question">保存形式の推奨は？</summary>
        <div class="faq-answer">
          <p>編集後の動画は、一般的な<strong>MP4形式</strong>が推奨されます。高品質保存のため、ビットレートの調整が可能です。</p>
        </div>
      </details>
    </div>

    <!-- 台本取得・設定 -->
    <div class="category-section">
      <h2 class="category-title">📄 台本取得・設定</h2>

      <details class="faq-item">
        <summary class="faq-question">台本取得は自動で行えますか？</summary>
        <div class="faq-answer">
          <p>はい、サイトやまとめ掲示板から<strong>台本を自動で取得</strong>し、編集に利用できる形式に整形します。取得先は設定で変更可能です。</p>
        </div>
      </details>

      <details class="faq-item">
        <summary class="faq-question">台本はどのように編集できますか？</summary>
        <div class="faq-answer">
          <p>取得した台本は、<strong>内蔵エディタ</strong>で直接編集可能です。また、テンプレート適用機能で自動補正も行えます。</p>
        </div>
      </details>

      <details class="faq-item">
        <summary class="faq-question">自動補完機能はありますか？</summary>
        <div class="faq-answer">
          <p>はい、入力中の台本に対して、<strong>自動補完機能</strong>が搭載されています。キーワードや定型文を自動で提案します。</p>
        </div>
      </details>
    </div>

    <!-- トラブルシューティング -->
    <div class="category-section">
      <h2 class="category-title">🔧 トラブルシューティング</h2>

      <details class="faq-item">
        <summary class="faq-question">エラー発生時の対処法は？</summary>
        <div class="faq-answer">
          <p>エラーメッセージに従い、<strong>システムの再起動</strong>や設定の見直しを行ってください。解決しない場合は、<a href="/contact" style="color: #667eea; font-weight: 800;">サポート</a>にお問い合わせください。</p>
        </div>
      </details>

      <details class="faq-item">
        <summary class="faq-question">ソフトウェアが起動しない場合は？</summary>
        <div class="faq-answer">
          <p>起動しない場合は、システム要件の再確認、ソフトウェアの<strong>再インストール</strong>、または最新アップデートの適用を試みてください。</p>
        </div>
      </details>

      <details class="faq-item">
        <summary class="faq-question">動作が遅い場合の対策は？</summary>
        <div class="faq-answer">
          <p>動作が遅い場合は、<strong>不要なバックグラウンドアプリケーションの停止</strong>、設定の最適化、またはシステムのアップグレードを検討してください。</p>
        </div>
      </details>
    </div>

  </div>
</div>
