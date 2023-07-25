/**
 * A single entry-point for all of the external-facing functionality.
 */

import "../less/main.less";

// MathInput input field (MathQuill wrapper)
export {default as KeypadInput} from "./components/input/math-input";

export {
    // Helper to create a MathQuill MathField
    createMathField,
    // Instance of the MathQuill library
    mathQuillInstance,
} from "./components/input/mathquill-instance";

// MathQuill MathField type
export {type MathFieldInterface} from "./components/input/mathquill-types";

// Cursor context data: where in a forumla the cursor is in
// ex: in numerator, in parenthesis, in subscript
export {CursorContext} from "./components/input/cursor-contexts";

// Helper to get cursor context from MathField
export {getCursorContext} from "./components/input/mathquill-helpers";

// v1 Keypad
export {default as LegacyKeypad} from "./components/keypad-legacy";

// v2 Keypad
export {default as Keypad} from "./components/keypad/keypad";

// External API of the "Provided" keypad component
export {keypadElementPropType} from "./components/prop-types";

// Key list, configuration map, and types
export type {default as Keys} from "./data/keys";
export {default as KeyConfigs} from "./data/key-configs";
export {type KeyType, KeypadType} from "./enums";

// Helper to translate key pressed to MathField update
export {default as keyTranslator} from "./components/key-handlers/key-translator";
