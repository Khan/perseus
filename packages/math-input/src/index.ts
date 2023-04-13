/**
 * A single entry-point for all of the external-facing functionality.
 */

import "../less/main.less";

export {default as KeypadInput} from "./components/input/math-input";
export {keypadElementPropType} from "./components/prop-types";
export {default as Keypad} from "./components/provided-keypad";
export {KeypadTypes} from "./consts";
export {default as KeyConfigs} from "./data/key-configs";

import * as CursorContexts from "./components/input/cursor-contexts";

export {CursorContexts};

export type {KeypadType, KeyType} from "./consts";
export type {Key} from "./data/keys";
export type {CursorContext} from "./components/input/cursor-contexts";
