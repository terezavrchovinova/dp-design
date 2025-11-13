import { test, expect } from '@playwright/test'
import { getTextPattern } from './utils/translations'

test.describe('Home Page', () => {
  test('should load and display the home page', async ({ page }) => {
    await page.goto('/')

    // Wait for the page to load
    await page.waitForLoadState('networkidle')

    // Use translation key - works with any language
    const headingPattern = getTextPattern('home.titleLine1')
    const heading = page.getByText(headingPattern)
    await expect(heading).toBeVisible()
  })

  test('should display navigation bar', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Check if navbar is visible
    const navbar = page.getByRole('navigation', { name: /main navigation/i })
    await expect(navbar).toBeVisible()

    // Check if menu button exists (mobile) or navigation links exist (desktop)
    const menuButton = page.getByRole('button', { name: /toggle menu/i })
    const isMenuButtonVisible = await menuButton.isVisible().catch(() => false)

    if (isMenuButtonVisible) {
      // On mobile, check for menu button and navbar structure
      await expect(menuButton).toBeVisible()

      // Check that navbar is visible and contains the menu button
      // On mobile, navigation links are in the menu, not in the navbar directly
      await expect(navbar).toBeVisible()
    } else {
      // On desktop, check navigation links
      const homePattern = getTextPattern('nav.home')
      const projectsPattern = getTextPattern('nav.projects')
      const contactPattern = getTextPattern('nav.contact')

      // Check navigation links within navbar only
      const navbarLinks = navbar.locator('a[href^="#"]')

      // Check that navbar contains links to home, projects, and contact
      await expect(navbarLinks.filter({ hasText: homePattern })).toBeVisible()
      await expect(
        navbarLinks.filter({ hasText: projectsPattern }).first(),
      ).toBeVisible()
      await expect(
        navbarLinks.filter({ hasText: contactPattern }),
      ).toBeVisible()
    }
  })

  test('should navigate to projects section when clicking "View Projects"', async ({
    page,
  }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Use translation key - works with any language
    const viewProjectsPattern = getTextPattern('home.viewProjects')
    const viewProjectsButton = page.getByRole('link', {
      name: viewProjectsPattern,
    })
    await viewProjectsButton.click()

    // Wait for projects section to be in viewport instead of static timeout
    const projectsSection = page.locator('#projects')
    await expect(projectsSection).toBeInViewport()
  })

  test('should navigate to contact section when clicking "Contact Me"', async ({
    page,
  }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Use translation key - works with any language
    const contactMePattern = getTextPattern('home.contactMe')
    const contactButton = page.getByRole('link', {
      name: contactMePattern,
    })
    await contactButton.click()

    // Wait for contact section to be in viewport instead of static timeout
    const contactSection = page.locator('#contact')
    await expect(contactSection).toBeInViewport()
  })
})
