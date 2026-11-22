import { test } from '../_fixtures/fixtures';
import { COFFEE_NAMES } from '../../src/constants';

test('Assert cart cleaned after page refresh', async ({
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

  await cartPage.assertCoffeeItemIsVisible(cappuccinoCup);

  await cartPage.reload();

  await cartPage.assertCoffeeItemIsHidden(cappuccinoCup);
  await cartPage.assertNoCoffeeMessageIsVisible();
});
