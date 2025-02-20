import { test } from '../_fixtures/fixtures';
import { priceFormatStr } from '../../src/common/priceFormatters';

test('Check Espresso cup has correct cost', async ({ menuPage, prices }) => {
  const price = priceFormatStr(prices.espresso);

  await menuPage.open();

  await menuPage.assertEspressoCupCostHasValue(price);
});
