const { expect, test } = require('@playwright/test');

export class MenuPage {
  constructor(page) {
    this.page = page;
    this.coffeeCup = (coffeeName) => page.getByLabel(coffeeName, { exact: true });
    this.coffeeCupCost = (coffeeName) => page.getByRole('listitem')
    .filter({ has : this.coffeeCup(coffeeName)});
    this.cartLink = page.getByLabel('Cart page');
    this.totalCheckout = page.getByTestId('checkout');
    this.promoMessage = page.getByText(
      "It's your lucky day! Get an extra cup of Mocha for $4.",
    );
    this.yesPromoButton = page.getByRole('button', { name: 'Yes, of course!' });
    this.noPromoButton = page.getByRole('button', { name: "Nah, I'll skip." });
  }

  async open() {
    await test.step(`Open 'Menu' page`, async() => {
      await this.page.goto('/');
    });
  }

  async clickCartLink() {
    await test.step(`Open Cart`, async() => {
      await this.cartLink.click();
    });
  }

  async clickYesPromoButton() {
    await test.step(`Click 'Yes' to add promo`, async() => {
      await this.yesPromoButton.click();
    });
  }

  async clickNoPromoButton() {
    await test.step(`Click 'No' to add promo`, async() => {
      await this.noPromoButton.click()
    });
  }

  async assertTotalCheckoutContainsValue(value) {
    await test.step(`Assert that 'Total Checkout' has cost`, async() => {
      await expect(this.totalCheckout).toContainText(value);
    });
  }

  async assertCoffeeCupCostHasValue(coffeeName, value) {
    await test.step(`Assert that coffee cup cost has value`, async() => {
      await expect(this.coffeeCupCost(coffeeName)).toContainText(value);
    });
  }

  async assertPromoMessageIsVisible() {
    await test.step(`Assert that promo message is visible`, async() => {
      await expect(this.promoMessage).toBeVisible();
    });
  }

  async clickCup(coffeeName) {
    await test.step( `Click on the coffee cup`, async() => {
      await this.coffeeCup(coffeeName).click();
    });
  }
}

