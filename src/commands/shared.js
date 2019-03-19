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

module.exports = (filePath, args) => {
  const fileString = readFile(filePath);
  const parsedCSS = parseCSS(fileString);
  const cssStatements = getCSSStatements(parsedCSS);
  const browserSupport = checkBrowserSupport(cssStatements, browserscope);
  const generatedReport = generateReport(browserSupport.declarations, args);
  printLn(generatedReport);
};
