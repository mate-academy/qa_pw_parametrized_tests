import { test } from '../_fixtures/fixtures';
import { COFFEE_NAMES, COFFEE_PRICES } from '../../src/constants';
import { priceFormatStr } from '../../src/common/priceFormatters';

const parameters = [
    {
        coffeeName: COFFEE_NAMES.cappuccino,
        price: COFFEE_PRICES.cappuccino,
    },
    {
        coffeeName: COFFEE_NAMES.espresso,
        price: COFFEE_PRICES.espresso,
    },
    {
        coffeeName: COFFEE_NAMES.espressoMacchiato,
        price: COFFEE_PRICES.espressoMacchiato,
    },
    {
        coffeeName: COFFEE_NAMES.mocha,
        price: COFFEE_PRICES.mocha,
    },
    {
        coffeeName: COFFEE_NAMES.flatWhite,
        price: COFFEE_PRICES.flatWhite,
    },
    {
        coffeeName: COFFEE_NAMES.americano,
        price: COFFEE_PRICES.americano,
    },
    {
        coffeeName: COFFEE_NAMES.cafeLatte,
        price: COFFEE_PRICES.cafeLatte,
    },
    {
        coffeeName: COFFEE_NAMES.espressoConPanna,
        price: COFFEE_PRICES.espressoConPanna,
    },
    {
        coffeeName: COFFEE_NAMES.cafeBreve,
        price: COFFEE_PRICES.cafeBreve,
    },
];

parameters.forEach(parameter => {
    test(`Check ${parameter.coffeeName} cup has correct cost`, async ({
        menuPage,
    }) => {
        const price = priceFormatStr(parameter.price);

        await menuPage.open();

        await menuPage.assertCoffeeCupCostHasValue(parameter.coffeeName, price);
    });
});
