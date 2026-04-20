import { test } from '../_fixtures/fixtures';
import { totalPriceFormatStr } from '../../src/common/priceFormatters';
import { COFFEE_PRICES } from '../../src/constants';

const testParameters = [
  {
    price: COFFEE_PRICES.cappuccino,
    label: 'Cappuccino',
  },
  {
    price: COFFEE_PRICES.espresso,
    label: 'Espresso',
  },
];

testParameters.forEach(({price, label}) =>{
  test.describe('Check cost is added to Total on menu page', () => {
    test(`Check ${label} cost is added to Total on menu page`, async ({
      menuPage,
    }) => {
      const totalPriceStr = totalPriceFormatStr(price);

      await menuPage.open();
      await menuPage.clickCoffeeCup(label);

      await menuPage.assertTotalCheckoutContainsValue(totalPriceStr);
    }); 
  });
});
