import { test } from '../_fixtures/fixtures';
import { COFFEE_NAMES } from '../../src/constants';

const testParameters = Object.entries(COFFEE_NAMES)
  .map(([, label]) => ({ coffeeType: label }));

testParameters.forEach(({ coffeeType }) => {
  test(`Check ${coffeeType} removed from Cart after clicking remove`
    , async ({ menuPage, cartPage }) => {
    await menuPage.open();
    await menuPage.clickCoffeeCup(coffeeType);

    await menuPage.clickCartLink();
    await cartPage.waitForLoading();

    await cartPage.clickRemoveAll(coffeeType);
    await cartPage.assertNoCoffeeMessageIsVisible();
  });
});