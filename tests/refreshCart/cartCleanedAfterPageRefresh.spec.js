import { test } from '../_fixtures/fixtures';

test('Assert cart cleaned after page refresh', async ({
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

  await cartPage.assertCoffeeItemIsVisible(cappuccino);

  await cartPage.reload();

  await cartPage.assertCoffeeItemIsHidden(espresso);
  await cartPage.assertNoCoffeeMessageIsVisible();
});
