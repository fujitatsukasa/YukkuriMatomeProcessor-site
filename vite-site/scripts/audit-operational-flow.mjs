import { createServer } from 'node:http'
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises'
import { createReadStream, existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const distDir = path.join(rootDir, 'dist')
const publicDir = path.join(rootDir, 'public')
const testResultsDir = path.join(rootDir, 'test-results')
const siteOrigin = 'https://yukkurimatomeprocessor.com'
const sitemapPath = path.join(publicDir, 'sitemap.xml')
const robotsPath = path.join(publicDir, 'robots.txt')
const contentPath = path.join(rootDir, 'src', 'data', 'site-content.ts')

const checks = []
const warnings = []

function addCheck(name, ok, detail = '') {
  checks.push({ name, ok, detail })
}

function addWarning(name, detail) {
  warnings.push({ name, detail })
}

function normalizeRoute(route) {
  if (!route || route === '/') {
    return '/'
  }

  const urlPath = route.split('#')[0].split('?')[0]
  if (/\/[^/]+\.[a-z0-9]+$/i.test(urlPath)) {
    return urlPath
  }

  return urlPath.endsWith('/') ? urlPath : `${urlPath}/`
}

function parseSitemap(xml) {
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1].trim())
}

function routeFromLoc(loc) {
  return normalizeRoute(new URL(loc).pathname)
}

function contentTypeFor(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  if (ext === '.html') return 'text/html; charset=utf-8'
  if (ext === '.css') return 'text/css; charset=utf-8'
  if (ext === '.js') return 'text/javascript; charset=utf-8'
  if (ext === '.json') return 'application/json; charset=utf-8'
  if (ext === '.xml') return 'application/xml; charset=utf-8'
  if (ext === '.txt') return 'text/plain; charset=utf-8'
  if (ext === '.png') return 'image/png'
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg'
  if (ext === '.webp') return 'image/webp'
  if (ext === '.svg') return 'image/svg+xml'
  return 'application/octet-stream'
}

async function findStaticFile(urlPath) {
  const decoded = decodeURIComponent(urlPath)
  const safePath = path.normalize(decoded).replace(/^(\.\.[/\\])+/, '')
  const directPath = path.join(distDir, safePath)
  const indexPath = path.join(distDir, safePath, 'index.html')

  for (const candidate of [directPath, indexPath]) {
    if (!candidate.startsWith(distDir)) {
      continue
    }

    try {
      const entry = await stat(candidate)
      if (entry.isFile()) {
        return candidate
      }
    } catch {
      // Try the next candidate.
    }
  }

  return path.join(distDir, 'index.html')
}

async function startServer() {
  const server = createServer(async (req, res) => {
    try {
      const requestUrl = new URL(req.url ?? '/', 'http://127.0.0.1')
      const filePath = await findStaticFile(requestUrl.pathname)
      res.writeHead(200, { 'content-type': contentTypeFor(filePath) })
      createReadStream(filePath).pipe(res)
    } catch (error) {
      res.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' })
      res.end(String(error))
    }
  })

  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
  const address = server.address()
  return {
    baseUrl: `http://127.0.0.1:${address.port}`,
    close: () => new Promise((resolve) => server.close(resolve)),
  }
}

async function fetchStatus(url, { critical = true, method = 'HEAD' } = {}) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15_000)

  try {
    let response = await fetch(url, {
      method,
      redirect: 'follow',
      signal: controller.signal,
      headers: { 'user-agent': 'YMP operational flow audit' },
    })

    if (response.status === 405 && method === 'HEAD') {
      response = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        signal: controller.signal,
        headers: { 'user-agent': 'YMP operational flow audit' },
      })
    }

    const ok = response.status >= 200 && response.status < 400
    const detail = `${response.status} ${response.url}`
    if (critical) {
      addCheck(url, ok, detail)
    } else if (!ok) {
      addWarning(url, detail)
    }
    return { ok, detail, status: response.status, finalUrl: response.url }
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error)
    if (critical) {
      addCheck(url, false, detail)
    } else {
      addWarning(url, detail)
    }
    return { ok: false, detail }
  } finally {
    clearTimeout(timeout)
  }
}

function extractConstUrl(source, name) {
  const match = source.match(new RegExp(`export const ${name}\\s*=\\s*\\n?\\s*'([^']+)'`))
  return match?.[1]
}

