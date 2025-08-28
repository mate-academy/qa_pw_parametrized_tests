import { test } from '../_fixtures/fixtures';
import { priceFormatStr } from '../../src/common/priceFormatters';
import { COFFEE_PRICES } from '../../src/constants';

const testParameters = [
  { coffeeType: 'Cappuccino' },
  { coffeeType: 'Espresso' },
];

testParameters.forEach(({ coffeeType }) => {
  test(`Check ${coffeeType} cup has correct cost`, async ({ menuPage }) => {
    const key = coffeeType.toLowerCase(); // 'cappuccino' | 'espresso'
    const expected = priceFormatStr(COFFEE_PRICES[key]);

    await menuPage.open();
    await menuPage.assertCoffeeCupCostHasValue(coffeeType, expected);
  });
});