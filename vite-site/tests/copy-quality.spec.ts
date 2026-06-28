import { expect, test, type Page } from '@playwright/test'
import { newsPosts, publicDistribution } from '../src/data/site-content'
import { decisionRecords, productFacts, readinessGates, releaseCandidateDistribution } from '../src/data/product-facts'

const primaryPages = [
  {
    path: '/',
    heading: '台本取得からAI台本、編集ボードとYMM4連携まで。',
    ctas: ['Free版を試す'],
  },
  {
    path: '/download/',
    heading: '配布条件を確認してFree版を試す',
    ctas: ['配布情報を見る', '使い方を見る'],
  },
  {
    path: '/instructions/',
    heading: '記事URLから台本を取得し、YMM4に渡すまでの手順',
    ctas: ['Free版を試す', 'FAQを見る'],
  },
  {
    path: '/samples/',
    heading: '実アプリ画面と動画サンプルで、使う前の流れを確認する',
    ctas: ['Free版を試す', '使い方を見る'],
  },
  {
    path: '/purchase/',
    heading: '料金プラン｜Freeで試して、Premium条件を確認',
    ctas: ['プラン比較を見る', 'Free版を試す'],
  },
  {
    path: '/faq/',
    heading: '導入前によくある質問',
    ctas: ['使い方を見る', '実画面を見る', '料金を見る', '問い合わせる'],
  },
  {
    path: '/update/',
    heading: '配布候補の確認と更新前チェック',
    ctas: ['Free版を試す'],
  },
]

const forbiddenCopy = [
  '運用線',
  '判断線',
  '現仕様で強く出せる',
  '見せています',
  '構成にしています',
  '一続きの運用',
  '導入判断のズレ',
  'scriptFetch',
  'scriptGeneration',
  '00 Promise',
  '01 Outputs',
  '02 Proof',
  '再修正修正',
  '雰囲気',
  '下ごしらえ',
  'まとめて進める',
  '自分の制作に入る',
]

const unsafeMarketingCopy = [
  '制限解除',
  '無制限',
  '使い放題',
  '直反映',
  'タイムラインまで',
  '動画作成導線',
  '自動ストック',
  '一気に再構築',
  'そのまま読み込める',
  'ずっと無料',
  '13キャラ',
  'YouTube分析',
  'YouTube 分析',
  'YouTube API',
  '安心の国内決済',
  '本番件数',
  '月に数本',
  '実操作デモ',
  '60秒の操作デモ',
  '実際の完成映像',
  '動画作成の上限',
  '利用制限を解除',
  '制限が制作回数',
  'Premiumで解除',
  '解除される内容',
]

const blockedPhrases = [...forbiddenCopy, ...unsafeMarketingCopy]

type InspectableChunk = {
  source: string
  text: string
}

async function collectInspectableChunks(page: Page) {
  return page.evaluate(() => {
    const chunks: Array<{ source: string; text: string }> = []
    const push = (source: string, text: string | null) => {
      const trimmed = text?.trim()
      if (trimmed) {
        chunks.push({ source, text: trimmed })
      }
    }

    push('body', document.body.innerText)
    push('title', document.title)

    document.querySelectorAll<HTMLMetaElement>('meta[name], meta[property]').forEach((meta) => {
      push(`meta:${meta.getAttribute('name') || meta.getAttribute('property') || 'unknown'}`, meta.getAttribute('content'))
    })

    document.querySelectorAll<HTMLElement>('[aria-label], [alt], [title]').forEach((node) => {
      push(`${node.tagName.toLowerCase()}:aria-label`, node.getAttribute('aria-label'))
      push(`${node.tagName.toLowerCase()}:alt`, node.getAttribute('alt'))
      push(`${node.tagName.toLowerCase()}:title`, node.getAttribute('title'))
    })

    document.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]').forEach((node) => {
      push('json-ld', node.textContent)
    })

    return chunks
  })
}

async function collectInspectableCopy(page: Page) {
  const chunks = await collectInspectableChunks(page)
  return chunks.map((chunk) => chunk.text).join('\n')
}

