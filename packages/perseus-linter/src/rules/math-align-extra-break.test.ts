import {expectWarning, expectPass} from "../__tests__/test-utils";

import mathAlignExtraBreakRule from "./math-align-extra-break";

describe("math-align-extra-break", () => {
    expectWarning(mathAlignExtraBreakRule, [
        "$\\begin{align}x \\\\\\\\ y \\\\ \\end{align}$",
        "$\\begin{align}x \\\\\\\\ y \\\\\\\\ \\end{align}$",
    ]);
    expectPass(mathAlignExtraBreakRule, [
        "$\\begin{align} x \\\\\\\\ y  \\end{align}$",
    ]);
});
