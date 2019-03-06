const glob = require('glob');

const findFiles = (fileType) => {
  return glob.sync(`**/*.${fileType}`, {ignore: ['node_modules/**']});
};

module.exports = {
  findFiles,
};
