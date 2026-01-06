---
layout: page
title: アップデート履歴
subtitle: 最新リリースのリリースノート一覧
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

  /* ヒーローセクション */
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
    opacity: 1;
    color: #ffffff;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    max-width: 800px;
    margin: 0 auto;
    font-weight: 600;
  }

  /* リリースセクション */
  .releases-section {
    background: white;
    padding: 80px 20px;
    min-height: 100vh;
  }

  .releases-container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .loading {
    text-align: center;
    padding: 60px 20px;
    font-size: 1.5em;
    color: #667eea;
    font-weight: 700;
  }

  .release-card {
    background: linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%);
    border-radius: 20px;
    padding: 40px;
    margin-bottom: 40px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    border-left: 6px solid #667eea;
    transition: all 0.3s ease;
  }

  .release-card:hover {
    transform: translateX(10px);
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.15);
  }

  .release-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
    flex-wrap: wrap;
    gap: 15px;
  }

  .release-title {
    font-size: 2em;
    font-weight: 900;
    color: #2d3748;
    margin: 0;
  }

  .release-date {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 8px 20px;
    border-radius: 50px;
    font-size: 0.9em;
    font-weight: 700;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  }

  .release-body {
    color: #2d3748;
    line-height: 1.9;
    font-size: 1.05em;
    font-weight: 500;
  }

  .release-body h1,
  .release-body h2,
  .release-body h3 {
    color: #1a202c;
    font-weight: 800;
    margin-top: 30px;
    margin-bottom: 15px;
  }

  .release-body h2 {
    font-size: 1.6em;
    border-bottom: 3px solid #667eea;
    padding-bottom: 10px;
  }

  .release-body ul {
    padding-left: 25px;
  }

  .release-body li {
    margin: 12px 0;
    color: #2d3748;
    font-weight: 500;
  }

  .release-body strong {
    color: #1a202c;
    font-weight: 800;
  }

  .release-body code {
    background: #f7fafc;
    padding: 2px 8px;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
    color: #e53e3e;
    font-weight: 700;
  }

  .release-body a {
    color: #667eea;
    text-decoration: none;
    font-weight: 700;
    border-bottom: 2px solid transparent;
    transition: all 0.3s ease;
  }

  .release-body a:hover {
    border-bottom-color: #667eea;
  }

  @media (max-width: 768px) {
    .hero-section h1 {
      font-size: 2.2em;
    }

    .release-title {
      font-size: 1.5em;
    }

    .release-header {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  html {
    scroll-behavior: smooth;
  }
</style>

<!-- ヒーローセクション -->
<div class="hero-section">
  <h1>📦 アップデート履歴</h1>
  <p>最新のリリースノートと変更履歴をご確認ください</p>
</div>

<!-- リリースセクション -->
<div class="releases-section">
  <div id="releases-container" class="releases-container">
    <div class="loading">リリース情報を読み込んでいます...</div>
  </div>
</div>

<!-- marked.js -->
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>

<script>
  const owner = 'fujitatsukasa';
  const repo = 'YukkuriMatomeProcessor';
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/releases`;

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}年${month}月${day}日`;
  }

  fetch(apiUrl)
    .then(response => response.json())
    .then(releases => {
      const container = document.getElementById('releases-container');

      if (!Array.isArray(releases) || releases.length === 0) {
        container.innerHTML = '<div class="loading">リリース情報がありません</div>';
        return;
      }

      container.innerHTML = '';

      releases.forEach(release => {
        const card = document.createElement('div');
        card.className = 'release-card';
        card.id = 'release-' + (release.tag_name || release.id);

        const header = document.createElement('div');
        header.className = 'release-header';

        const title = document.createElement('h2');
        title.className = 'release-title';
        title.textContent = release.name || release.tag_name;

        const date = document.createElement('div');
        date.className = 'release-date';
        date.textContent = formatDate(release.published_at);

        header.appendChild(title);
        header.appendChild(date);

        const body = document.createElement('div');
        body.className = 'release-body';
        const markdown = release.body || 'リリースノートはありません。';
        body.innerHTML = marked.parse(markdown);

        card.appendChild(header);
        card.appendChild(body);
        container.appendChild(card);
      });
    })
    .catch(error => {
      document.getElementById('releases-container').innerHTML =
        '<div class="loading" style="color: #e53e3e;">リリース情報の取得に失敗しました</div>';
      console.error(error);
    });
</script>
