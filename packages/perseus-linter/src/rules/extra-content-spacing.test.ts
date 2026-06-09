import {expectPass, expectWarning} from "../__tests__/test-utils";

import extraContentSpacingRule from "./extra-content-spacing";

describe("extra-content-spacing", () => {
    it.each([
        "There's extra spaces here.     ",
        "There's extra spaces here    ",
        "  ",
    ])("extraContentSpacingRule warns with: %s", (str: string) => {
        expectWarning(extraContentSpacingRule, str);
    });
    it.each([
        "This is okay.",
        "This is definitely okay. Yeah.",
        "$a == 3.  125$",
    ])("extraContentSpacingRule passes with: %s", (str: string) => {
        expectPass(extraContentSpacingRule, str);
    });
});
