import { readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDir = path.join(rootDir, 'dist')
const kib = 1024

const limits = {
  distAssetCount: 26,
  cssGzipHintKb: 40,
  largestAssetKb: 260,
  initialJsKb: 90,
  homeJsKb: 100,
  videoCount: 0,
}

const walk = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)))
      continue
    }

    const info = await stat(fullPath)
    files.push({
      path: path.relative(distDir, fullPath).replaceAll(path.sep, '/'),
      ext: path.extname(entry.name).toLowerCase(),
      size: info.size,
    })
  }

  return files
}

const files = await walk(distDir)
const assets = files.filter((file) => file.path.startsWith('assets/'))
const videos = assets.filter((file) => file.ext === '.mp4' || file.ext === '.webm')
const css = assets.filter((file) => file.ext === '.css').sort((a, b) => b.size - a.size)
const js = assets.filter((file) => file.ext === '.js').sort((a, b) => b.size - a.size)
const largestAsset = assets.toSorted((a, b) => b.size - a.size)[0]
const initialJs = js.find((file) => /^assets\/index-.*\.js$/.test(file.path))
const homeJs = js.find((file) => /^assets\/home-page-.*\.js$/.test(file.path))

const kb = (bytes) => Math.round((bytes / kib) * 10) / 10
const result = {
  distAssetCount: assets.length,
  largestAsset: largestAsset ? `${largestAsset.path} ${kb(largestAsset.size)}KB` : 'none',
  css: css.map((file) => `${file.path} ${kb(file.size)}KB`),
  initialJs: initialJs ? `${initialJs.path} ${kb(initialJs.size)}KB` : 'not found',
  homeJs: homeJs ? `${homeJs.path} ${kb(homeJs.size)}KB` : 'not found',
  videoAssets: videos.map((file) => file.path),
}

const failures = []
if (largestAsset && kb(largestAsset.size) > limits.largestAssetKb) {
  failures.push(`largest asset exceeds ${limits.largestAssetKb}KB`)
}
if (assets.length > limits.distAssetCount) {
  failures.push(`dist asset count exceeds ${limits.distAssetCount}`)
}
if (initialJs && kb(initialJs.size) > limits.initialJsKb) {
  failures.push(`initial JS exceeds ${limits.initialJsKb}KB`)
}
if (homeJs && kb(homeJs.size) > limits.homeJsKb) {
  failures.push(`home JS exceeds ${limits.homeJsKb}KB`)
}
if (videos.length > limits.videoCount) {
  failures.push('dist contains video assets')
}

console.log('[V1.3 audit]')
console.table(result)

if (failures.length) {
  console.error(failures.join('\n'))
  process.exit(1)
}
