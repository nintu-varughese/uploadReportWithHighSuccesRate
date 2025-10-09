import { Locator, Page } from '@playwright/test';
import BasePage from './basepage';

export default class PopUpWindowPage extends BasePage {
  private readonly popUpHeading = '//h3[text()="Pop-Up Window"]';
  private readonly openButton = '//a[@onclick="openPopUp()"]';
  private readonly closeButton = '//button[@onclick="window.close()"]';
  private readonly successMessage = '//p[text()="Button Clicked"]';

  constructor(page: Page) {
    super(page);
  }

  /** Open the Pop-Up Window section */
  async openPopUpSection() {
    await this.page.locator(this.popUpHeading).click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Open the popup, click Close, wait for popup to close, and return locator for main page success message
   */
  async openPopUpAndClose(): Promise<Locator> {
    const [popup] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.page.locator(this.openButton).click(),
    ]);

    await popup.waitForLoadState('domcontentloaded');

    const popupClosePromise = popup.waitForEvent('close');
    await popup.locator(this.closeButton).click();
    await popupClosePromise;

    return this.page.locator(this.successMessage);
  }
}
