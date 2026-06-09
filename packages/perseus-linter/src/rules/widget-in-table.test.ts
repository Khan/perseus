import {expectWarning, expectPass} from "../__tests__/test-utils";

import widgetInTableRule from "./widget-in-table";

describe("widget-in-table", () => {
    it.each(["|col1|col2|\n|----|----|\n|[[☃ image 1]]|cell2|"])(
        "widgetInTableRule warns with: %s",
        (str: string) => {
            expectWarning(widgetInTableRule, str);
        },
    );

    it.each(["[[☃ image 1]]\n|col1|col2|\n|----|----|\n|cell1|cell2|"])(
        "widgetInTableRule passes with: %s",
        (str: string) => {
            expectPass(widgetInTableRule, str);
        },
    );
});
