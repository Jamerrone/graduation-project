const path = require('path');

const {parseCSS} = require('../libraries/css');
const {readFile} = require('../libraries/files');
const {printEr, printLn} = require('../libraries/utils');

module.exports = (args = {}) => {
  const filePath = args.input;
  if (path.extname(filePath) === '.css') {
    const fileString = readFile(filePath);
    printLn(parseCSS(fileString, filePath));
  } else {
    printEr(`"${filePath}" is not a valid CSS file.`);
  }
};
