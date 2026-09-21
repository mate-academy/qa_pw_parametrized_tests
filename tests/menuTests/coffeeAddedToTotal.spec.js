import { test } from '../_fixtures/fixtures';
import { totalPriceFormatStr } from '../../src/common/priceFormatters';
import { COFFEE_PRICES } from '../../src/constants';



const testParameters = [
  {coffeeType: 'Espresso', price: COFFEE_PRICES.espresso},
  {coffeeType: 'Cappuccino', price: COFFEE_PRICES.cappuccino},
]


testParameters.forEach(({coffeeType, price}) => {
  test(`Ckeck ${coffeeType} cost is added to Total on menu page`, async ({ menuPage }) => {
    const totalPriceStr = totalPriceFormatStr(price);

    await menuPage.open();
    await menuPage.clickCoffeeCup(coffeeType);

    await menuPage.assertTotalCheckoutContainsValue(totalPriceStr);
  });
});
