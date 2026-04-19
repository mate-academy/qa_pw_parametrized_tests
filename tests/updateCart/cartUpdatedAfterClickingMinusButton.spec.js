import { test } from '../_fixtures/fixtures';
import { COFFEE_NAMES } from '../../src/constants';

test('Assert cart updated correctly after clicking minus for drinks', async ({
  cartPage,
  menuPage,
}) => {
  await menuPage.open();
  await menuPage.clickCoffeeCup(COFFEE_NAMES.espresso);

  await menuPage.clickCartLink();
  await cartPage.waitForLoading();

  await cartPage.assertCoffeeIsVisible(COFFEE_NAMES.espresso);

  await cartPage.removeOneCoffeeButtonClick(COFFEE_NAMES.espresso);

  await cartPage.assertCoffeeIsHidden(COFFEE_NAMES.espresso);
  
  await cartPage.assertNoCoffeeMessageIsVisible();
});
