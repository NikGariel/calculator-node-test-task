const readline = require('readline');
const Calculator = require('./Calculator');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const calculator = new Calculator();

rl.question('Введите выражение: ', (input) => {
    try {
        const result = calculator.calculate(input);
        console.log(`Результат: ${result}`);
    } catch (error) {
        console.error(`Ошибка: ${error.message}`);
    } finally {
        rl.close();
    }
});
