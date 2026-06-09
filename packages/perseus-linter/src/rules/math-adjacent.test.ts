import {expectWarning, expectPass} from "../__tests__/test-utils";

import mathAdjacentRule from "./math-adjacent";

describe("math-adjacent", () => {
    it("warns for adjacent math blocks", () => {
        expectWarning(mathAdjacentRule, "$x=b+c$\n\n$x-b=c$");
    });

    it("passes when math blocks are separated by a paragraph", () => {
        expectPass(mathAdjacentRule, "$x=b+c$\n\nnew paragraph\n\n$x-b=c$");
    });
});
