import { test } from '@playwright/test';
import { MenuPage } from '../../src/pages/MenuPage';
import { CartPage } from '../../src/pages/CartPage';

test('Assert cart updated correctly after clicking minus for drinks', async ({
  page,
}) => {
  const menuPage = new MenuPage(page);
  const cartPage = new CartPage(page);

  await menuPage.open();
  await menuPage.clickCappucinoCup();
  await menuPage.clickEspressoCup();

  await menuPage.clickCartLink();
  await cartPage.waitForLoading();

  await cartPage.assertEspressoItemIsVisible();

  await cartPage.clickRemoveOneEspressoButton();

  await cartPage.assertEspressoItemIsHidden();
  await cartPage.assertCappuccinoItemIsVisible();

  await cartPage.clickRemoveOneCappuccinoButton();

  await cartPage.assertCappuccinoItemIsHidden();
  await cartPage.assertNoCoffeeMessageIsVisible();
});
