import { test } from '../_fixtures/fixtures';
import { COFFEE_PRICES, COFFEE_NAMES } from '../../src/constants';

const coffeeTestData = Object.keys(COFFEE_NAMES).map((key) => ({
  coffeeName: COFFEE_NAMES[key],
  coffeePrice: COFFEE_PRICES[key],
}));

coffeeTestData.forEach(({coffeeName}) => {
  test(`Check '${coffeeName}' removed from Cart after clicking remove`, async ({
    cartPage,
    menuPage,
  }) => {
    await menuPage.open();
    await menuPage.clickCoffeeCup(coffeeName);

    await menuPage.clickCartLink();
    await cartPage.waitForLoading();

    await cartPage.clickRemoveAllCoffeeNameButton(coffeeName);
    await cartPage.assertNoCoffeeMessageIsVisible();
  });
});
