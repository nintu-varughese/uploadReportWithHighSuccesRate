import { Page, Locator } from '@playwright/test';

/**
 * Page Object Model for the "Redirect Chain" section of QA Playground.
 * Handles navigation through multiple redirected pages and verification of messages.
 */
export default class RedirectChainPage {
  readonly page: Page;
  readonly redirectHeader: Locator;
  readonly redirectLink: Locator;
  readonly messageLocators: Locator[];
  readonly goBackButton: Locator;

  /**
   * Initializes all locators used in the Redirect Chain page.
   * @param {Page} page - The Playwright Page instance for browser interactions.
   */
  constructor(page: Page) {
    this.page = page;

    /** Locator for the "Redirect Chain" section header */
    this.redirectHeader = page.locator('//h3[text()="Redirect Chain"]');

    /** Locator for the redirect link that starts the redirect sequence */
    this.redirectLink = page.locator('//a[@id="redirect"]');

    /** 
     * Locators for each sequential page message during the redirect chain process.
     * These messages appear one by one as the browser navigates through redirects.
     */
    this.messageLocators = [
      page.locator('//p[text()="Welcome to Second Page"]'),
      page.locator('//p[text()="Welcome to Third Page"]'),
      page.locator('//p[text()="Welcome to Fourth Page"]'),
      page.locator('//p[text()="Welcome to Fifth Page"]'),
      page.locator('//p[text()="Welcome to Sixth Page"]'),
      page.locator('//p[text()="Welcome to the Last Page"]'),
    ];

    /** Locator for the "Go Back" button available on the final redirect page */
    this.goBackButton = page.locator('//a[text()="Go Back"]');
  }

  /**
   * Clicks on the "Redirect Chain" section header to open the redirect chain section.
   * @returns {Promise<void>} Resolves when the click action is complete.
   */
  async clickHeader(): Promise<void> {
    await this.redirectHeader.click();
  }

  /**
   * Clicks on the "Redirect" link to begin the redirect chain sequence.
   * Includes a short wait to allow navigation through multiple pages.
   * @returns {Promise<void>} Resolves when the redirect link is clicked and initial navigation settles.
   */
  async clickRedirectLink(): Promise<void> {
    await this.redirectLink.click();
    // Wait a few seconds for multiple redirects to complete before assertions
    await this.page.waitForTimeout(5000);
  }
}
