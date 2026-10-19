import { test } from '../_fixtures/fixtures';
import { COFFEE_NAMES } from '../../src/constants';

test('Assert discounted Mocha added to the Cart after promo accepting', async ({
  cartPage,
  menuPage,
}) => {
  const cappuccino = COFFEE_NAMES.cappuccino;
  const espresso = COFFEE_NAMES.espresso;
  const americano = COFFEE_NAMES.americano;
  const mocha = COFFEE_NAMES.mocha;

  await menuPage.open();
  await menuPage.clickCoffeeCup(cappuccino);
  await menuPage.clickCoffeeCup(espresso);
  await menuPage.clickCoffeeCup(americano);

  await menuPage.assertPromoMessageIsVisible();
  await menuPage.clickNoPromoButton();

  await menuPage.clickCartLink();
  await cartPage.waitForLoading();

  await cartPage.assertCoffeeItemIsVisible(espresso);
  await cartPage.assertCoffeeItemIsHidden(mocha);

  await cartPage.assertCoffeeItemIsVisible(cappuccino);
  await cartPage.assertCoffeeItemIsVisible(americano);
});
