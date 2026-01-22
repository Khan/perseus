/* eslint-disable max-lines */
/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* TODO: fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable indent, no-undef, no-var, no-dupe-keys, no-new-func, no-redeclare, comma-dangle, max-len, prefer-spread, space-infix-ops, space-unary-ops */
import _ from "underscore";

import {unitParser} from "./__genfiles__/unitparser";
import {parser} from "./__genfiles__/parser";

/*  The node hierarcy is as follows:

    (Expr)
        (Seq)           2+ children
            Add
            Mul
        Pow             2 children
        Log             2 children
        Eq              2 children
        Trig            1 child
        Abs             1 child
        (Sym)
            Func        1 child     e.g. f(x)
            Var         leaf node   e.g. x, x_n
            Const       leaf node   e.g. pi, e, <i>
            Unit        leaf node   e.g. kg
        (Num)           leaf node
            Rational                e.g. 2/3
                Int
            Float

    (abstract, not meant to be instantiated)

    == Key design concepts ==
    Functional: All methods return new nodes - nodes are never mutated.
    Ignore commutativity: Commutative inputs should be parsed equivalently.
    Exploit commutativity: Output should take advantage of ordering.
*/

/* non user-facing functions */

// reliably detect NaN
const isNaN = function (object) {
    return object !== object;
};

const isInfinite = function (object) {
    return object === Infinity || object === -Infinity;
};

// return a random float between min (inclusive) and max (exclusive),
// not that inclusivity means much, probabilistically, on floats
const randomFloat = function (min: number, max: number) {
    var extent = max - min;
    // eslint-disable-next-line no-restricted-properties
    return Math.random() * extent + min;
};

/* constants */
var ITERATIONS = 12;
var TOLERANCE = 9; // decimal places

// NOTE(kevinb): _.partition exists in a more recent version of underscore.
// To avoid having to update underscore I've added a hacky version of this
// method here.
function partition<T, V extends _.Collection<T>>(
    list: V,
    iteratee: _.CollectionIterator<T, boolean>,
): [_.TypeOfCollection<V>[], _.TypeOfCollection<V>[]] {
    const a: _.TypeOfCollection<V>[] = [];
    const b: _.TypeOfCollection<V>[] = [];
    _.forEach(list, (elem, key, ctx) => {
        if (iteratee(elem, key, ctx)) {
            a.push(elem);
        } else {
            b.push(elem);
        }
    });
    return [a, b];
}

function isExpr(arg: string | Expr): arg is Expr {
    return arg instanceof Expr;
}

const isAdd = function (term: Expr): term is Add {
    return term instanceof Add;
};

function isRational(arg: Expr): arg is Rational {
    return arg instanceof Rational;
}

function getFactors(expr: Expr): Expr[] {
    if (expr instanceof Mul) {
        return expr.terms;
    } else {
        return [expr];
    }
}

type Hints = {
    parens?: boolean;
    divide?: boolean;
    root?: boolean;
    subtract?: boolean;
    fraction?: boolean;
    entered?: boolean;
    negate?: boolean;
    open?: boolean;
};

type Vars = Record<string, string>;

type Options = {
    preciseFloats?: boolean;
    once?: boolean;
};

/* abstract base expression node */
abstract class Expr {
    hints: Hints;

    constructor() {
        this.hints = {
            parens: false,
        };
    }

    // this node's immediate constructor
    // The `new (...args: any[]): any;` part of the type is a
    // "construct" signature.  It indicates that `func` is a class.
    // See https://www.typescriptlang.org/docs/handbook/2/functions.html#construct-signatures.
    abstract func: {new (...args: any[]): any; name: string};

    // an array of the arguments to this node's immediate constructor
    abstract args(): (number | string | Expr | undefined)[];

    // make a new node with the given arguments
    construct(args: any[]) {
        const func = this.func;
        const instance = new func(...args);
        if (typeof instance === "undefined") {
            throw new Error("constructor function returning undefined");
        }
        return instance;
    }

    // an abstraction for chainable, bottom-up recursion
    // NOTE(kevinb): This method is highly dynamic.  It's possible that it
    // could be made more type-safe using overload signatures.
    recurse(method: string, ...passed: any[]): this {
        var args = this.args().map(function (arg) {
            return _.isString(arg) || _.isNumber(arg)
                ? arg
                : arg?.[method].apply(arg, passed);
        });
        return this.construct(args);
    }

    // evaluate numerically with given variable mapping
    // NOTE(kevin): This could made into an abstract method but
    // Eq doesn't implement it.  This indicates that we probably
    // need to introduce another class in our hierarchy.
    eval(vars: Vars = {}, options?: ParseOptions): number {
        throw new Error(
            "Abstract method - must override for expr: " +
                // eslint-disable-next-line @typescript-eslint/no-invalid-this
                this.print(),
        );
    }

    // NOTE(kevin): This could made into an abstract method but
    // Eq doesn't implement it.  This indicates that we probably
    // need to introduce another class in our hierarchy.
    codegen(): string {
        throw new Error(
            "Abstract method - must override for expr: " +
                // eslint-disable-next-line @typescript-eslint/no-invalid-this
                this.print(),
        );
    }

    compile(): (vars: Expr[]) => string {
        var code = this.codegen();
        try {
            // @ts-expect-error: TypeScript doesn't want to unify
            // `Function` with the `compile`'s return type.
            return new Function("vars", "return " + code + ";");
        } catch {
            throw new Error("Function did not compile: " + code);
        }
    }

    // returns a string unambiguously representing the expression
    // should be valid as input
    // e.g. this.equals(parse(this.print())) === true
    abstract print(): string;

    // returns a TeX string representing the expression
    abstract tex(): string;

    // returns a TeX string, modified by the given options
    asTex(options) {
        options = options || {};
        _.defaults(options, {
            display: true,
            dynamic: true,
            times: false,
        });

        let tex: string = this.tex();

        if (options.display) {
            tex = "\\displaystyle " + tex;
        }
        if (options.dynamic) {
            tex = tex.replace(/\(/g, "\\left(");
            tex = tex.replace(/\)/g, "\\right)");
        }
        if (options.times) {
            tex = tex.replace(/\\cdot/g, "\\times");
        }

        return tex;
    }

    // returns the name of this expression's constructor as a string
    // only used for testing and debugging
    name(): string {
        return this.func.name;
    }

    // returns a string representing current node structure
    repr(): string {
        return (
            this.name() +
            "(" +
            this.args()
                .map(function (arg) {
                    return _.isString(arg) || _.isNumber(arg)
                        ? arg
                        : arg?.repr();
                })
                .join(",") +
            ")"
        );
    }

    // removes all negative signs
    strip(): Expr {
        return this.recurse("strip");
    }

    // canonically reorders all commutative elements
    normalize(): Expr {
        return this.recurse("normalize");
    }

    // expands the expression
    expand(): Expr {
        return this.recurse("expand");
    }

    // naively factors out like terms
    factor(options): Expr {
        return this.recurse("factor", options);
    }

    // collect all like terms
    collect(options?: Options): Expr {
        return this.recurse("collect", options);
    }

    // strict syntactic equality check
    equals(other: Expr): boolean {
        return this.normalize().print() === other.normalize().print();
    }

    // expand and collect until the expression no longer changes
    simplify(options?: Options) {
        options = {
            once: false,
            ...options,
        };

        // Attempt to factor and collect
        var step1 = this.factor(options);
        var step2 = step1.collect(options);

        // Rollback if collect didn't do anything
        if (step1.equals(step2)) {
            step2 = this.collect(options);
        }

        // Attempt to expand and collect
        var step3 = step2.expand();
        var step4 = step3.collect(options);

        // Rollback if collect didn't do anything
        if (step3.equals(step4)) {
            step4 = step2.collect(options);
        }

        // One round of simplification complete
        var simplified = step4;

        if (options.once || this.equals(simplified)) {
            return simplified;
        } else {
            return simplified.simplify(options);
        }
    }

    // check whether this expression is simplified
    isSimplified() {
        return this.equals(this.simplify());
    }

    // return the child nodes of this node
    exprArgs(): Expr[] {
        // @ts-expect-error: Type 'string | number | Expr | undefined' is not assignable to type 'string | Expr'.
        return this.args().filter(isExpr);
    }

    // return the variables (function and non) within the expression
    getVars(excludeFunc?: boolean) {
        return _.uniq(
            _.flatten(_.invoke(this.exprArgs(), "getVars", excludeFunc)),
        ).sort();
    }

    getConsts() {
        return _.uniq(_.flatten(_.invoke(this.exprArgs(), "getConsts"))).sort();
    }

    getUnits() {
        return _.flatten(_.invoke(this.exprArgs(), "getUnits"));
    }

    // check whether this expression node is of a particular type
    is(func): boolean {
        return this instanceof func;
    }

    // check whether this expression has a particular node type
    has(func): boolean {
        if (this instanceof func) {
            return true;
        }
        return _.any(this.exprArgs(), function (arg) {
            return arg.has(func);
        });
    }

    // raise this expression to a given exponent
    // most useful for eventually implementing i^3 = -i, etc.
    raiseToThe(exp: Expr, options?: {preciseFloats?: boolean}): Expr {
        return new Pow(this, exp);
    }

    // does this expression have a specific rendering hint?
    // rendering hints are picked up while parsing, but are lost during transformations
    isSubtract() {
        return false;
    }
    isDivide() {
        return false;
    }
    isRoot() {
        return false;
    }

    // whether this node needs an explicit multiplication sign if following a Num
    needsExplicitMul(): boolean {
        return this.exprArgs()[0].needsExplicitMul();
    }

    // check that the variables in both expressions are the same
    sameVars(other: Expr) {
        var vars1 = this.getVars();
        var vars2 = other.getVars();

        // the other Expr can have more variables than this one
        // this lets you multiply equations by other variables
        var same = function (array1, array2) {
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            return !_.difference(array1, array2).length;
        };

        var lower = function (array) {
            return _.uniq(_.invoke(array, "toLowerCase")).sort();
        };

        var equal = same(vars1, vars2);
        var equalIgnoringCase = same(lower(vars1), lower(vars2));

        return {equal: equal, equalIgnoringCase: equalIgnoringCase};
    }

    // semantic equality check, call after sameVars() to avoid potential false positives
    // plug in random numbers for the variables in both expressions
    // if they both consistently evaluate the same, then they're the same
    compare(other: Expr) {
        // equation comparisons are handled by Eq.compare()
        if (other instanceof Eq) {
            return false;
        }

        var varList = _.union(
            this.getVars(/* excludeFunc */ true),
            other.getVars(/* excludeFunc */ true),
        );

        // If the numbers are large we would like to do a relative comparison
        // rather than an absolute one, but if they're small enough then an
        // absolute comparison makes more sense
        var getDelta = function (num1: number, num2: number) {
            if (Math.abs(num1) < 1 || Math.abs(num2) < 1) {
                return Math.abs(num1 - num2);
            } else {
                return Math.abs(1 - num1 / num2);
            }
        };

        var equalNumbers = function (num1: number, num2: number) {
            var delta = getDelta(num1, num2);
            return (
                // Treat positive and negative infinity as equal. We want to
                // consider -1 / 0 equal to 1 / 0 so that 1 / (x - 1) is equal
                // to -1 / (1 - x) when we guess-and-check with x = 1.
                (isInfinite(num1) && isInfinite(num2)) ||
                (isNaN(num1) && isNaN(num2)) ||
                delta < Math.pow(10, -TOLERANCE)
            );
        };

        // If no variables, only need to evaluate once.
        // note(matthew) Seems to be an optimization for simple cases like `2+2=4`
        // where there are no variables / functions.
        // Ran into issues with it in LEMS-2777 and found that tests pass
        // with this removed, but keeping a modified version out of caution.
        const varAndFuncList = _.union(
            this.getVars(/* excludeFunc */ false),
            other.getVars(/* excludeFunc */ false),
        );
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!varAndFuncList.length && !this.has(Unit) && !other.has(Unit)) {
            return equalNumbers(this.eval(), other.eval());
        }

        // collect here to avoid sometimes dividing by zero, and sometimes not
        // it is better to be deterministic, e.g. x/x -> 1
        // TODO(alex): may want to keep track of assumptions as they're made
        var expr1 = this.collect();
        var expr2 = other.collect();

        var unitList1 = this.getUnits();
        var unitList2 = other.getUnits();

        if (!_.isEqual(unitList1, unitList2)) {
            return false;
        }

        // Compare at a set number (currently 12) of points to determine
        // equality.
        //
        // `range` (and `vars`) is the only variable that varies through the
        // iterations. For each of range = 10, 100, and 1000, each random
        // variable is picked from (-range, range).
        //
        // Note that because there are 12 iterations and three ranges, each
        // range is checked four times.
        for (var i = 0; i < ITERATIONS; i++) {
            var vars = {};

            // One third total iterations each with range 10, 100, and 1000
            var range = Math.pow(10, 1 + Math.floor((3 * i) / ITERATIONS));

            // Half of the iterations should only use integer values.
            // This is because expressions like (-2)^x are common but result
            // in NaN when evaluated in JS with non-integer values of x.
            // Without this, (-2)^x and (-2)^(x+1) both end up always being NaN
            // and thus equivalent. With this, the most common failure case is
            // avoided. However, less common cases such as (-2)^(x+0.1) and
            // (-2)^(x+1.1) will still both evaluate to NaN and result in a
            // false positive.
            //
            // Note that the above is only true in vanilla JS Number-land,
            // which has no concept of complex numbers. The solution is simple:
            // Integrate a library for handling complex numbers.
            //
            // TODO(alex): Add support for complex numbers, then remove this.
            var useFloats = i % 2 === 0;

            _.each(varList, function (v) {
                vars[v] = useFloats
                    ? randomFloat(-range, range)
                    : _.random(-range, range);
            });

            let equal;
            if (
                expr1.has(Func) ||
                expr2.has(Func) ||
                expr1.has(Unit) ||
                expr2.has(Unit)
            ) {
                const result1 = expr1.partialEval(vars);
                const result2 = expr2.partialEval(vars);

                equal = result1.simplify().equals(result2.simplify());
            } else {
                const result1 = expr1.eval(vars);
                const result2 = expr2.eval(vars);

                equal = equalNumbers(result1, result2);
            }

            if (!equal) {
                return false;
            }
        }

