import { test } from '../_fixtures/fixtures';
import { totalPriceFormatStr } from '../../src/common/priceFormatters';
import { coffee } from '../../src/common/coffee';

coffee.forEach(coffee => {
    test(`Check ${coffee.name} cost is added to Total on menu page`, async ({
        menuPage,
    }) => {
        const totalPriceStr = totalPriceFormatStr(coffee.price);

        await menuPage.open();
        await coffee.actionClick({ menuPage });

        await menuPage.assertTotalCheckoutContainsValue(totalPriceStr);
    });
});

