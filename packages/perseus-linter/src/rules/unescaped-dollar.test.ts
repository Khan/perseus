import {expectWarning, expectPass} from "../__tests__/test-utils";

import unescapedDollarRule from "./unescaped-dollar";

describe("unescaped-dollar", () => {
    expectWarning(unescapedDollarRule, ["It costs $10", "It costs $$10$"]);

    it.each(["It costs \\$10", "It costs $10x$"])(
        "unescapedDollarRule passes with: %s",
        (str: string) => {
            expectPass(unescapedDollarRule, str);
        },
    );
});
