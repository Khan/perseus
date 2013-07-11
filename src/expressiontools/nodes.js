(function(Perseus) {

/*  The node hierarcy is as follows:

    (Expr)
        (Seq)       2+ children
            Add
            Mul
        Pow         2 children
        <Log>       2 children
        <Eq>        2 children
        <Func>      1 child
        (Atom)      leaf node
            Var
            Const           e.g. pi, e, <i>
            (Num)
                Rational    e.g. 2/3
                    Int
                Float

    (abstract, not meant to be instantiated)
    <not yet implemented>

    == Key design concepts ==
    Functional: All methods return new nodes - nodes are never mutated.
    Ignore commutativity: Commutative inputs should be parsed equivalently.
    Exploit commutativity: Output should take advantage of ordering.
*/

/* helper functions */

// assert that all abstract methods have been overridden
var abstract = function() { throw new Error("Abstract method - must override!"); };

// throw an error that is meant to be caught by the test suite (not user facing)
var error = function(message) { throw new Error(message); };


/* abstract base expression node */
function Expr() {};

_.extend(Expr.prototype, {

    // this node's immediate constructor
    func: abstract,

    // the arguments to this node's immediate constructor
    // for any nodes with children, this will be a single array
    // for leaf nodes, this will be a single value
    args: abstract,

    // an abstraction for chainable recursion
    recurse: function(method) {
        return new this.func(_.invoke(this.args(), method));
    },

    // evaluate numerically with given variable mapping
    eval: abstract,

    // returns a string unambiguously representing the expression
    print: abstract,

    // returns a TeX string representing the expression
    tex: abstract,

    // returns the name of this expression's constructor as a string
    name: function() {
        if (this.func.name) {
            return this.func.name;
        } else {
            return this.func.toString().match(/^function\s*([^\s(]+)/)[1];
        }
    },

    // returns a string representing current node structure
    repr: function() {
        return this.name() + "(" + _.invoke(this.args(), "repr").join(",") + ")";
    },

    // removes all negative signs
    strip: function() { return this.recurse("strip"); },

    // canonically reorders all commutative elements
    normalize: function() { return this.recurse("normalize"); },

    // applies the distributive property
    distribute: function() { return this.recurse("distribute"); },

    // naively factors out like terms
    factor: function() { return this.recurse("factor"); },

    // collect all like terms
    collect: function() { return this.recurse("collect"); },

    // strict syntactic equality check
    equals: function(other) {
        return this.normalize().print() === other.normalize().print();
    },

    // distribute and collect until the expression no longer changes
    simplify: function() {
        var simplified = this.factor().collect().distribute().collect();
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

    // raise this expression to a given exponent
    // most useful for eventually implementing i^3 = -i, etc.
    raiseToThe: function(exp) {
        return new Pow([this, exp]);
    },

    // does this expression have a specific rendering hint?
    // rendering hints are picked up while parsing, but are lost during transformations
    isSubtract: function() { return false; },
    isDivide:  function() { return false; },

    // whether this node needs an explicit multiplication sign if following a Num
    needsExplicitMul: function() {
        return this.args()[0].needsExplicitMul();
    },

    // semantic equality check
    compare: function(other) {
        // equation comparisons are handled by Eq.compare()
        if (other instanceof Eq) return false;

        // TODO(alex): if expression has function variables or the constant i -> false
        var canEval = true;

        if (canEval) {
            return this.fuzzEval(other);
        } else {
            return this.simplify().equals(other.simplify());
        }

    },

    // plug in random numbers for the variables in both expressions
    // if they both consistently evaluate the same, then they're the same
    ITERATIONS: 10,
    RANGE: 1000,
    fuzzEval: function(other) {
        var vars1 = this.getVars();
        var vars2 = other.getVars();

        if (vars1.length !== vars2.length) return false;
        if (_.difference(vars1, vars2).length) return false;

        for (var i = 0; i < this.ITERATIONS; i++) {

            var vars = {};
            _.each(vars1, function(v) {
                vars[v] = _.random(-this.RANGE, this.RANGE);
            }, this);

            var result1 = this.eval(vars);
            var result2 = other.eval(vars);

            var equal = ((isNaN(result1) && isNaN(result2)) ||
                        (Math.abs(result1 - result2) < 1e-9));

            if (!equal) return false;
        }
        return true;
    },

    // check that the structure of both expressions is the same
    // all negative signs are stripped and the expressions are converted to
    // a canonical commutative form
    // should only be done after compare() returns true to avoid false positives
    sameForm: function(other) {
        return this.strip().equals(other.strip());
    },

    // returns the GCD of this expression and the given factor
    findGCD: abstract,

    // return this expression's denominator
    getDenominator: function() {
        return Num.One;
    },

    // return this expression as a Mul
    asMul: function() {
        return new Mul([Num.One, this]);
    },

    // return whether this expression is 100% positive
    isPositive: abstract,

    // return a factor of this expression that is 100% positive
    asPositiveFactor: function() { 
        return this.isPositive() ? this : Num.One;
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

    factor: function() {
        return this.recurse("factor").flatten();
    },

    // partition the sequence into its numeric and non-numeric parts
    // makes no guarantees about the validity of either part!
    partition: function() {
        var terms = _.groupBy(this.terms, function(term) {
            return term instanceof Num;
        });

        var numbers = terms[true] || [];
        var others = terms[false] || [];

        return [new this.func(numbers), new this.func(others)];
    },

    // ensure that sequences have 2+ terms and no nested sequences of the same type
    // this is a shallow flattening and will return a non-Seq if terms.length <= 1
    flatten: function() {
        var type = this;
        var terms = _.reject(this.terms, function(term) {
            return term.equals(type.identity);
        });

        if (terms.length === 0) return type.identity;
        if (terms.length === 1) return terms[0];

        var grouped = _.groupBy(terms, function(term) {
            return term instanceof type.func;
        });

        // same contains the children which are Seqs of the same type as this Seq
        var same = grouped[true] || [];
        var others = grouped[false] || [];

        var flattened = others.concat(_.flatten(_.pluck(same, "terms"), /* shallow: */ true));
        return new type.func(flattened);
    },

    // the identity associated with the sequence
    identity: undefined,

    // reduce a numeric sequence to a Num
    reduce: abstract,

    isPositive: function() {
        return _.all(_.invoke(this.collect().terms, "isPositive"));
    }
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
            if (!tex || term.isSubtract()) {
                tex += term.tex();
            } else {
                tex += "+" + term.tex();
            }
        });

        return tex;
    },

    collect: function() {
        var terms = _.invoke(this.terms, "collect");

        // [Expr expr, Num coefficient]
        var pairs = [];

        _.each(terms, function(term) {
            if (term instanceof Mul) {
                var muls = term.partition();
                pairs.push([muls[1].flatten(), muls[0].reduce()]);
            } else if (term instanceof Num) {
                pairs.push([Num.One, term]);
            } else {
                pairs.push([term, Num.One]);
            }
        });

        // { (Expr expr).print(): [[Expr expr, Num coefficient]] }
        var grouped = _.groupBy(pairs, function(pair) {
            return pair[0].normalize().print();
        });

        var collected = _.map(grouped, function(pairs) {
            var expr = pairs[0][0];
            var sum = new Add(_.zip.apply(_, pairs)[1]);
            var coefficient = sum.reduce();
            return (new Mul([coefficient, expr])).collect();
        });

        return (new Add(collected)).flatten();
    },

    // naively factor out anything that is common to all terms
    factor: function() {
        var terms = _.invoke(this.terms, "collect");
        var factors;

        if (terms[0] instanceof Mul) {
            factors = terms[0].terms;
        } else {
            factors = [terms[0]];
        }

        _.each(_.rest(this.terms), function(term) {
            factors = _.map(factors, function(factor) {
                return term.findGCD(factor);
            });
        });
        factors = (new Mul(factors)).flatten();

        remainder = _.map(terms, function(term) {
            return Mul.handleDivide(term, factors).simplify();
        });
        remainder = (new Add(remainder)).flatten();

        return Mul.createOrAppend(factors, remainder).flatten();
    },

    reduce: function() {
        return _.reduce(this.terms, function(memo, term) { return memo.add(term); }, this.identity);
    },

    needsExplicitMul: function() { return false; },

    findGCD: function(factor) {
        if (this.equals(factor)) {
            return factor;
        } else {
            return Num.One;
        }
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

    // since we don't care about commutativity, we can render a Mul any way we choose
    // so we follow convention: first any negatives, then any numbers, then everything else
    tex: function() {
        var cdot = " \\cdot ";

        var terms = _.groupBy(this.terms, function(term) {
            if (term.isDivide()) {
                return "inverse";
            } else if (term instanceof Num) {
                return "number";
            } else {
                return "other";
            }
        });

        var inverses = terms["inverse"] || [];
        var numbers = terms["number"] || [];
        var others = terms["other"] || [];

        var negatives = "";
        var tex = "";

        _.each(numbers, function(term, i) {
            if ((term instanceof Int) && (term.n === -1) && _.any(term.hints) &&
                ((i < numbers.length - 1) || others.length)) {
                // e.g. -1*-1 -> --1
                // e.g. -1*x -> -x
                negatives += "-";
            } else {
                // e.g. 2*3 -> 2(dot)3
                tex += (tex ? cdot : "") + term.tex();
            }
        });

        _.each(others, function(term) {
            if (term.needsExplicitMul()) {
                // e.g. 2*2^3 -> 2(dot)2^3
                tex += (tex ? cdot : "") + term.tex();
            } else if (term instanceof Add) {
                // e.g. (a+b)*c -> (a+b)c
                tex += "(" + term.tex() + ")";
            } else {
                // e.g. a*b*c -> abc
                tex += term.tex();
            }
        });

        var numerator = negatives + tex;

        if (!inverses.length) {
            return numerator;
        } else {
            var denominator = (new Mul(_.invoke(inverses, "asDivide"))).tex();
            return "\\frac{" + (numerator ? numerator : "1") + "}{" + denominator + "}";
        }
    },

    strip: function() {
        var terms = _.map(this.terms, function(term) {
            return term instanceof Num ? term.abs() : term.strip();
        });
        return (new Mul(terms)).flatten();
    },

    // distribute numerator and denominator separately
    distribute: function() {

        var isAdd = function(term) {
            return term instanceof Add;
        };

        var isInverse = function(term) {
            return term instanceof Pow && term.hasNegativeExponent();
        };

        var isInverseAdd = function(term) {
            return isInverse(term) && isAdd(term.base);
        }

        var mul = this.recurse("distribute").flatten();

        var hasAdd = _.any(mul.terms, isAdd);
        var hasInverseAdd = _.any(mul.terms, isInverseAdd);

        if (!(hasAdd || hasInverseAdd)) return mul;

        var terms = _.groupBy(mul.terms, isInverse);
        var normals = terms[false] || [];
        var inverses = terms[true] || [];

        if (hasAdd) {
            var grouped = _.groupBy(normals, isAdd);
            var adds = grouped[true] || [];
            var others = grouped[false] || [];

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

            normals = [new Add(muls)];
        }

        if (hasInverseAdd) {
            var denominator = new Mul(_.invoke(inverses, "getDenominator"));
            inverses = [new Pow([denominator.distribute(), Num.Div])];
        }

        return (new Mul(normals.concat(inverses))).flatten();
    },

    collect: function() {
        var partitioned = this.recurse("collect").partition();
        var number = partitioned[0].reduce();
        var others = partitioned[1].terms;

        // 0*x == 0
        if (number.eval() === 0) {
            return Num.Zero;
        }

        // [Expr base, Expr exp]
        var pairs = [];

        _.each(others, function(term) {
            if (term instanceof Pow) {
                pairs.push([term.base, term.exp]);
            } else {
                pairs.push([term, Num.One]);
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

        return (new Mul([number].concat(collected))).flatten();
    },

    isSubtract: function() {
        return _.any(this.terms, function(term) {
            return term instanceof Num && term.hints.subtract;
        });
    },

    getDenominator: function() {
        return (new Mul(_.invoke(this.terms, "getDenominator"))).flatten();
    },

    // factor a single -1 in to the Mul
    // combine with a Num if all Nums are positive, else add as a term
    factorIn: function(hint) {
        var partitioned = this.partition();
        var numbers = partitioned[0].terms;
        var fold = numbers.length && _.all(numbers, function(num) {
            return num.n > 0;
        });

        if (fold) {
            var firstNum = _.indexOf(this.terms, numbers[0]);

            // e.g. - x*2*3 -> x*-2*3
            return new Mul(this.terms.slice(0, firstNum)
                .concat(this.terms[firstNum].negate().hint(hint))
                .concat(this.terms.slice(firstNum + 1)));
        } else {
            // e.g. - x*y -> -1*x*y
            // e.g. - x*-2 -> -1*x*-2
            return new Mul([Num.negativeOne(hint)].concat(this.terms));
        }
    },

    // factor out a single hinted -1 (assume it is the division hint)
    // TODO(alex): make more general or rename to be more specific
    factorOut: function() {
        var factored = false;
        var terms = _.compact(_.map(this.terms, function(term, i, list) {
            if (!factored && term instanceof Num && term.hints.divide) {
                factored = true;
                return term.n !== -1 ? term.negate() : null;
            } else {
                return term;
            }
        }));

        if (terms.length === 1) {
            return terms[0];
        } else {
            return new Mul(terms);
        }
    },

    reduce: function() {
        return _.reduce(this.terms, function(memo, term) { return memo.mul(term); }, this.identity);
    },

    findGCD: function(factor) {
        return (new Mul(_.invoke(this.terms, "findGCD", factor))).flatten();
    },

    asMul: function() {
        return this;
    },

    asPositiveFactor: function() {
        if (this.isPositive()) {
            return this;
        } else {
            var terms = _.invoke(this.collect().terms, "asPositiveFactor");
            return (new Mul(terms)).flatten();    
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
        }
    });
});

_.extend(Mul, {
    // negative signs should be folded into numbers whenever possible
    // never fold into a Num that's already negative or a Mul that has a negative Num
    // an optional hint is kept track of to properly render user input
    // an empty hint means negation
    handleNegative: function(expr, hint) {
        if (expr instanceof Num && expr.n > 0) {
            // e.g. - 2 -> -2
            return expr.negate().hint(hint);
        } else if (expr instanceof Mul) {
            // e.g. - x*2*3 -> x*-2*3
            // e.g. - x*y -> -1*x*y
            // e.g. - x*-2 -> -1*x*-2
            return expr.factorIn(hint);
        } else {
            // e.g. - x -> -1*x
            return new Mul([Num.negativeOne(hint), expr]);
        }
    },

    // division can create either a Rational or a Mul
    handleDivide: function(left, right) {
        var divide = function(a, b) {
            if (b instanceof Int) {
                if (a instanceof Int) {
                    if (a.n < 0 && b.n < 0) {
                        // e.g. -2 / -3 -> -1*-2/3
                        return [Num.Neg, new Rational([a.n, -b.n])];
                    } else {
                        // e.g. 2 / 3 -> 2/3 
                        // e.g. -2 / 3 -> -2/3 
                        // e.g. 2 / -3 -> -2/3 
                        return [new Rational([a.n, b.n])];
                    }
                } else {
                    // e.g. x / 3 -> x*1/3
                    return [a, new Rational([1, b.eval()])];
                }
            } else {
                var pow;
                if (b instanceof Pow) {
                    // e.g. (x^2) ^ -1 -> x^-2
                    // e.g. (x^y) ^ -1 -> x^(-1*y)
                    // e.g. (x^(yz)) ^ -1 -> x^(-1*y*z)
                    pow = new Pow([b.base, Mul.handleNegative(b.exp, "divide")]);
                } else {
                    // e.g. x ^ -1 -> x^-1
                    pow = new Pow([b, Num.Div]);
                }

                if (a instanceof Int && a.n === 1) {
                    // e.g. 1 / x -> x^-1
                    return [pow];
                } else {
                    // e.g. 2 / x -> 2*x^-1
                    return [a, pow];
                }
            }
        }

        if (left instanceof Mul) {
            var divided = divide(_.last(left.terms), right);
            return new Mul(_.initial(left.terms).concat(divided));
        } else {
            var divided = divide(left, right);
            if (divided.length === 1) {
                return divided[0];
            } else {
                return new Mul(divided);
            }
        }
    },

    // fold negative signs into numbers if possible
    // negative signs are not the same as multiplying by negative one!
    // e.g. -x      ->  -1*x    simplified
    // e.g. -2*x    ->  -2*x    simplified
    // e.g. -x*2    ->  -1*x*2  not simplified -> x*-2 simplified
    // e.g. -1*x*2  ->  -1*x*2  not simplified
    fold: function(expr) {
        if (expr instanceof Mul) {
            var partitioned = expr.partition();
            var numbers = partitioned[0].terms;

            var pos = function(num) { return num.n > 0; };
            var neg = function(num) { return num.n === -1 && num.hints.negate; };
            var posOrNeg = function(num) { return pos(num) || neg(num); };

            if (numbers.length > 1 &&
                _.some(numbers, neg) &&
                _.some(numbers, pos) &&
                _.every(numbers, posOrNeg)) {

                var firstNeg = _.indexOf(expr.terms, _.find(expr.terms, neg));
                var firstNum = _.indexOf(expr.terms, _.find(expr.terms, pos));

                // e.g. -x*2 -> x*-2
                if (firstNeg < firstNum) {
                    return new Mul(expr.terms.slice(0, firstNeg)
                        .concat(expr.terms.slice(firstNeg + 1, firstNum))
                        .concat(expr.terms[firstNum].negate())
                        .concat(expr.terms.slice(firstNum + 1)));
                }
            }
        }

        // in all other cases, make no change
        return expr;
    }
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
        if (this.base instanceof Seq) {
            base = "(" + base + ")";
        }
        return base + "^(" + this.exp.print() + ")";
    },

    tex: function() {
        if (this.isDivide()) {
            // e.g. x ^ -1 w/hint -> 1/x
            return "\\frac{1}{" + this.asDivide().tex() + "}";
        } else {
            // e.g. x ^ y -> x^y
            var base = this.base.tex();
            if (this.base instanceof Seq || this.base instanceof Pow) {
                // e.g. a+b ^ c -> (a+b)^c
                base = "(" + base + ")";
            }
            return base + "^{" + this.exp.tex() + "}";   
        }
    },

    distribute: function() {
        var pow = this.recurse("distribute");

        if (pow.base instanceof Mul) {
            // e.g. (ab)^c -> a^c*b^c

            var terms = _.map(pow.base.terms, function(term) {
                return new Pow([term, pow.exp]);
            });

            return new Mul(terms);

        } else if (pow.base instanceof Add && pow.exp instanceof Int && pow.exp.abs().eval() > 1) {
            // e.g. (a+b)^2 -> a*a+a*b+a*b+b*b
            // e.g. (a+b)^-2 -> (a*a+a*b+a*b+b*b)^-1

            var positive = pow.exp.eval() > 0;
            var n = pow.exp.abs().eval();

            var signed = function(mul) {
                return positive ? mul : new Pow([mul, Num.Div]);
            };

            // compute and cache powers of 2 up to n
            var cache = { 1: pow.base };
            for (var i = 2; i <= n; i *= 2) {
                var mul = new Mul([cache[i / 2], cache[i / 2]]);
                cache[i] = mul.distribute().collect();
            }

            // if n is a power of 2, you're done!
            if (_.has(cache, n)) return signed(cache[n]);

            // otherwise decompose n into powers of 2 ...
            var indices = _.map(n.toString(2).split(""), function(str, i, list) {
                return Number(str) * Math.pow(2, list.length - i - 1);
            });
            indices = _.without(indices, 0);

            // ... then combine
            var mul = (new Mul(_.pick(cache, indices))).distribute().collect();
            return signed(mul);
        } else {
            return pow;
        }
    },

    factor: function() {
        var pow = this.recurse("factor");
        if (pow.base instanceof Mul) {
            var terms = _.map(pow.base.terms, function(term) {
                return new Pow([term, pow.exp]);
            });
            return new Mul(terms);
        } else {
            return pow;
        }
    },

    collect: function() {
        var pow = this.recurse("collect");

        if (pow.exp instanceof Num &&
            pow.exp.eval() === 0) {

            // e.g. x^0 -> 1
            return Num.One;

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
            pow.exp instanceof Num) {

            // e.g. 4^1.5 -> 8
            return pow.base.raiseToThe(pow.exp);
        } else {
            return pow;
        }
    },

    // checks whether this Pow represents user-entered division
    isDivide: function() {
        var isDiv = function(arg) { return arg instanceof Num && arg.hints.divide; };
        return isDiv(this.exp) || (this.exp instanceof Mul && _.any(this.exp.terms, isDiv));
    },

    // assuming this Pow represents user-entered division, returns the denominator
    asDivide: function() {
        if (this.exp instanceof Num) {
            if (this.exp.eval() === -1) {
                return this.base;
            } else {
                return new Pow([this.base, this.exp.negate()]);
            }
        } else if (this.exp instanceof Mul) {
            return new Pow([this.base, this.exp.factorOut()]);
        } else {
            error("called asDivide() on an Expr that wasn't a Num or Mul");
        }
    },

    // check whether this Pow's exponent is negative, ignoring hints
    hasNegativeExponent: function() {
        var exp = this.exp.collect();
        var negative = function(arg) { return arg instanceof Num && arg.eval() < 0; };
        return negative(exp) || (exp instanceof Mul && _.any(exp.terms, negative))
    },

    // extract whatever denominator makes sense, ignoring hints
    getDenominator: function() {
        if (this.exp instanceof Num && this.exp.eval() === -1) {
            return this.base;
        } else if (this.hasNegativeExponent()) {
            return new Pow([this.base, Mul.handleNegative(this.exp).collect()]);
        } else {
            return Num.One;
        }
    },

    findGCD: function(factor) {
        var base, exp;
        if (factor instanceof Pow) {
            base = factor.base;
            exp = factor.exp;
        } else {
            base = factor;
            exp = Num.One;
        }

        // GCD is only relevant if same base
        if (this.base.equals(base)) {
            if (this.exp.equals(exp)) {
                // exact match
                // e.g. GCD(x^y^z, x^y^z) -> x^y^z
                return this;
            } else if (this.exp instanceof Num && exp instanceof Num) {
                // two numerical exponents
                // e.g. GCD(x^3, x^2) -> x^2
                return (new Pow([this.base, Num.min(this.exp, exp)])).collect();
            } else if (this.exp instanceof Num || exp instanceof Num) {
                // one numerical exponent
                // e.g. GCD(x^2, x^y) -> 1
                return Num.One;
            }

            var expA = this.exp.asMul().partition();
            var expB = exp.asMul().partition();

            if (expA[1].equals(expB[1])) {
                // exponents match except for coefficient
                // e.g. GCD(x^3y, x^y) -> x^y
                var coefficient = Num.min(expA[0].reduce(), expB[0].reduce());
                var mul = (new Mul([coefficient, expA[1]])).flatten();
                return (new Pow([base, mul])).collect();
            }
        }

        return Num.One;
    },

    isPositive: function() {
        if (this.base.isPositive()) return true;

        var exp = this.exp.simplify();
        if (exp instanceof Int && exp.eval() % 2 === 0) return true;

        return false;
    },

    asPositiveFactor: function() {
        if (this.isPositive()) {
            return this;
        } else {
            var exp = this.exp.simplify();
            if (exp instanceof Int) {
                var n = exp.eval();
                if (n > 2) {
                    // e.g. x^3 -> x^2
                    return new Pow([this.base, new Int(n-1)]);
                } else if (n < -2) {
                    // e.g. x^-3 -> x^-2
                    return new Pow([this.base, new Int(n+1)]);
                }
            }
            return Num.One;
        }
    }
});


/* equation */
function Eq(args) {
    this.left = args[0];
    this.type = args[1];
    this.right = args[2];
}
Eq.prototype = new Expr();

_.extend(Eq.prototype, {
    func: Eq,
    args: function() { return [this.left, this.type, this.right]; },
    
    repr: function() {
        return "Eq(" + this.left.repr() + "," + this.type + "," + this.right.repr() + ")";
    },

    getVars: function() { return _.uniq([this.left.getVars(), this.right.getVars()]); },

    needsExplicitMul: function() { return false; },

    print: function() {
        return this.left.print() + this.type + this.right.print();
    },

    signs: {
        "=": " = ",
        "<": " < ",
        ">": " > ",
        "<>": " \\ne ",
        "<=": " \\le ",
        ">=": " \\ge "        
    },

    tex: function() {
        return this.left.tex() + this.signs[this.type] + this.right.tex();
    },

    recurse: function(method) {
        var exprs = _.invoke([this.left, this.right], method);
        return new Eq([exprs[0], this.type, exprs[1]]);
    },

    normalize: function() {
        var eq = this.recurse("normalize");

        if (_.contains([">", ">="], eq.type)) {
            // inequalities should have the smaller side on the left
            return new Eq([eq.right, eq.type.replace(">", "<"), eq.left]);
        } else {
            return eq;
        }
    },

    // convert the equation to an expression that is set to zero
    toExpr: function() {
        if (this.right instanceof Num && this.right.isEnteredZero()) {
            // already set to zero
            // e.g. 42xyz=0 -> 42xyz
            return this.left;
        } else if (this.right instanceof Add) {
            // invidually negates every additive term
            // e.g. y=x+1 -> y-x-1
            var right = _.map(this.right.terms, function(term) {
                return Mul.handleNegative(term);
            });

            if (this.left instanceof Add) {
                return new Add(this.left.terms.concat(right));
            } else {
                return new Add([this.left].concat(right));
            }
        } else {
            // otherwise just negate the entire side
            // e.g. y=3x -> y-3x
            var right = Mul.handleNegative(this.right);
            if (this.left instanceof Num && this.left.isEnteredZero()) {
                // already set to zero
                // e.g. 0=42xyz -> -42xyz
                return right;
            } else {
                return new Add([this.left, right]);
            }
        }
    },

    // TODO(alex): fold into toExpr() ?
    // normalize the expresssion to a canonical form
    // e.g. y/2-x/4(=0) -> 2y-x(=0)
    normalizeExpr: function(expr) {
        var terms;
        if (expr instanceof Add) {
            terms = expr.terms;
        } else {
            terms = [expr];
        }

        for (var i = 0; i < terms.length; i++) {
            var denominator = terms[i].getDenominator();

            // can't multiply inequalities by non 100% positive factors
            if (!this.isEquality() && !denominator.isPositive()) {
                denominator = denominator.asPositiveFactor();
            }

            if (!denominator.equals(Num.One)) {
                terms = _.map(terms, function(term) {
                    return Mul.createOrAppend(term, denominator).collect();
                });
            }
        }

        return (new Add(terms)).flatten();
    },

    // divide out any common factors in the expression
    // e.g. 2y-4x(=0) -> y-2x(=0)
    collectExpr: function(expr) {
        var factored = expr.factor();
        if (factored instanceof Mul) {
            var terms = factored.terms;

            var isAdd = function(term) { return term instanceof Add; };
            var hasVar = function(term) { return !!term.getVars().length; };
            var isOne = function(term) { return term.equals(Num.One); };

            var grouped = _.groupBy(terms, isAdd);
            var adds = grouped[true] || [];
            var others = grouped[false] || [];

            if (adds.length && this.isEquality()) {
                // keep only the Adds
                return (new Mul(adds)).flatten();
            }

            var denominator = others;

            if (!adds.length) {
                // if there are no Adds, equation is e.g. 42xyz(=0)
                // keep all variable terms to preserve meaning
                denominator = _.reject(denominator, hasVar);
            }

            if (!this.isEquality()) {
                // can't divide inequalities by non 100% positive factors
                denominator = _.invoke(denominator, "asPositiveFactor");
            }

            // don't need to divide by one
            denominator = _.reject(denominator, isOne);

            denominator = _.map(denominator, function(term) {
                return new Pow([term, Num.Div]);
            });

            return (new Mul(terms.concat(denominator))).flatten();
        } else {
            return expr;
        }
    },

    isEquality: function() {
        return _.contains(["=", "<>"], this.type);
    },

    compare: function(other) {
        // expression comparisons are handled by Expr.compare()
        if (!(other instanceof Eq)) return false;

        var eq1 = this.normalize();
        var eq2 = other.normalize();

        if (eq1.type !== eq2.type) return false;

        var expr1 = this.collectExpr(this.normalizeExpr(eq1.toExpr()));
        var expr2 = this.collectExpr(this.normalizeExpr(eq2.toExpr()));

        if (eq1.isEquality()) {
            // equals and not-equals can be subtracted either way
            return expr1.compare(expr2) || 
                   expr1.compare(Mul.handleNegative(expr2));
        } else {
            return expr1.compare(expr2);
        }
    },

    // should only be done after compare() returns true to avoid false positives
    sameForm: function(other) {
        var eq1 = this.normalize();
        var eq2 = other.normalize();

        var same = eq1.left.sameForm(eq2.left) && eq1.right.sameForm(eq2.right);

        if (eq1.isEquality()) {
            // equals and not-equals can be commutative with respect to the sign
            return same || (eq1.left.sameForm(eq2.right) && eq1.right.sameForm(eq2.left));
        } else {
            return same;
        }
    },

    // we don't want to override collect because it would turn y=x into y-x(=0)
    // instead, we ask if the equation was in that form, would it be simplified?
    isSimplified: function() {
        var expr = this.normalizeExpr(this.toExpr());
        var simplified = this.collectExpr(expr).simplify();
        return expr.equals(simplified) &&
               this.left.isSimplified() &&
               this.right.isSimplified();
    }
});


/* abstract leaf node */
function Atom() {};
Atom.prototype = new Expr();

_.extend(Atom.prototype, {
    repr: function() {
        return this.name() + "(" + this.args() + ")";
    },

    recurse: function() { return this; },
    getVars: function() { return []; },
    needsExplicitMul: function() { return false; },
    findGCD: function(factor) {
        if (factor instanceof Atom) {
            return this.equals(factor) ? this : Num.One;
        } else {
            return factor.findGCD(this);
        }
    }
});


/* variable */
function Var(symbol) { this.symbol = symbol; };
Var.prototype = new Atom();

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
    },

    isPositive: function() { return false; }
});


/* constant */
function Const(symbol) { this.symbol = symbol; };
Const.prototype = new Atom();

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
    },

    isPositive: function() {
        return this.eval() > 0;
    }
});


