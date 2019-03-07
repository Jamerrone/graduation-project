const clear = require('clear');

const {parseCSS} = require('../libraries/css');
const {findFiles, readFile} = require('../libraries/files');
const {getFilePath} = require('../libraries/inquirer');
const {printEr, printLn} = require('../libraries/utils');

module.exports = async () => {
  const files = findFiles('css');

  if (files.length) {
    clear();
    const {filePath} = await getFilePath(files);
    const fileString = readFile(filePath);
    printLn(JSON.stringify(parseCSS(fileString, filePath), null, 2));
  } else {
    printEr('Could not find any CSS file.');
  }
};
