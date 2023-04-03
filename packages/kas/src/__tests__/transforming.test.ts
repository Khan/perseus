import _ from "underscore";

import * as KAS from "../index";

expect.extend({
    toFactorAs(input: string, reference: string): jest.CustomMatcherResult {
        const actual = KAS.parse(input).expr.factor().normalize().repr();
        const expected = KAS.parse(reference).expr.normalize().repr();

        return actual === expected
            ? {pass: true, message: () => ""}
            : {pass: false, message: () => `${input} factors as ${reference}`};
    },
    toExpandAs(input: string, reference: string): jest.CustomMatcherResult {
        const actual = KAS.parse(input).expr.expand().normalize().print();
        const expected = KAS.parse(reference).expr.normalize().print();

        return actual === expected
            ? {pass: true, message: () => ""}
            : {pass: false, message: () => `${input} expands as ${reference}`};
    },
    toExpandAsRepr(input: string, reference: string): jest.CustomMatcherResult {
        const actual = KAS.parse(input).expr.expand().repr();

        return actual === reference
            ? {pass: true, message: () => ""}
            : {pass: false, message: () => `${input} expands as ${reference}`};
    },
    toExpandAsTex(input: string, reference: string): jest.CustomMatcherResult {
        const actual = KAS.parse(input).expr.expand().tex();

        return actual === reference
            ? {pass: true, message: () => ""}
            : {pass: false, message: () => `${input} expands as ${reference}`};
    },
    toCollectAs(input: string, reference: string): jest.CustomMatcherResult {
        const actual = KAS.parse(input).expr.collect().normalize().print();
        const expected = KAS.parse(reference)
            .expr.collect()
            .normalize()
            .print();

        return actual === expected
            ? {pass: true, message: () => ""}
            : {pass: false, message: () => `${input} collects as ${reference}`};
    },
    toCollectAsRepr(
        input: string,
        reference: string,
    ): jest.CustomMatcherResult {
        const actual = KAS.parse(input).expr.collect().repr();

        return actual === reference
            ? {pass: true, message: () => ""}
            : {pass: false, message: () => `${input} collects as ${reference}`};
    },
    toCollectAsTex(input: string, reference: string): jest.CustomMatcherResult {
        const actual = KAS.parse(input).expr.collect().tex();

        return actual === reference
            ? {pass: true, message: () => ""}
            : {pass: false, message: () => `${input} collects as ${reference}`};
    },
    toSimplifyAs(input: string, reference: string): jest.CustomMatcherResult {
        const actual = KAS.parse(input).expr.simplify().normalize().print();
        const expected = KAS.parse(reference).expr.normalize().print();

        return actual === expected
            ? {pass: true, message: () => ""}
            : {
                  pass: false,
                  message: () => `${input} simplifies as ${reference}`,
              };
    },
});

// TODO(FEI-5054): Figure out how to get global .d.ts files working with monorepos
declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace jest {
        interface Matchers<R> {
            toFactorAs(reference: string): R;
            toExpandAs(reference: string): R;
            toExpandAsRepr(reference: string): R;
            toExpandAsTex(reference: string): R;
            toCollectAs(reference: string): R;
            toCollectAsRepr(reference: string): R;
            toCollectAsTex(reference: string): R;
            toSimplifyAs(reference: string): R;
        }
    }
}

