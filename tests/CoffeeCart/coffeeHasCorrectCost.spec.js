import { test } from '../_fixtures/fixtures';
import { priceFormatStr } from '../../src/common/priceFormatters';
import { COFFEE_NAMES, COFFEE_PRICES } from '../../src/constants';

let testParameters = [];
for (const [key, value] of Object.entries(COFFEE_NAMES)) {
  testParameters.push({
    coffeeName: value,
    coffeePrice: COFFEE_PRICES[key],
  });
}

testParameters.forEach(({coffeeName, coffeePrice}) => {

  test(
    `Check that coffee ${coffeeName} has correct cost`, 
    async ({
      menuPage,
  }) => {
  const totalPriceStr = priceFormatStr(coffeePrice);
  
  await menuPage.open();
  await menuPage.assertCoffeeCupCostHasValue(coffeeName, totalPriceStr);
  });

});