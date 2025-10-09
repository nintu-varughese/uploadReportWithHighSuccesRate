import { expect, Page, Locator } from '@playwright/test';
import BasePage from './basepage';
import path from 'path';

export default class QaUploadFilePage extends BasePage {
  private readonly uploadHeading: Locator;
  private readonly uploadIcon: Locator;
  private readonly uploadedFileName: Locator;

  constructor(page: Page) {
    super(page);
    this.uploadHeading = page.locator('//h3[text()="Upload File"]');
    this.uploadIcon = page.locator('//i[@class="fas fa-upload"]');
    this.uploadedFileName = page.locator('//figcaption[text()="uploadFile.png"]');
  }

  /**
   * Upload the file and return the locator for verification
   */
  async uploadFileAndReturnLocator(): Promise<Locator> {
    // Open section
    await this.uploadHeading.click();

    // Click the icon (if required)
    await this.uploadIcon.click();

    // Upload the file
    const filePath = path.resolve(__dirname, '../uploadFile.png');
    await this.page.locator('input[type="file"]').setInputFiles(filePath);

    // Return locator to be used in the test's final expect
    return this.uploadedFileName;
  }
}
