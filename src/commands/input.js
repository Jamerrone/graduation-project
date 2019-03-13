process.stdout.write('Loading...');
const path = require('path');

const shared = require('./shared');
const {printEr} = require('../libraries/utils');
process.stdout.clearLine();
process.stdout.cursorTo(0);

module.exports = (args) => {
  const filePath = args.input;

  path.extname(filePath) === '.css'
    ? shared(filePath, args)
    : printEr(`"${filePath}" is not a valid CSS file.`);
};
