import _ from "underscore";

import * as KAS from "../index";

type Variables = {
    [key: string]: string | number | ((arg1: number) => number);
};

expect.extend({
    toCompileAs(
        input: string,
        expected: number,
        vars: Variables = {},
    ): jest.CustomMatcherResult {
        const functions = Object.keys(vars).filter(
            (k) => typeof vars[k] === "function",
        );
        const func = KAS.parse(input, {functions}).expr.compile();

        const actual = func(vars);

        return Math.abs(actual - expected) < 1e-9
            ? {pass: true, message: () => ""}
            : {
                  pass: false,
                  message: () =>
                      `${input} should evaluate to ${expected}, was ${actual}; by func: ${func.toString()}`,
              };
    },
});

// TODO(FEI-5054): Figure out how to get global .d.ts files working with monorepos
declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace jest {
        interface Matchers<R> {
            toCompileAs(expected: number, vars?: Variables): R;
        }
    }
}

describe("compilation", () => {
    test("empty", () => {
        expect("").toCompileAs(0);
    });

    test("simple expressions", () => {
        expect("1+2+3+4").toCompileAs(10);
        expect("1+2-3+4").toCompileAs(4);
        expect("1*2*3*4").toCompileAs(24);
        expect("1*2/3*4").toCompileAs(2 + 2 / 3);
        expect("4^3^2^1").toCompileAs(262144);
        expect("-1").toCompileAs(-1);
        expect("--1").toCompileAs(1);
        expect("---1").toCompileAs(-1);
        expect("2^-2").toCompileAs(0.25);
        expect("8^(1/3)").toCompileAs(2);
        expect("0^0").toCompileAs(1);
        expect(".25*4").toCompileAs(1);
        expect("ln e").toCompileAs(1);
        expect("log 10").toCompileAs(1);
        expect("log_2 2").toCompileAs(1);
    });

    test("variable expressions", () => {
        expect("x").toCompileAs(3, {x: 3});
        expect("x^2").toCompileAs(9, {x: 3});
        expect("(x^2+y^2)^.5").toCompileAs(5, {x: 3, y: 4});
        expect("log x_0").toCompileAs(1, {x_0: 10});
        expect("log x_0 + log x_1").toCompileAs(3, {x_0: 10, x_1: 100});
        expect("log x_42").toCompileAs(1, {x_42: 10});
        expect("x_a + x_bc").toCompileAs(7, {x_a: 1, x_b: 2, c: 3});
    });

    test("function expressions", () => {
        expect("f(2)").toCompileAs(4, {
            f: function (x) {
                return 2 * x;
            },
        });
        expect("f(4+8)").toCompileAs(48, {
            f: function (x) {
                return 4 * x;
            },
        });
        expect("f(x-1)-f(x)").toCompileAs(-7, {
            f: function (x) {
                return Math.pow(x, 3);
            },
            x: 2,
        });
    });

    test("trig expressions", () => {
        expect("-2sin(pi x) + 4").toCompileAs(4, {x: 32});
        expect("sin(pi x)").toCompileAs(0, {x: 6});
        expect("sin(x)").toCompileAs(1, {x: Math.PI / 2});
        expect("sin(pi x)").toCompileAs(-1, {x: 3 / 2});
        expect("cos(x)").toCompileAs(1, {x: 0});
        expect("cos x").toCompileAs(-1, {x: Math.PI});
        expect("tan(x)").toCompileAs(0, {x: 0});
        expect("tan x").toCompileAs(1, {x: Math.PI / 4});
    });
});
