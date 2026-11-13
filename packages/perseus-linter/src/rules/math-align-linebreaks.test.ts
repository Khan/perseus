import {expectIssue, expectPass} from "../__tests__/linter.testutils";

import mathAlignLinebreaksRule from "./math-align-linebreaks";

describe("math-align-linebreaks", () => {
    it.each([
        "$\\begin{align}x\\\\y\\end{align}$",
        "$\\begin{align} x \\\\ y \\end{align}$",
        "$\\begin{align}x\\\\\\\\\\\\y\\end{align}$",
        "$\\begin{align}\nx\\\\\n\\\\\\\\\ny\n\\end{align}$",
    ])("mathAlignLinebreaksRule warns with: %s", (str: string) => {
        expectIssue(mathAlignLinebreaksRule, str);
    });

    it.each([
        "$\\begin{align}x\\sqrty\\end{align}$",
        "$\\begin{align}x\\\\\\\\y\\end{align}$",
        "$\\begin{align}x\\\\\n\\\\y\\end{align}$",
        "$\\begin{align}x \\\\  \\\\ y\\end{align}$",
    ])("mathAlignLinebreaksRule passes with: %s", (str: string) => {
        expectPass(mathAlignLinebreaksRule, str);
    });
});
