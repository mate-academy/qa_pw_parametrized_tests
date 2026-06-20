import { test } from '../_fixtures/fixtures';
import { COFFEE_NAMES, COFFEE_PRICES } from '../../src/constants';
import { totalPriceFormatStr } from '../../src/common/priceFormatters';

const parameters = [
    {
        coffeeName: COFFEE_NAMES.cappuccino,
        totalPrice: COFFEE_PRICES.cappuccino,
    },
    {
        coffeeName: COFFEE_NAMES.espresso,
        totalPrice: COFFEE_PRICES.espresso,
    },
    {
        coffeeName: COFFEE_NAMES.espressoMacchiato,
        totalPrice: COFFEE_PRICES.espressoMacchiato,
    },
    {
        coffeeName: COFFEE_NAMES.mocha,
        totalPrice: COFFEE_PRICES.mocha,
    },
    {
        coffeeName: COFFEE_NAMES.flatWhite,
        totalPrice: COFFEE_PRICES.flatWhite,
    },
    {
        coffeeName: COFFEE_NAMES.americano,
        totalPrice: COFFEE_PRICES.americano,
    },
    {
        coffeeName: COFFEE_NAMES.cafeLatte,
        totalPrice: COFFEE_PRICES.cafeLatte,
    },
    {
        coffeeName: COFFEE_NAMES.espressoConPanna,
        totalPrice: COFFEE_PRICES.espressoConPanna,
    },
    {
        coffeeName: COFFEE_NAMES.cafeBreve,
        totalPrice: COFFEE_PRICES.cafeBreve,
    }
];

for (const parameter of parameters) {
    test(`add ${parameter.coffeeName} to total`, async ({ menuPage }) => {
        const formattedPrice = totalPriceFormatStr(parameter.totalPrice);

        await menuPage.open();

        await menuPage.clickCoffeeCup(parameter.coffeeName);

        await menuPage.assertTotalCheckoutContainsValue(formattedPrice);
    });
}
