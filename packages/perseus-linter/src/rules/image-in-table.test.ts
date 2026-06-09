import {expectWarning, expectPass} from "../__tests__/test-utils";

import imageInTableRule from "./image-in-table";

describe("image-in-table", () => {
    it.each(["|col1|col2|\n|----|----|\n|![alt-text](/link.gif)|cell2|"])(
        "imageInTableRule warns with: %s",
        (str: string) => {
            expectWarning(imageInTableRule, str);
        },
    );
    it.each([
        "![alt-text](/link.gif)\n|col1|col2|\n|----|----|\n|cell1|cell2|",
    ])("imageInTableRule passes with: %s", (str: string) => {
        expectPass(imageInTableRule, str);
    });
});
