const Division = require('../../src/operations/Division');

describe('Division', () => {
    test('divides 6 / 2 to equal 3', () => {
        const division = new Division();
        expect(division.calculate(6, 2)).toBe(3);
    });

    test('divides -10 / 2 to equal -5', () => {
        const division = new Division();
        expect(division.calculate(-10, 2)).toBe(-5);
    });

    test('throws error on division by zero', () => {
        const division = new Division();
        expect(() => division.calculate(1, 0)).toThrow('Division by zero');
    });
});
