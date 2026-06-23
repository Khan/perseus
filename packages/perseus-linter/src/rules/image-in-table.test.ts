import {expectWarning, expectPass} from "../__tests__/test-utils";

import imageInTableRule from "./image-in-table";

describe("image-in-table", () => {
    it("warns when an image is inside a table", () => {
        expectWarning(
            imageInTableRule,
            "|col1|col2|\n|----|----|\n|![alt-text](/link.gif)|cell2|",
        );
    });

    it("passes when an image is outside a table", () => {
        expectPass(
            imageInTableRule,
            "![alt-text](/link.gif)\n|col1|col2|\n|----|----|\n|cell1|cell2|",
        );
    });
});
