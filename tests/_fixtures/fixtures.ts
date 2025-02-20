import { test as base } from '@playwright/test';
import { MenuPage } from '../../src/pages/MenuPage';
import { CartPage } from '../../src/pages/CartPage';

export const test = base.extend<{
  cartPage;
  menuPage;
  prices;
}>({
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);

    await use(cartPage);
  },
  menuPage: async ({ page }, use) => {
    const menuPage = new MenuPage(page);

    await use(menuPage);
  },
  prices: async ({}, use) => {
    const prices = {
      espresso: 10,
      espressoMacchiato: 12,
      cappuccino: 19,
      mocha: 8,
      discountedMocha: 4,
      flatWhite: 18,
      americano: 7,
      cafeLatte: 16,
      espressoConPanna: 14,
      cafeBreve: 15,
    };

    await use(prices);
  },
});
