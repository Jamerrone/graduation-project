const fs = require('fs');
const glob = require('glob');

const {printEr} = require('./utils');

const findFiles = (fileType = '') => {
  return glob.sync(`**/*.${fileType}`, {ignore: ['**/node_modules/**']});
};

const readFile = (filePath = '') => {
  if (fs.existsSync(filePath)) {
    return fs.readFileSync(filePath, 'utf8');
  } else {
    printEr(`"${filePath}" does not exist.`);
  }
};

module.exports = {
  findFiles,
  readFile,
};
