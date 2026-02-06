import _ from "underscore";

import * as KAS from "../index";

expect.extend({
    toHaveGCD(
        input: [string, string],
        expected: string,
    ): jest.CustomMatcherResult {
        const [a, b] = input;
        const actualRep = KAS.parse(a).expr.findGCD(KAS.parse(b).expr).repr();
        const expectedRep = KAS.parse(expected).expr.repr();

        return actualRep === expectedRep
            ? {pass: true, message: () => ""}
            : {
                  pass: false,
                  message: () => `(${a}).findGCD(${b}) = ${expected}`,
              };
    },
    toBeSimplified(input: string, options?: any): jest.CustomMatcherResult {
        const actual = KAS.parse(input, options).expr.isSimplified();

        if (this.isNot) {
            return actual
                ? {pass: true, message: () => ""}
                : {
                      pass: false,
                      message: () => `${input} is simplified`,
                  };
        }
        return actual
            ? {pass: true, message: () => ""}
            : {
                  pass: false,
                  message: () => `${input} is NOT simplified`,
              };
    },
    toHaveConsts(
        input: string,
        expected: ReadonlyArray<string>,
        options?: any,
    ): jest.CustomMatcherResult {
        const actual = KAS.parse(input, options).expr.getConsts();

        if (this.isNot) {
            expect(actual).not.toEqual(expected);
        } else {
            expect(actual).toEqual(expected);
        }

        return {pass: !this.isNot, message: () => ""};
    },
    toBeExpr(input: string, reference: string): jest.CustomMatcherResult {
        const actual = KAS.parse(input)
            .expr.asExpr()
            .simplify()
            .normalize()
            .print();
        const expected = KAS.parse(reference).expr.normalize().print();

        return actual === expected
            ? {pass: true, message: () => ""}
            : {
                  pass: false,
                  message: () => `${input} as an expression is ${reference}`,
              };
    },
});

// TODO(FEI-5054): Figure out how to get global .d.ts files working with monorepos
declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace jest {
        interface Matchers<R> {
            toHaveGCD(expected: string): R;
            toBeSimplified(options?: any): R;
            toHaveConsts(expected: ReadonlyArray<string>, options?: any): R;
            toBeExpr(reference: string): R;
        }
    }
}

