const shared = require('./shared');
const {findFiles} = require('../libraries/files');
const {printEr} = require('../libraries/utils');

module.exports = async args => {
  const filePaths = await findFiles('css');

  if (filePaths.length) {
    shared(filePaths, args);
  } else {
    printEr('Could not find any CSS file.');
  }
};
