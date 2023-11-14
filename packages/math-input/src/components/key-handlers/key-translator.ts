import {decimalSeparator} from "../../utils";
import {mathQuillInstance} from "../input/mathquill-instance";

import handleArrow from "./handle-arrow";
import handleExponent from "./handle-exponent";
import handleJumpOut from "./handle-jump-out";

import type Key from "../../data/keys";
import type {
    MathFieldInterface,
    MathFieldUpdaterCallback,
} from "../input/mathquill-types";

enum ActionType {
    WRITE = "write",
    CMD = "cmd",
    KEYSTROKE = "keystroke",
    MQ_END = 0,
}

function buildGenericCallback(
    str: string,
    type: ActionType = ActionType.WRITE,
): MathFieldUpdaterCallback {
    return function (mathQuill: MathFieldInterface) {
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

function buildNormalFunctionCallback(command: string) {
    return function (mathField: MathFieldInterface) {
        mathField.write(`\\${command}\\left(\\right)`);
        mathField.keystroke("Left");
    };
}

const keyToMathquillMap: Record<Key, MathFieldUpdaterCallback> = {
    EXP: handleExponent,
    EXP_2: handleExponent,
    EXP_3: handleExponent,

    JUMP_OUT_PARENTHESES: handleJumpOut,
    JUMP_OUT_EXPONENT: handleJumpOut,
    JUMP_OUT_BASE: handleJumpOut,
    JUMP_INTO_NUMERATOR: handleJumpOut,
    JUMP_OUT_NUMERATOR: handleJumpOut,
    JUMP_OUT_DENOMINATOR: handleJumpOut,

    LEFT: handleArrow,
    RIGHT: handleArrow,

    LOG: buildNormalFunctionCallback("log"),
    LN: buildNormalFunctionCallback("ln"),
    SIN: buildNormalFunctionCallback("sin"),
    COS: buildNormalFunctionCallback("cos"),
    TAN: buildNormalFunctionCallback("tan"),

    CDOT: buildGenericCallback("\\cdot"),
    DECIMAL: buildGenericCallback(decimalSeparator),
    DIVIDE: buildGenericCallback("\\div"),
    EQUAL: buildGenericCallback("="),
    GEQ: buildGenericCallback("\\geq"),
    GT: buildGenericCallback(">"),
    LEQ: buildGenericCallback("\\leq"),
    LT: buildGenericCallback("<"),
    MINUS: buildGenericCallback("-"),
    NEGATIVE: buildGenericCallback("-"),
    NEQ: buildGenericCallback("\\neq"),
    PERCENT: buildGenericCallback("%"),
    PERIOD: buildGenericCallback("."),
    PLUS: buildGenericCallback("+"),
    TIMES: buildGenericCallback("\\times"),

    // The `FRAC_EXCLUSIVE` variant is handled manually, since we may need to do
    // some additional navigation depending on the cursor position.
    FRAC_INCLUSIVE: buildGenericCallback("/", ActionType.CMD),
    FRAC: buildGenericCallback("\\frac", ActionType.CMD),
    LEFT_PAREN: buildGenericCallback("(", ActionType.CMD),
    RIGHT_PAREN: buildGenericCallback(")", ActionType.CMD),
    SQRT: buildGenericCallback("sqrt", ActionType.CMD),
    PHI: buildGenericCallback("\\phi", ActionType.CMD),
    PI: buildGenericCallback("pi", ActionType.CMD),
    THETA: buildGenericCallback("theta", ActionType.CMD),
    RADICAL: buildGenericCallback("nthroot", ActionType.CMD),

    BACKSPACE: buildGenericCallback("Backspace", ActionType.KEYSTROKE),
    UP: buildGenericCallback("Up", ActionType.KEYSTROKE),
    DOWN: buildGenericCallback("Down", ActionType.KEYSTROKE),

    CUBE_ROOT: (mathQuill) => {
        mathQuill.write("\\sqrt[3]{}");
        mathQuill.keystroke("Left"); // under the root
    },

    FRAC_EXCLUSIVE: (mathQuill) => {
        const cursor = mathQuill.__controller.cursor;
        // If there's nothing to the left of the cursor, then we want to
        // leave the cursor to the left of the fraction after creating it.
        const shouldNavigateLeft =
            cursor[mathQuillInstance.L] === ActionType.MQ_END;
        mathQuill.cmd("\\frac");
        if (shouldNavigateLeft) {
            mathQuill.keystroke("Left");
        }
    },

    LOG_B: (mathQuill) => {
        mathQuill.typedText("log_");
        mathQuill.keystroke("Right");
        mathQuill.typedText("(");
        mathQuill.keystroke("Left");
        mathQuill.keystroke("Left");
    },

    LOG_N: (mathQuill) => {
        mathQuill.write("log_{ }\\left(\\right)");
        mathQuill.keystroke("Left"); // into parentheses
        mathQuill.keystroke("Left"); // out of parentheses
        mathQuill.keystroke("Left"); // into index
    },

    NTHROOT3: (mathQuill) => {
        mathQuill.typedText("nthroot3");
        mathQuill.keystroke("Right");
    },

    POW: (mathQuill) => {
        const contents = mathQuill.latex();
        mathQuill.typedText("^");

        // If the input hasn't changed (for example, if we're
        // attempting to add an exponent on an empty input or an empty
        // denominator), insert our own "a^b"
        if (mathQuill.latex() === contents) {
            mathQuill.typedText("a^b");
        }
    },

    // These need to be overwritten by the consumer
    // if they're going to be used
    DISMISS: () => {},
    NOOP: () => {},
    MANY: () => {},

    NUM_0: buildGenericCallback("0"),
    NUM_1: buildGenericCallback("1"),
    NUM_2: buildGenericCallback("2"),
    NUM_3: buildGenericCallback("3"),
    NUM_4: buildGenericCallback("4"),
    NUM_5: buildGenericCallback("5"),
    NUM_6: buildGenericCallback("6"),
    NUM_7: buildGenericCallback("7"),
    NUM_8: buildGenericCallback("8"),
    NUM_9: buildGenericCallback("9"),
    a: buildGenericCallback("a"),
    b: buildGenericCallback("b"),
    c: buildGenericCallback("c"),
    d: buildGenericCallback("d"),
    e: buildGenericCallback("e"),
    f: buildGenericCallback("f"),
    g: buildGenericCallback("g"),
    h: buildGenericCallback("h"),
    i: buildGenericCallback("i"),
    j: buildGenericCallback("j"),
    k: buildGenericCallback("k"),
    l: buildGenericCallback("l"),
    m: buildGenericCallback("m"),
    n: buildGenericCallback("n"),
    o: buildGenericCallback("o"),
    p: buildGenericCallback("p"),
    q: buildGenericCallback("q"),
    r: buildGenericCallback("r"),
    s: buildGenericCallback("s"),
    t: buildGenericCallback("t"),
    u: buildGenericCallback("u"),
    v: buildGenericCallback("v"),
    w: buildGenericCallback("w"),
    x: buildGenericCallback("x"),
    y: buildGenericCallback("y"),
    z: buildGenericCallback("z"),
    A: buildGenericCallback("A"),
    B: buildGenericCallback("B"),
    C: buildGenericCallback("C"),
    D: buildGenericCallback("D"),
    E: buildGenericCallback("E"),
    F: buildGenericCallback("F"),
    G: buildGenericCallback("G"),
    H: buildGenericCallback("H"),
    I: buildGenericCallback("I"),
    J: buildGenericCallback("J"),
    K: buildGenericCallback("K"),
    L: buildGenericCallback("L"),
    M: buildGenericCallback("M"),
    N: buildGenericCallback("N"),
    O: buildGenericCallback("O"),
    P: buildGenericCallback("P"),
    Q: buildGenericCallback("Q"),
    R: buildGenericCallback("R"),
    S: buildGenericCallback("S"),
    T: buildGenericCallback("T"),
    U: buildGenericCallback("U"),
    V: buildGenericCallback("V"),
    W: buildGenericCallback("W"),
    X: buildGenericCallback("X"),
    Y: buildGenericCallback("Y"),
    Z: buildGenericCallback("Z"),
};

export default keyToMathquillMap;
