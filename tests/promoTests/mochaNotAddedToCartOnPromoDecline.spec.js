import { test } from '../_fixtures/fixtures';

test('Assert Mocha is NOT added to the Cart after promo declining'
  , async ({ cartPage, menuPage }) => {
  await menuPage.open();
  await menuPage.clickCoffeeCup('Cappuccino');
  await menuPage.clickCoffeeCup('Espresso');
  await menuPage.clickCoffeeCup('Americano');

  await menuPage.assertPromoMessageIsVisible();
  await menuPage.clickNoPromoButton();

  await menuPage.clickCartLink();
  await cartPage.waitForLoading();

  await cartPage.assertItemIsVisible('Espresso');
  await cartPage.assertItemIsHidden('Mocha');
  await cartPage.assertItemIsVisible('Cappuccino');
  await cartPage.assertItemIsVisible('Americano');
});
