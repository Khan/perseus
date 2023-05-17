import Key from "../data/keys";
import {MathQuillInterface} from "../types";

enum ActionType {
    WRITE = "write",
    CMD = "cmd",
    KEYSTROKE = "keystroke",
    MQ_END = 0,
}

type MathQuillCallback = (mathQuill: MathQuillInterface) => void;

function getGenericMathquillCallback(
    str: string,
    type: ActionType,
): MathQuillCallback {
    return function (mathQuill: MathQuillInterface) {
        switch (type) {
            case ActionType.WRITE: {
                mathQuill.write(str);
                return;
            }
            case ActionType.CMD: {
                mathQuill.cmd(str);
                return;
            }
            case ActionType.KEYSTROKE: {
                mathQuill.keystroke(str);
                return;
            }
        }
    };
}

const keyToMathquillMap: Record<Key, MathQuillCallback> = {
    CDOT: getGenericMathquillCallback("\\cdot", ActionType.WRITE),
    COS: getGenericMathquillCallback("cos", ActionType.WRITE),
    DECIMAL: getGenericMathquillCallback(".", ActionType.WRITE),
    DIVIDE: getGenericMathquillCallback("\\div", ActionType.WRITE),
    EQUAL: getGenericMathquillCallback("=", ActionType.WRITE),
    EXP: getGenericMathquillCallback("^", ActionType.WRITE),
    EXP_2: getGenericMathquillCallback("^2", ActionType.WRITE),
    EXP_3: getGenericMathquillCallback("^3", ActionType.WRITE),
    GEQ: getGenericMathquillCallback("\\geq", ActionType.WRITE),
    GT: getGenericMathquillCallback(">", ActionType.WRITE),
    LEQ: getGenericMathquillCallback("\\leq", ActionType.WRITE),
    LN: getGenericMathquillCallback("\\ln", ActionType.WRITE),
    LOG: getGenericMathquillCallback("\\log", ActionType.WRITE),
    LOG_N: getGenericMathquillCallback("log_{ }", ActionType.WRITE),
    LT: getGenericMathquillCallback("<", ActionType.WRITE),
    MINUS: getGenericMathquillCallback("-", ActionType.WRITE),
    NEGATIVE: getGenericMathquillCallback("-", ActionType.WRITE),
    NEQ: getGenericMathquillCallback("\\neq", ActionType.WRITE),
    PERCENT: getGenericMathquillCallback("%", ActionType.WRITE),
    PERIOD: getGenericMathquillCallback(".", ActionType.WRITE), // Do we still need this?
    PLUS: getGenericMathquillCallback("+", ActionType.WRITE),
    SIN: getGenericMathquillCallback("sin", ActionType.WRITE),
    TAN: getGenericMathquillCallback("tan", ActionType.WRITE),
    TIMES: getGenericMathquillCallback("\\times", ActionType.WRITE),

    // The `FRAC_EXCLUSIVE` variant is handled manually, since we may need to do
    // some additional navigation depending on the cursor position.
    FRAC_INCLUSIVE: getGenericMathquillCallback("/", ActionType.CMD),
    LEFT_PAREN: getGenericMathquillCallback("(", ActionType.CMD),
    RIGHT_PAREN: getGenericMathquillCallback(")", ActionType.CMD),
    SQRT: getGenericMathquillCallback("sqrt", ActionType.CMD),
    PI: getGenericMathquillCallback("pi", ActionType.CMD),
    THETA: getGenericMathquillCallback("theta", ActionType.CMD),
    RADICAL: getGenericMathquillCallback("nthroot", ActionType.CMD),

    UP: getGenericMathquillCallback("Up", ActionType.KEYSTROKE),
    DOWN: getGenericMathquillCallback("Down", ActionType.KEYSTROKE),
};

// add the numbers, which are prefixed with "NUM_"
for (let i = 0; i < 10; i++) {
    keyToMathquillMap[`NUM_${i}`] = getGenericMathquillCallback(
        `${i}`,
        ActionType.WRITE,
    );
}

// add the letters of the alphabet (upper and lower cases)
for (let i = 0; i < 26; i++) {
    const lower = String.fromCharCode(97 + i);
    const upper = lower.toUpperCase();
    keyToMathquillMap[lower] = getGenericMathquillCallback(
        lower,
        ActionType.WRITE,
    );
    keyToMathquillMap[upper] = getGenericMathquillCallback(
        upper,
        ActionType.WRITE,
    );
}

export default keyToMathquillMap;
