const cosmiconfig = require('cosmiconfig');

const defaultConfig = {
  mode: 'default', // 'default' | 'export' | 'json' | 'watch'
  entry: null, // Working
  export: {
    filename: 'report.json',
    path: process.cwd(),
  },

  browserslist: ['defaults'], // Working
  disableFeedbackSystem: false, // Working
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
