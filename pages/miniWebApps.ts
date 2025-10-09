import { Page } from '@playwright/test';
import BasePage from './basepage';

export default class MiniWebApps extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // =============================
  // Locators
  // =============================
  get dynamicTableHeading() {
    return this.page.locator('//h3[text()="Dynamic Table"]');
  }

  get tableHeader() {
    return this.page.locator('text=SUPERHERO');
  }

  get spiderManRows() {
    return this.page.locator('tbody#tbody tr', { hasText: 'Spider-Man' });
  }

  get fullCoursesLink() {
    return this.page.locator('//a[@aria-label="full courses"]');
  }

  get spiderManRealNameCell() {
    return this.spiderManRows.locator('td').nth(2).locator('span');
  }

  // =============================
  // Actions
  // =============================
  async clickDynamicTable() {
    await this.dynamicTableHeading.click();
  }

  async goBackToHomePage() {
    await this.fullCoursesLink.click();
  }
  async reloadTablePage() {
  await this.page.reload();
}
}
