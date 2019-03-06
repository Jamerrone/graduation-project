#!/usr/bin/env node
const chalk = require('chalk');
const minimist = require('minimist');

const {printLn} = require('./libraries/utils');

(() => {
  const args = minimist(process.argv.slice(2), {
    alias: {i: 'input', v: 'version', h: 'help'},
    boolean: ['version', 'help'],
    string: ['input'],
    unknown(arg) {
      printLn(
          chalk.red(
              `ERROR: "${arg}" is not a valid option/command. See "firefly --help".`
          )
      );
      process.exit();
    },
  });

  if (args.input) {
    require('./commands/input')(args);
  } else if (args.version) {
    require('./commands/version')();
  } else {
    require('./commands/primary')();
  }
})();
