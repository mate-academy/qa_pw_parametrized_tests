import { test } from '../_fixtures/fixtures';
import { COFFEE_PRICES } from '../../src/constants';
import { totalPriceFormatStr } from '../../src/common/priceFormatters';

const coffeeTypes = ['Espresso', 'Cappuccino', 'Americano'];

for (const coffee of coffeeTypes) {
  test(`${coffee} is added to total`, async ({ menuPage, cartPage }) => {
    const totalPriceStr = totalPriceFormatStr(
      COFFEE_PRICES[coffee.toLowerCase()],
    );
    await menuPage.open();
    await menuPage.clickCoffeeCup(coffee);
    await menuPage.clickCartLink();

    await cartPage.waitForLoading();
    await cartPage.assertTotalCheckoutContainsValue(totalPriceStr);
  });
}
