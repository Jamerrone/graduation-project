const {spawn} = require('child_process');
const chalk = require('chalk');
const chokidar = require('chokidar');

const {checkBrowserSupport} = require('../libraries/compat');
const {getCSSStatements, parseCSS} = require('../libraries/css');
const {readFile} = require('../libraries/files');
const {generateReport} = require('../libraries/report');
const {printLn} = require('../libraries/utils');

const browserscope = {
  chrome: 60,
  edge: 15,
  firefox: 60,
  ie: 10,
  safari: 10,
};

const firefly = (filePath, args) => {
  const fileString = readFile(filePath);
  const parsedCSS = parseCSS(fileString);
  const cssStatements = getCSSStatements(parsedCSS);
  const browserSupport = checkBrowserSupport(cssStatements, browserscope);
  const generatedReport = generateReport(browserSupport, args);
  return generatedReport;
};

module.exports = (filePath, args) => {
  if (args.watch) {
    const watcher = chokidar.watch(filePath).on('all', () => {
      const feedbackReport = `${chalk.cyan(
          '[firefly] watching:'
      )} ${filePath}\n${firefly(filePath, args)}`;

      const less = spawn(`cat <<< '${feedbackReport}' | less -csj2QR`, {
        stdio: 'inherit',
        shell: true,
      });

      less.on('exit', () => watcher.close());
    });
  } else {
    printLn(firefly(filePath, args));
  }
};
