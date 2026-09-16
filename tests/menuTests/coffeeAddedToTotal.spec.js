import { test } from '../_fixtures/fixtures';

import { totalPriceFormatStr } from '../../src/common/priceFormatters';

import { COFFEE_NAMES, COFFEE_PRICES } from '../../src/constants';

const coffeeTypes = [
  ['espresso', COFFEE_NAMES.espresso, COFFEE_PRICES.espresso],
  [
    'espressoMacchiato',
    COFFEE_NAMES.espressoMacchiato,
    COFFEE_PRICES.espressoMacchiato,
  ],
  ['cappuccino', COFFEE_NAMES.cappuccino, COFFEE_PRICES.cappuccino],
  ['mocha', COFFEE_NAMES.mocha, COFFEE_PRICES.mocha],
  ['flatWhite', COFFEE_NAMES.flatWhite, COFFEE_PRICES.flatWhite],
  ['americano', COFFEE_NAMES.americano, COFFEE_PRICES.americano],
  ['cafeLatte', COFFEE_NAMES.cafeLatte, COFFEE_PRICES.cafeLatte],
  [
    'espressoConPanna',
    COFFEE_NAMES.espressoConPanna,
    COFFEE_PRICES.espressoConPanna,
  ],
  ['cafeBreve', COFFEE_NAMES.cafeBreve, COFFEE_PRICES.cafeBreve],
];

for (const [coffeeKey, coffeeName, coffeePrice] of coffeeTypes) {
  test(`Check ${coffeeName} cost is added to Total on menu page`, async ({
    menuPage,
  }) => {
    const totalPriceStr = totalPriceFormatStr(coffeePrice);

    await menuPage.open();

    await menuPage.clickCoffeeCup(coffeeName);

    await menuPage.assertTotalCheckoutContainsValue(totalPriceStr);
  });
}
