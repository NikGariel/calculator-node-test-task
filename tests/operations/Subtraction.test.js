const Subtraction = require('../../src/operations/Subtraction');

describe('Subtraction', () => {
    test('subtracts 2 - 1 to equal 1', () => {
        const subtraction = new Subtraction();
        expect(subtraction.calculate(2, 1)).toBe(1);
    });

    test('subtracts -1 - (-1) to equal 0', () => {
        const subtraction = new Subtraction();
        expect(subtraction.calculate(-1, -1)).toBe(0);
    });

    test('subtracts 0 - 1 to equal -1', () => {
        const subtraction = new Subtraction();
        expect(subtraction.calculate(0, 1)).toBe(-1);
    });
});
