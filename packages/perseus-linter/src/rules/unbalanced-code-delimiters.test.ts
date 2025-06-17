import {expectWarning, expectPass} from "../__tests__/test-utils";

import unbalancedCodeDelimitersRule from "./unbalanced-code-delimiters";

describe("unbalanced-code-delimiters", () => {
    expectWarning(unbalancedCodeDelimitersRule, [
        "`code``",
        "``code```",
        "```code\n",
        "~~~\ncode\n~~",
    ]);
    expectPass(unbalancedCodeDelimitersRule, [
        "`code`",
        "``code``",
        "```code```",
        "```\ncode\n```",
        "~~~\ncode\n~~~",
        "``co`de``",
        "`co~de`",
        "$`~$",
    ]);
});
