// import { expect, Locator, Page } from '@playwright/test';
// import BasePage from './basepage';

// export default class HomePage extends BasePage {
//   readonly page: Page;

//   readonly tagsLink: Locator;
//   readonly tags: Locator;
//   readonly remainingCount: Locator;
//   readonly removeAllButton: Locator;
//   readonly inputField: Locator;

//   constructor(page: Page) {
//     super(page);
//     this.page = page;
//     this.tagsLink = page.locator('//h3[text()="Tags Input Box"]'); // Open Tags Input Box page
//     this.inputField = page.locator('.content >> input'); // Input field to add new tags
//     this.tags = page.locator('.content >> ul >> li'); // All existing tags
//     this.remainingCount = page.locator('.details >> p >> span'); // Remaining slots
//     this.removeAllButton = page.locator('.details >> button'); // "Remove All" button
//   }
//   // Open Tags Input Box page
//   async openTagsInputBoxPage() {
//     await this.tagsLink.click();
//     await this.page.waitForLoadState('domcontentloaded');
//   }
//   // Add a new tag and verify it is visible
//   async addTag(tag: string) {
//     await this.inputField.fill(tag);
//     await this.inputField.press('Enter');
//     await expect(this.tags.locator(`text=${tag}`)).toBeVisible();
//   }

//   // Remove the last tag
//   async removeLastTag() {
//     const count = await this.tags.count();
//     if (count > 0) {
//       await this.tags.nth(count - 1).locator('i').click();
//     }
//   }

//   // Remove a specific tag by its text
//   async removeTag(tagText: string) {
//     const tagItem = this.tags.locator(`text=${tagText}`);
//     const removeBtn = tagItem.locator('i');
//     await removeBtn.click();
//   }

//   // Remove all tags
//   async removeAllTags() {
//     await this.removeAllButton.click();
//   }

//   // Verify number of tags
//   async verifyTagsCount(expectedCount: number) {
//     await expect(this.tags).toHaveCount(expectedCount);
//   }

//   // Verify remaining slots count
//   async verifyRemainingCount(expected: number) {
//     await expect(this.remainingCount).toHaveText(expected.toString());
//   }
// }
import { Locator, Page } from '@playwright/test';
import BasePage from './basepage';

export default class TagsInputBoxPage extends BasePage {
  readonly tagsLink: Locator;
  readonly tags: Locator;
  readonly remainingCount: Locator;
  readonly removeAllButton: Locator;
  readonly inputField: Locator;

  constructor(page: Page) {
    super(page);
    this.tagsLink = page.locator('//h3[text()="Tags Input Box"]'); // Open Tags Input Box page
    this.inputField = page.locator('.content >> input'); // Input field to add new tags
    this.tags = page.locator('.content >> ul >> li'); // All existing tags
    this.remainingCount = page.locator('.details >> p >> span'); // Remaining slots
    this.removeAllButton = page.locator('.details >> button'); // "Remove All" button
  }

  // -------------------------------
  // Basic Actions
  // -------------------------------

  /** Open Tags Input Box page */
  async openTagsInputBoxPage() {
    await this.tagsLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /** Add a single tag */
  async addTag(tag: string) {
    await this.inputField.fill(tag);
    await this.inputField.press('Enter');
  }

  /** Remove a specific tag */
  async removeTag(tagText: string) {
    const tagItem = this.tags.locator(`text=${tagText}`);
    await tagItem.locator('i').click();
  }

  /** Remove all tags */
  async removeAllTags() {
    await this.removeAllButton.click();
  }

  // -------------------------------
  // Combined Helper Methods
  // -------------------------------

  /**
   * Clear all tags and add multiple new tags
   * @param tags Array of tag names to add
   */
  async addTagsAndReset(tags: string[]) {
    await this.openTagsInputBoxPage();
    await this.removeAllTags();
    for (const tag of tags) {
      await this.addTag(tag);
    }
  }

  /**
   * Clear all tags, add initial tags, then remove a specific tag
   * @param initialTags Array of tags to add first
   * @param removeTagName Tag to remove
   */
  async removeTagAfterAdding(initialTags: string[], removeTagName: string) {
    await this.openTagsInputBoxPage();
    await this.removeAllTags();
    for (const tag of initialTags) {
      await this.addTag(tag);
    }
    await this.removeTag(removeTagName);
  }

  /**
   * Clear all tags and add a single tag
   * @param tag Tag to add
   */
  async resetAndAddSingleTag(tag: string) {
    await this.openTagsInputBoxPage();
    await this.removeAllTags();
    await this.addTag(tag);
  }
}
