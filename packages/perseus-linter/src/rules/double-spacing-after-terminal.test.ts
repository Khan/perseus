import {expectWarning, expectPass} from "../__tests__/test-utils";

import doubleSpacingAfterTerminalRule from "./double-spacing-after-terminal";

describe("double-spacing-after-terminal", () => {
    expectWarning(doubleSpacingAfterTerminalRule, [
        "Good times.  Great oldies.",
        "End of the line!  ",
        "You?  Me!",
    ]);
    it.each([
        "This is okay.",
        "This is definitely okay. Yeah.",
        "$a == 3.  125$",
    ])("doubleSpacingAfterTerminalRule passes with: %s", (str: string) => {
        expectPass(doubleSpacingAfterTerminalRule, str);
    });
});
