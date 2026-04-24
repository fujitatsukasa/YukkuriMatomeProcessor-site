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
const port = 4181

const budgets = {
  fcpMs: 1800,
  lcpMs: 2500,
  cls: 0.1,
  longTaskTotalMs: 600,
  averageFps: 35,
  minFps: 30,
}

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
  ['.webp', 'image/webp'],
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
    response.writeHead(200, {
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Content-Type': contentType,
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

const round = (value) => Math.round(value * 10) / 10

const installMetricObservers = async (page) => {
  await page.addInitScript(() => {
    window.__v1Perf = {
      cls: 0,
      lcp: 0,
      longTaskTotal: 0,
      longTasks: 0,
    }

    try {
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        const last = entries.at(-1)
        if (last) {
          window.__v1Perf.lcp = last.startTime
        }
      }).observe({ buffered: true, type: 'largest-contentful-paint' })
    } catch {}

    try {
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!entry.hadRecentInput) {
            window.__v1Perf.cls += entry.value
          }
        }
      }).observe({ buffered: true, type: 'layout-shift' })
    } catch {}

    try {
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          window.__v1Perf.longTasks += 1
          window.__v1Perf.longTaskTotal += entry.duration
        }
      }).observe({ buffered: true, type: 'longtask' })
    } catch {}
  })
}

const collectLoadMetrics = async (page) =>
  page.evaluate(() => {
    const navigation = performance.getEntriesByType('navigation')[0]
    const paints = Object.fromEntries(
      performance.getEntriesByType('paint').map((entry) => [entry.name, entry.startTime]),
    )
    const resources = performance.getEntriesByType('resource')
    const scripts = resources.filter((entry) => entry.initiatorType === 'script')
    const styles = resources.filter((entry) => entry.initiatorType === 'link' || entry.name.endsWith('.css'))
    const images = resources.filter((entry) => entry.initiatorType === 'img' || /\.(png|jpe?g|webp|svg)$/i.test(entry.name))
    const transferSize = resources.reduce((sum, entry) => sum + (entry.transferSize || 0), 0)

    return {
      cls: window.__v1Perf?.cls ?? 0,
      domContentLoaded: navigation ? navigation.domContentLoadedEventEnd : 0,
      fcp: paints['first-contentful-paint'] ?? 0,
      imageCount: images.length,
      lcp: window.__v1Perf?.lcp ?? 0,
      load: navigation ? navigation.loadEventEnd : 0,
      longTaskTotal: window.__v1Perf?.longTaskTotal ?? 0,
      longTasks: window.__v1Perf?.longTasks ?? 0,
      requestCount: resources.length,
      scriptCount: scripts.length,
      styleCount: styles.length,
      transferKb: transferSize / 1024,
      ttfb: navigation ? navigation.responseStart : 0,
    }
  })

const measureScrollFps = async (page) =>
  page.evaluate(async () => {
    const samples = []
    const totalMs = 3600
    const scrollHeight = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
    let frameCount = 0
    let sampleStart = performance.now()
    const start = performance.now()

    const smoothstep = (t) => t * t * (3 - 2 * t)

    return await new Promise((resolve) => {
      const tick = (now) => {
        frameCount += 1
        const elapsed = now - start
        const sampleElapsed = now - sampleStart
        const progress = Math.min(elapsed / totalMs, 1)
        const scrollProgress = progress < 0.5
          ? smoothstep(progress * 2)
          : smoothstep((1 - progress) * 2)

        window.scrollTo(0, scrollHeight * scrollProgress)

        if (sampleElapsed >= 500) {
          samples.push((frameCount * 1000) / sampleElapsed)
          frameCount = 0
          sampleStart = now
        }

        if (elapsed < totalMs) {
          requestAnimationFrame(tick)
          return
        }

        resolve(samples)
      }

      requestAnimationFrame(tick)
    })
  })

const rateMetric = (value, good, lowerIsBetter = true) => {
  if (lowerIsBetter) {
    return value <= good ? 'good' : 'needs-work'
  }

  return value >= good ? 'good' : 'needs-work'
}

const audit = async () => {
  await mkdir(outputDir, { recursive: true })
  await listen()

  const browser = await chromium.launch()

  try {
    const page = await browser.newPage({
      viewport: { width: 1512, height: 982 },
      deviceScaleFactor: 1,
    })
    await installMetricObservers(page)
    await page.goto(`http://${host}:${port}/`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(1000)

    const load = await collectLoadMetrics(page)
    const fpsSamples = await measureScrollFps(page)
    const averageFps = fpsSamples.reduce((sum, value) => sum + value, 0) / fpsSamples.length
    const minFps = Math.min(...fpsSamples)

    const result = {
      budgets,
      metrics: {
        averageFps: round(averageFps),
        cls: round(load.cls),
        domContentLoadedMs: round(load.domContentLoaded),
        fcpMs: round(load.fcp),
        imageCount: load.imageCount,
        lcpMs: round(load.lcp),
        loadMs: round(load.load),
        longTaskTotalMs: round(load.longTaskTotal),
        longTasks: load.longTasks,
        minFps: round(minFps),
        requestCount: load.requestCount,
        scriptCount: load.scriptCount,
        styleCount: load.styleCount,
        transferKb: round(load.transferKb),
        ttfbMs: round(load.ttfb),
      },
      ratings: {
        averageFps: rateMetric(averageFps, budgets.averageFps, false),
        cls: rateMetric(load.cls, budgets.cls),
        fcp: rateMetric(load.fcp, budgets.fcpMs),
        lcp: rateMetric(load.lcp, budgets.lcpMs),
        longTaskTotal: rateMetric(load.longTaskTotal, budgets.longTaskTotalMs),
        minFps: rateMetric(minFps, budgets.minFps, false),
      },
    }

    await writeFile(path.join(outputDir, 'perf-v1.json'), `${JSON.stringify(result, null, 2)}\n`)
    console.log('[V1.4 performance audit]')
    console.table(result.metrics)
    console.table(result.ratings)

    const failures = []
    if (load.fcp > budgets.fcpMs) failures.push(`FCP exceeds ${budgets.fcpMs}ms`)
    if (load.lcp > budgets.lcpMs) failures.push(`LCP exceeds ${budgets.lcpMs}ms`)
    if (load.cls > budgets.cls) failures.push(`CLS exceeds ${budgets.cls}`)
    if (load.longTaskTotal > budgets.longTaskTotalMs) failures.push(`Long tasks exceed ${budgets.longTaskTotalMs}ms`)
    if (averageFps < budgets.averageFps) failures.push(`Average FPS is below ${budgets.averageFps}`)
    if (minFps < budgets.minFps) failures.push(`Minimum FPS is below ${budgets.minFps}`)

    if (failures.length) {
      console.error(failures.join('\n'))
      process.exitCode = 1
    }
  } finally {
    await browser.close()
    await closeServer()
  }
}

await audit()
