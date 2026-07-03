import { expect, test } from '@playwright/test'

const pages = [
  { path: '/', heading: '素材集めから台本づくりYMM4前準備までひとつの制作フローに' },
  { path: '/download/', heading: '配布条件と公開状況を確認する' },
  { path: '/instructions/', heading: '記事URLから台本を取得し、YMM4に渡す' },
  { path: '/samples/', heading: '実アプリ画面と動画サンプルで、使う前の対応範囲を確認する' },
  { path: '/faq/', heading: '導入前によくある質問' },
  { path: '/purchase/', heading: '料金プラン｜法人220,000円とPremium条件を確認' },
  { path: '/legal/commercial-transactions/', heading: '特定商取引法に基づく表記' },
]

test.describe('mobile layout', () => {
  for (const entry of pages) {
    test(`${entry.path} renders without page-level horizontal overflow`, async ({ page }) => {
      await page.goto(entry.path, { waitUntil: 'networkidle' })
      await expect(page.locator('h1').first()).toContainText(entry.heading)
      await expect(page.locator('.brand-nav-toggle')).toBeVisible()

      const viewport = page.viewportSize()
      if (!viewport) {
        throw new Error('viewport is not available')
      }

      const metrics = await page.evaluate(() => {
        const root = document.documentElement
        const body = document.body
        const main = document.querySelector<HTMLElement>('.brand-main')
        const actions = Array.from(document.querySelectorAll<HTMLElement>('.brand-inline-actions'))
        const legalWraps = Array.from(document.querySelectorAll<HTMLElement>('.legal-table-wrap'))
        const pricingWraps = Array.from(document.querySelectorAll<HTMLElement>('.pricing-comparison-table-scroll'))
        return {
          bodyScrollWidth: body.scrollWidth,
          docScrollWidth: root.scrollWidth,
          mainScrollWidth: main?.scrollWidth ?? 0,
          mainClientWidth: main?.clientWidth ?? 0,
          actionsOverflow: actions.some((node) => node.scrollWidth > node.clientWidth + 1),
          legalWrapsScrollable: legalWraps.every((node) => {
            const overflowX = getComputedStyle(node).overflowX
            return overflowX === 'auto' || overflowX === 'scroll'
          }),
          legalWrapCount: legalWraps.length,
          legalTableProtected: legalWraps.every(
            (node) => node.clientWidth <= root.clientWidth + 1 && node.scrollWidth >= node.clientWidth,
          ),
          pricingWrapsScrollable: pricingWraps.every((node) => {
            const overflowX = getComputedStyle(node).overflowX
            return overflowX === 'auto' || overflowX === 'scroll'
          }),
          pricingWrapCount: pricingWraps.length,
          pricingTableProtected: pricingWraps.every(
            (node) => node.clientWidth <= root.clientWidth + 1 && node.scrollWidth >= node.clientWidth,
          ),
        }
      })

      expect(metrics.bodyScrollWidth).toBeLessThanOrEqual(viewport.width + 1)
      expect(metrics.docScrollWidth).toBeLessThanOrEqual(viewport.width + 1)
      expect(metrics.actionsOverflow).toBeFalsy()

      if (metrics.pricingWrapCount > 0) {
        expect(metrics.mainClientWidth).toBeLessThanOrEqual(viewport.width + 1)
        expect(metrics.pricingWrapsScrollable).toBeTruthy()
        expect(metrics.pricingTableProtected).toBeTruthy()
      } else {
        expect(metrics.mainScrollWidth).toBeLessThanOrEqual(viewport.width + 1)
      }

      if (entry.path.includes('/legal/')) {
        expect(metrics.legalWrapCount).toBeGreaterThan(0)
        expect(metrics.legalWrapsScrollable).toBeTruthy()
        expect(metrics.legalTableProtected).toBeTruthy()
      }
    })

    test(`${entry.path} keeps layout stable with larger text`, async ({ page }) => {
      await page.addInitScript(() => {
        document.documentElement.style.fontSize = '18px'
      })
      await page.goto(entry.path, { waitUntil: 'networkidle' })

      const viewport = page.viewportSize()
      if (!viewport) {
        throw new Error('viewport is not available')
      }

      const metrics = await page.evaluate(() => ({
        bodyScrollWidth: document.body.scrollWidth,
        docScrollWidth: document.documentElement.scrollWidth,
        actionRows: Array.from(document.querySelectorAll<HTMLElement>('.brand-inline-actions')).map((node) => {
          const rect = node.getBoundingClientRect()
          return { width: rect.width, right: rect.right }
        }),
      }))

      expect(metrics.bodyScrollWidth).toBeLessThanOrEqual(viewport.width + 1)
      expect(metrics.docScrollWidth).toBeLessThanOrEqual(viewport.width + 1)
      expect(metrics.actionRows.every((row) => row.right <= viewport.width + 1)).toBeTruthy()
    })
  }

  test('legacy uppercase routes redirect to canonical lowercase pages', async ({ page }) => {
    const routes = [
      { from: '/Instructions/', to: '/instructions/', heading: '記事URLから台本を取得し、YMM4に渡す' },
      { from: '/FAQ/', to: '/faq/', heading: '導入前によくある質問' },
    ]

    for (const route of routes) {
      await page.goto(route.from, { waitUntil: 'networkidle' })
      await expect(page).toHaveURL(new RegExp(`${route.to.replace(/\//g, '\\/')}$`))
      await expect(page.locator('h1').first()).toContainText(route.heading)
    }
  })

  test('home hero shows the product screen before long conditions on the first viewport', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })

    const metrics = await page.evaluate(() => {
      const heroImage = document.querySelector<HTMLImageElement>('.home-lp-hero__visual img')
      const primaryCta = document.getElementById('home-hero-primary-cta')
      const facts = document.querySelector<HTMLElement>('.home-lp-hero__facts')
      const imageRect = heroImage?.getBoundingClientRect()
      const ctaRect = primaryCta?.getBoundingClientRect()
      const factsRect = facts?.getBoundingClientRect()

      return {
        viewportHeight: window.innerHeight,
        ctaVisible: Boolean(ctaRect && ctaRect.top >= 0 && ctaRect.bottom <= window.innerHeight),
        imageVisible: Boolean(imageRect && imageRect.top < window.innerHeight && imageRect.height >= 120),
        imageBeforeFacts: Boolean(imageRect && factsRect && imageRect.top < factsRect.top),
      }
    })

    expect(metrics.ctaVisible).toBeTruthy()
    expect(metrics.imageVisible).toBeTruthy()
    expect(metrics.imageBeforeFacts).toBeTruthy()
  })

  test('home sticky CTA is removed while inline CTAs are visible', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    await expect(page.locator('.home-lp-sticky-cta')).toHaveCount(0)

    await page.locator('#product').scrollIntoViewIfNeeded()
    await expect(page.locator('.home-lp-sticky-cta')).toBeVisible()

    await page.locator('#home-pricing-distribution-cta').scrollIntoViewIfNeeded()
    await expect(page.locator('.home-lp-sticky-cta')).toHaveCount(0)
  })

  test('home pricing comparison keeps distribution, Premium, and corporate labels on mobile cards', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    await page.locator('#pricing').scrollIntoViewIfNeeded()

    const labels = await page.locator('.home-lp-comparison__mobile-label').allInnerTexts()
    expect(labels).toContain('配布確認')
    expect(labels).toContain('Premium')
    expect(labels).toContain('法人')
  })
})
