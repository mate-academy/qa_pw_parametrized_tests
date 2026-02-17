import { test } from '../_fixtures/fixtures';
import { COFFEE_NAMES } from '../../src/constants';

const testParameters = Object.values(COFFEE_NAMES).map(coffee => ({ coffee }));

testParameters.forEach(({ coffee }) => {
  test(`Check ${coffee} removed from Cart after clicking remove`, async ({
    cartPage,
    menuPage,
  }) => {
    await menuPage.open();
    await menuPage.clickCoffeeCup(coffee);

    await menuPage.clickCartLink();
    await cartPage.waitForLoading();

    await cartPage.clickRemoveAllCoffeeButton(coffee);
    await cartPage.assertNoCoffeeMessageIsVisible();
  });
});
