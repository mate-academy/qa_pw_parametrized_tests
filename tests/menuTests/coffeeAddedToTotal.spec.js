import { test } from '../_fixtures/fixtures';
import { totalPriceFormatStr } from '../../src/common/priceFormatters';
import { COFFEE_PRICES, COFFEE_NAMES } from '../../src/constants';

const coffeTestData = Object.keys(COFFEE_NAMES).map((key) => ({
  coffeeName: COFFEE_NAMES[key],
  coffeePrice: COFFEE_PRICES[key],
}));

coffeTestData.forEach(({coffeeName, coffeePrice}) => {
  test(`Check '${coffeeName}' cost is added to 'Total' on menu page`, async ({
    menuPage,
  }) => {
    const totalPriceStr = totalPriceFormatStr(coffeePrice);

    await menuPage.open();
    await menuPage.clickCoffeeCup(coffeeName);

    await menuPage.assertTotalCheckoutContainsValue(totalPriceStr);
  });
});