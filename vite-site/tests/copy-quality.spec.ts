import { expect, test } from '@playwright/test'

const primaryPages = [
  {
    path: '/',
    heading: '記事・スレッドから、YMM4のタイムラインまで。',
    ctas: ['Free版をダウンロード'],
  },
  {
    path: '/download/',
    heading: '最新版を無料ダウンロード',
    ctas: ['無料でダウンロード', '使い方を見る'],
  },
  {
    path: '/instructions/',
    heading: '記事URLから台本を取得し、YMM4に渡すまでの手順',
    ctas: ['無料でダウンロード', 'FAQを見る'],
  },
  {
    path: '/samples/',
    heading: '実アプリ画面と動画サンプルで、使う前の流れを確認する',
    ctas: ['無料でダウンロード', '使い方を見る'],
  },
  {
    path: '/purchase/',
    heading: '料金プラン｜Freeで試して、Premiumで制限解除',
    ctas: ['プラン比較を見る', '無料でダウンロード'],
  },
  {
    path: '/faq/',
    heading: '導入前によくある質問',
    ctas: ['使い方を見る', '実画面を見る', '料金を見る', '問い合わせる'],
  },
  {
    path: '/update/',
    heading: '最新版の確認と更新前チェック',
    ctas: ['無料でダウンロード'],
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

test.describe('primary page copy quality', () => {
  for (const entry of primaryPages) {
    test(`${entry.path} has a concrete heading, stable CTA labels, and no internal copy`, async ({ page }) => {
      await page.goto(entry.path, { waitUntil: 'networkidle' })

      await expect(page.locator('h1').first()).toContainText(entry.heading)

      const visibleText = await page.locator('body').innerText()
      for (const phrase of forbiddenCopy) {
        expect(visibleText).not.toContain(phrase)
      }

      for (const cta of entry.ctas) {
        await expect(page.getByRole('link', { name: cta }).first()).toBeVisible()
      }
    })
  }

  test('home keeps unverified proof claims out of visible copy and structured data', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })

    const visibleText = await page.locator('body').innerText()
    for (const phrase of ['60秒の操作デモ', '実際の完成映像', '動画作成の上限', '利用制限を解除', '実操作デモ']) {
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
})
