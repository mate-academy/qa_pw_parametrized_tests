import { test } from '../_fixtures/fixtures';
import {
  unitPriceFormatStr,
  priceFormatStr,
} from '../../src/common/priceFormatters';

test('Check Cappuccino correctly added to the Cart', async ({
  menuPage,
  cartPage,
  prices,
}) => {
  const totalPriceStr = priceFormatStr(prices.cappuccino);
  const unitPriceStr = unitPriceFormatStr(prices.cappuccino, 1);

  await menuPage.open();
  await menuPage.clickCappucinoCup();

  await menuPage.clickCartLink();
  await cartPage.waitForLoading();

  await cartPage.assertCappuccinoNameIsContainsCorrectText();
  await cartPage.assertCappuccinoUnitContainsCorrectText(unitPriceStr);
  await cartPage.assertCappuccinoTotalCostContainsCorrectText(totalPriceStr);
});
