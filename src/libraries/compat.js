const bcd = require('mdn-browser-compat-data');

const checkBrowserSupport = (declarations, browserscope) => {
  return filterSupportedProperties(
      declarations.reduce((acc, {property, loc}) => {
        const propertySupportData = getPropertySupportData(property);
        const {line, column} = loc.start;

        if (propertySupportData) {
          acc.push(
              Object.entries(browserscope).reduce((acc, [browser, version]) => {
                acc.property = property;
                acc.location = {line, column};
                acc.supported = acc.supported || [];
                acc.notSupported = acc.notSupported || [];

                const browserSupportData = Array.isArray(
                    propertySupportData[browser]
                )
              ? propertySupportData[browser][0].version_added
              : propertySupportData[browser].version_added;

            browserSupportData && browserSupportData <= version
              ? acc.supported.push(browser)
              : acc.notSupported.push(browser);

            return acc;
              }, {})
          );
        }

        return acc;
      }, [])
  );
};

const filterSupportedProperties = (browserSupport) => {
  return browserSupport.filter((property) => property.notSupported.length);
};

const getPropertySupportData = (property) => {
  // Write some logic to get the property's context.
  // E.g "justify-content" needs a ctx of "flex_context" or "grid_context".
  try {
    return bcd.css.properties[property].__compat.support;
  } catch (error) {
    return false;
  }
};

module.exports = {
  checkBrowserSupport,
};
