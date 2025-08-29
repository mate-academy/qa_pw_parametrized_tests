import { test } from '../_fixtures/fixtures';
import { totalPriceFormatStr } from '../../src/common/priceFormatters';
import { COFFEE_PRICES } from '../../src/constants';
import { COFFEE_NAMES } from '../../src/constants';

// Build params from names: key = id (for price), coffeeType = label (for UI)
const testParameters = Object.entries(COFFEE_NAMES).map(([key, label]) => ({
  key,               
  coffeeType: label, 
}));

testParameters.forEach(({ key, coffeeType }) => {
  test(`Check ${coffeeType} cost is added to Total on menu page`
    , async ({ menuPage }) => {
    const totalPriceStr = totalPriceFormatStr(COFFEE_PRICES[key]);

    await menuPage.open();
    await menuPage.clickCoffeeCup(coffeeType);
    await menuPage.assertTotalCheckoutContainsValue(totalPriceStr);
  });
});
