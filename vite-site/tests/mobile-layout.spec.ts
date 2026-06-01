import { expect, test } from '@playwright/test'

const pages = [
  { path: '/', heading: '記事URLから' },
  { path: '/download/', heading: '最新版を無料ダウンロード' },
  { path: '/instructions/', heading: '記事URLから台本を取得し、YMM4に渡す' },
  { path: '/samples/', heading: '実アプリ画面と動画サンプルで、入力から出力まで確認する' },
  { path: '/faq/', heading: '導入前によくある質問' },
  { path: '/purchase/', heading: 'Freeで試して' },
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
})
