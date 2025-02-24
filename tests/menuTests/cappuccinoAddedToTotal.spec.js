import { test } from '../_fixtures/fixtures';
import { totalPriceFormatStr } from '../../src/common/priceFormatters';
import { COFFEE_PRICES } from '../../src/constants';

test('Check Cappuccino cost is added to Total on menu page', async ({
  menuPage,
}) => {
  const totalPriceStr = totalPriceFormatStr(COFFEE_PRICES.cappuccino);

  await menuPage.open();
  await menuPage.clickCappucinoCup();

  await menuPage.assertTotalCheckoutContainsValue(totalPriceStr);
});