async function auditRoutes(baseUrl, routes) {
  const browser = await chromium.launch()
  const pageResults = []
  const internalAnchors = new Set()

  try {
    const viewports = [
      { name: 'desktop', width: 1366, height: 900 },
      { name: 'mobile', width: 390, height: 844 },
    ]

    for (const route of routes) {
      for (const viewport of viewports) {
        const page = await browser.newPage({ viewport })
        const response = await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle' })
        await page.waitForTimeout(150)

        const data = await page.evaluate((origin) => {
          const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? ''
          const description = document.querySelector('meta[name="description"]')?.getAttribute('content') ?? ''
          const ogImage = document.querySelector('meta[property="og:image"]')?.getAttribute('content') ?? ''
          const anchors = [...document.querySelectorAll('a[href]')].map((anchor) => anchor.href)
          return {
            title: document.title,
            h1: document.querySelector('h1')?.textContent?.replace(/\s+/g, ' ').trim() ?? '',
            canonical,
            description,
            ogImage,
            bodyScrollWidth: document.body.scrollWidth,
            htmlScrollWidth: document.documentElement.scrollWidth,
            viewportWidth: window.innerWidth,
            anchors,
            hasDownloadCta: Boolean(document.querySelector('a[href="/download/"], a[href^="https://github.com/fujitatsukasa/YukkuriMatomeProcessor/releases/latest/download/"]')),
            hasContactCta: Boolean(document.querySelector('a[href="/contact/"], a[href^="mailto:"]')),
            origin,
          }
        }, siteOrigin)

        const expectedCanonical = `${siteOrigin}${route}`
        const noOverflow =
          data.bodyScrollWidth <= data.viewportWidth + 1 &&
          data.htmlScrollWidth <= data.viewportWidth + 1
        const routeName = `${viewport.name} ${route}`

        addCheck(`${routeName} status`, Boolean(response?.ok()), String(response?.status() ?? 'no response'))
        addCheck(`${routeName} h1`, data.h1.length > 0, data.h1)
        addCheck(`${routeName} title`, data.title.length > 0, data.title)
        addCheck(`${routeName} description`, data.description.length >= 20, `${data.description.length} chars`)
        addCheck(`${routeName} canonical`, data.canonical === expectedCanonical, data.canonical)
        addCheck(`${routeName} og:image`, data.ogImage.startsWith(siteOrigin), data.ogImage)
        addCheck(`${routeName} no horizontal overflow`, noOverflow, `body=${data.bodyScrollWidth}, html=${data.htmlScrollWidth}, viewport=${data.viewportWidth}`)

        for (const href of data.anchors) {
          const url = new URL(href)
          if (url.origin === baseUrl || url.origin === siteOrigin) {
            internalAnchors.add(normalizeRoute(url.pathname))
          }
        }

        pageResults.push({ route, viewport: viewport.name, h1: data.h1 })
        await page.close()
      }
    }
  } finally {
    await browser.close()
  }

  return { pageResults, internalAnchors }
}

const sitemapXml = await readFile(sitemapPath, 'utf8')
const robotsTxt = await readFile(robotsPath, 'utf8')
const siteContent = await readFile(contentPath, 'utf8')
const locs = parseSitemap(sitemapXml)
const routes = locs.map(routeFromLoc)
const routeSet = new Set(routes)
const allowedInternalRoutes = new Set(['/404.html', '/account/', '/billing/success/', '/billing/cancel/'])

addCheck('dist exists', existsSync(distDir), distDir)
addCheck('sitemap route count', routes.length >= 20, `${routes.length} routes`)
addCheck('sitemap origins', locs.every((loc) => loc.startsWith(`${siteOrigin}/`)), `${locs.length} loc entries`)
addCheck('robots references sitemap', robotsTxt.includes(`${siteOrigin}/sitemap.xml`), robotsTxt.trim())

for (const route of routes) {
  const distFile = route === '/' ? path.join(distDir, 'index.html') : path.join(distDir, route, 'index.html')
  addCheck(`prerendered ${route}`, existsSync(distFile), distFile)
}

const server = await startServer()
let auditResult
try {
  auditResult = await auditRoutes(server.baseUrl, routes)
} finally {
  await server.close()
}

for (const route of auditResult.internalAnchors) {
  const ok = routeSet.has(route) || allowedInternalRoutes.has(route)
  addCheck(`internal link target ${route}`, ok, ok ? 'registered' : 'missing from sitemap or allowlist')
}

const downloadUrl = extractConstUrl(siteContent, 'downloadUrl')
const latestReleaseUrl = extractConstUrl(siteContent, 'latestReleaseUrl')
const releasesUrl = extractConstUrl(siteContent, 'releasesUrl')
const changeLogUrl = extractConstUrl(siteContent, 'changeLogUrl')
const externalCriticalUrls = [downloadUrl, latestReleaseUrl, releasesUrl, changeLogUrl].filter(Boolean)

for (const url of externalCriticalUrls) {
  await fetchStatus(url, { critical: true })
}

await fetchStatus(`${siteOrigin}/`, { critical: true })
await fetchStatus(`${siteOrigin}/robots.txt`, { critical: true })
await fetchStatus(`${siteOrigin}/sitemap.xml`, { critical: true, method: 'GET' })

for (const route of ['/', '/download/', '/purchase/', '/contact/', '/legal/terms/', '/legal/refund-policy/']) {
  await fetchStatus(`${siteOrigin}${route}`, { critical: true })
}

const supportUrls = [...siteContent.matchAll(/href:\s*'([^']+)'/g)]
  .map((match) => match[1])
  .filter((url) => url.startsWith('https://x.com/') || url.startsWith('https://discord') || url.startsWith('https://www.chatwork.com/'))

for (const url of supportUrls) {
  await fetchStatus(url, { critical: false })
}

const requiredOperationalRoutes = ['/', '/download/', '/purchase/', '/contact/', '/legal/terms/', '/legal/refund-policy/', '/legal/commercial-transactions/']
for (const route of requiredOperationalRoutes) {
  addCheck(`required operational route ${route}`, routeSet.has(route), routeSet.has(route) ? 'in sitemap' : 'missing')
}

const failures = checks.filter((check) => !check.ok)
const output = {
  generatedAt: new Date().toISOString(),
  siteOrigin,
  routeCount: routes.length,
  checks,
  warnings,
}

await mkdir(testResultsDir, { recursive: true })
await writeFile(path.join(testResultsDir, 'operational-flow-audit.json'), `${JSON.stringify(output, null, 2)}\n`)

console.log('[Operational flow audit]')
console.table(checks.map((check) => ({
  ok: check.ok ? 'yes' : 'no',
  name: check.name,
  detail: check.detail.slice(0, 110),
})))

if (warnings.length) {
  console.log('\n[Warnings]')
  console.table(warnings.map((warning) => ({
    name: warning.name,
    detail: warning.detail.slice(0, 110),
  })))
}

if (failures.length) {
  console.error(`\n${failures.length} operational checks failed.`)
  process.exit(1)
}

console.log(`\nAll ${checks.length} operational checks passed. ${warnings.length} non-critical warnings recorded.`)
