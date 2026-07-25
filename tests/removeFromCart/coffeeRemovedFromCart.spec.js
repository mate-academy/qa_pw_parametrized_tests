import { test } from '../_fixtures/fixtures';
import { COFFEE_MENU } from '../../src/constants';

for (const coffee of COFFEE_MENU) {
  test(`Check ${coffee.name} removed from Cart after clicking remove`, async ({
    cartPage,
    menuPage,
  }) => {
    await menuPage.open();
    await menuPage.clickCoffeeCup(coffee.name);

    await menuPage.clickCartLink();
    await cartPage.waitForLoading();

    await cartPage.clickRemoveAllCoffeButton(coffee.name);
    await cartPage.assertNoCoffeeMessageIsVisible();
  });
}
