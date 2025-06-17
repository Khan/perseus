import {expectWarning, expectPass} from "../__tests__/test-utils";

import widgetInTableRule from "./widget-in-table";

describe("widget-in-table", () => {
    expectWarning(widgetInTableRule, [
        "|col1|col2|\n|----|----|\n|[[☃ passage 1]]|cell2|",
    ]);
    expectPass(widgetInTableRule, [
        "[[☃ passage 1]]\n|col1|col2|\n|----|----|\n|cell1|cell2|",
    ]);
});
