function mark(error: string) {
    return "\u2603 " + error + " \u2603";
}

export const MISSING_PERCENT_ERROR = mark("MISSING_PERCENT_ERROR");
export const NEEDS_TO_BE_SIMPLIFIED_ERROR = mark(
    "NEEDS_TO_BE_SIMPLIFIED_ERROR",
);
export const APPROXIMATED_PI_ERROR = mark("APPROXIMATED_PI_ERROR");
export const EXTRA_SYMBOLS_ERROR = mark("EXTRA_SYMBOLS_ERROR");
export const WRONG_CASE_ERROR = mark("WRONG_CASE_ERROR");
export const WRONG_LETTER_ERROR = mark("WRONG_LETTER_ERROR");
export const MULTIPLICATION_SIGN_ERROR = mark("MULTIPLICATION_SIGN_ERROR");
