(function(Perseus) {

// assumes that both expressions have already been parsed
// TODO(alex): be able to pass a random() function to compare()
Perseus.ExpressionTools.compare = function(expr1, expr2, options) {
    var defaults = {
        form: false,        // check that the two expressions have the same form
        simplify: false     // check that the second expression is simplified
    };

    /* more possible options:
        allow ratios e.g. 3/1 and 3 should both be accepted for something like slope
        allow student to choose their own variables names
    */

    if (options !== undefined) {
        options = _.extend(defaults, options);
    } else {
        options = defaults;
    }

    // variable check
    var vars = expr1.sameVars(expr2);
    if (!vars.equal) {
        var message = null;
        if (vars.equalIgnoringCase) {
            message = "Some of your variables are in the wrong case (upper vs. lower).";
        }
        return {equal: false, message: message};
    }

    // semantic check
    if (!expr1.compare(expr2)) {
        return {equal: false, message: null};
    }

    // syntactic check
    if (options.form && !expr1.sameForm(expr2)) {
        return {equal: false, message: "Your answer is not in the correct form."};
    }

    // syntactic check
    if (options.simplify && !expr1.isSimplified()) {
        return {equal: false, message: "Your answer is not fully expanded and simplified."};
    }

    return {equal: true, message: null};
};

})(Perseus);
