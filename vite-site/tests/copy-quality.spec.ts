import { expect, test, type Page } from '@playwright/test'

const primaryPages = [
  {
    path: '/',
    heading: '記事・スレッドから、YMM4で仕上げる前準備まで。',
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
    heading: '最新版の確認と更新前チェック',
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

async function collectInspectableCopy(page: Page) {
  return page.evaluate(() => {
    const chunks: string[] = []

    chunks.push(document.body.innerText)
    chunks.push(document.title)

    document.querySelectorAll<HTMLMetaElement>('meta[name], meta[property]').forEach((meta) => {
      chunks.push(meta.getAttribute('content') || '')
      chunks.push(meta.getAttribute('name') || '')
      chunks.push(meta.getAttribute('property') || '')
    })

    document.querySelectorAll<HTMLElement>('[aria-label], [alt], [title]').forEach((node) => {
      chunks.push(node.getAttribute('aria-label') || '')
      chunks.push(node.getAttribute('alt') || '')
      chunks.push(node.getAttribute('title') || '')
    })

    document.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]').forEach((node) => {
      chunks.push(node.textContent || '')
    })

    return chunks.filter(Boolean).join('\n')
  })
}

test.describe('primary page copy quality', () => {
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
