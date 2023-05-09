/**
 * This file contains constants for keypad buttons that aren't single
 * alphanumeric characters.
 */

// TODO(charlie): There's duplication between this file and key-configs.js.
// We should clean it up by removing this file and requiring clients to use the
// `id` field on the key configurations.
enum Keys {
    PLUS = "PLUS",
    MINUS = "MINUS",
    NEGATIVE = "NEGATIVE",
    TIMES = "TIMES",
    DIVIDE = "DIVIDE",
    DECIMAL = "DECIMAL",
    PERIOD = "PERIOD",
    PERCENT = "PERCENT",
    CDOT = "CDOT",
    EQUAL = "EQUAL",
    NEQ = "NEQ",
    GT = "GT",
    LT = "LT",
    GEQ = "GEQ",
    LEQ = "LEQ", // mobile native only
    FRAC_INCLUSIVE = "FRAC_INCLUSIVE", // mobile native only
    FRAC_EXCLUSIVE = "FRAC_EXCLUSIVE", // mobile native only
    FRAC = "FRAC",
    EXP = "EXP",
    EXP_2 = "EXP_2",
    EXP_3 = "EXP_3",
    SQRT = "SQRT",
    CUBE_ROOT = "CUBE_ROOT",
    RADICAL = "RADICAL",
    LEFT_PAREN = "LEFT_PAREN",
    RIGHT_PAREN = "RIGHT_PAREN",
    LN = "LN",
    LOG = "LOG",
    LOG_N = "LOG_N",
    SIN = "SIN",
    COS = "COS", // TODO(charlie): Add in additional Greek letters.
    TAN = "TAN",

    PI = "PI",
    THETA = "THETA",

    UP = "UP",
    RIGHT = "RIGHT",
    DOWN = "DOWN",
    LEFT = "LEFT",
    BACKSPACE = "BACKSPACE",
    DISMISS = "DISMISS",

    JUMP_OUT_PARENTHESES = "JUMP_OUT_PARENTHESES",
    JUMP_OUT_EXPONENT = "JUMP_OUT_EXPONENT",
    JUMP_OUT_BASE = "JUMP_OUT_BASE",
    JUMP_INTO_NUMERATOR = "JUMP_INTO_NUMERATOR",
    JUMP_OUT_NUMERATOR = "JUMP_OUT_NUMERATOR",
    JUMP_OUT_DENOMINATOR = "JUMP_OUT_DENOMINATOR", // Multi-functional keys.

    NOOP = "NOOP", // mobile native only

    // A custom key that captures an arbitrary number of symbols but has no
    // 'default' symbol or action.
    // MANY = "MANY",
}

export default Keys;
