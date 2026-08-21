import { test } from '../_fixtures/fixtures';
import { priceFormatStr } from '../../src/common/priceFormatters';
import { COFFEE_NAMES, COFFEE_PRICES } from '../../src/constants';

let testParameters = [];

for (const [key, value] of Object.entries(COFFEE_NAMES)) {
  testParameters.push({ coffee: value, price: COFFEE_PRICES[key] });
}

testParameters.forEach(({ coffee, price }) => {
  test(`${coffee} has correct cost`, async ({
    menuPage
  }) => {
    const coffeeCostStr = priceFormatStr(price);

    await menuPage.open();

    await menuPage.assertCoffeeCupCostHasValue(coffee, coffeeCostStr);
  });
});

/*
test('Check Cappuccino cup has correct cost', async ({ menuPage }) => {
  const price = priceFormatStr(COFFEE_PRICES.cappuccino);

  await menuPage.open();

  await menuPage.assertCappuccinoCupCostHasValue(price);
});
*/