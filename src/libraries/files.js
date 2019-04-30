const chalk = require('chalk');
const fg = require('fast-glob');
const fs = require('fs');
const path = require('path');

const {exclude} = require('./config');
const {printEr, printLn} = require('./utils');

const findFiles = async (fileType) => {
  const files = await fg([`**/*.${fileType}`], {
    ignore: [...exclude, '**/node_modules'],
  });
  return files;
};

const readFile = (filePath) => {
  return fs.existsSync(filePath)
    ? fs.readFileSync(filePath, 'utf8')
    : printEr(`"${filePath}" does not exist.`);
};

const writeFile = (filePath, data) => {
  fs.mkdir(path.dirname(filePath), {recursive: true}, (err) => {
    if (err) throw err;
    fs.writeFile(filePath, data, (err) => {
      if (err) throw err;
      printLn(
          chalk.green(
              `\n✔ The report was successfully exported: ${path.resolve(
                  filePath
              )}.`
          )
      );
    });
  });
};

module.exports = {
  findFiles,
  readFile,
  writeFile,
};
