const path = require('path');

const shared = require('./shared');
const {printEr} = require('../libraries/utils');

module.exports = (args) => {
  const filePath = args.input || args._[0];

  path.extname(filePath) === '.css'
    ? shared(filePath, args)
    : printEr(`"${filePath}" is not a valid CSS file.`);
};
