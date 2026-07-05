import { expect, test } from '@playwright/test'
import { getTextPattern } from './utils/translations'

// The scatter heading only renders its interactive per-letter variant on md+
// viewports, so these tests are desktop-only.
const MOBILE_PROJECTS = ['Mobile Chrome', 'Mobile Safari']

const firstHeadingLetter = (page: import('@playwright/test').Page) =>
  page.locator('#contact h2 span').first()

test.describe('Scatter heading hover', () => {
  test('scatters a letter on hover', async ({ page }, testInfo) => {
    if (MOBILE_PROJECTS.includes(testInfo.project.name)) {
      testInfo.skip()
    }

    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await page.locator('#contact').scrollIntoViewIfNeeded()

    const letter = firstHeadingLetter(page)
    await expect(letter).toBeVisible()
    await letter.hover()

    // handleHover flings the letter ~100px away, so an inline transform appears.
    await expect(letter).not.toHaveCSS('transform', 'none')
  })

  test('does not scatter when the user prefers reduced motion', async ({ page }, testInfo) => {
    if (MOBILE_PROJECTS.includes(testInfo.project.name)) {
      testInfo.skip()
    }

    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await page.locator('#contact').scrollIntoViewIfNeeded()

    const letter = firstHeadingLetter(page)
    await expect(letter).toBeVisible()
    await letter.hover()

    // Give the (gated-off) scatter animation time to have started if the gate failed.
    await page.waitForTimeout(400)
    await expect(letter).toHaveCSS('transform', 'none')
  })
})

test.describe('Reduced motion page load', () => {
  test('all content still becomes visible', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Entrance animations must not leave content stuck invisible.
    await expect(page.getByText(getTextPattern('home.titleLine1a'))).toBeVisible()
    await expect(page.getByText(getTextPattern('home.subtitle'))).toBeVisible()
  })
})
