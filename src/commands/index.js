const clear = require('clear');

const {checkBrowserSupport} = require('../libraries/compat');
const {getCSSDeclarations, parseCSS} = require('../libraries/css');
const {generateFeedback} = require('../libraries/feedback');
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
        generateFeedback(
            checkBrowserSupport(cssDeclarations, {
              chrome: 60,
              edge: 15,
              firefox: 60,
              ie: 10,
              safari: 10,
            })
        )
    );
  } else {
    printEr('Could not find any CSS file.');
  }
};
