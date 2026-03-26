import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from '@playwright/test'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const distDir = path.join(rootDir, 'dist')
const outputDir = path.join(rootDir, 'test-results')
const host = '127.0.0.1'
const port = 4177

const contentTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.ico', 'image/x-icon'],
  ['.jpeg', 'image/jpeg'],
  ['.jpg', 'image/jpeg'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.mp4', 'video/mp4'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml'],
  ['.webm', 'video/webm'],
  ['.xml', 'application/xml; charset=utf-8'],
])

const resolveFilePath = async (requestPath) => {
  const urlPath = decodeURIComponent(requestPath.split('?')[0] || '/')
  const relativePath = urlPath === '/' ? 'index.html' : urlPath.replace(/^\/+/, '')
  const candidates = [path.join(distDir, relativePath)]

  if (!path.extname(relativePath)) {
    candidates.push(path.join(distDir, relativePath, 'index.html'))
  }

  for (const candidate of candidates) {
    const normalized = path.normalize(candidate)
    if (!normalized.startsWith(distDir)) {
      continue
    }

    try {
      const info = await stat(normalized)
      if (info.isFile()) {
        return normalized
      }
    } catch {}
  }

  return path.join(distDir, 'index.html')
}

const server = createServer(async (request, response) => {
  try {
    const filePath = await resolveFilePath(request.url ?? '/')
    const file = await readFile(filePath)
    const contentType = contentTypes.get(path.extname(filePath)) ?? 'application/octet-stream'
    response.writeHead(200, { 'Content-Type': contentType })
    response.end(file)
  } catch (error) {
    response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' })
    response.end(error instanceof Error ? error.message : 'unexpected error')
  }
})

const listen = () =>
  new Promise((resolve, reject) => {
    server.once('error', reject)
    server.listen(port, host, () => resolve(undefined))
  })

const closeServer = () =>
  new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error)
        return
      }
      resolve(undefined)
    })
  })

const capture = async () => {
  await listen()

  const browser = await chromium.launch()
  const sectionShots = [
    ['.home-v3-hero', 'home-hero-desktop.png'],
    ['.home-v3-values-section', 'home-values-desktop.png'],
    ['.home-v3-demo-section', 'home-demo-desktop.png'],
    ['.home-v3-proof-section', 'home-proof-desktop.png'],
    ['.home-v3-final-section', 'home-final-desktop.png'],
  ]

  try {
    const desktop = await browser.newPage({
      viewport: { width: 1512, height: 982 },
      deviceScaleFactor: 1,
    })
    await desktop.goto(`http://${host}:${port}/`, { waitUntil: 'networkidle' })
    await desktop.screenshot({
      path: path.join(outputDir, 'home-desktop-chromium.png'),
      fullPage: false,
    })
    await desktop.screenshot({
      path: path.join(outputDir, 'home-desktop-fullpage-chromium.png'),
      fullPage: true,
    })
    for (const [selector, filename] of sectionShots) {
      const target = desktop.locator(selector)
      if ((await target.count()) === 0) {
        continue
      }
      await target.scrollIntoViewIfNeeded()
      await desktop.waitForTimeout(350)
      await target.screenshot({
        path: path.join(outputDir, filename),
      })
    }

    const mobile = await browser.newPage({
      viewport: { width: 390, height: 844 },
      userAgent:
        'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 3,
    })
    await mobile.goto(`http://${host}:${port}/`, { waitUntil: 'networkidle' })
    await mobile.screenshot({
      path: path.join(outputDir, 'home-mobile-chromium.png'),
      fullPage: false,
    })
    await mobile.screenshot({
      path: path.join(outputDir, 'home-mobile-fullpage-chromium.png'),
      fullPage: true,
    })
  } finally {
    await browser.close()
    await closeServer()
  }
}

await capture()