/* abstract number node */
function Num() {}
Num.prototype = new Atom();

_.extend(Num.prototype, {
    repr: function() { return this.print(); },
    strip: function() { return this.abs(); },

    // takes another Num and returns a new Num
    add: abstract,
    mul: abstract,

    // returns this Num's additive inverse
    negate: abstract,

    // hints for interpreting and rendering user input
    hints: {
        negate: false,
        subtract: false,
        divide: false
    },

    // return a copy of the Num with a new hint set (preserve hints)
    hint: function(hint) {
        if (!hint) return this;

        var num = new this.func(this.args());
        num.hints = _.clone(this.hints);
        num.hints[hint] = true;

        return num;
    },

    isSubtract: function() { return this.hints.subtract; },

    // return the absolute value of the number
    abs: abstract,

    needsExplicitMul: function() { return true; },

    findGCD: function(factor) {
        if (factor instanceof Num) {
            return (new Float(Num.findGCD(this.eval(), factor.eval()))).collect();
        } else {
            return factor.findGCD(this);
        }
    },

    isPositive: function() {
        return this.eval() > 0;
    },

    asPositiveFactor: function() {
        return this.isPositive() ? this : this.abs();
    },

    // return whether this number is a user-entered zero
    // distinguishes between 0 and 0.0 vs. 0/42
    isEnteredZero: function() {
        return this.eval() === 0 &&
            (this instanceof Int || this instanceof Float);
    }
});


