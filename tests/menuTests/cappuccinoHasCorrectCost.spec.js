import { test } from '@playwright/test';
import { MenuPage } from '../../src/pages/MenuPage';

test('Check Cappuccino cup has correct cost', async ({ page }) => {
  const menuPage = new MenuPage(page);

  await menuPage.open();

  await menuPage.assertCappuccinoCupCostHasValue('$19.00');
});
