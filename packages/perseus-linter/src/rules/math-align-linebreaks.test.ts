import {expectWarning, expectPass} from "../__tests__/test-utils";

import mathAlignLinebreaksRule from "./math-align-linebreaks";

describe("math-align-linebreaks", () => {
    expectWarning(mathAlignLinebreaksRule, [
        "$\\begin{align}x\\\\y\\end{align}$",
        "$\\begin{align} x \\\\ y \\end{align}$",
        "$\\begin{align}x\\\\\\\\\\\\y\\end{align}$",
        "$\\begin{align}\nx\\\\\n\\\\\\\\\ny\n\\end{align}$",
    ]);
    expectPass(mathAlignLinebreaksRule, [
        "$\\begin{align}x\\sqrty\\end{align}$",
        "$\\begin{align}x\\\\\\\\y\\end{align}$",
        "$\\begin{align}x\\\\\n\\\\y\\end{align}$",
        "$\\begin{align}x \\\\  \\\\ y\\end{align}$",
    ]);
});
