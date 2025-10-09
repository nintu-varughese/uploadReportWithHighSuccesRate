import { expect, Page } from '@playwright/test';
import BasePage from './basepage';

/**
 * Page Object Model for the Home Page of QA Playground.
 * Extends BasePage to reuse common page methods and protected `page` instance.
 */
export default class HomePage extends BasePage {
  /**
   * Constructor for HomePage
   * @param page {Page} - Playwright Page instance to interact with the browser.
   */
  constructor(page: Page) {
    super(page);
  }

  // =============================
  // Locators (as getters)
  // =============================

  /** Locator for the main heading "QA Playground" */
  get headingLocator() {
    return this.page.locator('//span[text()="QA Playground"]');
  }

  /** Locator for the "Mini Web Apps" link in the homepage */
  get miniWebAppsLinkLocator() {
    return this.page.locator('//a[text()="Mini Web Apps"]');
  }

  /** Locator for the heading inside the "Mini Web Apps" page */
  get miniWebAppsHeadingLocator() {
    return this.page.locator('//h2[text()="Mini Web Apps"]');
  }

  // =============================
  // Actions / Methods
  // =============================

  /**
   * Navigate to a specific URL
   * @param url {string} - The URL to navigate to
   */
  async navigate(url: string) {
    await this.page.goto(url);
  }

  /**
   * Click on the "Mini Web Apps" link
   */
  async clickMiniWebApps() {
    await this.miniWebAppsLinkLocator.click();
  }

  /**
   * Verify that the main heading "QA Playground" is visible
   */
  async verifyHeading() {
    await expect(this.headingLocator).toBeVisible();
  }

  /**
   * Verify that the "Mini Web Apps" page heading is visible
   */
  async verifyFullCoursesLink() {
    await expect(this.miniWebAppsHeadingLocator).toBeVisible();
  }
}
