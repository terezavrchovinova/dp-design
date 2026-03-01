import { expect, test } from '@playwright/test'
import { getTextPattern } from './utils/translations'

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should navigate to home section', async ({ page }) => {
    await page.waitForLoadState('networkidle')
    // Use translation key - works with any language
    const homePattern = getTextPattern('nav.home')
    const homeLink = page.getByRole('link', { name: homePattern }).first()
    await homeLink.click()

    // Wait for section to be in viewport instead of static timeout
    const homeSection = page.locator('#home')
    await expect(homeSection).toBeInViewport()
  })

  test('should navigate to projects section', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    // Check if menu button exists (mobile) to determine approach
    const menuButton = page.getByRole('button', { name: /toggle menu/i })
    const isMenuButtonVisible = await menuButton.isVisible().catch(() => false)

    if (isMenuButtonVisible) {
      // On mobile, open menu first, then click link
      await menuButton.click()
      await expect(menuButton).toHaveAttribute('aria-expanded', 'true')

      const projectsPattern = getTextPattern('nav.projects')
      const projectsLink = page
        .getByRole('dialog', { name: /mobile navigation menu/i })
        .getByRole('link', { name: projectsPattern })
      await projectsLink.click()
    } else {
      // On desktop, use navbar link
      const navbar = page.getByRole('navigation', { name: /main navigation/i })
      const projectsPattern = getTextPattern('nav.projects')
      const projectsLink = navbar
        .locator('a[href="#projects"]')
        .filter({ hasText: projectsPattern })
        .first()
      await projectsLink.click()
    }

    // Wait for section to be in viewport instead of static timeout
    const projectsSection = page.locator('#projects')
    await expect(projectsSection).toBeInViewport()
  })

  test('should navigate to about section', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    // Check if menu button exists (mobile) to determine approach
    const menuButton = page.getByRole('button', { name: /toggle menu/i })
    const isMenuButtonVisible = await menuButton.isVisible().catch(() => false)

    if (isMenuButtonVisible) {
      // On mobile, open menu first, then click link
      await menuButton.click()
      await expect(menuButton).toHaveAttribute('aria-expanded', 'true')

      const aboutPattern = getTextPattern('nav.about')
      const aboutLink = page
        .getByRole('dialog', { name: /mobile navigation menu/i })
        .getByRole('link', { name: aboutPattern })
      await aboutLink.click()
    } else {
      // On desktop, use navbar link
      const aboutPattern = getTextPattern('nav.about')
      const aboutLink = page.getByRole('link', { name: aboutPattern })
      await aboutLink.click()
    }

    // Wait for section to be in viewport instead of static timeout
    const aboutSection = page.locator('#about')
    await expect(aboutSection).toBeInViewport()
  })

  test('should navigate to contact section', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    // Check if menu button exists (mobile) to determine approach
    const menuButton = page.getByRole('button', { name: /toggle menu/i })
    const isMenuButtonVisible = await menuButton.isVisible().catch(() => false)

    if (isMenuButtonVisible) {
      // On mobile, open menu first, then click link
      await menuButton.click()
      await expect(menuButton).toHaveAttribute('aria-expanded', 'true')

      const contactPattern = getTextPattern('nav.contact')
      const contactLink = page
        .getByRole('dialog', { name: /mobile navigation menu/i })
        .getByRole('link', { name: contactPattern })
      await contactLink.click()
    } else {
      // On desktop, use navbar link
      const navbar = page.getByRole('navigation', { name: /main navigation/i })
      const contactPattern = getTextPattern('nav.contact')
      const contactLink = navbar
        .locator('a[href="#contact"]')
        .filter({ hasText: contactPattern })
        .first()
      await contactLink.click()
    }

    // Wait for section to be in viewport instead of static timeout
    const contactSection = page.locator('#contact')
    await expect(contactSection).toBeInViewport()
  })

  test('should toggle mobile menu on mobile viewport', async ({ page }) => {
    // Set mobile viewport before any checks so layout is correct
    await page.setViewportSize({ width: 375, height: 667 })
    await page.waitForLoadState('load')

    // Wait for menu button to be visible (hamburger shows below xl breakpoint)
    const menuButton = page.getByRole('button', { name: /toggle menu/i })
    await expect(menuButton).toBeVisible()

    // Click menu button to open
    await menuButton.click()

    // Wait for menu to be open and check aria-expanded
    await expect(menuButton).toHaveAttribute('aria-expanded', 'true')

    // Wait for mobile menu to be visible (has 500ms CSS transition)
    const mobileMenu = page.getByRole('dialog', {
      name: /mobile navigation menu/i,
    })
    await expect(mobileMenu).toBeVisible()

    // Close menu by clicking the hamburger again (navbar z-50 overlays the close button which is in z-40)
    await menuButton.click()

    // Wait for menu to close (aria-expanded back to false)
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false')
  })
})
