const path = require('path');

const shared = require('./shared');
const {printEr} = require('../libraries/utils');

module.exports = (filePath, args) => {
  if (path.extname(filePath) === '.css') {
    shared(filePath, args);
  } else {
    printEr(`"${filePath}" is not a valid CSS file.`);
  }
};
