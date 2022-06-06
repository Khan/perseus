// @flow
/**
 * A single entry-point for all of the external-facing functionality.
 */

import "../less/main.less";

export {default as KeypadInput} from "./components/input/math-input.js";
export {
    keypadConfigurationPropType,
    keypadElementPropType,
} from "./components/prop-types.js";
export {default as Keypad} from "./components/provided-keypad.js";
export {KeypadTypes} from "./consts.js";
export {default as KeyConfigs} from "./data/key-configs.js";

import * as CursorContexts from "./components/input/cursor-contexts.js";

export {CursorContexts};
