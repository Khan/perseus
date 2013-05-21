(function(Perseus) {

var RANGE = 1000;
var ITERATIONS = 10;

var _eval = function(expr1, expr2, vars1, vars2) {
    if (vars2 === undefined) vars2 = vars1;
    var result1 = expr1.eval(vars1);
    var result2 = expr2.eval(vars2);
    return ((isNaN(result1) && isNaN(result2)) ||
            (Math.abs(result1 - result2) < 1e-9));
};

var evaluate = function(expr1, expr2, creative) {
    var vars1 = expr1.getVars();
    var vars2 = expr2.getVars();
    if (vars1.length !== vars2.length) return false;

    if (creative) {
        // TODO(alex): test various permutations
    } else {
        if (_.difference(vars1, vars2).length) return false;

        for (var i = 0; i < ITERATIONS; i++) {
            var vars = {};
            _.each(vars1, function(v) {
                vars[v] = _.random(-RANGE, RANGE);
            });
            if (!_eval(expr1, expr2, vars)) return false;
        }
        return true;
    }
};

// assumes that both expressions have already been parsed
// TODO(alex): be able to pass a random() function to compare()
Perseus.ExpressionTools.compare = function(expr1, expr2, options) {
    var defaults = {
        eval: true,         // check that the two expressions evaluate the same
        form: false,        // check that the two expressions have the same form
        simplify: false,    // check that the second expression is simplified
        creative: false     // allow student to choose their own variables names
    };

    /* more possible options:
        allow ratios e.g. 3/1 and 3 should both be accepted for something like slope
    */

    if (options !== undefined) {
        options = _.extend(defaults, options);
    } else {
        options = defaults;
    }

    // semantic check
    if (options.eval && !evaluate(expr1, expr2, options.creative)) {
        return { equal: false, message: null };
    }

    // syntactic check
    if (options.form) {

        var correctForm = expr1.strip().equals(expr2.strip());
        if (!options.eval) {
            // if not evaluating, need to make sure that expressions are equal
            correctForm = correctForm && expr1.simplify().equals(expr2.simplify());
        }
        if (!correctForm) return { equal: false, message: "Your answer is not in the correct form." };
    }

    // syntactic check
    if (options.simplify && !expr1.isSimplified()) {
        return { equal: false, message: "Your answer is not fully expanded and simplified." };
    }

    return { equal: true, message: null };
};

})(Perseus);
