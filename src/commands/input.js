const path = require('path');

const {checkBrowserSupport} = require('../libraries/compat');
const {getCSSDeclarations, parseCSS} = require('../libraries/css');
const {readFile} = require('../libraries/files');
const {printEr, printLn} = require('../libraries/utils');

module.exports = (args) => {
  const filePath = args.input;
  if (path.extname(filePath) === '.css') {
    const fileString = readFile(filePath);
    const parsedCSS = parseCSS(fileString);
    const cssDeclarations = getCSSDeclarations(parsedCSS);
    printLn(
        checkBrowserSupport(cssDeclarations, {
          chrome: 60,
          edge: 15,
          firefox: 60,
          ie: 10,
          safari: 10,
        })
    );
  } else {
    printEr(`"${filePath}" is not a valid CSS file.`);
  }
};
