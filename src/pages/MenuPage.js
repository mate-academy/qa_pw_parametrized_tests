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

  

  



  coffeeCupLocator(coffeeName) {
    const testId = coffeeName.replaceAll(' ', '_');

    return this.page.getByTestId(testId);
  }

  coffeeHeadLocator(coffeeName) {
    return this.page
      .getByRole('listitem')
      .filter({ has: this.coffeeCupLocator(coffeeName) });
  }

  async assertCoffeePriceHasValue(coffeeName, price) {
    await expect(this.coffeeHeadLocator(coffeeName)).toContainText(price);
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