        return true;
    }

    // evaluate as much of the expression as possible
    partialEval(vars: Vars): Expr {
        if (this instanceof Unit) {
            return this;
        } else if (!this.has(Func)) {
            return new Float(+this.eval(vars).toFixed(TOLERANCE)).collect();
        } else if (this instanceof Func) {
            return new Func(this.symbol, this.arg.partialEval(vars));
        } else {
            return this.recurse("partialEval", vars);
        }
    }

    // check that the structure of both expressions is the same
    // all negative signs are stripped and the expressions are converted to
    // a canonical commutative form
    // should only be done after compare() returns true to avoid false positives
    sameForm(other: Expr) {
        return this.strip().equals(other.strip());
    }

    // returns the GCD of this expression and the given factor
    findGCD(factor: Expr): Expr {
        return this.equals(factor) ? factor : NumOne;
    }

    // return this expression's denominator
    getDenominator(): Expr {
        return NumOne;
    }

    // return this expression as a Mul
    asMul() {
        return new Mul(NumOne, this);
    }

    // TODO(alex): rename to isDefinitePositive or similar?
    // return whether this expression is 100% positive
    isPositive(): boolean {
        throw new Error(
            "Abstract method - must override for expr: " +
                // eslint-disable-next-line @typescript-eslint/no-invalid-this
                this.print(),
        );
    }

    // TODO(alex): rename to hasNegativeSign or similar?
    // return whether this expression has a negative sign
    isNegative() {
        return false;
    }

    // return a factor of this expression that is 100% positive
    asPositiveFactor(): Expr {
        return this.isPositive() ? this : NumOne;
    }

    // return a copy of the expression with a new hint set (preserves hints)
    addHint(hint: keyof Hints) {
        if (!hint) {
            return this;
        }

        var expr = this.construct(this.args());
        expr.hints = _.clone(this.hints);
        expr.hints[hint] = true;
        return expr;
    }

    // complete parse by performing a few necessary transformations
    completeParse(): Expr {
        return this.recurse("completeParse");
    }

    abs(): Expr {
        throw new Error(
            "Abstract method - must override for expr: " +
                // eslint-disable-next-line @typescript-eslint/no-invalid-this
                this.print(),
        );
    }

    negate(): Expr {
        return new Mul(NumNeg, this);
    }
}

/* abstract sequence node */
abstract class Seq extends Expr {
    // This should always have at least two terms.
    // TODO(kevinb): Try enforcing this at the type-level using [T, T, T[]]
    terms: Expr[];

    // TODO(kevinb): Update this use `...args: Expr[]`
    constructor(...args: any[]) {
        super();
        if (args.length === 1) {
            this.terms = args[0];
        } else {
            this.terms = args;
        }
    }

    args() {
        return this.terms;
    }

    normalize() {
        var terms = _.sortBy(_.invoke(this.terms, "normalize"), (term) => {
            return term.print();
        });

        return new this.func(terms);
    }

    expand(): Expr {
        return this.recurse("expand").flatten();
    }

    // partition the sequence into its numeric and non-numeric parts
    // makes no guarantees about the validity of either part!
    partition(): [Seq, Seq] {
        var [numbers, others] = partition(this.terms, (term) => {
            return term instanceof Num;
        });

        return [new this.func(numbers), new this.func(others)];
    }

    // ensure that sequences have 2+ terms and no nested sequences of the same type
    // this is a shallow flattening and will return a non-Seq if terms.length <= 1
    flatten(): Expr {
        var type = this;
        var terms = _.reject(this.terms, (term) => {
            // @ts-expect-error: `identity` is defined on Add and Mul but doesn't
            // exist on Seq itself.
            return term.equals(type.identity);
        });

        if (terms.length === 0) {
            // @ts-expect-error: `identity` is defined on Add and Mul but doesn't
            // exist on Seq itself.
            return type.identity;
        }
        if (terms.length === 1) {
            return terms[0];
        }

        // same contains the children which are Seqs of the same type as this Seq
        const [same, others] = partition(terms, (term) => {
            return term instanceof type.func;
        });

        var flattened = others.concat(
            _.flatten(_.pluck(same, "terms"), /* shallow: */ true),
        );
        return new type.func(flattened);
    }

    // reduce a numeric sequence to a Num
    abstract reduce(options?: Options): Expr;

    isPositive() {
        var terms = _.invoke(this.terms, "collect");
        return _.all(_.invoke(terms, "isPositive"));
    }

    // return a new Seq with a given term replaced by a different term
    // (or array of terms). given term can be passed directly, or by index
    // if no new term is provided, the old one is simply removed
    replace(oldTerm: Expr | number, newTerm?: Expr | Expr[]) {
        const index =
            oldTerm instanceof Expr ? _.indexOf(this.terms, oldTerm) : oldTerm;

        var newTerms: Expr[] = [];
        if (Array.isArray(newTerm)) {
            newTerms = newTerm;
        } else if (newTerm) {
            newTerms = [newTerm];
        }

        var terms = this.terms
            .slice(0, index)
            .concat(newTerms)
            .concat(this.terms.slice(index + 1));

        return new this.func(terms);
    }

    // syntactic sugar for replace()
    remove(term: number | Expr) {
        return this.replace(term);
    }

    getDenominator(): Expr {
        // TODO(alex): find and return LCM
        return new Mul(_.invoke(this.terms, "getDenominator")).flatten();
    }
}

/* sequence of additive terms */
export class Add extends Seq {
    identity: Num = NumZero;

    func = Add;

    eval(vars: Vars = {}, options?: ParseOptions) {
        return _.reduce(
            this.terms,
            (memo, term) => {
                return memo + term.eval(vars, options);
            },
            0,
        );
    }

    codegen(): string {
        return (
            _.map(this.terms, (term) => {
                return "(" + term.codegen() + ")";
            }).join(" + ") || "0"
        );
    }

    print(): string {
        return _.invoke(this.terms, "print").join("+");
    }

    tex(): string {
        let tex = "";

        _.each(this.terms, (term) => {
            if (!tex || term.isSubtract()) {
                tex += term.tex();
            } else {
                tex += "+" + term.tex();
            }
        });

        return tex;
    }

    collect(options?: Options) {
        var terms = _.invoke(this.terms, "collect", options);
        var pairs: [expr: Expr, coefficient: Expr][] = [];

        _.each(terms, (term) => {
            if (term instanceof Mul) {
                var muls = term.partition();
                pairs.push([muls[1].flatten(), muls[0].reduce(options)]);
            } else if (term instanceof Num) {
                pairs.push([NumOne, term]);
            } else {
                pairs.push([term, NumOne]);
            }
        });

        // { (Expr expr).print(): [[Expr expr, Num coefficient]] }
        var grouped = _.groupBy(pairs, (pair) => {
            return pair[0].normalize().print();
        });

        var collected = _.compact(
            _.map(grouped, (pairs) => {
                var expr = pairs[0][0];
                var sum = new Add(_.zip.apply(_, pairs)[1]);
                var coefficient = sum.reduce(options);
                return new Mul(coefficient, expr).collect(options);
            }),
        );

        // TODO(alex): use the Pythagorean identity here
        // e.g. x*sin^2(y) + x*cos^2(y) -> x

        return new Add(collected).flatten();
    }

    // naively factor out anything that is common to all terms
    // if options.keepNegative is specified, won't factor out a common -1
    factor(options: {keepNegative: boolean} = {keepNegative: false}) {
        const terms = this.terms.map((term) => term.collect());
        let factors: Expr[];

        if (terms[0] instanceof Mul) {
            factors = terms[0].terms;
        } else {
            factors = [terms[0]];
        }

        _.each(_.rest(this.terms), (term) => {
            factors = _.map(factors, (factor: Expr) => {
                return term.findGCD(factor);
            });
        });

        if (!options.keepNegative && this.isNegative()) {
            factors.push(NumNeg);
        }

        const left = new Mul(factors).flatten().collect();

        const remainder = terms.map((term) =>
            Mul.handleDivide(term, left).simplify(),
        );
        const right = new Add(remainder).flatten();

        return Mul.createOrAppend(left, right).flatten();
    }

    reduce(options?: Options): Expr {
        return _.reduce(
            this.terms,
            // @ts-expect-error: Type 'Expr' is not assignable to type 'Num'.
            (memo, term) => {
                return memo.add(term, options);
            },
            this.identity,
        );
    }

    needsExplicitMul() {
        return false;
    }

    isNegative() {
        var terms = _.invoke(this.terms, "collect");
        return _.all(_.invoke(terms, "isNegative"));
    }

    negate() {
        return new Add(_.invoke(this.terms, "negate"));
    }

    // create a new sequence unless left is already one (returns a copy)
    static createOrAppend(left: Expr, right: Expr) {
        if (left instanceof Add) {
            return new Add(left.terms.concat(right));
        } else {
            return new Add(left, right);
        }
    }
}

/* sequence of multiplicative terms */
export class Mul extends Seq {
    identity: Num = NumOne;

    func = Mul;

    eval(vars: Vars = {}, options?: ParseOptions) {
        return _.reduce(
            this.terms,
            (memo, term) => {
                return memo * term.eval(vars, options);
            },
            1,
        );
    }

    codegen(): string {
        return (
            _.map(this.terms, (term) => {
                return "(" + term.codegen() + ")";
            }).join(" * ") || "0"
        );
    }

    print(): string {
        return _.map(this.terms, (term) => {
            return term instanceof Add
                ? "(" + term.print() + ")"
                : term.print();
        }).join("*");
    }

    getUnits() {
        var tmUnits = _(this.terms)
            .chain()
            .map((term) => {
                return term.getUnits();
            })
            .flatten()
            .value();

        tmUnits.sort((a, b) => a.unit.localeCompare(b.unit));

        return tmUnits;
    }

