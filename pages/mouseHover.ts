import { expect, Locator, Page } from '@playwright/test';
import BasePage from './basepage';

export default class MouseHoverPage extends BasePage {
  readonly sectionHeader: Locator;
  readonly poster: Locator;
  readonly movieTitle: Locator;
  readonly currentPrice: Locator;
  readonly oldPrice: Locator;
  readonly buyButton: Locator;

  readonly expectedTitle = 'Spider-Man: No Way Home';
  readonly expectedCurrentPrice = '$24.96';
  readonly expectedOldPrice = '$38.99';

  constructor(page: Page) {
    super(page);
    this.sectionHeader = page.locator('//h3[text()="Mouse Hover"]');
    this.poster = page.locator('//img[@class="poster"]');
    this.movieTitle = page.locator('.title-content h4.movie-title');
    this.currentPrice = page.locator('.title-content .current-price');
    this.oldPrice = page.locator('.title-content .old-price');
    this.buyButton = page.locator('.title-content .buy-btn');
  }

  async openMouseHoverSection() {
    await this.sectionHeader.click();
  }

  async hoverOverMovie() {
    await this.poster.hover();
  }

  async getMovieDetails() {
    const title = await this.movieTitle.textContent();
    const current = await this.currentPrice.textContent();
    const old = await this.oldPrice.textContent();
    const buyVisible = await this.buyButton.isVisible();
    return { title, current, old, buyVisible };
  }
}
