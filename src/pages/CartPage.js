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

  removeAllCoffeeButton(name) {
    return this.page.getByLabel(`Remove all ${name}`);
  }

  removeOneCoffeeButton(name) {
    return this.page.getByRole('button', { name: `Remove one ${name}` });
  }

  addOneCoffeeButton(name) {
    return this.page.getByRole('button', { name: `Add one ${name}` });
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

  async clickRemoveAllCoffeeButton(name) {
    await this.removeAllCoffeeButton(name).click();
  }

  async clickRemoveOneCoffeeButton(name) {
    await this.removeOneCoffeeButton(name).click();
  }

  async clickAddOneCoffeeButton(name) {
    await this.addOneCoffeeButton(name).click();
  }

  async assertItemIsVisible(name) {
    await expect(this.coffeeListItemLocator(name)).toBeVisible();
  }

  async assertItemIsHidden(name) {
    await expect(this.coffeeListItemLocator(name)).toBeHidden();
  }

  async assertCoffeeNameContainsCorrectText(name) {
    await expect(this.coffeeListItemNameCell(name)).toContainText(name);
  }

  async assertCoffeeUnitContainsCorrectText(name, text) {
    await expect(this.coffeeListItemUnitCell(name)).toContainText(text);
  }

  async assertCoffeeTotalCostContainsCorrectText(name, text) {
    await expect(this.coffeeListItemTotalCostCell(name)).toContainText(text);
  }

  async assertNoCoffeeMessageIsVisible() {
    await expect(this.notCoffeeMessage).toBeVisible();
  }

  async assertTotalCheckoutContainsValue(value) {
    await expect(this.totalCheckout).toContainText(value);
  }
}
