import { test } from '../_fixtures/fixtures';
import { priceFormatStr } from '../../src/common/priceFormatters';
import { COFFEE_NAMES, COFFEE_PRICES } from '../../src/constants';

// Tworzymy tablicę parametrów dla wszystkich kaw
const testParameters = Object.entries(COFFEE_NAMES).map(([key, name]) => ({
  coffee: name,
  price: COFFEE_PRICES[key],
}));

// Parametryzowany test dla wszystkich kaw
testParameters.forEach(({ coffee, price }) => {
  test(`Check ${coffee} cup has correct cost`, async ({ menuPage }) => {
    const priceStr = priceFormatStr(price);

    await menuPage.open();

    // Używamy poprawnej metody z MenuPage do sprawdzenia ceny kawy
    await menuPage.assertCoffeeCupCostHasValue(coffee, priceStr);
  });
});
