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

  await menuPage.clickYesPromoButton();

  await menuPage.clickCartLink();
  await cartPage.waitForLoading();

  await cartPage.assertEspressoTotalCostContainsCorrectText('$10.00');
  await cartPage.assertDiscountedMochaTotalCostContainsCorrectText('$4.00');
  await cartPage.assertCappuccinoTotalCostContainsCorrectText('$19.00');
  await cartPage.assertAmericanoTotalCostContainsCorrectText('$7.00');
});
