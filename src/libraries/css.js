const csstree = require('css-tree');
const ora = require('ora');

const generateCSS = (cssNode) => {
  const spinner = ora('Generating CSS from node...').start();
  const generatedCSS = csstree.generate(cssNode);
  spinner.stop();
  return generatedCSS;
};

const getCSSStatements = (cssNode) => {
  const statements = {atrules: [], declarations: [], mediaFeatures: []};
  csstree.walk(cssNode, {
    enter(node) {
      if (node.type === 'Atrule') statements.atrules.push(node);
      if (node.type === 'Declaration') statements.declarations.push(node);
      if (node.type === 'MediaFeature') statements.mediaFeatures.push(node);
    },
  });
  return statements;
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
  getCSSStatements,
  parseCSS,
};
