import { test } from '../_fixtures/fixtures';
import { priceFormatStr } from '../../src/common/priceFormatters';
import { COFFEE_PRICES, COFFEE_NAMES } from '../../src/constants';

const coffeeTestData = Object.keys(COFFEE_NAMES).map((key) => ({
  coffeeName: COFFEE_NAMES[key],
  coffeePrice: COFFEE_PRICES[key],
}));

coffeeTestData.forEach(({coffeeName, coffeePrice}) => {
  test(`Check '${coffeeName}' cup has correct cost`, async ({ menuPage }) => {
    const price = priceFormatStr(coffeePrice);

    await menuPage.open();

    await menuPage.assertCoffeeCupCostHasValue(coffeeName, price);
  });
});