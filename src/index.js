const argv = require('minimist')(process.argv.slice(2));
const chalk = require('chalk');
const clear = require('clear');
const path = require('path');

const {findFiles, readFile} = require('./lib/files');
const {getFilePath} = require('./lib/inquirer');
const {printLn} = require('./lib/utils');

const run = async () => {
  if (argv.i || argv.input) {
    const filePath = argv.f || argv.file;
    if (path.extname(filePath) === '.css') {
      const fileString = readFile(filePath);
      printLn(fileString, true);
    } else {
      printLn(chalk.red(`ERROR: "${filePath}" is not a valid CSS file.`), true);
    }
  } else {
    const files = findFiles('css');
    if (files.length) {
      const {filePath} = await getFilePath(files);
      const fileString = readFile(filePath);
      printLn(fileString, true);
    } else {
      printLn(chalk.red('ERROR: Could not find any CSS file.'), true);
    }
  }
};

clear();
run();
