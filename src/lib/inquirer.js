const inquirer = require('inquirer');

const getFilePath = (files) => {
  const question = {
    type: 'list',
    name: 'filePath',
    message: 'Which CSS file do you wish to validate?',
    choices: files,
  };

  return inquirer.prompt(question);
};

module.exports = {
  getFilePath,
};
