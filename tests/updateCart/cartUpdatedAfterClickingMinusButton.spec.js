import { test } from '../_fixtures/fixtures';

test('Assert cart updated correctly after clicking minus for drinks', async ({
  cartPage,
  menuPage,
}) => {
  await menuPage.open();
  await menuPage.clickCoffeeCup('Cappuccino');
  await menuPage.clickCoffeeCup('Espresso');

  await menuPage.clickCartLink();
  await cartPage.waitForLoading();

  await cartPage.assertItemIsVisible('Espresso');

  await cartPage.clickRemoveOneCoffeeButton('Espresso');

  await cartPage.assertItemIsHidden('Espresso');
  await cartPage.assertItemIsVisible('Cappuccino');

  await cartPage.clickRemoveOneCoffeeButton('Cappuccino');

  await cartPage.assertItemIsHidden('Cappuccino');
  await cartPage.assertNoCoffeeMessageIsVisible();
});
