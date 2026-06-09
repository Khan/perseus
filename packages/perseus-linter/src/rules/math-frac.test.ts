import {expectWarning, expectPass} from "../__tests__/test-utils";

import mathFracRule from "./math-frac";

describe("math-frac", () => {
    expectWarning(mathFracRule, ["$\\frac 12$", "$\\frac{1}{2}$"]);
    it.each(["$\\dfrac 12$", "$\\dfrac{1}{2}$", "$\\fraction 12$"])(
        "mathFracRule passes with: %s",
        (str: string) => {
            expectPass(mathFracRule, str);
        },
    );
});
