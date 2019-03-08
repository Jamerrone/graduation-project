const css = require('css');
const ora = require('ora');

const parseCSS = (fileString = '', filePath = '') => {
  const spinner = ora('Parsing CSS file...').start();
  const parsedCSS = css.parse(fileString, {source: filePath});
  spinner.stop();
  return parsedCSS;
};

const stringifyCSS = (cssObject = {}) => {
  const spinner = ora('Stringifying CSS file...').start();
  const stringifiedCSS = css.stringify(cssObject);
  spinner.stop();
  return stringifiedCSS;
};

module.exports = {
  parseCSS,
  stringifyCSS,
};
