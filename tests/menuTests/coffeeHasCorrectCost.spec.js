import { test } from '../_fixtures/fixtures';
import { priceFormatStr } from '../../src/common/priceFormatters';
import { COFFEE_PRICES } from '../../src/constants';


const testParameters = [
  {coffeeType: 'Espresso', price: COFFEE_PRICES.espresso},
  {coffeeType: 'Cappuccino', price: COFFEE_PRICES.cappuccino},
]

testParameters.forEach(({coffeeType, price}) => {
  test(`Check ${coffeeType} cup has correct cost`, async ({ menuPage }) => {
    const priceStr = priceFormatStr(price);

    await menuPage.open();
    
    await menuPage.assertCoffeeCupCostHasValue(coffeeType, priceStr);
  });
});
