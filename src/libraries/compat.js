const chalk = require('chalk');

const {
  'at-rules': AT_RULES,
  properties: PROPERTIES,
} = require('../api/mdn-bcd');
const API = require('../api/firefly-alternatives');

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
          const feedback = getPropertyFeedback(property, browserscope);

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

    const bsd = getBrowserSupportData(supportData, browser);

    if (bsd === null) {
      acc.unknown.push(`${browser} ${version}`);
    } else if (bsd && bsd <= version) {
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

const getPropertyFeedback = (property, browserscope) => {
  let alternatives = null;
  let feedbackMsg = '';
  let notes = null;

  try {
    alternatives = API.properties[property].alternatives.filter((alternative) =>
      Array.isArray(alternative)
        ? alternative.every((alternative) =>
          validateAlternative(alternative, browserscope)
        )
        : validateAlternative(alternative, browserscope)
    );
  } catch (e) {
    void e;
  }

  try {
    notes = API.properties[property].notes;
  } catch (e) {
    void e;
  }

  if (alternatives && alternatives.length) {
    const part1 = ' Consider using ';
    const part2 = alternatives
        .map((alternative) => {
          return Array.isArray(alternative)
          ? alternative
              .map((alternative) => `'${alternative}'`)
              .join(chalk.dim(' with '))
          : `'${alternative}'`;
        })
        .join(chalk.dim(', '))
        .replace(/, ([^,]*)$/, ' or $1');
    const part3 = ' instead.';
    feedbackMsg += chalk.dim(part1) + part2 + chalk.dim(part3);
  }

  if (notes) feedbackMsg += ` ${chalk.cyan('[Note]: ')}${notes}`;
  return feedbackMsg;
};

const validateAlternative = (alternative, browserscope) => {
  const supportData = getPropertySupportData(alternative);
  return !Object.entries(browserscope).some(([browser, version]) => {
    const bsd = getBrowserSupportData(supportData, browser);
    return bsd && bsd > version;
  });
};

const getBrowserSupportData = (supportData, browser) => {
  let browserSupportData = Array.isArray(supportData[browser])
    ? supportData[browser][0]
    : supportData[browser];

  try {
    browserSupportData = browserSupportData.version_added;
  } catch (error) {
    browserSupportData = null;
  }

  return browserSupportData;
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
