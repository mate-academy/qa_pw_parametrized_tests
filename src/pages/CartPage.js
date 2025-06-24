const { expect } = require('@playwright/test');

export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartListLocator = page.getByRole('list').nth(1);

    this.espressoItem = this.cartListLocator
      .getByRole('listitem')
      .filter({ hasText: 'Espresso' });
    this.espressoName = this.espressoItem.locator('div').nth(0);
    this.espressoUnit = this.espressoItem.locator('div').nth(1);
    this.espressoTotalCost = this.espressoItem.locator('div').nth(3);

    this.cappuccinoItem = this.cartListLocator
      .getByRole('listitem')
      .filter({ hasText: 'Cappuccino' });
    this.cappuccinoName = this.cappuccinoItem.locator('div').nth(0);
    this.cappuccinoUnit = this.cappuccinoItem.locator('div').nth(1);
    this.cappuccinoTotalCost = this.cappuccinoItem.locator('div').nth(3);

    this.discountedMochaItem = this.cartListLocator
      .getByRole('listitem')
      .filter({ hasText: '(Discounted) Mocha' });
    this.discountedMochaName = this.discountedMochaItem.locator('div').nth(0);
    this.discountedMochaUnit = this.discountedMochaItem.locator('div').nth(1);
    this.discountedMochaTotalCost = this.discountedMochaItem
      .locator('div')
      .nth(3);

    this.americanoItem = this.cartListLocator
      .getByRole('listitem')
      .filter({ hasText: 'Americano' });
    this.americanoTotalCost = this.americanoItem.locator('div').nth(3);
    this.notCoffeeMessage = page.getByText('No coffee, go add some.');
    this.totalCheckout = page.getByTestId('checkout');
  }

  coffeeListItemLocator(name) {
    return this.cartListLocator.getByRole('listitem').filter({ hasText: name });
  }

  coffeeListItemNameCell(name) {
    return this.coffeeListItemLocator(name).locator('div').nth(0);
  }

  coffeeListItemUnitCell(name) {
    return this.coffeeListItemLocator(name).locator('div').nth(1);
  }

  coffeeListItemTotalCostCell(name) {
    return this.coffeeListItemLocator(name).locator('div').nth(3);
  }

  async open() {
    await this.page.goto('/cart');
  }

  async waitForLoading() {
    await this.page.waitForURL('/cart');
  }

  async reload() {
    await this.page.reload();
  }

  async clickRemoveOneCoffeeButton(coffeeName) {
    const button = this.page.getByRole('button', {
      name: `Remove one ${coffeeName}`,
    });
    await button.click();
  }

  async clickRemoveAllCoffeeButton(coffeeName) {
    const button = this.page.getByLabel(`Remove all ${coffeeName}`);
    await button.click();
  }

  async assertCoffeeItemIsHidden(coffeeName) {
    await expect(this.coffeeListItemLocator(coffeeName)).toBeHidden();
  }

  async assertCoffeeItemIsVisible(coffeeName) {
    await expect(this.coffeeListItemLocator(coffeeName)).toBeVisible();
  }

  async assertDiscountedMochaItemIsHidden() {
    await expect(this.discountedMochaItem).toBeHidden();
  }

  async assertDiscountedMochaTotalCostContainsCorrectText(text) {
    await expect(this.discountedMochaTotalCost).toContainText(text);
  }

  async assertNoCoffeeMessageIsVisible() {
    await expect(this.notCoffeeMessage).toBeVisible();
  }

  async assertTotalCheckoutContainsValue(value) {
    await expect(this.totalCheckout).toContainText(value);
  }
}
