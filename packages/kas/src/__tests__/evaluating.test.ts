import _ from "underscore";

import * as KAS from "../index";

type Variables = {
    [key: string]: string | number;
};

expect.extend({
    toEvaluateAs(
        input: string,
        expected: number,
        vars: Variables = {},
        functions?: ReadonlyArray<string>,
    ) {
        const parsed = KAS.parse(input, {functions: functions});
        if (!parsed.parsed || parsed.error) {
            return {
                pass: false,
                message: () =>
                    `unable to parse: ${input} (error: ${parsed.error})`,
            };
        }

        const actual = parsed.expr.eval(vars, {functions: functions});
        if (actual !== expected) {
            return {
                pass: false,
                message: () =>
                    `input: ${input}\nexpected: ${expected}\nactual: ${actual}`,
            };
        }

        return {pass: !this.isNot, message: () => ""};
    },
});

// TODO(FEI-5054): Figure out how to get global .d.ts files working with monorepos
declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace jest {
        interface Matchers<R> {
            toEvaluateAs(
                expected: number,
                vars?: Variables,
                functions?: ReadonlyArray<string>,
            ): R;
        }
    }
}

describe("evaluating", () => {
    // Due to a bug in `toEvaluateAs`, all tests were passing
    // whether or not they should have been.
    // This is to make sure we don't regress again.
    test.failing("should be possible to fail", () => {
        expect("2+2").toEvaluateAs(5);
    });

    test("empty", () => {
        expect("").toEvaluateAs(0);
    });

    test("simple expressions", () => {
        expect("1+2+3+4").toEvaluateAs(10);
        expect("1+2-3+4").toEvaluateAs(4);
        expect("1*2*3*4").toEvaluateAs(24);
        expect("1*2/3*4").toEvaluateAs(2 + 2 / 3);
        expect("4^3^2^1").toEvaluateAs(262144);
        expect("-1").toEvaluateAs(-1);
        expect("--1").toEvaluateAs(1);
        expect("---1").toEvaluateAs(-1);
        expect("2^-2").toEvaluateAs(0.25);
        expect("8^(1/3)").toEvaluateAs(2);
        expect("0^0").toEvaluateAs(1);
        expect(".25*4").toEvaluateAs(1);
        expect("ln e").toEvaluateAs(1);
        expect("log 10").toEvaluateAs(1);
        expect("log_2 2").toEvaluateAs(1);
    });

    test("hyperbolic expressions", () => {
        expect("cosh(0.2)").toEvaluateAs(1.020066755619076);
        expect("coth(0.2)").toEvaluateAs(5.066489563439473);
        expect("csch(3 * 2)").toEvaluateAs(0.00495753481347936);
    });

    test("variable expressions", () => {
        expect("x").toEvaluateAs(3, {x: 3});
        expect("x^2").toEvaluateAs(9, {x: 3});
        expect("(x^2+y^2)^.5").toEvaluateAs(5, {x: 3, y: 4});
        expect("log x_0").toEvaluateAs(1, {x_0: 10});
        expect("log x_0 + log x_1").toEvaluateAs(3, {x_0: 10, x_1: 100});
        expect("log x_42").toEvaluateAs(1, {x_42: 10});
        expect("x_a + x_bc").toEvaluateAs(7, {x_a: 1, x_b: 2, c: 3});
    });

    test("function expressions", () => {
        expect("f(2)").toEvaluateAs(4, {f: "2x"}, ["f"]);
        expect("f(4+8)").toEvaluateAs(48, {f: "4x"}, ["f"]);
        expect("f(x-1)-f(x)").toEvaluateAs(-7, {f: "x^3", x: 2}, ["f"]);
        expect("g(1)").toEvaluateAs(-1, {f: "x", g: "-f(x)"}, ["f", "g"]);
    });

    // TODO(LEMS-2198): these are tests from a failed attempt
    // to support mixed numbers correctly. Keeping so we have a record
    // of what's wrong and what's expected.
    test("fraction expressions", () => {
        // wrong
        expect("2\\frac{1}{2} + 1").toEvaluateAs(2);
        // correct
        // expect("2\\frac{1}{2} + 1").toEvaluateAs(3.5);

        // wrong
        expect("(2\\frac{1}{2}) + 1").toEvaluateAs(2);
        // correct
        // expect("(2\\frac{1}{2}) + 1").toEvaluateAs(3.5);

        // wrong
        expect("-2\\frac{1}{2} + 1").toEvaluateAs(0);
        // correct
        // expect("-2\\frac{1}{2} + 1").toEvaluateAs(-1.5);

        // wrong
        expect("(-2\\frac{1}{2}) + 1").toEvaluateAs(0);
        // correct
        // expect("(-2\\frac{1}{2}) + 1").toEvaluateAs(-1.5);

        // should continue to pass after LEMS-2198 is done
        expect("2-\\frac{1}{2} + 1").toEvaluateAs(2.5);
        expect("(2-\\frac{1}{2}) + 1").toEvaluateAs(2.5);
        expect("(2)\\frac{1}{2} + 1").toEvaluateAs(2);
        expect("2(\\frac{1}{2}) + 1").toEvaluateAs(2);
        expect("\\frac{1}{2}2 + 1").toEvaluateAs(2);
        expect("2 + \\frac{1}{2} + 1").toEvaluateAs(3.5);
        expect("2 * \\frac{1}{2}").toEvaluateAs(1);
        expect("2 2").toEvaluateAs(4);
        expect("2\\pi").toEvaluateAs(6.283185307179586);
    });
});
