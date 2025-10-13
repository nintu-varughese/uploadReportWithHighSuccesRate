import { Page, Locator } from '@playwright/test';

/**
 * Page Object for interacting with a Shadow DOM application.
 * Provides methods to open the app and interact with the Boost button
 * inside the progress bar component's shadow DOM.
 */
export default class ShadowDomPage {
  readonly page: Page;
  readonly progressBar: Locator;

  /**
   * Initializes the ShadowDomPage with a Playwright Page instance
   * and locates the main `progress-bar` custom element.
   *
   * @param {Page} page - Playwright Page object for browser interactions.
   */
  constructor(page: Page) {
    this.page = page;
    this.progressBar = page.locator('progress-bar'); // main custom element
  }

  /**
   * Navigate to the Shadow DOM application URL.
   *
   * @async
   * @returns {Promise<void>}
   */
  async openShadowDomApp(): Promise<void> {
    await this.page.goto('apps/shadow-dom/');
  }

  /**
   * Clicks the "Boost" button inside the shadow DOM of the progress bar component
   * and returns the updated progress percentage.
   *
   * Steps:
   * 1. Use the `progressBar` locator from constructor.
   * 2. Access its shadow root and find the Boost button (`button.btn-green-outline`).
   * 3. Click the Boost button.
   * 4. Wait for the progress animation to complete.
   * 5. Return the current progress percentage from the `percent` attribute.
   *
   * @async
   * @throws {Error} Throws if the progress bar or Boost button is not found.
   * @returns {Promise<number>} The progress percentage after clicking Boost.
   */
  async clickBoostAndGetProgress(): Promise<number> {
    const progressBarHandle = await this.progressBar.elementHandle();
    if (!progressBarHandle) throw new Error('Progress bar not found');

    // Access shadow DOM and click Boost button safely
    const boostButtonHandle = await progressBarHandle.evaluateHandle((bar) => {
      const shadow = bar.shadowRoot;
      if (!shadow) throw new Error('Shadow root is null');
      const button = shadow.querySelector('button.btn-green-outline');
      if (!button) throw new Error('Boost button not found in shadow DOM');
      return button;
    });

    const boostButton = boostButtonHandle.asElement();
    if (!boostButton) throw new Error('Boost button handle is null');

    await boostButton.click();

    // Wait for progress animation to complete
    await this.page.waitForTimeout(6500);

    // Return the current progress safely
    const percent = await progressBarHandle.evaluate((bar) => {
      const attr = bar.getAttribute('percent');
      return attr ? Number(attr) : 0;
    });

    return percent;
  }
}
