import { Locator, Page } from '@playwright/test';
import BasePage from './basepage';

export default class MultiLevelDropdownPage extends BasePage {
  readonly dropdownLink: Locator;
  readonly iconButton: Locator;
  readonly settingsLink: Locator;
  readonly animalsLink: Locator;
  readonly subMenuItems: Locator;

  readonly expectedSettingsSubMenu = [
    'My Tutorial',
    'HTML',
    'CSS',
    'JavaScript',
    'Awesome!'
  ];

  readonly expectedAnimalsSubMenu = [
    'Kangaroo',
    'Frog',
    'Horse',
    'Hedgehog'
  ];

  constructor(page: Page) {
    super(page);
    this.dropdownLink = page.locator('//h3[text()="Multi Level Dropdown"]');
    this.iconButton = page.locator('(//a[@class="icon-button"])[4]');
    this.settingsLink = page.locator('//a[@href="#settings"]');
    this.animalsLink = page.locator('//a[@href="#animals"]');
    this.subMenuItems = page.locator('div.menu.menu-secondary-enter-done > a.menu-item');
  }

  // -------------------------------
  // Basic Actions
  // -------------------------------

  async openDropdownSection() {
    await this.dropdownLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickIconButton() {
    await this.iconButton.click();
  }

  async clickSettings() {
    await this.settingsLink.click();
  }

  async clickAnimals() {
    await this.animalsLink.click();
  }

  /**
   * Get all submenu items text as plain text array
   * Skips parent links like "Settings" or "Animals"
   * Removes emojis and line breaks
   */
  async getSubMenuItemsText(): Promise<string[]> {
    await this.subMenuItems.first().waitFor({ state: 'visible' });
    const count = await this.subMenuItems.count();
    const texts: string[] = [];

    for (let i = 0; i < count; i++) {
      let text = await this.subMenuItems.nth(i).innerText();
      text = text.trim();

      // Skip parent links
      if (text === 'Settings' || text === 'Animals') continue;

      // Remove emoji + newline if present at the start
      text = text.replace(/^[^\w]*(.*)/s, '$1').trim();

      texts.push(text);
    }
    return texts;
  }

  // -------------------------------
  // Combined Helper Methods
  // -------------------------------

  /** Open Settings and return {url, submenu items} */
  async openSettingsAndGetDetails(): Promise<{ url: string; submenuItems: string[] }> {
    await this.openDropdownSection();
    await this.clickIconButton();
    await this.clickSettings();
    const url = this.page.url();
    const submenuItems = await this.getSubMenuItemsText();
    return { url, submenuItems };
  }

  /** Open Animals and return {url, submenu items} */
  async openAnimalsAndGetDetails(): Promise<{ url: string; submenuItems: string[] }> {
    await this.openDropdownSection();
    await this.clickIconButton();
    await this.clickAnimals();
    const url = this.page.url();
    const submenuItems = await this.getSubMenuItemsText();
    return { url, submenuItems };
  }

  /** Click a submenu item by visible text */
  async clickSubMenuItem(itemText: string) {
    const itemLocator = this.subMenuItems.filter({ hasText: itemText });
    await itemLocator.first().click();
  }

  /** Click HTML submenu item (Settings example) */
  async clickHTMLSubMenu() {
    await this.openDropdownSection();
    await this.clickIconButton();
    await this.clickSettings();
    await this.clickSubMenuItem('HTML');
  }

  /** Click Animals submenu item by name */
  async clickAnimalsSubMenu(itemText: string) {
    await this.openDropdownSection();
    await this.clickIconButton();
    await this.clickAnimals();
    await this.clickSubMenuItem(itemText);
  }
  /** Get current URL */
async getCurrentURL(): Promise<string> {
  return this.page.url();
}

}
