import { test } from '../_fixtures/fixtures';
import { COFFEE_PRICES, COFFEE_NAMES } from '../../src/constants';

const coffeTestData = Object.keys(COFFEE_NAMES).map((key) => ({
  coffeeName: COFFEE_NAMES[key],
  coffeePrice: COFFEE_PRICES[key],
}));

coffeTestData.forEach(({coffeeName}) => {
  test(`Check '${coffeeName}' removed from Cart after clicking remove`, async ({
    cartPage,
    menuPage,
  }) => {
    await menuPage.open();
    await menuPage.clickCoffeeCup(coffeeName);

    await menuPage.clickCartLink();
    await cartPage.waitForLoading();

    await cartPage.clickRemoveAllCoffeNameButton(coffeeName);
    await cartPage.assertNoCoffeeMessageIsVisible();
  });
});
