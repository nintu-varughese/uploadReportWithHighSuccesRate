import { expect, Locator, Page } from '@playwright/test';
import BasePage from './basepage';

export default class BudgetTrackerPage extends BasePage {
  readonly budgetHeader: Locator;
  readonly newEntryButton: Locator;
  readonly amountInput: Locator;
  readonly totalAmount: Locator;
  readonly typeDropdown: Locator;

  constructor(page: Page) {
    super(page);
    this.budgetHeader = page.locator('//h3[text()="Budget Tracker"]');
    this.newEntryButton = page.locator('//button[text()="New Entry"]');
    this.amountInput = page.locator('//input[@type="number"]').first();
    this.totalAmount = page.locator('td.summary span.total');
    this.typeDropdown = page.locator('select.input-type').first();
  }

  async openBudgetTracker() {
    await this.budgetHeader.click();
  }

  async addEntry(amount: number, type: 'income' | 'expense' = 'income') {
    await this.newEntryButton.click();
    await this.typeDropdown.selectOption(type);
    await this.amountInput.fill(amount.toString());
    await this.amountInput.press('Enter');
    await this.page.waitForTimeout(500); // wait for total update
  }

  async getTotal(): Promise<number> {
    const text = await this.totalAmount.textContent();
    return parseFloat(text?.replace('$', '').trim() || '0');
  }
}
