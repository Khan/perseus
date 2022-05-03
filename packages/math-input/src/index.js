/* eslint-disable import/no-commonjs */
/**
 * A single entry-point for all of the external-facing functionality.
 */

import "../less/main.less";

const components = {
    Keypad: require("./components/provided-keypad"),
    KeypadInput: require("./components/input/math-input"),
};

const {KeypadTypes} = require("./consts");

const consts = {KeypadTypes};

const {
    keypadConfigurationPropType,
    keypadElementPropType,
} = require("./components/prop-types");

const propTypes = {keypadConfigurationPropType, keypadElementPropType};

module.exports = {
    components,
    consts,
    propTypes,
};
