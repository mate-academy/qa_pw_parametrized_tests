import { test } from '../_fixtures/fixtures';
import { totalPriceFormatStr } from '../../src/common/priceFormatters';
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
    `Add cup of coffee ${coffeeName} has total price ${coffeePrice}`, 
    async ({
      menuPage,
  }) => {
    
  const totalPriceStr = totalPriceFormatStr(coffeePrice);
  await menuPage.open();
  await menuPage.addCoffeeCupToCart(coffeeName);
  await menuPage.assertTotalCheckoutContainsValue(totalPriceStr);

  });

});