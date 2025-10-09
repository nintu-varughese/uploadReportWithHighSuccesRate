import { expect, Page } from '@playwright/test';
import BasePage from "./basepage";

/**
 * Page Object for handling different types of alerts:
 * - Simple alert
 * - Confirm alert (OK/Cancel)
 * - Prompt alert (type text / cancel)
 */
export default class DemoAlertPage extends BasePage {

  // =============================
  // Handle Simple Alert (OK only)
  // =============================
  /**
   * Navigate to Alerts → OK Tab and handle a simple alert by clicking OK
   * @returns boolean indicating completion
   */
  async handleAlertFlow(): Promise<boolean> {
    await this.page.locator('//a[text()="SwitchTo"]').click();
    await this.page.locator('//a[text()="Alerts"]').click();

    this.page.once('dialog', async dialog => {
      await dialog.accept();
    });

    await this.page.locator('//div[@id="OKTab"]//button').click();
    return true;
  }

  // =============================
  // Handle Confirm Alert
  // =============================
  /**
   * Trigger confirm alert and click OK
   * @returns boolean indicating completion
   */
  async handleConfirmAlertOk(): Promise<boolean> {
    await this.page.locator('//a[text()="SwitchTo"]').click();
    await this.page.locator('//a[text()="Alerts"]').click();
    await this.page.locator('//a[text()="Alert with OK & Cancel "]').click();

    this.page.once('dialog', async dialog => {
      await dialog.accept();
    });

    await this.page.locator('//button[text()="click the button to display a confirm box "]').click();
    return true;
  }

  /**
   * Trigger confirm alert and click Cancel
   * @returns boolean indicating completion
   */
  async handleConfirmAlertCancel(): Promise<boolean> {
    await this.page.locator('//a[text()="SwitchTo"]').click();
    await this.page.locator('//a[text()="Alerts"]').click();
    await this.page.locator('//a[text()="Alert with OK & Cancel "]').click();

    this.page.once('dialog', async dialog => {
      await dialog.dismiss();
    });

    await this.page.locator('//button[text()="click the button to display a confirm box "]').click();
    return true;
  }

  // =============================
  // Handle Prompt Alert
  // =============================
  /**
   * Trigger prompt alert, enter text, click OK, and verify the message
   * @param promptText Text to enter in the prompt
   * @returns boolean indicating verification
   */
  async handlePromptAlertOk(promptText: string): Promise<boolean> {
    await this.page.locator('//a[text()="SwitchTo"]').click();
    await this.page.locator('//a[text()="Alerts"]').click();
    await this.page.locator('//a[text()="Alert with Textbox "]').click();

    this.page.once('dialog', async dialog => {
      await dialog.accept(promptText);
    });

    await this.page.locator('//button[text()="click the button to demonstrate the prompt box "]').click();

    const message = this.page.locator(`//p[text()="Hello ${promptText} How are you today"]`);
    return await message.isVisible();
  }

  /**
   * Trigger prompt alert and click Cancel, verify no message is displayed
   * @returns boolean indicating verification
   */
  async handlePromptAlertCancel(): Promise<boolean> {
    await this.page.locator('//a[text()="SwitchTo"]').click();
    await this.page.locator('//a[text()="Alerts"]').click();
    await this.page.locator('//a[text()="Alert with Textbox "]').click();

    this.page.once('dialog', async dialog => {
      await dialog.dismiss();
    });

    await this.page.locator('//button[text()="click the button to demonstrate the prompt box "]').click();

    const message = this.page.locator('//p[text()="Hello prompt How are you today"]');
    return !(await message.isVisible());
  }
}
