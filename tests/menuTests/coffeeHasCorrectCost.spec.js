import { test } from '../_fixtures/fixtures';
import { priceFormatStr } from '../../src/common/priceFormatters';
import { COFFEE_NAMES, COFFEE_PRICES } from '../../src/constants';

const testParameters = Object.entries(COFFEE_NAMES).map(
  ([key, coffeeName]) => ({
    coffeeName,
    price: COFFEE_PRICES[key],
  }),
);

testParameters.forEach(({ coffeeName, price }) => {
  test(`Check ${coffeeName} cost is correct on menu page`, async ({
    menuPage,
  }) => {
    const priceStr = priceFormatStr(price);

    await menuPage.open();

    await menuPage.assertCoffeeCupCostHasValue(coffeeName, priceStr);
  });
});
