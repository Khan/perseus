import {expectWarning, expectPass} from "../__tests__/test-utils";

import extraContentSpacingRule from "./extra-content-spacing";

describe("extra-content-spacing", () => {
    expectWarning(extraContentSpacingRule, [
        "There's extra spaces here.     ",
        "There's extra spaces here    ",
        "  ",
    ]);
    expectPass(extraContentSpacingRule, [
        "This is okay.",
        "This is definitely okay. Yeah.",
        "$a == 3.  125$",
    ]);
});
