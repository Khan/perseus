/**
 * Constants that define the various contexts in which a cursor can exist. The
 * active context is determined first by looking at the cursor's siblings (e.g.,
 * for the `BEFORE_FRACTION` context), and then at its direct parent. Though a
 * cursor could in theory be nested in multiple contexts, we only care about the
 * immediate context.
 *
 * TODO(charlie): Add a context to represent being inside of a radical. Right
 * now, we show the dismiss button rather than allowing the user to jump out of
 * the radical.
 */

export type CursorContext = // The cursor is not in any of the other viable contexts.
    // The cursor is within a set of parentheses.
    | "NONE" // The cursor is within a superscript (e.g., an exponent).
    | "IN_PARENS" // The cursor is within a subscript (e.g., the base of a custom logarithm).
    | "IN_SUPER_SCRIPT" // The cursor is in the numerator of a fraction.
    | "IN_SUB_SCRIPT" // The cursor is in the denominator of a fraction.
    | "IN_NUMERATOR" // The cursor is sitting before a fraction; that is, the cursor is within
    // what looks to be a mixed number preceding a fraction. This will only be
    // the case when the only math between the cursor and the fraction to its
    // write is non-leaf math (numbers and variables).
    | "IN_DENOMINATOR"
    | "BEFORE_FRACTION";

// TODO: Get rid of these constants in favour of CursorContext type.

// The cursor is not in any of the other viable contexts.
export const NONE = "NONE";
// The cursor is within a set of parentheses.
export const IN_PARENS = "IN_PARENS";
// The cursor is within a superscript (e.g., an exponent).
export const IN_SUPER_SCRIPT = "IN_SUPER_SCRIPT";
// The cursor is within a subscript (e.g., the base of a custom logarithm).
export const IN_SUB_SCRIPT = "IN_SUB_SCRIPT";
// The cursor is in the numerator of a fraction.
export const IN_NUMERATOR = "IN_NUMERATOR";
// The cursor is in the denominator of a fraction.
export const IN_DENOMINATOR = "IN_DENOMINATOR";
// The cursor is sitting before a fraction; that is, the cursor is within
// what looks to be a mixed number preceding a fraction. This will only be
// the case when the only math between the cursor and the fraction to its
// write is non-leaf math (numbers and variables).
export const BEFORE_FRACTION = "BEFORE_FRACTION";
