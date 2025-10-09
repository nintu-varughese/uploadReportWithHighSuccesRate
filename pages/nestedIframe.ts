import { Locator, Page, expect } from '@playwright/test';
import BasePage from './basepage';

export default class NestedIframePage extends BasePage {
  private readonly nestedIframeHeading = '//h3[text()="Nested Iframe"]';
  private readonly clickMeButton = '//a[text()="Click Me"]';
  private readonly buttonClickedMessage = '//p[text()="Button Clicked"]';

  constructor(page: Page) {
    super(page);
  }

  /** Open the "Nested Iframe" section */
  async openNestedIframeSection() {
    await this.page.locator(this.nestedIframeHeading).click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /** Click the "Click Me" button inside nested iframe and return the message locator */
  async clickButtonAndGetMessage(): Promise<Locator> {
    const outerFrame = this.page.frameLocator('iframe').first();
    const innerFrame = outerFrame.frameLocator('iframe');

    await innerFrame.locator(this.clickMeButton).click();

    // Return the message locator to be asserted in the test
    return innerFrame.locator(this.buttonClickedMessage);
  }
}
