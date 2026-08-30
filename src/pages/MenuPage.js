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
    this.menuListLocator = page.getByRole('list').nth(1);
    
  }

  coffeeListItemLocator(name) {
      // 1. Remove the accidental trailing whitespace
  const cleanName = name.trim();
  // 2. Escape regex characters and 
  // replace any middle space/underscore with a flexible switcher
  // "Espresso Macchiato" becomes /^Espresso[ _]+Macchiato$/
  // "Espresso_Con Panna" becomes /^Espresso[ _]+Con[ _]+Panna$/
  const flexiblePattern = '^' + cleanName.replace(/[ _]+/g, '[ _]+') + '$';
  const testIdRegex = new RegExp(flexiblePattern);
    return this.menuListLocator.getByRole('listitem').filter({
     has: this.page.getByTestId(testIdRegex)
    })
  }

  coffeeListItemUnitCell(name) {
    return this.coffeeListItemLocator(name).locator('h4 small');
  }

  async assertCoffeeUnitContainsCorrectText(name, text) {
    await expect(this.coffeeListItemUnitCell(name)).toContainText(text);
  }

  coffeeCupLocator(coffeeName) {
    const testId = coffeeName.replace(' ', '_');

    return this.page.getByTestId(testId);
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
