import {expectWarning, expectPass} from "../__tests__/test-utils";

import mathAlignExtraBreakRule from "./math-align-extra-break";

describe("math-align-extra-break", () => {
    expectWarning(mathAlignExtraBreakRule, [
        "$\\begin{align}x \\\\\\\\ y \\\\ \\end{align}$",
        "$\\begin{align}x \\\\\\\\ y \\\\\\\\ \\end{align}$",
    ]);
    it.each(["$\\begin{align} x \\\\\\\\ y  \\end{align}$"])(
        "mathAlignExtraBreakRule passes with: %s",
        (str: string) => {
            expectPass(mathAlignExtraBreakRule, str);
        },
    );
});
