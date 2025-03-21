---
layout: page
title: アップデート履歴
subtitle: 最新リリースのリリースノート一覧
---

<style>
  /* Google Fonts の読み込み */
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

  /* ★★★ ページ全体の背景を明るいグレーにし、カード風に ★★★ */
  body {
    background: #f7f8fa; /* ページ全体の背景色をやや明るいグレーに */
    margin: 0;
    padding: 0;
  }
  /* ★★★ ページ本体 .page-content をカード風に ★★★ */
  .page-content {
    font-family: 'Roboto', sans-serif;
    max-width: 1200px !important; /* 横幅を 1200px に拡大 */
    margin: 0 auto;
    padding: 1.5em;
    color: #333;
    line-height: 1.6;
    background: #fff; /* 白背景でカード風 */
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    border-radius: 12px;
    text-align: center;
  }

  /* ★★★ 区切り線 (hr) を虹色に ★★★ */
  hr {
    border: none;
    height: 4px;  /* ちょっと太め */
    margin: 2em 0;
    border-radius: 2px;
    background: linear-gradient(to right, #007BFF, #28A745, #FFC107, #DC3545);
    box-shadow: 0 0 8px rgba(0,0,0,0.15);
  }

  /* 目次 (TOC) カード風にしてもOKなら下記スタイルを適用 */
  .toc {
    background: #f0f8ff;
    border: 1px solid #007BFF;
    border-radius: 8px;
    padding: 1em 1.2em;
    margin-bottom: 2em;
    text-align: center; /* 内部は左寄せ */
  }
  .toc h3 {
    margin: 0;
    font-size: 1.6em;
    color: #007BFF;
    border-bottom: 1px dashed #007BFF;
    padding-bottom: 0.3em;
    text-align: center;
  }
  .toc ul {
    list-style: none;
    padding-left: 0;
    margin: 1em 0 0 0;
  }
  .toc li {
    margin: 0.5em 0;
  }
  .toc a {
    text-decoration: none;
    color: #007BFF;
    font-weight: 500;
    transition: color 0.3s ease;
  }
  .toc a:hover {
    color: #0056b3;
    text-decoration: underline;
  }

  /* ★★★ アップデート（リリース）セクションのカード風 ★★★ */
  .release-section {
    margin-bottom: 2.5em;
    border-bottom: 1px solid #ddd;
    padding-bottom: 1em;
    background: #f9f9ff;
    box-shadow: 0 2px 6px rgba(0,0,0,0.05);
    border-radius: 8px;
    padding: 1.5em;
    text-align: left; /* リリース情報は左寄せ推奨 */
    margin-top: 2em;
  }

  /* リリースタイトルを中央寄せしたい場合は text-align:center; に */
  .release-title {
    font-size: 1.8em;
    text-align: center;
    margin-bottom: 0.3em;
    color: #222;
    position: relative;
    display: inline-block;
    padding-bottom: 0.2em;
    margin-top: 0;
  }
  /* 虹色下線を少し太めに */
  .release-title::after {
    content: "";
    display: block;
    width: 50%;
    height: 3px;
    background: linear-gradient(to right, #007BFF, #28A745, #FFC107, #DC3545);
    margin: 0.4em auto 0;
    border-radius: 2px;
  }

  .release-date {
    text-align: center;
    font-size: 0.9em;
    color: #777;
    margin-bottom: 1em;
  }
  /* リリースノート本文 */
  .release-note {
    margin: 1em auto;
    padding: 1em;
    background: #fafafa;
    border: 1px solid #eee;
    border-radius: 8px;
    max-width: 1000px; /* 幅を限定 */
  }

  /* リリースノート内リンクの装飾 */
  .release-note a {
    color: #007BFF;
    text-decoration: none;
  }
  .release-note a:hover {
    text-decoration: underline;
  }

  /* メディアクエリで小さな画面用に調整 */
  @media (max-width: 768px) {
    .release-title {
      font-size: 1.5em;
    }
    .release-title::after {
      width: 70%;
      height: 2px;
    }
    .release-note {
      max-width: 90%;
    }
  }
</style>

<!-- marked.js の読み込み（Markdown → HTML 用） -->
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>

<div class="page-content">
  
  <!-- 目次 (TOC) -->
  <div class="toc">
    <h3>目次</h3>
    <ul id="update-toc">
      <li>ロード中…</li>
    </ul>
  </div>

  <hr>

  <!-- リリース情報表示エリア -->
  <div id="updates">
    ロード中…
  </div>

</div>

<script>
  // GitHub のリポジトリ情報
  const owner = 'fujitatsukasa';
  const repo = 'YukkuriMatomeProcessor';
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/releases`;

  // ヘルパー関数: 日付を整形 (YYYY-MM-DD)
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  fetch(apiUrl)
    .then(response => response.json())
    .then(releases => {
      const tocEl = document.getElementById('update-toc');
      const updatesEl = document.getElementById('updates');
      
      // クリア
      tocEl.innerHTML = '';
      updatesEl.innerHTML = '';

      if (!Array.isArray(releases) || releases.length === 0) {
        tocEl.innerHTML = '<li>リリース情報がありません。</li>';
        updatesEl.innerHTML = '<p>リリース情報がありません。</p>';
        return;
      }
      
      // 各リリースを降順（最新順）に表示
      releases.forEach((release, idx) => {
        // 各リリースのセクションID（tag_name or id）
        const releaseId = 'release-' + (release.tag_name || release.id);
        
        // 目次項目の生成
        const li = document.createElement('li');
        li.innerHTML = `<a href="#${releaseId}">${release.name || release.tag_name} (${formatDate(release.published_at)})</a>`;
        tocEl.appendChild(li);
        
        // リリースセクションの生成（カード風）
        const section = document.createElement('div');
        section.className = 'release-section';
        section.id = releaseId;
        
        // タイトルと日付
        const title = document.createElement('h2');
        title.className = 'release-title';
        title.textContent = release.name || release.tag_name;
        section.appendChild(title);
        
        const dateEl = document.createElement('div');
        dateEl.className = 'release-date';
        dateEl.textContent = formatDate(release.published_at);
        section.appendChild(dateEl);
        
        // リリースノート (Markdown → HTML via marked.js)
        const note = document.createElement('div');
        note.className = 'release-note';
        const markdown = release.body || 'リリースノートはありません。';
        note.innerHTML = marked.parse(markdown);
        section.appendChild(note);
        
        // セクションを追加
        updatesEl.appendChild(section);

        // リリース間の区切り線を挿入（もし必要なら）
        if (idx < releases.length - 1) {
          // ここに <hr> を挿入したければ追加
          // const hr = document.createElement('hr');
          // updatesEl.appendChild(hr);
        }
      });
    })
    .catch(error => {
      document.getElementById('update-toc').innerHTML = '<li>リリース情報の取得に失敗しました。</li>';
      document.getElementById('updates').innerHTML = '<p>リリース情報の取得に失敗しました。</p>';
      console.error(error);
    });
</script>
