import { test } from '../_fixtures/fixtures';
import { totalPriceFormatStr } from '../../src/common/priceFormatters';
import { COFFEE_NAMES, COFFEE_PRICES } from '../../src/constants';

// Tworzymy tablicę parametrów dla wszystkich kaw
const testParameters = Object.entries(COFFEE_NAMES).map(([key, name]) => ({
  coffee: name,
  price: COFFEE_PRICES[key],
}));

// Parametryzowany test dla wszystkich kaw
testParameters.forEach(({ coffee, price }) => {
  test(`Check ${coffee} cost is added to Total on menu page`, async ({
    menuPage,
  }) => {
    const totalPriceStr = totalPriceFormatStr(price);

    await menuPage.open();

    // Uniwersalna metoda zamiast clickCappuccinoCup / clickEspressoCup
    await menuPage.clickCoffeeCup(coffee);

    // Sprawdzenie, czy cena kawy jest poprawnie dodana do total
    await menuPage.assertTotalCheckoutContainsValue(totalPriceStr);
  });
});
