const { expect } = require('@playwright/test');

export class MenuPage {
  constructor(page) {
    this.page = page;
    this.cappuccinoCup = page.getByTestId('Cappuccino');
    this.cappuccinoCupCost = page
      .getByRole('listitem')
      .filter({ has: this.cappuccinoCup });
    this.espressoCup = page.getByTestId('Espresso');
    this.espressoCupCost = page
      .getByRole('listitem')
      .filter({ has: this.espressoCup });
    this.americanoCup = page.getByTestId('Americano');
    this.cartLink = page.getByLabel('Cart page');
    this.totalCheckout = page.getByTestId('checkout');
    this.promoMessage = page.getByText(
      "It's your lucky day! Get an extra cup of Mocha for $4.",
    );
    this.yesPromoButton = page.getByRole('button', { name: 'Yes, of course!' });
    this.noPromoButton = page.getByRole('button', { name: "Nah, I'll skip." });
  }

  cupCostLocator(coffeeName) {
    return this.page.locator(
      `//h4[normalize-space(text()) = '${coffeeName}']/small`
    );
  }

  coffeeCupLocator(coffeeName) {
    const testId = coffeeName.replace(' ', '_');
    return this.page.getByTestId(testId);
  }

  async addCoffeeCupToCart(coffeeName) {
    await this.coffeeCupLocator(coffeeName).click();
  }

  async open() {
    await this.page.goto('/');
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

  async assertTotalCheckoutContainsValue(value) {
    await expect(this.totalCheckout).toContainText(value);
  }

  async assertCoffeeCupCostHasValue(coffeeName, coffeePrice) {
    await expect(this.cupCostLocator(coffeeName)).toContainText(coffeePrice);
  }

  async assertPromoMessageIsVisible() {
    await expect(this.promoMessage).toBeVisible();
  }
}
