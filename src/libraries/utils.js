const chalk = require('chalk');
const clear = require('clear');

const printEr = (errorMessage, exitProgram = true) => {
  Array.isArray(errorMessage)
    ? errorMessage.forEach((message, index) => {
        index === 0
          ? console.error(`${chalk.red('Error:')} ${message}`)
          : console.error(`       ${message}`);
    })
    : console.error(`${chalk.red('Error:')} ${errorMessage}`);
  if (exitProgram) process.exit();
};

const printLn = (message, clearConsole = false) => {
  if (clearConsole) clear();
  Array.isArray(message)
    ? message.forEach((msg) => console.log(msg))
    : console.log(message);
};

module.exports = {
  printEr,
  printLn,
};
