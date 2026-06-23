import {expectWarning, expectPass} from "../__tests__/test-utils";

import mathNestedRule from "./math-nested";

describe("math-nested", () => {
    it.each(["$\\text{4$x$}$", "inline $\\text{4$x$}$ math", "$\\text{$$}$"])(
        "mathNestedRule warns with: %s",
        (str: string) => {
            expectWarning(mathNestedRule, str);
        },
    );

    it.each(["$\\text{4}x$", "inline $\\text{4}x$ math"])(
        "mathNestedRule passes with: %s",
        (str: string) => {
            expectPass(mathNestedRule, str);
        },
    );
});
