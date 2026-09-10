import { test } from '../_fixtures/fixtures';
import { priceFormatStr } from '../../src/common/priceFormatters';
import { COFFEE_NAMES, COFFEE_PRICES } from '../../src/constants';

let testParameters = [];

for (const [key, value] of Object.entries(COFFEE_NAMES)) {
  testParameters.push({ name: value, price: COFFEE_PRICES[key] });
}

testParameters.forEach(({ name, price }) => {
  test(`Check ${name} cup has correct cost`, async ({ menuPage }) => {
    const priceFormat = priceFormatStr(price);

    await menuPage.open();
    await menuPage.assertCoffeeCupCostHasValue(name, priceFormat);
  });
});
