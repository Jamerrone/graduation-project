const css = require('css');

const parseCSS = (fileString = '', filePath = '') => {
  return css.parse(fileString, {source: filePath});
};

const stringifyCSS = (cssObject = {}) => {
  return css.stringify(cssObject);
};

module.exports = {
  parseCSS,
  stringifyCSS,
};
