import {expectWarning, expectPass} from "../__tests__/test-utils";

import mathNestedRule from "./math-nested";

describe("math-nested", () => {
    expectWarning(mathNestedRule, [
        "$\\text{4$x$}$",
        "inline $\\text{4$x$}$ math",
        "$\\text{$$}$",
    ]);
    expectPass(mathNestedRule, ["$\\text{4}x$", "inline $\\text{4}x$ math"]);
});
