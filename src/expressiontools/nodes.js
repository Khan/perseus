(function(Perseus) {

/*  The node hierarcy is as follows:

    (Expr)
        (Seq)       2+ children
            Add
            Mul
        Pow         2 children
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

    // returns a string representing current node structure
    repr: function() {
        return this.func.name + "(" + _.invoke(this.args(), "repr").join(",") + ")";
    },

    // removes all negative signs
    strip: function() { return this.recurse("strip"); },

    // canonically reorders all commutative elements
    normalize: function() { return this.recurse("normalize"); },

    // applies the distributive property
    distribute: function() { return this.recurse("distribute"); },

    // collect all like terms
    collect: function() { return this.recurse("collect"); },

    // strict equality check
    equals: function(other) {
        return this.normalize().print() === other.normalize().print();
    },

    // distribute and collect until the expression no longer changes
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

    reduce: function() {
        return _.reduce(this.terms, function(memo, term) { return memo.add(term); }, this.identity);
    },

    needsExplicitMul: function() { return false; }
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
            var denominator = (new Mul(_.invoke(inverses, "asDenominator"))).tex();
            return "\\frac{" + (numerator ? numerator : "1") + "}{" + denominator + "}";
        }
    },

    strip: function() {
        var terms = _.map(this.terms, function(term) {
            return term instanceof Num ? term.abs() : term.strip();
        });
        return (new Mul(terms)).flatten();
    },

    distribute: function() {
        var mul = this.recurse("distribute");

        var terms = _.groupBy(mul.terms, function(term) {
            return term instanceof Add;
        });
        var adds = terms[true] || [];
        var others = terms[false] || [];

        if (adds.length === 0) return mul;

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
            return "\\frac{1}{" + this.asDenominator().tex() + "}";
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

            return (new Mul(terms)).collect();

        } else if (pow.base instanceof Add && pow.exp instanceof Int) {
            // e.g. (a+b)^2 -> a*a+a*b+a*b+b*b

            var n = pow.exp.eval();

            // compute and cache powers of 2 up to n
            var cache = { 1: pow.base };
            for (i = 2; i <= n; i *= 2) {
                var mul = new Mul([cache[i / 2], cache[i / 2]]);
                cache[i] = mul.distribute().collect();
            }

            // if n is a power of 2, you're done!
            if (_.has(cache, n)) return cache[n];

            // otherwise decompose n into powers of 2 ...
            var indices = _.map(n.toString(2).split(""), function(str, i, list) {
                return Number(str) * Math.pow(2, list.length - i - 1);
            });
            indices = _.without(indices, 0);

            // ... then combine
            return (new Mul(_.pick(cache, indices))).distribute().collect();
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

    isDivide: function() {
        var test = function(arg) { return arg instanceof Num && arg.hints.divide; };
        return test(this.exp) || (this.exp instanceof Mul && _.any(this.exp.terms, test));
    },

    asDenominator: function() {
        if (this.exp instanceof Num) {
            if (this.exp.n === -1) {
                return this.base;
            } else {
                return new Pow([this.base, this.exp.negate()]);
            }
        } else {
            // this.exp must be a Mul
            return new Pow([this.base, this.exp.factorOut()]);
        }
    }
});


/* abstract leaf node */
function Atom() {};
Atom.prototype = new Expr();

_.extend(Atom.prototype, {
    repr: function() {
        return this.func.name + "(" + this.args() + ")";
    },

    strip: function() { return this; },
    normalize: function() { return this; },
    distribute: function() { return this; },
    collect: function() { return this; },

    getVars: function() { return []; },
    needsExplicitMul: function() { return false; }
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
    }
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

    needsExplicitMul: function() { return true; }
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
        var gcd = findGCD(this.n, this.d);

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
            return (new Rational([Math.pow(this.n, exp.eval()), Math.pow(this.d, exp.eval())])).collect();
        } else {
            return (new Float(this.eval())).raiseToThe(exp);
        }
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
