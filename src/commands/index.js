const shared = require('./shared');
const {findFiles} = require('../libraries/files');
const {printEr} = require('../libraries/utils');

module.exports = async ({browserslist, ignore}, args) => {
  const filePaths = await findFiles('css', ignore);

  if (filePaths.length) {
    shared(filePaths, browserslist, args);
  } else {
    printEr('Could not find any CSS file.');
  }
};
