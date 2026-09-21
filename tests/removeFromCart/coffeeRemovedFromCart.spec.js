import { test } from '../_fixtures/fixtures';
import { COFFEE_PRICES } from '../../src/constants';


const testParameters = [
  {coffeeType: 'Espresso', price: COFFEE_PRICES.espresso},
  {coffeeType: 'Cappuccino', price: COFFEE_PRICES.cappuccino},
]

testParameters.forEach(({coffeeType}) => {
  test(`Check ${coffeeType} removed from Cart after clicking remove`, async ({ menuPage, cartPage }) => {
    
    await menuPage.open();
    await menuPage.clickCoffeeCup(coffeeType);
    await menuPage.clickCartLink();
    
    await cartPage.waitForLoading();

    await cartPage.clickRemoveAllCoffeeButton(coffeeType);
    await cartPage.assertNoCoffeeMessageIsVisible();
  });
});