describe("KAS", () => {
    it("should parse", () => {
        const {expr} = KAS.parse("3x \\frac{42}{42} sin^2y");

        const result = expr.print();

        expect(result).toEqual("3*x*42/42*sin(y)^(2)");
    });

    it("should evaluate expressions", () => {
        const {expr} = KAS.parse("(x^2+y^2)^.5");

        const result = expr.eval({x: 3, y: 4});

        expect(result).toEqual(5);
    });

    it("should compare expressions", () => {
        const expr1 = KAS.parse("(1-x)(-1-6x)").expr;
        const expr2 = KAS.parse("(6x+1)(x-1)").expr;

        const {equal} = KAS.compare(expr1, expr2);

        expect(equal).toBe(true);
    });

    it("should compare equations", () => {
        const eq1 = KAS.parse("2w+50/w=25").expr;
        const eq2 = KAS.parse("w(12.5-w)=25").expr;

        const {equal} = KAS.compare(eq1, eq2);

        expect(equal).toBe(true);
    });

    it("can collect like terms", () => {
        const {expr} = KAS.parse("1+1+x+x+x+y");

        const result = expr.collect().print();

        expect(result).toEqual("2+3*x+y");
    });

    it("can simplify exp/log expressions", () => {
        const {expr} = KAS.parse("b^(2*y*log_b x)");

        const result = expr.collect().print();

        expect(result).toEqual("x^(2*y)");
    });

    it("can expand expressions", () => {
        const {expr} = KAS.parse("ab(c+d)e^f");

        const expansion = expr.expand().print();

        expect(expansion).toEqual("a*b*e^(f)*c+a*b*e^(f)*d");
    });

    it("can expand and factor expressions", () => {
        const {expr} = KAS.parse("ab(c+d)e^f");

        const factored = expr.expand().factor().print();

        expect(factored).toEqual("a*b*e^(f)*(c+d)");
    });

    it("can simplify complex expressions", () => {
        const {expr} = KAS.parse("((nx^5)^5)/(n^-2x^2)^-3");

        const simplified = expr.simplify().print();

        expect(simplified).toEqual("n^(-1)*x^(31)");
    });

    it("can simplify if more complex expressions", () => {
        const {expr} = KAS.parse(
            "(15np-25mp)/(15p^2-5p)+(20mp+10p^2)/(15p^2-5p)",
        );

        const simplified = expr.simplify().print();

        expect(simplified).toEqual("(-1+3*p)^(-1)*(3*n+-1*m+2*p)");
    });

    test("equation to expression", () => {
        const forms = [
            "y=2x-5",
            "-2x+5=-y",
            "2x-5<>y",
            "2x-y<>5",
            "(y+5)/2=x",
            "(y+5)/x=2",
            "1/2(y+5)=x",
            ".5(y+5)=x",
            "y-3=2(x-4)",
            "2y=4x-10",
            "yz=2xz-5z",
        ];

        _.each(forms, (form) => {
            if (form.includes("<>")) {
                expect(form).toBeExpr("-y+2x-5");
            } else {
                expect(form).toBeExpr("y-2x+5");
            }
        });

        const forms2 = ["1/3p-3=114", "1/3p=117", "p=351", "p-351=0"];

        _.each(forms2, function (form) {
            expect(form).toBeExpr("p-351");
        });
    });

    describe("findGCD", () => {
        test("findGCD on ints", () => {
            expect(["40", "30"]).toHaveGCD("10");
            expect(["14", "21"]).toHaveGCD("7");
            expect(["13", "26"]).toHaveGCD("13");
        });

        test("findGCD on rationals", () => {
            expect(["40/3", "55/6"]).toHaveGCD("5/6");
            expect(["3/4", "1/2"]).toHaveGCD("1/4");
            expect(["3/7", "12/22"]).toHaveGCD("3/77");
            expect(["3/10", "4/15"]).toHaveGCD("1/30");
            expect(["2/3", "23/6"]).toHaveGCD("1/6");
            expect(["2/3", "22/6"]).toHaveGCD("1/3");

            expect(["2/3", "2"]).toHaveGCD("2/3");
            expect(["2/3", "3"]).toHaveGCD("1/3");
            expect(["1/2", "4"]).toHaveGCD("1/2");
            expect(["4", "3/4"]).toHaveGCD("1/4");
            expect(["3", "3/4"]).toHaveGCD("3/4");
        });

        test("findGCD on floats", () => {
            // Feel free to change this when we do something other
            // than a naive "return 1" for floats
            expect(["1.23", "1.42"]).toHaveGCD("1");
            expect(["1", String(Math.PI)]).toHaveGCD("1");
        });
    });

    describe("isSimplified", () => {
        test("isSimplified (addition/subtraction)", () => {
            expect("a+b+c").toBeSimplified();
            expect("a-b-c").toBeSimplified();
            expect("a+b+c+c").not.toBeSimplified();
            expect("a-b-c-d-d+d").not.toBeSimplified();
            expect("x").toBeSimplified();
            expect("x+0").not.toBeSimplified();
        });

        test("isSimplified (multiplication/division/negation)", () => {
            expect("1/2").toBeSimplified();
            expect("2/1").not.toBeSimplified();
            expect("(2x)/(5x)").not.toBeSimplified();
            expect("-x").toBeSimplified();
            expect("-1*x").toBeSimplified();
            expect("--x").not.toBeSimplified();
            expect("x/1").not.toBeSimplified();
            expect("x/y").toBeSimplified();
            expect("xy/z").toBeSimplified();
            expect("-3x").toBeSimplified();
            expect("-x*3").toBeSimplified();
            expect("-x*3*y").toBeSimplified();
            expect("(x+1)/(2(x+1))").not.toBeSimplified();
        });

        test("isSimplified (exponentiation)", () => {
            expect("x^-1").toBeSimplified();
            expect("1/x").toBeSimplified();
            expect("1/x^-1").not.toBeSimplified();
        });

        test("isSimplified (logarithms)", () => {
            expect("ln(x)").toBeSimplified();
            expect("ln(x+y)").toBeSimplified();

            // Will only expand logarithms if leads to a simpler expression
            expect("ln(x/y)").toBeSimplified();
            expect("ln(x/y)+ln(y)").not.toBeSimplified();
        });

        test("isSimplified (equations)", () => {
            expect("x=10").toBeSimplified();
            expect("x=-10").toBeSimplified();
            expect("x=10y").toBeSimplified();
            expect("x=-10y").toBeSimplified();
            expect("x=10+y").toBeSimplified();
            expect("x=-10+y").toBeSimplified();

            expect("f(2x) = 10").toBeSimplified({functions: ["f"]});
            expect("f(x+x) = 10").not.toBeSimplified({functions: ["f"]});
        });

        test("isSimplified (equalities)", () => {
            expect("y=x").toBeSimplified();
            expect("y=x^2").toBeSimplified();
            expect("y=x*x").not.toBeSimplified();

            expect("y=x^2+1").toBeSimplified();
            expect("xy=x^2+1").toBeSimplified();
            expect("y+1=x^2+1").not.toBeSimplified();

            expect("xy=x^2").not.toBeSimplified();
            expect("x^2y=x^3").not.toBeSimplified();
            expect("alnx=blnx+clnx").not.toBeSimplified();

            expect("xy=0").toBeSimplified();
            expect("2xy=0").not.toBeSimplified();
            expect("xy/z=0").toBeSimplified();
        });

        test("isSimplified (inequalities)", () => {
            expect("y<x").toBeSimplified();
            expect("y<x^2").toBeSimplified();
            expect("y<x*x").not.toBeSimplified();

            expect("y<x^2+1").toBeSimplified();
            expect("xy<x^2+1").toBeSimplified();
            expect("y+1<x^2+1").not.toBeSimplified();

            expect("xy<x^2"); // x might be negativ.toBeSimplified();
            expect("x^2y<x^3").not.toBeSimplified();
            expect("alnx<blnx+clnx"); // lnx might be negativ.toBeSimplified();

            expect("xy<0").toBeSimplified();
            expect("2xy<0").not.toBeSimplified();
            expect("xy/z<0").toBeSimplified();
        });

        test("isSimplified (rational expressions)", () => {
            expect("3/4 x").toBeSimplified();
            expect("3/(4x)").toBeSimplified();
            expect("3/4 1/x").toBeSimplified();

            expect("(x+1)/(x+2)").toBeSimplified();
            expect("(x+1)/(2x+2)").not.toBeSimplified();
            expect("(2x+2)/(x+1)").not.toBeSimplified();

            expect("xy+2y=x+1").toBeSimplified();
            expect("y=(x+1)/(x+2)").toBeSimplified();
            expect("y/(x+1)=1/(x+2)").toBeSimplified();

            expect("y=(x+1)/(2x+2)").not.toBeSimplified();
            expect("y=1/2").toBeSimplified();

            expect("y=(2x+2)/(x+1)").not.toBeSimplified();
            expect("y=2").toBeSimplified();

            // same denominators (adding_and_subtracting_rational_expressions_1.5)
            expect(
                "(15np-25mp)/(15p^2-5p)+(20mp+10p^2)/(15p^2-5p)",
            ).not.toBeSimplified();
            expect("(3n-m+2p)/(3p-1)").toBeSimplified();

            expect("5yx/(2x^2+4yx)-(2x^2-6yx)/(2x^2+4yx)").not.toBeSimplified();
            expect("(11y-2x)/(2x+4y)").toBeSimplified();

            expect("(25m^2-20pm)/(5pm+5m)-20m^2/(5pm+5m)").not.toBeSimplified();
            expect("(m-4p)/(p+1)").toBeSimplified();

            // pathological examples
            expect("  (a + b)/(2c+2d)").toBeSimplified();
            expect("  (3a+3b)/(2c+2d)").toBeSimplified();
            expect("  (2a+2b)/( c+ d)").toBeSimplified();
            expect("  (2a+2b)/(3c+3d)").toBeSimplified();
            expect("  (2a+2b)/(4c+4d)").not.toBeSimplified();
            expect("  (4a+4b)/(2c+2d)").not.toBeSimplified();
            expect("y=(a + b)/(2c+2d)").toBeSimplified();
            expect("y=(3a+3b)/(2c+2d)").toBeSimplified();
            expect("y=(2a+2b)/( c+ d)").toBeSimplified();
            expect("y=(2a+2b)/(3c+3d)").toBeSimplified();
            expect("y=(2a+2b)/(4c+4d)").not.toBeSimplified();
            expect("y=(4a+4b)/(2c+2d)").not.toBeSimplified();
        });

        test("getConsts", () => {
            expect("4").toHaveConsts([]);
            expect("4x").toHaveConsts([]);
            expect("4pi").toHaveConsts(["pi"]);
            expect("4e").toHaveConsts(["e"]);
            expect("4pi+e").toHaveConsts(["e", "pi"]);
            expect("4pi+pi").toHaveConsts(["pi"]);
            expect("4cos(pi)").toHaveConsts(["pi"]);
            expect("4cos(xpi)").toHaveConsts(["pi"]);
            expect("(4x)/(2pi)").toHaveConsts(["pi"]);
            expect("4sec(x)").toHaveConsts([]);
        });
    });
});
