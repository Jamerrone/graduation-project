const chalk = require('chalk');
const chokidar = require('chokidar');

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

const getExportAndReport = (filePaths, browserslist) => {
  return filePaths.reduce(
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
};

module.exports = (filePaths, browserslist, args) => {
  if (typeof filePaths === 'string') filePaths = [filePaths];
  if (args.watch) {
    let reportLineCount = 0;
    const watchingNotification = `
${
  'export' in args
    ? chalk.yellow(
        '\n[firefly] warning: "--export" is not supported in watch-mode'
    )
    : ''
}${
      args.json
        ? chalk.yellow(
            '\n[firefly] warning: "--json" is not supported in watch-mode'
        )
        : ''
}
${chalk.cyan('[firefly] watching:')} ${filePaths
    .join(', ')
    .replace(/, ([^,]*)$/, ' & $1')}
`;

    const clearTerminal = () => {
      process.stdout.moveCursor(0, -reportLineCount + 1);
      process.stdout.clearScreenDown();
      process.stdout.cursorTo(0);
    };

    const printReport = () => {
      const {r} = getExportAndReport(filePaths, browserslist);
      const message = r.join('\n\n') + watchingNotification;
      reportLineCount = message.split('\n').length;
      process.stdout.write(message);
    };

    chokidar
        .watch(filePaths, {awaitWriteFinish: false})
        .on('ready', () => printReport())
        .on('change', (path) => {
          clearTerminal();
          printReport();
        });
  } else {
    const {e, r} = getExportAndReport(filePaths, browserslist);

    if ('export' in args) {
      const json = JSON.stringify(e, null, 2);
      let exportPath = args.export || 'report.json';
      if (!exportPath.toLowerCase().endsWith('.json')) exportPath += '.json';
      args.json ? printLn(json) : printLn(r.join('\n\n'));
      writeFile(`${exportPath}`, json);
    } else if (args.json) {
      printLn(JSON.stringify(e, null, 2));
    } else {
      printLn(r.join('\n\n'));
    }
  }
};
