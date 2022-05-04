import _ from "underscore";

import * as KAS from "../index.js";

expect.extend({
    toHaveNorm(input: string, reference: string) {
        var actual = KAS.parse(input).expr.normalize().print();
        var expected = KAS.parse(reference).expr.normalize().print();

        return {
            pass: actual === expected,
            message: () => `${input} is the same as ${reference}`,
        };
    },
    toHaveStripNorm(input: string, reference: string) {
        var actual = KAS.parse(input).expr.strip().normalize().print();
        var expected = KAS.parse(reference).expr.strip().normalize().print();

        return {
            pass: actual === expected,
            message: () => `${input} is the same as ${reference}`,
        };
    },
});

describe("checking form", () => {
    test("normalize", () => {
        expect("ab").toHaveNorm("ba");
        expect("(ab)c").toHaveNorm("(cb)a");

        var forms = [
            "(6x+1)(x-1)",
            "(1+6x)(x-1)",
            "(6x+1)(-1+x)",
            "(1+6x)(-1+x)",
            "(x-1)(6x+1)",
            "(x-1)(1+6x)",
            "(-1+x)(6x+1)",
            "(-1+x)(1+6x)"
        ];

        _.each(forms, function(form) {
            expect(forms[0]).toHaveNorm(form);
        });
    });

    test("strip then normalize", () => {
        expect("ab").toHaveStripNorm("ba");
        expect("(ab)c").toHaveStripNorm("(cb)a");

        var forms = [
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
            "-(-6x-1)(x-1)"
        ];

        _.each(forms, function(form) {
            expect(forms[0]).toHaveStripNorm(form);
        });
    });
});
