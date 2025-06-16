import {expectWarning, expectPass} from "../__tests__/test-utils";

import mathWithoutDollarsRule from "./math-without-dollars";

describe("math-without-dollars", () => {
    expectWarning(mathWithoutDollarsRule, [
        "One half: \\frac{1}{2}!",
        "\\Large{BIG}!",
        "This looks like someone's ear: {",
        "Here's the other ear: }. Weird!",
    ]);
    expectPass(mathWithoutDollarsRule, [
        "One half: $\\frac{1}{2}$",
        "$\\Large{BIG}$!",
        "`{`",
        "`\\frac{1}{2}`",
        "``\\frac{1}{2}``",
        "```\n\\frac{1}{2}\n```",
        "~~~\n\\frac{1}{2}\n~~~",
        "\n    \\frac{1}{2}\n    {\n    }\n",
    ]);
});
