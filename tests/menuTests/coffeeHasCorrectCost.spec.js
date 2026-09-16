import { test } from '../_fixtures/fixtures';
import { priceFormatStr } from '../../src/common/priceFormatters';
import { COFFEE_NAMES, COFFEE_PRICES } from '../../src/constants';

const testParameters = Object.entries(COFFEE_NAMES).map(
  ([key, coffeeName]) => ({
    coffeeName,
    cost: COFFEE_PRICES[key],
  }),
);

testParameters.forEach(({ coffeeName, cost }) => {
  test.describe(`Check ${coffeeName} cup has correct cost`, () => {
    test.beforeEach(async ({ menuPage }) => {
      await menuPage.open();
    });

    test(`Check ${coffeeName} cup has correct cost`, async ({ menuPage }) => {
      const price = priceFormatStr(cost);

      await menuPage.assertCoffeeCupCostHasValue(coffeeName, price);
    });
  });
});
