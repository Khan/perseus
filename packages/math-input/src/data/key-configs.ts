/**
 * This file contains configuration settings for the buttons in the keypad.
 */
import * as i18n from "@khanacademy/wonder-blocks-i18n";

import {DecimalSeparator, IconType, KeyType} from "../enums";
import {KeyConfig} from "../types";
import {decimalSeparator} from "../utils";

import Keys from "./keys";

// I tried to make the below {[key in Keys]: KeyConfig}
// but we are doing all kinds of sneaky magic that makes it hard to
// type this safely. Leaving it for now as a generic index signature.
const KeyConfigs: {
    [key in Keys]: KeyConfig;
} = {
    // Basic math keys.
    [Keys.PLUS]: {
        type: KeyType.OPERATOR,
        // I18N: A label for a plus sign.
        ariaLabel: i18n._("Plus"),
        id: Keys.PLUS,
    },
    [Keys.MINUS]: {
        type: KeyType.OPERATOR,
        // I18N: A label for a minus sign.
        ariaLabel: i18n._("Minus"),
        id: Keys.MINUS,
    },
    [Keys.NEGATIVE]: {
        type: KeyType.VALUE,
        // I18N: A label for a minus sign.
        ariaLabel: i18n._("Negative"),
        id: Keys.NEGATIVE,
    },
    [Keys.TIMES]: {
        type: KeyType.OPERATOR,
        // I18N: A label for a multiplication sign (represented with an 'x').
        ariaLabel: i18n._("Multiply"),
        id: Keys.TIMES,
    },
    [Keys.DIVIDE]: {
        type: KeyType.OPERATOR,
        // I18N: A label for a division sign.
        ariaLabel: i18n._("Divide"),
        id: Keys.DIVIDE,
    },
    [Keys.DECIMAL]: {
        type: KeyType.VALUE,
        // I18N: A label for a decimal symbol.
        ariaLabel: i18n._("Decimal"),
        icon:
            decimalSeparator === DecimalSeparator.COMMA
                ? {
                      // TODO(charlie): Get an SVG icon for the comma, or verify with
                      // design that the text-rendered version is acceptable.
                      type: IconType.TEXT,
                      data: ",",
                  }
                : {
                      type: IconType.SVG,
                      data: Keys.PERIOD,
                  },
        id: Keys.DECIMAL,
    },
    [Keys.PERIOD]: {
        type: KeyType.VALUE,
        ariaLabel: ".",
        icon: {
            type: IconType.SVG,
            data: Keys.PERIOD,
        },
        id: Keys.PERIOD,
    },
    [Keys.PERCENT]: {
        type: KeyType.OPERATOR,
        // I18N: A label for a percent sign.
        ariaLabel: i18n._("Percent"),
        id: Keys.PERCENT,
    },
    [Keys.CDOT]: {
        type: KeyType.OPERATOR,
        // I18N: A label for a multiplication sign (represented as a dot).
        ariaLabel: i18n._("Multiply"),
        id: Keys.CDOT,
    },
    [Keys.EQUAL]: {
        type: KeyType.OPERATOR,
        ariaLabel: i18n._("Equals sign"),
        id: Keys.EQUAL,
    },
    [Keys.NEQ]: {
        type: KeyType.OPERATOR,
        ariaLabel: i18n._("Not-equals sign"),
        id: Keys.NEQ,
    },
    [Keys.GT]: {
        type: KeyType.OPERATOR,
        // I18N: A label for a 'greater than' sign (represented as '>').
        ariaLabel: i18n._("Greater than sign"),
        id: Keys.GT,
    },
    [Keys.LT]: {
        type: KeyType.OPERATOR,
        // I18N: A label for a 'less than' sign (represented as '<').
        ariaLabel: i18n._("Less than sign"),
        id: Keys.LT,
    },
    [Keys.GEQ]: {
        type: KeyType.OPERATOR,
        ariaLabel: i18n._("Greater than or equal to sign"),
        id: Keys.GEQ,
    },
    [Keys.LEQ]: {
        type: KeyType.OPERATOR,
        ariaLabel: i18n._("Less than or equal to sign"),
        id: Keys.LEQ,
    },
    // mobile native
    [Keys.FRAC_INCLUSIVE]: {
        type: KeyType.OPERATOR,
        // I18N: A label for a button that creates a new fraction and puts the
        // current expression in the numerator of that fraction.
        ariaLabel: i18n._("Fraction, with current expression in numerator"),
        id: Keys.FRAC_INCLUSIVE,
    },
    // mobile native
    [Keys.FRAC_EXCLUSIVE]: {
        type: KeyType.OPERATOR,
        // I18N: A label for a button that creates a new fraction next to the
        // cursor.
        ariaLabel: i18n._("Fraction, excluding the current expression"),
        id: Keys.FRAC_EXCLUSIVE,
    },
    // mobile web
    [Keys.FRAC]: {
        type: KeyType.OPERATOR,
        // I18N: A label for a button that creates a new fraction next to the
        // cursor.
        ariaLabel: i18n._("Fraction, excluding the current expression"),
        id: Keys.FRAC,
    },
    [Keys.EXP]: {
        type: KeyType.OPERATOR,
        // I18N: A label for a button that will allow the user to input a custom
        // exponent.
        ariaLabel: i18n._("Custom exponent"),
        id: Keys.EXP,
    },
    [Keys.EXP_2]: {
        type: KeyType.OPERATOR,
        // I18N: A label for a button that will square (take to the second
        // power) some math.
        ariaLabel: i18n._("Square"),
        id: Keys.EXP_2,
    },
    [Keys.EXP_3]: {
        type: KeyType.OPERATOR,
        // I18N: A label for a button that will cube (take to the third power)
        // some math.
        ariaLabel: i18n._("Cube"),
        id: Keys.EXP_3,
    },
    [Keys.SQRT]: {
        type: KeyType.OPERATOR,
        ariaLabel: i18n._("Square root"),
        id: Keys.SQRT,
    },
    [Keys.CUBE_ROOT]: {
        type: KeyType.OPERATOR,
        ariaLabel: i18n._("Cube root"),
        id: Keys.CUBE_ROOT,
    },
    [Keys.RADICAL]: {
        type: KeyType.OPERATOR,
        ariaLabel: i18n._("Radical with custom root"),
        id: Keys.RADICAL,
    },
    [Keys.LEFT_PAREN]: {
        type: KeyType.OPERATOR,
        ariaLabel: i18n._("Left parenthesis"),
        id: Keys.LEFT_PAREN,
    },
    [Keys.RIGHT_PAREN]: {
        type: KeyType.OPERATOR,
        ariaLabel: i18n._("Right parenthesis"),
        id: Keys.RIGHT_PAREN,
    },
    [Keys.LN]: {
        type: KeyType.OPERATOR,
        ariaLabel: i18n._("Natural logarithm"),
        id: Keys.LN,
    },
    [Keys.LOG]: {
        type: KeyType.OPERATOR,
        ariaLabel: i18n._("Logarithm with base 10"),
        id: Keys.LOG,
    },
    [Keys.LOG_N]: {
        type: KeyType.OPERATOR,
        ariaLabel: i18n._("Logarithm with custom base"),
        id: Keys.LOG_N,
    },
    [Keys.SIN]: {
        type: KeyType.OPERATOR,
        ariaLabel: i18n._("Sine"),
        id: Keys.SIN,
    },
    [Keys.COS]: {
        type: KeyType.OPERATOR,
        ariaLabel: i18n._("Cosine"),
        id: Keys.COS,
    },
    [Keys.TAN]: {
        type: KeyType.OPERATOR,
        ariaLabel: i18n._("Tangent"),
        id: Keys.TAN,
    },
    [Keys.PI]: {
        type: KeyType.VALUE,
        ariaLabel: i18n._("Pi"),
        icon: {
            type: IconType.MATH,
            data: "\\pi",
        },
        id: Keys.PI,
    },
    [Keys.THETA]: {
        type: KeyType.VALUE,
        ariaLabel: i18n._("Theta"),
        icon: {
            type: IconType.MATH,
            data: "\\theta",
        },
        id: Keys.THETA,
    },
    [Keys.NOOP]: {
        type: KeyType.EMPTY,
        id: Keys.NOOP,
    },

    // Input navigation keys.
    [Keys.UP]: {
        type: KeyType.INPUT_NAVIGATION,
        ariaLabel: i18n._("Up arrow"),
        id: Keys.UP,
    },
    [Keys.RIGHT]: {
        type: KeyType.INPUT_NAVIGATION,
        ariaLabel: i18n._("Right arrow"),
        id: Keys.RIGHT,
    },
    [Keys.DOWN]: {
        type: KeyType.INPUT_NAVIGATION,
        ariaLabel: i18n._("Down arrow"),
        id: Keys.DOWN,
    },
    [Keys.LEFT]: {
        type: KeyType.INPUT_NAVIGATION,
        ariaLabel: i18n._("Left arrow"),
        id: Keys.LEFT,
    },
    [Keys.JUMP_OUT_PARENTHESES]: {
        type: KeyType.INPUT_NAVIGATION,
        ariaLabel: i18n._("Navigate right out of a set of parentheses"),
        id: Keys.JUMP_OUT_PARENTHESES,
    },
    [Keys.JUMP_OUT_EXPONENT]: {
        type: KeyType.INPUT_NAVIGATION,
        ariaLabel: i18n._("Navigate right out of an exponent"),
        id: Keys.JUMP_OUT_EXPONENT,
    },
    [Keys.JUMP_OUT_BASE]: {
        type: KeyType.INPUT_NAVIGATION,
        ariaLabel: i18n._("Navigate right out of a base"),
        id: Keys.JUMP_OUT_BASE,
    },
    [Keys.JUMP_INTO_NUMERATOR]: {
        type: KeyType.INPUT_NAVIGATION,
        ariaLabel: i18n._("Navigate right into the numerator of a fraction"),
        id: Keys.JUMP_INTO_NUMERATOR,
    },
    [Keys.JUMP_OUT_NUMERATOR]: {
        type: KeyType.INPUT_NAVIGATION,
        ariaLabel: i18n._(
            "Navigate right out of the numerator and into the denominator",
        ),
        id: Keys.JUMP_OUT_NUMERATOR,
    },
    [Keys.JUMP_OUT_DENOMINATOR]: {
        type: KeyType.INPUT_NAVIGATION,
        ariaLabel: i18n._(
            "Navigate right out of the denominator of a fraction",
        ),
        id: Keys.JUMP_OUT_DENOMINATOR,
    },
    [Keys.BACKSPACE]: {
        type: KeyType.INPUT_NAVIGATION,
        // I18N: A label for a button that will delete some input.
        ariaLabel: i18n._("Delete"),
        id: Keys.BACKSPACE,
    },

    // Keypad navigation keys.
    [Keys.DISMISS]: {
        type: KeyType.KEYPAD_NAVIGATION,
        // I18N: A label for a button that will dismiss/hide a keypad.
        ariaLabel: i18n._("Dismiss"),
        id: Keys.DISMISS,
    },

    // TODO(charlie): Use the numeral color for the 'Many' key.
    [Keys.MANY]: {
        id: Keys.MANY,
        type: KeyType.MANY,
    },

    // NUMBERS
    [Keys.NUM_0]: {
        type: KeyType.VALUE,
        ariaLabel: "0",
        icon: {
            type: IconType.TEXT,
            data: "0",
        },
        id: Keys.NUM_0,
    },
    [Keys.NUM_1]: {
        type: KeyType.VALUE,
        ariaLabel: "1",
        icon: {
            type: IconType.TEXT,
            data: "1",
        },
        id: Keys.NUM_1,
    },
    [Keys.NUM_2]: {
        type: KeyType.VALUE,
        ariaLabel: "2",
        icon: {
            type: IconType.TEXT,
            data: "2",
        },
        id: Keys.NUM_2,
    },
    [Keys.NUM_3]: {
        type: KeyType.VALUE,
        ariaLabel: "3",
        icon: {
            type: IconType.TEXT,
            data: "3",
        },
        id: Keys.NUM_3,
    },
    [Keys.NUM_4]: {
        type: KeyType.VALUE,
        ariaLabel: "4",
        icon: {
            type: IconType.TEXT,
            data: "4",
        },
        id: Keys.NUM_4,
    },
    [Keys.NUM_5]: {
        type: KeyType.VALUE,
        ariaLabel: "5",
        icon: {
            type: IconType.TEXT,
            data: "5",
        },
        id: Keys.NUM_5,
    },
    [Keys.NUM_6]: {
        type: KeyType.VALUE,
        ariaLabel: "6",
        icon: {
            type: IconType.TEXT,
            data: "6",
        },
        id: Keys.NUM_6,
    },
    [Keys.NUM_7]: {
        type: KeyType.VALUE,
        ariaLabel: "7",
        icon: {
            type: IconType.TEXT,
            data: "7",
        },
        id: Keys.NUM_7,
    },
    [Keys.NUM_8]: {
        type: KeyType.VALUE,
        ariaLabel: "8",
        icon: {
            type: IconType.TEXT,
            data: "8",
        },
        id: Keys.NUM_8,
    },
    [Keys.NUM_9]: {
        type: KeyType.VALUE,
        ariaLabel: "9",
        icon: {
            type: IconType.TEXT,
            data: "9",
        },
        id: Keys.NUM_9,
    },

    // LETTERS (value handled below)
    [Keys.A]: {
        type: KeyType.VALUE,
        ariaLabel: "A",
        icon: {
            type: IconType.MATH,
            data: "B",
        },
        id: Keys.A,
    },
    [Keys.B]: {
        type: KeyType.VALUE,
        ariaLabel: "B",
        icon: {
            type: IconType.MATH,
            data: "B",
        },
        id: Keys.B,
    },
    [Keys.C]: {
        type: KeyType.VALUE,
        ariaLabel: "C",
        icon: {
            type: IconType.MATH,
            data: "C",
        },
        id: Keys.C,
    },
    [Keys.D]: {
        type: KeyType.VALUE,
        ariaLabel: "D",
        icon: {
            type: IconType.MATH,
            data: "D",
        },
        id: Keys.D,
    },
    [Keys.E]: {
        type: KeyType.VALUE,
        ariaLabel: "E",
        icon: {
            type: IconType.MATH,
            data: "E",
        },
        id: Keys.E,
    },
    [Keys.F]: {
        type: KeyType.VALUE,
        ariaLabel: "F",
        icon: {
            type: IconType.MATH,
            data: "F",
        },
        id: Keys.F,
    },
    [Keys.G]: {
        type: KeyType.VALUE,
        ariaLabel: "G",
        icon: {
            type: IconType.MATH,
            data: "G",
        },
        id: Keys.G,
    },
    [Keys.H]: {
        type: KeyType.VALUE,
        ariaLabel: "H",
        icon: {
            type: IconType.MATH,
            data: "H",
        },
        id: Keys.H,
    },
    [Keys.I]: {
        type: KeyType.VALUE,
        ariaLabel: "I",
        icon: {
            type: IconType.MATH,
            data: "I",
        },
        id: Keys.I,
    },
    [Keys.J]: {
        type: KeyType.VALUE,
        ariaLabel: "J",
        icon: {
            type: IconType.MATH,
            data: "J",
        },
        id: Keys.J,
    },
    [Keys.K]: {
        type: KeyType.VALUE,
        ariaLabel: "K",
        icon: {
            type: IconType.MATH,
            data: "K",
        },
        id: Keys.K,
    },
    [Keys.L]: {
        type: KeyType.VALUE,
        ariaLabel: "L",
        icon: {
            type: IconType.MATH,
            data: "L",
        },
        id: Keys.L,
    },
    [Keys.M]: {
        type: KeyType.VALUE,
        ariaLabel: "M",
        icon: {
            type: IconType.MATH,
            data: "M",
        },
        id: Keys.M,
    },
    [Keys.N]: {
        type: KeyType.VALUE,
        ariaLabel: "N",
        icon: {
            type: IconType.MATH,
            data: "N",
        },
        id: Keys.N,
    },
    [Keys.O]: {
        type: KeyType.VALUE,
        ariaLabel: "O",
        icon: {
            type: IconType.MATH,
            data: "O",
        },
        id: Keys.O,
    },
    [Keys.P]: {
        type: KeyType.VALUE,
        ariaLabel: "P",
        icon: {
            type: IconType.MATH,
            data: "P",
        },
        id: Keys.P,
    },
    [Keys.Q]: {
        type: KeyType.VALUE,
        ariaLabel: "Q",
        icon: {
            type: IconType.MATH,
            data: "Q",
        },
        id: Keys.Q,
    },
    [Keys.R]: {
        type: KeyType.VALUE,
        ariaLabel: "R",
        icon: {
            type: IconType.MATH,
            data: "R",
        },
        id: Keys.R,
    },
    [Keys.S]: {
        type: KeyType.VALUE,
        ariaLabel: "S",
        icon: {
            type: IconType.MATH,
            data: "S",
        },
        id: Keys.S,
    },
    [Keys.T]: {
        type: KeyType.VALUE,
        ariaLabel: "T",
        icon: {
            type: IconType.MATH,
            data: "T",
        },
        id: Keys.T,
    },
    [Keys.U]: {
        type: KeyType.VALUE,
        ariaLabel: "U",
        icon: {
            type: IconType.MATH,
            data: "U",
        },
        id: Keys.U,
    },
    [Keys.V]: {
        type: KeyType.VALUE,
        ariaLabel: "V",
        icon: {
            type: IconType.MATH,
            data: "V",
        },
        id: Keys.V,
    },
    [Keys.W]: {
        type: KeyType.VALUE,
        ariaLabel: "W",
        icon: {
            type: IconType.MATH,
            data: "W",
        },
        id: Keys.W,
    },
    [Keys.X]: {
        type: KeyType.VALUE,
        ariaLabel: "X",
        icon: {
            type: IconType.MATH,
            data: "X",
        },
        id: Keys.X,
    },
    [Keys.Y]: {
        type: KeyType.VALUE,
        ariaLabel: "Y",
        icon: {
            type: IconType.MATH,
            data: "Y",
        },
        id: Keys.Y,
    },
    [Keys.Z]: {
        type: KeyType.VALUE,
        ariaLabel: "Z",
        icon: {
            type: IconType.MATH,
            data: "Z",
        },
        id: Keys.Z,
    },
    [Keys.a]: {
        type: KeyType.VALUE,
        ariaLabel: "a",
        icon: {
            type: IconType.MATH,
            data: "a",
        },
        id: Keys.a,
    },
    [Keys.b]: {
        type: KeyType.VALUE,
        ariaLabel: "b",
        icon: {
            type: IconType.MATH,
            data: "b",
        },
        id: Keys.b,
    },
    [Keys.c]: {
        type: KeyType.VALUE,
        ariaLabel: "c",
        icon: {
            type: IconType.MATH,
            data: "c",
        },
        id: Keys.c,
    },
    [Keys.d]: {
        type: KeyType.VALUE,
        ariaLabel: "d",
        icon: {
            type: IconType.MATH,
            data: "d",
        },
        id: Keys.d,
    },
    [Keys.e]: {
        type: KeyType.VALUE,
        ariaLabel: "e",
        icon: {
            type: IconType.MATH,
            data: "e",
        },
        id: Keys.e,
    },
    [Keys.f]: {
        type: KeyType.VALUE,
        ariaLabel: "f",
        icon: {
            type: IconType.MATH,
            data: "f",
        },
        id: Keys.f,
    },
    [Keys.g]: {
        type: KeyType.VALUE,
        ariaLabel: "g",
        icon: {
            type: IconType.MATH,
            data: "g",
        },
        id: Keys.g,
    },
    [Keys.h]: {
        type: KeyType.VALUE,
        ariaLabel: "h",
        icon: {
            type: IconType.MATH,
            data: "h",
        },
        id: Keys.h,
    },
    [Keys.i]: {
        type: KeyType.VALUE,
        ariaLabel: "i",
        icon: {
            type: IconType.MATH,
            data: "i",
        },
        id: Keys.i,
    },
    [Keys.j]: {
        type: KeyType.VALUE,
        ariaLabel: "j",
        icon: {
            type: IconType.MATH,
            data: "j",
        },
        id: Keys.j,
    },
    [Keys.k]: {
        type: KeyType.VALUE,
        ariaLabel: "k",
        icon: {
            type: IconType.MATH,
            data: "k",
        },
        id: Keys.k,
    },
    [Keys.l]: {
        type: KeyType.VALUE,
        ariaLabel: "l",
        icon: {
            type: IconType.MATH,
            data: "l",
        },
        id: Keys.l,
    },
    [Keys.m]: {
        type: KeyType.VALUE,
        ariaLabel: "m",
        icon: {
            type: IconType.MATH,
            data: "m",
        },
        id: Keys.m,
    },
    [Keys.n]: {
        type: KeyType.VALUE,
        ariaLabel: "n",
        icon: {
            type: IconType.MATH,
            data: "n",
        },
        id: Keys.n,
    },
    [Keys.o]: {
        type: KeyType.VALUE,
        ariaLabel: "o",
        icon: {
            type: IconType.MATH,
            data: "o",
        },
        id: Keys.o,
    },
    [Keys.p]: {
        type: KeyType.VALUE,
        ariaLabel: "p",
        icon: {
            type: IconType.MATH,
            data: "p",
        },
        id: Keys.p,
    },
    [Keys.q]: {
        type: KeyType.VALUE,
        ariaLabel: "q",
        icon: {
            type: IconType.MATH,
            data: "q",
        },
        id: Keys.q,
    },
    [Keys.r]: {
        type: KeyType.VALUE,
        ariaLabel: "r",
        icon: {
            type: IconType.MATH,
            data: "r",
        },
        id: Keys.r,
    },
    [Keys.s]: {
        type: KeyType.VALUE,
        ariaLabel: "s",
        icon: {
            type: IconType.MATH,
            data: "s",
        },
        id: Keys.s,
    },
    [Keys.t]: {
        type: KeyType.VALUE,
        ariaLabel: "y",
        icon: {
            type: IconType.MATH,
            data: "y",
        },
        id: Keys.y,
    },
    [Keys.u]: {
        type: KeyType.VALUE,
        ariaLabel: "u",
        icon: {
            type: IconType.MATH,
            data: "u",
        },
        id: Keys.u,
    },
    [Keys.v]: {
        type: KeyType.VALUE,
        ariaLabel: "v",
        icon: {
            type: IconType.MATH,
            data: "v",
        },
        id: Keys.v,
    },
    [Keys.w]: {
        type: KeyType.VALUE,
        ariaLabel: "w",
        icon: {
            type: IconType.MATH,
            data: "w",
        },
        id: Keys.w,
    },
    [Keys.x]: {
        type: KeyType.VALUE,
        ariaLabel: "x",
        icon: {
            type: IconType.MATH,
            data: "x",
        },
        id: Keys.x,
    },
    [Keys.y]: {
        type: KeyType.VALUE,
        ariaLabel: "y",
        icon: {
            type: IconType.MATH,
            data: "y",
        },
        id: Keys.y,
    },
    [Keys.z]: {
        type: KeyType.VALUE,
        ariaLabel: "z",
        icon: {
            type: IconType.MATH,
            data: "z",
        },
        id: Keys.z,
    },
};

for (const key of Object.keys(KeyConfigs)) {
    KeyConfigs[key] = {
        id: key,
        // Default to an SVG icon indexed by the key name.
        icon: {
            type: IconType.SVG,
            data: key,
        },
        ...KeyConfigs[key],
    };
}

export default KeyConfigs;
