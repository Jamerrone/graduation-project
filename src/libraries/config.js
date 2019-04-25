const cosmiconfig = require('cosmiconfig');

const defaultConfig = require('../.fireflyrc.json');

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
