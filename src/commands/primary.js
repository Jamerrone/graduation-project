const chalk = require('chalk');
const clear = require('clear');

const {findFiles, readFile} = require('../libraries/files');
const {getFilePath} = require('../libraries/inquirer');
const {printLn} = require('../libraries/utils');

module.exports = async () => {
  const files = findFiles('css');

  if (files.length) {
    clear();
    const {filePath} = await getFilePath(files);
    const fileString = readFile(filePath);
    printLn(fileString, true);
  } else {
    printLn(chalk.red('ERROR: Could not find any CSS file.'), true);
  }
};
