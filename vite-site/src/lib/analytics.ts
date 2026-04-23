type AnalyticsValue = string | number | boolean

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
    gtag?: (...args: unknown[]) => void
    __siteAnalyticsEvents?: Array<Record<string, unknown>>
  }
}

function sanitizeParams(params: Record<string, AnalyticsValue | null | undefined>) {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null),
  ) as Record<string, AnalyticsValue>
}

export function trackEvent(
  name: string,
  params: Record<string, AnalyticsValue | null | undefined> = {},
) {
  if (typeof window === 'undefined') {
    return
  }

  const cleanParams = sanitizeParams(params)
  const eventPayload = {
    event: name,
    ...cleanParams,
    timestamp: new Date().toISOString(),
  }

  if (typeof window.gtag === 'function') {
    window.gtag('event', name, cleanParams)
  }

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push(eventPayload)
  }

  window.__siteAnalyticsEvents ??= []
  window.__siteAnalyticsEvents.push(eventPayload)

  window.dispatchEvent(new CustomEvent('site:track', { detail: eventPayload }))
}
