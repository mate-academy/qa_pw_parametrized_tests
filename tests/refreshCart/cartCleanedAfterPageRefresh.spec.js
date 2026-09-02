import { test } from '../_fixtures/fixtures';

test('Assert cart cleaned after page refresh', async ({
  cartPage,
  menuPage,
}) => {
  await menuPage.open();
  await menuPage.clickCoffeeCup('Cappuccino');
  await menuPage.clickCoffeeCup('Espresso');

  await menuPage.clickCartLink();
  await cartPage.waitForLoading();

  await cartPage.assertItemIsVisible('Cappuccino');

  await cartPage.reload();

  await cartPage.assertItemIsHidden('Cappuccino');
  await cartPage.assertNoCoffeeMessageIsVisible();
});
