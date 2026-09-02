import { test } from '../_fixtures/fixtures';
import { priceFormatStr } from '../../src/common/priceFormatters';
import { COFFEE_NAMES, COFFEE_PRICES } from '../../src/constants';

let testParameters = [];

for (const [key, value] of Object.entries(COFFEE_NAMES)) {
  testParameters.push({
    coffeeType: value,
    coffeePrice: COFFEE_PRICES[key],
  });
}

testParameters.forEach(({ coffeeType, coffeePrice }) => {
  test(`Check ${coffeeType} cup has correct cost`, async ({ menuPage }) => {
    const price = priceFormatStr(coffeePrice);

    await menuPage.open();

    await menuPage.assertCoffeCostHasValue(coffeeType, price);
  });
});
