const fg = require('fast-glob');
const fs = require('fs');
const ora = require('ora');

const {printEr} = require('./utils');

const findFiles = async (fileType = '') => {
  const spinner = ora('Searching for CSS files...').start();
  const files = await fg([`**/*.${fileType}`, '!**/node_modules/**']);
  spinner.stop();
  return files;
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
