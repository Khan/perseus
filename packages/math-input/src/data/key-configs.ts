/**
 * This file contains configuration settings for the buttons in the keypad.
 */
import * as i18n from "@khanacademy/wonder-blocks-i18n";

import type Key from "./keys";
import type {KeyType} from "../enums";
import type {KeyConfig} from "../types";

type KeyConfigMapper = (args: {
    key: Key;
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

const KeyConfigs: {
    [key in Key]: KeyConfig;
} = {
    // Basic math
    PLUS: {
        ...getDefaultOperatorFields({
            key: "PLUS",
            // I18N: A label for a 'plus' sign.
            ariaLabel: i18n._("Plus"),
        }),
    },
    MINUS: {
        ...getDefaultOperatorFields({
            key: "MINUS",
            // I18N: A label for a 'minus' sign.
            ariaLabel: i18n._("Minus"),
        }),
    },
    NEGATIVE: {
        ...getDefaultOperatorFields({
            key: "NEGATIVE",
            // I18N: A label for a 'negative' sign.
            ariaLabel: i18n._("Negative"),
        }),
    },
    TIMES: {
        ...getDefaultOperatorFields({
            key: "TIMES",
            // I18N: A label for a 'multiply' sign.
            ariaLabel: i18n._("Multiply"),
        }),
    },
    DIVIDE: {
        ...getDefaultOperatorFields({
            key: "DIVIDE",
            // I18N: A label for a 'divide' sign.
            ariaLabel: i18n._("Divide"),
        }),
    },
    DECIMAL: {
        ...getDefaultOperatorFields({
            key: "DECIMAL",
            keyType: "VALUE",
            // I18N: A label for a 'decimal' sign (represented as '.' or ',').
            ariaLabel: i18n._("Decimal"),
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
            // I18N: A label for a 'percent' sign (represented as '%').
            ariaLabel: i18n._("Percent"),
        }),
    },
    CDOT: {
        ...getDefaultOperatorFields({
            key: "CDOT",
            // I18N: A label for a 'centered dot' multiplication sign (represented as '⋅').
            ariaLabel: i18n._("Multiply"),
        }),
    },
    EQUAL: {
        ...getDefaultOperatorFields({
            key: "EQUAL",
            // I18N: A label for an 'equals' sign (represented as '=').
            ariaLabel: i18n._("Equals sign"),
        }),
    },
    NEQ: {
        ...getDefaultOperatorFields({
            key: "NEQ",
            // I18N: A label for a 'not-equals' sign (represented as '≠').
            ariaLabel: i18n._("Not-equals sign"),
        }),
    },
    GT: {
        ...getDefaultOperatorFields({
            key: "GT",
            // I18N: A label for a 'greater than' sign (represented as '>').
            ariaLabel: i18n._("Greater than sign"),
        }),
    },
    LT: {
        ...getDefaultOperatorFields({
            key: "LT",
            // I18N: A label for a 'less than' sign (represented as '<').
            ariaLabel: i18n._("Less than sign"),
        }),
    },
    GEQ: {
        ...getDefaultOperatorFields({
            key: "GEQ",
            // I18N: A label for a 'greater than or equal to' sign (represented as '≥').
            ariaLabel: i18n._("Greater than or equal to sign"),
        }),
    },
    LEQ: {
        ...getDefaultOperatorFields({
            key: "LEQ",
            // I18N: A label for a 'less than or equal to' sign (represented as '≤').
            ariaLabel: i18n._("Less than or equal to sign"),
        }),
    },
    // mobile native
    FRAC_INCLUSIVE: {
        ...getDefaultOperatorFields({
            key: "FRAC_INCLUSIVE",
            // I18N: A label for a button that creates a new fraction and puts the
            // current expression in the numerator of that fraction.
            ariaLabel: i18n._("Fraction, with current expression in numerator"),
        }),
    },
    // mobile native
    FRAC_EXCLUSIVE: {
        ...getDefaultOperatorFields({
            key: "FRAC_EXCLUSIVE",
            // I18N: A label for a button that creates a new fraction next to the
            // cursor.
            ariaLabel: i18n._("Fraction, excluding the current expression"),
        }),
    },
    // mobile web
    FRAC: {
        ...getDefaultOperatorFields({
            key: "FRAC",
            // I18N: A label for a button that creates a new fraction next to the
            // cursor.
            ariaLabel: i18n._("Fraction, excluding the current expression"),
        }),
    },
    EXP: {
        ...getDefaultOperatorFields({
            key: "EXP",
            // I18N: A label for a button that will allow the user to input a
            // custom exponent.
            ariaLabel: i18n._("Custom exponent"),
        }),
    },
    EXP_2: {
        ...getDefaultOperatorFields({
            key: "EXP_2",
            // I18N: A label for a button that will square (take to the second
            // power) some math.
            ariaLabel: i18n._("Square"),
        }),
    },
    EXP_3: {
        ...getDefaultOperatorFields({
            key: "EXP_3",
            // I18N: A label for a button that will cube (take to the third power)
            // some math.
            ariaLabel: i18n._("Cube"),
        }),
    },
    SQRT: {
        ...getDefaultOperatorFields({
            key: "SQRT",
            // I18N: A label for a button that will allow the user to input a
            // square root.
            ariaLabel: i18n._("Square root"),
        }),
    },
    CUBE_ROOT: {
        ...getDefaultOperatorFields({
            key: "CUBE_ROOT",
            // I18N: A label for a button that will allow the user to input a
            // cube root.
            ariaLabel: i18n._("Cube root"),
        }),
    },
    RADICAL: {
        ...getDefaultOperatorFields({
            key: "RADICAL",
            // I18N: A label for a button that will allow the user to input a
            // radical with a custom root.
            ariaLabel: i18n._("Radical with custom root"),
        }),
    },
    LEFT_PAREN: {
        ...getDefaultOperatorFields({
            key: "LEFT_PAREN",
            // I18N: A label for a button that will allow the user to input a
            // left parenthesis (i.e. '(')
            ariaLabel: i18n._("Left parenthesis"),
        }),
    },
    RIGHT_PAREN: {
        ...getDefaultOperatorFields({
            key: "RIGHT_PAREN",
            // I18N: A label for a button that will allow the user to input a
            // right parenthesis (i.e. ')')
            ariaLabel: i18n._("Right parenthesis"),
        }),
    },
    LN: {
        ...getDefaultOperatorFields({
            key: "LN",
            // I18N: A label for a button that will allow the user to input a
            // natural logarithm.
            ariaLabel: i18n._("Natural logarithm"),
        }),
    },
    LOG: {
        ...getDefaultOperatorFields({
            key: "LOG",
            // I18N: A label for a button that will allow the user to input a
            // logarithm with base 10.
            ariaLabel: i18n._("Logarithm with base 10"),
        }),
    },
    LOG_N: {
        ...getDefaultOperatorFields({
            key: "LOG_N",
            // I18N: A label for a button that will allow the user to input a
            // logarithm with a custom base.
            ariaLabel: i18n._("Logarithm with custom base"),
        }),
    },
    SIN: {
        ...getDefaultOperatorFields({
            key: "SIN",
            // I18N: A label for a button that will allow the user to input a
            // sine function.
            ariaLabel: i18n._("Sine"),
        }),
    },
    COS: {
        ...getDefaultOperatorFields({
            key: "COS",
            // I18N: A label for a button that will allow the user to input a
            // cosine function.
            ariaLabel: i18n._("Cosine"),
        }),
    },
    TAN: {
        ...getDefaultOperatorFields({
            key: "TAN",
            // I18N: A label for a button that will allow the user to input a
            // tangent function.
            ariaLabel: i18n._("Tangent"),
        }),
    },
    PI: {
        ...getDefaultValueFields({
            key: "PI",
            data: "\\pi",
            // I18N: A label for a button that will allow the user to input the
            // mathematical constant pi (i.e., π)
            ariaLabel: i18n._("Pi"),
        }),
    },
    THETA: {
        ...getDefaultValueFields({
            key: "THETA",
            data: "\\theta",
            // I18N: A label for a button that will allow the user to input the
            // mathematical constant theta (i.e., θ)
            ariaLabel: i18n._("Theta"),
        }),
    },
    NOOP: {
        ...getDefaultOperatorFields({
            key: "NOOP",
            keyType: "EMPTY",
        }),
    },
    // Input navigation
    UP: {
        ...getDefaultOperatorFields({
            key: "UP",
            keyType: "INPUT_NAVIGATION",
            ariaLabel: i18n._("Up arrow"),
        }),
    },
    RIGHT: {
        ...getDefaultOperatorFields({
            key: "RIGHT",
            keyType: "INPUT_NAVIGATION",
            ariaLabel: i18n._("Right arrow"),
        }),
    },
    DOWN: {
        ...getDefaultOperatorFields({
            key: "DOWN",
            keyType: "INPUT_NAVIGATION",
            ariaLabel: i18n._("Down arrow"),
        }),
    },
    LEFT: {
        ...getDefaultOperatorFields({
            key: "LEFT",
            keyType: "INPUT_NAVIGATION",
            ariaLabel: i18n._("Left arrow"),
        }),
    },
    JUMP_OUT_PARENTHESES: {
        ...getDefaultOperatorFields({
            key: "JUMP_OUT_PARENTHESES",
            keyType: "INPUT_NAVIGATION",
            ariaLabel: i18n._("Navigate right out of a set of parentheses"),
        }),
    },
    JUMP_OUT_EXPONENT: {
        ...getDefaultOperatorFields({
            key: "JUMP_OUT_EXPONENT",
            keyType: "INPUT_NAVIGATION",
            ariaLabel: i18n._("Navigate right out of an exponent"),
        }),
    },
    JUMP_OUT_BASE: {
        ...getDefaultOperatorFields({
            key: "JUMP_OUT_BASE",
            keyType: "INPUT_NAVIGATION",
            ariaLabel: i18n._("Navigate right out of a base"),
        }),
    },
    JUMP_INTO_NUMERATOR: {
        ...getDefaultOperatorFields({
            key: "JUMP_INTO_NUMERATOR",
            keyType: "INPUT_NAVIGATION",
            ariaLabel: i18n._(
                "Navigate right into the numerator of a fraction",
            ),
        }),
    },
    JUMP_OUT_NUMERATOR: {
        ...getDefaultOperatorFields({
            key: "JUMP_OUT_NUMERATOR",
            keyType: "INPUT_NAVIGATION",
            ariaLabel: i18n._(
                "Navigate right out of the numerator and into the denominator",
            ),
        }),
    },
    JUMP_OUT_DENOMINATOR: {
        ...getDefaultOperatorFields({
            key: "JUMP_OUT_DENOMINATOR",
            keyType: "INPUT_NAVIGATION",
            ariaLabel: i18n._(
                "Navigate right out of the denominator of a fraction",
            ),
        }),
    },
    BACKSPACE: {
        ...getDefaultOperatorFields({
            key: "BACKSPACE",
            keyType: "INPUT_NAVIGATION",
            ariaLabel: i18n._("Delete"),
        }),
    },

    // Keypad navigation
    DISMISS: {
        ...getDefaultOperatorFields({
            key: "DISMISS",
            keyType: "KEYPAD_NAVIGATION",
            // I18N: A label for a button that will dismiss/hide a keypad.
            ariaLabel: i18n._("Dismiss"),
        }),
    },

    // TODO(charlie): Use the numeral color for the 'Many' key.
    MANY: {
        ...getDefaultOperatorFields({
            key: "MANY",
            keyType: "MANY",
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
    PHI: {
        ...getDefaultValueFields({
            key: "PHI",
        }),
    },
    NTHROOT3: {
        ...getDefaultValueFields({
            key: "NTHROOT3",
        }),
    },
    POW: {
        ...getDefaultValueFields({
            key: "POW",
        }),
    },
    LOG_B: {
        ...getDefaultValueFields({
            key: "LOG_B",
        }),
    },
};

export default KeyConfigs;
