// src/ui/pages/menu/MenuPage.js
const { expect } = require('@playwright/test');

export class MenuPage {
  constructor(page) {
    this.page = page;
    this.cartLink = page.getByLabel('Cart page');
    this.totalCheckout = page.getByTestId('checkout');

    this.promoMessage = page.getByText(
      "It's your lucky day! Get an extra cup of Mocha for $4."
    );
    this.yesPromoButton = page.getByRole('button', { name: 'Yes, of course!' });
    this.noPromoButton = page.getByRole('button', { name: "Nah, I'll skip." });
  }

  coffeeCupLocator(coffeeName) {
    const firstSpaceToUnderscore = coffeeName.replace(/\s+/, '_');
    return this.page.locator(`[data-test="${firstSpaceToUnderscore}"]`);
  }


  // ---------- Navigation ----------
  async open() {
    await this.page.goto('/');
  }

  // ---------- Actions (generic) ----------
  async clickCoffeeCup(coffeeName) {
    await this.coffeeCupLocator(coffeeName).click();
  }
  async clickCartLink() {
    await this.cartLink.click();
  }
  async clickYesPromoButton() {
    await this.yesPromoButton.click();
  }
  async clickNoPromoButton() {
    await this.noPromoButton.click();
  }

  // ---------- Assertions ----------
  async assertTotalCheckoutContainsValue(value) {
    await expect(this.totalCheckout).toContainText(value);
  }
  async assertCoffeeCupCostHasValue(coffeeName, value) {
    const row = this.page.getByRole('listitem').filter({
      has: this.coffeeCupLocator(coffeeName),
    });
    await expect(row).toContainText(value);
  }
  async assertPromoMessageIsVisible() {
    await expect(this.promoMessage).toBeVisible();
  }
}