(function(Perseus) {

/*  The node hierarcy is as follows:

    (Expr)
        (Seq)       2+ children
            Add
            Mul
        Pow         2 children
        <Func>      1 child
        (Basic)     leaf node
            Var
            Const           e.g. pi, e, <i>
            Num
                Neg         -1 in subtraction/negation e.g. a-b = a+(-1)*b
                Inv         -1 in divison e.g. a/b = a*b^(-1)

    (abstract, not meant to be instantiated)
    <not yet implemented>
*/

/* helper functions */

// assert that all abstract methods have been overridden
var abstract = function() { throw new Error("Abstract method - must override!"); };

// find the greatest common denominator
var findGCD = function(a, b) {
    var mod;

    a = Math.abs(a);
    b = Math.abs(b);

    while (b) {
        mod = a % b;
        a = b;
        b = mod;
    }

    return a;
};

// find the least common multiple
var findLCM = function(args) {
    if (args.length === 0) return 0;
    if (args.length === 1) return args[0];
    if (args.length === 2) {
        return Math.abs(args[0] * args[1]) / findGCD(args[0], args[1]);
    } else {
        return findLCM([args[0], findLCM(_.rest(args))]);
    }
};


/* abstract base expression node */
function Expr() {};

_.extend(Expr.prototype, {

    // this node's immediate constructor
    func: abstract,

    // the arguments to this node's immediate constructor
    // for any nodes with children, this will be a single array
    // for leaf nodes, this will be a single value
    args: abstract,

    // an abstraction for chainable recursion (returns a copy)
    recurse: function(method) {
        return new this.func(_.invoke(this.args(), method));
    },

    // deep copy
    copy: function() { return this.recurse("copy"); },

    // evaluate numerically with given variable mapping
    eval: abstract,

    // returns a string unambiguously representing the expression
    print: abstract,

    // returns a TeX string representing the expression
    tex: abstract,

    // returns a string representing current node structure
    repr: function() {
        return this.func.name + "(" + _.invoke(this.args(), "repr").join(",") + ")";
    },

    // removes all negative signs (returns a copy)
    strip: function() { return this.recurse("strip"); },

    // canonically reorders all commutative elements (returns a copy)
    normalize: function() { return this.recurse("normalize"); },

    // applies the distributive property (returns a copy)
    distribute: function() { return this.recurse("distribute"); },

    // collect all like terms (returns a copy)
    collect: function() { return this.recurse("collect"); },

    // strict equality check
    equals: function(other) {
        return this.normalize().print() === other.normalize().print();
    },

    // distribute and collect until the expression no longer changes (returns a copy)
    simplify: function() {
        var simplified = this.distribute().collect();
        if (this.equals(simplified)) {
            return simplified;
        } else {
            return simplified.simplify();
        }
    },

    // check whether this expression is simplified
    isSimplified: function() {
        return this.equals(this.simplify());
    },

    // returns an array of variables used in the expression
    getVars: function() {
        return _.uniq(_.flatten(_.invoke(this.args(), "getVars")));
    },

    // return the first subnode
    first: function() {
        return this.args()[0].first();
    }
});


/* abstract sequence node */
function Seq() {};
Seq.prototype = new Expr();

_.extend(Seq.prototype, {
    args: function() { return this.terms; },

    normalize: function() {
        var terms = _.sortBy(_.invoke(this.terms, "normalize"), function(term) {
            return term.print();
        });

        return new this.func(terms);
    },

    distribute: function() {
        return this.recurse("distribute").flatten();
    },

    // partition the sequence into its numeric and non-numeric parts
    // the numeric part is reduced and the non-numeric part is flattened
    partition: function() {
        var terms = _.groupBy(_.invoke(this.terms, "copy"), function(term) {
            return ((term instanceof Num) ||                            // e.g. 1
                    (term instanceof Pow && term.isDenominator()) ||    // e.g. 2^-1
                    (term instanceof Mul && term.isFraction()));         // e.g. 4*2^-1
        });

        var numbers = terms[true] || [];
        var others = terms[false] || [];

        return [(new this.func(numbers)).reduce(), (new this.func(others)).flatten()];
    },

    // ensure that sequences have 2+ terms and no nested sequences of the same type
    // this is a shallow flattening and will return a non-Seq if terms.length <= 1
    flatten: function() {
        var type = this;
        var terms = _.reject(this.terms, function(term) {
            return term.equals(type.identity());
        });

        if (terms.length === 0) return type.identity();
        if (terms.length === 1) return terms[0].copy();

        var grouped = _.groupBy(_.invoke(terms, "copy"), function(term) {
            return term instanceof type.func;
        });

        // same contains the children which are Seqs of the same type as this Seq
        var same = grouped[true] || [];
        var others = grouped[false] || [];

        var flattened = others.concat(_.flatten(_.pluck(same, "terms"), /* shallow: */ true));

        return new type.func(flattened);
    },

    // return the identity associated with the sequence
    // TODO(alex): make this into a singleton-style property instead of a function
    identity: abstract,

    // reduce a numeric sequence to a number (Num) or a fraction (Mul)
    reduce: abstract
});


/* sequence of additive terms */
function Add(terms) { this.terms = terms; };
Add.prototype = new Seq();

_.extend(Add.prototype, {
    func: Add,

    eval: function(vars) {
        return _.reduce(this.terms, function(memo, term) { return memo + term.eval(vars); }, 0);
    },

    print: function() {
        return _.invoke(this.terms, "print").join("+");
    },

    tex: function() {
        var tex = "";

        _.each(this.terms, function(term) {
            if (tex === "") {
                tex += term.tex();
            } else if (term instanceof Mul && term.hasSubtraction()) {
                tex += term.tex();
            } else {
                tex += "+" + term.tex();
            }
        });

        return tex;
    },

    collect: function() {
        var adds = this.recurse("collect").partition();

        var numbers = adds[0];
        var remainder = adds[1];

        if (!(remainder instanceof Add)) {
            return (new Add([numbers, remainder])).flatten();
        }

        // remainder must be an Add
        var others = remainder.terms;

        // [Expr expr, Num coefficient]
        var pairs = [];

        _.each(others, function(term) {
            if (term instanceof Mul) {
                var muls = term.partition();
                pairs.push([muls[1], muls[0]]);
            } else {
                pairs.push([term, new Num(1)]);
            }
        });

        // { (Expr expr).print(): [[Expr expr, Num coefficient]] }
        var grouped = _.groupBy(pairs, function(pair) {
            return pair[0].normalize().print();
        });

        var collected = _.map(grouped, function(pairs) {
            var expr = pairs[0][0];
            var sum = new Add(_.zip.apply(_, pairs)[1]);
            var coefficient = sum.collect();
            return (new Mul([coefficient, expr])).collect();
        });

        collected.push(numbers);

        return (new Add(collected)).flatten();
    },

    identity: function() { return new Num(0); },

    reduce: function() {
        var top = [];
        var bottom = [];

        _.each(this.terms, function(term) {
            if (term instanceof Num) {
                // Num
                top.push(term);
                bottom.push(new Num(1));
            } else if (term instanceof Pow) {
                // Pow(Num, Inv)
                top.push(new Num(1));
                bottom.push(term.base);
            } else if (term instanceof Mul) {
                // Mul([Num, Pow(Num, Inv)])
                top.push(term.terms[0]);
                bottom.push(term.terms[1].base);
            }
        });

        if (!top.length && !bottom.length) return this.identity();

        var hasFloat = !_.all(top.concat(bottom), function(num) {
            return num.isInt();
        });

        // if there is at least one float, reduce to a float
        if (hasFloat) {
            return new Num(this.eval());
        }

        top = _.pluck(top, "number");
        bottom = _.pluck(bottom, "number");

        // otherwise, keep everything as integers
        var numerator = 0;
        var denominator = findLCM(bottom);
        _.each(top, function(number, i) {
            numerator += top[i] * (denominator / bottom[i]);
        });

        if (numerator === 0) return new Num(0);
        if (denominator === 1) return new Num(numerator);

        return (new Mul([new Num(numerator), new Pow([new Num(denominator), new Inv()])])).collect();
    }
});


/* sequence of multiplicative terms */
function Mul(terms) { this.terms = terms; };
Mul.prototype = new Seq();

_.extend(Mul.prototype, {
    func: Mul,

    eval: function(vars) {
        return _.reduce(this.terms, function(memo, term) { return memo * term.eval(vars); }, 1);
    },

    print: function() {
        return _.map(this.terms, function(term) {
            return (term instanceof Add) ? "(" + term.print() + ")" : term.print();
        }).join("*");
    },

    tex: function() {
        var mul = this;
        var negatives = "";
        var numbers = "";
        var others = "";

        var inverses = [];

        _.each(this.terms, function(term) {
            if (term instanceof Neg) {
                negatives += term.tex();
            } else if (term instanceof Num) {
                numbers += numbers === "" ? term.tex() : " \\cdot " + term.tex();
            } else if (term instanceof Pow && term.isInverse()) {
                inverses.push(term.base);
            } else if (term instanceof Add) {
                others += "(" + term.tex() + ")";
            } else if (term.first() instanceof Num) {
                var test = function(term) { return term instanceof Num && !(term instanceof Neg); };
                if (_.any(mul.terms, test) || others !== "") {
                    others += " \\cdot " + term.tex();
                } else {
                    others += term.tex();
                }
            } else {
                others += term.tex();
            }
        });

        var numerator = negatives + numbers + others;

        if (inverses.length === 0) {
            return numerator;
        } else {
            var denominator = (new Mul(inverses)).tex();
            return "\\dfrac{" + numerator + "}{" + denominator + "}";
        }
    },

    strip: function() {
        var terms = _.reject(_.invoke(this.terms, "strip"), function(term) {
            return term instanceof Neg;
        });

        return (new Mul(terms)).flatten();
    },

    distribute: function() {
        var terms = _.groupBy(_.invoke(this.terms, "distribute"), function(term) {
            return term instanceof Add;
        });
        var adds = terms[true] || [];
        var others = terms[false] || [];

        if (adds.length === 0) {
            return (new Mul(others)).flatten();
        }

        // loop over each additive sequence
        var distributed = _.reduce(adds, function(distributed, add) {
            // loop over each distributed array of terms
            return _.reduce(distributed, function(temp, array) {
                // loop over each additive sequence's terms
                return temp.concat(_.map(add.terms, function(term) {
                    return array.concat(term);
                }));
            }, []);
        }, [[]]);

        // join each fully distributed array of factors with remaining multiplicative factors
        var muls = _.map(distributed, function(array) {
            return (new Mul(others.concat(array))).flatten();
        });

        return new Add(muls);
    },

    collect: function() {
        var muls = this.recurse("collect").partition();
        var numbers = muls[0];
        var remainder = muls[1];

        // 0*x == 0
        if (numbers.eval() === 0) {
            return new Num(0);
        }

        if (!(remainder instanceof Mul)) {
            return (new Mul([numbers, remainder])).flatten();
        }

        // remainder must be an Mul
        var others = remainder.terms;

        // [Expr base, Expr exp]
        var pairs = [];

        _.each(others, function(term) {
            if (term instanceof Pow) {
                pairs.push([term.base, term.exp]);
            } else {
                pairs.push([term, new Num(1)]);
            }
        });

        // { (Expr base).print(): [[Expr base, Expr exp]] }
        var grouped = _.groupBy(pairs, function(pair) {
            return pair[0].normalize().print();
        });

        var collected = _.map(grouped, function(pairs) {
            var base = pairs[0][0];
            var sum = new Add(_.zip.apply(_, pairs)[1]);
            var exp = sum.collect();
            return (new Pow([base, exp])).collect();
        });

        return (new Mul([numbers].concat(collected))).flatten();
    },

    hasSubtraction: function() {
        return _.any(this.terms, function(term) {
            return term instanceof Neg && term.isSubtraction;
        });
    },

    isFraction: function() {
        return this.terms.length === 2 &&
               this.terms[0] instanceof Num &&
               this.terms[1] instanceof Pow &&
               this.terms[1].isDenominator();
    },

    identity: function() { return new Num(1); },

    reduce: function() {
        var top = [];
        var bottom = [];
        _.each(this.terms, function(term) {
            if (term instanceof Num) {
                // Num
                top.push(term);
            } else if (term instanceof Pow) {
                // Pow(Num, Inv)
                bottom.push(term.base);
            } else if (term instanceof Mul) {
                // Mul([Num, Pow(Num, Inv)])
                top.push(term.terms[0]);
                bottom.push(term.terms[1].base);
            }
        });

        var numerator = (new Mul(top)).eval();
        var denominator = (new Mul(bottom)).eval();

        var hasFloat = !_.all(top.concat(bottom), function(num) {
            return num.isInt();
        });

        // if there is at least one float, reduce to a float
        if (hasFloat) {
            return new Num(numerator / denominator);
        }

        // otherwise, keep everything as integers
        if (!top.length && !bottom.length) {
            return this.identity();
        } else if (!bottom.length) {
            return new Num(numerator);
        } else if (!top.length) {
            // maybe this should be a Mul with numerator 1?
            return new Pow([new Num(denominator), new Inv()]);
        } else {
            var gcd = findGCD(numerator, denominator);
            numerator /= gcd;
            denominator /= gcd;

            if (denominator === 1) {
                return new Num(numerator);
            } else {
                return new Mul([new Num(numerator), new Pow([new Num(denominator), new Inv()])]);
            }
        }
    }
});

// static methods for the sequence types
_.each([Add, Mul], function(type) {
    _.extend(type, {
        // create a new sequence unless left is already one (returns a copy)
        createOrAppend: function(left, right) {
            if (left instanceof type) {
                return new type(left.terms.concat(right));
            } else {
                return new type([left, right]);
            }
        },

        // create a new sequence unless right is already one (returns a copy)
        createOrPrepend: function(left, right) {
            if (right instanceof type) {
                return new type([left].concat(right.terms));
            } else {
                return new type([left, right]);
            }
        }
    });
});


/* exponentiation */
function Pow(args) { this.base = args[0]; this.exp = args[1]; };
Pow.prototype = new Expr();

_.extend(Pow.prototype, {
    func: Pow,
    args: function() { return [this.base, this.exp]; },

    eval: function(vars) {
        return Math.pow(this.base.eval(vars), this.exp.eval(vars));
    },

    print: function() {
        var base = this.base.print();
        if (this.base instanceof Add || this.base instanceof Mul) {
            base = "(" + base + ")";
        }
        return base + "^(" + this.exp.print() + ")";
    },

    tex: function() {
        var base = this.base.tex();
        if (this.base instanceof Add || this.base instanceof Mul || this.base instanceof Pow) {
            base = "(" + base + ")";
        }

        return base + "^{" + this.exp.tex() + "}";
    },

    distribute: function() {
        if (this.base instanceof Seq &&
            this.exp instanceof Num &&
            this.exp.isInt()) {

            // e.g. (a+b)^2 -> a*a+a*b+a*b+b*b
            // e.g. (ab)^2 -> a*b*a*b
            var seq = this.base.distribute();
            var terms = [];
            _.times(Math.abs(this.exp.eval()), function() {
                terms.push(seq);
            });

            var base = (new Mul(terms)).distribute();

            if (this.exp.eval() > 0) {
                return base;
            } else {
                return new Pow([base, new Inv()]);
            }
        } else {
            return this.recurse("distribute");
        }
    },

    collect: function() {
        var pow = this.recurse("collect");

        if (pow.exp instanceof Num &&
            pow.exp.eval() === 0) {

            // e.g. x^0 -> 1
            return new Num(1);

        } else if (pow.exp instanceof Num &&
            pow.exp.eval() === 1) {

            // e.g. x^1 -> x
            return pow.base;

        } else if (pow.base instanceof Pow) {

            // e.g. (x^y)^z -> x^(yz)
            var base = pow.base.base;
            var exp = Mul.createOrAppend(pow.base.exp, pow.exp);
            return (new Pow([base, exp])).collect();

        } else if (pow.base instanceof Num &&
            pow.exp instanceof Num &&
            !pow.isInverse()) {

            // e.g. 4^1.5 -> 8
            return new Num(pow.eval());
        } else {
            return pow;
        }
    },

    isInverse: function() {
        return this.exp instanceof Inv;
    },

    isDenominator: function() {
        return this.base instanceof Num && this.exp instanceof Inv;
    },

    identity: function() {
        return new Num(1);
    }
});


/* abstract leaf node */
function Basic() {};
Basic.prototype = new Expr();

_.extend(Basic.prototype, {
    copy: function() {
        return new this.func(this.args());
    },

    repr: function() {
        return this.func.name + "(" + this.args() + ")";
    },

    strip: function() { return this.copy(); },
    normalize: function() { return this.copy(); },
    distribute: function() { return this.copy(); },
    collect: function() { return this.copy(); },

    getVars: function() { return []; },
    first: function() { return this; }
});


/* variable */
function Var(symbol) { this.symbol = symbol; };
Var.prototype = new Basic();

_.extend(Var.prototype, {
    func: Var,
    args: function() { return this.symbol; },

    eval: function(vars) {
        return vars[this.symbol];
    },

    print: function() { return this.symbol; },
    tex: function() { return this.symbol; },

    getVars: function() {
        return [this.symbol];
    }
});


/* constant */
function Const(symbol) { this.symbol = symbol; };
Const.prototype = new Basic();

_.extend(Const.prototype, {
    func: Const,
    args: function() { return this.symbol; },

    eval: function(vars) {
        if (this.symbol === "pi") {
            return Math.PI;
        } else if (this.symbol === "e") {
            return Math.E;
        }
    },

    print: function() { return this.symbol; },

    tex: function() {
        if (this.symbol === "pi") {
            return "\\pi ";
        } else if (this.symbol === "e") {
            return "e";
        }
    }
});


/* number (floating point or integer) */
function Num(number) { this.number = number; };
Num.prototype = new Basic();

_.extend(Num.prototype, {
    func: Num,
    args: function() { return this.number; },
    eval: function(vars) { return this.number; },

    print: function() { return this.number.toString(); },
    tex: function() { return this.print(); },
    repr: function() { return this.print(); },

    isInt: function() {
        return Math.floor(this.number) === this.number;
    }
});


/* the number -1 when used to represent subtraction or negation */
function Neg(isSubtraction) {
    this.isSubtraction = !!isSubtraction;
    this.number = -1;
};
Neg.prototype = new Num();

_.extend(Neg.prototype, {
    func: Neg,
    args: function() { return this.isSubtraction; },
    tex: function() { return "-"; }
});


/* the number -1 when used to represent division */
function Inv() { this.number = -1; };
Inv.prototype = new Num();

_.extend(Inv.prototype, {
    func: Inv,
    args: function() { return void 0; },
    tex: function() { return ""; }
});


var parser = Perseus.ExpressionTools.parser;

var parseError = function(str, hash) {
    // return int location of parsing error
    throw new Error(hash.loc.first_column);
}

// expose concrete nodes to parser scope
// see http://zaach.github.io/jison/docs/#sharing-scope
parser.yy = {
    Add: Add,
    Mul: Mul,
    Pow: Pow,
    Const: Const,
    Var: Var,
    Num: Num,
    Neg: Neg,
    Inv: Inv,
    parseError: parseError
};

Perseus.ExpressionTools.parse = function(input) {
    try {
        var expr = parser.parse(input);
        return { parsed: true, expr: expr };
    } catch (e) {
        return { parsed: false, error: e.message };
    }
};

})(Perseus);
