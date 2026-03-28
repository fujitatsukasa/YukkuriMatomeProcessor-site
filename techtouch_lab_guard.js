(() => {
  const REMOTE_ORIGIN = __REMOTE_ORIGIN__;
  const REMOTE_URL = __REMOTE_URL__;
  const LAB_PROXY_PATH = __LAB_PROXY_PATH__;
  const URL_ATTRIBUTES = __URL_ATTRIBUTES__;
  const STYLE_ATTR = "style";

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function siteLabGtag() {
      window.dataLayer.push(arguments);
    };
  window.appear = window.appear || function siteLabAppear() {};
  globalThis.gtag = window.gtag;
  globalThis.appear = window.appear;

  const toProxyUrl = (value) => LAB_PROXY_PATH + "?target=" + encodeURIComponent(value);
  const isLocalProxyUrl = (value) =>
    typeof value === "string" &&
    (value.startsWith(LAB_PROXY_PATH) || value.includes(LAB_PROXY_PATH + "?target="));

  const normalizeAbsoluteUrl = (value) => {
    if (!value || typeof value !== "string") {
      return value;
    }

    const trimmed = value.trim().replace(/^(?:%20|\s)+/gi, "");
    if (isLocalProxyUrl(trimmed)) {
      return new URL(trimmed, window.location.origin).toString();
    }
    if (
      !trimmed ||
      trimmed.startsWith("#") ||
      trimmed.startsWith("mailto:") ||
      trimmed.startsWith("tel:") ||
      trimmed.startsWith("javascript:") ||
      trimmed.startsWith("data:") ||
      trimmed.startsWith("blob:")
    ) {
      return trimmed;
    }

    if (/^https?:\/\//i.test(trimmed)) {
      return trimmed;
    }

    if (trimmed.startsWith("//")) {
      return "https:" + trimmed;
    }

    try {
      return new URL(trimmed, REMOTE_URL).toString();
    } catch {
      return trimmed;
    }
  };

  const normalizeUrl = (value) => {
    const absolute = normalizeAbsoluteUrl(value);
    if (isLocalProxyUrl(absolute)) {
      return absolute;
    }
    try {
      const parsed = new URL(absolute);
      return parsed.origin === REMOTE_ORIGIN ? toProxyUrl(absolute) : absolute;
    } catch {
      return absolute;
    }
  };

  const rewriteSrcset = (value) =>
    value
      .split(",")
      .map((entry) => {
        const [candidate, descriptor] = entry.trim().replace(/^(?:%20|\s)+/gi, "").split(/\s+/, 2);
        const normalized = normalizeUrl(candidate);
        return descriptor ? normalized + " " + descriptor : normalized;
      })
      .join(", ");

  const rewriteStyleUrls = (value) =>
    value.replace(/url\((['"]?)([^)'"]+)\1\)/gi, (match, quote, candidate) => {
      const normalized = normalizeUrl(candidate);
      return "url(" + (quote || "") + normalized + (quote || "") + ")";
    });

  const shouldProxyElementUrl = (element, absolute) => {
    try {
      const parsed = new URL(absolute);
      if (parsed.origin !== REMOTE_ORIGIN) {
        return false;
      }
    } catch {
      return false;
    }

    const tagName = element.tagName;
    if (tagName === "SCRIPT" || tagName === "A" || tagName === "FORM" || tagName === "IFRAME") {
      return false;
    }

    if (tagName === "LINK") {
      const rel = (element.getAttribute("rel") || "").toLowerCase();
      const as = (element.getAttribute("as") || "").toLowerCase();
      if (
        rel.includes("canonical") ||
        rel.includes("alternate") ||
        rel.includes("preconnect") ||
        rel.includes("dns-prefetch") ||
        rel.includes("modulepreload") ||
        (rel.includes("preload") && as === "script")
      ) {
        return false;
      }
    }

    return true;
  };

  const normalizeElementUrl = (element, value) => {
    const absolute = normalizeAbsoluteUrl(value);
    return shouldProxyElementUrl(element, absolute) ? toProxyUrl(absolute) : absolute;
  };

  const rewriteAttribute = (element, attributeName) => {
    const normalizedAttributeName = attributeName.toLowerCase();
    if (!(element instanceof Element) || !element.hasAttribute(normalizedAttributeName)) {
      return;
    }

    const currentValue = element.getAttribute(normalizedAttributeName);
    if (!currentValue) {
      return;
    }

    let nextValue = currentValue;
    if (normalizedAttributeName === "srcset" || normalizedAttributeName === "imagesrcset") {
      nextValue = rewriteSrcset(currentValue);
    } else if (normalizedAttributeName === STYLE_ATTR) {
      nextValue = rewriteStyleUrls(currentValue);
    } else {
      nextValue = normalizeElementUrl(element, currentValue);
    }

    if (nextValue && nextValue !== currentValue) {
      element.setAttribute(normalizedAttributeName, nextValue);
    }
  };

  const rewriteNode = (node) => {
    if (!(node instanceof Element)) {
      return;
    }

    URL_ATTRIBUTES.forEach((attributeName) => rewriteAttribute(node, attributeName));
    rewriteAttribute(node, STYLE_ATTR);

    if (node instanceof HTMLStyleElement && node.textContent) {
      const nextCss = rewriteStyleUrls(node.textContent);
      if (nextCss !== node.textContent) {
        node.textContent = nextCss;
      }
    }

    node.querySelectorAll?.("*").forEach((element) => {
      URL_ATTRIBUTES.forEach((attributeName) => rewriteAttribute(element, attributeName));
      rewriteAttribute(element, STYLE_ATTR);
      if (element instanceof HTMLStyleElement && element.textContent) {
        const nextCss = rewriteStyleUrls(element.textContent);
        if (nextCss !== element.textContent) {
          element.textContent = nextCss;
        }
      }
    });
  };

  const rewriteDocument = () => {
    rewriteNode(document.documentElement);
  };

  const toRewrittenRequest = (input) => {
    try {
      if (typeof input === "string") {
        return normalizeUrl(input);
      }

      if (input instanceof URL) {
        return normalizeUrl(input.toString());
      }

      if (input instanceof Request) {
        const rewrittenUrl = normalizeUrl(input.url);
        return new Request(rewrittenUrl, input);
      }
    } catch {
      return input;
    }

    return input;
  };

  const originalFetch = window.fetch.bind(window);
  window.fetch = (input, init) => originalFetch(toRewrittenRequest(input), init);

  const originalXhrOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function open(method, url, ...rest) {
    return originalXhrOpen.call(this, method, normalizeUrl(String(url)), ...rest);
  };

  const originalSendBeacon = navigator.sendBeacon?.bind(navigator);
  if (originalSendBeacon) {
    navigator.sendBeacon = (url, data) => originalSendBeacon(normalizeUrl(String(url)), data);
  }

  const originalReplaceState = history.replaceState.bind(history);
  const originalPushState = history.pushState.bind(history);
  const normalizeHistoryUrl = (value) => {
    if (typeof value !== "string" || !value) {
      return value;
    }

    const absolute = normalizeAbsoluteUrl(value);
    try {
      const parsed = new URL(absolute);
      if (parsed.origin === REMOTE_ORIGIN) {
        return parsed.pathname + parsed.search + parsed.hash;
      }
    } catch {}

    return value;
  };

  history.replaceState = (state, unused, url) => originalReplaceState(state, unused, normalizeHistoryUrl(url));
  history.pushState = (state, unused, url) => originalPushState(state, unused, normalizeHistoryUrl(url));

  const OriginalEventSource = window.EventSource;
  if (OriginalEventSource) {
    window.EventSource = class SiteLabEventSource extends OriginalEventSource {
      constructor(url, configuration) {
        super(normalizeUrl(String(url)), configuration);
      }
    };
  }

  const OriginalWebSocket = window.WebSocket;
  if (OriginalWebSocket) {
    window.WebSocket = class SiteLabWebSocket extends OriginalWebSocket {
      constructor(url, protocols) {
        super(normalizeUrl(String(url)).replace(/^http/i, "ws"), protocols);
      }
    };
  }

  const originalSetAttribute = Element.prototype.setAttribute;
  Element.prototype.setAttribute = function patchedSetAttribute(name, value) {
    const normalizedName = String(name).toLowerCase();
    if (URL_ATTRIBUTES.includes(normalizedName)) {
      const nextValue =
        normalizedName === "srcset" || normalizedName === "imagesrcset"
          ? rewriteSrcset(String(value))
          : normalizeElementUrl(this, String(value));
      return originalSetAttribute.call(this, normalizedName, nextValue);
    }

    if (normalizedName === STYLE_ATTR) {
      return originalSetAttribute.call(this, normalizedName, rewriteStyleUrls(String(value)));
    }

    return originalSetAttribute.call(this, name, value);
  };

  const patchUrlProperty = (Ctor, propertyName) => {
    if (!Ctor?.prototype) {
      return;
    }

    const descriptor = Object.getOwnPropertyDescriptor(Ctor.prototype, propertyName);
    if (!descriptor?.set || !descriptor.get) {
      return;
    }

    Object.defineProperty(Ctor.prototype, propertyName, {
      configurable: true,
      enumerable: descriptor.enumerable ?? true,
      get: descriptor.get,
      set(value) {
        const rawValue = String(value);
        const nextValue =
          propertyName === "srcset" || propertyName === "imagesrcset"
            ? rewriteSrcset(rawValue)
            : normalizeElementUrl(this, rawValue);
        descriptor.set.call(this, nextValue);
      },
    });
  };

  patchUrlProperty(window.HTMLScriptElement, "src");
  patchUrlProperty(window.HTMLLinkElement, "href");
  patchUrlProperty(window.HTMLAnchorElement, "href");
  patchUrlProperty(window.HTMLFormElement, "action");
  patchUrlProperty(window.HTMLIFrameElement, "src");
  patchUrlProperty(window.HTMLImageElement, "src");
  patchUrlProperty(window.HTMLImageElement, "srcset");
  patchUrlProperty(window.HTMLSourceElement, "src");
  patchUrlProperty(window.HTMLSourceElement, "srcset");
  patchUrlProperty(window.HTMLVideoElement, "src");
  patchUrlProperty(window.HTMLVideoElement, "poster");
  patchUrlProperty(window.HTMLAudioElement, "src");

  const mutationObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach((node) => rewriteNode(node));
      if (mutation.type === "attributes" && mutation.target instanceof Element && mutation.attributeName) {
        rewriteAttribute(mutation.target, mutation.attributeName);
      }
    }
  });

  const boot = () => {
    rewriteDocument();
    mutationObserver.observe(document.documentElement, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: [...URL_ATTRIBUTES, STYLE_ATTR],
    });
  };

  const revealFallbackMotionNodes = () => {
    const main = document.querySelector("main");
    if (main instanceof HTMLElement && main.getBoundingClientRect().height > window.innerHeight) {
      const maxBottom = [...main.children].reduce((largest, child) => {
        if (!(child instanceof HTMLElement)) {
          return largest;
        }
        return Math.max(largest, child.getBoundingClientRect().bottom + window.scrollY);
      }, main.getBoundingClientRect().bottom + window.scrollY);
      const targetHeight = Math.ceil(maxBottom);
      document.documentElement.style.height = targetHeight + "px";
      document.body.style.height = targetHeight + "px";
    }

    document
      .querySelectorAll(
        'main [style*="opacity:0"], main [style*="opacity: 0"], main [style*="transform: translate"], main [style*="transform:translate"]',
      )
      .forEach((node) => {
        if (!(node instanceof HTMLElement)) {
          return;
        }

        if (node.style.opacity === "0") {
          node.style.opacity = "1";
        }

        if (/translate|matrix/i.test(node.style.transform)) {
          node.style.transform = "none";
        }
      });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }

  window.addEventListener("load", () => {
    window.setTimeout(revealFallbackMotionNodes, 1200);
    window.setTimeout(revealFallbackMotionNodes, 2800);
  });

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register = async () => {
      throw new Error("site-lab service worker disabled");
    };
  }
})();
