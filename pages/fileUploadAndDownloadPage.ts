import { Page, Locator, Download } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import BasePage from './basepage';

/**
 * Page Object for handling File Upload and Download operations.
 */
export default class FileUploadPage extends BasePage {
  readonly filePath: string;
  readonly moreMenu: Locator;
  readonly fileUploadLink: Locator;
  readonly fileInput: Locator;
  readonly uploadSuccess: Locator;
  readonly fileDownloadLink: Locator;
  readonly textArea: Locator;
  readonly generateFileButton: Locator;
  readonly downloadLink: Locator;

  /**
   * Initializes locators and file path for upload/download
   * @param {Page} page - Playwright Page object
   */
  constructor(page: Page) {
    super(page);

    this.filePath = path.resolve(__dirname, '../uploadFile.png');
    this.moreMenu = page.locator('//a[text()="More"]');
    this.fileUploadLink = page.locator('//a[text()="File Upload"]');
    this.fileInput = page.locator('//input[@id="input-4"]');
    this.uploadSuccess = page.locator('//span[text()="Upload"]'); 
    this.fileDownloadLink = page.locator('//a[text()="File Download"]');
    this.textArea = page.locator('//textarea[@id="textbox"]');
    this.generateFileButton = page.locator('(//button[text()="Generate File"])[1]');
    this.downloadLink = page.locator('//a[@id="link-to-download"]');
  }

  /**
   * Navigate to File Upload section and upload a file
   * @async
   * @returns {Promise<Locator>} Locator of the uploaded file success message
   */
  async uploadFile(): Promise<Locator> {
    await this.moreMenu.click();
    await this.fileUploadLink.click();
    await this.fileInput.setInputFiles(this.filePath);
    await this.uploadSuccess.waitFor({ state: 'visible', timeout: 5000 });
    return this.uploadSuccess;
  }

  /**
   * Generate a downloadable file with the specified text
   * and download it to the project directory.
   * @async
   * @param {string} text - Text to include in the file
   * @returns {Promise<string>} Full path of the downloaded file
   */
  async generateDownloadFile(text: string): Promise<string> {
    await this.moreMenu.click();
    await this.fileDownloadLink.click();

    await this.textArea.fill('');
    await this.textArea.type(text);

    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.generateFileButton.click(),
    ]);

    const downloadPath = path.resolve(__dirname, '../');
    const filePath = path.join(downloadPath, await download.suggestedFilename());
    await download.saveAs(filePath);

    return filePath;
  }
}
