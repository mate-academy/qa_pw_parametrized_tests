import { test } from '../_fixtures/fixtures';
import { COFFEE_NAMES } from '../../src/constants';

const testParameters = Object.values(COFFEE_NAMES);

testParameters.forEach(coffee => {
  test(`Check ${coffee} removed from Cart after clicking remove`, async ({
    menuPage,
    cartPage,
  }) => {
    await menuPage.open();
    await menuPage.clickCoffeeCup(coffee);

    await menuPage.clickCartLink();
    await cartPage.waitForLoading();

    await cartPage.clickRemoveAllCoffeeButton(coffee);
    await cartPage.assertCoffeeItemIsHidden(coffee);
    await cartPage.assertNoCoffeeMessageIsVisible();
  });
});
