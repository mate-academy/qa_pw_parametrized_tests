import { test } from '../_fixtures/fixtures';
import { COFFEE_NAMES } from '../../src/constants';

let testParameters = [];

for (const [, value] of Object.entries(COFFEE_NAMES)) {
  testParameters.push({ label: value });
}

testParameters.forEach(({label}) =>{
  test.describe('Check coffee removed from cart', () => {
    test(`Check ${label} removed from Cart after clicking remove`, async ({
      cartPage,
      menuPage,
    }) => {
      await menuPage.open();
      await menuPage.clickCoffeeCup(label);

      await menuPage.clickCartLink();
      await cartPage.waitForLoading();

      await cartPage.clickRemoveAllCoffeeItemButton(label);
      await cartPage.assertNoCoffeeMessageIsVisible();
    });
  });
});