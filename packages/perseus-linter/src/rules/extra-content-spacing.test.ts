import {expectWarning, expectPass} from "../__tests__/test-utils";

import extraContentSpacingRule from "./extra-content-spacing";

describe("extra-content-spacing", () => {
    expectWarning(extraContentSpacingRule, [
        "There's extra spaces here.     ",
        "There's extra spaces here    ",
        "  ",
    ]);
    it.each([
        "This is okay.",
        "This is definitely okay. Yeah.",
        "$a == 3.  125$",
    ])("extraContentSpacingRule passes with: %s", (str: string) => {
        expectPass(extraContentSpacingRule, str);
    });
});
