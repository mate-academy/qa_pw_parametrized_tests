import { test } from '../_fixtures/fixtures';
import { priceFormatStr } from '../../src/common/priceFormatters';
import { COFFEE_PRICES, COFFEE_NAMES } from '../../src/constants';

let testParameters = [];

for (const [key, value] of Object.entries(COFFEE_NAMES)) {
  testParameters.push({ coffee: value, price: COFFEE_PRICES[key] });
}

testParameters.forEach(({coffee, price}) => {
  test (`Check the ${coffee} has correct cost `, async ({
    menuPage
  }) => {
        const coffePrice = priceFormatStr(price);

        await menuPage.open();

        await menuPage.assertCoffeeCupCostHasValue(coffee, coffePrice);
  });
});