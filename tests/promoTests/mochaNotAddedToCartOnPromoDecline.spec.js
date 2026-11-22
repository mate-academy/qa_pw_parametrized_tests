import { test } from '../_fixtures/fixtures';
import { COFFEE_NAMES } from '../../src/constants';

test('Assert discounted Mocha added to the Cart after promo accepting', async ({
  cartPage,
  menuPage,
}) => {
  const espressoCup = COFFEE_NAMES.espresso;
  const cappuccinoCup = COFFEE_NAMES.cappuccino;
  const americanoCup = COFFEE_NAMES.americano;
  

  await menuPage.open();
  await menuPage.clickCup(cappuccinoCup);
  await menuPage.clickCup(espressoCup);
  await menuPage.clickCup(americanoCup);

  await menuPage.assertPromoMessageIsVisible();
  await menuPage.clickNoPromoButton();

  await menuPage.clickCartLink();
  await cartPage.waitForLoading();

  await cartPage.assertCoffeeItemIsVisible(espressoCup);
  await cartPage.assertDiscountedMochaItemIsHidden();

  await cartPage.assertCoffeeItemIsVisible(cappuccinoCup);
  await cartPage.assertCoffeeItemIsVisible(americanoCup);
});