    // since we don't care about commutativity, we can render a Mul any way we choose
    // so we follow convention: first any negatives, then any numbers, then everything else
    tex(): string {
        var cdot = " \\cdot ";

        var terms = _.groupBy(this.terms, (term) => {
            if (term.isDivide()) {
                return "inverse";
            } else if (term instanceof Num) {
                return "number";
            } else {
                return "other";
            }
        });

        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        var inverses = terms.inverse || [];
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        var numbers: Num[] = (terms.number as Num[]) || [];
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        var others = terms.other || [];

        var negatives = "";
        var numerator;

        // check all the numbers to see if there is a rational we can extract,
        // since we would like 1/2x/y to come out as \frac{1}{2}\frac{x}{y},
        // and not \frac{1x}{2y}.
        for (var i = 0; i < numbers.length; i++) {
            var isRational =
                numbers[i] instanceof Rational && !(numbers[i] instanceof Int);
            if (isRational && others.length > 0 && inverses.length > 0) {
                var withThisRemoved: Expr[] = numbers.slice();
                withThisRemoved.splice(i, 1);
                var newTerms = withThisRemoved.concat(inverses).concat(others);
                return numbers[i].tex() + new Mul(newTerms).tex();
            }
        }

        numbers = _.compact(
            _.map(numbers, (term) => {
                var shouldPushDown =
                    !term.hints.fraction || inverses.length > 0;
                if (
                    term instanceof Rational &&
                    !(term instanceof Int) &&
                    shouldPushDown
                ) {
                    // e.g. 3x/4 -> 3/4*x (internally) -> 3x/4 (rendered)
                    inverses.push(new Pow(new Int(term.d), NumDiv));
                    var number = new Int(term.n);
                    number.hints = term.hints;
                    return _.any(term.hints) ? number : null;
                } else {
                    return term;
                }
            }),
        );

        if (numbers.length === 0 && others.length === 1) {
            // e.g. (x+y)/z -> \frac{x+y}{z}
            numerator = others[0].tex();
        } else {
            var tex = "";

            _.each(numbers, (term) => {
                if (term.hints.subtract && term.hints.entered) {
                    negatives += "-";
                    tex += (tex ? cdot : "") + term.abs().tex();
                } else if (
                    term instanceof Int &&
                    term.n === -1 &&
                    (term.hints.negate || term.hints.subtract)
                ) {
                    // e.g. -1*-1 -> --1
                    // e.g. -1*x -> -x
                    negatives += "-";
                } else {
                    // e.g. 2*3 -> 2(dot)3
                    tex += (tex ? cdot : "") + term.tex();
                }
            });

            _.each(others, (term) => {
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

            numerator = tex ? tex : "1";
        }

        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!inverses.length) {
            return negatives + numerator;
        } else {
            var denominator = new Mul(_.invoke(inverses, "asDivide"))
                .flatten()
                .tex();
            return negatives + "\\frac{" + numerator + "}{" + denominator + "}";
        }
    }

    strip(): Expr {
        var terms = _.map(this.terms, (term) => {
            return term instanceof Num ? term.abs() : term.strip();
        });
        return new Mul(terms).flatten();
    }

    // expand numerator and denominator separately
    expand(): Expr {
        const isInverse = function (term: Expr): term is Pow {
            return term instanceof Pow && term.exp.isNegative();
        };

        const isInverseAdd = function (term: Expr) {
            return isInverse(term) && isAdd(term.base);
        };

        const mul = this.recurse("expand").flatten();
        const factors = getFactors(mul);

        const hasAdd = _.any(factors, isAdd);
        const hasInverseAdd = _.any(factors, isInverseAdd);

        if (!(hasAdd || hasInverseAdd)) {
            return mul;
        }

        let [inverses, normals] = partition(factors, isInverse);

        if (hasAdd) {
            const [adds, others] = partition(normals, isAdd);

            // loop over each additive sequence
            const expanded = _.reduce(
                adds as Add[],
                function (expanded, add) {
                    // loop over each expanded array of terms
                    return _.reduce(
                        expanded,
                        function (temp, array) {
                            // loop over each additive sequence's terms
                            return temp.concat(
                                _.map(add.terms, (term) => array.concat(term)),
                            );
                        },
                        [] as Expr[][],
                    );
                },
                [[]] as Expr[][],
            );

            // join each fully expanded array of factors with remaining multiplicative factors
            const muls = _.map(expanded, function (array) {
                return new Mul(others.concat(array)).flatten();
            });

            normals = [new Add(muls)];
        }

        if (hasInverseAdd) {
            const denominator = new Mul(
                _.invoke(inverses, "getDenominator"),
            ).flatten();
            inverses = [new Pow(denominator.expand(), NumDiv)];
        }

        return new Mul(normals.concat(inverses)).flatten();
    }

    factor(options): Expr {
        var factored = this.recurse("factor", options).flatten();
        if (!(factored instanceof Mul)) {
            return factored;
        }

        // Combine any factored out Rationals into one, but don't collect
        var [rationals, others] = partition(factored.terms, (term) => {
            return term instanceof Rational;
        });

        // Could also accomplish this by passing a new option
        // e.g. return  memo.mul(term, {autocollect: false});
        // TODO(alex): Decide whether this is a good use of options or not
        const ratObj = _.reduce(
            rationals as Rational[],
            (memo, term) => {
                return {n: memo.n * term.n, d: memo.d * term.d};
            },
            {n: 1, d: 1},
        );

        const rational =
            ratObj.d === 1
                ? new Int(ratObj.n)
                : new Rational(ratObj.n, ratObj.d);

        return new Mul(others.concat(rational)).flatten();
    }

    collect(options?: Options): Expr {
        var partitioned = this.recurse("collect", options).partition();
        var number = partitioned[0].reduce(options);

        // e.g. 0*x -> 0
        if (number.eval() === 0) {
            return NumZero;
        }

        const other = partitioned[1].flatten();

        // e.g. 2*2 -> 4
        // e.g. 2*2*x -> 4*x
        if (!(other instanceof Mul)) {
            return new Mul(number, other).flatten();
        }

        const others = other.terms;

        var pairs: [base: Expr, exp: Expr][] = [];

        _.each(others, (term) => {
            if (term instanceof Pow) {
                pairs.push([term.base, term.exp]);
            } else {
                pairs.push([term, NumOne]);
            }
        });

        // {(Expr base).print(): [[Expr base, Expr exp]]}
        var grouped = _.groupBy(pairs, (pair) => {
            return pair[0].normalize().print();
        });

        var summed: [base: Expr, exp: Expr][] = _.compact(
            _.map(grouped, (pairs): [Expr, Expr] | null => {
                var base = pairs[0][0];
                var sum = new Add(_.zip.apply(_, pairs)[1]);
                var exp = sum.collect(options);

                if (exp instanceof Num && exp.eval() === 0) {
                    return null;
                } else {
                    return [base, exp];
                }
            }),
        );

        // XXX `pairs` is shadowed four or five times in this function
        const groupedPairs = _.groupBy(summed, (pair) => {
            if (pair[0] instanceof Trig && pair[0].isBasic()) {
                return "trig";
            } else if (pair[0] instanceof Log) {
                return "log";
            } else {
                return "expr";
            }
        });
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        let trigs = (groupedPairs.trig as [Trig, Expr][]) || [];
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        let logs = (groupedPairs.log as [Log, Expr][]) || [];
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        const exprs = groupedPairs.expr || [];

        if (trigs.length > 1) {
            // combine sines and cosines into other trig functions

            // {Trig.arg.print(): [[Trig base, Expr exp]]}
            var byArg = _.groupBy(trigs, (pair) => {
                return pair[0].arg.normalize().print();
            });

            trigs = [];
            _.each(byArg, (pairs) => {
                const arg = pairs[0][0].arg;

                // {Trig.type: Expr exp}
                let funcs: Record<string, Expr> = {sin: NumZero, cos: NumZero};
                _.each(pairs, (pair) => {
                    funcs[pair[0].type] = pair[1];
                });

                if (
                    Mul.handleNegative(funcs.sin)
                        .collect(options)
                        .equals(funcs.cos)
                ) {
                    // e.g. sin^x(y)/cos^x(y) -> tan^x(y)
                    if (funcs.cos.isNegative()) {
                        funcs = {tan: funcs.sin};
                    } else {
                        funcs = {cot: funcs.cos};
                    }
                }

                // TODO(alex): combine even if exponents not a perfect match
                // TODO(alex): transform 1/sin and 1/cos into csc and sec

                _.each(funcs, (exp, type) => {
                    trigs.push([new Trig(type, arg), exp]);
                });
            });
        }

        if (logs.length > 1) {
            // combine logs with the same base

            // {Log.base.print(): [[Log base, Expr exp]]}
            var byBase = _.groupBy(logs, (pair) => {
                return pair[0].base.normalize().print();
            });

            logs = [];

            _.each(byBase, (pairs) => {
                // only combine two logs of the same base, otherwise commutative
                // differences result in different equally valid output
                // e.g. ln(x)/ln(z)*ln(y) -> log_z(x)*ln(y)
                // e.g. ln(x)*ln(y)/ln(z) -> ln(x)*log_z(y)
                if (
                    pairs.length === 2 &&
                    Mul.handleNegative(pairs[0][1])
                        .collect(options)
                        .equals(pairs[1][1])
                ) {
                    // e.g. ln(x)^y/ln(b)^y -> log_b(x)^y
                    if (pairs[0][1].isNegative()) {
                        logs.push([
                            new Log(pairs[0][0].power, pairs[1][0].power),
                            pairs[1][1],
                        ]);
                    } else {
                        logs.push([
                            new Log(pairs[1][0].power, pairs[0][0].power),
                            pairs[0][1],
                        ]);
                    }
                } else {
                    logs = logs.concat(pairs);
                }
            });

            // TODO(alex): combine if all inverses are the same e.g. ln(y)*ln(z)/ln(x)/ln(x)
        }

        var collected = _.map([...trigs, ...logs, ...exprs], (pair) => {
            return new Pow(pair[0], pair[1]).collect(options);
        });

        return new Mul([number].concat(collected)).flatten();
    }

    isSubtract() {
        return _.any(this.terms, (term) => {
            return term instanceof Num && Boolean(term.hints.subtract);
        });
    }

    // factor a single -1 in to the Mul
    // combine with a Num if all Nums are positive, else add as a term
    factorIn(hint: keyof Hints): Expr {
        var partitioned = this.partition();
        // `partition` splits the terms into two Seqs - one containing
        // only Nums and the all non-Num nodes.
        var numbers = partitioned[0].terms as Num[];
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        var fold = numbers.length && _.all(numbers, (num) => num.n > 0);

        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (fold) {
            // e.g. - x*2*3 -> x*-2*3
            var num = numbers[0].negate();
            num.hints = numbers[0].hints;
            return this.replace(numbers[0], num.addHint(hint));
        } else {
            // e.g. - x*y -> -1*x*y
            // e.g. - x*-2 -> -1*x*-2
            return new Mul([Num.negativeOne(hint)].concat(this.terms));
        }
    }

    // factor out a single hinted -1 (assume it is the division hint)
    // TODO(alex): make more general or rename to be more specific
    factorOut() {
        var factored = false;
        var terms = _.compact(
            _.map(this.terms, (term) => {
                if (!factored && term instanceof Num && term.hints.divide) {
                    factored = true;
                    return term.n !== -1 ? term.negate() : null;
                } else {
                    return term;
                }
            }),
        );

        if (terms.length === 1) {
            return terms[0];
        } else {
            return new Mul(terms);
        }
    }

    reduce(options?: {preciseFloats: boolean}) {
        return _.reduce(
            this.terms,
            // @ts-expect-error: Type 'Expr' is not assignable to type 'Num'.
            (memo, term) => {
                return memo.mul(term, options);
            },
            this.identity,
        );
    }

    findGCD(factor: Expr): Expr {
        return new Mul(_.invoke(this.terms, "findGCD", factor)).flatten();
    }

    asMul() {
        return this;
    }

    asPositiveFactor(): Expr {
        if (this.isPositive()) {
            return this;
        } else {
            const terms = getFactors(this.collect()).map((factor) =>
                factor.asPositiveFactor(),
            );
            return new Mul(terms).flatten();
        }
    }

    isNegative() {
        const terms = getFactors(this.collect()).map((factor) =>
            factor.isNegative(),
        );
        return _.any(terms);
    }

    fold() {
        return Mul.fold(this);
    }

    negate() {
        var isNum = (expr: Expr) => {
            return expr instanceof Num;
        };
        const num = _.find(this.terms, isNum);
        if (num) {
            return this.replace(num, num.negate());
        } else {
            return new Mul([NumNeg].concat(this.terms));
        }
    }

    // negative signs should be folded into numbers whenever possible
    // never fold into a Num that's already negative or a Mul that has a negative Num
    // an optional hint is kept track of to properly render user input
    // an empty hint means negation
    static handleNegative(expr: Expr, hint?): Expr {
        if (expr instanceof Num && expr.n > 0) {
            // e.g. - 2 -> -2
            var negated = expr.negate();
            // TODO(alex): rework hint system so that this isn't necessary
            negated.hints = expr.hints;
            return negated.addHint(hint);
        } else if (expr instanceof Mul) {
            // e.g. - x*2*3 -> x*-2*3
            // e.g. - x*y -> -1*x*y
            // e.g. - x*-2 -> -1*x*-2
            return expr.factorIn(hint);
        } else {
            // e.g. - x -> -1*x
            return new Mul(Num.negativeOne(hint), expr);
        }
    }

    // division can create either a Rational or a Mul
    static handleDivide(left: Expr, right: Expr): Expr {
        // dividing by a Mul is the same as repeated division by its terms
        if (right instanceof Mul) {
            var first = Mul.handleDivide(left, right.terms[0]);
            var rest = new Mul(_.rest(right.terms)).flatten();
            return Mul.handleDivide(first, rest);
        }

        var isInt = (expr: Expr | undefined): expr is Int => {
            return expr instanceof Int;
        };
        var isRational = (expr: Expr | undefined): expr is Rational => {
            return expr instanceof Rational;
        };

        // for simplification purposes, fold Ints into Rationals if possible
        // e.g. 3x / 4 -> 3/4 * x (will still render as 3x/4)
        if (isInt(right) && left instanceof Mul && _.any(left.terms, isInt)) {
            // search from the right
            var reversed = left.terms.slice().reverse();
            var num = reversed.find(isRational);

            if (!isInt(num)) {
                return new Mul(
                    left.terms.concat([
                        new Rational(1, right.n).addHint("fraction"),
                    ]),
                );
            }

            var rational = new Rational(num.n, right.n);
            rational.hints = num.hints;

            // in the case of something like 1/3 * 6/8, we want the
            // 6/8 to be considered a fraction, not just a division
            if (num === reversed[0]) {
                rational = rational.addHint("fraction");
            }

            if (num.n < 0 && right.n < 0) {
                rational.d = -rational.d;
                return left.replace(num, [NumNeg, rational]);
            } else {
                return left.replace(num, rational);
            }
        }

        var divide = (a: Expr, b: Expr) => {
            if (b instanceof Int) {
                if (a instanceof Int) {
                    if (a.n < 0 && b.n < 0) {
                        // e.g. -2 / -3 -> -1*-2/3
                        return [
                            NumNeg,
                            new Rational(a.n, -b.n).addHint("fraction"),
                        ];
                    } else {
                        // e.g. 2 / 3 -> 2/3
                        // e.g. -2 / 3 -> -2/3
                        // e.g. 2 / -3 -> -2/3
                        return [new Rational(a.n, b.n).addHint("fraction")];
                    }
                } else {
                    // e.g. x / 3 -> x*1/3
                    // e.g. x / -3 -> x*-1/3
                    var inverse = new Rational(1, b.eval());
                    if (b.eval() < 0) {
                        return [a, inverse.addHint("negate")];
                    } else {
                        return [a, inverse];
                    }
                }
            } else {
                var pow;

                if (b instanceof Trig && b.exp) {
                    // e.g. sin^2(x) -> sin(x)^2
                    var exp = b.exp;
                    b.exp = undefined;
                    b = new Pow(b, exp);
                }

                if (b instanceof Pow) {
                    // e.g. (x^2) ^ -1 -> x^-2
                    // e.g. (x^y) ^ -1 -> x^(-1*y)
                    // e.g. (x^(yz)) ^ -1 -> x^(-1*y*z)
                    pow = new Pow(b.base, Mul.handleNegative(b.exp, "divide"));
                } else {
                    // e.g. x ^ -1 -> x^-1
                    pow = new Pow(b, NumDiv);
                }

                if (a instanceof Int && a.n === 1) {
                    // e.g. 1 / x -> x^-1
                    return [pow];
                } else {
                    // e.g. 2 / x -> 2*x^-1
                    return [a, pow];
                }
            }
        };

        if (left instanceof Mul) {
            // NOTE(kevinb): `terms` should always have at least two
            // elements so getting the last element is safe to do.
            var divided = divide(_.last(left.terms)!, right);
            return new Mul(_.initial(left.terms).concat(divided));
        } else {
            var divided = divide(left, right);
            return new Mul(divided).flatten();
        }
    }

    // fold negative signs into numbers if possible
    // negative signs are not the same as multiplying by negative one!
    // e.g. -x      ->  -1*x    simplified
    // e.g. -2*x    ->  -2*x    simplified
    // e.g. -x*2    ->  -1*x*2  not simplified -> x*-2 simplified
    // e.g. -1*x*2  ->  -1*x*2  not simplified

    // also fold multiplicative terms into open Trig and Log nodes
    // e.g. (sin x)*x -> sin(x)*x
    // e.g. sin(x)*x -> sin(x)*x
    // e.g. sin(x)*(x) -> sin(x)*x
    // e.g. sin(x)*sin(y) -> sin(x)*sin(y)
    static fold(expr: Expr): Expr {
        if (expr instanceof Mul) {
            // assuming that this will be second to last
            var trigLog = _.find(_.initial(expr.terms), (term) => {
                return (
                    (term instanceof Trig || term instanceof Log) &&
                    Boolean(term.hints.open)
                );
            }) as Trig | Log | undefined;

            if (trigLog) {
                // expr.terms should always have at least two terms
                const last = _.last(expr.terms)!;
                if (
                    trigLog.hints.parens ||
                    last.hints.parens ||
                    last.has(Trig) ||
                    last.has(Log)
                ) {
                    trigLog.hints.open = false;
                } else {
                    const newTrigLog =
                        trigLog instanceof Trig
                            ? Trig.create(
                                  [trigLog.type, trigLog.exp],
                                  Mul.createOrAppend(trigLog.arg, last).fold(),
                              )
                            : Log.create(
                                  trigLog.base,
                                  Mul.createOrAppend(
                                      trigLog.power,
                                      last,
                                  ).fold(),
                              );

                    const index = _.indexOf(expr.terms, trigLog);
                    if (index === 0) {
                        return newTrigLog;
                    } else {
                        return new Mul(
                            expr.terms.slice(0, index).concat(newTrigLog),
                        ).fold();
                    }
                }
            }

            var partitioned = expr.partition();
            var numbers = partitioned[0].terms;

            var pos = (num: Num): boolean => {
                return num.n > 0;
            };
            var neg = (num: Num): boolean => {
                return num.n === -1 && Boolean(num.hints.negate);
            };
            var posOrNeg = function (num: Num): boolean {
                return pos(num) || neg(num);
            };

            // @ts-expect-error: Type 'Expr' is not assignable to type 'Num'.
            const posNum = numbers.find(pos);
            // @ts-expect-error: Type 'Expr' is not assignable to type 'Num'.
            const negNum = numbers.find(neg);
            if (
                numbers.length > 1 &&
                negNum &&
                posNum &&
                // @ts-expect-error: Type 'Expr' is not assignable to type 'Num'.
                _.every(numbers, posOrNeg)
            ) {
                var firstNeg = _.indexOf(expr.terms, negNum);
                var firstNum = _.indexOf(expr.terms, posNum);

                // e.g. -x*2 -> x*-2
                if (firstNeg < firstNum) {
                    return expr
                        .replace(firstNum, expr.terms[firstNum].negate())
                        .remove(firstNeg);
                }
            }
        }

        // in all other cases, make no change
        return expr;
    }

    // create a new sequence unless left is already one (returns a copy)
    static createOrAppend(left: Expr, right: Expr) {
        if (left instanceof Mul) {
            return new Mul(left.terms.concat(right));
        } else {
            return new Mul(left, right);
        }
    }
}

/* exponentiation */
export class Pow extends Expr {
    base: Expr;
    exp: Expr;

