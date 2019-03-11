const bcd = require('mdn-browser-compat-data');

const checkBrowserSupport = (declarations, browserscope) => {
  return declarations.reduce((acc, {property}) => {
    const propertySupportData = getPropertySupportData(property);

    if (propertySupportData) {
      if (acc[property]) return acc;
      acc[property] = Object.entries(browserscope).reduce(
          (acc, [browser, version]) => {
            acc.supported = acc.supported || [];
            acc.notSupported = acc.notSupported || [];

          propertySupportData[browser].version_added <= version
            ? acc.supported.push(browser)
            : acc.notSupported.push(browser);

          return acc;
          },
          {}
      );
    }

    return acc;
  }, {});
};

const filterOutSupportedProperties = (browserSupport) => {};

const getPropertySupportData = (property) => {
  try {
    return bcd.css.properties[property].__compat.support;
  } catch (error) {
    return false;
  }
};

module.exports = {
  checkBrowserSupport,
};
