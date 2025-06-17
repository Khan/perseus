import {expectWarning, expectPass} from "../__tests__/test-utils";

import mathEmptyRule from "./math-empty";

describe("math-empty", () => {
    expectWarning(mathEmptyRule, [
        "foo $$ bar",
        "foo\n\n$$\n\nbar",
        "$$ | $$ | $$\n- | - | -\ndata 1 | data 2 | data 3",
    ]);
    expectPass(mathEmptyRule, [
        "foo $x$ bar",
        "foo\n\n$x$\n\nbar",
        "$x$ | $y$ | $z$\n- | - | -\ndata 1 | data 2 | data 3",
    ]);
});
