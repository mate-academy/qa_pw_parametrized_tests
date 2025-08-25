import { test } from '../_fixtures/fixtures';
import { COFFEE_NAMES } from '../../src/constants';

let testParameters = [];
for (const value of Object.values(COFFEE_NAMES)) {
  testParameters.push({
    coffeeName: value,
  });
}

testParameters.forEach(({coffeeName}) => {

  test(
    `Remove coffee ${coffeeName} from cart`, 
    async ({
      menuPage,
      cartPage
  }) => {

    await menuPage.open();
    await menuPage.addCoffeeCupToCart(coffeeName);
    await menuPage.clickCartLink();
    await cartPage.waitForLoading();
    await cartPage.clickRemoveCoffeeButton(coffeeName);
    await cartPage.assertNoCoffeeMessageIsVisible();

  });

});
