import { expect, test } from '@playwright/test'

const primaryPages = [
  {
    path: '/',
    heading: '記事URL・スレッドURLから、ゆっくり動画の台本下地とYMM4前準備を作る',
    ctas: ['無料でダウンロード', '実画面を見る'],
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
})
