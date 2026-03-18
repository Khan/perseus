import type {CompareOptions, CompareResult, Expression} from "./types";

/**
 * Compares two expressions for equality.
 *
 * Assumes that both expressions have already been parsed.
 */
export const compare = function (
    expr1: Expression,
    expr2: Expression,
    options: Partial<CompareOptions> = {},
): CompareResult {
    const defaults: CompareOptions = {
        form: false,
        simplify: false,
    };

    /* Options that could be added in the future:
     * - Allow ratios: e.g. 3/1 and 3 should both be accepted for something
     *   like slope
     * - Allow student to choose their own variable names
     */
    const optionsWithDefaults: CompareOptions = {
        ...defaults,
        ...options,
    };

    // Semantic check
    if (!expr1.compare(expr2)) {
        return {equal: false, message: null};
    }

    // Syntactic check
    if (optionsWithDefaults.form && !expr1.sameForm(expr2)) {
        return {
            equal: false,
            message: "Your answer is not in the correct form.",
        };
    }

    // Syntactic check
    if (optionsWithDefaults.simplify && !expr1.isSimplified()) {
        return {
            equal: false,
            message: "Your answer is not fully expanded and simplified.",
        };
    }

    return {equal: true, message: null};
};
