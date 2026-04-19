import { test } from '../_fixtures/fixtures';
import { priceFormatStr, totalPriceFormatStr } from '../../src/common/priceFormatters';
import { COFFEE_PRICES, COFFEE_NAMES } from '../../src/constants';

test('Assert cart updated correctly after clicking plus for drinks', async ({
  cartPage,
  menuPage,
}) => {
  const oneEspressoPrice = priceFormatStr(COFFEE_PRICES.espresso);
  const twoEspressoPrice = priceFormatStr(COFFEE_PRICES.espresso * 2);
  const totalPrice = totalPriceFormatStr(COFFEE_PRICES.espresso * 2);

  await menuPage.open();
  await menuPage.clickCoffeeCup(COFFEE_NAMES.espresso);

  await menuPage.clickCartLink();
  await cartPage.waitForLoading();

  await cartPage.assertCoffeeTotalCostContainsCorrectText(
    COFFEE_NAMES.espresso, oneEspressoPrice
  );

  await cartPage.addOneCoffeeButtonClick(COFFEE_NAMES.espresso);

  await cartPage.assertCoffeeTotalCostContainsCorrectText(
    COFFEE_NAMES.espresso, twoEspressoPrice
  );

  await cartPage.assertTotalCheckoutContainsValue(totalPrice);
});
