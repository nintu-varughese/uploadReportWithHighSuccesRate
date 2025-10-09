import { Page, Locator } from '@playwright/test';
import BasePage from './basepage';

export default class NewTabPage extends BasePage {
  // Locators
  private readonly newTabHeading = '//h3[text()="New Tab"]';
  private readonly openNewTabButton = '//a[text()="Open New Tab"]';
  private readonly newPageText = '//h1[text()="Welcome to the new page!"]';

  constructor(page: Page) {
    super(page);
  }

  // -------------------------------
  // Actions
  // -------------------------------

  /** Open the "New Tab" section */
  async openNewTabSection() {
    await this.page.locator(this.newTabHeading).click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Click "Open New Tab" and return the new Page object
   */
  async clickOpenNewTab(): Promise<Page> {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'), // Wait for new tab
      this.page.locator(this.openNewTabButton).click(), // Trigger new tab
    ]);
    await newPage.waitForLoadState('domcontentloaded');
    return newPage;
  }

  /** Get locator for verification on the new tab */
  getNewPageTextLocator(newPage: Page): Locator {
    return newPage.locator(this.newPageText);
  }
}
