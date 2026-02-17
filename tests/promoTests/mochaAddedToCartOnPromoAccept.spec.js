import { test } from '../_fixtures/fixtures';
import { priceFormatStr } from '../../src/common/priceFormatters';
import { COFFEE_PRICES } from '../../src/constants';

test('Assert discounted Mocha added to the Cart after promo accepting', async ({
  cartPage,
  menuPage,
}) => {
  const espresso = 'Espresso';
  const cappuccino = 'Cappuccino';
  const americano = 'Americano';

  const espressoPrice = priceFormatStr(COFFEE_PRICES.espresso);
  const discMochaPrice = priceFormatStr(COFFEE_PRICES.discountedMocha);
  const cappuccinoPrice = priceFormatStr(COFFEE_PRICES.cappuccino);
  const americanoPrice = priceFormatStr(COFFEE_PRICES.americano);

  await menuPage.open();
  await menuPage.clickCoffeeCup(cappuccino);
  await menuPage.clickCoffeeCup(espresso);
  await menuPage.clickCoffeeCup(americano);

  await menuPage.assertPromoMessageIsVisible();

  await menuPage.clickYesPromoButton();

  await menuPage.clickCartLink();
  await cartPage.waitForLoading();

  await cartPage.assertCoffeeTotalCostContainsCorrectText(
    espresso, espressoPrice
  );
  await cartPage.assertDiscountedMochaTotalCostContainsCorrectText(
    discMochaPrice,
  );
  await cartPage.assertCoffeeTotalCostContainsCorrectText(
    cappuccino, cappuccinoPrice
  );
  await cartPage.assertCoffeeTotalCostContainsCorrectText(
    americano, americanoPrice
  );
});
