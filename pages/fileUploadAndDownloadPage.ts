import { Page } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import BasePage from "./basepage";

export default class FileUploadPage extends BasePage {

  // =============================
  // File paths
  // =============================
  private readonly filePath = path.resolve(__dirname, '../uploadFile.png');

  // =============================
  // File Upload
  // =============================
  /**
   * Navigate to File Upload section, upload a file
   * @returns locator of uploaded file success message for assertion
   */
  async uploadFile() {
    // Open "More" menu
    await this.page.locator('//a[text()="More"]').click();

    // Navigate to "File Upload"
    await this.page.locator('//a[text()="File Upload"]').click();

    // Upload the file
    const fileInput = this.page.locator('//input[@id="input-4"]');
    await fileInput.setInputFiles(this.filePath);

    // Return locator for test to assert visibility
    return this.page.locator('//span[text()="Upload"]');
  }

  // =============================
  // File Download
  // =============================
  /**
   * Generate a TXT file with the provided text and download it
   * @param text The text to include in the TXT file
   * @returns file path of the downloaded file for assertion
   */
  async generateDownloadFile(text: string): Promise<string> {
    // Open "More" menu
    await this.page.locator('//a[text()="More"]').click();

    // Navigate to "File Download"
    await this.page.locator('//a[text()="File Download"]').click();

    // Fill the textarea with the text
    const textArea = this.page.locator('//textarea[@id="textbox"]');
    await textArea.fill('');      // Clear existing text
    await textArea.type(text);    // Type new text

    // Click "Generate File" (TXT only)
    await this.page.locator('(//button[text()="Generate File"])[1]').click();

    // Wait for download event and click download link
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.page.locator('//a[@id="link-to-download"]').click()
    ]);

    // Save downloaded file to project root
    const downloadPath = path.resolve(__dirname, '../');
    const filePath = path.join(downloadPath, await download.suggestedFilename());
    await download.saveAs(filePath);

    // Return file path for test to perform assertions
    return filePath;
  }
}
