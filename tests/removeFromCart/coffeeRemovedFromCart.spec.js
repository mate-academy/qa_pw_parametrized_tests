import { test } from '../_fixtures/fixtures';
import { COFFEE_NAMES } from '../../src/constants';

for (const coffee of Object.values(COFFEE_NAMES)) {
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
}