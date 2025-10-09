import { expect, Page, Locator } from '@playwright/test';

export default class NavigationMenuPage {
  readonly page: Page;
  readonly navMenu: Locator;
  readonly pageHeader: Locator;
  readonly goBackLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navMenu = page.locator('//h3[text()="Navigation Menu"]');
    this.pageHeader = page.locator('//h1').nth(1);
    this.goBackLink = page.locator('//a[text()="Go Back"]');
  }

  async clickNavMenu() {
    await this.navMenu.click();
  }

  async clickMenuItem(item: string) {
    await this.page.locator(`#nav a:text-is("${item}")`).click();
  }

  async getPageHeader(): Promise<string> {
    return await this.pageHeader.textContent() || '';
  }

  async goBack() {
    await this.goBackLink.click();
  }

  async getAllPagesFlow(): Promise<string[]> {
    const pages = ['About', 'Blog', 'Portfolio', 'Contact'];
    const headers: string[] = [];
    for (let i = 0; i < pages.length; i++) {
      await this.clickMenuItem(pages[i]);
      const header = await this.getPageHeader();
      headers.push(header.trim());
      await this.goBack();
    }
    return headers;
  }
}
