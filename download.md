---
layout: page
title: ダウンロード
subtitle: ログインから7日間は全機能が試用できます。
---

<style>
  /* Google Fonts の読み込み */
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

  /* ★★★ 全体の基本設定 ★★★ */
  body {
    background: #f7f8fa; /* ページ全体の背景色をやや明るいグレーに */
    margin: 0; /* ブラウザデフォルト余白リセット */
    padding: 0;
  }
  .page-content {
    font-family: 'Roboto', sans-serif;
    max-width: 900px;
    margin: 0 auto;
    padding: 1em 1em 2em;
    color: #333;
    background: #fff; /* 背景を白で囲んでカード風にする */
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    border-radius: 12px;
    text-align: center; /* 全文中央寄せにする */
  }

  /* ★★★ h2.section-title を虹色ライン付きに ★★★ */
  h2.section-title {
    font-size: 2.2em;
    margin: 1.5em 0 0.7em;
    color: #222;
    position: relative;
    display: inline-block;
    padding-bottom: 0.2em;
    border: none; /* 既存の下線を消す場合 */
  }
  h2.section-title::after {
    content: "";
    display: block;
    width: 60%;
    height: 6px;
    background: linear-gradient(to right, #007BFF, #28A745, #FFC107, #DC3545);
    margin: 0.4em auto 0;
    border-radius: 3px;
    box-shadow: 0 0 6px rgba(0,0,0,0.2);
  }

  /* ★★★ hr（セクション区切り）をリッチに ★★★ */
  hr {
    border: none;
    height: 4px;  /* ちょっと太め */
    margin: 2em 0;
    border-radius: 2px;
    background: linear-gradient(to right, #007BFF, #28A745, #FFC107, #DC3545);
    box-shadow: 0 0 8px rgba(0,0,0,0.15);
  }

  /* ★★★ サブセクション見出し ★★★ */
  h3.subsection-title {
    text-align: center;
    font-size: 1.8em;
    margin: 1.5em 0 0.8em;
    color: #555;
    position: relative;
    display: inline-block;
  }

  /* 最新バージョン用のダウンロードボタン */
  .download-button {
    display: block;
    width: 100%;
    max-width: 300px;
    margin: 1em auto 1em;
    padding: 1em;
    background-color: #007BFF;
    color: #fff;
    text-align: center;
    text-decoration: none;
    font-size: 1.2em;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    transition: background-color 0.3s ease, transform 0.3s ease;
  }
  .download-button:hover {
    background-color: #0056b3;
    transform: translateY(-3px);
  }

  /* リリースノート表示領域 */
  .release-notes {
    border: 1px solid #ccc;
    padding: 1em;
    border-radius: 8px;
    max-height: 200px;
    overflow-y: scroll;
    margin: 1em auto 2em;
    background-color: #f8f8f8;
    text-align: left; /* リリースノートは左揃え推奨 */
  }

  /* 過去のバージョン一覧 */
  .release-list {
    max-height: 300px;
    overflow-y: scroll;
    border: 1px solid #ccc;
    padding: 1em;
    margin: 1em auto;
    background-color: #fafafa;
    text-align: left; /* 左揃え */
  }
  .release-list ul {
    list-style: none;
    padding-left: 0;
    margin: 0;
  }
  .release-list li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0.8em 0;
  }
  .release-list a {
    text-decoration: none;
    color: #007BFF;
    font-weight: 500;
    transition: color 0.3s ease;
  }
  .release-list a:hover {
    color: #0056b3;
    text-decoration: underline;
  }
  .release-date {
    font-size: 0.9em;
    color: #777;
    margin-left: 1em;
    white-space: nowrap;
  }
</style>

<!-- marked.js の読み込み -->
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>

<div class="page-content">

  <!-- 最新バージョン -->
  <h2 class="section-title">最新バージョン</h2>
  <div style="display: block; text-align: center; margin-top: 1em;">
    <a id="latest-release-button" class="download-button" href="#" target="_blank">
      最新バージョンをダウンロードする
    </a>
  <h3 class="subsection-title">リリースノート</h3>
  <div id="release-notes" class="release-notes">
    ロード中...
  </div>

  <hr>

  <!-- 過去のバージョン一覧 -->
  <h2 class="section-title">過去のバージョン一覧</h2>
  <div id="release-list" class="release-list">
    ロード中...
  </div>

</div>

<script>
  // GitHub のリポジトリ情報
  const owner = 'fujitatsukasa';
  const repo = 'YukkuriMatomeProcessor';
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/releases`;

  // ヘルパー関数：日付を整形
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
      if (!Array.isArray(releases)) {
        document.getElementById('release-list').innerHTML = 'リリース情報を取得できませんでした。';
        return;
      }

      // 最新リリースの設定
      if (releases.length > 0) {
        const latest = releases[0];
        // 「YukkuriMatomeProcessor.zip」アセットを優先で取得
        const latestAsset = latest.assets.find(a => a.name === 'YukkuriMatomeProcessor.zip')
                        || latest.assets[0];
        document.getElementById('latest-release-button').href =
          latestAsset ? latestAsset.browser_download_url : '#';
        // リリースノートは Markdown 形式
        const notesMarkdown = latest.body || 'リリースノートはありません。';
        const notesHTML = marked.parse(notesMarkdown);
        document.getElementById('release-notes').innerHTML = notesHTML;
      } else {
        document.getElementById('latest-release-button').innerHTML = 'リリースがありません';
        document.getElementById('release-notes').innerHTML = '';
      }

      // 過去のリリース一覧
      const listDiv = document.getElementById('release-list');
      listDiv.innerHTML = ''; // ロード中メッセージのクリア
      const ul = document.createElement('ul');
      releases.forEach((release, index) => {
        if (index === 0) return; // 最新は除外
        const li = document.createElement('li');

        // リリースリンク
        const asset = release.assets.find(a => a.name === 'YukkuriMatomeProcessor.zip')
                    || release.assets[0];
        const a = document.createElement('a');
        a.href = asset ? asset.browser_download_url : '#';
        a.target = '_blank';
        a.textContent = release.name || release.tag_name;

        // リリース日
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
      document.getElementById('release-list').innerHTML = 'リリース情報の取得に失敗しました。';
      document.getElementById('release-notes').innerHTML = '';
      console.error(error);
    });
</script>
