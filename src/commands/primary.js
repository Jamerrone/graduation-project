const clear = require('clear');

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
    printLn(getCSSDeclarations(parsedCSS));
  } else {
    printEr('Could not find any CSS file.');
  }
};
