import { test } from '../_fixtures/fixtures';

const testParameters = [
  {
    label: 'Cappuccino',
  },
  {
    label: 'Espresso',
  },
];

testParameters.forEach(({label}) =>{
  test.describe('Check coffee removed from cart', () => {
    test(`Check ${label} removed from Cart after clicking remove`, async ({
      cartPage,
      menuPage,
    }) => {
      await menuPage.open();
      await menuPage.clickCoffeeCup('Cappuccino');

      await menuPage.clickCartLink();
      await cartPage.waitForLoading();

      await cartPage.clickRemoveAllCoffeeItemButton('Cappuccino');
      await cartPage.assertNoCoffeeMessageIsVisible();
    });
  });
});