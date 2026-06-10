import {expectWarning, expectPass} from "../__tests__/test-utils";

import mathStartsWithSpaceRule from "./math-starts-with-space";

describe("math-starts-with-space", () => {
    it.each([
        "foo$~ x$bar",
        "$\\qquad x$",
        "$\\quad x$",
        "$\\, x$",
        "$\\; x$",
        "$\\: x$",
        "$\\ x$",
        "$\\! x$",
        "$\\enspace x$",
        "$\\phantom{xyz} x$",
    ])("mathStartsWithSpaceRule warns with: %s", (str: string) => {
        expectWarning(mathStartsWithSpaceRule, str);
    });

    it.each([
        "$a~ x$",
        "$a\\qquad x$",
        "$a\\quad x$",
        "$a\\, x$",
        "$a\\; x$",
        "$a\\: x$",
        "$a\\ x$",
        "$a\\! x$",
        "$a\\enspace x$",
        "$a\\phantom{xyz} x$",
    ])("mathStartsWithSpaceRule passes with: %s", (str: string) => {
        expectPass(mathStartsWithSpaceRule, str);
    });
});
