/**
 * Enum that defines the various contexts in which a cursor can exist. The
 * active context is determined first by looking at the cursor's siblings (e.g.,
 * for the `BEFORE_FRACTION` context), and then at its direct parent. Though a
 * cursor could in theory be nested in multiple contexts, we only care about the
 * immediate context.
 */

export enum CursorContext {
    // The cursor is not in any of the other viable contexts.
    NONE = "NONE",

    // The cursor is within a set of parentheses.
    IN_PARENS = "IN_PARENS",

    // The cursor is within a superscript (e.g., an exponent).
    IN_SUPER_SCRIPT = "IN_SUPER_SCRIPT",

    // The cursor is within a subscript (e.g., the base of a custom logarithm).
    IN_SUB_SCRIPT = "IN_SUB_SCRIPT",

    // The cursor is in the numerator of a fraction.
    IN_NUMERATOR = "IN_NUMERATOR",

    // The cursor is in the denominator of a fraction.
    IN_DENOMINATOR = "IN_DENOMINATOR",

    // The cursor is sitting before a fraction; that is, the cursor is within
    // what looks to be a mixed number preceding a fraction. This will only be
    // the case when the only math between the cursor and the fraction to its
    // write is non-leaf math (numbers and variables).
    BEFORE_FRACTION = "BEFORE_FRACTION",
}
