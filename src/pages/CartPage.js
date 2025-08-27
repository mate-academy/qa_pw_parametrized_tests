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

  async assertCoffeeItemIsVisible(name) {
    const coffeeItem = this.coffeeListItemLocator(name)

    await expect(coffeeItem).toBeVisible();
  }

  async assertCoffeeItemIsHidden(name) {
    const coffeeItem = this.coffeeListItemLocator(name)

    await expect(coffeeItem).toBeHidden();
  }

  async clickRemoveAllCoffeeButton(name) {
    const coffeeName = this.page.getByLabel(`Remove all ${name}`);

    await coffeeName.click();
  }

  async clickRemoveCoffeeButton(name) {
    const coffeeName = this.page.getByRole('button', {
      name: `Remove one ${name}`,
    });

    await coffeeName.click();
  }

  async clickAddCoffeeButton(name) {
    const coffeeName = this.page.getByRole('button', {
      name: `Add one ${name}`,
    });

    await coffeeName.click();
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
