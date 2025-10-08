import { test } from '../_fixtures/fixtures';
import { totalPriceFormatStr } from '../../src/common/priceFormatters';
import { COFFEE_NAMES, COFFEE_PRICES } from '../../src/constants';

let testParameters = [];

for (const [key, name] of Object.entries(COFFEE_NAMES)) {
  testParameters.push({ coffeeKey: key, coffeeName: name, price: COFFEE_PRICES[key] });
}

testParameters.forEach(({ coffeeKey, coffeeName, price }) => {
  test(`Check ${coffeeName} cost is added to Total on menu page`, async ({ menuPage }) => {
    const totalPriceStr = totalPriceFormatStr(price);

    await menuPage.open();
    await menuPage.clickCoffeeCup(coffeeName);

    await menuPage.assertTotalCheckoutContainsValue(totalPriceStr);
  });
});
