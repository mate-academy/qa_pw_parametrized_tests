import { test } from '../_fixtures/fixtures';
import { priceFormatStr } from '../../src/common/priceFormatters';
import { COFFEE_PRICES } from '../../src/constants';

test('Check Espresso cup has correct cost', async ({ menuPage }) => {
  const price = priceFormatStr(COFFEE_PRICES.espresso);

  await menuPage.open();

  await menuPage.assertEspressoCupCostHasValue(price);
});
