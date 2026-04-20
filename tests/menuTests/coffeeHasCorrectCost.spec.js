import { test } from '../_fixtures/fixtures';
import { priceFormatStr } from '../../src/common/priceFormatters';
import { COFFEE_PRICES } from '../../src/constants';

const testParameters = [
  {
    coffeePrice: COFFEE_PRICES.cappuccino,
    label: 'Cappuccino',
  },
  {
    coffeePrice: COFFEE_PRICES.espresso,
    label: 'Espresso',
  },
];

testParameters.forEach(({coffeePrice, label}) =>{
  test.describe('Check cost is correct', () => {
    test(`Check ${label} cup has correct cost`, async ({ menuPage }) => {
      const price = priceFormatStr(coffeePrice);

      await menuPage.open();

      await menuPage.assertCoffeeCupCostHasValue(label ,price);
    });
  });
});