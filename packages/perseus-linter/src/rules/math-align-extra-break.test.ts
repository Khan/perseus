import {expectIssue, expectPass} from "../__tests__/linter.testutils";

import mathAlignExtraBreakRule from "./math-align-extra-break";

describe("math-align-extra-break", () => {
    it.each([
        "$\\begin{align}x \\\\\\\\ y \\\\ \\end{align}$",
        "$\\begin{align}x \\\\\\\\ y \\\\\\\\ \\end{align}$",
    ])("mathAlignExtraBreakRule warns with: %s", (str: string) => {
        expectIssue(mathAlignExtraBreakRule, str);
    });

    it("passes for an align block without an extra break", () => {
        expectPass(
            mathAlignExtraBreakRule,
            "$\\begin{align} x \\\\\\\\ y  \\end{align}$",
        );
    });
});
