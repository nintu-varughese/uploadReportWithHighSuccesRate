import { expect, Page, Locator } from '@playwright/test';
import BasePage from './basepage';

export default class ContextMenuPage extends BasePage {
  private readonly contextMenuSection = '//h3[text()="Right-Click Context Menu"]';
  private readonly messageLocator = '//div[@id="message"]';

  constructor(page: Page) {
    super(page);
  }

  // Open the Right-Click Context Menu section
  async openContextMenuSection() {
    const section = this.page.locator(this.contextMenuSection);
    await expect(section).toBeVisible({ timeout: 10000 });
    await section.click();
  }

  // Right-click on the target element
  async rightClickTarget(targetLocator: string) {
    const target = this.page.locator(targetLocator);
    await expect(target).toBeVisible({ timeout: 10000 });
    await target.scrollIntoViewIfNeeded();
    await target.click({ button: 'right' });
  }

  // Return locator for a context menu item
  private contextContent(menu: string): Locator {
    return this.page.locator(`//div[@class="menu"]//li[text()="${menu}"]`);
  }

  // Click a menu item
  async menuItemClick(menu: string) {
    const menuItem = this.contextContent(menu);
    await expect(menuItem).toBeVisible({ timeout: 5000 });
    await menuItem.click();
  }

  // Hover over a menu item (for sub-menus)
  async menuItemHover(menu: string) {
    const menuItem = this.contextContent(menu);
    await expect(menuItem).toBeVisible({ timeout: 5000 });
    await menuItem.hover();
  }

  // Locator for message text
  getMessageLocator(): Locator {
    return this.page.locator(this.messageLocator);
  }

  // Get message text
  async getMessageText(): Promise<string> {
    return this.page.locator(this.messageLocator).innerText();
  }
}