/* rational number (n: numerator, d: denominator) */
function Rational(args) {
    var n = args[0]; var d = args[1];
    if (d < 0) {
        n = -n; d = -d;
    }
    this.n = n; this.d = d;
}
Rational.prototype = new Num();

_.extend(Rational.prototype, {
    func: Rational,
    args: function() { return [this.n, this.d]; },
    eval: function() { return this.n / this.d; },

    print: function() {
        return this.n.toString() + "/" + this.d.toString();
    },

    tex: function() {
        return "\\frac{" + this.n.toString() + "}{" + this.d.toString() + "}";
    },

    add: function(num) {
        if (num instanceof Rational) {
            return (new Rational([this.n * num.d + this.d * num.n, this.d * num.d])).collect();
        } else {
            return num.add(this);
        }
    },

    mul: function(num) {
        if (num instanceof Rational) {
            return (new Rational([this.n * num.n, this.d * num.d])).collect();
        } else {
            return num.mul(this);
        }
    },

    collect: function() {
        var gcd = Num.findGCD(this.n, this.d);

        var n = this.n / gcd;
        var d = this.d / gcd;

        if (d === 1) {
            return new Int(n);
        } else {
            return new Rational([n, d]);
        }
    },

    negate: function() {
        return new Rational([-this.n, this.d]);
    },

    abs: function() {
        return new Rational([Math.abs(this.n), Math.abs(this.d)]);
    },

    // for now, assuming that exp is a Num
    raiseToThe: function(exp) {
        if (exp instanceof Int) {
            var positive = exp.eval() > 0;
            var abs = exp.abs().eval();
            var n = Math.pow(this.n, abs);
            var d = Math.pow(this.d, abs);
            if (positive) {
                return (new Rational([n, d])).collect();
            } else {
                return (new Rational([d, n])).collect();
            }
        } else {
            return (new Float(this.eval())).raiseToThe(exp);
        }
    },

    getDenominator: function() {
        return new Int(this.d);
    }
});


