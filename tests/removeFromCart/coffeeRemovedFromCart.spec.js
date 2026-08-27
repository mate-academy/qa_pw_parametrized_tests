import { test } from '../_fixtures/fixtures';
import { COFFEE_NAMES } from '../../src/constants';

const testParameters = Object.values(COFFEE_NAMES);

testParameters.forEach((coffeeName) => {
  test(
    `Check ${coffeeName} is removed from Cart after clicking remove all`, 
    async ({
    cartPage,
    menuPage,
  }) => {
    await menuPage.open();
    await menuPage.clickCoffeeCup(coffeeName);

    await menuPage.clickCartLink();
    await cartPage.waitForLoading();

    await cartPage.clickRemoveAllCoffeeButton(coffeeName);
    await cartPage.assertNoCoffeeMessageIsVisible();
  });
});
