import { test } from '../_fixtures/fixtures';
import {
  unitPriceFormatStr,
  priceFormatStr,
} from '../../src/common/priceFormatters';
import { COFFEE_NAMES, COFFEE_PRICES } from '../../src/constants';

let testParameters = [];
for (const [key, value] of Object.entries(COFFEE_NAMES)) {
  testParameters.push({
    coffeeName: value,
    coffeePrice: COFFEE_PRICES[key],
  });
}

testParameters.forEach(({coffeeName, coffeePrice}) => {

  test(`Add coffee cup ${coffeeName} to card`, async ({
    menuPage,
    cartPage,
  }) => {
    const coffeeUnitPrice = unitPriceFormatStr(coffeePrice, 1);
    const coffeeTotalPrice = priceFormatStr(coffeePrice);
    await menuPage.open();
    await menuPage.addCoffeeCupToCart(coffeeName);
    await menuPage.clickCartLink();
    await cartPage.waitForLoading();
    await cartPage.assertCoffeeNameContainsCorrectText(coffeeName);
    await cartPage.assertCoffeeUnitContainsCorrectText(
      coffeeName, coffeeUnitPrice
    );
    await cartPage.assertCoffeeTotalCostContainsCorrectText(
      coffeeName,
      coffeeTotalPrice,
    );
  });

});