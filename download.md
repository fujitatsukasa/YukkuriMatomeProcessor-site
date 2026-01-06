---
layout: page
title: ダウンロード
subtitle: ログインから7日間は全機能が試用できます。
---

<style>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&family=Inter:wght@400;600;700;800&display=swap');

  * {
    box-sizing: border-box;
  }

  body {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    font-family: 'Noto Sans JP', 'Inter', sans-serif;
  }

  .page-content {
    max-width: 1200px;
    margin: 40px auto;
    padding: 0 20px 60px;
    background: transparent;
    box-shadow: none;
  }

  /* ========== ヒーローエリア ========== */
  .download-hero {
    background: white;
    border-radius: 20px;
    padding: 60px 40px;
    text-align: center;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
    margin-bottom: 40px;
  }

  .download-hero h1 {
    font-size: 2.8em;
    font-weight: 900;
    color: #2d3748;
    margin-bottom: 20px;
  }

  .download-hero p {
    font-size: 1.3em;
    color: #718096;
    margin-bottom: 40px;
  }

  /* ========== ダウンロードボタン ========== */
  .download-button {
    display: inline-block;
    padding: 20px 60px;
    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
    color: white;
    text-decoration: none;
    font-size: 1.3em;
    font-weight: 700;
    border-radius: 50px;
    box-shadow: 0 15px 40px rgba(238, 90, 111, 0.4);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .download-button::before {
    content: '⬇️';
    margin-right: 10px;
    font-size: 1.2em;
  }

  .download-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 20px 50px rgba(238, 90, 111, 0.6);
  }

  .download-version {
    margin-top: 15px;
    font-size: 0.9em;
    color: #a0aec0;
  }

  /* ========== セクションカード ========== */
  .section-card {
    background: white;
    border-radius: 20px;
    padding: 40px;
    margin-bottom: 30px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }

  .section-title {
    font-size: 2em;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 30px;
    padding-bottom: 15px;
    border-bottom: 3px solid;
    border-image: linear-gradient(90deg, #667eea 0%, #764ba2 100%) 1;
  }

  /* ========== リリースノート ========== */
  .release-notes {
    background: #f7fafc;
    border-radius: 15px;
    padding: 30px;
    max-height: 600px;
    overflow-y: auto;
    border: 1px solid #e2e8f0;
  }

  .release-notes::-webkit-scrollbar {
    width: 10px;
  }

  .release-notes::-webkit-scrollbar-track {
    background: #e2e8f0;
    border-radius: 10px;
  }

  .release-notes::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 10px;
  }

  .release-notes h1,
  .release-notes h2,
  .release-notes h3 {
    color: #2d3748;
    margin-top: 20px;
  }

  .release-notes ul {
    margin-left: 20px;
  }

  .release-notes li {
    margin: 10px 0;
    line-height: 1.6;
  }

  /* ========== 過去のバージョン ========== */
  .release-list {
    background: #f7fafc;
    border-radius: 15px;
    padding: 30px;
    max-height: 400px;
    overflow-y: auto;
    border: 1px solid #e2e8f0;
  }

  .release-list::-webkit-scrollbar {
    width: 10px;
  }

  .release-list::-webkit-scrollbar-track {
    background: #e2e8f0;
    border-radius: 10px;
  }

  .release-list::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 10px;
  }

  .release-list ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .release-list li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    margin: 10px 0;
    background: white;
    border-radius: 10px;
    transition: all 0.3s ease;
    border-left: 4px solid transparent;
  }

  .release-list li:hover {
    transform: translateX(5px);
    border-left-color: #667eea;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  .release-list a {
    text-decoration: none;
    color: #2d3748;
    font-weight: 600;
    transition: color 0.3s ease;
  }

  .release-list a:hover {
    color: #667eea;
  }

  .release-date {
    font-size: 0.9em;
    color: #a0aec0;
    font-weight: 500;
  }

  /* ========== 機能ハイライト ========== */
  .features-highlight {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-top: 30px;
  }

  .feature-box {
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    padding: 25px;
    border-radius: 15px;
    text-align: center;
    transition: all 0.3s ease;
  }

  .feature-box:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }

  .feature-icon {
    font-size: 3em;
    margin-bottom: 15px;
  }

  .feature-box h3 {
    font-size: 1.2em;
    color: #2d3748;
    margin-bottom: 10px;
  }

  .feature-box p {
    color: #718096;
    font-size: 0.95em;
    line-height: 1.6;
  }

  /* ========== ローディング ========== */
  .loading {
    text-align: center;
    padding: 40px;
    color: #718096;
    font-size: 1.1em;
  }

  .loading::after {
    content: '...';
    animation: dots 1.5s steps(4, end) infinite;
  }

  @keyframes dots {
    0%, 20% { content: '.'; }
    40% { content: '..'; }
    60%, 100% { content: '...'; }
  }

  /* ========== レスポンシブ ========== */
  @media (max-width: 768px) {
    .download-hero {
      padding: 40px 20px;
    }

    .download-hero h1 {
      font-size: 2em;
    }

    .download-button {
      width: 100%;
      padding: 18px 40px;
      font-size: 1.1em;
    }

    .section-card {
      padding: 25px 20px;
    }

    .section-title {
      font-size: 1.6em;
    }
  }