    constructor(base, exp) {
        super();
        this.base = base;
        this.exp = exp;
    }

    func = Pow;

    args() {
        return [this.base, this.exp];
    }

    eval(vars: Vars = {}, options?: ParseOptions) {
        var evaledBase = this.base.eval(vars, options);
        var evaledExp = this.exp.eval(vars, options);

        // Math.pow unequivocally returns NaN when provided with both a
        // negative base and a fractional exponent. However, in some cases, we
        // know that our exponent is actually valid for use with negative
        // bases (e.g., (-5)^(1/3)).
        //
        // Here, we explicitly check for such cases. We really only handle a
        // limited subset (by requiring that the exponent is rational with an
        // odd denominator), but it's still useful.
        //   See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/pow
        if (evaledBase < 0) {
            var simplifiedExp = this.exp.simplify();

            // If Float, convert to a Rational to enable the logic below
            if (simplifiedExp instanceof Float) {
                var num = simplifiedExp.n;
                var decimals = (num - +num.toFixed()).toString().length - 2;
                var denominator = Math.pow(10, decimals);
                var rationalExp = new Rational(num * denominator, denominator);
                simplifiedExp = rationalExp.simplify();
            }
            if (simplifiedExp instanceof Rational) {
                var oddDenominator = Math.abs(simplifiedExp.d) % 2 === 1;
                if (oddDenominator) {
                    var oddNumerator = Math.abs(simplifiedExp.n) % 2 === 1;
                    var sign = oddNumerator ? -1 : 1;
                    return sign * Math.pow(-1 * evaledBase, evaledExp);
                }
            }
        }
        return Math.pow(evaledBase, evaledExp);
    }

    getUnits() {
        return this.base.getUnits().map((unit) => {
            return {
                unit: unit.unit,
                // Exponents in units should always be integers
                pow: unit.pow * (this.exp as Int).n,
            };
        });
    }

    codegen(): string {
        return (
            "Math.pow(" + this.base.codegen() + ", " + this.exp.codegen() + ")"
        );
    }

    print(): string {
        var base = this.base.print();
        if (this.base instanceof Seq || this.base instanceof Pow) {
            base = "(" + base + ")";
        }
        return base + "^(" + this.exp.print() + ")";
    }

    tex(): string {
        if (this.isDivide()) {
            // e.g. x ^ -1 w/hint -> 1/x
            return "\\frac{1}{" + this.asDivide().tex() + "}";
        } else if (this.isRoot() && isRational(this.exp)) {
            if (this.exp.n !== 1) {
                throw new Error(
                    "Node marked with hint 'root' does not have exponent " +
                        "of form 1/x.",
                );
            }

            if (this.exp.d === 2) {
                // e.g. x ^ 1/2 w/hint -> sqrt{x}
                return "\\sqrt{" + this.base.tex() + "}";
            } else {
                // e.g. x ^ 1/y w/hint -> sqrt[y]{x}
                return "\\sqrt[" + this.exp.d + "]{" + this.base.tex() + "}";
            }
        } else if (
            this.base instanceof Trig &&
            !this.base.isInverse() &&
            this.exp instanceof Num &&
            this.exp.isSimple() &&
            this.exp.eval() >= 0
        ) {
            // e.g sin(x) ^ 2 -> sin^2(x)
            var split = this.base.texSplit();
            return split[0] + "^{" + this.exp.tex() + "}" + split[1];
        } else {
            // e.g. x ^ y -> x^y
            var base = this.base.tex();
            if (
                this.base instanceof Seq ||
                this.base instanceof Pow ||
                (this.base instanceof Num && !this.base.isSimple())
            ) {
                // e.g. a+b ^ c -> (a+b)^c
                base = "(" + base + ")";
            } else if (this.base instanceof Trig || this.base instanceof Log) {
                // e.g. ln(x) ^ 2 -> [ln(x)]^2
                base = "[" + base + "]";
            }
            return base + "^{" + this.exp.tex() + "}";
        }
    }

    needsExplicitMul() {
        return this.isRoot() ? false : this.base.needsExplicitMul();
    }

    expand() {
        var pow = this.recurse("expand");

        if (pow.base instanceof Mul) {
            // e.g. (ab)^c -> a^c*b^c

            var terms = _.map(pow.base.terms, (term) => {
                return new Pow(term, pow.exp);
            });

            return new Mul(terms).expand();
        } else if (
            pow.base instanceof Add &&
            pow.exp instanceof Int &&
            pow.exp.abs().eval() > 1
        ) {
            // e.g. (a+b)^2 -> a*a+a*b+a*b+b*b
            // e.g. (a+b)^-2 -> (a*a+a*b+a*b+b*b)^-1

            var positive = pow.exp.eval() > 0;
            var n = pow.exp.abs().eval();

            var signed = function (mul) {
                return positive ? mul : new Pow(mul, NumDiv);
            };

            // compute and cache powers of 2 up to n
            const cache: Record<number, Expr> = {1: pow.base};
            for (var i = 2; i <= n; i *= 2) {
                const mul = new Mul(cache[i / 2], cache[i / 2]);
                cache[i] = mul.expand().collect();
            }

            // if n is a power of 2, you're done!
            if (n in cache) {
                return signed(cache[n]);
            }

            // otherwise decompose n into powers of 2 ...
            let indices = _.map(
                n.toString(2).split(""),
                function (str, i, list) {
                    return Number(str) * Math.pow(2, list.length - i - 1);
                },
            );
            indices = _.without(indices, 0);

            // ... then combine
            const factors: Expr[] = [];
            for (const index of indices) {
                if (index in cache) {
                    factors.push(cache[index]);
                }
            }
            const mul = new Mul(factors).expand().collect();
            return signed(mul);
        } else if (pow.exp instanceof Add) {
            // DEFINITELY want behind super-simplify() flag
            // e.g. x^(a+b) -> x^a*x^b

            const terms = _.map(pow.exp.terms, (term) => {
                return new Pow(pow.base, term).expand();
            });

            return new Mul(terms).expand();
        } else {
            return pow;
        }
    }

    factor() {
        var pow = this.recurse("factor");
        if (pow.base instanceof Mul) {
            var terms = _.map(pow.base.terms, (term) => {
                if (term instanceof Int && pow.exp.equals(NumDiv)) {
                    // Anything that can be a Rational should be a Rational
                    // e.g. 2^(-1) -> 1/2
                    return new Rational(1, term.n);
                } else {
                    return new Pow(term, pow.exp);
                }
            });
            return new Mul(terms);
        } else {
            return pow;
        }
    }

    collect(options?: Options): Expr {
        if (this.base instanceof Pow) {
            // collect this first to avoid having to deal with float precision
            // e.g. sqrt(2)^2 -> 2, not 2.0000000000000004
            // e.g. (x^y)^z -> x^(yz)
            const base = this.base.base;
            const exp = Mul.createOrAppend(this.base.exp, this.exp);
            return new Pow(base, exp).collect(options);
        }

        const pow = this.recurse("collect", options);

        const isSimilarLog = function (term: Expr): term is Log {
            return term instanceof Log && term.base.equals(pow.base);
        };

        if (pow.exp instanceof Num && pow.exp.eval() === 0) {
            // e.g. x^0 -> 1
            return NumOne;
        } else if (pow.exp instanceof Num && pow.exp.eval() === 1) {
            // e.g. x^1 -> x
            return pow.base;
        } else if (isSimilarLog(pow.exp)) {
            // e.g. b^(log_b(x)) -> x
            return pow.exp.power;
        } else if (
            pow.exp instanceof Mul &&
            _.any(pow.exp.terms, isSimilarLog)
        ) {
            // e.g. b^(2*y*log_b(x)) -> x^(2*y)
            // `log` will always be defined here because of the
            // `_.any(pow.exp.terms, isSimilarLog)` check above.
            const log = pow.exp.terms.find(isSimilarLog)!;
            const base = log.power;
            const exp = pow.exp.remove(log).flatten();
            return new Pow(base, exp).collect(options);
        } else if (pow.base instanceof Num && pow.exp instanceof Num) {
            // TODO(alex): Consider encapsualting this logic (and similar logic
            // elsewhere) into a separate Decimal class for user-entered floats
            if (options && options.preciseFloats) {
                // Avoid creating an imprecise float
                // e.g. 23^1.5 -> 12167^0.5, not ~110.304

                // If you take the root as specified by the denominator and
                // end up with more digits after the decimal point,
                // the result is imprecise. This works for rationals as well
                // as floats, but ideally rationals should be pre-processed
                // e.g. (1/27)^(1/3) -> 1/3 to avoid most cases.
                // TODO(alex): Catch such cases and avoid converting to floats.
                const exp = pow.exp.asRational();
                const decimalsInBase = pow.base.getDecimalPlaces();
                const root = new Pow(pow.base, new Rational(1, exp.d));
                const decimalsInRoot: number = root
                    .collect()
                    // @ts-expect-error: we assume that `root.collect()` returns
                    // a Num here but tbh I'm not sure how this code isn't causing
                    // an infinite loop.
                    .getDecimalPlaces();

                if (decimalsInRoot > decimalsInBase) {
                    // Collecting over this denominator would result in an
                    // imprecise float, so avoid doing so.
                    const newBase = new Pow(pow.base, new Int(exp.n)).collect();
                    return new Pow(newBase, new Rational(1, exp.d));
                }
            }

            // e.g. 4^1.5 -> 8
            return pow.base.raiseToThe(pow.exp, options);
        } else {
            return pow;
        }
    }

    // checks whether this Pow represents user-entered division
    isDivide() {
        var isDiv = function (arg: Expr) {
            return arg instanceof Num && Boolean(arg.hints.divide);
        };
        return (
            isDiv(this.exp) ||
            (this.exp instanceof Mul && _.any(this.exp.terms, isDiv))
        );
    }

    // assuming this Pow represents user-entered division, returns the denominator
    asDivide() {
        if (this.exp instanceof Num) {
            if (this.exp.eval() === -1) {
                return this.base;
            } else {
                var negated = this.exp.negate();
                negated.hints = _.clone(this.exp.hints);
                negated.hints.divide = false;
                return new Pow(this.base, negated);
            }
        } else if (this.exp instanceof Mul) {
            return new Pow(this.base, this.exp.factorOut());
        } else {
            throw new Error(
                "called asDivide() on an Expr that wasn't a Num or Mul",
            );
        }
    }

    isRoot(): boolean {
        return this.exp instanceof Rational && Boolean(this.exp.hints.root);
    }

