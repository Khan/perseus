import _ from "underscore";

import * as KAS from "../index";

expect.extend({
    toHaveEqualUnits(
        [x, y]: [any, any],
        msg: string,
    ): jest.CustomMatcherResult {
        const actual = KAS.compare(x.simplify(), y.simplify()).equal;

        if (this.isNot) {
            return {
                pass: actual,
                message: () => msg,
            };
        }

        return {
            pass: actual,
            message: () => msg,
        };
    },
    toParseUnitsAsEqual(
        [x, y]: [any, any],
        msg: string,
    ): jest.CustomMatcherResult {
        if (this.isNot) {
            expect([
                KAS.unitParse(x).expr,
                KAS.unitParse(y).expr,
            ]).not.toHaveEqualUnits(msg);
        } else {
            expect([
                KAS.unitParse(x).expr,
                KAS.unitParse(y).expr,
            ]).toHaveEqualUnits(msg);
        }

        return {pass: !this.isNot, message: () => ""};
    },
    toHaveUnitVariable(
        [original, newUnit]: [any, any],
        expected: any,
    ): jest.CustomMatcherResult {
        const originalParsed = KAS.unitParse(original).expr;
        const newUnitParsed = KAS.unitParse(newUnit).unit;
        const x = new KAS.Var("x");
        const equality = new KAS.Eq(
            originalParsed,
            "=",
            new KAS.Mul(x, newUnitParsed),
        );
        const answer = equality.solveLinearEquationForVariable(x);
        return Math.round(answer.eval()) === Math.round(expected.eval())
            ? {pass: true, message: () => ""}
            : {
                  pass: false,
                  message: () =>
                      `${original} = ["${expected.print()}"] ${newUnit}`,
              };
    },
    toHaveTheSameForm(
        [x, y]: [any, any],
        msg: string,
    ): jest.CustomMatcherResult {
        const equal = KAS.compare(
            KAS.unitParse(x).unit,
            KAS.unitParse(y).unit,
        ).equal;

        return equal
            ? {pass: true, message: () => ""}
            : {pass: false, message: () => msg};
    },
    toHaveMagnitude(input: string, expected: number): jest.CustomMatcherResult {
        const parsed = KAS.unitParse(input).coefficient;

        return +parsed === expected
            ? {pass: true, message: () => ""}
            : {
                  pass: false,
                  message: () => `magnitude of ${input} is not ${expected}`,
              };
    },
});

// TODO(FEI-5054): Figure out how to get global .d.ts files working with monorepos
declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace jest {
        interface Matchers<R> {
            toHaveEqualUnits(msg: string): R;
            toParseUnitsAsEqual(msg: string): R;
            toHaveUnitVariable(expected: any): R;
            toHaveTheSameForm(msg: string): R;
            toHaveMagnitude(expected: number): R;
        }
    }
}

