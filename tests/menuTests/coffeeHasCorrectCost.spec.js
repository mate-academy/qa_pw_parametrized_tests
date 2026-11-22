import { test } from '../_fixtures/fixtures';
import { priceFormatStr } from '../../src/common/priceFormatters';
import { COFFEE_PRICES, COFFEE_NAMES } from '../../src/constants';

const par = [];
const coffeeKeys = Object.keys(COFFEE_NAMES);

for (let i = 0; i < coffeeKeys.length; i++) {
  let key = coffeeKeys[i];

  par.push({
    coffeeName : COFFEE_NAMES[key],
    price : COFFEE_PRICES[key],
  });
}

par.forEach(({ coffeeName, price }) => {
  test(`Check ${coffeeName} cup has correct cost`, async({ menuPage }) => {
    const formattedPrice = priceFormatStr(price);
    await menuPage.open();
    await menuPage.assertCoffeeCupCostHasValue(coffeeName, formattedPrice);
  });
});
