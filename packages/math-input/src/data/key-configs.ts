/**
 * This file contains configuration settings for the buttons in the keypad.
 */
import * as i18n from "@khanacademy/wonder-blocks-i18n";

import {DecimalSeparator, IconType, KeyType} from "../enums";
import {IconConfig, KeyConfig} from "../types";
import {decimalSeparator} from "../utils";

import Key from "./keys";

const getKeyConfigFields = ({
    key,
    keyType = "OPERATOR",
    iconType = IconType.SVG,
    ariaLabel = key,
    data = key,
}: {
    key: Key;
    keyType?: KeyType;
    iconType?: IconType;
    ariaLabel?: string;
    data?: string;
}): {
    id: Key;
    type: KeyType;
    icon: IconConfig;
    ariaLabel: string;
} => ({
    id: key,
    type: keyType,
    ariaLabel,
    icon: {
        type: iconType,
        data,
    },
});

// I tried to make the below {[key in Keys"]: KeyConfig}
// but we are doing all kinds of sneaky magic that makes it hard to
// type this safely. Leaving it for now as a generic index signature.
const KeyConfigs: {
    [key in Key]: KeyConfig;
} = {
    // Basic math
    ["PLUS"]: {
        ...getKeyConfigFields({
            key: "PLUS",
            // I18N: A label for a 'plus' sign.
            ariaLabel: i18n._("Plus"),
        }),
    },
    ["MINUS"]: {
        ...getKeyConfigFields({
            key: "MINUS",
            // I18N: A label for a 'minus' sign.
            ariaLabel: i18n._("Minus"),
        }),
    },
    ["NEGATIVE"]: {
        ...getKeyConfigFields({
            key: "NEGATIVE",
            // I18N: A label for a 'negative' sign.
            ariaLabel: i18n._("Negative"),
        }),
    },
    ["TIMES"]: {
        ...getKeyConfigFields({
            key: "TIMES",
            // I18N: A label for a 'multiply' sign.
            ariaLabel: i18n._("Multiply"),
        }),
    },
    ["DIVIDE"]: {
        ...getKeyConfigFields({
            key: "DIVIDE",
            // I18N: A label for a 'divide' sign.
            ariaLabel: i18n._("Divide"),
        }),
    },
    ["DECIMAL"]: {
        ...getKeyConfigFields({
            key: "DECIMAL",
            keyType: "VALUE",
            // I18N: A label for a 'decimal' sign (represented as '.' or ',').
            ariaLabel: i18n._("Decimal"),
        }),
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
                      data: "PERIOD",
                  },
    },
    ["PERIOD"]: {
        ...getKeyConfigFields({
            key: "PERIOD",
            keyType: "VALUE",
            ariaLabel: ".",
        }),
    },
    ["PERCENT"]: {
        ...getKeyConfigFields({
            key: "PERCENT",
            // I18N: A label for a 'percent' sign (represented as '%').
            ariaLabel: i18n._("Percent"),
        }),
    },
    ["CDOT"]: {
        ...getKeyConfigFields({
            key: "CDOT",
            // I18N: A label for a 'centered dot' multiplication sign (represented as '⋅').
            ariaLabel: i18n._("Multiply"),
        }),
    },
    ["EQUAL"]: {
        ...getKeyConfigFields({
            key: "EQUAL",
            // I18N: A label for an 'equals' sign (represented as '=').
            ariaLabel: i18n._("Equals sign"),
        }),
    },
    ["NEQ"]: {
        ...getKeyConfigFields({
            key: "NEQ",
            // I18N: A label for a 'not-equals' sign (represented as '≠').
            ariaLabel: i18n._("Not-equals sign"),
        }),
    },
    ["GT"]: {
        ...getKeyConfigFields({
            key: "GT",
            // I18N: A label for a 'greater than' sign (represented as '>').
            ariaLabel: i18n._("Greater than sign"),
        }),
    },
    ["LT"]: {
        ...getKeyConfigFields({
            key: "LT",
            // I18N: A label for a 'less than' sign (represented as '<').
            ariaLabel: i18n._("Less than sign"),
        }),
    },
    ["GEQ"]: {
        ...getKeyConfigFields({
            key: "GEQ",
            // I18N: A label for a 'greater than or equal to' sign (represented as '≥').
            ariaLabel: i18n._("Greater than or equal to sign"),
        }),
    },
    ["LEQ"]: {
        ...getKeyConfigFields({
            key: "LEQ",
            // I18N: A label for a 'less than or equal to' sign (represented as '≤').
            ariaLabel: i18n._("Less than or equal to sign"),
        }),
    },
    // mobile native
    ["FRAC_INCLUSIVE"]: {
        ...getKeyConfigFields({
            key: "FRAC_INCLUSIVE",
            // I18N: A label for a button that creates a new fraction and puts the
            // current expression in the numerator of that fraction.
            ariaLabel: i18n._("Fraction, with current expression in numerator"),
        }),
    },
    // mobile native
    ["FRAC_EXCLUSIVE"]: {
        ...getKeyConfigFields({
            key: "FRAC_EXCLUSIVE",
            // I18N: A label for a button that creates a new fraction next to the
            // cursor.
            ariaLabel: i18n._("Fraction, excluding the current expression"),
        }),
    },
    // mobile web
    ["FRAC"]: {
        ...getKeyConfigFields({
            key: "FRAC",
            // I18N: A label for a button that creates a new fraction next to the
            // cursor.
            ariaLabel: i18n._("Fraction, excluding the current expression"),
        }),
    },
    ["EXP"]: {
        ...getKeyConfigFields({
            key: "EXP",
            // I18N: A label for a button that will allow the user to input a
            // custom exponent.
            ariaLabel: i18n._("Custom exponent"),
        }),
    },
    ["EXP_2"]: {
        ...getKeyConfigFields({
            key: "EXP_2",
            // I18N: A label for a button that will square (take to the second
            // power) some math.
            ariaLabel: i18n._("Square"),
        }),
    },
    ["EXP_3"]: {
        ...getKeyConfigFields({
            key: "EXP_3",
            // I18N: A label for a button that will cube (take to the third power)
            // some math.
            ariaLabel: i18n._("Cube"),
        }),
    },
    ["SQRT"]: {
        ...getKeyConfigFields({
            key: "SQRT",
            // I18N: A label for a button that will allow the user to input a
            // square root.
            ariaLabel: i18n._("Square root"),
        }),
    },
    ["CUBE_ROOT"]: {
        ...getKeyConfigFields({
            key: "CUBE_ROOT",
            // I18N: A label for a button that will allow the user to input a
            // cube root.
            ariaLabel: i18n._("Cube root"),
        }),
    },
    ["RADICAL"]: {
        ...getKeyConfigFields({
            key: "RADICAL",
            // I18N: A label for a button that will allow the user to input a
            // radical with a custom root.
            ariaLabel: i18n._("Radical with custom root"),
        }),
    },
    ["LEFT_PAREN"]: {
        ...getKeyConfigFields({
            key: "LEFT_PAREN",
            // I18N: A label for a button that will allow the user to input a
            // left parenthesis (i.e. '(')
            ariaLabel: i18n._("Left parenthesis"),
        }),
    },
    ["RIGHT_PAREN"]: {
        ...getKeyConfigFields({
            key: "RIGHT_PAREN",
            // I18N: A label for a button that will allow the user to input a
            // right parenthesis (i.e. ')')
            ariaLabel: i18n._("Right parenthesis"),
        }),
    },
    ["LN"]: {
        ...getKeyConfigFields({
            key: "LN",
            // I18N: A label for a button that will allow the user to input a
            // natural logarithm.
            ariaLabel: i18n._("Natural logarithm"),
        }),
    },
    ["LOG"]: {
        ...getKeyConfigFields({
            key: "LOG",
            // I18N: A label for a button that will allow the user to input a
            // logarithm with base 10.
            ariaLabel: i18n._("Logarithm with base 10"),
        }),
    },
    ["LOG_N"]: {
        ...getKeyConfigFields({
            key: "LOG_N",
            // I18N: A label for a button that will allow the user to input a
            // logarithm with a custom base.
            ariaLabel: i18n._("Logarithm with custom base"),
        }),
    },
    ["SIN"]: {
        ...getKeyConfigFields({
            key: "SIN",
            // I18N: A label for a button that will allow the user to input a
            // sine function.
            ariaLabel: i18n._("Sine"),
        }),
    },
    ["COS"]: {
        ...getKeyConfigFields({
            key: "COS",
            // I18N: A label for a button that will allow the user to input a
            // cosine function.
            ariaLabel: i18n._("Cosine"),
        }),
    },
    ["TAN"]: {
        ...getKeyConfigFields({
            key: "TAN",
            // I18N: A label for a button that will allow the user to input a
            // tangent function.
            ariaLabel: i18n._("Tangent"),
        }),
    },
    ["PI"]: {
        ...getKeyConfigFields({
            key: "PI",
            keyType: "VALUE",
            iconType: IconType.MATH,
            data: "\\pi",
            // I18N: A label for a button that will allow the user to input the
            // mathematical constant pi (i.e., π)
            ariaLabel: i18n._("Pi"),
        }),
    },
    ["THETA"]: {
        ...getKeyConfigFields({
            key: "THETA",
            keyType: "VALUE",
            iconType: IconType.MATH,
            data: "\\theta",
            // I18N: A label for a button that will allow the user to input the
            // mathematical constant theta (i.e., θ)
            ariaLabel: i18n._("Theta"),
        }),
    },
    ["NOOP"]: {
        ...getKeyConfigFields({
            key: "NOOP",
            keyType: "EMPTY",
        }),
    },
    // Input navigation
    ["UP"]: {
        ...getKeyConfigFields({
            key: "UP",
            keyType: "INPUT_NAVIGATION",
            ariaLabel: i18n._("Up arrow"),
        }),
    },
    ["RIGHT"]: {
        ...getKeyConfigFields({
            key: "RIGHT",
            keyType: "INPUT_NAVIGATION",
            ariaLabel: i18n._("Right arrow"),
        }),
    },
    ["DOWN"]: {
        ...getKeyConfigFields({
            key: "DOWN",
            keyType: "INPUT_NAVIGATION",
            ariaLabel: i18n._("Down arrow"),
        }),
    },
    ["LEFT"]: {
        ...getKeyConfigFields({
            key: "LEFT",
            keyType: "INPUT_NAVIGATION",
            ariaLabel: i18n._("Left arrow"),
        }),
    },
    ["JUMP_OUT_PARENTHESES"]: {
        ...getKeyConfigFields({
            key: "JUMP_OUT_PARENTHESES",
            keyType: "INPUT_NAVIGATION",
            ariaLabel: i18n._("Navigate right out of a set of parentheses"),
        }),
    },
    ["JUMP_OUT_EXPONENT"]: {
        ...getKeyConfigFields({
            key: "JUMP_OUT_EXPONENT",
            keyType: "INPUT_NAVIGATION",
            ariaLabel: i18n._("Navigate right out of an exponent"),
        }),
    },
    ["JUMP_OUT_BASE"]: {
        ...getKeyConfigFields({
            key: "JUMP_OUT_BASE",
            keyType: "INPUT_NAVIGATION",
            ariaLabel: i18n._("Navigate right out of a base"),
        }),
    },
    ["JUMP_INTO_NUMERATOR"]: {
        ...getKeyConfigFields({
            key: "JUMP_INTO_NUMERATOR",
            keyType: "INPUT_NAVIGATION",
            ariaLabel: i18n._(
                "Navigate right into the numerator of a fraction",
            ),
        }),
    },
    ["JUMP_OUT_NUMERATOR"]: {
        ...getKeyConfigFields({
            key: "JUMP_OUT_NUMERATOR",
            keyType: "INPUT_NAVIGATION",
            ariaLabel: i18n._(
                "Navigate right out of the numerator and into the denominator",
            ),
        }),
    },
    ["JUMP_OUT_DENOMINATOR"]: {
        ...getKeyConfigFields({
            key: "JUMP_OUT_DENOMINATOR",
            keyType: "INPUT_NAVIGATION",
            ariaLabel: i18n._(
                "Navigate right out of the denominator of a fraction",
            ),
        }),
    },
    ["BACKSPACE"]: {
        ...getKeyConfigFields({
            key: "BACKSPACE",
            keyType: "INPUT_NAVIGATION",
            ariaLabel: i18n._("Delete"),
        }),
    },

    // Keypad navigation
    ["DISMISS"]: {
        ...getKeyConfigFields({
            key: "DISMISS",
            keyType: "KEYPAD_NAVIGATION",
            // I18N: A label for a button that will dismiss/hide a keypad.
            ariaLabel: i18n._("Dismiss"),
        }),
    },

    // TODO(charlie): Use the numeral color for the 'Many' key.
    ["MANY"]: {
        ...getKeyConfigFields({
            key: "MANY",
            keyType: "MANY",
        }),
    },

    // NUMBERS
    ["NUM_0"]: {
        type: "VALUE",
        ariaLabel: "0",
        icon: {
            type: IconType.TEXT,
            data: "0",
        },
        id: "NUM_0",
    },
    ["NUM_1"]: {
        type: "VALUE",
        ariaLabel: "1",
        icon: {
            type: IconType.TEXT,
            data: "1",
        },
        id: "NUM_1",
    },
    ["NUM_2"]: {
        type: "VALUE",
        ariaLabel: "2",
        icon: {
            type: IconType.TEXT,
            data: "2",
        },
        id: "NUM_2",
    },
    ["NUM_3"]: {
        type: "VALUE",
        ariaLabel: "3",
        icon: {
            type: IconType.TEXT,
            data: "3",
        },
        id: "NUM_3",
    },
    ["NUM_4"]: {
        type: "VALUE",
        ariaLabel: "4",
        icon: {
            type: IconType.TEXT,
            data: "4",
        },
        id: "NUM_4",
    },
    ["NUM_5"]: {
        type: "VALUE",
        ariaLabel: "5",
        icon: {
            type: IconType.TEXT,
            data: "5",
        },
        id: "NUM_5",
    },
    ["NUM_6"]: {
        type: "VALUE",
        ariaLabel: "6",
        icon: {
            type: IconType.TEXT,
            data: "6",
        },
        id: "NUM_6",
    },
    ["NUM_7"]: {
        type: "VALUE",
        ariaLabel: "7",
        icon: {
            type: IconType.TEXT,
            data: "7",
        },
        id: "NUM_7",
    },
    ["NUM_8"]: {
        type: "VALUE",
        ariaLabel: "8",
        icon: {
            type: IconType.TEXT,
            data: "8",
        },
        id: "NUM_8",
    },
    ["NUM_9"]: {
        type: "VALUE",
        ariaLabel: "9",
        icon: {
            type: IconType.TEXT,
            data: "9",
        },
        id: "NUM_9",
    },

    // LETTERS (value handled below)
    ["A"]: {
        type: "VALUE",
        ariaLabel: "A",
        icon: {
            type: IconType.MATH,
            data: "B",
        },
        id: "A",
    },
    ["B"]: {
        type: "VALUE",
        ariaLabel: "B",
        icon: {
            type: IconType.MATH,
            data: "B",
        },
        id: "B",
    },
    ["C"]: {
        type: "VALUE",
        ariaLabel: "C",
        icon: {
            type: IconType.MATH,
            data: "C",
        },
        id: "C",
    },
    ["D"]: {
        type: "VALUE",
        ariaLabel: "D",
        icon: {
            type: IconType.MATH,
            data: "D",
        },
        id: "D",
    },
    ["E"]: {
        type: "VALUE",
        ariaLabel: "E",
        icon: {
            type: IconType.MATH,
            data: "E",
        },
        id: "E",
    },
    ["F"]: {
        type: "VALUE",
        ariaLabel: "F",
        icon: {
            type: IconType.MATH,
            data: "F",
        },
        id: "F",
    },
    ["G"]: {
        type: "VALUE",
        ariaLabel: "G",
        icon: {
            type: IconType.MATH,
            data: "G",
        },
        id: "G",
    },
    ["H"]: {
        type: "VALUE",
        ariaLabel: "H",
        icon: {
            type: IconType.MATH,
            data: "H",
        },
        id: "H",
    },
    ["I"]: {
        type: "VALUE",
        ariaLabel: "I",
        icon: {
            type: IconType.MATH,
            data: "I",
        },
        id: "I",
    },
    ["J"]: {
        type: "VALUE",
        ariaLabel: "J",
        icon: {
            type: IconType.MATH,
            data: "J",
        },
        id: "J",
    },
    ["K"]: {
        type: "VALUE",
        ariaLabel: "K",
        icon: {
            type: IconType.MATH,
            data: "K",
        },
        id: "K",
    },
    ["L"]: {
        type: "VALUE",
        ariaLabel: "L",
        icon: {
            type: IconType.MATH,
            data: "L",
        },
        id: "L",
    },
    ["M"]: {
        type: "VALUE",
        ariaLabel: "M",
        icon: {
            type: IconType.MATH,
            data: "M",
        },
        id: "M",
    },
    ["N"]: {
        type: "VALUE",
        ariaLabel: "N",
        icon: {
            type: IconType.MATH,
            data: "N",
        },
        id: "N",
    },
    ["O"]: {
        type: "VALUE",
        ariaLabel: "O",
        icon: {
            type: IconType.MATH,
            data: "O",
        },
        id: "O",
    },
    ["P"]: {
        type: "VALUE",
        ariaLabel: "P",
        icon: {
            type: IconType.MATH,
            data: "P",
        },
        id: "P",
    },
    ["Q"]: {
        type: "VALUE",
        ariaLabel: "Q",
        icon: {
            type: IconType.MATH,
            data: "Q",
        },
        id: "Q",
    },
    ["R"]: {
        type: "VALUE",
        ariaLabel: "R",
        icon: {
            type: IconType.MATH,
            data: "R",
        },
        id: "R",
    },
    ["S"]: {
        type: "VALUE",
        ariaLabel: "S",
        icon: {
            type: IconType.MATH,
            data: "S",
        },
        id: "S",
    },
    ["T"]: {
        type: "VALUE",
        ariaLabel: "T",
        icon: {
            type: IconType.MATH,
            data: "T",
        },
        id: "T",
    },
    ["U"]: {
        type: "VALUE",
        ariaLabel: "U",
        icon: {
            type: IconType.MATH,
            data: "U",
        },
        id: "U",
    },
    ["V"]: {
        type: "VALUE",
        ariaLabel: "V",
        icon: {
            type: IconType.MATH,
            data: "V",
        },
        id: "V",
    },
    ["W"]: {
        type: "VALUE",
        ariaLabel: "W",
        icon: {
            type: IconType.MATH,
            data: "W",
        },
        id: "W",
    },
    ["X"]: {
        type: "VALUE",
        ariaLabel: "X",
        icon: {
            type: IconType.MATH,
            data: "X",
        },
        id: "X",
    },
    ["Y"]: {
        type: "VALUE",
        ariaLabel: "Y",
        icon: {
            type: IconType.MATH,
            data: "Y",
        },
        id: "Y",
    },
    ["Z"]: {
        type: "VALUE",
        ariaLabel: "Z",
        icon: {
            type: IconType.MATH,
            data: "Z",
        },
        id: "Z",
    },
    ["a"]: {
        type: "VALUE",
        ariaLabel: "a",
        icon: {
            type: IconType.MATH,
            data: "a",
        },
        id: "a",
    },
    ["b"]: {
        type: "VALUE",
        ariaLabel: "b",
        icon: {
            type: IconType.MATH,
            data: "b",
        },
        id: "b",
    },
    ["c"]: {
        type: "VALUE",
        ariaLabel: "c",
        icon: {
            type: IconType.MATH,
            data: "c",
        },
        id: "c",
    },
    ["d"]: {
        type: "VALUE",
        ariaLabel: "d",
        icon: {
            type: IconType.MATH,
            data: "d",
        },
        id: "d",
    },
    ["e"]: {
        type: "VALUE",
        ariaLabel: "e",
        icon: {
            type: IconType.MATH,
            data: "e",
        },
        id: "e",
    },
    ["f"]: {
        type: "VALUE",
        ariaLabel: "f",
        icon: {
            type: IconType.MATH,
            data: "f",
        },
        id: "f",
    },
    ["g"]: {
        type: "VALUE",
        ariaLabel: "g",
        icon: {
            type: IconType.MATH,
            data: "g",
        },
        id: "g",
    },
    ["h"]: {
        type: "VALUE",
        ariaLabel: "h",
        icon: {
            type: IconType.MATH,
            data: "h",
        },
        id: "h",
    },
    ["i"]: {
        type: "VALUE",
        ariaLabel: "i",
        icon: {
            type: IconType.MATH,
            data: "i",
        },
        id: "i",
    },
    ["j"]: {
        type: "VALUE",
        ariaLabel: "j",
        icon: {
            type: IconType.MATH,
            data: "j",
        },
        id: "j",
    },
    ["k"]: {
        type: "VALUE",
        ariaLabel: "k",
        icon: {
            type: IconType.MATH,
            data: "k",
        },
        id: "k",
    },
    ["l"]: {
        type: "VALUE",
        ariaLabel: "l",
        icon: {
            type: IconType.MATH,
            data: "l",
        },
        id: "l",
    },
    ["m"]: {
        type: "VALUE",
        ariaLabel: "m",
        icon: {
            type: IconType.MATH,
            data: "m",
        },
        id: "m",
    },
    ["n"]: {
        type: "VALUE",
        ariaLabel: "n",
        icon: {
            type: IconType.MATH,
            data: "n",
        },
        id: "n",
    },
    ["o"]: {
        type: "VALUE",
        ariaLabel: "o",
        icon: {
            type: IconType.MATH,
            data: "o",
        },
        id: "o",
    },
    ["p"]: {
        type: "VALUE",
        ariaLabel: "p",
        icon: {
            type: IconType.MATH,
            data: "p",
        },
        id: "p",
    },
    ["q"]: {
        type: "VALUE",
        ariaLabel: "q",
        icon: {
            type: IconType.MATH,
            data: "q",
        },
        id: "q",
    },
    ["r"]: {
        type: "VALUE",
        ariaLabel: "r",
        icon: {
            type: IconType.MATH,
            data: "r",
        },
        id: "r",
    },
    ["s"]: {
        type: "VALUE",
        ariaLabel: "s",
        icon: {
            type: IconType.MATH,
            data: "s",
        },
        id: "s",
    },
    ["t"]: {
        type: "VALUE",
        ariaLabel: "y",
        icon: {
            type: IconType.MATH,
            data: "y",
        },
        id: "y",
    },
    ["u"]: {
        type: "VALUE",
        ariaLabel: "u",
        icon: {
            type: IconType.MATH,
            data: "u",
        },
        id: "u",
    },
    ["v"]: {
        type: "VALUE",
        ariaLabel: "v",
        icon: {
            type: IconType.MATH,
            data: "v",
        },
        id: "v",
    },
    ["w"]: {
        type: "VALUE",
        ariaLabel: "w",
        icon: {
            type: IconType.MATH,
            data: "w",
        },
        id: "w",
    },
    ["x"]: {
        type: "VALUE",
        ariaLabel: "x",
        icon: {
            type: IconType.MATH,
            data: "x",
        },
        id: "x",
    },
    ["y"]: {
        type: "VALUE",
        ariaLabel: "y",
        icon: {
            type: IconType.MATH,
            data: "y",
        },
        id: "y",
    },
    ["z"]: {
        type: "VALUE",
        ariaLabel: "z",
        icon: {
            type: IconType.MATH,
            data: "z",
        },
        id: "z",
    },
};

export default KeyConfigs;
