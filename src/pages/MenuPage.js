const { expect } = require('@playwright/test');

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

  // Uniwersalny lokator dla dowolnej kawy
  coffeeCupLocator(coffeeName) {
    const testId = coffeeName.replace(' ', '_');
    return this.page.getByTestId(testId);
  }

  // Uniwersalne kliknięcie dla dowolnej kawy
  async clickCoffeeCup(coffeeName) {
    await this.coffeeCupLocator(coffeeName).click();
  }

  // Przejście do koszyka
  async clickCartLink() {
    await this.cartLink.click();
  }

  // Otwarcie strony menu
  async open() {
    await this.page.goto('/');
  }

  // Asserty dla ceny dowolnej kawy
  async assertCoffeeCupCostHasValue(coffeeName, value) {
    const cupCost = this.page
      .getByRole('listitem')
      .filter({ has: this.coffeeCupLocator(coffeeName) });
    await expect(cupCost).toContainText(value);
  }

  // Asserty ogólne
  async assertTotalCheckoutContainsValue(value) {
    await expect(this.totalCheckout).toContainText(value);
  }

  async assertPromoMessageIsVisible() {
    await expect(this.promoMessage).toBeVisible();
  }

  // Promo buttons
  async clickYesPromoButton() {
    await this.yesPromoButton.click();
  }

  async clickNoPromoButton() {
    await this.noPromoButton.click();
  }
}
