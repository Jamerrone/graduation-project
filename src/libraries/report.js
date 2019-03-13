const {table} = require('table');
const chalk = require('chalk');

const {writeFile} = require('./files');

const generateReport = (supportData, args) => {
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

  if (tableData.length) {
    const report = table(tableData);
    if (args.export) writeFile('report.txt', report.replace(/\[\d+m/g, ''));
    return report;
  } else {
    return chalk.green('\n✔ Congratulations! No issues were found.');
  }
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
