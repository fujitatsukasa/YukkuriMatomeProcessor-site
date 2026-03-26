import { expect, test } from '@playwright/test'

const pages = [
  { path: '/', heading: '反応集・ゆっくり解説のネタ収集、台本作成、YMM4準備を1つに。' },
  { path: '/download/', heading: '最新版を安全に入手する' },
  { path: '/instructions/', heading: '初期設定から編集開始までを3ステップで進める' },
  { path: '/faq/', heading: '導入前後によくある質問' },
  { path: '/purchase/', heading: '購入前に契約条件を確認する' },
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
        return {
          bodyScrollWidth: body.scrollWidth,
          docScrollWidth: root.scrollWidth,
          mainScrollWidth: main?.scrollWidth ?? 0,
          actionsOverflow: actions.some((node) => node.scrollWidth > node.clientWidth + 1),
          legalWrapsScrollable: legalWraps.every((node) => {
            const overflowX = getComputedStyle(node).overflowX
            return overflowX === 'auto' || overflowX === 'scroll'
          }),
          legalWrapCount: legalWraps.length,
          legalTableProtected: legalWraps.every(
            (node) => node.clientWidth <= root.clientWidth + 1 && node.scrollWidth >= node.clientWidth,
          ),
        }
      })

      expect(metrics.bodyScrollWidth).toBeLessThanOrEqual(viewport.width + 1)
      expect(metrics.docScrollWidth).toBeLessThanOrEqual(viewport.width + 1)
      expect(metrics.mainScrollWidth).toBeLessThanOrEqual(viewport.width + 1)
      expect(metrics.actionsOverflow).toBeFalsy()

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
      { from: '/Instructions/', to: '/instructions/', heading: '初期設定から編集開始までを3ステップで進める' },
      { from: '/FAQ/', to: '/faq/', heading: '導入前後によくある質問' },
    ]

    for (const route of routes) {
      await page.goto(route.from, { waitUntil: 'networkidle' })
      await expect(page).toHaveURL(new RegExp(`${route.to.replace(/\//g, '\\/')}$`))
      await expect(page.locator('h1').first()).toContainText(route.heading)
    }
  })
})
