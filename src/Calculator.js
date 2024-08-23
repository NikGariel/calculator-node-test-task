const Addition = require('./operations/Addition');
const Subtraction = require('./operations/Subtraction');
const Multiplication = require('./operations/Multiplication');
const Division = require('./operations/Division');

class Calculator {
    constructor(verbose = false) {
        this.operations = {};
        this.precedence = {};
        this.verbose = verbose;

        // Initialize default operations with their precedence
        this.addOperation('+', new Addition(), 1);
        this.addOperation('-', new Subtraction(), 1);
        this.addOperation('*', new Multiplication(), 2);
        this.addOperation('/', new Division(), 2);
    }

    /**
     * Method to add a new operation
     * @param {string} symbol
     * @param {object} operation
     * @param {number} precedence
     */
    addOperation(symbol, operation, precedence) {
        if (Object.prototype.hasOwnProperty.call(this.operations, symbol)) {
            throw new Error(
                `Operation with symbol '${symbol}' is already registered.`
            );
        }
        this.operations[symbol] = operation;
        this.precedence[symbol] = precedence;
    }

    /**
     * Generate a dynamic regex pattern for parsing the expression
     * @returns {RegExp}
     */
    generateRegex() {
        const operatorSymbols = Object.keys(this.operations)
            .map((op) => `\\${op}`)
            .join('|');
        return new RegExp(`(\\d+\\.?\\d*|${operatorSymbols}|\\(|\\))`, 'g');
    }

    /**
     * Method for parsing the input mathematical expression
     * @param {string} expression
     */
    parse(expression) {
        const regex = this.generateRegex();
        const tokens = expression.match(regex);
        if (!tokens) throw new Error('Invalid expression');

        // Process unary operators
        for (let i = 0; i < tokens.length; i++) {
            if (
                (tokens[i] === '-' || tokens[i] === '+') &&
                (i === 0 ||
                    tokens[i - 1] === '(' ||
                    tokens[i - 1] in this.operations)
            ) {
                tokens[i + 1] = tokens[i] + tokens[i + 1];
                tokens.splice(i, 1);
            }
        }

        if (this.verbose) {
            console.log('Parsed tokens:', tokens);
        }

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

        /**
         * Function for applying an operation to two numbers
         * @param a {number}
         * @param b {number}
         * @param op {string}
         * @returns {number}
         */
        const applyOp = (a, b, op) => {
            if (a === undefined || b === undefined) {
                throw new Error(
                    `Invalid operands for operation: ${a} ${op} ${b}`
                );
            }
            const result = this.operations[op].calculate(a, b);
            if (this.verbose) {
                console.log(`Applying operation: ${a} ${op} ${b} = ${result}`);
            }
            return result;
        };

        for (let token of tokens) {
            if (!isNaN(parseFloat(token))) {
                // If the token is a number, add it to the value stack
                values.push(parseFloat(token));
                if (this.verbose) {
                    console.log('Number pushed to values stack:', values);
                }
            } else if (token === '(') {
                // If the token is an opening bracket, add to the operator stack
                ops.push(token);
                if (this.verbose) {
                    console.log('Operator pushed to ops stack:', ops);
                }
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
                if (this.verbose) {
                    console.log('Closed bracket processed, ops stack:', ops);
                }
            } else if (token in this.operations) {
                while (
                    ops.length &&
                    this.precedence[token] <=
                        this.precedence[ops[ops.length - 1]]
                ) {
                    const val2 = values.pop();
                    const val1 = values.pop();
                    const op = ops.pop();
                    const result = applyOp(val1, val2, op);
                    values.push(result);
                }
                ops.push(token);
                if (this.verbose) {
                    console.log('Operator pushed to ops stack:', ops);
                }
            }
        }

        // Обработка оставшихся операторов после цикла
        while (ops.length) {
            if (values.length < 2) {
                throw new Error(
                    'Invalid expression: not enough operands for operation.'
                );
            }
            const val2 = values.pop();
            const val1 = values.pop();
            const op = ops.pop();
            const result = applyOp(val1, val2, op);
            values.push(result);
        }

        if (this.verbose) {
            console.log('Final value:', values[0]);
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
