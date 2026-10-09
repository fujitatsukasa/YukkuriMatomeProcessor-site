import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { once } from 'node:events'
import { mkdir, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { chromium } from '@playwright/test'

const origin = process.argv[2]
const output = process.argv[3]
assert(origin && output && path.isAbsolute(output), 'Provide preview URL and absolute evidence directory.')
await mkdir(output, { recursive: true })
const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1512, height: 982 } })
const errors = []
page.on('pageerror', (error) => errors.push(error.message))
let encoder
try {
  await page.goto(origin, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  await page.locator('.company-motion-canvas[data-rendered="true"]').waitFor()
  const video = path.join(output, 'otm-motion-preview.mp4')
  encoder = spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-f', 'image2pipe', '-framerate', '12', '-vcodec', 'png', '-i', 'pipe:0', '-an', '-c:v', 'libx264', '-preset', 'fast', '-crf', '19', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', video], { stdio: ['pipe', 'ignore', 'pipe'], windowsHide: true })
  const completion = once(encoder, 'close')
  let encodingErrors = ''
  encoder.stderr.on('data', (chunk) => { encodingErrors += chunk.toString() })
  encoder.stdin.on('error', (error) => errors.push(error.message))
  const started = performance.now()
  const timing = []
  for (let frame = 0; frame < 336; frame++) {
    if (frame === 252) await page.locator('#about').evaluate((element) => element.scrollIntoView({ behavior: 'smooth', block: 'start' }))
    if (frame === 294) await page.locator('#business').evaluate((element) => element.scrollIntoView({ behavior: 'smooth', block: 'start' }))
    const image = await page.screenshot({ type: 'png' })
    if (!encoder.stdin.write(image)) await once(encoder.stdin, 'drain')
    timing.push(performance.now() - started)
    const wait = (frame + 1) * 1000 / 12 - (performance.now() - started)
    if (wait > 0) await new Promise((resolve) => setTimeout(resolve, wait))
  }
  encoder.stdin.end()
  const [code] = await completion
  assert.equal(code, 0, encodingErrors || 'Video encoder failed')
  assert.deepEqual(errors, [], 'Browser or encoding errors occurred')
  assert((await stat(video)).size > 100000, 'Video is empty')
  await writeFile(path.join(output, 'recording.json'), JSON.stringify({ origin, video, frames: timing.length, fps: 12, actualDurationMs: Math.round(timing.at(-1)), method: 'Headless Chromium screenshots encoded in sequence', foregroundFocusUsed: false, osWindowCaptureUsed: false, errors }, null, 2))
  console.log(`PASS: ${timing.length} actual browser frames recorded. ${video}`)
} finally {
  encoder?.stdin.end()
  await browser.close()
}
