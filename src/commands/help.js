const chalk = require('chalk');

const {printLn} = require('../libraries/utils');

module.exports = () => {
  printLn([
    `${chalk.bold('Usage:')} firefly ${chalk.yellow('or')}`,
    `       firefly [${chalk.cyan('-i | --input <path>')}] [${chalk.cyan(
        '-e | --export'
    )}] [${chalk.cyan('-w | --watch')}]
       [${chalk.cyan('-h | --help')}] [${chalk.cyan('-v | --version')}]`,
    '',
    `${chalk.bold('Flags:')}`,
    `   ${chalk.cyan('-e, --export')}         Export the generated report.`,
    `   ${chalk.cyan('-w, --watch')}          WIP.`,
    `   ${chalk.cyan('-h, --help')}           Output usage information.`,
    `   ${chalk.cyan('-v, --version')}        Output the version number.`,
    '',
    `${chalk.bold('Options:')}`,
    `   ${chalk.cyan('-i, --input <path>')}   Specify the input file path.`,
  ]);
};
