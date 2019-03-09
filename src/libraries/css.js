const csstree = require('css-tree');
const ora = require('ora');

const generateCSS = (cssNode) => {
  const spinner = ora('Generating CSS from node...').start();
  const generatedCSS = csstree.generate(cssNode);
  spinner.stop();
  return generatedCSS;
};

const getCSSDeclarations = (cssNode) => {
  const declarations = [];
  csstree.walk(cssNode, {
    visit: 'Declaration',
    enter(node) {
      declarations.push(node);
    },
  });
  return declarations;
};

const parseCSS = (fileString) => {
  const spinner = ora('Parsing CSS file...').start();
  const parsedCSS = csstree.parse(fileString, {
    parseValue: false,
    positions: true,
  });
  spinner.stop();
  return parsedCSS;
};

module.exports = {
  generateCSS,
  getCSSDeclarations,
  parseCSS,
};
