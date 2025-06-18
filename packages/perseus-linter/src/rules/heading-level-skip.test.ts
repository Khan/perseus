import {expectWarning, expectPass} from "../__tests__/test-utils";

import headingLevelSkipRule from "./heading-level-skip";

describe("heading-level-skip", () => {
    expectWarning(headingLevelSkipRule, "## heading 1\n\n#### heading 2");
    expectPass(headingLevelSkipRule, [
        "## heading 1\n\n### heading 2\n\n#### heading 3\n\n### heading 4",
        "## heading 1\n\n##heading 2\n\n##heading3",
    ]);
});
