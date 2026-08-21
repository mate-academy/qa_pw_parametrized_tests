import { test } from '../_fixtures/fixtures';
import { COFFEE_NAMES } from '../../src/constants';

let testParameters = [];

for (const [key,value] of Object.entries(COFFEE_NAMES)) {
  testParameters.push({ coffee: value });
}

testParameters.forEach(({ coffee }) => {
  test(`Check that all ${coffee} was removed from cart`, async ({
    menuPage,
    cartPage
  }) => {
  
    await menuPage.open();
    await menuPage.clickCoffeeCup(coffee);
    await menuPage.clickCartLink();
    await cartPage.waitForLoading();

    await cartPage.clickRemoveAllCoffeeButton(coffee);
    await cartPage.assertNoCoffeeMessageIsVisible();
  }
  );  

})  


