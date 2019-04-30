const shared = require('./shared');
const {findFiles} = require('../libraries/files');
const {printEr} = require('../libraries/utils');

module.exports = async (args) => {
  const filePaths = await findFiles('css');

  filePaths.length
    ? shared(filePaths, args)
    : printEr('Could not find any CSS file.');
};
