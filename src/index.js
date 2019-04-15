#!/usr/bin/env node
const cosmiconfig = require('cosmiconfig');
const minimist = require('minimist');
const stringSimilarity = require('string-similarity');

const {printEr} = require('./libraries/utils');

const explorer = cosmiconfig('firefly');
const {config: appConfig = {}} = explorer.searchSync() || {};
const args = minimist(process.argv.slice(2), {
  alias: {
    e: 'export',
    h: 'help',
    i: 'input',
    j: 'json',
    v: 'version',
    w: 'watch',
  },
  boolean: ['help', 'json', 'version', 'watch'],
  string: ['export', 'input'],
  unknown(arg) {
    return arg.startsWith('-')
      ? printEr([
        `"${arg}" is not a valid option/command. See "firefly --help".`,
        `Did you mean: ${
          stringSimilarity.findBestMatch(arg, [
            '--export',
            '--help',
            '--input',
            '--json',
            '--version',
            '--watch',
          ]).bestMatch.target
        }?`,
      ])
      : true;
  },
});

if (args.input || args._[0]) {
  require('./commands/input')(appConfig, args);
} else if (args.version) {
  require('./commands/version')();
} else if (args.help) {
  require('./commands/help')();
} else {
  require('./commands')(appConfig, args);
}
