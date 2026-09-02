import { test } from '../_fixtures/fixtures';
import { totalPriceFormatStr } from '../../src/common/priceFormatters';
import { COFFEE_NAMES, COFFEE_PRICES } from '../../src/constants';

let testParameters = [];

for (const [key, value] of Object.entries(COFFEE_NAMES)) {
  testParameters.push({
    coffeeType: value,
    coffeePrice: COFFEE_PRICES[key],
  });
}

testParameters.forEach(({ coffeeType, coffeePrice }) => {
  test(`Check ${coffeeType} cost is added to Total on menu page`, async ({
    menuPage,
  }) => {
    const totalPriceStr = totalPriceFormatStr(coffeePrice);

    await menuPage.open();
    await menuPage.clickCoffeeCup(coffeeType);

    await menuPage.assertTotalCheckoutContainsValue(totalPriceStr);
  });
});
