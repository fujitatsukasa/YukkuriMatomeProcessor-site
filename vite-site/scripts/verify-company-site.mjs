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
const corporate = ['/', '/mission/', '/about/', '/services/', '/technology/', '/portfolio/', '/portfolio/ymp/', '/portfolio/otm-website/', '/portfolio/3d-study/', '/inquiry/', '/privacy/']
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
  for (const visual of await page.locator('.company-work-media--software').all()) {
    const flow = await visual.locator('.company-work-flow').boundingBox()
    const caption = await visual.locator('.company-work-visual-caption').boundingBox()
    assert(flow && caption && flow.y + flow.height + 4 <= caption.y, `${route}, ${width}px: software workflow overlaps its caption`)
  }
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
      await page.evaluate(() => document.fonts.ready)
      await page.waitForTimeout(1300)
      const scene = page.locator('.company-motion-scene')
      assert.equal(await scene.getAttribute('data-renderer'), 'webgl')
      const frame = await canvas.screenshot()
      await page.waitForTimeout(500)
      assert(!(await canvas.screenshot()).equals(frame), 'Visible WebGL frame did not advance')
      await page.getByRole('button', { name: 'モーショングラフィックを停止', exact: true }).click()
      await page.waitForTimeout(100)
      const stopped = await canvas.screenshot()
      const stoppedFrame = await scene.getAttribute('data-frame')
      await page.waitForTimeout(400)
      assert((await canvas.screenshot()).equals(stopped), 'Paused WebGL frame changed')
      assert.equal(await scene.getAttribute('data-frame'), stoppedFrame)
      assert.equal(await page.locator('.company-ticker-track').evaluate((node) => getComputedStyle(node).animationPlayState), 'paused')
      assert.equal(await page.locator('.company-flow-packet').first().evaluate((node) => getComputedStyle(node).animationPlayState), 'paused')
      await page.getByRole('button', { name: 'モーショングラフィックを再生', exact: true }).click()
      await page.waitForTimeout(300)
      assert.notEqual(await scene.getAttribute('data-frame'), stoppedFrame)
      assert.equal(await page.locator('.company-flow-packet').first().evaluate((node) => getComputedStyle(node).animationPlayState), 'running')
      await page.locator('#business').scrollIntoViewIfNeeded()
      await page.waitForTimeout(150)
      const offscreenFrame = await scene.getAttribute('data-frame')
      await page.waitForTimeout(300)
      assert.equal(await scene.getAttribute('data-frame'), offscreenFrame, 'Offscreen WebGL kept rendering')
      report.motion = { canvasAdvances: true, pauseFreezesFrame: true, tickerPauses: true, workflowPacketsPause: true, resumes: true, offscreenRenderingStops: true, fonts: await page.evaluate(() => ({ display: document.fonts.check('700 40px "Zen Kaku Gothic Antique"'), latin: document.fonts.check('600 40px "Barlow Condensed"'), italic: document.fonts.check('italic 400 40px "Bodoni Moda"'), mono: document.fonts.check('400 12px "IBM Plex Mono"'), body: document.fonts.check('400 16px "Noto Sans JP"') })) }
      assert(Object.values(report.motion.fonts).every(Boolean))
      await canvas.scrollIntoViewIfNeeded()
      const canLoseContext = await canvas.evaluate((node) => {
        const extension = node.getContext('webgl').getExtension('WEBGL_lose_context')
        if (!extension) return false
        node.restoreTestContext = () => extension.restoreContext()
        extension.loseContext()
        return true
      })
      assert(canLoseContext, 'WebGL context recovery cannot be tested in this browser')
      await page.waitForFunction(() => document.querySelector('.company-motion-scene').dataset.renderer === 'fallback')
      assert(await page.locator('.company-motion-fallback').isVisible())
      await page.waitForTimeout(150)
      await canvas.evaluate((node) => node.restoreTestContext())
      await page.waitForFunction(() => document.querySelector('.company-motion-scene').dataset.renderer === 'webgl')
      report.motion.contextLossFallbackAndRecovery = true
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
    console.log(`PASS: ${width}px, all ${corporate.length} company pages and product navigation`)
  }
  const reduced = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1512, height: 982 } })
  const reducedPage = await reduced.newPage()
  await reducedPage.goto(origin, { waitUntil: 'networkidle' })
  await reducedPage.locator('.company-motion-canvas[data-rendered="true"]').waitFor()
  const still = await reducedPage.locator('.company-motion-canvas').screenshot()
  const reducedFrame = await reducedPage.locator('.company-motion-scene').getAttribute('data-frame')
  await reducedPage.waitForTimeout(500)
  assert((await reducedPage.locator('.company-motion-canvas').screenshot()).equals(still))
  assert.equal(await reducedPage.locator('.company-motion-scene').getAttribute('data-frame'), reducedFrame)
  assert.equal(await reducedPage.locator('.company-motion-scene').getAttribute('data-motion'), 'reduced')
  assert.equal(await reducedPage.locator('.company-motion-toggle').isVisible(), false)
  assert.equal(await reducedPage.locator('.company-site').evaluate((node) => node.getAnimations({ subtree: true }).filter((animation) => animation.playState === 'running').length), 0)
  await reducedPage.goto(`${origin}/portfolio/3d-study/`, { waitUntil: 'networkidle' })
  assert.equal(await reducedPage.locator('video').evaluate((node) => node.paused && !node.autoplay), true)
  report.motion.reducedMotionStatic = true
  await reduced.close()
  const fallback = await browser.newContext({ viewport: { width: 390, height: 844 } })
  await fallback.addInitScript(() => {
    const getContext = HTMLCanvasElement.prototype.getContext
    HTMLCanvasElement.prototype.getContext = function (type, ...args) { return type === 'webgl' ? null : getContext.call(this, type, ...args) }
  })
  const fallbackPage = await fallback.newPage()
  fallbackPage.on('pageerror', (error) => report.errors.push({ mode: 'fallback', message: error.message }))
  await fallbackPage.goto(origin, { waitUntil: 'networkidle' })
  assert.equal(await fallbackPage.locator('.company-motion-scene').getAttribute('data-renderer'), 'fallback')
  assert(await fallbackPage.locator('.company-motion-fallback').isVisible())
  assert.equal(await fallbackPage.locator('.company-motion-canvas').isVisible(), false)
  await fallbackPage.screenshot({ path: path.join(output, 'webgl-unavailable-390.png') })
  report.motion.webglUnavailableFallback = true
  await fallback.close()
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
  console.log(`PASS: ${report.viewports.length} responsive pages, ${report.routes.length} static routes, motion controls, Blender playback, fonts, reduced motion, navigation. Evidence: ${output}`)
} finally { await browser.close(); await new Promise((resolve) => server.close(resolve)) }
