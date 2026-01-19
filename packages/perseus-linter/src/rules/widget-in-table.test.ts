import {expectWarning, expectPass} from "../__tests__/test-utils";

import widgetInTableRule from "./widget-in-table";

describe("widget-in-table", () => {
    expectWarning(widgetInTableRule, [
        "|col1|col2|\n|----|----|\n|[[☃ image 1]]|cell2|",
    ]);
    expectPass(widgetInTableRule, [
        "[[☃ image 1]]\n|col1|col2|\n|----|----|\n|cell1|cell2|",
    ]);
});
