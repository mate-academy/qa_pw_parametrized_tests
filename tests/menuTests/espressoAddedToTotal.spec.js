import { test } from '@playwright/test';
import { MenuPage } from '../../src/pages/MenuPage';

test('Check Espresso cost is added to Total on menu page', async ({ page }) => {
  const menuPage = new MenuPage(page);

  await menuPage.open();
  await menuPage.clickEspressoCup();

  await menuPage.assertTotalCheckoutContainsValue('Total: $10.00');
});
