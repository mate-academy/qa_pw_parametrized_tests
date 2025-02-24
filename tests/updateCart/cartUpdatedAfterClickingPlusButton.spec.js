import { test } from '../_fixtures/fixtures';
import { priceFormatStr } from '../../src/common/priceFormatters';
import { COFFEE_PRICES } from '../../src/constants';

test('Assert cart updated correctly after clicking plus for drinks', async ({
  cartPage,
  menuPage,
}) => {
  const oneCappuccinoPrice = priceFormatStr(COFFEE_PRICES.cappuccino);
  const twoCappuccinoPrice = priceFormatStr(COFFEE_PRICES.cappuccino * 2);
  const oneEspressoPrice = priceFormatStr(COFFEE_PRICES.espresso);
  const twoEspressoPrice = priceFormatStr(COFFEE_PRICES.espresso * 2);
  const totalPriceNum =
    COFFEE_PRICES.cappuccino * 2 + COFFEE_PRICES.espresso * 2;
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
