const chalk = require('chalk');
const clear = require('clear');

const printEr = (errorMessage, exitProgram = true) => {
  console.error(`${chalk.red('Error:')} ${errorMessage}`);
  if (exitProgram) process.exit();
};

const printLn = (message, clearConsole = false) => {
  if (clearConsole) clear();
  console.log(message);
};

module.exports = {
  printEr,
  printLn,
};
