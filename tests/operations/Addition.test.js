const Addition = require('../../src/operations/Addition');

describe('Addition', () => {
    test('adds 1 + 2 to equal 3', () => {
        const addition = new Addition();
        expect(addition.calculate(1, 2)).toBe(3);
    });

    test('adds -1 + -1 to equal -2', () => {
        const addition = new Addition();
        expect(addition.calculate(-1, -1)).toBe(-2);
    });

    test('adds 0 + 0 to equal 0', () => {
        const addition = new Addition();
        expect(addition.calculate(0, 0)).toBe(0);
    });
});
