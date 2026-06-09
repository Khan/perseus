import {expectWarning, expectPass} from "../__tests__/test-utils";

import unescapedDollarRule from "./unescaped-dollar";

describe("unescaped-dollar", () => {
    it.each(["It costs $10", "It costs $$10$"])(
        "unescapedDollarRule warns with: %s",
        (str: string) => {
            expectWarning(unescapedDollarRule, str);
        },
    );

    it.each(["It costs \\$10", "It costs $10x$"])(
        "unescapedDollarRule passes with: %s",
        (str: string) => {
            expectPass(unescapedDollarRule, str);
        },
    );
});
