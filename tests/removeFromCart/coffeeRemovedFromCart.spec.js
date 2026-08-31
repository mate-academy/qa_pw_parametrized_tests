import { test } from '../_fixtures/fixtures';
import { COFFEE_NAMES } from '../../src/constants';

const coffees = Object.values(COFFEE_NAMES);

coffees.forEach((coffee) => {
  test(`Check ${coffee} removed from Cart after clicking remove`, async ({
    cartPage,
    menuPage,
  }) => {
    await menuPage.open();
    await menuPage.clickCoffeeCup(coffee);

    await menuPage.clickCartLink();
    await cartPage.waitForLoading();

    await cartPage.clickRemoveAllButton(coffee);
    await cartPage.assertNoCoffeeMessageIsVisible();
  });
});