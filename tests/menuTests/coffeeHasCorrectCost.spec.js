import { test } from '../_fixtures/fixtures';
import { priceFormatStr } from '../../src/common/priceFormatters';
import { COFFEE_PRICES, COFFEE_NAMES } from '../../src/constants';

// Build params from names; keep key for price lookup
const testParameters = Object.entries(COFFEE_NAMES)
  .map(([key, label]) => ({ key, coffeeType: label }));

testParameters.forEach(({ key, coffeeType }) => {
  test(`Check ${coffeeType} cup has correct cost`, async ({ menuPage }) => {
    const expected = priceFormatStr(COFFEE_PRICES[key]);

    await menuPage.open();
    await menuPage.assertCoffeeCupCostHasValue(coffeeType, expected);
  });
});