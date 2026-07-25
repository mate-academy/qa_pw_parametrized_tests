import { test } from '../_fixtures/fixtures';
import { priceFormatStr } from '../../src/common/priceFormatters';
import { COFFEE_MENU } from '../../src/constants';

for (const coffe of COFFEE_MENU) {
  test(`Check ${coffe.name} cup has correct cost`, async ({ menuPage }) => {
    const price = priceFormatStr(coffe.price);

    await menuPage.open();

    await menuPage.assertCoffeCupCostHasValue(coffe.name, price);
  });
}
