/* eslint-disable import/no-commonjs */
/**
 * A single entry-point for all of the external-facing functionality.
 */

import "../less/main.less";

import KeypadInput from "./components/input/math-input.js";
import Keypad from "./components/provided-keypad.js";

const {
    keypadConfigurationPropType,
    keypadElementPropType,
} = require("./components/prop-types.js");
const {KeypadTypes} = require("./consts.js");

export const components = {Keypad, KeypadInput};

export const consts = {KeypadTypes};

export const propTypes = {keypadConfigurationPropType, keypadElementPropType};
