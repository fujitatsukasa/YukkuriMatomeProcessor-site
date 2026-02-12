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
    setupPurchaseConsent();
  });
})();
