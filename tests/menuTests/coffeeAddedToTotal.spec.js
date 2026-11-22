import { test } from '../_fixtures/fixtures';
import { totalPriceFormatStr } from '../../src/common/priceFormatters';
import { COFFEE_NAMES, COFFEE_PRICES } from '../../src/constants';

const par = [];
const coffeeKeys = Object.keys(COFFEE_NAMES);

for (let i = 0; i < coffeeKeys.length; i++) {
  let key = coffeeKeys[i];

  par.push({
    coffeeName : COFFEE_NAMES[key],
    price : COFFEE_PRICES[key],
  });
}

par.forEach(({ coffeeName, price }) => {
  test(`Check ${coffeeName} cost is added to Total pn menu`, async( {menuPage} ) => {
    const totalPriceStr = totalPriceFormatStr(price);

    await menuPage.open();
    await menuPage.clickCup(coffeeName);
    await menuPage.assertTotalCheckoutContainsValue(totalPriceStr);
  });
})