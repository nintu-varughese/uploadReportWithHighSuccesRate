import { test, expect, Page } from '@playwright/test';
import BasePage from '../pages/basepage';
import DemoAlertPage from '../pages/demoAlert';
import DragDropPage from '../pages/dragDropPage';
import FileUploadPage from '../pages/fileUpload';
import { FileDownloadPage } from '../pages/fileDownload';
import fs from 'fs';

test.describe('Web Component Functionality Tests in Automation Demo Site Application', () => {
  let basePage: BasePage;
  let demoAlertPage: DemoAlertPage;
  let dragDropPage: DragDropPage;
  let fileUploadPage: FileUploadPage;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
    demoAlertPage = new DemoAlertPage(page);
    dragDropPage = new DragDropPage(page);
    fileUploadPage = new FileUploadPage(page);

    await basePage.navigateToSecondaryApp();
  });

  test.describe('Alert Functionality', () => {
    test('TC01: Simple Alert - Verify alert can be accepted', async () => {
      const handled = await demoAlertPage.handleAlertFlow();
      await expect(handled, 'Simple alert was not handled correctly').toBeTruthy();
    });

    test('TC02: Confirm Alert - Click OK and verify confirmation', async () => {
      const handled = await demoAlertPage.handleConfirmAlertOk();
      await expect(handled, 'Confirm alert OK was not handled correctly').toBeTruthy();
    });

    test('TC03: Confirm Alert - Click Cancel and verify cancellation', async () => {
      const handled = await demoAlertPage.handleConfirmAlertCancel();
      await expect(handled, 'Confirm alert Cancel was not handled correctly').toBeTruthy();
    });

    test('TC04: Prompt Alert - Enter text and click OK, verify message', async () => {
      const inputText = 'Hello!';
      const isVisible = await demoAlertPage.handlePromptAlertOk(inputText);
      await expect(
        isVisible,
        `Prompt alert message for input "${inputText}" is not visible`
      ).toBeTruthy();
    });

    test('TC05: Prompt Alert - Click Cancel and verify message is not displayed', async () => {
      const isNotVisible = await demoAlertPage.handlePromptAlertCancel();
      await expect(isNotVisible, 'Prompt alert message should not be visible after Cancel').toBeTruthy();
    });
  });

  test.describe('File Upload and Download', () => {
    test('TC06: File Upload - Upload a file and verify success', async ({ page }) => {
      const fileUploadPage = new FileUploadPage(page);
      const uploadLocator = await fileUploadPage.uploadFile();
      const isVisible = await uploadLocator.isVisible();
      await expect(
        isVisible,
        'File upload success message was not visible after uploading the file'
      ).toBeTruthy();
    });

    test('TC07: File Download - Generate TXT file, download, verify content, and clean up', async ({ page }) => {
      const fileDownloadPage = new FileDownloadPage(page);
      await fileDownloadPage.navigateToFileDownload();
      const sampleData = "Automation Test Data";
      await fileDownloadPage.enterText(sampleData);
      await fileDownloadPage.clickCreateButton();
      const filePath = await fileDownloadPage.downloadFile();
      expect(fileDownloadPage.fileExists(filePath), `File was not found at path: ${filePath}`).toBeTruthy();
      expect(filePath.endsWith(".txt"), `Downloaded file does not have a .txt extension: ${filePath}`).toBeTruthy();
      const content = fileDownloadPage.readFile(filePath);
      expect(
        content.trim(),
        `File content does not match expected. Expected: "${sampleData}", Actual: "${content.trim()}"`
      ).toBe(sampleData.trim());
    });
  });

  test.describe('Drag and Drop Functionality', () => {
    test('TC08: Static Drag and Drop - Drag all images to drop area and verify', async ({ page }) => {
      const dragDropPage = new DragDropPage(page);
      await dragDropPage.dragAndDropStaticImages();

      for (const img of dragDropPage.droppedStaticImages) {
        const isVisible = await img.isVisible();
        await expect(
          isVisible,
          `Static drag-and-drop failed: Image "${await img.getAttribute('id')}" not visible in drop area`
        ).toBeTruthy();
      }
    });

    test('TC09: Dynamic Drag and Drop - Drag all images to drop area and verify', async ({ page }) => {
      const dragDropPage = new DragDropPage(page);
      await dragDropPage.dragAndDropDynamicImages();

      for (const img of dragDropPage.dynamicDroppedImages) {
        const isVisible = await img.isVisible();
        await expect(
          isVisible,
          `Dynamic drag-and-drop failed: Image "${await img.getAttribute('id')}" not visible in drop area`
        ).toBeTruthy();
      }
    });
  });
});