    isSquaredTrig() {
        return (
            this.base instanceof Trig &&
            !this.base.isInverse() &&
            this.exp instanceof Num &&
            this.exp.eval() === 2
        );
    }

    // extract whatever denominator makes sense, ignoring hints
    // if negative exponent, will recursively include the base's denominator as well
    getDenominator() {
        if (this.exp instanceof Num && this.exp.eval() === -1) {
            return Mul.createOrAppend(
                this.base,
                this.base.getDenominator(),
            ).flatten();
        } else if (this.exp.isNegative()) {
            var pow = new Pow(
                this.base,
                Mul.handleNegative(this.exp).collect(),
            );
            return Mul.createOrAppend(
                pow,
                pow.collect().getDenominator(),
            ).flatten();
        } else if (this.base instanceof Num) {
            return new Pow(this.base.getDenominator(), this.exp).collect();
        } else {
            return NumOne;
        }
    }

    findGCD(factor: Expr): Expr {
        const [base, exp] =
            factor instanceof Pow
                ? [factor.base, factor.exp]
                : [factor, NumOne];

        // GCD is only relevant if same base
        if (this.base.equals(base)) {
            if (this.exp.equals(exp)) {
                // exact match
                // e.g. GCD(x^y^z, x^y^z) -> x^y^z
                return this;
            } else if (this.exp instanceof Num && exp instanceof Num) {
                // two numerical exponents
                // e.g. GCD(x^3, x^2) -> x^2
                return new Pow(this.base, Num.min(this.exp, exp)).collect();
            } else if (this.exp instanceof Num || exp instanceof Num) {
                // one numerical exponent
                // e.g. GCD(x^2, x^y) -> 1
                return NumOne;
            }

            var expA = this.exp.asMul().partition();
            var expB = exp.asMul().partition();

            if (expA[1].equals(expB[1])) {
                // exponents match except for coefficient
                // e.g. GCD(x^3y, x^y) -> x^y
                var coefficient = Num.min(expA[0].reduce(), expB[0].reduce());
                var mul = new Mul(coefficient, expA[1].flatten()).flatten();
                return new Pow(base, mul).collect();
            }
        }

        return NumOne;
    }

    isPositive() {
        if (this.base.isPositive()) {
            return true;
        }

        var exp = this.exp.simplify();
        return exp instanceof Int && exp.eval() % 2 === 0;
    }

    asPositiveFactor(): Expr {
        if (this.isPositive()) {
            return this;
        } else {
            var exp = this.exp.simplify();
            if (exp instanceof Int) {
                var n = exp.eval();
                if (n > 2) {
                    // e.g. x^3 -> x^2
                    return new Pow(this.base, new Int(n - 1));
                } else if (n < -2) {
                    // e.g. x^-3 -> x^-2
                    return new Pow(this.base, new Int(n + 1));
                }
            }
            return NumOne;
        }
    }

    static sqrt(arg: Expr) {
        return new Pow(arg, NumSqrt);
    }

    // NOTE(kevinb): nthroot is used as a constructor so we need to
    // define it as a static property instead of a static method.
    // TODO(kevinb): update parser-generator.ts to call nthrooth
    // without using `new`.
    static nthroot = function (radicand: Expr, degree: Expr) {
        var exp = Mul.fold(Mul.handleDivide(new Int(1), degree));

        // TODO(johnsullivan): If oneOverDegree ends up being a pow object,
        //     this "root" hint is lost between here and when tex() is called.
        return new Pow(radicand, exp.addHint("root"));
    };
}

/* logarithm */
export class Log extends Expr {
    base: Expr;
    power: Expr;

    constructor(base: Expr, power: Expr) {
        super();
        this.base = base;
        this.power = power;
        this.hints = {
            ...this.hints,
            open: false,
        };
    }

    func = Log;

    args() {
        return [this.base, this.power];
    }

    eval(vars: Vars = {}, options?: ParseOptions) {
        return (
            Math.log(this.power.eval(vars, options)) /
            Math.log(this.base.eval(vars, options))
        );
    }

    codegen(): string {
        return (
            "(Math.log(" +
            this.power.codegen() +
            ") / Math.log(" +
            this.base.codegen() +
            "))"
        );
    }

    print(): string {
        var power = "(" + this.power.print() + ")";
        if (this.isNatural()) {
            return "ln" + power;
        } else {
            return "log_(" + this.base.print() + ") " + power;
        }
    }

    tex(): string {
        var power = "(" + this.power.tex() + ")";
        if (this.isNatural()) {
            return "\\ln" + power;
        } else {
            return "\\log_{" + this.base.tex() + "}" + power;
        }
    }

    collect(options?: Options): Expr {
        var log = this.recurse("collect", options);

        if (log.power instanceof Num && log.power.eval() === 1) {
            // e.g. ln(1) -> 0
            return NumZero;
        } else if (log.base.equals(log.power)) {
            // e.g. log_b(b) -> 1
            return NumOne;
        } else if (
            log.power instanceof Pow &&
            log.power.base.equals(log.base)
        ) {
            // e.g. log_b(b^x) -> x
            return log.power.exp;
        } else {
            return log;
        }
    }

    expand() {
        var log = this.recurse("expand");

        if (log.power instanceof Mul) {
            // might want behind super-simplify() flag
            // e.g. ln(xy) -> ln(x) + ln(y)

            var terms = _.map(log.power.terms, (term) => {
                // need to expand again in case new log powers are Pows
                return new Log(log.base, term).expand();
            });

            return new Add(terms);
        } else if (log.power instanceof Pow) {
            // e.g. ln(x^y) -> y*ln(x)

            return new Mul(
                log.power.exp,
                new Log(log.base, log.power.base).expand(),
            ).flatten();
        } else if (!log.isNatural()) {
            // e.g. log_b(x) -> ln(x)/ln(b)

            return Mul.handleDivide(
                new Log(Const.e, log.power),
                new Log(Const.e, log.base),
            );
        } else {
            return log;
        }
    }

    isPositive() {
        var log = this.collect();

        if (
            log instanceof Log &&
            log.base instanceof Num &&
            log.power instanceof Num
        ) {
            return this.eval() > 0;
        } else {
            return false;
        }
    }

    needsExplicitMul() {
        return false;
    }

    isNatural() {
        return this.base.equals(Const.e);
    }

    static natural() {
        return Const.e;
    }

    static common() {
        return NumTen;
    }

    static create(base, power) {
        var log = new Log(base, power);
        if (!power.hints.parens) {
            log = log.addHint("open");
        }
        return log;
    }
}

type TrigFunc = {
    eval: (arg: number) => number;
    codegen: string | ((argStr: string) => string);
    tex: string;
    expand?: () => Expr;
};

/* trigonometric functions */
export class Trig extends Expr {
    type: string; // TODO(kevinb): Use a union type for this
    arg: Expr;
    exp?: Expr;

    constructor(type: string, arg: Expr) {
        super();
        this.type = type;
        this.arg = arg;
        this.hints = {
            ...this.hints,
            open: false,
        };
    }

    func = Trig;

    args() {
        return [this.type, this.arg];
    }

    // TODO(kevinb): Use union type for the function names.
    functions: Record<string, TrigFunc> = {
        sin: {
            eval: Math.sin,
            codegen: "Math.sin((",
            tex: "\\sin",
            expand: () => this,
        },
        cos: {
            eval: Math.cos,
            codegen: "Math.cos((",
            tex: "\\cos",
            expand: () => this,
        },
        tan: {
            eval: Math.tan,
            codegen: "Math.tan((",
            tex: "\\tan",
            expand: () =>
                Mul.handleDivide(Trig.sin(this.arg), Trig.cos(this.arg)),
        },
        csc: {
            eval: (arg: number) => {
                return 1 / Math.sin(arg);
            },
            codegen: "(1/Math.sin(",
            tex: "\\csc",
            expand: () => Mul.handleDivide(NumOne, Trig.sin(this.arg)),
        },
        sec: {
            eval: (arg: number) => {
                return 1 / Math.cos(arg);
            },
            codegen: "(1/Math.cos(",
            tex: "\\sec",
            expand: () => Mul.handleDivide(NumOne, Trig.cos(this.arg)),
        },
        cot: {
            eval: (arg: number) => {
                return 1 / Math.tan(arg);
            },
            codegen: "(1/Math.tan(",
            tex: "\\cot",
            expand: () =>
                Mul.handleDivide(Trig.cos(this.arg), Trig.sin(this.arg)),
        },
        arcsin: {
            eval: Math.asin,
            codegen: "Math.asin((",
            tex: "\\arcsin",
        },
        arccos: {
            eval: Math.acos,
            codegen: "Math.acos((",
            tex: "\\arccos",
        },
        arctan: {
            eval: Math.atan,
            codegen: "Math.atan((",
            tex: "\\arctan",
        },
        arccsc: {
            eval: (arg: number) => {
                return Math.asin(1 / arg);
            },
            codegen: "Math.asin(1/(",
            tex: "\\operatorname{arccsc}",
        },
        arcsec: {
            eval: (arg: number) => {
                return Math.acos(1 / arg);
            },
            codegen: "Math.acos(1/(",
            tex: "\\operatorname{arcsec}",
        },
        arccot: {
            eval: (arg: number) => {
                return Math.atan(1 / arg);
            },
            codegen: "Math.atan(1/(",
            tex: "\\operatorname{arccot}",
        },
        sinh: {
            eval: (arg: number) => {
                return (Math.exp(arg) - Math.exp(-arg)) / 2;
            },
            codegen: (argStr: string) => {
                return (
                    "((Math.exp(" +
                    argStr +
                    ") - Math.exp(-(" +
                    argStr +
                    "))) / 2)"
                );
            },
            tex: "\\sinh",
            expand: () => this,
        },
        cosh: {
            eval: (arg: number) => {
                return (Math.exp(arg) + Math.exp(-arg)) / 2;
            },
            codegen: (argStr: string) => {
                return (
                    "((Math.exp(" +
                    argStr +
                    ") + Math.exp(-(" +
                    argStr +
                    "))) / 2)"
                );
            },
            tex: "\\cosh",
            expand: () => this,
        },
        tanh: {
            eval: (arg: number) => {
                return (
                    (Math.exp(arg) - Math.exp(-arg)) /
                    (Math.exp(arg) + Math.exp(-arg))
                );
            },
            codegen: (argStr: string) => {
                return (
                    "(" +
                    "(Math.exp(" +
                    argStr +
                    ") - Math.exp(-(" +
                    argStr +
                    ")))" +
                    " / " +
                    "(Math.exp(" +
                    argStr +
                    ") + Math.exp(-(" +
                    argStr +
                    ")))" +
                    ")"
                );
            },
            tex: "\\tanh",
            expand: () =>
                Mul.handleDivide(Trig.sinh(this.arg), Trig.cosh(this.arg)),
        },
        csch: {
            eval: (arg: number) => {
                return 2 / (Math.exp(arg) - Math.exp(-arg));
            },
            codegen: (argStr: string) => {
                return (
                    "(2 / (Math.exp(" +
                    argStr +
                    ") - Math.exp(-(" +
                    argStr +
                    "))))"
                );
            },
            tex: "\\csch",
            expand: () => Mul.handleDivide(NumOne, Trig.sinh(this.arg)),
        },
        sech: {
            eval: (arg: number) => {
                return 2 / (Math.exp(arg) + Math.exp(-arg));
            },
            codegen: (argStr: string) => {
                return (
                    "(2 / (Math.exp(" +
                    argStr +
                    ") + Math.exp(-(" +
                    argStr +
                    "))))"
                );
            },
            tex: "\\sech",
            expand: () => Mul.handleDivide(NumOne, Trig.cosh(this.arg)),
        },
        coth: {
            eval: (arg: number) => {
                return (
                    (Math.exp(arg) + Math.exp(-arg)) /
                    (Math.exp(arg) - Math.exp(-arg))
                );
            },
            codegen: (argStr: string) => {
                return (
                    "(" +
                    "(Math.exp(" +
                    argStr +
                    ") + Math.exp(-(" +
                    argStr +
                    ")))" +
                    " / " +
                    "(Math.exp(" +
                    argStr +
                    ") - Math.exp(-(" +
                    argStr +
                    ")))" +
                    ")"
                );
            },
            tex: "\\coth",
            expand: () =>
                Mul.handleDivide(Trig.cosh(this.arg), Trig.sinh(this.arg)),
        },
    };

    isEven() {
        return _.contains(["cos", "sec"], this.type);
    }

    isInverse() {
        return this.type.indexOf("arc") === 0;
    }

    isBasic() {
        return _.contains(["sin", "cos"], this.type);
    }

    eval(vars: Vars = {}, options?: ParseOptions) {
        var func = this.functions[this.type].eval;
        var arg = this.arg.eval(vars, options);
        return func(arg);
    }

    codegen(): string {
        var func = this.functions[this.type].codegen;
        if (typeof func === "function") {
            return func(this.arg.codegen());
        } else if (typeof func === "string") {
            return func + this.arg.codegen() + "))";
        } else {
            throw new Error("codegen not implemented for " + this.type);
        }
    }

    print(): string {
        return this.type + "(" + this.arg.print() + ")";
    }

    tex(): string {
        var func = this.functions[this.type].tex;
        var arg = "(" + this.arg.tex() + ")";
        return func + arg;
    }

    texSplit(): [func: string, arg: string] {
        var func = this.functions[this.type].tex;
        var arg = "(" + this.arg.tex() + ")";
        return [func, arg];
    }

    isPositive() {
        var trig = this.collect();

        if (trig instanceof Trig && trig.arg instanceof Num) {
            return this.eval() > 0;
        } else {
            return false;
        }
    }

    completeParse(): Expr {
        if (this.exp) {
            var pow = new Pow(this, this.exp);
            this.exp = undefined;
            return pow;
        } else {
            return this;
        }
    }

