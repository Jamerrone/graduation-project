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
      acc.push(report.toString());
    }
    return acc;
  }, []);

  if (tables.length) {
    if ('export' in args) {
      let exportPath = args.export || 'report.json';
      if (!exportPath.toLowerCase().endsWith('.json')) exportPath += '.json';
      writeFile(`${exportPath}`, JSON.stringify(supportData, null, 2));
    }
    return tables.join('\n');
  } else {
    return chalk.green('[firefly] ✔ Congratulations! No issues were found.');
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
    atRules: 'At-Rule',
    properties: 'Property',
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
