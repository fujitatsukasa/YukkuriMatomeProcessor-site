(function () {
  (function normalizeLegacyPath() {
    var map = {
      '/Instructions': '/instructions/',
      '/Instructions/': '/instructions/',
      '/FAQ': '/faq/',
      '/FAQ/': '/faq/'
    };
    var current = window.location.pathname;
    if (Object.prototype.hasOwnProperty.call(map, current)) {
      window.location.replace(map[current] + window.location.search + window.location.hash);
    }
  })();

  function setupMobileNav() {
    var toggle = document.querySelector('[data-nav-toggle]');
    var nav = document.querySelector('[data-nav]');
    if (!toggle || !nav) {
      return;
    }

    toggle.addEventListener('click', function () {
      var open = nav.getAttribute('data-open') === 'true';
      nav.setAttribute('data-open', open ? 'false' : 'true');
      toggle.setAttribute('aria-expanded', open ? 'false' : 'true');
    });
  }

  function setupScrollProgress() {
    var progress = document.querySelector('[data-scroll-progress]');
    if (!progress) {
      return;
    }

    var onScroll = function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var ratio = max > 0 ? (window.scrollY / max) * 100 : 0;
      progress.style.width = ratio + '%';
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function hydrateDeferredVideo(video) {
    if (!video || video.getAttribute('data-hydrated') === 'true') {
      return;
    }

    var sources = video.querySelectorAll('source[data-src]');
    if (!sources.length) {
      return;
    }

    sources.forEach(function (source) {
      var src = source.getAttribute('data-src');
      if (src) {
        source.setAttribute('src', src);
        source.removeAttribute('data-src');
      }
    });

    video.setAttribute('data-hydrated', 'true');
    video.load();

    var playPromise = video.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(function () {});
    }
  }

  function setupDeferredHeroMedia() {
    var mediaRoots = document.querySelectorAll('[data-deferred-video]');
    if (!mediaRoots.length) {
      return;
    }

    var videos = [];
    mediaRoots.forEach(function (root) {
      root.querySelectorAll('video').forEach(function (video) {
        videos.push(video);
      });
    });

    if (!videos.length) {
      return;
    }

    var loadAll = function () {
      videos.forEach(function (video) {
        hydrateDeferredVideo(video);
      });
    };

    if (!('IntersectionObserver' in window)) {
      loadAll();
      return;
    }

    // If intersection callbacks are delayed/missed, hydrate as a fallback.
    window.setTimeout(loadAll, 2500);

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          return;
        }

        hydrateDeferredVideo(entry.target);
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '200px 0px' });

    videos.forEach(function (video) {
      observer.observe(video);
    });
  }

  function setupPrimaryHeroVideoPlayback() {
    var root = document.querySelector('[data-deferred-video]');
    if (!root) {
      return;
    }

    var mainVideo = root.querySelector('[data-hero-primary-video]');
    if (!mainVideo) {
      return;
    }

    var fallbackButton = root.querySelector('[data-hero-video-play]');

    // Explicitly enforce attributes for browsers that are strict about autoplay loops.
    mainVideo.muted = true;
    mainVideo.defaultMuted = true;
    mainVideo.loop = true;
    mainVideo.playsInline = true;
    mainVideo.setAttribute('muted', '');
    mainVideo.setAttribute('autoplay', '');
    mainVideo.setAttribute('loop', '');
    mainVideo.setAttribute('playsinline', '');

    var showFallbackButton = function () {
      if (fallbackButton) {
        fallbackButton.hidden = false;
      }
    };

    var hideFallbackButton = function () {
      if (fallbackButton) {
        fallbackButton.hidden = true;
      }
    };

    var tryPlay = function () {
      var playPromise = mainVideo.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(function () {
          showFallbackButton();
        });
      }
    };

    var hasStarted = false;
    var markIfPlaying = function () {
      if (mainVideo.currentTime > 0.05 && !mainVideo.paused) {
        hasStarted = true;
        hideFallbackButton();
      }
    };

    mainVideo.addEventListener('loadedmetadata', tryPlay);
    mainVideo.addEventListener('canplay', tryPlay);
    mainVideo.addEventListener('play', hideFallbackButton);
    mainVideo.addEventListener('timeupdate', markIfPlaying);
    mainVideo.addEventListener('ended', function () {
      mainVideo.currentTime = 0;
      tryPlay();
    });
    mainVideo.addEventListener('pause', function () {
      if (document.hidden) {
        return;
      }
      window.setTimeout(function () {
        if (mainVideo.paused) {
          tryPlay();
        }
      }, 120);
    });

    document.addEventListener('visibilitychange', function () {
      if (!document.hidden) {
        tryPlay();
      }
    });
    window.addEventListener('pageshow', function () {
      tryPlay();
    });
    window.addEventListener('focus', function () {
      tryPlay();
    });

    document.addEventListener('pointerdown', function () {
      tryPlay();
    }, { once: true });

    if (fallbackButton) {
      fallbackButton.addEventListener('click', function () {
        tryPlay();
      });
    }

    tryPlay();

    window.setTimeout(function () {
      markIfPlaying();
      if (!hasStarted) {
        showFallbackButton();
      }
    }, 1800);

    // Watchdog: keep looping playback alive when browsers auto-pause videos.
    window.setInterval(function () {
      if (document.hidden) {
        return;
      }
      if (mainVideo.ended) {
        mainVideo.currentTime = 0;
      }
      if (mainVideo.readyState >= 2 && mainVideo.paused) {
        tryPlay();
      }
    }, 3000);
  }

  function formatDate(dateText) {
    var d = new Date(dateText);
    if (Number.isNaN(d.getTime())) {
      return '';
    }
    return d.getFullYear() + '年' + String(d.getMonth() + 1).padStart(2, '0') + '月' + String(d.getDate()).padStart(2, '0') + '日';
  }

  function setupReleaseFeed() {
    var root = document.getElementById('release-feed');
    if (!root) {
      return;
    }

    var owner = root.getAttribute('data-owner');
    var repo = root.getAttribute('data-repo');
    if (!owner || !repo) {
      return;
    }

    var latestBtn = document.getElementById('latest-release-button');
    var latestMeta = document.getElementById('release-latest-meta');
    var notes = document.getElementById('release-notes');
    var list = document.getElementById('release-list');

    fetch('https://api.github.com/repos/' + owner + '/' + repo + '/releases')
      .then(function (res) { return res.json(); })
      .then(function (releases) {
        if (!Array.isArray(releases) || releases.length === 0) {
          throw new Error('releases_not_found');
        }

        var latest = releases[0];
        var asset = latest.assets && latest.assets.length ? latest.assets[0] : null;

        if (latestBtn && asset && asset.browser_download_url) {
          latestBtn.href = asset.browser_download_url;
          latestBtn.removeAttribute('aria-disabled');
        }

        if (latestMeta) {
          latestMeta.textContent = '最新: ' + (latest.tag_name || latest.name || 'N/A') + '（' + formatDate(latest.published_at) + '）';
        }

        if (notes) {
          var body = (latest.body || 'リリースノートは公開されていません。').replace(/\r\n/g, '\n');
          notes.textContent = body.slice(0, 2400);
        }

        if (list) {
          list.innerHTML = '';
          var ul = document.createElement('ul');
          releases.slice(1, 8).forEach(function (release) {
            var releaseAsset = release.assets && release.assets.length ? release.assets[0] : null;
            var href = releaseAsset && releaseAsset.browser_download_url ? releaseAsset.browser_download_url : '#';

            var li = document.createElement('li');
            var a = document.createElement('a');
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.href = href;
            a.textContent = release.name || release.tag_name || 'リリース';

            var br = document.createElement('br');
            var small = document.createElement('small');
            small.textContent = formatDate(release.published_at);

            li.appendChild(a);
            li.appendChild(br);
            li.appendChild(small);
            ul.appendChild(li);
          });
          list.appendChild(ul);
        }
      })
      .catch(function () {
        if (latestMeta) {
          latestMeta.textContent = '最新版情報の取得に失敗しました。時間をおいて再度お試しください。';
        }
        if (notes) {
          notes.textContent = 'リリースノートを取得できませんでした。';
        }
        if (list) {
          list.innerHTML = '<p>リリース一覧を取得できませんでした。</p>';
        }
      });
  }

  function setupPurchaseConsent() {
    var checkbox = document.querySelector('[data-purchase-consent-checkbox]');
    var buttonWrap = document.querySelector('[data-purchase-button-wrap]');
    if (!checkbox || !buttonWrap) {
      return;
    }

    var stripeButton = buttonWrap.querySelector('stripe-buy-button');
    var disabledMessage = buttonWrap.querySelector('[data-purchase-disabled-message]');

    var syncState = function () {
      var agreed = checkbox.checked;
      buttonWrap.classList.toggle('is-disabled', !agreed);
      buttonWrap.setAttribute('aria-disabled', agreed ? 'false' : 'true');

      if (!agreed) {
        buttonWrap.setAttribute('inert', '');
      } else {
        buttonWrap.removeAttribute('inert');
      }

      if (stripeButton) {
        stripeButton.tabIndex = agreed ? 0 : -1;
        stripeButton.setAttribute('aria-hidden', agreed ? 'false' : 'true');
      }

      if (disabledMessage) {
        disabledMessage.hidden = agreed;
      }
    };

    checkbox.addEventListener('change', syncState);
    syncState();
  }

  document.addEventListener('DOMContentLoaded', function () {
    setupMobileNav();
    setupScrollProgress();
    setupDeferredHeroMedia();
    setupPrimaryHeroVideoPlayback();
    setupReleaseFeed();
    setupPurchaseConsent();
  });
})();
