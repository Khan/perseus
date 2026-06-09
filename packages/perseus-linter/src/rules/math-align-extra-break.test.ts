import {expectWarning, expectPass} from "../__tests__/test-utils";

import mathAlignExtraBreakRule from "./math-align-extra-break";

describe("math-align-extra-break", () => {
    it.each([
        "$\\begin{align}x \\\\\\\\ y \\\\ \\end{align}$",
        "$\\begin{align}x \\\\\\\\ y \\\\\\\\ \\end{align}$",
    ])("mathAlignExtraBreakRule warns with: %s", (str: string) => {
        expectWarning(mathAlignExtraBreakRule, str);
    });

    it("passes for an align block without an extra break", () => {
        expectPass(
            mathAlignExtraBreakRule,
            "$\\begin{align} x \\\\\\\\ y  \\end{align}$",
        );
    });
});