    // TODO(alex): does every new node type need to redefine these?
    needsExplicitMul() {
        return false;
    }

    expand() {
        var trig = this.recurse("expand");
        if (!trig.isInverse()) {
            // e.g. tan(x) -> sin(x)/cos(x)
            // NOTE(kevinb): All non-inverse trig functions have an expand property.
            var expand = trig.functions[trig.type].expand!;
            return _.bind(expand, trig)();
        } else {
            return trig;
        }
    }

    collect(options?: Options): Expr {
        var trig = this.recurse("collect", options);
        if (!trig.isInverse() && trig.arg.isNegative()) {
            const arg =
                trig.arg instanceof Num
                    ? trig.arg.abs()
                    : Mul.handleDivide(trig.arg, NumNeg).collect(options);

            if (trig.isEven()) {
                // e.g. cos(-x) -> cos(x)
                return new Trig(trig.type, arg);
            } else {
                // e.g. sin(-x) -> -sin(x)
                return new Mul(NumNeg, new Trig(trig.type, arg));
            }
        } else {
            return trig;
        }
    }

    static create(pair, arg) {
        var type = pair[0];
        var exp = pair[1];

        if (exp && exp.equals(NumNeg)) {
            // e.g. sin^-1(x) -> arcsin(x)
            type = "arc" + type;
            exp = undefined;
        }

        var trig = new Trig(type, arg);
        if (!arg.hints.parens) {
            trig = trig.addHint("open");
        }

        if (exp) {
            trig.exp = exp;
        }

        return trig;
    }

    static sin(arg: Expr) {
        return new Trig("sin", arg);
    }

    static cos(arg: Expr) {
        return new Trig("cos", arg);
    }

    static sinh(arg: Expr) {
        return new Trig("sinh", arg);
    }

    static cosh(arg: Expr) {
        return new Trig("cosh", arg);
    }
}

export class Abs extends Expr {
    arg: Expr;

    constructor(arg: Expr) {
        super();
        this.arg = arg;
    }

    func = Abs;

    args() {
        return [this.arg];
    }

    eval(vars: Vars = {}, options?: ParseOptions) {
        return Math.abs(this.arg.eval(vars, options));
    }

    codegen(): string {
        return "Math.abs(" + this.arg.codegen() + ")";
    }

    print(): string {
        return "abs(" + this.arg.print() + ")";
    }

    tex(): string {
        return "\\left|" + this.arg.tex() + "\\right|";
    }

    collect(options): Expr {
        var abs = this.recurse("collect", options);

        if (abs.arg.isPositive()) {
            // e.g. |2^x| -> 2^x
            return abs.arg;
        } else if (abs.arg instanceof Num) {
            // e.g. |-2| -> 2
            return abs.arg.abs();
        } else if (abs.arg instanceof Mul) {
            // e.g. |-2*pi*x| -> 2*pi*|x|
            var terms = _.groupBy(abs.arg.terms, (term) => {
                if (term.isPositive()) {
                    return "positive";
                } else if (term instanceof Num) {
                    return "number";
                } else {
                    return "other";
                }
            });

            var positives = terms.positive.concat(
                _.invoke(terms.number, "abs"),
            );

            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (terms.other.length) {
                positives.push(new Abs(new Mul(terms.other).flatten()));
            }

            return new Mul(positives).flatten();
        } else {
            return abs;
        }
    }

    // this should definitely be behind a super-simplify flag
    expand(): Expr {
        var abs = this.recurse("expand");

        if (abs.arg instanceof Mul) {
            // e.g. |xyz| -> |x|*|y|*|z|
            var terms = _.map(abs.arg.terms, (term) => {
                return new Abs(term);
            });
            return new Mul(terms);
        } else {
            return abs;
        }
    }

    isPositive() {
        return true;
    }
}

/* equation */
export class Eq extends Expr {
    left: Expr;
    type: string; // TODO(kevinb): use an enum for this
    right: Expr;

    constructor(left: Expr, type: string, right: Expr) {
        super();
        this.left = left;
        this.type = type;
        this.right = right;
    }

    func = Eq;

    args() {
        return [this.left, this.type, this.right];
    }

    needsExplicitMul() {
        return false;
    }

    print(): string {
        return this.left.print() + this.type + this.right.print();
    }

    signs = {
        "=": " = ",
        "<": " < ",
        ">": " > ",
        "<>": " \\ne ",
        "<=": " \\le ",
        ">=": " \\ge ",
    };

    tex(): string {
        return this.left.tex() + this.signs[this.type] + this.right.tex();
    }

    normalize() {
        var eq = this.recurse("normalize");

        if (_.contains([">", ">="], eq.type)) {
            // inequalities should have the smaller side on the left
            return new Eq(eq.right, eq.type.replace(">", "<"), eq.left);
        } else {
            return eq;
        }
    }

    // convert this equation to an expression set to zero
    // the expression is normalized to a canonical form
    // e.g. y/2=x/4 -> y/2-x/4(=0) -> 2y-x(=0)
    // unless unfactored is specified, will then divide through
    asExpr(unfactored: boolean = false): Expr {
        var isZero = (expr: Expr) => {
            return expr instanceof Num && expr.isSimple() && expr.eval() === 0;
        };

        // first convert to a sequence of additive terms
        let terms: Expr[] = [];

        if (this.left instanceof Add) {
            terms = _.clone(this.left.terms);
        } else if (!isZero(this.left)) {
            terms = [this.left];
        }

        if (this.right instanceof Add) {
            terms = terms.concat(this.right.negate().terms);
        } else if (!isZero(this.right)) {
            terms.push(this.right.negate());
        }

        var isInequality = !this.isEquality();

        // Collect over each term individually to transform simple expressions
        // into numbers that might have denominators, taking into account
        // float precision. We have to be very careful to not introduce any
        // irrational floats before asExpr() returns, because by definition
        // they do not have exact denominators...
        terms = _.invoke(terms, "collect", {preciseFloats: true});

        // ...and we multiply through by every denominator.
        for (var i = 0; i < terms.length; i++) {
            var denominator = terms[i].getDenominator();

            // Can't multiply inequalities by non 100% positive factors
            if (isInequality && !denominator.isPositive()) {
                denominator = denominator.asPositiveFactor();
            }

            if (!denominator.equals(NumOne)) {
                terms = _.map(terms, (term) => {
                    return Mul.createOrAppend(term, denominator).simplify({
                        once: true,
                        preciseFloats: true,
                    });
                });
            }
        }

        var add = new Add(terms).flatten();
        return unfactored ? add : this.divideThrough(add);
    }

    // divide through by every common factor in the expression
    // e.g. 2y-4x(=0) -> y-2x(=0)
    // TODO(alex): Make it an option to only divide by variables/expressions
    // guaranteed to be nonzero
    divideThrough(expr: Expr) {
        const isInequality = !this.isEquality();

        const simplified = expr.simplify({once: true});
        const factored = simplified.factor({keepNegative: isInequality});

        if (!(factored instanceof Mul)) {
            return expr;
        }

        const terms = factored.terms;

        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        const hasVar = (term: Expr) => !!term.getVars().length;
        const isOne = (term: Expr) => term.equals(NumOne);

        const [adds, others] = partition(terms, isAdd);

        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (adds.length && this.isEquality()) {
            // keep only Adds
            // e.g. 2xy(z+1)(=0) -> z+1(=0)
            return new Mul(adds).flatten();
        }

        let denominator = others;

        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!adds.length) {
            // if no Adds, keep all variable terms to preserve meaning
            // e.g. 42xyz(=0) -> xyz(=0)
            denominator = _.reject(denominator, hasVar);
        }

        if (isInequality) {
            // can't divide inequalities by non 100% positive factors
            // e.g. 42x^2y(z+1)(=0) -> y(z+1)(=0)
            denominator = _.invoke(denominator, "asPositiveFactor");
        }

        // don't need to divide by one
        denominator = _.reject(denominator, isOne);

        denominator = _.map(denominator, (term) => {
            return new Pow(term, NumDiv);
        });

        const dividedResult = new Mul(terms.concat(denominator)).collect();

        // If the end result is the same as the original factoring,
        // rollback the factoring and discard all intermediate steps.
        if (dividedResult.equals(factored)) {
            return simplified;
        } else {
            return dividedResult;
        }
    }

    isEquality() {
        return _.contains(["=", "<>"], this.type);
    }

    compare(other: Eq) {
        // expression comparisons are handled by Expr.compare()
        if (!(other instanceof Eq)) {
            return false;
        }

        var eq1 = this.normalize();
        var eq2 = other.normalize();

        if (eq1.type !== eq2.type) {
            return false;
        }

        // need to collect to properly factor out common factors
        // e.g x+2x=6 -> 3x=6 -> 3x-6(=0) -> x-2(=0)
        var expr1 = eq1.divideThrough(
            eq1.asExpr(/* unfactored */ true).collect(),
        );
        var expr2 = eq2.divideThrough(
            eq2.asExpr(/* unfactored */ true).collect(),
        );

        if (eq1.isEquality()) {
            // equals and not-equals can be subtracted either way
            return (
                expr1.compare(expr2) || expr1.compare(Mul.handleNegative(expr2))
            );
        } else {
            return expr1.compare(expr2);
        }
    }

    // should only be done after compare() returns true to avoid false positives
    sameForm(other) {
        var eq1 = this.normalize();
        var eq2 = other.normalize();

        var same = eq1.left.sameForm(eq2.left) && eq1.right.sameForm(eq2.right);

        if (eq1.isEquality()) {
            // equals and not-equals can be commutative with respect to the sign
            return (
                same ||
                (eq1.left.sameForm(eq2.right) && eq1.right.sameForm(eq2.left))
            );
        } else {
            return same;
        }
    }

    // we don't want to override collect because it would turn y=x into y-x(=0)
    // instead, we ask if the equation was in that form, would it be simplified?
    isSimplified() {
        var expr = this.asExpr(/* unfactored */ true);
        var simplified = this.divideThrough(expr).simplify();
        return (
            expr.equals(simplified) &&
            this.left.isSimplified() &&
            this.right.isSimplified()
        );
    }

    // Assumptions: Expression is of the form a+bx, and we solve for x
    solveLinearEquationForVariable(variable) {
        var expr = this.asExpr();
        if (!(expr instanceof Add) || expr.terms.length !== 2) {
            throw new Error(
                "Can only handle linear equations of the form " +
                    "a + bx (= 0)",
            );
        }

        var hasVar = (term: Expr) => {
            return term.has(Var) && _.contains(term.getVars(), variable.symbol);
        };

        const termHasVar = hasVar(expr.terms[0]);
        const a = termHasVar
            ? Mul.handleNegative(expr.terms[1])
            : Mul.handleNegative(expr.terms[0]);
        const b = termHasVar
            ? Mul.handleDivide(expr.terms[0], variable)
            : Mul.handleDivide(expr.terms[1], variable);

        return Mul.handleDivide(a, b).simplify();
    }
}

/* abstract symbol node */
abstract class Sym extends Expr {
    needsExplicitMul() {
        return false;
    }

    findGCD(factor: Expr): Expr {
        if (factor instanceof Sym || factor instanceof Num) {
            return this.equals(factor) ? this : NumOne;
        } else {
            return factor.findGCD(this);
        }
    }
}

/* function variable */
export class Func extends Sym {
    symbol: string;
    arg: Expr;

    constructor(symbol: string, arg: Expr) {
        super();
        this.symbol = symbol;
        this.arg = arg;
    }

    func = Func;

    args() {
        return [this.symbol, this.arg];
    }

    print(): string {
        return this.symbol + "(" + this.arg.print() + ")";
    }

    tex(): string {
        return this.symbol + "(" + this.arg.tex() + ")";
    }

    eval(vars: Vars = {}, options?: ParseOptions) {
        var arg = this.arg;
        var func = vars[this.symbol];
        var newVars = _.extend(_.clone(vars), {
            x: arg.eval(vars, options),
        });
        var parsedFunc = parse(func, options);
        if (parsedFunc.parsed) {
            return parsedFunc.expr.eval(newVars, options);
        }
        // If parsedFunc isn't actually parsed, return its error
        return parsedFunc;
    }

    codegen(): string {
        return 'vars["' + this.symbol + '"](' + this.arg.codegen() + ")";
    }

    getUnits() {
        return this.arg.getUnits();
    }

    getVars(excludeFunc: boolean) {
        if (excludeFunc) {
            return this.arg.getVars();
        } else {
            return _.union(this.arg.getVars(), [this.symbol]).sort();
        }
    }

    getConsts() {
        return this.arg.getConsts();
    }
}

/* variable */
export class Var extends Sym {
    symbol: string;
    subscript?: Expr;

    constructor(symbol: string, subscript?: Expr) {
        super();
        this.symbol = symbol;
        this.subscript = subscript;
    }

    func = Var;

    args() {
        return [this.symbol, this.subscript];
    }

    exprArgs() {
        return [];
    }

    recurse() {
        return this;
    }

    print(): string {
        var sub = "";
        if (this.subscript) {
            sub = "_(" + this.subscript.print() + ")";
        }
        return this.symbol + sub;
    }

    // Provide a way to easily evalate expressions with the common case,
    // subscripts that consist of a single number or symbol e.g. x_a or x_42
    prettyPrint() {
        var sub = this.subscript;
        if (sub && (sub instanceof Num || sub instanceof Sym)) {
            return this.symbol + "_" + sub.print();
        } else {
            return this.print();
        }
    }

    tex(): string {
        var sub = "";
        if (this.subscript) {
            sub = "_{" + this.subscript.tex() + "}";
        }
        var prefix = this.symbol.length > 1 ? "\\" : "";
        return prefix + this.symbol + sub;
    }

    repr() {
        return "Var(" + this.print() + ")";
    }

