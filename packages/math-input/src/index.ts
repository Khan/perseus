/**
 * A single entry-point for all of the external-facing functionality.
 */

export {libVersion} from "./version";

// MathQuill MathField type
export {type MathFieldInterface} from "./components/input/mathquill-types";

// Cursor context data: where in a forumla the cursor is in
// ex: in numerator, in parenthesis, in subscript
export {CursorContext} from "./components/input/cursor-contexts";

// Wrapper around v1 and v2 mobile keypads to switch between them
export {MobileKeypad} from "./components/keypad";
// Unwrapped v2 keypad for desktop
export {default as DesktopKeypad} from "./components/keypad";

// Context used to pass data/refs around
export {
    KeypadContext,
    StatefulKeypadContextProvider,
} from "./components/keypad-context";

// External API of the "Provided" keypad component
export {keypadElementPropType} from "./components/prop-types";
export type {KeypadAPI, KeypadConfiguration} from "./types";
export {convertDotToTimesByLocale} from "./utils";

// Key list, configuration map, and types
export type {default as Keys} from "./data/keys";
export {KeyArray} from "./data/keys";
export {default as KeyConfigs} from "./data/key-configs";
export {type KeyType, KeypadType} from "./enums";
