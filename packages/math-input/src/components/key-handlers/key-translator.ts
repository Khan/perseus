import {getDecimalSeparator, getDivideSymbol} from "@khanacademy/perseus-core";

import {MathFieldActionType} from "../../types";
import {mathQuillInstance} from "../input/mathquill-instance";

import handleArrow from "./handle-arrow";
import handleExponent from "./handle-exponent";
import handleJumpOut from "./handle-jump-out";

import type {
    MathFieldInterface,
    MathFieldUpdaterCallback,
} from "../input/mathquill-types";
import type {KeypadKey} from "@khanacademy/perseus-core";

function buildGenericCallback(
    str: string,
    type: MathFieldActionType = MathFieldActionType.WRITE,
): MathFieldUpdaterCallback {
    return function (mathQuill: MathFieldInterface) {
        switch (type) {
            case MathFieldActionType.WRITE: {
                mathQuill.write(str);
                return;
            }
            case MathFieldActionType.CMD: {
                mathQuill.cmd(str);
                return;
            }
            case MathFieldActionType.KEYSTROKE: {
                mathQuill.keystroke(str);
                return;
            }
        }
    };
}

/**
 * This lets us use translated functions
 * (like tg->tan and sen->sin) when we know it's safe to.
 * This lets us progressively support translations without needing
 * to support every language all at once.
 *
 * @param {string} command - the translated command/function to check
 * @param {string[]} supportedTranslations - list of translations we support
 * @param {string} defaultCommand - what to fallback to if the command isn't supported
 */
function buildTranslatableFunctionCallback(
    command: string,
    supportedTranslations: string[],
    defaultCommand: string,
) {
    const cmd = supportedTranslations.includes(command)
        ? command
        : defaultCommand;
    return function (mathField: MathFieldInterface) {
        mathField.write(`${cmd}\\left(\\right)`);
        mathField.keystroke("Left");
    };
}

function buildNormalFunctionCallback(command: string) {
    return function (mathField: MathFieldInterface) {
        mathField.write(`\\${command}\\left(\\right)`);
        mathField.keystroke("Left");
    };
}

type KeyTranslatorStrings = {
    sin: string;
    cos: string;
    tan: string;
};

export const getKeyTranslator = (
    locale: string,
    strings: KeyTranslatorStrings,
): Record<KeypadKey, MathFieldUpdaterCallback> => ({
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

    COS: buildNormalFunctionCallback(strings.cos),
    SIN: buildTranslatableFunctionCallback(strings.sin, ["sin", "sen"], "sin"),
    TAN: buildTranslatableFunctionCallback(strings.tan, ["tan", "tg"], "tan"),

    CDOT: buildGenericCallback("\\cdot"),
    DECIMAL: buildGenericCallback(getDecimalSeparator(locale)),
    DIVIDE: buildGenericCallback(getDivideSymbol(locale)),
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
    FRAC_INCLUSIVE: buildGenericCallback("/", MathFieldActionType.CMD),
    FRAC: buildGenericCallback("\\frac", MathFieldActionType.CMD),
    LEFT_PAREN: buildGenericCallback("(", MathFieldActionType.CMD),
    RIGHT_PAREN: buildGenericCallback(")", MathFieldActionType.CMD),
    SQRT: buildGenericCallback("sqrt", MathFieldActionType.CMD),
    PI: buildGenericCallback("pi", MathFieldActionType.CMD),
    THETA: buildGenericCallback("theta", MathFieldActionType.CMD),
    RADICAL: buildGenericCallback("nthroot", MathFieldActionType.CMD),

    BACKSPACE: buildGenericCallback("Backspace", MathFieldActionType.KEYSTROKE),
    UP: buildGenericCallback("Up", MathFieldActionType.KEYSTROKE),
    DOWN: buildGenericCallback("Down", MathFieldActionType.KEYSTROKE),

    CUBE_ROOT: (mathQuill) => {
        mathQuill.write("\\sqrt[3]{}");
        mathQuill.keystroke("Left"); // under the root
    },

    FRAC_EXCLUSIVE: (mathQuill) => {
        const cursor = mathQuill.cursor();
        // If there's nothing to the left of the cursor, then we want to
        // leave the cursor to the left of the fraction after creating it.
        const shouldNavigateLeft =
            cursor[mathQuillInstance.L] === MathFieldActionType.MQ_END;
        mathQuill.cmd("\\frac");
        if (shouldNavigateLeft) {
            mathQuill.keystroke("Left");
        }
    },

    LOG_N: (mathQuill) => {
        mathQuill.write("log_{ }\\left(\\right)");
        mathQuill.keystroke("Left"); // into parentheses
        mathQuill.keystroke("Left"); // out of parentheses
        mathQuill.keystroke("Left"); // into index
    },

    // These need to be overwritten by the consumer
    // if they're going to be used
    DISMISS: () => {},

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
});
