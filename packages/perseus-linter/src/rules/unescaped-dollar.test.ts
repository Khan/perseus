import {expectWarning, expectPass} from "../__tests__/test-utils";

import unescapedDollarRule from "./unescaped-dollar";

describe("unescaped-dollar", () => {
    expectWarning(unescapedDollarRule, ["It costs $10", "It costs $$10$"]);

    expectPass(unescapedDollarRule, ["It costs \\$10", "It costs $10x$"]);
});
