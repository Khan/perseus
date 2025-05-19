/**
 * A single entry-point for all of the external-facing functionality.
 */

import "../styles/main.css";

export {libVersion} from "./version";

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

// Wrapper around v1 and v2 mobile keypads to switch between them
export {MobileKeypad} from "./components/keypad";
// Unwrapped v2 keypad for desktop
export {default as DesktopKeypad} from "./components/keypad";

// Context for managing i18n
export {
    MathInputI18nContextProvider,
    MathInputI18nContext,
    useMathInputI18n,
} from "./components/i18n-context";

// External API of the "Provided" keypad component
export {keypadElementPropType} from "./components/prop-types";
export type {KeypadAPI} from "./types";
export {convertDotToTimesByLocale} from "./utils";

export {default as KeyConfigs} from "./data/key-configs";

// Helper to translate key pressed to MathField update
export {getKeyTranslator} from "./components/key-handlers/key-translator";
