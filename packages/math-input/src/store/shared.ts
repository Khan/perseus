import {expressionKeypadLayout} from "../components/expression-keypad";
import {fractionKeypadLayout} from "../components/fraction-keypad";
import {KeypadTypes} from "../consts";

const defaultKeypadType = KeypadTypes.EXPRESSION;

const keypadForType = {
    [KeypadTypes.FRACTION]: fractionKeypadLayout,
    [KeypadTypes.EXPRESSION]: expressionKeypadLayout,
} as const;

export {keypadForType, defaultKeypadType};
