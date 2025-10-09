import { Page } from '@playwright/test';

export default class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Navigate to any given URL
  async navigate(url: string) {
    await this.page.goto(url);
  }

  // Navigate to the secondary base URL from .env
  async navigateToSecondaryApp() {
    const secondaryUrl = process.env.SECONDARY_BASE_URL;
    if (!secondaryUrl) {
      throw new Error('SECONDARY_BASE_URL is not defined in the .env file');
    }
    await this.page.goto(secondaryUrl);
  }

  // Check if an element is visible
  async isVisible(locator: string) {
    return await this.page.locator(locator).isVisible();
  }
}
