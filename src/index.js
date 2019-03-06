const chalk = require('chalk');
const clear = require('clear');

const {findFiles} = require('./lib/files');
const {getFilePath} = require('./lib/inquirer');
const {printLn} = require('./lib/utils');

const run = async () => {
  const files = findFiles('js');

  if (files.length) {
    const {filePath} = await getFilePath(files);
    console.log(filePath);
  } else {
    printLn(chalk.red('Could not find any CSS file.'), true);
  }
};

clear();
run();
