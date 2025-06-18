import {expectWarning, expectPass} from "../__tests__/test-utils";

import mathAdjacentRule from "./math-adjacent";

describe("math-adjacent", () => {
    expectWarning(mathAdjacentRule, ["$x=b+c$\n\n$x-b=c$"]);
    expectPass(mathAdjacentRule, ["$x=b+c$\n\nnew paragraph\n\n$x-b=c$"]);
});
