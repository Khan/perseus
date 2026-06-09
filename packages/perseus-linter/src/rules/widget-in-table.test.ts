import {expectWarning, expectPass} from "../__tests__/test-utils";

import widgetInTableRule from "./widget-in-table";

describe("widget-in-table", () => {
    it("warns when a widget is inside a table", () => {
        expectWarning(
            widgetInTableRule,
            "|col1|col2|\n|----|----|\n|[[☃ image 1]]|cell2|",
        );
    });

    it("passes when a widget is outside a table", () => {
        expectPass(
            widgetInTableRule,
            "[[☃ image 1]]\n|col1|col2|\n|----|----|\n|cell1|cell2|",
        );
    });
});
