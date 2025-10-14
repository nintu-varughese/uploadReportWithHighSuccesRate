import { expect, Locator, Page, FrameLocator } from "@playwright/test";
import BasePage from "./basepage";

export default class ChangeableIframePage extends BasePage {
  readonly header: Locator;
  readonly iframe: FrameLocator;
  readonly firstIframeLegend: Locator;
  readonly secondIframeLegend: Locator;

  constructor(page: Page) {
    super(page);
    this.header = page.locator('//h3[text()="Changeable Iframe"]');
    this.iframe = page.frameLocator("#frame1");
    this.firstIframeLegend = this.iframe.locator(
      '//legend[text()="First Iframe"]'
    );
    this.secondIframeLegend = this.iframe.locator(
      '//legend[text()="Second Iframe"]'
    );
  }

  /**
   * Verifies iframe content changes from "First Iframe" to "Second Iframe"
   * after approximately 6–7 seconds.
   */
  async verifyIframeSequence(): Promise<void> {
    await expect(
      this.header,
      "Changeable Iframe header is not visible"
    ).toBeVisible({ timeout: 10000 });
    await this.header.click();
    await expect(
      this.firstIframeLegend,
      "First Iframe legend not visible after section click"
    ).toBeVisible({ timeout: 10000 });
    await this.page.waitForTimeout(7000);
  }
}
