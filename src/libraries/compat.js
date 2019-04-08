const {
  css: {'at-rules': AT_RULES, properties: PROPERTIES},
} = require('mdn-browser-compat-data');
const API = require('../api');

const checkBrowserSupport = (
    {atrules, declarations, mediaFeatures},
    browserscope
) => {
  return {
    atRules: atrules
        .reduce((acc, {name, loc}) => {
          const supportData = getAtruleSupportData(name);

          supportData &&
          acc.push(formatData(browserscope, name, loc, supportData));

          return acc;
        }, [])
        .filter((atrule) => atrule.notSupported.length),
    properties: declarations
        .reduce((acc, {property, loc}) => {
          const supportData = getPropertySupportData(property);
          const feedback = getPropertyFeedback(property);

          supportData &&
          acc.push(
              formatData(browserscope, property, loc, supportData, feedback)
          );

          return acc;
        }, [])
        .filter((property) => property.notSupported.length),
    mediaFeatures: mediaFeatures
        .reduce((acc, {name, loc}) => {
          const supportData = getMediaFeatureSupportData(
              name.replace(/^(min-)|(max-)/, '')
          );

          supportData &&
          acc.push(formatData(browserscope, name, loc, supportData));

          return acc;
        }, [])
        .filter((mediaFeature) => mediaFeature.notSupported.length),
  };
};

const formatData = (browserscope, name, loc, supportData, feedback = null) => {
  const {line, column} = loc.start;

  return Object.entries(browserscope).reduce((acc, [browser, version]) => {
    acc.name = name;
    acc.location = {line, column};
    acc.feedback = feedback || '';
    acc.supported = acc.supported || [];
    acc.notSupported = acc.notSupported || [];
    acc.unknown = acc.unknown || [];

    let browserSupportData = Array.isArray(supportData[browser])
      ? supportData[browser][0]
      : supportData[browser];

    try {
      browserSupportData = browserSupportData.version_added;
    } catch (error) {
      browserSupportData = null;
    }

    if (browserSupportData === null) {
      acc.unknown.push(`${browser} ${version}`);
    } else if (browserSupportData && browserSupportData <= version) {
      acc.supported.push(`${browser} ${version}`);
    } else {
      acc.notSupported.push(`${browser} ${version}`);
    }

    return acc;
  }, {});
};

const getAtruleSupportData = (atrule) => {
  try {
    return AT_RULES[atrule].__compat.support;
  } catch (error) {
    return false;
  }
};

const getPropertySupportData = (property) => {
  try {
    return PROPERTIES[property].__compat.support;
  } catch (error) {
    return false;
  }
};

const getPropertyFeedback = (property) => {
  try {
    return API.properties[property].feedback;
  } catch (error) {
    return null;
  }
};

const getMediaFeatureSupportData = (mediaFeature) => {
  try {
    return AT_RULES['media'][mediaFeature].__compat.support;
  } catch (error) {
    return false;
  }
};

module.exports = {
  checkBrowserSupport,
};
