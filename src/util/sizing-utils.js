/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable object-curly-spacing */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const { interactiveSizes } = require('../styles/constants.js');

// Note: these size cutoffs represent content-width cutoffs as
// specified in http://zpl.io/1mVmvU
// TODO(benkomalo): these values aren't used in JS outside of this file, but
// are coupled to the values in
// stylesheets/exercise-content-package/articles.less - DRY it up at some point
const React = require('react');

const smMax = 512;
const mdMax = 688;

const containerSizeClass = {
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large',
    XLARGE: 'xlarge',
};

module.exports = {
    containerSizeClass: containerSizeClass,
    containerSizeClassPropType: React.PropTypes.oneOf(
            Object.values(containerSizeClass)),

    getClassFromWidth: (width) => {
        if (!width) {
            return containerSizeClass.MEDIUM;
        }

        if (width <= smMax) {
            return containerSizeClass.SMALL;
        } else if (width <= mdMax) {
            return containerSizeClass.MEDIUM;
        } else {
            return containerSizeClass.LARGE;
        }
    },

    getInteractiveBoxFromSizeClass: (sizeClass) => {
        if (sizeClass === containerSizeClass.SMALL) {
            return [
                interactiveSizes.defaultBoxSizeSmall,
                interactiveSizes.defaultBoxSizeSmall,
            ];
        } else {
            return [
                interactiveSizes.defaultBoxSize,
                interactiveSizes.defaultBoxSize,
            ];
        }
    },
};
