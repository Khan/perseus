import _ from "underscore";

import * as KAS from "../index";

expect.extend({
    toRenderTex(
        input: string,
        expected: string,
        options?: any,
    ): jest.CustomMatcherResult {
        const actual = KAS.parse(input, options).expr.tex();

        if (actual !== expected) {
            return {
                pass: false,
                message: () => `${input} renders as ${expected}`,
            };
        }

        return {pass: !this.isNot, message: () => ""};
    },
    toRenderTexOpt(
        input: string,
        expected: string,
        ...optlist: ReadonlyArray<any>
    ) {
        const options = {
            display: false,
            dynamic: false,
            times: false,
        } as const;
        _.each(optlist, function (opt) {
            options[opt] = true;
        });

        const actual = KAS.parse(input).expr.asTex(options);

        if (actual !== expected) {
            return {
                pass: false,
                message: () => `${input} renders with options as ${expected}`,
            };
        }

        return {pass: true, message: () => ""};
    },
});

// TODO(FEI-5054): Figure out how to get global .d.ts files working with monorepos
declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace jest {
        interface Matchers<R> {
            toRenderTex(expected: string, options?: any): R;
            toRenderTexOpt(expected: string, ...optlist: ReadonlyArray<any>): R;
        }
    }
}

describe("rendering", () => {
    test("positive and negative primitives", () => {
        expect("0").toRenderTex("0");
        expect("-1").toRenderTex("-1");
        expect("--1").toRenderTex("--1");
        expect("-2").toRenderTex("-2");
        expect("--2").toRenderTex("--2");
        expect("x").toRenderTex("x");
        expect("theta").toRenderTex("\\theta");
        expect("1/2").toRenderTex("\\frac{1}{2}");
        expect("-1/2").toRenderTex("-\\frac{1}{2}");
        expect("1/-2").toRenderTex("-\\frac{1}{2}");
        expect("-1/-2").toRenderTex("--\\frac{1}{2}");
    });

    test("addition", () => {
        expect("1-2").toRenderTex("1-2");
        expect("a+b").toRenderTex("a+b");
        expect("a-b").toRenderTex("a-b");
        expect("a-1b").toRenderTex("a-1b");
        expect("a+-b").toRenderTex("a+-b");
        expect("a+-1b").toRenderTex("a+-1b");
    });

    test("multiplication", () => {
        expect("ab").toRenderTex("ab");
        expect("a*b").toRenderTex("ab");
        expect("a/b").toRenderTex("\\frac{a}{b}");
        expect("a/bc/d").toRenderTex("\\frac{ac}{bd}");

        expect("1/(x+y)").toRenderTex("\\frac{1}{x+y}");
        expect("2/(x+y)").toRenderTex("\\frac{2}{x+y}");
        expect("(z+2)/(x+y)").toRenderTex("\\frac{z+2}{x+y}");
        expect("(z+2)/4").toRenderTex("\\frac{z+2}{4}");
    });

    test("rational expressions", () => {
        expect("x+1/2").toRenderTex("x+\\frac{1}{2}");
        expect("x-1/2").toRenderTex("x-\\frac{1}{2}");

        expect("1/2x").toRenderTex("\\frac{1}{2}x");
        expect("1/2x/y").toRenderTex("\\frac{1}{2}\\frac{x}{y}");
        expect("5*1/2x/y").toRenderTex("\\frac{1}{2}\\frac{5x}{y}");
        expect("1/2*4*x/y").toRenderTex("\\frac{1}{2}\\frac{4x}{y}");
        expect("-1/2x").toRenderTex("-\\frac{1}{2}x");
        expect("a-1/2x").toRenderTex("a-\\frac{1}{2}x");

        expect("1/(2x)").toRenderTex("\\frac{1}{2x}");
        expect("8/(7p^4)").toRenderTex("\\frac{8}{7p^{4}}");

        expect("x/2").toRenderTex("\\frac{x}{2}");
        expect("1x/2").toRenderTex("\\frac{1x}{2}");
        expect("-x/2").toRenderTex("-\\frac{x}{2}");
        expect("x/-2").toRenderTex("-\\frac{x}{2}");
        expect("x/-2/-3").toRenderTex("--\\frac{x}{2 \\cdot 3}");
        expect("--x/2/3").toRenderTex("--\\frac{x}{2 \\cdot 3}");
        expect("a-x/2").toRenderTex("a-\\frac{x}{2}");

        expect("1*-2").toRenderTex("1 \\cdot -2");
        expect("1*-2*3").toRenderTex("1 \\cdot -2 \\cdot 3");
        expect("1*-2*3/4").toRenderTex("1 \\cdot -2 \\cdot \\frac{3}{4}");
        expect("1*-2*3/4/5").toRenderTex(
            "1 \\cdot -2 \\cdot \\frac{3}{4} \\cdot \\frac{1}{5}",
        );
        expect("1/2*1/2").toRenderTex("\\frac{1}{2} \\cdot \\frac{1}{2}");
    });

    test("exponentiation", () => {
        expect("x^y").toRenderTex("x^{y}");
        expect("xy^z").toRenderTex("xy^{z}");
        expect("(xy)^z").toRenderTex("(xy)^{z}");
        expect("(x+y)^z").toRenderTex("(x+y)^{z}");
        expect("x^(yz)").toRenderTex("x^{yz}");
        expect("x^-(yz)").toRenderTex("x^{-yz}");
        expect("x^(y+z)").toRenderTex("x^{y+z}");
        expect("x^-(y+z)").toRenderTex("x^{-(y+z)}");
        expect("(x^y)^z").toRenderTex("(x^{y})^{z}");
        expect("pir^2").toRenderTex("\\pi r^{2}");
    });

    test("square root", () => {
        expect("sqrt(x)").toRenderTex("\\sqrt{x}");
        expect("sqrt(x)y").toRenderTex("\\sqrt{x}y");
        expect("1/sqrt(x)").toRenderTex("\\frac{1}{\\sqrt{x}}");
        expect("1/sqrt(x)y").toRenderTex("\\frac{y}{\\sqrt{x}}");

        expect("sqrt(2)/2").toRenderTex("\\frac{\\sqrt{2}}{2}");
        expect("sqrt(2)^2").toRenderTex("(\\sqrt{2})^{2}");
    });

    test("nth root", () => {
        // This is an unfortunate case, but only nth degree roots with integer
        // n's get nicely printed as tex.
        expect("sqrt[z]{x}").toRenderTex("x^{\\frac{1}{z}}");

        expect("sqrt[3]{x}").toRenderTex("\\sqrt[3]{x}");
        expect("sqrt[3]{x}z").toRenderTex("\\sqrt[3]{x}z");
        expect("1/sqrt[4]{x}").toRenderTex("\\frac{1}{\\sqrt[4]{x}}");
        expect("1/sqrt[4]{x}y").toRenderTex("\\frac{y}{\\sqrt[4]{x}}");

        expect("sqrt[9]{2}/2").toRenderTex("\\frac{\\sqrt[9]{2}}{2}");
        expect("sqrt[9]{2}^2").toRenderTex("(\\sqrt[9]{2})^{2}");
    });

    test("absolute value", () => {
        expect("|x|").toRenderTex("\\left|x\\right|");
        expect("|x|y").toRenderTex("\\left|x\\right|y");
    });

    test("logarithms", () => {
        expect("lnx").toRenderTex("\\ln(x)");
        expect("logx").toRenderTex("\\log_{10}(x)");
        expect("lnx^y").toRenderTex("\\ln(x^{y})");
        expect("logx^y").toRenderTex("\\log_{10}(x^{y})");
        expect("(lnx)^y").toRenderTex("[\\ln(x)]^{y}");
        expect("(logx)^y").toRenderTex("[\\log_{10}(x)]^{y}");
    });

    test("trig functions", () => {
        expect("sinx").toRenderTex("\\sin(x)");

        expect("arcsin x").toRenderTex("\\arcsin(x)");
        expect("sin^-1 x").toRenderTex("\\arcsin(x)");

        expect("(sinx)^2").toRenderTex("\\sin^{2}(x)");
        expect("sin^2 x").toRenderTex("\\sin^{2}(x)");

        expect("1/(sinx)^2").toRenderTex("\\frac{1}{\\sin^{2}(x)}");
        expect("1/sin^2x").toRenderTex("\\frac{1}{\\sin^{2}(x)}");

        expect("sin^2 x + cos^2 x = 1").toRenderTex(
            "\\sin^{2}(x)+\\cos^{2}(x) = 1",
        );
    });

    test("hyperbolic functions", () => {
        expect("sinhx").toRenderTex("\\sinh(x)");
        expect("sinh^2 x").toRenderTex("\\sinh^{2}(x)");
    });

    test("multiplication with numbers", () => {
        expect("4*10").toRenderTex("4 \\cdot 10");
        expect("10^5").toRenderTex("10^{5}");
        expect("4*10^5").toRenderTex("4 \\cdot 10^{5}");
        expect("10^5x").toRenderTex("10^{5}x");
        expect("4*10^5x").toRenderTex("4 \\cdot 10^{5}x");
        expect("x*(10+4)^5").toRenderTex("x(10+4)^{5}");

        expect("-1*2").toRenderTex("-1 \\cdot 2");
        expect("1*-2").toRenderTex("1 \\cdot -2");
        expect("-1*-2").toRenderTex("-1 \\cdot -2");
        expect("-1*2*3").toRenderTex("-1 \\cdot 2 \\cdot 3");
    });

    test("inverses and division", () => {
        expect("x^-1").toRenderTex("x^{-1}");
        expect("2x^-1").toRenderTex("2x^{-1}");
        expect("1/x").toRenderTex("\\frac{1}{x}");
        expect("-1/x").toRenderTex("\\frac{-1}{x}");
        expect("2/x").toRenderTex("\\frac{2}{x}");
        expect("1/x^2").toRenderTex("\\frac{1}{x^{2}}");
        expect("2/x^2").toRenderTex("\\frac{2}{x^{2}}");
        expect("1/1/x").toRenderTex("\\frac{1}{x}");
        expect("1/(1/x)").toRenderTex("\\frac{1}{\\frac{1}{x}}");
        expect("1/x/x").toRenderTex("\\frac{1}{xx}");
        expect("1/(x/x)").toRenderTex("\\frac{1}{\\frac{x}{x}}");
        expect("-1/1/x").toRenderTex("\\frac{-1}{x}");
        expect("-1/(1/x)").toRenderTex("\\frac{-1}{\\frac{1}{x}}");
        expect("-1/x/x").toRenderTex("\\frac{-1}{xx}");
        expect("-1/(x/x)").toRenderTex("\\frac{-1}{\\frac{x}{x}}");
    });

    test("distributive property", () => {
        expect("ab+c").toRenderTex("ab+c");
        expect("ab+ac").toRenderTex("ab+ac");
        expect("a(b+c)").toRenderTex("a(b+c)");
    });

    test("numerical exponents", () => {
        expect("9^4").toRenderTex("9^{4}");
        expect("-9^4").toRenderTex("-9^{4}");
        expect("1-9^4").toRenderTex("1-9^{4}");
    });

    test("negating a Mul", () => {
        expect("-3x").toRenderTex("-3x");
        expect("--3x").toRenderTex("--3x");
        expect("-x*3").toRenderTex("-3x");
        expect("--x*3").toRenderTex("--3x");
    });

    test("equations", () => {
        expect("y=x").toRenderTex("y = x");
        expect("y<x").toRenderTex("y < x");
        expect("y>x").toRenderTex("y > x");
        expect("y<>x").toRenderTex("y \\ne x");
        expect("y=/=x").toRenderTex("y \\ne x");
        expect("y<=x").toRenderTex("y \\le x");
        expect("y>=x").toRenderTex("y \\ge x");
    });

    test("function variables", () => {
        expect("f(x)").toRenderTex("fx");
        expect("f(x)").toRenderTex("f(x)", {functions: ["f"]});
        expect("f(sin x)").toRenderTex("f(\\sin(x))", {functions: ["f"]});
        expect("sin f(x)").toRenderTex("\\sin(f(x))", {functions: ["f"]});
    });

    test("options", () => {
        expect("x").toRenderTexOpt("x");
        expect("x").toRenderTexOpt("\\displaystyle x", "display");
        expect("a(b+c(d+e))").toRenderTexOpt("a(b+c(d+e))");
        expect("a(b+c(d+e))").toRenderTexOpt(
            "a\\left(b+c\\left(d+e\\right)\\right)",
            "dynamic",
        );
        expect("2*2").toRenderTexOpt("2 \\cdot 2");
        expect("2*2").toRenderTexOpt("2 \\times 2", "times");

        expect("1*2(3+4)").toRenderTexOpt(
            "\\displaystyle 1 \\times 2\\left(3+4\\right)",
            "display",
            "dynamic",
            "times",
        );
    });
});
