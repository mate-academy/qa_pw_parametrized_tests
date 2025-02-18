import { test } from '@playwright/test';
import { MenuPage } from '../../src/pages/MenuPage';
import { CartPage } from '../../src/pages/CartPage';

test('Assert cart updated correctly after clicking plus for drinks', async ({
  page,
}) => {
  const menuPage = new MenuPage(page);
  const cartPage = new CartPage(page);

  await menuPage.open();
  await menuPage.clickCappucinoCup();
  await menuPage.clickEspressoCup();

  await menuPage.clickCartLink();
  await cartPage.waitForLoading();

  await cartPage.assertEspressoTotalCostContainsCorrectText('$10.00');

  await cartPage.clickAddOneEspressoButton();

  await cartPage.assertEspressoTotalCostContainsCorrectText('$20.00');
  await cartPage.assertCappuccinoTotalCostContainsCorrectText('$19.00');

  await cartPage.clickAddOneCappuccinoButton();

  await cartPage.assertCappuccinoTotalCostContainsCorrectText('$38.00');
  await cartPage.assertEspressoTotalCostContainsCorrectText('20.00');

  await cartPage.assertTotalCheckoutContainsValue('$58.00');
});
