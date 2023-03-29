import _ from "underscore";

import * as KAS from "../index";

expect.extend({
    toParseAs(
        input: string,
        expected: string,
        options?: any,
    ): jest.CustomMatcherResult {
        const actual = KAS.parse(input, options).expr.print();

        if (actual !== expected) {
            return {
                pass: false,
                message: () => `${input} parses as ${expected}`,
            };
        }

        return {
            pass: !this.isNot,
            message: () => "",
        };
    },
    toParseWithStructure(
        input: string,
        expected: string,
        options?: any,
    ): jest.CustomMatcherResult {
        const actual = KAS.parse(input, options).expr.repr();

        if (actual !== expected) {
            return {
                pass: false,
                message: () => `${input} parses as ${expected}`,
            };
        }

        return {
            pass: !this.isNot,
            message: () => "",
        };
    },
});

// TODO(FEI-5054): Figure out how to get global .d.ts files working with monorepos
declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace jest {
        interface Matchers<R> {
            toParseAs(expected: string, options?: any): R;
            toParseWithStructure(expected: string, options?: any): R;
        }
    }
}

describe("parsing", () => {
    test("empty", () => {
        expect("").toParseAs("");
    });

    test("positive and negative primitives", () => {
        expect("0").toParseAs("0");
        expect("1.").toParseAs("1");
        expect("3.14").toParseAs("3.14");
        expect(".14").toParseAs("0.14");
        expect("pi").toParseAs("pi");
        expect("e").toParseAs("e");
        expect("x").toParseAs("x");
        expect("theta").toParseAs("theta");

        expect("-0").toParseAs("-1*0");
        expect("-1.").toParseAs("-1");
        expect("-3.14").toParseAs("-3.14");
        expect("-.14").toParseAs("-0.14");
        expect("-pi").toParseAs("-1*pi");
        expect("-e").toParseAs("-1*e");
        expect("-theta").toParseAs("-1*theta");
    });

    test("LaTeX constants", () => {
        expect("\\theta").toParseAs("theta");
        expect("\\pi").toParseAs("pi");
        expect("\\phi").toParseAs("phi");
    });

    test("ignore TeX spaces", () => {
        expect("a\\space b").toParseAs("a*b");
        expect("a\\ b").toParseAs("a*b");
    });

    test("positive and negative rationals", () => {
        expect("1/2").toParseAs("1/2");
        expect("-1/2").toParseAs("-1/2");
        expect("1/-2").toParseAs("-1/2");
        expect("-1/-2").toParseAs("-1*-1/2");
        expect("42/42").toParseAs("42/42");
        expect("42/1").toParseAs("42/1");
        expect("0/42").toParseAs("0/42");

        expect("2 (1/2)").toParseAs("2*1/2");
        expect("1/2 1/2").toParseAs("1/2*1/2");
        expect("-1/2").toParseAs("-1/2");
        expect("1/2 2").toParseAs("1/2*2");
    });

    test("rationals using \\frac", () => {
        expect("\\frac{1}{2}").toParseAs("1/2");
        expect("\\frac{-1}{2}").toParseAs("-1/2");
        expect("\\frac{1}{-2}").toParseAs("-1/2");
        expect("\\frac{-1}{-2}").toParseAs("-1*-1/2");
        expect("\\frac{42}{42}").toParseAs("42/42");
        expect("\\frac{42}{1}").toParseAs("42/1");
        expect("\\frac{0}{42}").toParseAs("0/42");

        expect("2\\frac{1}{2}").toParseAs("2*1/2");
        expect("\\frac{1}{2}\\frac{1}{2}").toParseAs("1/2*1/2");
        expect("-\\frac{1}{2}").toParseAs("-1/2");
        expect("\\frac{1}{2}2").toParseAs("1/2*2");
    });

    test("rationals using \\dfrac", () => {
        expect("\\dfrac{1}{2}").toParseAs("1/2");
        expect("\\dfrac{-1}{2}").toParseAs("-1/2");
        expect("\\dfrac{1}{-2}").toParseAs("-1/2");
        expect("\\dfrac{-1}{-2}").toParseAs("-1*-1/2");
        expect("\\dfrac{42}{42}").toParseAs("42/42");
        expect("\\dfrac{42}{1}").toParseAs("42/1");
        expect("\\dfrac{0}{42}").toParseAs("0/42");

        expect("2\\dfrac{1}{2}").toParseAs("2*1/2");
        expect("\\dfrac{1}{2}\\dfrac{1}{2}").toParseAs("1/2*1/2");
        expect("-\\dfrac{1}{2}").toParseAs("-1/2");
        expect("\\dfrac{1}{2}2").toParseAs("1/2*2");
    });

    test("parens", () => {
        expect("(0)").toParseAs("0");
        expect("(ab)").toParseAs("a*b");
        expect("(a/b)").toParseAs("a*b^(-1)");
        expect("(a^b)").toParseAs("a^(b)");
        expect("(ab)c").toParseAs("a*b*c");
        expect("a(bc)").toParseAs("a*b*c");
        expect("a+(b+c)").toParseAs("a+b+c");
        expect("(a+b)+c").toParseAs("a+b+c");
        expect("a(b+c)").toParseAs("a*(b+c)");
        expect("(a+b)^c").toParseAs("(a+b)^(c)");
        expect("(ab)^c").toParseAs("(a*b)^(c)");
    });

    test("subscripts", () => {
        expect("a").toParseAs("a");
        expect("a_0").toParseAs("a_(0)");
        expect("a_i").toParseAs("a_(i)");
        expect("a_n").toParseAs("a_(n)");
        expect("a_n+1").toParseAs("a_(n)+1");
        expect("a_(n+1)").toParseAs("a_(n+1)");
        expect("a_{n+1}").toParseAs("a_(n+1)");
    });

    test("negation", () => {
        expect("-x").toParseAs("-1*x");
        expect("--x").toParseAs("-1*-1*x");
        expect("---x").toParseAs("-1*-1*-1*x");
        expect("-1").toParseAs("-1");
        expect("--1").toParseAs("-1*-1");
        expect("---1").toParseAs("-1*-1*-1");
        expect("-3x").toParseAs("-3*x");
        expect("--3x").toParseAs("-1*-3*x");
        expect("-x*3").toParseAs("x*-3");
        expect("--x*3").toParseAs("-1*x*-3");
        expect("\u2212x").toParseAs("-1*x");
    });

    test("addition and subtraction", () => {
        expect("a+b").toParseAs("a+b");
        expect("a-b").toParseAs("a+-1*b");
        expect("a--b").toParseAs("a+-1*-1*b");
        expect("a---b").toParseAs("a+-1*-1*-1*b");
        expect("2-4").toParseAs("2+-4");
        expect("2--4").toParseAs("2+-1*-4");
        expect("2---4").toParseAs("2+-1*-1*-4");
        expect("2-x*4").toParseAs("2+x*-4");
        expect("1-2+a-b+pi-e").toParseAs("1+-2+a+-1*b+pi+-1*e");
        expect("x+1").toParseAs("x+1");
        expect("x-1").toParseAs("x+-1");
        expect("(x-1)").toParseAs("x+-1");
        expect("a(x-1)").toParseAs("a*(x+-1)");
        expect("a\u2212b").toParseAs("a+-1*b");
    });

    test("multiplication", () => {
        expect("a*b").toParseAs("a*b");
        expect("-a*b").toParseAs("-1*a*b");
        expect("a*-b").toParseAs("a*-1*b");
        expect("-ab").toParseAs("-1*a*b");
        expect("-a*b").toParseAs("-1*a*b");
        expect("-(ab)").toParseAs("-1*a*b");
        expect("a\u00b7b").toParseAs("a*b");
        expect("a\u00d7b").toParseAs("a*b");
        expect("a\\cdotb").toParseAs("a*b");
        expect("a\\timesb").toParseAs("a*b");
        expect("a\\astb").toParseAs("a*b");
    });

    test("division", () => {
        expect("a/b").toParseAs("a*b^(-1)");
        expect("a/bc").toParseAs("a*b^(-1)*c");
        expect("(ab)/c").toParseAs("a*b*c^(-1)");
        expect("ab/c").toParseAs("a*b*c^(-1)");
        expect("ab/cd").toParseAs("a*b*c^(-1)*d");
        expect("a\\divb").toParseAs("a*b^(-1)");
        expect("a\u00F7b").toParseAs("a*b^(-1)");
    });

    test("exponentiation", () => {
        expect("x^y").toParseAs("x^(y)");
        expect("x^y^z").toParseAs("x^(y^(z))");
        expect("x^yz").toParseAs("x^(y)*z");
        expect("-x^2").toParseAs("-1*x^(2)");
        expect("-(x^2)").toParseAs("-1*x^(2)");
        expect("0-x^2").toParseAs("0+-1*x^(2)");
        expect("x^-y").toParseAs("x^(-1*y)");
        expect("x^(-y)").toParseAs("x^(-1*y)");
        expect("x^-(y)").toParseAs("x^(-1*y)");
        expect("x^-(-y)").toParseAs("x^(-1*-1*y)");
        expect("x^--y").toParseAs("x^(-1*-1*y)");
        expect("x^-yz").toParseAs("x^(-1*y)*z");
        expect("x^-y^z").toParseAs("x^(-1*y^(z))");
        expect("x**y").toParseAs("x^(y)");

        expect("x^{a}").toParseAs("x^(a)");
        expect("x^{ab}").toParseAs("x^(a*b)");
    });

    test("square root", () => {
        expect("sqrt(x)").toParseAs("x^(1/2)");
        expect("sqrt(x)y").toParseAs("x^(1/2)*y");
        expect("1/sqrt(x)").toParseAs("x^(-1/2)");
        expect("1/sqrt(x)y").toParseAs("x^(-1/2)*y");

        expect("sqrt(2)/2").toParseAs("2^(1/2)*1/2");
        expect("sqrt(2)^2").toParseAs("(2^(1/2))^(2)");

        expect("\\sqrt(x)").toParseAs("x^(1/2)");
        expect("\\sqrt(x)y").toParseAs("x^(1/2)*y");
        expect("1/\\sqrt(x)").toParseAs("x^(-1/2)");
        expect("1/\\sqrt(x)y").toParseAs("x^(-1/2)*y");

        expect("\\sqrt(2)/2").toParseAs("2^(1/2)*1/2");
        expect("\\sqrt(2)^2").toParseAs("(2^(1/2))^(2)");

        expect("\\sqrt{2}").toParseAs("2^(1/2)");
        expect("\\sqrt{2+2}").toParseAs("(2+2)^(1/2)");
    });

    test("nth root", () => {
        expect("sqrt[3]{x}").toParseAs("x^(1/3)");
        expect("sqrt[4]{x}y").toParseAs("x^(1/4)*y");
        expect("1/sqrt[5]{x}").toParseAs("x^(-1/5)");
        expect("1/sqrt[7]{x}y").toParseAs("x^(-1/7)*y");

        expect("sqrt[3]{2}/2").toParseAs("2^(1/3)*1/2");
        expect("sqrt[3]{2}^2").toParseAs("(2^(1/3))^(2)");

        expect("\\sqrt[4]{x}").toParseAs("x^(1/4)");
        expect("\\sqrt[4]{x}y").toParseAs("x^(1/4)*y");
        expect("1/\\sqrt[4]{x}").toParseAs("x^(-1/4)");
        expect("1/\\sqrt[4]{x}y").toParseAs("x^(-1/4)*y");

        expect("\\sqrt[5]{2}/2").toParseAs("2^(1/5)*1/2");
        expect("\\sqrt[5]{2}^2").toParseAs("(2^(1/5))^(2)");

        expect("\\sqrt[6]{2}").toParseAs("2^(1/6)");
        expect("\\sqrt[6]{2+2}").toParseAs("(2+2)^(1/6)");

        expect("\\sqrt[2]{2}").toParseAs("2^(1/2)");
        expect("\\sqrt[2]{2+2}").toParseAs("(2+2)^(1/2)");
    });

    test("absolute value", () => {
        expect("abs(x)").toParseAs("abs(x)");
        expect("abs(abs(x))").toParseAs("abs(abs(x))");
        expect("abs(x)abs(y)").toParseAs("abs(x)*abs(y)");

        expect("|x|").toParseAs("abs(x)");
        expect("||x||").toParseAs("abs(abs(x))");
        // TODO(alex): fix the below so it doesn't require an *
        // may require own lexer/preprocessor
        expect("|x|*|y|").toParseAs("abs(x)*abs(y)");

        expect("\\abs(x)").toParseAs("abs(x)");
        expect("\\abs(\\abs(x))").toParseAs("abs(abs(x))");
        expect("\\abs(x)\\abs(y)").toParseAs("abs(x)*abs(y)");

        expect("\\left|x\\right|").toParseAs("abs(x)");
        expect("\\left|\\left|x\\right|\\right|").toParseAs("abs(abs(x))");
        expect("\\left|x\\right|\\left|y\\right|").toParseAs("abs(x)*abs(y)");
    });

    test("logarithms", () => {
        expect("lnx").toParseAs("ln(x)");
        expect("ln x").toParseAs("ln(x)");
        expect("ln x^y").toParseAs("ln(x^(y))");
        expect("ln xy").toParseAs("ln(x*y)");
        expect("ln x/y").toParseAs("ln(x*y^(-1))");
        expect("ln x+y").toParseAs("ln(x)+y");
        expect("ln x-y").toParseAs("ln(x)+-1*y");

        expect("ln xyz").toParseAs("ln(x*y*z)");
        expect("ln xy/z").toParseAs("ln(x*y*z^(-1))");
        expect("ln xy/z+1").toParseAs("ln(x*y*z^(-1))+1");

        expect("ln x(y)").toParseAs("ln(x)*y");

        expect("logx").toParseAs("log_(10) (x)");
        expect("log x").toParseAs("log_(10) (x)");
        expect("log_2x").toParseAs("log_(2) (x)");
        expect("log _ 2 x").toParseAs("log_(2) (x)");
        expect("log_bx_0").toParseAs("log_(b) (x_(0))");
        expect("log_x_0b").toParseAs("log_(x_(0)) (b)");

        expect("log_2.5x").toParseAs("log_(2.5) (x)");

        expect("ln ln x").toParseAs("ln(ln(x))");
        expect("ln x ln y").toParseAs("ln(x)*ln(y)");
        expect("ln x/ln y").toParseAs("ln(x)*ln(y)^(-1)");

        expect("\\lnx").toParseAs("ln(x)");
        expect("\\ln x").toParseAs("ln(x)");
        expect("\\ln x^y").toParseAs("ln(x^(y))");
        expect("\\ln xy").toParseAs("ln(x*y)");
        expect("\\ln x/y").toParseAs("ln(x*y^(-1))");
        expect("\\ln x+y").toParseAs("ln(x)+y");
        expect("\\ln x-y").toParseAs("ln(x)+-1*y");

        expect("\\logx").toParseAs("log_(10) (x)");
        expect("\\log x").toParseAs("log_(10) (x)");
        expect("\\log_2x").toParseAs("log_(2) (x)");
        expect("\\log _ 2 x").toParseAs("log_(2) (x)");
        expect("\\log_bx_0").toParseAs("log_(b) (x_(0))");
        expect("\\log_x_0b").toParseAs("log_(x_(0)) (b)");

        expect("\\log_2.5x").toParseAs("log_(2.5) (x)");

        expect("\\frac{\\logx}{y}").toParseAs("log_(10) (x)*y^(-1)");
        expect("\\frac{\\log x}{y}").toParseAs("log_(10) (x)*y^(-1)");
    });

    test("trig functions", () => {
        const functions = ["sin", "cos", "tan", "csc", "sec", "cot"];

        const inverses = _.map(functions, function (func) {
            return "arc" + func;
        });

        _.each(functions.concat(inverses), function (func) {
            expect(func + "x").toParseAs(func + "(x)");
            expect("\\" + func + "x").toParseAs(func + "(x)");
        });

        expect("sin^-1 x").toParseAs("arcsin(x)");
        expect("\\sin^-1 x").toParseAs("arcsin(x)");

        expect("(sinx)^2").toParseAs("sin(x)^(2)");
        expect("sin^2x").toParseAs("sin(x)^(2)");
        expect("sin^2(x)").toParseAs("sin(x)^(2)");
        expect("sin^2 x").toParseAs("sin(x)^(2)");
        expect("(sin^2x)").toParseAs("sin(x)^(2)");

        expect("sin xy").toParseAs("sin(x*y)");
        expect("sin x(y)").toParseAs("sin(x)*y");
        expect("sin x/y").toParseAs("sin(x*y^(-1))");
        expect("(sin x)/y").toParseAs("sin(x)*y^(-1)");

        expect("sin sin x").toParseAs("sin(sin(x))");
        expect("sin x sin y").toParseAs("sin(x)*sin(y)");
        expect("sin x/sin y").toParseAs("sin(x)*sin(y)^(-1)");

        expect("1/(sinx)^2").toParseAs("sin(x)^(-2)");
        expect("1/sin^2x").toParseAs("sin(x)^(-2)");
        expect("1/sin^2(x)").toParseAs("sin(x)^(-2)");
        expect("1/(sin^2x)").toParseAs("sin(x)^(-2)");

        expect("sin(theta)").toParseAs("sin(theta)");
        expect("\\sin(\\theta)").toParseAs("sin(theta)");
    });

    test("hyperbolic functions", () => {
        expect("sinh xy").toParseAs("sinh(x*y)");
        expect("1/(sinhx)^2").toParseAs("sinh(x)^(-2)");
        expect("\\sinh(\\theta)").toParseAs("sinh(theta)");
    });

    test("formulas", () => {
        expect("mx+b").toParseAs("m*x+b");
        expect("v^2/r").toParseAs("v^(2)*r^(-1)");
        expect("4/3pir^3").toParseAs("4/3*pi*r^(3)");
        expect("4/3\u03C0r^3").toParseAs("4/3*pi*r^(3)");
        expect("sin^2 x + cos^2 x = 1").toParseAs("sin(x)^(2)+cos(x)^(2)=1");
    });

    test("factors", () => {
        expect("(6x+1)(x-1)").toParseAs("(6*x+1)*(x+-1)");
    });

    test("whitespace", () => {
        expect("12/3").toParseAs("12/3");
        expect("12 /3").toParseAs("12/3");
        expect("12/ 3").toParseAs("12/3");
        expect("xy").toParseAs("x*y");
        expect("x y").toParseAs("x*y");
    });

    test("equations", () => {
        expect("y=x").toParseAs("y=x");
        expect("y=x^2").toParseAs("y=x^(2)");
        expect("1<2").toParseAs("1<2");
        expect("1<=2").toParseAs("1<=2");
        expect("1\\le2").toParseAs("1<=2");
        expect("2>1").toParseAs("2>1");
        expect("2>=1").toParseAs("2>=1");
        expect("2\\ge1").toParseAs("2>=1");
        expect("1<>2").toParseAs("1<>2");
        expect("1=/=2").toParseAs("1<>2");
        expect("1\\ne2").toParseAs("1<>2");
        expect("1\\neq2").toParseAs("1<>2");
        expect("a\u2260b").toParseAs("a<>b");
        expect("a\u2264b").toParseAs("a<=b");
        expect("a\u2265b").toParseAs("a>=b");

        expect("y \\le x").toParseAs("y<=x");
        expect("y \\leq x").toParseAs("y<=x");
        expect("y \\ge x").toParseAs("y>=x");
        expect("y \\geq x").toParseAs("y>=x");
    });

    test("function variables", () => {
        expect("f(x)").toParseAs("f*x");
        expect("f(x)").toParseAs("f(x)", {functions: ["f"]});
        expect("f(x+y)").toParseAs("f(x+y)", {functions: ["f"]});
        expect("f(x)g(x)").toParseAs("f(x)*g(x)", {functions: ["f", "g"]});
        expect("f(g(h(x)))").toParseAs("f(g(h(x)))", {
            functions: ["f", "g", "h"],
        });

        expect("f\\left(x\\right)").toParseAs("f*x");
        expect("f\\left(x\\right)").toParseAs("f(x)", {functions: ["f"]});
        expect("f\\left(x+y\\right)").toParseAs("f(x+y)", {
            functions: ["f"],
        });
        expect("f\\left(x\\right)g\\left(x\\right)").toParseAs("f(x)*g(x)", {
            functions: ["f", "g"],
        });
        expect("f\\left(g\\left(h\\left(x\\right)\\right)\\right)").toParseAs(
            "f(g(h(x)))",
            {functions: ["f", "g", "h"]},
        );
    });

    test("structure", () => {
        expect("").toParseWithStructure("Add()");
        expect("1.").toParseWithStructure("1");
        expect("1/2").toParseWithStructure("1/2");
        expect("1/-2").toParseWithStructure("-1/2");
        expect("x/-2").toParseWithStructure("Mul(Var(x),-1/2)");
        expect("a+b").toParseWithStructure("Add(Var(a),Var(b))");
        expect("a+b+c").toParseWithStructure("Add(Var(a),Var(b),Var(c))");
        expect("a-b").toParseWithStructure("Add(Var(a),Mul(-1,Var(b)))");
        expect("a-b+c").toParseWithStructure(
            "Add(Var(a),Mul(-1,Var(b)),Var(c))",
        );
        expect("abc").toParseWithStructure("Mul(Var(a),Var(b),Var(c))");
        expect("a/bc").toParseWithStructure(
            "Mul(Var(a),Pow(Var(b),-1),Var(c))",
        );
        expect("a*(b+c)").toParseWithStructure(
            "Mul(Var(a),Add(Var(b),Var(c)))",
        );
        expect("x--y").toParseWithStructure("Add(Var(x),Mul(-1,-1,Var(y)))");
        expect("--y").toParseWithStructure("Mul(-1,-1,Var(y))");
        expect("e").toParseWithStructure("Const(e)");
        expect("2e").toParseWithStructure("Mul(2,Const(e))");
        expect("2e^x").toParseWithStructure("Mul(2,Pow(Const(e),Var(x)))");
        expect("cdef").toParseWithStructure(
            "Mul(Var(c),Var(d),Const(e),Var(f))",
        );
        expect("pi").toParseWithStructure("Const(pi)");
        expect("pi^2").toParseWithStructure("Pow(Const(pi),2)");
        expect("pir").toParseWithStructure("Mul(Const(pi),Var(r))");
        expect("pir^2").toParseWithStructure("Mul(Const(pi),Pow(Var(r),2))");
        expect("y=x^2").toParseWithStructure("Eq(Var(y),=,Pow(Var(x),2))");
        expect("log_2x").toParseWithStructure("Log(2,Var(x))");
        expect("f(x+y)").toParseWithStructure("Mul(Var(f),Add(Var(x),Var(y)))");
        expect("f(x+y)").toParseWithStructure("Func(f,Add(Var(x),Var(y)))", {
            functions: ["f"],
        });
        expect("sin(theta)").toParseWithStructure("Trig(sin,Var(theta))");
        expect("tanh(theta)").toParseWithStructure("Trig(tanh,Var(theta))");

        // verify that negative signs get folded into numbers
        expect("-x*3").toParseWithStructure("Mul(Var(x),-3)");
        expect("sin -x*3").toParseWithStructure("Trig(sin,Mul(Var(x),-3))");
    });
});
