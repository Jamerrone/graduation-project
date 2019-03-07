#!/usr/bin/env node
const minimist = require('minimist');

const {printEr} = require('./libraries/utils');

(() => {
  const args = minimist(process.argv.slice(2), {
    alias: {i: 'input', v: 'version', h: 'help'},
    boolean: ['version', 'help'],
    string: ['input'],
    unknown(arg) {
      printEr(`"${arg}" is not a valid option/command. See "firefly --help".`);
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
