import MathQuill from "mathquill";
import * as React from "react";

import Key from "../../data/keys";

import Keypad from "./index";

export default {
    title: "v2 Keypad With Mathquill",
};

type MathQuill = {
    write: (input: string) => void;
    cmd: (input: string) => void;
    keystroke: (input: string) => void;
};

enum ActionType {
    WRITE = "write",
    CMD = "cmd",
    KEYSTROKE = "keystroke",
    MQ_END = 0,
}

type MathQuillCallback = (mathQuill: MathQuill) => void;

function getGenericMathquillCallback(
    str: string,
    type: ActionType,
): MathQuillCallback {
    return function (mathQuill: MathQuill) {
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

const mathQuillConfig = {
    autoCommands: "pi theta phi sqrt nthroot",
    charsThatBreakOutOfSupSub: "+-*/=<>≠≤≥",
    supSubsRequireOperand: true,
    spaceBehavesLikeTab: true,
};

export function V2KeypadWithMathquill() {
    const mathquillWrapperRef = React.useRef<HTMLDivElement>(null);
    const [mathQuill, setMathQuill] = React.useState<MathQuill>();

    React.useEffect(() => {
        if (!mathQuill && mathquillWrapperRef.current) {
            const MQ = MathQuill.getInterface(2);
            const mathQuillInstance = MQ.MathField(
                mathquillWrapperRef.current,
                mathQuillConfig,
            );
            setMathQuill(mathQuillInstance);
        }
    }, [mathQuill]);

    function handleClickKey(key: Key) {
        if (!mathQuill) {
            return;
        }

        const mathQuillCallback = keyToMathquillMap[key];
        if (mathQuillCallback) {
            mathQuillCallback(mathQuill);
        } else {
            // eslint-disable-next-line no-console
            console.warn(`No translation to Mathquill for: ${key}`);
        }
    }

    return (
        <div style={{maxWidth: "400px", margin: "2em"}}>
            <div
                ref={mathquillWrapperRef}
                style={{width: "100%", marginBottom: "1em"}}
            />
            <div>
                <Keypad
                    onClickKey={handleClickKey}
                    advancedRelations
                    basicRelations
                    divisionKey
                    logarithms
                    multiplicationDot
                    preAlgebra
                    trigonometry
                />
            </div>
        </div>
    );
}
