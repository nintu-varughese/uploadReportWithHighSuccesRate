import { Page, Locator, ElementHandle } from '@playwright/test';

/**
 * Page Object for interacting with a Shadow DOM application.
 * Handles navigation and interactions with the progress bar component's shadow DOM.
 */
export default class ShadowDomPage {
  readonly page: Page;
  readonly progressBar: Locator; // main custom element

  /**
   * Initializes the ShadowDomPage with a Playwright Page object
   * and stores the main progress bar custom element.
   *
   * @param {Page} page - Playwright Page object for browser interactions
   */
  constructor(page: Page) {
    this.page = page;
    this.progressBar = page.locator('progress-bar'); // main custom element
  }

  /**
   * Navigate to the Shadow DOM demo application.
   *
   * @async
   */
  async openShadowDomApp(): Promise<void> {
    await this.page.goto('apps/shadow-dom/');
  }

  /**
   * Retrieves the Boost button inside the shadow DOM of the progress bar.
   *
   * @async
   * @returns {Promise<ElementHandle<Element>>} Handle to the Boost button
   * @throws {Error} Throws if the shadow DOM or button is not found
   */
  private async getBoostButton(): Promise<ElementHandle<Element>> {
    const progressBarHandle = await this.progressBar.elementHandle();
    if (!progressBarHandle) throw new Error('Progress bar not found');

    const boostButtonHandle = await progressBarHandle.evaluateHandle((bar) => {
      const shadow = bar.shadowRoot;
      if (!shadow) throw new Error('Shadow root is null');
      const button = shadow.querySelector('button.btn-green-outline');
      if (!button) throw new Error('Boost button not found in shadow DOM');
      return button;
    });

    const boostButton = boostButtonHandle.asElement();
    if (!boostButton) throw new Error('Boost button handle is null');

    return boostButton;
  }

  /**
   * Clicks the "Boost" button inside the shadow DOM and retrieves the updated progress percent.
   *
   * @async
   * @returns {Promise<number>} Current progress percent after clicking the Boost button
   * @throws {Error} Throws if the progress bar or Boost button is not found
   */
  async clickBoostAndGetProgress(): Promise<number> {
    const boostButton = await this.getBoostButton();
    await boostButton.click();

    // Wait for animation to complete
    await this.page.waitForTimeout(6500);

    // Return updated progress percentage
    const progressBarHandle = await this.progressBar.elementHandle();
    const percent = await progressBarHandle!.evaluate((bar) => {
      const attr = bar.getAttribute('percent');
      return attr ? Number(attr) : 0;
    });

    return percent;
  }
}
