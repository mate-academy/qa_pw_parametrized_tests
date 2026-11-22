import { test } from '../_fixtures/fixtures';
import { COFFEE_NAMES, COFFEE_PRICES } from '../../src/constants';

const par = [];
const key = Object.keys(COFFEE_NAMES);
for (let i = 0; i < key.length; i++) {

  let coffeeKey = key[i];
  par.push({
    coffeeName : COFFEE_NAMES[coffeeKey],
    price : COFFEE_PRICES[coffeeKey],
  });
}

par.forEach(({ coffeeName }) => {
  test(`Check ${coffeeName} removed from Cart after clicking remove`, async ({ cartPage, menuPage }) => {
    await menuPage.open();
    await menuPage.clickCup(coffeeName);

    await menuPage.clickCartLink();
    await cartPage.waitForLoading();

    await cartPage.clickRemoveAllCoffeeButton(coffeeName);
    await cartPage.assertNoCoffeeMessageIsVisible();
  });
})
