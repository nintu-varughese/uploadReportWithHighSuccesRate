import { expect, Page, Locator } from '@playwright/test';
import BasePage from './basepage';

export default class ModalPopUpPage extends BasePage {
  // =============================
  // Locators
  // =============================
  private readonly modalHeading = '//h3[text()="Onboarding Modal Popup"]';
  private readonly closeIcon = '//i[@class="fas fa-bars"]';
  private readonly welcomeMessageSelector = 'div.title';

  constructor(page: Page) {
    super(page);
  }

  // =============================
  // Getters
  // =============================
  get welcomeMessageLocator(): Locator {
    return this.page.locator(this.welcomeMessageSelector, { hasText: 'Welcome Peter Parker!' });
  }

  // =============================
  // Actions
  // =============================
  async openModalPopupSection() {
    await this.page.locator(this.modalHeading).click();
    await this.page.locator(this.closeIcon).click();
  }

  // Optional: reusable assert method
  async assertWelcomeMessageVisible() {
    await expect(this.welcomeMessageLocator).toBeVisible();
  }
}
