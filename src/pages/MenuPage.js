import { expect } from '@playwright/test';

export class MenuPage {
  constructor(page) {
    this.page = page;

    this.cartLink = page.getByLabel('Cart page');
    this.totalCheckout = page.getByTestId('checkout');

    this.promoMessage = page.getByText(
      "It's your lucky day! Get an extra cup of Mocha for $4.",
    );
    this.yesPromoButton = page.getByRole('button', { name: 'Yes, of course!' });
    this.noPromoButton = page.getByRole('button', { name: "Nah, I'll skip." });
  }

  coffeeTestId(coffeeName) {
    return coffeeName.trim().replace(/\s+/g, '_');
  }

  coffeeCupLocator(coffeeName) {
    return this.page.getByTestId(this.coffeeTestId(coffeeName));
  }

  coffeeItemLocator(coffeeName) {
    return this.page
      .getByRole('listitem')
      .filter({ has: this.coffeeCupLocator(coffeeName) });
  }

  coffeePriceLocator(coffeeName) {
    return this.coffeeItemLocator(coffeeName).locator('h4 small');
  }

  async assertCoffeePriceHasValue(coffeeName, price) {
    const expected = price.startsWith('$') ? price : `$${price}`;
    await expect(this.coffeePriceLocator(coffeeName)).toHaveText(expected);
  }

  async open() {
    await this.page.goto('/');
  }

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

  async assertTotalCheckoutContainsValue(value) {
    await expect(this.totalCheckout).toContainText(value);
  }

  async assertPromoMessageIsVisible() {
    await expect(this.promoMessage).toBeVisible();
  }
}
