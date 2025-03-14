# Parametrized Tests for CoffeeCart

## Preparation

1. Open the forked repo in VSCode.
2. Create a new branch by running `git checkout -b task_solution`.
3. Run the installation commands: `npm ci` and `npx playwright install`.

## Task

1. Parametrize test cases for CoffeeCart to test different coffees:
    - *coffeeAddedToCart.spec.js*
    - *coffeeAddedToTotal.spec.js*
    - *coffeeHasCorrectCost.spec.js*
    - *coffeeRemovedFromCart.spec.js*
2. Create new methods to work for any coffee (without hardcoded names) in the page classes.
3. Use `coffeeCupAddedToCart.spec.js`  as an example.
4. Remove old redundant methods (with hardcoded names) from the page classes. 
5. Re-run all your tests and make sure they pass after the updates. 

## Task Reporting

1. Add and commit all your updates. 
2. Push the code to the origin.
3. Create PR for your changes. 
4. Fix all the suggestions from the code review until PR is approved.  
