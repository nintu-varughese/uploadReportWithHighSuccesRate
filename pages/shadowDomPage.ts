import { Page } from '@playwright/test';

export default class ShadowDomPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async openShadowDomApp() {
    await this.page.goto('apps/shadow-dom/');
  }

  async clickBoostAndGetProgress(): Promise<number> {
    // Get the custom element
    const progressBarHandle = await this.page.$('progress-bar');
    if (!progressBarHandle) throw new Error('Progress bar not found');

    // Access shadow DOM and click the Boost button
    const boostButtonHandle = await progressBarHandle.evaluateHandle((bar) => {
      const shadow = bar.shadowRoot;
      if (!shadow) throw new Error('Shadow root is null');
      const btn = shadow.querySelector('button.btn-green-outline');
      if (!btn) throw new Error('Boost button not found');
      return btn;
    });

    const boostButton = boostButtonHandle.asElement();
    if (!boostButton) throw new Error('Boost button handle is null');

    await boostButton.click();

    // Wait for animation
    await this.page.waitForTimeout(6500);

    // Return updated percent
    const percent = await progressBarHandle.evaluate((bar) => {
      const attr = bar.getAttribute('percent');
      return attr ? Number(attr) : 0;
    });

    return percent;
  }
}
