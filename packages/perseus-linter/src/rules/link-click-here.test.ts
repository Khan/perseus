import {expectWarning, expectPass} from "../__tests__/test-utils";

import linkClickHereRule from "./link-click-here";

describe("link-click-here", () => {
    it.each([
        "[click here](http://google.com)",
        "[Click here, please](http://google.com)",
        "[For a good time, Click Here](http://google.com)",
    ])("linkClickHereRule warns with: %s", (str: string) => {
        expectWarning(linkClickHereRule, str);
    });

    it("passes when the link text is not 'click here'", () => {
        expectPass(
            linkClickHereRule,
            "[click to activate this link here](http://google.com)",
        );
    });
});
