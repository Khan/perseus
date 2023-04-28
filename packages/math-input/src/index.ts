/**
 * A single entry-point for all of the external-facing functionality.
 */

import "../less/main.less";

import * as CursorContexts from "./components/input/cursor-contexts";
import Keys from "./data/keys";

export {default as KeypadInput} from "./components/input/math-input";
export {keypadElementPropType} from "./components/prop-types";
export {default as Keypad} from "./components/provided-keypad";
export {default as KeyConfigs} from "./data/key-configs";
export {Keys};
export {KeyType, KeypadType} from "./consts";

export type {CursorContext} from "./components/input/cursor-contexts";
export type {CursorContexts};