    eval(vars: Vars = {}, options?: ParseOptions): number {
        // @ts-expect-error: values is Vars are strings, but here
        // we expect them to be numbers.  We should probably store
        // Var and Func entries separately in the Vars type so that
        // they can be typed correctly.
        return vars[this.prettyPrint()];
    }

    codegen(): string {
        return 'vars["' + this.prettyPrint() + '"]';
    }

    getVars() {
        return [this.prettyPrint()];
    }

    isPositive() {
        return false;
    }
}

/* constant */
export class Const extends Sym {
    symbol: string;

    constructor(symbol: string) {
        super();
        this.symbol = symbol;
    }

    func = Const;

    args() {
        return [this.symbol];
    }

    recurse() {
        return this;
    }

    eval(vars: Vars = {}, options?: ParseOptions): number {
        if (this.symbol === "pi") {
            return Math.PI;
        } else if (this.symbol === "e") {
            return Math.E;
        } else {
            // @ts-expect-error: should we throw an error here?
            return undefined;
        }
    }

    codegen(): string {
        if (this.symbol === "pi") {
            return "Math.PI";
        } else if (this.symbol === "e") {
            return "Math.E";
        } else {
            // @ts-expect-error: should we throw an error here?
            return undefined;
        }
    }

    print(): string {
        return this.symbol;
    }

    tex(): string {
        if (this.symbol === "pi") {
            return "\\pi ";
        } else if (this.symbol === "e") {
            return "e";
        } else {
            // @ts-expect-error: should we return this.symbol here?
            return undefined;
        }
    }

    isPositive() {
        return this.eval() > 0;
    }

    abs() {
        if (this.eval() > 0) {
            return this;
        } else {
            return Mul.handleNegative(this);
        }
    }

    getConsts() {
        return [this.print()];
    }

    static e = new Const("e");
    static pi = new Const("pi");
}

/* abstract number node */
abstract class Num extends Expr {
    n: number = 0;

    constructor() {
        super();
        // hints for interpreting and rendering user input
        this.hints = {
            ...this.hints,
            negate: false,
            subtract: false,
            divide: false,
            root: false,
            fraction: false,
            entered: false,
        };
    }

    repr() {
        return this.print();
    }

    strip() {
        return this.abs();
    }

    recurse() {
        return this;
    }

    codegen(): string {
        return this.print();
    }

    // takes another Num and returns a new Num
    abstract add(other: Expr, options?: Options): Expr;

    abstract mul(other: Expr, options?: Options): Expr;

    // returns this Num's additive inverse
    abstract negate(): Expr;

    isSubtract(): boolean {
        return Boolean(this.hints.subtract);
    }

    // return the absolute value of the number
    abstract abs(): Num;

    needsExplicitMul(): boolean {
        return true;
    }

    abstract findGCD(factor: Expr): Expr;

    isPositive(): boolean {
        return this.eval() > 0;
    }

    isNegative(): boolean {
        return this.eval() < 0;
    }

    asPositiveFactor(): Num {
        return this.isPositive() ? this : this.abs();
    }

    // whether a number is considered simple (one term)
    // e.g. for reals, ints and floats are simple
    abstract isSimple(): boolean;

    // Based on http://stackoverflow.com/a/10454560/2571482
    getDecimalPlaces() {
        var match = ("" + this.n).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
        if (match) {
            return Math.max(
                0,
                // Number of digits right of decimal point
                (match[1] ? match[1].length : 0) -
                    // Adjust for scientific notation
                    (match[2] ? +match[2] : 0),
            );
        } else {
            return 0;
        }
    }

    abstract asRational(): Rational;

    static negativeOne(hint) {
        if (hint === "subtract") {
            return NumSub;
        } else if (hint === "divide") {
            return NumDiv;
        } else {
            return NumNeg;
        }
    }

    // find the greatest common denominator
    static findGCD(a, b) {
        var mod;

        a = Math.abs(a);
        b = Math.abs(b);

        // Euclid's method doesn't handle non-integers very well. For now
        // we just say we can't pull out a common factor. It might be
        // reasonable to do better than this in the future.
        if (a !== Math.floor(a) || b !== Math.floor(b)) {
            return 1;
        }

        while (b) {
            mod = a % b;
            a = b;
            b = mod;
        }

        return a;
    }

    static min(...args: Expr[]) {
        return _.min(args, (num) => num.eval());
    }

    static max(...args: Expr[]) {
        return _.max(args, (num) => num.eval());
    }
}

/* rational number (n: numerator, d: denominator) */
export class Rational extends Num {
    n: number;
    d: number;

    constructor(numerator: number, denominator: number) {
        super();
        var n = numerator;
        var d = denominator;
        if (d < 0) {
            n = -n;
            d = -d;
        }
        this.n = n;
        this.d = d;
    }

    func = Rational;

    args() {
        return [this.n, this.d];
    }

    eval() {
        return this.n / this.d;
    }

    print(): string {
        return this.n.toString() + "/" + this.d.toString();
    }

    tex(): string {
        var tex =
            "\\frac{" +
            Math.abs(this.n).toString() +
            "}{" +
            this.d.toString() +
            "}";
        return this.n < 0 ? "-" + tex : tex;
    }

    add(num: Num, options?: {preciseFloats: boolean}) {
        if (num instanceof Rational) {
            return new Rational(
                this.n * num.d + this.d * num.n,
                this.d * num.d,
            ).collect();
        } else {
            return num.add(this, options);
        }
    }

    mul(num: Num, options?: {preciseFloats: boolean}) {
        if (num instanceof Rational) {
            return new Rational(this.n * num.n, this.d * num.d).collect();
        } else {
            return num.mul(this, options);
        }
    }

    collect() {
        var gcd = Num.findGCD(this.n, this.d);

        var n = this.n / gcd;
        var d = this.d / gcd;

        if (d === 1) {
            return new Int(n);
        } else {
            return new Rational(n, d);
        }
    }

    negate() {
        return new Rational(-this.n, this.d);
    }

    abs() {
        return new Rational(Math.abs(this.n), this.d);
    }

    findGCD(factor: Expr): Expr {
        // Attempt to factor out common numerators and denominators to return
        // a Rational instead of a Float
        if (factor instanceof Rational) {
            // For more background, see
            // http://math.stackexchange.com/questions/151081/gcd-of-rationals
            var numerator = Num.findGCD(this.n * factor.d, factor.n * this.d);
            var denominator = this.d * factor.d;
            // Create the rational, then call .collect() to simplify it
            return new Rational(numerator, denominator).collect();
        } else if (factor instanceof Int) {
            return new Rational(Num.findGCD(this.n, factor.n), this.d);
        } else {
            return factor.findGCD(this);
        }
    }

    // for now, assuming that exp is a Num
    raiseToThe(exp: Expr) {
        if (exp instanceof Int) {
            var positive = exp.eval() > 0;
            var abs = exp.abs().eval();
            var n = Math.pow(this.n, abs);
            var d = Math.pow(this.d, abs);
            if (positive) {
                return new Rational(n, d).collect();
            } else {
                return new Rational(d, n).collect();
            }
        } else {
            return new Float(this.eval()).raiseToThe(exp);
        }
    }

    getDenominator() {
        return new Int(this.d);
    }

    isSimple(): boolean {
        return false;
    }

    asRational(): Rational {
        return this;
    }
}

/* integer (n: numerator/number) */
export class Int extends Rational {
    constructor(number: number) {
        super(number, 1);
    }

    func = Int;

    args() {
        return [this.n];
    }

    print(): string {
        return this.n.toString();
    }

    tex(): string {
        return this.n.toString();
    }

    negate() {
        return new Int(-this.n);
    }

    abs() {
        return new Int(Math.abs(this.n));
    }

    isSimple() {
        return true;
    }

    findGCD(factor: Expr): Expr {
        if (factor instanceof Int) {
            return new Int(Num.findGCD(this.n, factor.n));
        } else {
            return factor.findGCD(this);
        }
    }

    static create(n: number) {
        return new Int(n).addHint("entered");
    }
}

/* float (n: number) */
export class Float extends Num {
    n: number;

    constructor(number: number) {
        super();
        this.n = number;
    }

    func = Float;

    args() {
        return [this.n];
    }

    eval() {
        return this.n;
    }

    // TODO(alex): when we internationalize number parsing/display
    // we should make sure to use the appropriate decimal mark here
    print(): string {
        return this.n.toString();
    }

    tex(): string {
        return this.n.toString();
    }

    add(num: Num, options?: {preciseFloats: boolean}): Num {
        if (options && options.preciseFloats) {
            return Float.toDecimalPlaces(
                this.n + num.eval(),
                Math.max(this.getDecimalPlaces(), num.getDecimalPlaces()),
            );
        } else {
            return new Float(this.n + num.eval()).collect();
        }
    }

    mul(num: Num, options?: {preciseFloats: boolean}): Num {
        if (options && options.preciseFloats) {
            return Float.toDecimalPlaces(
                this.n * num.eval(),
                this.getDecimalPlaces() + num.getDecimalPlaces(),
            );
        } else {
            return new Float(this.n * num.eval()).collect();
        }
    }

    collect(options?: Options): Float {
        // We used to simplify Floats to Ints here whenever possible, but no
        // longer do so in order to preserve significant figures.
        return this;
    }

    negate(): Float {
        return new Float(-this.n);
    }

    abs() {
        return new Float(Math.abs(this.n));
    }

    findGCD(factor: Expr): Expr {
        if (factor instanceof Num) {
            return new Float(Num.findGCD(this.eval(), factor.eval())).collect();
        } else {
            return factor.findGCD(this);
        }
    }

    // for now, assuming that exp is a Num
    raiseToThe(exp: Expr, options?: {preciseFloats?: boolean}) {
        if (
            options &&
            options.preciseFloats &&
            exp instanceof Int &&
            exp.n > 1
        ) {
            return Float.toDecimalPlaces(
                new Pow(this, exp).eval(),
                this.getDecimalPlaces() * exp.n,
            );
        } else {
            return new Float(new Pow(this, exp).eval()).collect();
        }
    }

    // only to be used on non-repeating decimals (e.g. user-provided)
    asRational(): Rational {
        var parts = this.n.toString().split(".");
        if (parts.length === 1) {
            return new Rational(this.n, 1);
        } else {
            var numerator = Number(parts.join(""));
            var denominator = Math.pow(10, parts[1].length);
            return new Rational(numerator, denominator).collect();
        }
    }

    getDenominator() {
        return this.asRational().getDenominator();
    }

    isSimple() {
        return true;
    }

    static create(n) {
        return new Float(n).addHint("entered");
    }

    // Account for floating point imprecision by explicitly controlling the
    // number of decimal places in common operations (e.g. +, *, ^)
    static toDecimalPlaces(n, places) {
        return new Float(+n.toFixed(Math.min(places, 20))).collect();
    }
}

const NumNeg = new Int(-1).addHint("negate");
const NumSub = new Int(-1).addHint("subtract");
const NumDiv = new Int(-1).addHint("divide");

const NumSqrt = new Rational(1, 2).addHint("root");

const NumZero = new Int(0);
const NumOne = new Int(1);
const NumTen = new Int(10);

var parseError = function (str: string, hash) {
    // return int location of parsing error
    throw new Error(hash.loc.first_column);
};

// expose concrete nodes to parser scope
// see http://zaach.github.io/jison/docs/#sharing-scope
parser.yy = {
    Add: Add,
    Mul: Mul,
    Pow: Pow,
    Log: Log,
    Trig: Trig,
    Eq: Eq,
    Abs: Abs,
    Func: Func,
    Const: Const,
    Var: Var,
    Int: Int,
    Float: Float,
    parseError: parseError,

    constants: ["e"],
    symbolLexer: function (symbol) {
        if (_.contains(parser.yy.constants, symbol)) {
            return "CONST";
        } else if (_.contains(parser.yy.functions, symbol)) {
            return "FUNC";
        } else {
            return "VAR";
        }
    },
};

type ParseOptions = {
    functions?: ReadonlyArray<string>;
    decimal_separator?: string;
    divide_symbol?: string;
};

export const parse = function (input: string, options?: ParseOptions) {
    try {
        if (options && options.functions) {
            // reserve the symbol "i" for complex numbers
            parser.yy.functions = _.without(options.functions, "i");
        } else {
            parser.yy.functions = [];
        }

        // If ',' is the decimal dividor in your country, replace any ','s
        // with '.'s.
        // This isn't perfect, since the output will all still have '.'s.
        // TODO(jack): Fix the output to have ','s in this case
        if (options && options.decimal_separator) {
            input = input.split(options.decimal_separator).join(".");
        }

        // If ':' is the divide symbol in your country, replace any ':'s
        // with '/'s.
        if (options && options.divide_symbol) {
            input = input.split(options.divide_symbol).join("/");
        }

        var expr = parser.parse(input).completeParse();
        return {parsed: true, expr: expr};
    } catch (e) {
        return {parsed: false, error: (e as Error).message};
    }
};

/* unit */
export class Unit extends Sym {
    symbol: string;

    constructor(symbol: string) {
        super();
        this.symbol = symbol;
    }

    func = Unit;

    args() {
        return [this.symbol];
    }

    recurse() {
        return this;
    }

    eval(vars: Vars = {}, options?: ParseOptions) {
        // This is called when comparing units. A unit doesn't affect the
        // numerical value of its coefficient, so this needs to be 1.
        //
        // On the other hand, things must not evaluate to the same thing if
        // they don't have the same type. I believe that's also true - form is
        // checked before numerical equivalence. I do not know where, though.
        // However, there are a couple tests checking this.
        return 1;
    }

    getUnits() {
        return [{unit: this.symbol, pow: 1}];
    }

    codegen(): string {
        return "1";
    }

    print(): string {
        return this.symbol;
    }

    tex(): string {
        return this.symbol;
    }

