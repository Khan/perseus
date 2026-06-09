import {expectWarning, expectPass} from "../__tests__/test-utils";

import mathAdjacentRule from "./math-adjacent";

describe("math-adjacent", () => {
    it.each(["$x=b+c$\n\n$x-b=c$"])(
        "mathAdjacentRule warns with: %s",
        (str: string) => {
            expectWarning(mathAdjacentRule, str);
        },
    );
    it.each(["$x=b+c$\n\nnew paragraph\n\n$x-b=c$"])(
        "mathAdjacentRule passes with: %s",
        (str: string) => {
            expectPass(mathAdjacentRule, str);
        },
    );
});
