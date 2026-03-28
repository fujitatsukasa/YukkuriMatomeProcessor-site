import { createServer } from 'node:http'
import { copyFile, readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from '@playwright/test'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const distDir = path.join(rootDir, 'dist')
const outputDir = path.join(rootDir, 'test-results')
const host = '127.0.0.1'
const port = 4178

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

const record = async () => {
  await listen()

  const browser = await chromium.launch()
  const context = await browser.newContext({
    viewport: { width: 1512, height: 982 },
    recordVideo: {
      dir: outputDir,
      size: { width: 1512, height: 982 },
    },
  })

  const page = await context.newPage()
  const video = page.video()

  try {
    await page.goto(`http://${host}:${port}/`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(900)

    const hero = page.locator('.hero-stage--product')
    if ((await hero.count()) > 0) {
      const box = await hero.boundingBox()
      if (box) {
        const points = [
          [box.x + box.width * 0.2, box.y + box.height * 0.28],
          [box.x + box.width * 0.72, box.y + box.height * 0.24],
          [box.x + box.width * 0.62, box.y + box.height * 0.68],
          [box.x + box.width * 0.3, box.y + box.height * 0.56],
        ]
        for (const [x, y] of points) {
          await page.mouse.move(x, y, { steps: 18 })
          await page.waitForTimeout(320)
        }
      }
    }

    const scrollSteps = [420, 580, 620, 660, 680, 720]
    for (const deltaY of scrollSteps) {
      await page.mouse.wheel(0, deltaY)
      await page.waitForTimeout(700)
    }

    await page.waitForTimeout(1200)
  } finally {
    await context.close()
    await browser.close()
    await closeServer()
  }

  if (video) {
    await copyFile(await video.path(), path.join(outputDir, 'home-motion-desktop.webm'))
  }
}

await record()
