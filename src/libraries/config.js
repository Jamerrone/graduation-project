const cosmiconfig = require('cosmiconfig');

const defaultConfig = {
  root: process.cwd(),
  entry: null,
  export: {
    feedback: true,
    filename: 'report.json',
    path: this.root,
  },

  browserslist: [], // Working
  disableFeedbackSystem: false,
  exclude: [], // Working
  ignoreAtSupports: false, // Working
  ignoreVendorPrefixes: false, // Working
};

const getConfig = () => {
  let config = {};
  try {
    const explorer = cosmiconfig('firefly');
    config = {...defaultConfig, ...explorer.searchSync().config};
  } catch (error) {
    config = defaultConfig;
  }
  return config;
};

module.exports = getConfig();
