import { test } from '../_fixtures/fixtures';
import { totalPriceFormatStr } from '../../src/common/priceFormatters';
import { COFFEE_NAMES, COFFEE_PRICES } from '../../src/constants';

const testParameters = Object.entries(COFFEE_NAMES).map(
  ([key, coffeeName]) => ({
    coffeeName,
    cost: COFFEE_PRICES[key],
  }),
);

testParameters.forEach(({ coffeeName, cost }) => {
  test.describe(`Check ${coffeeName} cost is added to Total onMenuPage`, () => {
    test.beforeEach(async ({ menuPage }) => {
      await menuPage.open();
    });

    test(`Check ${coffeeName} cost is added to Total on menu page`, async ({
      menuPage,
    }) => {
      const totalPriceStr = totalPriceFormatStr(cost);

      await menuPage.clickCoffeeCup(coffeeName);

      await menuPage.assertTotalCheckoutContainsValue(totalPriceStr);
    });
  });
});
