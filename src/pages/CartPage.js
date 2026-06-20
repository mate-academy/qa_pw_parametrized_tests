const { expect } = require('@playwright/test');

export class CartPage {
    constructor(page) {
        this.page = page;
        this.cartListLocator = page.getByRole('list').nth(1);
        this.notCoffeeMessage = page.getByText('No coffee, go add some.');
        this.totalCheckout = page.getByTestId('checkout');
    }

    coffeeListItemLocator(name) {
        return this.cartListLocator
            .getByRole('listitem')
            .filter({ hasText: name });
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

    coffeeRemoveAllButtonLocator(coffeeName) {
        return this.page.getByLabel(`Remove all ${coffeeName}`);
    }

    coffeeRemoveOneButtonLocator(coffeeName) {
        return this.page.getByRole('button', {
            name: `Remove one ${coffeeName}`,
        });
    }

    coffeeAddOneButtonLocator(coffeeName) {
        return this.page.getByRole('button', { name: `Add one ${coffeeName}` });
    }

    async clickRemoveAllCoffeeButton(coffeeName) {
        await this.coffeeRemoveAllButtonLocator(coffeeName).click();
    }

    async clickRemoveOneCoffeeButton(coffeeName) {
        await this.coffeeRemoveOneButtonLocator(coffeeName).click();
    }

    async clickAddOneCoffeeButton(coffeeName) {
        await this.coffeeAddOneButtonLocator(coffeeName).click();
    }

    async assertCoffeeItemIsVisible(coffeeName) {
        await expect(this.coffeeListItemLocator(coffeeName)).toBeVisible();
    }

    async assertCoffeeItemIsHidden(coffeeName) {
        await expect(this.coffeeListItemLocator(coffeeName)).toBeHidden();
    }

    async assertCoffeeNameContainsCorrectText(coffeeName, text = coffeeName) {
        await expect(this.coffeeListItemNameCell(coffeeName)).toContainText(text);
    }


    async assertCoffeeUnitContainsCorrectText(coffeeName, text) {
        await expect(this.coffeeListItemUnitCell(coffeeName)).toContainText(text);
    }

    async assertCoffeeTotalCostContainsCorrectText(coffeeName, text) {
        await expect(this.coffeeListItemTotalCostCell(coffeeName)).toContainText(text);
    }

    async assertNoCoffeeMessageIsVisible() {
        await expect(this.notCoffeeMessage).toBeVisible();
    }

    async assertTotalCheckoutContainsValue(value) {
        await expect(this.totalCheckout).toContainText(value);
    }
}
