import { expect, test } from '@playwright/test'
import { getTextPattern, getTranslation } from './utils/translations'

test.describe('Internationalization', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display content in default language', async ({ page }) => {
    await page.waitForLoadState('networkidle')
    // Use translation key - works with any language (default is Czech)
    const titlePattern = getTextPattern('home.titleLine1')
    await expect(page.getByText(titlePattern)).toBeVisible()
  })

  test('should switch language when language button is clicked', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    // Check if menu button exists (mobile) to determine approach
    const menuButton = page.getByRole('button', { name: /toggle menu/i })
    const isMenuButtonVisible = await menuButton.isVisible().catch(() => false)

    if (isMenuButtonVisible) {
      // On mobile, open menu first to access language switcher
      await menuButton.click()
      await expect(menuButton).toHaveAttribute('aria-expanded', 'true')

      // Language switcher is in the mobile menu
      // Click on English language button (default is Czech)
      // Mobile menu shows language buttons with aria-label "Switch to EN" or "Switch to CS"
      const mobileMenu = page.getByRole('dialog', {
        name: /mobile navigation menu/i,
      })
      await expect(mobileMenu).toBeVisible()

      const englishButton = mobileMenu.getByRole('button', {
        name: /switch to en/i,
      })
      await expect(englishButton).toBeVisible()
      await englishButton.click()

      // Wait for language change to complete
      // Note: Menu stays open after language change, so we don't check for menu close
      // Just wait for the English text to appear
    } else {
      // On desktop, use language switcher in navbar
      const languageButton = page.getByRole('button', {
        name: /change language/i,
      })
      await languageButton.click()

      // Wait for language dropdown menu to appear
      const englishOption = page.getByRole('menuitem', { name: /english/i })
      await expect(englishOption).toBeVisible()

      // Click on English language option (default is Czech)
      await englishOption.click()
    }

    // Wait for language change by checking for English text
    const englishTitle = getTranslation('home.titleLine1', 'en')
    await expect(page.getByText(new RegExp(englishTitle, 'i'))).toBeVisible({
      timeout: 5000,
    })
  })
})
