import { test } from '../_fixtures/fixtures';
import { totalPriceFormatStr } from '../../src/common/priceFormatters';

test('Check Cappuccino cost is added to Total on menu page', async ({
  menuPage,
  prices,
}) => {
  const totalPriceStr = totalPriceFormatStr(prices.cappuccino);

  await menuPage.open();
  await menuPage.clickCappucinoCup();

  await menuPage.assertTotalCheckoutContainsValue(totalPriceStr);
});
