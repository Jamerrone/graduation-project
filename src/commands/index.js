process.stdout.write('Loading...');
const shared = require('./shared');
const {findFiles} = require('../libraries/files');
const {getFilePath} = require('../libraries/inquirer');
const {printEr} = require('../libraries/utils');
process.stdout.clearLine();
process.stdout.cursorTo(0);

module.exports = async (args) => {
  const files = await findFiles('css');

  if (files.length) {
    const {filePath} = await getFilePath(files);
    shared(filePath, args);
  } else {
    printEr('Could not find any CSS file.');
  }
};
