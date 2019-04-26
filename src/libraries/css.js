const csstree = require('css-tree');

const {ignoreAtSupports, ignoreVendorPrefixes} = require('./config');

const getCSSStatements = (cssNode) => {
  const statements = {atrules: [], declarations: [], mediaFeatures: []};
  csstree.walk(cssNode, {
    enter(node) {
      if (node.type === 'Atrule') {
        if (ignoreAtSupports && node.name === 'supports') {
          node.prelude.children.each((node, item, list) => list.remove(item));
          node.block.children.each((node, item, list) => list.remove(item));
        } else {
          statements.atrules.push(node);
        }
      }
      if (node.type === 'Declaration') {
        const r = /\-(moz|o|webkit|ms|khtml)\-.+/;
        if (ignoreVendorPrefixes && node.property.match(r)) return;
        statements.declarations.push(node);
      }
      if (node.type === 'MediaFeature') statements.mediaFeatures.push(node);
    },
  });
  return statements;
};

const parseCSS = (fileString) => {
  const parsedCSS = csstree.parse(fileString, {
    parseValue: false,
    positions: true,
  });
  return parsedCSS;
};

module.exports = {
  getCSSStatements,
  parseCSS,
};
