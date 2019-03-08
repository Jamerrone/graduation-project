const {version} = require('../../package.json');

const {printLn} = require('../libraries/utils');

module.exports = () => {
  printLn(`v${version}`);
};