    // Simplify units by replacing prefixes with multiplication
    collect(options?: Options) {
        if (_(baseUnits).has(this.symbol)) {
            return this;
        } else if (_(derivedUnits).has(this.symbol)) {
            return derivedUnits[this.symbol].conversion;
        } else {
            throw new Error("could not understand unit: " + this.symbol);
        }
    }
}

// If possible, replace unit prefixes with a multiplication.
//
// "g" -> Unit("g")
// "kg" -> 1000 * Unit("g")
var unprefixify = function (symbol: string) {
    if (_(baseUnits).has(symbol) || _(derivedUnits).has(symbol)) {
        return new Unit(symbol);
    }

    // check for prefix
    var prefix = _(_(siPrefixes).keys()).find((testPrefix) => {
        return new RegExp("^" + testPrefix).test(symbol);
    });

    if (prefix) {
        var base = symbol.replace(new RegExp("^" + prefix), "");

        // It's okay to be here if either:
        // * `base` is a base unit (the seven units listed in baseUnits)
        // * `base` is a derived unit which allows prefixes
        //
        // Otherwise, we're trying to parse a unit label which is not
        // allowed (mwk, mBTU, etc).
        if (
            _(baseUnits).has(base) ||
            (derivedUnits[base] && derivedUnits[base].prefixes === hasPrefixes)
        ) {
            return new Mul(siPrefixes[prefix], new Unit(base));
        } else {
            throw new Error(base + " does not allow prefixes");
        }
    } else {
        return new Unit(symbol);
    }
};

export const unitParse = function (input: string) {
    try {
        var parseResult = unitParser.parse(input);

        // parseResult looks like:
        // {
        //   magnitude: "5",
        //   unit: {
        //     num: [
        //       { name: "s", pow: 2 }
        //     ],
        //     denom: [
        //       { name: "kg", pow: 1 }
        //     ]
        //   }
        // }
        //
        // denom is optionally null

        const unitArray: Pow[] = [];

        _(parseResult.unit.num).each((unitSpec) => {
            unitArray.push(
                new Pow(unprefixify(unitSpec.name), new Int(unitSpec.pow)),
            );
        });

        _(parseResult.unit.denom).each((unitSpec) => {
            unitArray.push(
                new Pow(unprefixify(unitSpec.name), new Int(-1 * unitSpec.pow)),
            );
        });

        var unit = new Mul(unitArray).flatten();

        if (parseResult.type === "unitMagnitude") {
            // in the first case we have a magnitude coefficient as well as the
            // unit itself.
            var coefArray: Expr[] = [
                new Float(+parseResult.magnitude),
                ...unitArray,
            ];
            var expr = new Mul(coefArray);
            return {
                parsed: true,
                unit: unit,
                expr: expr,
                coefficient: parseResult.magnitude,
                type: parseResult.type,
            };
        } else {
            // in the second case it's just the unit with no magnitude.
            return {
                parsed: true,
                unit: unit,
                type: parseResult.type,
            };
        }
    } catch (e) {
        return {parsed: false, error: (e as Error).message};
    }
};

var baseUnits = {
    m: new Unit("m"),
    // Note: kg is the SI base unit but we use g for consistency
    g: new Unit("g"),
    s: new Unit("s"),
    A: new Unit("A"),
    K: new Unit("K"),
    mol: new Unit("mol"),
    cd: new Unit("cd"),
};

var siPrefixes = {
    a: new Pow(new Int(10), new Int(-18)),
    f: new Pow(new Int(10), new Int(-15)),
    p: new Pow(new Int(10), new Int(-12)),
    n: new Pow(new Int(10), new Int(-9)),
    u: new Pow(new Int(10), new Int(-6)),
    m: new Pow(new Int(10), new Int(-3)),
    c: new Pow(new Int(10), new Int(-2)),
    d: new Pow(new Int(10), new Int(-1)),
    da: new Int(10),
    h: new Pow(new Int(10), new Int(2)),
    k: new Pow(new Int(10), new Int(3)),
    M: new Pow(new Int(10), new Int(6)),
    G: new Pow(new Int(10), new Int(9)),
    T: new Pow(new Int(10), new Int(12)),
    P: new Pow(new Int(10), new Int(15)),
    E: new Pow(new Int(10), new Int(18)),
    // http://en.wikipedia.org/wiki/Metric_prefix#.22Hella.22_prefix_proposal
    hella: new Pow(new Int(10), new Int(27)),
};

// Use these two values to mark a unit as either SI-prefixable or not.
const hasPrefixes = "hasPrefixes";
const hasntPrefixes = "hasntPrefixes";

type Prefixes = typeof hasPrefixes | typeof hasntPrefixes;

const makeAlias = function (str: string, prefixes: Prefixes) {
    var splits = str.split("|");
    var coefficientStr = splits[0].trim();
    var unitsStr = splits[1].trim();

    var coefficient = NumOne;
    if (coefficientStr !== "") {
        coefficient = parse(coefficientStr).expr;
    }

    var numdenomStr = unitsStr.split("/");
    var numdenom: Expr[] = [coefficient];

    if (numdenomStr[0]) {
        numdenomStr[0]
            .split(" ")
            .filter((x) => x !== "")
            .forEach((x) => numdenom.push(new Unit(x)));
    }

    if (numdenomStr[1]) {
        numdenomStr[1]
            .split(" ")
            .filter((x) => x !== "")
            .forEach((x) => numdenom.push(new Pow(new Unit(x), NumDiv)));
    }

    return {
        conversion: new Mul(numdenom),
        prefixes: prefixes,
    };
};

// This is a mapping of derived units (or different names for a unit) to their
// definitions. For example, an inch is defined as 0.0254 m.
//
// Definitions don't need to be in terms of base units. For example, tsp is
// defined in terms of tbsp (which is defined in terms of cup -> gal -> L ->
// m^3). However, units must get simpler. I.e. there's no loop checking.
//
// makeAlias takes two parameters:
// * a string specifying the simplification to perform
//   - a required pipe separates the constant factor from the base units
//   - the constant factor is parsed by KAS
//   - the base units are in a simple format which disallows exponents and
//     requires multiplicands to be space-separated ("m m" rather than "m^2)
//     with an optional "/" separating numerator and denominator
//   - prefixes are not allowed to be used in the converted to units
//     (note that this restriction, the format of the string, and the choice to
//     use a string in the first place are made out of laziness to minimize
//     both typing and parsing)
// * a boolean specifying whether or not it's acceptable to use SI units
//
// Where possible, these units are taken from "The International System of
// Units (SI)" 8th edition (2006).
var derivedUnits = {
    // mass
    // The atomic mass unit / dalton.
    Da: makeAlias("1.6605388628 x 10^-24 | g", hasPrefixes),
    u: makeAlias("| Da", hasntPrefixes),

    // length
    meter: makeAlias("| m", hasntPrefixes),
    meters: makeAlias("| m", hasntPrefixes),
    in: makeAlias("254 / 10000 | m", hasntPrefixes),
    ft: makeAlias("3048  / 10000 | m", hasntPrefixes),
    yd: makeAlias("9144  / 10000 | m", hasntPrefixes),
    mi: makeAlias("1609344 / 1000 | m", hasntPrefixes),
    ly: makeAlias("9.4607 x 10^15 | m", hasntPrefixes),
    nmi: makeAlias("1852 | m", hasntPrefixes),
    Å: makeAlias("10^-10 | m", hasntPrefixes),
    pc: makeAlias("3.0857 x 10^16 | m", hasntPrefixes),

    // time
    min: makeAlias("60 | s", hasntPrefixes),
    hr: makeAlias("3600 | s", hasntPrefixes),
    sec: makeAlias("| s", hasntPrefixes),
    // TODO(joel) make day work
    day: makeAlias("86400 | s", hasntPrefixes),
    wk: makeAlias("604800 | s", hasntPrefixes),
    fortnight: makeAlias("14 | day", hasntPrefixes),
    shake: makeAlias("10^-8 | s", hasntPrefixes),
    olympiad: makeAlias("126200000 | s", hasntPrefixes),

    // temperature
    "°C": makeAlias("1 | K", hasntPrefixes),
    "°F": makeAlias("5/9 | K", hasntPrefixes),
    "°R": makeAlias("5/9 | K", hasntPrefixes),

    // electric charge
    e: makeAlias("1.6021765314 x 10^-19 | C", hasntPrefixes),

    // speed
    c: makeAlias("299792458 | m / s", hasntPrefixes),
    kn: makeAlias("514/1000 | m / s", hasntPrefixes),
    kt: makeAlias("| kn", hasntPrefixes),
    knot: makeAlias("| kn", hasntPrefixes),

    // energy
    J: makeAlias("| N m", hasPrefixes),
    BTU: makeAlias("1060 | J", hasntPrefixes),
    cal: makeAlias("4184 / 1000 | J", hasPrefixes),
    eV: makeAlias("1.602176514 x 10^-19 | J", hasPrefixes),
    erg: makeAlias("10^−7 | J", hasPrefixes),

    // power
    W: makeAlias("| J / s", hasPrefixes),
    "H-e": makeAlias("80 | W", hasntPrefixes),

    // force
    N: makeAlias("1000 | g m / s s", hasPrefixes),
    // "lb": makeAlias("4448 / 1000 | N", hasntPrefixes),
    // 4.4482216152605
    lb: makeAlias("4448221615 / 1000000000 | N", hasntPrefixes),
    dyn: makeAlias("10^-5 | N", hasntPrefixes),

    // pressure
    Pa: makeAlias("1 | N / m m m", hasPrefixes),
    bar: makeAlias("10^5 | Pa", hasPrefixes),
    "㏔": makeAlias("1/1000 | bar", hasntPrefixes),
    "㍴": makeAlias("| bar", hasntPrefixes),
    atm: makeAlias("101325 | Pa", hasntPrefixes),
    Torr: makeAlias("1/760 | atm", hasntPrefixes),
    mmHg: makeAlias("| Torr", hasntPrefixes),

    // area
    ha: makeAlias("10^4 | m m", hasntPrefixes),
    b: makeAlias("10^−28 | m m", hasPrefixes),
    barn: makeAlias("| b", hasPrefixes),
    acre: makeAlias("4046.87 | m m", hasntPrefixes),
    skilodge: makeAlias("10^-31 | m m", hasntPrefixes),
    outhouse: makeAlias("10^-34 | m m", hasntPrefixes),
    shed: makeAlias("10^-52 | m m", hasntPrefixes),

    // volume
    L: makeAlias("1/1000 | m m m", hasPrefixes),
    gal: makeAlias("3785/1000 | L", hasPrefixes),
    cup: makeAlias("1/16 | gal", hasntPrefixes),
    qt: makeAlias("1/4 | gal", hasntPrefixes),
    quart: makeAlias("| qt", hasntPrefixes),
    p: makeAlias("1/8 | gal", hasntPrefixes),
    pt: makeAlias("| p", hasntPrefixes),
    pint: makeAlias("| p", hasntPrefixes),
    "fl oz": makeAlias("1/8 | cup", hasntPrefixes),
    "fl. oz.": makeAlias("1/8 | cup", hasntPrefixes),
    tbsp: makeAlias("1/16 | cup", hasntPrefixes),
    tsp: makeAlias("1/3 | tbsp", hasntPrefixes),

    // rotational
    // "rad":
    rev: makeAlias("2 pi | rad", hasntPrefixes),
    deg: makeAlias("180 pi | rad", hasntPrefixes),
    "°": makeAlias("| deg", hasntPrefixes),
    arcminute: makeAlias("1/60 | deg", hasntPrefixes),
    arcsec: makeAlias("1/3600 | deg", hasntPrefixes),

    // dimensionless
    // "B": makeAlias("10 | dB", hasntPrefixes), // XXX danger - logarithmic
    // "dB"
    // "nP"
    Hu: makeAlias("1000 | dB", hasPrefixes),
    dozen: makeAlias("12 |", hasntPrefixes),
    // XXX
    mol: makeAlias("6.0221412927 x 10^23 |", hasPrefixes),
    "%": makeAlias("1/100 |", hasntPrefixes),
    percent: makeAlias("| %", hasntPrefixes),
    ppm: makeAlias("1/1000000 |", hasntPrefixes),

    // electric / magnetic
    V: makeAlias("1000 | g m m / s s C", hasPrefixes),
    C: makeAlias("| A s", hasPrefixes),
    ampere: makeAlias("| A", hasntPrefixes),
    Ω: makeAlias("| V / A", hasPrefixes),
    ohm: makeAlias("| Ω", hasntPrefixes),
    F: makeAlias("| C / V", hasPrefixes),
    H: makeAlias("| ohm s", hasPrefixes),
    T: makeAlias("1000 | g / C s", hasPrefixes),
    Wb: makeAlias("1000 | g m m / C s", hasPrefixes),

    // photometry
    // TODO not sure this is right
    lm: makeAlias("pi x 10^4 | cd / m m", hasntPrefixes),
    lx: makeAlias("| lm / m m", hasntPrefixes),
    nit: makeAlias("| cd / m m", hasntPrefixes),
    sb: makeAlias("10^4 | cd / m m", hasntPrefixes),
    stilb: makeAlias("1 | sb", hasntPrefixes),
    apostilb: makeAlias("1 / pi x 10^(-4) | sb", hasntPrefixes),
    blondel: makeAlias("| apostilb", hasntPrefixes),
    asb: makeAlias("| apostilb", hasntPrefixes),
    la: makeAlias("| lm", hasntPrefixes),
    Lb: makeAlias("| lm", hasntPrefixes),
    sk: makeAlias("10^-7 | lm", hasntPrefixes),
    skot: makeAlias("| sk", hasntPrefixes),
    bril: makeAlias("10^-11 | lm", hasntPrefixes),

    // other
    Hz: makeAlias("| / s", hasPrefixes),
};

export const Zero = NumZero;
export const One = NumOne;
