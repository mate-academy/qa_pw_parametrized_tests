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

  async clickRemoveAllCoffeeButton(coffeeName) {
    const removeAllCoffeeButton = this.page.getByLabel(
      `Remove all ${coffeeName}`,
    );

    await removeAllCoffeeButton.click();
  }

  async clickRemoveOneCoffeeButton(coffeeName) {
  await this.page.getByRole('button', { name: `Remove one ${coffeeName}` }).click();
}

  async clickAddOneCoffeeButton(coffeeName) {
    const addOneCoffeeButton = this.page.getByRole('button', {
    name: `Add one ${coffeeName}`,
  });
  await addOneCoffeeButton.click();
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

  async assertCoffeeItemIsVisible(name) {
    await expect(this.coffeeListItemLocator(name)).toBeVisible();
  }

  async assertCoffeeItemIsHidden(name) {
    await expect(this.coffeeListItemLocator(name)).toBeHidden();
  }

  async assertNoCoffeeMessageIsVisible() {
    await expect(this.notCoffeeMessage).toBeVisible();
  }

  async assertTotalCheckoutContainsValue(value) {
    await expect(this.totalCheckout).toContainText(value);
  }
  
}
