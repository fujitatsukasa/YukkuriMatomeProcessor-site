(() => {
  const root = document.querySelector('.widget-lab');
  if (!root) return;

  const cards = Array.from(root.querySelectorAll('.widget-card'));
  const sections = Array.from(root.querySelectorAll('.wl-category'));
  const filterButtons = Array.from(root.querySelectorAll('[data-filter]'));
  const searchInput = root.querySelector('#wlSearch');
  const selectedOnlyBtn = root.querySelector('#wlSelectedOnly');
  const selectedCount = root.querySelector('#wlSelectedCount');
  const selectedList = root.querySelector('#wlSelectedList');
  const output = root.querySelector('#wlOutput');
  const copyIdsBtn = root.querySelector('#wlCopyIds');
  const copyJsonBtn = root.querySelector('#wlCopyJson');
  const clearBtn = root.querySelector('#wlClearSelection');
  const status = root.querySelector('#wlStatus');
  const modal = root.querySelector('#wlModal');
  const modalPreview = root.querySelector('#wlModalPreview');
  const modalTitle = root.querySelector('#wlModalTitle');
  const modalDesc = root.querySelector('#wlModalDesc');
  const modalId = root.querySelector('#wlModalId');
  const modalTags = root.querySelector('#wlModalTags');
  const modalHoverBtn = root.querySelector('#wlModalHover');
  const modalCopyBtn = root.querySelector('#wlModalCopy');
  const modalCloseBtn = root.querySelector('#wlModalClose');
  const modalCloseSecondary = root.querySelector('#wlModalCloseSecondary');
  const modalBackdrop = root.querySelector('#wlModalBackdrop');

  const selectionKey = 'widgetSelection-v1';
  const selected = new Set();
  const cardById = new Map();
  let lastFocusedElement = null;

  const safeJsonParse = (text) => {
    try {
      return JSON.parse(text);
    } catch (err) {
      return null;
    }
  };

  const saved = safeJsonParse(localStorage.getItem(selectionKey) || '[]');
  if (Array.isArray(saved)) {
    saved.forEach((id) => selected.add(id));
  }

  cards.forEach((card) => {
    cardById.set(card.dataset.id, card);
  });

  const setText = (element, text) => {
    if (!element) return;
    if (element.textContent.trim()) return;
    if (element.children.length) return;
    element.textContent = text;
    element.classList.add('has-text');
  };

  const fillPreviewText = (card) => {
    const preview = card.querySelector('.wl-preview');
    if (!preview) return;

    preview.querySelectorAll('.preview-label').forEach((el) => el.remove());
    preview.querySelectorAll('.mini-pill, .mini-chip').forEach((el) => {
      if (el.children.length) return;
      el.textContent = '';
      el.classList.remove('has-text');
    });

    preview.querySelectorAll('.mini-line.wide').forEach((el) => {
      setText(el, '見出しテキスト');
    });
    preview.querySelectorAll('.mini-line.med').forEach((el) => {
      setText(el, '説明テキスト');
    });
    preview.querySelectorAll('.mini-line.short').forEach((el) => {
      setText(el, '補足テキスト');
    });
    preview
      .querySelectorAll('.mini-line:not(.wide):not(.med):not(.short)')
      .forEach((el) => setText(el, 'テキスト'));

    const btnText = preview.classList.contains('preview-subscribe')
      ? '登録'
      : preview.classList.contains('preview-contact')
      ? '送信'
      : preview.classList.contains('preview-login')
      ? 'ログイン'
      : preview.classList.contains('preview-banner')
      ? '詳細'
      : preview.classList.contains('preview-hero')
      ? '今すぐ'
      : '詳しく見る';

    preview.querySelectorAll('.mini-btn').forEach((el) => setText(el, btnText));

    preview.querySelectorAll('.subscribe-input').forEach((el) => setText(el, 'email@company'));
    preview.querySelectorAll('.command-input').forEach((el) => setText(el, '検索ワード'));
    preview.querySelectorAll('.chip').forEach((el) => setText(el, '条件'));

    const navLabels = ['ホーム', '機能', '料金', '事例'];
    preview.querySelectorAll('.nav-pill-row .mini-pill').forEach((el, idx) => {
      setText(el, navLabels[idx] || 'メニュー');
    });

    preview.querySelectorAll('.banner-row .mini-pill').forEach((el) => setText(el, 'NEW'));
    preview.querySelectorAll('.preview-press .mini-pill').forEach((el) => setText(el, '掲載'));
    preview.querySelectorAll('.preview-leaderboard .mini-pill').forEach((el, idx) => {
      setText(el, `${idx + 1}位`);
    });
    preview.querySelectorAll('.preview-social .mini-chip').forEach((el) =>
      setText(el, 'リンク')
    );

    preview.querySelectorAll('.nav-item').forEach((el, idx) =>
      setText(el, navLabels[idx] || 'メニュー')
    );

    const crumbs = Array.from(preview.querySelectorAll('.crumb'));
    const crumbLabels = ['HOME', 'カテゴリ', '詳細'];
    crumbs.forEach((el, index) => setText(el, crumbLabels[index] || '階層'));

    const tabs = Array.from(preview.querySelectorAll('.tab'));
    const tabLabels = ['概要', '特徴', 'FAQ'];
    tabs.forEach((el, index) => setText(el, tabLabels[index] || 'タブ'));

    preview.querySelectorAll('.logo').forEach((el) => setText(el, 'LOGO'));
  };

  const buildDescription = (card) => {
    const base = card.querySelector('.widget-desc')?.textContent?.trim() || '';
    const category = card.dataset.category || '';
    const tags = (card.dataset.tags || '').split(/\s+/).filter(Boolean);
    const preview = card.querySelector('.wl-preview');

    const categoryUsage = {
      hero: 'LPやプロダクトのファーストビューで、価値提案とCTAを同時に伝える場面で使います。',
      nav: '情報量が多いサイトや管理画面で、主要導線を迷わせず提示するために使います。',
      content: '機能やストーリーを整理して読みやすく伝えるセクションで使います。',
      media: '実績や雰囲気をビジュアルで伝える場面に向いています。',
      proof: '導入実績やレビューを提示して不安を払拭する場面に使います。',
      pricing: '料金比較やプラン選択をサポートする場面に使います。',
      form: '入力負荷を下げ、コンバージョンを上げたい場面に使います。',
      data: 'KPIや進捗を一目で把握させるダッシュボードで使います。',
      feedback: '不安解消や次アクションを促す補助UIとして使います。',
    };

    const tagUsage = {
      pricing: '料金ページの比較セクションに最適です。',
      dashboard: '管理画面のサマリー領域に最適です。',
      gallery: '実績・作品ギャラリーで活躍します。',
      video: 'デモや紹介動画の訴求に向きます。',
      form: 'リード獲得や問い合わせ導線に向きます。',
      cta: 'キャンペーンや申込みの強い導線として使えます。',
      faq: 'FAQやサポートの補助に向きます。',
      search: '検索体験の強化に向きます。',
      timeline: '導入フローや制作プロセスの説明に向きます。',
      comparison: '比較検討の判断材料として効果的です。',
    };

    const interactionNotes = [];
    if (preview?.classList.contains('preview-carousel')) {
      interactionNotes.push('ホバーでドットが変化し、スライドが進む想定です。');
    }
    if (preview?.classList.contains('preview-beforeafter')) {
      interactionNotes.push('ドラッグやホバーで比較位置が動く想定です。');
    }
    if (preview?.classList.contains('preview-range')) {
      interactionNotes.push('スライダー操作が想定されます。');
    }
    if (preview?.classList.contains('preview-toggle')) {
      interactionNotes.push('トグル切替の動きが想定されます。');
    }
    if (preview?.classList.contains('preview-faq')) {
      interactionNotes.push('クリックで開閉するアコーディオン想定です。');
    }
    if (preview?.classList.contains('preview-marquee')) {
      interactionNotes.push('ロゴが流れる演出を想定しています。');
    }
    if (preview?.classList.contains('preview-lightbox')) {
      interactionNotes.push('クリックで拡大するライトボックス想定です。');
    }
    if (preview?.classList.contains('preview-video') || preview?.classList.contains('preview-video-card')) {
      interactionNotes.push('再生ボタンのアクションを想定しています。');
    }
    if (preview?.classList.contains('preview-chat')) {
      interactionNotes.push('送受信のアクションを想定しています。');
    }
    if (preview?.classList.contains('preview-command')) {
      interactionNotes.push('検索入力と実行の操作を想定しています。');
    }

    const hasClickable = !!preview?.querySelector(
      '.mini-btn, .chip, .tab, .nav-item, .mini-pill'
    );
    if (hasClickable) {
      interactionNotes.push('クリック時のリップルや押下反応を確認できます。');
    }

    const tagNote = tags.map((tag) => tagUsage[tag]).find(Boolean) || '';
    const usage = categoryUsage[category] || '';

    return [base, usage, tagNote, interactionNotes[0], interactionNotes[1]]
      .filter(Boolean)
      .join(' ');
  };

  const ensurePreviewButton = (card) => {
    const actions = card.querySelector('.widget-actions');
    if (!actions) return;
    if (actions.querySelector('[data-action="preview"]')) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'wl-btn ghost';
    btn.dataset.action = 'preview';
    btn.dataset.id = card.dataset.id;
    btn.textContent = 'プレビュー';
    actions.appendChild(btn);
  };

  const openModal = (card) => {
    if (!modal || !card) return;
    lastFocusedElement = document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');

    if (modalPreview) {
      modalPreview.innerHTML = '';
      const preview = card.querySelector('.wl-preview');
      if (preview) {
        const clone = preview.cloneNode(true);
        clone.classList.remove('is-hovered');
        clone.querySelectorAll('.preview-label').forEach((el) => el.remove());
        clone
          .querySelectorAll('.mini-btn, .mini-pill, .chip, .tab, .nav-item, .crumb, .mini-card, .icon-card, .video-thumb')
          .forEach((el) => el.classList.add('ripple-target'));
        modalPreview.appendChild(clone);
      }
    }

    if (modalTitle) {
      modalTitle.textContent = card.dataset.name || 'プレビュー';
    }
    if (modalDesc) {
      const desc = card.querySelector('.widget-desc');
      modalDesc.textContent = desc ? desc.textContent : '';
    }
    if (modalId) {
      modalId.textContent = card.dataset.id || '';
    }
    if (modalTags) {
      modalTags.innerHTML = '';
      card.querySelectorAll('.widget-tags span').forEach((tag) => {
        modalTags.appendChild(tag.cloneNode(true));
      });
    }
    if (modalCopyBtn) {
      modalCopyBtn.dataset.copyId = card.dataset.id || '';
    }
    if (modalHoverBtn) {
      modalHoverBtn.classList.remove('is-active');
      modalHoverBtn.setAttribute('aria-pressed', 'false');
    }
    if (modalCloseBtn) {
      modalCloseBtn.focus();
    }
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (lastFocusedElement && lastFocusedElement.focus) {
      lastFocusedElement.focus();
    }
  };

  const showStatus = (message) => {
    if (!status) return;
    status.textContent = message;
    status.classList.add('is-active');
    setTimeout(() => {
      status.textContent = '';
      status.classList.remove('is-active');
    }, 2000);
  };

  const copyText = async (text) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      showStatus('コピーしました');
    } catch (err) {
      const temp = document.createElement('textarea');
      temp.value = text;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand('copy');
      document.body.removeChild(temp);
      showStatus('コピーしました');
    }
  };

  const persist = () => {
    localStorage.setItem(selectionKey, JSON.stringify(Array.from(selected)));
  };

  const setCardSelected = (card, isSelected) => {
    card.classList.toggle('is-selected', isSelected);
    const btn = card.querySelector('[data-action="select"]');
    if (btn) {
      btn.classList.toggle('is-active', isSelected);
      btn.textContent = isSelected ? '選択中' : '選ぶ';
      btn.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
    }
  };

  const updateSelectedUI = () => {
    const items = Array.from(selected)
      .map((id) => cardById.get(id))
      .filter(Boolean);

    if (selectedCount) {
      selectedCount.textContent = items.length.toString();
    }

    if (selectedList) {
      selectedList.innerHTML = '';
      items.forEach((card) => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${card.dataset.id}</span><span>${card.dataset.name}</span>`;
        selectedList.appendChild(li);
      });
    }

    if (output) {
      output.value = items.length
        ? items
            .map(
              (card) =>
                `${card.dataset.id} ${card.dataset.name} (${card.dataset.categoryLabel})`
            )
            .join('\n')
        : '選択されたウィジェットはありません。';
    }
  };

  const updateCounts = () => {
    const counts = {};
    cards.forEach((card) => {
      const cat = card.dataset.category;
      counts[cat] = (counts[cat] || 0) + 1;
    });

    root.querySelectorAll('[data-count-for]').forEach((el) => {
      const cat = el.dataset.countFor;
      el.textContent = counts[cat] ? counts[cat].toString() : '0';
    });
  };

  let activeFilter = 'all';
  let selectedOnly = false;

  const applyFilters = () => {
    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';

    cards.forEach((card) => {
      const text = (card.dataset.search || '').toLowerCase();
      const matchesSearch = !query || text.includes(query);
      const matchesFilter =
        activeFilter === 'all' || card.dataset.category === activeFilter;
      const matchesSelected = !selectedOnly || selected.has(card.dataset.id);
      const isVisible = matchesSearch && matchesFilter && matchesSelected;
      card.classList.toggle('is-hidden', !isVisible);
    });

    sections.forEach((section) => {
      const visible = !!section.querySelector('.widget-card:not(.is-hidden)');
      section.classList.toggle('is-hidden', !visible);
    });
  };

  cards.forEach((card) => setCardSelected(card, selected.has(card.dataset.id)));
  updateSelectedUI();
  updateCounts();
  applyFilters();

  root.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button) return;

    const action = button.dataset.action;
    if (action === 'select') {
      const id = button.dataset.id;
      if (!id) return;
      if (selected.has(id)) {
        selected.delete(id);
        setCardSelected(cardById.get(id), false);
      } else {
        selected.add(id);
        setCardSelected(cardById.get(id), true);
      }
      persist();
      updateSelectedUI();
      applyFilters();
      showStatus('選択を更新しました');
    }

    if (action === 'copy-id') {
      const id = button.dataset.id;
      if (id) copyText(id);
    }

    if (action === 'preview') {
      const id = button.dataset.id;
      openModal(cardById.get(id));
    }
  });

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      activeFilter = btn.dataset.filter;
      filterButtons.forEach((item) =>
        item.classList.toggle('is-active', item === btn)
      );
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }

  if (selectedOnlyBtn) {
    selectedOnlyBtn.addEventListener('click', () => {
      selectedOnly = !selectedOnly;
      selectedOnlyBtn.classList.toggle('is-active', selectedOnly);
      selectedOnlyBtn.setAttribute('aria-pressed', selectedOnly ? 'true' : 'false');
      applyFilters();
    });
  }

  if (copyIdsBtn) {
    copyIdsBtn.addEventListener('click', () => {
      copyText(Array.from(selected).join(', '));
    });
  }

  if (copyJsonBtn) {
    copyJsonBtn.addEventListener('click', () => {
      const items = Array.from(selected)
        .map((id) => {
          const card = cardById.get(id);
          if (!card) return null;
          return {
            id,
            name: card.dataset.name,
            category: card.dataset.categoryLabel,
          };
        })
        .filter(Boolean);

      copyText(JSON.stringify(items, null, 2));
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      selected.clear();
      cards.forEach((card) => setCardSelected(card, false));
      persist();
      updateSelectedUI();
      applyFilters();
      showStatus('選択をクリアしました');
    });
  }

  cards.forEach((card) => {
    fillPreviewText(card);
    ensurePreviewButton(card);
    const desc = card.querySelector('.widget-desc');
    if (desc && !desc.dataset.enhanced) {
      desc.textContent = buildDescription(card);
      desc.dataset.enhanced = 'true';
    }
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.addEventListener('click', (event) => {
      if (event.target.closest('button')) return;
      openModal(card);
    });
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openModal(card);
      }
    });
  });

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', closeModal);
  }
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }
  if (modalCloseSecondary) {
    modalCloseSecondary.addEventListener('click', closeModal);
  }
  if (modalCopyBtn) {
    modalCopyBtn.addEventListener('click', () => {
      const id = modalCopyBtn.dataset.copyId;
      if (id) copyText(id);
    });
  }
  if (modalHoverBtn) {
    modalHoverBtn.addEventListener('click', () => {
      const preview = modalPreview ? modalPreview.querySelector('.wl-preview') : null;
      if (!preview) return;
      const isActive = preview.classList.toggle('is-hovered');
      modalHoverBtn.classList.toggle('is-active', isActive);
      modalHoverBtn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
  }

  if (modalPreview) {
    modalPreview.addEventListener('click', (event) => {
      const target = event.target.closest('.ripple-target');
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'wl-ripple';
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
      target.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  }

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal && modal.classList.contains('is-open')) {
      closeModal();
    }
  });

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (!prefersReducedMotion) {
    const counters = Array.from(root.querySelectorAll('[data-count]'));
    counters.forEach((el) => {
      const target = Number(el.dataset.count) || 0;
      const suffix = el.dataset.countSuffix || '';
      const duration = 1200;
      let start = null;

      const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const value = Math.floor(target * progress);
        el.textContent = `${value}${suffix}`;
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };

      window.requestAnimationFrame(step);
    });
  }
})();
