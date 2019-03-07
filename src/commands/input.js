const path = require('path');

const {parseCSS} = require('../libraries/css');
const {readFile} = require('../libraries/files');
const {printEr, printLn} = require('../libraries/utils');

module.exports = (args = {}) => {
  const filePath = args.input;
  if (path.extname(filePath) === '.css') {
    const fileString = readFile(filePath);
    printLn(JSON.stringify(parseCSS(fileString, filePath), null, 2));
  } else {
    printEr(`"${filePath}" is not a valid CSS file.`);
  }
};
