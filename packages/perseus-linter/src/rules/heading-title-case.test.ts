import {expectWarning, expectPass} from "../__tests__/test-utils";

import headingTitleCaseRule from "./heading-title-case";

describe("heading-title-case", () => {
    it("warns when a heading is in title case", () => {
        expectWarning(
            headingTitleCaseRule,
            "## This Heading is in Title Case and the but nor for Too",
        );
    });
    it.each([
        "## This heading is in sentence case",
        "## Acronyms: The CIA, NSA, DNI, and FBI",
        "## The Great War",
    ])("headingTitleCaseRule passes with: %s", (str: string) => {
        expectPass(headingTitleCaseRule, str);
    });
});
