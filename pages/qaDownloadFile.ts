import { expect, Page, Locator } from '@playwright/test';
import BasePage from './basepage';
import path from 'path';
import fs from 'fs';

export default class QaDownloadFilePage extends BasePage {
  private readonly downloadHeading: Locator;
  private readonly downloadButton: Locator;

  constructor(page: Page) {
    super(page);
    this.downloadHeading = page.locator('//h3[text()="Download File"]');
    this.downloadButton = page.locator('//a[@class="btn btn-lg btn-green-outline"]');
  }

  /**
   * Download the file and return its path for verification
   */
  async downloadFileAndReturnPath(expectedFileName: string): Promise<string> {
    // Open section
    await this.downloadHeading.click();

    // Intercept download
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.downloadButton.click(),
    ]);

    const downloadPath = path.resolve(__dirname, `../${expectedFileName}`);
    await download.saveAs(downloadPath);

    return downloadPath;
  }
}
