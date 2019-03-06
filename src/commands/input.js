const chalk = require('chalk');
const path = require('path');

const {readFile} = require('../libraries/files');
const {printLn} = require('../libraries/utils');

module.exports = (args) => {
  const filePath = args.input;
  if (path.extname(filePath) === '.css') {
    const fileString = readFile(filePath);
    printLn(fileString, true);
  } else {
    printLn(chalk.red(`ERROR: "${filePath}" is not a valid CSS file.`), true);
  }
};
