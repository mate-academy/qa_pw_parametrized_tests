import { test } from '../_fixtures/fixtures';
import { MENU_COFFEE_NAMES } from '../../src/constants';

const testParameters = [];

for (const coffee of Object.values(MENU_COFFEE_NAMES)) {
  testParameters.push({ coffee });
}

testParameters.forEach(({ coffee }) => {
  test(`Check ${coffee} removed from Cart after clicking remove`, async ({
    menuPage,
    cartPage,
  }) => {
    await menuPage.open();
    await menuPage.clickCoffeeCup(coffee);
    await menuPage.clickCartLink();

    await cartPage.waitForLoading();
    await cartPage.clickRemoveAllCoffeeButton(coffee);
    await cartPage.assertNoCoffeeMessageIsVisible();
  });
});
