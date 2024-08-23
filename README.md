# Node-Calculator test task

TDD and SOLID principles were used in the development of this project

Fully automatic start (npm install + testing + prettier fix + linter check)

```shell
npm run fullyStart
```

Test run

```shell
npm run test
```

Example with verbose

```shell
npm run example
```

Example how to add new operation

```js
/**
 * Method to add a new operation
 * @param {string} symbol
 * @param {object} operation
 * @param {number} precedence
 */

const Calculator = require('./src/Calculator');

const calculator = new Calculator();

class Power {
    calculate(a, b) {
        return Math.pow(a, b);
    }
}

class SomethingElse {
    calculate(a, b) {
        return a * b + a - b;
    }
}

calculator.addOperation('^', new Power(), 3);
calculator.addOperation('$', new SomethingElse(), 1);

console.log(calculator.calculate('2 ^ 3')); // 8
console.log(calculator.calculate('2 $ 3')); // 5
```
