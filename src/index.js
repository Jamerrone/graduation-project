#!/usr/bin/env node
const cosmiconfig = require('cosmiconfig');
const minimist = require('minimist');
const stringSimilarity = require('string-similarity');

const {printEr} = require('./libraries/utils');

const explorer = cosmiconfig('firefly');
const {config: appConfig = {}} = explorer.searchSync() || {};
const args = minimist(process.argv.slice(2), {
  alias: {i: 'input', e: 'export', w: 'watch', v: 'version', h: 'help'},
  boolean: ['export', 'watch', 'version', 'help'],
  string: ['input'],
  unknown(arg) {
    return arg.startsWith('-')
      ? printEr([
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
      ])
      : true;
  },
});

if (args.input || args._[0]) {
  require('./commands/input')(args);
} else if (args.version) {
  require('./commands/version')();
} else if (args.help) {
  require('./commands/help')();
} else {
  require('./commands')(appConfig, args);
}
