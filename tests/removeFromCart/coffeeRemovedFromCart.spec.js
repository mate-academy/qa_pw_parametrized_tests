import { test } from '../_fixtures/fixtures';
import { coffee } from '../../src/common/coffee';

coffee.forEach(coffee => {
  test(`Check ${coffee.name} removed from Cart after clicking remove`, async ({
    cartPage,
    menuPage,
  }) => {
    await menuPage.open();
    await coffee.actionClick({ menuPage });

    await menuPage.clickCartLink();
    await cartPage.waitForLoading();

    await coffee.assertRemoveFromCart({ cartPage });
    await cartPage.assertNoCoffeeMessageIsVisible();
  });
});
