import { test, expect } from '@playwright/test'
import { getTextPattern } from './utils/translations'

test.describe('Projects Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
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
      
      await expect(projectsLink).toBeVisible()
      await projectsLink.click()
    }
    
    // Wait for projects section to be in viewport
    const projectsSection = page.locator('#projects')
    await expect(projectsSection).toBeInViewport({ timeout: 10000 })
  })

  test('should display projects section', async ({ page }) => {
    const projectsSection = page.locator('#projects')
    await expect(projectsSection).toBeVisible()
    await expect(projectsSection).toBeInViewport()
  })

  test('should display projects title', async ({ page }) => {
    // Use translation key - works with any language
    // Scope to projects section to avoid matching navbar links or CTA buttons
    const projectsSection = page.locator('#projects')
    const projectsTitlePattern = getTextPattern('projects.title')
    await expect(
      projectsSection.getByRole('heading', { name: projectsTitlePattern }),
    ).toBeVisible()
  })

  test('should display project images', async ({ page }) => {
    const projectImages = page.locator('#projects img')
    const count = await projectImages.count()
    expect(count).toBeGreaterThan(0)
  })

  test('should open project link in new tab', async ({ page, context }) => {
    // Wait for project links to be visible
    await page.waitForSelector('#projects a[href*="behance"]', { state: 'visible' })
    
    // Get the first project link
    const projectLink = page.locator('#projects a[href*="behance"]').first()
    
    // Check if it opens in a new tab
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      projectLink.click(),
    ])
    
    // Wait for the new page to load
    await newPage.waitForLoadState()
    
    // Check if it's a Behance link
    expect(newPage.url()).toContain('behance.net')
    
    await newPage.close()
  })

  test('should have proper accessibility attributes on project links', async ({ page }) => {
    await page.waitForSelector('#projects a[href*="behance"]', { state: 'visible' })
    
    const projectLinks = page.locator('#projects a[href*="behance"]')
    const count = await projectLinks.count()
    
    for (let i = 0; i < Math.min(count, 3); i++) {
      const link = projectLinks.nth(i)
      await expect(link).toHaveAttribute('target', '_blank')
      await expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      await expect(link).toHaveAttribute('aria-label')
    }
  })
})

