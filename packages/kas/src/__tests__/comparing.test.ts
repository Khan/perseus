import _ from "underscore";

import * as KAS from "../index";

expect.extend({
    toEqualExpr(input: string, expected: string): jest.CustomMatcherResult {
        const inputExpr = KAS.parse(input, {functions: ["f", "g", "h"]}).expr;
        const expectedExpr = KAS.parse(expected, {
            functions: ["f", "g", "h"],
        }).expr;

        const actual = KAS.compare(inputExpr, expectedExpr, {form: false});

        if (this.isNot) {
            return actual.equal
                ? {pass: true, message: () => ""}
                : {
                      pass: false,
                      message: () => `${input} is NOT the same as ${expected}`,
                  };
        }
        return actual.equal
            ? {pass: true, message: () => ""}
            : {
                  pass: false,
                  message: () => `${input} is the same as ${expected}`,
              };
    },
    toEqualExprAndForm(
        input: string,
        expected: string,
    ): jest.CustomMatcherResult {
        const inputExpr = KAS.parse(input, {functions: ["f", "g", "h"]}).expr;
        const expectedExpr = KAS.parse(expected, {
            functions: ["f", "g", "h"],
        }).expr;

        const actual = KAS.compare(inputExpr, expectedExpr, {form: true});

        if (this.isNot) {
            return actual.equal
                ? {pass: true, message: () => ""}
                : {
                      pass: false,
                      message: () => `${input} is NOT the same as ${expected}`,
                  };
        }
        return actual.equal
            ? {pass: true, message: () => ""}
            : {
                  pass: false,
                  message: () => `${input} is the same as ${expected}`,
              };
    },
});

// TODO(FEI-5054): Figure out how to get global .d.ts files working with monorepos
declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace jest {
        interface Matchers<R> {
            toEqualExpr(expected: string): R;
            toEqualExprAndForm(expected: string): R;
        }
    }
}

