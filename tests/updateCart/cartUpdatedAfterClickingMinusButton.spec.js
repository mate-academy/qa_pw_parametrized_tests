import { test } from '../_fixtures/fixtures';
import { COFFEE_NAMES } from '../../src/constants';

test('Assert cart updated correctly after clicking minus for drinks', async ({
  cartPage,
  menuPage,
}) => {
  await menuPage.open();
  await menuPage.clickCoffeeCup(COFFEE_NAMES.cappuccino);
  await menuPage.clickCoffeeCup(COFFEE_NAMES.espresso);

  await menuPage.clickCartLink();
  await cartPage.waitForLoading();

  await cartPage.assertCoffeeItemIsVisible('Espresso');

  await cartPage.clickRemoveOneCoffeeButton('Espresso');

  await cartPage.assertCoffeeItemIsHidden('Espresso');
  await cartPage.assertCoffeeItemIsVisible('Cappuccino');

  await cartPage.clickRemoveOneCoffeeButton('Cappuccino');

  await cartPage.assertCoffeeItemIsHidden('Cappuccino');
  await cartPage.assertNoCoffeeMessageIsVisible();
});
