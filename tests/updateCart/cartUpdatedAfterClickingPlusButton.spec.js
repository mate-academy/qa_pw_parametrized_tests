import { test } from '../_fixtures/fixtures';
import { priceFormatStr } from '../../src/common/priceFormatters';

test('Assert cart updated correctly after clicking plus for drinks', async ({
  cartPage,
  menuPage,
  prices,
}) => {
  const oneCappuccinoPrice = priceFormatStr(prices.cappuccino);
  const twoCappuccinoPrice = priceFormatStr(prices.cappuccino * 2);
  const oneEspressoPrice = priceFormatStr(prices.espresso);
  const twoEspressoPrice = priceFormatStr(prices.espresso * 2);
  const totalPriceNum = prices.cappuccino * 2 + prices.espresso * 2;
  const totalPrice = priceFormatStr(totalPriceNum);

  await menuPage.open();
  await menuPage.clickCappucinoCup();
  await menuPage.clickEspressoCup();

  await menuPage.clickCartLink();
  await cartPage.waitForLoading();

  await cartPage.assertEspressoTotalCostContainsCorrectText(oneEspressoPrice);

  await cartPage.clickAddOneEspressoButton();

  await cartPage.assertEspressoTotalCostContainsCorrectText(twoEspressoPrice);
  await cartPage.assertCappuccinoTotalCostContainsCorrectText(
    oneCappuccinoPrice,
  );

  await cartPage.clickAddOneCappuccinoButton();

  await cartPage.assertCappuccinoTotalCostContainsCorrectText(
    twoCappuccinoPrice,
  );
  await cartPage.assertEspressoTotalCostContainsCorrectText(twoEspressoPrice);

  await cartPage.assertTotalCheckoutContainsValue(totalPrice);
});
