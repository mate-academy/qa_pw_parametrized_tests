import { test } from '../_fixtures/fixtures';
import { totalPriceFormatStr } from '../../src/common/priceFormatters';
import { COFFEE_PRICES } from '../../src/constants';

test('Check Espresso cost is added to Total on menu page', async ({
  menuPage,
}) => {
  const totalPriceStr = totalPriceFormatStr(COFFEE_PRICES.espresso);

  await menuPage.open();
  await menuPage.clickEspressoCup();

  await menuPage.assertTotalCheckoutContainsValue(totalPriceStr);
});
