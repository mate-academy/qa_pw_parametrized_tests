import { test } from '@playwright/test';
import { MenuPage } from '../../src/pages/MenuPage';
import { CartPage } from '../../src/pages/CartPage';

test('Assert discounted Mocha added to the Cart after promo accepting', async ({
  page,
}) => {
  const menuPage = new MenuPage(page);
  const cartPage = new CartPage(page);

  await menuPage.open();
  await menuPage.clickCappucinoCup();
  await menuPage.clickEspressoCup();
  await menuPage.clickAmericanoCup();

  await menuPage.assertPromoMessageIsVisible();
  await menuPage.clickNoPromoButton();

  await menuPage.clickCartLink();
  await cartPage.waitForLoading();

  await cartPage.assertEspressoItemIsVisible();
  await cartPage.assertDiscountedMochaItemIsHidden();

  await cartPage.assertCappuccinoItemIsVisible();
  await cartPage.assertAmericanoItemIsVisible();
});
