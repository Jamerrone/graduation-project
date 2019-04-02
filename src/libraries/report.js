const chalk = require('chalk');

const {writeFile} = require('./files');

const generateReport = (filePath, supportData, args) => {
  const report = generateTables(filePath, supportData);

  if (report.length > 1) {
    if ('export' in args) {
      let exportPath = args.export || 'report.json';
      if (!exportPath.toLowerCase().endsWith('.json')) exportPath += '.json';
      writeFile(`${exportPath}`, JSON.stringify(supportData, null, 2));
    }
    return report.join('\n');
  } else {
    return `${chalk.bgGreen.black.bold(' PASS ')} ${filePath}\n${chalk.green(
        '  ✔ Congratulations! No issues were found.'
    )}`;
  }
};

const generateTables = (filePath, supportData) => {
  const getHeading = {
    atRules: 'At-Rules',
    properties: 'Properties',
    mediaFeatures: 'Media Features',
  };

  return Object.entries(supportData).reduce(
      (acc, [statement, data]) => {
        const table = data
            .reduce((acc, property, index) => {
              if (index === 0) {
                acc.push(
                    `  ${chalk.bold(getHeading[statement])} (${chalk.red.bold(
                        data.length
                    )})`
                );
              }
              acc.push(generateTableRow(property));
              return acc;
            }, [])
            .join('\n');
        if (table.length) acc.push(table);
        return acc;
      },
      [`${chalk.bgRed.black.bold(' FAIL ')} ${filePath}`]
  );
};

const generateTableRow = ({name, location, notSupported}) => {
  const formatNotSupported = (notSupported) => {
    return notSupported.length <= 3
      ? notSupported.join(', ').replace(/, ([^,]*)$/, ' & $1')
      : notSupported
          .slice(1, 4)
          .join(', ')
          .replace(/, ([^,]*)$/, ' & others');
  };

  return `    ${chalk.red('✘')} [${location.line}:${
    location.column
  }] ${chalk.dim(
      `${formatNotSupported(notSupported)} does not support`
  )} '${name}'`;
};

module.exports = {
  generateReport,
};
