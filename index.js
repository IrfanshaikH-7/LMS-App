const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter the first number: ', (num1) => {
    rl.question('Enter the second number: ', (num2) => {
        rl.question('Enter the operation (+, -, *, /): ', (operation) => {
            const number1 = parseFloat(num1);
            const number2 = parseFloat(num2);
            let result;

            switch (operation) {
                case '+':
                    result = number1 + number2;
                    break;
                case '-':
                    result = number1 - number2;
                    break;
                case '*':
                    result = number1 * number2;
                    break;
                case '/':
                    if (number2 !== 0) {
                        result = number1 / number2;
                    } else {
                        result = 'Error: Division by zero';
                    }
                    break;
                default:
                    result = 'Error: Invalid operation';
            }

            console.log(`The result is: ${result}`);
            rl.close();
        });
    });
});