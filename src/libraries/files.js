const chalk = require('chalk');
const fg = require('fast-glob');
const fs = require('fs');
const ora = require('ora');

const {printEr, printLn} = require('./utils');

const findFiles = async (fileType, ignore = []) => {
  const spinner = ora('Searching for CSS files...').start();
  const files = await fg([`**/*.${fileType}`], {
    ignore: [...ignore, '**/node_modules'],
  });
  spinner.stop();
  return files;
};

const readFile = (filePath) => {
  return fs.existsSync(filePath)
    ? fs.readFileSync(filePath, 'utf8')
    : printEr(`"${filePath}" does not exist.`);
};

const writeFile = (filePath, data) => {
  fs.writeFile(filePath, data, (err) => {
    if (err) throw err;
    printLn(
        chalk.green(
            `[firefly] ✔ The report was successfully exported: "${filePath}".`
        )
    );
  });
};

module.exports = {
  findFiles,
  readFile,
  writeFile,
};
