/**
 * A single entry-point for all of the external-facing functionality.
 */

import "../less/echo.less";
import "../less/main.less";
import "../less/overrides.less";
import "../less/popover.less";

import "mathquill/build/mathquill.css";

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
