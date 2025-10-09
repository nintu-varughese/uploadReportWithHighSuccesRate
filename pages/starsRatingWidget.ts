// import { expect, Page } from '@playwright/test';
// import BasePage from './basepage';

// export default class StarsRatingPage extends BasePage {
//   // Locators
//   private readonly starsHeading = '//h3[text()="Stars Rating Widget"]';
//   private readonly stars = [
//     '//label[@for="star-1"]',
//     '//label[@for="star-2"]',
//     '//label[@for="star-3"]',
//     '//label[@for="star-4"]',
//     '//label[@for="star-5"]',
//   ];
//   private readonly emojis = [
//     '//img[@src="emojis/emoji-1.png"]',
//     '//img[@src="emojis/emoji-2.png"]',
//     '//img[@src="emojis/emoji-3.png"]',
//     '//img[@src="emojis/emoji-4.png"]',
//     '//img[@src="emojis/emoji-5.png"]',
//   ];

//   constructor(page: Page) {
//     super(page);
//   }

//   // Navigate to the Stars Rating Widget section
//   async openStarsRatingWidget() {
//     await this.page.locator(this.starsHeading).click();
//   }

//   // Click each star and assert the corresponding emoji is visible
//   async rateStarsAndVerifyEmojis() {
//     for (let i = 0; i < this.stars.length; i++) {
//       await this.page.locator(this.stars[i]).click();
//       await expect(this.page.locator(this.emojis[i])).toBeVisible();
//     }
//   }
// }

import { Locator, Page } from '@playwright/test';
import BasePage from './basepage';

export default class StarsRatingPage extends BasePage {
  private readonly starsHeading = '//h3[text()="Stars Rating Widget"]';
  private readonly stars = [
    '//label[@for="star-1"]',
    '//label[@for="star-2"]',
    '//label[@for="star-3"]',
    '//label[@for="star-4"]',
    '//label[@for="star-5"]',
  ];
  private readonly emojis = [
    '//img[@src="emojis/emoji-1.png"]',
    '//img[@src="emojis/emoji-2.png"]',
    '//img[@src="emojis/emoji-3.png"]',
    '//img[@src="emojis/emoji-4.png"]',
    '//img[@src="emojis/emoji-5.png"]',
  ];

  constructor(page: Page) {
    super(page);
  }

  /** Open Stars Rating Widget section */
  async openStarsRatingWidget() {
    await this.page.locator(this.starsHeading).click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Rate a specific star and return locator for corresponding emoji
   * @param starIndex index from 0 to 4
   */
  async rateStarAndGetEmojiLocator(starIndex: number): Promise<Locator> {
    await this.page.locator(this.stars[starIndex]).click();
    return this.page.locator(this.emojis[starIndex]);
  }
}
