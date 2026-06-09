import {expectWarning, expectPass} from "../__tests__/test-utils";

import unbalancedCodeDelimitersRule from "./unbalanced-code-delimiters";

describe("unbalanced-code-delimiters", () => {
    it.each(["`code``", "``code```", "```code\n", "~~~\ncode\n~~"])(
        "unbalancedCodeDelimitersRule warns with: %s",
        (str: string) => {
            expectWarning(unbalancedCodeDelimitersRule, str);
        },
    );
    it.each([
        "`code`",
        "``code``",
        "```code```",
        "```\ncode\n```",
        "~~~\ncode\n~~~",
        "``co`de``",
        "`co~de`",
        "$`~$",
    ])("unbalancedCodeDelimitersRule passes with: %s", (str: string) => {
        expectPass(unbalancedCodeDelimitersRule, str);
    });
});