/* integer (n: numerator/number) */
function Int(number) { this.n = number; }
Int.prototype = new Rational([0, 1]);

_.extend(Int.prototype, {
    func: Int,
    args: function() { return this.n; },
    print: function() { return this.n.toString(); },
    tex: function() { return this.n.toString(); },
    negate: function() { return new Int(-this.n); },
    abs: function() { return new Int(Math.abs(this.n)); }
});


/* float (n: number) */
function Float(number) { this.n = number; }
Float.prototype = new Num();

_.extend(Float.prototype, {
    func: Float,
    args: function() { return this.n; },
    eval: function() { return this.n; },

    // TODO(alex): when we internationalize number parsing/display
    // we should make sure to use the appropriate decimal mark here
    print: function() { return this.n.toString(); },
    tex: function() { return this.n.toString(); },

    add: function(num) {
        return (new Float(this.n + num.eval())).collect();
    },

    mul: function(num) {
        return (new Float(this.n * num.eval())).collect();
    },

    collect: function() {
        var floor = Math.floor(this.n);
        if (this.n === floor) {
            return new Int(floor);
        } else {
            return this;
        }
    },

    negate: function() { return new Float(-this.n); },
    abs: function() { return new Float(Math.abs(this.n)); },

    // for now, assuming that exp is a Num
    raiseToThe: function(exp) {
        return (new Float(Math.pow(this.n, exp.eval()))).collect();
    },

    // only to be used on non-repeating decimals (e.g. user-provided)
    asRational: function() {
        var parts = this.n.toString().split(".");
        var numerator = Number(parts.join(""));
        var denominator = Math.pow(10, parts[1].length);
        return (new Rational([numerator, denominator])).collect();
    },

    getDenominator: function() {
        return this.asRational().getDenominator();
    }
});


