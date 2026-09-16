import { test } from '../_fixtures/fixtures';
import { COFFEE_NAMES } from '../../src/constants';

const testParameters = Object.values(COFFEE_NAMES).map(coffeeName => ({
  coffeeName,
}));

testParameters.forEach(({ coffeeName }) => {
  test.describe(`Check ${coffeeName} removed from Cart after clicking remove`, () => {
    test.beforeEach(async ({ menuPage }) => {
      await menuPage.open();
    });

    test(`Check ${coffeeName} removed from Cart after clicking remove`, async ({
      menuPage,
      cartPage,
    }) => {
      await menuPage.clickCoffeeCup(coffeeName);

      await menuPage.clickCartLink();
      await cartPage.waitForLoading();

      await cartPage.clickRemoveAllCoffeeButton(coffeeName);
      await cartPage.assertNoCoffeeMessageIsVisible();
    });
  });
});
