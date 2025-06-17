import {expectWarning, expectPass} from "../__tests__/test-utils";

import blockquotedWidgetRule from "./blockquoted-widget";

describe("blockquoted-widget", () => {
    expectWarning(blockquotedWidgetRule, ["> [[☃ passage 1]]"]);
    expectPass(blockquotedWidgetRule, [
        "[[☃ passage 1]]",
        "> bq #1\n\nTesting [[☃ passage 1]] testing\n\n> bq #2",
    ]);
});
