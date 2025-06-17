import {expectWarning, expectPass} from "../__tests__/test-utils";

import headingLevel1Rule from "./heading-level-1";

describe("heading-level-1", () => {
    expectWarning(headingLevel1Rule, "# Level 1 heading");
    expectPass(headingLevel1Rule, "## Level 1 heading\n\n### Level 3 heading");
});
