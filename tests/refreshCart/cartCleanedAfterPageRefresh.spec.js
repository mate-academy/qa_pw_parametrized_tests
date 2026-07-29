import { test } from '../_fixtures/fixtures';
import { COFFEE_NAMES } from '../../src/constants';

test('Assert cart cleaned after page refresh', async ({
  cartPage,
  menuPage,
}) => {
  await menuPage.open();
  // await menuPage.clickCappucinoCup();
  // await menuPage.clickEspressoCup();
  await menuPage.clickCoffeCup(COFFEE_NAMES.cappuccino);
  await menuPage.clickCoffeCup(COFFEE_NAMES.espresso);

  await menuPage.clickCartLink();
  await cartPage.waitForLoading();

  // await cartPage.assertCappuccinoItemIsVisible();
  await cartPage.assertCoffeeIsVisible(COFFEE_NAMES.cappuccino);

  await cartPage.reload();

  // await cartPage.assertCappuccinoItemIsHidden();
  await cartPage.assertNoCoffeeMessageIsVisible();
});