</style>

<!-- ヒーローエリア -->
<div class="download-hero">
  <h1>🚀 今すぐダウンロード</h1>
  <p>7日間の無料トライアルで全機能をお試しください</p>
  <a id="latest-release-button" class="download-button" href="#" target="_blank">
    最新バージョンをダウンロード
  </a>
  <div class="download-version" id="version-info">バージョン情報を読み込み中...</div>

  <div class="features-highlight">
    <div class="feature-box">
      <div class="feature-icon">⚡</div>
      <h3>即座に利用開始</h3>
      <p>ダウンロード後すぐに使える</p>
    </div>
    <div class="feature-box">
      <div class="feature-icon">🔒</div>
      <h3>安全・安心</h3>
      <p>公式GitHubからの配信</p>
    </div>
    <div class="feature-box">
      <div class="feature-icon">🆓</div>
      <h3>7日間無料</h3>
      <p>全機能フル活用可能</p>
    </div>
    <div class="feature-box">
      <div class="feature-icon">🔄</div>
      <h3>自動アップデート</h3>
      <p>常に最新版を利用</p>
    </div>
  </div>
</div>

<!-- リリースノート -->
<div class="section-card">
  <h2 class="section-title">📝 最新のリリースノート</h2>
  <div id="release-notes" class="release-notes loading">
    リリースノートを読み込んでいます
  </div>
</div>

<!-- 過去のバージョン -->
<div class="section-card">
  <h2 class="section-title">📦 過去のバージョン一覧</h2>
  <div id="release-list" class="release-list loading">
    バージョン履歴を読み込んでいます
  </div>
</div>

<!-- marked.js の読み込み -->
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>

<script>
  // GitHub のリポジトリ情報
  const owner = 'fujitatsukasa';
  const repo = 'YukkuriMatomeProcessor';
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/releases`;

  // 日付を整形
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}年${month}月${day}日`;
  }

  // リリース情報を取得
  fetch(apiUrl)
    .then(response => response.json())
    .then(releases => {
      if (!Array.isArray(releases) || releases.length === 0) {
        document.getElementById('release-list').innerHTML = '<p style="text-align: center; color: #a0aec0;">リリース情報を取得できませんでした。</p>';
        document.getElementById('release-notes').innerHTML = '<p style="text-align: center; color: #a0aec0;">リリースノートがありません。</p>';
        document.getElementById('version-info').textContent = '';
        return;
      }

      // 最新リリースの設定
      const latest = releases[0];
      const latestAsset = latest.assets.find(a => a.name === 'YukkuriMatomeProcessor.zip') || latest.assets[0];

      if (latestAsset) {
        document.getElementById('latest-release-button').href = latestAsset.browser_download_url;
        document.getElementById('version-info').textContent = `バージョン ${latest.tag_name} (${formatDate(latest.published_at)})`;
      } else {
        document.getElementById('latest-release-button').href = '#';
        document.getElementById('latest-release-button').textContent = 'ダウンロード準備中';
        document.getElementById('version-info').textContent = '';
      }

      // リリースノート表示
      const notesMarkdown = latest.body || 'リリースノートはありません。';
      const notesHTML = marked.parse(notesMarkdown);
      document.getElementById('release-notes').innerHTML = notesHTML;

      // 過去のリリース一覧
      const listDiv = document.getElementById('release-list');
      listDiv.innerHTML = '';

      if (releases.length === 1) {
        listDiv.innerHTML = '<p style="text-align: center; color: #a0aec0; padding: 20px;">過去のバージョンはありません</p>';
        return;
      }

      const ul = document.createElement('ul');
      releases.forEach((release, index) => {
        if (index === 0) return; // 最新は除外

        const li = document.createElement('li');
        const asset = release.assets.find(a => a.name === 'YukkuriMatomeProcessor.zip') || release.assets[0];

        const a = document.createElement('a');
        a.href = asset ? asset.browser_download_url : '#';
        a.target = '_blank';
        a.textContent = `${release.name || release.tag_name}`;

        const dateSpan = document.createElement('span');
        dateSpan.className = 'release-date';
        dateSpan.textContent = formatDate(release.published_at);

        li.appendChild(a);
        li.appendChild(dateSpan);
        ul.appendChild(li);
      });

      listDiv.appendChild(ul);
    })
    .catch(error => {
      console.error('Error fetching releases:', error);
      document.getElementById('release-list').innerHTML = '<p style="text-align: center; color: #e53e3e;">リリース情報の取得に失敗しました。しばらくしてから再度お試しください。</p>';
      document.getElementById('release-notes').innerHTML = '<p style="text-align: center; color: #e53e3e;">リリースノートの取得に失敗しました。</p>';
      document.getElementById('version-info').textContent = '';
    });
</script>
