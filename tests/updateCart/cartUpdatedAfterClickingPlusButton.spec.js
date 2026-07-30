import { test } from '../_fixtures/fixtures';
import { priceFormatStr, totalPriceFormatStr } from '../../src/common/priceFormatters';
import { COFFEE_PRICES, COFFEE_NAMES } from '../../src/constants';

test('Assert cart updated correctly after clicking plus for drinks', async ({
  cartPage,
  menuPage,
}) => {
  // const oneCappuccinoPrice = priceFormatStr(COFFEE_PRICES.cappuccino);
  // const twoCappuccinoPrice = priceFormatStr(COFFEE_PRICES.cappuccino * 2);
  const oneEspressoPrice = priceFormatStr(COFFEE_PRICES.espresso);
  const twoEspressoPrice = priceFormatStr(COFFEE_PRICES.espresso * 2);
  // const totalPriceNum =
  //   COFFEE_PRICES.cappuccino * 2 + COFFEE_PRICES.espresso * 2;
  // const totalPrice = priceFormatStr(totalPriceNum);
  const totalPrice = totalPriceFormatStr(COFFEE_PRICES.espresso * 2);

  await menuPage.open();
  // await menuPage.clickCappucinoCup();
  // await menuPage.clickEspressoCup();
  await menuPage.clickCoffeeCup(COFFEE_NAMES.espresso);

  await menuPage.clickCartLink();
  await cartPage.waitForLoading();

  // eslint-disable-next-line max-len
  // await cartPage.assertEspressoTotalCostContainsCorrectText(oneEspressoPrice);

  // await cartPage.clickAddOneEspressoButton();

  // eslint-disable-next-line max-len
  // await cartPage.assertEspressoTotalCostContainsCorrectText(twoEspressoPrice);
  // await cartPage.assertCappuccinoTotalCostContainsCorrectText(
  //   oneCappuccinoPrice,
  // );
  await cartPage.assertCoffeeTotalCostContainsCorrectText(
    COFFEE_NAMES.espresso, oneEspressoPrice
  );

  // await cartPage.clickAddOneCappuccinoButton();
  await cartPage.addOneCoffeeButtonClick(COFFEE_NAMES.espresso);

  // await cartPage.assertCappuccinoTotalCostContainsCorrectText(
  //   twoCappuccinoPrice,
  // );
  await cartPage.assertCoffeeTotalCostContainsCorrectText(
    COFFEE_NAMES.espresso, twoEspressoPrice
  );
  // await cartPage.assertEspressoTotalCostContainsCorrectText(
  // twoEspressoPrice);

  await cartPage.assertTotalCheckoutContainsValue(totalPrice);
});
