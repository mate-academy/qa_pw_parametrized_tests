import { test } from '../_fixtures/fixtures';
import { priceFormatStr } from '../../src/common/priceFormatters';
import { COFFEE_NAMES, COFFEE_PRICES } from '../../src/constants';

let testParameters = [];

for (const [key, name] of Object.entries(COFFEE_NAMES)) {
  testParameters.push({ coffeeKey: key, coffeeName: name, price: COFFEE_PRICES[key] });
}

testParameters.forEach(({ coffeeName, price }) => {
  test(`Check ${coffeeName} cup has correct cost`, async ({ menuPage }) => {
    const priceStr = priceFormatStr(price);

    await menuPage.open();
    await menuPage.assertCoffeeCupCostHasValue(coffeeName, priceStr);
  });
});
