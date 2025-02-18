import { test } from '@playwright/test';
import { MenuPage } from '../../src/pages/MenuPage';

test('Check Espresso cup has correct cost', async ({ page }) => {
  const menuPage = new MenuPage(page);

  await menuPage.open();

  await menuPage.assertEspressoCupCostHasValue('$10.00');
});