describe("comparing", () => {
    test("evaluate only", () => {
        expect("2+2").toEqualExpr("4");
        expect("a(b+c)").toEqualExpr("ab+ac");
        expect("a/b").toEqualExpr("a*b^-1");

        expect("1.2^2").toEqualExpr("1.44");
        expect("1.3^2").toEqualExpr("1.69");
        expect("1.4^2").toEqualExpr("1.96");
        expect("1.5^2").toEqualExpr("2.25");

        expect("1.2345^2").toEqualExpr("1.52399025");
        expect("1.2345*1.2345").toEqualExpr("1.52399025");
        expect("(1+.2345)^2").toEqualExpr("1.52399025");
        expect("(-5)^(1/3)").toEqualExpr("-1.709975946");
        expect("(-5)^(2/6)").toEqualExpr("-1.709975946");
        expect("(-5)^(4/3)").toEqualExpr("8.549879733");
        expect("(-5)^(-1/3)").toEqualExpr("-0.584803547");

        expect("(-5)^(1/5)").toEqualExpr("-1.379729661");
        expect("(-5)^(0.2)").toEqualExpr("-1.379729661");

        expect("x^(1/5)").toEqualExpr("x^(0.2)");
        expect("x^(8/5)").toEqualExpr("x^(1.6)");

        expect("(1-x)(-1-6x)").toEqualExpr("(6x+1)(x-1)");
        expect("y=x").not.toEqualExpr("x");
        expect("x").not.toEqualExpr("y=x");
        expect("y=x").toEqualExpr("y=x");
        expect("y=x").toEqualExpr("x=y");
        expect("y=x").toEqualExpr("-y=-x");
        expect("y=x").toEqualExpr("-x=-y");
        expect("y=x").not.toEqualExpr("y=-x");
        expect("y=x").not.toEqualExpr("-y=x");
        expect("y=x").not.toEqualExpr("y=/=x");
        expect("y<x").toEqualExpr("x>y");
        expect("y<=x").toEqualExpr("x>=y");
        expect("y>x").toEqualExpr("x<y");
        expect("y>x").not.toEqualExpr("x>y");
        expect("y>=x").toEqualExpr("x<=y");
        expect("a+b<c-d").toEqualExpr("a+b-c+d<0");

        expect("y=mx+b").toEqualExpr("-b-mx=-y");
        expect("y=mx+b").toEqualExpr("y-b=mx");

        // all of these normalize to the same expression, set to zero
        const forms = [
            "y=2x-5",
            "2x-5=y",
            "2x-y=5",
            "(y+5)/2=x",
            "(y+5)/x=2",
            "1/2(y+5)=x",
            ".5(y+5)=x",
            "y-3=2(x-4)",
            "2y=4x-10",
            "yz=2xz-5z",
        ];

        _.each(forms, (form) => {
            expect(forms[0]).toEqualExpr(form);
        });

        expect("3y=2x-15").toEqualExpr("3/2(y+5)=x");

        const forms2 = ["1/3p-3=114", "1/3p=117", "p=351", "p-351=0"];

        _.each(forms2, (form) => {
            expect(forms2[0]).toEqualExpr(form);
        });

        expect("x").toEqualExpr("xy/y");
        expect("e^x").toEqualExpr("e^x");
        expect("e^x").not.toEqualExpr("e^x + 1");

        const forms3 = [
            "x+x+x+6=12",
            "x+2x+6=12",
            "3x+6=12",
            "x+2x=6",
            "2x=6-x",
            "3x=6",
            "x=2",
        ];

        _.each(forms3, function (form) {
            expect(forms3[0]).toEqualExpr(form);
        });

        expect("100/55.6=t").toEqualExpr("t=100/55.6");
        expect("100/1.6^2=t").toEqualExpr("t=100/1.6^2");
        expect("7/3x+x=15").toEqualExpr("(2+1/3)x+x=15");
        expect("7/3x+x=15").not.toEqualExpr("(1+1/3)x+x=15");

        // Symmetric equations
        expect("x^2+y^2=r^2").toEqualExpr("r^2=x^2+y^2");
        expect("23^1.5=110.304").toEqualExpr("110.304=23^1.5");

        expect("6.12*10^-2").toEqualExpr("6.12*10^-2");
        expect("6.12*10^-2").not.toEqualExpr("6.12*10^-6");

        expect("3^-x").toEqualExpr("(1/3)^x");
        expect("(1/3)^-x").toEqualExpr("3^x");
        expect("(3)^-x").not.toEqualExpr("3^x");

        expect("5.6=x+0.4+5.2").toEqualExpr("5.6=x+0.4+5.2");

        // Reciprocal trig functions
        expect("csc x").toEqualExpr("1/sin x");
        expect("sec x").toEqualExpr("1/cos x");
        expect("cot x").toEqualExpr("1/tan x");
        expect("arccsc x").toEqualExpr("arcsin (1/x)");
        expect("arcsec x").toEqualExpr("arccos (1/x)");
        expect("arccot x").toEqualExpr("arctan (1/x)");

        // Reciprocal hyperbolic trig functions
        expect("csch x").toEqualExpr("1/sinh x");
        expect("sech x").toEqualExpr("1/cosh x");
        expect("coth x").toEqualExpr("1/tanh x");

        // Make sure trig functions that are the same for all integer values
        // are not the same
        expect("-2sin(pi x) + 4").not.toEqualExpr("4");
        expect("2sin(pi x) + 4").not.toEqualExpr("-2sin(pi x) + 4");
        expect("sin(pi x)").not.toEqualExpr("0");
        expect("0").not.toEqualExpr("sin(pi x)");
        expect("cos(pi x)").not.toEqualExpr("cos(2 pi x)");
        expect("sin(pi x)").not.toEqualExpr("sin(500pi x)");
        expect("sin(500pi x)").not.toEqualExpr("sin(pi x)");

        // Check that floating point error isn't killing us
        expect("0").toEqualExpr("sin(7pi)");
        expect("sin(7pi)").toEqualExpr("0");
        expect("0").toEqualExpr("sin(500pi)");
        expect("sin(500pi)").toEqualExpr("0");

        // Handle denominators the same way regardless of a fraction's format
        expect("x=1.2^2").toEqualExpr("x=1.44");
        expect("x=1.2^2").toEqualExpr("x=36/25");
        expect("x=1.44").toEqualExpr("x=36/25");
        expect("x=1.44").not.toEqualExpr("x=35/25");

        expect("x=1.2^(2y)").toEqualExpr("x=1.44^y");
        expect("x=1.2^(2y)").toEqualExpr("x=(36/25)^y");
        expect("x=1.44^y").toEqualExpr("x=(36/25)^y");

        expect("x=1.3^2").toEqualExpr("x=1.69");
        expect("x=1.4^2").toEqualExpr("x=1.96");
        expect("x=1.5^2").toEqualExpr("x=2.25");
        expect("x=1.5^2").toEqualExpr("x=2.25");

        expect("x=1.2345^2").toEqualExpr("x=1.52399025");
        expect("x=1.2345*1.2345").toEqualExpr("x=1.52399025");
        expect("x=(1+.2345)^2").toEqualExpr("x=1.52399025");
        expect("x=(1+.2345)^2").not.toEqualExpr("x=1.52399022");

        // Varying small and large comparisons
        expect("1.1234567891235 * 10^200").toEqualExpr(
            "1.1234567891234 * 10^200",
        );
        expect("1.1234567891235 * 10^200").not.toEqualExpr("0.10");
        expect("0.10").not.toEqualExpr("1.1234567891235 * 10^200");
        expect("0.50").not.toEqualExpr("0.51");
        expect("0.51").not.toEqualExpr("0.50");

        expect("1.00").toEqualExpr("1.00");
        expect("0.9").not.toEqualExpr("1.1");
        expect("1.1").not.toEqualExpr("0.9");

        // Real-world examples of equivalent equations that are now accepted
        expect("12(1-r)^2+58(1-r)=10").toEqualExpr("(1-r)(70-12r)=10");
        expect("720m+480(m-5)=42000").toEqualExpr("720m+480m-2400=42000");
        expect("2w+50/w=25").toEqualExpr("w(12.5-w)=25");
        expect("(n*(8+4n))/2>19206").toEqualExpr("6n+2n(n-1)>19206");

        // Correctly handle exponents with negative bases and variables in exponent
        expect("( 2)^n").not.toEqualExpr("( 2)^(n-1)");
        expect("( 2)^n").toEqualExpr("( 2)^(n)");
        expect("( 2)^n").not.toEqualExpr("( 2)^(n+1)");

        expect("(-2)^n").not.toEqualExpr("(-2)^(n-1)");
        expect("(-2)^n").toEqualExpr("(-2)^(n)");
        expect("(-2)^n").not.toEqualExpr("(-2)^(n+1)");

        expect("(-2)^(a)").not.toEqualExpr("(-2)^(ab)");
        expect("(-2)^(a)").not.toEqualExpr("(-2)^(a^b)");

        // This is incorrect, but accurately captures the current behavior
        // See comment in `Expr.compare()` for more details
        expect("(-2)^(n+0.1)").toEqualExpr("(-2)^(n+1.1)");

        // Regression test for a bug where fraction expressions with a
        // variable in the denominator would sometimes, randomly, compare
        // different when they should be equal.
        // See: https://khanacademy.atlassian.net/browse/LEMS-3413
        for (let i = 0; i < 50; i++) {
            expect("\\frac{1}{x - 2}").toEqualExpr("\\frac{-1}{2 - x}");
        }
    });

    test("simplify can't yet handle these", () => {
        expect("sin(x + 2pi)").toEqualExpr("sin(x)");
        expect("y = sin(x + 2pi)").toEqualExpr("y = sin(x)");
        expect("sin^2(x)+cos^2(x)").toEqualExpr("x/x");
        expect("y = sin^2(x)+cos^2(x)").toEqualExpr("y = x/x");
    });

    test("partially evaluating functions", () => {
        expect("f(x)").toEqualExpr("f(x)");
        expect("f(x)").not.toEqualExpr("g(x)");
        expect("f(g(x))").toEqualExpr("f(g(x))");
        expect("sin(f(3x-x))/cos(f(x+x))").toEqualExpr("tan(f(2x))");
        expect("f(x) = sin(x + 2pi)").toEqualExpr("f(x) = sin(x)");

        // NOTE(kevinb): This test is flaky, because Expr.prototype.compare
        // is non-deterministic.  When comparing expressions this normally
        // wouldn't be an issue because we could just evaluate the different
        // variables at different point and then check that the difference
        // between the expressions is always less than some very small number.
        // In this case though, we convert equations to expressions, e.g.
        // `f(x) = 1` is converted to `1-f(x)`, but because `f` is a function,
        // we can't evaluate it.  One possible solution to this would be
        // to isolate `f(x)` in each expression and then check that the
        // expressions that they're equal to are equal.  In this case that
        // would be `sin^2(x)+cos^2(x)` and `1`.
        // expect("f(x) = sin^2(x)+cos^2(x)").toEqualExpr("f(x) = 1");
        expect("f(x) = ln|x|+c").toEqualExpr("f(x)-ln|x|-c = 0");

        // LEMS-2777: we were having issues with functions calling integers
        // (as opposed to working with variables which always seemed to work)
        // which I believe was due to treating `f(7)` as a Rational
        // due to it not having a variable
        //
        // completely incorrect (previously considered correct erroneously)
        expect("f(5) = f(7) + 4").not.toEqualExpr("f(2) = f(3) + 4");
        // exactly correct
        expect("f(2) = f(3) + 4").toEqualExpr("f(2) = f(3) + 4");
        // partial reversal
        expect("f(2) = f(3) + 4").toEqualExpr("f(2) = 4 + f(3)");
        // full reversal
        expect("f(2) = f(3) + 4").toEqualExpr("f(3) + 4 = f(2)");
    });

    test("evaluating and comparing form", () => {
        expect("ab").toEqualExprAndForm("ba");
        expect("(ab)c").toEqualExprAndForm("(cb)a");

        const forms = [
            "(6x+1)(x-1)",
            "(1+6x)(x-1)",
            "(6x+1)(-1+x)",
            "(1+6x)(-1+x)",
            "(-6x-1)(-x+1)",
            "(-1-6x)(-x+1)",
            "(-6x-1)(1-x)",
            "(-1-6x)(1-x)",
            "(x-1)(6x+1)",
            "(x-1)(1+6x)",
            "(-1+x)(6x+1)",
            "(-1+x)(1+6x)",
            "(-x+1)(-6x-1)",
            "(-x+1)(-1-6x)",
            "(1-x)(-6x-1)",
            "(1-x)(-1-6x)",
            "-(6x+1)(1-x)",
            "-(-6x-1)(x-1)",
        ];

        _.each(forms, function (form) {
            expect(forms[0]).toEqualExprAndForm(form);
        });

        expect("(6x+1)(x+1)").not.toEqualExprAndForm("(6x+1)(x-1)");
        expect("a-b-c").not.toEqualExprAndForm("c+b+a");

        expect("(6x+1)(x+1)").not.toEqualExprAndForm("(6x+1)(x-1)");
        expect("a-b-c").not.toEqualExprAndForm("c+b+a");
        expect("mx+b").toEqualExprAndForm("b+mx");

        expect("y=mx+b").toEqualExprAndForm("-b-mx=-y");
        expect("y=mx+b").not.toEqualExprAndForm("y-b=mx");

        expect("y-3=2(x-4)").not.toEqualExprAndForm("y=2x-5");
        expect("y-3=2(x-4)").not.toEqualExprAndForm("2x-y=5");
        expect("y=2x-5").not.toEqualExprAndForm("2x-y=5");
    });
});

