const { expect } = require('@playwright/test');

export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartListLocator = page.getByRole('list').nth(1);
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

  // ✅ NEW generic clickers
  async clickRemoveAllCoffeeButton(coffeeName) {
    const button = this.page.getByRole('button', {
      name: new RegExp(`Remove all ${coffeeName}`, 'i'),
    });
    await button.click();
  }

  async clickRemoveOneCoffeeButton(coffeeName) {
    const button = this.page.getByRole('button', {
      name: new RegExp(`Remove one ${coffeeName}`, 'i'),
    });
    await button.click();
  }

  async clickAddOneCoffeeButton(coffeeName) {
    const button = this.page.getByRole('button', {
      name: new RegExp(`Add one ${coffeeName}`, 'i'),
    });
    await button.click();
  }

  // ✅ Assertions
  async assertCoffeeItemIsVisible(coffeeName) {
    await expect(this.coffeeListItemLocator(coffeeName)).toBeVisible();
  }

  async assertCoffeeItemIsHidden(coffeeName) {
    await expect(this.coffeeListItemLocator(coffeeName)).toBeHidden();
  }

  async assertCoffeeNameContainsCorrectText(coffeeName) {
    await expect(this.coffeeListItemNameCell(coffeeName)).toContainText(coffeeName);
  }

  async assertCoffeeUnitContainsCorrectText(coffeeName, expectedText) {
    await expect(this.coffeeListItemUnitCell(coffeeName)).toContainText(expectedText);
  }

  async assertCoffeeTotalCostContainsCorrectText(coffeeName, expectedText) {
    await expect(this.coffeeListItemTotalCostCell(coffeeName)).toContainText(expectedText);
  }

  async assertNoCoffeeMessageIsVisible() {
    await expect(this.notCoffeeMessage).toBeVisible();
  }

  async assertTotalCheckoutContainsValue(value) {
    await expect(this.totalCheckout).toContainText(value);
  }
}
