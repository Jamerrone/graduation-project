const shared = require('./shared');
const {findFiles} = require('../libraries/files');
const {getFilePath} = require('../libraries/inquirer');
const {printEr} = require('../libraries/utils');

module.exports = async ({ignore}, args) => {
  const files = await findFiles('css', ignore);

  if (files.length) {
    const {filePath} = await getFilePath(files);
    shared(filePath, args);
  } else {
    printEr('Could not find any CSS file.');
  }
};
