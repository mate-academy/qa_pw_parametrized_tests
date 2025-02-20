import { test } from '../_fixtures/fixtures';
import { totalPriceFormatStr } from '../../src/common/priceFormatters';

test('Check Espresso cost is added to Total on menu page', async ({
  menuPage,
  prices,
}) => {
  const totalPriceStr = totalPriceFormatStr(prices.espresso);

  await menuPage.open();
  await menuPage.clickEspressoCup();

  await menuPage.assertTotalCheckoutContainsValue(totalPriceStr);
});
