import _ from "underscore";

import * as KAS from "../index";

expect.extend({
    toHaveNorm(input: string, reference: string): jest.CustomMatcherResult {
        const actual = KAS.parse(input).expr.normalize().print();
        const expected = KAS.parse(reference).expr.normalize().print();

        return {
            pass: actual === expected,
            message: () => `${input} is the same as ${reference}`,
        };
    },
    toHaveStripNorm(
        input: string,
        reference: string,
    ): jest.CustomMatcherResult {
        const actual = KAS.parse(input).expr.strip().normalize().print();
        const expected = KAS.parse(reference).expr.strip().normalize().print();

        return {
            pass: actual === expected,
            message: () => `${input} is the same as ${reference}`,
        };
    },
});

// TODO(FEI-5054): Figure out how to get global .d.ts files working with monorepos
declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace jest {
        interface Matchers<R> {
            toHaveNorm(reference: string): R;
            toHaveStripNorm(reference: string): R;
        }
    }
}

describe("checking form", () => {
    test("normalize", () => {
        expect("ab").toHaveNorm("ba");
        expect("(ab)c").toHaveNorm("(cb)a");

        const forms = [
            "(6x+1)(x-1)",
            "(1+6x)(x-1)",
            "(6x+1)(-1+x)",
            "(1+6x)(-1+x)",
            "(x-1)(6x+1)",
            "(x-1)(1+6x)",
            "(-1+x)(6x+1)",
            "(-1+x)(1+6x)",
        ];

        _.each(forms, function (form) {
            expect(forms[0]).toHaveNorm(form);
        });
    });

    test("strip then normalize", () => {
        expect("ab").toHaveStripNorm("ba");
        expect("(ab)c").toHaveStripNorm("(cb)a");

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
            expect(forms[0]).toHaveStripNorm(form);
        });
    });
});
