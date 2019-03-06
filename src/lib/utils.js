const clear = require('clear');

const printLn = (message, clearConsole) => {
  if (clearConsole) clear();
  console.log(message);
};

module.exports = {
  printLn,
};
