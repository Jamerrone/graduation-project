const cosmiconfig = require('cosmiconfig');

const defaultConfig = {
  root: process.cwd(),
  mode: 'default', // 'default' | 'export' | 'json' | 'watch'
  entry: null,
  export: {
    feedback: true,
    filename: 'report.json',
    path: process.cwd(),
  },

  browserslist: ['defaults'], // Working
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
