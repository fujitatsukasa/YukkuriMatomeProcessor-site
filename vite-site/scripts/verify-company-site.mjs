import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from '@playwright/test'

const root = fileURLToPath(new URL('../dist/', import.meta.url))
const output = process.argv[2]
assert(output && path.isAbsolute(output), 'Provide an absolute evidence directory.')
await mkdir(output, { recursive: true })
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.json': 'application/json' }
const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname)
    let file = path.resolve(root, `.${pathname}`)
    assert(file === path.resolve(root) || file.startsWith(`${path.resolve(root)}${path.sep}`))
    const info = await stat(file)
    if (info.isDirectory()) file = path.join(file, 'index.html')
    response.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' })
    response.end(await readFile(file))
  } catch {
    response.writeHead(404)
    response.end('Not found')
  }
})
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
const origin = `http://127.0.0.1:${server.address().port}`
const browser = await chromium.launch({ headless: true })
const report = { capturePolicy: { foregroundFocusUsed: false, osWindowCaptureUsed: false }, viewports: [], routes: [], errors: [] }

try {
  for (const width of [1512, 1024, 768, 390, 320]) {
    const context = await browser.newContext({
      viewport: { width, height: width > 800 ? 982 : 844 },
      ...(width === 1512 ? { recordVideo: { dir: path.join(output, 'video'), size: { width: 1512, height: 982 } } } : {}),
    })
    const page = await context.newPage()
    page.on('pageerror', (error) => report.errors.push({ width, message: error.message }))
    await page.goto(origin, { waitUntil: 'networkidle' })
    await assert.doesNotReject(() => page.getByRole('heading', { level: 1 }).waitFor())
    assert.match(await page.title(), /OTM株式会社/)
    assert.equal(await page.locator('h1').count(), 1)
    assert.equal(await page.locator('main').count(), 1)
    assert.equal(await page.locator('link[rel="canonical"]').count(), 1)
    const metrics = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      width: innerWidth,
      clippedHeadings: Array.from(document.querySelectorAll('.company-site h1, .company-site h2, .company-site h3')).filter((node) => node.getBoundingClientRect().right > innerWidth + 1).map((node) => node.textContent),
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href'),
      company: JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent).name,
    }))
    assert(metrics.scrollWidth <= width + 1, `Horizontal overflow at ${width}px`)
    assert.deepEqual(metrics.clippedHeadings, [], `Clipped heading at ${width}px`)
    assert.equal(metrics.canonical, 'https://yukkurimatomeprocessor.com/')
    assert.equal(metrics.company, 'OTM株式会社')
    report.viewports.push({ width, ...metrics })
    if (width <= 800) {
      const toggle = page.locator('#company-menu-toggle')
      await toggle.click()
      assert.equal(await toggle.getAttribute('aria-expanded'), 'true')
      await page.keyboard.press('Escape')
      assert.equal(await toggle.getAttribute('aria-expanded'), 'false')
      await toggle.click()
      await page.locator('#company-navigation').getByRole('link', { name: '会社概要', exact: true }).click()
      assert.equal(await toggle.getAttribute('aria-expanded'), 'false')
      assert.match(page.url(), /#company$/)
    }
    for (const id of ['about', 'business', 'products', 'company', 'contact']) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded()
      await page.waitForTimeout(width === 1512 ? 800 : 100)
    }
    await page.locator('.company-product-visual').scrollIntoViewIfNeeded()
    assert(await page.locator('.company-product-visual img').evaluate((image) => image.complete && image.naturalWidth > 0), 'Product screenshot did not load')
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
    if (width === 1512 || width === 390 || width === 320) {
      await page.screenshot({ path: path.join(output, `company-${width}.png`), fullPage: true })
      if (width === 1512) await page.screenshot({ path: path.join(output, 'company-desktop-first-view.png') })
      if (width === 390) await page.screenshot({ path: path.join(output, 'company-mobile-first-view.png') })
    }
    const mailLinks = await page.locator('a[href^="mailto:"]').evaluateAll((links) => links.map((link) => link.getAttribute('href')))
    assert(mailLinks.length >= 2 && mailLinks.every((href) => href.startsWith('mailto:fujita.otm@gmail.com?')))
    await page.getByRole('link', { name: '製品について詳しく見る', exact: true }).click()
    await page.locator('.home-lp').waitFor({ state: 'attached' }).catch(() => page.locator('.home-lp-hero').waitFor({ state: 'attached' }))
    assert.match(page.url(), /\/products\/ymp\/$/)
    assert.match(await page.title(), /ゆっくりまとめプロセッサー/)
    assert.match(await page.locator('h1').innerText(), /素材集め/)
    await page.reload({ waitUntil: 'networkidle' })
    assert.equal(await page.locator('link[rel="canonical"]').count(), 1, 'Duplicate canonical after hydration')
    assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), 'https://yukkurimatomeprocessor.com/products/ymp/')
    await page.getByRole('link', { name: '運営会社 OTM株式会社', exact: true }).click()
    await page.locator('.company-site').waitFor()
    assert.match(await page.title(), /OTM株式会社/)
    assert.equal(await page.locator('link[rel="canonical"]').count(), 1)
    await context.close()
    console.log(`PASS: ${width}px layout and company/product navigation`)
  }
  const noJs = await browser.newContext({ javaScriptEnabled: false })
  const page = await noJs.newPage()
  for (const route of ['/', '/products/ymp/', '/download/', '/purchase/', '/contact/', '/legal/privacy/']) {
    const response = await page.goto(`${origin}${route}`)
    assert.equal(response.status(), 200, `Route missing: ${route}`)
    assert.equal(await page.locator('h1').count(), 1, `Static content missing: ${route}`)
    report.routes.push({ route, status: response.status(), staticHeading: await page.locator('h1').innerText() })
  }
  await noJs.close()
  assert.deepEqual(report.errors, [], 'Browser errors occurred')
  await writeFile(path.join(output, 'result.json'), JSON.stringify(report, null, 2))
  console.log(`PASS: 5 viewport sizes, mobile navigation, product routing, email links, 6 static routes. Evidence: ${output}`)
} finally {
  await browser.close()
  await new Promise((resolve) => server.close(resolve))
}
