import { COFFEE_NAMES, COFFEE_PRICES } from '../constants';

export const coffee = Object.entries(COFFEE_NAMES).map(([key, name]) => ({
  name,
  price: COFFEE_PRICES[key],
  actionClick: async ({ menuPage }) => {
    await menuPage.clickCoffeeCup(name);
  },
  assertCostHasValue: async (price, { menuPage }) => {
    await menuPage.assertCoffeeCupCostHasValue(name, price);
  },
  assertRemoveFromCart: async ({ cartPage }) => {
    await cartPage.clickRemoveAllCoffeeButton(name);
  },
}));
