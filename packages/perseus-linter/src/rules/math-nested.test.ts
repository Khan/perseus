import {expectWarning, expectPass} from "../__tests__/test-utils";

import mathNestedRule from "./math-nested";

describe("math-nested", () => {
    expectWarning(mathNestedRule, [
        "$\\text{4$x$}$",
        "inline $\\text{4$x$}$ math",
        "$\\text{$$}$",
    ]);
    it.each(["$\\text{4}x$", "inline $\\text{4}x$ math"])(
        "mathNestedRule passes with: %s",
        (str: string) => {
            expectPass(mathNestedRule, str);
        },
    );
});
