import { test } from '../_fixtures/fixtures';
import { COFFEE_NAMES } from '../../src/constants';

test('Assert cart updated correctly after clicking minus for drinks', async ({
  cartPage,
  menuPage,
}) => {
  await menuPage.open();
  // await menuPage.clickCappucinoCup();
  // await menuPage.clickEspressoCup();
  
  await menuPage.clickCoffeCup(COFFEE_NAMES.espresso);

  await menuPage.clickCartLink();
  await cartPage.waitForLoading();

  await cartPage.assertCoffeeIsVisible(COFFEE_NAMES.espresso);
  await cartPage.removeOneCoffeeButtonClick(COFFEE_NAMES.espresso);
  await cartPage.assertCoffeeIsHidden(COFFEE_NAMES.espresso);
  // await cartPage.assertEspressoItemIsVisible();

  // await cartPage.clickRemoveOneEspressoButton();

  // await cartPage.assertEspressoItemIsHidden();
  // await cartPage.assertCappuccinoItemIsVisible();

  // await cartPage.clickRemoveOneCappuccinoButton();

  // await cartPage.assertCappuccinoItemIsHidden();
  await cartPage.assertNoCoffeeMessageIsVisible();
});
