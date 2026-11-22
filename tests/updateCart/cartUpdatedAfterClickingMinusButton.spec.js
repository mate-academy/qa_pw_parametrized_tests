import { test } from '../_fixtures/fixtures';
import { COFFEE_NAMES } from '../../src/constants';

test('Assert cart updated correctly after clicking minus for drinks', async ({
  cartPage,
  menuPage,
}) => {
  const espressoCup = COFFEE_NAMES.espresso;
  const cappuccinoCup = COFFEE_NAMES.cappuccino;

  await menuPage.open();
  await menuPage.clickCup(cappuccinoCup);
  await menuPage.clickCup(espressoCup);

  await menuPage.clickCartLink();
  await cartPage.waitForLoading();

  await cartPage.assertCoffeeItemIsVisible(espressoCup);

  await cartPage.clickRemoveOneCoffeeButton(espressoCup);

  await cartPage.assertCoffeeItemIsHidden(espressoCup);
  await cartPage.assertCoffeeItemIsVisible(cappuccinoCup);

  await cartPage.clickRemoveOneCoffeeButton(cappuccinoCup);

  await cartPage.assertCoffeeItemIsHidden(cappuccinoCup);
  await cartPage.assertNoCoffeeMessageIsVisible();
});
