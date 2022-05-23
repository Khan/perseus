/* eslint-disable */
import _ from "underscore";

// Assumes that both expressions have already been parsed
// TODO(alex): be able to pass a random() function to compare()
export const compare = function(expr1, expr2, options) {
    var defaults = {
        form: false, // Check that the two expressions have the same form
        simplify: false, // Check that the second expression is simplified
    };

    /* Options that could be added in the future:
        * - Allow ratios: e.g. 3/1 and 3 should both be accepted for something
        *   like slope
        * - Allow student to choose their own variable names
        */

    if (options !== undefined) {
        // eslint-disable-next-line no-undef
        options = _.extend(defaults, options);
    } else {
        options = defaults;
    }

    // TODO(CP-1614): Figure out how to make these messages translatable

    // Variable check
    var vars = expr1.sameVars(expr2);
    if (!vars.equal) {
        var message;
        if (vars.equalIgnoringCase) {
            message =
                "Check your variables; one or more are using " +
                "the wrong case (upper or lower).";
        } else {
            message =
                "Check your variables; you may have used the wrong " +
                "letter for one or more of them.";
        }
        return {
            equal: false,
            wrongVariableCase: vars.equalIgnoringCase,
            wrongVariableNames: !vars.equalIgnoringCase,
            message: message,
        };
    }

    // Semantic check
    if (!expr1.compare(expr2)) {
        return {equal: false, message: null};
    }

    // Syntactic check
    if (options.form && !expr1.sameForm(expr2)) {
        return {
            equal: false,
            message: "Your answer is not in the correct form.",
        };
    }

    // Syntactic check
    if (options.simplify && !expr1.isSimplified()) {
        return {
            equal: false,
            message: "Your answer is not fully expanded and simplified.",
        };
    }

    return {equal: true, message: null};
};
