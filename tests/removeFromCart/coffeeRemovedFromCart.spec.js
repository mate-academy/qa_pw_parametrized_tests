import { test } from '../_fixtures/fixtures';
import { COFFEE_NAMES } from '../../src/constants';

const parameters = [
    {
        coffeeName: COFFEE_NAMES.cappuccino,
    },
    {
        coffeeName: COFFEE_NAMES.espresso,
    },
];

parameters.forEach(parameter => {
    test(`Check ${parameter.coffeeName} removed from Cart after clicking remove`, async ({
        menuPage,
        cartPage,
    }) => {
        await menuPage.open();
        await menuPage.clickCoffeeCup(parameter.coffeeName);

        await menuPage.clickCartLink();
        await cartPage.waitForLoading();

        await cartPage.clickRemoveAllCoffeeButton(parameter.coffeeName);
        await cartPage.assertNoCoffeeMessageIsVisible();
    });
});
