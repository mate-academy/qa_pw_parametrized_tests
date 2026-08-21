import { test } from '../_fixtures/fixtures';
import {
  totalPriceFormatStr,
} from '../../src/common/priceFormatters';
import { COFFEE_NAMES, COFFEE_PRICES } from '../../src/constants';

let testParameters = [];

for (const [key, value] of Object.entries(COFFEE_NAMES)) {
  testParameters.push({ coffee: value, price: COFFEE_PRICES[key] });
}

testParameters.forEach(({ coffee, price }) => {
  test(`Price of ${coffee} correctly added to total`, async ({
    menuPage
  }) => {
    const totalPriceStr = totalPriceFormatStr(price);

    await menuPage.open();
    await menuPage.clickCoffeeCup(coffee);

    await menuPage.assertTotalCheckoutContainsValue(totalPriceStr);
  });
});

/*Object.entries(COFFEE_NAMES) turns an object into pairs of [key, value]:
{ espresso: 'Espresso' } → ['espresso', 'Espresso']

The loop goes through each pair:
key → used to get the price: COFFEE_PRICES[key]
value → the display name: 'Espresso'

push adds one item per coffee to the array:
{ coffee: 'Espresso', price: 10 }
 */


/*
import { test } from '../_fixtures/fixtures';
import { totalPriceFormatStr } from '../../src/common/priceFormatters';
import { COFFEE_PRICES } from '../../src/constants';

test('Check Cappuccino cost is added to Total on menu page', async ({
  menuPage,
}) => {
  const totalPriceStr = totalPriceFormatStr(COFFEE_PRICES.cappuccino);

  await menuPage.open();
  await menuPage.clickCappucinoCup();

  await menuPage.assertTotalCheckoutContainsValue(totalPriceStr);
});*/
