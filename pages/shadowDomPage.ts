import { Page, Locator, ElementHandle } from '@playwright/test';

/**
 * Page Object for interacting with a Shadow DOM application.
 * Handles navigation and interactions with the progress bar component's shadow DOM.
 */
export default class ShadowDomPage {
  readonly page: Page;
  readonly progressBar: Locator; // main custom element

  constructor(page: Page) {
    this.page = page;
    this.progressBar = page.locator('progress-bar');
  }

  async openShadowDomApp(): Promise<void> {
    await this.page.goto('apps/shadow-dom/');
  }

  private async getBoostButton(): Promise<ElementHandle<Element>> {
    const progressBarHandle = await this.progressBar.elementHandle();
    if (!progressBarHandle) throw new Error('Progress bar not found');

    const boostButtonHandle = await progressBarHandle.evaluateHandle((bar: HTMLElement) => {
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
   * Clicks the "Boost" button inside the shadow DOM and waits
   * until the progress reaches the target percentage.
   */
  async clickBoostAndGetProgress(): Promise<number> {
  const boostButton = await this.getBoostButton();
  await boostButton.click();

  // Wait until the progress bar percent reaches 95
  const targetPercent = 95;
  await this.page.waitForFunction(
    ({ selector, target }: { selector: string; target: number }) => {
      const bar = document.querySelector(selector) as HTMLElement | null;
      if (!bar) return false;
      const percent = Number(bar.getAttribute('percent'));
      return percent >= target;
    },
    { selector: 'progress-bar', target: targetPercent },
  );

  const progressBarHandle = await this.progressBar.elementHandle();
  const percent = await progressBarHandle!.evaluate((bar) => {
    const attr = bar.getAttribute('percent');
    return attr ? Number(attr) : 0;
  });

  return percent;
}
}