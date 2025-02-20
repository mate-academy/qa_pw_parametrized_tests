import { test } from '../_fixtures/fixtures';

test('Check Cappuccino removed from Cart after clicking remove', async ({
  cartPage,
  menuPage,
}) => {
  await menuPage.open();
  await menuPage.clickCappucinoCup();

  await menuPage.clickCartLink();
  await cartPage.waitForLoading();

  await cartPage.clickRemoveAllCappucinoButton();
  await cartPage.assertNoCoffeeMessageIsVisible();
});
