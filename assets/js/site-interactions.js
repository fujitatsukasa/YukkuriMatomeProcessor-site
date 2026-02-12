(function () {
  'use strict';

  function isReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function collectRevealTargets() {
    var selector = [
      '.brand-card',
      '.premium-stat',
      '.timeline-item',
      '.faq-item',
      '.channel',
      '.price-card',
      '.release-panel',
      '.notice-box',
      '.showcase-card',
      '.metric',
      '.news-card',
      '.post-preview',
      '.sidebar-card',
      '.legal-table-wrap',
      '.purchase-summary',
      '.purchase-button-wrap',
      '.brand-panorama',
      '.brand-article__cta',
      '.widget-card',
      '.wl-category',
      '.wl-toolbar',
      '.wl-category-nav',
      '.wl-hero__panel',
      '.showcase section',
      '.showcase [class*="card"]',
      '.showcase [class*="panel"]'
    ].join(',');

    var nodeList = document.querySelectorAll(selector);
    if (!nodeList.length) {
      return [];
    }

    var isWidgetPage = window.location.pathname.indexOf('/widgets/') === 0;
    var maxTargets = isWidgetPage ? 120 : 320;
    var map = new Set();
    var result = [];

    nodeList.forEach(function (node) {
      if (!node || map.has(node) || result.length >= maxTargets) {
        return;
      }
      if (node.closest('[hidden]')) {
        return;
      }
      map.add(node);
      result.push(node);
    });

    return result;
  }

  function markVisibleImmediately(targets) {
    targets.forEach(function (target) {
      target.classList.add('rich-reveal', 'is-visible');
    });
  }

  function setupScrollReveal() {
    var targets = collectRevealTargets();
    if (!targets.length) {
      return;
    }

    if (isReducedMotion() || !('IntersectionObserver' in window)) {
      markVisibleImmediately(targets);
      return;
    }

    var viewportHeight = window.innerHeight || document.documentElement.clientHeight || 900;
    var deferred = [];

    targets.forEach(function (target, index) {
      target.classList.add('rich-reveal');
      target.style.setProperty('--reveal-order', String(index % 12));

      var rect = target.getBoundingClientRect();
      if (rect.top <= viewportHeight * 0.9) {
        target.classList.add('is-visible');
      } else {
        deferred.push(target);
      }
    });

    if (!deferred.length) {
      return;
    }

    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          return;
        }
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    }, {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.08
    });

    deferred.forEach(function (target) {
      observer.observe(target);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    setupScrollReveal();
  });
})();
