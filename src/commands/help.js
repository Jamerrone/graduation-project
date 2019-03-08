const chalk = require('chalk');

const {printLn} = require('../libraries/utils');

module.exports = () => {
  printLn([
    `${chalk.bold('Usage:')} firefly`,
    `       firefly [${chalk.cyan('-i | --input <path>')}] [${chalk.cyan(
        '-h | --help'
    )}] [${chalk.cyan('-v | --version')}]`,
    '',
    `${chalk.bold('Flags:')}`,
    `   ${chalk.cyan('-h, --help')}           Output usage information.`,
    `   ${chalk.cyan('-v, --version')}        Output the version number.`,
    '',
    `${chalk.bold('Options:')}`,
    `   ${chalk.cyan('-i, --input <path>')}   Specify the input file path.`,
  ]);
};
