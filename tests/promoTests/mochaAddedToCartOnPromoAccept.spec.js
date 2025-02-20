import { test } from '../_fixtures/fixtures';
import { priceFormatStr } from '../../src/common/priceFormatters';

test('Assert discounted Mocha added to the Cart after promo accepting', async ({
  cartPage,
  menuPage,
  prices,
}) => {
  const espressoPrice = priceFormatStr(prices.espresso);
  const discMochaPrice = priceFormatStr(prices.discountedMocha);
  const cappuccinoPrice = priceFormatStr(prices.cappuccino);
  const americanoPrice = priceFormatStr(prices.americano);

  await menuPage.open();
  await menuPage.clickCappucinoCup();
  await menuPage.clickEspressoCup();
  await menuPage.clickAmericanoCup();

  await menuPage.assertPromoMessageIsVisible();

  await menuPage.clickYesPromoButton();

  await menuPage.clickCartLink();
  await cartPage.waitForLoading();

  await cartPage.assertEspressoTotalCostContainsCorrectText(espressoPrice);
  await cartPage.assertDiscountedMochaTotalCostContainsCorrectText(
    discMochaPrice,
  );
  await cartPage.assertCappuccinoTotalCostContainsCorrectText(cappuccinoPrice);
  await cartPage.assertAmericanoTotalCostContainsCorrectText(americanoPrice);
});
