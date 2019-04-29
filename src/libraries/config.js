const cosmiconfig = require('cosmiconfig');

const defaultConfig = {
  mode: 'default', // 'default' | 'export' | 'json' | 'watch'
  entry: null, // Working
  export: {
    filename: 'report.json', // Working
    path: process.cwd(), // Working
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
    const userConfig = explorer.searchSync().config;
    config = {...defaultConfig, ...userConfig};
    config.export = {...defaultConfig.export, ...userConfig.export};
  } catch (error) {
    config = defaultConfig;
  }
  return config;
};

module.exports = getConfig();
