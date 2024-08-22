class Division {
    /**
     * @param {number} a
     * @param {number} b
     */
    calculate(a, b) {
        if (b === 0) throw new Error('Division by zero');
        return a / b;
    }
}

module.exports = Division;