describe("comparing with extraKeys", () => {
    it("does not return wrongVariableNames when the extra variable is in extraKeys", () => {
        // Correct answer is 8, student enters 8d, d is a known extraKey
        const student = KAS.parse("8d").expr;
        const correct = KAS.parse("8").expr;

        const result = KAS.compare(student, correct, {extraKeys: ["d"]});

        expect(result.wrongVariableNames).toBeFalsy();
        expect(result.equal).toBe(false);
    });

    it("returns wrongVariableNames when the variable is not in extraKeys", () => {
        const student = KAS.parse("8d").expr;
        const correct = KAS.parse("8").expr;

        const result = KAS.compare(student, correct, {extraKeys: []});

        expect(result.wrongVariableNames).toBe(true);
    });

    it("returns wrongVariableCase for a case mismatch when the variable is not in extraKeys", () => {
        const student = KAS.parse("8X").expr;
        const correct = KAS.parse("8x").expr;

        const result = KAS.compare(student, correct, {extraKeys: ["x"]});

        expect(result.wrongVariableCase).toBe(true);
    });

    it("returns wrongVariableNames when there's both a case mismatch and a variable that is not in extraKeys", () => {
        const student = KAS.parse("8Xd").expr;
        const correct = KAS.parse("8x").expr;

        const result = KAS.compare(student, correct, {extraKeys: ["x"]});

        expect(result.wrongVariableNames).toBe(true);
    });
});