test.describe('primary page copy quality', () => {
  test('readiness gates are derived from D1-D12 decisions', () => {
    expect(decisionRecords).toHaveLength(12)
    expect(decisionRecords.map((decision) => decision.id)).toEqual([
      'D1',
      'D2',
      'D3',
      'D4',
      'D5',
      'D6',
      'D7',
      'D8',
      'D9',
      'D10',
      'D11',
      'D12',
    ])

    expect(productFacts.purchaseReady.value).toBe(false)
    expect(productFacts.downloadReady.value).toBe(false)
    expect(productFacts.publishReady.value).toBe(false)

    expect(productFacts.purchaseReady.source).toContain('派生No-Go')
    expect(productFacts.downloadReady.source).toContain('派生No-Go')
    expect(productFacts.publishReady.source).toContain('派生No-Go')

    expect(productFacts.purchaseReady.blockers).toEqual(expect.arrayContaining(['D2', 'D3', 'D4', 'D5', 'D6', 'D12']))
    expect(productFacts.downloadReady.blockers).toEqual(expect.arrayContaining(['D8', 'D10', 'D12']))
    expect(productFacts.publishReady.blockers).toEqual(
      expect.arrayContaining(['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'D11', 'D12']),
    )

    for (const gate of Object.values(readinessGates)) {
      expect(gate.criteria.length).toBeGreaterThan(0)
      expect(gate.value).toBe(gate.blockers.length === 0)
    }
  })

  test('pending distribution facts stay candidate-scoped until D10 is confirmed', () => {
    expect(publicDistribution).toBe(releaseCandidateDistribution)
    expect(publicDistribution.status).toBe('pending')
    expect(publicDistribution.statusLabel).toContain('D10確認中')
    expect(productFacts.publicVersion.status).toBe('pending')
    expect(productFacts.publicVersion.value).toBe(releaseCandidateDistribution.version)
    expect(productFacts.downloadReady.value).toBe(false)

    const releasePost = newsPosts.find((post) => post.path === '/2026-06-01-windows-release-0018/')
    expect(releasePost).toBeTruthy()

    const releaseCopy = JSON.stringify(releasePost)
    expect(releaseCopy).toContain('配布候補')
    expect(releaseCopy).not.toContain('公開しました')
    expect(releaseCopy).not.toContain('公開に合わせ')
  })

  test('pending fact values do not leak as confirmed copy in inspectable surfaces', async ({ page }) => {
    const safePendingMarkers = ['候補', '確認中', '未確定', 'D10', 'No-Go', '表示しません', '最終確認中']
    const pendingFacts = Object.entries(productFacts).flatMap(([key, fact]) => {
      if (fact.status !== 'pending') return []
      if (typeof fact.value !== 'string' && typeof fact.value !== 'number') return []
      return [{ key, value: String(fact.value) }]
    })

    for (const entry of primaryPages) {
      await page.goto(entry.path, { waitUntil: 'networkidle' })
      const chunks = (await collectInspectableChunks(page)) as InspectableChunk[]

      for (const fact of pendingFacts) {
        const matches = chunks.filter((chunk) => chunk.text.includes(fact.value))
        if (fact.key === 'publicVersion') {
          for (const match of matches) {
            expect(
              safePendingMarkers.some((marker) => match.text.includes(marker)),
              `${entry.path} ${match.source} must mark ${fact.value} as pending/candidate`,
            ).toBeTruthy()
          }
          continue
        }

        expect(matches, `${entry.path} must not expose pending fact ${fact.key}`).toEqual([])
      }
    }
  })

  for (const entry of primaryPages) {
    test(`${entry.path} has a concrete heading, stable CTA labels, and no internal copy`, async ({ page }) => {
      await page.goto(entry.path, { waitUntil: 'networkidle' })

      await expect(page.locator('h1').first()).toContainText(entry.heading)

      const inspectableCopy = await collectInspectableCopy(page)
      for (const phrase of blockedPhrases) {
        expect(inspectableCopy).not.toContain(phrase)
      }

      for (const cta of entry.ctas) {
        await expect(page.getByRole('link', { name: cta }).first()).toBeVisible()
      }
    })
  }

  test('home keeps unverified proof claims out of visible copy and structured data', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })

    const visibleText = await collectInspectableCopy(page)
    for (const phrase of unsafeMarketingCopy) {
      expect(visibleText).not.toContain(phrase)
    }

    const structuredData = await page.locator('script[type="application/ld+json"]').evaluateAll((nodes) =>
      nodes.map((node) => JSON.parse(node.textContent || '{}')),
    )
    const types = structuredData.map((entry) => entry['@type'])
    expect(types).toContain('SoftwareApplication')
    expect(types).toContain('FAQPage')
    expect(types).not.toContain('VideoObject')

    const faqLd = structuredData.find((entry) => entry['@type'] === 'FAQPage')
    const visibleFaqQuestions = await page.locator('#faq details summary span:first-child').allInnerTexts()
    expect(faqLd.mainEntity).toHaveLength(visibleFaqQuestions.length)
    expect(faqLd.mainEntity.map((entry: { name: string }) => entry.name)).toEqual(visibleFaqQuestions)
  })

  test('home and download CTAs do not link directly to executable archives while distribution is gated', async ({ page }) => {
    for (const path of ['/', '/download/']) {
      await page.goto(path, { waitUntil: 'networkidle' })

      const riskyLinks = await page.locator('a[href$=".exe"], a[href$=".zip"], a[href*="Setup.exe"], a[href*="Portable.zip"]').evaluateAll(
        (nodes) => nodes.map((node) => ({ text: node.textContent?.trim(), href: (node as HTMLAnchorElement).href })),
      )

      expect(riskyLinks).toEqual([])
    }
  })

  test('purchase page suppresses execution purchase CTA while Premium conditions are pending', async ({ page }) => {
    await page.goto('/purchase/', { waitUntil: 'networkidle' })

    await expect(page.getByText('Premiumの購入条件は最終確認中です')).toBeVisible()
    await expect(page.getByText('購入実行CTAは表示しません').first()).toBeVisible()
    await expect(page.getByRole('link', { name: /購入する|決済|Checkout|今すぐ購入/ })).toHaveCount(0)
  })
})
