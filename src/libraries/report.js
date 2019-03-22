const Table = require('cli-table3');
const chalk = require('chalk');

const {writeFile} = require('./files');

const generateReport = (supportData, args) => {
  const tableConfig = {
    colWidths: [18, 36, 36],
    wordWrap: true,
  };

  const tables = generateTables(supportData).reduce((acc, data) => {
    if (data.length) {
      const report = new Table(tableConfig);
      report.push(...data);
      acc.push('\n' + report.toString());
    }
    return acc;
  }, []);

  if (tables.length) {
    args.export &&
      writeFile('report.txt', tables.join('\n').replace(/\[\d+m/g, ''));
    return tables;
  } else {
    return chalk.green('\n✔ Congratulations! No issues were found.');
  }
};

const generateTables = (supportData) => {
  return Object.entries(supportData).reduce((acc, [statement, data]) => {
    acc.push(
        data.reduce((acc, property, index) => {
          if (index % 50 === 0) acc.push(generateTableHead(statement));
          acc.push(generateTableRow(property));
          return acc;
        }, [])
    );
    return acc;
  }, []);
};

const generateTableHead = (statement) => {
  const getHeading = {
    atrules: 'At-Rule',
    declarations: 'Property',
    mediaFeatures: 'Media Feature',
  };

  return [
    {content: chalk.bold.yellow('Location')},
    {content: chalk.bold.yellow(getHeading[statement])},
    {content: chalk.bold.yellow('Unsupported By')},
  ];
};

const generateTableRow = ({name, location, notSupported}) => [
  {content: `Ln ${location.line}, Col ${location.column}`},
  {content: name},
  {content: notSupported.join(', ')},
];

module.exports = {
  generateReport,
};
