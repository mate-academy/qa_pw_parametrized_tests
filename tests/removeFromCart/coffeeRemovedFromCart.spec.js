import { test } from '../_fixtures/fixtures';

['Cappuccino', 'Espresso'].forEach(coffee => {
  test(`Check ${coffee} removed from Cart after clicking remove`
    , async ({ menuPage, cartPage }) => {
    await menuPage.open();
    await menuPage.clickCoffeeCup(coffee);

    await menuPage.clickCartLink();
    await cartPage.waitForLoading();

    await cartPage.clickRemoveAll(coffee);
    await cartPage.assertNoCoffeeMessageIsVisible();
  });
});