import { test } from '@playwright/test';
import { MenuPage } from '../../src/pages/MenuPage';
import { CartPage } from '../../src/pages/CartPage';

test('Assert cart cleaned after page refresh', async ({ page }) => {
  const menuPage = new MenuPage(page);
  const cartPage = new CartPage(page);

  await menuPage.open();
  await menuPage.clickCappucinoCup();
  await menuPage.clickEspressoCup();

  await menuPage.clickCartLink();
  await cartPage.waitForLoading();

  await cartPage.assertCappuccinoItemIsVisible();

  await cartPage.reload();

  await cartPage.assertCappuccinoItemIsHidden();
  await cartPage.assertNoCoffeeMessageIsVisible();
});
