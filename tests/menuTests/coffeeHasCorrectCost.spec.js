import { test } from '../_fixtures/fixtures';

import { priceFormatStr } from '../../src/common/priceFormatters';

import { COFFEE_NAMES, COFFEE_PRICES } from '../../src/constants';

const coffeeTypes = Object.keys(COFFEE_NAMES);

for (const coffeeType of coffeeTypes) {
  test(`Check ${COFFEE_NAMES[coffeeType]} cup has correct cost`, async ({
    menuPage,
  }) => {
    const price = priceFormatStr(COFFEE_PRICES[coffeeType]);

    await menuPage.open();

    await menuPage.assertCoffeeCupCostHasValue(COFFEE_NAMES[coffeeType], price);
  });
}
