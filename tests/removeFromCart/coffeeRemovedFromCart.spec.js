import { test } from '../_fixtures/fixtures';
import { COFFEE_NAMES } from '../../src/constants';

// Tworzymy tablicę parametrów dla wszystkich kaw
const testParameters = Object.entries(COFFEE_NAMES).map(([key, name]) => ({
  coffee: name,
}));

testParameters.forEach(({ coffee }) => {
  test(`Check ${coffee} removed from Cart after clicking remove`, async ({
    menuPage,
    cartPage,
  }) => {
    await menuPage.open();

    // Uniwersalna metoda do kliknięcia kawy
    await menuPage.clickCoffeeCup(coffee);

    await menuPage.clickCartLink();
    await cartPage.waitForLoading();

    // Uniwersalna metoda do kliknięcia "remove" dla danej kawy
    await cartPage.clickRemoveButton(coffee);

    // Sprawdzenie, że koszyk jest pusty / wiadomość widoczna
    await cartPage.assertNoCoffeeMessageIsVisible();
  });
});
