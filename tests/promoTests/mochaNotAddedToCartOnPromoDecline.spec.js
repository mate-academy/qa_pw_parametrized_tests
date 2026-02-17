import { test } from '../_fixtures/fixtures';

test('Assert discounted Mocha added to the Cart after promo accepting', async ({
  cartPage,
  menuPage,
}) => {
  const espresso = 'Espresso';
  const cappuccino = 'Cappuccino';
  const americano = 'Americano';

  await menuPage.open();
  await menuPage.clickCoffeeCup(cappuccino);
  await menuPage.clickCoffeeCup(espresso);
  await menuPage.clickCoffeeCup(americano);

  await menuPage.assertPromoMessageIsVisible();
  await menuPage.clickNoPromoButton();

  await menuPage.clickCartLink();
  await cartPage.waitForLoading();

  await cartPage.assertCoffeeItemIsVisible(espresso);
  await cartPage.assertDiscountedMochaItemIsHidden();

  await cartPage.assertCoffeeItemIsVisible(cappuccino);
  await cartPage.assertCoffeeItemIsVisible(americano);
});
