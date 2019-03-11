const clear = require('clear');

const {checkBrowserSupport} = require('../libraries/browser-compat');
const {getCSSDeclarations, parseCSS} = require('../libraries/css');
const {findFiles, readFile} = require('../libraries/files');
const {getFilePath} = require('../libraries/inquirer');
const {printEr, printLn} = require('../libraries/utils');

module.exports = async () => {
  const files = await findFiles('css');

  if (files.length) {
    clear();
    const {filePath} = await getFilePath(files);
    const fileString = readFile(filePath);
    const parsedCSS = parseCSS(fileString);
    const cssDeclarations = getCSSDeclarations(parsedCSS);
    printLn(
        checkBrowserSupport(cssDeclarations, {
          chrome: 70,
          edge: 17,
          firefox: 65,
          ie: 11,
          safari: 12,
        })
    );
  } else {
    printEr('Could not find any CSS file.');
  }
};
