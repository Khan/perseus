import {expressionKeypadLayout} from "../components/expression-keypad";
import {fractionKeypadLayout} from "../components/fraction-keypad";
import {KeypadType} from "../enums";

const defaultKeypadType = KeypadType.EXPRESSION;

const keypadForType = {
    [KeypadType.FRACTION]: fractionKeypadLayout,
    [KeypadType.EXPRESSION]: expressionKeypadLayout,
} as const;

export {keypadForType, defaultKeypadType};
