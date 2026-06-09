import {expectPass, expectWarning} from "../__tests__/test-utils";

import headingLevel1Rule from "./heading-level-1";

describe("heading-level-1", () => {
    it("warns for a level 1 heading", () => {
        expectWarning(headingLevel1Rule, "# Level 1 heading");
    });
    it("passes for level 2 and level 3 headings", () => {
        expectPass(
            headingLevel1Rule,
            "## Level 1 heading\n\n### Level 3 heading",
        );
    });
});
