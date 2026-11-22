import { test } from '../_fixtures/fixtures';
import { priceFormatStr } from '../../src/common/priceFormatters';
import { COFFEE_PRICES, COFFEE_NAMES } from '../../src/constants';

test('Assert discounted Mocha added to the Cart after promo accepting', async ({
  cartPage,
  menuPage,
}) => {
  const espressoCup = COFFEE_NAMES.espresso;
  const espressoPrice = priceFormatStr(COFFEE_PRICES.espresso);
  const discMochaPrice = priceFormatStr(COFFEE_PRICES.discountedMocha);
  const cappuccinoCup = COFFEE_NAMES.cappuccino;
  const cappuccinoPrice = priceFormatStr(COFFEE_PRICES.cappuccino);
  const americanoCup = COFFEE_NAMES.americano;
  const americanoPrice = priceFormatStr(COFFEE_PRICES.americano);

  await menuPage.open();
  await menuPage.clickCup(cappuccinoCup);
  await menuPage.clickCup(espressoCup);
  await menuPage.clickCup(americanoCup);

  await menuPage.assertPromoMessageIsVisible();

  await menuPage.clickYesPromoButton();

  await menuPage.clickCartLink();
  await cartPage.waitForLoading();

  await cartPage.assertCoffeeTotalCostContainsCorrectText(espressoCup, espressoPrice);
  await cartPage.assertDiscountedMochaTotalCostContainsCorrectText(
    discMochaPrice,
  );
  await cartPage.assertCoffeeTotalCostContainsCorrectText(cappuccinoCup, cappuccinoPrice);
  await cartPage.assertCoffeeTotalCostContainsCorrectText(americanoCup, americanoPrice);
});
