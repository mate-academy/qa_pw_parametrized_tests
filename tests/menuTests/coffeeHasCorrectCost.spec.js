import { test } from '../_fixtures/fixtures';
import { priceFormatStr } from '../../src/common/priceFormatters';
import { coffee } from '../../src/common/coffee';

coffee.forEach(coffee => {
    test(`Check ${coffee.name} cup has correct cost`, async ({ menuPage }) => {
        const price = priceFormatStr(coffee.price);

        await menuPage.open();
        // await coffee.actionClick({ menuPage });

        await coffee.assertCostHasValue(price, { menuPage });
    });
});
