import { test } from '../_fixtures/fixtures';
import { totalPriceFormatStr } from '../../src/common/priceFormatters';
import { COFFEE_MENU } from '../../src/constants';

for (const coffe of COFFEE_MENU) {
  test(`Check ${coffe.name} cost is added to Total on menu page`, async ({
    menuPage,
  }) => {
    const totalPriceStr = totalPriceFormatStr(coffe.price);

    await menuPage.open();
    await menuPage.clickCoffeeCup(coffe.name);

    await menuPage.assertTotalCheckoutContainsValue(totalPriceStr);
  });
}
