import { Locator, Page } from '@playwright/test';
import BasePage from './basepage';

export default class VerifyAccountPage extends BasePage {
  readonly codeInputs: Locator;
  readonly successMessage: Locator;
  readonly verifyAccountLink: Locator;

  constructor(page: Page) {
    super(page);
    this.verifyAccountLink = page.locator('//h3[text()="Verify Your Account"]');
    this.codeInputs = page.locator('.code');
    this.successMessage = page.locator('//small[@class="info success"]');
  }

  /** Open the "Verify Your Account" section */
  async openVerifyAccountPage() {
    await this.verifyAccountLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /** Open base URL (for fresh navigation in negative test) */
  async openBaseUrl(baseURL: string) {
    await this.page.goto(baseURL);
    await this.page.waitForLoadState('domcontentloaded');
  }

  /** Fill all inputs with a given value */
  async fillCodeInputs(value: string) {
    const count = await this.codeInputs.count();
    for (let i = 0; i < count; i++) {
      await this.codeInputs.nth(i).fill(value);
    }
  }

  /** Press Enter on the last input */
  async pressEnterOnLastInput() {
    const count = await this.codeInputs.count();
    if (count > 0) {
      await this.codeInputs.nth(count - 1).press('Enter');
    }
  }

  /**
   * Combined: Opens the Verify Account page, fills all inputs with a value, and submits
   */
  async fillAndSubmitCode(value: string) {
    await this.openVerifyAccountPage();
    await this.fillCodeInputs(value);
    await this.pressEnterOnLastInput();
  }
}
