import { test } from '../_fixtures/fixtures';
import { totalPriceFormatStr } from '../../src/common/priceFormatters';
import { COFFEE_PRICES } from '../../src/constants';

const testParameters = [
  { coffeeType: 'Cappuccino' },
  { coffeeType: 'Espresso' },
];

testParameters.forEach(({ coffeeType }) => {
  test(`Check ${coffeeType} cost is added to Total on menu page`
    , async ({ menuPage }) => {
    const key = coffeeType.toLowerCase();           // 'cappuccino' | 'espresso'
    const totalPriceStr = totalPriceFormatStr(COFFEE_PRICES[key]);

    await menuPage.open();
    await menuPage.clickCoffeeCup(coffeeType);

    await menuPage.assertTotalCheckoutContainsValue(totalPriceStr);
  });
});
