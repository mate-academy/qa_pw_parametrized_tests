import { test } from '../_fixtures/fixtures';
import { totalPriceFormatStr } from '../../src/common/priceFormatters';
import { COFFEE_PRICES, COFFEE_NAMES } from '../../src/constants';

let testParameters = [];

for (const [key, value] of Object.entries(COFFEE_NAMES)) {
  testParameters.push({ coffee: value, price: COFFEE_PRICES[key] });
}

testParameters.forEach(({ price, coffee }) => {
  test(`Check ${coffee} cost is added to Total on menu page`, async ({
    menuPage,
  }) => {
  const totalPriceStr = totalPriceFormatStr(price);

  await menuPage.open();
  await menuPage.clickCoffeeCup(coffee);

  await menuPage.assertTotalCheckoutContainsValue(totalPriceStr);
  });
});