import { expect, test } from '@playwright/test'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, extname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  decisionAnswerRequirements,
  decisionRecords,
  releaseCandidateDistribution,
  requiredDecisionMetadata,
} from '../src/data/product-facts'
import { normalizePath, siteOrigin } from '../src/data/site-content'

const testDir = dirname(fileURLToPath(import.meta.url))
const srcDir = resolve(testDir, '../src')

const auditPages = [
  '/',
  '/download/',
  '/instructions/',
  '/samples/',
  '/purchase/',
  '/faq/',
  '/update/',
  '/legal/commercial-transactions/',
] as const

function listSourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const fullPath = join(dir, entry)
    const info = statSync(fullPath)

    if (info.isDirectory()) {
      return listSourceFiles(fullPath)
    }

    return ['.ts', '.tsx'].includes(extname(fullPath)) ? [fullPath] : []
  })
}

test.describe('LP operational readiness audit', () => {
  test('D1-D11 answer requirements cover every operational decision', () => {
    const operationalDecisionIds = decisionRecords.filter((decision) => decision.id !== 'D12').map((decision) => decision.id)

    expect(decisionAnswerRequirements.map((requirement) => requirement.id)).toEqual(operationalDecisionIds)

    for (const requirement of decisionAnswerRequirements) {
      const decision = decisionRecords.find((entry) => entry.id === requirement.id)
      expect(decision).toBeTruthy()
      expect(requirement.requiredFields).toEqual(expect.arrayContaining([...requiredDecisionMetadata]))
      expect(requirement.evidenceTypes.length).toBeGreaterThanOrEqual(2)
      expect(requirement.approvalRoles.length).toBeGreaterThan(0)
      expect(requirement.publicCopyRule.length).toBeGreaterThan(20)
      expect(requirement.blocks).toEqual(decision?.blocks)
    }
  })

  test('release candidate literals are not duplicated outside product-facts.ts', () => {
    const sourceFiles = listSourceFiles(srcDir)
    const allowedRelativePath = 'data/product-facts.ts'
    const guardedTokens = [
      releaseCandidateDistribution.version,
      releaseCandidateDistribution.versionLabel,
      releaseCandidateDistribution.baseUrl,
      releaseCandidateDistribution.assets.setup.fileName,
      releaseCandidateDistribution.assets.setup.sha256,
      String(releaseCandidateDistribution.assets.setup.sizeBytes),
      releaseCandidateDistribution.assets.portable.fileName,
      releaseCandidateDistribution.assets.portable.sha256,
      String(releaseCandidateDistribution.assets.portable.sizeBytes),
    ]

    const offenders = guardedTokens.flatMap((token) =>
      sourceFiles.flatMap((file) => {
        const relativePath = relative(srcDir, file).replace(/\\/g, '/')
        if (relativePath === allowedRelativePath) return []

        const content = readFileSync(file, 'utf8')
        return content.includes(token) ? [`${relativePath}: ${token}`] : []
      }),
    )

    expect(offenders).toEqual([])
  })

  for (const route of auditPages) {
    test(`${route} has safe CTA, SEO, schema, accessibility, and media basics`, async ({ page }) => {
      await page.goto(route, { waitUntil: 'networkidle' })

      const audit = await page.evaluate(() => {
        const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')?.content ?? ''
        const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href ?? ''
        const robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]')?.content ?? ''
        const title = document.title
        const jsonLdResults = Array.from(document.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]')).map((node) => {
          try {
            const parsed = JSON.parse(node.textContent || '{}')
            return { ok: true, type: parsed['@type'], context: parsed['@context'] }
          } catch (error) {
            return { ok: false, type: null, context: null, error: error instanceof Error ? error.message : String(error) }
          }
        })
        const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('a')).map((link) => ({
          text: (link.textContent || link.getAttribute('aria-label') || '').trim(),
          href: link.getAttribute('href') || '',
          absoluteHref: link.href,
          target: link.getAttribute('target') || '',
          rel: link.getAttribute('rel') || '',
          visible: Boolean(link.offsetWidth || link.offsetHeight || link.getClientRects().length),
        }))
        const videos = Array.from(document.querySelectorAll<HTMLVideoElement>('video')).map((video) => {
          const source = video.querySelector('source')?.getAttribute('src') || ''
          const container = video.closest('article, section, div')
          const fallback = source ? Boolean(container?.querySelector(`a[href="${CSS.escape(source)}"]`)) : false
          return {
            source,
            poster: video.getAttribute('poster') || '',
            preload: video.getAttribute('preload') || '',
            controls: video.controls,
            fallback,
          }
        })
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined

        return {
          title,
          description,
          canonical,
          robots,
          h1Count: document.querySelectorAll('h1').length,
          jsonLdResults,
          links,
          imagesWithoutAlt: Array.from(document.querySelectorAll<HTMLImageElement>('img')).filter((image) => !image.hasAttribute('alt')).length,
          buttonsWithoutName: Array.from(document.querySelectorAll<HTMLButtonElement>('button')).filter(
            (button) => !(button.textContent || button.getAttribute('aria-label'))?.trim(),
          ).length,
          videos,
          domContentLoadedMs: navigation ? navigation.domContentLoadedEventEnd - navigation.startTime : 0,
        }
      })

      expect(audit.title).toContain('ゆっくりまとめプロセッサー')
      expect(audit.description.length).toBeGreaterThanOrEqual(50)
      expect(audit.description.length).toBeLessThanOrEqual(220)
      expect(audit.canonical).toBe(`${siteOrigin}${normalizePath(route)}`)
      expect(audit.robots).toBe('index,follow')
      expect(audit.h1Count).toBe(1)
      expect(audit.jsonLdResults.every((entry) => entry.ok && entry.type && entry.context === 'https://schema.org')).toBeTruthy()
      if (route !== '/') {
        expect(audit.jsonLdResults.some((entry) => entry.type === 'BreadcrumbList')).toBeTruthy()
      }

      const visibleLinks = audit.links.filter((link) => link.visible)
      expect(visibleLinks.length).toBeGreaterThan(0)
      expect(visibleLinks.filter((link) => !link.text || !link.href)).toEqual([])
      expect(visibleLinks.filter((link) => link.href.startsWith('javascript:'))).toEqual([])
      expect(visibleLinks.filter((link) => link.target === '_blank' && !link.rel.includes('noopener'))).toEqual([])
      expect(visibleLinks.filter((link) => /\.(exe|zip)(?:$|\?)/i.test(link.absoluteHref))).toEqual([])

      expect(audit.imagesWithoutAlt).toBe(0)
      expect(audit.buttonsWithoutName).toBe(0)
      for (const video of audit.videos) {
        expect(video.source).toMatch(/\.mp4$/)
        expect(video.poster).toBeTruthy()
        expect(video.controls).toBeTruthy()
        expect(video.preload).not.toBe('auto')
        expect(video.fallback).toBeTruthy()
      }
      expect(audit.domContentLoadedMs).toBeLessThan(8_000)
    })
  }
})
