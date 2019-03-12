const {table} = require('table');
const chalk = require('chalk');

const generateReport = (supportData) => {
  const tableHeading = [
    chalk.bold.yellow('Location'),
    chalk.bold.yellow('Property Name'),
    chalk.bold.yellow('Unsupported By'),
  ];

  const tableData = supportData.reduce((acc, property, index) => {
    if (index % 25 === 0) acc.push(tableHeading);
    acc.push(generateTableRow(property));
    return acc;
  }, []);

  return tableData.length
    ? table(tableData)
    : chalk.green('Congratulations! No issues were found.');
};

const generateTableRow = ({property, location, notSupported}) => {
  return [
    `Ln ${location.line}, Col ${location.column}`,
    `${property}`,
    `${notSupported.join(', ')}`,
  ];
};

module.exports = {
  generateReport,
};
