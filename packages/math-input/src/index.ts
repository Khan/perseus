/**
 * A single entry-point for all of the external-facing functionality.
 */

import "../less/main.less";

export {CursorContext} from "./components/input/cursor-contexts";
export {default as KeypadInput} from "./components/input/math-input";
export {keypadElementPropType} from "./components/prop-types";
export {default as LegacyKeypad} from "./components/keypad-legacy/provided-keypad";
export {default as KeyConfigs} from "./data/key-configs";
export type {default as Keys} from "./data/keys";
export {type KeyType, KeypadType} from "./enums";

export {default as Keypad} from "./components/keypad/index";
export {default as keyTranslator} from "./components/key-translator";
