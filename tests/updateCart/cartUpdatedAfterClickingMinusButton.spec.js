import { test } from '../_fixtures/fixtures';

test('Assert cart updated correctly after clicking minus for drinks', async ({
  cartPage,
  menuPage,
}) => {
  const espresso = 'Espresso';
  const cappuccino = 'Cappuccino';

  await menuPage.open();
  await menuPage.clickCoffeeCup(cappuccino);
  await menuPage.clickCoffeeCup(espresso);

  await menuPage.clickCartLink();
  await cartPage.waitForLoading();

  await cartPage.assertCoffeeItemIsVisible(espresso);

  await cartPage.clickRemoveOneCoffeeButton(espresso);

  await cartPage.assertCoffeeItemIsHidden(espresso);
  await cartPage.assertCoffeeItemIsVisible(cappuccino);

  await cartPage.clickRemoveOneCoffeeButton(cappuccino);

  await cartPage.assertCoffeeItemIsHidden(cappuccino);
  await cartPage.assertNoCoffeeMessageIsVisible();
});
