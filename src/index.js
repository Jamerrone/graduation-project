const chalk = require('chalk');
const clear = require('clear');

const {findFiles, readFile} = require('./lib/files');
const {getFilePath} = require('./lib/inquirer');
const {printLn} = require('./lib/utils');

const run = async () => {
  const files = findFiles('js');

  if (files.length) {
    const {filePath} = await getFilePath(files);
    const fileString = readFile(filePath);

    printLn(fileString, true);
  } else {
    printLn(chalk.red('Could not find any CSS file.'), true);
  }
};

clear();
run();
