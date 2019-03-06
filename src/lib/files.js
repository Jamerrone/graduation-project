const fs = require('fs');
const glob = require('glob');

const findFiles = (fileType) => {
  return glob.sync(`**/*.${fileType}`, {ignore: ['node_modules/**']});
};

const readFile = (filePath) => {
  return fs.readFileSync(filePath, 'utf8');
};

module.exports = {
  findFiles,
  readFile,
};
