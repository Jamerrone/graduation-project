const {spawn} = require('child_process');
const chalk = require('chalk');
const chokidar = require('chokidar');

const {getBrowserslist} = require('../libraries/browserslist');
const {checkBrowserSupport} = require('../libraries/compat');
const {getCSSStatements, parseCSS} = require('../libraries/css');
const {readFile} = require('../libraries/files');
const {generateReport} = require('../libraries/report');
const {printLn} = require('../libraries/utils');

const firefly = (filePath, browserslist, args) => {
  const fileString = readFile(filePath);
  const parsedCSS = parseCSS(fileString);
  const cssStatements = getCSSStatements(parsedCSS);
  const browserscope = getBrowserslist(browserslist);
  const browserSupport = checkBrowserSupport(cssStatements, browserscope);
  const generatedReport = generateReport(filePath, browserSupport, args);
  return generatedReport;
};

module.exports = (filePath, browserslist, args) => {
  if (args.watch) {
    const watcher = chokidar.watch(filePath).on('all', () => {
      const feedbackReport = `${chalk.cyan(
          '[firefly] watching:'
      )} ${filePath}\n${firefly(filePath, browserslist, args)}`;

      const less = spawn(`cat <<< '${feedbackReport}' | less -cj2sqRK`, {
        stdio: 'inherit',
        shell: true,
      });

      less.on('exit', () => watcher.close());
    });
  } else {
    printLn(firefly(filePath, browserslist, args));
  }
};
