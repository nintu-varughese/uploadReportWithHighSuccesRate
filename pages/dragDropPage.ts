// import { expect, Page } from '@playwright/test';
// import BasePage from './basepage';

// /**
//  * Page Object for handling drag and drop interactions
//  * Supports both static and dynamic drag and drop
//  */
// export default class DragDropPage extends BasePage {

//   // =============================
//   // Static Drag and Drop
//   // =============================
//   /**
//    * Drag Angular image into static drop area and verify
//    * @returns boolean indicating success
//    */
//   async performStaticDragAndDrop(): Promise<boolean> {
//     await this.page.locator('//a[text()="Interactions "]').click();
//     await this.page.locator('//a[text()="Drag and Drop "]').click();
//     await this.page.locator('//a[text()="Static "]').click();

//     const angularImg = this.page.locator('//img[@id="angular"]');
//     const dropArea = this.page.locator('//div[@id="droparea"]');

//     await angularImg.waitFor({ state: 'visible' });
//     await dropArea.waitFor({ state: 'visible' });

//     await angularImg.dragTo(dropArea);

//     return await dropArea.locator('//img[@id="angular"]').isVisible();
//   }

//   // =============================
//   // Dynamic Drag and Drop
//   // =============================
//   /**
//    * Drag Angular image into dynamic drop area and verify
//    * @returns boolean indicating success
//    */
//   async performDynamicDragAndDrop(): Promise<boolean> {
//     await this.page.locator('//a[text()="Interactions "]').click();
//     await this.page.locator('//a[text()="Drag and Drop "]').click();
//     await this.page.locator('//a[text()="Dynamic "]').click();

//     const angularImg = this.page.locator('//img[@id="angular"]');
//     const dynamicDropArea = this.page.locator('//div[@id="droparea"]');

//     await angularImg.waitFor({ state: 'visible' });
//     await dynamicDropArea.waitFor({ state: 'visible' });

//     await angularImg.dragTo(dynamicDropArea);

//     return await dynamicDropArea.locator('//img[@id="angular"]').isVisible();
//   }
// }
import { expect, Page } from '@playwright/test';
import BasePage from './basepage';

export default class DragDropPage extends BasePage {

  // =============================
  // Static Drag and Drop
  // =============================
  async performStaticDragAndDropForImages(images: string[]): Promise<void> {
    await this.page.locator('//a[text()="Interactions "]').click();
    await this.page.locator('//a[text()="Drag and Drop "]').click();
    await this.page.locator('//a[text()="Static "]').click();

    const dropArea = this.page.locator('//div[@id="droparea"]');
    await dropArea.waitFor({ state: 'visible' });

    for (const imgId of images) {
      const img = this.page.locator(`//img[@id="${imgId}"]`);
      await img.waitFor({ state: 'visible' });
      await img.dragTo(dropArea);
    }
  }

  // =============================
  // Dynamic Drag and Drop
  // =============================
  async performDynamicDragAndDropForImages(images: string[]): Promise<void> {
    await this.page.locator('//a[text()="Interactions "]').click();
    await this.page.locator('//a[text()="Drag and Drop "]').click();
    await this.page.locator('//a[text()="Dynamic "]').click();

    const dropArea = this.page.locator('//div[@id="droparea"]');
    await dropArea.waitFor({ state: 'visible' });

    for (const imgId of images) {
      const img = this.page.locator(`//img[@id="${imgId}"]`);
      await img.waitFor({ state: 'visible' });
      await img.dragTo(dropArea);
    }
  }
}
