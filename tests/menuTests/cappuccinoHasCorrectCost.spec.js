import { test } from '../_fixtures/fixtures';
import { priceFormatStr } from '../../src/common/priceFormatters';

test('Check Cappuccino cup has correct cost', async ({ menuPage, prices }) => {
  const price = priceFormatStr(prices.cappuccino);

  await menuPage.open();

  await menuPage.assertCappuccinoCupCostHasValue(price);
});
