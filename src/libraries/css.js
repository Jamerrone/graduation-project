const css = require('css');
const ora = require('ora');

const getCSSRules = (cssObject = {}) => {
  const {source, rules} = cssObject.stylesheet;
  return {source, rules: rules.filter((rule = {}) => rule.type === 'rule')};
};

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
  getCSSRules,
  parseCSS,
  stringifyCSS,
};