// static methods and fields that are best defined on Num
_.extend(Num, {
    negativeOne: function(hint) {
        if (hint === "subtract") {
            return Num.Sub;
        } else if (hint === "divide") {
            return Num.Div;
        } else {
            return Num.Neg;
        }
    },

    // find the greatest common denominator
    findGCD: function(a, b) {
        var mod;

        a = Math.abs(a);
        b = Math.abs(b);

        while (b) {
            mod = a % b;
            a = b;
            b = mod;
        }

        return a;
    },

    min: function() {
        return _.min(_.toArray(arguments), function(num) {
            return num.eval();
        });
    },

    max: function() {
        return _.max(_.toArray(arguments), function(num) {
            return num.eval();
        });
    }
});

Num.Neg = (new Int(-1)).hint("negate");
Num.Sub = (new Int(-1)).hint("subtract");
Num.Div = (new Int(-1)).hint("divide");

Num.Zero = new Int(0);
Num.Half = new Rational([1, 2]);
Num.One = new Int(1);


// set identities here
Add.prototype.identity = Num.Zero;
Mul.prototype.identity = Num.One;


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
    Eq: Eq,
    Const: Const,
    Var: Var,
    Int: Int,
    Float: Float,
    parseError: parseError
    // TODO(alex): symbol determinant function goes here, or inside parse()
    // function(symbol) { return "VAR" | "CONST" | "FUNC"; }
    // the lexer will then access it in lexing actions via yy.function
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
