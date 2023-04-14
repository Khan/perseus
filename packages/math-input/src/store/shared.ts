import ExpressionKeypad from "../components/expression-keypad";
import FractionKeypad from "../components/fraction-keypad";
import {KeypadTypes} from "../consts";

const defaultKeypadType = KeypadTypes.EXPRESSION;

const keypadForType = {
    [KeypadTypes.FRACTION]: FractionKeypad,
    [KeypadTypes.EXPRESSION]: ExpressionKeypad,
} as const;

export {keypadForType, defaultKeypadType};
