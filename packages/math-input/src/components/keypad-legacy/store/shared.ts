import {KeypadType} from "../../../enums";
import {expressionKeypadLayout} from "../expression-keypad";
import {fractionKeypadLayout} from "../fraction-keypad";

const defaultKeypadType = KeypadType.EXPRESSION;

const keypadForType = {
    [KeypadType.FRACTION]: fractionKeypadLayout,
    [KeypadType.EXPRESSION]: expressionKeypadLayout,
} as const;

export {keypadForType, defaultKeypadType};
