/**
 * This file contains configuration settings for the buttons in the keypad.
 */

import type {KeyType} from "../enums";
import type {MathInputStrings} from "../strings";
import type {KeyConfig} from "../types";
import type {KeypadKey} from "@khanacademy/perseus-core";

type KeyConfigMapper = (args: {
    key: KeypadKey;
    keyType?: KeyType;
    ariaLabel?: string;
    data?: string;
}) => KeyConfig;

const getDefaultOperatorFields: KeyConfigMapper = ({
    key,
    keyType = "OPERATOR",
    ariaLabel = key,
    data = key,
}) => ({
    id: key,
    type: keyType,
    ariaLabel,
    icon: {
        data,
    },
});

const getDefaultValueFields: KeyConfigMapper = ({
    key,
    keyType = "VALUE",
    ariaLabel = key,
    data = key,
}) => ({
    id: key,
    type: keyType,
    ariaLabel,
    icon: {
        data,
    },
});

const getDefaultNumberFields: KeyConfigMapper = ({
    key,
    data = key.replace("NUM_", ""),
    keyType = "VALUE",
    ariaLabel = data,
}) => ({
    id: key,
    type: keyType,
    ariaLabel,
    icon: {
        data,
    },
});

const KeyConfigs = (
    strings: MathInputStrings,
): {
    [key in KeypadKey]: KeyConfig;
} => ({
    // Basic math
    PLUS: {
        ...getDefaultOperatorFields({
            key: "PLUS",
            ariaLabel: strings.plus,
        }),
    },
    MINUS: {
        ...getDefaultOperatorFields({
            key: "MINUS",
            ariaLabel: strings.minus,
        }),
    },
    NEGATIVE: {
        ...getDefaultOperatorFields({
            key: "NEGATIVE",
            ariaLabel: strings.negative,
        }),
    },
    TIMES: {
        ...getDefaultOperatorFields({
            key: "TIMES",
            ariaLabel: strings.times,
        }),
    },
    DIVIDE: {
        ...getDefaultOperatorFields({
            key: "DIVIDE",
            ariaLabel: strings.divide,
        }),
    },
    DECIMAL: {
        ...getDefaultOperatorFields({
            key: "DECIMAL",
            keyType: "VALUE",
            ariaLabel: strings.decimal,
        }),
    },
    PERIOD: {
        ...getDefaultOperatorFields({
            key: "PERIOD",
            keyType: "VALUE",
            ariaLabel: ".",
        }),
    },
    PERCENT: {
        ...getDefaultOperatorFields({
            key: "PERCENT",
            ariaLabel: strings.percent,
        }),
    },
    CDOT: {
        ...getDefaultOperatorFields({
            key: "CDOT",
            ariaLabel: strings.cdot,
        }),
    },
    EQUAL: {
        ...getDefaultOperatorFields({
            key: "EQUAL",
            ariaLabel: strings.equalsSign,
        }),
    },
    NEQ: {
        ...getDefaultOperatorFields({
            key: "NEQ",
            ariaLabel: strings.notEqualsSign,
        }),
    },
    GT: {
        ...getDefaultOperatorFields({
            key: "GT",
            ariaLabel: strings.greaterThanSign,
        }),
    },
    LT: {
        ...getDefaultOperatorFields({
            key: "LT",
            ariaLabel: strings.lessThanSign,
        }),
    },
    GEQ: {
        ...getDefaultOperatorFields({
            key: "GEQ",
            ariaLabel: strings.greaterThanOrEqualToSign,
        }),
    },
    LEQ: {
        ...getDefaultOperatorFields({
            key: "LEQ",
            ariaLabel: strings.lessThanOrEqualSign,
        }),
    },
    // mobile native
    FRAC_INCLUSIVE: {
        ...getDefaultOperatorFields({
            key: "FRAC_INCLUSIVE",
            ariaLabel: strings.fractionExpressionInNumerator,
        }),
    },
    // mobile native
    FRAC_EXCLUSIVE: {
        ...getDefaultOperatorFields({
            key: "FRAC_EXCLUSIVE",
            ariaLabel: strings.fractionExcludingExpression,
        }),
    },
    // mobile web
    FRAC: {
        ...getDefaultOperatorFields({
            key: "FRAC",
            ariaLabel: strings.fractionExcludingExpression,
        }),
    },
    EXP: {
        ...getDefaultOperatorFields({
            key: "EXP",
            ariaLabel: strings.customExponent,
        }),
    },
    EXP_2: {
        ...getDefaultOperatorFields({
            key: "EXP_2",
            ariaLabel: strings.square,
        }),
    },
    EXP_3: {
        ...getDefaultOperatorFields({
            key: "EXP_3",
            ariaLabel: strings.cube,
        }),
    },
    SQRT: {
        ...getDefaultOperatorFields({
            key: "SQRT",
            ariaLabel: strings.squareRoot,
        }),
    },
    CUBE_ROOT: {
        ...getDefaultOperatorFields({
            key: "CUBE_ROOT",
            ariaLabel: strings.cubeRoot,
        }),
    },
    RADICAL: {
        ...getDefaultOperatorFields({
            key: "RADICAL",
            ariaLabel: strings.radicalWithCustomRoot,
        }),
    },
    LEFT_PAREN: {
        ...getDefaultOperatorFields({
            key: "LEFT_PAREN",
            ariaLabel: strings.leftParenthesis,
        }),
    },
    RIGHT_PAREN: {
        ...getDefaultOperatorFields({
            key: "RIGHT_PAREN",
            ariaLabel: strings.rightParenthesis,
        }),
    },
    LN: {
        ...getDefaultOperatorFields({
            key: "LN",
            ariaLabel: strings.naturalLog,
        }),
    },
    LOG: {
        ...getDefaultOperatorFields({
            key: "LOG",
            ariaLabel: strings.logBase10,
        }),
    },
    LOG_N: {
        ...getDefaultOperatorFields({
            key: "LOG_N",
            ariaLabel: strings.logCustomBase,
        }),
    },
    SIN: {
        ...getDefaultOperatorFields({
            key: "SIN",
            ariaLabel: strings.sine,
        }),
    },
    COS: {
        ...getDefaultOperatorFields({
            key: "COS",
            ariaLabel: strings.cosine,
        }),
    },
    TAN: {
        ...getDefaultOperatorFields({
            key: "TAN",
            ariaLabel: strings.tangent,
        }),
    },
    PI: {
        ...getDefaultValueFields({
            key: "PI",
            data: "\\pi",
            ariaLabel: strings.pi,
        }),
    },
    THETA: {
        ...getDefaultValueFields({
            key: "THETA",
            data: "\\theta",
            ariaLabel: strings.theta,
        }),
    },
    // Input navigation
    UP: {
        ...getDefaultOperatorFields({
            key: "UP",
            keyType: "INPUT_NAVIGATION",
            ariaLabel: strings.upArrow,
        }),
    },
    RIGHT: {
        ...getDefaultOperatorFields({
            key: "RIGHT",
            keyType: "INPUT_NAVIGATION",
            ariaLabel: strings.rightArrow,
        }),
    },
    DOWN: {
        ...getDefaultOperatorFields({
            key: "DOWN",
            keyType: "INPUT_NAVIGATION",
            ariaLabel: strings.downArrow,
        }),
    },
    LEFT: {
        ...getDefaultOperatorFields({
            key: "LEFT",
            keyType: "INPUT_NAVIGATION",
            ariaLabel: strings.leftArrow,
        }),
    },
    JUMP_OUT_PARENTHESES: {
        ...getDefaultOperatorFields({
            key: "JUMP_OUT_PARENTHESES",
            keyType: "INPUT_NAVIGATION",
            ariaLabel: strings.navOutOfParentheses,
        }),
    },
    JUMP_OUT_EXPONENT: {
        ...getDefaultOperatorFields({
            key: "JUMP_OUT_EXPONENT",
            keyType: "INPUT_NAVIGATION",
            ariaLabel: strings.navOutOfExponent,
        }),
    },
    JUMP_OUT_BASE: {
        ...getDefaultOperatorFields({
            key: "JUMP_OUT_BASE",
            keyType: "INPUT_NAVIGATION",
            ariaLabel: strings.navOutOfBase,
        }),
    },
    JUMP_INTO_NUMERATOR: {
        ...getDefaultOperatorFields({
            key: "JUMP_INTO_NUMERATOR",
            keyType: "INPUT_NAVIGATION",
            ariaLabel: strings.navIntoNumerator,
        }),
    },
    JUMP_OUT_NUMERATOR: {
        ...getDefaultOperatorFields({
            key: "JUMP_OUT_NUMERATOR",
            keyType: "INPUT_NAVIGATION",
            ariaLabel: strings.navOutOfNumeratorIntoDenominator,
        }),
    },
    JUMP_OUT_DENOMINATOR: {
        ...getDefaultOperatorFields({
            key: "JUMP_OUT_DENOMINATOR",
            keyType: "INPUT_NAVIGATION",
            ariaLabel: strings.navOutOfDenominator,
        }),
    },
    BACKSPACE: {
        ...getDefaultOperatorFields({
            key: "BACKSPACE",
            keyType: "INPUT_NAVIGATION",
            ariaLabel: strings.delete,
        }),
    },

    // Keypad navigation
    DISMISS: {
        ...getDefaultOperatorFields({
            key: "DISMISS",
            keyType: "KEYPAD_NAVIGATION",
            ariaLabel: strings.dismiss,
        }),
    },

    // NUMBERS
    NUM_0: {
        ...getDefaultNumberFields({
            key: "NUM_0",
        }),
    },
    NUM_1: {
        ...getDefaultNumberFields({
            key: "NUM_1",
        }),
    },
    NUM_2: {
        ...getDefaultNumberFields({
            key: "NUM_2",
        }),
    },
    NUM_3: {
        ...getDefaultNumberFields({
            key: "NUM_3",
        }),
    },
    NUM_4: {
        ...getDefaultNumberFields({
            key: "NUM_4",
        }),
    },
    NUM_5: {
        ...getDefaultNumberFields({
            key: "NUM_5",
        }),
    },
    NUM_6: {
        ...getDefaultNumberFields({
            key: "NUM_6",
        }),
    },
    NUM_7: {
        ...getDefaultNumberFields({
            key: "NUM_7",
        }),
    },
    NUM_8: {
        ...getDefaultNumberFields({
            key: "NUM_8",
        }),
    },
    NUM_9: {
        ...getDefaultNumberFields({
            key: "NUM_9",
        }),
    },

    // LETTERS
    A: {
        ...getDefaultValueFields({
            key: "A",
        }),
    },
    B: {
        ...getDefaultValueFields({
            key: "B",
        }),
    },
    C: {
        ...getDefaultValueFields({
            key: "C",
        }),
    },
    D: {
        ...getDefaultValueFields({
            key: "D",
        }),
    },
    E: {
        ...getDefaultValueFields({
            key: "E",
        }),
    },
    F: {
        ...getDefaultValueFields({
            key: "F",
        }),
    },
    G: {
        ...getDefaultValueFields({
            key: "G",
        }),
    },
    H: {
        ...getDefaultValueFields({
            key: "H",
        }),
    },
    I: {
        ...getDefaultValueFields({
            key: "I",
        }),
    },
    J: {
        ...getDefaultValueFields({
            key: "J",
        }),
    },
    K: {
        ...getDefaultValueFields({
            key: "K",
        }),
    },
    L: {
        ...getDefaultValueFields({
            key: "L",
        }),
    },
    M: {
        ...getDefaultValueFields({
            key: "M",
        }),
    },
    N: {
        ...getDefaultValueFields({
            key: "N",
        }),
    },
    O: {
        ...getDefaultValueFields({
            key: "O",
        }),
    },
    P: {
        ...getDefaultValueFields({
            key: "P",
        }),
    },
    Q: {
        ...getDefaultValueFields({
            key: "Q",
        }),
    },
    R: {
        ...getDefaultValueFields({
            key: "R",
        }),
    },
    S: {
        ...getDefaultValueFields({
            key: "S",
        }),
    },
    T: {
        ...getDefaultValueFields({
            key: "T",
        }),
    },
    U: {
        ...getDefaultValueFields({
            key: "U",
        }),
    },
    V: {
        ...getDefaultValueFields({
            key: "V",
        }),
    },
    W: {
        ...getDefaultValueFields({
            key: "W",
        }),
    },
    X: {
        ...getDefaultValueFields({
            key: "X",
        }),
    },
    Y: {
        ...getDefaultValueFields({
            key: "Y",
        }),
    },
    Z: {
        ...getDefaultValueFields({
            key: "Z",
        }),
    },
    a: {
        ...getDefaultValueFields({
            key: "a",
        }),
    },
    b: {
        ...getDefaultValueFields({
            key: "b",
        }),
    },
    c: {
        ...getDefaultValueFields({
            key: "c",
        }),
    },
    d: {
        ...getDefaultValueFields({
            key: "d",
        }),
    },
    e: {
        ...getDefaultValueFields({
            key: "e",
        }),
    },
    f: {
        ...getDefaultValueFields({
            key: "f",
        }),
    },
    g: {
        ...getDefaultValueFields({
            key: "g",
        }),
    },
    h: {
        ...getDefaultValueFields({
            key: "h",
        }),
    },
    i: {
        ...getDefaultValueFields({
            key: "i",
        }),
    },
    j: {
        ...getDefaultValueFields({
            key: "j",
        }),
    },
    k: {
        ...getDefaultValueFields({
            key: "k",
        }),
    },
    l: {
        ...getDefaultValueFields({
            key: "l",
        }),
    },
    m: {
        ...getDefaultValueFields({
            key: "m",
        }),
    },
    n: {
        ...getDefaultValueFields({
            key: "n",
        }),
    },
    o: {
        ...getDefaultValueFields({
            key: "o",
        }),
    },
    p: {
        ...getDefaultValueFields({
            key: "p",
        }),
    },
    q: {
        ...getDefaultValueFields({
            key: "q",
        }),
    },
    r: {
        ...getDefaultValueFields({
            key: "r",
        }),
    },
    s: {
        ...getDefaultValueFields({
            key: "s",
        }),
    },
    t: {
        ...getDefaultValueFields({
            key: "t",
        }),
    },
    u: {
        ...getDefaultValueFields({
            key: "u",
        }),
    },
    v: {
        ...getDefaultValueFields({
            key: "v",
        }),
    },
    w: {
        ...getDefaultValueFields({
            key: "w",
        }),
    },
    x: {
        ...getDefaultValueFields({
            key: "x",
        }),
    },
    y: {
        ...getDefaultValueFields({
            key: "y",
        }),
    },
    z: {
        ...getDefaultValueFields({
            key: "z",
        }),
    },
});

export default KeyConfigs;
