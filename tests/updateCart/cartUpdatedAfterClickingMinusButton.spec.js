import { test } from '../_fixtures/fixtures';

test('Assert cart updated correctly after clicking minus for drinks', async ({
  cartPage,
  menuPage,
}) => {
  await menuPage.open();
  await menuPage.clickCoffeeCup('Cappuccino');
  await menuPage.clickCoffeeCup('Espresso');
  // await menuPage.clickCappucinoCup();
  // await menuPage.clickEspressoCup();

  await menuPage.clickCartLink();
  await cartPage.waitForLoading();

  await cartPage.assertCoffeeItemIsVisible('Espresso');

  // await cartPage.assertEspressoItemIsVisible();

  await cartPage.clickRemoveOneCoffeeButton('Espresso');
  // await cartPage.clickRemoveOneEspressoButton();

  await cartPage.assertCoffeeItemIsHidden('Espresso');
  await cartPage.assertCoffeeItemIsVisible('Cappuccino');

  // await cartPage.assertEspressoItemIsHidden();
  // await cartPage.assertCappuccinoItemIsVisible();

  await cartPage.clickRemoveOneCoffeeButton('Cappuccino');
  // await cartPage.clickRemoveOneCappuccinoButton();

  await cartPage.assertCoffeeItemIsHidden('Cappuccino');
  //await cartPage.assertCappuccinoItemIsHidden();
  
  await cartPage.assertNoCoffeeMessageIsVisible();
});
