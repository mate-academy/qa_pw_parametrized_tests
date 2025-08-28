import { test } from '../_fixtures/fixtures';
import { priceFormatStr } from '../../src/common/priceFormatters';
import { COFFEE_PRICES } from '../../src/constants';

test('Assert discounted Mocha added to the Cart after promo accepting'
  , async ({ cartPage, menuPage }) => {
  const prices = {
    Espresso:    priceFormatStr(COFFEE_PRICES.espresso),
    Mocha:       priceFormatStr(COFFEE_PRICES.discountedMocha),
    Cappuccino:  priceFormatStr(COFFEE_PRICES.cappuccino),
    Americano:   priceFormatStr(COFFEE_PRICES.americano),
  };

  await menuPage.open();
  await menuPage.clickCoffeeCup('Cappuccino');
  await menuPage.clickCoffeeCup('Espresso');
  await menuPage.clickCoffeeCup('Americano');

  await menuPage.assertPromoMessageIsVisible();
  await menuPage.clickYesPromoButton();

  await menuPage.clickCartLink();
  await cartPage.waitForLoading();

  await cartPage
  .assertCoffeeTotalCostContainsCorrectText('Espresso', prices.Espresso);
  await cartPage
  .assertCoffeeTotalCostContainsCorrectText('Mocha', prices.Mocha);
  await cartPage
  .assertCoffeeTotalCostContainsCorrectText('Cappuccino', prices.Cappuccino);
  await cartPage
  .assertCoffeeTotalCostContainsCorrectText('Americano', prices.Americano);
});
