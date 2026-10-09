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
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.webm': 'video/webm', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.json': 'application/json' }
const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname)
    let file = path.resolve(root, `.${pathname}`)
    assert(file === path.resolve(root) || file.startsWith(`${path.resolve(root)}${path.sep}`))
    if ((await stat(file)).isDirectory()) file = path.join(file, 'index.html')
    response.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' })
    response.end(await readFile(file))
  } catch { response.writeHead(404); response.end('Not found') }
})
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
const origin = process.argv[3] || `http://127.0.0.1:${server.address().port}`
const corporate = ['/', '/about/', '/services/', '/portfolio/', '/portfolio/ymp/', '/portfolio/otm-website/', '/portfolio/3d-study/', '/inquiry/', '/privacy/']
const browser = await chromium.launch({ headless: true })
const report = { origin, capturePolicy: { foregroundFocusUsed: false, osWindowCaptureUsed: false }, viewports: [], routes: [], motion: {}, errors: [], assetFailures: [] }
const filename = (route) => route === '/' ? 'home' : route.replaceAll('/', '-').replace(/^-|-$/g, '')

async function checkPage(page, width, route) {
  const response = await page.goto(`${origin}${route}`, { waitUntil: 'networkidle' })
  assert.equal(response.status(), 200, `Route missing: ${route}`)
  await page.locator('.company-site h1').waitFor()
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(1300)
  assert.equal(await page.locator('h1').count(), 1, `${route}: heading`)
  assert.equal(await page.locator('main').count(), 1)
  assert.equal(await page.locator('link[rel="canonical"]').count(), 1)
  assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), `https://yukkurimatomeprocessor.com${route}`)
  assert.equal(await page.locator('.company-site img[src*="product_get_script"]').count(), 0, 'Old application screenshot leaked into company pages')
  const metrics = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    width: innerWidth,
    clippedHeadings: Array.from(document.querySelectorAll('.company-site h1, .company-site h2, .company-site h3')).filter((node) => { const box = node.getBoundingClientRect(); return box.right > innerWidth + 1 || box.left < -1 }).map((node) => node.textContent),
    organization: JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent),
  }))
  assert(metrics.scrollWidth <= width + 1, `Horizontal overflow: ${route}, ${width}px, ${metrics.scrollWidth}px`)
  assert.deepEqual(metrics.clippedHeadings, [], `Clipped heading: ${route}, ${width}px`)
  assert.equal(metrics.organization.name, 'OTM株式会社')
  assert.equal(metrics.organization.identifier, '1021001079599')
  await page.evaluate(async () => {
    for (let top = 0; top < document.documentElement.scrollHeight; top += innerHeight * .65) {
      window.scrollTo({ top, behavior: 'instant' })
      await new Promise((resolve) => setTimeout(resolve, 60))
    }
  })
  for (const image of await page.locator('.company-site img').all()) {
    await image.scrollIntoViewIfNeeded()
    await image.evaluate((node) => node.decode())
  }
  await page.waitForTimeout(1000)
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  await page.waitForTimeout(150)
  if ([1512, 390, 320].includes(width)) await page.screenshot({ path: path.join(output, `${filename(route)}-${width}.png`), fullPage: true })
  report.viewports.push({ route, width, scrollWidth: metrics.scrollWidth, heading: await page.locator('h1').innerText() })
}

