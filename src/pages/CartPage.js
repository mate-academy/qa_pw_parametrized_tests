const { expect, test } = require('@playwright/test');

export class CartPage {
  constructor(page) {
    this.page = page;

    this.cartListLocator = page.getByRole('list').nth(1);

    this.coffeeItem = (coffeeName) => this.cartListLocator
    .getByRole('listitem').filter({ hasText : coffeeName});

    this.coffeeName = (coffeeName) => this.coffeeItem(coffeeName)
    .locator('div').nth(0);

    this.coffeeUnit = (coffeeName) => this.coffeeItem(coffeeName)
    .locator('div').nth(1);

    this.coffeeTotalCost = (coffeeName) => this.coffeeItem(coffeeName)
    .locator('div').nth(3);

    this.discountedMochaItem = this.cartListLocator
      .getByRole('listitem')
      .filter({ hasText: '(Discounted) Mocha' });

    this.discountedMochaName = this.discountedMochaItem.locator('div').nth(0);
    this.discountedMochaUnit = this.discountedMochaItem.locator('div').nth(1);
    this.discountedMochaTotalCost = this.discountedMochaItem
      .locator('div')
      .nth(3);


    this.removeAllCoffeeButton = (coffeeName) => page
    .getByLabel(`Remove all ${coffeeName}`);

    this.removeOneCoffeeButton = (coffeeName) => page.getByRole('button', {
      name: `Remove one ${coffeeName}`,
    });

    this.addOneCoffeeButton = (coffeeName) => page.getByRole('button', {
      name: `Add one ${coffeeName}`,
    });

    this.notCoffeeMessage = page.getByText('No coffee, go add some.');
    this.totalCheckout = page.getByTestId('checkout');
  }
  
  coffeeListItemLocator(coffeeName) {
    return this.cartListLocator.getByRole('listitem').filter({ hasText: coffeeName });
  }

 coffeeListItemNameCell(coffeeName) {
    return this.coffeeListItemLocator(coffeeName).locator('div').nth(0);
  }

  coffeeListItemUnitCell(coffeeName) {
    return this.coffeeListItemLocator(coffeeName).locator('div').nth(1);
  }

  coffeeListItemTotalCostCell(coffeeName) {
    return this.coffeeListItemLocator(coffeeName).locator('div').nth(3);
  }

  async open() {
    await test.step(`Open 'Cart' page`, async() => {
      await this.page.goto('/cart');
    });
  }

  async waitForLoading() {
    await test.step(`Wait for Loading the cart`, async() => {
      await this.page.waitForURL('/cart');
    });
  }

  async reload() {
    await test.step(`Reload the page`, async() => {
      await this.page.reload();
    });
  }

  async clickRemoveAllCoffeeButton(coffeeName) {
    await test.step(`Click remove all coffee button`, async() => {
      await this.removeAllCoffeeButton(coffeeName).click();
    });
  }

  async clickRemoveOneCoffeeButton(coffeeName) {
    await test.step(`Click remove one coffee button`, async() => {
      await this.removeOneCoffeeButton(coffeeName).click();
    });
  }

  async clickAddOneCoffeeButton(coffeeName) {
    await test.step(`Click add one coffee button`, async() => {
      await this.addOneCoffeeButton(coffeeName).click();
    });
  }

  async assertCoffeeItemIsVisible(coffeeName) {
    await test.step(`Assert that coffee item is visible`, async() => {
      await expect(this.coffeeItem(coffeeName)).toBeVisible();
    });
  }

  async assertCoffeeItemIsHidden(coffeeName) {
    await test.step(`Assert that coffee item is hidden`, async() => {
      await expect(this.coffeeItem(coffeeName)).toBeHidden();
    });
  }

  async assertCoffeeNameContainsCorrectText(coffeeName) {
    await test.step(`Assert that coffee name contains correct text`, async() => {
      await expect(this.coffeeListItemNameCell(coffeeName)).toContainText(coffeeName);
    });
  }

  async assertCoffeeNameIsContainsCorrectText(coffeeName) {
    await test.step(`Assert that coffee name is contains correct text`, async() => {
      await expect(this.coffeeName).toContainText(coffeeName);
    });
  }

  async assertCoffeeUnitContainsCorrectText(coffeeName, text) {
    await test.step(`Assert that coffee unit contains correct text`, async() => {
      await expect(this.coffeeListItemUnitCell(coffeeName)).toContainText(text);
    });
  }

  async assertCoffeeTotalCostContainsCorrectText(coffeeName, text) {
    await test.step(`Assert that coffee total cost contains correct text`, async() => {
      await expect(this.coffeeListItemTotalCostCell(coffeeName)).toContainText(text);
    });
  }

  async assertNoCoffeeMessageIsVisible() {
    await test.step(`Assert that no coffee message is visible`, async() => {
      await expect(this.notCoffeeMessage).toBeVisible();
    });
  }

  async assertTotalCheckoutContainsValue(coffeeName) {
    await test.step(`Assert that total cost contains value`, async() => {
      await expect(this.totalCheckout).toContainText(coffeeName);
    });
  }

  async assertDiscountedMochaTotalCostContainsCorrectText(text) {
    await test.step(`Assert that discounted mocha total cost contains correct text`, async() => {
      await expect(this.discountedMochaTotalCost).toContainText(text);
    });
  }

  async assertDiscountedMochaItemIsHidden() {
    await test.step(`Assert that discounted mocha item is hidden`, async() => {
      await expect(this.discountedMochaItem).toBeHidden();
    });
  }
}
