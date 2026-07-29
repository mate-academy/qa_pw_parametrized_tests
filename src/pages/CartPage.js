const { expect } = require('@playwright/test');

export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartListLocator = page.getByRole('list').nth(1);

    // this.espressoItem = this.cartListLocator
    //   .getByRole('listitem')
    //   .filter({ hasText: 'Espresso' });
    // this.espressoName = this.espressoItem.locator('div').nth(0);
    // this.espressoUnit = this.espressoItem.locator('div').nth(1);
    // this.espressoTotalCost = this.espressoItem.locator('div').nth(3);

    // this.cappuccinoItem = this.cartListLocator
    //   .getByRole('listitem')
    //   .filter({ hasText: 'Cappuccino' });
    // this.cappuccinoName = this.cappuccinoItem.locator('div').nth(0);
    // this.cappuccinoUnit = this.cappuccinoItem.locator('div').nth(1);
    // this.cappuccinoTotalCost = this.cappuccinoItem.locator('div').nth(3);

    // this.discountedMochaItem = this.cartListLocator
    //   .getByRole('listitem')
    //   .filter({ hasText: '(Discounted) Mocha' });
    // eslint-disable-next-line max-len
    // this.discountedMochaName = this.discountedMochaItem.locator('div').nth(0);
    // eslint-disable-next-line max-len
    // this.discountedMochaUnit = this.discountedMochaItem.locator('div').nth(1);
    // this.discountedMochaTotalCost = this.discountedMochaItem
    //   .locator('div')
    //   .nth(3);

    // this.americanoItem = this.cartListLocator
    //   .getByRole('listitem')
    //   .filter({ hasText: 'Americano' });
    // this.americanoTotalCost = this.americanoItem.locator('div').nth(3);

    // this.removeAllEspressoButton = page.getByLabel('Remove all Espresso');
    // eslint-disable-next-line max-len
    // this.removeAllCappuccinoButton = page.getByLabel('Remove all Cappuccino');

    // this.removeOneEspressoButton = page.getByRole('button', {
    //   name: 'Remove one Espresso',
    // });
    // this.removeOneCappuccinoButton = page.getByRole('button', {
    //   name: 'Remove one Cappuccino',
    // });

    // this.addOneEspressoButton = page.getByRole('button', {
    //   name: 'Add one Espresso',
    // });
    // this.addOneCappuccinoButton = page.getByRole('button', {
    //   name: 'Add one Cappuccino',
    // });

    this.notCoffeeMessage = page.getByText('No coffee, go add some.');
    this.totalCheckout = page.getByTestId('checkout');
  }

  coffeeListItemLocator(name) {
    return this.cartListLocator.getByRole('listitem').filter({ hasText: name });
  }/// - this is clean and this example -----

  coffeeListItemNameCell(name) {
    return this.coffeeListItemLocator(name).locator('div').nth(0);
  }/// - this is clean and this example -----

  coffeeListItemUnitCell(name) {
    return this.coffeeListItemLocator(name).locator('div').nth(1);
  }/// - this is clean and this example -----

  coffeeListItemTotalCostCell(name) {
    return this.coffeeListItemLocator(name).locator('div').nth(3);
  }/// - this is clean and this example -----

  async open() {
    await this.page.goto('/cart');
  }

  async waitForLoading() {
    await this.page.waitForURL('/cart');
  }

  async reload() {
    await this.page.reload();
  }

    async addOneCoffeButtonLocator (coffeName) {
      return this.page.getByRole('button', {name : `Add one ${coffeName}`});
    }

    async addOneCoffeButtonLocatorClick (coffeName) {
      await this.addOneCoffeButtonLocator(coffeName).click();
    }

    async removeOneCoffeButtonLocator (coffeName) {
      return this.page.getByRole('button', {name : `Remove one ${coffeName}`});
    }

    async removeOneCoffeeButtonClick (coffeName) {
      await this.removeOneCoffeButtonLocator(coffeName).click();
    }

    async removeAllCoffeButtonLocator (coffeName) {
      return this.page.getByRole('button', {name : `Remove all ${coffeName}`});
    }

    async clickRemoveAllCoffeeButton (coffeName) {
      await this.removeAllCoffeButtonLocator(coffeName).click();
    }

  // async clickRemoveAllEspressoButton() {
  //   await this.removeAllEspressoButton.click();
  // }

  // async clickRemoveAllCappucinoButton() {
  //   await this.removeAllCappuccinoButton.click();
  // }

  // async clickRemoveOneEspressoButton() {
  //   await this.removeOneEspressoButton.click();
  // }

  // async clickRemoveOneCappuccinoButton() {
  //   await this.removeOneCappuccinoButton.click();
  // }

  // async clickAddOneEspressoButton() {
  //   await this.addOneEspressoButton.click();
  // }

  // async clickAddOneCappuccinoButton() {
  //   await this.addOneCappuccinoButton.click();
  // }

  // async assertEspressoItemIsVisible() {
  //   await expect(this.espressoItem).toBeVisible();
  // }

  // async assertEspressoItemIsHidden() {
  //   await expect(this.espressoItem).toBeHidden();
  // }

  async assertCoffeeNameContainsCorrectText(name) {
    await expect(this.coffeeListItemNameCell(name)).toContainText(name);
  }

  // async assertEspressoNameIsContainsCorrectText() {
  //   await expect(this.espressoName).toContainText('Espresso');
  // }

  async assertCoffeeUnitContainsCorrectText(name, text) {
    await expect(this.coffeeListItemUnitCell(name)).toContainText(text);
  }

  // async assertEspressoUnitContainsCorrectText(text) {
  //   await expect(this.espressoUnit).toContainText(text);
  // }

  async assertCoffeeTotalCostContainsCorrectText(name, text) {
    await expect(this.coffeeListItemTotalCostCell(name)).toContainText(text);
  }

  // async assertEspressoTotalCostContainsCorrectText(text) {
  //   await expect(this.espressoTotalCost).toContainText(text);
  // }

  // async assertCappuccinoItemIsVisible() {
  //   await expect(this.cappuccinoItem).toBeVisible();
  // }

  // async assertCappuccinoItemIsHidden() {
  //   await expect(this.cappuccinoItem).toBeHidden();
  // }

  // async assertCappuccinoNameIsContainsCorrectText() {
  //   await expect(this.cappuccinoName).toContainText('Cappuccino');
  // }

  // async assertCappuccinoUnitContainsCorrectText(text) {
  //   await expect(this.cappuccinoUnit).toContainText(text);
  // }

  // async assertCappuccinoTotalCostContainsCorrectText(text) {
  //   await expect(this.cappuccinoTotalCost).toContainText(text);
  // }

  // async assertDiscountedMochaItemIsHidden() {
  //   await expect(this.discountedMochaItem).toBeHidden();
  // }

  // async assertDiscountedMochaTotalCostContainsCorrectText(text) {
  //   await expect(this.discountedMochaTotalCost).toContainText(text);
  // }

  // async assertAmericanoItemIsVisible() {
  //   await expect(this.americanoItem).toBeVisible();
  // }

  // async assertAmericanoTotalCostContainsCorrectText(text) {
  //   await expect(this.americanoTotalCost).toContainText(text);
  // }

  async assertCoffeIsVisiable (name) {
    await expect(this.coffeeListItemNameCell(name)).toBeVisible();
  }

  async assertCoffeIsHidden (name) {
    await expect(this.coffeeListItemNameCell(name)).toBeHidden();
  }

  async assertNoCoffeeMessageIsVisible() {
    await expect(this.notCoffeeMessage).toBeVisible();
  }

  async assertTotalCheckoutContainsValue(value) {
    await expect(this.totalCheckout).toContainText(value);
  }
}
