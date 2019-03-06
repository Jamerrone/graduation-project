const chalk = require('chalk');
const fs = require('fs');
const glob = require('glob');

const findFiles = (fileType) => {
  return glob.sync(`**/*.${fileType}`, {ignore: ['node_modules/**']});
};

const readFile = (filePath) => {
  if (fs.existsSync(filePath)) {
    return fs.readFileSync(filePath, 'utf8');
  } else {
    return chalk.red(`ERROR: "${filePath}" does not exist.`);
  }
};

module.exports = {
  findFiles,
  readFile,
};
