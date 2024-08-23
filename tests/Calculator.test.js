const Calculator = require('../src/Calculator');

describe('Calculator', () => {
    let calculator;

    beforeEach(() => {
        calculator = new Calculator();
    });

    test('calculates 1 + 2', () => {
        expect(calculator.calculate('1 + 2')).toBe(3);
    });

    test('calculates 3 - 1', () => {
        expect(calculator.calculate('3 - 1')).toBe(2);
    });

    test('calculates 2 * 3', () => {
        expect(calculator.calculate('2 * 3')).toBe(6);
    });

    test('calculates 6 / 2', () => {
        expect(calculator.calculate('6 / 2')).toBe(3);
    });

    test('calculates 2 + 3 * 4 - 5 / 5', () => {
        expect(calculator.calculate('2 + 3 * 4 - 5 / 5')).toBe(13);
    });

    test('calculates 3 + 4 * (2 - 1)', () => {
        expect(calculator.calculate('3 + 4 * (2 - 1)')).toBe(7);
    });

    test('calculates (1 + 2) * (3 + 4)', () => {
        expect(calculator.calculate('(1 + 2) * (3 + 4)')).toBe(21);
    });

    test('calculates 1 + 2 - 3 * 4 / 2', () => {
        expect(calculator.calculate('1 + 2 - 3 * 4 / 2')).toBe(-3);
    });

    test('calculates -3 + 4 * (2 - (-1 + 3) / (+2 + 2)) * -3 - (-5) / 2 + (4 - +1) * -3', () => {
        expect(
            calculator.calculate(
                '-3 + 4 * (2 - (-1 + 3) / (+2 + 2)) * -3 - (-5) / 2 + (4 - +1) * -3'
            )
        ).toBe(-27.5);
    });

    test('throws error on invalid expression', () => {
        expect(() => calculator.calculate('invalid')).toThrow(
            'Invalid expression'
        );
    });

    test('throws error on division by zero', () => {
        expect(() => calculator.calculate('1 / 0')).toThrow('Division by zero');
    });
});

describe('Testing the addition of new operations', () => {
    let calculator;

    beforeEach(() => {
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

        calculator = new Calculator();
        calculator.addOperation('^', new Power(), 3); // Elevation to a degree has the highest precedence
        calculator.addOperation('$', new SomethingElse(), 1);
    });

    test('calculates 2 ^ 3', () => {
        expect(calculator.calculate('2 ^ 3')).toBe(8);
    });

    test('calculates 1 $ 2', () => {
        expect(calculator.calculate('2 $ 3')).toBe(5);
    });
});
