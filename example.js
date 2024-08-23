const Calculator = require('./src/Calculator');

const calculator = new Calculator(true);

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