describe("transforming", () => {
    test("factoring Adds", () => {
        expect("2+2").toFactorAs("2(1+1)");
        expect("-2-2").toFactorAs("-2(1+1)");
        expect("2x+2").toFactorAs("2(x+1)");
        expect("x^3+x^2").toFactorAs("x^2(x+1)");
        expect("2x+xy").toFactorAs("x(2+y)");
        expect("2xy+xy^2").toFactorAs("xy(2+y)");
        expect("2+2/3").toFactorAs("2/3(3+1)"); // a little questionable, but 2/3 is what
        // wolframalpha returns for the gcd, so
        // we pull it out
        expect("2x+1.1").toFactorAs("2x+1.1");
    });

    test("factoring Muls", () => {
        expect("(2x+2)/(x+1)").toFactorAs("2 (x+1)/(x+1)");
        expect("(x+1)/(2x+2)").toFactorAs("1/2 (x+1)/(x+1)");
    });

    test("factoring Pows", () => {
        expect("x^y+x^(2y)").toFactorAs("x^y(1+x^y)");
        expect("x^y+x^z").toFactorAs("x^y+x^z");
    });

    test("distribute over multiplication", () => {
        expect("a(b+c)").toExpandAs("ab+ac");
        expect("a(b+c)").toExpandAsTex("ab+ac");
        expect("a(b+c)").toExpandAsRepr(
            "Add(Mul(Var(a),Var(b)),Mul(Var(a),Var(c)))",
        );

        expect("a(b-c)").toExpandAs("ab-ac");
        expect("a(b-c)").toExpandAsTex("ab-ac");
        expect("a(b-c)").toExpandAsRepr(
            "Add(Mul(Var(a),Var(b)),Mul(Var(a),-1,Var(c)))",
        );

        expect("a(b+c)d").toExpandAs("abd+acd");
        expect("a(b+c)d").toExpandAsRepr(
            "Add(Mul(Var(a),Var(d),Var(b)),Mul(Var(a),Var(d),Var(c)))",
        );

        expect("(a+b)(c+d)").toExpandAs("ac+ad+bc+bd");
        expect("(a+b)(c+d)ef").toExpandAs("acef+adef+bcef+bdef");
        expect("(a+b)c^d").toExpandAs("ac^d+bc^d");
        expect("ab(c+d)e^f").toExpandAs("abce^f+abde^f");

        expect("(a+b(c+d))e").toExpandAs("ae+bce+bde");
        expect("(a+b(c+d))e").toExpandAsRepr(
            "Add(Mul(Const(e),Var(a)),Mul(Const(e),Var(b),Var(c)),Mul(Const(e),Var(b),Var(d)))",
        );
    });

    test("distribute over rational expressions", () => {
        expect("(a+b)/(c+d)").toExpandAs("(a+b)/(c+d)");
        expect("(a+b)/(c+d)*a").toExpandAs("(aa+ab)/(c+d)");
        expect("(a+b)/(c+d)*1/e").toExpandAs("(a+b)/(ce+de)");
        expect("(a+b)/(c+d)*a/e").toExpandAs("(aa+ab)/(ce+de)");
    });

    test("expand exponentiation", () => {
        expect("(ab)^2").toExpandAs("a^2 b^2");
        expect("2*(ab)^2").toExpandAs("2 a^2 b^2");
        expect("(a+b)^2").toExpandAs("a^2+2ab+b^2");

        expect("(ab)^-2").toExpandAs("a^-2 b^-2");
        expect("2*(ab)^-2").toExpandAs("2 a^-2 b^-2");
        expect("(a+b)^-2").toExpandAs("(a^2+2ab+b^2)^-1");
    });

    test("expand absolute value", () => {
        expect("|a+b|").toExpandAs("|a+b|");
        expect("|ab|").toExpandAs("|a|*|b|");
    });

    test("expand logarithms", () => {
        expect("ln(xy)").toExpandAs("lnx+lny");
        expect("log_b(x)").toExpandAs("lnx/lnb");
        expect("log_b(xy)").toExpandAs("lnx/lnb+lny/lnb");
        expect("ln(xy/z)").toExpandAs("lnx+lny-lnz");

        expect("ln(x^y)").toExpandAs("ylnx");
        expect("log_b(x^y)").toExpandAs("ylnx/lnb");
        expect("ln(x^y^z)").toExpandAs("y^zlnx");

        expect("ln(x^y/z)").toExpandAs("ylnx-lnz");

        // ln((xy)^z) -> ln(x^z*y^z) -> z*ln(x)+z*ln(y)
        expect("ln((xy)^z)").toExpandAs("zlnx+zlny");

        expect("log_b(x)log_x(y)").toExpandAs("ln(x)/ln(b)*ln(y)/ln(x)");
        expect("log_b(x)log_x(y)log_y(z)").toExpandAs(
            "ln(x)/ln(b)*ln(y)/ln(x)*ln(z)/ln(y)",
        );
    });

    test("expand trig functions", () => {
        expect("sin(x)").toExpandAs("sin(x)");
        expect("cos(x)").toExpandAs("cos(x)");
        expect("tan(x)").toExpandAs("sin(x)/cos(x)");
        expect("csc(x)").toExpandAs("1/sin(x)");
        expect("sec(x)").toExpandAs("1/cos(x)");
        expect("cot(x)").toExpandAs("cos(x)/sin(x)");
    });

    test("expand hyperbolic functions", () => {
        expect("sinh(x)").toExpandAs("sinh(x)");
        expect("cosh(x)").toExpandAs("cosh(x)");
        expect("tanh(x)").toExpandAs("sinh(x)/cosh(x)");
        expect("csch(x)").toExpandAs("1/sinh(x)");
        expect("sech(x)").toExpandAs("1/cosh(x)");
        expect("coth(x)").toExpandAs("cosh(x)/sinh(x)");
    });

    test("collect over addition", () => {
        expect("").toCollectAs("0");
        expect("0").toCollectAs("0");
        expect("1+3").toCollectAs("4");
        expect("x+3").toCollectAs("3+x");
        expect("x+3x").toCollectAs("4x");
        expect("x+3x").toCollectAsRepr("Mul(4,Var(x))");
        expect("a+a+a").toCollectAs("3a");
        expect("a+a+a").toCollectAsRepr("Mul(3,Var(a))");
        expect("a+b+b+c").toCollectAs("a+2b+c");
        expect("a+b+b+c").toCollectAsRepr("Add(Var(a),Mul(2,Var(b)),Var(c))");
        expect("4x^2-x^2+8x+7-5x-4").toCollectAs("3+3x+3x^2");
    });

    test("collect over multiplication", () => {
        expect("5*7").toCollectAs("35");
        expect("5*7x+20x").toCollectAs("55x");
        expect("3x*xy+2yx^2").toCollectAs("5x^2y");
        expect("4/6").toCollectAs("2/3");
        expect("1/1").toCollectAs("1");
        expect("1/2+1/3").toCollectAs("5/6");
        expect("1/2+1/3+1").toCollectAs("11/6");
        expect("1.2+1/2").toCollectAs("1.7");
        expect("1/2-1/2").toCollectAs("0");
        expect("1/2-.5").toCollectAs("0");
    });

    test("collect over exponentiation", () => {
        expect("x^0").toCollectAs("1");
        expect("x^1").toCollectAs("x");
        expect("x^(log_x y)").toCollectAs("y");
        expect("(x^y)^z").toCollectAs("x^(yz)");
        expect("0^0").toCollectAs("1");
        expect("4^1.5").toCollectAs("8");
        expect("(2/3)^2").toCollectAs("4/9");
        expect("(2/3)^-2").toCollectAs("9/4");
    });

    test("collect over roots", () => {
        expect("sqrt(2)^2").toCollectAs("2");
        expect("sqrt[3]{3}^3").toCollectAs("3");
        expect("(2^(1/3))^3").toCollectAs("2");
    });

    test("collect over absolute value", () => {
        expect("|x|").toCollectAs("|x|");
        expect("|2|").toCollectAs("2");
        expect("|0|").toCollectAs("0");
        expect("|-2|").toCollectAs("2");
        expect("|pi|").toCollectAs("pi");
        expect("|2^x|").toCollectAs("2^x");
        expect("|x^2|").toCollectAs("x^2");
        expect("|-2pix^2y^3|").toCollectAs("2pix^2*|y^3|");
    });

    test("collect over logarithms", () => {
        expect("log(1)").toCollectAs("0");
        expect("log_x(x)").toCollectAs("1");
        expect("log_b(b^x)").toCollectAs("x");

        expect("b^(2*y*log_b x)").toCollectAs("x^(2y)");
        expect("b^(log_b a) b^(-log_b c)").toCollectAs("a/c");

        expect("ln(x)/ln(b)").toCollectAs("log_b(x)");
        expect("ln(x)/ln(b)*ln(y)/ln(x)").toCollectAs("log_b(y)");
        expect("ln(x)/ln(b)*ln(y)/ln(x)*ln(z)/ln(y)").toCollectAs("log_b(z)");
    });

    test("collect trig functions", () => {
        expect("sin(x)cos(x)").toCollectAs("sin(x)cos(x)");
        expect("sin(x)/cos(x)").toCollectAs("tan(x)");

        expect("sin^2(x)/cos^2(x)").toCollectAs("tan^2(x)");
        expect("cos^2(x)/sin^2(x)").toCollectAs("cot^2(x)");

        expect("sin^-2(x)/cos^-2(x)").toCollectAs("cot^2(x)");
        expect("cos^-2(x)/sin^-2(x)").toCollectAs("tan^2(x)");

        expect("sin^--2(x)/cos^--2(x)").toCollectAs("tan^2(x)");
        expect("cos^--2(x)/sin^--2(x)").toCollectAs("cot^2(x)");

        expect("sin^2(x)/cos(x)").toCollectAs("sin^2(x)/cos(x)");
        expect("sin(x)/cos^2(x)").toCollectAs("sin(x)/cos^2(x)");

        expect("sin(-x)").toCollectAs("-sin(x)");
        expect("cos(-x)").toCollectAs("cos(x)");
        expect("tan(-x)").toCollectAs("-tan(x)");
        expect("csc(-x)").toCollectAs("-csc(x)");
        expect("sec(-x)").toCollectAs("sec(x)");
        expect("cot(-x)").toCollectAs("-cot(x)");

        expect("sin(--x)").toCollectAs("sin(x)");
        expect("arcsin(-x)").toCollectAs("arcsin(-x)");

        expect("sin(-x)cos(-x)").toCollectAs("-sin(x)cos(x)");
        expect("sin(-x)/cos(-x)").toCollectAs("-tan(x)");
    });

    test("collect then output tex", () => {
        // user-friendly tex representation is not guaranteed after collect(assert, )
        expect("-x").toCollectAs("-1x");
        expect("-x").toCollectAsTex("-1x");
        expect("a-b").toCollectAs("a+-1b");
        expect("a-b").toCollectAsTex("a+-1b");
        expect("a/b").toCollectAs("ab^-1");
        expect("a/b").toCollectAsTex("ab^{-1}");
    });

    test("collect over an equation", () => {
        // collect does not try to collect across both sides of an equation
        expect("y+1-1=x*x").toCollectAs("y=x^(2)");
        expect("1+y=1+x^2").toCollectAs("1+y=1+x^(2)");
    });

    test("simplify", () => {
        expect("(a+b)^2").toSimplifyAs("(a+b)^2");
        expect("(a+b)(a+b)").toSimplifyAs("(a+b)^2");

        // (ab)^2 ->[factor]-> a^2 * b^2 ->[collect]-> a^2 * b^2
        // (no change during collect, therefore factoring is rolled back)
        expect("(ab)^2").toSimplifyAs("(ab)^2");

        // (3x)^2 ->[factor]-> 3^2 * x^2 ->[collect]-> 9x^2
        // (changed during collect, therefore factoring persists)
        expect("(3x)^2").toSimplifyAs("9x^2");

        expect("(2sqrt(2))^4").toSimplifyAs("64");
        expect("(3sqrt[3]{3})^9").toSimplifyAs("531441");

        // from "Simplifying expressions with exponents"
        expect("((nx^5)^5)").toSimplifyAs("n^5 x^25");
        expect("((nx^5)^5)/2").toSimplifyAs("1/2 n^5 x^25");
        expect("((nx^5)^5)/(n^-2x^2)^-3").toSimplifyAs("n^-1 x^31");

        expect("1/(xya)+1/(xyb)").toSimplifyAs("1/(xya)+1/(xyb)");

        // Simplify rationals correctly
        expect("2*(x+1/3)").toSimplifyAs("2*x+2/3");
        expect("-1*(1/3+x)").toSimplifyAs("-1*x+-1/3");
    });
});