try {
  for (const width of [1512, 1024, 768, 390, 320]) {
    const context = await browser.newContext({ viewport: { width, height: width > 800 ? 982 : 844 } })
    const page = await context.newPage()
    page.on('pageerror', (error) => report.errors.push({ width, message: error.message }))
    page.on('response', (response) => { if (response.status() >= 400 && /\/company\/|\/assets\//.test(response.url())) report.assetFailures.push({ width, url: response.url(), status: response.status() }) })
    for (const route of corporate) await checkPage(page, width, route)
    await page.goto(origin, { waitUntil: 'networkidle' })
    if (width <= 800) {
      const toggle = page.locator('#company-menu-toggle')
      await toggle.click()
      assert.equal(await toggle.getAttribute('aria-expanded'), 'true')
      await page.keyboard.press('Escape')
      assert.equal(await toggle.getAttribute('aria-expanded'), 'false')
      await toggle.click()
      await page.locator('#company-navigation').getByRole('link', { name: '会社案内', exact: true }).click()
      assert.match(page.url(), /\/about\/$/)
      assert.equal(await toggle.getAttribute('aria-expanded'), 'false')
      assert.equal(await page.locator('#company-navigation a[aria-current="page"]').innerText(), '会社案内')
    }
    await page.goto(`${origin}/portfolio/`, { waitUntil: 'networkidle' })
    await page.locator('a[href="/portfolio/ymp/"]').first().click()
    await page.getByRole('link', { name: '製品について詳しく見る', exact: true }).click()
    assert.match(page.url(), /\/products\/ymp\/$/)
    await page.locator('.home-lp-hero').waitFor({ state: 'attached' })
    await page.reload({ waitUntil: 'networkidle' })
    assert.equal(await page.locator('link[rel="canonical"]').count(), 1)
    assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), 'https://yukkurimatomeprocessor.com/products/ymp/')
    await page.getByRole('link', { name: '運営会社 OTM株式会社', exact: true }).click()
    await page.locator('.company-site').waitFor()
    await page.goto(`${origin}/inquiry/`, { waitUntil: 'networkidle' })
    assert.match(await page.locator('a[href^="mailto:"]').first().getAttribute('href'), /^mailto:fujita\.otm@gmail\.com\?subject=/)
    if (width === 1512) {
      await page.goto(origin, { waitUntil: 'networkidle' })
      const canvas = page.locator('.company-motion-canvas[data-rendered="true"]')
      await canvas.waitFor()
      const frame = await canvas.evaluate((node) => node.toDataURL())
      await page.waitForTimeout(500)
      assert.notEqual(await canvas.evaluate((node) => node.toDataURL()), frame)
      await page.getByRole('button', { name: 'モーショングラフィックを停止', exact: true }).click()
      await page.waitForTimeout(100)
      const stopped = await canvas.evaluate((node) => node.toDataURL())
      await page.waitForTimeout(400)
      assert.equal(await canvas.evaluate((node) => node.toDataURL()), stopped)
      report.motion = { canvasAdvances: true, pauseFreezesFrame: true, fonts: await page.evaluate(() => ({ display: document.fonts.check('900 40px "Zen Kaku Gothic New"'), latin: document.fonts.check('800 40px Manrope'), body: document.fonts.check('400 16px "Noto Sans JP"') })) }
      assert(Object.values(report.motion.fonts).every(Boolean))
      await page.goto(`${origin}/portfolio/3d-study/`, { waitUntil: 'networkidle' })
      const player = page.locator('video')
      await player.scrollIntoViewIfNeeded()
      const video = await player.evaluate(async (node) => { await node.play(); return { width: node.videoWidth, height: node.videoHeight, duration: node.duration, time: node.currentTime, controls: node.controls } })
      assert(video.width > 0 && video.height > 0 && video.duration >= 3.9 && video.controls)
      await page.waitForTimeout(600)
      assert((await player.evaluate((node) => node.currentTime)) > video.time)
      await player.evaluate((node) => node.pause())
      report.motion.blenderVideo = video
      await page.screenshot({ path: path.join(output, 'blender-video-playing.png') })
    }
    await context.close()
    console.log(`PASS: ${width}px, all 9 company pages and product navigation`)
  }
  const reduced = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1512, height: 982 } })
  const reducedPage = await reduced.newPage()
  await reducedPage.goto(origin, { waitUntil: 'networkidle' })
  const still = await reducedPage.locator('.company-motion-canvas').evaluate((node) => node.toDataURL())
  await reducedPage.waitForTimeout(500)
  assert.equal(await reducedPage.locator('.company-motion-canvas').evaluate((node) => node.toDataURL()), still)
  assert.equal(await reducedPage.locator('.company-motion-scene').getAttribute('data-motion'), 'reduced')
  assert.equal(await reducedPage.locator('.company-motion-toggle').isVisible(), false)
  assert.equal(await reducedPage.locator('.company-site').evaluate((node) => node.getAnimations({ subtree: true }).filter((animation) => animation.playState === 'running').length), 0)
  await reducedPage.goto(`${origin}/portfolio/3d-study/`, { waitUntil: 'networkidle' })
  assert.equal(await reducedPage.locator('video').evaluate((node) => node.paused && !node.autoplay), true)
  report.motion.reducedMotionStatic = true
  await reduced.close()
  const noJs = await browser.newContext({ javaScriptEnabled: false })
  const page = await noJs.newPage()
  for (const route of [...corporate, '/products/ymp/', '/download/', '/purchase/', '/contact/', '/legal/privacy/']) {
    const response = await page.goto(`${origin}${route}`)
    assert.equal(response.status(), 200, `Static route missing: ${route}`)
    assert.equal(await page.locator('h1').count(), 1)
    if (route === '/') { assert(await page.locator('.company-motion-fallback').isVisible()); report.motion.noJsFallback = true }
    if (corporate.includes(route)) {
      assert.equal(await page.locator('h1').evaluate((node) => getComputedStyle(node).opacity), '1')
      assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), `https://yukkurimatomeprocessor.com${route}`)
    }
    report.routes.push({ route, status: response.status(), heading: await page.locator('h1').innerText() })
  }
  await noJs.close()
  assert.deepEqual(report.errors, [], 'Browser errors occurred')
  assert.deepEqual(report.assetFailures, [], 'Company assets missing')
  await writeFile(path.join(output, 'result.json'), JSON.stringify(report, null, 2))
  console.log(`PASS: 45 responsive pages, 14 static routes, motion controls, Blender playback, fonts, reduced motion, navigation. Evidence: ${output}`)
} finally { await browser.close(); await new Promise((resolve) => server.close(resolve)) }
