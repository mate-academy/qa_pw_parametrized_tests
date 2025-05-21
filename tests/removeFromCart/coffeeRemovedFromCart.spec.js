import { test } from '../_fixtures/fixtures';

const coffeeTypes = ['Espresso', 'Cappuccino', 'Americano'];

for (const coffee of coffeeTypes) {
  test(`${coffee} is added to total and removed`, async ({
    menuPage,
    cartPage,
  }) => {
    await menuPage.open();
    await menuPage.clickCoffeeCup(coffee);
    await menuPage.clickCartLink();

    await cartPage.waitForLoading();
    await cartPage.assertCoffeeItemIsVisible(coffee);
    await cartPage.clickRemoveAllButton(coffee);
    await cartPage.assertNoCoffeeMessageIsVisible();
  });
}
