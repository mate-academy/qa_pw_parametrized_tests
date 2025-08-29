import { test } from '../_fixtures/fixtures';
import { priceFormatStr } from '../../src/common/priceFormatters';
import { COFFEE_PRICES } from '../../src/constants';

test('Assert cart updated correctly after clicking plus for drinks'
  , async ({ cartPage, menuPage }) => {
  const oneCappuccino = priceFormatStr(COFFEE_PRICES.cappuccino);
  const twoCappuccino = priceFormatStr(COFFEE_PRICES.cappuccino * 2);
  const oneEspresso = priceFormatStr(COFFEE_PRICES.espresso);
  const twoEspresso = priceFormatStr(COFFEE_PRICES.espresso * 2);
  const totalPrice = priceFormatStr(COFFEE_PRICES.cappuccino * 2
     + COFFEE_PRICES.espresso * 2);

  await menuPage.open();
  await menuPage.clickCoffeeCup('Cappuccino');
  await menuPage.clickCoffeeCup('Espresso');

  await menuPage.clickCartLink();
  await cartPage.waitForLoading();

  await cartPage.assertCoffeeTotalCostContainsCorrectText('Espresso'
    , oneEspresso);

  await cartPage.clickAddOne('Espresso');
  await cartPage.assertCoffeeTotalCostContainsCorrectText('Espresso'
    , twoEspresso);
  await cartPage.assertCoffeeTotalCostContainsCorrectText('Cappuccino'
    , oneCappuccino);

  await cartPage.clickAddOne('Cappuccino');
  await cartPage.assertCoffeeTotalCostContainsCorrectText('Cappuccino'
    , twoCappuccino);
  await cartPage.assertCoffeeTotalCostContainsCorrectText('Espresso'
    , twoEspresso);

  await cartPage.assertTotalCheckoutContainsValue(totalPrice);
});
