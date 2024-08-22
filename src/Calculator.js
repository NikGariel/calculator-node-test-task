const Addition = require('./operations/Addition');
const Subtraction = require('./operations/Subtraction');
const Multiplication = require('./operations/Multiplication');
const Division = require('./operations/Division');

class Calculator {
    constructor() {
        // Initialise an object with supported operations
        this.operations = {
            '+': new Addition(),
            '-': new Subtraction(),
            '*': new Multiplication(),
            '/': new Division(),
        };
    }

    // Method for parsing the input mathematical expression
    /**
     * @param {string} expression
     */
    parse(expression) {
        // Use regular expression to get tokens (numbers, operators and brackets)
        const tokens = expression.match(/(\d+\.?\d*|\+|-|\*|\/|\(|\))/g);
        if (!tokens) throw new Error('Invalid expression');
        return tokens;
    }

    /**
     * Method to calculate values based on tokens
     * @param {RegExpMatchArray} tokens
     * @return {number}
     */
    evaluate(tokens) {
        const values = [];
        const ops = [];

        // Function for determining the operator priority
        const precedence = (op) => {
            switch (op) {
                case '+':
                case '-':
                    return 1;
                case '*':
                case '/':
                    return 2;
                default:
                    return 0;
            }
        };

        /**
         * Function for applying an operation to two numbers
         * @param a {number}
         * @param b {number}
         * @param op {string}
         * @returns {number}
         */
        const applyOp = (a, b, op) => {
            return this.operations[op].calculate(a, b);
        };

        for (let token of tokens) {
            if (!isNaN(parseFloat(token))) {
                1;
                // If the token is a number, add it to the value stack
                values.push(parseFloat(token));
            } else if (token === '(') {
                // If the token is an opening bracket, add to the operator stack
                ops.push(token);
            } else if (token === ')') {
                // If the token is a closing bracket, calculate all operations up to the opening bracket
                while (ops.length && ops[ops.length - 1] !== '(') {
                    const val2 = values.pop();
                    const val1 = values.pop();
                    const op = ops.pop();
                    const result = applyOp(val1, val2, op);
                    values.push(result);
                }
                ops.pop(); // Remove the opening bracket
            } else if (token in this.operations) {
                while (
                    ops.length &&
                    precedence(token) <= precedence(ops[ops.length - 1])
                ) {
                    const val2 = values.pop();
                    const val1 = values.pop();
                    const op = ops.pop();
                    const result = applyOp(val1, val2, op);
                    values.push(result);
                }
                ops.push(token);
            }
        }

        while (ops.length) {
            const val2 = values.pop();
            const val1 = values.pop();
            const op = ops.pop();
            const result = applyOp(val1, val2, op);
            values.push(result);
        }

        return values[0];
    }

    /**
     * @param {string} expression
     * @returns {number}
     */
    calculate(expression) {
        const tokens = this.parse(expression);
        return this.evaluate(tokens);
    }
}

module.exports = Calculator;
