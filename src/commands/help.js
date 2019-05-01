const chalk = require('chalk');

const {printLn} = require('../libraries/utils');

module.exports = () => {
  printLn([
    `${chalk.bold('Usage:')} firefly ${chalk.yellow('or')}`,
    `       firefly [${chalk.cyan('-i | --input <path>')}] [${chalk.cyan(
      '-e | --export <path>'
    )}] [${chalk.cyan('-w | --watch')}]
       [${chalk.cyan('-j | --json')}] [${chalk.cyan(
  '-h | --help'
)}] [${chalk.cyan('-v | --version')}]`,
    '',
    `${chalk.bold('Options:')}`,
    `   ${chalk.cyan('-i, --input <path>')}    Specify the input file path.`,
    `   ${chalk.cyan(
      '-e, --export <path>'
    )}   Export the generated report in JSON format.`,
    '',
    `${chalk.bold('Flags:')}`,
    `   ${chalk.cyan('-w, --watch')}           Rerun firefly on file change.`,
    `   ${chalk.cyan(
      '-j, --json'
    )}            Output firefly's report in JSON format.`,
    `   ${chalk.cyan('-h, --help')}            Output usage information.`,
    `   ${chalk.cyan('-v, --version')}         Output the version number.`
  ]);
};
