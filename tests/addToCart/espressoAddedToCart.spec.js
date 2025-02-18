import { test } from '@playwright/test';
import { MenuPage } from '../../src/pages/MenuPage';
import { CartPage }from '../../src/pages/CartPage';

test('Check Espresso correctly added to the Cart', async ({ page }) => {
  const menuPage = new MenuPage(page);
  const cartPage = new CartPage(page);
      
  await menuPage.open();
  await menuPage.clickEspressoCup();
  
  await menuPage.clickCartLink();
  await cartPage.waitForLoading();

  await cartPage.assertEspressoNameIsContainsCorrectText();
  await cartPage.assertEspressoUnitContainsCorrectText('$10.00 x 1');
  await cartPage.assertEspressoTotalCostContainsCorrectText('$10.00');
});