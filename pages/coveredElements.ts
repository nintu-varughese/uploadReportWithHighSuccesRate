import { expect, Page } from '@playwright/test';
import BasePage from './basepage';

export default class CoveredElementsPage extends BasePage {
  // Locators
  private readonly coveredElementsHeading = '//h3[text()="Covered Elements"]';
  private readonly wrapperDiv = '//div[@class="wrapper"]';
  private readonly youGotMeButton = '//a[@onclick="youGotMe()"]';
  private readonly missionAccomplishedText = '//p[text()="Mission accomplished"]';

  constructor(page: Page) {
    super(page);
  }
  /**
   * Navigate to the "Covered Elements" section
   */
  async openCoveredElementsSection() {
    await this.page.locator(this.coveredElementsHeading).click();
  }

  /**
   * Scroll down to the wrapper, click "You Got Me" button,
   * scroll back up, and verify "Mission accomplished" text
   */
  async scrollClickAndVerify() {
    // Scroll down to the wrapper
    const wrapper = this.page.locator(this.wrapperDiv);
    await wrapper.scrollIntoViewIfNeeded();

    // Click the "You Got Me" button
    await this.page.locator(this.youGotMeButton).click();

    // Scroll back up
    await this.page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // Verify the "Mission accomplished" text is visible
    await expect(this.page.locator(this.missionAccomplishedText)).toBeVisible();
  }
}

