// import { test, expect, Page } from '@playwright/test';
// import BasePage from '../pages/basepage';
// import DemoAlertPage from '../pages/demoAlert';
// import DragDropPage from '../pages/dragDropPage';
// import FileUploadPage from '../pages/fileUploadAndDownloadPage';
// import fs from 'fs';

// test.describe('Web Component Functionality Tests in Automation Demo Site Application', () => {
//   let basePage: BasePage;
//   let demoAlertPage: DemoAlertPage;
//   let dragDropPage: DragDropPage;
//   let fileUploadPage: FileUploadPage;

//   test.beforeEach(async ({ page }) => {
//     // Initialize page objects
//     basePage = new BasePage(page);
//     demoAlertPage = new DemoAlertPage(page);
//     dragDropPage = new DragDropPage(page);
//     fileUploadPage = new FileUploadPage(page);

//     // Navigate to the app before each test
//     await basePage.navigateToSecondaryApp();
//   });

//   // =============================
//   // Alert Tests
//   // =============================
//   test.describe('Alert Functionality', () => {
//     test('TC01: Simple Alert - Verify alert can be accepted', async ({ page }) => {
//       await demoAlertPage.handleAlertFlow();
//       const alertHandled = true;
//       await expect(alertHandled).toBeTruthy();
//     });

//     test('TC02: Confirm Alert - Click OK and verify confirmation', async ({ page }) => {
//       await demoAlertPage.handleConfirmAlertOk();
//       const confirmOkHandled = true;
//       await expect(confirmOkHandled).toBeTruthy();
//     });

//     test('TC03: Confirm Alert - Click Cancel and verify cancellation', async ({ page }) => {
//       await demoAlertPage.handleConfirmAlertCancel();
//       const confirmCancelHandled = true;
//       await expect(confirmCancelHandled).toBeTruthy();
//     });

//     test('TC04: Prompt Alert - Enter text and click OK, verify message', async ({ page }) => {
//       const inputText = 'Hello!';
//       await demoAlertPage.handlePromptAlertOk(inputText);
//       const messageVisible = await page
//         .locator(`//p[text()="Hello ${inputText} How are you today"]`)
//         .isVisible();
//       await expect(messageVisible).toBeTruthy();
//     });

//     test('TC05: Prompt Alert - Click Cancel and verify message is not displayed', async ({ page }) => {
//       await demoAlertPage.handlePromptAlertCancel();
//       const messageVisible = await page
//         .locator('//p[text()="Hello prompt How are you today"]')
//         .isVisible();
//       await expect(messageVisible).toBeFalsy();
//     });
//   });

//   // =============================
//   // File Upload / Download Tests
//   // =============================
//   test.describe('File Upload and Download', () => {
//     test('TC06: File Upload - Upload a file and verify success', async ({ page }) => {
//       await fileUploadPage.uploadFile();
//       const uploadVisible = await page.locator('//span[text()="Upload"]').isVisible();
//       await expect(uploadVisible).toBeTruthy();
//     });

//     test('TC07: File Download - Generate TXT file, download, and verify content', async ({ page }) => {
//       const filePage = new FileUploadPage(page);
//       const textToVerify = 'Hello Playwright!';
//       const downloadedFilePath = await filePage.generateDownloadFile(textToVerify);
//       const fileContent = fs.readFileSync(downloadedFilePath, 'utf-8').trim();
//       expect(fileContent).toBe(textToVerify);
//     });
//   });

//   // =============================
//   // Drag and Drop Tests
//   // =============================
//   test.describe('Drag and Drop Functionality', () => {
//     test('TC08: Static Drag and Drop - Drag Angular image to drop area and verify', async ({ page }) => {
//       await dragDropPage.performStaticDragAndDrop();
//       const angularVisible = await page
//         .locator('//div[@id="droparea"]//img[@id="angular"]')
//         .isVisible();
//       await expect(angularVisible).toBeTruthy();
//     });

//     test('TC09: Dynamic Drag and Drop - Drag Angular image to dynamic drop area and verify', async ({ page }) => {
//       await dragDropPage.performDynamicDragAndDrop();
//       const angularVisible = await page
//         .locator('//div[@id="droparea"]//img[@id="angular"]')
//         .isVisible();
//       await expect(angularVisible).toBeTruthy();
//     });
//   });
// });
import { test, expect, Page } from '@playwright/test';
import BasePage from '../pages/basepage';
import DemoAlertPage from '../pages/demoAlert';
import DragDropPage from '../pages/dragDropPage';
import FileUploadPage from '../pages/fileUploadAndDownloadPage';
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

  // =============================
  // Alert Tests
  // =============================
  test.describe('Alert Functionality', () => {
    test('TC01: Simple Alert - Verify alert can be accepted', async () => {
      await demoAlertPage.handleAlertFlow();
      await expect(true).toBeTruthy();
    });

    test('TC02: Confirm Alert - Click OK and verify confirmation', async () => {
      await demoAlertPage.handleConfirmAlertOk();
      await expect(true).toBeTruthy();
    });

    test('TC03: Confirm Alert - Click Cancel and verify cancellation', async () => {
      await demoAlertPage.handleConfirmAlertCancel();
      await expect(true).toBeTruthy();
    });

    test('TC04: Prompt Alert - Enter text and click OK, verify message', async ({ page }) => {
      const inputText = 'Hello!';
      await demoAlertPage.handlePromptAlertOk(inputText);
      const messageVisible = await page
        .locator(`//p[text()="Hello ${inputText} How are you today"]`)
        .isVisible();
      await expect(messageVisible).toBeTruthy();
    });

    test('TC05: Prompt Alert - Click Cancel and verify message is not displayed', async ({ page }) => {
      await demoAlertPage.handlePromptAlertCancel();
      const messageVisible = await page
        .locator('//p[text()="Hello prompt How are you today"]')
        .isVisible();
      await expect(messageVisible).toBeFalsy();
    });
  });

  // =============================
  // File Upload / Download Tests
  // =============================
  test.describe('File Upload and Download', () => {
    test('TC06: File Upload - Upload a file and verify success', async ({ page }) => {
      await fileUploadPage.uploadFile();
      const uploadVisible = await page.locator('//span[text()="Upload"]').isVisible();
      await expect(uploadVisible).toBeTruthy();
    });

    test('TC07: File Download - Generate TXT file, download, and verify content', async ({ page }) => {
      const filePage = new FileUploadPage(page);
      const textToVerify = 'Hello Playwright!';
      const downloadedFilePath = await filePage.generateDownloadFile(textToVerify);
      const fileContent = fs.readFileSync(downloadedFilePath, 'utf-8').trim();
      expect(fileContent).toBe(textToVerify);
    });
  });

  // =============================
  // Drag and Drop Tests
  // =============================
  test.describe('Drag and Drop Functionality', () => {

    const images = ['angular', 'mongo', 'node'];

    test('TC08: Static Drag and Drop - Drag all images to drop area and verify', async ({ page }) => {
      await dragDropPage.performStaticDragAndDropForImages(images);
      for (const img of images) {
        const visible = await page.locator(`//div[@id="droparea"]//img[@id="${img}"]`).isVisible();
        await expect(visible).toBeTruthy();
      }
    });

    test('TC09: Dynamic Drag and Drop - Drag all images to dynamic drop area and verify', async ({ page }) => {
      await dragDropPage.performDynamicDragAndDropForImages(images);
      for (const img of images) {
        const visible = await page.locator(`//div[@id="droparea"]//img[@id="${img}"]`).isVisible();
        await expect(visible).toBeTruthy();
      }
    });

  });

});

