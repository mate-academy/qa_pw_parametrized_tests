# Practice task: Parametrized tests for CoffeeCart

## Preparation:
1. Open the forked repo in VSCode.
2. Create a new branch: git checkout -b added_article_test
3. Run the installation commands `npm ci` & `npx playwright install`.

## Main task:
1. Parametrize test cases for CoffeeCart to test different coffees:
- *coffeeAddedToCart.spec.js*
- *coffeeAddedToTotal.spec.js*
- *coffeeHasCorrectCost.spec.js*
- *coffeeRemovedFromCart.spec.js*
2. Create new methods to be working for any type of coffee (without hardcoded names) in the Page classes.
3. Use as en example:
- `coffeeCupAddedToCart.spec.js` 
4. Remove old redundant methods (with hardcoded names) from the Page classes. 
2. Re-run all your tests and make sure they pass after the updates. 


## Task Reporting: 
1. Add and commit all your updates. 
2. Push the code to the origin.
3. Create PR for your changes. 
4. Fix all the suggestions from the Code review until PR is approved.  

