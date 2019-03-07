const path = require('path');

const {readFile} = require('../libraries/files');
const {printEr, printLn} = require('../libraries/utils');

module.exports = (args) => {
  const filePath = args.input;
  if (path.extname(filePath) === '.css') {
    const fileString = readFile(filePath);
    printLn(fileString, true);
  } else {
    printEr(`"${filePath}" is not a valid CSS file.`);
  }
};
