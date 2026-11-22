import { test } from '../_fixtures/fixtures';
import { priceFormatStr } from '../../src/common/priceFormatters';
import { COFFEE_PRICES } from '../../src/constants';
import { COFFEE_NAMES } from '../../src/constants';

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
  const espressoCup = COFFEE_NAMES.espresso;
  const cappuccinoCup = COFFEE_NAMES.cappuccino;

  await menuPage.open();
  await menuPage.clickCup(cappuccinoCup);
  await menuPage.clickCup(espressoCup);

  await menuPage.clickCartLink();
  await cartPage.waitForLoading();

  await cartPage.assertCoffeeTotalCostContainsCorrectText(espressoCup, oneEspressoPrice);

  await cartPage.clickAddOneCoffeeButton(espressoCup);

  await cartPage.assertCoffeeTotalCostContainsCorrectText(espressoCup, twoEspressoPrice);
  await cartPage.assertCoffeeTotalCostContainsCorrectText(cappuccinoCup,
    oneCappuccinoPrice,
  );

  await cartPage.clickAddOneCoffeeButton(cappuccinoCup);

  await cartPage.assertCoffeeTotalCostContainsCorrectText(cappuccinoCup,
    twoCappuccinoPrice,
  );
  await cartPage.assertCoffeeTotalCostContainsCorrectText(espressoCup, twoEspressoPrice);

  await cartPage.assertTotalCheckoutContainsValue(totalPrice);
});
