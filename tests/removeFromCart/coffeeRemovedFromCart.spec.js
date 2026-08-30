import { test } from '../_fixtures/fixtures';
import { COFFEE_NAMES } from '../../src/constants';

let testParameters = [];

for (const [key, value] of Object.entries(COFFEE_NAMES)) {
  testParameters.push({ coffeeName: value });
}

testParameters.forEach(({ coffeeName }) => {
test(`Check ${coffeeName} removed from Cart after clicking remove`, async ({
  cartPage,
  menuPage,
}) => {
  await menuPage.open();
  await menuPage.clickCoffeeCup(coffeeName);

  await menuPage.clickCartLink();
  await cartPage.waitForLoading();

  await cartPage.clickRemoveAllButton(coffeeName);
  await cartPage.assertNoCoffeeMessageIsVisible();
});

});
