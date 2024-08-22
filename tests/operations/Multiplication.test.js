const Multiplication = require('../../src/operations/Multiplication');

describe('Multiplication', () => {
    test('multiplies 2 * 3 to equal 6', () => {
        const multiplication = new Multiplication();
        expect(multiplication.calculate(2, 3)).toBe(6);
    });

    test('multiplies -1 * 1 to equal -1', () => {
        const multiplication = new Multiplication();
        expect(multiplication.calculate(-1, 1)).toBe(-1);
    });

    test('multiplies 0 * 100 to equal 0', () => {
        const multiplication = new Multiplication();
        expect(multiplication.calculate(0, 100)).toBe(0);
    });
});
