import {expectWarning, expectPass} from "../__tests__/test-utils";

import mathFracRule from "./math-frac";

describe("math-frac", () => {
    it.each(["$\\frac 12$", "$\\frac{1}{2}$"])(
        "mathFracRule warns with: %s",
        (str: string) => {
            expectWarning(mathFracRule, str);
        },
    );
    it.each(["$\\dfrac 12$", "$\\dfrac{1}{2}$", "$\\fraction 12$"])(
        "mathFracRule passes with: %s",
        (str: string) => {
            expectPass(mathFracRule, str);
        },
    );
});
