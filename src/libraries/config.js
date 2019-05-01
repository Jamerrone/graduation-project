const cosmiconfig = require('cosmiconfig');

const defaultConfig = {
  mode: 'default',
  entry: null,
  export: {
    filename: 'report.json',
    path: './'
  },

  browserslist: ['defaults'],
  disableFeedbackSystem: false,
  exclude: [],
  ignoreAtSupports: false,
  ignoreVendorPrefixes: false
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
