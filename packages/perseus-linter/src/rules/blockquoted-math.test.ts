import {expectWarning, expectPass} from "../__tests__/test-utils";

import blockquotedMathRule from "./blockquoted-math";

describe("blockquoted-math", () => {
    expectWarning(blockquotedMathRule, ["> $1$", "Quote:\n\n> $x$\n\n"]);
    expectPass(blockquotedMathRule, [
        "$x$",
        "\n$x$\n  $y$\n",
        "> bq #1\n\n$x+y=1$\n\n> bq #2",
    ]);
});
