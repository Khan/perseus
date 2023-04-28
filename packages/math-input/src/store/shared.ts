import {expressionKeypadLayout} from "../components/expression-keypad";
import {fractionKeypadLayout} from "../components/fraction-keypad";
import {KeypadType} from "../consts";

const defaultKeypadType = KeypadType.EXPRESSION;

const keypadForType = {
    [KeypadType.FRACTION]: fractionKeypadLayout,
    [KeypadType.EXPRESSION]: expressionKeypadLayout,
} as const;

export {keypadForType, defaultKeypadType};
