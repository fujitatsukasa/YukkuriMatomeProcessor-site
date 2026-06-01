import { createServer } from 'node:http'
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from '@playwright/test'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const distDir = path.join(rootDir, 'dist')
const outputDir = path.join(rootDir, 'test-results')
const host = '127.0.0.1'
const port = 4194
const badChars = [
  0x7e3a,
  0x7e67,
  0x7e5d,
  0x8b41,
  0x8b0c,
  0x9025,
  0x8708,
  0x9aea,
  0x86fb,
  0x87b3,
  0x87c6,
  0x9a55,
  0xfffd,
].map((code) => String.fromCharCode(code))

const contentTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.ico', 'image/x-icon'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml'],
  ['.webp', 'image/webp'],
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

const countBadText = (value) =>
  badChars.reduce((sum, char) => sum + value.split(char).length - 1, 0) +
  (value.match(new RegExp(String.fromCharCode(0xfffd), 'g'))?.length ?? 0)

const readRoutes = async () => {
  const sitemap = await readFile(path.join(distDir, 'sitemap.xml'), 'utf8')
  return [...sitemap.matchAll(/<loc>https:\/\/yukkurimatomeprocessor\.com([^<]+)<\/loc>/g)].map((match) => match[1])
}

const server = createServer(async (request, response) => {
  try {
    const filePath = await resolveFilePath(request.url ?? '/')
    const file = await readFile(filePath)
    response.writeHead(200, {
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Content-Type': contentTypes.get(path.extname(filePath)) ?? 'application/octet-stream',
    })
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

await mkdir(outputDir, { recursive: true })
await listen()

const browser = await chromium.launch()

try {
  const desktopPage = await browser.newPage({ viewport: { width: 1366, height: 768 } })
  const mobilePage = await browser.newPage({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  })
  const routes = await readRoutes()
  const results = []

  for (const route of routes) {
    await desktopPage.goto(`http://${host}:${port}${route}`, { waitUntil: 'networkidle' })
    await desktopPage
      .waitForFunction(() => document.body.innerText.trim().length > 0 && document.querySelector('h1'), null, {
        timeout: 10000,
      })
      .catch(() => undefined)
    const result = await desktopPage.evaluate(() => {
      const bodyText = document.body.innerText.replace(/\s+/g, ' ').trim()
      const title = document.title
      const description = document.querySelector('meta[name="description"]')?.getAttribute('content') ?? ''
      const h1 = document.querySelector('h1')?.textContent?.replace(/\s+/g, ' ').trim() ?? ''
      const overflow = Math.max(0, document.documentElement.scrollWidth - window.innerWidth)
      const headingCount = document.querySelectorAll('h1, h2, h3').length

      return {
        bodyText,
        description,
        h1,
        headingCount,
        overflow,
        title,
      }
    })
    await mobilePage.goto(`http://${host}:${port}${route}`, { waitUntil: 'networkidle' })
    await mobilePage
      .waitForFunction(() => document.body.innerText.trim().length > 0, null, {
        timeout: 10000,
      })
      .catch(() => undefined)
    const mobileOverflow = await mobilePage.evaluate(() =>
      Math.max(0, document.documentElement.scrollWidth - window.innerWidth),
    )
    const badText = countBadText(`${result.title} ${result.description} ${result.h1} ${result.bodyText}`)
    const deductions = [
      badText > 0 ? 40 : 0,
      result.overflow > 1 ? 20 : 0,
      mobileOverflow > 1 ? 20 : 0,
      result.h1 ? 0 : 20,
      result.description.length >= 50 ? 0 : 10,
      result.headingCount >= 3 ? 0 : 5,
      result.bodyText.length >= 300 ? 0 : 5,
    ]
    const score = Math.max(0, 100 - deductions.reduce((sum, value) => sum + value, 0))

    results.push({
      route,
      score,
      badText,
      descriptionLength: result.description.length,
      headingCount: result.headingCount,
      h1: result.h1,
      mobileOverflow,
      overflow: result.overflow,
      textLength: result.bodyText.length,
    })
  }

  await writeFile(path.join(outputDir, 'site-quality-v1.json'), `${JSON.stringify(results, null, 2)}\n`)
  console.log('[V1.4 site quality audit]')
  console.table(
    results.map((result) => ({
      route: result.route,
      score: result.score,
      badText: result.badText,
      overflow: result.overflow,
      mobileOverflow: result.mobileOverflow,
      h1: result.h1.slice(0, 34),
    })),
  )

  const failures = results.filter((result) => result.score < 95)
  if (failures.length) {
    console.error(`Routes below 95: ${failures.map((result) => `${result.route}=${result.score}`).join(', ')}`)
    process.exitCode = 1
  }
} finally {
  await browser.close()
  await closeServer()
}