describe("units", () => {
    test("simplify expressions with units", () => {
        expect([
            new KAS.Mul(new KAS.Rational(1, 100), new KAS.Unit("cup")),
            new KAS.Mul(new KAS.Rational(1, 400), new KAS.Unit("qt")),
        ]).toHaveEqualUnits("1/100 cup = 1 / 400 quart");

        expect(["10 g", "0.01 kg"]).toParseUnitsAsEqual("10 g = 1 / 100 kg");

        expect(["9.8 kg m / s^2", "9.8 N"]).toParseUnitsAsEqual(
            "9.8 kg m / s^2 = 9.8 N",
        );

        expect(["9.8 m / s^2", "9.8 N / kg"]).toParseUnitsAsEqual(
            "9.8 m / s^2 = 9.8 N / kg",
        );

        expect([
            new KAS.Mul(
                new KAS.Float(9.8),
                new KAS.Unit("m"),
                new KAS.Pow(new KAS.Unit("s"), new KAS.Int(-2)),
            ),
            new KAS.Mul(
                new KAS.Float(9.8),
                new KAS.Pow(new KAS.Unit("s"), new KAS.Int(-2)),
                new KAS.Unit("m"),
            ),
        ]).toHaveEqualUnits("9.8 m / s^2 = 9.8 s^-2 m");

        expect([
            new KAS.Mul(
                new KAS.Int(50),
                new KAS.Unit("m"),
                new KAS.Pow(new KAS.Unit("m"), new KAS.Int(-1)),
            ),
            new KAS.Int(50),
        ]).toHaveEqualUnits("50 m / m = 50");

        // There's a long chain of conversions before this is fully simplified.
        // tsp -> tbsp -> cup -> gal -> L -> m^3
        //
        //         1 tbsp    1 cup     1 gal   3.785 L
        // 1 tsp * ------ * ------- * ------ * -------
        //         3 tsp    16 tbsp   16 cup     gal
        expect([
            new KAS.Unit("tsp"),
            new KAS.Mul(
                new KAS.Rational(1, 3),
                new KAS.Rational(1, 16),
                new KAS.Rational(1, 16),
                new KAS.Float(3.785),
                new KAS.Unit("L"),
            ),
        ]).toHaveEqualUnits("tsp reduces");

        expect(
            KAS.compare(
                new KAS.Mul(new KAS.Int(50), new KAS.Unit("m")),
                new KAS.Int(50),
            ).equal,
        ).toBeFalse();

        expect(["50 m", "50 A"]).not.toParseUnitsAsEqual("50 m != 50 A");
        expect(["5000 mA", "5 A"]).toParseUnitsAsEqual("5000 mA = 5 A");
        expect(["5 mA", "5 A"]).not.toParseUnitsAsEqual("5 mA != 5 A");

        expect(["9.8 kg m / s^2", "9.8 J"]).not.toParseUnitsAsEqual(
            "9.8 kg m / s^2 != 9.8 J",
        );
        expect(["9.8 kg m / s^2", "9.8 J/m"]).toParseUnitsAsEqual(
            "9.8 kg m / s^2 = 9.8 J/m",
        );

        expect(["mA", "A"]).not.toHaveTheSameForm("mA !== A");
        expect(["g", "kg"]).not.toHaveTheSameForm("g !== kg");
        expect(["kg m / s^2", "N"]).not.toHaveTheSameForm("kg m / s^2 !== N");
        expect(["m / s^2", "N / kg"]).not.toHaveTheSameForm(
            "m / s^2 !== N / kg",
        );

        expect(["A", "A"]).toHaveTheSameForm("A === A");
        expect(["kg", "kg"]).toHaveTheSameForm("kg = kg");
        expect(["kg m / s^2", "m kg / s^2"]).toHaveTheSameForm(
            "kg m / s^2 === m kg / s^2",
        );
        expect(["m / s^2", "m / s^2"]).toHaveTheSameForm("m / s^2 === m / s^2");

        expect(["2.5 gal", "cup"]).toHaveUnitVariable(new KAS.Int(40));

        //         1 tbsp    1 cup     1 gal    3785 L    1 m^3    ( 100 cm ) 3
        // 1 tsp * ------ * ------- * ------ * -------- * ------ * (--------)
        //         3 tsp    16 tbsp   16 cup   1000 gal   1000 L   (    m   )
        expect(["1 tsp", "cm^3"]).toHaveUnitVariable(
            new KAS.Rational(3785, 768),
        );

        expect(["1 dozen qt", "gal"]).toHaveUnitVariable(new KAS.Int(3));

        expect(["1 day", "sec"]).toHaveUnitVariable(new KAS.Int(60 * 60 * 24));

        expect(["5 kg m / s^2", "N"]).toHaveUnitVariable(new KAS.Int(5));

        // This was originally broken due to a scientific notation parsing
        // problem. Leaving it around because it doesn't hurt anything.
        expect(["5 x 10^5 N", "lb"]).toHaveUnitVariable(new KAS.Int(112404));

        expect("5 x 10^5 N").toHaveMagnitude(500000);
        expect("1.23456 x 10^5 N").toHaveMagnitude(123456);
        expect("3.14 x 10^-2 N").toHaveMagnitude(0.0314);
    });
});
