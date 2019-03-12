const testData = {
  property: 'pointer-events',
  location: {line: 20997, column: 3},
  supported: ['chrome', 'firefox', 'safari'],
  notSupported: ['ie', 'edge'],
};

const generateFeedback = () => {};

const generateTableRow = ({property, location, notSupported}) => {
  return [
    `Ln ${location.line}, Col ${location.column}`,
    `${property}`,
    `${notSupported.join(', ')}`,
  ];
};

console.log(generateTableRow(testData));

module.exports = {
  generateFeedback,
};
