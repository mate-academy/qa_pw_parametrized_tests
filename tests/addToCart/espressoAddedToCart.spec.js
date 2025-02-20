import { test } from '../_fixtures/fixtures';
import {
  unitPriceFormatStr,
  priceFormatStr,
} from '../../src/common/priceFormatters';

test('Check Espresso correctly added to the Cart', async ({
  menuPage,
  cartPage,
  prices,
}) => {
  const totalPriceStr = priceFormatStr(prices.espresso);
  const unitPriceStr = unitPriceFormatStr(prices.espresso, 1);

  await menuPage.open();
  await menuPage.clickEspressoCup();

  await menuPage.clickCartLink();
  await cartPage.waitForLoading();

  await cartPage.assertEspressoNameIsContainsCorrectText();
  await cartPage.assertEspressoUnitContainsCorrectText(unitPriceStr);
  await cartPage.assertEspressoTotalCostContainsCorrectText(totalPriceStr);
});
