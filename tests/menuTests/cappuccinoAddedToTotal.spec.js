import { test } from '@playwright/test';
import { MenuPage } from '../../src/pages/MenuPage';

test('Check Cappuccino cost is added to Total on menu page', async ({ page }) => {
  const menuPage = new MenuPage(page);
      
  await menuPage.open();
  await menuPage.clickCappucinoCup();

  await menuPage.assertTotalCheckoutContainsValue('Total: $19.00');
});