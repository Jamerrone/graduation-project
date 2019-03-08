const path = require('path');

const {getCSSRules, parseCSS} = require('../libraries/css');
const {readFile} = require('../libraries/files');
const {printEr, printLn} = require('../libraries/utils');

module.exports = (args = {}) => {
  const filePath = args.input;
  if (path.extname(filePath) === '.css') {
    const fileString = readFile(filePath);
    const parsedCSS = parseCSS(fileString, filePath);
    printLn(getCSSRules(parsedCSS));
  } else {
    printEr(`"${filePath}" is not a valid CSS file.`);
  }
};
