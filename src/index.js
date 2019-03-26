#!/usr/bin/env node
const minimist = require('minimist');
const stringSimilarity = require('string-similarity');

const {printEr} = require('./libraries/utils');

(() => {
  const args = minimist(process.argv.slice(2), {
    alias: {i: 'input', e: 'export', w: 'watch', v: 'version', h: 'help'},
    boolean: ['export', 'watch', 'version', 'help'],
    string: ['input'],
    unknown(arg) {
      printEr([
        `"${arg}" is not a valid option/command. See "firefly --help".`,
        `Did you mean: ${
          stringSimilarity.findBestMatch(arg, [
            '--input',
            '--export',
            '--watch',
            '--version',
            '--help',
          ]).bestMatch.target
        }?`,
      ]);
    },
  });

  if (args.input) {
    require('./commands/input')(args);
  } else if (args.version) {
    require('./commands/version')();
  } else if (args.help) {
    require('./commands/help')();
  } else {
    require('./commands')(args);
  }
})();
