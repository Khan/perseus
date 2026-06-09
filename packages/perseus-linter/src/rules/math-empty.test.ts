import {expectWarning, expectPass} from "../__tests__/test-utils";

import mathEmptyRule from "./math-empty";

describe("math-empty", () => {
    it.each([
        "foo $$ bar",
        "foo\n\n$$\n\nbar",
        "$$ | $$ | $$\n- | - | -\ndata 1 | data 2 | data 3",
    ])("mathEmptyRule warns with: %s", (str: string) => {
        expectWarning(mathEmptyRule, str);
    });
    it.each([
        "foo $x$ bar",
        "foo\n\n$x$\n\nbar",
        "$x$ | $y$ | $z$\n- | - | -\ndata 1 | data 2 | data 3",
    ])("mathEmptyRule passes with: %s", (str: string) => {
        expectPass(mathEmptyRule, str);
    });
});
