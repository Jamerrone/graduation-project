// const {spawn} = require('child_process');
// const chalk = require('chalk');
// const chokidar = require('chokidar');

const {getBrowserslist} = require('../libraries/browserslist');
const {checkBrowserSupport} = require('../libraries/compat');
const {getCSSStatements, parseCSS} = require('../libraries/css');
const {readFile, writeFile} = require('../libraries/files');
const {generateReport} = require('../libraries/report');
const {printLn} = require('../libraries/utils');

const firefly = (filePath, browserslist) => {
  const fileString = readFile(filePath);
  const parsedCSS = parseCSS(fileString);
  const cssStatements = getCSSStatements(parsedCSS);
  const browserscope = getBrowserslist(browserslist);
  const browserSupport = checkBrowserSupport(cssStatements, browserscope);
  const generatedReport = generateReport(filePath, browserSupport);
  return {browserscope, browserSupport, generatedReport};
};

module.exports = (filePaths, browserslist, args) => {
  if (typeof filePaths === 'string') filePaths = [filePaths];
  // if (args.watch) {
  //   const watcher = chokidar.watch(filePaths).on('all', () => {
  //     const feedbackReport = `${chalk.cyan(
  //         '[firefly] watching:'
  //     )} ${filePaths}\n${firefly(filePaths, browserslist, args)}`;

  //     const less = spawn(`cat <<< '${feedbackReport}' | less -cj2sqRK`, {
  //       stdio: 'inherit',
  //       shell: true,
  //     });

  //     less.on('exit', () => watcher.close());
  //   });
  // } else {
  // }
  const {e, r} = filePaths.reduce(
      (acc, filePath) => {
        const {browserscope, browserSupport, generatedReport} = firefly(
            filePath,
            browserslist
        );

        acc.e.push({
          filePath: `${process.cwd()}/${filePath}`,
          browserscope,
          issues: browserSupport,
        });
        acc.r.push(generatedReport);
        return acc;
      },
      {e: [], r: []}
  );

  if ('export' in args) {
    let exportPath = args.export || 'report.json';
    if (!exportPath.toLowerCase().endsWith('.json')) exportPath += '.json';
    writeFile(`${exportPath}`, JSON.stringify(e, null, 2));
  }

  printLn(r.join('\n\n'));
};
